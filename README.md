# Search_Cocktail
칵테일 종류 검색 웹사이트

# 배포 사이트
https://cocktail-life.netlify.app

# Project Tree

# 화면 예시
## Popular 페이지
인기 칵테일을 rank 순서대로 볼 수 있습니다. 

![ezgif com-gif-maker (17)](https://user-images.githubusercontent.com/67466789/206457679-0f116170-300b-41ac-91e7-c65bd6ba268f.gif)

## Search 페이지
### 필터링 및 서치
서치 이름 입력 -> search 버튼 클릭 -> 로딩 -> 검색 결과

![ezgif com-gif-maker (23)](https://user-images.githubusercontent.com/67466789/206460246-2b6ac5cb-37ed-4d23-b06b-5227ce0cd215.gif)

filter 버튼 클릭 -> alcoholic(알코올 여부) 또는 category(카테고리) 또는 ingredient(재료) 선택 -> filter 박스의 apply 버튼 클릭 -> search 버튼 클릭 -> 모든 filtering 조건에 부합하는 검색 결과

![ezgif com-gif-maker (12)](https://user-images.githubusercontent.com/67466789/206460580-c1002b33-6011-48c4-8bc3-27f7f0799e8f.gif)

서치 이름 입력, filtering 을 동시에 하여 조건에 부합하는 검색을 할 수 있습니다. 

서치 이름 입력, filtering 모두 선택x -> search 버튼 -> 오류 모달

 ![ezgif com-gif-maker (22)](https://user-images.githubusercontent.com/67466789/206459565-379efa93-a012-4a3a-811d-616b766e6401.gif)

> 60 분 내에 이미 검색 이력이 있는 input 또는 필터링 검색은 useQuery에 의해 캐싱되어 로딩을 거치지 않고 검색 결과를 보여줍니다. 

*useFilterQuery 코드(활용한 부분도)

## Detail 페이지
검색 결과 또는 popular 페이지 칵테일 사진 클릭 -> 로딩 -> detail 페이지

![ezgif com-gif-maker (13)](https://user-images.githubusercontent.com/67466789/206463881-d715f36b-ba5f-430c-a949-a318e3858b0b.gif)

- [제목, 알코올 여부, 카테고리, 재료, 재료 양, 만드는 방법]을 보여줍니다.
- ingredient의 see more 클릭 -> ingredient를 전부 보여줍니다. 
- close 클릭 -> ingredient를 5개로 제한하여 보여줍니다. 
> 60 분 내에 이미 방문한 칵테일의 경우 useQuery에 의해 캐싱되어 로딩을 거치지 않고 detail 페이지를 보여줍니다. 

### alcoholic, ingredient 재검색
alcoholic(알코올 여부) 또는 category(카테고리) 또는 ingredient(재료) 클릭 -> 로딩 -> search 페이지의 결과

![ezgif com-gif-maker (16)](https://user-images.githubusercontent.com/67466789/206464313-e9fd515e-fbb1-42c3-8583-4d3d5fd07671.gif)
![ezgif com-gif-maker (15)](https://user-images.githubusercontent.com/67466789/206464328-8670d24e-4d6a-4f20-b69b-0a397729ba0e.gif)

- alcoholic 또는 category, ingredient 를 클릭해 해당 조건에 부합하는 칵테일 서치를 할 수 있습니다. 

## 모바일 페이지
### Popular 페이지
![ezgif com-gif-maker (21)](https://user-images.githubusercontent.com/67466789/206465594-98f8b024-049f-4f51-9800-8d21dc14051b.gif)

### Search 페이지
![ezgif com-gif-maker (20)](https://user-images.githubusercontent.com/67466789/206465658-1b50053e-67ae-47fa-9f9b-9f903784c3d2.gif)

### Detail 페이지
![ezgif com-gif-maker (19)](https://user-images.githubusercontent.com/67466789/206465702-99368009-46fd-4593-90c3-8de5e4603ce3.gif)

# Tech & Libraries

#### 라우팅
- react-router-dom

#### 스타일
- scss
- css module

#### 상태 관리
- recoil: 간단한 상태관리를 하게 되어 선택

#### 코딩 컨벤션
- eslint
- prettier
- stylelint

#### api
- axios: json처리의 자동화와 에러 처리의 용이함으로 선택 
- tanstack-query: 서버 데이터를 따로 다루고, 캐싱을 통해 네트워크 요청을 줄이기 위해 사용