"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { MapPin, Phone, Mail, Clock, Check, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">
              Get in Touch
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-neutral font-medium">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-tertiary max-w-xl mx-auto">
              We&apos;d love to hear from you. Reach out for reservations,
              inquiries, or just to say hello.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral">Address</p>
                    <p className="text-sm text-tertiary mt-1">
                      Tikamgarh, Madhya Pradesh
                      <br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral">Phone</p>
                    <a
                      href="tel:+917483667939"
                      className="text-sm text-tertiary hover:text-primary transition-colors mt-1 block"
                    >
                      +91 7483667939
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral">Email</p>
                    <a
                      href="mailto:info@billju.in"
                      className="text-sm text-tertiary hover:text-primary transition-colors mt-1 block"
                    >
                      info@billju.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral">Front Desk</p>
                    <p className="text-sm text-tertiary mt-1">
                      Available 24 hours, 7 days a week
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-cream border border-tertiary/20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnNDAuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hotel Location"
                  className="absolute inset-0"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center py-16"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-medium text-neutral">
                    Message Sent
                  </h2>
                  <p className="mt-3 text-tertiary max-w-md">
                    Thank you for reaching out. Our team will get back to you
                    within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="mt-6 text-sm text-primary font-medium hover:text-primary-light transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  onSubmit={handleSubmit}
                  className="bg-white border border-tertiary/10 rounded-sm p-8 shadow-sm space-y-6"
                >
                  <h2 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-neutral">
                    Send Us a Message
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral placeholder:text-tertiary/50 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral placeholder:text-tertiary/50 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral placeholder:text-tertiary/50 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral focus:outline-none focus:border-primary transition-colors appearance-none"
                      >
                        <option value="">Select a topic...</option>
                        <option value="reservation">Room Reservation</option>
                        <option value="restaurant">Restaurant Inquiry</option>
                        <option value="events">Events & Functions</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="How can we help you?"
                      className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral placeholder:text-tertiary/50 focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" fullWidth className="gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
