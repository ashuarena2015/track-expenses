
import React from "react";
import * as styles from "./styles.module.less";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./Routes";

const App = () => {
  return (
    <>
    <div className={styles.container}>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </div>
    </>
  );
};

export default App;