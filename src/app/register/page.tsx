"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/auth";
import { HotelApiError } from "@/lib/api/types";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const [form, setForm] = useState({
    full_name: "",
    mobile_number: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register({
        full_name: form.full_name,
        mobile_number: form.mobile_number,
        password: form.password,
        email: form.email || undefined,
      });
      router.push("/rooms");
    } catch (err) {
      setError(
        err instanceof HotelApiError
          ? err.message
          : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-32 pb-24 px-4 min-h-screen">
      <div className="max-w-md mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-tertiary hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-neutral font-medium">
              Create account
            </h1>
            <p className="mt-2 text-tertiary text-sm">
              Register to book rooms and view your reservations.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-sm px-4 py-3">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                required
                placeholder="Your full name"
                className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral placeholder:text-tertiary/50 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile_number"
                value={form.mobile_number}
                onChange={handleChange}
                required
                placeholder="10-digit mobile number"
                className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral placeholder:text-tertiary/50 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                Email (optional)
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral placeholder:text-tertiary/50 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                placeholder="Min 6 characters"
                className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral placeholder:text-tertiary/50 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <Button type="submit" fullWidth size="lg" loading={loading}>
              Create Account
            </Button>
          </form>

          <p className="text-sm text-tertiary text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
