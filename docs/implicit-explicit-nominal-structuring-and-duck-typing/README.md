# 4. Implicit, Explicit, Nominal, Structuring and Duck Typing

## Implicit coercion (암묵적 타입 변환)

개발자의 의도와는 상관없이 자바스크립트 엔진에 의해 `암묵적` 으로 타입이 자동 변환되는 것을 `암묵적 타입 변환(Implicit coercion)` 이라 한다.

```javascript
3 * '3';           // 9
1 + '2' + 1;       // 121

true + true;       // 2
10 - true;         // 9

const foo = {
  valueOf: () => 2
};
3 + foo;           // 5
4 * foo;           // 8

const bar = {
  toString: () => ' promise is a boy :)'
};
1 + bar;           // '1 promise is a boy :)'

4 * [];            // 0
4 * [2];           // 8
4 + [2];           // '42'
4 + [1, 2];        // '41,2'
4 * [1, 2];        // NaN

'string' ? 4 : 1;  // 4
undefined ? 4 : 1; // 1
```

### 숫자 표현식에서 숫자가 아닌 값

#### 문자열

`-, *, /, *` 연산자 중 하나를 포함하는 숫자 표현식에서 피연산자로 문자열을 전달할 때마다, 숫자의 암묵적 타입 변환 프로세스는 내장 `Number` 함수를 호출하는 것과 유사하다. 숫자 만을 포함한 문자열은 동등한 숫자로 변환되지만 숫자가 아닌 문자를 포함한 문자열은 `NaN` 을 리턴한다.

```javascript
3 * '3';         // 3 * 3
3 * Number('3'); // 3 * 3
Number('5');     // 5

Number('1.');    // 1
Number('1.34');  // 1.34
Number('0');     // 0
Number('012');   // 12

Number('1,');    // NaN
Number('1+1');   // NaN
Number('1a');    // NaN
Number('one');   // NaN
Number('text');  // NaN
```

##### + 연산자

+ 연산자는 두 가지 기능을 수행한다.

1. 덧셈
2. 문자열 연결

+ 연산자의 피연산자가 문자열일 때, 자바스크립트는 문자열를 숫자로 변환하지 않고 숫자를 문자열로 변환한다.

```javascript
// concatenation
1 + '2';     // '12'
1 + 'js';    // '1js'

// addition
1 + 2;       // 3
1 + 2 + 1;   // 4

// addition, then concatenation
1 + 2 + '1'; // '31'
1 + 2 + '1'; // '31'

// concatenation all through
1 + '2' + 1; // '121'
1 + '2' + 1; // '121'
```

#### 객체

대부분의 자바스크립트 객체의 암묵적 타입 변환은 `[object Object]` 을 반환한다.

```javascript
'name' + {} // 'name[object Object]'
```

모든 객체는 객체가 문자열로 변환 될 때마다 호출되는 `toString` 메소드를 상속받는다. `toString` 메소드의 리턴 값은 문자열 연결 및 수학적 표현식과 같은 연산에 사용된다.

```javascript
const foo = {};
foo.toString(); // [object Object]

const baz = {
  toString: () => "I'm object baz"
};

baz + '!'; // "I'm object baz!"
```

수학적 표현식일 때, 자바스크립트는 반환 값을 숫자로 변환하려고 시도한다.

```javascript
const foo = {
  toString: () => 4
};

2 * foo;      // 8
2 / foo;      // 0.5
2 + foo;      // 6
'four' + foo; // 'four4'

const baz = {
  toString: () => 'four'
};

2 * baz;      // NaN
2 + baz;      // 2four

const bar = {
  toString: () => '2'
};

2 + bar;      // '22'
2 * bar;      // 4
```

:::tip Object.prototype.toString()
모든 객체에는 객체가 텍스트 값으로 표시되거나 객체가 문자열이 예상되는 방식으로 참조 될 때 자동으로 호출되는 `toString()` 메소드가 있다. 기본적으로 `toString()` 메소드는 Object에서 비롯된 모든 객체에 상속된다. 이 메소드가 사용자 지정 개체에서 재정의 되지 않으면 `toString()` 은 `[object Object]` 을 반환한다.

[Object.prototype.toString() - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)
:::

