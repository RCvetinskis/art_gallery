export const sortArray = (array, sortType) => {
  switch (sortType.value) {
    case "Ascending":
      return array.sort((a, b) => (a.title > b.title ? 1 : -1));
    case "Descending":
      return array.sort((a, b) => (a.title < b.title ? 1 : -1));
    default:
      return array;
  }
};
