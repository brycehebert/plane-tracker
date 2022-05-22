import { GetServerSideProps } from "next";
import { Flight } from "@prisma/client";
import FlightRow from "../../components/FlightRow";
import dateOptions from "../../lib/dateOptions";
import { prisma } from "../../server/prisma";
import styles from "../../styles/Table.module.css";

const planeId = ({ data }: any): JSX.Element => {
  return (
    <div className={styles.mainContainer}>
      <table className={styles.flightTable}>
        <caption>Flights for {data.icao}</caption>
        <thead>
          <tr>
            <th role="col">Time Started</th>
            <th role="col">Time Ended</th>
            <th role="col">Call Sign Used</th>
          </tr>
        </thead>
        <tbody>
          {data.Flights.map((el: any) => {
            let flight: Flight & { callSign?: string } = {
              timeStarted: el.timeStarted,
              timeEnded: el.timeEnded,
              id: el.id,
              planeId: el.planeId,
              callSign: el.Messages[0].callSign
            };
            return <FlightRow {...flight} key={el.id} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default planeId;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const planeId = context.query.planeId as string;

  try {
    let data = await prisma.airplane.findUnique({
      where: { icao: planeId },
      include: {
        Flights: {
          select: {
            id: true,
            timeEnded: true,
            timeStarted: true,
            planeId: true,
            Messages: { select: { callSign: true }, take: 1 }
          }
        }
      }
    });

    let serialData = {
      ...data,
      createdAt: data?.createdAt.toLocaleString("en-us", dateOptions),
      lastSeen: data?.lastSeen.toLocaleString("en-us", dateOptions)
    };

    //@ts-expect-error
    serialData.Flights = serialData.Flights.map((el) => {
      return {
        ...el,
        timeStarted: el.timeStarted.toLocaleString("en-us", dateOptions),
        timeEnded: el.timeEnded ? el.timeEnded.toLocaleString("en-us", dateOptions) : null
      };
    });

    return { props: { data: serialData } };
  } catch (e) {
    console.error("Error in getServerSideProps in [planeId].tsx", e);
    return { props: {} };
  }
};
