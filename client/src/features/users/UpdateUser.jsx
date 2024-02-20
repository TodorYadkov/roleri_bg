import styles from "./UpdateUser.module.css";

import { useEffect, useState } from "react";
import { usePath } from "../../context/PathContext.jsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Input from "../../ui/elements/Input.jsx";
import { EMAIL_REGEX, PHONE_REGEX, SERVER_ENDPOINTS } from "../../services/environment.js";
import { useLanguage } from "../../context/Language.jsx";
import { toast } from "react-hot-toast";
import { get } from "../../api/api.js"

function UpdateUser() {
  const { path, newPath } = usePath();

  const { isLoading, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => get(SERVER_ENDPOINTS.GET_USER),
  });

  const { lang } = useLanguage();

  useEffect(() => newPath("edit"), [newPath]);

  // const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: data,
  });

  function onFormSubmit(data) {
    console.log(data);
  }

  function onErrorForm(error) {
    console.log(error);
    Object.entries(error).map((e) => {
      toast.error(e.at(1).message);
    });
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>{lang.update}</h3>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onFormSubmit, onErrorForm)}
      >
        <input
          disabled={isLoading}
          className={styles.input}
          type="text"
          id="firstName"
          {...register("firstName", {
            required: "First name is required",
            maxLength: {
              value: 30,
              message: "First name can't be more than 30 characters long!",
            },
          })}
          placeholder={"First name"}
          autoComplete="given-name"
        />
        <input
          disabled={isLoading}
          className={styles.input}
          type="text"
          id="lastName"
          {...register("lastName", {
            required: "Last name is required",
            maxLength: {
              value: 30,
              message: "Last name can't be more than 30 characters long!",
            },
          })}
          placeholder={"Last name"}
          autoComplete="family-name"
        />
        <input
          disabled={isLoading}
          className={styles.input}
          type="email"
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
        <input
          disabled={isLoading}
          className={styles.input}
          type="tel"
          id="phone"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: PHONE_REGEX,
              message: "Invalid phone number address",
            },
            maxLength: {
              value: 20,
              message: "Phone can't be more than 20 characters long!",
            },
          })}
          placeholder={"Phone number"}
          autoComplete="tel"
        />
        <button className={styles.updateBtn} disabled={isLoading}>
          {lang.send}
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;
