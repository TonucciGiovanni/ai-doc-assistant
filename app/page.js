'use client';
import { DocumentProvider } from './context/DocumentContext';
import { Upload } from './components/Upload/Upload';
import { DocumentViewer } from './components/DocumentViewer/DocumentViewer';
import './styles/globals.css';
export default function Home() {
  return (
    <DocumentProvider>
      <main className="container">
        <h1>AI Document Assistant</h1>
        <Upload />
        <DocumentViewer />
      </main>
    </DocumentProvider>
  );
}