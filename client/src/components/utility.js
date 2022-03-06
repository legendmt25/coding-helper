export const transformToSelectItems = (list, listValues = null) => {
  return list.map((el, index) => {
    return {
      text: el,
      value: listValues ? listValues[index] : index,
    };
  });
};

export const capitalize = (str) => {
  return (
    str[0].toUpperCase() +
    str
      .slice(1)
      .split('')
      .map((x) => (x.toUpperCase() === x ? ` ${x.toLowerCase()}` : x))
      .join('')
  );
};

export const difficultyColor = (difficulty) => {
  if (difficulty.toLowerCase() === 'easy') return 'green';
  if (difficulty.toLowerCase() === 'medium') return 'orange';
  return 'red';
};
