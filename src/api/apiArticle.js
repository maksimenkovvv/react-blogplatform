export function getArticleList(page) {
  const token = localStorage.getItem('token');
  return fetch(`https://blog.kata.academy/api/articles?&limit=5&offset=${(page - 1) * 5}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((response) => response.json());
}

export function postFavorited(slug) {
  const token = localStorage.getItem('token');
  return fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((response) => response.json());
}

export function delFavorited(slug) {
  const token = localStorage.getItem('token');
  return fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((response) => response.json());
}

export function getArticle(slug) {
  const token = localStorage.getItem('token');
  return fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
}

export function newArticle(data) {
  const token = localStorage.getItem('token');
  const { title, body, description, tagList } = data;
  console.log(data);
  return fetch('https://blog.kata.academy/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      article: {
        title: title,
        description: description,
        tagList: tagList,
        body: body,
      },
    }),
  }).then((response) => response.json());
}

export function editArticle(slug, data) {
  const token = localStorage.getItem('token');
  const { title, body, description, tagList } = data;
  return fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      article: {
        title: title,
        description: description,
        tagList: tagList,
        body: body,
      },
    }),
  }).then((response) => response.json());
}

export function deleteArticle(slug) {
  const token = localStorage.getItem('token');
  return fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((response) => response.json());
}
