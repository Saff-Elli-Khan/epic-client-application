import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/utils/scrollToTop";
import { PageLayout } from "./layouts/page";
import { ErrorPage } from "./pages/error";

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          {/* Public routes includes Homepage, Contact Us, About Us etc. */}
          <Route path="/" element={<PageLayout />}>
            <Route path="/" element={<h1>Hello World!</h1>} />
          </Route>

          {/* Not Found */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};
