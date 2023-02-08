# :pushpin: cocktail life
사용자가 원하는 요소의 필터링을 통한 맞춤형 칵테일 검색 서비스

## 1. 배포 사이트
https://cocktail-life.netlify.app

## 2. 제작 기간 & 참여 인원
- 2022.8.3 - 9.4(+ 리팩토링 10.16-)
- 개인 프로젝트

## 3. 사용 기술 및 라이브러리
- react v18
- typescript
- **라우팅**
  - react-router-dom v6
- **스타일**
   - scss
   - css module
- **상태 관리**
  - recoil
- **코딩 컨벤션**
   - eslint
   - prettier
   - stylelint
- **Api & Cache**
   - axios
   - tanstack-query v4

## 4. 화면 예시

### 4.1. Popular 페이지
인기 칵테일을 rank 순서대로 볼 수 있습니다. 

![ezgif com-gif-maker (17)](https://user-images.githubusercontent.com/67466789/206457679-0f116170-300b-41ac-91e7-c65bd6ba268f.gif)

### 4.2. Search 페이지
- 서치 이름 입력, filtering 을 동시에 하여 조건에 부합하는 검색을 할 수 있습니다. 
- search 버튼 클릭 시 로딩을 띄워줍니다. 
하지만, 60분 이내 이미 검색 이력이 있는 키워드 또는 필터링 검색의 경우 로딩을 거치지 않고 바로 검색 결과를 보여줍니다(캐싱).

#### 4.2.1. 키워드 서치
서치 이름 입력 -> search 버튼 클릭 -> 검색 결과

![ezgif com-gif-maker (23)](https://user-images.githubusercontent.com/67466789/206460246-2b6ac5cb-37ed-4d23-b06b-5227ce0cd215.gif)

#### 4.2.2. 필터링 서치
filter 버튼 클릭 -> alcoholic(알코올 여부) 또는 category(카테고리) 또는 ingredient(재료) 선택 -> filter 박스의 apply 버튼 클릭 -> search 버튼 클릭 -> 모든 filtering 조건에 부합하는 검색 결과

![ezgif com-gif-maker (12)](https://user-images.githubusercontent.com/67466789/206460580-c1002b33-6011-48c4-8bc3-27f7f0799e8f.gif)

#### 4.2.3. 검색어 없음 모달
서치 이름 입력, filtering 모두 선택x -> search 버튼 -> 오류 모달

 ![ezgif com-gif-maker (22)](https://user-images.githubusercontent.com/67466789/206459565-379efa93-a012-4a3a-811d-616b766e6401.gif)

### 4.3. Detail 페이지
검색 결과 또는 popular 페이지 칵테일 사진 클릭 -> detail 페이지

![ezgif com-gif-maker (13)](https://user-images.githubusercontent.com/67466789/206463881-d715f36b-ba5f-430c-a949-a318e3858b0b.gif)

- [제목, 알코올 여부, 카테고리, 재료, 재료 양, 만드는 방법]을 보여줍니다.
- ingredient의 see more 클릭 -> ingredient를 전부 보여줍니다. 
- close 클릭 -> ingredient를 5개로 제한하여 보여줍니다. 
- 칵테일 사진 클릭 시 로딩을 띄워줍니다. 하지만, 60분 이내 이미 확인한 칵테일 일 경우 로딩을 거치지 않고 바로 detail 페이지를 보여줍니다(캐싱).

#### 4.3.1. alcoholic, ingredient 재검색
alcoholic(알코올 여부) 또는 category(카테고리) 또는 ingredient(재료) 클릭 -> search 페이지의 결과

![ezgif com-gif-maker (16)](https://user-images.githubusercontent.com/67466789/206464313-e9fd515e-fbb1-42c3-8583-4d3d5fd07671.gif)
![ezgif com-gif-maker (15)](https://user-images.githubusercontent.com/67466789/206464328-8670d24e-4d6a-4f20-b69b-0a397729ba0e.gif)

- alcoholic 또는 category, ingredient 를 클릭해 해당 조건에 부합하는 칵테일 재서치를 할 수 있습니다. 

### 4.4. 모바일 페이지
#### 4.4.1. Popular 페이지
![ezgif com-gif-maker (21)](https://user-images.githubusercontent.com/67466789/206465594-98f8b024-049f-4f51-9800-8d21dc14051b.gif)

#### 4.4.2. Search 페이지
![ezgif com-gif-maker (20)](https://user-images.githubusercontent.com/67466789/206465658-1b50053e-67ae-47fa-9f9b-9f903784c3d2.gif)

#### 4.4.3. Detail 페이지
![ezgif com-gif-maker (19)](https://user-images.githubusercontent.com/67466789/206465702-99368009-46fd-4593-90c3-8de5e4603ce3.gif)


## 5. 구현하면서 고민했던 점
### 5.1. 코드의 정리 :bookmark_tabs:[블로그 글](https://velog.io/@han-byul-yang/cocktail-search-%EA%B0%9C%EC%9D%B8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B81)
 칵테일 필터링 기능을 구현할 때 리팩토링 과정에서 `깔끔한 코드 작성`을 위해 많은 고민을 했었다. 필터링 로직을 작성하기 위해 1. 선택한 필터링 타입(알고올 여부, 카테고리, 재료)의 api만 호출해오고, 2. 받은 칵테일 데이터 json정보에서 id 정보만 가져와서, 3. 모든 필터링 요소를 충족하는 id 들의 칵테일만 결과로 띄워줘야했다. 
리팩토링을 통해 위의 복잡했던 로직을 a. useQuery의 select option을 통해 `서버 관련 로직을 완전히 분리`할 수 있었고, b. `한 함수에 하나의 기능만 담아` 테스트하기에도 좋고, 유지보수에 도움이 될 수 있도록 하였다. 또한 c. react가 선호하는 `선언적인 방식`의 로직으로 작성해주어 가독성이 높아질 수 있었다. 

### 5.2. 성능 최적화 :bookmark_tabs:[블로그 글](https://velog.io/@han-byul-yang/cocktail-search-%EC%B5%9C%EC%A0%81%ED%99%94)
 css 파일을 정리하고, 파일 확장자 png -> webp 변경으로 lighthouse 성능 점수를 상승(84점 -> 98점) 시켰다. 
