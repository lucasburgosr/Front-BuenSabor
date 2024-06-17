import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "../src/redux/store/store.ts";
import { AtributosContextProvider } from "./context/AtributosContext";
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithNavigate } from "./componentes/auth0/Auth0ProviderWithNavigate.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <AtributosContextProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </AtributosContextProvider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);
