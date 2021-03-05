---
title: 2. Primitive Types
---

# 2. Primitive Types

## 자바스크립트의 자료형

### 동적 타이핑

자바스크립트는 느슨한 타입(loosely typed) 언어, 혹은 동적(dynamic) 언어이다. 그 말은 변수의 타입을 미리 선언할 필요가 없다는 뜻이다. 타입은 프로그램이 처리되는 과정에서 자동으로 파악될 것이다. 또한 그 말은 같은 변수에 여러 타입의 값을 넣을 수 있다는 뜻이다.

```javascript
var foo = 42; // Number
var foo = 'bar'; // String
var foo = true; // Boolean
```

### 데이터 타입

최신 ECMAScript 표준은 다음과 같은 7개의 자료형을 정의한다.

- 기본 자료형 (Primitive)
  - Boolean
  - Null
  - Undefined
  - Number
  - String
  - Symbol (ECMAScript6에 추가됨)
- Object

### 기본 타입(Primitive value)

Object를 제외한 모든 값은 변경 불가능한 값(immutable value)이다.

#### Boolean

Boolean은 논리적인 요소를 나타내고, `true` 와 `false` 의 두 가지 값을 가질 수 있다.

#### Null

Null 타입은 딱 한 가지의 값, `null` 을 가질 수 있다.

#### Undefined

값을 할당하지 않은 변수는 `undefined` 값을 가진다.

#### Number

ECMAScript 표준에 따르면, 숫자의 자료형은 배정밀도 64비트 형식 IEEE 754 값 (-(2<sup>53</sup> - 1) 와 2<sup>53</sup> - 1 사이의 숫자값) 단 하나만 존재한다. `정수만을 표현하기 위한 특별한 자료형은 없다.` 부동 소수점을 표현할 수 있는 것 말고도, Number 타입은 세 가지 의미있는 몇가지 상징적인 값들도 표현할 수 있다. 이 값에는 `Infinity, -Infinity, NaN(숫자가 아님)` 이 있다.

`+/-Infinity` 보다 크거나 작은지 확인하는 용도로 상수값인 `Number.MAX_VALUE` 나 `Number.MIN_VALUE` 을 사용할 수 있다. 또한, ECMAScript6 부터는 숫자가 배정밀도 부동소수점 숫자인지 확인하는 용도로 `Number.isSafeInteger()` 과 `Number.MAX_SAFE_INTEGER`, `Number.MIN_SAFE_INTEGER` 을 사용할 수 있다. 이 범위를 넘어서면, 자바스크립트의 숫자는 더 이상 안전하지 않다.

:::tip
[Double-precision floating-point format](https://en.wikipedia.org/wiki/Double-precision_floating-point_format)
:::

# References

[JavaScript data types and data structures — MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures)  
[자바스크립트 개발자라면 알아야 할 33가지 개념 #2 자바스크립트의 원시 타입(Primitive Type) (번역)](https://velog.io/@jakeseo_me/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%9D%BC%EB%A9%B4-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-33%EA%B0%80%EC%A7%80-%EA%B0%9C%EB%85%90-2-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-%EC%9B%90%EC%8B%9C-%ED%83%80%EC%9E%85Primitive-Type-%EB%B2%88%EC%97%AD)
