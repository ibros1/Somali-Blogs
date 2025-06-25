import { Outlet } from "react-router-dom";
import Header from "../components/header";

const MainRoute = () => {
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainRoute;
