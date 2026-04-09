import "./AddNewsletter.css";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import FileDragDrop from "./FileDragDrop";

function AddNewsletter(){
    return (<div className="add-newsletter-container">
            <div className="add-newsletter-form-container">
        <h1>Add newsletter</h1>
        <p>Here you can add a newsletter to the website.</p>
        <form className="add-newsletter-form">
            <input type="text" placeholder="Title" required></input>
            <input type="text" placeholder="Short Description"></input>
            <FileDragDrop />
            <label htmlFor="content-textarea">Enter your story:</label>
            <textarea id="content-textarea" placeholder="content" required></textarea>
        </form>
            </div>
            <Button component={RouterLink} to="/newsletters" variant="contained">Back to Newsletter Modificaiton</ Button>
    </div>)
}

export default AddNewsletter;