import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <>
      <main className="flex-grow-1">
        <div className="row">
          <div className="col-md-2 mx-0">
            <Sidebar />
          </div>
          <div className="col-md-10 my-3">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
