import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Badge, BadgeProps } from "./components/ui/badge/badge";
import { Button, ButtonProps } from "./components/ui/button/button";
import { Chip, ChipProps } from "./components/ui/chip/chip";
import { Fab } from "./components/ui/fab/fab";
import { Input, InputProps } from "./components/ui/input/input";
import { ScrollToTop } from "./components/utils/scrollToTop";
import { PageLayout } from "./layouts/page";
import { ErrorPage } from "./pages/error";

export const AppRoutes: React.FC = () => {
  const [ToggleMode, setToggleMode] = useState<"dark" | "light">("light");

  const FabContent = [
    {
      href: "#",
      icon: "lab la-twitter",
    },
    {
      href: "#",
      icon: "lab la-twitch",
    },
    {
      href: "#",
      icon: "lab la-facebook",
    },
  ];

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
                      <i className="las la-desktop"></i>{" "}
                      <span className="text-xs font-light text-stone-500">
                        v1.0
                      </span>
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
                          {
                            theme: "secondary",
                            isBusy: true,
                            mode: "outline",
                          },
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
                        badgeTitle: "Flat With Notifier",
                        buttonProps: [
                          {
                            className: "rounded-none",
                            theme: "primary",
                            icon: "las la-music",
                            responsive: true,
                            notifier: (
                              <div className="absolute -top-1.5 ltr:-right-1.5 rtl:-left-1.5">
                                <Badge theme="warning" />
                              </div>
                            ),
                          },
                          {
                            className: "rounded-none",
                            theme: "secondary",
                            icon: "las la-play",
                            responsive: true,
                            notifier: (
                              <div className="absolute -top-1.5 ltr:-right-1.5 rtl:-left-1.5">
                                <Badge theme="danger">
                                  <p className="text-xs">35</p>
                                </Badge>
                              </div>
                            ),
                          },
                          {
                            className: "rounded-none",
                            theme: "tertiary",
                            icon: "las la-play",
                            responsive: true,
                            notifier: (
                              <div className="absolute -top-1.5 ltr:-right-1.5 rtl:-left-1.5">
                                <Badge theme="success" />
                              </div>
                            ),
                          },
                          {
                            className: "rounded-none",
                            theme: "warning",
                            icon: "las la-redo-alt",
                            responsive: true,
                            notifier: (
                              <div className="absolute -top-1.5 ltr:-right-1.5 rtl:-left-1.5">
                                <Badge theme="muted">
                                  <p className="text-xs">1035</p>
                                </Badge>
                              </div>
                            ),
                          },
                        ],
                      },
                      {
                        badgeTitle: "Rounded",
                        buttonProps: [
                          {
                            theme: "primary",
                            icon: "las la-music",
                            responsive: true,
                            rounded: true,
                          },
                          {
                            theme: "secondary",
                            icon: "las la-play",
                            responsive: true,
                            rounded: true,
                          },
                          {
                            theme: "tertiary",
                            icon: "las la-play",
                            responsive: true,
                            rounded: true,
                          },
                          {
                            theme: "warning",
                            icon: "las la-redo-alt",
                            responsive: true,
                            rounded: true,
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
                        <div className="flex flex-wrap items-center gap-5">
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

                  <h2 className="text-3xl text-stone-500 my-5">Chips</h2>

                  {([
                    {
                      badgeTitle: "Transparent Variant",
                      chipProps: [
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
                      chipProps: [
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
                      badgeTitle: "Icon Variant",
                      chipProps: [
                        {
                          theme: "primary",
                          icon: "las la-map-pin",
                          cancelable: true,
                        },
                        {
                          theme: "secondary",
                          icon: "las la-map-pin",
                          cancelable: true,
                        },
                        {
                          theme: "tertiary",
                          icon: "las la-map-pin",
                          cancelable: true,
                        },
                        {
                          theme: "warning",
                          icon: "las la-map-pin",
                          cancelable: true,
                        },
                        {
                          theme: "danger",
                          icon: "las la-map-pin",
                          cancelable: true,
                        },
                        {
                          theme: "success",
                          icon: "las la-map-pin",
                          cancelable: true,
                        },
                        {
                          theme: "info",
                          icon: "las la-map-pin",
                          cancelable: true,
                        },
                        {
                          theme: "muted",
                          icon: "las la-map-pin",
                          cancelable: true,
                        },
                        {
                          theme: "light",
                          icon: "las la-map-pin",
                          cancelable: true,
                        },
                      ],
                    },
                  ] as {
                    badgeTitle: string;
                    chipProps: ChipProps[];
                  }[]).map((value, index) => (
                    <React.Fragment key={index}>
                      <div className="flex mt-5">
                        <div className="bg-stone-200 dark:bg-stone-500 px-2 rounded-full mb-5 text-center">
                          <p className="text-xs text-stone-500 dark:text-white">
                            {value.badgeTitle}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-5">
                        {value.chipProps.map((v, i) => (
                          <Chip key={i} className="capitalize" {...v}>
                            {v.theme}
                          </Chip>
                        ))}
                      </div>
                    </React.Fragment>
                  ))}

                  <h2 className="text-3xl text-stone-500 my-5">Badges</h2>

                  {([
                    {
                      badgeTitle: "Fill Variant",
                      badgeProps: [
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
                      badgeProps: [
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
                      badgeTitle: "Transparent Variant",
                      badgeProps: [
                        { theme: "primary", mode: "transparent" },
                        { theme: "secondary", mode: "transparent" },
                        { theme: "tertiary", mode: "transparent" },
                        { theme: "warning", mode: "transparent" },
                        { theme: "danger", mode: "transparent" },
                        { theme: "success", mode: "transparent" },
                        { theme: "info", mode: "transparent" },
                        { theme: "muted", mode: "transparent" },
                        { theme: "light", mode: "transparent" },
                      ],
                    },
                    {
                      badgeTitle: "With Number",
                      badgeProps: [
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
                      badgeTitle: "Empty Badge",
                      badgeProps: [
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
                  ] as {
                    badgeTitle: string;
                    badgeProps: BadgeProps[];
                  }[]).map((value, index) => (
                    <React.Fragment key={index}>
                      <div className="flex mt-5">
                        <div className="bg-stone-200 dark:bg-stone-500 px-2 rounded-full mb-5 text-center">
                          <p className="text-xs text-stone-500 dark:text-white">
                            {value.badgeTitle}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-5">
                        {value.badgeProps.map((v, i) => (
                          <Badge key={i} className="capitalize" {...v}>
                            {index !== 4 ? (
                              <p className="text-xs">
                                {index === 3
                                  ? Math.round(14 * Math.random())
                                  : v.theme}
                              </p>
                            ) : null}
                          </Badge>
                        ))}
                      </div>
                    </React.Fragment>
                  ))}

                  <h2 className="text-3xl text-stone-500 my-5">FAB's</h2>

                  <div className="relative h-[500px] mt-60">
                    <div className="flex flex-wrap items-center gap-5">
                      <Fab
                        theme="primary"
                        containerClassName="absolute top-0 left-0"
                        rotation="0"
                        isOpen
                        content={FabContent}
                      />
                      <Fab
                        theme="secondary"
                        containerClassName="absolute top-0 right-0"
                        rotation="-45"
                        isOpen
                        content={FabContent}
                      />
                      <Fab
                        theme="success"
                        mode="outline"
                        containerClassName="absolute top-20 left-0"
                        rotation="90"
                        content={FabContent}
                      />
                      <Fab
                        theme="danger"
                        containerClassName="absolute bottom-40 left-0"
                        rotation="45"
                        content={FabContent}
                      />
                      <Fab
                        theme="info"
                        mode="outline"
                        containerClassName="absolute bottom-60 right-0"
                        rotation="180"
                        content={FabContent}
                      />
                    </div>
                  </div>

                  <h2 className="text-3xl text-stone-500 my-5">Inputs</h2>

                  {([
                    {
                      badgeTitle: "Transparent Variant With IconButtons",
                      inputProps: [
                        {
                          type: "password",
                          theme: "primary",
                          placeholder: "Type your password",
                        },
                        {
                          left: () => (
                            <i className="las la-podcast text-secondary-500"></i>
                          ),
                          theme: "secondary",
                          placeholder: "Enter your text...",
                        },
                        {
                          theme: "tertiary",
                          placeholder: "Search your text...",
                          type: "search",
                        },
                        {
                          theme: "warning",
                          placeholder: "Enter your text...",
                          right: () => (
                            <i className="las la-podcast text-warning-500"></i>
                          ),
                        },
                        {
                          theme: "danger",
                          placeholder: "Enter your text...",
                          right: () => (
                            <i className="las la-angle-down text-danger-500"></i>
                          ),
                        },
                        {
                          theme: "success",
                          placeholder: "Enter your text...",
                          left: () => (
                            <i className="las la-money-check text-success-500"></i>
                          ),
                          right: () => (
                            <i className="las la-check text-success-500"></i>
                          ),
                        },
                        {
                          theme: "info",
                          placeholder: "Enter your text and press to copy",
                          right: () => (
                            <i className="las la-clipboard-list text-info-500"></i>
                          ),
                        },
                        {
                          type: "search",
                          theme: "muted",
                          placeholder: "Enter your text...",
                          isBusy: true,
                        },
                        {
                          type: "search",
                          theme: "light",
                          placeholder: "Enter your text...",
                          isBusy: true,
                        },
                      ],
                    },
                    {
                      badgeTitle: "Transparent Variant",
                      inputProps: [
                        {
                          theme: "primary",
                          placeholder: "Enter your text...",
                          message: "Primary: this is a primary input",
                        },
                        {
                          theme: "secondary",
                          placeholder: "Enter your text...",
                          message: "Secondary: this is a secondary input",
                        },
                        {
                          theme: "tertiary",
                          placeholder: "Search your text...",
                          type: "search",
                          message: "Tertiary: This is a tertiary input.",
                        },
                        {
                          theme: "warning",
                          placeholder: "Enter your text...",
                          message: "Warning: you can't add your own props!",
                        },
                        {
                          theme: "danger",
                          placeholder: "Enter your text...",
                          message: "Danger: we have an issue!",
                        },
                        {
                          theme: "success",
                          placeholder: "Enter your text...",
                          message: "Success: your request has been finished!",
                        },
                        {
                          theme: "info",
                          placeholder: "Enter your text...",
                          message: "Info: this is a info input.",
                        },
                        {
                          theme: "muted",
                          placeholder: "Enter your text...",
                          message: "Muted: this is a muted input",
                        },
                        {
                          theme: "light",
                          placeholder: "Enter your text...",
                          message: "Light: this is a light input",
                        },
                      ],
                    },
                    {
                      badgeTitle: "Outline Variant",
                      inputProps: [
                        {
                          theme: "primary",
                          placeholder: "Enter your text...",
                          mode: "outline",
                          message: "Primary: this is a primary input",
                        },
                        {
                          theme: "secondary",
                          placeholder: "Enter your text...",
                          mode: "outline",
                          message: "Secondary: this is a secondary input",
                        },
                        {
                          theme: "tertiary",
                          placeholder: "Search your text...",
                          mode: "outline",
                          type: "search",
                          message: "Tertiary: This is a tertiary input.",
                        },
                        {
                          theme: "warning",
                          placeholder: "Enter your text...",
                          mode: "outline",
                          message: "Warning: you can't add your own props!",
                        },
                        {
                          theme: "danger",
                          placeholder: "Enter your text...",
                          mode: "outline",
                          message: "Danger: we have an issue!",
                        },
                        {
                          theme: "success",
                          placeholder: "Enter your text...",
                          mode: "outline",
                          message: "Success: your request has been finished!",
                        },
                        {
                          theme: "info",
                          placeholder: "Enter your text...",
                          mode: "outline",
                          message: "Info: this is a info input.",
                        },
                        {
                          theme: "muted",
                          placeholder: "Enter your text...",
                          mode: "outline",
                          message: "Muted: this is a muted input",
                        },
                        {
                          theme: "light",
                          placeholder: "Enter your text...",
                          mode: "outline",
                          message: "Light: this is a light input",
                        },
                      ],
                    },
                  ] as {
                    badgeTitle: string;
                    inputProps: InputProps[];
                  }[]).map((value, index) => (
                    <React.Fragment key={index}>
                      <div className="flex mt-5">
                        <div className="bg-stone-200 dark:bg-stone-500 px-2 rounded-full mb-5 text-center">
                          <p className="text-xs text-stone-500 dark:text-white">
                            {value.badgeTitle}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-5">
                        {value.inputProps.map((v, i) => (
                          <Input key={i} {...v} />
                        ))}
                      </div>
                    </React.Fragment>
                  ))}
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
