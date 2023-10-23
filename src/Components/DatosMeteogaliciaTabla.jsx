import React, { useState, useRef } from "react";
import { useLocation } from 'react-router-dom';

const DatosMeteogaliciaTabla = () => {

  const fecha_actual = new Date();
  const horas_hoy = fecha_actual.getHours();

  const [datos, setDatos] = useState("");

  // const url_meteosix =
  //   "https://servizos.meteogalicia.gal/apiv4/getTidesInfo?coords=-8.393,43.3781&API_KEY=WN7oiatPXPsG1C91GdPM7a60a9qTx9MD7SfIV0HUlI0z16elB8NZj76Qsi4WMTPi";

  // var proxyUrl = "https://corsproxy.io/?";
  // const url = proxyUrl + url_meteosix;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const url = queryParams.get('location');

  console.log("url:");
  console.log(url);


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

      console.log("datos crudos: ")
      console.log(puntos_marea_crudo);

      let data;

      const johndoe = `{
        "name": "John Doe",
        "age": 30,
        "email": "john.doe@example.com",
        "is_employed": true,
        "hobbies": ["reading", "swimming", "gardening"],
        "address": {
          "street": "123 Main Street",
          "city": "New York",
          "zip_code": "10001"
        }
      }`;

      const days = `{
        "days": [
          {
            "timePeriod": {
              "begin": {
                "timeInstant": "2023-07-18T00:00:00+02"
              },
              "end": {
                "timeInstant": "2023-07-18T23:59:59+02"
              }
            },
            "variables": [
              {
                "name": "tides",
                "units": "m",
                "summary": [
                  {
                    "id": "0",
                    "state": "High tides",
                    "timeInstant": "2023-07-18T05:36:00+02",
                    "height": 3.3
                  },
                  {
                    "id": "1",
                    "state": "Low tides",
                    "timeInstant": "2023-07-18T11:35:00+02",
                    "height": 1
                  },
                  {
                    "id": "2",
                    "state": "High tides",
                    "timeInstant": "2023-07-18T17:50:00+02",
                    "height": 3.6
                  }
                ],
                "values": [
                  {
                    "timeInstant": "2023-07-18T00:00:00+02",
                    "height": 0.95
                  },
                  {
                    "timeInstant": "2023-07-18T00:30:00+02",
                    "height": 1.06
                  },
                  {
                    "timeInstant": "2023-07-18T01:00:00+02",
                    "height": 1.25
                  },
                  {
                    "timeInstant": "2023-07-18T01:30:00+02",
                    "height": 1.49
                  },
                  {
                    "timeInstant": "2023-07-18T02:00:00+02",
                    "height": 1.77
                  },
                  {
                    "timeInstant": "2023-07-18T02:30:00+02",
                    "height": 2.08
                  },
                  {
                    "timeInstant": "2023-07-18T03:00:00+02",
                    "height": 2.39
                  },
                  {
                    "timeInstant": "2023-07-18T03:30:00+02",
                    "height": 2.69
                  },
                  {
                    "timeInstant": "2023-07-18T04:00:00+02",
                    "height": 2.94
                  },
                  {
                    "timeInstant": "2023-07-18T04:30:00+02",
                    "height": 3.14
                  },
                  {
                    "timeInstant": "2023-07-18T05:00:00+02",
                    "height": 3.27
                  },
                  {
                    "timeInstant": "2023-07-18T05:30:00+02",
                    "height": 3.32
                  },
                  {
                    "timeInstant": "2023-07-18T06:00:00+02",
                    "height": 3.3
                  },
                  {
                    "timeInstant": "2023-07-18T06:30:00+02",
                    "height": 3.2
                  },
                  {
                    "timeInstant": "2023-07-18T07:00:00+02",
                    "height": 3.04
                  },
                  {
                    "timeInstant": "2023-07-18T07:30:00+02",
                    "height": 2.81
                  },
                  {
                    "timeInstant": "2023-07-18T08:00:00+02",
                    "height": 2.54
                  },
                  {
                    "timeInstant": "2023-07-18T08:30:00+02",
                    "height": 2.25
                  },
                  {
                    "timeInstant": "2023-07-18T09:00:00+02",
                    "height": 1.94
                  },
                  {
                    "timeInstant": "2023-07-18T09:30:00+02",
                    "height": 1.64
                  },
                  {
                    "timeInstant": "2023-07-18T10:00:00+02",
                    "height": 1.38
                  },
                  {
                    "timeInstant": "2023-07-18T10:30:00+02",
                    "height": 1.18
                  },
                  {
                    "timeInstant": "2023-07-18T11:00:00+02",
                    "height": 1.04
                  },
                  {
                    "timeInstant": "2023-07-18T11:30:00+02",
                    "height": 0.99
                  },
                  {
                    "timeInstant": "2023-07-18T12:00:00+02",
                    "height": 1.02
                  },
                  {
                    "timeInstant": "2023-07-18T12:30:00+02",
                    "height": 1.13
                  },
                  {
                    "timeInstant": "2023-07-18T13:00:00+02",
                    "height": 1.31
                  },
                  {
                    "timeInstant": "2023-07-18T13:30:00+02",
                    "height": 1.55
                  },
                  {
                    "timeInstant": "2023-07-18T14:00:00+02",
                    "height": 1.85
                  },
                  {
                    "timeInstant": "2023-07-18T14:30:00+02",
                    "height": 2.17
                  },
                  {
                    "timeInstant": "2023-07-18T15:00:00+02",
                    "height": 2.5
                  },
                  {
                    "timeInstant": "2023-07-18T15:30:00+02",
                    "height": 2.82
                  },
                  {
                    "timeInstant": "2023-07-18T16:00:00+02",
                    "height": 3.1
                  },
                  {
                    "timeInstant": "2023-07-18T16:30:00+02",
                    "height": 3.34
                  },
                  {
                    "timeInstant": "2023-07-18T17:00:00+02",
                    "height": 3.51
                  },
                  {
                    "timeInstant": "2023-07-18T17:30:00+02",
                    "height": 3.6
                  },
                  {
                    "timeInstant": "2023-07-18T18:00:00+02",
                    "height": 3.61
                  },
                  {
                    "timeInstant": "2023-07-18T18:30:00+02",
                    "height": 3.55
                  },
                  {
                    "timeInstant": "2023-07-18T19:00:00+02",
                    "height": 3.4
                  },
                  {
                    "timeInstant": "2023-07-18T19:30:00+02",
                    "height": 3.19
                  },
                  {
                    "timeInstant": "2023-07-18T20:00:00+02",
                    "height": 2.93
                  },
                  {
                    "timeInstant": "2023-07-18T20:30:00+02",
                    "height": 2.62
                  },
                  {
                    "timeInstant": "2023-07-18T21:00:00+02",
                    "height": 2.28
                  },
                  {
                    "timeInstant": "2023-07-18T21:30:00+02",
                    "height": 1.94
                  },
                  {
                    "timeInstant": "2023-07-18T22:00:00+02",
                    "height": 1.62
                  },
                  {
                    "timeInstant": "2023-07-18T22:30:00+02",
                    "height": 1.33
                  },
                  {
                    "timeInstant": "2023-07-18T23:00:00+02",
                    "height": 1.11
                  },
                  {
                    "timeInstant": "2023-07-18T23:30:00+02",
                    "height": 0.96
                  }
                ]
              }
            ]
          },
    
        ]
      }`;

      const featurecol = `{{
        "type": "FeatureCollection",
        "crs": {
          "type": "name",
          "properties": {
            "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
          }
        },
        "features": [
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [-8.324, 43.4969]
            },
            "properties": {
              "port": {
                "id": "14",
                "name": "Ferrol Porto Exterior",
                "geometry": {
                  "type": "Point",
                  "coordinates": [-8.32556, 43.46278]
                }
              },
              "referencePort": {
                "id": "14",
                "name": "Ferrol Porto Exterior",
                "geometry": {
                  "type": "Point",
                  "coordinates": [-8.32556, 43.46278]
                }
              },
              "days": [
                {
                  "timePeriod": {
                    "begin": {
                      "timeInstant": "2023-07-18T00:00:00+02"
                    },
                    "end": {
                      "timeInstant": "2023-07-18T23:59:59+02"
                    }
                  },
                  "variables": [
                    {
                      "name": "tides",
                      "units": "m",
                      "summary": [
                        {
                          "id": "0",
                          "state": "High tides",
                          "timeInstant": "2023-07-18T05:36:00+02",
                          "height": 3.3
                        },
                        {
                          "id": "1",
                          "state": "Low tides",
                          "timeInstant": "2023-07-18T11:35:00+02",
                          "height": 1
                        },
                        {
                          "id": "2",
                          "state": "High tides",
                          "timeInstant": "2023-07-18T17:50:00+02",
                          "height": 3.6
                        }
                      ],
                      "values": [
                        {
                          "timeInstant": "2023-07-18T00:00:00+02",
                          "height": 0.95
                        },
                        {
                          "timeInstant": "2023-07-18T00:30:00+02",
                          "height": 1.06
                        },
                        {
                          "timeInstant": "2023-07-18T01:00:00+02",
                          "height": 1.25
                        },
                        {
                          "timeInstant": "2023-07-18T01:30:00+02",
                          "height": 1.49
                        },
                        {
                          "timeInstant": "2023-07-18T02:00:00+02",
                          "height": 1.77
                        },
                        {
                          "timeInstant": "2023-07-18T02:30:00+02",
                          "height": 2.08
                        },
                        {
                          "timeInstant": "2023-07-18T03:00:00+02",
                          "height": 2.39
                        },
                        {
                          "timeInstant": "2023-07-18T03:30:00+02",
                          "height": 2.69
                        },
                        {
                          "timeInstant": "2023-07-18T04:00:00+02",
                          "height": 2.94
                        },
                        {
                          "timeInstant": "2023-07-18T04:30:00+02",
                          "height": 3.14
                        },
                        {
                          "timeInstant": "2023-07-18T05:00:00+02",
                          "height": 3.27
                        },
                        {
                          "timeInstant": "2023-07-18T05:30:00+02",
                          "height": 3.32
                        },
                        {
                          "timeInstant": "2023-07-18T06:00:00+02",
                          "height": 3.3
                        },
                        {
                          "timeInstant": "2023-07-18T06:30:00+02",
                          "height": 3.2
                        },
                        {
                          "timeInstant": "2023-07-18T07:00:00+02",
                          "height": 3.04
                        },
                        {
                          "timeInstant": "2023-07-18T07:30:00+02",
                          "height": 2.81
                        },
                        {
                          "timeInstant": "2023-07-18T08:00:00+02",
                          "height": 2.54
                        },
                        {
                          "timeInstant": "2023-07-18T08:30:00+02",
                          "height": 2.25
                        },
                        {
                          "timeInstant": "2023-07-18T09:00:00+02",
                          "height": 1.94
                        },
                        {
                          "timeInstant": "2023-07-18T09:30:00+02",
                          "height": 1.64
                        },
                        {
                          "timeInstant": "2023-07-18T10:00:00+02",
                          "height": 1.38
                        },
                        {
                          "timeInstant": "2023-07-18T10:30:00+02",
                          "height": 1.18
                        },
                        {
                          "timeInstant": "2023-07-18T11:00:00+02",
                          "height": 1.04
                        },
                        {
                          "timeInstant": "2023-07-18T11:30:00+02",
                          "height": 0.99
                        },
                        {
                          "timeInstant": "2023-07-18T12:00:00+02",
                          "height": 1.02
                        },
                        {
                          "timeInstant": "2023-07-18T12:30:00+02",
                          "height": 1.13
                        },
                        {
                          "timeInstant": "2023-07-18T13:00:00+02",
                          "height": 1.31
                        },
                        {
                          "timeInstant": "2023-07-18T13:30:00+02",
                          "height": 1.55
                        },
                        {
                          "timeInstant": "2023-07-18T14:00:00+02",
                          "height": 1.85
                        },
                        {
                          "timeInstant": "2023-07-18T14:30:00+02",
                          "height": 2.17
                        },
                        {
                          "timeInstant": "2023-07-18T15:00:00+02",
                          "height": 2.5
                        },
                        {
                          "timeInstant": "2023-07-18T15:30:00+02",
                          "height": 2.82
                        },
                        {
                          "timeInstant": "2023-07-18T16:00:00+02",
                          "height": 3.1
                        },
                        {
                          "timeInstant": "2023-07-18T16:30:00+02",
                          "height": 3.34
                        },
                        {
                          "timeInstant": "2023-07-18T17:00:00+02",
                          "height": 3.51
                        },
                        {
                          "timeInstant": "2023-07-18T17:30:00+02",
                          "height": 3.6
                        },
                        {
                          "timeInstant": "2023-07-18T18:00:00+02",
                          "height": 3.61
                        },
                        {
                          "timeInstant": "2023-07-18T18:30:00+02",
                          "height": 3.55
                        },
                        {
                          "timeInstant": "2023-07-18T19:00:00+02",
                          "height": 3.4
                        },
                        {
                          "timeInstant": "2023-07-18T19:30:00+02",
                          "height": 3.19
                        },
                        {
                          "timeInstant": "2023-07-18T20:00:00+02",
                          "height": 2.93
                        },
                        {
                          "timeInstant": "2023-07-18T20:30:00+02",
                          "height": 2.62
                        },
                        {
                          "timeInstant": "2023-07-18T21:00:00+02",
                          "height": 2.28
                        },
                        {
                          "timeInstant": "2023-07-18T21:30:00+02",
                          "height": 1.94
                        },
                        {
                          "timeInstant": "2023-07-18T22:00:00+02",
                          "height": 1.62
                        },
                        {
                          "timeInstant": "2023-07-18T22:30:00+02",
                          "height": 1.33
                        },
                        {
                          "timeInstant": "2023-07-18T23:00:00+02",
                          "height": 1.11
                        },
                        {
                          "timeInstant": "2023-07-18T23:30:00+02",
                          "height": 0.96
                        }
                      ]
                    }
                  ]
                },
                {
                  "timePeriod": {
                    "begin": {
                      "timeInstant": "2023-07-19T00:00:00+02"
                    },
                    "end": {
                      "timeInstant": "2023-07-19T23:59:59+02"
                    }
                  },
                  "variables": [
                    {
                      "name": "tides",
                      "units": "m",
                      "summary": [
                        {
                          "id": "0",
                          "state": "Low tides",
                          "timeInstant": "2023-07-19T00:09:00+02",
                          "height": 0.9
                        },
                        {
                          "id": "1",
                          "state": "High tides",
                          "timeInstant": "2023-07-19T06:11:00+02",
                          "height": 3.3
                        },
                        {
                          "id": "2",
                          "state": "Low tides",
                          "timeInstant": "2023-07-19T12:09:00+02",
                          "height": 1
                        },
                        {
                          "id": "3",
                          "state": "High tides",
                          "timeInstant": "2023-07-19T18:24:00+02",
                          "height": 3.6
                        }
                      ],
                      "values": [
                        {
                          "timeInstant": "2023-07-19T00:00:00+02",
                          "height": 0.89
                        },
                        {
                          "timeInstant": "2023-07-19T00:30:00+02",
                          "height": 0.91
                        },
                        {
                          "timeInstant": "2023-07-19T01:00:00+02",
                          "height": 1.01
                        },
                        {
                          "timeInstant": "2023-07-19T01:30:00+02",
                          "height": 1.18
                        },
                        {
                          "timeInstant": "2023-07-19T02:00:00+02",
                          "height": 1.42
                        },
                        {
                          "timeInstant": "2023-07-19T02:30:00+02",
                          "height": 1.7
                        },
                        {
                          "timeInstant": "2023-07-19T03:00:00+02",
                          "height": 2.02
                        },
                        {
                          "timeInstant": "2023-07-19T03:30:00+02",
                          "height": 2.34
                        },
                        {
                          "timeInstant": "2023-07-19T04:00:00+02",
                          "height": 2.64
                        },
                        {
                          "timeInstant": "2023-07-19T04:30:00+02",
                          "height": 2.91
                        },
                        {
                          "timeInstant": "2023-07-19T05:00:00+02",
                          "height": 3.13
                        },
                        {
                          "timeInstant": "2023-07-19T05:30:00+02",
                          "height": 3.27
                        },
                        {
                          "timeInstant": "2023-07-19T06:00:00+02",
                          "height": 3.34
                        },
                        {
                          "timeInstant": "2023-07-19T06:30:00+02",
                          "height": 3.33
                        },
                        {
                          "timeInstant": "2023-07-19T07:00:00+02",
                          "height": 3.24
                        },
                        {
                          "timeInstant": "2023-07-19T07:30:00+02",
                          "height": 3.08
                        },
                        {
                          "timeInstant": "2023-07-19T08:00:00+02",
                          "height": 2.86
                        },
                        {
                          "timeInstant": "2023-07-19T08:30:00+02",
                          "height": 2.59
                        },
                        {
                          "timeInstant": "2023-07-19T09:00:00+02",
                          "height": 2.29
                        },
                        {
                          "timeInstant": "2023-07-19T09:30:00+02",
                          "height": 1.97
                        },
                        {
                          "timeInstant": "2023-07-19T10:00:00+02",
                          "height": 1.67
                        },
                        {
                          "timeInstant": "2023-07-19T10:30:00+02",
                          "height": 1.4
                        },
                        {
                          "timeInstant": "2023-07-19T11:00:00+02",
                          "height": 1.18
                        },
                        {
                          "timeInstant": "2023-07-19T11:30:00+02",
                          "height": 1.04
                        },
                        {
                          "timeInstant": "2023-07-19T12:00:00+02",
                          "height": 0.97
                        },
                        {
                          "timeInstant": "2023-07-19T12:30:00+02",
                          "height": 0.99
                        },
                        {
                          "timeInstant": "2023-07-19T13:00:00+02",
                          "height": 1.09
                        },
                        {
                          "timeInstant": "2023-07-19T13:30:00+02",
                          "height": 1.26
                        },
                        {
                          "timeInstant": "2023-07-19T14:00:00+02",
                          "height": 1.51
                        },
                        {
                          "timeInstant": "2023-07-19T14:30:00+02",
                          "height": 1.8
                        },
                        {
                          "timeInstant": "2023-07-19T15:00:00+02",
                          "height": 2.12
                        },
                        {
                          "timeInstant": "2023-07-19T15:30:00+02",
                          "height": 2.46
                        },
                        {
                          "timeInstant": "2023-07-19T16:00:00+02",
                          "height": 2.78
                        },
                        {
                          "timeInstant": "2023-07-19T16:30:00+02",
                          "height": 3.08
                        },
                        {
                          "timeInstant": "2023-07-19T17:00:00+02",
                          "height": 3.33
                        },
                        {
                          "timeInstant": "2023-07-19T17:30:00+02",
                          "height": 3.51
                        },
                        {
                          "timeInstant": "2023-07-19T18:00:00+02",
                          "height": 3.61
                        },
                        {
                          "timeInstant": "2023-07-19T18:30:00+02",
                          "height": 3.64
                        },
                        {
                          "timeInstant": "2023-07-19T19:00:00+02",
                          "height": 3.58
                        },
                        {
                          "timeInstant": "2023-07-19T19:30:00+02",
                          "height": 3.44
                        },
                        {
                          "timeInstant": "2023-07-19T20:00:00+02",
                          "height": 3.24
                        },
                        {
                          "timeInstant": "2023-07-19T20:30:00+02",
                          "height": 2.97
                        },
                        {
                          "timeInstant": "2023-07-19T21:00:00+02",
                          "height": 2.66
                        },
                        {
                          "timeInstant": "2023-07-19T21:30:00+02",
                          "height": 2.33
                        },
                        {
                          "timeInstant": "2023-07-19T22:00:00+02",
                          "height": 1.98
                        },
                        {
                          "timeInstant": "2023-07-19T22:30:00+02",
                          "height": 1.66
                        },
                        {
                          "timeInstant": "2023-07-19T23:00:00+02",
                          "height": 1.37
                        },
                        {
                          "timeInstant": "2023-07-19T23:30:00+02",
                          "height": 1.13
                        }
                      ]
                    }
                  ]
                },
                {
                  "timePeriod": {
                    "begin": {
                      "timeInstant": "2023-07-20T00:00:00+02"
                    },
                    "end": {
                      "timeInstant": "2023-07-20T23:59:59+02"
                    }
                  },
                  "variables": [
                    {
                      "name": "tides",
                      "units": "m",
                      "summary": [
                        {
                          "id": "0",
                          "state": "Low tides",
                          "timeInstant": "2023-07-20T00:43:00+02",
                          "height": 0.9
                        },
                        {
                          "id": "1",
                          "state": "High tides",
                          "timeInstant": "2023-07-20T06:44:00+02",
                          "height": 3.3
                        },
                        {
                          "id": "2",
                          "state": "Low tides",
                          "timeInstant": "2023-07-20T12:42:00+02",
                          "height": 1
                        },
                        {
                          "id": "3",
                          "state": "High tides",
                          "timeInstant": "2023-07-20T18:57:00+02",
                          "height": 3.6
                        }
                      ],
                      "values": [
                        {
                          "timeInstant": "2023-07-20T00:00:00+02",
                          "height": 0.97
                        },
                        {
                          "timeInstant": "2023-07-20T00:30:00+02",
                          "height": 0.89
                        },
                        {
                          "timeInstant": "2023-07-20T01:00:00+02",
                          "height": 0.9
                        },
                        {
                          "timeInstant": "2023-07-20T01:30:00+02",
                          "height": 0.99
                        },
                        {
                          "timeInstant": "2023-07-20T02:00:00+02",
                          "height": 1.16
                        },
                        {
                          "timeInstant": "2023-07-20T02:30:00+02",
                          "height": 1.39
                        },
                        {
                          "timeInstant": "2023-07-20T03:00:00+02",
                          "height": 1.67
                        },
                        {
                          "timeInstant": "2023-07-20T03:30:00+02",
                          "height": 1.98
                        },
                        {
                          "timeInstant": "2023-07-20T04:00:00+02",
                          "height": 2.3
                        },
                        {
                          "timeInstant": "2023-07-20T04:30:00+02",
                          "height": 2.6
                        },
                        {
                          "timeInstant": "2023-07-20T05:00:00+02",
                          "height": 2.88
                        },
                        {
                          "timeInstant": "2023-07-20T05:30:00+02",
                          "height": 3.1
                        },
                        {
                          "timeInstant": "2023-07-20T06:00:00+02",
                          "height": 3.26
                        },
                        {
                          "timeInstant": "2023-07-20T06:30:00+02",
                          "height": 3.34
                        },
                        {
                          "timeInstant": "2023-07-20T07:00:00+02",
                          "height": 3.33
                        },
                        {
                          "timeInstant": "2023-07-20T07:30:00+02",
                          "height": 3.25
                        },
                        {
                          "timeInstant": "2023-07-20T08:00:00+02",
                          "height": 3.1
                        },
                        {
                          "timeInstant": "2023-07-20T08:30:00+02",
                          "height": 2.88
                        },
                        {
                          "timeInstant": "2023-07-20T09:00:00+02",
                          "height": 2.61
                        },
                        {
                          "timeInstant": "2023-07-20T09:30:00+02",
                          "height": 2.31
                        },
                        {
                          "timeInstant": "2023-07-20T10:00:00+02",
                          "height": 2
                        },
                        {
                          "timeInstant": "2023-07-20T10:30:00+02",
                          "height": 1.7
                        },
                        {
                          "timeInstant": "2023-07-20T11:00:00+02",
                          "height": 1.43
                        },
                        {
                          "timeInstant": "2023-07-20T11:30:00+02",
                          "height": 1.21
                        },
                        {
                          "timeInstant": "2023-07-20T12:00:00+02",
                          "height": 1.06
                        },
                        {
                          "timeInstant": "2023-07-20T12:30:00+02",
                          "height": 0.98
                        },
                        {
                          "timeInstant": "2023-07-20T13:00:00+02",
                          "height": 0.99
                        },
                        {
                          "timeInstant": "2023-07-20T13:30:00+02",
                          "height": 1.08
                        },
                        {
                          "timeInstant": "2023-07-20T14:00:00+02",
                          "height": 1.25
                        },
                        {
                          "timeInstant": "2023-07-20T14:30:00+02",
                          "height": 1.48
                        },
                        {
                          "timeInstant": "2023-07-20T15:00:00+02",
                          "height": 1.76
                        },
                        {
                          "timeInstant": "2023-07-20T15:30:00+02",
                          "height": 2.08
                        },
                        {
                          "timeInstant": "2023-07-20T16:00:00+02",
                          "height": 2.41
                        },
                        {
                          "timeInstant": "2023-07-20T16:30:00+02",
                          "height": 2.74
                        },
                        {
                          "timeInstant": "2023-07-20T17:00:00+02",
                          "height": 3.04
                        },
                        {
                          "timeInstant": "2023-07-20T17:30:00+02",
                          "height": 3.29
                        },
                        {
                          "timeInstant": "2023-07-20T18:00:00+02",
                          "height": 3.48
                        },
                        {
                          "timeInstant": "2023-07-20T18:30:00+02",
                          "height": 3.59
                        },
                        {
                          "timeInstant": "2023-07-20T19:00:00+02",
                          "height": 3.62
                        },
                        {
                          "timeInstant": "2023-07-20T19:30:00+02",
                          "height": 3.57
                        },
                        {
                          "timeInstant": "2023-07-20T20:00:00+02",
                          "height": 3.44
                        },
                        {
                          "timeInstant": "2023-07-20T20:30:00+02",
                          "height": 3.25
                        },
                        {
                          "timeInstant": "2023-07-20T21:00:00+02",
                          "height": 2.99
                        },
                        {
                          "timeInstant": "2023-07-20T21:30:00+02",
                          "height": 2.69
                        },
                        {
                          "timeInstant": "2023-07-20T22:00:00+02",
                          "height": 2.36
                        },
                        {
                          "timeInstant": "2023-07-20T22:30:00+02",
                          "height": 2.02
                        },
                        {
                          "timeInstant": "2023-07-20T23:00:00+02",
                          "height": 1.7
                        },
                        {
                          "timeInstant": "2023-07-20T23:30:00+02",
                          "height": 1.41
                        }
                      ]
                    }
                  ]
                },
                {
                  "timePeriod": {
                    "begin": {
                      "timeInstant": "2023-07-21T00:00:00+02"
                    },
                    "end": {
                      "timeInstant": "2023-07-21T23:59:59+02"
                    }
                  },
                  "variables": [
                    {
                      "name": "tides",
                      "units": "m",
                      "summary": [
                        {
                          "id": "0",
                          "state": "Low tides",
                          "timeInstant": "2023-07-21T01:15:00+02",
                          "height": 0.9
                        },
                        {
                          "id": "1",
                          "state": "High tides",
                          "timeInstant": "2023-07-21T07:17:00+02",
                          "height": 3.3
                        },
                        {
                          "id": "2",
                          "state": "Low tides",
                          "timeInstant": "2023-07-21T13:15:00+02",
                          "height": 1
                        },
                        {
                          "id": "3",
                          "state": "High tides",
                          "timeInstant": "2023-07-21T19:30:00+02",
                          "height": 3.6
                        }
                      ],
                      "values": [
                        {
                          "timeInstant": "2023-07-21T00:00:00+02",
                          "height": 1.18
                        },
                        {
                          "timeInstant": "2023-07-21T00:30:00+02",
                          "height": 1.01
                        },
                        {
                          "timeInstant": "2023-07-21T01:00:00+02",
                          "height": 0.93
                        },
                        {
                          "timeInstant": "2023-07-21T01:30:00+02",
                          "height": 0.93
                        },
                        {
                          "timeInstant": "2023-07-21T02:00:00+02",
                          "height": 1.01
                        },
                        {
                          "timeInstant": "2023-07-21T02:30:00+02",
                          "height": 1.17
                        },
                        {
                          "timeInstant": "2023-07-21T03:00:00+02",
                          "height": 1.39
                        },
                        {
                          "timeInstant": "2023-07-21T03:30:00+02",
                          "height": 1.65
                        },
                        {
                          "timeInstant": "2023-07-21T04:00:00+02",
                          "height": 1.95
                        },
                        {
                          "timeInstant": "2023-07-21T04:30:00+02",
                          "height": 2.26
                        },
                        {
                          "timeInstant": "2023-07-21T05:00:00+02",
                          "height": 2.57
                        },
                        {
                          "timeInstant": "2023-07-21T05:30:00+02",
                          "height": 2.84
                        },
                        {
                          "timeInstant": "2023-07-21T06:00:00+02",
                          "height": 3.06
                        },
                        {
                          "timeInstant": "2023-07-21T06:30:00+02",
                          "height": 3.22
                        },
                        {
                          "timeInstant": "2023-07-21T07:00:00+02",
                          "height": 3.31
                        },
                        {
                          "timeInstant": "2023-07-21T07:30:00+02",
                          "height": 3.31
                        },
                        {
                          "timeInstant": "2023-07-21T08:00:00+02",
                          "height": 3.24
                        },
                        {
                          "timeInstant": "2023-07-21T08:30:00+02",
                          "height": 3.1
                        },
                        {
                          "timeInstant": "2023-07-21T09:00:00+02",
                          "height": 2.89
                        },
                        {
                          "timeInstant": "2023-07-21T09:30:00+02",
                          "height": 2.63
                        },
                        {
                          "timeInstant": "2023-07-21T10:00:00+02",
                          "height": 2.34
                        },
                        {
                          "timeInstant": "2023-07-21T10:30:00+02",
                          "height": 2.04
                        },
                        {
                          "timeInstant": "2023-07-21T11:00:00+02",
                          "height": 1.74
                        },
                        {
                          "timeInstant": "2023-07-21T11:30:00+02",
                          "height": 1.48
                        },
                        {
                          "timeInstant": "2023-07-21T12:00:00+02",
                          "height": 1.26
                        },
                        {
                          "timeInstant": "2023-07-21T12:30:00+02",
                          "height": 1.1
                        },
                        {
                          "timeInstant": "2023-07-21T13:00:00+02",
                          "height": 1.02
                        },
                        {
                          "timeInstant": "2023-07-21T13:30:00+02",
                          "height": 1.02
                        },
                        {
                          "timeInstant": "2023-07-21T14:00:00+02",
                          "height": 1.1
                        },
                        {
                          "timeInstant": "2023-07-21T14:30:00+02",
                          "height": 1.26
                        },
                        {
                          "timeInstant": "2023-07-21T15:00:00+02",
                          "height": 1.48
                        },
                        {
                          "timeInstant": "2023-07-21T15:30:00+02",
                          "height": 1.75
                        },
                        {
                          "timeInstant": "2023-07-21T16:00:00+02",
                          "height": 2.05
                        },
                        {
                          "timeInstant": "2023-07-21T16:30:00+02",
                          "height": 2.37
                        },
                        {
                          "timeInstant": "2023-07-21T17:00:00+02",
                          "height": 2.68
                        },
                        {
                          "timeInstant": "2023-07-21T17:30:00+02",
                          "height": 2.97
                        },
                        {
                          "timeInstant": "2023-07-21T18:00:00+02",
                          "height": 3.22
                        },
                        {
                          "timeInstant": "2023-07-21T18:30:00+02",
                          "height": 3.41
                        },
                        {
                          "timeInstant": "2023-07-21T19:00:00+02",
                          "height": 3.53
                        },
                        {
                          "timeInstant": "2023-07-21T19:30:00+02",
                          "height": 3.57
                        },
                        {
                          "timeInstant": "2023-07-21T20:00:00+02",
                          "height": 3.53
                        },
                        {
                          "timeInstant": "2023-07-21T20:30:00+02",
                          "height": 3.42
                        },
                        {
                          "timeInstant": "2023-07-21T21:00:00+02",
                          "height": 3.23
                        },
                        {
                          "timeInstant": "2023-07-21T21:30:00+02",
                          "height": 2.98
                        },
                        {
                          "timeInstant": "2023-07-21T22:00:00+02",
                          "height": 2.69
                        },
                        {
                          "timeInstant": "2023-07-21T22:30:00+02",
                          "height": 2.38
                        },
                        {
                          "timeInstant": "2023-07-21T23:00:00+02",
                          "height": 2.05
                        },
                        {
                          "timeInstant": "2023-07-21T23:30:00+02",
                          "height": 1.74
                        }
                      ]
                    }
                  ]
                },
                {
                  "timePeriod": {
                    "begin": {
                      "timeInstant": "2023-07-22T00:00:00+02"
                    },
                    "end": {
                      "timeInstant": "2023-07-22T23:59:59+02"
                    }
                  },
                  "variables": [
                    {
                      "name": "tides",
                      "units": "m",
                      "summary": [
                        {
                          "id": "0",
                          "state": "Low tides",
                          "timeInstant": "2023-07-22T01:47:00+02",
                          "height": 1
                        },
                        {
                          "id": "1",
                          "state": "High tides",
                          "timeInstant": "2023-07-22T07:51:00+02",
                          "height": 3.3
                        },
                        {
                          "id": "2",
                          "state": "Low tides",
                          "timeInstant": "2023-07-22T13:48:00+02",
                          "height": 1.1
                        },
                        {
                          "id": "3",
                          "state": "High tides",
                          "timeInstant": "2023-07-22T20:05:00+02",
                          "height": 3.5
                        }
                      ],
                      "values": [
                        {
                          "timeInstant": "2023-07-22T00:00:00+02",
                          "height": 1.46
                        },
                        {
                          "timeInstant": "2023-07-22T00:30:00+02",
                          "height": 1.24
                        },
                        {
                          "timeInstant": "2023-07-22T01:00:00+02",
                          "height": 1.08
                        },
                        {
                          "timeInstant": "2023-07-22T01:30:00+02",
                          "height": 0.99
                        },
                        {
                          "timeInstant": "2023-07-22T02:00:00+02",
                          "height": 0.99
                        },
                        {
                          "timeInstant": "2023-07-22T02:30:00+02",
                          "height": 1.06
                        },
                        {
                          "timeInstant": "2023-07-22T03:00:00+02",
                          "height": 1.2
                        },
                        {
                          "timeInstant": "2023-07-22T03:30:00+02",
                          "height": 1.4
                        },
                        {
                          "timeInstant": "2023-07-22T04:00:00+02",
                          "height": 1.65
                        },
                        {
                          "timeInstant": "2023-07-22T04:30:00+02",
                          "height": 1.93
                        },
                        {
                          "timeInstant": "2023-07-22T05:00:00+02",
                          "height": 2.23
                        },
                        {
                          "timeInstant": "2023-07-22T05:30:00+02",
                          "height": 2.52
                        },
                        {
                          "timeInstant": "2023-07-22T06:00:00+02",
                          "height": 2.78
                        },
                        {
                          "timeInstant": "2023-07-22T06:30:00+02",
                          "height": 3
                        },
                        {
                          "timeInstant": "2023-07-22T07:00:00+02",
                          "height": 3.17
                        },
                        {
                          "timeInstant": "2023-07-22T07:30:00+02",
                          "height": 3.26
                        },
                        {
                          "timeInstant": "2023-07-22T08:00:00+02",
                          "height": 3.27
                        },
                        {
                          "timeInstant": "2023-07-22T08:30:00+02",
                          "height": 3.21
                        },
                        {
                          "timeInstant": "2023-07-22T09:00:00+02",
                          "height": 3.08
                        },
                        {
                          "timeInstant": "2023-07-22T09:30:00+02",
                          "height": 2.89
                        },
                        {
                          "timeInstant": "2023-07-22T10:00:00+02",
                          "height": 2.65
                        },
                        {
                          "timeInstant": "2023-07-22T10:30:00+02",
                          "height": 2.38
                        },
                        {
                          "timeInstant": "2023-07-22T11:00:00+02",
                          "height": 2.09
                        },
                        {
                          "timeInstant": "2023-07-22T11:30:00+02",
                          "height": 1.8
                        },
                        {
                          "timeInstant": "2023-07-22T12:00:00+02",
                          "height": 1.55
                        },
                        {
                          "timeInstant": "2023-07-22T12:30:00+02",
                          "height": 1.33
                        },
                        {
                          "timeInstant": "2023-07-22T13:00:00+02",
                          "height": 1.18
                        },
                        {
                          "timeInstant": "2023-07-22T13:30:00+02",
                          "height": 1.09
                        },
                        {
                          "timeInstant": "2023-07-22T14:00:00+02",
                          "height": 1.09
                        },
                        {
                          "timeInstant": "2023-07-22T14:30:00+02",
                          "height": 1.15
                        },
                        {
                          "timeInstant": "2023-07-22T15:00:00+02",
                          "height": 1.29
                        },
                        {
                          "timeInstant": "2023-07-22T15:30:00+02",
                          "height": 1.49
                        },
                        {
                          "timeInstant": "2023-07-22T16:00:00+02",
                          "height": 1.73
                        },
                        {
                          "timeInstant": "2023-07-22T16:30:00+02",
                          "height": 2.01
                        },
                        {
                          "timeInstant": "2023-07-22T17:00:00+02",
                          "height": 2.31
                        },
                        {
                          "timeInstant": "2023-07-22T17:30:00+02",
                          "height": 2.61
                        },
                        {
                          "timeInstant": "2023-07-22T18:00:00+02",
                          "height": 2.89
                        },
                        {
                          "timeInstant": "2023-07-22T18:30:00+02",
                          "height": 3.13
                        },
                        {
                          "timeInstant": "2023-07-22T19:00:00+02",
                          "height": 3.32
                        },
                        {
                          "timeInstant": "2023-07-22T19:30:00+02",
                          "height": 3.44
                        },
                        {
                          "timeInstant": "2023-07-22T20:00:00+02",
                          "height": 3.49
                        },
                        {
                          "timeInstant": "2023-07-22T20:30:00+02",
                          "height": 3.46
                        },
                        {
                          "timeInstant": "2023-07-22T21:00:00+02",
                          "height": 3.36
                        },
                        {
                          "timeInstant": "2023-07-22T21:30:00+02",
                          "height": 3.19
                        },
                        {
                          "timeInstant": "2023-07-22T22:00:00+02",
                          "height": 2.97
                        },
                        {
                          "timeInstant": "2023-07-22T22:30:00+02",
                          "height": 2.7
                        },
                        {
                          "timeInstant": "2023-07-22T23:00:00+02",
                          "height": 2.4
                        },
                        {
                          "timeInstant": "2023-07-22T23:30:00+02",
                          "height": 2.1
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
      }`;

      const aemet = `{[
        {
          "origen": {
            "productor": "Agencia Estatal de Meteorología - AEMET. Gobierno de España",
            "web": "https://www.aemet.es",
            "enlace": "https://www.aemet.es/es/eltiempo/prediccion/municipios/horas/coruna-a-id15030",
            "language": "es",
            "copyright": "© AEMET. Autorizado el uso de la información y su reproducción citando a AEMET como autora de la misma.",
            "notaLegal": "https://www.aemet.es/es/nota_legal"
          },
          "elaborado": "2023-04-21T12:27:58",
          "nombre": "Coruña, A",
          "provincia": "A Coruña",
          "prediccion": {
            "dia": [
              {
                "estadoCielo": [
                  {
                    "value": "17",
                    "periodo": "08",
                    "descripcion": "Nubes altas"
                  },
                  {
                    "value": "17",
                    "periodo": "09",
                    "descripcion": "Nubes altas"
                  },
                  {
                    "value": "17",
                    "periodo": "10",
                    "descripcion": "Nubes altas"
                  },
                  {
                    "value": "16",
                    "periodo": "11",
                    "descripcion": "Cubierto"
                  },
                  {
                    "value": "16",
                    "periodo": "12",
                    "descripcion": "Cubierto"
                  },
                  {
                    "value": "46",
                    "periodo": "13",
                    "descripcion": "Cubierto con lluvia escasa"
                  },
                  {
                    "value": "46",
                    "periodo": "14",
                    "descripcion": "Cubierto con lluvia escasa"
                  },
                  {
                    "value": "46",
                    "periodo": "15",
                    "descripcion": "Cubierto con lluvia escasa"
                  },
                  {
                    "value": "46",
                    "periodo": "16",
                    "descripcion": "Cubierto con lluvia escasa"
                  },
                  {
                    "value": "16",
                    "periodo": "17",
                    "descripcion": "Cubierto"
                  },
                  {
                    "value": "15",
                    "periodo": "18",
                    "descripcion": "Muy nuboso"
                  },
                  {
                    "value": "12",
                    "periodo": "19",
                    "descripcion": "Poco nuboso"
                  },
                  {
                    "value": "12",
                    "periodo": "20",
                    "descripcion": "Poco nuboso"
                  },
                  {
                    "value": "14",
                    "periodo": "21",
                    "descripcion": "Nuboso"
                  },
                  {
                    "value": "11n",
                    "periodo": "22",
                    "descripcion": "Despejado"
                  },
                  {
                    "value": "11n",
                    "periodo": "23",
                    "descripcion": "Despejado"
                  }
                ],
                "precipitacion": [
                  {
                    "value": "0",
                    "periodo": "08"
                  },
                  {
                    "value": "0",
                    "periodo": "09"
                  },
                  {
                    "value": "0",
                    "periodo": "10"
                  },
                  {
                    "value": "0",
                    "periodo": "11"
                  },
                  {
                    "value": "0",
                    "periodo": "12"
                  },
                  {
                    "value": "0.1",
                    "periodo": "13"
                  },
                  {
                    "value": "0.1",
                    "periodo": "14"
                  },
                  {
                    "value": "0.7",
                    "periodo": "15"
                  },
                  {
                    "value": "0.3",
                    "periodo": "16"
                  },
                  {
                    "value": "0",
                    "periodo": "17"
                  },
                  {
                    "value": "0",
                    "periodo": "18"
                  },
                  {
                    "value": "0",
                    "periodo": "19"
                  },
                  {
                    "value": "0",
                    "periodo": "20"
                  },
                  {
                    "value": "0",
                    "periodo": "21"
                  },
                  {
                    "value": "0",
                    "periodo": "22"
                  },
                  {
                    "value": "0",
                    "periodo": "23"
                  }
                ],
                "probPrecipitacion": [
                  {
                    "value": "65",
                    "periodo": "0814"
                  },
                  {
                    "value": "100",
                    "periodo": "1420"
                  },
                  {
                    "value": "0",
                    "periodo": "2002"
                  }
                ],
                "probTormenta": [
                  {
                    "value": "30",
                    "periodo": "0814"
                  },
                  {
                    "value": "40",
                    "periodo": "1420"
                  },
                  {
                    "value": "0",
                    "periodo": "2002"
                  }
                ],
                "nieve": [
                  {
                    "value": "0",
                    "periodo": "08"
                  },
                  {
                    "value": "0",
                    "periodo": "09"
                  },
                  {
                    "value": "0",
                    "periodo": "10"
                  },
                  {
                    "value": "0",
                    "periodo": "11"
                  },
                  {
                    "value": "0",
                    "periodo": "12"
                  },
                  {
                    "value": "0",
                    "periodo": "13"
                  },
                  {
                    "value": "0",
                    "periodo": "14"
                  },
                  {
                    "value": "0",
                    "periodo": "15"
                  },
                  {
                    "value": "0",
                    "periodo": "16"
                  },
                  {
                    "value": "0",
                    "periodo": "17"
                  },
                  {
                    "value": "0",
                    "periodo": "18"
                  },
                  {
                    "value": "0",
                    "periodo": "19"
                  },
                  {
                    "value": "0",
                    "periodo": "20"
                  },
                  {
                    "value": "0",
                    "periodo": "21"
                  },
                  {
                    "value": "0",
                    "periodo": "22"
                  },
                  {
                    "value": "0",
                    "periodo": "23"
                  }
                ],
                "probNieve": [
                  {
                    "value": "0",
                    "periodo": "0814"
                  },
                  {
                    "value": "0",
                    "periodo": "1420"
                  },
                  {
                    "value": "0",
                    "periodo": "2002"
                  }
                ],
                "temperatura": [
                  {
                    "value": "13",
                    "periodo": "09"
                  },
                  {
                    "value": "15",
                    "periodo": "10"
                  },
                  {
                    "value": "16",
                    "periodo": "11"
                  },
                  {
                    "value": "17",
                    "periodo": "12"
                  },
                  {
                    "value": "19",
                    "periodo": "13"
                  },
                  {
                    "value": "18",
                    "periodo": "14"
                  },
                  {
                    "value": "17",
                    "periodo": "15"
                  },
                  {
                    "value": "16",
                    "periodo": "16"
                  },
                  {
                    "value": "16",
                    "periodo": "17"
                  },
                  {
                    "value": "16",
                    "periodo": "18"
                  },
                  {
                    "value": "15",
                    "periodo": "19"
                  },
                  {
                    "value": "15",
                    "periodo": "20"
                  },
                  {
                    "value": "15",
                    "periodo": "21"
                  },
                  {
                    "value": "14",
                    "periodo": "22"
                  },
                  {
                    "value": "13",
                    "periodo": "23"
                  }
                ],
                "sensTermica": [
                  {
                    "value": "13",
                    "periodo": "09"
                  },
                  {
                    "value": "15",
                    "periodo": "10"
                  },
                  {
                    "value": "16",
                    "periodo": "11"
                  },
                  {
                    "value": "17",
                    "periodo": "12"
                  },
                  {
                    "value": "19",
                    "periodo": "13"
                  },
                  {
                    "value": "18",
                    "periodo": "14"
                  },
                  {
                    "value": "17",
                    "periodo": "15"
                  },
                  {
                    "value": "16",
                    "periodo": "16"
                  },
                  {
                    "value": "16",
                    "periodo": "17"
                  },
                  {
                    "value": "16",
                    "periodo": "18"
                  },
                  {
                    "value": "15",
                    "periodo": "19"
                  },
                  {
                    "value": "15",
                    "periodo": "20"
                  },
                  {
                    "value": "15",
                    "periodo": "21"
                  },
                  {
                    "value": "14",
                    "periodo": "22"
                  },
                  {
                    "value": "13",
                    "periodo": "23"
                  }
                ],
                "humedadRelativa": [
                  {
                    "value": "85",
                    "periodo": "09"
                  },
                  {
                    "value": "75",
                    "periodo": "10"
                  },
                  {
                    "value": "67",
                    "periodo": "11"
                  },
                  {
                    "value": "56",
                    "periodo": "12"
                  },
                  {
                    "value": "51",
                    "periodo": "13"
                  },
                  {
                    "value": "55",
                    "periodo": "14"
                  },
                  {
                    "value": "64",
                    "periodo": "15"
                  },
                  {
                    "value": "75",
                    "periodo": "16"
                  },
                  {
                    "value": "79",
                    "periodo": "17"
                  },
                  {
                    "value": "78",
                    "periodo": "18"
                  },
                  {
                    "value": "72",
                    "periodo": "19"
                  },
                  {
                    "value": "66",
                    "periodo": "20"
                  },
                  {
                    "value": "72",
                    "periodo": "21"
                  },
                  {
                    "value": "73",
                    "periodo": "22"
                  },
                  {
                    "value": "76",
                    "periodo": "23"
                  }
                ],
                "vientoAndRachaMax": [
                  {
                    "direccion": ["SE"],
                    "velocidad": ["9"],
                    "periodo": "09"
                  },
                  {
                    "value": "20",
                    "periodo": "09"
                  },
                  {
                    "direccion": ["SE"],
                    "velocidad": ["12"],
                    "periodo": "10"
                  },
                  {
                    "value": "24",
                    "periodo": "10"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["13"],
                    "periodo": "11"
                  },
                  {
                    "value": "27",
                    "periodo": "11"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["15"],
                    "periodo": "12"
                  },
                  {
                    "value": "17",
                    "periodo": "12"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["9"],
                    "periodo": "13"
                  },
                  {
                    "value": "28",
                    "periodo": "13"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["17"],
                    "periodo": "14"
                  },
                  {
                    "value": "29",
                    "periodo": "14"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["15"],
                    "periodo": "15"
                  },
                  {
                    "value": "18",
                    "periodo": "15"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["11"],
                    "periodo": "16"
                  },
                  {
                    "value": "16",
                    "periodo": "16"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["9"],
                    "periodo": "17"
                  },
                  {
                    "value": "14",
                    "periodo": "17"
                  },
                  {
                    "direccion": ["SO"],
                    "velocidad": ["7"],
                    "periodo": "18"
                  },
                  {
                    "value": "16",
                    "periodo": "18"
                  },
                  {
                    "direccion": ["SO"],
                    "velocidad": ["10"],
                    "periodo": "19"
                  },
                  {
                    "value": "19",
                    "periodo": "19"
                  },
                  {
                    "direccion": ["SO"],
                    "velocidad": ["10"],
                    "periodo": "20"
                  },
                  {
                    "value": "9",
                    "periodo": "20"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["5"],
                    "periodo": "21"
                  },
                  {
                    "value": "13",
                    "periodo": "21"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["8"],
                    "periodo": "22"
                  },
                  {
                    "value": "13",
                    "periodo": "22"
                  },
                  {
                    "direccion": ["SE"],
                    "velocidad": ["9"],
                    "periodo": "23"
                  },
                  {
                    "value": "19",
                    "periodo": "23"
                  }
                ],
                "fecha": "2023-04-21T00:00:00",
                "orto": "07:41",
                "ocaso": "21:23"
              },
              {
                "estadoCielo": [
                  {
                    "value": "11n",
                    "periodo": "00",
                    "descripcion": "Despejado"
                  },
                  {
                    "value": "11n",
                    "periodo": "01",
                    "descripcion": "Despejado"
                  },
                  {
                    "value": "11n",
                    "periodo": "02",
                    "descripcion": "Despejado"
                  },
                  {
                    "value": "12n",
                    "periodo": "03",
                    "descripcion": "Poco nuboso"
                  },
                  {
                    "value": "16n",
                    "periodo": "04",
                    "descripcion": "Cubierto"
                  },
                  {
                    "value": "16n",
                    "periodo": "05",
                    "descripcion": "Cubierto"
                  },
                  {
                    "value": "16n",
                    "periodo": "06",
                    "descripcion": "Cubierto"
                  },
                  {
                    "value": "15n",
                    "periodo": "07",
                    "descripcion": "Muy nuboso"
                  },
                  {
                    "value": "14",
                    "periodo": "08",
                    "descripcion": "Nuboso"
                  },
                  {
                    "value": "11",
                    "periodo": "09",
                    "descripcion": "Despejado"
                  },
                  {
                    "value": "11",
                    "periodo": "10",
                    "descripcion": "Despejado"
                  },
                  {
                    "value": "43",
                    "periodo": "11",
                    "descripcion": "Intervalos nubosos con lluvia escasa"
                  },
                  {
                    "value": "12",
                    "periodo": "12",
                    "descripcion": "Poco nuboso"
                  },
                  {
                    "value": "15",
                    "periodo": "13",
                    "descripcion": "Muy nuboso"
                  },
                  {
                    "value": "15",
                    "periodo": "14",
                    "descripcion": "Muy nuboso"
                  },
                  {
                    "value": "15",
                    "periodo": "15",
                    "descripcion": "Muy nuboso"
                  },
                  {
                    "value": "43",
                    "periodo": "16",
                    "descripcion": "Intervalos nubosos con lluvia escasa"
                  },
                  {
                    "value": "17",
                    "periodo": "17",
                    "descripcion": "Nubes altas"
                  },
                  {
                    "value": "16",
                    "periodo": "18",
                    "descripcion": "Cubierto"
                  },
                  {
                    "value": "16",
                    "periodo": "19",
                    "descripcion": "Cubierto"
                  },
                  {
                    "value": "64",
                    "periodo": "20",
                    "descripcion": "Cubierto con tormenta y lluvia escasa"
                  },
                  {
                    "value": "16",
                    "periodo": "21",
                    "descripcion": "Cubierto"
                  },
                  {
                    "value": "16n",
                    "periodo": "22",
                    "descripcion": "Cubierto"
                  },
                  {
                    "value": "64n",
                    "periodo": "23",
                    "descripcion": "Cubierto con tormenta y lluvia escasa"
                  }
                ],
                "precipitacion": [
                  {
                    "value": "0",
                    "periodo": "00"
                  },
                  {
                    "value": "0",
                    "periodo": "01"
                  },
                  {
                    "value": "0",
                    "periodo": "02"
                  },
                  {
                    "value": "0",
                    "periodo": "03"
                  },
                  {
                    "value": "0",
                    "periodo": "04"
                  },
                  {
                    "value": "Ip",
                    "periodo": "05"
                  },
                  {
                    "value": "Ip",
                    "periodo": "06"
                  },
                  {
                    "value": "Ip",
                    "periodo": "07"
                  },
                  {
                    "value": "0",
                    "periodo": "08"
                  },
                  {
                    "value": "0",
                    "periodo": "09"
                  },
                  {
                    "value": "0",
                    "periodo": "10"
                  },
                  {
                    "value": "0.1",
                    "periodo": "11"
                  },
                  {
                    "value": "0",
                    "periodo": "12"
                  },
                  {
                    "value": "0",
                    "periodo": "13"
                  },
                  {
                    "value": "0",
                    "periodo": "14"
                  },
                  {
                    "value": "0",
                    "periodo": "15"
                  },
                  {
                    "value": "0.1",
                    "periodo": "16"
                  },
                  {
                    "value": "0",
                    "periodo": "17"
                  },
                  {
                    "value": "0",
                    "periodo": "18"
                  },
                  {
                    "value": "0",
                    "periodo": "19"
                  },
                  {
                    "value": "0.1",
                    "periodo": "20"
                  },
                  {
                    "value": "0",
                    "periodo": "21"
                  },
                  {
                    "value": "0",
                    "periodo": "22"
                  },
                  {
                    "value": "0.9",
                    "periodo": "23"
                  }
                ],
                "probPrecipitacion": [
                  {
                    "value": "30",
                    "periodo": "0208"
                  },
                  {
                    "value": "90",
                    "periodo": "0814"
                  },
                  {
                    "value": "90",
                    "periodo": "1420"
                  },
                  {
                    "value": "95",
                    "periodo": "2002"
                  }
                ],
                "probTormenta": [
                  {
                    "value": "30",
                    "periodo": "0208"
                  },
                  {
                    "value": "45",
                    "periodo": "0814"
                  },
                  {
                    "value": "50",
                    "periodo": "1420"
                  },
                  {
                    "value": "70",
                    "periodo": "2002"
                  }
                ],
                "nieve": [
                  {
                    "value": "0",
                    "periodo": "00"
                  },
                  {
                    "value": "0",
                    "periodo": "01"
                  },
                  {
                    "value": "0",
                    "periodo": "02"
                  },
                  {
                    "value": "0",
                    "periodo": "03"
                  },
                  {
                    "value": "0",
                    "periodo": "04"
                  },
                  {
                    "value": "0",
                    "periodo": "05"
                  },
                  {
                    "value": "0",
                    "periodo": "06"
                  },
                  {
                    "value": "0",
                    "periodo": "07"
                  },
                  {
                    "value": "0",
                    "periodo": "08"
                  },
                  {
                    "value": "0",
                    "periodo": "09"
                  },
                  {
                    "value": "0",
                    "periodo": "10"
                  },
                  {
                    "value": "0",
                    "periodo": "11"
                  },
                  {
                    "value": "0",
                    "periodo": "12"
                  },
                  {
                    "value": "0",
                    "periodo": "13"
                  },
                  {
                    "value": "0",
                    "periodo": "14"
                  },
                  {
                    "value": "0",
                    "periodo": "15"
                  },
                  {
                    "value": "0",
                    "periodo": "16"
                  },
                  {
                    "value": "0",
                    "periodo": "17"
                  },
                  {
                    "value": "0",
                    "periodo": "18"
                  },
                  {
                    "value": "0",
                    "periodo": "19"
                  },
                  {
                    "value": "0",
                    "periodo": "20"
                  },
                  {
                    "value": "0",
                    "periodo": "21"
                  },
                  {
                    "value": "0",
                    "periodo": "22"
                  },
                  {
                    "value": "0",
                    "periodo": "23"
                  }
                ],
                "probNieve": [
                  {
                    "value": "0",
                    "periodo": "0208"
                  },
                  {
                    "value": "0",
                    "periodo": "0814"
                  },
                  {
                    "value": "0",
                    "periodo": "1420"
                  },
                  {
                    "value": "0",
                    "periodo": "2002"
                  }
                ],
                "temperatura": [
                  {
                    "value": "13",
                    "periodo": "00"
                  },
                  {
                    "value": "12",
                    "periodo": "01"
                  },
                  {
                    "value": "12",
                    "periodo": "02"
                  },
                  {
                    "value": "12",
                    "periodo": "03"
                  },
                  {
                    "value": "12",
                    "periodo": "04"
                  },
                  {
                    "value": "12",
                    "periodo": "05"
                  },
                  {
                    "value": "12",
                    "periodo": "06"
                  },
                  {
                    "value": "12",
                    "periodo": "07"
                  },
                  {
                    "value": "12",
                    "periodo": "08"
                  },
                  {
                    "value": "13",
                    "periodo": "09"
                  },
                  {
                    "value": "15",
                    "periodo": "10"
                  },
                  {
                    "value": "16",
                    "periodo": "11"
                  },
                  {
                    "value": "17",
                    "periodo": "12"
                  },
                  {
                    "value": "18",
                    "periodo": "13"
                  },
                  {
                    "value": "19",
                    "periodo": "14"
                  },
                  {
                    "value": "19",
                    "periodo": "15"
                  },
                  {
                    "value": "20",
                    "periodo": "16"
                  },
                  {
                    "value": "19",
                    "periodo": "17"
                  },
                  {
                    "value": "19",
                    "periodo": "18"
                  },
                  {
                    "value": "18",
                    "periodo": "19"
                  },
                  {
                    "value": "17",
                    "periodo": "20"
                  },
                  {
                    "value": "17",
                    "periodo": "21"
                  },
                  {
                    "value": "16",
                    "periodo": "22"
                  },
                  {
                    "value": "16",
                    "periodo": "23"
                  }
                ],
                "sensTermica": [
                  {
                    "value": "13",
                    "periodo": "00"
                  },
                  {
                    "value": "12",
                    "periodo": "01"
                  },
                  {
                    "value": "12",
                    "periodo": "02"
                  },
                  {
                    "value": "12",
                    "periodo": "03"
                  },
                  {
                    "value": "12",
                    "periodo": "04"
                  },
                  {
                    "value": "12",
                    "periodo": "05"
                  },
                  {
                    "value": "12",
                    "periodo": "06"
                  },
                  {
                    "value": "12",
                    "periodo": "07"
                  },
                  {
                    "value": "12",
                    "periodo": "08"
                  },
                  {
                    "value": "13",
                    "periodo": "09"
                  },
                  {
                    "value": "15",
                    "periodo": "10"
                  },
                  {
                    "value": "16",
                    "periodo": "11"
                  },
                  {
                    "value": "17",
                    "periodo": "12"
                  },
                  {
                    "value": "18",
                    "periodo": "13"
                  },
                  {
                    "value": "19",
                    "periodo": "14"
                  },
                  {
                    "value": "19",
                    "periodo": "15"
                  },
                  {
                    "value": "20",
                    "periodo": "16"
                  },
                  {
                    "value": "19",
                    "periodo": "17"
                  },
                  {
                    "value": "19",
                    "periodo": "18"
                  },
                  {
                    "value": "18",
                    "periodo": "19"
                  },
                  {
                    "value": "17",
                    "periodo": "20"
                  },
                  {
                    "value": "17",
                    "periodo": "21"
                  },
                  {
                    "value": "16",
                    "periodo": "22"
                  },
                  {
                    "value": "16",
                    "periodo": "23"
                  }
                ],
                "humedadRelativa": [
                  {
                    "value": "76",
                    "periodo": "00"
                  },
                  {
                    "value": "79",
                    "periodo": "01"
                  },
                  {
                    "value": "80",
                    "periodo": "02"
                  },
                  {
                    "value": "80",
                    "periodo": "03"
                  },
                  {
                    "value": "78",
                    "periodo": "04"
                  },
                  {
                    "value": "79",
                    "periodo": "05"
                  },
                  {
                    "value": "85",
                    "periodo": "06"
                  },
                  {
                    "value": "85",
                    "periodo": "07"
                  },
                  {
                    "value": "84",
                    "periodo": "08"
                  },
                  {
                    "value": "81",
                    "periodo": "09"
                  },
                  {
                    "value": "81",
                    "periodo": "10"
                  },
                  {
                    "value": "79",
                    "periodo": "11"
                  },
                  {
                    "value": "68",
                    "periodo": "12"
                  },
                  {
                    "value": "62",
                    "periodo": "13"
                  },
                  {
                    "value": "60",
                    "periodo": "14"
                  },
                  {
                    "value": "55",
                    "periodo": "15"
                  },
                  {
                    "value": "52",
                    "periodo": "16"
                  },
                  {
                    "value": "54",
                    "periodo": "17"
                  },
                  {
                    "value": "55",
                    "periodo": "18"
                  },
                  {
                    "value": "59",
                    "periodo": "19"
                  },
                  {
                    "value": "64",
                    "periodo": "20"
                  },
                  {
                    "value": "70",
                    "periodo": "21"
                  },
                  {
                    "value": "73",
                    "periodo": "22"
                  },
                  {
                    "value": "78",
                    "periodo": "23"
                  }
                ],
                "vientoAndRachaMax": [
                  {
                    "direccion": ["S"],
                    "velocidad": ["12"],
                    "periodo": "00"
                  },
                  {
                    "value": "19",
                    "periodo": "00"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["12"],
                    "periodo": "01"
                  },
                  {
                    "value": "20",
                    "periodo": "01"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["13"],
                    "periodo": "02"
                  },
                  {
                    "value": "21",
                    "periodo": "02"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["13"],
                    "periodo": "03"
                  },
                  {
                    "value": "25",
                    "periodo": "03"
                  },
                  {
                    "direccion": ["SE"],
                    "velocidad": ["16"],
                    "periodo": "04"
                  },
                  {
                    "value": "24",
                    "periodo": "04"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["15"],
                    "periodo": "05"
                  },
                  {
                    "value": "27",
                    "periodo": "05"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["17"],
                    "periodo": "06"
                  },
                  {
                    "value": "26",
                    "periodo": "06"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["15"],
                    "periodo": "07"
                  },
                  {
                    "value": "26",
                    "periodo": "07"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["16"],
                    "periodo": "08"
                  },
                  {
                    "value": "26",
                    "periodo": "08"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["16"],
                    "periodo": "09"
                  },
                  {
                    "value": "28",
                    "periodo": "09"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["17"],
                    "periodo": "10"
                  },
                  {
                    "value": "30",
                    "periodo": "10"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["17"],
                    "periodo": "11"
                  },
                  {
                    "value": "42",
                    "periodo": "11"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["24"],
                    "periodo": "12"
                  },
                  {
                    "value": "34",
                    "periodo": "12"
                  },
                  {
                    "direccion": ["SO"],
                    "velocidad": ["19"],
                    "periodo": "13"
                  },
                  {
                    "value": "41",
                    "periodo": "13"
                  },
                  {
                    "direccion": ["SO"],
                    "velocidad": ["24"],
                    "periodo": "14"
                  },
                  {
                    "value": "43",
                    "periodo": "14"
                  },
                  {
                    "direccion": ["SO"],
                    "velocidad": ["25"],
                    "periodo": "15"
                  },
                  {
                    "value": "40",
                    "periodo": "15"
                  },
                  {
                    "direccion": ["SO"],
                    "velocidad": ["22"],
                    "periodo": "16"
                  },
                  {
                    "value": "34",
                    "periodo": "16"
                  },
                  {
                    "direccion": ["SO"],
                    "velocidad": ["20"],
                    "periodo": "17"
                  },
                  {
                    "value": "39",
                    "periodo": "17"
                  },
                  {
                    "direccion": ["SO"],
                    "velocidad": ["23"],
                    "periodo": "18"
                  },
                  {
                    "value": "38",
                    "periodo": "18"
                  },
                  {
                    "direccion": ["SO"],
                    "velocidad": ["22"],
                    "periodo": "19"
                  },
                  {
                    "value": "32",
                    "periodo": "19"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["18"],
                    "periodo": "20"
                  },
                  {
                    "value": "37",
                    "periodo": "20"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["23"],
                    "periodo": "21"
                  },
                  {
                    "value": "39",
                    "periodo": "21"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["24"],
                    "periodo": "22"
                  },
                  {
                    "value": "36",
                    "periodo": "22"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["22"],
                    "periodo": "23"
                  },
                  {
                    "value": "32",
                    "periodo": "23"
                  }
                ],
                "fecha": "2023-04-22T00:00:00",
                "orto": "07:40",
                "ocaso": "21:24"
              },
              {
                "estadoCielo": [
                  {
                    "value": "64n",
                    "periodo": "00",
                    "descripcion": "Cubierto con tormenta y lluvia escasa"
                  },
                  {
                    "value": "54n",
                    "periodo": "01",
                    "descripcion": "Cubierto con tormenta"
                  },
                  {
                    "value": "46n",
                    "periodo": "02",
                    "descripcion": "Cubierto con lluvia escasa"
                  },
                  {
                    "value": "16n",
                    "periodo": "03",
                    "descripcion": "Cubierto"
                  },
                  {
                    "value": "16n",
                    "periodo": "04",
                    "descripcion": "Cubierto"
                  },
                  {
                    "value": "16n",
                    "periodo": "05",
                    "descripcion": "Cubierto"
                  },
                  {
                    "value": "14n",
                    "periodo": "06",
                    "descripcion": "Nuboso"
                  },
                  {
                    "value": "46n",
                    "periodo": "07",
                    "descripcion": "Cubierto con lluvia escasa"
                  }
                ],
                "precipitacion": [
                  {
                    "value": "0.9",
                    "periodo": "00"
                  },
                  {
                    "value": "5",
                    "periodo": "01"
                  },
                  {
                    "value": "0.2",
                    "periodo": "02"
                  },
                  {
                    "value": "0",
                    "periodo": "03"
                  },
                  {
                    "value": "0",
                    "periodo": "04"
                  },
                  {
                    "value": "0",
                    "periodo": "05"
                  },
                  {
                    "value": "0",
                    "periodo": "06"
                  },
                  {
                    "value": "0.5",
                    "periodo": "07"
                  }
                ],
                "probPrecipitacion": [
                  {
                    "value": "100",
                    "periodo": "0208"
                  }
                ],
                "probTormenta": [
                  {
                    "value": "65",
                    "periodo": "0208"
                  }
                ],
                "nieve": [
                  {
                    "value": "0",
                    "periodo": "00"
                  },
                  {
                    "value": "0",
                    "periodo": "01"
                  },
                  {
                    "value": "0",
                    "periodo": "02"
                  },
                  {
                    "value": "0",
                    "periodo": "03"
                  },
                  {
                    "value": "0",
                    "periodo": "04"
                  },
                  {
                    "value": "0",
                    "periodo": "05"
                  },
                  {
                    "value": "0",
                    "periodo": "06"
                  },
                  {
                    "value": "0",
                    "periodo": "07"
                  }
                ],
                "probNieve": [
                  {
                    "value": "0",
                    "periodo": "0208"
                  }
                ],
                "temperatura": [
                  {
                    "value": "16",
                    "periodo": "00"
                  },
                  {
                    "value": "15",
                    "periodo": "01"
                  },
                  {
                    "value": "15",
                    "periodo": "02"
                  },
                  {
                    "value": "15",
                    "periodo": "03"
                  },
                  {
                    "value": "15",
                    "periodo": "04"
                  },
                  {
                    "value": "15",
                    "periodo": "05"
                  },
                  {
                    "value": "15",
                    "periodo": "06"
                  },
                  {
                    "value": "15",
                    "periodo": "07"
                  }
                ],
                "sensTermica": [
                  {
                    "value": "16",
                    "periodo": "00"
                  },
                  {
                    "value": "15",
                    "periodo": "01"
                  },
                  {
                    "value": "15",
                    "periodo": "02"
                  },
                  {
                    "value": "15",
                    "periodo": "03"
                  },
                  {
                    "value": "15",
                    "periodo": "04"
                  },
                  {
                    "value": "15",
                    "periodo": "05"
                  },
                  {
                    "value": "15",
                    "periodo": "06"
                  },
                  {
                    "value": "15",
                    "periodo": "07"
                  }
                ],
                "humedadRelativa": [
                  {
                    "value": "86",
                    "periodo": "00"
                  },
                  {
                    "value": "87",
                    "periodo": "01"
                  },
                  {
                    "value": "92",
                    "periodo": "02"
                  },
                  {
                    "value": "95",
                    "periodo": "03"
                  },
                  {
                    "value": "94",
                    "periodo": "04"
                  },
                  {
                    "value": "89",
                    "periodo": "05"
                  },
                  {
                    "value": "89",
                    "periodo": "06"
                  },
                  {
                    "value": "88",
                    "periodo": "07"
                  }
                ],
                "vientoAndRachaMax": [
                  {
                    "direccion": ["S"],
                    "velocidad": ["20"],
                    "periodo": "00"
                  },
                  {
                    "value": "33",
                    "periodo": "00"
                  },
                  {
                    "direccion": ["S"],
                    "velocidad": ["19"],
                    "periodo": "01"
                  },
                  {
                    "value": "22",
                    "periodo": "01"
                  },
                  {
                    "direccion": ["SO"],
                    "velocidad": ["14"],
                    "periodo": "02"
                  },
                  {
                    "value": "30",
                    "periodo": "02"
                  },
                  {
                    "direccion": ["SO"],
                    "velocidad": ["17"],
                    "periodo": "03"
                  },
                  {
                    "value": "29",
                    "periodo": "03"
                  },
                  {
                    "direccion": ["SO"],
                    "velocidad": ["18"],
                    "periodo": "04"
                  },
                  {
                    "value": "31",
                    "periodo": "04"
                  },
                  {
                    "direccion": ["SO"],
                    "velocidad": ["19"],
                    "periodo": "05"
                  },
                  {
                    "value": "36",
                    "periodo": "05"
                  },
                  {
                    "direccion": ["SO"],
                    "velocidad": ["23"],
                    "periodo": "06"
                  },
                  {
                    "value": "38",
                    "periodo": "06"
                  },
                  {
                    "direccion": ["SO"],
                    "velocidad": ["24"],
                    "periodo": "07"
                  },
                  {
                    "value": "30",
                    "periodo": "07"
                  }
                ],
                "fecha": "2023-04-23T00:00:00",
                "orto": "07:38",
                "ocaso": "21:26"
              }
            ]
          },
          "id": "15030",
          "version": "1.0"
        }
      ]
      }`;

      const day1 = `{{
        "days": [
          {
            "timePeriod": {
              "begin": {
                "timeInstant": "2023-07-18T00:00:00+02"
              },
              "end": {
                "timeInstant": "2023-07-18T23:59:59+02"
              }
            },
            "variables": [
              {
                "name": "tides",
                "units": "m",
                "summary": [
                  {
                    "id": "0",
                    "state": "High tides",
                    "timeInstant": "2023-07-18T05:36:00+02",
                    "height": 3.3
                  },
                  {
                    "id": "1",
                    "state": "Low tides",
                    "timeInstant": "2023-07-18T11:35:00+02",
                    "height": 1
                  },
                  {
                    "id": "2",
                    "state": "High tides",
                    "timeInstant": "2023-07-18T17:50:00+02",
                    "height": 3.6
                  }
                ],
                "values": [
                  {
                    "timeInstant": "2023-07-18T00:00:00+02",
                    "height": 0.95
                  },
                  {
                    "timeInstant": "2023-07-18T00:30:00+02",
                    "height": 1.06
                  },
                  {
                    "timeInstant": "2023-07-18T01:00:00+02",
                    "height": 1.25
                  },
                  {
                    "timeInstant": "2023-07-18T01:30:00+02",
                    "height": 1.49
                  },
                  {
                    "timeInstant": "2023-07-18T02:00:00+02",
                    "height": 1.77
                  },
                  {
                    "timeInstant": "2023-07-18T02:30:00+02",
                    "height": 2.08
                  },
                  {
                    "timeInstant": "2023-07-18T03:00:00+02",
                    "height": 2.39
                  },
                  {
                    "timeInstant": "2023-07-18T03:30:00+02",
                    "height": 2.69
                  },
                  {
                    "timeInstant": "2023-07-18T04:00:00+02",
                    "height": 2.94
                  },
                  {
                    "timeInstant": "2023-07-18T04:30:00+02",
                    "height": 3.14
                  },
                  {
                    "timeInstant": "2023-07-18T05:00:00+02",
                    "height": 3.27
                  },
                  {
                    "timeInstant": "2023-07-18T05:30:00+02",
                    "height": 3.32
                  },
                  {
                    "timeInstant": "2023-07-18T06:00:00+02",
                    "height": 3.3
                  },
                  {
                    "timeInstant": "2023-07-18T06:30:00+02",
                    "height": 3.2
                  },
                  {
                    "timeInstant": "2023-07-18T07:00:00+02",
                    "height": 3.04
                  },
                  {
                    "timeInstant": "2023-07-18T07:30:00+02",
                    "height": 2.81
                  },
                  {
                    "timeInstant": "2023-07-18T08:00:00+02",
                    "height": 2.54
                  },
                  {
                    "timeInstant": "2023-07-18T08:30:00+02",
                    "height": 2.25
                  },
                  {
                    "timeInstant": "2023-07-18T09:00:00+02",
                    "height": 1.94
                  },
                  {
                    "timeInstant": "2023-07-18T09:30:00+02",
                    "height": 1.64
                  },
                  {
                    "timeInstant": "2023-07-18T10:00:00+02",
                    "height": 1.38
                  },
                  {
                    "timeInstant": "2023-07-18T10:30:00+02",
                    "height": 1.18
                  },
                  {
                    "timeInstant": "2023-07-18T11:00:00+02",
                    "height": 1.04
                  },
                  {
                    "timeInstant": "2023-07-18T11:30:00+02",
                    "height": 0.99
                  },
                  {
                    "timeInstant": "2023-07-18T12:00:00+02",
                    "height": 1.02
                  },
                  {
                    "timeInstant": "2023-07-18T12:30:00+02",
                    "height": 1.13
                  },
                  {
                    "timeInstant": "2023-07-18T13:00:00+02",
                    "height": 1.31
                  },
                  {
                    "timeInstant": "2023-07-18T13:30:00+02",
                    "height": 1.55
                  },
                  {
                    "timeInstant": "2023-07-18T14:00:00+02",
                    "height": 1.85
                  },
                  {
                    "timeInstant": "2023-07-18T14:30:00+02",
                    "height": 2.17
                  },
                  {
                    "timeInstant": "2023-07-18T15:00:00+02",
                    "height": 2.5
                  },
                  {
                    "timeInstant": "2023-07-18T15:30:00+02",
                    "height": 2.82
                  },
                  {
                    "timeInstant": "2023-07-18T16:00:00+02",
                    "height": 3.1
                  },
                  {
                    "timeInstant": "2023-07-18T16:30:00+02",
                    "height": 3.34
                  },
                  {
                    "timeInstant": "2023-07-18T17:00:00+02",
                    "height": 3.51
                  },
                  {
                    "timeInstant": "2023-07-18T17:30:00+02",
                    "height": 3.6
                  },
                  {
                    "timeInstant": "2023-07-18T18:00:00+02",
                    "height": 3.61
                  },
                  {
                    "timeInstant": "2023-07-18T18:30:00+02",
                    "height": 3.55
                  },
                  {
                    "timeInstant": "2023-07-18T19:00:00+02",
                    "height": 3.4
                  },
                  {
                    "timeInstant": "2023-07-18T19:30:00+02",
                    "height": 3.19
                  },
                  {
                    "timeInstant": "2023-07-18T20:00:00+02",
                    "height": 2.93
                  },
                  {
                    "timeInstant": "2023-07-18T20:30:00+02",
                    "height": 2.62
                  },
                  {
                    "timeInstant": "2023-07-18T21:00:00+02",
                    "height": 2.28
                  },
                  {
                    "timeInstant": "2023-07-18T21:30:00+02",
                    "height": 1.94
                  },
                  {
                    "timeInstant": "2023-07-18T22:00:00+02",
                    "height": 1.62
                  },
                  {
                    "timeInstant": "2023-07-18T22:30:00+02",
                    "height": 1.33
                  },
                  {
                    "timeInstant": "2023-07-18T23:00:00+02",
                    "height": 1.11
                  },
                  {
                    "timeInstant": "2023-07-18T23:30:00+02",
                    "height": 0.96
                  }
                ]
              }
            ]
          }
        ]
      }
      }`;

      const jsonString = `{
        "days": [
          {
            "timePeriod": {
              "begin": {
                "timeInstant": "2023-07-18T00:00:00+02"
              },
              "end": {
                "timeInstant": "2023-07-18T23:59:59+02"
              }
            },
            "variables": [
              {
                "name": "tides",
                "units": "m",
                "summary": [
                  {
                    "id": "0",
                    "state": "High tides",
                    "timeInstant": "2023-07-18T05:36:00+02",
                    "height": 3.3
                  },
                  {
                    "id": "1",
                    "state": "Low tides",
                    "timeInstant": "2023-07-18T11:35:00+02",
                    "height": 1
                  },
                  {
                    "id": "2",
                    "state": "High tides",
                    "timeInstant": "2023-07-18T17:50:00+02",
                    "height": 3.6
                  }
                ],
                "values": [
                  {
                    "timeInstant": "2023-07-18T00:00:00+02",
                    "height": 0.95
                  },
                  {
                    "timeInstant": "2023-07-18T00:30:00+02",
                    "height": 1.06
                  },
                  {
                    "timeInstant": "2023-07-18T01:00:00+02",
                    "height": 1.25
                  },
                  {
                    "timeInstant": "2023-07-18T01:30:00+02",
                    "height": 1.49
                  },
                  {
                    "timeInstant": "2023-07-18T02:00:00+02",
                    "height": 1.77
                  },
                  {
                    "timeInstant": "2023-07-18T02:30:00+02",
                    "height": 2.08
                  },
                  {
                    "timeInstant": "2023-07-18T03:00:00+02",
                    "height": 2.39
                  },
                  {
                    "timeInstant": "2023-07-18T03:30:00+02",
                    "height": 2.69
                  },
                  {
                    "timeInstant": "2023-07-18T04:00:00+02",
                    "height": 2.94
                  },
                  {
                    "timeInstant": "2023-07-18T04:30:00+02",
                    "height": 3.14
                  },
                  {
                    "timeInstant": "2023-07-18T05:00:00+02",
                    "height": 3.27
                  },
                  {
                    "timeInstant": "2023-07-18T05:30:00+02",
                    "height": 3.32
                  },
                  {
                    "timeInstant": "2023-07-18T06:00:00+02",
                    "height": 3.3
                  },
                  {
                    "timeInstant": "2023-07-18T06:30:00+02",
                    "height": 3.2
                  },
                  {
                    "timeInstant": "2023-07-18T07:00:00+02",
                    "height": 3.04
                  },
                  {
                    "timeInstant": "2023-07-18T07:30:00+02",
                    "height": 2.81
                  },
                  {
                    "timeInstant": "2023-07-18T08:00:00+02",
                    "height": 2.54
                  },
                  {
                    "timeInstant": "2023-07-18T08:30:00+02",
                    "height": 2.25
                  },
                  {
                    "timeInstant": "2023-07-18T09:00:00+02",
                    "height": 1.94
                  },
                  {
                    "timeInstant": "2023-07-18T09:30:00+02",
                    "height": 1.64
                  },
                  {
                    "timeInstant": "2023-07-18T10:00:00+02",
                    "height": 1.38
                  },
                  {
                    "timeInstant": "2023-07-18T10:30:00+02",
                    "height": 1.18
                  },
                  {
                    "timeInstant": "2023-07-18T11:00:00+02",
                    "height": 1.04
                  },
                  {
                    "timeInstant": "2023-07-18T11:30:00+02",
                    "height": 0.99
                  },
                  {
                    "timeInstant": "2023-07-18T12:00:00+02",
                    "height": 1.02
                  },
                  {
                    "timeInstant": "2023-07-18T12:30:00+02",
                    "height": 1.13
                  },
                  {
                    "timeInstant": "2023-07-18T13:00:00+02",
                    "height": 1.31
                  },
                  {
                    "timeInstant": "2023-07-18T13:30:00+02",
                    "height": 1.55
                  },
                  {
                    "timeInstant": "2023-07-18T14:00:00+02",
                    "height": 1.85
                  },
                  {
                    "timeInstant": "2023-07-18T14:30:00+02",
                    "height": 2.17
                  },
                  {
                    "timeInstant": "2023-07-18T15:00:00+02",
                    "height": 2.5
                  },
                  {
                    "timeInstant": "2023-07-18T15:30:00+02",
                    "height": 2.82
                  },
                  {
                    "timeInstant": "2023-07-18T16:00:00+02",
                    "height": 3.1
                  },
                  {
                    "timeInstant": "2023-07-18T16:30:00+02",
                    "height": 3.34
                  },
                  {
                    "timeInstant": "2023-07-18T17:00:00+02",
                    "height": 3.51
                  },
                  {
                    "timeInstant": "2023-07-18T17:30:00+02",
                    "height": 3.6
                  },
                  {
                    "timeInstant": "2023-07-18T18:00:00+02",
                    "height": 3.61
                  },
                  {
                    "timeInstant": "2023-07-18T18:30:00+02",
                    "height": 3.55
                  },
                  {
                    "timeInstant": "2023-07-18T19:00:00+02",
                    "height": 3.4
                  },
                  {
                    "timeInstant": "2023-07-18T19:30:00+02",
                    "height": 3.19
                  },
                  {
                    "timeInstant": "2023-07-18T20:00:00+02",
                    "height": 2.93
                  },
                  {
                    "timeInstant": "2023-07-18T20:30:00+02",
                    "height": 2.62
                  },
                  {
                    "timeInstant": "2023-07-18T21:00:00+02",
                    "height": 2.28
                  },
                  {
                    "timeInstant": "2023-07-18T21:30:00+02",
                    "height": 1.94
                  },
                  {
                    "timeInstant": "2023-07-18T22:00:00+02",
                    "height": 1.62
                  },
                  {
                    "timeInstant": "2023-07-18T22:30:00+02",
                    "height": 1.33
                  },
                  {
                    "timeInstant": "2023-07-18T23:00:00+02",
                    "height": 1.11
                  },
                  {
                    "timeInstant": "2023-07-18T23:30:00+02",
                    "height": 0.96
                  }
                ]
              }
            ]
          }
        ]
      }`;

      // jsonData = jsonString;
      jsonData = JSON.stringify(jsonData);
      // try {
      console.log("jsonData sin parsear:");
      console.log(jsonData);
      data = JSON.parse(jsonData);
      // data = JSON.stringify(JSON.parse(jsonData), null, 2)
      console.log("jsonData parseado:");
      console.log(data);
      // } catch (error) {
      //   console.error('Invalid JSON data:', error);
      //   return <div>Error: Invalid JSON data</div>;
      // }

      setDatos(data);
    }));

  function renderTable(json, isHeader) {
    const keys = Object.keys(json);

    return keys.map((key, index) => {
      const value = json[key];
      const elementType = isHeader ? 'th' : 'td';

      if (typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) {
          return (
            <td key={index}>
              {value.map((item, itemIndex) => (
                <div key={itemIndex}>
                  {renderTable(item, false)}
                </div>
              ))}
            </td>
          );
        } else {
          return (
            <td key={index}>
              <strong>{key}</strong>
              {renderTable(value, true)}
            </td>
          );
        }
      } else {
        return (
          <td key={index}>{value}</td>
        );
      }
    });
  }
  const datos2 = datos;


  return (<table border="1" className="tabla_datos">
    <thead>
      <tr>{renderTable(datos2, true)}</tr>
    </thead>
    <tbody>
      <tr>{renderTable(datos2, false)}</tr>
    </tbody>
  </table>);


}

export default DatosMeteogaliciaTabla;
