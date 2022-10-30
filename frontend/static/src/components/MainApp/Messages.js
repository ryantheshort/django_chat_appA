import { useState, useEffect, useCallback } from "react";
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import MessageItem from "./MessageItem";
import Form from 'react-bootstrap/Form';


function Messages(props) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const handleError = (err) => {
    console.warn(err);
  };

  const getMessages = useCallback(async () => {
    const response = await fetch(`/api_v1/chats/`).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      setMessages(data);
    }
  }, []);

  useEffect(() => {
    getMessages();
  }, [getMessages]); // dependency, when this changes the methods trigger again

  if (!messages) {
    return <div>Fetching data ...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      text,
      room: props.activeRoom,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(message),
    };
    const response = await fetch("/api_v1/chats/", options).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      console.log(data);
    //   getMessages()
      setMessages([...messages, data])
      setText('')
    }
  };

  const deleteMessage = async (id) => {
    const response = await fetch(`/api_v1/chats/${id}/`, {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    });
    const index = messages.findIndex((message) => message.id === id);
    const updatedMessages = [...messages]
    updatedMessages.splice(index, 1)
    setMessages(updatedMessages);
  }


  const messageList = messages
    .filter((message) => props.filter ? message.room === props.filter : message)
    .map((message) => <MessageItem key={message.id} message={message} deleteMessage={deleteMessage} user={props.user}/>);

  return (
    <div className="send-recieve">
        <div className="padding">
            <ul className="list">{messageList}</ul>
        </div>
        <div className="messeger">
            <Form onSubmit={handleSubmit} className="row align-items-end">
                <Form.Group className="col-sm-10 col-12 text-input" controlId="message">
                    <Form.Label></Form.Label>
                    <Form.Control
                        className="input"
                        required
                        placeholder="Message"
                        type="text" 
                        value={text}
                        onChange={(e) => setText(e.target.value)} />
                </Form.Group>
                <div className="button-container col-sm-2 col-12">
                    <Button className="send-button submit" variant="primary" type="submit">
                        Send
                    </Button>
                </div>
            </Form>
        </div>
    </div>
  );
}

export default Messages;