import Link from 'next/link';
import React from 'react';
import { Icon } from 'semantic-ui-react';


//styles
import styles from "./styles.module.css";

import { useDispatch, useSelector } from "react-redux";
//actions
import {
    menuSideOption
  } from "../../redux/generalsEffects/actions";

function MenuOption({ urlRoute, text, iconName}) {
    const dispatch = useDispatch();
    const {menuSideOptionValue} = useSelector(state => state.generalsEffectsReducer)

    return (
        <Link href={urlRoute}>
            <div className={menuSideOptionValue === urlRoute ? styles.MenuOption_active : styles.MenuOption} onClick={() => dispatch(menuSideOption(urlRoute))}>
                <Icon name={iconName}/>
                <p>{text}</p>
            </div>
        </Link>
    );
}

export default MenuOption;