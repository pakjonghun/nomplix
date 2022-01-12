import { FC } from "react";
import FullScreen from "./FullScreen";
import Loading from "./Loading";

type TypeUseClientStatusWrapper = {
  booleans: {
    isLoading: boolean;
    isError?: boolean;
    isSuccess?: boolean;
  };
  rest: {
    statusMessage?: string;
    error?: unknown | null;
  };
};

const ClientStatusWrapper: FC<TypeUseClientStatusWrapper> = ({
  booleans,
  rest,
  children,
}) => {
  switch (true) {
    case booleans.isLoading:
      return <Loading />;

    case booleans?.isError && !!rest?.error:
      const e = rest.error as Error;
      return (
        <div className="basicBlackFullScreen">
          <h1 className="w-2/3">{e.message}</h1>
        </div>
      );

    case booleans?.isSuccess === false:
      return <FullScreen content={rest.statusMessage || "Unknown Error"} />;

    default:
      return <>{children}</>;
  }
};

export default ClientStatusWrapper;
