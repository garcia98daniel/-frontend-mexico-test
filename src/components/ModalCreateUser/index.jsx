import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Modal, Select } from "semantic-ui-react";
import styles from "./styles.module.css";

//actions
import { 
  changeCreateUserForm,
  createUserRequesting,
 } from "../../redux/generalsEffects/actions";
 
const roleOptions = [
  { key: "1", value: "admin", text: "Admin" },
  { key: "2", value: "teacher", text: "Teacher" },
];

const subjectOptions = [
  { key: "1", value: "1", text: "Primavera" },
  { key: "2", value: "2", text: "Canto" },
  { key: "3", value: "3", text: "Baile" },
];

function ModalCreateUser(props) {

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const {token} = useSelector((state) => state.clientReducer);

  const {
    usersPage:{
      requesting,
      error,
      success,
      users
    },
    createUserValues,
    createUserValues: { role, subject_id, user, name, email, password },
  } = useSelector((state) => state.generalsEffectsReducer);

  //------------------- this handle the inputs values--------------------//
  const handleChangeForm = (key, value) => {
    dispatch(changeCreateUserForm(key, value));
  };

  //------------------- this handle the inputs SELECTS values--------------------//
  const handleChangeForm_select = (event, data) => {
    const { name, value } = data;
    if(name === "admin" ){
      dispatch(changeCreateUserForm(name, value));
      dispatch(changeCreateUserForm("subject_id", ""));
    }else{
      dispatch(changeCreateUserForm(name, value));
    }
  };

  //------------------- this submit the values to create a user --------------------//
  const handleCreateUser = (e) => {
    e.preventDefault();
    dispatch(createUserRequesting(createUserValues, token));
  };

  //------------------- close modal when user is created --------------------//
  useEffect(()=>{
    if(success){
      setOpen(false);
    }
  },[success])

  
  return (
    <Modal
      size={"tiny"}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button size="large" color="blue">
          Nuevo Usuario
        </Button>
      }
    >
      <div className={styles.ModalCreateUser_container}>
        <h1>Crear nuevo usuario</h1>
        <form onSubmit={(e) => handleCreateUser(e)} className={styles.form_createUser_container}>
          <label>Programa</label>
          <Select
            name="role"
            focus
            value={role}
            onChange={handleChangeForm_select}
            placeholder="Selecciona un rol"
            options={roleOptions}
          />

          {role === "teacher" && <label>Programa</label>}
          {role === "teacher" && (
            <Select
              name="subject_id"
              focus
              value={subject_id}
              onChange={handleChangeForm_select}
              placeholder="Selecciona el programa"
              options={subjectOptions}
            />
          )}

          <label>Usuario</label>
          <Input
            value={user}
            onChange={(e) => handleChangeForm("user", e.target.value)}
            focus
            placeholder="Usuario"
          />

          <label>Nombre</label>
          <Input
            value={name}
            onChange={(e) => handleChangeForm("name", e.target.value)}
            focus
            placeholder="Nombre"
          />

          <label>Correo</label>
          <Input
            value={email}
            onChange={(e) => handleChangeForm("email", e.target.value)}
            focus
            placeholder="Correo"
          />

          <label>Contraseña</label>
          <Input
            value={password}
            onChange={(e) => handleChangeForm("password", e.target.value)}
            focus
            type="password"
            placeholder="Contraseña"
            password
          />
          <div className={styles.btn_section}>
            <Button
              onClick={() => setOpen(false)}
              basic
              color="blue"
              content="Blue"
            >
              Cancelar
            </Button>
            <Button loading={requesting} type="submit" color="blue">Crear Usuario</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ModalCreateUser;
