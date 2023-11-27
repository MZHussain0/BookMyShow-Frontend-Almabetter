import { Button } from "./ui/button";

type Props = {
  bookTickets: () => void;
};

const BookingButton = ({ bookTickets }: Props) => {
  return (
    <Button
      className="relative p-2 inline-flex items-center justify-center text-xl font-bold overflow-hidden group rounded-md mt-5 drop-shadow-lg shadow-slate-600"
      onClick={() => bookTickets()}>
      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
      <span className="w-full relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
        <span className="relative text-white">Book Now</span>
      </span>
    </Button>
  );
};

export default BookingButton;
