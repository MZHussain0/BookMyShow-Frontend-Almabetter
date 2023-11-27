import { Seats } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/store";
import { useState } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

interface SeatProps {
  seats: Seats;
}

/**
 * A component that allows users to select their seats.
 * @param seats - An object representing the available seats.
 */

const SeatSelectionSection = ({ seats }: SeatProps) => {
  const selectSeat = useStore((store) => store.selectSeat);
  const booking = useStore((store) => store.bookingDetails);

  const [selectedSeats, setSelectedSeats] = useState({ ...seats });

  /**
   * Handles the change in the number of seats selected for a specific seat type.
   * @param seat - The seat type.
   * @param value - The new number of seats selected.
   */
  const handleSeatChange = (seat: string, value: number) => {
    const newValue = Math.max(0, value); // This ensures that the seat count cannot be negative.
    setSelectedSeats({
      ...selectedSeats,
      [seat]: newValue,
    });
    selectSeat(seat, newValue);
  };

  return (
    <div className="mt-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Select your seats</CardTitle>
        </CardHeader>
        <CardFooter>
          <div className="w-full flex items-center justify-center gap-4 flex-wrap">
            {Object.entries(seats).map(([seat]) => (
              <Card
                key={seat}
                className={cn(
                  "text-xl font-semibold py-4 px-4 bg-slate-400",
                  booking.seats[seat] > 0 &&
                    "bg-gradient-to-r from-rose-500 to-rose-900"
                )}>
                <p className="mb-2">Type {seat}</p>
                <Input
                  min={0}
                  max={5}
                  type="number"
                  value={booking.seats[seat] || 0}
                  placeholder="0"
                  onChange={(e) => {
                    handleSeatChange(seat, Number(e.target.value));
                  }}
                />
              </Card>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SeatSelectionSection;
