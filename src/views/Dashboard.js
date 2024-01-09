import React, { useState, useEffect } from "react";
import '../css/imagenfondo.css'
import fondo from '../imagenes/fondomanual.jpg'
const Dashboard = () => {
  return (
    <>
      <div className="container" >
        <div className="image-container">
          <img className="centered-image" src={fondo} alt=""  />
        </div>
        
      </div>
      <div>
      </div>
    </>
  );

};

export default Dashboard;
