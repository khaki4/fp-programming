## 이터러블/이터레이터 프로토콜
- 이터러블: 이터레이터를 리턴하는 \[Symbol.iterator]() 를 가진 값(expression)
- 이터레이터: { value, done } 객체를 리턴하는 next() 를 가진 값
- 이터러블/이터레이터 프로토콜: 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록한 규약(protocol)

## Gernerator
- 이터레이터이자 이터러블을 생성하는 함수. 즉 이터레이터를 리턴하는 함수
- 순회할 값(expression)을 문장(statement)으로 표현한다는 의미를 가진다.
- 문장을 순회할 수 있는 리턴값으로 만들 수 있다. 
- 즉, 자바스크립트에서는 제너레이터를 통해 어떠한 상태나 어떠한 값이라도 순회 하도록 만들 수 있다.
- Gernerator 를 통해 쉽게 제어가능한 이터러블을 만들 수 있다.

## Iterable 중심 프로그래밍에서의 지연평가 (Lazy Evaluation)
- 느긋한 계산법
- Generator/Iterator Protocal 기반으로 구현

## map, filter 계열 함수가 가지는 결함 법칙
- 사용하는 데이터가 무엇이든지
- 사용하는 보조 함수가 순수 함수라면 무엇이든지
- 아래와 같이 결합한다면 둘 다 결과가 같다.

[[mapping, mapping], [filtering, filtering], [mapping, mapping]]

= 

[[mapping, filtering, mapping], [mapping, filtering, mapping]]



