import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getLocalStorage,
  removeLocalStorage,
} from "../components/shared/localStorage/LocalStorage";
import { useGetMeQuery } from "../redux/storeApis";
import { Config } from "../constants/Index";

const useAuthCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = getLocalStorage(Config.userToken);
  const [currentRole, setCurrentRole] = useState<string | null>(null);

  const {
    data: me,
    error,
    isLoading,
  } = useGetMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!token) {
        setCurrentRole(Config.newUser);
        navigate("/login", { replace: true });
      } else if (me) {
        setCurrentRole(me.is_super === "0" ? Config.admin: Config.superAdmin);
      } else if (error) {
        removeLocalStorage(Config.userToken);
        setCurrentRole(Config.newUser);
        navigate("/login", {
          state: { from: location.pathname },
          replace: true,
        });
      }
    }
  }, [token, me, error, navigate, location, isLoading]);

  return { currentRole, isLoading };
};

export default useAuthCheck;
