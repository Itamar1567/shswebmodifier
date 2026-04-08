import "./Home.css"
import OptionsList from "./OptionsList";

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the website Modifier app</h1>
      <p>
        For reference:{" "}
        <a
          href="https://shswomenshealthclub.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Shs Womens Club
        </a>
      </p>
      <p>To get started, choose an attribute to modify from below.</p>
      <OptionsList />
    </div>
  );
}

export default Home;
