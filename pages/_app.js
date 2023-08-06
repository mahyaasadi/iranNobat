import React from "react";
import "public/assets/css/bootstrap.min.css";
import "public/assets/css/feathericon.min.css";
import "public/assets/plugins/fontawesome/css/fontawesome.min.css";
import "public/assets/plugins/fontawesome/css/all.min.css";
import "public/assets/css/font-awesome.min.css";
import "public/assets/css/style.css";
// import {
//   QueryClient,
//   QueryClientProvider,
//   Hydrate,
// } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DashboardLayout from "pages/dashboardLayout";

export default function MyApp({ Component, pageProps }) {
  // const queryClient = new QueryClient()
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
