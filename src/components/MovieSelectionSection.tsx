import { Movies } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/store";
import { Button } from "./ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface MoviesProps {
  movies: Movies;
}
const MovieSelectionSection = ({ movies }: MoviesProps) => {
  // Get selectMovie function from store
  const selectMovie = useStore((store) => store.selectMovie);

  // Get bookingDetails from store
  const booking = useStore((store) => store.bookingDetails);
  return (
    <div className="mt-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Select a movie</CardTitle>
        </CardHeader>
        <CardFooter>
          <div className="w-full flex items-center justify-center gap-4 flex-wrap">
            {/* Render buttons for each movie */}
            {movies.map((movie) => (
              <Button
                key={movie.id}
                size={"lg"}
                className={cn(
                  "text-xl font-semibold py-8",
                  movie.name === booking.movie &&
                    "bg-gradient-to-r from-rose-500 to-rose-900"
                )}
                onClick={() => {
                  selectMovie(movie.name);
                }}>
                {movie.name}
              </Button>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MovieSelectionSection;
