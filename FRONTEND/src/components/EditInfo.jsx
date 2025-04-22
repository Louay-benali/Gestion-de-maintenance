import React from "react";
import { IoCloseOutline } from "react-icons/io5";


const EditInfo = ({
  firstName,
  lastName,
  email,
  phone,
  bio,
  onChange,
  onClose,
  onSave,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl p-8 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">
              Edit Personal Information
            </h2>
            <p className="text-sm text-gray-500">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <div className="border border-gray-300 p-2 flex items-center rounded-4xl hover:bg-gray-50">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl "
            >
              <IoCloseOutline />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="space-y-6">
          <h4 className="text-lg font-medium text-gray-700">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 block mb-2">
              Bio
            </label>
            <input
              type="text"
              name="bio"
              value={bio}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditInfo;
