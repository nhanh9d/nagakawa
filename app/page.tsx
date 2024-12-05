"use client";

import Image from "next/image";

export default function Home() {
  let currentRotation = 0;
  const spinSpeed = 10;

  const spin = () => {
    const wheel = document.getElementById("wheel");
    const spinningInterval = setInterval(() => {
      currentRotation = (currentRotation + spinSpeed) % 360;
      wheel!.style.transform = `rotate(${currentRotation}deg)`;
    }, 20);

    setTimeout(() => {
      clearInterval(spinningInterval);
    }, 10000);
  };

  return (
    <>
      <div className="bg-[url('/bg_mobile.png')] md:bg-[url('/bg_desktop.png')] bg-cover bg-repeat bg-center w-screen h-screen">
        <div className="hidden md:block h-[130px]">
          <Image
            className="fixed left-1/2 -translate-x-1/2 !max-w-full !h-auto z-10"
            aria-hidden
            src="/logo.png"
            alt="Nagakawa"
            width={398}
            height={0}
            priority
          />
          <Image
            className="fixed left-1/2 -translate-x-1/2 !max-w-full !h-auto z-0"
            aria-hidden
            src="/bg_logo.png"
            alt="Nagakawa"
            width={648}
            height={0}
          />
        </div>
        <h1 className="hidden">Nagakawa</h1>
        <div className="main md:flex md:h-[calc(100vh-130px)] items-center justify-center md:overflow-hidden md:px-[100px]">
          <div className="hidden md:block absolute left-1/4 top-1/2 -translate-y-1/2 -translate-x-1/2">
            <Image
              id="wheel"
              className="aspect-square !max-w-[600px]"
              aria-hidden
              src="/wheel.png"
              alt="Nagakawa"
              width={1000}
              height={0}
              priority
              onClick={() => spin()}
            />
          </div>
          <div className="font-['Inter'] md:border-[#046B38] md:border-x-[3px] md:border-y-[3px] md:rounded-[50px] md:pl-[500px] md:py-[16px] md:pr-[16px] md:bg-[#fff] text-center">
            <h3 className="text-[#fff] text-[25px] md:text-[#046B38] md:text-[35px] pt-[16px] md:pt-0 font-black">
              Chào mừng đến với vòng quay may mắn
            </h3>
            <Image
              id="wheel"
              className="md:hidden aspect-square"
              aria-hidden
              src="/wheel.png"
              alt="Nagakawa"
              width={1000}
              height={0}
              priority
              onClick={() => spin()}
            />
            <input
              type="text"
              placeholder="Họ và tên"
              name="fullname"
              className="bg-[#046B38] placeholder:text-white w-[80%] rounded-[10px] mb-1 p-[10px]"
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              name="phone"
              className="bg-[#046B38] placeholder:text-white w-[80%] rounded-[10px] mb-1 p-[10px]"
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="bg-[#046B38] placeholder:text-white w-[80%] rounded-[10px] mb-4 p-[10px]"
            />

            <button
              onClick={() => {
                spin();
              }}
              className="shadow-inner border-[#046B38] border-x-[3px] border-y-[3px] bg-[#fff] md:border-[#fff] md:border-x-[3px] md:border-y-[3px] md:bg-[#046B38] text-[#046B38] md:text-white w-[80%] rounded-full mb-6 p-[10px]"
            >
              QUAY THƯỞNG
            </button>
            <br />
            <a className="text-sm md:text-base text-[#1D2358]" href="">
              Nội dung & Thể lệ chương trình
            </a>
            <p className="text-xs md:text-base text-black mt-8">
              Nếu quý khách gặp bất cứ vấn đề gì trong quá trình chơi,
            </p>
            <p className="text-xs md:text-base text-black">
              vui lòng liên hệ hotline 1900.545.489 để được giải đáp
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
