import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col" style={{ fontFamily: "'Poppins', sans-serif" }}>
      
      {/* Top Bar */}
      <div className="bg-[#0057A4] flex items-center justify-between p-4">
        <button onClick={handleBack} className="text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold text-white">Profile Settings</h1>
        <button
          onClick={handleEditClick}
          className="text-sm text-white underline"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 space-y-6">
        
        {/* Section Title */}
        <h2 className="text-lg font-bold text-gray-800">Account Information</h2>

        {/* Form */}
        <div className="bg-white rounded-md shadow-sm p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
