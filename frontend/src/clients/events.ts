import { QueryFunctionContext } from 'react-query'
import axios from 'axios'

export const generateQueryKey = (id: string | undefined, timestamp?: string | null): ['getEvents', string | undefined, string | undefined | null] => {
  return ['getEvents', id, timestamp]
}

export const getEvents = async ({ queryKey }: QueryFunctionContext<ReturnType<typeof generateQueryKey>>): Promise<Event[]> => {
  const [, id, timestamp] = queryKey
  return id === undefined
    ? []
    : (await axios.get(`/api/care-recipients/${id}/events${timestamp ? `?date=${timestamp}` : ''}`)).data
}

export type Event =
  | GeneralObservationEvent
  | TaskCompletedEvent
  | FoodIntakeObservation
  | FluidIntakeEvent
  | PhysicalHealthObservationEvent
  | VisitCompletedEvent
  | CheckOutEvent
  | CheckInEvent
  | MoodObservationEvent
  | ReguarMedicationTakeEvent
  | NoMedicationObservationReceivedEvent
  | AlertRaisedEvent
  | IncontinencePadObservationEvent;

interface BaseEvent {
  id: string;
  visit_id: string;
  timestamp: string;
  caregiver_id: string;
  care_recipient_id: string;
}

interface GeneralObservationEvent extends BaseEvent {
  note: string;
  media: string[];
  event_type: 'general_observation';
}

interface TaskCompletedEvent extends BaseEvent {
  event_type: 'task_completed';
  task_instance_id: string;
  task_schedule_id: string;
  task_definition_id: string;
  task_schedule_note: string;
  task_definition_description: string;
}

interface FluidIntakeEvent extends BaseEvent {
  fluid: string;
  observed: boolean;
  event_type: 'fluid_intake_observation';
  consumed_volume_ml: number;
}

interface FoodIntakeObservation extends BaseEvent {
  event_type: 'food_intake_observation',
  meal: string;
  note: string;
}

interface PhysicalHealthObservationEvent extends BaseEvent {
  note: string;
  event_type: 'physical_health_observation';
}

interface VisitCompletedEvent extends BaseEvent {
  event_type: 'visit_completed';
}

interface CheckInEvent extends BaseEvent {
  event_type: 'check_in';
}

interface CheckOutEvent extends BaseEvent {
  event_type: 'check_out';
}

interface MoodObservationEvent extends BaseEvent {
  mood: string;
  event_type: 'mood_observation';
}

interface ReguarMedicationTakeEvent extends BaseEvent {
  event_type: 'regular_medication_taken';
  medication_type: string;
  task_instance_id: string;
}

interface AlertRaisedEvent extends BaseEvent {
  alert_id: string;
  event_type: 'alert_raised';
  observation_event_id: string;
}

interface NoMedicationObservationReceivedEvent extends BaseEvent {
  event_type: 'no_medication_observation_received';
  medication_type: string;
  task_instance_id: string;
  expected_dose_timestamp: string;
}

interface IncontinencePadObservationEvent extends BaseEvent {
  event_type: 'incontinence_pad_observation';
  screenProps: {
    careRecipientId: string;
  };
  observations: string[];
  pad_condition: string;
}