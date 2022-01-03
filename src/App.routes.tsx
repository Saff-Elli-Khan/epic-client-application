import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button } from "./components/core/button/button";
import { ScrollToTop } from "./components/utils/scrollToTop";
import { PageLayout } from "./layouts/page";
import { ErrorPage } from "./pages/error";

export const AppRoutes: React.FC = () => {
  const [ToggleMode, setToggleMode] = useState<"dark" | "light">("light");

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          {/* Public routes includes Homepage, Contact Us, About Us etc. */}
          <Route path="/" element={<PageLayout />}>
            <Route
              path="/"
              element={
                <div className="w-100 h-screen p-20 bg-white dark:bg-black">
                  <div className="grid grid-flow-row">
                    <div className="col-span mb-10">
                      <Button
                        label={`Toggle Mode '${ToggleMode}'`}
                        className="capitalize"
                        onClick={() => {
                          setToggleMode((prev) => {
                            document.body.classList.remove(prev);
                            if (prev === "dark") {
                              document.body.classList.add("light");
                              return "light";
                            } else {
                              document.body.classList.add("dark");
                              return "dark";
                            }
                          });
                        }}
                      />
                    </div>
                    <div className="col-span">
                      <Button
                        onClick={(_, setBusy) => {
                          setBusy((prev) => (prev = !prev));
                        }}
                      />
                    </div>
                  </div>
                </div>
              }
            />
          </Route>

          {/* Not Found */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};
