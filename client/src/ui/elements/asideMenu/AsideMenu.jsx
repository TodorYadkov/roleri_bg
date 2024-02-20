import { NavLink } from "react-router-dom";
import styles from "./AsideMenu.module.css";
import { useLanguage } from "../../../context/Language.jsx";
import {
  PiUsersThin,
  PiCalendarBlankThin,
  PiNotePencilThin,
  PiUserListThin,
  PiCaretDoubleDownDuotone,
  PiCaretDoubleUpDuotone,
} from "react-icons/pi";

import { usePath } from "../../../context/PathContext.jsx";
import { useState } from "react";

function AsideMenu() {
  const { lang } = useLanguage();
  const { path } = usePath();
  const urlPath = path === "profile";
  const [isMobile, setIsMobile] = useState(true);

  const links = [
    {
      path: "skaters",
      label: lang.skaters,
      // icon: <PiUsersThin />,
    },
    {
      path: "history",
      label: lang.history,
      // icon: <PiCalendarBlankThin />,
    },
    {
      path: urlPath ? "edit" : "/profile",
      label: urlPath ? lang.edit : lang.profile,
      // icon: urlPath ? <PiNotePencilThin /> : <PiUserListThin />,
    },
  ];

  return (
    <aside className={styles.aside}>
      <button
        onClick={() => setIsMobile((x) => !x)}
        className={`${styles.mobileMenuBtn} ${
          isMobile ? styles.notClicked : styles.clicked
        }`}
      >
        {isMobile ? <PiCaretDoubleDownDuotone /> : <PiCaretDoubleUpDuotone />}
      </button>
      <nav className={`${styles.web} ${isMobile ? styles.mobile : ""}`}>
        <ul className={styles.list}>
          {links.map((link, i) => (
            <li className={styles.listItem} key={i}>
              <NavLink
                to={link.path}
                className={styles.profileLink}
                onClick={() => setIsMobile((x) => !x)}
              >
                <span className={styles.icon}>{link.icon}</span>
                <span className={styles.label}>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default AsideMenu;
