import React from "react";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotMatch from "./Pages/NotMatch";
import Open from "./Pages/Open";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/open" element={<Open/>} />
        <Route path="*" element={<NotMatch/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
