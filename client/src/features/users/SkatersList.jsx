import styles from "./SkatersList.module.css";

import { useLanguage } from "../../context/Language.jsx";

import { useQuery } from "@tanstack/react-query";

import {
  LiaUserEditSolid,
  LiaTrashAlt,
  LiaGrin,
  LiaIdCard,
} from "react-icons/lia";
import { TbUserEdit } from "react-icons/tb";

// REMOVE THIS
function test() {
  return [
    {
      firstName: "Stamat",
      lastName: "Georgiev",
      gender: "male",
      age: 6,
      _id: 1,
      level: "advanced",
    },
    {
      firstName: "Dimitrinka",
      lastName: "Georgieva",
      gender: "femaile",
      age: 4,
      _id: 23,
      level: "basic",
    },
  ];
}
// END REMOVE

function SkatersList() {
  const { lang } = useLanguage();
  // TODO: Create HOOK
  const {
    isLoading,
    isError,
    error,
    data: skaters,
  } = useQuery({
    queryKey: ["news"],
    queryFn: test,
    // initialData: [],
  });

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>{lang.skaters}</h3>

      <div className={styles.skatersContainer}>
        {skaters &&
          skaters.map((skater) => (
            <figure className={styles.figure} key={skater._id}>
              <header className={styles.header}>
                <h3
                  className={styles.figureHeading}
                >{`${skater.firstName} ${skater.lastName}`}</h3>
                <div className={styles.actionContainer}>
                  <button className={styles.actionBtn}>
                    <LiaIdCard />
                  </button>
                  <button className={styles.actionBtn}>
                    <LiaUserEditSolid />
                  </button>
                  <button className={styles.actionBtn}>
                    <LiaTrashAlt />
                  </button>
                </div>
              </header>
              <div className={styles.content}>
                <p className={styles.element}>
                  <span className={styles.elSpan}>{lang.gender}: </span>
                  {skater.gender}
                </p>
                <p className={styles.element}>
                  <span className={styles.elSpan}>{lang.level}: </span>
                  {skater.level}
                </p>
                <p className={styles.element}>
                  <span className={styles.elSpan}>{lang.age}: </span>
                  {skater.age}
                </p>
              </div>
            </figure>
          ))}
      </div>

      <div className={styles.addSkaterBtnContainer}>
        <button className={styles.addBtn}>{lang.addSkater}</button>
      </div>

      <section className={styles.description}>
        <p className={styles.par}>
          Кънкьорите, които добавите и виждате тук ще са достъпни от страницата
          за записване на уроци. Необходимото оборудване ще е автоматично
          включено към избраната тренировка.
        </p>
        <p className={styles.par}>
          Имате възможност да прегледате и редактирате всеки един от кънкьорите
          в списъка.
        </p>
      </section>
    </div>
  );
}

export default SkatersList;
