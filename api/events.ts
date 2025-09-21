export const GET_EVENT_API_ENDPOINT = 'https://adonix.hackillinois.org/event/';

export interface Event {
  eventId: string;
  name: string;
  description: string;
  startTime: number;
  endTime: number;
  locations: { description: string; latitude: number; longitude: number }[];
  sponsor: string;
  eventType: string;
  points: number;
}

export const getEvents = async (): Promise<Event[]> => {
  const response = await fetch(GET_EVENT_API_ENDPOINT);
  if (!response.ok) {
    throw new Error('Bad network response');
  }
  const data = await response.json();
  return data.events;
};