##### 배열 객체

배열에서 상속된 `toString` 메소드는 약간 다르게 동작한다. 인자 없이 `join` 메소드를 호출하는 것과 유사하게 동작한다.

```javascript
[1, 2, 3].toString(); // '1,2,3'
[1, 2, 3].join();     // '1,2,3'

[].toString();        // ''
[].join();            // ''

'me' + [1, 2, 3];     // 'me1,2,3'

4 + [1, 2, 3];        // '41,2,3'
4 * [1, 2, 3];        // NaN
```

```javascript
4 * [];               // 0

// similar to
4 * Number([].toString());
4 * Number('');
4 * 0;
```

```javascript
4 / [2];              // 2

// similar to
4 / Number([2].toString());
4 / Number('2');
4 / 2;
```

:::tip Array.prototype.toString()
Array 객체는 Object의 toString 메서드를 재정의(override)한다. Array 객체에 대해, toString 메서드는 배열을 합쳐(join) 쉼표로 구분된 각 배열 요소를 포함하는 문자열 하나를 반환한다.

[Array.prototype.toString() - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)
:::

##### True, False and ''

```javascript
Number(true);  // 1
Number(false); // 0
Number('');    // 0

4 + true;      // 5
3 * false;     // 0
3 * '';        // 0
3 + '';        // '3'
```

##### The `valueOf` method

문자열 또는 숫자 값이 예상되는 곳에 객체를 전달할 때마다 자바스크립트에 의해 사용될 valueOf 메소드를 정의할 수 있다.

```javascript
const foo = {
  valueOf: () => 3
};

3 + foo;    // 6
3 * foo;    // 9
```

객체에 `toString`, `valueOf` 메소드가 둘 다 정의되어 있을 때, 자바스크립트는 `valueOf` 메소드를 사용한다.

```javascript
const bar = {
  toString: () => 2,
  valueOf: () => 5
};

'sa' + bar; // 'sa5'
3 * bar;    // 15
2 + bar;    // 7
```

`valueOf` 메소드는 객체가 어떠한 숫자값을 나타낼 때 사용하기 위해 만들어졌다.

```javascript
const two = new Number(2);

two.valueOf(); // 2
```

### Falsy and Truthy

모든 자바스크립트 값은 `true` 또는 `false` 로 강제 형변환될 수 있다. `true` 로 강제 형변환되는 것은 값이 `Truthy` 임을 의미한다. `false` 로 강제 형변환되는 것은 값이 `falsy` 임을 의미한다.

#### `falsy` 를 리턴하는 값

1. false
2. 0
3. null
4. undefined
5. ''
6. NaN
7. -0

#### `truthy` 를 리턴하는 값

`falsy` 를 리턴하는 값을 제외한 나머지

```javascript
if (-1)  // truthy
if ('0') // truthy
if ({})  // truthy
```

### NaN

`NaN` 은 자기 자신과 같지 않은 특별한 숫자 값이다.

```javascript
NaN === NaN;                // false

const notANumber = 3 * 'a'; // NaN

notANumber == notANumber;   // false
notANumber === notANumber;  // false
```

`NaN` 은 자바스크립트에서 유일하게 자기 자신과 같지 않은 값이다.

```javascript
if (notANumber !== notANumber) // true
```

:::tip Number.isNaN
ECMAScript6는 `NaN` 을 검사하기 위한 `Number.isNaN` 메소드가 있다. 

```javascript
Number.isNaN(NaN);    // true
Number.isNaN('name'); // false
```

[Number.isNaN() - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN)
:::

:::tip isNaN
`isNaN` 함수의 인수가 `Number` 형이 아닌 경우, 그 값은 먼저 숫자로 강제된다. 결과값은 그 뒤에 `NaN` 인지 결정하기 위해 테스트된다.

```javascript
isNaN('name'); // true
isNaN('1');    // false
```

`isNaN` 함수는 사용하지 않는 것이 좋다. 작동 방식은 아래 함수와 유사하다.

```javascript
const coerceThenCheckNaN = val => {
  const coercedVal = Number(val);
  return coercedVal !== coercedVal ? true : false;
};

coerceThenCheckNaN('1a'); // true
coerceThenCheckNaN('1');  // false
coerceThenCheckNaN('as'); // true
coerceThenCheckNaN(NaN);  // true
coerceThenCheckNaN(10);   // false
```

