import "./EditNewsletterPopup.css";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import FileDragDrop from "./FileDragDrop";
import {
  GetNewsletterByIdFromBackend,
  SendEditedNewsletterToBackend,
  UploadFile,
} from "../services/CloudTransport";
import type { EditNewsletterDTO } from "../interfaces/EditNewsletterDTO";

interface Props {
  idToOverride: number;
  handlePopupClose: () => void;
}

function EditNewsletterPopup({ idToOverride, handlePopupClose }: Props) {
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    async function FetchNewsletterData() {
      try {
        const data = await GetNewsletterByIdFromBackend(idToOverride);
        setNewNewsLetter(data);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    }

    if (idToOverride) {
      FetchNewsletterData();
    }
  }, [idToOverride]);

  const [file, setFile] = useState<File | File[] | null>(null);

  function handleFileChange(newFile: File | File[] | null): void {
    setFile(newFile);
  }

  const [newNewsLetter, setNewNewsLetter] = useState<EditNewsletterDTO>({
    id: 0,
    title: "",
    slug: "",
    author: "",
    image_path: "",
    short_description: "",
    story_text: "",
  });

  const onSubmitForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      //Dearrayify the file if it's an array
      const newFile = Array.isArray(file) ? file[0] : file;
      setFile(newFile);

      let fileName = null;

      if(newFile !== null){
        UploadFile(newFile);
        fileName = newFile.name;
      }

      const updatedNewsletter = {
        ...newNewsLetter,
        slug: newNewsLetter.title.toLowerCase().replace(/\s+/g, "-"),
        image_path: fileName
      };

      console.log(updatedNewsletter)

      const res = await SendEditedNewsletterToBackend(updatedNewsletter);
      alert(res);


    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong");
      return;
    }
  };

  return (
    <div className="edit-popup-newsletter-container">
      <div id="editor-header">
        <h1>Editor</h1>
        <Button variant="contained" color="error" onClick={handlePopupClose}>
          Close
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Currently Editing {newNewsLetter.title}</p>
          <form className="add-newsletter-form" onSubmit={onSubmitForm}>
            <input
              value={newNewsLetter.author}
              type="text"
              placeholder="Author"
              onChange={(e) =>
                setNewNewsLetter({ ...newNewsLetter, author: e.target.value })
              }
              required
            ></input>
            <input
              value={newNewsLetter.title}
              type="text"
              placeholder="Title"
              onChange={(e) =>
                setNewNewsLetter({ ...newNewsLetter, title: e.target.value })
              }
              required
            ></input>

            <input
              value={newNewsLetter.short_description}
              type="text"
              placeholder="Short Description"
              onChange={(e) =>
                setNewNewsLetter({
                  ...newNewsLetter,
                  short_description: e.target.value,
                })
              }
              required
            ></input>

            <FileDragDrop onFileChange={handleFileChange} />

            <label htmlFor="content-textarea">Enter your story:</label>
            <textarea
              value={newNewsLetter.story_text}
              id="content-textarea"
              placeholder="content"
              onChange={(e) =>
                setNewNewsLetter({
                  ...newNewsLetter,
                  story_text: e.target.value,
                })
              }
              required
            ></textarea>

            <Button type="submit">Submit</Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditNewsletterPopup;

