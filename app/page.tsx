"use client";

import Image from "next/image";
import { useState } from "react";
import RelationshipStep from "./components/relationship";
import WheelStep from "./components/wheel";

export default function Home() {
  const [relationship, setRelationship] = useState("");
  const [nickname, setNickname] = useState("");

  const selectRelationship = (selectedRelationship: string) => {
    setRelationship(selectedRelationship === "Chồng" ? "husband" : "father");
  };

  const selectNickname = (selectedNickname: string) => {
    setNickname(selectedNickname);
  };

  const clearInfo = () => {
    setRelationship("");
    setNickname("");
  }

  return (
    <>
      <div className={`bg-[url('/bg_mobile${relationship && nickname ? "_wheel" : ""}.png')] md:bg-[url('/bg_desktop.png')] bg-cover bg-repeat bg-center w-screen h-screen`}>
        <div className="h-[75px] md:h-[130px]">
          <Image
            className="hidden md:block fixed left-1/2 -translate-x-1/2 !max-w-full !h-auto z-10"
            aria-hidden
            src="/logo.png"
            alt="Nagakawa"
            width={656}
            height={0}
            priority
          />
          <Image
            className="md:hidden fixed left-1/2 -translate-x-1/2 !max-w-full !h-auto z-10"
            aria-hidden
            src="/logo_mobile.png"
            alt="Nagakawa"
            width={339}
            height={0}
            priority
          />
        </div>
        <h1 className="hidden">Nagakawa</h1>
        {!relationship && !nickname && (
          <>
            <RelationshipStep
              selectRelationship={selectRelationship}
              selectNickname={selectNickname}
            />
            <Image
              className="md:hidden bg-[#ECFBC5]"
              aria-hidden
              src="/image_mobile.png"
              alt="Nagakawa"
              width={399}
              height={0}
              priority
            />
          </>
        )}
        {relationship && nickname && <WheelStep nickname={nickname} imageName={relationship} clearInfo={clearInfo} />}
      </div>
    </>
  );
}
