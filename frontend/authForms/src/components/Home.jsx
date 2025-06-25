import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const name = localStorage.getItem('name');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="container-fluid min-vh-100 bg-light p-0">
      {/* Navbar */}
      <nav className="navbar navbar-light bg-white shadow-sm px-4">
        <span className="navbar-brand mb-0 h1 text-primary">Home Page</span>
        <div className="d-flex align-items-center">
          <span className="me-3 fw-bold text-success">{name || 'Guest'}</span>
          <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
        <div className="card shadow-lg p-5 text-center" style={{ maxWidth: '500px', width: '100%' }}>
          <h2 className="mb-3">
            Welcome, <span className="text-success">{name || 'Guest'}</span>!
          </h2>
          <p className="fs-5 mb-4">
            This is your home page. You are successfully logged in and can now access all features of the website.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
