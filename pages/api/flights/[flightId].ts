import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/prisma";

const handler = async (req:NextApiRequest, res:NextApiResponse) => {
  // @ts-ignore
  const {flightId}:string = req.query;

  try {
    let result = await prisma.flight.findUnique({
      where: {id: flightId},
      include: {Messages: {select: {lat:true, lon: true}}}
    })

    if (result){
      res.json(result);
    }
    else {
      res.redirect(307, '/flights' )
    }

  } catch (e) {
    console.log(e);
  }
}

export default handler