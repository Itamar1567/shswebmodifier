import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

interface Props {
  onFileChange: (file: File | File[] | null) => void;
}

const fileTypes: string[] = ["JPG", "PNG"];

function checkFileSize(file: File): boolean {
  const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
  return file.size <= maxSizeInBytes;
}

function DragDrop({ onFileChange }: Props) {
  const [file, setFile] = useState<File | File[] | null>(null);

  const handleChange = (incomingFile: File | File[] | null): void => {
    if (incomingFile == null) {
      return;
    }

    if (Array.isArray(incomingFile) && incomingFile.length > 0) {
      incomingFile = incomingFile[0];
    }

    if(!Array.isArray(incomingFile) && !checkFileSize(incomingFile)) {
      alert("File size exceeds the 5MB limit.");
      return; 
    }

    setFile(incomingFile);
    onFileChange(incomingFile);
  };

  return (
    <div>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      <p>
        File name:{" "}
        {file
          ? Array.isArray(file)
            ? file[0].name
            : file.name
          : "No file selected"}
      </p>
    </div>
  );
}

export default DragDrop;
