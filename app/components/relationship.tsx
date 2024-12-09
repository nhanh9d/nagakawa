// components/Relationship.tsx
import React, { useState } from "react";

// Define props type
interface RelationshipProps {
  selectRelationship: (relationship: string) => void;
  selectNickname: (nickname: string) => void;
}

const RelationshipStep: React.FC<RelationshipProps> = ({
  selectRelationship,
  selectNickname,
}) => {
  const [showNickname, setShowNickname] = useState(false);
  const [nickname, setNickname] = useState("");
  const [suggestNicknames, setSuggestNicknames] = useState<string[][] | null>(
    null
  );
  const [relationship, setRelationship] = useState("");
  const [question, setQuestion] = useState(
    "Vai trò của bạn trong gia đình là gì?"
  );

  const goNext = () => {
    if (relationship) {
      setShowNickname(true);
      switch (relationship) {
        case "Bố":
          setQuestion("Biệt danh gia đình thường gọi bạn là gì?");
          setSuggestNicknames([
            ["Bố bé Bi", "Anh Xã", "Bố bự"],
            ["Chồng iu", "Bố Siêu nhân"],
          ]);
          break;
        case "Mẹ":
          setQuestion("Biệt danh bạn thường gọi chồng là gì?");
          setSuggestNicknames([
            ["Bố bé Bi", "Ông Xã", "Anh Chồng"],
            ["Chồng iu", "Thần Tài", "Cục cưng"],
          ]);
          break;
        case "Con":
          setQuestion("Biệt danh bạn thường gọi bố mình là gì?");
          setSuggestNicknames([
            ["Bố bé Bi", "Ba Tí", "Bố bự"],
            ["Hoàng thượng", "Nhà đầu tư"],
          ]);
          break;
        case "Vợ":
          setQuestion("Biệt danh bạn thường gọi chồng là gì?");
          setSuggestNicknames([
            ["Mình", "Anh Chồng", "Ông Xã"],
            ["Anh bạn đời", "Cục cưng", "Chồng iu"],
          ]);
          break;
        case "Chồng":
          setQuestion("Biệt danh vợ bạn thường gọi bạn là gì?");
          setSuggestNicknames([
            ["Anh Chồng", "Anh Xã", "Mình"],
            ["Chồng iu", "Anh bạn đời"],
          ]);
          break;

        default:
          setQuestion("Vai trò của bạn trong gia đình là gì?");
          setSuggestNicknames([]);
          break;
      }
    }

    if (nickname) {
      selectRelationship(relationship);
      selectNickname(nickname);
    }
  };

  return (
    <>
      <h2 className="font-['Lobster'] text-center text-[#DA2E2E] text-[40px] md:text-[50px] mb-[27px]">
        Vinh Danh Người Bố Của Năm
      </h2>
      <h3 className="font-['Inter'] font-bold text-center text-[25px] md:text-[30px] md:mb-[52px] mb-[32px] text-[#000]">
        {question}
      </h3>
      {!showNickname ? (
        <>
          <div className="flex justify-center md:mb-[37px] flex-wrap">
            <button
              className="relationship mb-[20px] focus:bg-[#046B38] focus:text-white font-['Inter'] font-bold md:mx-4 mx-2 md:px-4 px-2 py-2 border rounded-full border-[#046B38] min-w-[100px] md:min-w-[200px] text-[#046B38] md:text-[24px] hover:shadow-lg"
              onClick={() => {
                setRelationship("Bố");
              }}
            >
              Bố
            </button>
            <button
              className="relationship mb-[20px] focus:bg-[#046B38] focus:text-white font-['Inter'] font-bold md:mx-4 mx-2 md:px-4 px-2 py-2 border rounded-full border-[#046B38] min-w-[100px] md:min-w-[200px] text-[#046B38] md:text-[24px] hover:shadow-lg"
              onClick={() => {
                setRelationship("Mẹ");
              }}
            >
              Mẹ
            </button>
            <button
              className="relationship mb-[20px] focus:bg-[#046B38] focus:text-white font-['Inter'] font-bold md:mx-4 mx-2 md:px-4 px-2 py-2 border rounded-full border-[#046B38] min-w-[100px] md:min-w-[200px] text-[#046B38] md:text-[24px] hover:shadow-lg"
              onClick={() => {
                setRelationship("Con");
              }}
            >
              Con
            </button>
            <button
              className="relationship mb-[20px] focus:bg-[#046B38] focus:text-white font-['Inter'] font-bold md:mx-4 mx-2 md:px-4 px-2 py-2 border rounded-full border-[#046B38] min-w-[100px] md:min-w-[200px] text-[#046B38] md:text-[24px] hover:shadow-lg"
              onClick={() => {
                setRelationship("Vợ");
              }}
            >
              Vợ
            </button>
            <button
              className="relationship mb-[20px] focus:bg-[#046B38] focus:text-white font-['Inter'] font-bold md:mx-4 mx-2 md:px-4 px-2 py-2 border rounded-full border-[#046B38] min-w-[100px] md:min-w-[200px] text-[#046B38] md:text-[24px] hover:shadow-lg"
              onClick={() => {
                setRelationship("Chồng");
              }}
            >
              Chồng
            </button>
          </div>
          <div className="flex justify-center">
            <button
              className="font-['Inter'] text-white font-bold py-2 px-12 min-w-[150px] border rounded-full border-[#046B38] bg-[#046B38] md:text-[30px]"
              onClick={() => {
                goNext();
              }}
            >
              Tiếp theo
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center mb-[24px] md:mb-[45px]">
            <div className="md:max-w-[80%] w-full md:w-auto flex">
              <div className="mx-4 w-full md:w-auto">
                <input
                  className="font-['Inter'] placeholder:italic rounded-full bg-white py-2 px-[20px] text-black w-full md:min-w-[500px]"
                  placeholder="Nhập biệt danh..."
                  value={nickname}
                  onChange={(event) => {
                    setNickname(event.target.value);
                  }}
                />
              </div>
              <button
                className="font-['Inter'] hidden md:block text-white font-bold py-2 px-12 min-w-[150px] border rounded-full border-[#046B38] bg-[#046B38]"
                onClick={() => {
                  goNext();
                }}
              >
                Tiếp theo
              </button>
            </div>
          </div>
          {suggestNicknames?.map((row) => (
            <>
              <div className="flex justify-center md:mb-[57px] mb-4">
                {row.map((suggestNickname) => (
                  <>
                    <button
                      className="focus:bg-[#046B38] focus:text-white font-['Inter'] font-bold mx-2 md:mx-4 px-4 py-2 border rounded-full border-[#046B38] min-w-[100px] md:min-w-[200px] text-[#046B38] text-[12px] md:text-[24px] hover:shadow-lg"
                      onClick={() => {
                        setNickname(suggestNickname);
                      }}
                    >
                      {suggestNickname}
                    </button>
                  </>
                ))}
              </div>
            </>
          ))}
          <div className="flex justify-center md:hidden mx-4">
            <button
              className="font-['Inter'] w-full text-white font-bold py-2 px-12 min-w-[150px] border rounded-full border-[#046B38] bg-[#046B38]"
              onClick={() => {
                goNext();
              }}
            >
              Tiếp theo
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default RelationshipStep;
