import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mar from "../Paginas/Mar";
import Playas from "../Paginas/Playas";
import Fuentes from "../Paginas/Fuentes";
import BarraMenu from "../Components/BarraMenu";
import ElTiempo from "../Paginas/ElTiempo";
import Ayuda from "../Paginas/Ayuda";
import Ahora from "../Paginas/Ahora";
import Localizador from "../Components/Localizador";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useMediaQuery } from "react-responsive";
import DatosMeteogaliciaTabla from "../Components/DatosMeteogaliciaTabla";


const AppRutas = () => {

  const { configuracion_estado } = useContext(UserContext);
  const [configuracion, setConfiguracion] = configuracion_estado;

  let config_temp = configuracion;

  config_temp.es_pequeno = useMediaQuery({
    query: "(max-device-width: " + config_temp.ancho_limite + ")",
  }) || config_temp.pequeno_forzado;

  setConfiguracion(config_temp);

  return (

    <Router>

      <BarraMenu />
      <div className="container text-center contenido">
        <Routes>
          <Route exact path="/ahora" element={<Ahora />} />
          <Route exact path="/mar" element={<Mar formato="clasico" />} />
          <Route exact path="/el_tiempo" element={<ElTiempo formato="clasico" />} />

          <Route exact path="/marv2" element={<Mar formato="denso" />} />
          <Route exact path="/el_tiempov2" element={<ElTiempo formato="denso" />} />

          <Route exact path="/ayuda" element={<Ayuda />} />
          <Route exact path="/playas" element={<Playas />} />
          <Route exact path="/fuentes" element={<Fuentes />} />
          <Route exact path="/meteogalicia" element={<DatosMeteogaliciaTabla />} />


          <Route exact path="/peque" value={{
            pequeno: true,
          }} element={<Mar />} />


          <Route path="*" element={<Mar formato="clasico" />} />
        </Routes>
        <br></br>
      </div>
      <Localizador />

    </Router>
  );
};

export default AppRutas;

{/* <Route exact path="/ahora" element={<Ahora />} />
          <Route exact path="/playas" element={<Playas />} /> */}

