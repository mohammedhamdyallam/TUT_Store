// CSS
import "./globals.css";

// Fonts
import { Cairo } from "next/font/google";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

// Meta Data
export const metadata = {
  title: "TUT",
  description: "امتلكي الاناقة",
};

// Contexts
import { CartProvider } from "@/contexts/cartContext";

export default async function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-sans antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
