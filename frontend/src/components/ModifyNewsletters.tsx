import "./ModifyNewsletters.css";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Option from "./Option";

function ModifyNewsletters() {
  const actions = [
    { label: "Add newsletter", link: "/add-newsletter" },
    { label: "Delete newsletter", link: "/delete-newsletter" },
  ];
  return (
    <div className="modify-newsletter-container">
      <div className="modify-newsletter-options-container">
        <h1>Modify newsletters</h1>
        <p>Here you can modify the newsletters section of the website.</p>
        <div className="newsletter-actions-holder">
          {actions.map((action, index) => (
            <Option key={index} text={action.label} link={action.link} />
          ))}
        </div>
      </div>
      <Button component={RouterLink} to="/" variant="contained">
        Back to home
      </Button>
    </div>
  );
}

export default ModifyNewsletters;
