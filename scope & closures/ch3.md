# You Don't Know JS: Scope & Closures
# Chapter 3: Function vs. Block Scope

Như chúng ta đã khám phá trong Chương 2, scope bao gồm một loạt các "bong bóng" mà mỗi "bong bóng" hoạt động như một thùng chứa hoặc gàu, trong đó các định danh (biến, hàm) được khai báo. Những bong bóng này lồng vào nhau một cách gọn gàng và sự lồng vào nhau này được xác định tại thời điểm tác giả.

Nhưng chính xác thì điều gì tạo nên một bong bóng mới? Có phải nó chỉ là chức năng? Các cấu trúc khác trong JavaScript có thể tạo bong bóng scope không?

## Scope From Functions

Câu trả lời phổ biến nhất cho những câu hỏi đó là JavaScript có function-based scope (phạm vi dựa trên chức năng). Nghĩa là, mỗi hàm bạn khai báo sẽ tạo ra bong bóng cho chính nó, nhưng không có cấu trúc nào khác tạo bong bóng scope riêng của chúng. Như chúng ta sẽ thấy một chút, điều này không hoàn toàn đúng.

Nhưng trước tiên, hãy khám phá phạm vi chức năng và ý nghĩa của nó.

Hãy xem xét đoạn code này:

```js
function foo(a) {
	var b = 2;

	// some code

	function bar() {
		// ...
	}

	// more code

	var c = 3;
}
```

Trong đoạn code này, bong bóng scope cho `foo(..)` bao gồm các identifier `a`,` b`, `c` và `bar`. **Không quan trọng** *nơi* trong scope mà khai báo xuất hiện, biến hoặc hàm thuộc về bong bóng scope chứa, bất kể. Chúng ta sẽ khám phá cách hoạt động chính xác của *điều đó* trong chương tiếp theo.

`bar(..)` có bong bóng scope riêng của nó. Scope toàn cục cũng vậy, chỉ có một identifier gắn liền với nó: `foo`.

Bởi vì `a`,` b`, `c` và `bar` đều thuộc bong bóng scope của `foo(..)`, chúng không thể truy cập được bên ngoài `foo(..)`. Có nghĩa là, tất cả mã sau đây sẽ dẫn đến lỗi `ReferenceError`, vì các identifier không có sẵn cho scope toàn cục:

```js
bar(); // fails

console.log( a, b, c ); // all 3 fail
```

Tuy nhiên, tất cả các identifier này (`a`, `b`, `c`, `foo` và `bar`) đều có thể truy cập *bên trong* của `foo(..)`, và thực sự cũng có sẵn bên trong `bar( ..)` (giả sử không có khai báo identifier bên trong `bar(..)` trùng tên với các identifier thuộc scope bên ngoài).

Function scope khuyến khích ý tưởng rằng tất cả các biến thuộc về hàm và có thể được sử dụng và sử dụng lại trong toàn bộ hàm (và thực sự, có thể truy cập ngay cả đối với các scope lồng nhau). Cách tiếp cận thiết kế này có thể khá hữu ích và chắc chắn có thể tận dụng đầy đủ tính chất "động" của các biến JavaScript để nhận các giá trị thuộc các kiểu khác nhau khi cần thiết.

Mặt khác, nếu bạn không thực hiện các biện pháp phòng ngừa cẩn thận, các biến tồn tại trên toàn bộ scope có thể dẫn đến một số cạm bẫy bất ngờ.

## Hiding In Plain Scope (Ẩn trong phạm vi thuần túy)

Cách nghĩ truyền thống về các hàm là bạn khai báo một hàm, sau đó thêm code vào bên trong nó. Nhưng tư duy nghịch đảo cũng mạnh mẽ và hữu ích không kém: lấy bất kỳ đoạn code tùy ý nào bạn đã viết và bọc một khai báo hàm xung quanh nó, phần này có tác dụng "ẩn" đoạn code..

Kết quả thực tế là tạo bong bóng scope xung quanh code được đề cập, có nghĩa là bất kỳ khai báo nào (biến hoặc hàm) trong code đó bây giờ sẽ được gắn với scope của hàm gói mới, thay vì scope được bao trước đó. Nói cách khác, bạn có thể "ẩn" các biến và hàm bằng cách đặt chúng trong scope của một hàm.

