import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  loginCustomer,
  logoutCustomer,
  registerCustomer,
} from "@/lib/api/hotel";
import type { Customer } from "@/lib/api/types";
import { HotelApiError } from "@/lib/api/types";

interface AuthState {
  token: string | null;
  tokenExpiresAt: string | null;
  customer: Customer | null;
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  setSession: (token: string, expiresAt: string, customer: Customer) => void;
  clearSession: () => void;
  login: (mobile: string, password: string) => Promise<void>;
  register: (input: {
    full_name: string;
    mobile_number: string;
    password: string;
    email?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "").slice(-10);
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      tokenExpiresAt: null,
      customer: null,
      hydrated: false,

      setHydrated: (value) => set({ hydrated: value }),

      setSession: (token, expiresAt, customer) =>
        set({
          token,
          tokenExpiresAt: expiresAt,
          customer,
        }),

      clearSession: () =>
        set({
          token: null,
          tokenExpiresAt: null,
          customer: null,
        }),

      isAuthenticated: () => {
        const { token, tokenExpiresAt } = get();
        if (!token) return false;
        if (!tokenExpiresAt) return true;
        return new Date(tokenExpiresAt).getTime() > Date.now();
      },

      login: async (mobile, password) => {
        const data = await loginCustomer({
          mobile_number: digitsOnly(mobile),
          password,
        });
        set({
          token: data.token,
          tokenExpiresAt: data.token_expires_at,
          customer: data.customer,
        });
      },

      register: async (input) => {
        const data = await registerCustomer({
          full_name: input.full_name.trim(),
          mobile_number: digitsOnly(input.mobile_number),
          password: input.password,
          email: input.email?.trim() || undefined,
        });
        set({
          token: data.token,
          tokenExpiresAt: data.token_expires_at,
          customer: data.customer,
        });
      },

      logout: async () => {
        const token = get().token;
        try {
          if (token) await logoutCustomer(token);
        } catch (err) {
          // Still clear local session if token already expired
          if (!(err instanceof HotelApiError && err.status === 401)) {
            console.warn("Logout API failed:", err);
          }
        } finally {
          get().clearSession();
        }
      },
    }),
    {
      name: "lumiere-auth",
      partialize: (state) => ({
        token: state.token,
        tokenExpiresAt: state.tokenExpiresAt,
        customer: state.customer,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);

export function normalizeMobile(value: string): string {
  return digitsOnly(value);
}
