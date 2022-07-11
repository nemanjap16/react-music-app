import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { InvoiceProvider } from "./context/invoiceContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <InvoiceProvider>
      <App />
    </InvoiceProvider>
  </React.StrictMode>
);
