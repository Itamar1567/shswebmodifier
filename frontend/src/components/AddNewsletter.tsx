import "./AddNewsletter.css";
import type { CreateNewsletterDTO } from "../interfaces/CreateNewsletterDTO";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import FileDragDrop from "./FileDragDrop";
import { useState } from "react";
import { UploadNewsletterToBackend } from "../services/CloudTransport";
import { useAuth } from "@clerk/react";

function AddNewsletter() {

  const { getToken } = useAuth()
  const [file, setFile] = useState<File | File[] | null>(null);

  function handleFileChange(newFile: File | File[] | null): void {
        setFile(newFile);
  }

  const [newNewsLetter, setNewNewsLetter] = useState<CreateNewsletterDTO>({
    title: "",
    slug: "",
    author: "",
    image_path: "",
    short_description: "",
    story_text: "",
  });

  function resetNewsLetter() {
    setNewNewsLetter({
      title: "",
      slug: "",
      author: "",
      image_path: "",
      short_description: "",
      story_text: "",
    });
  }

  const onSubmitForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedNewsletter = {
      ...newNewsLetter,
      slug: newNewsLetter.title.toLowerCase().replace(/\s+/g, "-"),
    };

    try{

      //Dearrayify the file if it's an array
      const newFile = Array.isArray(file) ? file[0] : file;
      setFile(newFile);

      const res = await UploadNewsletterToBackend(newFile, updatedNewsletter, getToken)
      alert(res);

    }catch(error){
      alert(error instanceof Error ? error.message : "Something went wrong");
      return;
    }
    

    
    
    resetNewsLetter();
  };

  return (
    <div className="add-newsletter-container">
      <div className="add-newsletter-form-container">
        <h1>Add newsletter</h1>
        <p>Here you can add a newsletter to the website.</p>
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
              setNewNewsLetter({ ...newNewsLetter, story_text: e.target.value })
            }
            required
          ></textarea>

          <Button type="submit">Submit</Button>
        </form>
      </div>
      <Button component={RouterLink} to="/newsletters" variant="contained">
        Back to Newsletter Modificaiton
      </Button>
    </div>
  );
}

export default AddNewsletter;
