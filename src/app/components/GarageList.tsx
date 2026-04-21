import { useState } from "react";
import { Search } from "lucide-react";
import { Garage } from "../data/garages";
import { GarageCard } from "./GarageCard";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";

interface GarageListProps {
  garages: Garage[];
  selectedGarageId: string | null;
  onSelectGarage: (garage: Garage) => void;
}

export function GarageList({ garages, selectedGarageId, onSelectGarage }: GarageListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("all");

  const cities = ["all", ...new Set(garages.map((g) => g.city))];

  const filteredGarages = garages.filter((garage) => {
    const matchesSearch = 
      garage.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      garage.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      garage.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCity = cityFilter === "all" || garage.city === cityFilter;
    
    return matchesSearch && matchesCity;
  });

  return (
    <div className="flex flex-col h-full bg-white border-r">
      <div className="p-4 space-y-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search garages or services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={cityFilter} onValueChange={setCityFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by city" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city === "all" ? "All Cities" : city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {filteredGarages.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No garages found</p>
          ) : (
            filteredGarages.map((garage) => (
              <GarageCard
                key={garage.id}
                garage={garage}
                onClick={() => onSelectGarage(garage)}
                isSelected={garage.id === selectedGarageId}
              />
            ))
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t bg-gray-50">
        <p className="text-sm text-gray-600">
          Showing {filteredGarages.length} of {garages.length} garages
        </p>
      </div>
    </div>
  );
}
