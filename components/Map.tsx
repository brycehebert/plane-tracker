import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import React from "react";
import styles from "../styles/Map.module.css";

const Map = () => {
  return (
    <MapContainer className={styles.Map} center={[30, -97]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline
        positions={[
          [30.762091, -97.809906],
          [30.77211, -97.82959],
          [30.779269, -97.843689],
          [30.792304, -97.869452],
          [30.801041, -97.886622],
          [30.812833, -97.909772],
          [30.817886, -97.919742],
          [30.833954, -97.951463],
          [30.836746, -97.956956],
          [30.853821, -97.990669],
          [30.864599, -98.012],
          [30.873734, -98.03009],
          [30.883918, -98.050177],
          [30.894424, -98.070966],
          [30.903442, -98.088846],
          [30.908569, -98.098916],
          [30.924362, -98.13026],
          [30.933915, -98.149164],
          [30.945831, -98.172859],
          [30.956406, -98.193808],
          [30.961335, -98.203601],
          [30.966568, -98.214004],
          [30.983871, -98.248363],
          [30.983871, -98.248363],
          [30.983871, -98.248363],
          [30.983871, -98.248363],
          [30.983871, -98.248363],
          [30.983871, -98.248363],
          [30.983871, -98.248363],
          [31.068466, -98.416874],
          [31.068466, -98.416874],
          [31.068466, -98.416874],
          [30.983871, -98.248363]
        ]}
        smoothFactor={1.0}
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
