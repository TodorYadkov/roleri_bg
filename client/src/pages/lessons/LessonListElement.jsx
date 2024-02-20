import { useLanguage } from "../../context/Language.jsx";
import { useTranslate } from "../../hooks/useTranslate.js";
import styles from "./LessonListElement.module.css";

function LessonListElement({ lm }) {
  const { lang } = useLanguage();
  const { translatePhrase: getCurrentLangHandler } = useTranslate();

  const properties = Object.keys({
    age: lm.age,
    skills: lm.skills,
    participants: lm.participants,
    type: lm.type,
    count: lm.count,
    location: lm.location,
  });

  // TODO - Create component for details on one lesson
  function lessonHandler() {
    console.log(lm._id);
  }

  return (
    <figure className={styles.figure} key={lm.id}>
      <div className={styles.imgContainer}>
        <a href="https://roleri.bg/course/advanced-group/">
          <img
            src={lm.imageUrl}
            className={styles.img}
            alt="Picture of inline skate lesson"
          />
        </a>
      </div>

      <div className={styles.content}>
        <h2 className={styles.heading}>
          {getCurrentLangHandler(lm.title)}
        </h2>
        <p className={styles.titleInfo}>
          <span className={styles.additional}>* </span>
          {getCurrentLangHandler(lm.titleInfo)}
        </p>

        <div className={styles.description}>

          {
            properties.map((prop, index) => (
              <div className={styles.line} key={index}>
                <span>{lang[prop]}: </span>
                {getCurrentLangHandler(lm[prop])}
              </div>
            ))
          }

          {/* <div className={styles.line}>
            <span>{lang.price}: </span>
            {getCurrentLangHandler(lm.price)}

          </div> */}
          <div className={styles.btnContainer}>
            <button className={styles.lessonBtn} onClick={lessonHandler}>{lang.more}</button>
          </div>
        </div>
      </div>
    </figure>
  );
}

export default LessonListElement;