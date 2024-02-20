import styles from "./Navigation.module.css";
import { useState } from "react";
import { VscMenu, VscClose } from "react-icons/vsc";

import Button from "../elements/button/Button.jsx";
import NavigationMenu from "./NavigationMenu.jsx";
import { useTheme } from "../../context/DarkMode.jsx";

function Navigation({ onLogin }) {
  const [isMobile, setIsMobile] = useState(false);
  const { isDark } = useTheme();

  const src = isDark
    ? "/vertigoschool_logo_dark.webp"
    : "/vertigoschool_logo_top-1.png";

  function toggleMobile() {
    setIsMobile((isMobile) => !isMobile);
  }
  return (
    <div className={styles.wrapper}>
      <Button to={"/"}>
        <div className={styles.logo}>
          <img
            style={isDark ? { opacity: "0.8" } : null}
            src={src}
            alt="Училище за кънки Вертиго"
          />
        </div>
      </Button>

      <nav className={styles.nav}>
        <NavigationMenu onLogin={onLogin} />
      </nav>

      <nav className={styles.mobileNav}>
        <div className={styles.mobileBtn}>
          <button
            onClick={toggleMobile}
            className={
              isMobile
                ? `${styles.menuBtn} ${styles.openedMenuBtn}`
                : styles.menuBtn
            }
            open={isMobile}
          >
            {isMobile ? <VscClose /> : <VscMenu />}
          </button>
        </div>
        <NavigationMenu
          onLogin={onLogin}
          isMobile={isMobile}
          toggleMobile={toggleMobile}
        />
      </nav>
    </div>
  );
}

export default Navigation;
