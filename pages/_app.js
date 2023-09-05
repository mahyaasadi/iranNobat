import React from "react";
import "public/assets/css/bootstrap.min.css";
import "public/assets/css/feathericon.min.css";
import "public/assets/plugins/fontawesome/css/fontawesome.min.css";
import "public/assets/plugins/fontawesome/css/all.min.css";
import "public/assets/css/font-awesome.min.css";
import "public/assets/css/style.css";
import DashboardLayout from "pages/dashboardLayout";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Provide the client to your App */}
      <QueryClientProvider client={queryClient}>
        <DashboardLayout Menus={pageProps.Menus}>
          <Component {...pageProps} />
        </DashboardLayout>
      </QueryClientProvider>
    </>
  );
}


