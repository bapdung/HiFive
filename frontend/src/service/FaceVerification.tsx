import React, { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";
import client from "../client";
import useAuthStore from "../store/useAuthStore";

interface FaceVerificationProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSuccess: () => void;
}

const FaceVerification: React.FC<FaceVerificationProps> = ({
  isOpen,
  onRequestClose,
  onSuccess,
}) => {
  const token = useAuthStore((state) => state.accessToken);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useState<string>("");
  const [centerStartTime, setCenterStartTime] = useState<number | null>(null);
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
            const memberResponse = await client(token).get(
              `/api/member/identification`,
            );
            const { identificationImg } = memberResponse.data;
            console.log(identificationImg);

            const response = await axios.post<{
              verified: boolean;
              error?: string;
            }>(`${process.env.REACT_APP_FLASK_END_POINT}/verify-face`, {
              user_image: base64Image,
              id_card_image: identificationImg,
            });

            if (response.data.error) {
              setResult(`Error: ${response.data.error}`);
            } else if (response.data.verified) {
              setResult("본인 인증 완료");
              onSuccess();
            } else {
              setResult("너 누구야");
            }
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setResult(`Error occurred: ${error.message}`);
          } else {
            setResult(`Error occurred: ${(error as Error).message}`);
          }
        }
      }
    }
  }, [onSuccess, token]);

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 max-w-full text-center">
        <h1 className="text-xl mb-4">Face Verification</h1>
        <video
          ref={videoRef}
          className="w-72 h-72 border border-gray-300 rounded mb-4"
          autoPlay
        >
          <track kind="captions" />
        </video>
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          style={{ display: "none" }}
        />
        <div className="mb-4">{result}</div>
        <button
          type="button"
          className="btn btn-primary mb-2"
          onClick={captureAndVerify}
        >
          본인 확인
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onRequestClose}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default FaceVerification;
