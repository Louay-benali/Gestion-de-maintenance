import React, { useState } from "react";
import Profile from "../components/Profile";
import PersonalInfo from "../components/PersonalInfo";
import EditInfo from "../components/EditInfo";
import Adress from "../components/Address";

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "Samira",
    lastName: "Wasouf",
    email: "Samira@emka-med.com",
    phone: "+216 98798711",
    bio: "Employer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSave = () => {
    console.log("✅ Saved user info:", userInfo);
    setIsModalOpen(false);
  };

  return (
    <div className="py-2 mb-6 border border-gray-300 rounded-2xl bg-white lg:p-6 font-style">
      <h1 className="py-6 text-xl font-medium">Profile</h1>
      <Profile />

      <PersonalInfo
        firstName={userInfo.firstName}
        lastName={userInfo.lastName}
        email={userInfo.email}
        phone={userInfo.phone}
        bio={userInfo.bio}
        onEdit={handleEdit}
      />

      <Adress
        PostalCode="12345"
        Country="Tunisia"
        City="Monastir/Werdanine"
        Id="#99079"
      />
      {isModalOpen && (
        <EditInfo
          isOpen={isModalOpen}
          firstName={userInfo.firstName}
          lastName={userInfo.lastName}
          email={userInfo.email}
          phone={userInfo.phone}
          bio={userInfo.bio}
          onChange={handleChange}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default UserProfile;
