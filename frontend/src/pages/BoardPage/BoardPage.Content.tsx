import React, { useState, useRef, useEffect } from "react";
import camera from "../../assets/icons/camera.png";

interface ContentProps {
  handleModal: (stateOfModal: boolean, msg?: string) => void;
  handleEdit: (isEditing: boolean) => void;
  isEditing: boolean;
}

const Content: React.FC<ContentProps> = ({
  handleModal,
  handleEdit,
  isEditing,
}) => {
  // 우선 더미텍스트 넣어둔 것
  const [inputValue, setInputValue] = useState(
    "고대 로마 시대부터 현대에 이르기까지, 인류는 다양한 방법으로 세상과 상호 작용해 왔습니다. 이러한 상호 작용은 문화, 과학, 예술, 기술 등 다양한 분야에서 눈부신 발전을 이루게 했습니다. 특히 산업 혁명 이후, 기술의 발전은 인류의 삶에 큰 변화를 가져왔습니다. 기계의 발명과 자동화는 생산성을 크게 향상시켰고, 이는 경제 성장과 생활 수준의 향상을 이끌었습니다. 또한, 인터넷의 등장은 정보의 공유와 소통 방식을 혁신적으로 변화시켰습니다. 현대 사회에서 인터넷과 디지털 기술은 우리의 일상생활에 깊숙이 뿌리내리고 있습니다. 스마트폰, 컴퓨터, 인터넷은 사람들의 소통 방식을 변화시키고, 정보 접근을 용이하게 했습니다. 소셜 미디어는 전 세계 사람들과의 연결을 가능하게 했고, 이는 새로운 형태의 사회적 관계를 형성하게 했습니다. 더불어, 디지털 기술의 발전은 교육, 의료, 상업 등 다양한 분야에서 혁신을 가져왔습니다. 하지만 기술 발전에는 긍정적인 면만 있는 것은 아닙니다. 정보의 과부하는 사람들에게 스트레스를 주고, 개인정보 보호 문제는 심각한 사회적 이슈로 떠오르고 있습니다. 또한, 디지털 격차로 인해 기술 혜택을 누리지 못하는 사람들도 존재합니다. 따라서, 기술 발전이 모두에게 혜택이 될 수 있도록 균형 잡힌 접근이 필요합니다. 환경 문제 역시 현대 사회에서 중요한 이슈로 부상하고 있습니다. 기후 변화, 자원 고갈, 생태계 파괴 등 다양한 환경 문제가 지구 전체에 영향을 미치고 있습니다. 이러한 문제를 해결하기 위해 국제 사회는 다양한 노력을 기울이고 있습니다. 재생 가능 에너지를 개발하고 사용하며, 친환경 제품을 생산하고 소비하며, 환경 보호 운동 등을 통해 노력하고 있습니다. 환경 보호를 위해 개인의 노력도 중요합니다. 일상 생활에서 에너지를 절약하고 재활용하며 자원을 절약하는 등의 작은 실천들이 모여 큰 변화를 만들 수 있습니다. 또한, 기업과 정부는 지속 가능한 발전을 위해 친환경 정책을 적극 추진해야 합니다. 이러한 노력들이 모여 지구를 보호하고, 미래 세대에게 깨끗한 환경을 물려줄 수 있을 것입니다. 결론적으로, 인류는 기술 발전과 환경 보호라는 두 가지 큰 과제를 안고 있습니다. 기술 발전은 우리의 삶을 풍요롭게 하지만, 그 이면에는 다양한 문제들도 존재합니다. 이를 해결하기 위해서는 균형 잡힌 접근과 공동의 노력이 필요합니다. 또한, 환경 보호는 우리의 생존과 직결된 문제로, 개인, 기업, 정부 모두의 노력이 요구됩니다. 이러한 노력이 모여 더 나은 미래를 만들 수 있을 것입니다.",
  );

  // ref 객체 가져오기 위해서 생성 (높이 때문에)
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to scroll height
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  useEffect(() => {
    if (isEditing) {
      adjustTextareaHeight();
    }
  }, [isEditing]); // 수정버튼 눌렀을 때 높이 조정

  const handleSave = () => {
    // 나중에 save 로직 작성
    handleEdit(false); // 수정 완료 후 edit 모드 종료
  };

  return (
    <div className="py-8 px-10 bg-white w-full rounded-[30px] relative">
      <div className="flex items-center space-x-reverse">
        <div className="bg-gray-400 w-[50px] h-[50px] rounded-full" />
        <div className="ml-4">
          <p className="text-h6">개복어</p>
          <p className="text-xs">2024. 07. 15</p>
        </div>
        <div className="ml-auto space-x-2.5">
          {isEditing ? (
            <>
              <button
                className="creator-btn-light-md px-[2.5]"
                type="button"
                onClick={() => handleEdit(false)}
              >
                취소
              </button>
              <button
                className="creator-btn-md px-[2.5]"
                type="button"
                onClick={handleSave}
              >
                수정 완료
              </button>
            </>
          ) : (
            <>
              <button
                className="creator-btn-light-md px-[2.5]"
                type="button"
                onClick={() => handleEdit(true)}
              >
                수정
              </button>
              <button
                className="btn-light-md px-[2.5]"
                type="button"
                onClick={() => handleModal(true, "게시글")}
              >
                삭제
              </button>
            </>
          )}
        </div>
      </div>
      {isEditing ? (
        <div>
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleInputChange}
            className="mt-4 p-5 border w-full border-solid border-gray-700 text-medium text-gray-900 rounded-[15px] resize-none overflow-hidden focus:outline-0"
            rows={1}
          />
          <div className="bg-gray-400 w-[90%] h-[500px] py-5 ml-auto mr-auto mt-4" />
          <div className="flex justify-center mt-4">
            <button
              className="creator-btn-outline-md flex justify-center items-center px-[2.5]"
              type="button"
            >
              <img src={camera} alt="edit" className="mr-2.5" />
              게시글 사진 변경하기
            </button>
          </div>
        </div>
      ) : (
        <>
          <p ref={pRef} className="py-5 w-full text-gray-900 text-medium">
            {inputValue}
          </p>
          <div className="bg-gray-400 w-[90%] h-[500px] py-5 ml-auto mr-auto mt-4" />
        </>
      )}
    </div>
  );
};

export default Content;
