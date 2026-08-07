import { hotelFetch } from "./client";
import { RESTAURANT_ID } from "./config";
import type {
  AuthPayload,
  CreateBookingData,
  CreateBookingPayload,
  MyBookingsData,
  MyBookingsQuery,
  RoomsListData,
  RoomsQuery,
} from "./types";

export async function registerCustomer(input: {
  full_name: string;
  mobile_number: string;
  password: string;
  email?: string;
  restaurant_id?: number;
}) {
  return hotelFetch<AuthPayload>("/register", {
    method: "POST",
    body: {
      restaurant_id: input.restaurant_id ?? RESTAURANT_ID,
      full_name: input.full_name,
      mobile_number: input.mobile_number,
      password: input.password,
      ...(input.email ? { email: input.email } : {}),
    },
  });
}

export async function loginCustomer(input: {
  mobile_number: string;
  password: string;
  restaurant_id?: number;
}) {
  return hotelFetch<AuthPayload>("/login", {
    method: "POST",
    body: {
      restaurant_id: input.restaurant_id ?? RESTAURANT_ID,
      mobile_number: input.mobile_number,
      password: input.password,
    },
  });
}

export async function logoutCustomer(token: string) {
  return hotelFetch<Record<string, never>>("/logout", {
    method: "POST",
    token,
  });
}

export async function fetchRooms(query: RoomsQuery = {}) {
  return hotelFetch<RoomsListData>("/rooms", {
    method: "GET",
    query: {
      restaurant_id: query.restaurant_id ?? RESTAURANT_ID,
      room_type_id: query.room_type_id,
      status: query.status,
      floor_number: query.floor_number,
      search: query.search,
      min_rate: query.min_rate,
      max_rate: query.max_rate,
      check_in_date: query.check_in_date,
      check_out_date: query.check_out_date,
      available_only: query.available_only,
    },
  });
}

export async function createBooking(
  payload: Omit<CreateBookingPayload, "restaurant_id"> & {
    restaurant_id?: number;
  },
  token?: string | null
) {
  return hotelFetch<CreateBookingData>("/create_booking", {
    method: "POST",
    token,
    body: {
      ...payload,
      restaurant_id: payload.restaurant_id ?? RESTAURANT_ID,
    },
  });
}

export async function fetchMyBookings(
  token: string,
  query: MyBookingsQuery = {}
) {
  return hotelFetch<MyBookingsData>("/my_bookings", {
    method: "GET",
    token,
    query: {
      status: query.status,
      from_date: query.from_date,
      to_date: query.to_date,
      booking_number: query.booking_number,
      page: query.page,
      limit: query.limit,
    },
  });
}
