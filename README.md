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

### [5] TodoFrom + ADD/EDIT/DELETE/DONE상태 표현
#### TodoFrom
* 새로운 Todo를 등록하거나, 기존의 Todo를 수정할 경우에 사용되는 컴포넌트
#### ADD
* 새로운 Todo를 등록하는 기능
#### EDIT
* 기존의 Todo를 수정하는 기능 (제목, 내용)
#### DELETE
* Todo를 삭제하는 기능
* 삭제하고 싶은 Todo 제목의 오른쪽에 마우스 hover시 나타나는 쓰레기통 아이콘을 클릭하면 해당 Todo가 삭제된다.
#### DONE 상태 표현
* Todo의 완료(Done), 미완료(Undone) 상태를 나타내는 기능
* 토글(Toggle) 버튼으로 클릭할 때마다 상태 변경
* 완료(Done) 상태 : 민트색 원 + 체크 표시
* 미완료(Undone) 상태 : 회색 원

### 다음 작업 ###
- 코드 정리
- 마지막 점검
- 버그 점점
