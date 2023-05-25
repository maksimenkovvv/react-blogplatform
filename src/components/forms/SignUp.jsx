import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';

import { signUp } from '../../api/apiLogin';
import styles from '../App/App.module.scss';

export default function SignUp() {
  const dispatch = useDispatch();
  const { errorState } = useSelector((state) => state.reduserLogin);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ mode: 'onBlur' });
  const [ckeckbox, setCheckbox] = useState(false);
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(signUp(data));
    if (errorState === '') {
      message.success('Account created succsessfully');
      history.push('/sign-in');
    }
  };

  return (
    <div className={styles.block__form}>
      <h2>Create new account</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className={styles.input}
          autoFocus
          id="username"
          placeholder="Username"
          {...register('username', {
            required: 'This field is required',
            minLength: {
              value: 3,
              message: 'Minimum 3 characters',
            },
            maxLength: {
              value: 20,
              message: 'Maximum 20 characters',
            },
          })}
        />
        {errors?.username && <div className={styles.error}>{errors?.username.message || 'Error'}</div>}
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
        {errors?.email && <div className={styles.error}>{errors?.email?.message || 'Error'}</div>}
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
        {errors?.password && <div className={styles.error}>{errors?.password?.message || 'Error'}</div>}
        <label htmlFor="repassword">Repeat Password</label>
        <input
          id="repassword"
          type="password"
          className={styles.input}
          placeholder="Password"
          {...register('repassword', {
            required: 'This field is required',
            validate: (val) => {
              if (watch('password') != val) {
                return 'Your passwords do not match';
              }
            },
          })}
        />
        {errors?.repassword && <div className={styles.error}>{errors?.repassword?.message || 'Error'}</div>}
        <label htmlFor="agree">
          <input
            id="agree"
            type="checkbox"
            className={styles.checkbox}
            {...register('agree', { value: ckeckbox, required: 'The field must be filled in' })}
            onChange={(e) => {
              setCheckbox(e.target.checked);
            }}
          />
          {'I agree to the processing of my personal information'}
        </label>
        {errors?.check && <div className={styles.error}>{errors?.check?.message || 'Error'}</div>}
        <input type="submit" name="submit" id="submit" value="Create" />
      </form>
      <p>
        Already have an account? <Link to="/sign-in">Sign In</Link>.
      </p>
      {errorState && <div className={styles.error}>{errorState}</div>}
    </div>
  );
}
