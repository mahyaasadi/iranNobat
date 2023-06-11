import DashboardLayout from "pages/dashboardLayout";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    </>
  );
}
