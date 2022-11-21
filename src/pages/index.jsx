import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';

//components
import { Button } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react'

//styles
import styles from "./styles.module.css";
//redux
import { useDispatch, useSelector } from "react-redux";

//actions
import {
  loginRequesting,
  loginChangeForm,
} from "../redux/auth/login/actions";

function index(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    values,
    requesting,
    error,
    error: { errors },
    success,
  } = useSelector((state) => state.loginReducer);

  const {
    logged,
  } = useSelector((state) => state.clientReducer);

  const handleChangeForm = (key, value) => {
    dispatch(loginChangeForm(key, value));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginRequesting(values));
  };

  useEffect(() => {
    if(logged){
        router.push("/reportes")
    }
  },[logged])
  
  return (
    <div className={styles.login_page}>
      <div className={styles.left_login}>
          <form onSubmit={(e) => handleLogin(e)} className={styles.form_login}>
            <div className={styles.form_login_img}>
              <Image 
              className={styles.form_login_img} 
              src="/images/logo1.png"
              height={"57"}
              width={"204"}
              object-fit= {"contain"}
              />
            </div>
            <h1 className={styles.form_login_title}>Inicia sesión</h1>
            <label>Usuario</label>
            <Input placeholder='Usuario' 
            value={values.user}
            onChange={(e) => handleChangeForm("user", e.target.value)}
            error={
              errors !== "" &&
              errors?.hasOwnProperty("user") && {
                content: errors.email,
              }

            }
            />
            <label>Contraseña</label>
            <Input
              type="password"
              placeholder='Contraseña'
              password={values.password}
              onChange={(e) => handleChangeForm("password", e.target.value)}
              error={
                errors !== "" &&
                errors?.hasOwnProperty("password") && {
                  content: errors.password,
                }
              }
            />
            {error?.message === "The given data was invalid." && (
              <p className={styles.errors}>
                Correo o contraseña inválida.
              </p>
            )}

            {error?.message === "Correo o contraseña inválida" && (
              <p className={styles.errors}>
                {error?.message}
              </p>
            )}

            {error?.email_confirmed && (
              <p className={styles.errors}>
                {error?.email_confirmed}
              </p>
            )}
            <div className={styles.form_btn_container}>
              <Button loading={requesting} type="submit" size='large' color='yellow' fluid>Iniciar sesión</Button>
            </div>
          </form>
      </div>
      <div className={styles.right_login}>
      <Image 
              className={styles.form_login_img} 
              src="/images/loginpicture.png"
              height={"500"}
              width={"500"}
              object-fit= {"contain"}
              />
      </div>
    </div>
  );
}

export default index;