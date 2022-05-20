import { useEffect, useState } from "react";
import { Flight as FlightType } from "@prisma/client";
import styles from "../styles/Flight.module.css";
import getPositions from "../lib/getPositions";
import dynamic from "next/dynamic";

const Flight = (props: FlightType): JSX.Element => {
  const { id: flightId } = props;
  const [positions, setPositions] = useState<[number, number][]>([]);

  useEffect(() => {
    getPositions(flightId).then((data) => setPositions(data));
  }, []);

  return <FlightView positions={positions} />;
};

const FlightView = (props: ViewProps): JSX.Element => {
  const { positions } = props;
  //Leaflet doesn't work with NextJS SSR, so it must be done client side.
  const MapWithNoSSR = dynamic(() => import("../components/Map"), { ssr: false });

  return (
    <div className={styles.mapContainer}>
      {positions[0] ? <MapWithNoSSR positions={positions} /> : <div>Loading</div>}
    </div>
  );
};

interface ViewProps {
  positions: [number, number][];
}

export default Flight;
