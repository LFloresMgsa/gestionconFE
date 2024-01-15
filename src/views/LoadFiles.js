import React, { useState, useEffect } from 'react';
import { eventoService } from '../services/evento.service';
import { Typography, Box, Paper, InputAdornment, TextField, Divider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { PictureAsPdf as PdfIcon } from '@mui/icons-material';
import { styled, css } from '@mui/system';
import AppFooter from '../components/layout/AppFooter';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';

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

const FooterRoot = styled('footer')(
  ({ theme }) => css`
    margin: 0 auto;
    text-align: center;
    width: 32%;
    margin-top: 30px !important;

    & > div:nth-child(1) {
      position: relative;
      display: flex;
      justify-content: space-evenly;
      align-items: end;
      height: 40px;
    }

    small {
      color: #5e6c79;
    }

    & .MuiBox-root {
      display: flex;
      flex-direction: column;
      align-items: center;
      -webkit-box-align: start;
      margin: 7px;
    }

    .MuiDivider-wrapperVertical {
      padding: 0px;
    }

    & > .MuiDivider-root:nth-child(2) {
      margin: 5px auto;
    }

    .MuiButton-textDefault {
      text-transform: capitalize;
      line-height: 10px;
    }

    .legal {
      display: flex;
      font-size: 0.6  rem;
      justify-content: space-between;
    }
  `
);

const useStyles = makeStyles({

  customDataGrid: {
    '& .MuiDataGrid-cell': {
      fontSize: '15px',  // Ajusta el tamaño de letra según tus necesidades
    },

  },
});

const LoadFiles = (props) => {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [documentos, setDocumentos] = useState([]);
  const [hoveredDocument, setHoveredDocument] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const category = String(props.pCategory);
    setSelectedCategory(category);

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
      fetchDocumentosData();
    } else {
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
    handleDocumentClick(params.row.fileName);
  };

  const filteredDocumentos = documentos.filter((documento) =>
    documento.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div>
      <Typography variant="h5" align="center" style={{ marginRight: '0px', marginBottom: '10px', fontWeight:'bold' }}>
        DOCUMENTOS
      </Typography>
      <TextField
        label="Búsqueda por nombre de archivo"
        variant="outlined"
        autoFocus
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" style={{ marginRight: '8px' }}>
              <SearchIcon style={{ color: '#8b0000' }} />
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          style: {
            color: '#8b0000', // Cambia el color del texto de la etiqueta cuando el TextField está enfocado
            
          },
        }}
        style={{
          marginBottom: '15px',
          marginTop: '10px',
          padding: '5px',
          width: '850px',
          borderRadius: '10px',

          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#8b0000', // Color del contorno predeterminado
            },
            '&:hover fieldset': {
              borderColor: '#8b0000', // Color del contorno al pasar el ratón
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ff0000', // Cambia este color al que desees cuando el TextField está enfocado
            },
          },
        }}

      />
      <Box sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={filteredDocumentos}
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
          sx={{
            maxWidth: '100%', // Evita que el DataGrid sea más ancho que el contenedor
            marginBottom: '20px', // Puedes ajustar este margen según tus necesidades
          }}
        />
      </Box>

      {/* Nuevo código que quieres agregar */}
      <FooterRoot>
        <div></div>
        <Divider />
        <div>
          <div style={{fontWeight:'bold' }}>Copyright© 2024 - Management Group S.A.</div>
          <div></div>
        </div>
      </FooterRoot>
      <AppFooter />
    </div>
  );
};

export { LoadFiles };
