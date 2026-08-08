/** Shared stay-search query helpers for rooms → book flow */

export type StayParams = {
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  room?: string;
};

export function todayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function isStayValid(checkIn?: string, checkOut?: string): boolean {
  if (!checkIn || !checkOut) return false;
  if (checkOut <= checkIn) return false;
  if (checkIn < todayISO()) return false;
  return true;
}

export function buildStayQuery(params: StayParams): string {
  const q = new URLSearchParams();
  if (params.checkIn) q.set("checkIn", params.checkIn);
  if (params.checkOut) q.set("checkOut", params.checkOut);
  if (params.guests) q.set("guests", params.guests);
  if (params.room) q.set("room", params.room);
  return q.toString();
}

export function roomsPath(params: StayParams = {}): string {
  const qs = buildStayQuery(params);
  return qs ? `/rooms?${qs}` : "/rooms";
}

export function bookPath(params: StayParams): string {
  const qs = buildStayQuery(params);
  return qs ? `/book?${qs}` : "/book";
}

export function roomDetailPath(slug: string, params: StayParams = {}): string {
  const qs = buildStayQuery({
    checkIn: params.checkIn,
    checkOut: params.checkOut,
    guests: params.guests,
  });
  return qs ? `/rooms/${slug}?${qs}` : `/rooms/${slug}`;
}
