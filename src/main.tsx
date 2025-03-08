import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import { ReviewsProvider } from "./context/ReviewsContext";
import "./index.css";

// Lazy load App for better performance
const App = lazy(() => import("./App"));

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element not found");
} else {
  ReactDOM.createRoot(rootElement as HTMLElement).render(
    <React.StrictMode>
      <Router>
        <ReviewsProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <App />
          </Suspense>
        </ReviewsProvider>
      </Router>
    </React.StrictMode>
  );
}
