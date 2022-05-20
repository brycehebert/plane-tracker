import axios from "axios";

const getPositions = async (flightId: string) => {
  try {
    let result = await axios.get(`/api/flights/${flightId}`);
    const messages = result.data.Messages;
    let positions: [number, number][] = [];

    for (let el of messages) {
      positions.push([el.lat, el.lon]);
    }

    return positions;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default getPositions;
