import React, { useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerCluster, { MarkerPositionTypes } from "@components/MarkerCluster";
import generateMarkerPetaSebaran from "@utils/generateMarkerPetaSebaran";

type PetaSebaranProps = {
  fetchData: any;
};

export default function Map(props: PetaSebaranProps) {
  const { fetchData } = props;

  const generatedMarkerPositions = useMemo<MarkerPositionTypes[]>(() => {
    const coordinates = [];

    if (Array.isArray(fetchData)) {
      fetchData.map((coordinate) => {
        coordinates.push({
          idProvinsi: coordinate.id_provinsi,
          lat: parseFloat(coordinate?.latitude),
          lng: parseFloat(coordinate?.longitude),
          icon: generateMarkerPetaSebaran(coordinate.id_kegiatan),
          onClick: () => {},
        });
      });
    }

    return coordinates;
  }, [fetchData]);

  return (
    <MapContainer
      scrollWheelZoom={false}
      center={[-0.789275, 118.921326]}
      zoom={5}
      style={{ height: "450px", borderRadius: "10px" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerCluster markerPositions={generatedMarkerPositions} />
    </MapContainer>
  );
}
