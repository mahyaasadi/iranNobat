import React from "react";
import "public/assets/css/bootstrap.min.css";
import "public/assets/css/feathericon.min.css";
import "public/assets/plugins/fontawesome/css/fontawesome.min.css";
import "public/assets/plugins/fontawesome/css/all.min.css";
import "public/assets/css/font-awesome.min.css";
import "public/assets/css/style.css";
import DashboardLayout from "pages/dashboardLayout";
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from "react-query";
// const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <PrimeReactProvider>
        <DashboardLayout
          Menus={pageProps.Menus}
          UserData={pageProps.UserData}
          UserRoles={pageProps.UserRoles}
        >
          <Component {...pageProps} />
        </DashboardLayout>
      </PrimeReactProvider>

      {/* <QueryClientProvider client={queryClient}> */}
      {/* </QueryClientProvider> */}
    </>
  );
}
