import React from 'react';

const UserMessage = ({ children }) => {
  return (
    <div className="user-message bg-blue-100 p-2 rounded">
      {children}
    </div>
  );
};

export default UserMessage;
