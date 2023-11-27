// static data to be used in the application
export const data = {
  movies: [
    { id: 1, name: "The Shawshank Redemption" },
    { id: 2, name: "The Godfather: Part II" },
    { id: 3, name: "The Dark Knight" },
    { id: 4, name: "12 Angry Men" },
  ],
  slots: [
    { id: 1, time: "10:00 AM" },
    { id: 2, time: "01:00 PM" },
    { id: 3, time: "03:00 PM" },
    { id: 4, time: "07:00 PM" },
  ],
  seats: {
    A1: 0,
    A2: 0,
    A3: 0,
    A4: 0,
    D1: 0,
    D2: 0,
  },
};

export type Movies = (typeof data)["movies"];
export type Slots = (typeof data)["slots"];
export type Seats = (typeof data)["seats"];
