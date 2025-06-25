import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-5 text-center" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="mb-4 text-primary">Welcome!</h1>
        <p className="mb-4 fs-5">Please login or register to continue.</p>
        <div className="d-grid gap-3">
          <Link to="/login" className="btn btn-primary btn-lg">
            Login
          </Link>
          <Link to="/register" className="btn btn-success btn-lg">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;