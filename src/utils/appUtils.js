export const sortCharacters = (characters, sortField, sortDirection) => {
  return characters.sort((a, b) => {
    const valueA = a[sortField].toLowerCase();
    const valueB = b[sortField].toLowerCase();

    if (sortDirection === "asc") {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });
};
