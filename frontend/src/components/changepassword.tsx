import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdatePassword: React.FC = () => {
    const [formData, setFormData] = useState({
      username: '',
      currentPassword: '',
      newPassword: ''
    });
  
    const { username, currentPassword, newPassword } = formData;
    const nav = useNavigate()
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      try {
        const res = await axios.post('http://localhost:8000/user/UpdateUser', {
          Username: username,
          newPassword
        });
  
        console.log(res.data); // Log response data
        nav('/profile')
      } catch (err) {
        console.error((err as any).response?.data);
      }
    };
  
    return (
      <div>
        <h2>Change Password</h2>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Current Password"
              name="currentPassword"
              value={currentPassword}
              onChange={onChange}
              minLength={1} 
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={newPassword}
              onChange={onChange}
              minLength={1} 
              required
            />
          </div>
          <button type="submit">Change Password</button>
        </form>
      </div>
    );
  };
  
  export default UpdatePassword;