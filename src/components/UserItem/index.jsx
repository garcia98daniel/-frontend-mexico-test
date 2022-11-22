import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import styles from "./styles.module.css";


import {
    userDeleteRequesting,
  } from "../../redux/generalsEffects/actions";

function UserItem({id, user, name, email, roles}) {
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.clientReducer);

    return (
        <div className={styles.UserItem}>
            <p>{user}</p>
            <p>{name}</p>
            <p>{email}</p>
            <p>{roles && roles[0]?.name}</p>
            <div onClick={() => dispatch(userDeleteRequesting(id, token))}>
                <Icon size="large" name="trash"/>
            </div>
        </div>
    );
}

export default UserItem;