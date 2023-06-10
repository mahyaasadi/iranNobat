// export default function MyApp({ Component, pageProps }) {
//     // Use the layout defined at the page level, if available
//     const getLayout = Component.getLayout || ((page) => page)

//     return getLayout(<Component {...pageProps} />)
//   }
import Dashboard from "pages/dashboard";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Dashboard>
        <Component {...pageProps} />
      </Dashboard>
    </>
  );
}
