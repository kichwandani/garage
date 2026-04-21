import { MapPin, Phone, Star, Clock, Calendar } from "lucide-react";
import { Garage } from "../data/garages";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface GarageGridCardProps {
  garage: Garage;
  onBook: () => void;
  onViewOnMap: () => void;
  distance?: string;
}

export function GarageGridCard({ garage, onBook, onViewOnMap, distance }: GarageGridCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
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
        {distance && (
          <p className="text-xs text-blue-600 font-medium mt-1">📍 {distance}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4 flex-1 flex flex-col">
        <p className="text-sm text-gray-600">{garage.description}</p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <span>{garage.phone}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span>{garage.openHours}</span>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-2">Services:</p>
          <div className="flex flex-wrap gap-2">
            {garage.services.slice(0, 4).map((service) => (
              <Badge key={service} variant="secondary" className="text-xs">
                {service}
              </Badge>
            ))}
            {garage.services.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{garage.services.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-auto pt-4">
          <Button onClick={onBook} className="flex-1">
            <Calendar className="w-4 h-4 mr-2" />
            Book Now
          </Button>
          <Button onClick={onViewOnMap} variant="outline" className="flex-1">
            <MapPin className="w-4 h-4 mr-2" />
            View on Map
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}