import Registration from "../Registration";
import Login from "../Login";
import { Routes, Route } from "react-router-dom";

export const Auth = () => {
    return(
        <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/SignUp" element={<Registration />} />
        </Routes>
    )     
}