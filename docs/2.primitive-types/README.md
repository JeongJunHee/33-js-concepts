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

Number 타입의 값 중에는 두 가지 방식으로 표현할 수 있는 유일한 값이 있는데, 0 이다. 0은 -0 또는 +0으로 표시할 수 있다.

```javascript
42 / +0; // Infinity
42 / -0; // -Infinity
```

> [Double-precision floating-point format](https://en.wikipedia.org/wiki/Double-precision_floating-point_format)

#### String

자바스크립트의 `String` 타입은 텍스트 데이터를 나타내는데 사용한다. 이는 `16비트 부호없는 정수 값 요소들의 집합` 이다.

문자열은 배열처럼 인덱스를 통해 접근할 수 있다. 이와 같은 특성을 갖는 데이터를 `유사 배열` 이라한다.

```javascript
var str = 'string';

for (var i in str) {
  console.log(str[i]);
}
```

자바스크립트의 문자열은 `변경 불가능(immutable)` 하다. 한번 문자열이 생성되면, 그 문자열을 수정할 수 없다는걸 의미한다. 그러나 새로운 문자열을 재할당하는 것은 가능하다. 이는 기존 문자열을 변경하는 것이 아니라 새로운 문자열을 새롭게 할당하는 것이기 때문이다.

```javascript
var str = 'string';
console.log(str); // string

str = 'String';
console.log(str); // String

str += ' test';
console.log(str); // String test

str = str.substring(0, 3);
console.log(str); // Str

str = str.toUpperCase();
console.log(str); // STR
```

#### Symbol

Symbol은 ECMAScript6에서 추가되었다. Symbol은 유일하고 변경 불가능한(immutable) 기본값(primitive value)이다. 또한, 객체 속성의 key 값으로도 사용될 수 있다.

```javascript
var key = Symbol('key');
console.log(typeof key); // symbol

var obj = {};
obj[key] = 'value';
console.log(obj[key]); // value
```

### 객체 (Objects)

`자바스크립트의 객체는 키(key)와 값(value)로 구성된 프로퍼티(property)들의 집합이다.` 프로퍼티의 값으로 자바스크립트에서 사용할 수 있는 모든 값을 사용할 수 있다. 자바스크립트의 함수는 `1급 객체`이므로 값으로 취급할 수 있다. 따라서 프로퍼티 값으로 함수를 사용할 수도 있으며 프로퍼티 값이 함수일 경우, 일반 함수와 구분하기 위해 메소드라 부른다.

객체는 데이터를 의미하는 프로퍼티(property)와 데이터를 참조하고 조작할 수 있는 동작(behavior)을 의미하는 메소드(method)로 구성된 집합이다. 객체는 데이터(프로퍼티)와 그 데이터에 관련되는 동작(메소드)을 포함할 수 있기 때문에 데이터와 동작을 하나의 단위로 구조화할 수 있어 유용하다.

:::tip 1급 객체(first-class object)란?
1급 객체(First-class Object)란 다른 객체들에 일반적으로 적용 가능한 연산을 모두 지원하는 객체를 가리킨다.

1. 모든 요소는 함수의 실제 매개변수가 될 수 있다.

```javascript
$('form').on('submit', function() {
  // ...
});
```

2. 모든 요소는 함수의 반환 값이 될 수 있다.

```javascript
const fs = require('fs');
```
3. 모든 요소는 할당 명령문의 대상이 될 수 있다.

```javascript
const add = function () {
  // ...
}
```
:::

#### 함수

함수는 특별한 프로퍼티들을 가진 새로운 형태의 객체이다.

```javascript
const foo = function (baz) {
  foo.name = 'foo';
  foo.length = 1;
};
```

일반적인 객체와 같이 함수에 새로운 프로퍼티를 추가하는 것도 가능하다.

```javascript
foo.bar = 'baz';
foo.bar; // 'baz
```

#### 메소드

메소드는 함수와 같이 객체의 프로퍼티이다.

```javascript
const foo = {};
foo.bar = function () {
  console.log('baz');
};
foo.bar(); // baz
```

#### 생성자 함수

생성자 함수란 리턴 값으로 생성하는 함수를 객체 그 자체로서 반환하는 함수이다. 같은 코드를 공유하는 여러가지 객체들을 갖고 싶다면, 생성자 함수를 삽입하는 것은 매우 좋은 선택이다.

```javascript
const Foo = function () {};
const bar = new Foo();
console.log(bar); // Foo {}
console.log(bar instanceof Foo); // true
console.log(bar instanceof Object); // true
```

생성자 함수는 object를 리턴하게 된다. object에 새로운 프로퍼티들을 할당하기 위해 `this` 를 함수의 몸통 안에서 사용할 수 있다.

```javascript
const Foo = function () {
  this.bar = 'baz';
};
const qux = new Foo();
console.log(qux); // Foo { bar: 'baz' }
console.log(qux instanceof Foo); // true
console.log(qux instanceof Object); // true
```

새로운 object를 만들기 위해서 생성자 함수를 사용할 수 있다.

`new` 키워드 없이 단순히 `Foo()` 라는 함수를 실행한다면 `Foo` 는 일반적인 함수처럼 동작할 것이다. 그리고 위의 코드에서 함수 내부에 들어있는 `this` 라는 키워드는 `실행 컨텍스트(Excution Context)` 와 응답을 주고 받는다. 그래서 `Foo()` 라는 함수를 전역 컨텍스트에서 실행시키게 되면, 전역 컨텍스트 시점의 `this` 인 `window` 객체에 `bar` 프로퍼티가 추가된다.

```javascript
const Foo = function () {
  this.bar = 'baz';
};
console.log(Foo()); // undefined
console.log(window.bar); // "baz"
```

반대로 말하면, 일반 함수를 생성자 함수로 실행한다면 함수의 역할을 한다기보다 그저 새로운 함수 오브젝트를 반환할 뿐이라는 것이다.

```javascript
// pet은 원시 타입의 'dog' 값을 갖는 것이 아니라 생성자 함수로 생성된 String 객체를 갖게 된다.
const pet = new String('dog');
```

#### 래퍼 오브젝트 (Wrapper Object, 포장 오브젝트)

`String` , `Number` , `Boolean` , `Function` 과 같은 함수들을 `new` 키워드로 생성하면 원시 타입에 대한 `래퍼 오브젝트 (Wrapper Object)`를 생성한다.

`String` 은 문자열이 인자로 들어왔을 때, 원시 문자열(Primitive String)을 생성하는 전역 함수이다. `String` 은 인자로 들어온 값을 문자열로 바꾸려한다.

```javascript
console.log(String(1337)); // '1337'
console.log(String(true)); // 'true'
console.log(String(null)); // 'null'
console.log(String(undefined)); // 'undefined'
console.log(String()); // ''
console.log(String('dog') === 'dog'); // 'true'
console.log(typeof String('dog')); // 'string'
```

`new` 키워드를 붙인다면 `String` 은 여전히 생성자 함수로도 쓰일 수 있다.

```javascript
const pet = new String('dog');
console.log(typeof pet); // 'object'
console.log(pet === 'dog'); // false
```

위의 생성자는 `래퍼 오프젝트(Wrapper Object)` 라고 불리는 새로운 Object를 만들 것이다.
위의 코드에서 새로운 Object는 "dog" 라는 문자열을 다음과 같은 프로퍼티로 나타낸다.

```javascript
{
  0: 'd',
  1: 'o',
  2: 'g',
  length: 3
}
```

> 래퍼 오브젝트(Wrapper Objects)는 오브젝트 래퍼(Object Wrappers)라는 이름으로도 자주 불린다.

#### 오토박싱(Auto-Boxing)

원시 타입 문자열 생성자와 일반 오브젝트 생성자 둘 다 `String` 함수를 이용한다. 또한 원시 문자열 타입에서 `.constructor` 를 이용하여 생성자 프로퍼티를 확인할 수 있다.

```javascript
const pet = new String('dog');
console.log(pet.constructor === String); // true
console.log(String('dog').constructor === String); // true
```

여기서 `오토박싱` 이라 불리는 일이 벌어진다. 특정한 원시 타입에서 프로퍼티나 메소드를 호출하려 할 때, 자바스크립트는 처음으로 이것을 임시 래퍼 오브젝트로 바꾼 뒤에 프로퍼티나 메소드에 접근하려한다. 이 과정에서 원본에는 아무런 영향을 미치지 않는다.

```javascript
const foo = 'bar';
console.log(foo.length); // 3
console.log(foo === 'bar'); // true
```

`length` 라는 프로퍼티에 접근하기 위해 자바스크립트는 `foo` 를 `오토박싱` 하고 이것을 래퍼 오브젝트에 넣는다. 그리고 래퍼 오프젝트의 `length` 프로퍼티에 접근하고 값을 이용한 뒤에는 지워버린다. 이 모든 과정은 `foo` 라는 원시 타입 변수에 아무런 영향을 미치지 않는다. `foo` 는 여전히 원시 타입 문자열일 뿐이다.

이러한 일련의 과정은 우리가 원시 타입에 프로퍼티를 할당하려고 할 때 자바스크립트가 왜 아무런 경고나 에러메시지를 출력하지 않는지를 알려준다. 원시 타입은 프로퍼티를 가질 수 없는데도 말이다. 왜냐하면 프로퍼티를 할당할 때 잠시 원시 타입을 이용한 Wrapper Object(래퍼 오브젝트)를 만들고 거기에 할당하기 때문이다.

```javascript
const foo = 42;
foo.bar = 'baz'; // Assignment done on temporary wrapper object
console.log(foo.bar); // undefined
```

`undefined` 난 `null` 과 같이 래퍼 오브젝트가 없는 원시 타입에 대해서 프로퍼티를 할당하려고 하면 자바스크립트는 에러를 나타낼 것이다.

```javascript
const foo = null;
foo.bar = 'baz'; // Uncaught TypeError: Cannot set property 'bar' of null
```

:::tip 요약
1. 자바스크립트의 모든 것이 Object(객체)인 것은 아니다.
2. 자바스크립트에는 6개의 원시 타입이 존재한다.
3. 원시 타입이 아닌 것들은 모두 Object(객체)이다.
4. 함수는 단순히 특별한 타입의 Object(객체)일 뿐이다.
5. 함수는 새로운 Object(객체)를 만들기 위해 사용될 수 있다.
6. Strings, Booleans, Numbers 는 원시 타입뿐만 아니라 Object(객체)로도 표현 될 수 있다.
7. 오토박싱(Autoboxing)이라는 자바스크립트 기능으로 인해 특정 원시 타입들(Strings, Numbers, Booleans)은 Object(객체)처럼 동작하는 것처럼 보인다.
:::

# References

[JavaScript data types and data structures — MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures)  
[자바스크립트 개발자라면 알아야 할 33가지 개념 #2 자바스크립트의 원시 타입(Primitive Type) (번역)](https://velog.io/@jakeseo_me/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%9D%BC%EB%A9%B4-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-33%EA%B0%80%EC%A7%80-%EA%B0%9C%EB%85%90-2-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-%EC%9B%90%EC%8B%9C-%ED%83%80%EC%9E%85Primitive-Type-%EB%B2%88%EC%97%AD)
[데이터 타입과 변수 - Poiemaweb](https://poiemaweb.com/js-data-type-variable)  
[객체 - Poiemaweb](https://poiemaweb.com/js-object)  
[1급 객체 - Wikipedia](https://ko.wikipedia.org/wiki/%EC%9D%BC%EA%B8%89_%EA%B0%9D%EC%B2%B4)
