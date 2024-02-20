import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import { GoChevronLeft, GoX, GoEye, GoEyeClosed } from "react-icons/go";

import Button from "../../ui/elements/button/Button.jsx";
import toast from "react-hot-toast";
import { useState } from "react";
import { EMAIL_REGEX } from "../../services/environment.js";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";
import { useAuthQueries } from "./useAuthQueries.js";
import { useLanguage } from "../../context/Language.jsx";

function Login({ onClose, authToggle }) {
  const { loginMutation } = useAuthQueries();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const [isNotForgotten, setIsNotForgotten] = useState(false);
  const [visible, setVisible] = useState(false);
  const { lang } = useLanguage();

  // SUBMITTING THE FORM
  async function onFormSubmit(loginData) {
    try {
      if (!isNotForgotten) {
        await loginMutation.mutateAsync(loginData);

        //login user
        // mutate(tempData, {
        //   onSuccess: () => {
        //     reset();
        //   },
        //   onSettled: (data) => {
        //     // always called after a successful or failed mutation
        //     // console.log(data);
        //   },
        // });

        ///////////////////////
        // registerUser(mockData, {
        //   onSuccess: (data) => {
        //     reset();
        //   },
        // });
        /////////////////
      } else {
        //send reset password email
      }
      onClose();
      reset();
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  //ERROR IN FORM
  function onErrorSubmit(errors) {
    console.log(errors);
    Object.keys(errors).forEach((error) => toast.error(errors[error].message));
  }

  //CHANGE TO FORGOTTEN PASSWORD
  function forgotten() {
    setIsNotForgotten((is) => !is);
  }

  function eyeHandler() {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }

  return (
    <>
      {loginMutation.isPending && <Spinner />}
      <div className={styles.container}>
        <div className={styles.closeBtn}>
          <button onClick={onClose} className={styles.closeIcon}>
            <GoX />
          </button>
        </div>
        <h2 className={styles.heading}>
          {isNotForgotten ? "Forgotten Password" : "Sign In"}
        </h2>

        <form
          onSubmit={handleSubmit(onFormSubmit, onErrorSubmit)}
          className={styles.form}
        >
          <input
            className={styles.input}
            type="text"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: EMAIL_REGEX,
                message: "Invalid email address",
              },
              maxLength: {
                value: 30,
                message: "Email can't be more than 30 characters long!",
              },
            })}
            placeholder={"Email"}
            autoComplete="email"
          />

          {!isNotForgotten && (
            <div className={styles.passContainer}>
              <input
                className={styles.input}
                type={visible ? "text" : "password"}
                id="password"
                {...register(
                  "password",
                  !isNotForgotten
                    ? {
                        required: "Password is required",
                        minLength: {
                          value: 3,
                          message:
                            "The password should be at least 3 characters long ",
                        },
                      }
                    : null
                )}
                placeholder={"Password"}
              />
              <div className={styles.passEyeBtn} onClick={eyeHandler}>
                {visible ? <GoEyeClosed /> : <GoEye />}
              </div>
            </div>
          )}
          <div className={styles.btnContainer}>
            {isNotForgotten && (
              <div className={styles.backBtn}>
                <div className={styles.arrow}>
                  <GoChevronLeft />
                </div>
                <button className={styles.backBtnElement} onClick={forgotten}>
                  {lang.back}
                </button>
              </div>
            )}
            <div style={{ marginLeft: "auto" }}>
              <Button type={"primary"}>
                {!isNotForgotten ? "Login" : "Send"}
              </Button>
            </div>
          </div>
        </form>

        {!isNotForgotten && (
          <div className={styles.authInfo}>
            <p>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => authToggle(false)}
                className={styles.authBtn}
              >
                Sign up!
              </button>
            </p>
            <p className={styles.forgotten}>
              <button onClick={forgotten}>Forgotten Password?</button>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
