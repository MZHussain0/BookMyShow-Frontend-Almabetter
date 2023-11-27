import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import BookingButton from "./components/BookingButton";
import LastBookingDetails, {
  BookingProps,
} from "./components/LastBookingDetails";
import MovieSelectionSection from "./components/MovieSelectionSection";
import Navbar from "./components/Navbar";
import SeatSelectionSection from "./components/SeatSelectionSection";
import SlotSelectionSection from "./components/SlotSelectionSection";
import { Button } from "./components/ui/button";
import { useToast } from "./components/ui/use-toast";
import { data } from "./lib/data";
import { createBooking } from "./services/bookingService";
import { useStore } from "./store/store";

function App() {
  const [error, setError] = useState("");
  const [lastBookingDetails, setLastBookingDetails] = useState<BookingProps>();
  const { toast } = useToast();

  const bookingDetails = useStore((store) => store.bookingDetails);

  const allSeatsAreZero = Object.values(bookingDetails.seats).every(
    (value) => value === 0
  );

  const { mutate: bookTickets } = useMutation({
    mutationFn: async () => {
      if (!bookingDetails.movie) {
        setError("Please select a movie before proceeding.");
        return Promise.reject("Please select a movie before proceeding.");
      }
      if (!bookingDetails.slot) {
        setError("Please select a time slot before proceeding.");
        return Promise.reject("Please select a time before proceeding.");
      }
      if (allSeatsAreZero) {
        setError("Select atleast one seat in any row to book tickets.");
        return Promise.reject("Please select a seat.");
      }
      return createBooking(bookingDetails);
    },
    onSuccess: (data) => {
      toast({
        variant: "default",
        title: "Tickets Booked Successfully!",
      });
      setLastBookingDetails(data);
      useStore.getState().resetBookingDetails();
      // window.location.reload();
    },
    onError: () =>
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      }),
  });

  const clearError = () => {
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Main section */}
      <div className="min-h-screen flex items-start justify-center flex-wrap gap-y-4 pt-20 gap-x-4 px-4">
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-900 rounded-xl border border-teal-300 drop-shadow-md shadow-teal-200 ">
          <div className="px-8 py-16 text-white">
            <MovieSelectionSection movies={data.movies} />
            <SlotSelectionSection slots={data.slots} />
            <SeatSelectionSection seats={data.seats} />
            <BookingButton bookTickets={bookTickets} />
          </div>
        </div>
        {/* Right section */}
        <div className=" bg-gradient-to-r from-stone-950 to-stone-700 rounded-xl border border-teal-300 drop-shadow-md shadow-teal-200  min-h-[320px] flex flex-col items-center justify-start">
          <p className="text-xl rounded-lg font-semibold px-2 py-4 border-b border-white text-white ">
            Details of last booking:
          </p>
          {/* <LatestBookingSection /> */}
          {lastBookingDetails ? (
            <LastBookingDetails
              movie={lastBookingDetails.movie}
              slot={lastBookingDetails.slot}
              seats={lastBookingDetails.seats}
            />
          ) : (
            <p className=" text-md font-bold text-red-200 mt-24 animate-pulse">
              No bookings found
            </p>
          )}
        </div>
      </div>

      {/* Modal for error */}
      {error && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-white px-16 py-8 rounded-md">
            <p className="text-red-500">{error}</p>
            <Button
              className="px-4 py-2 rounded-md mt-4"
              variant={"destructive"}
              size={"sm"}
              onClick={clearError}>
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
