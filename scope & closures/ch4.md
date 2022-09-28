# You Don't Know JS: Scope & Closures
# Chapter 4: Hoisting

Bây giờ, bạn đã khá thoải mái với ý tưởng về scope và cách các biến được gắn vào các mức scope khác nhau tùy thuộc vào vị trí và cách chúng được khai báo. Cả function scope và block scope đều hoạt động theo các quy tắc giống nhau về vấn đề này: bất kỳ biến nào được khai báo trong một scope đều được gắn với scope đó.

Nhưng có một chi tiết tinh tế về cách hoạt động của phần đính kèm theo scope với các khai báo xuất hiện ở các vị trí khác nhau trong một scope và chi tiết đó là những gì chúng ta sẽ kiểm tra ở đây.

## Chicken Or The Egg? (Con Gà Hay Quả Trứng)

Có một sự cám dỗ khi nghĩ rằng tất cả code bạn thấy trong một chương trình JavaScript đều được diễn giải theo từng dòng, từ trên xuống theo thứ tự khi chương trình thực thi. Mặc dù điều đó về cơ bản là đúng, nhưng có một phần của giả định đó có thể dẫn đến suy nghĩ sai về chương trình của bạn.

Để ý đoạn code này:

```js
a = 2;

var a;

console.log( a );
```

Bạn mong đợi điều gì sẽ được in trong câu lệnh `console.log(..)`?

Nhiều nhà phát triển sẽ mong đợi `undefined`, vì câu lệnh `var a` đứng sau `a = 2`, và có vẻ tự nhiên khi giả sử rằng biến được định nghĩa lại và do đó được gán mặc định là `undefined`. Tuy nhiên, đầu ra sẽ là `2`.

Xem xét một đoạn code khác:

```js
console.log( a );

var a = 2;
```

Bạn có thể bị cám dỗ để giả định rằng, vì đoạn code trước thể hiện một số hành vi nhìn ít hơn từ trên xuống, có lẽ trong đoạn code này, `2` cũng sẽ được in. Những người khác có thể nghĩ rằng vì biến `a` được sử dụng trước khi nó được khai báo, điều này phải dẫn đến một lỗi `ReferenceError` được thông báo.

Thật không may, cả hai dự đoán đều không chính xác. `undefined` là đầu ra.

**Vậy, chuyện gì đang xảy ra ở đây?** Có vẻ như chúng ta có một câu hỏi về con gà và quả trứng. Cái nào đến trước, phần khai báo ("egg") hoặc phần gán ("con gà")?

## The Compiler Strikes Again

Để trả lời câu hỏi này, chúng ta cần xem lại Chương 1 và thảo luận của chúng ta về compiler. Nhớ lại rằng *Engine* thực sự sẽ biên dịch code JavaScript của bạn trước khi nó diễn giải. Một phần của giai đoạn biên dịch là tìm và liên kết tất cả các khai báo với các scope thích hợp của chúng. Chương 2 đã cho chúng ta thấy rằng đây là trung tâm của Lexical Scope.

Vì vậy, cách tốt nhất để suy nghĩ về mọi thứ là tất cả các khai báo, cả biến và hàm, đều được xử lý trước, trước khi bất kỳ phần nào trong code của bạn được thực thi..

Khi bạn nhìn thấy `var a = 2;`, bạn có thể nghĩ đó là một câu lệnh. Nhưng JavaScript thực sự coi nó như hai câu lệnh: `var a;` và `a = 2;`. Câu lệnh đầu tiên, khai báo, được xử lý trong giai đoạn biên dịch. Câu lệnh thứ hai, phép gán, được để **tại chỗ** cho giai đoạn thực thi.

Đoạn code đầu tiên của chúng ta sau đó nên được coi là được xử lý như thế này:

```js
var a;
```
```js
a = 2;

console.log( a );
```

...trong đó phần đầu tiên là biên dịch và phần thứ hai là thực thi.

Tương tự, đoạn mã thứ hai của chúng ta thực sự được xử lý như:

```js
var a;
```
```js
console.log( a );

a = 2;
```

Vì vậy, một cách nghĩ, nói một cách ẩn dụ, về quá trình này, đó là các khai báo biến và hàm được "di chuyển" từ nơi chúng xuất hiện trong dòng code đến đầu code. Điều này làm phát sinh tên "Hoisting".

Nói cách khác, **quả trứng (khai báo) đứng trước con gà (phép gán)**.

**Lưu ý:** Chỉ có bản thân các khai báo mới được lưu trữ, trong khi mọi phép gán hoặc logic thực thi khác được để *tại chỗ*. Nếu việc hoisting sắp xếp lại logic thực thi của code của chúng ta, điều đó có thể gây hại.

```js
foo();

function foo() {
	console.log( a ); // undefined

	var a = 2;
}
```

Khai báo của hàm `foo` (trong trường hợp này là *bao gồm* giá trị ngụ ý của nó như một hàm thực) được kéo lên (hoisted), sao cho lệnh gọi trên dòng đầu tiên có thể thực thi.

