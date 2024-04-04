import { Link } from "react-router-dom";
import UserNameMenu from "./UserNameMenu";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import pakflag from "../assets/images/pak.png";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <span className="flex spax-x-2 items-center">
      {isAuthenticated ? (
        <>
          {" "}
          <Link to="/order-status" className="font-bold hover:text-orange-500">
            Order Status
          </Link>
          <UserNameMenu />
        </>
      ) : (
        <div className="flex items-center gap-4 ">
          <Link to="/" className="font-bold hover:text-orange-500">
            Donation
          </Link>
          <Link to="/" className="font-bold hover:text-orange-500">
            Offers
          </Link>
          <Link to="/" className="font-bold hover:text-orange-500">
            Become a partner
          </Link>
          <Link to="/" className="font-bold hover:text-orange-500">
            العربية
          </Link>
          <Link to="/" className="">
            <img src={pakflag} className="w-[35px]" alt="" />
          </Link>
          <Button
            variant="ghost"
            className="font-bold hover:text-orange-500 hover:bg-white "
            onClick={async () => await loginWithRedirect()}
          >
            Log in
          </Button>
        </div>
      )}
    </span>
  );
};

export default MainNav;
