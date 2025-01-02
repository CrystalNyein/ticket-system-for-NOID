import EventModel from '../models/Event';

class EventSerializer {
  serialize(event: EventModel) {
    return {
      id: event.id,
      name: event.name,
      description: event.description,
      start_date: event.start_date,
      end_date: event.end_date,
      created_at: event.created_at,
      updated_at: event.updated_at,
    };
  }

  serializeMany(events: EventModel[]) {
    return events.map((event) => this.serialize(event));
  }
}

export const eventSerializer = new EventSerializer();
