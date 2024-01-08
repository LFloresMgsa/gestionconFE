import React, { useState, useEffect } from 'react';
import { LoadFiles } from './LoadFiles';

const Categorias = (props) => {
 
  
  return (
    <div>
      <LoadFiles pCategory={props.pCategory} />
      
    </div>
  );
};

export { Categorias };
