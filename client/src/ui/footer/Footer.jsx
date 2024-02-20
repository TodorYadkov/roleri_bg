import styles from "./Footer.module.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className={styles.footer}>
      <div>Copyrights &copy; - {year}</div>
      <div className={styles.company}>
        <p className={styles.smallest}>Yuchormanski & Yadkov for</p>
        <p className={styles.title}>
          <span>BELEV</span>STUDIO
        </p>
      </div>
    </div>
  );
}

export default Footer;
