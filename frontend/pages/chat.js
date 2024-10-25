import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Contact = ({ name, message, avatar }) => (
  <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
    <img
      src={avatar}
      alt={`${name}'s Avatar`}
      className="w-12 h-12 rounded-full mr-3"
    />
    <div className="flex-1">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
);

const ChatMessage = ({ text, outgoing, avatar }) => (
  <div className={`flex ${outgoing ? "justify-end" : ""} mb-4`}>
    {!outgoing && (
      <img
        src={avatar}
        alt="User Avatar"
        className="w-8 h-8 rounded-full mr-2"
      />
    )}
    <div
      className={`max-w-96 ${
        outgoing ? "bg-indigo-500 text-white" : "bg-white text-gray-700"
      } rounded-lg p-3`}>
      <p>{text}</p>
    </div>
    {outgoing && (
      <img src={avatar} alt="My Avatar" className="w-8 h-8 rounded-full ml-2" />
    )}
  </div>
);

export default function Chat() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const response = await fetch("/api/check-session");
      if (!response.ok) {
        router.push("/");
      } else {
        setIsAuthorized(true);
      }
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" }); // Zakładając, że masz endpoint do wylogowania
    router.push("/"); // Przekierowanie do strony głównej po wylogowaniu
  };

  if (!isAuthorized) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/4 bg-white border-r border-gray-300">
        <header className="p-4 border-b border-gray-300 bg-indigo-600 text-white flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Chat Web</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">
            Logout
          </button>
        </header>
        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
          <Contact
            name="Alice"
            message="Hoorayy!!"
            avatar="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ"
          />
          <Contact
            name="Martin"
            message="Amazing pizza!"
            avatar="https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ"
          />
        </div>
      </div>
      <div className="flex-1 relative">
        <header className="bg-white p-4 text-gray-700">
          <h1 className="text-2xl font-semibold">Alice</h1>
        </header>
        <div className="h-screen overflow-y-auto p-4 pb-36">
          <ChatMessage
            text="Hey Bob, how's it going?"
            avatar="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ"
          />
          <ChatMessage
            text="Hi Alice! I'm good!"
            outgoing
            avatar="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ"
          />
        </div>
        <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 rounded-md border border-gray-400"
            />
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
              Send
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
