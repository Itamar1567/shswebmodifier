import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

interface Props{
  onFileChange: (file: File | File[] | null) => void;
}

const fileTypes: string[] = ["JPG", "PNG"];

function DragDrop({ onFileChange }: Props){
  const [file, setFile] = useState<File | File[] | null>(null);
  
  const handleChange = (incomingFile: File | File[] | null): void => {
    setFile(incomingFile);
    onFileChange(incomingFile);
  };

  return (
    <div>
        <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
        <p>File name: {file ? (Array.isArray(file) ? file[0].name : file.name) : "No file selected"}</p>
    </div>
    
    
  );
};

export default DragDrop;