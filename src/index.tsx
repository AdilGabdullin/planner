import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/App";
import { store } from "./store";
import { Provider } from "react-redux";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
