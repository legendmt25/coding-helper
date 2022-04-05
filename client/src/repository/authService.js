const authService = {
  login(email, password) {
    return fetch('http://localhost:3000/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(email, password),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.jwttoken) {
          localStorage.setItem('authentication', JSON.stringify(res));
        }
      });
  },
  register(obj) {
    return fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...obj }),
    });
  },
};

export default authService;
