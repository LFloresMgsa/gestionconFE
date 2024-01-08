//loadfiles.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { eventoService } from '../services/evento.service';
import ReactTooltip from 'react-tooltip';
const LoadFiles = (props) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [documents, setDocuments] = useState([]);
  const [hoveredDocument, setHoveredDocument] = useState(null);

  useEffect(() => {
    const category = String(props.pCategory); // Asegura que sea una cadena
    setSelectedCategory(category);

    const fetchDocumentsData = async () => {
      try {
        // No es necesario enviar un cuerpo vacío, puedes omitirlo
        const res = await eventoService.obtenerFiles({}, category); // Pasa un objeto vacío como primer parámetro si no es necesario enviar un cuerpo
        // console.log('--------------');
        // console.log(res);
        // console.log('--------------');

        // Verificar si res tiene la propiedad files y es un array con elementos
        if (res && res.files && Array.isArray(res.files) && res.files.length > 0) {
          setDocuments(res.files);
        } else {
          console.warn('La propiedad files no es un array válido:', res.files);
          setDocuments([]); // O utiliza un valor por defecto, según tus necesidades
        }
      } catch (error) {
        console.error('Error fetching documents:', error.message);
      }
    };

    if (category) {
      fetchDocumentsData();
    } else {
      setDocuments([]);
    }
  }, [props.pCategory]);


  const handleDocumentClick = (document) => {
    const encodedCategory = encodeURIComponent(selectedCategory);
    const encodedDocument = encodeURIComponent(document);

    // Construye la URL para solicitar el archivo PDF directamente
    const documentUrl = `http://localhost:5000/api/gescon/pdf?category=${encodedCategory}&document=${encodedDocument}`;
    // Abre una nueva pestaña y solicita el archivo PDF
    window.open(documentUrl, '_blank');
  };


  return (
    <div>
      <h1 className='prueba' style={{ textAlign: 'center', marginRight: '110px' }}>Documentos</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gridGap: '10px', maxWidth: '900px', marginRight: '-260px', marginTop: '20px' }}>
          {documents.map((document, index) => (
            <div
              key={index}
              onClick={() => handleDocumentClick(document)}
              style={{
                cursor: 'pointer',
                transition: 'transform 0.3s ease-in-out',
                transform: hoveredDocument === document ? 'scale(1.1)' : 'scale(1)',
                marginBottom: '7px',
                border: '2.5px solid #ccc',
                padding: '15px',
                textAlign: 'center',
                whiteSpace: 'normal',
                overflow: 'auto',
                height: 'auto', // Permitir que la altura se ajuste automáticamente
                fontSize: '16px', // Tamaño de fuente deseado
              }}
              onMouseEnter={() => setHoveredDocument(document)}
              onMouseLeave={() => setHoveredDocument(null)}
            >
              <FontAwesomeIcon icon={faFilePdf} style={{ marginBottom: '0px', color: 'red', marginRight: '6px' }} />
              <strong>{index + 1}</strong>. {document}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  

};

export { LoadFiles };