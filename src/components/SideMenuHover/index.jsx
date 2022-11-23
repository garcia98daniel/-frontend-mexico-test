import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from 'next/link';

//components

//actions
import {
  menuSideOption
} from "../../redux/generalsEffects/actions";

//styles
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";

import { useVerifyUserRole } from "../../hooks/useVerifyUserRole";
import { Icon } from "semantic-ui-react";

function SideMenuHover({menuIsHover,setMenuIsHover}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const {menuSideOptionValue} = useSelector(state => state.generalsEffectsReducer)

  const verifyIsHover = () =>{
    if(!menuIsHover){
      setMenuIsHover(true)
    }
  }
  const menu_ref = useRef(null);

  useEffect(() => {
    const checkIfClickedOutside = (event) => {
      if (
        menu_ref &&
        menu_ref.current &&
        !menu_ref.current.contains(event.target)
      ) {
        setMenuIsHover(false)
      }
    };
    document.addEventListener("click", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, []);

  return (
    <div
      className={styles.sideMenu_foating_hover}
      onMouseOver={() => setMenuIsHover(true)}
      onClick={() => setMenuIsHover(false)}
      ref={menu_ref}
    >
      <div className={styles.menu_float_short_brand_icon}>
        <Image
          src="/images/short_brand.png"
          height={"45"}
          width={"45"}
          object-fit={"contain"}
        />
      </div>
      <div className={styles.menu_float_hello_text}>
        <p>Hola</p>
        <h3>{user.name}</h3>
      </div>
      <div onMouseOver={verifyIsHover}>
        <Link href={"/reportes"}>
          <div
            className={
              menuSideOptionValue === "/reportes"
                ? styles.MenuOption_active
                : styles.MenuOption
              }
              onClick={() => dispatch(menuSideOption("/reportes"))}
              >
            <Icon name={"shopping bag"} />
            <p className={styles.option_name}>{"Reportes"}</p>
          </div>
        </Link>
      </div>
      <div onMouseOver={verifyIsHover}>
        {useVerifyUserRole(user, "admin") && (
          <Link href={"/usuarios"}>
            <div
              className={
                menuSideOptionValue === "/usuarios"
                  ? styles.MenuOption_active
                  : styles.MenuOption
              }
              onClick={() => dispatch(menuSideOption("/usuarios"))}
            >
              <Icon name={"users"} />
              <p className={styles.option_name}>{"Usuarios"}</p>
            </div>
          </Link>
        )}
      </div>
      <div onMouseOver={verifyIsHover}>
        <Link href={"/configuracion"}>
          <div
            className={
              menuSideOptionValue === "/configuracion"
                ? styles.MenuOption_active
                : styles.MenuOption
            }
            onClick={() => dispatch(menuSideOption("/configuracion"))}
          >
            <Icon name={"cog"} />
            <p className={styles.option_name}>{"Configuracion"}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SideMenuHover;
