# TodoCard
* 카드 슬라이드 효과가 더해진 TodoList 프로젝트
* 데이터베이스 연동
* 서버 개발환경 구축
* API 연동


## Information
* React
* DB : MySQL 사용
* DB Tool : DBeaver 사용 
* Server : Express 사용 
* React와 Server 연동 : axios와 Custom Hook(useFetch) 사용 
* Server와 DB 연동 : Sequelize 사용


## Process

### [1] 기본 작업
DB 연동 결과를 확인할 수 있을 수준으로만 처리

### [2] Server
DB의 데이터를 가져오는 수준의 기본적인 서버

### [3] DB 연동
MySQL, DBeaver, Express, Sequelize 사용

### [4] API & 기능 구현
#### 기능
* ADD : 할 일 등록
* EDIT : 할 일 수정
* DELETE : 할 일 삭제
* DONE / UNDONE : 할 일의 완료/미완료 상태 표시

### [5] TodoFrom + 추가/수정/삭제/완료 상태 표현
#### 완료 상태 표현
* Done 상태에 따른 토글 버튼 색상 & 텍스트 색상 조정
#### DELETE 기능
* 마우스 hover시 나타나는 쓰레기통 아이콘 클릭시 해당 Todo 삭제 


### 다음 작업 ###
- Form Component
- 추가, 수정, 삭제, 완료 상태 표현(토글버튼 색 이상함)
- Reducer 활용 방법 검토
- App.js에 있는 변수 " n " 필요 여부 검토
  ( --> n을 전달하는 것이 맞는지..... p를 전달하는 것이 맞는지.....)
