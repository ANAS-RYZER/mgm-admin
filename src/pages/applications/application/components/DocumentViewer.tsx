interface Props {
  type: string;
  url: string;
}

const DocumentViewer = ({ type, url }: Props) => {
  const isPdf = url.toLowerCase().endsWith(".pdf");

  if (isPdf) {
    return (
      <iframe
        src={url}
        className="h-[600px] w-full rounded-md border"
        title="Document Viewer"
      />
    );
  }

  return (
    <img
      src={url}
      alt={type}
      className="max-h-[600px] rounded-md border object-contain"
    />
  );
};

export default DocumentViewer;
