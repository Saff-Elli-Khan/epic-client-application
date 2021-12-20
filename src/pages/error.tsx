import { FC } from "react";
import { Translate } from "../hooks/translator";

export interface ErrorPageProps {}

export const ErrorPage: FC<ErrorPageProps> = () => {
  return (
    <div>
      <h1>
        <Translate string={"Not Found!"} />
      </h1>
      <p>
        <Translate
          string={"We didn't found the route you are trying to access!"}
        />
      </p>
    </div>
  );
};
