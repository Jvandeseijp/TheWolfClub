import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/reset.css";
import { MoralisProvider } from "react-moralis";

/** Get your free Moralis Account https://moralis.io/ */

const APP_ID = "VxE5zqqPPwUBiOJ4vcYsgA529AVRSg6pJUDI08Jb";
const SERVER_URL = "https://wktq1kdcj6ca.usemoralis.com:2053/server";

ReactDOM.render(
  <StrictMode>
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <App />
    </MoralisProvider>
  </StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
//serviceWorkerRegistration.register();
