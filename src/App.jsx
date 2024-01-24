import React from "react";
import Form from "./Form";
import Data from "./Data";
import { Route, Routes } from "react-router-dom";



const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Data />} />
        <Route path="/add" element={<Form />} />
      </Routes>
    </div>
  );
};

export default App;
