import React from 'react';
import { Icon } from 'semantic-ui-react';
import styles from "./styles.module.css";

function UserItem({user, name, email, role}) {
    return (
        <div className={styles.UserItem}>
            <p>{user}</p>
            <p>{name}</p>
            <p>{email}</p>
            <p>{role}</p>
            <Icon size="large" name="trash"/>
        </div>
    );
}

export default UserItem;