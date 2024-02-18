import React, { useState } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { GET_PROJETOS } from "../../Schemas";
import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import { EnvironmentFilled } from "@ant-design/icons";
const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;
const MAP_STYLE_ID = import.meta.env.VITE_MAP_STYLE_ID;

export default function Home() {
  const { data, loading } = useQuery(GET_PROJETOS);

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

  return (
    <APIProvider apiKey={GOOGLE_MAPS_KEY}>
      <div style={{ height: "80vh" }}>
        <Map
          mapId={MAP_STYLE_ID}
          defaultCenter={{
            lat: -20.8621244,
            lng: -40.9345395,
          }}
          defaultZoom={8}
        >
          {data.getProjetos.map((point, index) => (
            <div key={index}>
              <AdvancedMarker
                position={{
                  lat: parseFloat(point.coord.x),
                  lng: parseFloat(point.coord.y),
                }}
              >
                <EnvironmentFilled style={{ fontSize: "3em", color: "#000077"}} />
              </AdvancedMarker>
            </div>
          ))}
        </Map>
      </div>
    </APIProvider>
  );
}
