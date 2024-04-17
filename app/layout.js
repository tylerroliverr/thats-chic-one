import "./globals.css";
import Cursor from "./components/cursor";
import Script from "next/script";
import SmoothScrolling from "./components/smoothScrolling";

export const metadata = {
  title: "That's Chic",
  description: "Testing Grounds",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Cursor/>
        <SmoothScrolling>
        {children}
        </SmoothScrolling>
        <Script defer src="/js/script.js"></Script>
      </body>
    </html>
  );
}
