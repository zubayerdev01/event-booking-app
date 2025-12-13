import { AuthContext } from "@/app/contexts";
import { useContext } from "react";

const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  return { auth, setAuth };
};

export { useAuth };
