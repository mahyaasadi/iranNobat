import Script from "next/script";
const Footer = () => {
  return (
    <>
      <Script
        src="assets/js/jquery-3.2.1.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="assets/js/jquery.slimscroll.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="assets/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />
      <Script src="assets/js/script.js" strategy="afterInteractive" />
    </>
  );
};

export default Footer;
