import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/prisma";

const handler = async (req: NextApiRequest, res:NextApiResponse) => {
  try {
  let data = await prisma.airplane.findMany();
  res.status(200).json(data);
  } catch (e) {
    
  }

}

export default handler;