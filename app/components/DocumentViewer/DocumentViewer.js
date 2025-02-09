'use client';
import styles from './DocumentViewer.module.css';
import { useDocument } from '../../context/DocumentContext';
import { ImprovedVersion } from '../ImprovedVersion/ImprovedVersion';

export const DocumentViewer = () => {
  const { state } = useDocument();

  if (!state.originalDoc) return null;

  return (
    <div className={styles.container}>
      <div className={styles.pane}>
        <h3>Original Document</h3>
        <pre className={styles.content}>{state.originalDoc}</pre>
      </div>
      <div className={styles.pane}>
        <h3>Improved Version</h3>
        <ImprovedVersion />
      </div>
    </div>
  );
};