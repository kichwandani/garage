import { Wrench, Car, Droplet, Zap, Gauge, Wind, PaintBucket, Settings } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const services = [
  { name: "Oil Change", icon: Droplet },
  { name: "Engine Repair", icon: Settings },
  { name: "Brake Service", icon: Car },
  { name: "Tire Service", icon: Gauge },
  { name: "AC Service", icon: Wind },
  { name: "Body Work", icon: PaintBucket },
  { name: "Electrical", icon: Zap },
  { name: "Diagnostics", icon: Wrench },
];

interface HeroSectionProps {
  onServiceClick?: (service: string) => void;
}

export function HeroSection({ onServiceClick }: HeroSectionProps) {
  return (
    <section 
      className="text-white py-16 px-4 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1633059170547-43b7d8de1fb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLZW55YW4lMjBtZWNoYW5pYyUyMHdvcmtpbmclMjBjYXJzJTIwZ2FyYWdlfGVufDF8fHx8MTc3NDk1MDY4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
      }}
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Wrench className="w-16 h-16 drop-shadow-lg" />
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 text-white drop-shadow-2xl" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.8)' }}>
            Seniour's Garage Finder Services
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>
            Connect with trusted garages across Kenya. Find the perfect service provider for your vehicle needs.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-center mb-6 drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>
            Services We Offer
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service) => (
              <Card 
                key={service.name} 
                className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
                onClick={() => onServiceClick?.(service.name)}
              >
                <CardContent className="p-6 text-center">
                  <service.icon className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-medium">{service.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}