import idCard1 from "../../assets/img/idcard-ex1.png";
import idCard2 from "../../assets/img/idcard-ex2.png";

function IdCard() {
  return (
    <div className="flex justify-between p-10">
      <div className="flex flex-col justify-center mr-14">
        <div className="w-[500px] h-[300px] bg-gray-300 rounded-3xl" />
        {/* <button type="button" className="btn-lg  mt-10">
          등록 하기
        </button> */}
        <div className="flex justify-center items-center bg-gray-500 h-11 rounded-3xl mt-10 text-white">
          등록 완료
        </div>
      </div>
      <div>
        <div className="mb-12">
          <h5 className="text-h5 mb-2.5">왜 나의 신분증을 제출해야 하나요?</h5>
          <p className="text-small">
            안녕하세요, HiFive 를 이용해 주셔서 감사합니다. <br /> 저희 플랫폼은
            팬미팅의 공정성과 안전한 운영을 위해 본인 확인 절차를 강화하고
            있습니다. <br /> 이를 위해 팬미팅 입장 시 미리 마이페이지에 등록하신
            신분증을 기준으로 얼굴 일치율을 비교하여 본인 확인을 진행하고자
            합니다. <br />
            <br />
            1. 본인 확인 : 예매한 티켓을 본인만 사용할 수 있도록 하여 불법 티켓
            양도 및 재판매를 방지하고, 공정한 티켓 구매 환경을 조성합니다.
            <br />
            2. 안전한 팬미팅 운영 : 팬미팅 참가자의 신원을 정확히 파악함으로써
            안전하고 신뢰할 수 있는 팬미팅 환경을 제공합니다.
            <br />
            3. 개인 정보 보호 : 개인 정보는 안전하게 저장되며, 본인 확인 용도
            외에는 사용되지 않습니다.
          </p>
        </div>
        <div className="mb-12">
          <h5 className="text-h5 mb-2.5">신분증은 어떻게 제출해야 하나요?</h5>
          <p className="text-small">
            개인 정보 보호를 위해 개인 정보 마스킹 (가림처리) 이 필요합니다.{" "}
            <br />
            아래 예시 이미지를 참고하여 신분증에 포함된 개인 정보를 보호하세요.{" "}
            <br />
            모든 문서는 암호화되어 저장되며, 확인 후 즉시 파기됩니다.
          </p>
        </div>
        <div className="mb-12">
          <h5 className="text-h5 mb-2.5">예시 이미지</h5>
          <div className="flex">
            <img
              src={idCard1}
              alt="예시이미지1"
              className="w-[300px] h-[199px] rounded-xl mr-7"
            />
            <img
              src={idCard2}
              alt="예시이미지2"
              className="w-[300px] h-[199px] rounded-xl"
            />
          </div>
        </div>
        <div className="mb-12">
          <h5 className="text-h5 mb-2.5">사용 가능한 신분증</h5>
          <ol className="text-small list-decimal ml-6">
            <li>주민등록증</li>
            <li>운전면허증</li>
            <li>여권 (대한민국 발행)</li>
            <li>청소년증</li>
            <li>장애인 복지 카드 (단, 신용 카드 및 직불 카드형 제외)</li>
            <li>
              주민등록증 발급 신청 확인서 (유효 기간 이내의 사진 및 주요 정보에
              테이핑 처리된 것에 한함)
            </li>
            <li>
              청소년증 발급 신청 확인서 (유효 기간 이내의 사진 및 주요 정보에
              테이핑 처리된 것에 한함)
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default IdCard;
