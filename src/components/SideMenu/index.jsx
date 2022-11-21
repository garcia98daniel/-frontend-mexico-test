import React, { useState } from "react";
import Image from "next/image";

//components
import MenuOption from "../MenuOption/index";

//styles
import styles from "./styles.module.css";

function SideMenu(props) {

  return (
    <div className={styles.sideMenu}>
      <div className={styles.form_login_img}>
        <Image
          className={styles.form_login_img}
          src="/images/logo2.png"
          height={"57"}
          width={"224"}
          object-fit={"contain"}
        />
      </div>
      <div className={styles.hello_text}>
        <p>Hola</p>
        <h3>{"user name"}</h3>
      </div>
      <MenuOption
        iconName="shopping bag"
        text={"Reportes"}
        urlRoute="/reportes"
      />
      <MenuOption
        iconName="users"
        text={"Usuarios"}
        urlRoute="/usuarios"
      />
      <MenuOption
        iconName="cog"
        text={"Configuracion"}
        urlRoute="/configuracion"
      />
    </div>
  );
}

export default SideMenu;
