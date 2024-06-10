import React from "react";
import Routering from "./routes";
import UserService from "../services/userService";

const userService = new UserService()

const ProtectedRoute = ({children}) => {
  const authenticatedUser = userService.authenticatedUser();
  return authenticatedUser ? children : <Routering/>;
}
 
export default ProtectedRoute;