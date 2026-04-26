import "./App.css";
import Home from "./components/Home";
import ModifyNewsletters from "./components/ModifyNewsletters";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ModifyTitle from "./components/ModifyTitle";
import AddNewsletter from "./components/AddNewsletter";
import DeleteNewsLetter from "./components/DeleteNewsletter";
import EditNewsletter from "./components/EditNewsletter";
import Navigationbar from "./components/Navigationbar";
import { Show } from "@clerk/react";
import SignInPage from "./components/SignInPage";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Show when={"signed-out"}>
        <SignInPage></SignInPage>
      </Show>
      <Show when={"signed-in"}>
        <Navigationbar></Navigationbar>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route
              path="/newsletters"
              element={<ModifyNewsletters></ModifyNewsletters>}
            ></Route>
            <Route path="/title" element={<ModifyTitle></ModifyTitle>}></Route>
            <Route
              path="/add-newsletter"
              element={<AddNewsletter></AddNewsletter>}
            ></Route>
            <Route
              path="/delete-newsletter"
              element={<DeleteNewsLetter></DeleteNewsLetter>}
            ></Route>
            <Route
              path="/edit-newsletter"
              element={<EditNewsletter></EditNewsletter>}
            ></Route>
          </Routes>
        </div>
        <Footer></Footer>
      </Show>
    </Router>
  );
}

export default App;
