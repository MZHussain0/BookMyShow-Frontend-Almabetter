import { fetchLatestBooking } from "@/services/bookingService";
import { useQuery } from "@tanstack/react-query";

const LatestBookingSection = () => {
  const { data: latestBooking, isLoading } = useQuery({
    queryKey: ["latestBooking"],
    queryFn: () => fetchLatestBooking(),
  });

  if (!latestBooking) {
    return (
      <div className="mt-10 px-2 flex flex-col items-start justify-start gap-y-4 ">
        No booking found
      </div>
    );
  }

  const renderBookedSeats = () => {
    // Check if latestBooking.seats exists and is an object before proceeding
    if (!latestBooking.seats || typeof latestBooking.seats !== "object") {
      return null;
    }
    return Object.entries(latestBooking.seats)
      .filter(([_, value]) => value > 0)
      .map(([seatName, value]) => (
        <div key={seatName} className="text-teal-300">
          {seatName}: {value}
        </div>
      ));
  };
  return (
    <div className="my-10 px-2 flex flex-col items-start justify-start gap-y-4 text-teal-100 font-bold ">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="">
            Movie Name:{" "}
            <span className="text-teal-300">{latestBooking.movie}</span>
          </div>
          <div className="">
            Slot: <span className="text-teal-300">{latestBooking.slot}</span>
          </div>
          <div className="">Seats: {renderBookedSeats()}</div>
        </>
      )}
    </div>
  );
};

export default LatestBookingSection;
