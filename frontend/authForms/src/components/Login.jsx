import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name', res.data.name);
      alert('Login successful');
      navigate('/home');
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4 text-center text-primary">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary btn-block">Login</button>
            <p className='text-center'>Didn't Register?<Link to='/register' className='fw-bold fs-4'>Register</Link> </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
