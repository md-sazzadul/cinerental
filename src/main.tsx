import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";

import { ReviewsProvider } from "./context/ReviewsContext";
import "./index.css";

// Lazy load App for better performance
const App = lazy(() => import("./App"));

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Root element #root not found. Ensure index.html contains <div id='root'></div>."
  );
} else {
  ReactDOM.createRoot(rootElement as HTMLElement).render(
    <React.StrictMode>
      <Router>
        <ReviewsProvider>
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-screen text-lg">
                Loading...
              </div>
            }
          >
            <App />
          </Suspense>
        </ReviewsProvider>
      </Router>
    </React.StrictMode>
  );
}
