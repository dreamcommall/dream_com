# 목차
1. 프로젝트 이름 및 개발 취지
2. 프로젝트 설명 
3. 프로젝트 환경설정 및 설치방법 
4. 개발에 참여한 팀원 
5. 참고 사이트 및 참고 자료 
6. 개선이 필요하거나 아쉬운 점 


# 프로젝트 이름 및 개발 취지
#### 드림컴(Dream Computer)
    
    SNS 사이트, 여행 사이트 등.. 다른 사이트들도 생각은 해봤지만 그중에서 가장 기본적인 기능이 담겨있고 정석적인
    쇼핑몰을 만들어보자는 생각이 들어 쇼핑몰 사이트를 만들어보고자 결정했고 한정된 시간으로 인해 분야를 한정해서
    컴퓨터를 판매하는 쇼핑몰 사이트로 콘셉트를 잡았습니다.
    
    또한 이때까지 배웠던 기술 중 프런트 부분에서 Thymeleaf 또는 React라는 선택지가 있었고 타임리프보다 리액트가
    새로고침을 하지 않고 렌더링 시킬 수 있으며 유저에게 보여주는 화면 반응속도 및 컴포넌트로 UI를 관리할 수 있었다는
    점에서 리액트를 선택하게 되었고 서버는 Node.js 와 Spring boot 중 Node.js는 수업 시간에 배운 적이 없다는 점이
    있어 생산적인 측면에서 Spring boot를 사용하게 되었습니다.

# 프로젝트 설명
#### 이 애플리케이션에 대해 알려주세요!
    드림컴은 컴퓨터 부분으로 한정해서 판매하는 콘셉트로 잡은 가상의 쇼핑몰 사이트이며 UI 디자인적인 부분은 타
    쇼핑몰을 참고하였습니다. 그러나 기능적인 부분은 모두 직접 다 구현하였으며 아쉽게도 상품의 등록 기능은 현재
    추가하지 못한 상황입니다. DB에 미리 백데이터를 집어넣은 채로 구성되어 있으며 메인화면에서 현재 인기 있는 상품
    목록, 상품 검색 기능, 상세 보기, 결제 기능, 로그인, 마이페이지로 구성되어 있습니다.
    
#### 이 프로젝트에는 어떤 기술이 사용되었나요?
🔎 프론트
* Bootstrap
* React
* HTML
* CSS
* Javascript
* Axios
* Ajax

🔎 백엔드
* Java
* SpringBoot
* Mysql
* MyBatis
* AWS

🔎 협업 도구
* git
* SourceTree
* notion
    

# 프로젝트 환경설정 및 설치방법 
    이 프로젝트는 스프링 2.7.7 버전이 사용되었습니다.
    애플리케이션을 구동하고 싶으면 프로젝트를 받아 build.gradle에 있는 종속되는 부분을 다운로드하고
    사용하시면 됩니다.
    
    또한 Spring 프로젝트 안에 React 프로젝트도 같이 들어있습니다.
    프로젝트를 열 때 Spring 프로젝트를 기준으로 열어야 합니다.
    처음 실행할 경우 React 프로젝트는 수동으로 npm 설치를 해줘야 합니다.
    아래와 같은 명령어를 React 프로젝트에서 사용하세요.
    
    npm install
    
    위의 명령어를 React 프로젝트에서 실행하면 package.json에 있는 모듈이
    자동으로 설치될 것입니다.
    
    애플리케이션 구동 방법은 두 가지로 나누어지는데
    기본적으로 gradle 파일에 React 와 Spring boot가 연동되어 있어 실행이 오래 걸릴 수 있습니다.
    gradle 파일에서 연동하는 부분의 코드를 주석 처리하고 Spring boot / React 서버를 별도로
    실행하면 부팅 속도를 줄일 수 있습니다.
    

# 개발에 참여한 팀원 
* MoonNight285(github : https://github.com/MoonNight285 , email : kimjyjh123@gmail.com)
* KimHyoungDo88(github : https://github.com/KimHyoungDo88 , email : gudeh880@naver.com)
* minho95(github : https://github.com/OwOowl , email : ymh0052@naver.com)
* YMKJJ(github : https://github.com/YMKJJ, email : dudals334@naver.com)

# 참고 사이트 및 참고 자료
* 컴퓨존(https://www.compuzone.co.kr/main/main.htm)
* 11번가(https://www.11st.co.kr/main)
* G마켓(https://www.gmarket.co.kr/)
* 아임포트 - 깃허브(https://github.com/iamport/iamport-manual)
* 아임포트 - 공식문서(https://docs.iamport.kr/implementation/payment || https://chai-iamport.gitbook.io/iamport/auth/guide)
* 스프링부트 스케줄링 사용(http://jmlim.github.io/spring/2018/11/27/spring-boot-schedule/)
* flation(무료 아이콘) - (https://www.flaticon.com/)
* Slick(캐러셀) - (https://react-slick.neostack.com/docs/get-started/)
* 다음 우편번호 서비스 - (https://postcode.map.daum.net/guide)
* 스프링 시큐리티 - (https://flamme1004.gitbook.io/flamme-dev/info-1/framework/spring/springsecurity/springsecurity)
* 스프링 시큐리티 - (https://okky.kr/articles/382738)

# 개선이 필요하거나 아쉬운 점
    본 애플리케이션은 판매자가 따로 존재하는 것이 아닌 사이트 오너가 바로 판매자 역할을 합니다.
    그러나 관리자 기능을 추가하지 못한 점은 아쉬운 부분이고 이로 인해 상품을 등록하고 삭제/수정하는 기능이
    존재하지 않습니다.
    
    스프링 시큐리티를 적용하고자 하였으나 시간적인 측면, 개발 난이도로 인해 시큐리티를 적용하지 못한 점
    이 부분은 아쉬운 부분입니다. 기회가 된다면 적용시켜보고 싶은 기술입니다.
