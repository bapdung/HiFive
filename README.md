## 목차

[1. 프로젝트 소개](#1)
[2. 서비스 화면](#2)
[3. 프로젝트 산출물](#3)

<div id="1"></div>

# <img src="img/right2.png" alt="HiFive Logo" width="40" /> 프로젝트 소개

### <img src="img/logo-square.png" alt="HiFive Logo" width="40" /> HiFive - 크리에이터와 팬의 하이파이브<img src="img/logo-square.png" alt="HiFive Logo" width="40" />

![alt text](img/Landing.png)
크리에이터와 팬이 추억을 마주하는 웹기반 팬미팅 플랫폼

<br >

### 1. 로고

![alt text](img/Logo.png)

- 크리에이터와 팬이 손뼉을 마주하는 장면을 형상화
  - Primary : <span style="background-color: #FF6392; color: white;">#FF6392</span>
  - Secondary : <span style="background-color: #4FB2FF; color: white;">#4FB2FF</span>
- 서비스 이용자를 크리에이터와 팬으로 분리하여 고려
- 크리에이터만 접속 가능한 팬미팅 관리 페이지는 <span style="background-color: #4FB2FF; color: white;">Secondary</span> 로 표현하여 사용자가 관리 페이지임을 명확히 인식할 수 있도록 함

### 2. 서비스 목적

![alt text](img/ServiceBackground.png)

- 크리에이터 시장 규모가 급증했음에도 크리에이터와 팬을 위한 소통의 창구가 부족함
- 버츄얼 유튜버, 해외에 거주하는 유튜버 등 대면 팬미팅이 어려운 크리에이터도 팬과 소통을 즐길 수 있도록 함

### 3. 차별점

![alt text](img/CreateFanmeeting.png)

- 다양한 팬미팅 템플릿을 제공하여 간편하게 팬과의 특별한 추억을 남길 수 있음
  - **O/X 게임, Q&A, 사연 전달, 포토 타임 등 다양한 코너 템플릿 제공**
- 오프라인으로 진행하기 어려운 크리에이터를 위한 온라인 플랫폼 제공
- 소속사가 없는 영세 크리에이터도 쉽게 이용 가능
- 입장 전 **본인 확인 절차**를 통해 티켓 암표 거래 방지

### 4. 아키텍처

![alt text](img/arch.png)

### 5. 기술스택

[![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1723632215488?alt=media&token=20bc5978-d3b0-4065-9218-21ee628bae50)](https://github.com/msdio/stackticon)

<div id="2"></div>

# <img src="img/right3.png" alt="HiFive Logo" width="40" /> 서비스 화면

### ✨ 랜딩화면(서비스 소개 페이지)

![Description of the image](./img/[공통]랜딩화면.gif)

- HiFive 를 처음 접하는 사용자들도 어떤 서비스인지 알 수 있도록 간단히 서비스를 소개함
- 입점한 크리에이터를 소개함

<br>

### 🔑 카카오 로그인

![Description of the image](./img/[공통]로그인.gif)

- 사용자들의 접근성과 편의성을 높이기 위해 카카오 로그인으로 진행
- 초기 닉네임은 본인 카카오톡 이름이지만, 추후 닉네임 변경 가능하다.

<br>

### 📌 메인화면

![Description of the image](./img/[공통]메인화면.gif)

- 내가 예매한 티켓을 바로 확인할 수 있어 사용자 편의 증가
  - 예매한 팬미팅을 티켓 형식으로 디자인
  - 팬미팅 시작 30분 전부터 입장 버튼 활성화
- 본인이 팔로우한 크리에이터를 모아볼 수 있다.
  - 전체 크리에이터 보기를 통해 전체 크리에이터 목록으로 이동할 수 있음
- 예매 가능한 팬미팅 찾아보기 버튼
  - 전체 팬미팅 목록으로 이동한다.
- 나의 팬미팅 내역 보러가기 버튼
  - 나의 활동으로 이동하여 나와 관련된 각종 정보를 확인할 수 있다.

<br>

### 🔍 프로필검색

![Description of the image](./img/[공통]프로필검색.gif)

- Elastic Search 를 이용하여 사용자들이 쉽게 원하는 크리에이터를 검색할 수 있게 함
- 목록은 가나다순, 최신순, 활동일순으로 정렬할 수 있다.
  - 목록 출력은 성능 개선을 위해 무한 스크롤로 구현
  - 스크롤 이벤트를 감지하여 추가적인 api 를 호출하고 목록을 받아온다.
- 선택한 크리에이터의 프로필을 클릭하면 해당 크리에이터의 프로필 페이지로 이동한다.

<br>

### 🔊 [크리에이터] 크리에이터 프로필 작성, 수정, 삭제

![Description of the image](./img/[크리에이터]게시판.gif)

- 유저는 크리에이터 프로필 페이지에서 팬미팅에 관련한 정보를 얻을 수 있다.
- 예정 팬미팅, 종료 팬미팅을 한눈에 확인할 수 있음
- 크리에이터가 팬들에 쓰는 게시판이 있어 팬미팅 관련 정보를 친근하게 전달할 수 있다.

<br>

### 📚 [크리에이터] 사연, 질문, OX게임 관리

![Description of the image](./img/[크리에이터]카테고리생성.gif)

### 🎪 [크리에이터] 팬미팅 생성

![Description of the image](./img/[크리에이터]팬미팅생성.gif)

### 💚 [팬] 크리에이터 프로필 조회

![Description of the image](./img/[팬]게시글.gif)

### 👶 [팬] 마이페이지

![Description of the image](./img/[팬]마이페이지.gif)

- 팬은 상단 네비게이션 바에 있는 마이 페이지 버튼 또는 나의 활동 보러가기 버튼을 통해 마이페이지로 이동할 수 있다.

1. 나의 활동 탭
   - 내가 예매한 팬미팅 관련 정보를 볼 수 있다. (예매한 팬미팅, 종료한 팬미팅)
2. 내 정보 수정 탭
   - 닉네임과 프로필 사진을 변경할 수 있다.
   - 닉네임은 중복 검색을 진행하여 중복될 경우 해당 닉네임을 사용할 수 없다.
3. 추억 갤러리 탭
   - 과거에 참여했던 팬미팅에서 찍은 사진이 저장된다.
   - 사진 찍는 순간을 영상으로 캡쳐해서 언제든지 추억할 수 있다.
4. 신분증 등록 탭
   - 팬미팅 시작 전 본인인증에 이용할 신분증을 등록한다.
   - 신분증 등록 관련 안내 문구가 우측에 출력된다.
   - 신분증은 계정 양도 문제로 인해 한 번 등록하면 변경할 수 없다.
5. 포인트 관리 탭
   - 팬미팅 예매에 사용할 포인트를 충전할 수 있다.
   - 충전 내역 조회에서 본인이 충전한 내용을 한 눈에 볼 수 있다.
   - 사용 내역 조회에서 본인이 사용한 포인트를 조회할 수 있다.

### 📖 [팬] 사연, 질문 작성

![Description of the image](./img/[팬]팬미팅사연질문작성.gif)

### 📖 [팬] 본인 확인

- 등록된 신분증과 웹캠 이미지 유사도 확인

![Description of the image](./img/[팬]본인확인.gif)

<div id="3"></div>

# <img src="img/right5.png" alt="HiFive Logo" width="40" /> 프로젝트 산출물

### 📃 API 명세서(Swagger)

![Description of the image](./img/API명세서.gif)

### 🌞 요구사항정의서

![Description of the image](./img/요구사항정의서.gif)

### 🎨 피그마

![Description of the image](./img/피그마.gif)

### 🔧 ERD

![Description of the image](./img/hifive-erd.png)

### 📂 프로젝트 구조

#### Backend

<details>
  <summary>펼치기 / 접기</summary>

```
📦main
 ┣ 📂java
 ┃ ┗ 📂com
 ┃ ┃ ┗ 📂ssafy
 ┃ ┃ ┃ ┗ 📂hifive
 ┃ ┃ ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┣ 📂board
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂param
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┣ 📂category
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┣ 📂comment
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂param
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┣ 📂creator
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂param
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┣ 📂fanmeeting
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂param
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┣ 📂follow
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┣ 📂member
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┣ 📂openvidu
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┣ 📂photo
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂param
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┣ 📂point
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂param
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┣ 📂question
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂param
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┣ 📂quiz
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┣ 📂reservation
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┣ 📂s3
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┣ 📂story
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂param
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┗ 📂timetable
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┣ 📂global
 ┃ ┃ ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂jwt
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂oauth
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂redis
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂s3
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂websocket
 ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┣ 📂error
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂response
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂type
 ┃ ┃ ┃ ┃ ┃ ┣ 📂exception
 ┃ ┃ ┃ ┃ ┃ ┣ 📂infra
 ┃ ┃ ┃ ┃ ┃ ┗ 📂util
 ┗ 📂resources
 ┃ ┣ 📂static
 ┃ ┣ 📂templates
```

</details>

#### Frontend

<details>
  <summary>펼치기 / 접기</summary>

```
📦src
 ┣ 📂assets
 ┃ ┣ 📂Fanmeeting
 ┃ ┣ 📂icons
 ┃ ┃ ┣ 📂loading
 ┃ ┃ ┣ 📂logo
 ┃ ┃ ┣ 📂sidebar
 ┃ ┣ 📂img
 ┃ ┣ 📂joinCreator
 ┃ ┗ 📂temp
 ┣ 📂components
 ┃ ┣ 📂Navbar
 ┣ 📂pages
 ┃ ┣ 📂BoardPage
 ┃ ┣ 📂CreatorListPage
 ┃ ┣ 📂CreatorOnly
 ┃ ┣ 📂FanmeetingPage
 ┃ ┣ 📂JoinCreatorPage
 ┃ ┣ 📂LandingPage
 ┃ ┣ 📂MainPage
 ┃ ┣ 📂Mypage
 ┃ ┣ 📂ProfilePage
 ┃ ┣ 📂TicketPage
 ┣ 📂service
 ┣ 📂store
 ┣ 📂utils

```

</details>

# <img src="img/right1.png" alt="HiFive Logo" width="40" /> 팀원소개

| <img src="./img/혁진.jpg" width="100%" height="100"> | <img src="./img/민서.jpg" width="100%" height="100"> | <img src="./img/지흔.jpg" width="100%" height="100"> | <img src="./img/서희.jpg" width="100%" height="100"> | <img src="./img/민채.jpg" width="100%" height="100"> | <img src="./img/민서.jpg" width="100%" height="100"> |
| :--------------------------------------------------: | :--------------------------------------------------: | :--------------------------------------------------: | :--------------------------------------------------: | :--------------------------------------------------: | :--------------------------------------------------: |
|                        김혁진                        |                        강민서                        |                        서지흔                        |                         서희                         |                        김민채                        |                        조원우                        |
|                     Backend 팀장                     |                       Backend                        |                       Backend                        |                    Frontend 팀장                     |                       Frontend                       |                       Frontend                       |
|        인프라, CI/CD, DB 및 API 설계 및 구현         |                   API 설계 및 구현                   |                   API 설계 및 구현                   |                        UI/UX                         |                        UI/UX                         |                        UI/UX                         |
