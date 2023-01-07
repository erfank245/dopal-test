import React from "react";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotMatch from "./Pages/NotMatch";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<NotMatch/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
