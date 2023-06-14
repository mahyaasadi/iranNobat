import React from "react";
// import {
//   QueryClient,
//   QueryClientProvider,
//   Hydrate,
// } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DashboardLayout from "pages/dashboardLayout";

export default function MyApp({ Component, pageProps }) {
  // const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
      {/* Provide the client to your App */}
      {/* <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}> */}
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
      {/* <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider> */}
    </>
  );
}
