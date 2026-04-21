import { useEffect, useRef } from "react";
import L from "leaflet";
import { Garage } from "../data/garages";
import "leaflet/dist/leaflet.css";

interface MapViewProps {
  garages: Garage[];
  selectedGarage: Garage | null;
  onSelectGarage: (garage: Garage) => void;
}

export function MapView({ garages, selectedGarage, onSelectGarage }: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  useEffect(() => {
    // Initialize map
    if (!mapRef.current) {
      const map = L.map("map").setView([-0.0236, 37.9062], 6);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      mapRef.current = map;

      // Add markers for all garages
      garages.forEach((garage) => {
        const marker = L.marker(garage.coordinates)
          .addTo(map)
          .on("click", () => onSelectGarage(garage));

        const popupContent = `
          <div style="min-width: 250px;">
            <h3 style="font-weight: bold; font-size: 1.125rem; margin-bottom: 0.5rem;">${garage.name}</h3>
            <div style="margin-bottom: 0.5rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>${garage.location}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>${garage.phone}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="gold" stroke="gold" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span>${garage.rating} / 5.0</span>
              </div>
            </div>
            <div style="padding-top: 0.5rem; border-top: 1px solid #e5e7eb;">
              <p style="font-size: 0.75rem; color: #6b7280; margin-bottom: 0.25rem;">Services:</p>
              <p style="font-size: 0.75rem;">${garage.services.join(", ")}</p>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);
        markersRef.current.set(garage.id, marker);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current.clear();
      }
    };
  }, [garages, onSelectGarage]);

  // Handle selected garage changes
  useEffect(() => {
    if (selectedGarage && mapRef.current) {
      const marker = markersRef.current.get(selectedGarage.id);
      
      // Fly to the selected garage
      mapRef.current.flyTo(selectedGarage.coordinates, 13, {
        duration: 1.5,
      });

      // Open the popup
      if (marker) {
        marker.openPopup();
      }

      // Update marker icons
      markersRef.current.forEach((m, id) => {
        const icon = id === selectedGarage.id 
          ? L.icon({
              iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
              shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            })
          : L.icon({
              iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
              iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
              shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            });
        m.setIcon(icon);
      });
    }
  }, [selectedGarage]);

  return <div id="map" className="h-full w-full" />;
}
