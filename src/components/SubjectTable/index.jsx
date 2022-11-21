import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';

import StudentSubjectItem from "../StudentSubjectItem/index";

import styles from "./styles.module.css";

function SubjectTable({name, students_pivot}) {

    const [openTable, setOpenTable] = useState(false);
    return (
        <div className={styles.table_container}>
            <div className={styles.programa_table_title} onClick={() => setOpenTable((prev) => !prev)}>
                <div className={styles.programa_table_title_first_container}>
                    <p className={styles.programa_table_title_p}><strong>{name}</strong></p>
                    <p className={styles.programa_table_title_p}><strong>{students_pivot.length}</strong></p>
                </div>
                <p className={styles.programa_table_title_p_row}>
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
            { openTable && students_pivot.length >0 &&
            students_pivot?.map((students_pivot, index) => (
                <StudentSubjectItem key={index} {...students_pivot.student}/>
            ))
            }
        </div>
    );
}

export default SubjectTable;