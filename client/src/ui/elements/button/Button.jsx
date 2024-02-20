import styles from "./Button.module.css";
import { Link } from "react-router-dom";

function Button({ children, type, to, onClick, open }) {
  if (to) {
    return (
      <Link to={to} className={styles.navLink}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={styles[type]}
      onClick={onClick}
      style={
        open
          ? { color: "var(--color-body)" }
          : { color: "var(--color-footer-bg)" }
      }
    >
      {children}
    </button>
  );
}

export default Button;
