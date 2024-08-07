import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import client from "../../client";

import idCard1 from "../../assets/img/idcard-ex1.png";
import idCard2 from "../../assets/img/idcard-ex2.png";

function IdCard() {
  const token = useAuthStore((state) => state.accessToken);

  const [status, setStatus] = useState<number>(1); // 사진 선택X(1), 사진 선택O 등록X (2), 사진 등록O(0)
  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const [idCardName, setIdCardName] = useState<string | null>(null);
  const [idCardSrc, setIdCardSrc] = useState<string | ArrayBuffer | null>(null);
  const [name, setName] = useState<string>("");

  const inputIdCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdCardSrc(reader.result);
      };
      reader.readAsDataURL(file);
      setIdCardName(file.name);
      setIdCardFile(file);
      setStatus(2);
    }
  };
  const inputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const uploadS3 = async (path: string, file: File) => {
    const response = await fetch(
      new Request(path, {
        method: "PUT",
        body: file,
        headers: new Headers({
          "Content-Type": file.type,
        }),
      }),
    );

    return response.url;
  };

  const getS3url = async () => {
    if (idCardName && token && idCardFile) {
      const response = await client(token).post(
        `/api/s3/upload/${idCardName}`,
        {
          prefix: "test",
        },
      );

      const { path } = response.data;
      const url = uploadS3(path, idCardFile);

      return url;
    }

    return null;
  };

  const postIdCard = async () => {
    if (idCardName) {
      const url = await getS3url();

      if (url && token) {
        const [idCardImg] = url.split("?");

        const response = await client(token).post(
          "/api/member/identification",
          {
            identificationImg: idCardImg,
            name,
          },
        );

        if (response.status === 200) {
          setStatus(0);
          alert("신분증 등록이 완료되었습니다.");
        }
      }
    }
  };

  useEffect(() => {
    const getIdImg = async () => {
      if (token) {
        const response = await client(token).get("/api/member/identification");

        if (response.status === 200) {
          if (response.data.identificationImg) {
            setIdCardSrc(response.data.identificationImg);
            setName(response.data.name);
            setStatus(0);
          }
        }
      }
    };

    getIdImg();
  }, [token]);

  return (
    <div className="flex justify-between p-10">
      <div className="flex flex-col mr-14">
        {idCardSrc ? (
          <img
            src={idCardSrc as string}
            alt="신분증 이미지"
            className="w-[500px] h-[300px] bg-gray-300 rounded-3xl"
          />
        ) : (
          <div className="w-[500px] h-[300px] bg-gray-300 rounded-3xl" />
        )}
        {status !== 0 ? (
          <>
            <label htmlFor="idCardImg">
              <div className="flex justify-center items-center btn-light-lg mt-10 hover:cursor-pointer">
                {status === 1 ? "사진 선택하기" : "사진 수정하기"}
              </div>
              <input
                type="file"
                id="idCardImg"
                accept="image/*"
                onChange={inputIdCard}
                className="hidden"
              />
            </label>
            {status === 2 ? (
              <>
                <input
                  type="text"
                  placeholder="이름 입력"
                  value={name}
                  onChange={inputName}
                  className="mt-5 p-2 border border-gray-300 rounded"
                />
                <div
                  className="flex justify-center items-center btn-lg mt-5 hover:cursor-pointer"
                  onClick={postIdCard}
                  role="presentation"
                >
                  등록하기
                </div>
              </>
            ) : null}
          </>
        ) : (
          <div className="flex justify-center items-center bg-gray-500 h-11 rounded-3xl mt-10 text-white hover:cursor-not-allowed">
            등록 완료
          </div>
        )}
      </div>
      <div>
        <div className="mb-8">
          <h5 className="text-h5 mb-2.5 font-semibold">
            왜 나의 신분증을 제출해야 하나요?
          </h5>
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
        <div className="mb-8">
          <h5 className="text-h5 mb-2.5 font-semibold">
            신분증은 어떻게 제출해야 하나요?
          </h5>
          <p className="text-small">
            개인 정보 보호를 위해 개인 정보 마스킹 (가림처리) 이 필요합니다.{" "}
            <br />
            아래 예시 이미지를 참고하여 신분증에 포함된 개인 정보를 보호하세요.{" "}
            <br />
            모든 문서는 암호화되어 저장되며, 확인 후 즉시 파기됩니다.
          </p>
        </div>
        <div className="mb-8">
          <h5 className="text-h5 mb-2.5 font-semibold">예시 이미지</h5>
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
        <div className="mb-8">
          <h5 className="text-h5 mb-2.5 font-semibold">사용 가능한 신분증</h5>
          <ol className="text-small list-decimal ml-6">
            <li>주민등록증</li>
            <li>운전면허증</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default IdCard;
