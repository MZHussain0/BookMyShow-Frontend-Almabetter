import { apiClient } from "@/lib/utils";

interface ISeatMap {
  [seatName: string]: number;
}

interface IBooking {
  movie: string;
  slot: string;
  seats: ISeatMap;
}

/**
 * Fetches the latest booking from the API
 * @returns {Promise<IBooking>} - A promise that resolves to the latest booking
 */
export const fetchLatestBooking = async (): Promise<IBooking> => {
  const { data } = await apiClient.get("/api/booking");
  return data[0];
};

/**
 * Creates a new booking
 * @param {IBooking} booking - The booking object to be created
 * @returns {Promise<IBooking>} - A promise that resolves to the created booking data
 */
export const createBooking = async (booking: IBooking): Promise<IBooking> => {
  const { data } = await apiClient.post("/api/booking", booking);
  return data;
};
