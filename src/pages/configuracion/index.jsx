import { useRouter } from 'next/router';
import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Button, Input } from 'semantic-ui-react';
import SideMenu from "../../components/SideMenu/index";
import styles from "./styles.module.css";
function Config(props) {
    const router = useRouter();

    const { 
        user,
        values:{
            id,
            userNickName,
            name,
            email,
            subject_pivot,
            roles,
            password
        } 
    } = useSelector((state) => state.userReducer);

    const {logged} = useSelector((state) => state.clientReducer);
    useEffect(() => {
        if(!logged)
        router.push("/")
    },[logged])
    return (
        <div className={styles.users_page}>
        <SideMenu/>
        <div className={styles.page_container}>
            <h1 className={styles.page_title}>Configuración</h1>
            <form className={styles.config_form_container}>
                {user?.roles?.length>0 && 
                user?.roles[0]?.name === "teacher" && 
                subject_pivot && 
                subject_pivot.length > 0 && 
                <>
                    <label>Programa</label>
                    <Input value={subject_pivot[0]?.subjects[0]?.name} focus disabled placeholder='Programa' />
                </>
                }

                <label>Usuario</label>
                <Input value={userNickName} focus placeholder='Usuario' />

                <label>Nombre</label>
                <Input value={name} focus placeholder='Nombre' />

                <label>Correo</label>
                <Input value={email} focus placeholder='Correo' />

                <label>Contraseña</label>
                <Input value={password} focus
                type="password"
                placeholder='Contraseña'
                password
                />
                <div className={styles.btn_section}>
                    <Button color='blue'>Guardar</Button>
                </div>
            </form>
        </div>

    </div>
    );
}

export default Config;