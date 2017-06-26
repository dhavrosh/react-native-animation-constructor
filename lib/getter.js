export default function createGetter(items) {
  return {
    get: key => {
      return items.hasOwnProperty(key) ? items[key] : null;
    }
  }
}