Tại sao "ẩn" các biến và hàm lại là một kỹ thuật hữu ích?

Có nhiều lý do thúc đẩy việc ẩn nấp dựa trên scope này. Chúng có xu hướng phát sinh từ nguyên tắc thiết kế phần mềm "Nguyên tắc ít đặc quyền nhất" [^note-leastprivilege], đôi khi còn được gọi là "Least Authority" hoặc "Least Exposure". Nguyên tắc này nói rằng trong thiết kế phần mềm, chẳng hạn như API cho mô-đun/đối tượng, bạn chỉ nên để lộ những gì tối thiểu cần thiết và "ẩn" mọi thứ khác.

Nguyên tắc này mở rộng đến việc lựa chọn scope nào để chứa các biến và hàm. Nếu tất cả các biến và hàm nằm trong scope toàn cục, tất nhiên chúng sẽ có thể truy cập được ở bất kỳ scope lồng nhau nào. Nhưng điều này sẽ vi phạm nguyên tắc "Ít nhất ..." ở chỗ bạn (có khả năng) tiết lộ nhiều biến hoặc hàm mà bạn nên giữ riêng tư, vì việc sử dụng code đúng cách sẽ không khuyến khích truy cập vào các biến/hàm đó.

Cho ví dụ:

```js
function doSomething(a) {
	b = a + doSomethingElse( a * 2 );

	console.log( b * 3 );
}

function doSomethingElse(a) {
	return a - 1;
}

var b;

doSomething( 2 ); // 15
```

Trong đoạn code này, biến `b` và hàm `doSomethingElse(..)` có thể là chi tiết "riêng tư" về cách `doSomething(..)` thực hiện công việc của nó. Việc cấp cho scope bao quanh "quyền truy cập" vào `b` và `doSomethingElse(..)` không chỉ không cần thiết mà còn có thể "nguy hiểm", ở chỗ chúng có thể được sử dụng theo những cách không mong muốn, có chủ ý hoặc không và điều này có thể vi phạm trước các giả định điều kiện của `doSomething(..)`.

Một thiết kế "thích hợp" hơn sẽ ẩn những chi tiết riêng tư này trong phạm vi của `doSomething(..)`, giống như:

```js
function doSomething(a) {
	function doSomethingElse(a) {
		return a - 1;
	}

	var b;

	b = a + doSomethingElse( a * 2 );

	console.log( b * 3 );
}

doSomething( 2 ); // 15
```

Giờ đây, `b` và `doSomethingElse(..)` không thể truy cập được bởi bất kỳ ảnh hưởng bên ngoài nào, thay vào đó chỉ được kiểm soát bởi `doSomething(..)`. Chức năng và kết quả cuối cùng không bị ảnh hưởng, nhưng thiết kế giữ bí mật các chi tiết riêng tư, thường được coi là phần mềm tốt hơn.

### Collision Avoidance (Tránh va chạm)

Một lợi ích khác của việc "ẩn" các biến và hàm trong scope là tránh va chạm ngoài ý muốn giữa hai identifier khác nhau có cùng tên nhưng mục đích sử dụng khác nhau. Việc va chạm thường dẫn đến việc ghi đè các giá trị một cách bất ngờ.

Cho ví dụ:

```js
function foo() {
	function bar(a) {
		i = 3; // changing the `i` in the enclosing scope's for-loop
		console.log( a + i );
	}

	for (var i=0; i<10; i++) {
		bar( i * 2 ); // oops, infinite loop ahead!
	}
}

foo();
```

Phép gán `i = 3` bên trong của `bar(..)` ghi đè, bất ngờ thay, `i` đã được khai báo trong `foo(..)` tại vòng lặp for. Trong trường hợp này, nó sẽ dẫn đến một vòng lặp vô hạn, vì `i` được đặt thành giá trị cố định là `3` và điều đó sẽ mãi mãi vẫn là `<10`.

