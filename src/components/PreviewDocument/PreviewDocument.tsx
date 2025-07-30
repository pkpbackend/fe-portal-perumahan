import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Grid, Spin } from "antd";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

import "react-pdf/dist/esm/Page/TextLayer.css";
const { useBreakpoint } = Grid;

const PreviewDocument = ({
  fileUrl,
  renderButton = undefined,
}: {
  fileUrl: string;
  renderButton?: React.ReactElement;
}) => {
  const screen = useBreakpoint();
  const [openModalPreviewDocument, setOpenModalPreviewDocument] =
    useState(false);

  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  return (
    <div>
      {renderButton ? (
        React.cloneElement(renderButton, {
          onClick: () => setOpenModalPreviewDocument(true),
        })
      ) : (
        <Button
          type="primary"
          ghost={Boolean(fileUrl)}
          icon={<EyeOutlined />}
          disabled={!fileUrl}
          onClick={() => {
            setOpenModalPreviewDocument(true);
          }}
        >
          Lihat Dokumen
        </Button>
      )}

      <Modal
        open={openModalPreviewDocument}
        title="Lihat Dokumen"
        destroyOnClose
        onCancel={() => setOpenModalPreviewDocument(false)}
        footer={
          <Space
            style={{
              justifyContent: "space-between",
              width: "100%",
              padding: "0.75rem 0",
            }}
            align="center"
          >
            <Space align="center">
              <Button
                size="small"
                onClick={goToPrevPage}
                disabled={pageNumber === 1}
              >
                Prev
              </Button>
              <Button
                size="small"
                onClick={goToNextPage}
                disabled={pageNumber === numPages}
              >
                Next
              </Button>
              <span>
                Page {pageNumber} of {numPages}
              </span>
            </Space>
            <Button
              size="small"
              type="link"
              href={fileUrl}
              icon={<DownloadOutlined />}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </Button>
          </Space>
        }
        width={screen.md ? "75%" : "100%"}
        bodyStyle={{
          height: "85vh",
          overflowY: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
        centered
      >
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<Spin />}
        >
          <Page
            pageNumber={pageNumber}
            renderAnnotationLayer={false}
            scale={screen.md ? 1 : 0.75}
          />
        </Document>
      </Modal>
    </div>
  );
};

export default PreviewDocument;
