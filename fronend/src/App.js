
import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./Routes";
import "primeflex/primeflex.css";

const App = () => {

  return (
    <div>
        <BrowserRouter>
          <MainRoutes />
        </BrowserRouter>
    </div>
  );
};

export default App;