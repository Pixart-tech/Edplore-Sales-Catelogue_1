import { Platform } from 'react-native';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

const hasScheme = (url: string) => /^[a-z][a-z0-9+\-.]*:/i.test(url);

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

const getCacheDirectory = () => FileSystem.cacheDirectory ?? FileSystem.documentDirectory ?? '';

const createCachePath = () => {
  const directory = getCacheDirectory();
  if (!directory) {
    return '';
  }

  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1_000_000);
  return `${directory}pdf-${timestamp}-${random}.pdf`;
};

const normalizeFilePath = (uri: string) => {
  if (uri.startsWith('file://')) {
    return uri.replace('file://', '');
  }

  if (uri.startsWith('content://')) {
    return uri;
  }

  if (Platform.OS === 'ios' && uri.startsWith('/')) {
    return uri;
  }

  if (Platform.OS === 'android' && uri.startsWith('/')) {
    return uri;
  }

  return uri;
};

const copyContentUriToFile = async (contentUri: string) => {
  const targetPath = createCachePath();
  if (!targetPath) {
    return '';
  }

  try {
    await FileSystem.copyAsync({ from: contentUri, to: targetPath });
    return targetPath;
  } catch (error) {
    console.warn('Failed to copy content URI to cache directory', error);
    return '';
  }
};

const downloadPdfToCache = async (uri: string) => {
  const targetPath = createCachePath();
  if (!targetPath) {
    return '';
  }

  try {
    const result = await FileSystem.downloadAsync(uri, targetPath);
    return result.uri;
  } catch (error) {
    console.warn(`Failed to download PDF from ${uri}`, error);
    return '';
  }
};

const resolveLocalAssetUri = async (pdfAsset?: number) => {
  if (typeof pdfAsset !== 'number') {
    return '';
  }

  try {
    const asset = Asset.fromModule(pdfAsset);
    await asset.downloadAsync();

    const localUri = asset.localUri ?? asset.uri;
    if (!localUri) {
      return '';
    }

    if (localUri.startsWith('http://') || localUri.startsWith('https://')) {
      return downloadPdfToCache(localUri);
    }

    return localUri;
  } catch (error) {
    console.warn('Failed to resolve local PDF asset', error);
    return '';
  }
};

const resolveUriToFile = async (uri: string) => {
  if (uri.startsWith('http://') || uri.startsWith('https://')) {
    return downloadPdfToCache(uri);
  }

  if (uri.startsWith('content://')) {
    return copyContentUriToFile(uri);
  }

  return uri;
};

export interface PdfDocument {
  path: string;
  cleanupUri?: string;
  originalUri?: string;
}

export const resolvePdfDocument = async (
  pdfUrl?: string | number,
  pdfAsset?: number,
): Promise<PdfDocument | null> => {
  const sanitizedUrl = sanitizePdfUrl(pdfUrl);

  if (sanitizedUrl && hasScheme(sanitizedUrl)) {
    const fileUri = await resolveUriToFile(sanitizedUrl);
    if (fileUri) {
      const path = fileUri.startsWith('content://') ? '' : normalizeFilePath(fileUri);
      if (!path) {
        console.warn(`Unable to prepare PDF from URI: "${sanitizedUrl}"`);
        return null;
      }

      return {
        path,
        cleanupUri: fileUri.startsWith('content://') || fileUri.startsWith('file://') ? fileUri : undefined,
        originalUri: sanitizedUrl,
      };
    }
  }

  if (sanitizedUrl && !hasScheme(sanitizedUrl)) {
    const fileUri = await resolveUriToFile(sanitizedUrl);
    if (fileUri) {
      return {
        path: normalizeFilePath(fileUri),
        cleanupUri: fileUri.startsWith('content://') || fileUri.startsWith('file://') ? fileUri : undefined,
        originalUri: sanitizedUrl,
      };
    }
  }

  const assetUri = await resolveLocalAssetUri(pdfAsset);
  if (assetUri) {
    return {
      path: normalizeFilePath(assetUri),
      cleanupUri: assetUri.startsWith('file://') ? assetUri : undefined,
      originalUri: assetUri,
    };
  }

  console.warn(`PDF URL is not available or invalid: "${String(pdfUrl ?? '')}"`);
  return null;
};

export const cleanupPdfDocument = async (document?: PdfDocument | null) => {
  if (!document?.cleanupUri) {
    return;
  }

  const uri = document.cleanupUri.startsWith('file://')
    ? document.cleanupUri
    : `file://${document.cleanupUri.replace(/^file:\/\//, '')}`;

  try {
    await FileSystem.deleteAsync(uri, { idempotent: true });
  } catch (error) {
    console.warn(`Failed to delete temporary PDF file at ${uri}`, error);
  }
};
