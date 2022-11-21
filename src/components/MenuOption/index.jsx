import Link from 'next/link';
import React from 'react';
import { Icon } from 'semantic-ui-react';


//styles
import styles from "./styles.module.css";

function MenuOption({setOptionSelected, optionSelected, urlRoute, text, iconName}) {
    return (
        <Link href={urlRoute}>
            <div className={optionSelected === urlRoute ? styles.MenuOption_active : styles.MenuOption} onClick={() => setOptionSelected(urlRoute)}>
                <Icon name={iconName}/>
                <p>{text}</p>
            </div>
        </Link>
    );
}

export default MenuOption;