## 노마드 리엑트 인강 따라하기

---

## 어려운점

1. 메뉴는 하드코딩 하지 않고, 객체를 만들어서 매핑 시켰다.

- 그렇게 하니 useMatch()를 활용을 못해서 객체에 path 정보까지 담아서 매핑 시켰다.
- 실제 백엔드와 연동 한다면 서버에서 path 까지 줄수 있을까?
- path가 달라졌는데 애니메이션이 잘못된 경로를 바라보는 경우가 생길 수도 있지 않을까?
  - 문제가 있다고 생각하며 개선방법으로 일일히 메뉴를 하드 코딩 해서 useMatch 를 조건으로 매핑 시키는 방법(코드 넘 길어지고, 유지보수가 힘들어진다. 대신 경로로 인한 오작동은 안일어 날듯 하다.)
  - js api 활용해서 주소를 알아내서 수작업으로 패턴 매칭 시키는 방법(이럴려면 리엑트 쓰면안되지..)
  - 백엔드에서 메뉴 데이터를 받을 경우가 생길시 -> 서버에서 받은 데이터에 경로를 집어 넣는 방법(가장 리엑스 스럽긴 한데...)
  - 어느 하다 깔끔하게 정리가 되지 않음. 다른 방법은 없을까?
  - 메뉴가 몇개 안되서 그냥 하드코딩 해서 해결함.(경로 때문에 발생하는 오류는 없을 것 같다.)

2. tailwind 생각보다 안되는게 많다.

- 이미지를 인라인으로 넣어줘야 하고 관련된 그라디에이션 필더 기능이 다 먹통 이거나 오작동 한다.
- 그렇다고 styled-components 를 합쳐 쓰자니 너무 중복 되는것이 많다.
- 간단하게 빨리 만들어야 할때, 최적화 신경안쓰고, 할때는 테일윈드로
- 최적화 신경쓰면서 다이나믹 하게 정교하게 만드려고 할때는 styled-components로
- 결국 둘다 써야 하긴 하나보다.

3. 슬라이드는 구현방법이 거의 정해져 있는것 같았다. 하지만 버그를 찾기위한 노력, 및 최적화는 신경써야 한다.

4. 컴포넌트를 계속 나눠봤다 .화면과 데이터로 구분하는 방법을 계속 사용해 보니. 문제점을 발견했다.

- 화면과 밀접한 관련이 있는 훅(애니메이션 매핑 훅 같은것), 아주 간단한 훅(useParams 간은것) 을 전달하자니 너무 리소스 낭비라는 생각이 들었다.
- 결국 나눠서 데이터와 화면별로 정리하는 작업은, 생산성 향상을 위해 약간의 리소스 낭비를 하는 작업인 것 같았다.
- 결론은 최대한 잘게 나누되, 데이터와 화면을 나누지 않을 수 있도록 최대한 잘게 쪼개서 나누는 작업이 필요하다고 생각하게 되었다.
