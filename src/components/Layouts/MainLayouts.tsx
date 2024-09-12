import Footer from "@/pages/shared/Footer";
import Navbar from "@/pages/shared/Navbar";
import PageReloadWarning from "@/utils/PageReloadWarning";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <PageReloadWarning />
      <Navbar />
      <Outlet ></Outlet>
      <Footer></Footer>
    </>
  );
};
export default MainLayout;
