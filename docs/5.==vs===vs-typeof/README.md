# 5. == vs === vs typeof

자바스크립트는 시각적으로 유사하지만 매우 다른 동등성을 검사하는 두 가지 방법이 있다. `==` , `===` 을 사용하여 동등함을 검사할 수 있다.

## ===

자바스크립트에서 `===` 을 사용할 때, `엄격한 동등성` 을 검사한다. 이는 비교하는 대상의 `타입` 과 `값` 이 둘 다 같아야 한다는 것을 의미한다.

### true

```javascript
5 === 5
// true (Both numbers, equal values)

'hello world' === 'hello world'
// true (Both Strings, equal values)

true === true
// true (Both Booleans, equal values)
```

### false

```javascript
77 === '77'
// false (Number v. String)

'cat' === 'dog'
// false (Both are Strings, but have different values)

false === 0
// false (Different type and different value)
```

## ==

자바스크립트에서 `==` 을 사용할 때, `느슨한 동등성` 을 검사한다. `==` 는 `강제 형변환` 을 수행한다. `강제 형변환` 은 두 값을 공통 타입으로 변환하려고 시도한 후에만 비교하는 것을 의미한다.

```javascript
77 === '77'
// false (Number v. String)
```
`77 === '77'` 은 다른 타입이므로 `false` 가 된다.

```javascript
77 == '77'
// true
```

`77 == '77'` 은 강제 형변환이 이루어지기 때문에 `true` 가 된다. 자바스크립트는 실제로 값을 같은 타입으로 변환하려고 시도한다. 문자열 `'77'` 은 숫자 `77` 로 쉽게 변환될 수 있다. 따라서, `77` 과 `77` 은 같으므로 77 == '77' 은 `true` 가 된다.

```javascript
false === 0
// false (Different type and different value)
```
`false === 0` 은 다른 타입, 다른 값이므로 `false` 가 된다.

```javascript
false == 0
// true
```

`false == 0` 은 `true` 가 된다. 이는 자바스크립트의 `falsy` 값과 관련이 있다.

## Falsy Values

자바스크립트에서 `false == 0` 이 `true` 가 되는 이유는 자바스크립트에서 `0` 은 `falsy` 값이기 때문이다. 강제 형변환을 통해 `0` 은 `false` 로 변환된다. 따라서, `false` 와 `false` 는 같으므로 `false == 0` 은 `true` 가 된다.

자바스크립트에는 6가지 `falsy` 값이 있다.

- `fasle`
- `0`
- `""`
- `null`
- `undefined`
- `NaN`

## Falsy 값 비교

### 1. false, 0, ""

`==` 으로 `false` , `0` , `""` 을 비교할 때, 결과는 `true` 가 된다. `false` , `0` , `""` 은 `false` 로 강제 형변환 되기 때문이다.

```javascript
false == 0
// true
0 == ""
// true
"" == false
// true
```

### 2. null, undefined

`null` 과 `undefined` 를 비교할 때, `null` 과 `undefined` 는 오직 자기 자신과 서로에게만 동등하다.

```javascript
null == null
// true
undefined == undefined
// true
null == undefined
// true
```

만약 `null` 을 다른 값과 비교한다면 결과는 `false` 가 될 것이다.

### 3. NaN

마지막으로, `NaN` 은 어떠한 값과도 동등하지 않다. 또한 자기 자신과도 동등하지 않다.

```javascript
NaN == null
// false
NaN == undefined
// false
NaN == NaN
// false
```

# References

[JavaScript — Double Equals vs. Triple Equals](https://codeburst.io/javascript-double-equals-vs-triple-equals-61d4ce5a121a)  
[자바스크립트 개발자라면 알아야 할 33가지 개념 #5 == vs === 3분만에 배우기 (번역)](https://velog.io/@jakeseo_me/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%9D%BC%EB%A9%B4-%EC%95%8C%EC%95%84%EC%95%BC-%ED%95%A0-33%EA%B0%80%EC%A7%80-%EA%B0%9C%EB%85%90-5-vs-3%EB%B6%84%EB%A7%8C%EC%97%90-%EB%B0%B0%EC%9A%B0%EA%B8%B0-%EB%B2%88%EC%97%AD)