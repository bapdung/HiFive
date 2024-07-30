function Info() {
  const selfcheckInfo = [
    {
      key: 1,
      value:
        "본 공연은 암표 거래 및 불법 양도를 방지하기 위해 공연 입장 전 본인확인을 진행합니다.",
    },
    {
      key: 2,
      value:
        "티켓 소지 시라도 예매자 본인 명의와 일치하는 신분증 확인이 되지 않는 경우, 입장이 제한되오니 반드시 본인확인이 가능한 지정 유효 신분증으로 본인 인증을 진행해주십시오.",
    },
    { key: 3, value: "티켓 예매자와 실 관람자의 명의가 모두 일치해야 합니다." },
    {
      key: 4,
      value:
        "티켓 예매 시 반드시 본인 명의의 HiFive ID를 개설 바랍니다. 만 14세 미만 고객도 본인 명의의 HiFive ID로 예매해야 합니다.",
    },
  ];

  const cancelInfo = [
    { key: 1, condition: "예매 후 7일 이내", value: "무료" },
    {
      key: 2,
      condition: "예매 후 8일 ~ 관람일 10일전까지",
      value: "장당 4,000원 (티켓금액의 10% 한도)",
    },
    { key: 3, condition: "관람일 9일전 ~ 7일전까지", value: "티켓금액의 10%" },
    { key: 4, condition: "관람일 6일전 ~ 3일전까지", value: "티켓금액의 20%" },
    { key: 5, condition: "관람일 2일전", value: "티켓금액의 30%" },
  ];
  return (
    <div className="mt-10">
      <h1 className="text-gray-900 text-h5 mb-5 font-semibold">예매안내</h1>
      <h2 className="text-h6 mb-2.5 text-gray-900 font-semibold">
        본인 확인 안내
      </h2>
      <ul className="text-medium list-disc">
        {selfcheckInfo.map((info) => (
          <li className="ml-6 text-gray-900" key={info.key}>
            {info.value}
          </li>
        ))}
      </ul>
      <h2 className="text-gray-900 text-h6 mt-5 mb-2.5 font-semibold">
        예매 취소 조건
      </h2>
      <ul className=" text-medium list-disc mb-2.5">
        <li className="mb-2.5 ml-6 text-gray-900">
          취소일자에 따라서 아래와 같이 취소수수료가 부과됩니다. 예매일 기준보다
          관람일 기준이 우선 적용됩니다. 단, 예매 당일 밤 12시 이전 취소 시
          취소수수료가 없습니다. (취소기한 내에 한함)
        </li>
      </ul>
      <div className="overflow-x-auto mb-10 border border-gray-500 rounded-2xl">
        <table className="text-medium text-gray-900 min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <td className="py-2.5 px-2.5 rounded-tl-2xl border-r border-b border-gray-500 font-semibold">
                취소일
              </td>
              <td className="py-2.5 px-2.5 rounded-tr-2xl border-b border-gray-500 font-semibold">
                취소수수료
              </td>
            </tr>
          </thead>
          <tbody>
            {cancelInfo.map((info, index) => {
              const isLastRow = index === cancelInfo.length - 1;
              return (
                <tr key={info.key}>
                  <td
                    className={`py-2.5 px-2.5 ${isLastRow ? "rounded-bl-2xl border-r border-gray-500" : "border-r border-b border-gray-500"}`}
                  >
                    {info.condition}
                  </td>
                  <td
                    className={`py-2.5 px-2.5 ${isLastRow ? "rounded-br-2xl border-gray-500" : "border-b border-gray-500"}`}
                  >
                    {info.value}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <h2 className="text-gray-900 text-h6 mt-5 mb-2.5 font-semibold">
        취소 환불 방법
      </h2>
      <ul className="text-medium list-disc">
        <li className="ml-6">
          &apos;마이페이지 → 예매내역&apos; 에서 직접 취소 또는 고객센터를
          통해서 예매를 취소할 수 있습니다.
        </li>
      </ul>
    </div>
  );
}

export default Info;
