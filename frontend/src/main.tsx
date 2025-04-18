import "@/config/sentry";
import { App } from "@/App";
import React from "react";
import ReactDOM from "react-dom/client";

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
