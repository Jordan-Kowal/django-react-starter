import "@/config/sentry";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "@/App";

// @ts-ignore
const container: HTMLDivElement = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <React.Suspense fallback="Loading...">
      <App />
    </React.Suspense>
  </React.StrictMode>,
);
