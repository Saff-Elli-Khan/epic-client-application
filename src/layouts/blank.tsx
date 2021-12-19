import { Head } from "../components/core/head";
import { Translate } from "../hooks/translator";

export interface BlankLayoutProps {
  title?: string;
}

export const BlankLayout: React.FC<BlankLayoutProps> = ({
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
        </>
      )}
    />
  );
};