Phép gán bên trong `bar(..)` cần khai báo một biến cục bộ để sử dụng, bất kể identifier nào được chọn. `var i = 3;` sẽ khắc phục sự cố (và sẽ tạo khai báo "biến bị che khuất" đã đề cập trước đó cho `i`). Một tùy chọn *bổ sung*, không thay thế, là chọn hoàn toàn một identifier khác, chẳng hạn như `var j = 3;`. Nhưng thiết kế phần mềm của bạn có thể tự nhiên gọi cùng một tên định danh, vì vậy việc sử dụng scope để "ẩn" khai báo bên trong là lựa chọn tốt nhất/duy nhất của bạn trong trường hợp đó.

#### Global "Namespaces"

Một ví dụ đặc biệt mạnh mẽ về xung đột biến (có khả năng) xảy ra trong scope toàn cục. Nhiều thư viện được tải vào chương trình của bạn có thể khá dễ dàng xung đột với nhau nếu chúng không ẩn các hàm và biến nội bộ/riêng tư đúng cách.

Các thư viện như vậy thường sẽ tạo ra một khai báo biến duy nhất, thường là một đối tượng, với một tên đủ duy nhất, trong scope toàn cục. Đối tượng này sau đó được sử dụng làm "namespace (không gian tên)" cho thư viện đó, nơi tất cả các chức năng hiển thị cụ thể được thực hiện dưới dạng thuộc tính của đối tượng đó (namespace), chứ không phải là bản thân các identifier lexical scope cấp cao nhất.

Cho ví dụ:

```js
var MyReallyCoolLibrary = {
	awesome: "stuff",
	doSomething: function() {
		// ...
	},
	doAnotherThing: function() {
		// ...
	}
};
```

#### Module Management

Một lựa chọn khác để tránh va chạm là cách tiếp cận "mô-đun" hiện đại hơn, sử dụng bất kỳ trình quản lý phụ thuộc nào khác nhau. Bằng cách sử dụng các công cụ này, không có thư viện nào thêm bất kỳ identifier nào vào scope toàn cục, nhưng thay vào đó, chúng được yêu cầu nhập (các) identifier của chúng một cách rõ ràng vào một scope cụ thể khác thông qua việc sử dụng các cơ chế khác nhau của trình quản lý phụ thuộc.

Cần lưu ý rằng những công cụ này không sở hữu chức năng "ma thuật" được miễn các quy tắc lexical scope. Chúng chỉ đơn giản là sử dụng các quy tắc xác định scope như được giải thích ở đây để thực thi rằng không có identifier nào được đưa vào bất kỳ scope dùng chung nào và thay vào đó được giữ trong scope riêng tư, không dễ bị va chạm, giúp ngăn chặn mọi va chạm scope ngẫu nhiên.

Như vậy, bạn có thể viết code một cách an toàn và đạt được kết quả giống như những gì mà người quản lý phụ thuộc làm mà không thực sự cần sử dụng chúng, nếu bạn muốn. Xem Chương 5 để biết thêm thông tin về pattern mô-đun.

## Functions As Scopes

Chúng ta đã thấy rằng chúng ta có thể lấy bất kỳ đoạn code nào và bọc một hàm xung quanh nó và điều đó có hiệu quả "ẩn" bất kỳ khai báo biến hoặc hàm kèm theo nào khỏi scope bên ngoài bên trong scope bên trong của hàm đó.

Cho ví dụ:

```js
var a = 2;

function foo() { // <-- insert this

	var a = 3;
	console.log( a ); // 3

} // <-- and this
foo(); // <-- and this

console.log( a ); // 2
```

Mặc dù kỹ thuật này "hoạt động", nó không nhất thiết phải rất lý tưởng. Có một số vấn đề mà nó thể hiện. Đầu tiên là chúng ta phải khai báo một hàm có tên `foo()`, có nghĩa là bản thân tên định danh `foo` "gây ảnh hưởng" scope bao quanh (toàn cục, trong trường hợp này). Chúng ta cũng phải gọi hàm một cách rõ ràng bằng tên (`foo()`) để code được bọc thực sự thực thi.

Sẽ lý tưởng hơn nếu hàm không cần tên (hoặc đúng hơn là tên không gây ảnh hưởng scope bao quanh) và nếu hàm có thể tự động được thực thi.

May mắn thay, JavaScript cung cấp giải pháp cho cả hai vấn đề.

```js
var a = 2;

(function foo(){ // <-- insert this

	var a = 3;
	console.log( a ); // 3

})(); // <-- and this

console.log( a ); // 2
```

