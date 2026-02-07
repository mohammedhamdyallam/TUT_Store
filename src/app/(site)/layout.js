// Comps
import Header from "@/comps/app-comps/header";
import Footer from "@/comps/app-comps/footer";

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
