import React, { useState, useRef, useEffect } from "react";
import Chart from "chart.js/auto";

import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";

const Marea = (props) => {

  console.log("props-datos: ");
  console.log(props.datos);

  const { fecha_actual_estado } = useContext(UserContext);
  const [fecha_actual] = fecha_actual_estado;
  // const fecha_actual = new Date("Wed Jul 01 2023 02:30:44");
  const horas_hoy = fecha_actual.getHours();


  const { configuracion_estado } = useContext(UserContext);
  const [configuracion, setConfiguracion] = configuracion_estado;

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

  const { graficar_estado } = useContext(UserContext);

  // const { mareas_estado, setMareasEstado } = useContext(UserContext);
  // const [mareas, setMareas] = mareas_estado;

  // console.log("mareas_estado");
  // console.log(mareas_estado);

  const grafica = useRef(null);

  let context = null;

  const [altura_marea, setAlturaMarea] = useState("");
  const [hora_marea, setHoraMarea] = useState("");

  const flecha_marea = useRef(null);

  // let puntos_grafica_marea = {
  //   horas: [],
  //   alturas: [],
  // };

  // no he conseguido mover este estilo a un css..........................................
  const estilo_1linea = {
    color: "grey",
    fontWeight: "bold",

    fontSize: "26px",
    fontFamily: "Sans-Serif",
  };
  // no he conseguido mover este estilo a un css..........................................

  // esta función es para poder mostrar o no la cabecera de mareas (en la predicción de 7 días no se muestra)
  function cabecera() {
    if (configuracion.periodo == 2 || configuracion.periodo == 7) {
      return (
        <>
          <table className="tabla_barrainfo">
            <tr>
              <td width="10px">
                <div className="rotated-text letragrande">
                  Marea
                </div>
              </td>
              <td width="45px" onClick={graficar_mareas}>
                <img
                  src="imagenes/bola_marea_luna.png"
                  style={{ width: "45px" }}
                />
              </td>
              <td width="10px">
                <div className="rotated-text">
                  Punto
                </div>
              </td>
              <td style={estilo_1linea}> {altura_marea}</td>
              <td width="10px">
                <div className="rotated-text">
                  Direcc.
                </div>
              </td>
              <td>
                <img
                  src="imagenes/flecha_marea.png"
                  ref={flecha_marea}
                  style={{ width: "2.3rem", height: "2.3rem" }}
                />
              </td>
              {/* <td width="10px">
                <div className="rotated-text">
                  Marea
                </div>
              </td> */}
              {/* <td rowSpan="2">{hora_marea}</td> */}
              <td className="letragrande" width="70px">

                {props.datos.marea_actual.puntos_marea.map((marea, index) => {
                  let marea_prox = "";
                  if (marea.marea == "pleamar") { marea_prox = "Plea" } else { marea_prox = "Baja" }
                  const hora =
                    marea.fecha_marea.getHours().toString().padStart(2, "0") +
                    ":" +
                    marea.fecha_marea
                      .getMinutes()
                      .toString()
                      .padStart(2, "0");
                  if (hora === props.datos.marea_actual.hora) {
                    return (marea_prox + ":   " + hora)
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

  useEffect(() => {
    // debugger;
    setAlturaMarea(props.datos.marea_actual.nivel);
    setHoraMarea(props.datos.marea_actual.hora);
    // calculamos la rotación de la flecha
    flecha_marea.current.style.transform =
      "rotate(" + props.datos.marea_actual.direccion + "deg)";
    console.log("rotate(" + props.datos.marea_actual.direccion + "deg)");
    flecha_marea.current.height = 50;
    flecha_marea.current.width = 40;
  }, [graficar_estado]);

  // useEffect(() => {
  //   debugger;
  //   setAlturaMarea(props.marea_actual.nivel);
  //   setHoraMarea(props.marea_actual.hora);
  //   // calculamos la rotación de la flecha
  //   flecha_marea.current.style.transform =
  //     "rotate(" + props.marea_actual.direccion + "deg)";
  //   flecha_marea.current.height = 50;
  //   flecha_marea.current.width = 40;
  // }, [props.marea_actual]);


  // useEffect(() => {
  //   graficar_mareas();

  // }, [graficar_estado]);


  function graficar_mareas() {
    let hasta = 49;
    if (configuracion.periodo != 2) {
      hasta = 168;
    }

    context = grafica.current.chartInstance;
    // if (chart) {
    //   setChart_mareas(null);
    // }

    const nuevosDatos = {
      // labels: datos.time.slice(horas_hoy, hasta),
      labels: props.datos.mareas.etiquetas.slice(horas_hoy, hasta),
      datasets: [

        { // DIANOCHE
          type: "bar",
          data: Array(props.datos.mareas.etiquetas.slice(horas_hoy, hasta).length).fill(6),
          yAxisID: 'y_dianoche',
          backgroundColor: props.datos.mareas.colores_columnas.slice(horas_hoy, hasta),
          barPercentage: 1,
          categoryPercentage: 1,
          order: 4,
        },
        { // MAREAS
          type: "line",
          yAxisID: "y_mareas",
          pointStyle: "circle",
          pointRadius: props.datos.mareas.bola_radio.slice(horas_hoy, hasta),
          // borderColor: "blue",
          borderWidth: 0,
          data: props.datos.mareas.slice(horas_hoy, hasta),
          backgroundColor: "turquoise",
        }
      ],
    };

    const nuevasOpciones = {
      events: ["click"],
      maintainAspectRatio: false,
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
            display: true,
          },
          display: true,
          position: "left",
          max: 4.5,
          min: 0,
        },
        x: {
          position: "bottom", // Place the x-axis labels on top
          grid: {
            display: false, // Hide the x-axis grid lines
          },
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
        x_dias: {
          // Add a second x-axis scale for the bottom labels
          position: "bottom", // Place the x-axis labels on bottom
          grid: {
            display: false, // Hide the x-axis grid lines
          },
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



  return (
    <>
      <div
        className="alert alert-info m-1 etiqueta-info"
        style={{ padding: "3px", width: "100%" }}
      >
        {cabecera()}
      </div>
      {/* altura de mareas - a {configuracion.periodo}dias */}
      {/* <MareaGrafica punto_marea_fecha1={puntos_marea[0].fecha_marea} punto_marea_altura1={puntos_marea[0].altura} punto_marea_fecha2={puntos_marea[1].fecha_marea} punto_marea_altura2={puntos_marea[1].altura} punto_marea_fecha3={puntos_marea[2].fecha_marea} punto_marea_altura3={puntos_marea[2].altura} /> */}
      <div className="card m-2" style={{ width: "100%", height: "130px" }}>
        {/* mareas: hora y altura - a {configuracion.periodo}dias */}
        <canvas ref={grafica}></canvas>
      </div>

    </>
  );
};

export default Marea;
