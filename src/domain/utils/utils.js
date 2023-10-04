

export function searchMatches(search) {
  // Currying to support 'search' assingment just once and use it multiple times
  return (field) => {
    return field.toLowerCase().includes(search.toLowerCase());
  }
}