import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const DashBoard = () => {
  const [divIndex, setDivIndex] = useState(0);
  const navigate = useNavigate()

  const divInfo = [
    {
      heading: "Catch up on the latest gists and news. Stay informed",
      paragraph:
        "We provide you with the latest news and gists from around the world. Stay informed and never miss out on anything. The world is a global village and we are here to keep you connected to the world.",
      button: "Read more",
      img: "/assets/pexels-shkrabaanthony-4348404.jpg",
      alt: "image 1",
    },
    {
      heading:
        "We give you the best on healthy diet and lifestyle. Stay healthy",
      paragraph:
        "Get the best tips on healthy diet and lifestyle. Stay healthy and live longer. Your health is your wealth. We are here to help you stay",
      button: "Read more",
      img: "/assets/pexels-mastercowley-1153369.jpg",
      alt: "image 2",
    },
    {
      heading: "You get the travel tips and best places to visit",
      paragraph:
        "We provide you with the best travel tips and the best places to visit. Travel the world and explore the beauty of nature. We are here to help you get the best experience.",
      button: "Read more",
      img: "/assets/pexels-haleyve-2087391.jpg",
      alt: "image 3",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDivIndex((prevIndex) => (prevIndex + 1) % divInfo.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [divIndex, divInfo.length, setDivIndex]);

  return (
    <>
      <div
        className="transition-all duration-500 ease-in-out h-screen w-screen  text-white text-center px-3 relative z-10"
        style={{
          backgroundImage: `url(${divInfo[divIndex].img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full h-full bg-black/40 flex justify-center items-center flex-col">
          <h1 className="font-tangerine font-bold text-7xl text-cyan-500 mb-5">
            {divInfo[divIndex].heading}
          </h1>

          <p className="w-1/2 text-xl">{divInfo[divIndex].paragraph}</p>

          <button 
          onClick={() => navigate("/blogs")}
          className="border border-cyan-500 text-cyan-500 py-2 px-5 rounded-md text-lg mt-5 transition-all duration-200 ease-linear hover:bg-cyan-500 hover:text-white">{divInfo[divIndex].button}</button>
        </div>
        
      </div>
    </>
  );
};

export default DashBoard;
