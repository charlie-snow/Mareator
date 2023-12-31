import React, { useState, useRef } from "react";
// import { registerables } from "chart.js";
import Chart from "chart.js/auto";
import { useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";

const Ahora = () => {
  const fecha_actual = new Date();
  const horas_hoy = fecha_actual.getHours();

  const { configuracion_estado } = useContext(UserContext);
  const [configuracion, setConfiguracion] = configuracion_estado;

  const { localizacion_estado } = useContext(UserContext);
  const [localizacion, setLocalizacion] = localizacion_estado;

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
  const url_json_openmeteo =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    localizacion.latitud +
    "&longitude=" +
    localizacion.longitud +
    "&hourly=temperature_2m,precipitation_probability,rain,cloudcover,windspeed_10m&timezone=Europe%2FBerlin";
  // console.log(url_json_openmeteo);
  const url_json_aemet =
    "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/" +
    localizacion.id_municipio +
    "/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb3ljYXJsb3NuaWV2ZXNAcHJvdG9ubWFpbC5jb20iLCJqdGkiOiI0NzUxNmY0Zi1iYmVhLTQ1MzYtYmU5Mi1hYzQ2ZDgzNzVhNGYiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTY3OTE1MjQ1NCwidXNlcklkIjoiNDc1MTZmNGYtYmJlYS00NTM2LWJlOTItYWM0NmQ4Mzc1YTRmIiwicm9sZSI6IiJ9.8yuNoZeP4QYgtnq8ivQSUmpP6h768fl7N68D4CNagyo";
  // console.log(url_json_aemet);

  const url_json_mareas =
    "https://ideihm.covam.es/api-ihm/getmarea?request=gettide&id=" +
    localizacion.estacion +
    "&format=json";

  const [altura_ola, setAltura_ola] = useState("");
  const [periodo_ola, setPeriodo_ola] = useState("");

  const [velocidad_viento, setVelocidad_viento] = useState("");
  const [direccion_viento, setDireccion_viento] = useState("");

  const [temperatura, setTemperatura] = useState("");

  const [lluviaxhoras, setLluviaXHoras] = useState("");

  const { graficar_estado } = useContext(UserContext);

  const flecha_viento_hoy = useRef(null);
  const img_cielo_hoy = useRef(null);
  const img_lluvia_hoy = useRef(null);
  const flecha_marea = useRef(null);


  // const flecha_ola = useRef(null);

  // Chart.register(...registerables);
  const grafica = useRef(null);
  const [chart_oleaje, setChart_oleaje] = useState(null);
  // const [chartData, setChartData] = useState({});

  // const container = useRef(null);
  const canvasRef = useRef(null);

  let context = null;

  let datos = [];
  // let data_grafica = {};

  const direcciones = [
    { label: "N", range: [0, 22.5], color: "blue" },
    { label: "NE", range: [22.5, 67.5], color: "#007f7f" },
    { label: "E", range: [67.5, 112.5], color: "green" },
    { label: "SE", range: [112.5, 157.5], color: "#7f7f00" },
    { label: "S", range: [157.5, 202.5], color: "red" },
    { label: "SW", range: [202.5, 247.5], color: "#ff6000" },
    { label: "W", range: [247.5, 292.5], color: "orange" },
    { label: "NW", range: [292.5, 337.5], color: "#7f607f" },
    { label: "N", range: [337.5, 360], color: "blue" },
  ];

  let fecha = new Date();
  let etiquetas = [];
  let etiqueta_fecha = "";
  let dias_prevision = 7;
  for (let y = 0; y < dias_prevision; y++) {
    for (let i = 0; i < 24; i++) {
      fecha.setDate(fecha_actual.getDate() + y);
      if (i > 4 && i < 22) {
        etiqueta_fecha =
          fecha
            .toLocaleString("es-ES", { weekday: "long" })
            .substring(0, 2)
            .toUpperCase() +
          "." +
          fecha.getDate();
      }
      etiquetas = etiquetas.concat(
        i.toString().padStart(2, "0") + "h" + ";" + etiqueta_fecha
      );
      etiqueta_fecha = "";
    }
  }

  let puntos_marea = [];
  // let marea_actual = {};
  const [marea_actual, setMareaActual] = useState(null);
  let marea_referencia;

  const estilo_1linea = {
    color: "grey",
    fontWeight: "bold",
    fontSize: "26px",
    fontFamily: "Arial",
  };

  const number = {
    position: "relative",
    top: "10px",
    left: "10px",
    zIndex: "1",
    color: "grey",
    // backgroundColor: "DodgerBlue",
    // padding: "5px",
    fontSize: "24px",
    fontFamily: "Sans-Serif",
  };

  // para girar la flecha hacia donde va
  const grados_opuestos = (grados) => {
    grados += 180;
    if (grados >= 360) {
      grados -= 360;
    }
    return grados;
  };

  const recolectar_oleaje = (url) => {
    let direccion_ola;
    let altura_ola;
    let periodo_ola;

    fetch(url)
      .then((respuesta) => {
        return respuesta.json();
      })
      .then((data) => {
        datos = [];
        console.log("fetch Oleaje... exito");
        console.log("fetch Oleaje OpenMeteo: " + url);

        console.log(data);

        datos = data.hourly;

        altura_ola = datos.wave_height[horas_hoy].toFixed(1);
        periodo_ola = datos.wave_period[horas_hoy].toFixed(1);

        direccion_ola = datos.wave_direction[horas_hoy];
        setAltura_ola(altura_ola);
        setPeriodo_ola(periodo_ola);

        bolaflechar(altura_ola, direccion_ola);
      });
  };

  const recolectar_viento = (url) => {
    fetch(url)
      .then((respuesta) => {
        return respuesta.json();
      })
      .then((data) => {
        datos = [];
        datos = data.hourly;

        function getIndiceDireccion(angle) {
          var index =
            Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
          return index;
        }

        let direccion_viento = datos.winddirection_10m[horas_hoy];
        let velocidad_viento = datos.windspeed_10m[horas_hoy];
        setDireccion_viento(
          direcciones[getIndiceDireccion(direccion_viento)].label
        );
        setVelocidad_viento(velocidad_viento);
        flecha_viento_hoy.current.style.transform =
          "rotate(" + grados_opuestos(direccion_viento) + "deg)";
      });
  };

  function convertValueToRange(value) {
    if (value >= 0 && value <= 100) {
      if (value > 75) {
        return 1;
      } else if (value > 50) {
        return 0.5;
      } else {
        return 0;
      }
    } else {
      return null; // or handle out-of-range values as per your requirements
    }
  }

  const recolectar_tiempo = (url) => {
    function getDomainName(url) {
      var domain = "";
      // Find & remove protocol (http, ftp, etc.) and get domain
      if (url.indexOf("://") > -1) {
        domain = url.split("/")[2];
      } else {
        domain = url.split("/")[0];
      }
      // Remove port number (if any)
      domain = domain.split(":")[0];
      // Remove subdomains (if any)
      domain = domain.split(".")[0];
      debugger;
      return domain;
    }

    if (getDomainName(url) == "opendata") {
      // aemet
      fetch(url)
        .then((respuesta) => {
          return respuesta.json();
        })
        .then((data) => {
          console.log("fetch Tiempo lluvia...AEMET 1 - éxito");
          console.log("acceso AEMET: " + url);

          let lluvia_ahora;
          let temperatura_ahora;
          let cielo_ahora;
          const url2 = data.datos;

          fetch(url2)
            .then((respuesta) => {
              return respuesta.json();
            })
            .then((data) => {
              datos = [];
              console.log("fetch Tiempo lluvia...AEMET 2 - exito");

              console.log("datos AEMET: " + url2);

              console.log(data);

              lluvia_ahora = data[0].prediccion.dia[0].precipitacion.find(
                (item) => item.periodo == horas_hoy
              ).value;
              temperatura_ahora = data[0].prediccion.dia[0].temperatura.find(
                (item) => item.periodo == horas_hoy
              ).value;
              cielo_ahora = data[0].prediccion.dia[0].estadoCielo.find(
                (item) => item.periodo == horas_hoy
              ).value;

              switch (cielo_ahora) {
                case "11":
                case "11n":
                  img_cielo_hoy.current.src = "imagenes/cielo_despejado.png";
                case "12n":
                case "12":
                  img_cielo_hoy.current.src = "imagenes/cielo_poco_nuboso.png";
                  break;
                case "13n":
                case "13":
                  img_cielo_hoy.current.src =
                    "imagenes/cielo_intervalos_nubosos.png";
                  break;
                case "14n":
                case "14":
                  img_cielo_hoy.current.src = "imagenes/cielo_nuboso.png";
                  break;
                case "15":
                case "15n":
                  img_cielo_hoy.current.src = "imagenes/cielo_muy_nuboso.png";
                  break;
                case "16":
                case "16n":
                  img_cielo_hoy.current.src = "imagenes/cielo_cubierto.png";
                  break;
                case "17n":
                case "17":
                  img_cielo_hoy.current.src = "imagenes/cielo_nubes_altas.png";
                  break;
                case "24n":
                case "24":
                  img_cielo_hoy.current.src =
                    "imagenes/cielo_nuboso_con_lluvia.png";
                  break;
                case "43n":
                case "43":
                  img_cielo_hoy.current.src =
                    "imagenes/cielo_intervalos_nubosos_con_lluvia_escasa.png";
                  break;
                case "46":
                case "46n":
                  img_cielo_hoy.current.src =
                    "imagenes/cielo_cubierto_lluvia_escasa.png";
                  break;
                case "54":
                case "54n":
                  img_cielo_hoy.current.src =
                    "imagenes/cielo_cubierto_con_tormenta.png";
                  break;
                case "81":
                case "81n":
                  img_cielo_hoy.current.src = "imagenes/cielo_niebla.png";
                  break;
                case "82":
                case "82n":
                  img_cielo_hoy.current.src = "imagenes/cielo_bruma.png";
                  break;
              }

              if (lluvia_ahora > 0.8) {
                img_lluvia_hoy.current.src = "imagenes/lluvia_mucha.png";
              } else if (lluvia_ahora > 0.5) {
                img_lluvia_hoy.current.src = "imagenes/lluvia_media.png";
              } else if (lluvia_ahora > 0) {
                img_lluvia_hoy.current.src = "imagenes/lluvia_poca.png";
              } else if (lluvia_ahora == 0) {
                img_lluvia_hoy.current.src = "imagenes/seco.png";
              }

              setTemperatura(temperatura_ahora);
            });
        });
    } else {
      fetch(url)
        .then((respuesta) => {
          return respuesta.json();
        })
        .then((data) => {
          let datos = {};
          console.log("fetch Tiempo OpenMeteo... exito");
          console.log("fetch Tiempo OpenMeteo: " + url);

          console.log(data);

          datos = data.hourly;

          let temperatura = datos.temperature_2m[horas_hoy];
          let precipitacion = datos.precipitation_probability[horas_hoy];
          let cielo = datos.cloudcover[horas_hoy];
          let lluvia =
            datos.rain[horas_hoy] +
            convertValueToRange(datos.precipitation_probability[horas_hoy]);

          if (cielo > 30) {
            img_cielo_hoy.current.src = "imagenes/nubes.png";
          } else if (cielo > 5) {
            img_cielo_hoy.current.src = "imagenes/solynubes.png";
          }

          if (lluvia > 0.5) {
            img_lluvia_hoy.current.src = "imagenes/lluvia_mucha.png";
          } else if (lluvia > 0.2) {
            img_lluvia_hoy.current.src = "imagenes/lluvia_media.png";
          } else if (lluvia > 0) {
            img_lluvia_hoy.current.src = "imagenes/lluvia_poca.png";
          } else if (lluvia == 0) {
            img_lluvia_hoy.current.src = "imagenes/seco.png";
          }

          setTemperatura(temperatura);
        });
    }

    // let url = "";
    // if (configuracion.periodo == 2) {
    //   url = props.url_aemet;

    // } else {
    //   url = props.url_openmeteo;

    // }
  };

  const recolectar_mareas = (url) => {
    fetch(url)
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

        // console.log("puntos_marea");
        // console.log(puntos_marea);

        // Obtenemos el objeto date de la marea más tardía
        indice_marea_referencia = puntos_marea.length - 1;
        marea_referencia = { ...puntos_marea[indice_marea_referencia] };

        // // // CALCULAR ESTADO Y NIVEL DE MAREA

        // Si ya pasó la marea más tardía, se calcula con respecto a ésta (M4)
        if (fecha_actual > marea_referencia.fecha_marea) {
          hourDiff = Math.abs(
            (marea_referencia.fecha_marea - fecha_actual) / 1000 / 60 / 60
          );

          if (marea_referencia.marea == " Plea") {
            estado_marea_actual = "bajando";
            nivel_marea_actual = 6 - hourDiff;
            marea_referencia.marea = " Baja";
            flecha_marea_direccion = 180;
          } else {
            estado_marea_actual = "subiendo";
            nivel_marea_actual = hourDiff;
            marea_referencia.marea = " Plea";
          }
          marea_referencia.fecha_marea.setTime(
            marea_referencia.fecha_marea.getTime() + 6 * 60 * 60 * 1000 // se añade un día a esta fecha
          );

          // Si no, buscar la marea inmediatamente superior y calcular con respecto a ésta
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
          if (marea_referencia.marea == " Plea") {
            estado_marea_actual = "subiendo";
            nivel_marea_actual = 6 - hourDiff;
            marea_referencia.marea = " Plea";
          } else {
            estado_marea_actual = "bajando";
            nivel_marea_actual = hourDiff;
            marea_referencia.marea = " Baja";
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
        debugger;
      });
  };

  useEffect(() => {
    recolectar_oleaje(url_json_oleaje);
    recolectar_viento(url_json_viento);
    recolectar_tiempo(url_json_openmeteo);
    recolectar_tiempo(url_json_aemet);
    recolectar_mareas(url_json_mareas);
  }, [graficar_estado]);


  function cabecera_viento() {
    if (configuracion.periodo == 2 || configuracion.periodo == 7) {
      return (
        <>
          <table className="tabla_barrainfo">
            <tr>
              <td width="10%">
                <div className="rotated-text letragrande">
                  Viento
                </div>
              </td>
              <td width="17%">
                <img
                  src="imagenes/viento_redondo.png"
                  style={{ width: "45px" }} />
              </td>
              <td width="10%">
                <div class="rotated-text" style={{ verticalAlign: "bottom" }}>
                  Velocid.
                </div>
              </td>
              <td width="18%">
                <span style={estilo_1linea}> {velocidad_viento} </span>
              </td>
              {/* <td >
                <div className="rotated-text">
                  <span style={letra_pequena}> Km/h </span>
                </div>
              </td> */}
              <td width="10%">
                <div className="rotated-text">
                  Direcc.
                  {/* {direccion_viento} */}
                </div>
              </td>
              <td width="17%">
                {/* <canvas ref={flecha_viento_ref} width={40} height={40} /> */}
                <img
                  src="imagenes/flecha_viento.png"
                  ref={flecha_viento_hoy}
                  style={{ width: "40px" }}
                />
              </td>
              <td width="18%">
                <img src="imagenes/rosa_colores.png" width="45px" ></img>
              </td>
            </tr>

          </table>
        </>
      );
    } else {
      return "";
    }
  }

  function cabecera_oleaje() {
    if (configuracion.periodo == 2 || configuracion.periodo == 7) {
      return (
        <>
          <table className="tabla_barrainfo">
            <tr>
              <td width="10%">
                <div className="rotated-text letragrande">
                  Oleaje
                </div>
              </td>
              <td width="17%">
                <img
                  src="imagenes/ola_redondo.png"
                  style={{ width: "45px" }} />
              </td>
              <td width="10%">
                <div className="rotated-text">
                  Altura
                </div>
              </td>
              <td width="18%">
                <canvas ref={canvasRef} width={64} height={64} />
              </td>
              <td width="10%">
                <div className="rotated-text">
                  Periodo
                </div>
              </td>
              <td width="17%">
                <span style={estilo_1linea}> {periodo_ola}</span>
                <span className="miniletra">  s</span>


                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div
                    style={{
                      backgroundColor: "purple",
                      height: "2px",
                      width: "50px",
                    }}
                  ></div>
                </div>
              </td>
              <td width="18%">
                <img src="imagenes/rosa_colores.png" width="45px"></img>
              </td>
            </tr>

          </table>
        </>
      );
    } else {
      return "";
    }
  }

  function cabecera_tiempo() {
    if (configuracion.periodo == 2 || configuracion.periodo == 7) {
      return (
        <>
          <table className="tabla_barrainfo">
            <tr>
              <td width="10%">
                <div className="rotated-text letragrande">
                  Tiempo
                </div>
              </td>
              <td width="17%">
                <img src="imagenes/tiempo_redondo.png"
                  style={{ width: "45px" }} />
              </td>
              <td width="10%">
                <div className="rotated-text">
                  Temp.
                </div>
              </td>
              <td width="18%">
                <span style={estilo_1linea}>{temperatura + "ᵒ"}</span>
              </td>
              <td width="10%">
                <div className="rotated-text">
                  Cielo
                </div>
              </td>
              <td style={{ verticalAlign: "middle" }} width="10%">
                <img src="imagenes/sol.png" ref={img_cielo_hoy} height={60} />
              </td>
              <td width="17%">
                <div className="rotated-text">
                  Lluvia
                </div>
              </td>
              <td width="18%">
                <img src="imagenes/seco.png" ref={img_lluvia_hoy} height={40} />
              </td>
            </tr>
          </table>
        </>
      );
    } else {
      return "";
    }
  }

  function cabecera_marea() {
    if ((marea_actual !== null) && (configuracion.periodo == 2 || configuracion.periodo == 7)) {
      return (
        <>
          <table className="tabla_barrainfo">
            <tr>
              <td width="10%">
                <div className="rotated-text letragrande">
                  Marea
                </div>
              </td>
              <td width="10%">
                <img
                  src="imagenes/bola_marea_luna.png"
                  style={{ width: "45px" }}
                />
              </td>
              <td width="10%">
                <div className="rotated-text">
                  Punto
                </div>
              </td>
              <td style={estilo_1linea} width="10%"> {marea_actual.nivel}</td>
              <td width="10%">
                <div className="rotated-text">
                  Direcc.
                </div>
              </td>
              <td width="10%">
                <img
                  src="imagenes/flecha_marea.png"
                  ref={flecha_marea}
                  style={{ width: "2.3rem", height: "2.3rem", transform: `rotate(${marea_actual.direccion}deg)` }}
                />
              </td>
              {/* <td width="10px">
                <div className="rotated-text">
                  Marea
                </div>
              </td> */}
              {/* <td rowSpan="2">{hora_marea}</td> */}
              <td className="letragrande" width="10%">

                {marea_actual.puntos_marea.map((marea, index) => {
                  const hora =
                    marea.fecha_marea.getHours().toString().padStart(2, "0") +
                    ":" +
                    marea.fecha_marea
                      .getMinutes()
                      .toString()
                      .padStart(2, "0");
                  if (hora === marea_actual.hora) {
                    return (marea.marea + ":   " + hora)
                  }
                })}
              </td>
            </tr>
          </table>
        </>
      );
    } else {
      return "";
    }
  }

  function bolaflechar(altura_ola, direccion_ola) {
    // direccion_ola = 18;
    const degrees = direccion_ola;
    let color = "blue";
    // Find the cardinal direction for the given degrees
    for (const direction of direcciones) {
      if (degrees >= direction.range[0] && degrees < direction.range[1]) {
        color = direction.color;
      }
    }
    // const color = direcciones_colores[degreesToNumber(direccion_ola)];
    direccion_ola = grados_opuestos(direccion_ola);

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 25;

    // Clear the canvas context
    context.clearRect(0, 0, canvas.width, canvas.height);

    // // Draw the circle
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();

    // Calculate the position of the arrow
    const arrowLength = radius / 2;
    const angle = ((90 - direccion_ola) * Math.PI) / 180; // Convert angle to radians
    const arrowX = centerX + Math.cos(angle) * (radius + arrowLength);
    const arrowY = centerY - Math.sin(angle) * (radius + arrowLength);

    // Draw the arrowhead
    const arrowheadSize = 30;
    const arrowheadAngle = Math.PI / 6; // 30 degrees in radians
    const arrowheadX =
      arrowX - Math.cos(angle + arrowheadAngle) * arrowheadSize;
    const arrowheadY =
      arrowY + Math.sin(angle + arrowheadAngle) * arrowheadSize;
    context.fillStyle = color;

    context.beginPath();
    context.moveTo(arrowX, arrowY);
    context.lineTo(arrowheadX, arrowheadY);
    context.lineTo(
      arrowX - Math.cos(angle - arrowheadAngle) * arrowheadSize,
      arrowY + Math.sin(angle - arrowheadAngle) * arrowheadSize
    );
    context.closePath();
    context.fillStyle = color;
    context.fill();

    // Draw the number
    context.font = "bold 24px Arial";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(altura_ola, centerX, centerY);
  }

  return (
    <>
      <h1>El mar y el tiempo en {localizacion.nombre}</h1>
      <div>
        <div
          className="alert alert-info m-1 etiqueta-info"
          style={{ padding: "3px", width: "100%" }}
        >
          {cabecera_oleaje()}
        </div>
      </div>

      <div
        className="alert alert-info m-1 etiqueta-info"
        style={{ padding: "3px", width: "100%" }}
      >
        {cabecera_viento()}
      </div>

      <div
        className="alert alert-info m-1 etiqueta-info"
        style={{ padding: "3px", width: "100%" }}
      >
        {cabecera_tiempo()}
      </div>

      <div
        className="alert alert-info m-1 etiqueta-info"
        style={{ padding: "3px", width: "100%" }}
      >
        {cabecera_marea()}
      </div>
    </>
  );
};

export default Ahora;
