import styles from "./NavigationMenu.module.css";

import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

import { useTheme } from "../../context/DarkMode.jsx";
import { useLanguage } from "../../context/Language.jsx";

import { NavLink } from "react-router-dom";
import { useAuthQueries } from "../../pages/auth/useAuthQueries.js";
import { useAuthContext } from "../../context/AuthContext.jsx";

function NavigationMenu({ onLogin, isMobile = true, toggleMobile }) {
  const { isDark, themeToggle } = useTheme();
  const { lang, langChanger, toggle: language } = useLanguage();

  const { checkIsUserLoggedIn, getUserHandler } = useAuthContext();
  const { logoutMutation } = useAuthQueries();
  const user = getUserHandler();

  async function onLogout() {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      {/* next line is for keeping nav menu closed on initial render.
      If missing the menu will be permanently open */}
      {isMobile && (
        <div
          className={`${styles.menuPanel} ${isDark && styles.isMobileBorder}`}
        >
          <button onClick={langChanger} className={styles.lang}>
            {language ? (
              <img
                src={"/bulgaria_fluttering_flag_64.png"}
                alt="Bulgarian flag"
              />
            ) : (
              <img
                src={"/united_kingdom_fluttering_flag_64.png"}
                alt="UK flag"
              />
            )}
          </button>

          <ul className={styles.list}>
            <li className={styles.listItem}>
              <NavLink
                to={"home"}
                className={styles.link}
                onClick={toggleMobile}
              >
                {lang.home}
                <span className={styles.linkBorder}></span>
              </NavLink>
            </li>
            <li className={styles.listItem}>
              <NavLink
                to={"lessons"}
                className={styles.link}
                onClick={toggleMobile}
              >
                {lang.lessons}
                <span className={styles.linkBorder}></span>
              </NavLink>
            </li>

            {checkIsUserLoggedIn() ? (
              <>
                <li className={styles.listItem}>
                  <NavLink
                    to={"profile"}
                    className={styles.link}
                    onClick={toggleMobile}
                  >
                    {lang.profile}
                    <span className={styles.linkBorder}></span>
                  </NavLink>
                </li>
                <li className={styles.listItem}>
                  <NavLink onClick={onLogout} className={styles.link} to="">
                    {lang.logout}
                    <span className={styles.linkBorder}></span>
                  </NavLink>
                </li>
              </>
            ) : (
              <li className={styles.listItem}>
                <NavLink
                  onClick={() => {
                    onLogin();
                    if (!isMobile) toggleMobile();
                  }}
                  // className={styles.listItemBtn}
                  className={styles.link}
                  to=""
                >
                  {lang.login}
                  <span className={styles.linkBorder}></span>
                </NavLink>
              </li>
            )}

            <li className={`${styles.listItem} ${styles.themeChanger}`}>
              <div className={`${styles.listItemBtn}`}>
                <button className={`${styles.iconBtn}`} onClick={themeToggle}>
                  {isDark ? <IoSunnyOutline /> : <IoMoonOutline />}
                </button>
              </div>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default NavigationMenu;
