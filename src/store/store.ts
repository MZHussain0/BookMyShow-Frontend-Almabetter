import { create } from "zustand";
import { PersistStorage, StorageValue, persist } from "zustand/middleware";

type SeatSelections = {
  [key: string]: number;
};

interface StoreState {
  bookingDetails: {
    movie: string;
    slot: string;
    seats: SeatSelections;
  };
  selectMovie: (movie: string) => void;
  selectTime: (slot: string) => void;
  selectSeat: (seat: string, value: number) => void;
  resetBookingDetails: () => void;
}

type SetState<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void;

const initialData = {
  movie: "",
  slot: "",
  seats: {
    A1: 0,
    A2: 0,
    A3: 0,
    A4: 0,
    D1: 0,
    D2: 0,
  },
};

const store = (set: SetState<StoreState>): StoreState => ({
  bookingDetails: initialData,

  selectMovie: (movie: string) =>
    set((state: StoreState) => ({
      bookingDetails: { ...state.bookingDetails, movie },
    })), // hook to update the state with the selected movie

  selectTime: (slot: string) =>
    set((state: StoreState) => ({
      bookingDetails: { ...state.bookingDetails, slot },
    })), // hook to update the state with the selected time

  selectSeat: (seat: string, value: number) =>
    set((state: StoreState) => ({
      bookingDetails: {
        ...state.bookingDetails,
        seats: {
          ...state.bookingDetails.seats,
          [seat]: value,
        },
      },
    })), // hook to update the state with the selected seat

  resetBookingDetails: () =>
    set({
      bookingDetails: initialData,
    }), // hook to reset the state with the initial data
});

// Persist the booking data to localStorage
const storage: PersistStorage<StoreState> = {
  getItem: (key) =>
    JSON.parse(localStorage.getItem(key) as string) as
      | StorageValue<StoreState>
      | Promise<StorageValue<StoreState> | null>
      | null,
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
  },
};
export const useStore = create(
  persist<StoreState>(store, {
    name: "booking-details",
    storage: storage as PersistStorage<StoreState>,
  })
);
