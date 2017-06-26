export default (() => {
  const _events = {};
  const get = key => _events[key];

  return {
    register: (key, worker) => {
      _events[key] = worker;
    },
    emit: key => {
      const event = get(key);

      if (event) {
        event.start();
      } else throw new Error('Invalid event key');
    }
  }
})();
