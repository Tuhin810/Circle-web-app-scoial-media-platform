const ChatBubble = ({ message, isSender }: any) => {
  return (
    <div
      className={`flex ${
        isSender ? "justify-end" : "justify-start"
      } items-start mb-4`}
    >
      {/* Avatar and Username (displayed for incoming messages only) */}

      <div>
        <div
          className={`relative py-2 max-w-xs rounded-xl px-5 ${
            isSender
              ? "bg-[#d8fc5f] text-black"
              : "flex items-center  rounded-full backdrop-blur bg-white/10 border border-white/10 shadow-[inset_0_0_1px_rgba(255,255,255,0.02)] transition-transform text-gray-200"
          }`}
          style={{
            borderRadius: isSender
              ? "20px 20px 0px 20px"
              : "20px 20px 20px 0px",
          }}
        >
          {message.text}

          {/* Tail of the chat bubble */}
          {/* <span
            className={`absolute bottom-0 w-1 h-1 ${
              isSender ? 'bg-blue-600 right-0 transform translate-x-1 translate-y-1' : 'bg-gray-700 left-0 transform -translate-x-1 translate-y-1'
            } rounded`}
          /> */}
        </div>

        {/* Delivery Status */}
        {isSender && (
          <span className="text-xs flex justify-end items-end text-gray-400 mt-1">
            {message?.seenBySender ? <>Seen </> : <>Sent</>}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
