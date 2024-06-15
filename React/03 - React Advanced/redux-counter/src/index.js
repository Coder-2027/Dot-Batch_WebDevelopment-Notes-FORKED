import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider  store={store} >                  //to link our redux store with react ,just same as we used to link our contextAPI with our react we used to write <AppContextProvider>
  //Now app and all its components can now access redux functionalities
  //where store is the global store which we exported
      <App />
  </Provider>
);
