import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Self-hosted fonts via @fontsource
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";

// Design system styles
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/utilities.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
