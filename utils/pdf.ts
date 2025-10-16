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

const createInlinePdfHtml = (base64Content: string) =>
  [
    '<!DOCTYPE html>',
    '<html>',
    '  <head>',
    '    <meta charset="utf-8" />',
    '    <meta name="viewport" content="width=device-width, initial-scale=1" />',
    '    <style>',
    '      html, body {',
    '        margin: 0;',
    '        padding: 0;',
    '        height: 100%;',
    '        background-color: #111827;',
    '      }',
    '      iframe {',
    '        border: none;',
    '        width: 100%;',
    '        height: 100%;',
    '      }',
    '    </style>',
    '  </head>',
    '  <body>',
    '    <iframe src="data:application/pdf;base64,${base64Content}" title="PDF preview"></iframe>',
    '  </body>',
    '</html>',
  ].join('\n');

export type PdfViewerSource =
  | { type: 'uri'; uri: string }
  | { type: 'html'; html: string };

const isRemoteUri = (uri: string) => /^https?:/i.test(uri);

const isFileLikeUri = (uri: string) => uri.startsWith('file:') || uri.startsWith('/');

const isDataUri = (uri: string) => uri.startsWith('data:application/pdf');

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
    const encodedRemote = encodeURIComponent(resolvedUri);
    const viewerUri = `https://docs.google.com/gview?embedded=1&url=${encodedRemote}`;
    return { type: 'uri', uri: viewerUri };
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
