import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/style.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { store } from "./store";
import {
  ChakraProvider,
  createStandaloneToast,
  UseToastOptions,
} from "@chakra-ui/react";

const toast = createStandaloneToast();
const queryErrorHandler = (error: unknown) => {
  const obj: UseToastOptions = {
    ...(error instanceof Error
      ? { title: error.name, description: error.message }
      : { title: "error", description: "unknown" }),
    status: "error",
    duration: 9000,
    isClosable: true,
  };
  toast.closeAll();
  toast(obj);
};

const client = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => queryErrorHandler(error),
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
