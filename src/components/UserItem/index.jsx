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
            <p>{roles && roles[0]?.name==="teacher" ? 'Profesor' : roles[0]?.name==="admin" &&  "Admin" }</p>
            <p onClick={() => dispatch(userDeleteRequesting(id, token))}>
                <Icon size="large" name="trash"/>
            </p>
        </div>
    );
}

export default UserItem;