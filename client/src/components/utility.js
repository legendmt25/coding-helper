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

export const getAuthentication = () => {
  return localStorage.getItem('authentication')
    ? JSON.parse(localStorage.getItem('authentication'))
    : null;
};

export const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};
