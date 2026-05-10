import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Program = {
  title: string;
  description: string;
  icon: string;
};

export default function ProgramCard({ program }: { program: Program }) {
  return (
    <Card className="text-center">
      <CardHeader>
        <div className="text-4xl mb-2">{program.icon}</div>
        <CardTitle className="text-base">{program.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{program.description}</p>
      </CardContent>
    </Card>
  );
}
