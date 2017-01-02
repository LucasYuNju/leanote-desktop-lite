import eventEmitter from 'event-emitter';

// singleton
const emitter = new eventEmitter({});

export default emitter;
