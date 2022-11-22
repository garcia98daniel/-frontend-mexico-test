import React from 'react';
import { Button } from 'semantic-ui-react';
import SideMenu from "../../components/SideMenu/index";
import UsersTable from "../../components/UsersTable/index";
import ModalCreateUser from "../../components/ModalCreateUser/index";
import styles from "./styles.module.css";

import { useDispatch, useSelector } from "react-redux";

//actions
import {
    usersGetRequesting,
  } from "../../redux/generalsEffects/actions";
import { useEffect } from 'react';

function Users(props) {
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.clientReducer);
    useEffect(() => {
        dispatch(usersGetRequesting(token));
    },[])
    return (
        <div className={styles.users_page}>
            <SideMenu/>
            <div className={styles.page_container}>
                <h1 className={styles.page_title}>Usuarios</h1>
                <div className={styles.table_title}>
                    <div className={styles.table_title_first_container}>
                        <p className={styles.table_title_p}>TODOS</p>
                        <p className={styles.table_title_p}>PROFESORES</p>
                        <p className={styles.table_title_p}>ADMINISTRADORES</p>
                    </div>
                    <p className={styles.table_title_p}>
                        <ModalCreateUser/>
                    </p>
                </div>
                
                <UsersTable/>
            </div>

        </div>
    );
}

export default Users;