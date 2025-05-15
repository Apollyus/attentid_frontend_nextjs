'use client';

import React from 'react';
import useDemoApi, { User } from '@/hooks/useDemoApi';
import LoadingSpinner from './LoadingSpinner';
import { ChatBubbleLeftIcon, PaperClipIcon } from '@heroicons/react/24/outline';

const ITEMS_PER_PAGE = 5;

interface UserListComponentProps {
  className?: string;
  showAsActivity?: boolean;
}

const UserListComponent: React.FC<UserListComponentProps> = ({ className = '', showAsActivity = false }) => {
  const { data: users, loading, error } = useDemoApi(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-10 text-red-500">Error loading users: {error.message}</div>;
  if (!users || users.length === 0) return <div className="text-center py-10">No users found.</div>;

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedUsers = users.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (showAsActivity) {
    return (
      <div className={`bg-white shadow-sm rounded-xl overflow-hidden ${className}`}>
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-800">Activity</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {selectedUsers.map((user, index) => (
            <div key={user.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">10:15 AM</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {index % 2 === 0 ? (
                      <>Commented on <span className="text-blue-600">Project {user.id}</span></>
                    ) : (
                      <>Added a file to <span className="text-blue-600">Project {user.id}</span></>
                    )}
                  </p>
                </div>
              </div>
              {index % 3 === 0 && (
                <div className="mt-3 ml-12 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                  Hi! Next week we'll start a new project. I'll tell you all the details later.
                </div>
              )}
            </div>
          ))}
        </div>
        
        {totalPages > 1 && (
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-100">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(startIndex + ITEMS_PER_PAGE, users.length)}</span> of{" "}
              <span className="font-medium">{users.length}</span> users
            </div>
            <div>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mr-2 px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-white shadow-sm rounded-xl overflow-hidden ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Jméno
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Datum přidání
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Naposledy aktivní
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {selectedUsers.map((user: User) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.addedDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastActive}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {totalPages > 1 && (
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(startIndex + ITEMS_PER_PAGE, users.length)}</span> of{" "}
            <span className="font-medium">{users.length}</span> users
          </div>
          <div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="mr-2 px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListComponent;