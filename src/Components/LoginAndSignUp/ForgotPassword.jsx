// ForgotPassword.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoDiv from "../../Components/LoginAndSignUp/VideoDiv";

export default function ForgotPassword() {

  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const sendOtp = async () => {
    await fetch('https://fullstackproject-backend-z5rx.onrender.com/users/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    setStep(2);
  };

  const verifyOtp = async () => {
    const res = await fetch('https://fullstackproject-backend-z5rx.onrender.com/users/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    setToken(data.token);
    setStep(3);
  };

  const resetPassword = async () => {
    await fetch('https://fullstackproject-backend-z5rx.onrender.com/users/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword }),
    });
    alert('Password reset successfully');
    navigate('/login')

  };

  return (

    <>
      <VideoDiv />
      <div className='forgotPassword w-50 m-auto h-50 bg-white p-4 rounded' style={{ position: "relative", top: "300px", textAlign: "center"}}>
      {step === 1 && (
        <>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}
      {step === 2 && (
        <>
          <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
      {step === 3 && (
        <>
          <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" type="password" />
          <button onClick={resetPassword}>Reset Password</button>
        </>
      )}
    </div>
    </>
    
  );
}
