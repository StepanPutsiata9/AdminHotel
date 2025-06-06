export interface Room {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  status: "available" | "occupied" | "out_of_service" | "clean";
  number: string;
  temperature: number;
  entry: string;
  departure: string;
  doorStatus: "closed" | "open";
}

export const rooms: Room[] = [
  {
    id: 101,
    number: "101",
    status: "available",
    temperature: 23,
    entry: "2023-05-10",
    departure: "2023-05-15",
    doorStatus: "closed",
    x: 50,
    y: 50,
    width: 150,
    height: 100,
  },
  {
    id: 102,
    number: "102",
    status: "occupied",
    temperature: 26,
    entry: "2023-05-12",
    departure: "2023-05-17",
    doorStatus: "closed",
    x: 220,
    y: 50,
    width: 150,
    height: 100,
  },
  {
    id: 103,
    number: "103",
    status: "available",
    temperature: 28,
    entry: "2023-05-18",
    departure: "2023-05-25",
    doorStatus: "closed",
    x: 390,
    y: 50,
    width: 150,
    height: 100,
  },
  {
    id: 104,
    number: "104",
    status: "out_of_service",
    temperature: 26,
    entry: "2023-05-18",
    departure: "2023-05-25",
    doorStatus: "closed",
    x: 560,
    y: 50,
    width: 150,
    height: 100,
  },
  {
    id: 105,
    number: "105",
    status: "occupied",
    temperature: 22,
    entry: "2023-05-14",
    departure: "2023-05-20",
    doorStatus: "closed",
    x: 730,
    y: 50,
    width: 150,
    height: 100,
  },
  {
    id: 106,
    number: "106",
    status: "clean",
    temperature: 26,
    entry: "2023-05-11",
    departure: "2023-05-17",
    doorStatus: "closed",
    x: 900,
    y: 50,
    width: 150,
    height: 100,
  },
  {
    id: 201,
    number: "201",
    status: "occupied",
    temperature: 28,
    entry: "2023-05-11",
    departure: "2023-05-16",
    doorStatus: "closed",
    x: 50,
    y: 180,
    width: 150,
    height: 100,
  },
  {
    id: 202,
    number: "202",
    status: "available",
    temperature: 23,
    entry: "2023-05-21",
    departure: "2023-05-28",
    doorStatus: "closed",
    x: 220,
    y: 180,
    width: 150,
    height: 100,
  },
  {
    id: 203,
    number: "203",
    status: "occupied",
    temperature: 23,
    entry: "2023-05-13",
    departure: "2023-05-19",
    doorStatus: "closed",
    x: 390,
    y: 180,
    width: 150,
    height: 100,
  },
  {
    id: 204,
    number: "204",
    status: "occupied",
    temperature: 22,
    entry: "2023-05-09",
    departure: "2023-05-15",
    doorStatus: "closed",
    x: 560,
    y: 180,
    width: 150,
    height: 100,
  },
  {
    id: 205,
    number: "205",
    status: "out_of_service",
    temperature: 21,
    entry: "2023-05-11",
    departure: "2023-05-19",
    doorStatus: "closed",
    x: 730,
    y: 180,
    width: 150,
    height: 100,
  },
  {
    id: 206,
    number: "206",
    status: "available",
    temperature: 19,
    entry: "2023-05-22",
    departure: "2023-05-29",
    doorStatus: "closed",
    x: 900,
    y: 180,
    width: 150,
    height: 100,
  },
];
