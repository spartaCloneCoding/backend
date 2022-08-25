## 기획의도
스파르타 코딩클럽을 클론 코딩을 통하여 CRUD를 복습하며 도전과제로 소셜로그인과 좋아요 기능을 추가

## 시연영상
[youtube](https://youtu.be/LLnohzJN6_4)

## 백엔드 팀원 소개
[Github](https://github.com/spartaCloneCoding/backend.git)

|팀원|역할분담|
|------|------|
|이상현|로그인, 회원가입, 소셜로그인 기능구현, 미들웨어 구현, 서버배포|
|윤상돈|comment CRUD API, DB테이블 설계, RDS 설정|
|김영광|post CRUD API|

## Environment
AWS EC2 서버의 환경에서 배포 중입니다.
DB는 RDS를 활용하고 있습니다

## Technical Stacks
<div float: left; >
    <img src="https://img.shields.io/badge/-Node.js-339933?style=flat&logo=Node.js&logoColor=white"/>
    <img src="https://img.shields.io/badge/-Visual Studio Code-007ACC?style=flat&logo=Visual Studio Code&logoColor=white"/>
</div>
NODEJS, EXPRESS, SQL을 활용합니다

### 기술선정이유
SQL  
 - 관계형 데이터베이스로 USER, POST, COMMENT 데이터끼리 조인하는 과정이 SQL이 잘 어울린다고 생각했습니다.


 ## 라이브 러리|Library
|기술 스택|Appliance|Version|
|------|---|---|
|Express|Node.JS|4.18.1|
|CORS|Request resource 제한|2.8.5|
|dotenv|보안 토큰, 키 관련보안화|16.0.1|
|JWT|사용자 인증토큰 발행|8.5.1|
|Passport|소셜 로그인|0.6.0|
|passport-kakao|카카오 로그인 모듈|1.0.1|
|joi|유효성 검사|17.6.0|
|bcrypt|비밀번호 암호화|5.0.1|
|mysql2|sql 사용|2.3.3|
|sequelize|시퀄라이즈 사용|6.21.3|

## 트러블슈팅
[trouble](https://www.notion.so/f87354ebc83144219d53b0acc14bb387)