[isNaN() - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/isNaN)
:::

## Explicit coercion (명시적 타입 변환)

개발자에 의해 `의도적` 으로 값의 타입을 변환하는 것을 `Explicit coercion (명시적 타입 변환)` 이라 한다.

### 문자열 타입으로 변환

#### String 생성자 함수를 new 연산자 없이 호출하는 방법

```javascript
console.log(String(1));        // '1'
console.log(String(NaN));      // 'NaN'
console.log(String(Infinity)); // 'Infinity'
console.log(String(true));     // 'true'
console.log(String(false));    // 'false'
```

#### Object.prototype.toString 메소드를 사용하는 방법

```javascript
console.log((1).toString());      // '1'
console.log(NaN.toString());      // 'NaN'
console.log(Infinity.toString()); // 'Infinity'
console.log(true.toString());     // 'true'
console.log(false.toString());    // 'false'
```

#### 문자열 연결 연산자를 이용하는 방법

```javascript
console.log(1 + '');        // '1'
console.log(NaN + '');      // 'NaN'
console.log(Infinity + ''); // 'Infinity'
console.log(true + '');     // 'true'
console.log(false + '');    // 'false'
```

### 숫자 타입으로 변환

#### Number 생성자 함수를 new 연산자 없이 호출하는 방법

```javascript
console.log(Number('0'));     // 0
console.log(Number('-1'));    // -1
console.log(Number('10.53')); // 10.53
console.log(Number(true));    // 1
console.log(Number(false));   // 0
```

#### parseInt, parseFloat 함수를 사용하는 방법(문자열만 변환 가능)

```javascript
console.log(parseInt('0'));       // 0
console.log(parseInt('-1'));      // -1
console.log(parseFloat('10.53')); // 10.53

```

#### 단항 연결 연산자를 이용하는 방법

```javascript
console.log(+'0');     // 0
console.log(+'-1');    // -1
console.log(+'10.53'); // 10.53
console.log(+true);    // 1
console.log(+false);   // 0
```

#### 산술 연산자를 이용하는 방법

```javascript
console.log('0' * 1);     // 0
console.log('-1' * 1);    // -1
console.log('10.53' * 1); // 10.53
console.log(true * 1);    // 1
console.log(false * 1);   // 0
```

### 불리언 타입으로 변환

#### Boolean 생성자 함수를 new 연산자 없이 호출하는 방법

```javascript
console.log(Boolean('x'));       // true
console.log(Boolean(''));        // false
console.log(Boolean('false'));   // true
console.log(Boolean(0));         // false
console.log(Boolean(1));         // true
console.log(Boolean(NaN));       // false
console.log(Boolean(Infinity));  // true
console.log(Boolean(null));      // false
console.log(Boolean(undefined)); // false
console.log(Boolean({}));        // true
console.log(Boolean([]));        // true
```

#### !부정 논리 연산자를 두번 사용하는 방법

```javascript
console.log(!!'x');       // true
console.log(!!'');        // false
console.log(!!'false');   // true
console.log(!!0);         // false
console.log(!!1);         // true
console.log(!!NaN);       // false
console.log(!!Infinity);  // true
console.log(!!null);      // false
console.log(!!undefined); // false
console.log(!!{});        // true
console.log(!![]);        // true
```

# References

[What you need to know about Javascript's Implicit Coercion](https://dev.to/promhize/what-you-need-to-know-about-javascripts-implicit-coercion-e23)  
[자바스크립트 개발자라면 알아야 할 33가지 개념 #4 암묵적 타입 변환(implicit coercion) (번역)](https://velog.io/@jakeseo_me/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%9D%BC%EB%A9%B4-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-33%EA%B0%80%EC%A7%80-%EA%B0%9C%EB%85%90-4-%EC%95%94%EB%AC%B5%EC%A0%81-%ED%83%80%EC%9E%85-%EB%B3%80%ED%99%98-%EB%B2%88%EC%97%AD)  
[Type coercion - PoiemaWeb](https://poiemaweb.com/js-type-coercion)