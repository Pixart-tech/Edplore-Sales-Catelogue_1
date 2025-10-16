import { Platform } from 'react-native';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

const hasScheme = (url: string) => /^[a-z][a-z0-9+\-.]*:/i.test(url);
const hasFileOrContentScheme = (url: string) => {
  const lowerUrl = url.toLowerCase();
  return lowerUrl.startsWith('file:') || lowerUrl.startsWith('content:');
};

const encodePathSegment = (segment: string) => {
  if (segment.length === 0) {
    return segment;
  }

  const dotMatch = segment.match(/^(\.+)(.*)$/);
  if (dotMatch) {
    const [, dots, rest] = dotMatch;
    if (!rest) {
      return dots;
    }
    return `${dots}${encodeURIComponent(rest)}`;
  }

  return encodeURIComponent(segment);
};

const encodePathname = (path: string) =>
  path
    .split('/')
    .map((segment) => encodePathSegment(segment))
    .join('/');

export const sanitizePdfUrl = (pdfUrl?: string | number) => {
  if (!pdfUrl || typeof pdfUrl !== 'string') {
    return '';
  }

  const trimmed = pdfUrl.trim();
  if (!trimmed || trimmed === '#') {
    return '';
  }

  if (hasScheme(trimmed)) {
    return encodeURI(trimmed);
  }

  const queryIndex = trimmed.search(/[?#]/);
  let path = trimmed;
  let suffix = '';

  if (queryIndex !== -1) {
    path = trimmed.slice(0, queryIndex);
    suffix = trimmed.slice(queryIndex);
  }

  const encodedPath = encodePathname(path);
  return `${encodedPath}${suffix}`;
};

const encodeUri = (uri?: string | null) => {
  if (!uri) {
    return '';
  }

  try {
    return encodeURI(uri);
  } catch (error) {
    console.warn('Failed to encode URI', uri, error);
    return uri;
  }
};

const resolveLocalAssetUri = async (pdfAsset?: number) => {
  if (typeof pdfAsset !== 'number') {
    return '';
  }

  try {
    const asset = Asset.fromModule(pdfAsset);
    await asset.downloadAsync();

    const localUri = encodeUri(asset.localUri);
    const remoteUri = encodeUri(asset.uri);

    if (Platform.OS === 'android') {
      if (remoteUri) {
        return remoteUri;
      }

      return localUri;
    }

    return localUri || remoteUri;
  } catch (error) {
    console.warn('Failed to resolve local PDF asset', error);
    return '';
  }
};

const isOpenableUri = (uri: string) =>
  !!uri &&
  (hasScheme(uri) || hasFileOrContentScheme(uri) || uri.startsWith('/') || uri.startsWith('data:'));

export const resolvePdfUri = async (pdfUrl?: string | number, pdfAsset?: number) => {
  const sanitizedUrl = sanitizePdfUrl(pdfUrl);

  if (sanitizedUrl && isOpenableUri(sanitizedUrl)) {
    return sanitizedUrl;
  }

  const assetUri = await resolveLocalAssetUri(pdfAsset);

  if (assetUri) {
    return assetUri;
  }

  return '';
};

const PDF_JS_VERSION = '4.5.136';

const createInlinePdfHtml = (base64Content: string) => {
  const sanitizedBase64 = base64Content.replace(/\s/g, '');

  return [
    '<!DOCTYPE html>',
    '<html>',
    '  <head>',
    '    <meta charset="utf-8" />',
    '    <meta name="viewport" content="width=device-width, initial-scale=1" />',
    '    <style>',
    '      * {',
    '        box-sizing: border-box;',
    '      }',
    '      html, body {',
    '        margin: 0;',
    '        padding: 0;',
    '        height: 100%;',
    '        background-color: #0f172a;',
    '        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;',
    '      }',
    '      #viewer {',
    '        width: 100%;',
    '        min-height: 100%;',
    '        padding: 20px 12px 40px;',
    '        display: flex;',
    '        flex-direction: column;',
    '        gap: 20px;',
    '        align-items: center;',
    '      }',
    '      canvas {',
    '        width: 100% !important;',
    '        height: auto !important;',
    '        max-width: 860px;',
    '        box-shadow: 0 12px 30px rgba(15, 23, 42, 0.35);',
    '        border-radius: 12px;',
    '        background-color: #ffffff;',
    '      }',
    '      #loading, #error {',
    '        color: #e2e8f0;',
    '        text-align: center;',
    '        padding: 24px;',
    '        font-size: 16px;',
    '        font-weight: 600;',
    '      }',
    '      #error {',
    '        display: none;',
    '        color: #f97316;',
    '      }',
    '    </style>',
    `    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDF_JS_VERSION}/pdf.min.js"></script>`,
    '  </head>',
    '  <body>',
    '    <div id="loading">Preparing PDF preview…</div>',
    '    <div id="error">Unable to display this PDF.</div>',
    '    <div id="viewer" class="pdfViewer"></div>',
    '    <script>',
    '      (function () {',
    `        var workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDF_JS_VERSION}/pdf.worker.min.js';`,
    `        var base64 = '${sanitizedBase64}';`,
    '        try {',
    '          var binary = atob(base64);',
    '          var length = binary.length;',
    '          var bytes = new Uint8Array(length);',
    '          for (var i = 0; i < length; i += 1) {',
    '            bytes[i] = binary.charCodeAt(i);',
    '          }',
    '          if (window.pdfjsLib) {',
    '            window.pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;',
    '            var loadingTask = window.pdfjsLib.getDocument({ data: bytes });',
    '            loadingTask.promise.then(function (pdf) {',
    '              var viewer = document.getElementById("viewer");',
    '              var loading = document.getElementById("loading");',
    '              if (loading) {',
    '                loading.style.display = "none";',
    '              }',
    '              var renderPage = function (pageNumber) {',
    '                pdf.getPage(pageNumber).then(function (page) {',
    '                  var viewport = page.getViewport({ scale: 1.4 });',
    '                  var canvas = document.createElement("canvas");',
    '                  var context = canvas.getContext("2d");',
    '                  canvas.height = viewport.height;',
    '                  canvas.width = viewport.width;',
    '                  viewer.appendChild(canvas);',
    '                  var renderContext = { canvasContext: context, viewport: viewport };',
    '                  page.render(renderContext).promise.then(function () {',
    '                    if (pageNumber < pdf.numPages) {',
    '                      renderPage(pageNumber + 1);',
    '                    }',
    '                  });',
    '                });',
    '              };',
    '              renderPage(1);',
    '            }).catch(function () {',
    '              throw new Error("render_failed");',
    '            });',
    '          } else {',
    '            throw new Error("pdfjs_missing");',
    '          }',
    '        } catch (error) {',
    '          var loadingElement = document.getElementById("loading");',
    '          var errorElement = document.getElementById("error");',
    '          if (loadingElement) {',
    '            loadingElement.style.display = "none";',
    '          }',
    '          if (errorElement) {',
    '            errorElement.style.display = "block";',
    '          }',
    '          console.error("Inline PDF rendering failed", error);',
    '        }',
    '      })();',
    '    </script>',
    '  </body>',
    '</html>',
  ].join('\n');
};

export type PdfViewerSource =
  | { type: 'uri'; uri: string }
  | { type: 'html'; html: string };

const isRemoteUri = (uri: string) => /^https?:/i.test(uri);

const isFileLikeUri = (uri: string) => uri.startsWith('file:') || uri.startsWith('/');

const isDataUri = (uri: string) => uri.startsWith('data:application/pdf');

const getPdfCacheDirectory = async () => {
  const baseDirectory = FileSystem.cacheDirectory ?? FileSystem.documentDirectory;

  if (!baseDirectory) {
    return null;
  }

  const directory = `${baseDirectory}pdf-viewer/`;

  try {
    await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : '';

    if (!message.toLowerCase().includes('already exists')) {
      console.warn('Failed to ensure PDF cache directory', error);
      return null;
    }
  }

  return directory;
};

const hashRemoteUri = (uri: string) => {
  let hash = 0;

  for (let index = 0; index < uri.length; index += 1) {
    hash = (hash * 31 + uri.charCodeAt(index)) >>> 0;
  }

  return hash.toString(16);
};

const loadRemotePdfAsHtml = async (uri: string) => {
  const cacheDirectory = await getPdfCacheDirectory();

  if (!cacheDirectory) {
    return null;
  }

  const fileName = `remote-${hashRemoteUri(uri)}.pdf`;
  const filePath = `${cacheDirectory}${fileName}`;

  let shouldCleanUp = false;

  try {
    const fileInfo = await FileSystem.getInfoAsync(filePath);

    if (!fileInfo.exists) {
      await FileSystem.downloadAsync(uri, filePath);
      shouldCleanUp = true;
    }

    const base64 = await FileSystem.readAsStringAsync(filePath, {
      encoding: FileSystem.EncodingType.Base64,
    });

    if (shouldCleanUp) {
      try {
        await FileSystem.deleteAsync(filePath, { idempotent: true });
      } catch (cleanupError) {
        console.warn('Failed to clean up temporary PDF file', cleanupError);
      }
    }

    return createInlinePdfHtml(base64);
  } catch (error) {
    if (shouldCleanUp) {
      try {
        await FileSystem.deleteAsync(filePath, { idempotent: true });
      } catch (cleanupError) {
        console.warn('Failed to clean up temporary PDF file after error', cleanupError);
      }
    }

    console.warn('Failed to download remote PDF for inline preview', error);
    return null;
  }
};

export const createPdfViewerSource = async (
  pdfUrl?: string | number,
  pdfAsset?: number,
): Promise<PdfViewerSource | null> => {
  const resolvedUri = await resolvePdfUri(pdfUrl, pdfAsset);

  if (!resolvedUri) {
    return null;
  }

  if (isDataUri(resolvedUri)) {
    return { type: 'uri', uri: resolvedUri };
  }

  if (isRemoteUri(resolvedUri)) {
    const inlineHtml = await loadRemotePdfAsHtml(resolvedUri);

    if (inlineHtml) {
      return { type: 'html', html: inlineHtml };
    }

    return { type: 'uri', uri: resolvedUri };
  }

  if (isFileLikeUri(resolvedUri) || resolvedUri.startsWith('content:')) {
    const filePath = resolvedUri.startsWith('file://')
      ? resolvedUri.replace('file://', '')
      : resolvedUri;

    try {
      const base64 = await FileSystem.readAsStringAsync(filePath, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return { type: 'html', html: createInlinePdfHtml(base64) };
    } catch (error) {
      console.warn('Failed to load local PDF as base64 for inline preview', error);
      return { type: 'uri', uri: resolvedUri };
    }
  }

  return { type: 'uri', uri: resolvedUri };
};
