# Python 3.10 버전을 사용
FROM python:3.10-slim

# 작업 디렉토리 설정
WORKDIR /app

# 시스템 패키지 업데이트 및 빌드 도구 설치
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

# 필요한 패키지 복사 및 설치
COPY requirements.txt requirements.txt

# 문제 패키지 별도 설치 (예: dlib)
RUN pip install --no-cache-dir dlib==19.22.1

# 나머지 패키지 설치
RUN pip install --no-cache-dir -r requirements.txt

# 모델 파일 복사
COPY model/shape_predictor_68_face_landmarks.dat model/shape_predictor_68_face_landmarks.dat

# 애플리케이션 파일 복사
COPY . .

# Flask 애플리케이션 실행
CMD ["python", "app.py"]
