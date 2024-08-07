import React, { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import client from "../client";
import useAuthStore from "../store/useAuthStore";
import loadingGif from "../assets/img/me.png"; // 로딩 애니메이션 이미지 경로

interface FaceVerificationProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSuccess: () => void;
  fanmeetingId: number;
}

const FaceVerification: React.FC<FaceVerificationProps> = ({
  isOpen,
  onRequestClose,
  onSuccess,
  fanmeetingId,
}) => {
  const token = useAuthStore((state) => state.accessToken);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useState<string>("");
  const [centerStartTime, setCenterStartTime] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태 추가
  const centerThreshold = 50;
  const minCenterTime = 1.0;

  useEffect(() => {
    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Error accessing webcam: ", err);
      }
    };
    getVideo();
  }, []);

  const detectFace = useCallback(
    () => ({ x: 100, y: 100, width: 100, height: 100 }),
    [],
  );

  const captureAndVerify = useCallback(async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        const base64Image = dataUrl.split(",")[1];

        try {
          if (token) {
            setLoading(true); // 로딩 시작
            const memberResponse = await client(token).get(
              `/api/member/identification`,
            );
            const { identificationImg } = memberResponse.data;

            const response = await axios.post<{
              verified: boolean;
              error?: string;
            }>(
              `${process.env.REACT_APP_FLASK_END_POINT}/service/verification`,
              {
                user_image: base64Image,
                id_card_image: identificationImg,
                fanmeeting_id: fanmeetingId,
              },
            );

            setLoading(false); // 로딩 종료
            if (response.data.error) {
              setResult(`Error: ${response.data.error}`);
            } else if (response.data.verified) {
              onSuccess();
            } else {
              setResult("인증 실패");
            }
          }
        } catch (error) {
          setLoading(false); // 로딩 종료
          if (axios.isAxiosError(error)) {
            setResult(`Error occurred: ${error.message}`);
          } else {
            setResult(`Error occurred: ${(error as Error).message}`);
          }
        }
      }
    }
  }, [onSuccess, token, fanmeetingId]);

  const checkFacePosition = useCallback(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Face detection
        const faceDetected = detectFace();

        if (faceDetected) {
          const { x, y, width, height } = faceDetected;
          const faceCenter = { x: x + width / 2, y: y + height / 2 };
          const frameCenter = { x: canvas.width / 2, y: canvas.height / 2 };
          const distanceToCenter = Math.sqrt(
            (faceCenter.x - frameCenter.x) ** 2 +
              (faceCenter.y - frameCenter.y) ** 2,
          );

          if (distanceToCenter < centerThreshold) {
            if (centerStartTime === null) {
              setCenterStartTime(Date.now());
            } else {
              const elapsedTime = (Date.now() - (centerStartTime || 0)) / 1000;
              if (elapsedTime >= minCenterTime) {
                captureAndVerify();
              }
            }
          } else {
            setCenterStartTime(null);
          }
        } else {
          setCenterStartTime(null);
        }
      }
    }
  }, [captureAndVerify, centerStartTime, detectFace]);

  useEffect(() => {
    const interval = setInterval(checkFacePosition, 500);
    return () => clearInterval(interval);
  }, [checkFacePosition]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-w-full text-center">
        <h1 className="text-xl mb-4">본인 확인</h1>
        <video ref={videoRef} className="w-full h-72 rounded mb-4" autoPlay>
          <track kind="captions" />
        </video>
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          style={{ display: "none" }}
        />
        <div className="mb-4">
          {loading ? (
            <>
              <p>본인 확인 중...</p>
              <img src={loadingGif} alt="loading" className="mx-auto" />
            </>
          ) : (
            result || "카메라 가운데로 와 주세요."
          )}
        </div>
        {!loading && (
          <>
            <button
              type="button"
              className="btn-light-lg mb-2 mr-5"
              onClick={captureAndVerify}
            >
              본인 확인
            </button>
            <button
              type="button"
              className="btn-light-lg"
              onClick={onRequestClose}
            >
              취소
            </button>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default FaceVerification;
