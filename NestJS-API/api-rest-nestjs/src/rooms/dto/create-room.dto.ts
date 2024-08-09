export class CreateRoomDto {
  name: string;
  number: number;
  disponible: boolean;
  price: number;
  capacity: number;
  checkIn: Date;
  checkOut: Date;
}

/*
json: {
    "name": "string",
    "number": 0,
    "disponible": true,
    "price": 0,
    "capacity": 0,
    "checkIn": "2021-09-29T20:00:00.000Z",
    "checkOut": "2021-09-29T20:00:00.000Z"
    }
*/
