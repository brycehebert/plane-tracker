import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import styles from "../styles/Map.module.css";
import L from "leaflet";

const getBounds = (positions: [number, number][]) => {
  let maxLat = positions[0][0];
  let maxLon = positions[0][1];
  let minLat = positions[0][0];
  let minLon = positions[0][1];

  for (let el of positions) {
    if (el[0] > maxLat) {
      maxLat = el[0];
    }
    if (el[0] < minLat) {
      minLat = el[0];
    }
    if (el[1] > maxLon) {
      maxLon = el[1];
    }
    if (el[1] < minLon) {
      minLon = el[1];
    }
  }
  const topLeft = L.latLng(maxLat, minLon);
  const bottomRight = L.latLng(minLat, maxLon);
  return new L.LatLngBounds(topLeft, bottomRight);
};

const Map = ({ positions }: { positions: [number, number][] }): JSX.Element => {
  const bounds = getBounds(positions);

  return (
    <MapContainer className={styles.MapContainer} bounds={bounds} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={positions} smoothFactor={1.0} />
      <Marker position={positions[0]}></Marker>
    </MapContainer>
  );
};

export default Map;
