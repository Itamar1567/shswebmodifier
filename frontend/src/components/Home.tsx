import { Button } from "@mui/material";
import "./Home.css"
import OptionsList from "./OptionsList";
import { RedeployWebsite } from "../services/DeploymentFunctions";

function Home() {

  async function handleCommit(){
    try{
      const data = await RedeployWebsite()
      alert(data)
    }
    catch(error){
      alert(error)
    }
  }

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
      <div className="home-commit-container">
        <Button variant="contained" color="error" onClick={handleCommit}>Commit Changes</Button>
      </div>
    </div>
  );
}

export default Home;