Nào cùng chia nhỏ những gì đang xảy ra ở đây.

Đầu tiên, hãy lưu ý rằng câu lệnh đóng gói hàm bắt đầu bằng `(function...` thay vì chỉ `function...`. Mặc dù điều này có vẻ như là một chi tiết nhỏ, nhưng nó thực sự là một thay đổi lớn. Thay vì coi hàm như một khai báo chuẩn, hàm được coi như một function-expression (biểu thức hàm).

**Lưu ý:** Cách dễ nhất để phân biệt declaration (khai báo) và expression (biểu thức) là vị trí của từ "function" trong câu lệnh (không chỉ một dòng mà là một câu lệnh riêng biệt). Nếu "function" là điều đầu tiên trong câu lệnh, thì đó là một khai báo hàm. Nếu không, đó là một biểu thức hàm.

Sự khác biệt chính mà chúng ta có thể quan sát ở đây giữa khai báo hàm và biểu thức hàm liên quan đến nơi tên của nó được ràng buộc như một identifier.

So sánh hai đoạn code trước. Trong đoạn code đầu tiên, tên `foo` được ràng buộc trong scope bao quanh và chúng ta gọi nó trực tiếp bằng `foo()`. Trong đoạn mã thứ hai, tên `foo` không bị ràng buộc trong scope bao quanh, mà thay vào đó, chỉ bị ràng buộc bên trong chức năng của chính nó.

Nói cách khác, `(function foo(){..})` như một biểu thức có nghĩa là identifier `foo` được tìm thấy *chỉ* trong scope mà dấu `..` chỉ ra, không phải trong scope bên ngoài. Ẩn tên `foo` bên trong chính nó có nghĩa là nó không làm ảnh hưởng scope bao quanh một cách không cần thiết.

### Anonymous vs. Named

Bạn có lẽ quen thuộc nhất với các function expressions dưới dạng tham số gọi lại, chẳng hạn như:

```js
setTimeout( function(){
	console.log("I waited 1 second!");
}, 1000 );
```

Đây được gọi là "anonymous function expression (biểu thức hàm ẩn danh)", bởi vì `function()...` không có tên identifier trên đó. Function expression có thể ẩn danh, nhưng khai báo hàm không được bỏ qua tên - đó sẽ là ngữ pháp JS không hợp lệ.

Anonymous function expressions là nhanh chóng và dễ gõ, và nhiều thư viện và công cụ có xu hướng khuyến khích kiểu mã thành ngữ này. Tuy nhiên, nó có một số điểm hạn chế cần xem xét:

1. Các hàm anonymous function không có tên hữu ích để hiển thị trong stack traces (dấu vết ngăn xếp), điều này có thể khiến việc gỡ lỗi trở nên khó khăn hơn.

2. Không có tên, nếu hàm cần tham chiếu đến chính nó, cho đệ quy, v.v., rất tiếc, tham chiếu **không dùng đến** `arguments.callee` là bắt buộc. Một ví dụ khác về việc cần tự tham chiếu là khi một hàm xử lý sự kiện muốn tự hủy liên kết sau khi nó kích hoạt.

3. Các hàm ẩn danh bỏ qua một tên thường hữu ích trong việc cung cấp mã dễ đọc/dễ hiểu hơn. Tên mô tả giúp tự ghi lại mã được đề cập.

**Inline function expressions** rất mạnh mẽ và hữu ích - câu hỏi về ẩn danh so với có tên không làm giảm đi điều đó. Việc cung cấp một tên cho biểu thức hàm của bạn giải quyết khá hiệu quả tất cả những phần lùi này, nhưng không có nhược điểm rõ ràng nào. Cách tốt nhất là luôn đặt tên cho các biểu thức hàm của bạn:

```js
setTimeout( function timeoutHandler(){ // <-- Look, I have a name!
	console.log( "I waited 1 second!" );
}, 1000 );
```

### Invoking Function Expressions Immediately

```js
var a = 2;

(function foo(){

	var a = 3;
	console.log( a ); // 3

})();

console.log( a ); // 2
```

Now that we have a function as an expression by virtue of wrapping it in a `( )` pair, we can execute that function by adding another `()` on the end, like `(function foo(){ .. })()`. The first enclosing `( )` pair makes the function an expression, and the second `()` executes the function.

