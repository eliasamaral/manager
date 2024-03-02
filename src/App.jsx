import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./routes";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AuthProvider } from "./utility/context/authContext";

import { GlobalStyle } from "./GlobalStyle";

import Login from "./pages/login";
import Home from "./pages/home";
import RDO from "./pages/RDO";
import Projects from "./pages/projects";
import CreateProject from "./pages/create-project";
import Project from "./pages/project";
import Codigos from "./Tabelas/Codigos";
import Tamplate from "./components/Tamplate";
import Contracts from "./pages/contracts";
import PontoProvider from "./utility/context/pontoContext";
import ProjectProgress from "./pages/project-progress";
import CadastrarUsuario from "./pages/create-user";
// import Pagamentos from "./pages/pagamentos";

function App() {
  return (
    <AuthProvider>
      <DndProvider backend={HTML5Backend}>
        <PontoProvider>
          <Router>
            <GlobalStyle />
            <Routes>
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Tamplate />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/projetos" element={<Projects />} />
                  <Route
                    path="/projetos/createProject"
                    element={<CreateProject />}
                  />
                  <Route path="/projeto/:id" element={<Project />} />
                  <Route path="/rdo" element={<RDO />} />
                  <Route path="/codigos" element={<Codigos />} />
                  <Route path="/contratos" element={<Contracts />} />
                  <Route path="/kanban" element={<ProjectProgress />} />
                  {/* <Route path="/pagamentos" element={<Pagamentos />} /> */}
                  <Route
                    path="/cadastrar-usuario"
                    element={<CadastrarUsuario />}
                  />
                </Route>
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </Router>
        </PontoProvider>
      </DndProvider>
    </AuthProvider>
  );
}

export default App;
