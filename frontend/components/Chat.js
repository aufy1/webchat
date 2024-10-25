// components/Chat.js
import { useState } from 'react';

const Contact = ({ name, message, avatar }) => (
  <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
    <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
      <img src={avatar} alt={`${name}'s Avatar`} className="w-12 h-12 rounded-full" />
    </div>
    <div className="flex-1">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
);

const ChatMessage = ({ text, outgoing, avatar }) => (
  <div className={`flex ${outgoing ? 'justify-end' : ''} mb-4 cursor-pointer`}>
    {outgoing ? null : <img src={avatar} alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />}
    <div className={`flex max-w-96 ${outgoing ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700'} rounded-lg p-3`}>
      <p>{text}</p>
    </div>
    {outgoing ? <img src={avatar} alt="My Avatar" className="w-8 h-8 rounded-full ml-2" /> : null}
  </div>
);

const Chat = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-300">
        {/* Sidebar Header */}
        <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
          <h1 className="text-2xl font-semibold">Chat Web</h1>
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-100" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul className="py-2 px-3">
                <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 1</a></li>
                <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 2</a></li>
              </ul>
            </div>
          )}
        </header>
        
        {/* Contact List */}
        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
          <Contact name="Alice" message="Hoorayy!!" avatar="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" />
          <Contact name="Martin" message="That pizza place was amazing!" avatar="https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" />
          {/* Repeat for other contacts */}
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 relative">
        {/* Chat Header */}
        <header className="bg-white p-4 text-gray-700">
          <h1 className="text-2xl font-semibold">Alice</h1>
        </header>
        
        {/* Chat Messages */}
        <div className="h-screen overflow-y-auto p-4 pb-36">
          <ChatMessage text="Hey Bob, how's it going?" avatar="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" />
          <ChatMessage text="Hi Alice! I'm good, just finished a great book." outgoing avatar="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" />
          {/* Repeat for other messages */}
        </div>
        
        {/* Chat Input */}
        <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full">
          <div className="flex items-center">
            <input type="text" placeholder="Type a message..." className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500" />
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Chat;
