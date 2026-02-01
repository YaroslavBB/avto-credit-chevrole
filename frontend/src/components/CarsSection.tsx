"use client";

import CarCard from "./CarCard";
import type { Car } from "@/lib/api";

type CarsSectionProps = {
  cars: Car[];
};

export default function CarsSection({ cars }: CarsSectionProps) {
  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            {cars.map((car) => (
              <CarCard key={car.documentId ?? car.id} car={car} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
