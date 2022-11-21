import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import styles from "./styles.module.css";

import UserItem from "../UserItem/index";

function UsersTable(props) {
    return (
        <div className={styles.table_container}>
            
            <div className={styles.programa_table_alumno_p_container}>
                <p className={styles.alumno_p}>ALUMNO</p>
                <p className={styles.alumno_p}>NOMBRE</p>
                <p className={styles.alumno_p}>CORREO</p>
                <p className={styles.alumno_p}>ROL</p>
            </div>
            {
                [1,2,3].map((student, index) => (
                    <UserItem key={index} user={"daniel"} name={"daniel"} email={"daniel"} role={"daniel"}/>
                ))
            }
        </div>
    );
}

export default UsersTable;