import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
export default function AnalyticsLayout() {
  return (
    <>
      <Analytics />
      <GoogleAnalytics gaId="G-ME5NWYCVF9" />
    </>
  );
}
