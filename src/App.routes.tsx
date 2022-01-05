import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button, ButtonProps } from "./components/ui/button/button";
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
                <div className="w-100 px-5 py-20 sm:p-10 bg-white dark:bg-black">
                  <div className="flex justify-end mb-5">
                    <Button
                      theme="muted"
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
                    >
                      {`Toggle Mode '${ToggleMode}'`}
                    </Button>
                  </div>

                  <div className="grid grid-flow-row">
                    <h1 className="text-5xl dark:text-white font-bold mb-10">
                      Epic <i className="las la-mobile-alt"></i>
                      <i className="las la-desktop"></i>
                    </h1>

                    <h2 className="text-3xl text-stone-500">Buttons</h2>

                    {([
                      {
                        badgeTitle: "Fill Variant",
                        buttonProps: [
                          { theme: "primary" },
                          { theme: "secondary" },
                          { theme: "tertiary" },
                          { theme: "warning" },
                          { theme: "danger" },
                          { theme: "success" },
                          { theme: "info" },
                          { theme: "muted" },
                          { theme: "light" },
                        ],
                      },
                      {
                        badgeTitle: "Outline Variant",
                        buttonProps: [
                          { theme: "primary", mode: "outline" },
                          { theme: "secondary", mode: "outline" },
                          { theme: "tertiary", mode: "outline" },
                          { theme: "warning", mode: "outline" },
                          { theme: "danger", mode: "outline" },
                          { theme: "success", mode: "outline" },
                          { theme: "info", mode: "outline" },
                          { theme: "muted", mode: "outline" },
                          { theme: "light", mode: "outline" },
                        ],
                      },
                      {
                        badgeTitle: "Spinner Variant",
                        buttonProps: [
                          { theme: "primary", isBusy: true },
                          { theme: "secondary", isBusy: true, mode: "outline" },
                          { theme: "tertiary", isBusy: true },
                          { theme: "warning", isBusy: true, mode: "outline" },
                          { theme: "danger", isBusy: true },
                          { theme: "success", isBusy: true, mode: "outline" },
                          { theme: "info", isBusy: true },
                          { theme: "muted", isBusy: true, mode: "outline" },
                          { theme: "light", isBusy: true },
                        ],
                      },
                      {
                        badgeTitle: "With Icon Variant",
                        buttonProps: [
                          {
                            theme: "primary",
                            icon: "las la-music",
                            responsive: true,
                          },
                          {
                            theme: "secondary",
                            icon: "las la-play",
                            responsive: true,
                          },
                          {
                            theme: "tertiary",
                            icon: "las la-redo-alt",
                            responsive: true,
                          },
                          {
                            theme: "warning",
                            icon: "las la-volume-mute",
                            responsive: true,
                          },
                          {
                            theme: "danger",
                            icon: "las la-sync-alt",
                            responsive: true,
                          },
                          {
                            theme: "success",
                            icon: "las la-pause",
                            responsive: true,
                          },
                          {
                            theme: "info",
                            icon: "las la-video",
                            responsive: true,
                          },
                          {
                            theme: "muted",
                            icon: "las la-podcast",
                            responsive: true,
                          },
                          {
                            theme: "light",
                            icon: "las la-photo-video",
                            responsive: true,
                          },
                        ],
                      },
                      {
                        badgeTitle: "With Notifier",
                        buttonProps: [
                          {
                            theme: "primary",
                            icon: "las la-music",
                            responsive: true,
                            notifier: "danger"
                          },
                          {
                            theme: "secondary",
                            icon: "las la-play",
                            responsive: true,
                            notifier: "warning"
                          },
                          {
                            theme: "tertiary",
                            icon: "las la-play",
                            responsive: true,
                            notifier: "success"
                          },
                          {
                            theme: "warning",
                            icon: "las la-redo-alt",
                            responsive: true,
                            notifier: "muted"
                          },
                        ],
                      },
                    ] as {
                      badgeTitle: string;
                      buttonProps: ButtonProps[];
                    }[]).map((value, index) => (
                      <React.Fragment key={index}>
                        <div className="flex mt-5">
                          <div className="bg-stone-200 dark:bg-stone-500 px-2 rounded-full mb-5 text-center">
                            <p className="text-xs text-stone-500 dark:text-white">
                              {value.badgeTitle}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-5">
                          {value.buttonProps.map((v, i) => (
                            <Button
                              key={i}
                              className="capitalize"
                              {...(v as any)}
                            >
                              {v.theme}
                            </Button>
                          ))}
                        </div>
                      </React.Fragment>
                    ))}
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
