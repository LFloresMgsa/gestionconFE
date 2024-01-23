import React, { useState, useEffect } from 'react';
import { eventoService } from '../../../services/evento.service';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import FolderOpen from '@mui/icons-material/FolderOpenOutlined';
import FolderNew from '@mui/icons-material/CreateNewFolderOutlined';

const TreeComponent = () => {

  const [_directorio, setDatos] = useState([]); // Estado para almacenar los datos, inicializado como null
  const initialExpandedNodes = JSON.parse(localStorage.getItem('expandedNodes')) || [];
  const [expandedNodes, setExpandedNodes] = useState(initialExpandedNodes);

  useEffect(() => {

    function filtrarConTexto(elemento, texto) {
      // Filtrar el elemento actual
      const elementoFiltrado = elemento.authorizedRolesAllString.includes(texto) ? { ...elemento } : null;

      // Filtrar los hijos de manera recursiva
      const hijosFiltrados = elemento.tabChildren.flatMap(hijo => filtrarConTexto(hijo, texto)).filter(Boolean);

      // Retornar solo el elemento actual si cumple con la condición
      return elementoFiltrado ? { ...elementoFiltrado, tabChildren: hijosFiltrados } : hijosFiltrados;
    }

    const BuscarDirectorios = async () => {
      try {
        const directorio = await eventoService.obtenerDirectorios();
        //console.log(directorio);


        //------------- filtra array x roles -----------------------

        let tabs = directorio.flatMap(elemento => filtrarConTexto(elemento, "All")).filter(Boolean);

        if (cookies.get('Sgm_cUsuario') != "" && cookies.get('Sgm_cUsuario') != null) {
          tabs = directorio.flatMap(elemento => filtrarConTexto(elemento, cookies.get('Sgm_cPerfil')));
        }
        //----------------------------------------------------------


        setDatos(tabs);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    BuscarDirectorios();

  }, []);

  useEffect(() => {
    localStorage.setItem('expandedNodes', JSON.stringify(expandedNodes));
  }, [expandedNodes]);

  const MyTreeItem = ({ label, icon: Icon, fontSize, ...props }) => (
    <TreeItem
      label={
        <Typography style={{ fontSize, display: 'flex', alignItems: 'center' }}>
          {Icon && <Icon style={{ marginRight: '5px' }} />}
          {label}
        </Typography>
      }
      {...props}
      style={{ marginTop: '2px' }} // Ajusta el padding izquierdo según tus necesidades
    />
  );


  const renderTree = (nodes) => (
    <MyTreeItem
      key={nodes.id}
      nodeId={nodes.id.toString()}
      label={nodes.tabName.toLowerCase()}
      icon={nodes.tabChildren && expandedNodes.includes(nodes.id.toString()) ? FolderNew : FolderOpen}
      fontSize="14px"
      onClick={() => {
        if (!nodes.tabChildren || nodes.tabChildren.length === 0  ) {
          handleNodeClick(nodes.routeName);
        }
      }}
    >
      {Array.isArray(nodes.tabChildren)
        ? nodes.tabChildren.map((node) => renderTree(node))
        : <MyTreeItem key={nodes.id} label={nodes.tabName} icon={FolderOpen} fontSize="14px" />}
    </MyTreeItem>
  );

  const handleNodeClick = (routeName) => {

    //console.log('Abrir URL:', routeName);
    window.location.href = routeName;
  };

  const handleNodeToggle = (event, nodeIds) => {
    setExpandedNodes(nodeIds);
  };

  return (
    <div style={{ marginTop: '60px' }}> {/* Ajusta el valor de marginBottom según tus necesidades */}
      <TreeView
        expanded={expandedNodes}
        onNodeToggle={handleNodeToggle}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {_directorio.map(renderTree)}
      </TreeView>
    </div>
  );
};

export default TreeComponent;