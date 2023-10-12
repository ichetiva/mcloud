import Registration from "../Registration";
import Login from "../Login";
import { Switch } from "../Switch";
import { Routes, Route, BrowserRouter } from "react-router-dom";

export const Auth = () => {
    return(
        <Routes>
        <Route path="/SignIn" element={<Login />} />
        <Route path="/SignUp" element={<Registration />} />
        </Routes>
    )     
}