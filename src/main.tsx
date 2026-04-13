import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Remove service workers antigos para evitar banner de instalação PWA de outros projetos.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
      });
    })
    .catch(() => {
      // Silencioso: não deve quebrar renderização em caso de falha.
    });
}

createRoot(document.getElementById("root")!).render(<App />);
