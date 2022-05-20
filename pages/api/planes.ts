import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let result = await prisma.airplane.findMany({
      take: 10,
      orderBy: { lastSeen: "desc" },
      include: {
        Messages: { select: { callSign: true, lat: true, lon: true, alt: true, flightId: true } },
        Flights: true
      }
    });
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
  }
};

export default handler;
