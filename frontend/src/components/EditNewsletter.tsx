import { useEffect, useState } from "react";
import "./EditNewsletter.css";
import type { GetNewsletterDTO } from "../interfaces/GetNewsletterDTO";
import { GetNewslettersFromBackend } from "../services/CloudTransport";
import NewsletterSummary from "./NewsletterSummary";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import EditNewsletterPopup from "./EditNewsletterPopup";

function EditNewsletter() {

  function handlePopupClose(){
    if(window.confirm("Are you sure you want to exit, all unsaved edits will be lost")){
        setIsPopupOpen(false)
    }
  } 

  function OnClickEditNewsletter(id: number) {
    setSelectedId(id);
    setIsPopupOpen(true);
  }

  const [newsLetters, setNewsLetters] = useState<GetNewsletterDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchNewsLetters = async () => {
      try {
        const data = await GetNewslettersFromBackend();
        setNewsLetters(data);
        console.log(data);
      } catch (error) {
        console.log(
          error instanceof Error ? error.message : "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchNewsLetters();
  }, []);

  return (
    <div className="editor-page">
      <div className="edit-newsletter-container">
        {loading ? (
          <p>Loading...</p>
        ) : newsLetters.length > 0 ? (
          newsLetters.map((newsletter) => (
            <NewsletterSummary
              key={newsletter.id}
              newsLetter={newsletter}
              OnNewsletterClickAction={OnClickEditNewsletter}
            />
          ))
        ) : (
          <p>No newsletters found.</p>
        )}
        <Dialog
          open={isPopupOpen}
          onClose={handlePopupClose}
          maxWidth="md"
          fullWidth
        >
          <DialogContent>
            {selectedId !== null && (
              <EditNewsletterPopup idToOverride={selectedId} handlePopupClose={handlePopupClose} />
            )}
          </DialogContent>
        </Dialog>
      </div>
      <Button
        id="back_button"
        component={RouterLink}
        to={"/newsletters"}
        variant="contained"
        color="primary"
        size="large"
      >
        Back
      </Button>
    </div>
  );
}

export default EditNewsletter;
