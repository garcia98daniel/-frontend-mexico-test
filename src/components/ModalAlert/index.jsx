import React, { useEffect, useState } from 'react';
import ReactDOM, {createPortal} from 'react-dom';
import styles from "./styles.module.css";


function index({ show, onClose, children}) {
    const [isBrowser, setIsBrowser] = useState(false);
  
    useEffect(() => {
      setIsBrowser(true);
    }, []);
  
    const modalContent = show ? (
      <div className={styles.container}>
          {children}
      </div>
    ) : null;
  
    if (isBrowser) {
      return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root")
      );
    } else {
      return null;
    }
  };

export default index;