import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import SideMenu from "../../components/SideMenu/index";
import styles from "./styles.module.css";
function Config(props) {
    return (
        <div className={styles.users_page}>
        <SideMenu/>
        <div className={styles.page_container}>
            <h1 className={styles.page_title}>Configuración</h1>
            <form className={styles.config_form_container}>
                <label>Programa</label>
                <Input focus disabled placeholder='Programa' />

                <label>Usuario</label>
                <Input focus placeholder='Usuario' />

                <label>Nombre</label>
                <Input focus placeholder='Nombre' />

                <label>Correo</label>
                <Input focus placeholder='Correo' />

                <label>Contraseña</label>
                <Input focus
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