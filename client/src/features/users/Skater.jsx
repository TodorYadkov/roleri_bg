import { useLanguage } from "../../context/Language.jsx";
import styles from "./Skater.module.css";

function Skater() {
  const { lang } = useLanguage();

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>{lang.skater}</h3>
    </div>
  );
}

export default Skater;
