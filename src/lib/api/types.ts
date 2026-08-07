/** Shared Hotel API types (BillJu / HMS POS Booking) */

export type ApiStatus = "success" | "error";

export interface ApiSuccess<T> {
  status: "success";
  message: string;
  data: T;
}

export interface ApiErrorBody {
  status: "error";
  message: string;
  details?: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiErrorBody;

export interface Customer {
  id: number;
  guest_id: number;
  restaurant_id: number;
  full_name: string;
  mobile_number: string;
  email: string | null;
}

export interface AuthPayload {
  token: string;
  token_expires_at: string;
  customer: Customer;
}

export interface RoomPhoto {
  id: number;
  url: string;
  is_primary: number | boolean | string;
  photo_url?: string;
  image_url?: string;
  path?: string;
}

export interface RoomCategory {
  id: number;
  name: string;
  description: string | null;
  base_rate: number;
  max_occupancy: number;
  amenities: string | null;
}

export interface ApiRoom {
  id: number;
  room_number: string;
  status: string;
  floor_number: number | null;
  rate_per_night: number;
  description: string | null;
  category: RoomCategory | null;
  photos?: RoomPhoto[] | null;
  primary_photo?: string | null;
}

export interface RoomsListData {
  count: number;
  filters_applied?: Record<string, string | undefined>;
  rooms: ApiRoom[];
}

export interface RoomsQuery {
  restaurant_id?: number;
  room_type_id?: number;
  status?: string;
  floor_number?: number;
  search?: string;
  min_rate?: number;
  max_rate?: number;
  check_in_date?: string;
  check_out_date?: string;
  available_only?: 0 | 1;
}

export type PaymentType = "CASH" | "CARD" | "UPI" | "BANK_TRANSFER";

export interface CreateBookingPayload {
  restaurant_id: number;
  room_id: number;
  check_in_date: string;
  check_out_date: string;
  guest_name?: string;
  mobile_number?: string;
  email?: string;
  number_of_guests?: number;
  advance_payment?: number;
  payment_type?: PaymentType;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  id_proof_type?: string;
  id_proof_number?: string;
  nationality?: string;
  discount_amount?: number;
  gst_rate?: number;
  tax_type?: "CGST_SGST" | "IGST";
}

export interface BookingRoomSummary {
  id: number;
  room_number: string;
  category_name: string | null;
}

export interface Booking {
  id: number;
  booking_number: string;
  status: string;
  guest_name: string;
  mobile_number: string;
  email: string | null;
  room: BookingRoomSummary;
  check_in_date: string;
  check_out_date: string;
  total_nights: number;
  number_of_guests: number;
  rent_per_night: number;
  advance_payment: number;
  total_amount: number;
  final_amount: number;
  gst_amount: number;
  payment_type: string;
  booking_source: string;
  created_date: string;
}

export interface CreateBookingData {
  booking: Booking;
}

export interface MyBookingsQuery {
  status?: string;
  from_date?: string;
  to_date?: string;
  booking_number?: string;
  page?: number;
  limit?: number;
}

export interface MyBookingsData {
  bookings: Booking[];
  count: number;
  total: number;
  page: number;
  limit: number;
}

export class HotelApiError extends Error {
  status: number;
  details?: string;

  constructor(message: string, status: number, details?: string) {
    super(message);
    this.name = "HotelApiError";
    this.status = status;
    this.details = details;
  }
}
