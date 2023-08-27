class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkValidAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async _request(endpoint, options) {
    const res = await fetch(`${this._baseUrl}${endpoint}`, options);
    return this._checkValidAnswer(res);
  }

  register(name, email, password) {
    return this._request('/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
  }

  authorize(email, password) {
    return this._request('/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, email }),
    });
  }

  checkJwt(token) {
    return this._request('/users/me', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  editProfile({ name, email }) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
      }),
    });
  }
}

const mainApi = new Api({
  baseUrl: `http://localhost:5000/api`,
  headers: {
    authorization: localStorage.getItem('token'),
    'Content-Type': 'application/json',
  },
});

export default mainApi;
