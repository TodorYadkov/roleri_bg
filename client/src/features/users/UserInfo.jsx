import { useEffect } from "react";
import { usePath } from "../../context/PathContext.jsx";
import styles from "./UserInfo.module.css";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "../../context/Language.jsx";

function UserInfo() {
  const { path, newPath } = usePath();
  const { lang } = useLanguage();

  const {
    isLoading,
    data: lessons,
    error,
  } = useQuery({
    queryKey: ["signedLessons"],
    queryFn: () => null,
  });

  useEffect(() => newPath("profile"), [newPath]);
  console.log(lessons);
  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.heading}>{lang.dashboard}</h3>
        {lessons === null && <h3>You have no active lessons.</h3>}
        <p>
          Трябва да се зарежда информация дали има предстоящи записани уроци.
        </p>
      </div>
    </>
  );
}

export default UserInfo;
