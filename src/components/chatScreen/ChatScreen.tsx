import React, { useContext, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/authContext/authContext';
import { FiSend } from 'react-icons/fi';
import ChatBubble from './chatBubble/ChatBubble';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';

const socket = io('https://d3lxcpi79i01m2.cloudfront.net'); // Replace with your socket server URL

const PersonalChatPage: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const location = useLocation();
  const userDetails = location.state?.user as any;

  const roomId = location.state?.roomId as any;

  const [text, setText] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [blockedByme, setBlockedByme] = useState(false);
  const [blockedBysender, setBlockedBysender] = useState(false);
  const scrollViewRef = useRef<HTMLDivElement>(null);

  const disconnectUser = () => {
    socket.emit('disconnectUser', user?._id, roomId);
  };

  const handleNavigateBack = () => {
    disconnectUser();
    navigate(-1); // Go back to previous page
  };


  useEffect(() => {
    // Scroll to the bottom when messages change
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight;
    }
  }, [messages]); // Re-run whenever the messages change


  const blockUser = async () => {
    await socket.emit('block', {
      roomId,
      userId: user?._id,
      status: true,
      gender: user?.gender,
      blockedto: userDetails._id,
    });
    setModal2Visible(false);
    setBlockedByme(true);
  };

  const unblockUser = async () => {
    await socket.emit('block', {
      roomId,
      userId: user?._id,
      status: false,
      gender: user?.gender,
      blockedto: userDetails._id,
    });
    setModal2Visible(false);
    setBlockedByme(false);
  };

  useEffect(() => {
    socket.on('userCountUpdate', ({ userCount }: any) => setUserCount(userCount));
    return () => {
      socket.off('userCountUpdate');
    };
  }, []);

  useEffect(() => {
    socket.emit('joinRoom', roomId, user?._id);

    socket.on('connect', () => console.log('Connected to socket.io server'));
    socket.on('previousMessages', (previousMessages: any) => setMessages(previousMessages));
    socket.on('receiveMessage', (message: any) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollViewRef.current?.scrollTo(0, scrollViewRef.current.scrollHeight);
    });

    return () => {
      socket.off('connect');
      socket.off('receiveMessage');
      socket.off('previousMessages');
    };
  }, [roomId, user]);

  const sendMessage = () => {
    if (text.trim()) {
      const message = {
        roomId,
        text,
        sender: user?._id,
        female_user: user?.gender === 'FEMALE' ? user?._id : userDetails._id,
        male_user: user?.gender === 'MALE' ? user?._id : userDetails._id,
      };
      socket.emit('sendMessage', message);
      setText('');
    }
  };

  return (
    <div className="flex flex-col h-[93vh]  bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-2 bg-gray-800 text-white shadow-lg">
        <div className="flex items-center py-1 justify-between gap-2">
        <button onClick={handleNavigateBack} className="pl-2 text-gray-400 hover:text-white flex items-center">
            {/* <IoMdArrowRoundBack size={22}/> */}
            <img className="h-8 w-8" src="https://cdn-icons-png.freepik.com/512/14997/14997052.png" alt="" />
            
            </button>

        <img src={userDetails?.profile_image} className='h-11 w-11 rounded-full' alt="" />
        <h2 className="text-md font-medium text-gray-200">{userDetails.user_name}</h2>
        </div>
        {/* <button onClick={() => setModal2Visible(true)} className="text-gray-400 hover:text-white pr-5">
            <HiOutlineDotsCircleHorizontal size={30}/>
        </button> */}
      </div>

      {/* Messages Container */}
      <div ref={scrollViewRef} className="flex-1 p-4 overflow-y-auto space-y-4">
      {messages.map((message, index) => (
  <ChatBubble
    key={index}
    message={{
        seenBySender:message.seenBySender,
      text: message.text,
      senderName: message.senderName || "Unknown", // Replace with actual sender name if available
      timestamp: message.timestamp || "12:45", // Replace with actual timestamp if available
    }}
    isSender={message.sender === user?._id}
  />
))}

      </div>

      {/* Input Container */}
      {!blockedByme && !blockedBysender && (
        <div className="flex items-center p-4 bg-gray-800 ">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 mr-4 text-gray-100 rounded-2xl bg-gray-600 focus:outline-none placeholder-white"
          />
          <button
            onClick={sendMessage}
            className=" py-2 text-white rounded-full "
          >
           {/* <FiSend size={25}/> */}
           <img className='h-12 w-12' src="https://cdn-icons-png.freepik.com/512/14996/14996948.png" alt="" />
          </button>
        </div>
      )}

      {/* Block Notification */}
      {blockedByme && (
        <div className="p-4 text-center text-gray-400 bg-gray-800">
          You have blocked {userDetails.full_name}. Unblock to chat.
        </div>
      )}
      {blockedBysender && (
        <div className="p-4 text-center text-gray-400 bg-gray-800">
          {userDetails.full_name} has blocked you.
        </div>
      )}

      {/* Options Modal */}
      {modal2Visible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setModal2Visible(false)}
        >
          <div
            className="p-6 bg-white rounded-lg shadow-lg w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Options</h3>
            <button
              onClick={blockUser}
              className="w-full px-4 py-2 mb-2 text-white bg-red-500 rounded-md hover:bg-red-600"
            >
              Block User
            </button>
            <button
              onClick={() => navigate('/account-report', { state: { userDetails, roomId } })}
              className="w-full px-4 py-2 mb-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
            >
              Report User
            </button>
            <button
              onClick={() => setModal2Visible(false)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalChatPage;
