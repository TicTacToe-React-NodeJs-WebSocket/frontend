import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import './SignIn.scss';

import { Input, Spin } from 'antd';

import Notification from '../../components/Notification';

import authActions from '../../redux/auth/actions';
import notificationActions from '../../redux/notifications/actions';

const { pushNotification, popNotification } = notificationActions;

const { authSignIn, clearAuthStatus } = authActions;

export default function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formIsValid, setFormValidation] = React.useState(undefined);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { notificationsQueue } = useSelector((state) => state.Notifications);

  const { authError, authSuccess, authLoading, userInfo } = useSelector(
    (state) => state.Auth
  );

  const inputs = [
    {
      key: 0,
      placeholder: 'Nome de Usuário',
      type: 'text',
      value: username,
      onChange: (e) => setUsername(e.target.value),
    },
    {
      key: 1,
      placeholder: 'Senha',
      type: 'password',
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
  ];

  const validateForm = () => {
    if (password === '' || username === '') setFormValidation(false);
    else setFormValidation(true);
  };

  const showNotification = (notification) => {
    Notification(notification.type, notification.title, notification.text);
    dispatch(popNotification());
  };

  const handleWarning = (message) => {
    dispatch(pushNotification('warning', message, ''));
  };

  const handleError = () => {
    dispatch(pushNotification('error', authError.message, ''));
    dispatch(clearAuthStatus());
  };

  const handleSuccess = () => {
    dispatch(pushNotification('success', authSuccess.message, ''));
    dispatch(clearAuthStatus());

    if (userInfo) {
      history.push('/playersList');
    }
  };

  const handleLogin = () => {
    dispatch(
      authSignIn({
        username,
        password,
      })
    );
  };

  React.useEffect(() => {
    if (formIsValid !== undefined) {
      if (formIsValid === true) handleLogin();
      else if (formIsValid === false)
        handleWarning('Todos os campos são obrigatórios!');
      setFormValidation(undefined);
    }

    if (authError.status === true) handleError();
    if (authSuccess.status === true) handleSuccess();

    if (notificationsQueue.length > 0) showNotification(notificationsQueue[0]);
  }, [authError, authSuccess, notificationsQueue, formIsValid]);

  return (
    <div className="login-container">
      {authLoading ? (
        <Spin size="large" />
      ) : (
        <>
          <div className="big-title">
            <h1>
              <b>Login</b>
            </h1>
          </div>
          <div className="login-container__inputs">
            {inputs.map((input) => (
              <Input
                key={input.key}
                placeholder={input.placeholder}
                type={input.type}
                value={input.value}
                onChange={input.onChange}
                className="input"
                bordered={false}
              />
            ))}
          </div>
          <div className="login-container__button">
            <button type="submit" onClick={validateForm}>
              Login
            </button>
            <Link to="/">
              <button type="button" className="btn-back">
                Voltar
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
