import { Mechanic } from "../data/garages";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface MechanicCardProps {
  mechanic: Mechanic;
  isAssigned?: boolean;
}

export function MechanicCard({ mechanic, isAssigned }: MechanicCardProps) {
  return (
    <Card className={isAssigned ? "border-blue-500 border-2" : ""}>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <div className="text-5xl">{mechanic.avatar}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-lg">{mechanic.name}</h4>
              {isAssigned && <Badge variant="default">Your Mechanic</Badge>}
            </div>
            <p className="text-sm text-gray-600">{mechanic.specialty}</p>
            <p className="text-xs text-gray-500">{mechanic.experience} experience</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
