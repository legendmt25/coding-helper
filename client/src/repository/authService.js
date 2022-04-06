const domain = 'http://192.168.100.4:3000';

const authService = {
  login(email, password) {
    return fetch(`${domain}/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('Invalid credentials');
        }
        return res.json();
      })
      .then((res) => {
        if (res.jwttoken)
          localStorage.setItem('authentication', JSON.stringify(res));
        return res;
      });
  },
  register(obj) {
    return fetch(`${domain}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...obj }),
    });
  },
  logout() {
    localStorage.clear();
  },
};

export default authService;
