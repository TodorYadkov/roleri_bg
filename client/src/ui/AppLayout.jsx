import styles from "./AppLayout.module.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import { useToggleModal } from "../hooks/useToggleModal.js";

import Navigation from "./navigation/Navigation.jsx";
import Footer from "./footer/Footer.jsx";
import Login from "../pages/auth/Login.jsx";
import Popup from "./elements/popupModal/Popup.jsx";
import Register from "../pages/auth/Register.jsx";

function AppLayout() {
  const [background, toggle] = useToggleModal();
  const [authToggle, setAuthToggle] = useState(true);

  return (
    <>
      <Navigation onLogin={toggle} />
      <main className={styles.main}>
        {background && (
          <Popup onClose={toggle} backgroundClick={false}>
            {authToggle ? (
              <Login onClose={toggle} authToggle={setAuthToggle} />
            ) : (
              <Register onClose={toggle} authToggle={setAuthToggle} />
            )}
          </Popup>
        )}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
