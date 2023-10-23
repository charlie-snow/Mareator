import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { DatosLocalizacion } from "../Helpers/DatosLocalizacion";
import { useLocation } from 'react-router-dom';


const Localizador = () => {
  const { localizacion_estado } = useContext(UserContext);
  const [localizacion, setLocalizacion] = localizacion_estado;

  const location = useLocation();

  let visible = true;
  if (location.pathname == "/ayuda") { visible = false } else { visible = true };

  let contenido = "";

  const [latitud_aqui, setLatitud_aqui] = useState();
  const [longitud_aqui, setLongitud_aqui] = useState();

  const { graficar_estado } = useContext(UserContext);
  const [graficar, setGraficar] = graficar_estado;

  const getDireccion = (direccion) => {
    fetch(
      "https://geocode.maps.co/reverse?lat=" +
      localizacion.latitud +
      "&lon=" +
      localizacion.longitud
    )
      .then((response) => response.json())
      .then((j) => {
        var array = j.display_name.split(",");
        return (
          array[4] +
          " - " +
          array[3] +
          " - " +
          array[2] +
          " (" +
          localizacion.latitud +
          ", " +
          localizacion.longitud +
          ")"
        );
      });
  };

  function localizar(localizar_a) {
    let localizacion_temp = localizacion;
    let button = 0;

    if (localizar_a == 0) {
      // Coger las coordenadas actuales del GPS
      localizacion_temp.latitud = latitud_aqui;
      localizacion_temp.longitud = longitud_aqui;
      localizacion_temp.direccion = getDireccion();
      setLocalizacion(localizacion_temp);
    } else {
      localizacion_temp = DatosLocalizacion.localizacion[localizar_a - 1];
      setLocalizacion(localizacion_temp);
      // button = document.getElementById(localizar_a);
      // button.className = "nav-link active";
    }
    localStorage.setItem(
      "localizacion_local",
      JSON.stringify(localizacion_temp)
    );
    setGraficar(new Date());
    // this.addClass("btn-danger"); // PAra cambiar el botón, y quede marcado dónde estamos
  }

  useEffect(() => {
    // This function will be executed after rendering
    localizar(localizacion.id);
  }, []);

  const scrollingItems = document.querySelectorAll('.scrolling-item');

  function handleClick(id) {
    scrollingItems.forEach(item => {
      item.classList.toggle('active', item.id === id);
    });
  }

  scrollingItems.forEach(item => {
    item.addEventListener('click', () => handleClick(item.id));
  });

  function ConditionalComponent(showContent) {
    if (showContent == true) {
      contenido = <div className="container mt-0 localizador">
        <div className="row">
          <div className="col-12 scrolling-container">
            <div className="scrolling-item link active" id="1" onClick={() => localizar(1)}> Coruña </div>
            <div className="scrolling-item link" id="2" onClick={() => localizar(2)}> Miño </div>
            <div className="scrolling-item link" id="3" onClick={() => localizar(3)}> Doniños </div>
            <div className="scrolling-item link" id="4" onClick={() => localizar(4)}> O Grove </div>
            <div className="scrolling-item link" id="5" onClick={() => localizar(5)}> A.Maior </div>
            <div className="scrolling-item link" id="6" onClick={() => localizar(6)}> Deltebre </div>

          </div>
        </div>
      </div>;
    } else {
      contenido = "";
    }
  }

  ConditionalComponent(visible);

  return contenido;
};

export default Localizador;
