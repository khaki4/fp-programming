# 값(Expression) 이란 무엇일까?
- 함수가 값으로 활용 된다는 것은 무엇일까?
- 상태를 값으로 표현하는 의미
- [1, 2, 3, 4]
- [f, f, f, f]
- [\<Suspended>, \<Suspended>, \<Suspended>, \<Suspended>]
## 최종목표 

1. 리스트를 순회할 때마다 필요한 값을 생성한다. 
2. 필요한 순간 값을 생성하는 것은 함수를 통해 가능하다.
3. es6에서 리스트 순회시 사용하는 for...of 문은 Iterable의 next()를 호출하여 값을 생성한다.
4. Genrator를 통하여 Iterable 의 next()을 호출하여 가져오는 값의 형태를 설정할 수 있다.
5. Iterable을 인자로 받는 함수를 Generator를 이용하여 만든다.
6. Generator를 이용하여 만든 함수를 합성한다.
7. 합성된 함수에 원하는 데이터를 입력한다.

---

실무에서 Data(Collection) 를 순회함에 있어 

    Data.map(predicate).filter(predicate).find(predicate) // 시간복잡도가 좋지않음
    
혹은

    for(let i = 0; i < Data.length; i++) {
       function getWhatIWant(_data) {
         ...여러가지 조건의 복합체
         분리가 힘들다.
       }
       
       getWhatIWant(Data[i]);
    }

와 같은 형식으로 데이터 조회를 하는데 이는 N개의 길이를 가진 콜렉션을 3번 순회하는 셈이 된다. 이를 아래와 같이 함수의 지연연산을 통해 효율적인 순회를 하록 하는것이 목적이다.
    
    for(let i = 0; i < Data.length; i++) {
       isItWhatIWant? (filtering(mapping(Data[0])))
    }
    
--- 
    
    [(filtering(mapping(Data[0]))),
     (filtering(mapping(Data[1]))), 
     (filtering(mapping(Data[2])))....]
                .find(isItWhatIWant)        
또한 재활용성을 위해 아래의 모습으로 각 함수를 모듈화 하고 그 모듈의 합성을 쉽게 하는 방법을 만드는 것이 최종 목표이다.

    pipe(
      Data,
      map(predicate),
      filter(predicate),
      find(predicate)
    )



## 성공적인 프로그래밍을 위하여
- 모든 프로그래밍 패러다임은 성공적인 프로그래밍을 위해 존재한다.
- 성공적인 프로그래밍은 좋은 프로그램을 만드는 일이다.
- 좋은 프로그램은 사용성, 성능, 확장성, 기획 변경에 대한 대응력이 좋다.
- 이것을을 효율적이고 생산적으로 이루는 일이 성공적인 프로그래밍이다.

## 함수형 프로그래밍
성공적인 프로그래밍을 위해 부수 효과(side effect)를 지양하고 조합성을 강조하는 프로그래밍 패러다임이다.

- 부수효과를 지양한다 => 순수함수(Pure Function)를 만든다.
- 조합성을 강조한다 => 모듈화 수준을 높인다.
- 순수 함수 => 오류를 줄이고 안정성을 높인다.
- 모듈화 수준이 높다 => 생산성을 높인다.

---

- "함수형 프로그래밍은 애플리케이션, 함수의 구성요소, 더 나아가서 언어자체를 함수처럼 여기도록 만들고, 이러한 함수 개념을 가장 우선순위에 놓는다."

- "함수형 사고방식은 문제의 해결 방법을 동사(함수)들로 구성(조합)하는 것"

<img src="./assets/ex1.png" width=300 />

마이클 포거스 [클로저 프로그래밍의 증거움]에서

---

## 평가
- 코드가 계산(Evalutaion) 되어 값(Expression)을 만드는 것.

## 일급 객체(first-class citizens)
- 값으로 다룰 수 있다.
- 변수에 담을 수 있다.
- 함수의 인자로 사용할 수 있다.
- 함수의 결과로 사용할 수 있다.

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


---
