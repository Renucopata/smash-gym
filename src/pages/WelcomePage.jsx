import { useState } from 'react';
import Login from './Login';
import logo from '../assets/smashLogo1.png'

const WelcomePage = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(!showLogin);
  };


  return (
    <div
      className="h-screen w-screen flex justify-center items-center bg-gray-100"
      onClick={handleShowLogin}
    >
      {showLogin ? (
        <Login setShowLogin={setShowLogin}></Login>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <img className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" src={logo}/>
          <h1 className="text-3xl font-bold text-gray-600">Smash Gym!</h1>
        </div>
      )}
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-blue-600"
        onClick={handleShowLogin}
      >
        Esconder
      </button>
    </div>
  );
};

export default WelcomePage;