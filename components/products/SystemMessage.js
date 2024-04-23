import React from 'react';

const SystemMessage = ({ children }) => {
  return (
    <div className="system-message text-white bg-blue-500 p-2 rounded">
      {children}
    </div>
  );
};

export default SystemMessage;
