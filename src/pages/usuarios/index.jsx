import React from 'react';
import { Button } from 'semantic-ui-react';
import SideMenu from "../../components/SideMenu/index";
import UsersTable from "../../components/UsersTable/index";
import ModalCreateUser from "../../components/ModalCreateUser/index";
import styles from "./styles.module.css";

function Users(props) {
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