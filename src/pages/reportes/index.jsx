import React from 'react';
import SideMenu from "../../components/SideMenu/index";
import SubjectTable from "../../components/SubjectTable/index";

//styles
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";

//actions
import {
    subjectGetRequesting,
  } from "../../redux/generalsEffects/actions";
import { useEffect } from 'react';

function Reports(props) {
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.clientReducer);
    const {
        reportsPage:{
            requesting,
            error,
            success,
            subjects
        }
    } = useSelector(state => state.generalsEffectsReducer); 

    useEffect(()=>{
        dispatch(subjectGetRequesting(token));
    },[])
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

                {subjects.length > 0 &&
                    subjects?.map((subject, index) => (
                        <SubjectTable key={index} {...subject} />
                    ))
                }
            </div>

        </div>
    );
}

export default Reports;