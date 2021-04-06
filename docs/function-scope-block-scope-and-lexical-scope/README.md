# 6. Function Scope, Block Scope and Lexical Scope

## 자바스크립트 인터프리터

스코프가 무엇인지를 설명하기 전에, 자바스크립트 인터프리터와 그것이 다른 스코프에 어떤 영향을 미치는지를 알아야 할 필요가 있다. 자바스크립트 코드를 실행할 때 인터프리터는 코드를 두 번 통과한다.

`Compile run` 이라고도 하는 코드를 통한 첫번째 실행은 스코프에 가장 큰 영향을 미친다. 인터프리터는 변수 및 함수 선언을 살펴보고 이를 현재 스코프의 맨 위로 이동시킨다. 중요한 것은 오직 선언만 이동되고 할당은 `Execution run`  이라고도 하는 두 번째 실행을 위해 그대로 유지된다.

```javascript {9}
'use strict'

var foo = 'foo';
var wow = 'wow';

function bar (wow) {
  var pow = 'pow';
  console.log(foo); // 'foo'
  console.log(wow); // 'zoom'
}

bar('zoom');
console.log(pow); // ReferenceError: pow is not defined
```

위의 코드는  `Complie run` 후 다음과 같다.

```javascript
'use strict'
// Variables are hoisted at the top of the current scope
var foo;
var wow;

// Function declarations are hoisted as-is at the top of the current scope
function bar (wow) {
  var pow;
  pow = 'pow';
  console.log(foo);
  console.log(wow);
}

foo = 'foo';
wow = 'wow';

bar('zoom');
console.log(pow); // ReferenceError: pow is not defined
```

여기서 이해해야 할 가장 중요한 점은 선언이 현재 스코프의 맨 위로 올라간다는 것이다. 이것은 자바스크립트에서 스코프를 이해하는 데 매우 중요하다.

예를 들어 변수 `pow` 는 함수 스코프이기 때문에 부모 스코프에 선언되는 대신 함수에 선언된다.

함수 `bar` 의 매개변수 `wow` 또한 함수 스코프에 선언된다. 사실, 모든 함수 매개변수는 암시적으로 함수 스코프 내에 선언된다. 그리고 이는 `console.log(wow);` 의 결과가 `wow` 대신 `zoom` 이 되는 이유이다.

# References

[Understanding Scope in JavaScript](https://www.telerik.com/blogs/understanding-scope-in-javascript)

