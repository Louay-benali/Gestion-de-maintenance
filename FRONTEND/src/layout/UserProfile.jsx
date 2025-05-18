import React, { useState, useEffect } from "react";
import Profile from "../components/Profile";
import PersonalInfo from "../components/PersonalInfo";
import Address from "../components/Address";
import EditInfo from "../components/EditInfo";
import { useAuth } from "../contexts/AuthContext.jsx";

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+216 98798711", // Default phone as it might not be in the auth context
    bio: "",
  });

  const [addressInfo, setAddressInfo] = useState({
    PostalCode: "12345",
    Country: "Tunisia",
    City: "Monastir/Werdanine",
    Id: "#99079",
  });

  // Update userInfo when user data changes in context
  useEffect(() => {
    if (user) {
      setUserInfo({
        firstName: user.prenom || "",
        lastName: user.nom || "",
        email: user.email || "",
        phone: userInfo.phone, // Keep existing phone
        bio: user.role || "", // Use role as bio for now
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in userInfo) {
      setUserInfo((prev) => ({ ...prev, [name]: value }));
    } else {
      setAddressInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSave = () => {
    console.log("✅ Saved user info:", userInfo);
    console.log("✅ Saved address info:", addressInfo);
    setIsModalOpen(false);
  };

  return (
    <div className="py-2 mb-6 border border-gray-300 rounded-2xl bg-white lg:p-6 font-style">
      <h1 className="py-6 text-xl font-medium">Profile</h1>
      <Profile Name={userInfo.firstName} City={addressInfo.City} Bio={userInfo.bio} />
      <PersonalInfo {...userInfo} onEdit={handleEdit} />
      <Address {...addressInfo} onEdit={handleEdit} />
      {isModalOpen && (
        <EditInfo
          userInfo={userInfo}
          addressInfo={addressInfo}
          onChange={handleChange}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default UserProfile;
