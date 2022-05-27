import { GetServerSideProps } from "next";
import { prisma } from "../server/prisma";
import Plane from "../components/Plane";
import dateOptions from "../lib/dateOptions";
import styles from "../styles/Table.module.css";
import Layout from "../components/Layout";

const index = ({ data }: any): JSX.Element => {
  return (
    <Layout>
      <div className={styles.mainContainer}>
        <table className={styles.flightTable}>
          <caption>Most Recent Sightings</caption>
          <thead>
            <tr>
              <th scope="col">Photo</th>
              <th scope="col">Call Sign</th>
              <th scope="col">First Seen</th>
              <th scope="col">Last Seen</th>
              <th scope="col">ICAO Hex</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el: any) => (
              <Plane {...el} key={el.id} />
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    let data = await prisma.airplane.findMany({
      take: 15,
      orderBy: { lastSeen: "desc" },
      include: {
        Messages: { take: 1, select: { callSign: true }, orderBy: { time: "desc" } }
      }
    });

    //@ts-expect-error
    data = data.map((el) => {
      return {
        ...el,
        createdAt: el.createdAt.toLocaleString(undefined, dateOptions),
        lastSeen: el.lastSeen.toLocaleString(undefined, { ...dateOptions, second: "2-digit" })
      };
    });

    return {
      props: { data }
    };
  } catch (e) {
    console.error("Error in getServerSideProps in index.tsx", e);
    return { props: {} };
  }
};
