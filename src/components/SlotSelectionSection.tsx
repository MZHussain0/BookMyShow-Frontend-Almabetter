import { Slots } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/store";
import { Button } from "./ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface MoviesProps {
  slots: Slots;
}

/**
 * Component for selecting a time slot.
 *
 * @param slots - The available time slots.
 */
const SlotSelectionSection = ({ slots }: MoviesProps) => {
  const booking = useStore((store) => store.bookingDetails);
  const selectTime = useStore((store) => store.selectTime);
  return (
    <div className="mt-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Select a time slot</CardTitle>
        </CardHeader>
        <CardFooter>
          <div className="w-full flex items-center justify-center gap-4 flex-wrap">
            {/* Render a Button component for each slot */}
            {slots.map((slot) => (
              <Button
                key={slot.id}
                size={"lg"}
                onClick={() => selectTime(slot.time)}
                className={cn(
                  "text-xl font-semibold py-8",
                  // Apply a different background color if the slot is selected
                  slot.time === booking.slot &&
                    "bg-gradient-to-r from-rose-500 to-rose-900"
                )}>
                {slot.time}
              </Button>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SlotSelectionSection;
