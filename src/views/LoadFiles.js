import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { eventoService } from '../services/evento.service';
import { Typography, Grid, Paper } from '@mui/material';
import ReactTooltip from 'react-tooltip';

const LoadFiles = (props) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [documents, setDocuments] = useState([]);
  const [hoveredDocument, setHoveredDocument] = useState(null);

  useEffect(() => {
    const category = String(props.pCategory);
    setSelectedCategory(category);

    const fetchDocumentsData = async () => {
      try {
        const res = await eventoService.obtenerFiles(category);

        if (res && res.files && Array.isArray(res.files) && res.files.length > 0) {
          setDocuments(res.files);
        } else {
          console.warn('La propiedad files no es un array válido:', res.files);
          setDocuments([]);
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
    const documentUrl = `http://localhost:5000/api/gescon/pdf?category=${encodedCategory}&document=${encodedDocument}`;
    window.open(documentUrl, '_blank');
  };

  return (
    <div>
      <Typography variant="h4" align="center" style={{ marginRight: '0px', marginBottom: '10px' }}>
        DOCUMENTOS
      </Typography>
      <Grid container justifyContent="center" spacing={2}>
        {documents.map((document, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              onClick={() => handleDocumentClick(document)}
              onMouseEnter={() => setHoveredDocument(document)}
              onMouseLeave={() => setHoveredDocument(null)}
              style={{
                cursor: 'pointer',
                transition: 'transform 0.3s ease-in-out',
                transform: hoveredDocument === document ? 'scale(1.1)' : 'scale(1)',
                padding: '10px',
                textAlign: 'center',
                border: '2.9px solid #8b0000',
                overflow: 'hidden',
                height: document.length < 35 ? 'auto' : '120px',
              }}
            >
              <FontAwesomeIcon icon={faFilePdf} style={{ marginBottom: '0px', color: 'red', marginRight: '0px', fontSize: '1.4em' }} />
              <Typography variant="body1" style={{ fontSize: '14px' }}>
                <strong>{index + 1}</strong>. {document}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};


export { LoadFiles };
