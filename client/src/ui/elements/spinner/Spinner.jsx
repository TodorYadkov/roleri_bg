// import Popup from "../popupModal/Popup.jsx";
import styles from "./Spinner.module.css";

function Spinner() {
  return (
    // <div style={{ zIndex: 999 }}>
    <div className={styles.spinnerBlock}>
      {/* <Popup noBackground={true}> */}
      <img src="/wheel2.png" alt="Loading image" className={styles.rotate} />
      {/* </Popup> */}
    </div>
  );
}

export default Spinner;
