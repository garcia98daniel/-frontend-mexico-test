import { useRouter } from 'next/router';
import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

//components
import { Button, Input } from 'semantic-ui-react';
import SideMenu from "../../components/SideMenu/index";

//styles
import styles from "./styles.module.css";

//actions
import { userUpdateRequesting, userChangeForm } from "../../redux/auth/user/actions";

function Config(props) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { 
        user,
        values,
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

    const handleChangeForm = (key, value) => {
        dispatch(userChangeForm(key, value));
      };
    const handleCreateUser = (e) => {
        e.preventDefault();
        dispatch(userUpdateRequesting(token, values));
    };

    const {token, logged} = useSelector((state) => state.clientReducer);

    useEffect(() => {
        if(!logged)
        router.push("/")
    },[logged])

    return (
        <div className={styles.users_page}>
        <SideMenu/>
        <div className={styles.page_container}>
            <h1 className={styles.page_title}>Configuración</h1>
            <form onSubmit={(e) => handleCreateUser(e)} className={styles.config_form_container}>
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
                <Input 
                 onChange={(e) => handleChangeForm("userNickName", e.target.value)}
                 value={userNickName} focus placeholder='Usuario' 
                 />

                <label>Nombre</label>
                <Input 
                 onChange={(e) => handleChangeForm("name", e.target.value)}
                 value={name} focus placeholder='Nombre' 
                 />

                <label>Correo</label>
                <Input 
                 onChange={(e) => handleChangeForm("email", e.target.value)}
                 value={email} focus placeholder='Correo' 
                 />

                <label>Contraseña</label>
                <Input 
                 onChange={(e) => handleChangeForm("password", e.target.value)}
                 value={password} focus
                 type="password"
                 placeholder='Contraseña'
                 password
                />
                <div className={styles.btn_section}>
                    <Button type="submit" color='blue'>Guardar</Button>
                </div>
            </form>
        </div>

    </div>
    );
}

export default Config;