import React from 'react';
import MyProfile from '../../../components/CustomerPage/CustomerProfile/MyProfile';
import CustumerMenu from '../../../components/CustomerPage/CustomerMenu/CustumerMenu';

function MyProfileList() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header - Only visible on small screens */}
      <header className="md:hidden bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar Menu - Hidden on mobile when not active */}
        <div className="w-full md:w-64 lg:w-72 bg-white md:min-h-screen">
          <CustumerMenu />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Profile</h1>
              <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
            </div>
            <div className="p-4 sm:p-6">
              <MyProfile />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MyProfileList;