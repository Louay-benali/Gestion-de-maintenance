import React from "react";

const Profile = ({Name , bio, City }) => {
  return (
    <div className="p-5 mb-6 border bg-white rounded-2xl dark:border-gray-300 lg:p-6 font-style">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
          <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full ">
            <img  alt="user" />
          </div>
          <div className="order-3 xl:order-2">
            <h4 className="mb-2 text-lg font-semibold text-center text-gray-800  xl:text-left">
              {Name}
            </h4>
            <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
              <p className="text-sm text-gray-500 ">
                {bio}
              </p>
              <div className="hidden h-3.5 w-px bg-gray-300  xl:block"></div>
              <p className="text-sm text-gray-500 ">
                {City}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
