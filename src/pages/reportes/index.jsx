import React from 'react';
import SideMenu from "../../components/SideMenu/index";
import SubjectTable from "../../components/SubjectTable/index";

//styles
import styles from "./styles.module.css";

function Reports(props) {

    return (
        <div className={styles.reports_page}>
            <SideMenu/>
            <div className={styles.page_container}>
                <h1 className={styles.page_title}>Reportes</h1>
                <div className={styles.table_title}>
                    <div className={styles.table_title_first_container}>
                        <p className={styles.table_title_p}>Programas</p>
                        <p className={styles.table_title_p}>Total de inscritos</p>
                    </div>
                    <p className={styles.table_title_p}>Detalle</p>
                </div>
                
                {
                    [1,2,3].map((student, index) => (
                        <SubjectTable/>
                    ))
                }
            </div>

        </div>
    );
}

export default Reports;