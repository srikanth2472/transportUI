export class BusDto {
    id: number = 0;
    busCode: string = '';
    passengers: PassengerDto[] = [];
    passengerCount: number = 0;
}

export class PassengerDto {
    id: number = 0;
    name: string = '';
    email: string = '';
    busId: number = 0;
    busCode: string = '';
}