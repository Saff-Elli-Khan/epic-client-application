import { useMemo } from "react";
import { Helmet } from "react-helmet";

export interface HeadProps {
  title?: string;
}

export const Head: React.FC<HeadProps> = ({ title }) => {
  const Manifest = useMemo(
    () => ({
      short_name: "Loading...",
      name: "Loading...",
      description: "Loading...",
      start_url: window.location.origin,
      display: "standalone",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      icons: [
        {
          src: new URL(
            `/static/icons/maskable_icon.png`,
            window.location.origin
          ).toString(),
          type: "image/png",
          sizes: "48x48 72x72 96x96 128x128 144x144 192x192 384x384 512x512",
        },
      ],
    }),
    []
  );

  return (
    <Helmet>
      <base href="/" />

      {/* Application Title */}
      <title>{title ? `${title} | ${Manifest.name}` : Manifest.name}</title>

      {/* SEO */}
      <meta charSet="utf-8" />
      <meta name="color-scheme" content="light" />
      <meta name="theme-color" content={Manifest.theme_color} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta
        name="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <meta name="description" content={Manifest.description} />

      {/* Add to Homescreen for IOS */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content={Manifest.name} />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />

      {/* manifest.webmanifest provides metadata used when your web app is installed on a
        user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/ */}
      <link
        rel="manifest"
        href={URL.createObjectURL(
          new Blob([JSON.stringify(Manifest)], {
            type: "application/json",
          })
        )}
      />

      {/* Application Icons */}
      <link rel="shortcut icon" href={Manifest.icons[0].src} />
      <link rel="apple-touch-icon" href={Manifest.icons[0].src} />
    </Helmet>
  );
};
