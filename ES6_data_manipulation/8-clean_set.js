export default function cleanSet(set, startString) {
  if (!startString || startString === '') {
    return '';
  }
  return Array.from(set)
    .filter(value => value.startsWith(startString))
    .map(value => value.slice(startString.length))
    .join('-')
}
