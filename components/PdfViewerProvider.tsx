import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import PdfViewerModal from './PdfViewerModal';
import type { PdfDocument } from '../utils/pdf';
import { cleanupPdfDocument, resolvePdfDocument } from '../utils/pdf';

interface PdfViewerContextValue {
  openPdf: (pdfUrl?: string | number, pdfAsset?: number, options?: { title?: string }) => void;
  closePdf: () => void;
}

const PdfViewerContext = createContext<PdfViewerContextValue | undefined>(undefined);

interface PdfViewerProviderProps {
  children: ReactNode;
}

export const PdfViewerProvider: React.FC<PdfViewerProviderProps> = ({ children }) => {
  const [document, setDocument] = useState<PdfDocument | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const activeDocumentRef = useRef<PdfDocument | null>(null);
  const isMountedRef = useRef(true);

  const cleanupDocument = useCallback(async (doc: PdfDocument | null) => {
    if (!doc) {
      return;
    }

    try {
      await cleanupPdfDocument(doc);
    } catch (error) {
      console.warn('Failed to clean up PDF document', error);
    }
  }, []);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      void cleanupDocument(activeDocumentRef.current);
    };
  }, [cleanupDocument]);

  const closePdf = useCallback(() => {
    setIsVisible(false);
    setDocument(null);
    setTitle('');
    setErrorMessage(null);

    const currentDocument = activeDocumentRef.current;
    activeDocumentRef.current = null;
    void cleanupDocument(currentDocument);
  }, [cleanupDocument]);

  const openPdf = useCallback(
    (pdfUrl?: string | number, pdfAsset?: number, options?: { title?: string }) => {
      setIsVisible(true);
      setIsLoading(true);
      setErrorMessage(null);
      setTitle(options?.title ?? '');
      setDocument(null);

      void (async () => {
        if (activeDocumentRef.current) {
          await cleanupDocument(activeDocumentRef.current);
          activeDocumentRef.current = null;
        }

        try {
          const resolvedDocument = await resolvePdfDocument(pdfUrl, pdfAsset);

          if (!isMountedRef.current) {
            if (resolvedDocument) {
              await cleanupDocument(resolvedDocument);
            }
            return;
          }

          if (!resolvedDocument) {
            setErrorMessage('Unable to load this PDF.');
            setIsLoading(false);
            return;
          }

          activeDocumentRef.current = resolvedDocument;
          setDocument(resolvedDocument);
        } catch (error) {
          console.error('Failed to open PDF', error);
          if (isMountedRef.current) {
            setDocument(null);
            setErrorMessage('Unable to load this PDF.');
          }
        } finally {
          if (isMountedRef.current) {
            setIsLoading(false);
          }
        }
      })();
    },
    [cleanupDocument],
  );

  const contextValue = useMemo<PdfViewerContextValue>(
    () => ({
      openPdf,
      closePdf,
    }),
    [openPdf, closePdf],
  );

  return (
    <PdfViewerContext.Provider value={contextValue}>
      {children}
      <PdfViewerModal
        visible={isVisible}
        document={document}
        title={title}
        isLoading={isLoading}
        errorMessage={errorMessage}
        onClose={closePdf}
      />
    </PdfViewerContext.Provider>
  );
};

export const usePdfViewer = () => {
  const context = useContext(PdfViewerContext);

  if (!context) {
    throw new Error('usePdfViewer must be used within a PdfViewerProvider.');
  }

  return context;
};
