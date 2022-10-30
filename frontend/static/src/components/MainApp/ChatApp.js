import { useState, useEffect, useCallback } from "react";
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import Messages from "./Messages";
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';


function ChatApp(props) {
  const [rooms, setRooms] = useState(null);
  const [activeRoom, setActiveRoom] = useState(1);
  const [filter, setFilter] = useState(1)
  const [name, setName] = useState('')
  const [dropdownName, setDropdownName] = useState('Destiny 2')

  const handleError = (err) => {
    console.warn(err);
  };

  const getRooms = useCallback(async () => {
    const response = await fetch("/api_v1/rooms/").catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      setRooms(data);
    }
  }, []);

  useEffect(() => {
    getRooms();
  }, [getRooms]); // dependency, when this changes the methods trigger again

  if (!rooms) {
    return <div>Fetching data ...</div>;
  }

    const updateFilter = (id) => {
        setFilter(id);
        setActiveRoom(id)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const room = {
          name,
        };
    
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
          body: JSON.stringify(room),
        };
        const response = await fetch("/api_v1/rooms/", options).catch(handleError);
        if (!response.ok) {
          throw new Error("Network response was not OK");
        } else {
          const data = await response.json();
          console.log(data);
          getRooms()
          setName('')
        }
      };

  const roomButtons = rooms.map(room => (
    <li key={room.id} className='room-li'>
        <Button 
            className='room-button'
            variant="outline-secondary"
            onClick={() => updateFilter(room.id)}
            >
                {room.name}
        </Button>
    </li>
  ))

    const updateDropdown = (id, name) => {
        updateFilter(id)
        setDropdownName(name)
    }

  const roomSelect = rooms.map(room => (
    <Dropdown.Item key={room.id} className="menu-item" onClick={() => updateDropdown(room.id, room.name)}>{room.name}</Dropdown.Item>
  ))

  return (
    <>
        <ul className="list rooms">
            {roomButtons}
            <Dropdown className="room-dropdown">
                <Dropdown.Toggle className="dropdown-cover">
                    {dropdownName}
                </Dropdown.Toggle>
                <Dropdown.Menu className="menu">
                    {roomSelect}
                </Dropdown.Menu>
            </Dropdown>
            <li className='new-room-li'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="new-room" controlId="enterRoom">
                        <Form.Label></Form.Label>
                        <Form.Control
                            className="add-room-input input" 
                            type="text" 
                            placeholder="Room name..."
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        <Button variant="primary" className="new-room-button submit" type="submit">Add New Room</Button>
                    </Form.Group>
                </Form>
            </li>
        </ul>
        <Messages filter={filter} activeRoom={activeRoom} user={props.user}/>
    </>
  );
}

export default ChatApp;