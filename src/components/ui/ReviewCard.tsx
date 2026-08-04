"use client";

import { Review } from "@/data/reviews";
import { Star } from "lucide-react";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-sm p-8 shadow-sm border border-tertiary/10 min-w-[320px] md:min-w-[400px] flex flex-col">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating
                ? "fill-gold text-gold"
                : "fill-tertiary/20 text-tertiary/20"
            }`}
          />
        ))}
      </div>
      <p className="text-neutral/80 leading-relaxed flex-1 italic">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="mt-6 pt-4 border-t border-tertiary/20">
        <p className="font-medium text-neutral">{review.name}</p>
        <p className="text-sm text-tertiary">
          {review.location} &middot; {review.roomType}
        </p>
      </div>
    </div>
  );
}
