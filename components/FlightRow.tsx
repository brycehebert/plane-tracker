import { useState } from "react";
import { Flight as FlightType } from "@prisma/client";
import styles from "../styles/FlightRow.module.css";
import dateOptions from "../lib/dateOptions";
import Flight from "./Flight";

const FlightRow = (props: FlightType): JSX.Element => {
  const { id: flightId } = props;

  const [collapsed, setCollapsed] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [height, setHeight] = useState("0");
  const [showMap, setShowMap] = useState(false);

  const toggleCollapse = () => {
    if (!transitioning) {
      setTransitioning(true);
      if (collapsed) {
        setHeight("800px");
        setCollapsed(false);
      } else if (!collapsed) {
        setHeight("0");
        setCollapsed(true);
      }
    }
  };

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    const { id } = e.target as EventTarget & { id: string };
    if (id === flightId) {
      setShowMap(!showMap);
    }
    setTransitioning(false);
  };

  return (
    <FlightRowView
      toggleCollapse={toggleCollapse}
      flight={props}
      showMap={showMap}
      handleTransitionEnd={handleTransitionEnd}
      height={height}
    />
  );
};

const FlightRowView = (props: ViewProps): JSX.Element => {
  const { toggleCollapse, handleTransitionEnd, showMap, height } = props;
  const { timeStarted, timeEnded, planeId, id: flightId } = props.flight;

  return (
    <>
      <tr onClick={toggleCollapse}>
        <td>{timeStarted.toLocaleString("en-us", dateOptions)}</td>
        <td>{timeEnded?.toLocaleString("en-us", dateOptions)}</td>
        <td>{planeId}</td>
      </tr>
      <tr>
        <td
          className={styles.flightContainer}
          id={flightId}
          colSpan={3}
          onTransitionEnd={handleTransitionEnd}
          style={{ height: height }}
        >
          {showMap ? <Flight {...props.flight} /> : <></>}
        </td>
      </tr>
    </>
  );
};

interface ViewProps {
  toggleCollapse: React.MouseEventHandler;
  flight: FlightType;
  handleTransitionEnd: React.TransitionEventHandler;
  showMap: boolean;
  height: string;
}

export default FlightRow;
