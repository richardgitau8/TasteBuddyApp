import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userIcon from '../assets/user.png';
import settingsIcon from '../assets/settings.png';

const Profile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    username: 'Richard Gitau',
    bio: 'A Front-end web developer and a passionate home cook.',
    profileImage: userIcon,
    gender: 'Male',
    phoneNumber: '+254748855214',
  });
  const [profilePic, setProfilePic] = useState(userIcon);

  const toggleSettings = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({
      ...profileInfo,
      [name]: value,
    });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      {/* Profile Image */}
      <div className="flex justify-center relative">
        <div className="flex flex-col items-center">
          <label className="cursor-pointer">
            <img
              src={profilePic}
              alt="Profile"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-[#F23A29]"
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePicChange}
            />
          </label>
          <h2 className="text-2xl font-semibold mb-2 text-center">{profileInfo.username}</h2>
          <p className="text-gray-600 mb-4 text-center">{profileInfo.bio}</p>
        </div>

        {/* Settings Icon */}
        <img
          src={settingsIcon}
          alt="Settings"
          className="w-8 h-8 absolute top-0 right-0 cursor-pointer hover:opacity-80"
          onClick={toggleSettings}
        />
      </div>

      {/* Settings Dropdown */}
      {isDropdownOpen && (
        <div className="absolute right-0 top-16 bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-80 lg:w-96 z-10 mr-20">
          <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>

          {/* Username */}
          <label className="block text-sm font-medium text-gray-700">
            Username
            <input
              type="text"
              name="username"
              value={profileInfo.username}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#F23A29] focus:ring-[#F23A29]"
            />
          </label>

          {/* Bio */}
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Bio
            <textarea
              name="bio"
              value={profileInfo.bio}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#F23A29] focus:ring-[#F23A29]"
            />
          </label>

          {/* Gender */}
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Gender
            <select
              name="gender"
              value={profileInfo.gender}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#F23A29] focus:ring-[#F23A29]"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>

          {/* Phone Number */}
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Phone Number
            <input
              type="tel"
              name="phoneNumber"
              value={profileInfo.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#F23A29] focus:ring-[#F23A29]"
            />
          </label>

          {/* Save and Cancel Buttons */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={toggleSettings}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              className="bg-[#F23A29] text-white px-4 py-2 rounded hover:bg-[#D8271F]"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
