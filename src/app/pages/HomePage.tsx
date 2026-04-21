import { useState, useRef, useEffect } from "react";
import { MapView } from "../components/MapView";
import { HeroSection } from "../components/HeroSection";
import { GarageGridCard } from "../components/GarageGridCard";
import { garages } from "../data/garages";
import { Garage } from "../data/garages";
import { Search, MapIcon } from "lucide-react";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useNavigate } from "react-router";
import { calculateDistance, formatDistance } from "../utils/distance";

export default function HomePage() {
  const [selectedGarage, setSelectedGarage] = useState<Garage | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const garagesRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const cities = ["all", ...new Set(garages.map((g) => g.city))];

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.log("Location access denied or unavailable:", error);
          // Default to Nairobi center if location is not available
          setUserLocation([-1.2921, 36.8219]);
        }
      );
    } else {
      // Default to Nairobi center
      setUserLocation([-1.2921, 36.8219]);
    }
  }, []);

  const filteredGarages = garages.filter((garage) => {
    const matchesSearch = 
      garage.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      garage.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      garage.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCity = cityFilter === "all" || garage.city === cityFilter;
    const matchesService = !serviceFilter || garage.services.includes(serviceFilter);
    
    return matchesSearch && matchesCity && matchesService;
  });

  // Calculate distances for filtered garages
  const garagesWithDistance = filteredGarages.map((garage) => {
    if (userLocation) {
      const distance = calculateDistance(
        userLocation[0],
        userLocation[1],
        garage.coordinates[0],
        garage.coordinates[1]
      );
      return { ...garage, distance };
    }
    return { ...garage, distance: null };
  });

  const handleBooking = (garage: Garage) => {
    navigate(`/garage/${garage.id}`);
  };

  const handleViewOnMap = (garage: Garage) => {
    setSelectedGarage(garage);
    mapRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleServiceFilter = (service: string) => {
    setServiceFilter(service);
    garagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection onServiceClick={handleServiceFilter} />

      {/* Garages Section */}
      <section ref={garagesRef} className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Available Garages</h2>
            <p className="text-gray-600">Browse and book appointments with trusted garages near you</p>
            {serviceFilter && (
              <p className="text-sm text-blue-600 mt-2">
                Showing garages offering: <strong>{serviceFilter}</strong>{" "}
                <button 
                  onClick={() => setServiceFilter(null)}
                  className="underline ml-2"
                >
                  Clear filter
                </button>
              </p>
            )}
          </div>

          {/* Search and Filters */}
          <div className="mb-8 grid md:grid-cols-2 gap-4">
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

          {/* Garage Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {garagesWithDistance.length === 0 ? (
              <p className="text-center text-gray-500 py-8 col-span-full">No garages found</p>
            ) : (
              garagesWithDistance.map((garage) => (
                <GarageGridCard
                  key={garage.id}
                  garage={garage}
                  onBook={() => handleBooking(garage)}
                  onViewOnMap={() => handleViewOnMap(garage)}
                  distance={garage.distance ? formatDistance(garage.distance) : undefined}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section ref={mapRef} className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8 flex items-center gap-3">
            <MapIcon className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-3xl font-bold">Explore on Map</h2>
              <p className="text-gray-600">See all garage locations across Kenya</p>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg" style={{ height: "600px" }}>
            <MapView
              garages={filteredGarages}
              selectedGarage={selectedGarage}
              onSelectGarage={setSelectedGarage}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <p>&copy; 2026 Kenya Garage Finder. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2">
            Connecting customers with trusted garages across Kenya
          </p>
        </div>
      </footer>
    </div>
  );
}
