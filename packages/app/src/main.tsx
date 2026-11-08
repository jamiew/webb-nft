import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";

import "./styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import { EthereumProviders } from "./EthereumProviders";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Missing root element");
}

createRoot(root).render(
  <StrictMode>
    <EthereumProviders>
      <App />
    </EthereumProviders>
    <ToastContainer position="top-center" draggable={false} />
  </StrictMode>,
);
