import { FC } from "react";
import Loading from "../components/Loading";

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

    case booleans?.isError && rest?.error:
      const e = rest.error as Error;
      return <div className="basicBlackFullScreen">{e.message}</div>;

    case booleans?.isSuccess && !!rest.statusMessage:
      return <div>{rest.statusMessage}</div>;

    default:
      return <>{children}</>;
  }
};

export default ClientStatusWrapper;
