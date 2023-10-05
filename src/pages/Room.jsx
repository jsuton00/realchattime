import React, { useState, useEffect } from 'react';
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID_MESSAGES,
} from '../utils/appWriteConfig';

const Room = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES
    );

    setMessages(response.documents);
  };
  return (
    <div className="container">
      <div className="room--container">
        <div>
          {messages.map((messages) => {
            <div key={messages.$id} className="messages--wrapper">
              <div className="message--header">
                <small>{messages.$createdAt}</small>
              </div>
              <div className="message--body">
                <span>{messages.body}</span>
              </div>
            </div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Room;