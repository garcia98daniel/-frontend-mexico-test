import React from 'react';
import styles from "./styles.module.css";

function StudentSubjectItem({name, inscription_date}) {
    return (
        <div className={styles.StudentSubjectItem}>
            <p>{name}</p>
            <p>{inscription_date}</p>
        </div>
    );
}

export default StudentSubjectItem;