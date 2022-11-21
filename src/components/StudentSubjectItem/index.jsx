import React from 'react';
import styles from "./styles.module.css";

function StudentSubjectItem({studentName, registrationDate}) {
    return (
        <div className={styles.StudentSubjectItem}>
            <p>studentName</p>
            <p>registrationDate</p>
        </div>
    );
}

export default StudentSubjectItem;