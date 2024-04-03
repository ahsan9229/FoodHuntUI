import { Link } from "react-router-dom";
import UserNameMenu from "./UserNameMenu";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

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
        <Button
          variant="ghost"
          className="font-bold hover:text-orange-500 hover:bg-white "
          onClick={async () => await loginWithRedirect()}
        >
          Log in
        </Button>
      )}
    </span>
  );
};

export default MainNav;
