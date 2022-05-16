import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { prisma } from "../server/prisma";
import Plane from "../components/Plane";
import styles from "../styles/Home.module.css";

const index = ({ data }: any): JSX.Element => {
  // React-Leaflet doesn't work with SSR, must do Client-Side
  const MapWithNoSSR = dynamic(() => import("../components/Map"), { ssr: false });

  return (
    <div className={styles.mainContainer}>
      <table className={styles.flightTable}>
        <caption>Most Recent Sightings</caption>
        <thead>
          <tr>
            <th></th>
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
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async () => {
  let data = await prisma.airplane.findMany({
    take: 15,
    orderBy: { lastSeen: "desc" },
    include: {
      Messages: { take: 5, select: { callSign: true } }
    }
  });

  //@ts-expect-error
  data = data.map((el) => {
    return {
      ...el,
      createdAt: el.createdAt.toLocaleString(),
      lastSeen: el.lastSeen.toLocaleString()
    };
  });

  return {
    props: { data }
  };
};