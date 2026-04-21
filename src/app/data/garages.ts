export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Mechanic {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  avatar: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Garage {
  id: string;
  name: string;
  location: string;
  city: string;
  coordinates: [number, number];
  phone: string;
  services: string[];
  rating: number;
  openHours: string;
  description: string;
  mechanics: Mechanic[];
  reviews: Review[];
  availableTimeSlots: TimeSlot[];
}

const defaultTimeSlots: TimeSlot[] = [
  { time: "08:00 AM", available: true },
  { time: "09:00 AM", available: true },
  { time: "10:00 AM", available: false },
  { time: "11:00 AM", available: true },
  { time: "12:00 PM", available: true },
  { time: "01:00 PM", available: false },
  { time: "02:00 PM", available: true },
  { time: "03:00 PM", available: true },
  { time: "04:00 PM", available: true },
  { time: "05:00 PM", available: false },
];

const mechanicsPool = [
  { id: "m1", name: "John Kamau", specialty: "Engine Specialist", experience: "8 years", avatar: "👨‍🔧" },
  { id: "m2", name: "Mary Wanjiru", specialty: "Brake Systems", experience: "5 years", avatar: "👩‍🔧" },
  { id: "m3", name: "Peter Otieno", specialty: "Transmission Expert", experience: "10 years", avatar: "👨‍🔧" },
  { id: "m4", name: "Grace Akinyi", specialty: "AC & Electrical", experience: "6 years", avatar: "👩‍🔧" },
  { id: "m5", name: "James Mwangi", specialty: "Body Work", experience: "7 years", avatar: "👨‍🔧" },
  { id: "m6", name: "Lucy Njoki", specialty: "Diagnostics", experience: "4 years", avatar: "👩‍🔧" },
];

const sampleReviews = [
  { userName: "David Omondi", rating: 5, comment: "Excellent service! Very professional and quick turnaround time.", date: "2026-03-20" },
  { userName: "Sarah Njeri", rating: 4, comment: "Good work but a bit pricey. Overall satisfied with the service.", date: "2026-03-15" },
  { userName: "Michael Kiprop", rating: 5, comment: "Best garage in town! Highly recommend.", date: "2026-03-10" },
  { userName: "Anne Wairimu", rating: 4, comment: "Professional staff and quality service.", date: "2026-03-05" },
];

export const garages: Garage[] = [
  {
    id: "1",
    name: "Nairobi Auto Care Center",
    location: "Westlands, Nairobi",
    city: "Nairobi",
    coordinates: [-1.2676, 36.8070],
    phone: "+254 700 123 456",
    services: ["Oil Change", "Brake Service", "Engine Repair", "Tire Service"],
    rating: 4.5,
    openHours: "Mon-Sat: 8:00 AM - 6:00 PM",
    description: "Full-service auto repair center with experienced technicians.",
    mechanics: [mechanicsPool[0], mechanicsPool[1]],
    reviews: [
      { id: "r1", ...sampleReviews[0] },
      { id: "r2", ...sampleReviews[1] }
    ],
    availableTimeSlots: defaultTimeSlots
  },
  {
    id: "2",
    name: "Kenya Motors Workshop",
    location: "Industrial Area, Nairobi",
    city: "Nairobi",
    coordinates: [-1.3195, 36.8519],
    phone: "+254 700 234 567",
    services: ["Engine Diagnostics", "Transmission Repair", "AC Service", "Electrical Repair"],
    rating: 4.8,
    openHours: "Mon-Fri: 7:30 AM - 5:30 PM",
    description: "Specialized in modern vehicle diagnostics and repair.",
    mechanics: [mechanicsPool[2], mechanicsPool[3]],
    reviews: [
      { id: "r3", ...sampleReviews[2] },
      { id: "r4", ...sampleReviews[3] }
    ],
    availableTimeSlots: defaultTimeSlots
  },
  {
    id: "3",
    name: "Parklands Auto Service",
    location: "Parklands, Nairobi",
    city: "Nairobi",
    coordinates: [-1.2626, 36.8244],
    phone: "+254 700 345 678",
    services: ["Body Work", "Painting", "Dent Repair", "Detailing"],
    rating: 4.3,
    openHours: "Mon-Sat: 8:00 AM - 7:00 PM",
    description: "Expert body work and painting services.",
    mechanics: [mechanicsPool[4], mechanicsPool[5]],
    reviews: [
      { id: "r5", userName: "Patrick Oloo", rating: 4, comment: "Great body work! My car looks brand new.", date: "2026-03-18" }
    ],
    availableTimeSlots: defaultTimeSlots
  },
  {
    id: "4",
    name: "Mombasa Coast Garage",
    location: "Nyali, Mombasa",
    city: "Mombasa",
    coordinates: [-4.0435, 39.7213],
    phone: "+254 700 456 789",
    services: ["General Repair", "Oil Change", "Brake Service", "Tire Service"],
    rating: 4.2,
    openHours: "Mon-Sat: 8:00 AM - 6:00 PM",
    description: "Your trusted garage on the coast.",
    mechanics: [mechanicsPool[0], mechanicsPool[2]],
    reviews: [
      { id: "r6", userName: "Hassan Ali", rating: 4, comment: "Reliable service at the coast.", date: "2026-03-12" }
    ],
    availableTimeSlots: defaultTimeSlots
  },
  {
    id: "5",
    name: "Island Motors Mombasa",
    location: "Mombasa Island",
    city: "Mombasa",
    coordinates: [-4.0547, 39.6636],
    phone: "+254 700 567 890",
    services: ["Engine Repair", "Transmission", "Suspension", "Steering"],
    rating: 4.6,
    openHours: "Mon-Fri: 7:00 AM - 5:00 PM",
    description: "Professional mechanical services in the heart of Mombasa.",
    mechanics: [mechanicsPool[1], mechanicsPool[3]],
    reviews: [
      { id: "r7", userName: "Fatuma Mohamed", rating: 5, comment: "Excellent transmission work!", date: "2026-03-08" }
    ],
    availableTimeSlots: defaultTimeSlots
  },
  {
    id: "6",
    name: "Kisumu Auto Experts",
    location: "Milimani, Kisumu",
    city: "Kisumu",
    coordinates: [-0.0917, 34.7680],
    phone: "+254 700 678 901",
    services: ["Full Service", "Oil Change", "Brake Repair", "Engine Diagnostics"],
    rating: 4.4,
    openHours: "Mon-Sat: 8:00 AM - 6:00 PM",
    description: "Complete auto care for all vehicle makes and models.",
    mechanics: [mechanicsPool[4], mechanicsPool[5]],
    reviews: [
      { id: "r8", userName: "Robert Ouma", rating: 4, comment: "Good service in Kisumu.", date: "2026-03-14" }
    ],
    availableTimeSlots: defaultTimeSlots
  },
  {
    id: "7",
    name: "Lakeside Garage",
    location: "Mamboleo, Kisumu",
    city: "Kisumu",
    coordinates: [-0.0680, 34.7617],
    phone: "+254 700 789 012",
    services: ["Tire Service", "Wheel Alignment", "Balancing", "Battery Service"],
    rating: 4.1,
    openHours: "Mon-Sat: 8:30 AM - 6:30 PM",
    description: "Specialists in tires and wheel services.",
    mechanics: [mechanicsPool[0], mechanicsPool[1]],
    reviews: [
      { id: "r9", userName: "Jennifer Adhiambo", rating: 4, comment: "Best tire service around.", date: "2026-03-11" }
    ],
    availableTimeSlots: defaultTimeSlots
  },
  {
    id: "8",
    name: "Nakuru Quick Fix",
    location: "Section 58, Nakuru",
    city: "Nakuru",
    coordinates: [-0.3031, 36.0800],
    phone: "+254 700 890 123",
    services: ["Quick Service", "Oil Change", "Battery", "Minor Repairs"],
    rating: 4.0,
    openHours: "Mon-Sun: 7:00 AM - 8:00 PM",
    description: "Fast and reliable service for urgent repairs.",
    mechanics: [mechanicsPool[2], mechanicsPool[3]],
    reviews: [
      { id: "r10", userName: "Simon Karanja", rating: 4, comment: "Quick and efficient!", date: "2026-03-16" }
    ],
    availableTimeSlots: defaultTimeSlots
  },
  {
    id: "9",
    name: "Eldoret Auto Care",
    location: "Annex, Eldoret",
    city: "Eldoret",
    coordinates: [0.5143, 35.2698],
    phone: "+254 700 901 234",
    services: ["General Repair", "Engine Service", "Brake Service", "Suspension"],
    rating: 4.5,
    openHours: "Mon-Sat: 8:00 AM - 6:00 PM",
    description: "Comprehensive auto repair services in Eldoret.",
    mechanics: [mechanicsPool[4], mechanicsPool[5]],
    reviews: [
      { id: "r11", userName: "Ruth Chepkemoi", rating: 5, comment: "Highly professional team!", date: "2026-03-09" }
    ],
    availableTimeSlots: defaultTimeSlots
  },
  {
    id: "10",
    name: "Thika Road Motors",
    location: "Thika Town",
    city: "Thika",
    coordinates: [-1.0332, 37.0693],
    phone: "+254 700 012 345",
    services: ["Full Service", "Diagnostics", "Electrical", "AC Repair"],
    rating: 4.3,
    openHours: "Mon-Fri: 8:00 AM - 5:30 PM",
    description: "Modern diagnostic equipment and skilled technicians.",
    mechanics: [mechanicsPool[0], mechanicsPool[2]],
    reviews: [
      { id: "r12", userName: "George Kariuki", rating: 4, comment: "Great diagnostics service.", date: "2026-03-13" }
    ],
    availableTimeSlots: defaultTimeSlots
  },
  {
    id: "11",
    name: "Karen Auto Workshop",
    location: "Karen, Nairobi",
    city: "Nairobi",
    coordinates: [-1.3195, 36.7073],
    phone: "+254 700 123 789",
    services: ["Luxury Car Service", "Engine Repair", "Body Work", "Detailing"],
    rating: 4.7,
    openHours: "Mon-Sat: 8:00 AM - 6:00 PM",
    description: "Premium service for luxury and high-end vehicles.",
    mechanics: [mechanicsPool[1], mechanicsPool[3]],
    reviews: [
      { id: "r13", userName: "Catherine Wambui", rating: 5, comment: "Best luxury car service in Nairobi!", date: "2026-03-17" }
    ],
    availableTimeSlots: defaultTimeSlots
  },
  {
    id: "12",
    name: "Ruiru Mechanics",
    location: "Ruiru Town",
    city: "Ruiru",
    coordinates: [-1.1439, 36.9615],
    phone: "+254 700 234 890",
    services: ["General Repair", "Oil Change", "Brake Service", "Tire Repair"],
    rating: 3.9,
    openHours: "Mon-Sat: 8:00 AM - 7:00 PM",
    description: "Affordable and reliable auto repair services.",
    mechanics: [mechanicsPool[4], mechanicsPool[5]],
    reviews: [
      { id: "r14", userName: "Francis Mutua", rating: 4, comment: "Affordable and honest service.", date: "2026-03-19" }
    ],
    availableTimeSlots: defaultTimeSlots
  }
];
