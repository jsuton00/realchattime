import React, { useState, useEffect } from 'react';
import client, {
  databases,
  DATABASE_ID,
  COLLECTION_ID_MESSAGES,
} from '../utils/appWriteConfig';
import { ID, Query } from 'appwrite';

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState('');

  useEffect(() => {
    getMessages();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
      (response) => {
        if (
          response.events.includes(
            'databases.*.collections.*.documents.*.create'
          )
        ) {
          console.log('A MESSAGE WAS CREATED');
          setMessages((prevState) => [response.payload, ...prevState]);
        }

        if (
          response.events.includes(
            'databases.*.collections.*.documents.*.delete'
          )
        ) {
          console.log('A MESSAGE WAS DELETED!!!');
          setMessages((prevState) =>
            prevState.filter((message) => message.$id !== response.payload.$id)
          );
        }
      }
    );

    console.log('unsubscribe:', unsubscribe);

    return () => {
      unsubscribe();
    };
  }, []);

  const handleChange = (e) => {
    e.persist();
    return setMessageBody(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      body: messageBody,
    };

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload,
      [Query.orderDesc('$createdAt')]
    );

    console.log('Created!', response);

    setMessages((prevState) => [response, ...messages]);

    setMessageBody('');
  };

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [Query.orderDesc('$createdAt'), Query.limit(20)]
    );

    setMessages(response.documents);
  };

  const deleteMessage = async (message_id) => {
    await databases.deleteDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      message_id
    );

    setMessages((prevState) =>
      messages.filter((message) => message.$id === message_id)
    );
  };
  return (
    <div className="container">
      <div className="room--container">
        <form
          id="message--form"
          name="message-form"
          onSubmit={handleSubmit}
          className="message-form"
        >
          <div>
            <textarea
              placeholder="Enter message..."
              onChange={handleChange}
              maxLength="1000"
              value={messageBody}
              required
            ></textarea>
          </div>

          <div className="send-btn--wrapper">
            <button
              name="btnSubmit"
              type="submit"
              className="btn btn-secondary"
            >
              Send
            </button>
          </div>
        </form>
        <div>
          {messages &&
            messages.map((message) => {
              <div key={message.$id} className="messages--wrapper">
                <div className="message--header">
                  <small className="message-timestamp">
                    {message.$createdAt}
                  </small>
                  <button onClick={() => deleteMessage(message.$id)}>X</button>
                </div>
                <div className="message--body">
                  <span>{message.body}</span>
                </div>
              </div>;
            })}
        </div>
      </div>
    </div>
  );
};

export default Room;
