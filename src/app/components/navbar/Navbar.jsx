import { Link, useLocation } from "react-router-dom";
import { routesPath } from "../../routes/RouteConstants";

function Navbar() {
  const location = useLocation();

  const linkStyle =
    "transition-all hover:text-[#FFF] border-r-[1px] border-[#1E2D3D] h-[55px] flex items-center justify-center text-center px-[32px] cursor-pointer";
  const activeLinkStyle =
    "transition-all text-[#FFF] border-r-[1px] border-[#1E2D3D] h-[55px] flex items-center justify-center text-center px-[32px] cursor-pointer relative after:absolute after:bottom-[-2px] after:h-[3px] after:w-[100%] after:bg-[#FEA55F]";

  const getLinkClass = (route) =>
    location.pathname === route ? activeLinkStyle : linkStyle;

  return (
    <div className="flex items-center justify-between border-b-[1px] border-b-[#1E2D3D] w-full">
      <div className="flex items-center">
        <span className=" flex items-center gap-[8px] px-[22px] py-[17px] lg:w-[300px]">
          {/* <img
            src="./profile80px.png"
            className="h-[28px] rounded-[4px]"
            alt="profile"
          /> */}
          ubaidullah-omer
        </span>
        <div className="flex items-center max-lg:hidden">
          <Link
            to={routesPath.home}
            className={"border-l-[1px] " + getLinkClass(routesPath.home)}
          >
            _hello
          </Link>
          <Link
            to={routesPath.about}
            className={getLinkClass(routesPath.about)}
          >
            _about-me
          </Link>
          <Link
            to={routesPath.projects}
            className={getLinkClass(routesPath.projects)}
          >
            _projects
          </Link>
        </div>
      </div>
      <i className="ri-menu-line text-[20px] lg:hidden px-[16px]"></i>
      <Link
        to={routesPath.contact}
        className={
          "max-lg:hidden border-r-[0px] border-l-[1px] " +
          getLinkClass(routesPath.contact)
        }
      >
        _contact-me
      </Link>
    </div>
  );
}

export default Navbar;
