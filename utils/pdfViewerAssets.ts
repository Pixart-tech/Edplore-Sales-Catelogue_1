import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

const CACHE_ROOT = `${FileSystem.cacheDirectory}pdfviewer`;

const PDF_VIEWER_HTML = String.raw`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>PDF Preview</title>
    <style>
      html,
      body {
        margin: 0;
        padding: 0;
        background: #000;
        color: #fff;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        min-height: 100%;
      }

      body {
        display: flex;
        justify-content: center;
      }

      #viewer {
        width: 100%;
        max-width: 960px;
        box-sizing: border-box;
        padding: 20px 12px 64px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }

      .page {
        width: 100%;
        background: #111;
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
        border-radius: 6px;
        overflow: hidden;
      }

      canvas {
        width: 100%;
        height: auto;
        display: block;
        background: #fff;
      }

      .message {
        width: 100%;
        padding: 40px 24px;
        text-align: center;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.05);
        color: #bbb;
        font-size: 16px;
        line-height: 22px;
      }

      .message--error {
        color: #ff7b7b;
        background: rgba(255, 0, 0, 0.1);
      }

      ::-webkit-scrollbar {
        width: 8px;
      }

      ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.25);
        border-radius: 4px;
      }
    </style>
  </head>
  <body>
    <div id="viewer">
      <div id="placeholder" class="message">Loading preview…</div>
    </div>

    <script>
      const postMessage = (type, detail) => {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ type, detail })
          );
        }
      };
    </script>

    <script type="module">
      import * as pdfjsLib from './pdf.mjs';

      pdfjsLib.GlobalWorkerOptions.workerSrc = './pdf.worker.mjs';

      const viewer = document.getElementById('viewer');
      const placeholder = document.getElementById('placeholder');

      const getPdfData = () => window.__PDF_DATA__ || '';

      const toUint8Array = (dataUrl) => {
        const base64 = dataUrl.split(',')[1] || '';
        const raw = atob(base64);
        const { length } = raw;
        const bytes = new Uint8Array(length);
        for (let i = 0; i < length; i += 1) {
          bytes[i] = raw.charCodeAt(i);
        }
        return bytes;
      };

      const showError = (message) => {
        if (placeholder) {
          placeholder.textContent = message;
          placeholder.className = 'message message--error';
        }
        postMessage('error', { message });
      };

      const renderPage = async (pdf, pageNumber) => {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1.4 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d', { alpha: false });
        const outputScale = window.devicePixelRatio || 1;

        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = '100%';
        canvas.style.height = 'auto';

        context.scale(outputScale, outputScale);

        await page.render({ canvasContext: context, viewport }).promise;

        const pageContainer = document.createElement('div');
        pageContainer.className = 'page';
        pageContainer.appendChild(canvas);
        viewer.appendChild(pageContainer);

        postMessage('pageRendered', { pageNumber });
      };

      const load = async () => {
        const pdfData = getPdfData();
        if (!pdfData) {
          showError('Missing PDF data.');
          return;
        }

        try {
          let loadingTask;
          if (pdfData.startsWith('data:')) {
            loadingTask = pdfjsLib.getDocument({ data: toUint8Array(pdfData) });
          } else {
            loadingTask = pdfjsLib.getDocument({ url: pdfData });
          }

          const pdf = await loadingTask.promise;
          if (placeholder && placeholder.parentElement) {
            placeholder.parentElement.removeChild(placeholder);
          }

          postMessage('loaded', { pages: pdf.numPages });

          for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
            await renderPage(pdf, pageNumber);
          }
        } catch (error) {
          console.error('[PDF] Failed to render', error);
          showError('Unable to display PDF.');
        }
      };

      load();
    </script>
  </body>
</html>
`;

const assetsToCopy = [
  { module: require('../assets/pdfjs/build/pdf.mjs'), target: 'pdf.mjs' },
  { module: require('../assets/pdfjs/build/pdf.worker.mjs'), target: 'pdf.worker.mjs' },
];

export const preparePdfViewerAssets = async () => {
  await Asset.loadAsync(assetsToCopy.map((item) => item.module));
  await FileSystem.makeDirectoryAsync(CACHE_ROOT, { intermediates: true });

  await Promise.all(
    assetsToCopy.map(async ({ module, target }) => {
      const asset = Asset.fromModule(module);
      await asset.downloadAsync();
      if (!asset.localUri) return;

      const destPath = `${CACHE_ROOT}/${target}`;
      try {
        await FileSystem.copyAsync({ from: asset.localUri, to: destPath });
      } catch (error: any) {
        if (!String(error?.message || error).includes('Already exists')) throw error;
      }
    })
  );

  const htmlPath = `${CACHE_ROOT}/viewer.html`;
  await FileSystem.writeAsStringAsync(htmlPath, PDF_VIEWER_HTML);

  return htmlPath;
};
