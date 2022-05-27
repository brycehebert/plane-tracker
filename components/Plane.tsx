import Photo from "./Photo";
import Link from "next/link";

const Plane = (props: PlaneProps): JSX.Element => {
  const { icao, createdAt, lastSeen, Messages } = props;
  return (
    <tr>
      <Photo icao={icao} />
      <td>{Messages.length > 0 ? Messages[0].callSign : ""}</td>
      <td>{createdAt}</td>
      <td>{lastSeen}</td>
      <td>
        <Link href={`/airplane/${icao}`}>
          <a>{icao}</a>
        </Link>
      </td>
    </tr>
  );
};

interface PlaneProps {
  icao: string;
  createdAt: string;
  lastSeen: string;
  Messages: { callSign: boolean }[];
}

export default Plane;
