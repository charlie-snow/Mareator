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

  // const url_json_mareas =
  //   "https://ideihm.covam.es/api-ihm/getmarea?request=gettide&id=" +
  //   localizacion.estacion +
  //   "&format=json";

  const url_json_mareas_meteogalicia =
    "https://servizos.meteogalicia.gal/apiv4/getTidesInfo?coords=" +
    localizacion.longitud +
    "," +
    localizacion.latitud +
    "&API_KEY=WN7oiatPXPsG1C91GdPM7a60a9qTx9MD7SfIV0HUlI0z16elB8NZj76Qsi4WMTPi";

  var proxyUrl = "https://corsproxy.io/?";
  const url_json_mareas = proxyUrl + url_json_mareas_meteogalicia;

  // const url_rss_mareas_meteogalicia = "https://servizos.meteogalicia.gal/mgrss/predicion/rssMareas.action?data=21/04/2023&idPorto=1";

  // const url_rss_mareas_meteogalicia = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fservizos.meteogalicia.gal%2Fmgrss%2Fpredicion%2FrssMareas.action%3Fdata%3D21%2F04%2F2023%26idPorto%3D1";

  let puntos_marea = [];
  // let marea_actual = {};
  const [marea_actual, setMareaActual] = useState(null);
  let marea_referencia;

  const recolectar_mareas = () => {
    fetch(url_json_mareas)
      .then(response =>
        response.json().then(data => ({
          data: data,
          status: response.status
        })
        ).then(res => {
          // console.log("thenes: ");
          // console.log(res.data.features[0].properties.days[0].variables[0].summary);
          let data = res.data;
          // console.log("jsonData: ")
          // console.log(jsonData);

          // const puntos_marea_crudo = [...jsonData.features[0].properties.days[0].variables[0].summary];

          // console.log("datos: ")
          // console.log(puntos_marea_crudo);

          // let data = jsonData;

          console.log("fetch Mareas Meteogalicia... éxito");
          console.log("datos Mareas Meteogalicia: " + url_json_mareas);
          console.log(data);

          const datos_mareas_dias = data.features[0].properties.days;
          let puntos_marea_prevision = [];

          // console.log("ptos_marea_dias: ")
          // console.log(datos_mareas_dias);

          // OBTENEMOS UNA MATRIZ LIMPIA DE MAREAS PARA 5 DÍAS
          let mareas_dia = [];
          let mareas_dia_temp = [];
          for (let i = 0; i < datos_mareas_dias.length; i++) {
            mareas_dia_temp = datos_mareas_dias[i].variables[0].summary;

            // cambiamos el nombre de los atributos
            mareas_dia = mareas_dia_temp.map((obj) => ({
              marea: obj.state,
              altura: obj.height,
              fecha_marea: obj.timeInstant
            }));

            // cambiamos el nombre de las mareas
            mareas_dia_temp = mareas_dia.map((obj) => {
              switch (obj.marea) {
                case "High tides":
                  return { ...obj, marea: "pleamar" };
                case "Low tides":
                  return { ...obj, marea: "bajamar" };
                default:
                  return obj; // For any other values, keep them unchanged.
              }
            });

            // cambiamos las fechas a dates
            mareas_dia = mareas_dia_temp.map((obj) => {
              const [datePart, timePart] = obj.fecha_marea.split('T');
              const validDateTimeString = datePart + ' ' + timePart;
              const fecha_marea = new Date(validDateTimeString);
              return { ...obj, fecha_marea: fecha_marea };
            });

            puntos_marea_prevision[i] = mareas_dia;
          }

          console.log("ptos_marea_prev: ")
          console.log(puntos_marea_prevision);

          let nivel_marea_actual = "desconocido";
          let indice_marea_referencia = 0;
          let estado_marea_actual = "desconocido";

          let marea, hora, altura;
          let fecha_marea,
            hoy = new Date();
          let hourDiff;
          let marea_actual = {};

          let flecha_marea_direccion = 0;

          // puntos_marea_mg = datos_mareas_dias[0].variables[0].summary;
          // console.log("puntos_marea_mg");
          // console.log(puntos_marea_mg);

          // // cambiamos el nombre de los atributos
          // const puntos_marea_tmp = puntos_marea_prevision[0].map((obj) => ({
          //   marea: obj.state,
          //   altura: obj.height,
          //   fecha_marea: obj.timeInstant
          // }));

          // // cambiamos el nombre de las mareas
          // puntos_marea = puntos_marea_tmp.map((obj) => {
          //   switch (obj.marea) {
          //     case "High tides":
          //       return { ...obj, marea: "pleamar" };
          //     case "Low tides":
          //       return { ...obj, marea: "bajamar" };
          //     default:
          //       return obj; // For any other values, keep them unchanged.
          //   }
          // });

          // // cambiamos las fechas a dates
          // puntos_marea = puntos_marea_tmp.map((obj) => {
          //   const [datePart, timePart] = obj.fecha_marea.split('T');
          //   const validDateTimeString = datePart + ' ' + timePart;
          //   const fecha_marea = new Date(validDateTimeString);
          //   return { ...obj, fecha_marea: fecha_marea };
          // });

          puntos_marea = puntos_marea_prevision[0];

          console.log("puntos_marea");
          console.log(puntos_marea);

          // Obtenemos el objeto date de la marea más tardía
          indice_marea_referencia = puntos_marea.length - 1;
          marea_referencia = { ...puntos_marea[indice_marea_referencia] };

          // marea_referencia.fecha_marea = new Date(marea_referencia.fecha_marea);
          console.log("marea ref");
          console.log(marea_referencia);
          // console.log("factual");
          // console.log(fecha_actual);
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
          // debugger;
        }));
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
      <Oleaje url={url_json_oleaje} url_mareas={url_json_mareas} />

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
