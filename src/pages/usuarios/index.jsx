import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
//components
import SideMenu from "../../components/SideMenu/index";
import UsersTable from "../../components/UsersTable/index";
import ModalCreateUser from "../../components/ModalCreateUser/index";

import styles from "./styles.module.css";

//actions
import {
    usersGetRequesting,
    changeFilterUsers
} from "../../redux/generalsEffects/actions";

import {useVerifyUserRole} from "../../hooks/useVerifyUserRole";
import { Button, Dimmer, Loader } from 'semantic-ui-react';

function Users() {
    const router = useRouter();
    const dispatch = useDispatch();

    const {token, logged} = useSelector((state) => state.clientReducer);
    const { user } = useSelector((state) => state.userReducer);

    const {
        usersPage:{
            requesting,
            error,
            success,
            filter
        }
    } = useSelector(state => state.generalsEffectsReducer); 

  //------------------- call once the users list --------------------//
    useEffect(() => {
        dispatch(usersGetRequesting(token));
    },[])

  //------------------- protect route when user is not logged --------------------//
    useEffect(() => {
        if(!logged)
        router.push("/")
    },[logged])
    

  //------------------- protect the content of the page when user has not the role --------------------//
    const [hasRole, setHasRole] = useState(useVerifyUserRole(user, "admin"));
    if(!hasRole){
        console.log(hasRole)
        return (
            <div className={styles.users_page}>
                <SideMenu/>
                <div className={styles.page_container}>
                    <h1 className={styles.page_title}>Ups!! no puedes acceder a esta información :(</h1>
                    <Button onClick={() => router.push("/reportes")}  size="large" color="blue" inverted>Volver</Button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.users_page}>
            <SideMenu/>
            

            <div className={styles.page_container}>
                {requesting &&
                    <Dimmer active inverted>
                        <Loader inverted content='Loading' />
                    </Dimmer>
                }
                <h1 className={styles.page_title}>Usuarios</h1>
                <div className={styles.table_title}>
                    <div className={styles.table_title_first_container}>
                        <p 
                        onClick={() => dispatch(changeFilterUsers(""))} 
                        className={filter === "" ? styles.table_title_p_active : styles.table_title_p}>TODOS</p>
                        <p 
                        onClick={() => dispatch(changeFilterUsers("teacher"))} 
                        className={filter === "teacher" ? styles.table_title_p_active : styles.table_title_p}>PROFESORES</p>
                        <p 
                        onClick={() => dispatch(changeFilterUsers("admin"))} 
                        className={filter === "admin" ? styles.table_title_p_active : styles.table_title_p}>ADMINISTRADORES</p>
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