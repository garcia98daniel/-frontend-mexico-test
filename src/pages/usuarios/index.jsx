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
} from "../../redux/generalsEffects/actions";
import {useVerifyUserRole} from "../../hooks/useVerifyUserRole";
import { Button, Dimmer, Loader } from 'semantic-ui-react';

function Users(props) {
    const router = useRouter();
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.clientReducer);
    const { user } = useSelector((state) => state.userReducer);
    const {
        usersPage:{
            requesting,
            error,
            success,
        }
    } = useSelector(state => state.generalsEffectsReducer); 

    useEffect(() => {
        dispatch(usersGetRequesting(token));
    },[])

    const {logged} = useSelector((state) => state.clientReducer);
    useEffect(() => {
        if(!logged)
        router.push("/")
    },[logged])
    
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