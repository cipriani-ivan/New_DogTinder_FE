import { Dog } from './dog';
import { Place } from './place';

export interface Appointment {
  appointmentId: number;
  time: Date;
  place: Place;
  dog: Dog;
}
