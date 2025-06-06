import Footer from "@/pages/shared/Footer";
import Navbar from "@/pages/shared/Navbar";
import TopNavbar from "@/pages/shared/TopNavbar";
import PageReloadWarning from "@/utils/PageReloadWarning";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <PageReloadWarning />
      <TopNavbar />
      <Navbar />
      <Outlet ></Outlet>
      <Footer></Footer>
    </>
  );
};
export default MainLayout;
