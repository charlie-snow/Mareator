import React from "react";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

const Pie = (props) => {

  function borrarCache() {
    if ("caches" in window) {
      caches.keys().then((names) => {
        // Delete all the cache files
        names.forEach((name) => {
          caches.delete(name);
        });
      });
      // Makes sure the page reloads. Changes are only visible after you refresh.
      window.location.reload(true);
    }
  }

  // const { localizacion_estado } = useContext(UserContext);
  // const [localizacion, setLocalizacion] = localizacion_estado;

  const { graficar_estado } = useContext(UserContext);
  const [graficar, setGraficar] = graficar_estado;

  const { configuracion_estado } = useContext(UserContext);
  const [configuracion, setConfiguracion] = configuracion_estado;

  if (configuracion.es_pequeno) { configuracion.espacio_intermedio = "0%" };

  function alternaPeque() {

    let config_temp = configuracion;
    if (configuracion.pequeno_forzado) {
      config_temp.pequeno_forzado = false;
    } else {
      config_temp.pequeno_forzado = true;

    }

    setConfiguracion(config_temp);
    setGraficar(new Date());
  }

  return (
    <>
      <table className=" pie miniletra containertabla_barrainfo">
        <tr>
          <td>
            {/* {localizacion.direccion} | {localizacion.latitud.toString().slice(0, 4)} ;{" "}
      {localizacion.longitud.toString().slice(0, 4)}|  */}
            <a href="#"

              onClick={() => alternaPeque()}
            >
              La práctica's App
            </a> |
          </td>
          <td>
            <a href="/fuentes" >
              fuentes
            </a>
          </td>
          <td width={configuracion.espacio_intermedio}></td>
          <td>
            |

            <a href="#" onClick={borrarCache}>
              Ver: {props.version}
            </a>
            {" | "}

            <a href="/ayuda">
              <img src="imagenes/ayuda.png" height={"20px"} />
            </a>
          </td>
        </tr>
      </table >
    </>

  );
};

export default Pie;
