import React, { useRef, useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import AuthContext from "../../contexts/authContext/authContext";
import StartSTreamBtn from "../shared/startSctreamBtn/StartSTreamBtn";
import { api } from "../../utils/api";

const App: React.FC = () => {
  const socket = useRef(io("https://d1kyyw1uhc9dji.cloudfront.net")).current;
  const { user } = useContext(AuthContext);
  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const peerConnections = useRef<{ [id: string]: RTCPeerConnection }>(
    {}
  ).current;
  const navigate = useNavigate(); // Hook for navigation

  const [role, setRole] = useState<"broadcaster" | "viewer" | null>(null);
  const { roomId } = useParams<{ roomId: string }>();
  const [room, setRoom] = useState<any>(roomId);
  const [message, setMessage] = useState<string>("");

  const startBroadcast = async () => {
    if (!room) {
      alert("Please enter a room name");
      return;
    }
    createLiveStreamRoom();
    setRole("broadcaster");
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (localVideo.current) {
      localVideo.current.srcObject = stream;
    }

    socket.emit("broadcaster", room);

    socket.on("watcher", async (id) => {
      const peerConnection = new RTCPeerConnection();

      peerConnection.onicecandidate = ({ candidate }) => {
        if (candidate) {
          socket.emit("candidate", id, candidate);
        }
      };

      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socket.emit("offer", id, offer);

      peerConnections[id] = peerConnection;
    });

    socket.on("answer", (id, description) => {
      peerConnections[id]?.setRemoteDescription(
        new RTCSessionDescription(description)
      );
    });

    socket.on("candidate", (id, candidate) => {
      peerConnections[id]?.addIceCandidate(new RTCIceCandidate(candidate));
    });

    socket.on("disconnectPeer", (id) => {
      peerConnections[id]?.close();
      delete peerConnections[id];
    });
  };

  const startViewing = () => {
    if (!room) {
      alert("Please enter a room name");
      return;
    }

    setRole("viewer");
    socket.emit("watcher", room);

    socket.on("noBroadcaster", (room) => {
      setMessage(`No broadcaster available for room: ${room}`);
    });

    socket.on("offer", async (id, description) => {
      const peerConnection = new RTCPeerConnection();

      peerConnection.onicecandidate = ({ candidate }) => {
        if (candidate) {
          socket.emit("candidate", id, candidate);
        }
      };

      peerConnection.ontrack = (event) => {
        if (remoteVideo.current) {
          remoteVideo.current.srcObject = event.streams[0];
        }
      };

      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(description)
      );
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit("answer", id, answer);

      peerConnections[id] = peerConnection;
    });

    socket.on("candidate", (id, candidate) => {
      peerConnections[id]?.addIceCandidate(new RTCIceCandidate(candidate));
    });

    socket.on("broadcasterDisconnected", () => {
      setMessage("The broadcaster has ended the stream.");
    });
  };

  const createLiveStreamRoom = async () => {
    try {
      const payload = {
        room_Id: user?._id,
        broadcaster: user?._id,
      };
      const response = await api.livestream.createLiveRoom(payload);
      console.log("=======>Live streams ", response);
    } catch (error) {
      console.log("=========>error creating live server", error);
    }
  };

  const closeLiveSTream = async () => {
    try {
      const filter = {
        room_Id: user?._id,
      };
      const response = await api.livestream.closeLiveRoom(filter);
      console.log("=======>Live streams stopped ", response);

      window.location.reload();
    } catch (error) {
      console.log("=========>error closing live server", error);
    }
  };

  console.log("===========>user", user);

  return (
    <div className="bg-black h-screen">
      <div className="flex justify-between  items-center px-4 py-3">
        <h2
          className="text-white text-3xl font-bold ml-2 t font-bold text-2xl leading-tight"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          21Xconnect
        </h2>
      </div>
      <h1>Live Streaming App {room}</h1>
      <div className="text-2xl"> {user?._id}</div>
      {!role && (
        <div>
          {roomId === user?._id && (
            <StartSTreamBtn startBroadcast={startBroadcast} />
          )}
          {roomId !== user?._id && (
            <div className="flex flex-col justify-center items-center">
              <div className="text-xl text-gray-100 font-semibold text-center mb-3">
                Disclaimer
              </div>
              <p className="w-[80%] text-gray-300 text-center text-lg mb-10 max-w-md">
                The content of this live stream does not belong to or represent
                the views of **21x Connect**. Viewer discretion is advised.
              </p>
              <button
                className="text-white bg-gray-800 text-lg px-8 py-3 rounded-xl "
                onClick={startViewing}
              >
                Agree & Continue Watching
              </button>
            </div>
          )}
        </div>
      )}
      {role === "broadcaster" && (
        <div className="relative h-[92vh] -mt-10">
          <h2>Broadcaster</h2>
          <video
            ref={localVideo}
            className="absolute top-0 left-0 w-[100%] h-[95%] object-cover"
            autoPlay
            playsInline
            muted
          ></video>
          <img
            className="h-16 w-16  absolute text-white top-5 right-5"
            src="https://cdn-icons-png.freepik.com/512/5822/5822037.png?ga=GA1.1.1598467923.1731688846"
            alt="Live Label"
          />
          <div
            onClick={closeLiveSTream}
            className="bg-black px-7 py-3 text-lg absolute text-white flex items-center gap-2 bottom-16 left-20 rounded-xl"
          >
            <div className="bg-red-600 w-6 h-6 border-2 border-white rounded-full"></div>
            Stop Stream
          </div>
        </div>
      )}
      {role === "viewer" && (
        <div className="relative h-[92vh] bg-black -mt-10">
          <h2>Viewer</h2>
          {message && <p>{message}</p>}
          <video
            controls
            contentEditable={true}
            ref={remoteVideo}
            autoPlay
            playsInline
            className="absolute top-0 left-0 w-[100%] h-[95%] object-cover"
          ></video>
        </div>
      )}
    </div>
  );
};

export default App;
