import { Linking } from 'react-native';

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

export const sanitizePdfUrl = (pdfUrl: string) => {
  if (!pdfUrl) {
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

export const openPdf = (pdfUrl: string) => {
  const sanitizedUrl = sanitizePdfUrl(pdfUrl);

  if (!sanitizedUrl) {
    console.warn(`PDF URL is not available or invalid: "${pdfUrl}"`);
    return;
  }

  Linking.openURL(sanitizedUrl).catch((error) => {
    console.error(`Failed to open PDF at ${sanitizedUrl}`, error);
  });
};
