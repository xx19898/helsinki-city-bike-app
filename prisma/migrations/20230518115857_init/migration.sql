-- CreateTable
CREATE TABLE "Journey" (
    "id" SERIAL NOT NULL,
    "departure" TIMESTAMP(3) NOT NULL,
    "return" TIMESTAMP(3) NOT NULL,
    "departureStationId" INTEGER NOT NULL,
    "returnStationId" INTEGER NOT NULL,
    "coveredDistance" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Journey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Station" (
    "fId" INTEGER NOT NULL,
    "id" INTEGER NOT NULL,
    "name_FIN" TEXT NOT NULL,
    "name_SWE" TEXT NOT NULL,
    "name_ENG" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city_FIN" TEXT NOT NULL,
    "city_SWE" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Journey" ADD CONSTRAINT "Journey_departureStationId_fkey" FOREIGN KEY ("departureStationId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Journey" ADD CONSTRAINT "Journey_returnStationId_fkey" FOREIGN KEY ("returnStationId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
