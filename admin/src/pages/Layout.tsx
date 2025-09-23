import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  return (
    <>
      <main className="flex-grow-1">
        <div className="row g-0">
          <div className="col-md-3 mx-0">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
