import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { WellnessClass } from "@/types";

export default function WellnessClassCard({ cls }: { cls: WellnessClass }) {
  return (
    <Card className="h-full flex flex-col">
      <div className="h-48 bg-teal-50 rounded-t-lg" />
      <CardHeader>
        <CardTitle className="text-lg">{cls.name}</CardTitle>
        <p className="text-xs text-gray-500 italic">{cls.origin}</p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-3">
        <p className="text-sm text-gray-700">{cls.description}</p>
        <div className="flex flex-wrap gap-1 mt-auto">
          {cls.benefits.map((b) => (
            <Badge key={b} variant="secondary" className="text-xs">{b}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
