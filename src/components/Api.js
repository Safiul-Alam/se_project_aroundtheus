export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(endpoint, { method, body }) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      headers: this._headers,
      method: method,
      body: body,
    }).then((res) => this._checkResponse(res));
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }


  getInitialCards() {
    return this._request(`/cards`, {});
  }

  getUserInfo() {
    return this._request(`/users/me`, {});
  }

  setUserInfo({ modalTitle, description }) {
    return this._request(`/users/me`, {
      method: "PATCH",
      body: JSON.stringify({ name: modalTitle, about: description }),
    });
  }

  setUserAvatar(link) {
    return this._request(`/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({ avatar: link }),
    });
  }

  uploadCard({ Title, Link }) {
    return this._request(`/cards`, {
      method: "POST",
      body: JSON.stringify({
        name: Title,
        link: Link,
      }),
    });
  }

  deleteCard(id) {
    return this._request(`/cards/${id}`, {
      method: "DELETE",
    });
  }

  updateCardLike(id, method) {
    return this._request(`/cards/${id}/likes`, {
      method: method,
    });
  }


}