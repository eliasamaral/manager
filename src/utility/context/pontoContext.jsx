import React, { createContext, useState } from "react";

export const PontoContext = createContext(null);

export default function PontoProvider({ children }) {
  const [pontoInicial, setPontoInicial] = useState({});

  return (
    <PontoContext.Provider value={{ pontoInicial, setPontoInicial }}>
      {children}
    </PontoContext.Provider>
  );
}
