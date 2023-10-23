import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { DatosLocalizacion } from "../Helpers/DatosLocalizacion";
import { useMediaQuery } from "react-responsive";


const Localizador = () => {
  const { localizacion_estado } = useContext(UserContext);
  const [localizacion, setLocalizacion] = localizacion_estado;

  const { menu_config_estado } = useContext(UserContext);
  const [menu_config, setMenuConfig] = menu_config_estado;

  const [latitud_aqui, setLatitud_aqui] = useState();
  const [longitud_aqui, setLongitud_aqui] = useState();

  const { graficar_estado } = useContext(UserContext);
  const [graficar, setGraficar] = graficar_estado;

  // const [direccion, setDireccion] = useState("");

  // const { direccion, setDireccion } = useContext(UserContext);

  // navigator.geolocation.getCurrentPosition(function (location) {
  //     setLatitud_aqui(location.coords.latitude);
  //     setLongitud_aqui(location.coords.longitude);
  // });

  // fetch("https://nominatim.openstreetmap.org/search.php?q=" + props.latitu>d + "," + props.longitud + "&polygon_geojson=1&format=json")

  let button = 0;





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
    let btn_periodo;

    for (let i = 1; i <= 5; i++) {
      btn_periodo = document.getElementById(i);
      btn_periodo.className = "nav-link";
    }

    if (localizar_a == 0) {
      // Coger las coordenadas actuales del GPS
      localizacion_temp.latitud = latitud_aqui;
      localizacion_temp.longitud = longitud_aqui;
      localizacion_temp.direccion = getDireccion();
      setLocalizacion(localizacion_temp);
    } else {
      localizacion_temp = DatosLocalizacion.localizacion[localizar_a - 1];
      setLocalizacion(localizacion_temp);
      button = document.getElementById(localizar_a);
      button.className = "nav-link active";
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

  // function desplegableLugares() {
  //   return (
  //     <ul className="navbar-nav">
  //       <li className="dropdown">
  //         <a className="nav-link dropdown-toggle active" type="button" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  //           Lugares
  //         </a>
  //         <ul className="dropdown-menu desplegable_ancho" aria-labelledby="dropdownMenuButton1">
  //           <li className="desplegable_elemento"><a
  //             class="nav-link"
  //             id="5"
  //             href="#"
  //             onClick={() => localizar(5)}
  //           >
  //             <div style={{ color: "white" }}>.</div>
  //           </a></li>
  //           <li className="desplegable_elemento"><a
  //             class="nav-link"
  //             id="1"
  //             href="#"
  //             onClick={() => localizar(1)}
  //           >
  //             Coruña                    </a></li>
  //           <li className="desplegable_elemento">
  //             <a
  //               class="nav-link"
  //               id="2"
  //               href="#"
  //               onClick={() => localizar(2)}
  //             >
  //               Miño                    </a>
  //           </li>
  //           <li className="desplegable_elemento">
  //             <a
  //               class="nav-link"
  //               id="3"
  //               href="#"
  //               onClick={() => localizar(3)}
  //             >
  //               Doniños                    </a>
  //           </li>
  //           <li className="desplegable_elemento">
  //             <a
  //               class="nav-link"
  //               id="4"
  //               href="#"
  //               onClick={() => localizar(4)}
  //             >
  //               O Grove
  //             </a>
  //           </li>
  //           <li className="desplegable_elemento">
  //             <a
  //               class="nav-link"
  //               id="6"
  //               href="#"
  //               onClick={() => localizar(6)}
  //             >
  //               A.Maior
  //             </a>
  //           </li>

  //         </ul>
  //       </li>
  //     </ul>
  //   )
  // }

  return (
    <>
      <div class="navbar-wrapper">
        <div className="navbar navbar-expand navbar-dark bg-info me-auto localizador">
          <table
            cellSpacing="0"
            cellPadding="0"
            style={{ width: "100%" }}
          >
            <tbody>
              <tr>
                <td>

                  <div id="navbarSupportedContent">
                    <ul class="nav nav-pills">
                      {/* <li className="navbar-item">
                        <a
                          class="nav-link"
                          id="5"
                          href="#"
                          onClick={() => localizar(5)}
                        >
                          <div style={{ color: "white" }}>.</div>
                        </a>
                      </li> */}
                      <li className="navbar-item">
                        <a
                          class="nav-link"
                          id="1"
                          href="#"
                          onClick={() => localizar(1)}
                        >
                          {menu_config.es_pequeno ? ("Coru") : "Coruña"}
                        </a>
                      </li>
                      <li className="navbar-item">
                        <a
                          class="nav-link"
                          id="2"
                          href="#"
                          onClick={() => localizar(2)}
                        >
                          {menu_config.es_pequeno ? ("Mi") : "Miño"}
                        </a>
                      </li>
                      <li className="navbar-item">
                        <a
                          class="nav-link"
                          id="3"
                          href="#"
                          onClick={() => localizar(3)}
                        >
                          {menu_config.es_pequeno ? ("Doni") : "Doniños"}
                        </a>
                      </li>
                      <li className="navbar-item">
                        <a
                          class="nav-link"
                          id="4"
                          href="#"
                          onClick={() => localizar(4)}
                        >
                          {menu_config.es_pequeno ? ("Grov") : "O Grove"}
                        </a>
                      </li>
                      <li className="navbar-item">
                        <a
                          class="nav-link"
                          id="5"
                          href="#"
                          onClick={() => localizar(5)}
                        >
                          {menu_config.es_pequeno ? ("A.M") : "A.Maior"}
                        </a>
                      </li>

                    </ul>
                  </div>

                </td>

                {/* <td>
                            <button type="button" className="btn" onClick={() => localizar(0)}>Aquí</button>
                        </td> */}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Localizador;
