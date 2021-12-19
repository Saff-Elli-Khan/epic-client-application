import ReactDOM from "react-dom";
import * as ServiceWorkerRegistration from "./serviceWorkerRegistration";
import ReportWebVitals from "./reportWebVitals";
import * as IonicPWA from "@ionic/pwa-elements/loader";
import App from "./App.main";

// Render Application
ReactDOM.render(<App />, document.getElementById("root"));

// Some Capacitor plugins, including the Camera API, provide the web-based
// functionality and UI via the Ionic PWA Elements library.
IonicPWA.defineCustomElements(window);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
ServiceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: ReportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
ReportWebVitals();