This pattern is so common, a few years ago the community agreed on a term for it: **IIFE**, which stands for **I**mmediately **I**nvoked **F**unction **E**xpression.

Of course, IIFE's don't need names, necessarily -- the most common form of IIFE is to use an anonymous function expression. While certainly less common, naming an IIFE has all the aforementioned benefits over anonymous function expressions, so it's a good practice to adopt.

```js
var a = 2;

(function IIFE(){

	var a = 3;
	console.log( a ); // 3

})();

console.log( a ); // 2
```

There's a slight variation on the traditional IIFE form, which some prefer: `(function(){ .. }())`. Look closely to see the difference. In the first form, the function expression is wrapped in `( )`, and then the invoking `()` pair is on the outside right after it. In the second form, the invoking `()` pair is moved to the inside of the outer `( )` wrapping pair.

These two forms are identical in functionality. **It's purely a stylistic choice which you prefer.**

Another variation on IIFE's which is quite common is to use the fact that they are, in fact, just function calls, and pass in argument(s).

For instance:

```js
var a = 2;

(function IIFE( global ){

	var a = 3;
	console.log( a ); // 3
	console.log( global.a ); // 2

})( window );

console.log( a ); // 2
```

We pass in the `window` object reference, but we name the parameter `global`, so that we have a clear stylistic delineation for global vs. non-global references. Of course, you can pass in anything from an enclosing scope you want, and you can name the parameter(s) anything that suits you. This is mostly just stylistic choice.

Another application of this pattern addresses the (minor niche) concern that the default `undefined` identifier might have its value incorrectly overwritten, causing unexpected results. By naming a parameter `undefined`, but not passing any value for that argument, we can guarantee that the `undefined` identifier is in fact the undefined value in a block of code:

```js
undefined = true; // setting a land-mine for other code! avoid!

(function IIFE( undefined ){

	var a;
	if (a === undefined) {
		console.log( "Undefined is safe here!" );
	}

})();
```

Still another variation of the IIFE inverts the order of things, where the function to execute is given second, *after* the invocation and parameters to pass to it. This pattern is used in the UMD (Universal Module Definition) project. Some people find it a little cleaner to understand, though it is slightly more verbose.

```js
var a = 2;

(function IIFE( def ){
	def( window );
})(function def( global ){

	var a = 3;
	console.log( a ); // 3
	console.log( global.a ); // 2

});
```

The `def` function expression is defined in the second-half of the snippet, and then passed as a parameter (also called `def`) to the `IIFE` function defined in the first half of the snippet. Finally, the parameter `def` (the function) is invoked, passing `window` in as the `global` parameter.

## Blocks As Scopes

While functions are the most common unit of scope, and certainly the most wide-spread of the design approaches in the majority of JS in circulation, other units of scope are possible, and the usage of these other scope units can lead to even better, cleaner to maintain code.

Many languages other than JavaScript support Block Scope, and so developers from those languages are accustomed to the mindset, whereas those who've primarily only worked in JavaScript may find the concept slightly foreign.

But even if you've never written a single line of code in block-scoped fashion, you are still probably familiar with this extremely common idiom in JavaScript:

```js
for (var i=0; i<10; i++) {
	console.log( i );
}
```

We declare the variable `i` directly inside the for-loop head, most likely because our *intent* is to use `i` only within the context of that for-loop, and essentially ignore the fact that the variable actually scopes itself to the enclosing scope (function or global).

That's what block-scoping is all about. Declaring variables as close as possible, as local as possible, to where they will be used. Another example:

```js
var foo = true;

if (foo) {
	var bar = foo * 2;
	bar = something( bar );
	console.log( bar );
}
```

We are using a `bar` variable only in the context of the if-statement, so it makes a kind of sense that we would declare it inside the if-block. However, where we declare variables is not relevant when using `var`, because they will always belong to the enclosing scope. This snippet is essentially "fake" block-scoping, for stylistic reasons, and relying on self-enforcement not to accidentally use `bar` in another place in that scope.

Block scope is a tool to extend the earlier "Principle of Least ~~Privilege~~ Exposure" [^note-leastprivilege] from hiding information in functions to hiding information in blocks of our code.

Consider the for-loop example again:

