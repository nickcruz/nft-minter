import React from 'react'
import { useDropzone } from 'react-dropzone'
import styles from '../styles/Uploader.module.css'

interface UploaderProps {
    onUploaded: (file: File) => void
}

export const Uploader = ({ onUploaded }: UploaderProps) => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ accept: 'image/jpeg, image/png', maxFiles: 1 })

    if (acceptedFiles !== undefined && acceptedFiles[0] !== undefined) {
        onUploaded(acceptedFiles[0])
    }

    return (
        <section className={styles.container}>
            <div className={styles.dropzone} {...getRootProps()}>
                <input {...getInputProps()} />
                <p>.jpg, .png</p>
            </div>
        </section>
    );
}