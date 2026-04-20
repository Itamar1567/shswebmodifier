import "./DeleteNewsletter.css";
import { useEffect, useState } from "react";
import type { GetNewsletterDTO } from "../interfaces/GetNewsletterDTO";
import {
  deleteNewsletterFromBackend,
  GetNewslettersFromBackend,
} from "../services/CloudTransport";
import NewsletterSummary from "./NewsletterSummary";
import { Button } from "@mui/material";
import { Route, Link as RouterLink } from "react-router-dom";
function DeleteNewsLetter() {
  const [newsLetters, setNewsLetters] = useState<GetNewsletterDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function deleteNewsletter(id: number) {
    if (
      window.confirm(
        "Are you sure you want to delete this newsletter? This action cannot be undone.",
      )
    ) {
      try {
        const res = await deleteNewsletterFromBackend(id);
        alert(res);
      } catch (error) {
        console.log(
          error instanceof Error ? error.message : "Something went wrong",
        );
      }
    }
  }

  async function onNewsLetterDeleted(deletedId: number) {
    await deleteNewsletter(deletedId);
    setNewsLetters(newsLetters.filter((n) => n.id !== deletedId));
  }

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
    <div className="delete-page">
      <div className="delete-newsletter-container">
        {loading ? (
          <p>Loading...</p>
        ) : newsLetters.length > 0 ? (
          newsLetters.map((newsletter) => (
            <NewsletterSummary
              key={newsletter.id}
              newsLetter={newsletter}
              OnNewsletterClickAction={onNewsLetterDeleted}
            />
          ))
        ) : (
          <p>No newsletters found.</p>
        )}
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

export default DeleteNewsLetter;