```js
for (var i=0; i<10; i++) {
	console.log( i );
}
```

Why pollute the entire scope of a function with the `i` variable that is only going to be (or only *should be*, at least) used for the for-loop?

But more importantly, developers may prefer to *check* themselves against accidentally (re)using variables outside of their intended purpose, such as being issued an error about an unknown variable if you try to use it in the wrong place. Block-scoping (if it were possible) for the `i` variable would make `i` available only for the for-loop, causing an error if `i` is accessed elsewhere in the function. This helps ensure variables are not re-used in confusing or hard-to-maintain ways.

But, the sad reality is that, on the surface, JavaScript has no facility for block scope.

That is, until you dig a little further.

### `with`

We learned about `with` in Chapter 2. While it is a frowned upon construct, it *is* an example of (a form of) block scope, in that the scope that is created from the object only exists for the lifetime of that `with` statement, and not in the enclosing scope.

### `try/catch`

It's a *very* little known fact that JavaScript in ES3 specified the variable declaration in the `catch` clause of a `try/catch` to be block-scoped to the `catch` block.

For instance:

```js
try {
	undefined(); // illegal operation to force an exception!
}
catch (err) {
	console.log( err ); // works!
}

console.log( err ); // ReferenceError: `err` not found
```

As you can see, `err` exists only in the `catch` clause, and throws an error when you try to reference it elsewhere.

**Note:** While this behavior has been specified and true of practically all standard JS environments (except perhaps old IE), many linters seem to still complain if you have two or more `catch` clauses in the same scope which each declare their error variable with the same identifier name. This is not actually a re-definition, since the variables are safely block-scoped, but the linters still seem to, annoyingly, complain about this fact.

To avoid these unnecessary warnings, some devs will name their `catch` variables `err1`, `err2`, etc. Other devs will simply turn off the linting check for duplicate variable names.

The block-scoping nature of `catch` may seem like a useless academic fact, but see Appendix B for more information on just how useful it might be.

### `let`

Thus far, we've seen that JavaScript only has some strange niche behaviors which expose block scope functionality. If that were all we had, and *it was* for many, many years, then block scoping would not be terribly useful to the JavaScript developer.

Fortunately, ES6 changes that, and introduces a new keyword `let` which sits alongside `var` as another way to declare variables.

The `let` keyword attaches the variable declaration to the scope of whatever block (commonly a `{ .. }` pair) it's contained in. In other words, `let` implicitly hijacks any block's scope for its variable declaration.

```js
var foo = true;

if (foo) {
	let bar = foo * 2;
	bar = something( bar );
	console.log( bar );
}

console.log( bar ); // ReferenceError
```

Using `let` to attach a variable to an existing block is somewhat implicit. It can confuse you if you're not paying close attention to which blocks have variables scoped to them, and are in the habit of moving blocks around, wrapping them in other blocks, etc., as you develop and evolve code.

Creating explicit blocks for block-scoping can address some of these concerns, making it more obvious where variables are attached and not. Usually, explicit code is preferable over implicit or subtle code. This explicit block-scoping style is easy to achieve, and fits more naturally with how block-scoping works in other languages:

```js
var foo = true;

if (foo) {
	{ // <-- explicit block
		let bar = foo * 2;
		bar = something( bar );
		console.log( bar );
	}
}

console.log( bar ); // ReferenceError
```

We can create an arbitrary block for `let` to bind to by simply including a `{ .. }` pair anywhere a statement is valid grammar. In this case, we've made an explicit block *inside* the if-statement, which may be easier as a whole block to move around later in refactoring, without affecting the position and semantics of the enclosing if-statement.

**Note:** For another way to express explicit block scopes, see Appendix B.

In Chapter 4, we will address hoisting, which talks about declarations being taken as existing for the entire scope in which they occur.

However, declarations made with `let` will *not* hoist to the entire scope of the block they appear in. Such declarations will not observably "exist" in the block until the declaration statement.

```js
{
   console.log( bar ); // ReferenceError!
   let bar = 2;
}
```

#### Garbage Collection

Another reason block-scoping is useful relates to closures and garbage collection to reclaim memory. We'll briefly illustrate here, but the closure mechanism is explained in detail in Chapter 5.

Consider:

