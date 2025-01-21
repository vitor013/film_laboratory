import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberLogin, setRememberLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegistering) {
      if (password !== confirmPassword) {
        setErrorMessage('As senhas não coincidem!');
        return;
      }
      console.log('Registrando novo usuário:');
      console.log('Nome:', name);
      console.log('Email:', email);
      console.log('Senha:', password);
      setErrorMessage('Registro realizado com sucesso!');
    } else {
      if (email === 'admin' && password === 'admin') {
        console.log('Login realizado com sucesso!');
        setErrorMessage('');
        navigate('/home');
      } else {
        setErrorMessage('Credenciais inválidas! Tente novamente.');
      }
    }
  };

  const toggleRegistering = () => {
    setIsRegistering(!isRegistering);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRememberLogin(false);
    setErrorMessage('');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">{isRegistering ? 'Registrar' : 'Login'}</h2>

        {isRegistering && (
          <input
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="login-input"
            required
          />
        )}
        <input
          type="text"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          required
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
        />
        {isRegistering && (
          <input
            type="password"
            placeholder="Repita sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="login-input"
            required
          />
        )}

        {!isRegistering && (
          <label className="remember-label">
            <input
              type="checkbox"
              checked={rememberLogin}
              onChange={(e) => setRememberLogin(e.target.checked)}
              className="remember-checkbox"
            />
            Guardar login
          </label>
        )}

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" className="login-button">
          {isRegistering ? 'Registrar Novo Usuário' : 'Entrar'}
        </button>
        <button
          type="button"
          onClick={toggleRegistering}
          className="register-button"
        >
          {isRegistering ? 'Voltar ao Login' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;
