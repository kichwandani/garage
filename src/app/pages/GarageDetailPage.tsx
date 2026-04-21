import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { garages, Garage, Review } from "../data/garages";
import { MapPin, Phone, Clock, Star, ArrowLeft, Calendar, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { ReviewSection } from "../components/ReviewSection";
import { TimeSlotPicker } from "../components/TimeSlotPicker";
import { MechanicCard } from "../components/MechanicCard";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";

export default function GarageDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [garage, setGarage] = useState<Garage | null>(null);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [assignedMechanic, setAssignedMechanic] = useState<number | null>(null);

  useEffect(() => {
    const foundGarage = garages.find((g) => g.id === id);
    if (foundGarage) {
      setGarage(foundGarage);
      // Set minimum date to today
      const today = new Date().toISOString().split("T")[0];
      setSelectedDate(today);
    }
  }, [id]);

  if (!garage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Garage not found</h2>
          <Button onClick={() => navigate("/")}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService || !selectedTime || !customerName || !customerPhone) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Randomly assign a mechanic
    const randomIndex = Math.floor(Math.random() * garage.mechanics.length);
    setAssignedMechanic(randomIndex);

    toast.success(
      `Booking confirmed! ${garage.mechanics[randomIndex].name} will be your mechanic.`,
      {
        description: `${selectedService} on ${new Date(selectedDate).toLocaleDateString()} at ${selectedTime}`,
      }
    );

    // Reset form
    setSelectedService("");
    setSelectedTime(null);
    setCustomerName("");
    setCustomerPhone("");
  };

  const handleAddReview = (review: Omit<Review, "id" | "date">) => {
    const newReview: Review = {
      ...review,
      id: `r${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
    };
    
    setGarage({
      ...garage,
      reviews: [newReview, ...garage.reviews],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{garage.name}</h1>
              <div className="flex items-center gap-4 text-blue-100">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{garage.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{garage.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Garage Info */}
            <Card>
              <CardHeader>
                <CardTitle>About This Garage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{garage.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <span>{garage.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span>{garage.openHours}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Services Offered</h4>
                  <div className="flex flex-wrap gap-2">
                    {garage.services.map((service) => (
                      <Badge key={service} variant="secondary">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mechanics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="w-5 h-5" />
                  Our Mechanics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {garage.mechanics.map((mechanic, index) => (
                  <MechanicCard
                    key={mechanic.id}
                    mechanic={mechanic}
                    isAssigned={assignedMechanic === index}
                  />
                ))}
              </CardContent>
            </Card>

            {/* Reviews */}
            <ReviewSection reviews={garage.reviews} onAddReview={handleAddReview} />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Book Appointment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name *</label>
                    <Input
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <Input
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+254 700 000 000"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Select Service *</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Choose a service</option>
                      {garage.services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Select Date *</label>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>

                  <TimeSlotPicker
                    timeSlots={garage.availableTimeSlots}
                    selectedTime={selectedTime}
                    onSelectTime={setSelectedTime}
                  />

                  <Separator />

                  <Button type="submit" className="w-full" size="lg">
                    Confirm Booking
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    A mechanic will be assigned to you upon booking confirmation
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-12">
        <div className="container mx-auto max-w-6xl text-center">
          <p>&copy; 2026 Kenya Garage Finder. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2">
            Connecting customers with trusted garages across Kenya
          </p>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}
