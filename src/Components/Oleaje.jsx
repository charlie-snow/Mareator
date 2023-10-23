import React, { useState, useRef } from "react";
// import { registerables } from "chart.js";
import Chart from "chart.js/auto";
import { useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";

const Oleaje = (props) => {

  // console.log(props);
  // const { url, marea_actual } = props;

  const fecha_actual = new Date();
  const horas_hoy = fecha_actual.getHours();

  const { configuracion_estado } = useContext(UserContext);
  const [configuracion, setConfiguracion] = configuracion_estado;

  const [altura_ola, setAltura_ola] = useState("");
  const [periodo_ola, setPeriodo_ola] = useState("");
  // const [marea_actual_state, setMareaActualState] = useState({});

  // if (marea_actual) setMareaActualState(marea_actual);


  // const flecha_ola = useRef(null);

  // Chart.register(...registerables);
  const grafica = useRef(null);
  const [chart_oleaje, setChart_oleaje] = useState(null);
  // const [chartData, setChartData] = useState({});

  // const container = useRef(null);
  const marco_bolaola_ref = useRef(null);

  let context = null;

  let datos = {};
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

  // Creo un array de 36h de colores para dia y noche
  const color_dia = "white";
  const color_noche = "#e6e6e6";
  const color_finde = "#ffe6e6";
  let colores_columnas = [];

  let fecha = new Date();
  let etiquetas = [];
  let etiqueta_fecha = "";
  let dias_prevision = 7;

  for (let y = 0; y < dias_prevision; y++) {
    let color = "";
    fecha.setDate(new Date(fecha_actual.getDate() + y));
    // if (i > 4 && i < 22) {
    etiqueta_fecha =
      fecha
        .toLocaleString("es-ES", { weekday: "long" })
        .substring(0, 2)
        .toUpperCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") +
      "." +
      fecha.getDate();
    // }
    for (let i = 0; i < 24; i++) {
      etiquetas = etiquetas.concat(
        i.toString().padStart(2, "0") + "h" + ";" + etiqueta_fecha
      );
      if (i >= 8 && i <= 22) {
        if (etiqueta_fecha.includes("SA") || etiqueta_fecha.includes("DO")) {
          color = color_finde;
        } else {
          color = color_dia;
        }

      } else {
        color = color_noche;
      }
      colores_columnas = colores_columnas.concat(color);
    }
    etiqueta_fecha = "";
    fecha = new Date();
  }

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

  const [parametrosGrafica, setParametrosGrafica] = useState({});

  useEffect(() => {
    const data = {};
    const opciones = {};
    if (grafica && grafica.current) {
      const nuevaInstanciaGrafica = new Chart(grafica.current, {
        type: "line",
        data: data,
        options: opciones,
      });
      setParametrosGrafica(nuevaInstanciaGrafica);
    }
  }, []);

  const recolectar_oleaje = () => {
    let direccion_ola;
    let altura_ola;
    let periodo_ola;


    // First fetch request
    fetch('https://api.example.com/data1')
      .then((response1) => {
        // Check if the response1 is successful
        if (!response1.ok) {
          throw new Error('Network response was not ok');
        }

        // Parse the JSON data from the first response
        return response1.json();
      })
      .then((data1) => {
        // Use the data from the first fetch to trigger the second fetch
        // Assuming data1 contains information needed for the second fetch
        const url2 = `https://api.example.com/data2/${data1.id}`;

        // Second fetch request
        return fetch(url2);
      })
      .then((response2) => {
        // Check if the response2 is successful
        if (!response2.ok) {
          throw new Error('Network response was not ok');
        }

        // Parse the JSON data from the second response
        return response2.json();
      })
      .then((data2) => {
        // Handle the data from the second fetch
        console.log('Data from the second fetch:', data2);
      })
      .catch((error) => {
        // Handle errors from both fetch requests
        console.error('Error occurred:', error);
      });



    fetch(props.url)
      .then((respuesta) => {
        return respuesta.json();
      })
      .then((data_olas) => {
        console.log("fetch Oleaje... exito");
        console.log("fetch Oleaje OpenMeteo: " + props.url);
        console.log(data_olas);

        datos = data_olas.hourly;
        // datos.time = datos.time.map((v) => v.slice(11, 13) + "h");
        datos.etiquetas = etiquetas;

        let color = "blue";

        datos.colores = datos.wave_direction.map((angulo) => {
          for (const direction of direcciones) {
            if (angulo >= direction.range[0] && angulo < direction.range[1]) {
              return direction.color;
            }
          }
        });

        datos.colores_columnas = colores_columnas;

        altura_ola = datos.wave_height[horas_hoy].toFixed(1);
        periodo_ola = datos.wave_period[horas_hoy].toFixed(1);

        if (configuracion.periodo == 2 || configuracion.periodo == 7) {
          direccion_ola = datos.wave_direction[horas_hoy];
          setAltura_ola(altura_ola);
          setPeriodo_ola(periodo_ola);
          datos.colores_columnas = [
            ...colores_columnas,
            ...colores_columnas,
            ...colores_columnas,
          ];
        }

        // console.log("fetch Oleaje...");
        // console.log(datos);
        bolaflechar(altura_ola, direccion_ola);
        // if (marea_actual) {
        //   aportar_marea();

        // }
        // graficar_oleaje();

        // MAREAS ______________________________________________

        return fetch(props.url_mareas);
      })
      .then((response2) => {
        return response2.json();
      })
      .then((data_mareas) => {
        // Handle the data from the second fetch
        console.log('Data from the second fetch:', data_mareas);

        const datos_mareas_dias = data_mareas.features[0].properties.days;
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

        let array_puntos_marea_prevision = [].concat(...puntos_marea_prevision).map(obj => obj.fecha_marea);
        let array_puntos_marea_prevision_altura = [].concat(...puntos_marea_prevision).map(obj => obj.altura);

        console.log("ptos_marea_prev_flat: ")
        console.log(array_puntos_marea_prevision_altura);

        // creamos el array de datos para la gráfica:
        let array_mareas = Array(168).fill(0);

        function getHourDifferences(dateArray) {
          if (dateArray.length === 0) {
            return []; // If the input array is empty, return an empty array
          }

          // Find the 0th hour (midnight) of the first day's date
          const firstDate = dateArray[0];
          const firstDayMidnight = new Date(firstDate);
          firstDayMidnight.setHours(0, 0, 0, 0);

          // Calculate the absolute hour difference for each date object
          const hourDifferences = dateArray.map((date) => {
            const diffInMilliseconds = Math.abs(date - firstDayMidnight);
            const diffInHours = diffInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
            return Math.round(diffInHours); // Round the hour difference to the nearest whole number
          });

          return hourDifferences;
        }

        // Example usage:
        // const dateArray = [
        //   new Date("2023-07-16T02:52:00"), // Example date 1
        //   new Date("2023-07-16T10:30:00"), // Example date 2
        //   new Date("2023-07-17T06:15:00"), // Example date 3
        //   new Date("2023-07-18T20:45:00"), // Example date 4
        // ];

        const hourDifferences = getHourDifferences(array_puntos_marea_prevision);
        console.log("hourdiff");
        console.log(hourDifferences);

        // const flattenedArray = [].concat(...dataObject);
        const array_horas_alturas = array_puntos_marea_prevision_altura.map((altura, index) => ({
          altura: altura,
          horas: hourDifferences[index] // Access "horas" values from the fixed array
        }));

        console.log("combinado");
        console.log(array_horas_alturas);
        const array_puntos_marea_grafica = Array(168).fill(0); // Create a new array of 168 elements, initialized with zeros

        // Set the "altura" values at their corresponding indices
        array_horas_alturas.forEach(({ altura, horas }) => {
          array_puntos_marea_grafica[horas] = altura;
        });

        console.log("completo");
        console.log(array_puntos_marea_grafica);

        datos.mareas = array_puntos_marea_grafica;
        datos.mareas_radio = array_puntos_marea_grafica.map((value) => (value > 0 ? 5 : 0));

        graficar_oleaje();


      })
      .catch((error) => {
        // Handle errors from both fetch requests
        console.error('Error occurred:', error);
      });
    // MAREAS ______________________________________________



  };

  const { graficar_estado } = useContext(UserContext);

  useEffect(() => {
    recolectar_oleaje();
  }, [graficar_estado]);

  function graficar_oleaje() {
    let hasta = 49;
    if (configuracion.periodo != 2) {
      hasta = 168;
    }

    context = grafica.current.chartInstance;
    // if (chart_oleaje) {
    //   setChart_oleaje(null);
    // }

    let mostrar_etiquetas_horas_dias = true;
    if (props.formato == "clasico") {
      mostrar_etiquetas_horas_dias = true;
    } else {
      mostrar_etiquetas_horas_dias = false;
    }

    const nuevosDatos = {
      // labels: datos.time.slice(horas_hoy, hasta),
      labels: datos.etiquetas.slice(horas_hoy, hasta),
      datasets: [
        {
          label: "Oleaje",
          type: "bar",
          yAxisID: "y_oleaje",
          data: datos.wave_height.slice(horas_hoy, hasta),
          // pointStyle: "circle",
          // pointRadius: 3,
          // pointBackgroundColor: datos.colores.slice(horas_hoy, hasta),
          backgroundColor: datos.colores.slice(horas_hoy, hasta),
          order: 1,
        },
        {
          label: "Periodo",
          type: "line",
          data: datos.wave_period.slice(horas_hoy, hasta),
          yAxisID: "y_periodo",
          borderWidth: 2,
          borderColor: "purple",
          pointRadius: 0,
          // backgroundColor: "grey",

          // barPercentage: 1,
          // categoryPercentage: 1,
          order: 2,
        },
        {
          type: "bar",
          data: Array(datos.colores.slice(horas_hoy, hasta).length).fill(6),
          yAxisID: 'y_dianoche',
          backgroundColor: datos.colores_columnas.slice(horas_hoy, hasta),
          barPercentage: 1,
          categoryPercentage: 1,
          order: 4,
        },
        {
          type: "line",
          yAxisID: "y_mareas",
          pointStyle: "circle",
          pointRadius: datos.mareas_radio.slice(horas_hoy, hasta),
          // borderColor: "blue",
          borderWidth: 0,
          data: datos.mareas.slice(horas_hoy, hasta),
          backgroundColor: "turquoise",
        },

      ],
    };

    // nuevosDatos.datasets.push({
    //   type: "bar",
    //   data: Array(datos.colores.slice(horas_hoy, hasta).length).fill(6),
    //   yAxisID: 'y_dianoche',
    //   backgroundColor: datos.colores_columnas.slice(horas_hoy, hasta),
    //   barPercentage: 1,
    //   categoryPercentage: 1,
    //   order: 4,
    // });

    const nuevasOpciones = {
      events: ["click"],
      maintainAspectRatio: false,
      // height: 100, // Specify the desired height here
      // backgroundColor: "#b9bbc2", // de las barras
      // backgroundColor: datos.colores.slice(horas_hoy, 73),
      plugins: {
        legend: {
          display: false,
          labels: {
            color: "grey",
          },
        },
      },
      scales: {
        y_mareas: {
          grid: {
            display: false,
          },
          display: false,
          position: "right",
          max: 4,
          min: 0,
        },
        y_oleaje: {
          title: {
            display: false,
            text: "Altura de ola (m)",
          },
          grid: {
            display: true,
          },
          display: true,
          position: "left",
          max: 6,
          min: 0,
          ticks: {
            color: 'blue',
            stepSize: 1,
          },
          backgroundColor: "white",

          // fillColor: "red",
          // strokeColor: "rgba(220,220,220,0.8)",
          // highlightFill: "rgba(220,220,220,0.75)",
          // highlightStroke: "rgba(220,220,220,1)",
        },
        y_periodo: {
          title: {
            display: false,
            text: "Período (s)",
          },
          grid: {
            display: false,
          },
          display: mostrar_etiquetas_horas_dias,
          position: "right",
          max: 15,
          min: 0,
          ticks: {
            color: 'purple',
            stepSize: 1,
          },
        },

        x_dias: {
          // Add a second x-axis scale for the bottom labels
          position: "bottom", // Place the x-axis labels on bottom
          grid: {
            display: false, // Hide the x-axis grid lines
          },
          display: mostrar_etiquetas_horas_dias,
          ticks: {
            maxRotation: 0,
            minRotation: 0,
            callback: function (label) {
              let etiqueta = this.getLabelForValue(label);
              var dia = etiqueta.split(";")[1];
              return dia;
            },
          },
        },
        y_dianoche: {
          grid: {
            display: false,
          },
          display: false,
          position: "right",
          max: 6,
          min: 0,
        },
        x: {
          position: "bottom", // Place the x-axis labels on top
          grid: {
            display: false, // Hide the x-axis grid lines
          },
          display: mostrar_etiquetas_horas_dias,
          ticks: {
            maxRotation: 0,
            minRotation: 0,
            callback: function (label) {
              let etiqueta = this.getLabelForValue(label);
              var horas = etiqueta.split(";")[0];
              return horas;
            },
          },
        },
      },
    };



    console.log("Grafica: nuevos datos")
    console.log(nuevosDatos);
    console.log("Grafica: nuevas opciones")
    console.log(nuevasOpciones);

    parametrosGrafica.data = nuevosDatos;
    parametrosGrafica.options = nuevasOpciones;
    parametrosGrafica.update();
  }

  // const tableStyle = {
  //   borderCollapse: "collapse",
  //   width: "100%",
  // };

  // const cellStyle = {
  //   padding: "7",
  //   border: "none",
  //   textAlign: "center",
  // };

  function cabecera() {
    if (configuracion.periodo == 2 || configuracion.periodo == 7) {
      return (
        <>
          <table className="tabla_barrainfo">
            <tr>
              <td width="10px">
                <div className="rotated-text letragrande">
                  Oleaje
                </div>
              </td>
              <td width="45px">
                <img
                  src="imagenes/ola_redondo.png"
                  style={{ width: "45px" }} />
              </td>
              <td width="10px">
                <div className="rotated-text">
                  Altura
                </div>
              </td>
              <td>
                <canvas ref={marco_bolaola_ref} width={64} height={64} />
              </td>
              <td width="10px">
                <div className="rotated-text">
                  Periodo
                </div>
              </td>
              <td>
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

            </tr>

          </table>
        </>
      );

    } else {
      return "";
    }
  }

  function bolaflechar(altura_ola, direccion_ola) {

    if (marco_bolaola_ref.current) {
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

      const marco_bolaola = marco_bolaola_ref.current;
      const context = marco_bolaola.getContext("2d");

      const centerX = marco_bolaola.width / 2;
      const centerY = marco_bolaola.height / 2;
      const radius = 22;

      // Clear the canvas context
      context.clearRect(0, 0, marco_bolaola.width, marco_bolaola.height);

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

  }

  return (
    <div>
      {props.formato === "clasico" && (
        <div
          className="alert alert-info m-1 etiqueta-info"
          style={{ padding: "3px", width: "100%" }}
        >
          {cabecera()}
        </div>
      )}

      <div className="card m-2" style={{ width: "100%", height: "175px" }}>
        {/* oleaje: altura, período y dirección - a {configuracion.periodo}dias */}
        <canvas ref={grafica}></canvas>
      </div>
    </div>
  );
};

export default Oleaje;
