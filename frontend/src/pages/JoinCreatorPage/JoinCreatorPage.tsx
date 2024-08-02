import logoIcon from "../../assets/joinCreator/logoIcon.png";
import explain1 from "../../assets/joinCreator/explain1.png";
import explain2 from "../../assets/joinCreator/explain2.png";
import explain3 from "../../assets/joinCreator/explain3.png";
import explain4 from "../../assets/joinCreator/explain4.png";
import explain5 from "../../assets/joinCreator/explain5.png";

import emailIcon from "../../assets/joinCreator/emailIcon.png";
import textIcon from "../../assets/joinCreator/textIcon.png";
import stampIcon from "../../assets/joinCreator/stampIcon.png";

import oneIcon from "../../assets/joinCreator/one.png";
import twoIcon from "../../assets/joinCreator/two.png";
import threeIcon from "../../assets/joinCreator/three.png";

function JoinCreator() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full items-center mt-[80px]">
        <img
          src={logoIcon}
          alt="로고"
          className="w-[149.04px] h-[150.35px] rounded-lg"
        />
        <h4 className="text-h4 font-semibold mt-[20px]">크리에이터 입점신청</h4>
      </div>
      <div className="flex flex-col justify-center items-center mt-[50px] mb-[90px]">
        <h1 className="text-h1 font-semibold">
          HiFive에서 팬들과의 소중한 추억을 만들어 보세요!
        </h1>
        <h1 className="text-h1 font-semibold">언제 어디서나, 쉽고 즐겁게.</h1>
      </div>
      <div className="flex w-full justify-between px-7 mb-[40px]">
        <div className="w-[240px] box-border px-[20px] py-[40px] flex flex-col justify-center items-center rounded-xl bg-white">
          <img
            src={explain1}
            alt="소통이미지"
            className="w-[200px] h-[200px] rounded-xl"
          />
          <h5 className="text-h5 font-semibold mt-[30px] mb-[10px]">
            특별한 소통의 장
          </h5>
          <p className="text-small font-semibold text-center">
            실시간 채팅과 다양한 인터랙션으로 팬들과 더욱 가까워질 수 있어요.
          </p>
        </div>
        <div className="w-[240px] px-[20px] py-[40px] flex flex-col justify-center items-center rounded-xl bg-white">
          <img
            src={explain1}
            alt="소통이미지"
            className="w-[200px] h-[200px] rounded-xl"
          />
          <h5 className="text-h5 font-semibold mt-[30px] mb-[10px]">
            특별한 소통의 장
          </h5>
          <p className="text-small font-semibold text-center">
            실시간 채팅과 다양한 인터랙션으로 팬들과 더욱 가까워질 수 있어요.
          </p>
        </div>
        <div className="w-[240px] px-[20px] py-[40px] flex flex-col justify-center items-center rounded-xl bg-white">
          <img
            src={explain2}
            alt="세션이미지"
            className="w-[200px] h-[200px] rounded-xl"
          />
          <h5 className="text-h5 font-semibold mt-[30px] mb-[10px]">
            즐거운 세션
          </h5>
          <p className="text-small font-semibold text-center">
            모두가 참여하는 즐거운 세션을 통해 어색함을 풀고 쉽게 즐길 수
            있어요.
          </p>
        </div>
        <div className="w-[240px] px-[20px] py-[40px] flex flex-col justify-center items-center rounded-xl bg-white">
          <img
            src={explain3}
            alt="사진보는이미지"
            className="w-[200px] h-[200px] rounded-xl"
          />
          <h5 className="text-h5 font-semibold mt-[30px] mb-[10px]">
            추억을 선물하세요.
          </h5>
          <p className="text-small font-semibold text-center">
            팬들에게 특별한 추억을 선물하는 다양한 도구를 제공하고 있어요.
          </p>
        </div>
        <div className="w-[240px] px-[20px] py-[40px] flex flex-col justify-center items-center rounded-xl bg-white">
          <img
            src={explain4}
            alt="컴퓨터이미지"
            className="w-[200px] h-[200px] rounded-xl"
          />
          <h5 className="text-h5 font-semibold mt-[30px] mb-[10px]">
            쉽고 간편하게
          </h5>
          <p className="text-small font-semibold text-center">
            웹에서 바로 팬미팅 일정을 설정하고 쉽게 관리할 수 있어요.
          </p>
        </div>
        <div className="w-[240px] px-[20px] py-[40px] flex flex-col justify-center items-center rounded-xl bg-white">
          <img
            src={explain5}
            alt="화상통화하는이미지"
            className="w-[200px] h-[200px] rounded-xl"
          />
          <h5 className="text-h5 font-semibold mt-[30px] mb-[10px]">
            제약 없이 자유롭게
          </h5>
          <p className="text-small font-semibold text-center">
            대관, 일정 조율, .. 머리 아픈 문제는 제쳐두고, 팬을 만나러 가요.
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full bg-white items-center pt-[40px] pb-20">
        <h1 className="text-h1 font-semibold mb-10">신청 절차 안내</h1>
        <div className="flex w-full justify-between px-28">
          <div className="w-[400px] h-[300px] bg-gray-100 p-[20px] rounded-3xl relative">
            <img
              src={emailIcon}
              alt="이메일아이콘"
              className="w-[75px] h-[75px]"
            />
            <h4 className="text-h4 font-semibold py-[20px]">
              정보 제공 및 입점 신청
            </h4>
            <p className="text-medium">
              현재 활동 중인 간단한 크리에이터 정보(활동명, URL)를
              <span className="text-secondary">creator@hifive.com</span> 으로
              제출해주세요.
            </p>
            <img
              src={oneIcon}
              alt="1아이콘"
              className="w-[24px] h-[24px] absolute bottom-5 right-5"
            />
          </div>
          <div className="w-[400px] h-[300px] bg-gray-100 p-[20px] rounded-3xl relative">
            <img
              src={textIcon}
              alt="계약서아이콘"
              className="w-[75px] h-[75px]"
            />
            <h4 className="text-h4 font-semibold py-[20px]">
              신청서 및 계약서 신청
            </h4>
            <p className="text-medium">
              담당자가 신청 내용을 검토하고 일주일 내 회신드립니다. 이 때,
              필요한 신청서와 계약서를 다시 안내해드립니다.
            </p>
            <img
              src={twoIcon}
              alt="2아이콘"
              className="w-[24px] h-[24px] absolute bottom-5 right-5"
            />
          </div>
          <div className="w-[400px] h-[300px] bg-gray-100 p-[20px] rounded-3xl relative">
            <img
              src={stampIcon}
              alt="도장아이콘"
              className="w-[75px] h-[75px]"
            />
            <h4 className="text-h4 font-semibold py-[20px]">
              최종 승인 및 계약 진행
            </h4>
            <p className="text-medium">
              최종 검토된 내용을 바탕으로 입점 승인이 이뤄지면, HiFive 공식
              크리에이터로서 개인 팬미팅을 열 수 있어요!
            </p>
            <img
              src={threeIcon}
              alt="3아이콘"
              className="w-[24px] h-[24px] absolute bottom-5 right-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinCreator;
