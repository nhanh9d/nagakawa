// components/Wheel.tsx
import React, { useState } from "react";
import Image from "next/image";

// Define props type
interface WheelProps {
  nickname: string;
  imageName: string;
}

const WheelStep: React.FC<WheelProps> = ({ nickname, imageName }) => {
  const [showModal, setShowModal] = useState(false);
  const [img, setImg] = useState("");

  let currentRotation = 0;
  const spinSpeed = 10;

  const spin = async () => {
    const wheels = document.querySelectorAll(".wheel");
    const spinningInterval = setInterval(() => {
      currentRotation = (currentRotation + spinSpeed) % 360;
      for (const element of wheels) {
        const wheel = element as HTMLElement;
        wheel.style.transform = `rotate(${currentRotation}deg)`;
      }
    }, 20);

    const response = await fetch(`/api/spin?imageName=${imageName}&nickname=${nickname}`);
    const blob = await response.blob();
    const src = URL.createObjectURL(blob);

    setTimeout(() => {
      clearInterval(spinningInterval);
      currentRotation = 0;
      for (const element of wheels) {
        const wheel = element as HTMLElement;
        wheel.style.transform = `rotate(${currentRotation}deg)`;
      }

      setImg(src);
      setShowModal(true);
    }, 1500);
  };

  return (
    <>
      <div className="main md:flex md:h-[calc(100vh-130px)] items-center justify-center md:overflow-hidden md:px-[100px] relative">
        <div className="absolute md:left-1/4 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 hover:cursor-pointer">
          <Image
            className="wheel aspect-square md:!max-w-[600px]"
            aria-hidden
            src="/wheel.png"
            alt="Nagakawa"
            width={1000}
            height={0}
            priority
            onClick={() => spin()}
          />
          <Image
            className="absolute right-[24px] top-[24px] max-w-[50px] md:max-w-full"
            aria-hidden
            src="/wheel_selector.png"
            alt="Nagakawa"
            width={100}
            height={0}
            priority
            onClick={() => spin()}
          />
        </div>
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                  <div className="flex justify-center items-center">
                    {img ? (
                      <Image
                        className=""
                        aria-hidden
                        src={img}
                        alt="Nagakawa"
                        width={1000}
                        height={0}
                        priority
                      />
                    ) : null}
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default WheelStep;
