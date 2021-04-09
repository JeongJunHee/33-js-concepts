# 6. Function Scope, Block Scope and Lexical Scope

## 자바스크립트 인터프리터

스코프가 무엇인지를 설명하기 전에, 자바스크립트 인터프리터와 그것이 다른 스코프에 어떤 영향을 미치는지를 알아야 할 필요가 있다. 자바스크립트 코드를 실행할 때 인터프리터는 코드를 두 번 통과한다.

`Compile run` 이라고도 하는 코드를 통한 첫 번째 실행은 스코프에 가장 큰 영향을 미친다. 인터프리터는 변수 및 함수 선언을 살펴보고 이를 현재 스코프의 맨 위로 이동시킨다. 중요한 것은 오직 선언만 이동되고 할당은 `Execution run`  이라고도 하는 두 번째 실행을 위해 그대로 유지된다.

```javascript {8,9,12}
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

예를 들어 변수 `pow` 는 함수 스코프이기 때문에 상위 스코프에 선언되는 대신 함수에 선언된다.

함수 `bar` 의 매개변수 `wow` 또한 함수 스코프에 선언된다. 모든 함수 매개변수는 암시적으로 함수 스코프 내에 선언된다. 그리고 이는 `console.log(wow);` 의 결과가 `wow` 대신 `zoom` 이 되는 이유이다.

## Lexical Scope

렉시컬 스코프는 컴파일 시점 스코프를 의미한다. 스코프에 대한 결정은 컴파일 시점에 이루어지는 것을 의미한다.

인터프리터의 두 번째 실행에서 변수 할당이 이루어지고 함수가 실행된다. 위의 예제 코드에서 12 행이 이에 해당 된다. 인터프리터는 `bar()` 를 실행하기 전에 `bar` 의 선언을  찾아야하며 먼저 현재 스코프를 살펴본다. 이 시점에서 현재 스코프는 전역 스코프이다. 인터프리터의 첫 번째 실행 덕분에 우리는 파일의 맨 위에 `bar` 가 선언되어있는것을 알 수 있다. 따라서 인터프리터는 `bar` 를 찾아서 실행할 수 있다.

8 행의 `console.log (foo);` 를 보면 인터프리터는 8 행을 실행하기 전에 `foo` 의 선언을 찾아야한다. 가장 먼저하는 일은 전역 스코프가 아닌 현재 스코프인 함수 `bar` 의 스코프를 살펴 보는 것이다. 이 함수 스코프에 `foo` 가 선언되어 있지 않으므로 상위 스코프로 한 단계 올라가서 `foo` 의 선언을 찾는다. 함수 `bar` 의 상위 스코프는 전역 스코프이다. `foo` 는 전역 스코프에 선언되어 있으므로 인터프리터는 이를 실행할 수 있다.

::: tip
렉시컬 스코프는 스코프가 인터프리터의 첫 번째 실행 후에 결정되었음을 의미하며, 인터프리터가 변수 및 함수 선언을 찾아야 할 때, 먼저 현재 스코프를 살펴 보고 선언을 찾지 못하면 상위 스코프로 계속 올라갈 것이다. 최상위 레벨은 전역 스코프이다.
:::

전역 스코프에서 선언을 찾지 못하면 `ReferenceError` 가 발생한다.

인터프리터는 상위 스코프를 살펴보기 전에 현재 스코프에서 먼저 선언을 찾기 때문에 렉시컬 스코프는 자바스크립트에서 `변수 쉐도잉` 개념을 도입한다. `변수 쉐도잉` 은 현재 함수 스코프에 선언 된 변수가 상위 스코프에서 동일한 이름을 가진 변수를 가리는 것을 의미한다.

```javascript {3,6}
'use strict'

var foo = 'foo';

function bar () {
  var foo = 'bar';
  console.log(foo);
}

bar();
```

위 코드의 결과는 6 행의 변수 `foo` 의 선언이 3 행의 변수 `foo` 의 선언을 가리기 때문에  `foo` 가 아닌 `bar` 가 된다.

`변수 쉐도잉` 은 특정 변수를 감추거나 특정 스코프에서 접근하지 못하도록 막는 경우 유용할 수 있는 디자인 패턴이다.

# References

[Understanding Scope in JavaScript](https://www.telerik.com/blogs/understanding-scope-in-javascript)

