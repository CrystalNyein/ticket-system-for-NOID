import EventModel from '../models/Event';

class EventSerializer {
  serialize(event: EventModel) {
    return {
      id: event.id,
      name: event.name,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      isRandom: event.isRandom,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
  }

  serializeMany(events: EventModel[]) {
    return events.map((event) => this.serialize(event));
  }
}

export const eventSerializer = new EventSerializer();
