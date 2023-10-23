import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";


const Fuentes = () => {


  const url_meteosix =
    "https://servizos.meteogalicia.gal/apiv4/getTidesInfo?coords=-8.393,43.3781&API_KEY=WN7oiatPXPsG1C91GdPM7a60a9qTx9MD7SfIV0HUlI0z16elB8NZj76Qsi4WMTPi";

  var proxyUrl = "https://corsproxy.io/?";
  let url = proxyUrl + url_meteosix;
  url = encodeURIComponent(url);

  return (
    <>
      <div className="card m-1" style={{ width: "100%", height: "20%" }}>
        <table cellSpacing="0" cellPadding="0">
          <tbody>
            <tr>
              <td style={{ width: "20%" }}>Meteogalicia</td>
            </tr>
            <tr>
              <td>
                Mareas con proxy: <a href={url} target="blank">CRUDO</a> | <NavLink className="nav-link" aria-current="page" to={{
                  pathname: '/meteogalicia',
                  search: `?location=${url}`,
                }}>
                  Tabla
                </NavLink>
              </td>
            </tr>

            <tr>
              <td style={{ width: "20%" }}>AEMET</td>
            </tr>
            <tr>
              <td>
                Mareas con proxy: <a href={url} target="blank">CRUDO</a> | <NavLink className="nav-link" aria-current="page" to={{
                  pathname: '/meteogalicia',
                  search: `?location=${url}`,
                }}>
                  Tabla
                </NavLink>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

    </>
  );
};

export default Fuentes;
