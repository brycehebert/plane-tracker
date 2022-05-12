-- CreateTable
CREATE TABLE "Airplane" (
    "id" TEXT NOT NULL,
    "icao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Airplane_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "planeId" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,
    "speed" INTEGER NOT NULL,
    "alt" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "callSign" TEXT,
    "flightId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flight" (
    "id" TEXT NOT NULL,
    "planeId" TEXT NOT NULL,
    "timeStarted" TIMESTAMP(3) NOT NULL,
    "timeEnded" TIMESTAMP(3),

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Airplane_icao_key" ON "Airplane"("icao");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_planeId_fkey" FOREIGN KEY ("planeId") REFERENCES "Airplane"("icao") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_planeId_fkey" FOREIGN KEY ("planeId") REFERENCES "Airplane"("icao") ON DELETE RESTRICT ON UPDATE CASCADE;
