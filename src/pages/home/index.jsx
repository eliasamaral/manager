import React, { useState } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { GET_PROJETOS } from "../../Schemas";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { Spin } from "antd";
import { PinLocation, Legenda } from "./styles";
import { Typography } from "antd";

const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;
const MAP_STYLE_ID = import.meta.env.VITE_MAP_STYLE_ID;

const { Text } = Typography;

export default function Home() {
  const { data, loading } = useQuery(GET_PROJETOS);
  const navigate = useNavigate();


  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin />
      </div>
    );
  }

  const handleclick = ({point}) => {
    navigate(`/projeto/${point.projeto}`);
  }

  return (
    <APIProvider apiKey={GOOGLE_MAPS_KEY}>
      <div style={{ height: "80vh" }}>
        <Map
          mapId={MAP_STYLE_ID}
          minZoom={8.5}
          defaultCenter={{
            lat: -20.8621244,
            lng: -40.9345395,
          }}
          defaultZoom={8}
        >
          {data.getProjetos.map((point, index) => (
            <div key={index}>
              <AdvancedMarker
              onClick={() => handleclick({point}) }
                position={{
                  lat: parseFloat(point.coord.x),
                  lng: parseFloat(point.coord.y),
                }}
              >
                <PinLocation status={point.status} />
              </AdvancedMarker>
            </div>
          ))}
        </Map>
        <Legenda>
          <PinLocation style={{ width: "15px", height: "15px" }} status={1} />
          <Text>Executando</Text>
          <PinLocation style={{ width: "15px", height: "15px" }} status={2} />
          <Text>Balanço</Text>
          <PinLocation style={{ width: "15px", height: "15px" }} status={3} />
          <Text>Pagamento</Text>
        </Legenda>
      </div>
    </APIProvider>
  );
}
