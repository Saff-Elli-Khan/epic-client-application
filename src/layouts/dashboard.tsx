import { Outlet } from "react-router-dom";
import { Head } from "../components/core/head";
import { Translate } from "../hooks/translator";

export interface DashboardLayoutProps {
  title?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  title,
  children,
}) => {
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
