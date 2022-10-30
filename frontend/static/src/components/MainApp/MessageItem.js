import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
// import { useState } from 'react';

function MessageItem(props) {
  return (
    <li className="row align-items-start message">
      <div className="message-box col-10">
        <h3>{props.message.username}</h3>
        <p>{props.message.text}</p>
      </div>
      <div className="edit-box col-2">
        <BsFillTrashFill className='trash' onClick={() => props.deleteMessage(props.message.id)}/>
        <AiFillEdit />
      </div>
    </li>
  );
}

export default MessageItem;

// function MessageItem(props) {
//   const [author, setAuthor] = useState(false)
  
//   const authorHTML = (
//     <li className="row align-items-start message">
//       <div className="message-box col-10">
//         <h3>{props.message.username}</h3>
//         <p>{props.message.text}</p>
//       </div>
//       <div className="edit-box col-2">
//         <BsFillTrashFill className='trash' onClick={() => props.deleteMessage(props.message.id)}/>
//         <AiFillEdit />
//       </div>
//     </li>
//   )

//   const notAuthorHTML = (
//     <li className="row align-items-start message">
//       <div className="message-box col-12">
//         <h3>{props.message.username}</h3>
//         <p>{props.message.text}</p>
//       </div>
//     </li>
//   )

//   const isAuthor = () => {
//     if (props.user.username === props.message.username) {
//       setAuthor(true)
//     } else {
//       setAuthor(false)
//     }
//   }

//   return (
//     {author ? {authorHTML} : {notAuthorHTML} }
//   );
// }

// export default MessageItem;