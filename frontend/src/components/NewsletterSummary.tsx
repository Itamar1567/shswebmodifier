import './NewsletterSummary.css';
import type { GetNewsletterDTO } from '../interfaces/GetNewsletterDTO';

interface Props{
    OnNewsletterClickAction: (deletedId: number) => void;
    newsLetter: GetNewsletterDTO;
}

function NewsletterSummary({ newsLetter, OnNewsletterClickAction }: Props) {

  return (
    <div className="newsletter-summary-container" onClick={() => OnNewsletterClickAction(newsLetter.id)}>
      <h1>
        {newsLetter.title}
      </h1>
      {newsLetter.image_path != null ? <img
        id="newsletter_summary-image"
        src={newsLetter.image_path}
        alt={newsLetter.title}
      /> : <p>No image available</p>}
      <p>
        {newsLetter.short_description}
      </p>
      <section className="dates-section">
        <p>Created On: {(newsLetter.created_at.toLocaleString())}</p>
      </section>
    </div>
  );
}

export default NewsletterSummary;
