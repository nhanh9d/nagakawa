// components/Wheel.tsx
import React, { useState } from "react";
import Image from "next/image";

// Define props type
interface WheelProps {
  nickname: string;
}

const WheelStep: React.FC<WheelProps> = ({}) => {
  const [showModal, setShowModal] = useState(false);
  const [img, setImg] = useState("");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

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

    const response = await fetch("/api/spin", { method: "POST" });
    const result = await response.json();

    clearInterval(spinningInterval);
    currentRotation = 0;
    for (const element of wheels) {
      const wheel = element as HTMLElement;
      wheel.style.transform = `rotate(${currentRotation}deg)`;
    }

    if (result && result.selectedPrize) {
      setShowModal(true);
      setImg(result.selectedPrize.img);
      setMessage(result.selectedPrize.message);
      setTitle(result.selectedPrize.title);
    }
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
                <div className="flex items-center justify-center p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3
                    className="text-3xl text-[#046B38] text-center font-semibold"
                    dangerouslySetInnerHTML={{ __html: title }}
                  ></h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="flex justify-center items-center">
                    {img ? (
                      <Image
                        className=""
                        aria-hidden
                        src={img}
                        alt="Nagakawa"
                        width={100}
                        height={0}
                        priority
                      />
                    ) : null}
                  </div>
                  <p className="my-4 text-black text-center text-lg leading-relaxed">
                    {message ? (
                      message
                    ) : (
                      <>
                        Tiếc quá, bạn đã hết lượt chơi mất rồi.
                        <br />
                        Hẹn gặp lại bạn lần sau
                      </>
                    )}
                    {message && title ? (
                      <>
                        <hr />
                        <p>
                          Vui lòng liên hệ hotline{" "}
                          <a href="callto:1900.545.489" title="1900.545.489">
                            1900.545.489
                          </a>
                          <br />
                          hoặc FB/Zalo Nakagawa để nhận thưởng
                        </p>
                      </>
                    ) : null}
                  </p>
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
