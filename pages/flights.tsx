import { GetServerSideProps } from "next";
import { prisma } from "../server/prisma";
import dateOptions from "../lib/dateOptions";
import styles from "../styles/Table.module.css";
import FlightRow from "../components/FlightRow";
import { Flight as FlightType } from "@prisma/client";
import Layout from "../components/Layout";

const flights = ({ data }: { data: FlightType[] }) => {
  return (
    <Layout>
      <div className={styles.mainContainer}>
        <table className={styles.flightTable}>
          <caption>Most Recent Flights</caption>
          <thead>
            <tr>
              <th role="col">Time Started</th>
              <th role="col">Time Ended</th>
              <th role="col">ICAO Hex</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el) => (
              <FlightRow {...el} key={el.id} />
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default flights;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    let data = await prisma.flight.findMany({
      take: 15,
      where: { NOT: { timeEnded: null } },
      orderBy: { timeEnded: "desc" }
    });

    // @ts-expect-error
    data = data.map((el) => {
      return {
        ...el,
        timeStarted: el.timeStarted.toLocaleString(undefined, dateOptions),
        timeEnded: el.timeEnded?.toLocaleString(undefined, dateOptions)
      };
    });

    return {
      props: { data }
    };
  } catch (e) {
    console.error(e);
    return { props: {} };
  }
};
