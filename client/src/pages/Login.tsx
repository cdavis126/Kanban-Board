import { useState, FormEvent, ChangeEvent } from "react";
import Auth from '../utils/auth';
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState<string | null>(null); //  Error handling

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); // ✅ Reset error state

    try {
      const data = await login(loginData);

      if (!data) {
        setError("Invalid username or password"); //  Display error message
        return;
      }

      Auth.login(data.token);
      window.location.href = "/dashboard"; //  Redirect to dashboard after login
    } catch (err) {
      console.error("Failed to login", err);
      setError("Something went wrong. Please try again."); //  Show error message
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>

        {error && <p className="error-message">{error}</p>} {/*  Show error message */}

        <label>Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password}
          onChange={handleChange}
          required
        />

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Login;

