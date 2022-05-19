import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import styles from "../styles/Map.module.css";

const Map = ({ positions }: any): JSX.Element => {
  const bounds = [positions[0], positions[positions.length - 1]];

  return (
    <MapContainer className={styles.MapContainer} bounds={bounds} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={positions} smoothFactor={1.0} />
      <Marker position={positions[0]}>
      </Marker>
    </MapContainer>
  );
};

export default Map;
