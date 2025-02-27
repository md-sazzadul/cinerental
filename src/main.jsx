import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { ReviewsProvider } from "./context/ReviewsContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ReviewsProvider>
        <App />
      </ReviewsProvider>
    </Router>
  </React.StrictMode>
);
