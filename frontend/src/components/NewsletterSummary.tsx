import './NewsletterSummary.css';
import type { GetNewsletterDTO } from '../interfaces/GetNewsletterDTO';
import { deleteNewsletterFromBackend } from '../services/CloudTransport';

interface Props{
    onNewsletterDeleted: (deletedId: number) => void;
    newsLetter: GetNewsletterDTO;
}

function NewsletterSummary({ newsLetter, onNewsletterDeleted }: Props) {

    async function deleteNewsletter(){
        if(window.confirm("Are you sure you want to delete this newsletter? This action cannot be undone.")){
            try{
                const res = await deleteNewsletterFromBackend(newsLetter.id);
                onNewsletterDeleted(newsLetter.id);
                alert(res);
            }catch(error){
                console.log(error instanceof Error ? error.message : "Something went wrong");
            }
    }}

  return (
    <div className="newsletter-summary-container" onClick={deleteNewsletter}>
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
