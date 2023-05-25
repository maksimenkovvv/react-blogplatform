import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';

import { updateProfile } from '../../api/apiLogin';
import styles from '../App/App.module.scss';

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.reduserLogin);
  const { errorState } = useSelector((state) => state.reduserLogin);
  const [fields, setFields] = useState({
    username: user.username,
    email: user.email,
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur' });
  const history = useHistory();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(e);
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const onSubmit = (data) => {
    const filteredKeys = Object.keys(data).filter((key) => data[key] !== '');
    const newData = filteredKeys.reduce((acc, key) => ({ ...acc, [key]: data[key] }), {});
    dispatch(updateProfile(newData));

    if (errorState === '') {
      message.success('Profile updated succsessfully');
      history.push('/');
    }
  };

  return (
    <div className={styles.block__form}>
      <h2>Edit Profile</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className={styles.input}
          autoFocus
          id="username"
          placeholder="Username"
          defaultValue={fields.username}
          onChange={handleChange}
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
          defaultValue={fields.email}
          onChange={handleChange}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /^([A-Za-z0-9_.-])+@([A-Za-z0-9_.-])+.([A-Za-z])$/,
              message: 'Incorrect mail',
            },
          })}
        />
        {errors?.email && <div className={styles.error}>{errors?.email?.message || 'Error'}</div>}
        <label htmlFor="password">New password</label>
        <input
          id="password"
          type="password"
          className={styles.input}
          placeholder="Password"
          {...register('password', {
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
        <label htmlFor="image">Avatar image (url)</label>
        <input
          id="image"
          type="text"
          className={styles.input}
          placeholder="Avatar image"
          {...register('image', {
            pattern: {
              value:
                /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/,
              message: 'Incorrect url',
            },
          })}
        />
        {errors?.image && <div className={styles.error}>{errors?.image?.message || 'Error'}</div>}
        <input type="submit" name="submit" id="submit" value="Save" />
      </form>
      {errorState && <div className={styles.error}>{errorState}</div>}
    </div>
  );
}
