import React from "react";
import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useMediaQuery } from "react-responsive";


const BarraMenu = () => {
  const { configuracion_estado } = useContext(UserContext);
  const [configuracion, setConfiguracion] = configuracion_estado;

  if (configuracion.periodo != ("2" && "7")) {
    let configuracion_temp = configuracion;
    configuracion_temp.periodo = "2";
    setConfiguracion(configuracion_temp);
    localStorage.setItem(
      "configuracion_local",
      JSON.stringify(configuracion_temp)
    );
  }
  const { graficar_estado } = useContext(UserContext);
  const [graficar, setGraficar] = graficar_estado;

  // const { menu_config_estado } = useContext(UserContext);
  // const [menu_config, setMenuConfig] = menu_config_estado;

  // let boton_mar = (
  //   <img
  //     src="imagenes/ola_redondo.png"
  //     style={{ width: "25px" }}
  //     alt="Boton Mar"
  //   />
  // );
  // let boton_tiempo = (
  //   <img
  //     src="imagenes/tiempo_redondo.png"
  //     style={{ width: "25px" }}
  //     alt="Boton Mar"
  //   />
  // );

  if (configuracion.es_pequeno) { configuracion.espacio_intermedio = "20%" };

  function restringir(restringir_a) {
    let configuracion_temp = configuracion;
    configuracion_temp.periodo = restringir_a;
    // btn_periodo = document.getElementById("2d");
    // btn_periodo.className = "nav-link";
    // btn_periodo = document.getElementById("7d");
    // btn_periodo.className = "nav-link";
    // btn_periodo = document.getElementById(restringir_a + "d");
    // btn_periodo.className = "nav-link active";
    setConfiguracion(configuracion_temp);
    localStorage.setItem(
      "configuracion_local",
      JSON.stringify(configuracion_temp)
    );
    setGraficar(new Date());
  }

  useEffect(() => {
    // This function will be executed after rendering
    restringir(configuracion.periodo);
  }, []);

  const closeMenu = () => {
    const navbar = document.querySelector('.navbar-collapse');
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  };

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-info fixed-top cabecera">
      <div className="container-fluid">
        <div className="navbar-brand">
          <img src="imagenes/surf.png" width="45px"></img>
          <a className="navbar-brand" href="#">&nbsp;<b>Mareator</b></a>
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto dropdown-menu-end">
            <NavLink className="nav-link" aria-current="page" to="/ahora" onClick={closeMenu}>
              &nbsp;&nbsp;Ahora
            </NavLink>
            <NavLink className="nav-link" aria-current="page" to="/mar" onClick={closeMenu}>
              &nbsp;&nbsp;Mar
            </NavLink>
            <NavLink className="nav-link" aria-current="page" to="/el_tiempo" onClick={closeMenu}>
              &nbsp;&nbsp;Tiempo
            </NavLink>
            <NavLink className="nav-link" aria-current="page" to="/marv2" onClick={closeMenu}>
              &nbsp;&nbsp;Mar (pro)
            </NavLink>
            <NavLink className="nav-link" aria-current="page" to="/el_tiempov2" onClick={closeMenu}>
              &nbsp;&nbsp;Tiempo (pro) &nbsp;
            </NavLink>

            <a className="nav-link" id="2d"
              href="#"
              onClick={() => {
                closeMenu();
                restringir(2);
              }}>
              &nbsp;&nbsp;2 Días</a>
            <a className="nav-link" id="7d"
              href="#"
              onClick={() => {
                closeMenu();
                restringir(7);
              }}>
              &nbsp;&nbsp;7 Días</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BarraMenu;
