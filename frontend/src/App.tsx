import "./App.css";
import Home from "./components/Home";
import ModifyNewsletters from "./components/ModifyNewsletters";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ModifyTitle from "./components/ModifyTitle";
import AddNewsletter from "./components/AddNewsletter";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/newsletters"
            element={<ModifyNewsletters></ModifyNewsletters>}
          ></Route>
          <Route path="/title" element={<ModifyTitle></ModifyTitle>}></Route>
          <Route path="/add-newsletter" element={<AddNewsletter></AddNewsletter>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
