import React from 'react';

const BotMessage = ({ content }) => {
  return (
    <div className="bot-message bg-gray-200 p-2 rounded">
      {content}
    </div>
  );
};

export default BotMessage;
