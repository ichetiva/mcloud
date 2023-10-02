import css from "./ProfileNav.css";
import { Link } from "react-router-dom";


export const ProfileNav = () => {
  return (
    <div>
    <div className={css.links}>
      <Link className={css.link} to="SignIn">
        <div className={css.content}>SignIn</div>
      </Link>
      <Link className={css.link} to="/SignUp">
        <div className={css.content}>SignUps</div>
      </Link>
    </div>
    </div>
  );
};