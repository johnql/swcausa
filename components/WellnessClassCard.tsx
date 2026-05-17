import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { WellnessClass } from "@/types";

export default function WellnessClassCard({ cls }: { cls: WellnessClass }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-teal-50">
        {cls.imageUrl ? (
          <Image
            src={cls.imageUrl}
            alt={cls.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-6xl text-teal-200">🌿</span>
          </div>
        )}
        {/* Origin badge overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-4">
          <p className="text-base text-white/90 italic">{cls.origin}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 gap-4">
        <h3 className="text-xl font-semibold text-gray-900">{cls.name}</h3>
        <p className="text-base text-gray-600 leading-relaxed flex-1">{cls.description}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {cls.benefits.map((b) => (
            <Badge key={b} variant="secondary" className="text-sm bg-teal-50 text-teal-700 border-0 px-3 py-1 h-auto">
              {b}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
