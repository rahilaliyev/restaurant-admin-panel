import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: false,
      retryOnMount: false,
      retryDelay: 0,
    },
  },
});

root.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
