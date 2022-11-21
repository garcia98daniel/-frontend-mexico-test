import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';

import StudentSubjectItem from "../StudentSubjectItem/index";

import styles from "./styles.module.css";

function SubjectTable(props) {

    const [openTable, setOpenTable] = useState(false);
    return (
        <div className={styles.table_container}>
            <div className={styles.programa_table_title} onClick={() => setOpenTable((prev) => !prev)}>
                <div className={styles.programa_table_title_first_container}>
                    <p className={styles.programa_table_title_p}><strong>Programa 01</strong></p>
                    <p className={styles.programa_table_title_p}><strong>777</strong></p>
                </div>
                <p className={styles.programa_table_title_p}>
                    <strong>
                        { openTable ? <Icon name="angle down"/> : <Icon name="angle right"/>}
                    </strong>
                </p>
            </div>
            { openTable &&
            <div className={styles.programa_table_alumno_p_container}>
                <p className={styles.alumno_p}>ALUMNO</p>
                <p className={styles.alumno_p}>Fecha de inscripción</p>
            </div>
            }
            { openTable &&
            [1,2,3].map((student, index) => (
                <StudentSubjectItem key={index} studentName={"daniel"} registrationDate={"23-07-2022"}/>
            ))
            }
        </div>
    );
}

export default SubjectTable;