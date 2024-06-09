import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";                //is added to add toast (side mein appear hone waali pop ups) search on google
import "react-toastify/dist/ReactToastify.css";                  //Google

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
    <ToastContainer />              //can be added anywhere either in the parent or the child where it is to be used
  </>
);
