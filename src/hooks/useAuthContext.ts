import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuthContext(){
  const authAttributes = useContext(AuthContext)

  return authAttributes
}