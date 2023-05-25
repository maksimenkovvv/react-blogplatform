import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Spin } from 'antd';

import { getArticle } from '../../api/apiArticle';
import Article from '../Article/Article';

import styles from './SinglePost.module.scss';

export default function SinglePost() {
  const { slug } = useParams();
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    getArticle(slug)
      .then((element) => {
        setData(element.article);
        setLoad(false);
      })
      .catch(() => setError(true));
  }, [slug]);

  const loaded = load ? <Spin size="large" className={styles.spin} /> : null;
  const showError = error ? 'Error' : null;

  return (
    <div className={styles.single_post}>
      {loaded}
      {showError}
      {data ? (
        <>
          <Article data={data} checkSlug={slug} showmore={true} />
          <ReactMarkdown skipHtml>{data.body}</ReactMarkdown>
        </>
      ) : null}
    </div>
  );
}
