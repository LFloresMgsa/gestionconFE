import React, { useState, useEffect } from 'react';
import { eventoService } from '../../../services/evento.service';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

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
        console.log(directorio);


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

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id.toString()}
      label={nodes.tabName}
      
      onClick={() => {
        if (!nodes.tabChildren || nodes.tabChildren.length === 0) {
          handleNodeClick(nodes.routeName);
        }
      }}
    >
      {Array.isArray(nodes.tabChildren) ? nodes.tabChildren.map(renderTree) : null}
    </TreeItem>
  );

  const handleNodeClick = (routeName) => {
    
    //console.log('Abrir URL:', routeName);
    window.location.href = routeName;
  };

  const handleNodeToggle = (event, nodeIds) => {
    setExpandedNodes(nodeIds);
  };

  return (
    <div>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expandedNodes}
        onNodeToggle={handleNodeToggle}
      >
        {_directorio.map(renderTree)}
      </TreeView>

    </div>
  );
};

export default TreeComponent;