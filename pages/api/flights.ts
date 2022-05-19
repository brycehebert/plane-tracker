import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/prisma";



const handler = async (req:NextApiRequest, res:NextApiResponse) => {
  try {
    let result = await prisma.flight.findMany({
      take: 15,
      where: {NOT: {timeEnded: null}},
      include: {
        Messages: {}
      },
      orderBy: {timeEnded: "desc"}
    })
    res.json(result);

  } catch (e) {
    console.log(e);
  }
}

export default handler