# Data-Visualization

## ✏️ 실행 방법

프로젝트 셋업

1. 레포지토리 클론
2. develop 브랜치로 이동
3. npm install
4. npm run server # 서버 실행
5. npm start # 프론트 실행

접속방법

- http://localhost:1234 로 접속

## ✏️ 사용 기술 및 라이브러리

Front

- javascript (vanilla)
- html5
- css3
- canvas

Backend

- node.js
- express
- csv-parse
- fs

## ✏️ 구현 모습

산점도 (scatter plot) 구현

<image src = "https://user-images.githubusercontent.com/26290571/143884440-edeab769-669f-4eb4-ae5f-952b6d9d0e36.png" width="40%"/>

## ✏️ 구현 기능

- [x] 산점도 표시 기능
- [x] 세로 축 선택 기능 (숫자로 된 컬럼값만 선택 가능)
- [x] 카테고리 선택 가능 (일부만 선택 가능)

## ✏️ 아쉬운 것

- profit rate와 다른 값들의 연관성을 보여주는 모델로 산점도 플롯이 가장 유용할 것이라고 판단하여 산점도를 골랐으나,\
  값이 너무 다양하여 오히려 데이터를 파악하기 어려운 경우가 발생함
- 서버 api를 만들어서 원하는 데이터만 받아도 될 것 같다
- 안 예쁘다

## ✏️ 테스트 환경

- macOS
- 4k 27인치 모니터
- Chrome 버전 95.0.4638.54(공식 빌드) (arm64)
