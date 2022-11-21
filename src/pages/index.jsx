import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';

//components
import { Button } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react'
//semantic ui
// import { Button, Icon, Transition} from "semantic-ui-react";
// import { motion } from "framer-motion";

//styles
import styles from "./styles.module.css";

//redux
// import { useDispatch, useSelector } from 'react-redux';
//actions
// import {loginShowHiddenModal} from "../redux/auth/login/actions";
function index(props) {
  return (
    <div className={styles.login_page}>
      <div className={styles.left_login}>
          <form action="" className={styles.form_login}>
            <div className={styles.form_login_img}>
              <Image 
              className={styles.form_login_img} 
              src="/images/logo1.png"
              height={"57"}
              width={"204"}
              object-fit= {"contain"}
              />
            </div>
            <h1 className={styles.form_login_tittle}>Inicia sesión</h1>
            <label>Usuario</label>
            <Input placeholder='Usuario' />
            <label>Contraseña</label>
            <Input
              type="password"
              placeholder='Contraseña'
              password
            />
            <div className={styles.form_btn_container}>
              <Button size='large' color='yellow' fluid>Iniciar sesión</Button>
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