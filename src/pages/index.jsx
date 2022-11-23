import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';

//components
import ModalAlert from "../components/ModalAlert/index";
import Alerts from "../components/Alerts/index";
import { Button } from 'semantic-ui-react';
import { 
  Input, 
  Form,
 } from 'semantic-ui-react'

//styles
import styles from "./styles.module.css";
//redux
import { useDispatch, useSelector } from "react-redux";

//actions
import {
  loginRequesting,
  loginChangeForm,
} from "../redux/auth/login/actions";

function Home() {
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
  const { alertModal } = useSelector((state) => state.generalsEffectsReducer);

  //------------------- this handle the inputs values--------------------//
  const handleChangeForm = (key, value) => {
    dispatch(loginChangeForm(key, value));
  };

  //------------------- this submit values--------------------//
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginRequesting(values));
  };

  //------------------- move to reportes page when user is logged --------------------//
  useEffect(() => {
    if(logged){
        router.push("/reportes")
    }
  },[logged])
  
  return (
    <div className={styles.login_page}>
      <div className={styles.left_login}>
          <Form onSubmit={(e) => handleLogin(e)} className={styles.form_login}>
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
            <Form.Field
            className={styles.login_inputs}
            label="Usuario"
            autocomplete="on"
            control={Input}
            placeholder="Usuario"
            iconPosition="left"
            value={values.email}
            onChange={(e) => handleChangeForm("user", e.target.value)}
            error={
              errors !== "" &&
              errors?.hasOwnProperty("user") && {
                content: errors.user,
              }
            }
          ></Form.Field>

            <Form.Field
            className={styles.login_inputs}
            label="Contraseña"
            labelPosition="left corner"
            type="password"
            placeholder="Contraseña"
            value={values.password}
            onChange={(e) => handleChangeForm("password", e.target.value)}
            control={Input}
            error={
              errors !== "" &&
              errors?.hasOwnProperty("password") && {
                content: errors.password,
              }
            }

            ></Form.Field>
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
          </Form>
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
      <ModalAlert
        show={alertModal.isOpen}
      >
        <Alerts/>
      </ModalAlert>
    </div>
  );
}

export default Home;