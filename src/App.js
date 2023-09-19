import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import LoadingData from "./pages/loadingData";
import Demo from "./pages/demo";
import ClassicPage from "./pages/classicData";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/chart" element={<Demo/>} />
          <Route path="/under_development" element={<LoadingData />}/> 
          <Route path="/classic" element={<ClassicPage/>}/>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
