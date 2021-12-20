import { LanguageProvider } from "./hooks/language";
import { TranslationProvider } from "./hooks/translator";
import { CurrencyProvider } from "./hooks/currency";
import { AppRoutes } from "./App.routes";

// Load Icons
import "line-awesome/dist/line-awesome/css/line-awesome.min.css";

// Load Styles
import "./styles/output.css";

export default () => (
  <LanguageProvider>
    <TranslationProvider>
      <CurrencyProvider>
        <AppRoutes />
      </CurrencyProvider>
    </TranslationProvider>
  </LanguageProvider>
);