```js
function process(data) {
	// do something interesting
}

var someReallyBigData = { .. };

process( someReallyBigData );

var btn = document.getElementById( "my_button" );

btn.addEventListener( "click", function click(evt){
	console.log("button clicked");
}, /*capturingPhase=*/false );
```

The `click` function click handler callback doesn't *need* the `someReallyBigData` variable at all. That means, theoretically, after `process(..)` runs, the big memory-heavy data structure could be garbage collected. However, it's quite likely (though implementation dependent) that the JS engine will still have to keep the structure around, since the `click` function has a closure over the entire scope.

Block-scoping can address this concern, making it clearer to the engine that it does not need to keep `someReallyBigData` around:

```js
function process(data) {
	// do something interesting
}

// anything declared inside this block can go away after!
{
	let someReallyBigData = { .. };

	process( someReallyBigData );
}

var btn = document.getElementById( "my_button" );

btn.addEventListener( "click", function click(evt){
	console.log("button clicked");
}, /*capturingPhase=*/false );
```

Declaring explicit blocks for variables to locally bind to is a powerful tool that you can add to your code toolbox.

#### `let` Loops

A particular case where `let` shines is in the for-loop case as we discussed previously.

```js
for (let i=0; i<10; i++) {
	console.log( i );
}

console.log( i ); // ReferenceError
```

Not only does `let` in the for-loop header bind the `i` to the for-loop body, but in fact, it **re-binds it** to each *iteration* of the loop, making sure to re-assign it the value from the end of the previous loop iteration.

Here's another way of illustrating the per-iteration binding behavior that occurs:

```js
{
	let j;
	for (j=0; j<10; j++) {
		let i = j; // re-bound for each iteration!
		console.log( i );
	}
}
```

The reason why this per-iteration binding is interesting will become clear in Chapter 5 when we discuss closures.

Because `let` declarations attach to arbitrary blocks rather than to the enclosing function's scope (or global), there can be gotchas where existing code has a hidden reliance on function-scoped `var` declarations, and replacing the `var` with `let` may require additional care when refactoring code.

Consider:

```js
var foo = true, baz = 10;

if (foo) {
	var bar = 3;

	if (baz > bar) {
		console.log( baz );
	}

	// ...
}
```

This code is fairly easily re-factored as:

```js
var foo = true, baz = 10;

if (foo) {
	var bar = 3;

	// ...
}

if (baz > bar) {
	console.log( baz );
}
```

But, be careful of such changes when using block-scoped variables:

```js
var foo = true, baz = 10;

if (foo) {
	let bar = 3;

	if (baz > bar) { // <-- don't forget `bar` when moving!
		console.log( baz );
	}
}
```

See Appendix B for an alternate (more explicit) style of block-scoping which may provide easier to maintain/refactor code that's more robust to these scenarios.

### `const`

In addition to `let`, ES6 introduces `const`, which also creates a block-scoped variable, but whose value is fixed (constant). Any attempt to change that value at a later time results in an error.

```js
var foo = true;

if (foo) {
	var a = 2;
	const b = 3; // block-scoped to the containing `if`

	a = 3; // just fine!
	b = 4; // error!
}

console.log( a ); // 3
console.log( b ); // ReferenceError!
```

## Review (TL;DR)

Functions are the most common unit of scope in JavaScript. Variables and functions that are declared inside another function are essentially "hidden" from any of the enclosing "scopes", which is an intentional design principle of good software.

But functions are by no means the only unit of scope. Block-scope refers to the idea that variables and functions can belong to an arbitrary block (generally, any `{ .. }` pair) of code, rather than only to the enclosing function.

Starting with ES3, the `try/catch` structure has block-scope in the `catch` clause.

In ES6, the `let` keyword (a cousin to the `var` keyword) is introduced to allow declarations of variables in any arbitrary block of code. `if (..) { let a = 2; }` will declare a variable `a` that essentially hijacks the scope of the `if`'s `{ .. }` block and attaches itself there.

Though some seem to believe so, block scope should not be taken as an outright replacement of `var` function scope. Both functionalities co-exist, and developers can and should use both function-scope and block-scope techniques where respectively appropriate to produce better, more readable/maintainable code.

[^note-leastprivilege]: [Principle of Least Privilege](http://en.wikipedia.org/wiki/Principle_of_least_privilege)
