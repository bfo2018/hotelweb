"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Room } from "@/data/rooms";
import { DEFAULT_ROOM_IMAGE } from "@/lib/api/config";
import { Users, Maximize2, Eye } from "lucide-react";

interface RoomCardProps {
  room: Room;
  index?: number;
}

export function RoomCard({ room, index = 0 }: RoomCardProps) {
  const preferred =
    room.thumbnail || room.images?.[0] || DEFAULT_ROOM_IMAGE;
  const [imageSrc, setImageSrc] = useState(preferred);

  useEffect(() => {
    setImageSrc(preferred);
  }, [preferred]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/rooms/${room.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-sm aspect-[4/3]">
          <Image
            src={imageSrc}
            alt={room.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => {
              if (imageSrc !== DEFAULT_ROOM_IMAGE) {
                setImageSrc(DEFAULT_ROOM_IMAGE);
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <span className="text-white text-sm font-medium tracking-wide uppercase">
              Explore Room
            </span>
          </div>
          {room.virtualTourUrl && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">360°</span>
            </div>
          )}
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-neutral group-hover:text-primary transition-colors">
                {room.name}
              </h3>
              <p className="text-sm text-tertiary mt-1">{room.tagline}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-primary">
                ₹{room.price.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-tertiary">per night</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-tertiary pt-2 border-t border-tertiary/20">
            {room.sizeUnit ? (
              <span className="flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5" />
                {room.size} {room.sizeUnit}
              </span>
            ) : null}
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              {room.maxGuests} Guests
            </span>
            <span>{room.view}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
