import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { setlogOut } from '../../api/apiLogin';

import styles from './Header.module.scss';

export default function Header() {
  const dispatch = useDispatch();
  const { logged, user } = useSelector((state) => state.reduserLogin);
  const imageUrl = user.image ? user.image : 'https://static.productionready.io/images/smiley-cyrus.jpg';
  const name = user ? user.username : 'none';
  const history = useHistory();

  const handleLogOut = () => {
    dispatch(setlogOut());
    history.push('/sign-in');
  };

  const handleEditProfile = () => {
    history.push('/profile');
  };

  return (
    <div className={styles.header}>
      <Link to="/">BlogPlatform</Link>
      <div className={styles.header__btn}>
        {logged ? (
          <>
            <Link to="/new-article" className={styles.create_article}>
              Create article
            </Link>
            <span className={styles.name} onClick={handleEditProfile}>
              {name}
            </span>
            <img src={imageUrl} className={styles.image} onClick={handleEditProfile} />
            <button className={styles.log_out} onClick={handleLogOut}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/sign-in" className={styles.sign_in}>
              Sign in
            </Link>
            <Link to="/sign-up" className={styles.sign_up}>
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
