import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { signIn } from '../../api/apiLogin';
import styles from '../App/App.module.scss';

export default function SignIn() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({ mode: 'onBlur' });
  const { errorState } = useSelector((state) => state.reduserLogin);
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(signIn(data.email, data.password));
    if (errorState === '') {
      history.push('/');
    }
  };

  return (
    <div className={styles.block__form}>
      <h2>Sign In</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          className={styles.input}
          placeholder="Email address"
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /^([A-Za-z0-9_.-])+@([A-Za-z0-9_.-])+.([A-Za-z])$/,
              message: 'Incorrect mail',
            },
          })}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className={styles.input}
          placeholder="Password"
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 6,
              message: 'Minimum 6 characters',
            },
            maxLength: {
              value: 40,
              message: 'Maximum 40 characters',
            },
          })}
        />
        <input type="submit" name="submit" id="submit" value="Login" />
      </form>
      <p>
        Already have an account? <Link to="/sign-up">Sign Up</Link>.
      </p>
      {errorState && <div className={styles.error}>{errorState}</div>}
    </div>
  );
}
