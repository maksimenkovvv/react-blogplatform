import { setLogged, setUser, setErrorState } from '../store/actions/actionsLogin';

export function signUp(data) {
  const value = {
    username: data.username,
    email: data.email,
    password: data.password,
  };
  return function (dispatch) {
    fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: value,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.user) {
          dispatch(setErrorState(''));
        }
        if (body.errors) {
          const value = `${Object.entries(body.errors)
            .map((err) => `${err[0].toString()}, `)
            .join(' ')
            .slice(0, -2)} is alredy taken`;
          dispatch(setErrorState(value));
        }
      });
  };
}

export function signIn(email, password) {
  return function (dispatch) {
    fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.user) {
          localStorage.setItem('token', body.user.token);
          dispatch(setLogged(true));
          dispatch(setUser(body.user));
          dispatch(setErrorState(''));
        }
        if (body.errors) {
          const value = `${Object.entries(body.errors)
            .map((err) => `${err[0].toString()}`)
            .join(' ')} is invalid`;
          dispatch(setErrorState(value));
          dispatch(setLogged(false));
        }
      });
  };
}

export const checkAuth = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('https://blog.kata.academy/api/user/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((body) => {
          dispatch(setLogged(true));
          dispatch(setErrorState(''));
          dispatch(setUser(body.user));
        });
    } else return;
  } catch (error) {
    dispatch(setErrorState(error));
  }
};

export function updateProfile(data) {
  const token = localStorage.getItem('token');
  return function (dispatch) {
    fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        user: data,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        console.log(body);
        if (body.user) {
          dispatch(setUser(body.user));
          dispatch(setErrorState(''));
        }
        if (body.errors) {
          const value = Object.entries(body.errors).map(([key, value]) => `${key}: ${value}`);
          dispatch(setErrorState(value));
        }
      });
  };
}

export const setlogOut = () => async (dispatch) => {
  try {
    localStorage.removeItem('token');
    dispatch(setUser({}));
    dispatch(setLogged(false));
    dispatch(setErrorState(''));
  } catch (error) {
    dispatch(setErrorState(error));
  }
};
