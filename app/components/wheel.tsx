// components/Wheel.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";

// Define props type
interface WheelProps {
  nickname: string;
  imageName: string;
  clearInfo: () => void;
}

const WheelStep: React.FC<WheelProps> = ({
  nickname,
  imageName,
  clearInfo,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [img, setImg] = useState("");
  const [prize, setPrize] = useState<number | null>(null);

  let currentRotation = 0;
  const spinSpeed = 10;

  const saveImage = () => {
    const link = document.createElement("a");
    link.href = img;
    link.setAttribute("download", "image.png"); //or any other extension
    document.body.appendChild(link);
    link.click();
    link.remove();

    setSaved(true);
  };

  const shareFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      `${window.location.protocol}//${window.location.host}/api/spin?imageName=${imageName}&nickname=${nickname}`
    )}`;

    // Open the Facebook Share Dialog in a new tab
    window.open(facebookShareUrl, "_blank", "width=600,height=400");
  };

  const retry = () => {
    setImg("");
    setPrize(null);
    setShowModal(false);
    clearInfo();
  };

  useEffect(() => {
    console.log("prize: ", prize);
  }, [prize]);

  // get prize
  const spin = async () => {
    console.log("spinning");
    setSpinning(true);
    const wheels = document.querySelectorAll(".wheel");
    const spinningInterval = setInterval(() => {
      currentRotation = (currentRotation + spinSpeed) % 360;
      for (const element of wheels) {
        const wheel = element as HTMLElement;
        wheel.style.transform = `rotate(${currentRotation}deg)`;
      }
    }, 20);

    try {
      const response = await fetch(`/api/spin`, { method: "POST" });

      const result = await response.json();

      if (result) {
        setPrize(result.prize);
      }
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      clearInterval(spinningInterval);
      currentRotation = 0;
      for (const element of wheels) {
        const wheel = element as HTMLElement;
        wheel.style.transform = `rotate(${currentRotation}deg)`;
      }

      setSpinning(false);
    }, 1500);
  };

  // update image prize once prize is retrieved
  useEffect(() => {
    if (prize) {
      const getPrize = async () => {
        const response = await fetch(
          `/api/certificate?imageName=${imageName}${prize}&nickname=${nickname}`
        );

        const blob = await response.blob();
        const src = URL.createObjectURL(blob);

        setImg(src);
      };

      getPrize();
    }
  }, [prize]);

  // show modal once spinning is done and img is generated
  useEffect(() => {
    if (!spinning && img) {
      setShowModal(true);
    }
  }, [spinning, img]);

  return (
    <>
      <div className="main md:flex md:h-[calc(100vh-130px)] md:overflow-hidden md:px-[100px] relative">
        <div className="hover:cursor-pointer relative">
          <Image
            className="wheel aspect-square w-auto h-full"
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
            <div className="relative w-auto my-6 mx-4 max-w-3xl">
              <div
                className={`border-0 rounded-lg relative flex flex-col w-full outline-none focus:outline-none ${
                  saved && "bg-white"
                }`}
              >
                <div
                  className={`relative flex-auto mb-6 px-4 ${
                    saved ? "mt-6" : "shadow-lg"
                  }`}
                >
                  {img && !saved ? (
                    <div className="flex justify-center items-center">
                      <Image
                        className=""
                        aria-hidden
                        src={img}
                        alt="Nagakawa"
                        width={1000}
                        height={0}
                        priority
                      />
                    </div>
                  ) : null}

                  {saved && (
                    <>
                      <p className="text-[#DA2E2E] text-center font-['Inter']">
                        Bạn đã lưu thành công giấy chứng nhận
                      </p>
                      <p className="text-black text-center font-['Inter']">
                        Đừng ngần ngại mà chia sẻ điều đặc biệt này nha!
                      </p>
                    </>
                  )}
                </div>
                <div className="flex items-center justify-center pb-4">
                  {!saved && (
                    <button
                      className="text-white bg-[#046B38] font-['Inter'] shadow-lg rounded-full font-bold w-full px-6 py-2 text-sm outline-none focus:outline-none mx-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => saveImage()}
                    >
                      Lưu lại
                    </button>
                  )}
                  {!saved && (
                    <button
                      className="text-white bg-[#046B38] font-['Inter'] shadow-lg rounded-full font-bold w-full px-6 py-2 text-sm outline-none focus:outline-none mx-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => shareFacebook()}
                    >
                      Chia sẻ
                    </button>
                  )}
                  <button
                    className={`text-white bg-[#DA2E2E] font-['Inter'] shadow-lg rounded-full font-bold ${
                      !saved ? "w-full" : ""
                    } px-6 py-2 text-sm outline-none focus:outline-none mx-2 mb-1 ease-linear transition-all duration-150`}
                    type="button"
                    onClick={() => retry()}
                  >
                    Làm lại
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
