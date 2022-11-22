import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import styles from "./styles.module.css";

import UserItem from "../UserItem/index";
import { useSelector } from 'react-redux';

function UsersTable(props) {
    
    const {
        usersPage:{
            requesting,
            error,
            success,
            users
        }
    } = useSelector(state => state.generalsEffectsReducer); 

    return (
        <div className={styles.table_container}>
            
            <div className={styles.programa_table_alumno_p_container}>
                <p className={styles.alumno_p}>ALUMNO</p>
                <p className={styles.alumno_p}>NOMBRE</p>
                <p className={styles.alumno_p}>CORREO</p>
                <p className={styles.alumno_p}>ROL</p>
            </div>
            {users.length > 0 &&
                users.map((user, index) => (
                    <UserItem key={index} {...user}/>
                ))
            }
        </div>
    );
}

export default UsersTable;