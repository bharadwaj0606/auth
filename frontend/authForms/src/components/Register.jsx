import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(code);
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (userCaptcha !== captcha) {
      alert('Captcha does not match!');
      generateCaptcha();
      setUserCaptcha('');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/register-temp', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password
      });
      localStorage.setItem('pendingEmail', form.email);
      navigate('/verify-otp', { state: { email: form.email } });
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="mb-4 text-center text-success">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
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
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              maxLength={10}
              required
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
          <div className="mb-3">
            <label className="form-label">Captcha</label>
            <div className="d-flex align-items-center mb-2">
              <span className="badge bg-secondary fs-5" style={{ letterSpacing: '3px', userSelect: 'none' }}>{captcha}</span>
              <button type="button" className="btn btn-link ms-2 p-0" onClick={generateCaptcha} title="Refresh Captcha">
                <span role="img" aria-label="refresh">🔄</span>
              </button>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Enter captcha"
              value={userCaptcha}
              onChange={e => setUserCaptcha(e.target.value.toUpperCase())}
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-success btn-block"
            >
              Register
            </button>
            <p className="text-center">
              Already Registered?
              <Link to="/login" className="fw-bold fs-4 ms-2">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
