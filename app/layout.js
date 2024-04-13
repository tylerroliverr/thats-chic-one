import "./globals.css";
import Cursor from "./components/cursor";
import Script from "next/script";

export const metadata = {
  title: "That's Chic",
  description: "Testing Grounds",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Cursor/>
        {children}
        <Script defer src="https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></Script>
        <Script defer src="/js/script.js"></Script>
      </body>
    </html>
  );
}
