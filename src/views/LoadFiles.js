import React, { useState, useEffect } from 'react';
import { eventoService } from '../services/evento.service';
import { Typography, Grid, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { PictureAsPdf as PdfIcon } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import AppFooter from '../components/layout/AppFooter';

const columns = [
  {
    field: 'icon', headerName: 'Tipo', 
    width: 50,
    renderCell: (params) => (
      <PdfIcon style={{ fontSize: 30, color: 'darkred' }} />
    ),
    editable: false,
  },

  {
    field: 'fileSize',
    headerName: 'Tamaño',
    width: 130,
    editable: false,
  },

  {
    field: 'lastModified',
    headerName: 'Fecha de Modificación',
    width: 250,
    editable: false,
  },

  {
    field: 'fileName',
    headerName: 'Nombre de Archivo',
    width: 1000,
    editable: false,
  },  
];


const useStyles = makeStyles({

  customDataGrid: {
    '& .MuiDataGrid-cell': {
      fontSize: '18px',  // Ajusta el tamaño de letra según tus necesidades
    },
    
  },
});

const LoadFiles = (props) => {

  const classes = useStyles();
  
  const [selectedCategory, setSelectedCategory] = useState('');
  // const [documents, setDocuments] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [hoveredDocument, setHoveredDocument] = useState(null);

  useEffect(() => {
    const category = String(props.pCategory);
    setSelectedCategory(category);

    // const fetchDocumentsData = async () => {
    //   try {
    //     const res = await eventoService.obtenerFiles(category);

    //     if (res && res.files && Array.isArray(res.files) && res.files.length > 0) {
    //       setDocuments(res.files);
    //     } else {
    //       console.warn('La propiedad files no es un array válido:', res.files);
    //       setDocuments([]);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching documents:', error.message);
    //   }
    // };

    const fetchDocumentosData = async () => {
      try {
        const res = await eventoService.obtenerFilesv2(category);

        if (res && res.files && Array.isArray(res.files) && res.files.length > 0) {
          setDocumentos(res.files);
        } else {
          console.warn('La propiedad files no es un array válido:', res.files);
          setDocumentos([]);
        }
      } catch (error) {
        console.error('Error fetching documents:', error.message);
      }
    };


    if (category) {
      // fetchDocumentsData();
      fetchDocumentosData();
    } else {
      // setDocuments([]);
      setDocumentos([]);
    }
  }, [props.pCategory]);

  const handleDocumentClick = (document) => {



    const encodedCategory = encodeURIComponent(selectedCategory);
    const encodedDocument = encodeURIComponent(document);
    const documentUrl = `http://localhost:5000/api/gescon/pdf?category=${encodedCategory}&document=${encodedDocument}`;
    window.open(documentUrl, '_blank');
  };

  const handleEvent = (params, event, details) => {
    handleDocumentClick(params.row.fileName)

  };


  return (
    <div>
      <Typography variant="h5" align="center" style={{ marginRight: '0px', marginBottom: '10px' }}>
        Documentos
      </Typography>

      <Box sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={documentos}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          onRowDoubleClick={handleEvent}
          disableRowSelectionOnClick
        className={classes.customDataGrid}
        />
      </Box>
      <AppFooter /> 
      {/* <Grid container justifyContent="center" spacing={2}>
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
      </Grid> */}
    </div>
  );
};


export { LoadFiles };
