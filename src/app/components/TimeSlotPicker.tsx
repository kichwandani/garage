import { TimeSlot } from "../data/garages";
import { Button } from "./ui/button";

interface TimeSlotPickerProps {
  timeSlots: TimeSlot[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

export function TimeSlotPicker({ timeSlots, selectedTime, onSelectTime }: TimeSlotPickerProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-3">Select Time Slot</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {timeSlots.map((slot) => (
          <Button
            key={slot.time}
            type="button"
            variant={selectedTime === slot.time ? "default" : "outline"}
            disabled={!slot.available}
            onClick={() => onSelectTime(slot.time)}
            className={`${
              !slot.available ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {slot.time}
            {!slot.available && " (Full)"}
          </Button>
        ))}
      </div>
    </div>
  );
}
