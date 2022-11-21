import { motion } from "framer-motion";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
//componets
import IsoccerBtn from "../../components/IsoccerBtn";

import { Icon, Modal, Container, Input, Select, Form } from "semantic-ui-react";
//style
import styles from "./styles.module.css";
//redux
import { useDispatch, useSelector } from "react-redux";
//actions
import {
  registerRequesting,
  registerChangeForm,
  registerLocationsDataRequesting,
  registerSetCitysForm,
} from "../../redux/auth/register/actions";


const easing = [0.6, -0.05, 0.01, 0.99];

function index(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    error: { errors },
    requesting,
    success,
    departaments,
    citys,
    values,
  } = useSelector((state) => state.registerReducer);

  const handleChangeForm = (key, value) => {
    dispatch(registerChangeForm(key, value));
  };

  const handleChangeForm_select = (event, data) => {
    const { name, value } = data;
    dispatch(registerChangeForm(name, value));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerRequesting(values));
  };

  useEffect(() => {
    dispatch(registerLocationsDataRequesting());
  }, []);

  useEffect(() => {
    dispatch(registerSetCitysForm());
  }, [values.department_of_residence]);

  useEffect(() => {
    if (success) {
      router.push("/email-sent");
    }
  }, [success]);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: { duration: 1, easing: easing },
      }}
      className={styles.page_container}
    >
      <Link href="/">
        <div className={styles.btn_back}>
          <Icon name="arrow alternate circle left" size="large" />
          volver
        </div>
      </Link>
      <Container textAlign="center" className={styles.page_title}>
        <h1>Registrate en iSoccer</h1>
      </Container>
      <div className={styles.modalHeader}>
        <Form
          className={styles.register_form_container}
          onSubmit={(e) => handleRegister(e)}
          autocomplete="off"
        >
          <Form.Input
            fluid
            id="form-subcomponent-shorthand-input-first-name"
            label={<h4>Primer nombre</h4>}
            placeholder="Primer nombre"
            name="name"
            value={values.first_name}
            onChange={(e) => handleChangeForm("first_name", e.target.value)}
            error={
              errors !== "" &&
              errors?.hasOwnProperty("first_name") && {
                content: errors.first_name,
              }
            }
          />
          {/*<----------------->*/}
          <h4>Sexo biológico</h4>
          <div className={styles.radio}>
            <div>
              <input
                className={styles.input_radio}
                type="radio"
                name="biological_sex"
                id="male"
                value={"male"}
                onClick={(e) =>
                  handleChangeForm("biological_sex", e.target.value)
                }
              />{" "}
              <label htmlFor="male">Masculino</label>
              <input
                className={styles.input_radio}
                type="radio"
                name="biological_sex"
                id="female"
                value={"female"}
                onClick={(e) =>
                  handleChangeForm("biological_sex", e.target.value)
                }
              />{" "}
              <label htmlFor="female">Femenino</label>
            </div>
          </div>
          {errors !== "" && errors?.hasOwnProperty("biological_sex") && (
            <p className={styles.errors}>{errors.biological_sex}</p>
          )}
          {/*<----------------->*/}
          <Form.Field
            className={styles.formfield}
            control={Select}
            label={<h4>Departamento donde reside</h4>}
            options={departaments}
            placeholder="Departamento de residencia"
            value={values.department_of_residence}
            name="department_of_residence"
            onChange={handleChangeForm_select}
            error={
              errors !== "" &&
              errors?.hasOwnProperty("department_of_residence") && {
                content: errors.department_of_residence,
              }
            }
          />
          <Form.Field
            className={styles.formfield}
            control={Select}
            label={<h4>Ciudad o municipio donde reside</h4>}
            options={citys}
            placeholder="Ciudad de residencia"
            value={values.city_of_residence}
            name="city_of_residence"
            onChange={handleChangeForm_select}
            error={
              errors !== "" &&
              errors?.hasOwnProperty("city_of_residence") && {
                content: errors.city_of_residence,
              }
            }
          />

          <h4>Correo electrónico</h4>
          <Form.Input
            placeholder="Correo electrónico"
            name="email"
            iconPosition="left"
            icon={"at"}
            value={values.email}
            onChange={(e) => handleChangeForm("email", e.target.value)}
            error={
              errors !== "" &&
              errors?.hasOwnProperty("email") && {
                content: errors.email,
              }
            }
          ></Form.Input>

          <h4>Contraseña</h4>
          <Form.Field>
            <Input
              // onChange={this.handleInput}
              label={{ icon: "asterisk" }}
              labelPosition="left corner"
              type="password"
              placeholder="Contraseña"
              name="password"
              value={values.password}
              onChange={(e) => handleChangeForm("password", e.target.value)}
              error={
                errors !== "" &&
                errors?.hasOwnProperty("password") && {
                  content: errors.password,
                }
              }
            />
          </Form.Field>
          {errors !== "" && errors?.hasOwnProperty("password") && (
            <p className={styles.errors}>{errors.password[0]}</p>
          )}

          <Form.Field>
            <h4>Confirmar Contraseña</h4>
            <Input
              label={{ icon: "lock" }}
              labelPosition="left corner"
              type="password"
              placeholder="Contraseña"
              value={values.password_confirmation}
              onChange={(e) =>
                handleChangeForm("password_confirmation", e.target.value)
              }
              error={
                errors !== "" &&
                errors?.hasOwnProperty("password_confirmation") && {
                  content: errors.password_confirmation,
                }
              }
            />
          </Form.Field>
          {errors?.password[1] !== undefined && (
            <p className={styles.errors}>
              El campo de Confirmación contraseña no coincide o es requerido.
            </p>
          )}
          <br />
          <Modal.Content>
            <Container textAlign="justified">
              <p className={styles.termios_condiciones}>
                Si te registras, significa que aceptas los
                <a className={styles.terminos_registro}>
                  {" "}
                  Términos del servicio{" "}
                </a>
                y la Política de privacidad, incluido el Uso de cookies. Otros
                usuarios podrán encontrarte por tu correo electrónico o tu
                número de teléfono si los proporcionas.
              </p>
            </Container>
            <IsoccerBtn loading={requesting} handleClick={() => {}}>
              Registrarse
            </IsoccerBtn>
          </Modal.Content>
        </Form>
      </div>
    </motion.div>
  );
}

export default index;
