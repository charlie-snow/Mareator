import React from "react";
import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Contexts/UserContext";
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

  const { menu_config_estado } = useContext(UserContext);
  const [menu_config, setMenuConfig] = menu_config_estado;

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

  if (menu_config.es_pequeno) { menu_config.espacio_intermedio = "20%" };

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

  function desplegablePantallas() {
    return (
      <ul className="navbar-nav">
        <li className="dropdown">
          <a className="nav-link dropdown-toggle active" type="button" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Ver
          </a>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li className="desplegable_elemento"><a className="dropdown-item" href="#"><NavLink className="nav-link" aria-current="page" to="/ahora">
              Ahora
            </NavLink></a></li>
            <li className="desplegable_elemento"><a className="dropdown-item" href="#"><NavLink className="nav-link active" aria-current="page" to="/mar" >
              Mar                   </NavLink></a></li>
            <li className="desplegable_elemento"><a className="dropdown-item" href="#"><NavLink
              className="nav-link"
              aria-current="page"
              to="/el_tiempo"
            >
              Tiempo                   </NavLink></a></li>
          </ul>
        </li>
      </ul>
    )
  }

  function desplegablePeriodo() {
    return (
      <ul className="navbar-nav">
        <li className="dropdown">
          <a className="nav-link dropdown-toggle active" type="button" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Período
          </a>
          <ul className="dropdown-menu desplegable_ancho" aria-labelledby="dropdownMenuButton1">
            <li className="desplegable_elemento"><a className="dropdown-item" href="#"
              id="2d"
              onClick={() => restringir(2)}
            >
              2d
            </a></li>
            <li className="desplegable_elemento"><a className="dropdown-item" href="#"
              id="7d"
              onClick={() => restringir(7)}
            >
              7d
            </a></li>
          </ul>
        </li>
      </ul>
    )
  }


  return (
    <nav className="navbar navbar-expand navbar-dark bg-info me-auto fixed-top cabecera">
      <table
        cellSpacing="0"
        cellPadding="0"
        style={{ width: "100%" }}
      >
        <tbody>
          <tr>
            <td align="center">
              <img src="imagenes/surf.png" width="20px"></img>
            </td>
            <td width={"100px"}>
              <h2
                className="navbar-brand "
                href="#"
                style={{
                  margin: 0,
                }}
              >
                &nbsp;Mareator
              </h2>
            </td>
            <td width={menu_config.espacio_intermedio}></td>
            <td>
              {menu_config.es_pequeno ? (
                desplegablePantallas()
              ) : (
                <div id="navbarSupportedContent">
                  <ul className="nav nav-pills">
                    <li className="navbar-item">
                      <NavLink className="nav-link" aria-current="page" to="/ahora">
                        0
                      </NavLink>
                    </li>
                    <li className="navbar-item">
                      <NavLink className="nav-link" aria-current="page" to="/mar">
                        Mar
                      </NavLink>
                    </li>
                    <li className="navbar-item">
                      <NavLink
                        className="nav-link"
                        aria-current="page"
                        to="/el_tiempo"
                      >
                        Tiempo
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </td>
            <td width={menu_config.espacio_intermedio}></td>
            <td>
              {menu_config.es_pequeno ? (
                desplegablePeriodo()
              ) : (
                <div id="navbarSupportedContent">
                  <ul class="nav nav-pills">
                    <li className="navbar-item">
                      <a
                        class="nav-link"
                        id="2d"
                        href="#"
                        onClick={() => restringir(2)}
                      >
                        2d
                      </a>
                    </li>
                    <li className="navbar-item">
                      <a
                        class="nav-link"
                        id="7d"
                        href="#"
                        onClick={() => restringir(7)}
                      >
                        7d
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </nav>
  );
};

export default BarraMenu;
