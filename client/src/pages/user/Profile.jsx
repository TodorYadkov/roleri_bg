import styles from "./Profile.module.css";
import { Outlet } from "react-router-dom";

import AsideMenu from "../../ui/elements/asideMenu/AsideMenu.jsx";

function Profile() {

  return (
    <div className={styles.profileContent}>
      <section className={styles.section}>
        <Outlet />
      </section>

      <AsideMenu />
    </div>
  );
}

export default Profile;
