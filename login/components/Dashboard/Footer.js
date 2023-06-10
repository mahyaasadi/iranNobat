import Script from "next/script";

const Footer = () => {
  return (
    <>
      <Script
        src="/assets/js/jquery-3.6.0.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="/assets/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/plugins/slimscroll/jquery.slimscroll.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/plugins/raphael/raphael.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/plugins/morris/morris.min.js"
        strategy="afterInteractive"
      />
      <Script src="/assets/js/chart.morris.js" strategy="afterInteractive" />
      <Script src="/assets/js/script.js" strategy="afterInteractive" />
    </>
  );
};

export default Footer;
