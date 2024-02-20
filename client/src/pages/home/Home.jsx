import toast from "react-hot-toast";

import styles from "./Home.module.css";
import { FaRegFolderOpen } from "react-icons/fa";

import { useLanguage } from "../../context/Language.jsx";
// import { useGetAllNewsQueries } from "./useGetAllNewsQueries.js";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";

const mockedData = [
  {
    _id: "65d3bcac57b2d215f59e582a",
    title: "Уроци в зала",
    date: "31/10/2023",
    newsUrl: "https://roleri.bg/lessons-in-hall-23-24/",
    content:
      "Уроците в парка приключиха, но от първата неделя на ноември (05.11) продължаваме в зала. А тя се намира на бул. Черни връх 47, ет. 2 (бивш завод Витоша) входа е до Lidl. Заниманията отново ще са в неделя от 10:00 часа и от 11:00 часа. През формата за записване може да заявите участие.",
    imageUrl:
      "https://roleri.bg/wp-content/uploads/2023/10/lessons_hall_23-24-300x300.png",
    __v: 0,
  },
  {
    _id: "65d3bcac57b2d215f59e582b",
    title: "Отменен урок 16 Септември",
    date: "16/09/2023",
    newsUrl: "https://roleri.bg/cancel-16-sep/",
    content: "За съжаление, днешния урок се отменя поради неподходящи условия.",
    imageUrl:
      "https://roleri.bg/wp-content/uploads/2019/07/wether_14-1-300x300.png",
    __v: 0,
  },
];

function Home() {
  const { lang } = useLanguage();

  // TODO: Disabled during vercel deploy
  //   const { isLoading, isError, error, data: news } = useGetAllNewsQueries();
  //   disable next on release
  const [isError, isLoading, error] = [false, false, false];

  if (isError) {
    toast.error(error.message);
  }

  return (
    <>
      <h1 className={styles.heading}>{lang.home}</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className={styles.news}>
          {/* {news.map((n) => ( */}
          {mockedData.map((n) => (
            <article key={n._id} className={styles.article}>
              <div className={styles.articleHeader}>
                <div className={styles.imageWrapper}>
                  <img src={n.imageUrl} alt={n.title} />
                </div>
                <h2 className={styles.articleTitle}>
                  {n.title}
                  <span>
                    <FaRegFolderOpen /> {n.date}
                  </span>
                </h2>
              </div>
              <div className={styles.articleBody}>
                <p>{n.content}</p>
                <a
                  href={n.newsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkPrimary}
                >
                  {lang.details}
                </a>
              </div>
            </article>
          ))}
        </section>
      )}
    </>
  );
}

export default Home;
