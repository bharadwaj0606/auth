import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function VerifyOtp() {
  const { state } = useLocation();
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const email = state?.email || localStorage.getItem('pendingEmail');

  const handleVerify = async () => {
    try {
      await axios.post('http://localhost:3000/api/verify-otp', {
        email,
        otp
      });
      alert('Account verified!');
      localStorage.removeItem('pendingEmail');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Verification failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Enter OTP sent to your email</h2>
      <input
        type="text"
        className="form-control"
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={e => setOtp(e.target.value)}
      />
      <button className="btn btn-primary mt-3" onClick={handleVerify}>Verify</button>
    </div>
  );
}

export default VerifyOtp;
