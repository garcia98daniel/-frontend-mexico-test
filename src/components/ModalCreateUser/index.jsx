import React, { useState } from 'react';
import { Button, Header, Image, Input, Modal, Select } from 'semantic-ui-react';
import styles from "./styles.module.css";

const options = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
    { key: 'al', value: 'al', text: 'Albania' },
  ]

function ModalCreateUser(props) {
    const [open, setOpen] = useState(true)
    return (
        <Modal
        size={"tiny"}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button size='large' color='blue'>Nuevo Usuario</Button>}
      >
        <form className={styles.ModalCreateUser_container}>
                <h1>Crear nuevo usuario</h1>
            <label>Programa</label>
            <Select placeholder='Select your country' options={options} />

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
            <Button 
             onClick={() => setOpen(false)}
             basic color='blue' content='Blue'>Cancelar</Button>
            <Button color='blue'>Crear Usuario</Button>
            </div>
        </form>
      </Modal>
    );
}

export default ModalCreateUser;