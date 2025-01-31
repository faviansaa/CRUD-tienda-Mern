import React from 'react'
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Login from './paginas/Login'
import Registro from './paginas/Registro';
import LandingPage from './paginas/LandingPage'
import ProductosTable from './paginas/ProductosTable';

function App() {
  return (
    <BrowserRouter>
        <div>
          <Routes>
              {/* Rutas */}
            <Route  path="/" element= {<LandingPage/>}/>
              <Route path="/registro" element= {<Registro/>} />
              <Route path="/iniciarSesion" element= {<Login/>}/>
              <Route path="/productos" element= {<ProductosTable/>}/>

          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
