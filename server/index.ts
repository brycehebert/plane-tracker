import "dotenv/config";
import { prisma } from "./prisma";
import Start from "./planeProcess";

const main = async () => {
  Start();
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => await prisma.$disconnect());
