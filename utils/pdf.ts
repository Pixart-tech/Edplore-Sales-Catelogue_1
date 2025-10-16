import { Linking, Platform } from 'react-native';
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

    if (Platform.OS === 'android' && localUri.startsWith('file://')) {
      try {
        const contentUri = await FileSystem.getContentUriAsync(localUri);
        return contentUri ?? '';
      } catch (error) {
        console.warn('Failed to create content URI for asset', error);
      }
    }

    return localUri;
  } catch (error) {
    console.warn('Failed to resolve local PDF asset', error);
    return '';
  }
};

const isOpenableUri = (uri: string) =>
  !!uri &&
  (hasScheme(uri) || hasFileOrContentScheme(uri) || uri.startsWith('/') || uri.startsWith('data:'));

export const openPdf = async (pdfUrl?: string | number, pdfAsset?: number) => {
  const sanitizedUrl = sanitizePdfUrl(pdfUrl);

  const targetUri = sanitizedUrl && isOpenableUri(sanitizedUrl)
    ? sanitizedUrl
    : await resolveLocalAssetUri(pdfAsset);

  if (!targetUri) {
    console.warn(`PDF URL is not available or invalid: "${String(pdfUrl ?? '')}"`);
    return;
  }

  try {
    await Linking.openURL(targetUri);
  } catch (error) {
    console.error(`Failed to open PDF at ${targetUri}`, error);
  }
};
