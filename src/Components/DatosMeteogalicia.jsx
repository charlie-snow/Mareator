import React, { useState, useRef } from "react";
// import { registerables } from "chart.js";
// import Chart from "chart.js/auto";
// import { useEffect } from "react";
// import { UserContext } from "../Contexts/UserContext";
// import { useContext } from "react";

// const DatosMeteogalicia = () => {
// console.log(props);
// const { url, marea_actual } = props;

const fecha_actual = new Date();
const horas_hoy = fecha_actual.getHours();

// const { configuracion_estado } = useContext(UserContext);
// const [configuracion, setConfiguracion] = configuracion_estado;

const url_meteosix =
  "https://servizos.meteogalicia.gal/apiv4/getTidesInfo?coords=-8.393,43.3781&API_KEY=WN7oiatPXPsG1C91GdPM7a60a9qTx9MD7SfIV0HUlI0z16elB8NZj76Qsi4WMTPi";

var proxyUrl = "https://corsproxy.io/?";
const url = proxyUrl + url_meteosix;

let datos = {};

// export function recolectar_meteogalicia() {

//   let datos = {};
//   // PRUEBA SIMPLE ________________-
//   // fetch(url)
//   //   .then((res) => {
//   //     res.text().then((htmlTxt) => {
//   //       // var domParser = new DOMParser()
//   //       // let doc = domParser.parseFromString(htmlTxt, 'text/html')
//   //       // var feedUrl = doc.querySelector('link[type="application/rss+xml"]').href
//   //       console.log("fetch Texto de meteogalicia...");
//   //       console.log(htmlTxt);
//   //     });
//   //   })
//   //   .catch(() => console.error("Error in fetching the website"));

//   // FETCH OPERATIVO ___________________________
//   fetch(url)
//     .then((respuesta) => {
//       return respuesta.json();
//     })
//     .then((data) => {
//       // console.log("fetch Meteogalicia... exito");
//       // console.log("fetch Meteogalicia: " + url);

//       // console.log(data);

//       datos = data;

//     });
//   return datos;

// };

export function recolectar_meteogalicia() {
  let puntos_marea = [];

  // async function fetchar_meteogalicia() {
  let datos = [];

  // try {
  // const response = await fetch(url);
  // const dataArray = await response.json();
  // const jsonData = await dataArray;

  let jsonData;

  fetch(url).then(response =>
    response.json().then(data => ({
      data: data,
      status: response.status
    })
    ).then(res => {
      console.log("thenes: ");
      console.log(res.data.features[0].properties.days[0].variables[0].summary);
      jsonData = res.data;
      console.log("jsonData: ")
      console.log(jsonData);

      const puntos_marea_crudo = [...jsonData.features[0].properties.days[0].variables[0].summary];

      console.log("datos: ")
      console.log(puntos_marea_crudo);

      return puntos_marea_crudo;
    }));
  return datos;


  // let puntos_marea = [];

  // PASAMOS LAS FECHAS DE LOS PUNTOS DE MAREA DE GMT A CEST
  // for (let i = puntos_marea_gmt.length - 1; i >= 0; i--) {
  //   marea = puntos_marea_gmt[i].tipo;
  //   hora = puntos_marea_gmt[i].hora;
  //   altura = puntos_marea_gmt[i].altura;
  //   // console.log("Marea " + marea + " a las " + hora);
  //   fecha_marea = new Date(
  //     Date.UTC(
  //       hoy.getFullYear(),
  //       hoy.getMonth(),
  //       hoy.getDate(),
  //       hora.substring(0, 2),
  //       hora.substring(3, 5),
  //       0,
  //       0
  //     )
  //   );
  //   puntos_marea = [{ fecha_marea, marea, altura }].concat(puntos_marea); // [ 4, 3, 2, 1 ]
  // }

  // datos = puntos_marea_crudo;


  // } catch (error) {
  //   console.error("Error in fetching the website", error);
  //   return puntos_marea; // Return an empty object or some default value in case of an error.
  // }
  // }

  // puntos_marea = fetchar_meteogalicia();
  // console.log("ptos: ")
  // console.log(puntos_marea);
  // return puntos_marea;
}


  // recolectar_meteogalicia();

  // const aportar_marea = () => {
  //   let altura_marea = [
  //     ...Array(168).fill(0)];
  //   // marea_actual.puntos_marea.map((marea, index) => {
  //   //   const hora = parseInt(marea.fecha_marea.getHours().toString().padStart(2, "0"));
  //   //   altura_marea[hora] = marea.altura;
  //   // })
  //   console.log("---------------------  Marear ...");
  //   console.log(altura_marea);
  //   // datos.altura_marea = altura_marea;
  //   console.log("Marear ... datos");
  //   console.log(datos);
  // }

  // const { graficar_estado } = useContext(UserContext);

  // useEffect(() => {
  //   recolectar_oleaje();
  // }, [graficar_estado]);

  // return null;

  // return (
  //   <div>
  //     <div
  //       className="alert alert-info m-1"
  //       style={{ padding: "3px", width: "100%" }}
  //     >
  //       {cabecera()}
  //     </div>
  //     <div className="card m-2" style={{ width: "100%", height: "175px" }}>
  //       {/* oleaje: altura, período y dirección - a {configuracion.periodo}dias */}
  //       <canvas ref={grafica}></canvas>
  //     </div>
  //   </div>
  // );
// };

// export default DatosMeteogalicia;
