import React from 'react';
import './SignUp.scss';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Input, Spin } from 'antd';

import Notification from '../../components/Notification';

import notificationActions from '../../redux/notifications/actions';
import usersActions from '../../redux/users/actions';

const { pushNotification, popNotification } = notificationActions;
const { userRegister, clearUserStatus } = usersActions;

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { notificationsQueue } = useSelector((state) => state.Notifications);
  const { userError, userSuccess, userLoading } = useSelector(
    (state) => state.Users
  );

  const [formIsValid, setFormValidation] = React.useState(undefined);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');

  const inputs = [
    {
      key: 0,
      placeholder: 'Nome Completo',
      type: 'text',
      value: name,
      onChange: (e) => setName(e.target.value),
    },
    {
      key: 1,
      placeholder: 'E-mail',
      type: 'email',
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      key: 2,
      placeholder: 'Nome de Usuário',
      type: 'text',
      value: username,
      onChange: (e) => setUsername(e.target.value),
    },
    {
      key: 3,
      placeholder: 'Senha',
      type: 'password',
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
    {
      key: 4,
      placeholder: 'Repita a Senha',
      type: 'password',
      value: repeatPassword,
      onChange: (e) => setRepeatPassword(e.target.value),
    },
  ];

  const showNotification = (notification) => {
    Notification(notification.type, notification.title, notification.text);
    dispatch(popNotification());
  };

  const validateForm = () => {
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      username === '' ||
      repeatPassword === ''
    )
      setFormValidation(false);
    else setFormValidation(true);
  };

  const handleRegister = () => {
    dispatch(
      userRegister({
        name,
        email,
        username,
        password,
        repeatPassword,
      })
    );
  };
  const handleWarning = (message) => {
    dispatch(pushNotification('warning', message, ''));
  };

  const handleError = () => {
    dispatch(pushNotification('error', userError.message, ''));
    dispatch(clearUserStatus());
  };

  const handleSuccess = () => {
    dispatch(pushNotification('success', userSuccess.message, ''));
    dispatch(clearUserStatus());
    history.push('/signIn');
  };
  React.useEffect(() => {
    if (formIsValid !== undefined) {
      if (formIsValid === true) handleRegister();
      else if (formIsValid === false)
        handleWarning('Todos os campos são obrigatórios!');
      setFormValidation(undefined);
    }

    if (userError.status === true) handleError();
    if (userSuccess.status === true) handleSuccess();

    if (notificationsQueue.length > 0) showNotification(notificationsQueue[0]);
  }, [userError, userSuccess, notificationsQueue, formIsValid]);
  return (
    <div className="registrar-container">
      {userLoading ? (
        <Spin size="large" />
      ) : (
        <>
          <div className="big-title">
            <h1>
              <b>Cadastro</b>
            </h1>
          </div>
          <div className="registrar-container__inputs">
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
          <div className="registrar-container__button">
            <button type="submit" onClick={validateForm}>
              Cadastrar
            </button>
            <Link to="/">
              <button className="cancel" type="button">
                Cancelar
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
