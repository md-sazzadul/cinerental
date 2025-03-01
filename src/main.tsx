import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { ReviewsProvider } from "./context/ReviewsContext";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <ReviewsProvider>
        <App />
      </ReviewsProvider>
    </Router>
  </React.StrictMode>
);
