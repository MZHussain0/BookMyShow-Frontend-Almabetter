export type BookingProps = {
  movie: string;
  slot: string;
  seats: {
    [key: string]: number;
  };
};

/**
 * Displays the details of the last booking, including the movie name, slot, and booked seats.
 * @param movie - The name of the movie.
 * @param slot - The time slot of the booking.
 * @param seats - An object containing the number of booked seats for each seat name.
 */
const LastBookingDetails = ({ movie, slot, seats }: BookingProps) => {
  /**
   * Renders the list of booked seats.
   * @returns A list of JSX elements representing the booked seats.
   */
  const renderBookedSeats = () => {
    return Object.entries(seats)
      .filter(([_, value]) => value > 0)
      .map(([seatName, value]) => (
        <div key={seatName} className="text-teal-300">
          {seatName}: {value}
        </div>
      ));
  };
  return (
    <div className="my-10 px-2 flex flex-col items-start justify-start gap-y-4 text-teal-100 font-bold ">
      <div className="">
        Movie Name: <span className="text-teal-300">{movie}</span>
      </div>
      <div className="">
        Slot: <span className="text-teal-300">{slot}</span>
      </div>
      {/* Display the booked seats */}
      <div className="">Seats: {renderBookedSeats()}</div>
    </div>
  );
};

export default LastBookingDetails;
