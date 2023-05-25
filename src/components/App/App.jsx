import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from '../Header/Header';
import SignIn from '../forms/SignIn';
import SignUp from '../forms/SignUp';
import Profile from '../forms/Profile';
import ArticlesList from '../ArticlesList/ArticlesList';
import CreateArticle from '../CreateArticle/CreateArticle';
import SinglePost from '../forms/SinglePost';
import { checkAuth } from '../../api/apiLogin';

import styles from './App.module.scss';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <div className={styles.wrapper}>
      <Router>
        <Header />
        <Route exact path="/" component={ArticlesList} />
        <Route exact path="/articles" component={ArticlesList} />
        <Route exact path="/articles/:slug" component={SinglePost} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/profile" component={Profile} />
        <Route path="/new-article" component={CreateArticle} />
        <Route path="/articles/:slug/edit" component={CreateArticle} />
      </Router>
    </div>
  );
}
