import { Link } from "react-router-dom";
import css from "./Navigation.module.css";

export const Navigation = () => {
  return (
    <div className={css.links}>
      <Link className={css.link} to="/">
        <div className={css.icon} id={css.homeButton}></div>
        <div className={css.content}>Home</div>
      </Link>
      <Link className={css.link} to="/search">
        <div className={css.icon} id={css.searchButton}></div>
        <div className={css.content}>Search</div>
      </Link>
    </div>
  );
};
