export interface Bus{
    [key: string]: any;
    "id": number,
    "Bus Name":string,
    "Departure Time":string,
    "Source":string,
    "Destination":string,
    "Fare":number,
    "Coach Type":string,
    "Seats Available": number,
    "bookings": any
}