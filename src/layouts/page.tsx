import { Outlet } from "react-router-dom";
import { Head } from "../components/core/head";
import { Translate } from "../hooks/translator";

export interface PageLayoutProps {
  title?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <Translate
      string={title || ""}
      template={(title) => (
        <>
          <Head title={title} />
          {children}
          <Outlet />
        </>
      )}
    />
  );
};
