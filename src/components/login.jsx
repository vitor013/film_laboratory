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
  const [darkMode, setDarkMode] = useState(true);
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`login-container ${darkMode ? 'dark' : 'light'}`}>
      <button
        className={`dark-mode-toggle ${darkMode ? 'dark' : 'light'}`}
        onClick={toggleDarkMode}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <form onSubmit={handleSubmit} className={`login-form ${darkMode ? 'dark' : 'light'}`}>
        <h2 className={`login-title ${darkMode ? 'dark' : 'light'}`}>
          {isRegistering ? 'Registrar' : 'Login'}
        </h2>

        {isRegistering && (
          <input
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`login-input ${darkMode ? 'dark' : 'light'}`}
            required
          />
        )}
        <input
          type="text"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`login-input ${darkMode ? 'dark' : 'light'}`}
          required
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`login-input ${darkMode ? 'dark' : 'light'}`}
          required
        />
        {isRegistering && (
          <input
            type="password"
            placeholder="Repita sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`login-input ${darkMode ? 'dark' : 'light'}`}
            required
          />
        )}

        {!isRegistering && (
          <div className="remember-container">
            <label className={`remember-label ${darkMode ? 'dark' : 'light'}`}>
              <input
                type="checkbox"
                checked={rememberLogin}
                onChange={(e) => setRememberLogin(e.target.checked)}
                className="remember-checkbox"
              />
              Guardar login
            </label>
          </div>
        )}

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" className={`login-button ${darkMode ? 'dark' : 'light'}`}>
          {isRegistering ? 'Cadastre-se' : 'Entrar'}
        </button>
        <p
          onClick={toggleRegistering}
          className={`register-button ${darkMode ? 'dark' : 'light'}`}
        >
          {isRegistering ? 'Voltar ao Login' : 'Não possui uma conta? Registre-se'}
        </p>
      </form>
    </div>
  );
};

export default Login;
