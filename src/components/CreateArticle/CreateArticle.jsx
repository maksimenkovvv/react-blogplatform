import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';
import { message } from 'antd';

import { getArticle, editArticle, newArticle } from '../../api/apiArticle';

import styles from './CreateArticle.module.scss';

let maxId = 1;
export default function CreateArticle() {
  const { logged } = useSelector((state) => state.reduserLogin);
  const {
    register,
    handleSubmit,
    formState: { errors },
    unregister,
    setValue,
    reset,
  } = useForm({
    mode: 'onBlur',
  });
  const history = useHistory();
  const { slug } = useParams();
  const [tag, setTag] = useState([]);
  const [inputState, setInputState] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    clearState();
    if (slug) {
      getArticle(slug)
        .then((element) => {
          setValue('title', element.article.title);
          setValue('description', element.article.description);
          setValue('body', element.article.body);
          setTag(
            element.article.tagList.map((item) => {
              return { value: item, id: String(maxId++) };
            })
          );
          setError(false);
        })
        .catch(() => setError(true));
    }
  }, [slug]);

  const clearState = () => {
    reset();
    setTag([]);
  };

  const onSubmit = (data) => {
    const { body, description, title, ...tags } = data;
    const allTags = Object.entries(tags).map((el) => el[1]);
    const tagList = allTags.filter((element) => element.trim() !== '');
    const newData = { body, description, title, tagList };
    if (!error) {
      if (!slug) {
        newArticle(newData)
          .then((data) => {
            history.push(`/articles/${data.article?.slug}`);
            setError(false);
            message.success('Article created succsessfully');
          })
          .catch(() => setError(true));
      } else {
        editArticle(slug, newData)
          .then((data) => {
            history.push(`/articles/${data.article?.slug}`);
            setError(false);
            message.success('Article edited succsessfully');
          })
          .catch(() => setError(true));
      }
    }
  };

  if (!logged) {
    history.push('/sign-in');
    message.error('Only logged in users can create or change articles');
  }

  const addTag = () => {
    unregister('tags0');
    if (inputState.trim()) {
      setTag([...tag, { value: inputState.trim(), id: String(maxId++) }]);
      setInputState('');
    }
  };

  const delTag = (id) => {
    setTag((tag) => tag.filter((element) => element.id !== id));
    unregister(`tags${id}`);
  };

  return (
    <div className={styles.article}>
      <h2>{slug ? 'Edit article' : 'Create new article'}</h2>
      <form className={styles.create_article} onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="title">{'Title'}</label>
        <input
          id="title"
          type="text"
          className={styles.input}
          autoFocus
          placeholder="Title"
          {...register('title', {
            required: 'This field is required',
          })}
        />
        {errors?.title && <div className={styles.error}>{errors?.title.message || 'Error'}</div>}
        <label htmlFor="description">{'Short description'}</label>
        <input
          id="description"
          type="text"
          className={styles.input}
          placeholder="Short description"
          {...register('description', {
            required: 'This field is required',
          })}
        />
        {errors?.description && <div className={styles.error}>{errors?.description.message || 'Error'}</div>}
        <label htmlFor="body">{'Text'}</label>
        <textarea
          id="body"
          type="text"
          className={styles.input}
          placeholder="Text"
          {...register('body', {
            required: 'This field is required',
          })}
        />
        {errors?.text && <div className={styles.error}>{errors?.text.message || 'Error'}</div>}
        <label htmlFor="tags">{'Tags'}</label>
        <div className={styles.tagList}>
          {tag.map((item) => {
            return (
              <div key={item.id}>
                <input
                  id="tags"
                  type="text"
                  className={styles.input}
                  placeholder="Tag"
                  {...register(`tags${item.id}`, {
                    value: item.value,
                    required: 'This field is required',
                  })}
                />
                <button className={styles.btn_delete} onClick={() => delTag(item.id)}>
                  Delete
                </button>
              </div>
            );
          })}
          <div>
            <input
              id="tags"
              type="text"
              className={styles.input}
              placeholder="Tag"
              value={inputState}
              {...register('tags0', {
                onChange: (e) => {
                  setInputState(e.target.value);
                },
              })}
            />
            <button
              className={styles.btn_delete}
              onClick={() => {
                setInputState('');
                unregister('tags0');
              }}
            >
              Delete
            </button>
            <button className={styles.btn_add} onClick={() => addTag()}>
              Add
            </button>
          </div>
        </div>
        <input type="submit" name="submit" id="submit" value="Send" />
      </form>
    </div>
  );
}
