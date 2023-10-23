import React, { useEffect, useState, useRef } from "react";
import Marea from "../Components/Marea";
// import MareaGrafica from "../Components/MareaGrafica";
import Oleaje from "../Components/Oleaje";
import Viento from "../Components/Viento";
// import DynamicChart from "../Components/pruebas/DynamicChart"; // el que funciona la actualización
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { recolectar_meteogalicia } from "../Components/DatosMeteogalicia";


const Mar = (props) => {
  const fecha_actual = new Date();
  // const fecha_actual = new Date("Wed Jul 16 2023 09:30:44");

  const { configuracion_estado } = useContext(UserContext);
  const [configuracion, setConfiguracion] = configuracion_estado;

  const { localizacion_estado } = useContext(UserContext);
  const [localizacion, setLocalizacion] = localizacion_estado;

  const { graficar_estado } = useContext(UserContext);
  const [graficar, setGraficar] = graficar_estado;

  // let puntos_marea2 = [];

  // const [puntos_marea2, setPuntosMarea2] = useState(recolectar_meteogalicia());
  // // recolectar_meteogalicia().then(res => {
  // //   puntos_marea2 = res;
  // // });
  // // puntos_marea2 = recolectar_meteogalicia();
  // console.log("meteogalicia puntos_marea2: ");
  // console.log(puntos_marea2);


  useEffect(() => {
    // This function will be executed after rendering
    setGraficar(new Date());
  }, []);

  const { menu_config_estado } = useContext(UserContext);
  const [menu_config, setMenuConfig] = menu_config_estado;



  const url_json_oleaje =
    "https://marine-api.open-meteo.com/v1/marine?latitude=" +
    localizacion.latitud +
    "&longitude=" +
    localizacion.longitud +
    "&hourly=wave_height,wave_direction,wave_period&timezone=Europe%2FBerlin";

  const url_json_viento =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    localizacion.latitud +
    "&longitude=" +
    localizacion.longitud +
    "&hourly=windspeed_10m,winddirection_10m&timezone=Europe%2FBerlin";

  const url_json_mareas =
    "https://ideihm.covam.es/api-ihm/getmarea?request=gettide&id=" +
    localizacion.estacion +
    "&format=json";

  const url_json_mareas_meteogalicia =
    "https://servizos.meteogalicia.gal/apiv4/getTidesInfo?coords=" +
    localizacion.longitud +
    "," +
    localizacion.latitud +
    "&API_KEY=WN7oiatPXPsG1C91GdPM7a60a9qTx9MD7SfIV0HUlI0z16elB8NZj76Qsi4WMTPi";

  // const url_rss_mareas_meteogalicia = "https://servizos.meteogalicia.gal/mgrss/predicion/rssMareas.action?data=21/04/2023&idPorto=1";

  // const url_rss_mareas_meteogalicia = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fservizos.meteogalicia.gal%2Fmgrss%2Fpredicion%2FrssMareas.action%3Fdata%3D21%2F04%2F2023%26idPorto%3D1";

  let puntos_marea = [];
  // let marea_actual = {};
  const [marea_actual, setMareaActual] = useState(null);
  let marea_referencia;

  const recolectar_mareas = () => {
    fetch(url_json_mareas)
      .then((respuesta) => {
        return respuesta.json();
      })
      .then((data) => {
        console.log("fetch Mareas IHM... éxito");
        console.log("datos Mareas IHM: " + url_json_mareas);
        console.log(data);

        let nivel_marea_actual = "desconocido";
        let indice_marea_referencia = 0;
        let estado_marea_actual = "desconocido";

        let marea, hora, altura;
        let fecha_marea,
          hoy = new Date();
        let hourDiff;
        let marea_actual = {};

        let puntos_marea_gmt = data.mareas.datos.marea;

        let flecha_marea_direccion = 0;

        // console.log("puntos_marea_gmt");
        // console.log(puntos_marea_gmt);

        // PASAMOS LAS FECHAS DE LOS PUNTOS DE MAREA DE GMT A CEST
        for (let i = puntos_marea_gmt.length - 1; i >= 0; i--) {
          marea = puntos_marea_gmt[i].tipo;
          hora = puntos_marea_gmt[i].hora;
          altura = puntos_marea_gmt[i].altura;
          // console.log("Marea " + marea + " a las " + hora);
          fecha_marea = new Date(
            Date.UTC(
              hoy.getFullYear(),
              hoy.getMonth(),
              hoy.getDate(),
              hora.substring(0, 2),
              hora.substring(3, 5),
              0,
              0
            )
          );

          // PASAMOS LAS FECHAS DE LOS PUNTOS DE MAREA DE GMT A CEST

          // console.log("fecha_marea : " + fecha_marea);
          // debugger;
          // console.log("CEST: " + fecha_marea.toLocaleString('es-ES',));
          // puntos_marea[i] = fecha_marea;

          puntos_marea = [{ fecha_marea, marea, altura }].concat(puntos_marea); // [ 4, 3, 2, 1 ]
        }

        console.log("puntos_marea");
        console.log(puntos_marea);

        // Obtenemos el objeto date de la marea más tardía
        indice_marea_referencia = puntos_marea.length - 1;
        marea_referencia = { ...puntos_marea[indice_marea_referencia] };

        // // // CALCULAR ESTADO Y NIVEL DE MAREA

        // Si ya pasó la marea más tardía, se calcula con respecto a ésta (M4) hacia adelante, y se añade otro punto de marea, el primero del día siguiente, pero no se recoge de la web, sino que se calcula aprox. sumando 6h a M4: marea_siguiente
        if (fecha_actual > marea_referencia.fecha_marea) {

          let marea_siguiente = {};
          hourDiff = Math.abs(
            (marea_referencia.fecha_marea - fecha_actual) / 1000 / 60 / 60
          );
          if (marea_referencia.marea == "pleamar") {
            estado_marea_actual = "bajando";
            nivel_marea_actual = 6 - hourDiff;
            marea_siguiente.marea = "bajamar";
            flecha_marea_direccion = 180;
          } else {
            estado_marea_actual = "subiendo";
            nivel_marea_actual = hourDiff;
            marea_siguiente.marea = "pleamar";
            flecha_marea_direccion = 0;
          }
          marea_siguiente.fecha_marea = new Date();
          marea_siguiente.fecha_marea.setTime(
            marea_referencia.fecha_marea.getTime() + 6 * 60 * 60 * 1000 // se añade un día a esta fecha
          );
          marea_referencia = marea_siguiente;
          puntos_marea = puntos_marea.concat(marea_siguiente);

          // Si no, buscar la marea inmediatamente superior y calcular con respecto a ésta hacia atrás
        } else {
          for (let i = puntos_marea.length - 1; i >= 0; i--) {
            if (puntos_marea[i].fecha_marea > fecha_actual) {
              marea_referencia.fecha_marea = puntos_marea[i].fecha_marea;
              marea_referencia.marea = puntos_marea[i].marea;
            }
          }
          hourDiff = Math.abs(
            (marea_referencia.fecha_marea - fecha_actual) / 1000 / 60 / 60
          );
          if (marea_referencia.marea == "pleamar") {
            estado_marea_actual = "subiendo";
            nivel_marea_actual = 6 - hourDiff;
            marea_referencia.marea = "pleamar";
            flecha_marea_direccion = 0;
          } else {
            estado_marea_actual = "bajando";
            nivel_marea_actual = hourDiff;
            marea_referencia.marea = "bajamar";
            flecha_marea_direccion = 180;
          }
        }

        marea_actual.nivel = Math.abs(
          Number.parseFloat(nivel_marea_actual).toFixed(1)
        );
        marea_actual.hora =
          String(marea_referencia.fecha_marea.getHours()).padStart(2, "0") +
          ":" +
          String(marea_referencia.fecha_marea.getMinutes()).padStart(2, "0");
        marea_actual.direccion = flecha_marea_direccion;
        marea_actual.puntos_marea = puntos_marea;
        setMareaActual(marea_actual);

        // console.log("datos marea_actual:");
        // console.log(marea_actual);
        debugger;
      });
  };

  useEffect(() => {
    recolectar_mareas();
  }, [graficar_estado]);


  return (
    <div>
      {/* <DynamicChart /> */}
      {/* <Marea puntos_marea={puntos_marea} marea_actual={marea_actual} /> */}
      {/* <MareaGrafica url={url_json_mareas} /> */}
      {/* {marea_actual ? (
        <Oleaje url={url_json_oleaje} />
      ) : (
        <p>Cargando datos de mareas ...</p>
      )} */}
      <Oleaje url={url_json_oleaje} />

      <Viento url={url_json_viento} />
      {marea_actual ? (
        <Marea marea_actual={marea_actual} />
      ) : (
        <p>Cargando datos de mareas ...</p>
      )}

      <br></br>
    </div>
  );
};

export default Mar;
