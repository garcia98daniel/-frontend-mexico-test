import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';

//componets
import SideMenu from "../../components/SideMenu/index";
import SubjectTable from "../../components/SubjectTable/index";
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

//styles
import styles from "./styles.module.css";

//actions
import { subjectGetRequesting } from "../../redux/generalsEffects/actions";

function Reports() {
    const router = useRouter();
    const dispatch = useDispatch();

    const {token, logged} = useSelector((state) => state.clientReducer);

    const {
        reportsPage:{
            requesting,
            error,
            success,
            subjects
        }
    } = useSelector(state => state.generalsEffectsReducer);

  //------------------- call once subjects list --------------------//
    useEffect(()=>{
        dispatch(subjectGetRequesting(token));
    },[])

  //------------------- protect route when user is not logged --------------------//
    useEffect(() => {
        if(!logged)
        router.push("/")
    },[logged])

    
    return (
        <div className={styles.reports_page}>
            <SideMenu/>
            <div className={styles.page_container}>
            {requesting &&
                <Dimmer active inverted>
                    <Loader inverted content='Loading' />
                </Dimmer>
            }
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