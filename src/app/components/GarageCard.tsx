import { MapPin, Phone, Star, Clock } from "lucide-react";
import { Garage } from "../data/garages";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface GarageCardProps {
  garage: Garage;
  onClick: () => void;
  isSelected?: boolean;
}

export function GarageCard({ garage, onClick, isSelected }: GarageCardProps) {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          <span>{garage.name}</span>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm">{garage.rating}</span>
          </div>
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {garage.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-gray-600">{garage.description}</p>
        
        <div className="flex items-center gap-2 text-sm">
          <Phone className="w-4 h-4" />
          <span>{garage.phone}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4" />
          <span>{garage.openHours}</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {garage.services.slice(0, 3).map((service) => (
            <Badge key={service} variant="secondary" className="text-xs">
              {service}
            </Badge>
          ))}
          {garage.services.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{garage.services.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
