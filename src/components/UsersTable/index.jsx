import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import styles from "./styles.module.css";

import UserItem from "../UserItem/index";
import { useSelector } from 'react-redux';


function UsersTable(props) {
  const [filterArrayUsers, setFilterArrayUsers] =  useState(users);
    
    const {
        usersPage:{
            requesting,
            error,
            success,
            users,
            filter
        }
    } = useSelector(state => state.generalsEffectsReducer); 

    //---------------- filter users by role -----------------//
    useEffect(() => {
        setFilterArrayUsers(
            users.filter((user) => {
              return (
                  user.roles[0].name
                    .toLowerCase()
                    .indexOf(filter.toString().toLowerCase()) !== -1
                );
              })
        )
    },[filter, users])

    return (
        <div className={styles.table_container}>
            
            <div className={styles.programa_table_alumno_p_container}>
                <p className={styles.alumno_p}>ALUMNO</p>
                <p className={styles.alumno_p}>NOMBRE</p>
                <p className={styles.alumno_p}>CORREO</p>
                <p className={styles.alumno_p}>ROL</p>
                <p className={styles.alumno_p}></p>
            </div>
            {users.length > 0 &&
                filterArrayUsers?.map((user, index) => (
                    <UserItem key={index} {...user}/>
                ))
            }
        </div>
    );
}

export default UsersTable;