import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import store from "./redux/store.js";
import { Provider } from "react-redux";

// import "./index.css";

import App from "./App.jsx";
import ThemeProvider from "./Theme/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
