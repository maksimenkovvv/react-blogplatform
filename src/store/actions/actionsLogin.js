export const setLogged = (logged) => ({
  type: 'SET_LOGGED',
  payload: logged,
});

export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});

export const setErrorState = (error) => ({
  type: 'SET_ERROR',
  payload: error,
});
