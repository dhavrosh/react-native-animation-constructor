export default (() => {
  const _events = {};
  const get = key => _events[key];

  return {
    register: (key, worker) => {
      _events[key] = worker;
    },
    emit: (key, callback) => {
      const event = get(key);

      if (event) {
        event.start(callback);
      } else throw new Error('Invalid event key');
    }
  }
})();
