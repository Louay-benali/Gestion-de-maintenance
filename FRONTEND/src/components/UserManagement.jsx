import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdEdit, MdDeleteForever, MdSecurity } from "react-icons/md";

const UserManagement = () => {
  // State for users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Manager",
      status: "Active",
    },
    {
      id: 3,
      name: "Robert Brown",
      email: "robert@example.com",
      role: "User",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "Operator",
      status: "Active",
    },
  ]);

  // Form states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  // Current user being edited/deleted/assigned roles
  const [currentUser, setCurrentUser] = useState(null);

  // New user form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
    status: "Active",
  });

  // Available roles
  const roles = ["Admin", "Manager", "Operator", "User"];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle current user input changes
  const handleCurrentUserChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value,
    });
  };

  // Add a new user
  const handleAddUser = () => {
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1,
      ...formData,
    };
    setUsers([...users, newUser]);
    // Reset form
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "User",
      status: "Active",
    });
    setIsAddModalOpen(false);
  };

  // Update existing user
  const handleUpdateUser = () => {
    setUsers(
      users.map((user) => (user.id === currentUser.id ? currentUser : user))
    );
    setIsEditModalOpen(false);
  };

  // Delete user
  const handleDeleteUser = () => {
    setUsers(users.filter((user) => user.id !== currentUser.id));
    setIsDeleteModalOpen(false);
  };

  // Update user roles/permissions
  const handleUpdateRole = () => {
    setUsers(
      users.map((user) => (user.id === currentUser.id ? currentUser : user))
    );
    setIsRoleModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 flex justify-between items-center border-b border-gray-300">
        <h2 className="text-xl font-semibold">User Management</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          onClick={() => setIsAddModalOpen(true)}
        >
          <IoMdAdd className="mr-1" /> Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={`https://ui-avatars.com/api/?name=${user.name.replace(
                          " ",
                          "+"
                        )}&background=random`}
                        alt={user.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      className="text-gray-600 hover:text-blue-900"
                      onClick={() => {
                        setCurrentUser(user);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <MdEdit size={20} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => {
                        setCurrentUser(user);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      <MdDeleteForever size={20} />
                    </button>
                    <button
                      className="text-green-600 hover:text-green-900"
                      onClick={() => {
                        setCurrentUser(user);
                        setIsRoleModalOpen(true);
                      }}
                    >
                      <MdSecurity size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleAddUser}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && currentUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={currentUser.name}
                  onChange={handleCurrentUserChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={currentUser.email}
                  onChange={handleCurrentUserChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    value={currentUser.role}
                    onChange={handleCurrentUserChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={currentUser.status}
                    onChange={handleCurrentUserChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleUpdateUser}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {isDeleteModalOpen && currentUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Delete User</h3>
            <p className="text-gray-700">
              Are you sure you want to delete the user{" "}
              <strong>{currentUser.name}</strong>? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={handleDeleteUser}
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role & Permissions Modal */}
      {isRoleModalOpen && currentUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Manage Roles & Permissions
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User
                </label>
                <div className="flex items-center p-2 border border-gray-300 rounded-md bg-gray-50">
                  <img
                    className="h-8 w-8 rounded-full mr-2"
                    src={`https://ui-avatars.com/api/?name=${currentUser.name.replace(
                      " ",
                      "+"
                    )}&background=random`}
                    alt={currentUser.name}
                  />
                  <div>
                    <div className="text-sm font-medium">
                      {currentUser.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {currentUser.email}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={currentUser.role}
                  onChange={handleCurrentUserChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permissions
                </label>
                <div className="space-y-2">
                  {/* Admin Permissions */}
                  {currentUser.role === "Admin" && (
                    <>
                      <div className="flex items-center">
                        <input
                          id="perm1"
                          type="checkbox"
                          checked
                          readOnly
                          className="h-4 w-4 text-blue-600"
                        />
                        <label
                          htmlFor="perm1"
                          className="ml-2 text-sm text-gray-700"
                        >
                          Full System Access
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="perm2"
                          type="checkbox"
                          checked
                          readOnly
                          className="h-4 w-4 text-blue-600"
                        />
                        <label
                          htmlFor="perm2"
                          className="ml-2 text-sm text-gray-700"
                        >
                          User Management
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="perm3"
                          type="checkbox"
                          checked
                          readOnly
                          className="h-4 w-4 text-blue-600"
                        />
                        <label
                          htmlFor="perm3"
                          className="ml-2 text-sm text-gray-700"
                        >
                          Machine Management
                        </label>
                      </div>
                    </>
                  )}

                  {/* Manager Permissions */}
                  {currentUser.role === "Manager" && (
                    <>
                      <div className="flex items-center">
                        <input
                          id="perm1"
                          type="checkbox"
                          checked
                          readOnly
                          className="h-4 w-4 text-blue-600"
                        />
                        <label
                          htmlFor="perm1"
                          className="ml-2 text-sm text-gray-700"
                        >
                          View Dashboard
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="perm2"
                          type="checkbox"
                          checked
                          readOnly
                          className="h-4 w-4 text-blue-600"
                        />
                        <label
                          htmlFor="perm2"
                          className="ml-2 text-sm text-gray-700"
                        >
                          Manage Machine Status
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="perm3"
                          type="checkbox"
                          checked
                          readOnly
                          className="h-4 w-4 text-blue-600"
                        />
                        <label
                          htmlFor="perm3"
                          className="ml-2 text-sm text-gray-700"
                        >
                          View User Reports
                        </label>
                      </div>
                    </>
                  )}

                  {/* Operator Permissions */}
                  {currentUser.role === "Operator" && (
                    <>
                      <div className="flex items-center">
                        <input
                          id="perm1"
                          type="checkbox"
                          checked
                          readOnly
                          className="h-4 w-4 text-blue-600"
                        />
                        <label
                          htmlFor="perm1"
                          className="ml-2 text-sm text-gray-700"
                        >
                          View Dashboard
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="perm2"
                          type="checkbox"
                          checked
                          readOnly
                          className="h-4 w-4 text-blue-600"
                        />
                        <label
                          htmlFor="perm2"
                          className="ml-2 text-sm text-gray-700"
                        >
                          Monitor Machines
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="perm3"
                          type="checkbox"
                          checked
                          readOnly
                          className="h-4 w-4 text-blue-600"
                        />
                        <label
                          htmlFor="perm3"
                          className="ml-2 text-sm text-gray-700"
                        >
                          Report Issues
                        </label>
                      </div>
                    </>
                  )}

                  {/* User Permissions */}
                  {currentUser.role === "User" && (
                    <>
                      <div className="flex items-center">
                        <input
                          id="perm1"
                          type="checkbox"
                          checked
                          readOnly
                          className="h-4 w-4 text-blue-600"
                        />
                        <label
                          htmlFor="perm1"
                          className="ml-2 text-sm text-gray-700"
                        >
                          View Dashboard
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="perm2"
                          type="checkbox"
                          checked
                          readOnly
                          className="h-4 w-4 text-blue-600"
                        />
                        <label
                          htmlFor="perm2"
                          className="ml-2 text-sm text-gray-700"
                        >
                          View Own Profile
                        </label>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                onClick={() => setIsRoleModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleUpdateRole}
              >
                Update Permissions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