Điều quan trọng cần lưu ý là hoisting là **per-scope**. Vì vậy, trong khi các đoạn code trước đây của chúng ta được đơn giản hóa ở chỗ chúng chỉ bao gồm scope toàn cục, thì hàm `foo(..)` mà chúng ta đang kiểm tra chính nó cho thấy rằng `var a` được nâng lên đầu `foo (..)` (không, hiển nhiên, ở đầu chương trình). Vì vậy, chương trình có thể được diễn giải chính xác hơn như thế này:

```js
function foo() {
	var a;

	console.log( a ); // undefined

	a = 2;
}

foo();
```

Các khai báo function được kéo lên, như chúng ta vừa thấy. Nhưng function expression (biểu thức hàm) thì không.

```js
foo(); // not ReferenceError, but TypeError!

var foo = function bar() {
	// ...
};
```

Identifier biến `foo` được kéo và gắn vào scope bao quanh (toàn cục) của chương trình này, vì vậy `foo()` không bị lỗi là `ReferenceError`. Nhưng `foo` vẫn chưa có giá trị (như nó sẽ xảy ra nếu nó là một khai báo hàm true thay vì biểu thức). Vì vậy, `foo()` đang cố gọi giá trị `undefined`, đây là một hoạt động bất hợp pháp của `TypeError`.

Cũng xin nhắc lại rằng mặc dù đó là một function expression được đặt tên, nhưng identifier tên không có sẵn trong scope kèm theo:

```js
foo(); // TypeError
bar(); // ReferenceError

var foo = function bar() {
	// ...
};
```

Đoạn code này được diễn giải chính xác hơn (với hoisting) là:

```js
var foo;

foo(); // TypeError
bar(); // ReferenceError

foo = function() {
	var bar = ...self...
	// ...
}
```

## Functions First

Cả khai báo hàm và khai báo biến đều được đưa lên đầu chương trình. Nhưng một chi tiết tinh tế (mà *có thể* hiển thị trong code với nhiều khai báo "trùng lặp") là các hàm được đưa lên trước, sau đó là các biến.

Consider:

```js
foo(); // 1

var foo;

function foo() {
	console.log( 1 );
}

foo = function() {
	console.log( 2 );
};
```

`1` is printed instead of `2`! This snippet is interpreted by the *Engine* as:

```js
function foo() {
	console.log( 1 );
}

foo(); // 1

foo = function() {
	console.log( 2 );
};
```

Lưu ý rằng `var foo` là khai báo trùng lặp (và do đó bị bỏ qua), mặc dù nó xuất hiện trước khai báo `function foo()...`, bởi vì khai báo hàm được đưa lên trước các biến bình thường.

Trong khi các khai báo `var` nhiều/trùng lặp bị bỏ qua một cách hiệu quả, các khai báo hàm tiếp theo sẽ *ghi đè* các khai báo trước đó.

```js
foo(); // 3

function foo() {
	console.log( 1 );
}

var foo = function() {
	console.log( 2 );
};

function foo() {
	console.log( 3 );
}
```

Mặc dù tất cả những điều này nghe có vẻ không hơn gì những câu đố học thuật thú vị, nhưng nó làm nổi bật thực tế rằng các định nghĩa trùng lặp trong cùng một scope là một ý tưởng thực sự tồi và thường sẽ dẫn đến kết quả khó hiểu.

Các khai báo hàm xuất hiện bên trong các khối thông thường thường kéo theo scope bao quanh, thay vì có điều kiện như code này ngụ ý:

```js
foo(); // "b"

var a = true;
if (a) {
   function foo() { console.log( "a" ); }
}
else {
   function foo() { console.log( "b" ); }
}
```

Tuy nhiên, điều quan trọng cần lưu ý là hành vi này không đáng tin cậy và có thể thay đổi trong các phiên bản JavaScript trong tương lai, vì vậy tốt nhất bạn nên tránh khai báo các hàm trong các khối.

## Review (TL;DR)

Chúng ta có thể bị hấp dẫn khi xem `var a = 2;` như một câu lệnh, nhưng JavaScript *Engine* không nhìn nhận như vậy. Nó coi `var a` và `a = 2` là hai câu lệnh riêng biệt, câu lệnh đầu tiên là tác vụ giai đoạn biên dịch và câu lệnh thứ hai là tác vụ giai đoạn thực thi.

Điều này dẫn đến tất cả các khai báo trong một scope, bất kể chúng xuất hiện ở đâu, đều được xử lý *đầu tiên* trước khi bản thân code được thực thi. Bạn có thể hình dung điều này dưới dạng các khai báo (biến và hàm) được "di chuyển" lên đầu các scope tương ứng của chúng, mà chúng tôi gọi là "hoisting".

Bản thân các khai báo được đưa lên đầu, nhưng các phép gán, thậm chí là phép gán các biểu thức hàm, là *không* được đưa lên đầu.

Hãy cẩn thận về các khai báo trùng lặp, đặc biệt là hỗn hợp giữa khai báo var bình thường và khai báo hàm - nguy cơ đang chờ đợi nếu bạn làm vậy!
