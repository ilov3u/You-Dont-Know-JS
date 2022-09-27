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

Bây giờ chúng ta có một hàm dưới dạng một biểu thức bằng cách gói nó trong một cặp `()`, chúng ta có thể thực thi hàm đó bằng cách thêm một dấu `()` khác vào cuối, như `(function foo(){..})() `. Cặp `()` bao quanh đầu tiên làm cho hàm trở thành một biểu thức và cặp `()` thứ hai thực thi hàm.

Mô hình này rất phổ biến, một vài năm trước, cộng đồng đã đồng ý về một thuật ngữ cho nó: **IIFE**, which stands for **I**mmediately **I**nvoked **F**unction **E**xpression.

Tất nhiên, IIFE không nhất thiết phải có tên - dạng phổ biến nhất của IIFE là sử dụng một biểu thức hàm ẩn danh. Mặc dù chắc chắn ít phổ biến hơn, nhưng việc đặt tên cho IIFE có tất cả các lợi ích đã nói ở trên so với các biểu thức hàm ẩn danh, vì vậy bạn nên áp dụng.

```js
var a = 2;

(function IIFE(){

	var a = 3;
	console.log( a ); // 3

})();

console.log( a ); // 2
```

Có một chút biến thể trên biểu mẫu IIFE truyền thống, mà một số người thích hơn: `(function(){..}())`. Nhìn kỹ để thấy sự khác biệt. Ở dạng đầu tiên, biểu thức hàm được bao bọc trong `()`, và sau đó cặp `()` đang gọi ở bên ngoài ngay sau nó. Ở dạng thứ hai, cặp `()` đang gọi được chuyển vào bên trong của cặp bao ngoài `()`.

Hai hình thức này giống hệt nhau về chức năng. **Đó hoàn toàn là một lựa chọn phong cách mà bạn thích.**

Một biến thể khác trên IIFE's khá phổ biến là sử dụng thực tế rằng chúng chỉ là các lệnh gọi hàm và truyền vào (các) đối số.

Ví dụ:

```js
var a = 2;

(function IIFE( global ){

	var a = 3;
	console.log( a ); // 3
	console.log( global.a ); // 2

})( window );

console.log( a ); // 2
```

Chúng tôi chuyển vào tham chiếu đối tượng `window`, nhưng chúng tôi đặt tên cho tham số là `global`, để chúng tôi có sự phân định rõ ràng theo phong cách cho các tham chiếu toàn cục và không toàn cục. Tất nhiên, bạn có thể chuyển bất kỳ thứ gì từ scope bao quanh mà bạn muốn và bạn có thể đặt tên (các) tham số bất kỳ thứ gì phù hợp với mình. Đây hầu hết chỉ là sự lựa chọn theo phong cách.

Một ứng dụng khác của mẫu này giải quyết mối lo ngại (ngách nhỏ) rằng giá trị nhận dạng `undefined` mặc định có thể có giá trị của nó bị ghi đè không chính xác, gây ra kết quả không mong muốn. Bằng cách đặt tên một tham số là `undefined`, nhưng không chuyển bất kỳ giá trị nào cho đối số đó, chúng tôi có thể đảm bảo rằng identifier `undefined` trên thực tế là giá trị không xác định trong một khối code:

```js
undefined = true; // setting a land-mine for other code! avoid!

(function IIFE( undefined ){

	var a;
	if (a === undefined) {
		console.log( "Undefined is safe here!" );
	}

})();
```

Vẫn còn một biến thể khác của IIFE đảo ngược thứ tự của mọi thứ, trong đó hàm để thực thi được đưa ra thứ hai, *sau* lệnh gọi và các tham số để chuyển cho nó. Mẫu này được sử dụng trong dự án UMD (Định nghĩa mô-đun chung). Một số người thấy nó dễ hiểu hơn một chút để hiểu, mặc dù nó hơi dài dòng hơn một chút.

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

Biểu thức hàm `def` được xác định trong nửa sau của đoạn code, sau đó được chuyển dưới dạng tham số (còn được gọi là `def`) cho hàm `IIFE` được xác định trong nửa đầu của đoạn code. Cuối cùng, tham số `def` (hàm) được gọi, truyền `window` vào dưới dạng tham số `global`.

## Blocks As Scopes

Trong khi các hàm là đơn vị scope phổ biến nhất và chắc chắn là phổ biến rộng rãi nhất trong các phương pháp thiết kế trong phần lớn JS đang lưu hành, các đơn vị scope khác là có thể và việc sử dụng các đơn vị scope khác này có thể dẫn đến tốt hơn, sạch hơn để duy trì code.

Nhiều ngôn ngữ khác ngoài JavaScript hỗ trợ Block Scope và vì vậy các nhà phát triển từ những ngôn ngữ đó đã quen với suy nghĩ này, trong khi những người chủ yếu chỉ làm việc trong JavaScript có thể thấy khái niệm này hơi xa lạ.

Nhưng ngay cả khi bạn chưa bao giờ viết một dòng code nào trong block scope, bạn vẫn có thể quen thuộc với cú pháp cực kỳ phổ biến này trong JavaScript:

```js
for (var i=0; i<10; i++) {
	console.log( i );
}
```

Chúng ta khai báo biến `i` trực tiếp bên trong phần đầu vòng lặp for, rất có thể bởi vì *ý định* của chúng ta là chỉ sử dụng `i` trong ngữ cảnh của vòng lặp đó và về cơ bản bỏ qua thực tế rằng biến thực sự scope chính nó scope bao quanh (function hoặc toàn cục).

Đó là tất cả những gì về block scope. Khai báo các biến càng gần càng tốt, càng cục bộ càng tốt, đến nơi chúng sẽ được sử dụng. Một vi dụ khác:

```js
var foo = true;

if (foo) {
	var bar = foo * 2;
	bar = something( bar );
	console.log( bar );
}
```

Chúng ta đang sử dụng một biến `bar` chỉ trong ngữ cảnh của câu lệnh if, vì vậy, có nghĩa là chúng ta sẽ khai báo nó bên trong khối if. Tuy nhiên, nơi chúng ta khai báo các biến không có liên quan khi sử dụng `var`, vì chúng sẽ luôn thuộc scope bao quanh. Đoạn mã này về cơ bản là block scope "giả mạo", vì lý do phong cách và dựa vào việc tự thực thi để không vô tình sử dụng `bar` ở một nơi khác trong scope đó.

Block scope là một công cụ để mở rộng "Principle of Least ~~Privilege~~ Exposure (Nguyên Tắc Ít Nhất Tiếp Xúc ~~Đặc Quyền~~)" [^note-leastprivilege] từ ẩn thông tin trong các hàm đến ẩn thông tin trong các khối code của chúng ta.

Hãy xem xét lại ví dụ về vòng lặp:

```js
for (var i=0; i<10; i++) {
	console.log( i );
}
```

Tại sao lại gây ảnh hưởng toàn bộ scope của một hàm với biến `i` sẽ chỉ được (hoặc chỉ *nên là*, ít nhất) được sử dụng cho vòng lặp for?

Nhưng quan trọng hơn, các nhà phát triển có thể thích tự *kiểm tra* để tránh việc vô tình (lại) sử dụng các biến ngoài mục đích của nó, chẳng hạn như bị báo lỗi về một biến không xác định nếu bạn cố sử dụng nó không đúng chỗ. Block scope (nếu có thể) cho biến `i` sẽ làm cho `i` chỉ khả dụng cho vòng lặp for, gây ra lỗi nếu `i` được truy cập ở nơi khác trong hàm. Điều này giúp đảm bảo các biến không được sử dụng lại theo những cách khó hiểu hoặc khó bảo trì.

Nhưng, một thực tế đáng buồn là, nhìn bề ngoài, JavaScript không có cơ sở cho block scope.

Đó là, cho đến khi bạn đào sâu hơn một chút.

### `with`

Chúng ta đã tìm hiểu về `with` trong Chương 2. Mặc dù nó là một cấu trúc khó hiểu, nó *là* một ví dụ về (một dạng của) block scope, trong đó scope được tạo từ đối tượng chỉ tồn tại trong suốt thời gian tồn tại của nó câu lệnh `with`, và không nằm trong scope kèm theo.

### `try/catch`

Một sự thật *rất* ít được biết đến là JavaScript trong ES3 đã chỉ định khai báo biến trong mệnh đề `catch` của một `try/catch` để được phân chia theo phạm vi khối thành khối `catch`.

Ví dụ:

```js
try {
	undefined(); // illegal operation to force an exception!
}
catch (err) {
	console.log( err ); // works!
}

console.log( err ); // ReferenceError: `err` not found
```

Như bạn có thể thấy, `err` chỉ tồn tại trong mệnh đề` catch` và phát sinh lỗi khi bạn cố gắng tham chiếu nó ở nơi khác.

**Lưu ý:** Mặc dù hành vi này đã được chỉ định và thực tế đúng với tất cả các môi trường JS tiêu chuẩn (có lẽ ngoại trừ IE cũ), nhưng nhiều người có vẻ vẫn phàn nàn nếu bạn có hai hoặc nhiều mệnh đề `catch` trong cùng một scope mà mỗi mệnh đề khai báo biến lỗi của chúng có cùng tên identifier. Đây thực sự không phải là một định nghĩa lại, vì các biến được xác định block scope một cách an toàn, nhưng những người trong nhóm dường như vẫn phàn nàn một cách khó chịu về thực tế này.

Để tránh những cảnh báo không cần thiết này, một số nhà phát triển sẽ đặt tên cho các biến `catch` của họ là `err1`, `err2`, v.v. Các nhà phát triển khác sẽ chỉ cần tắt tính năng kiểm tra tên biến trùng lặp.

Bản chất block scope của `catch` có vẻ như là một thực tế học thuật vô ích, nhưng hãy xem Phụ lục B để biết thêm thông tin về mức độ hữu ích của nó.

### `let`

Cho đến nay, chúng ta đã thấy rằng JavaScript chỉ có một số hành vi thích hợp kỳ lạ làm lộ block scope. Nếu đó là tất cả những gì chúng ta có, và *nó đã* trong nhiều, rất nhiều năm, thì block scope sẽ không hữu ích lắm đối với nhà phát triển JavaScript.

May mắn thay, ES6 thay đổi điều đó và giới thiệu một từ khóa mới `let` nằm cùng với `var` như một cách khác để khai báo các biến.

Từ khóa `let` đính kèm khai báo biến với scope của bất kỳ khối nào (thường là cặp `{..}`) mà nó chứa trong đó. Nói cách khác, `let` ngầm chiếm đoạt scope của bất kỳ khối nào đối với khai báo biến của nó..

```js
var foo = true;

if (foo) {
	let bar = foo * 2;
	bar = something( bar );
	console.log( bar );
}

console.log( bar ); // ReferenceError
```

Sử dụng `let` để đính kèm một biến vào một khối hiện có hơi ngầm. Nó có thể khiến bạn bối rối nếu bạn không chú ý đến khối nào có các biến trong scope đến chúng và có thói quen di chuyển các khối xung quanh, gói chúng trong các khối khác, v.v., khi bạn phát triển và phát triển code.

Việc tạo các khối rõ ràng cho block scope có thể giải quyết một số mối quan tâm này, làm rõ ràng hơn nơi các biến được đính kèm và không. Thông thường, code rõ ràng được ưu tiên hơn code ẩn. Phong cách xác định block scope rõ ràng này dễ đạt được và phù hợp tự nhiên hơn với cách xác định block scope hoạt động trong các ngôn ngữ khác:

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

Chúng ta có thể tạo một khối tùy ý cho `let` để liên kết bằng cách chỉ cần thêm một cặp `{..}` vào bất kỳ đâu mà một câu lệnh là ngữ pháp hợp lệ. Trong trường hợp này, chúng ta đã tạo một khối rõ ràng *bên trong* câu lệnh if, có thể dễ dàng hơn khi toàn bộ khối di chuyển xung quanh sau này trong quá trình cấu trúc lại, mà không ảnh hưởng đến vị trí và ngữ nghĩa của câu lệnh if đi kèm.

**Lưu ý:** Để biết một cách khác để thể hiện block scope rõ ràng, hãy xem Phụ lục B.

Trong Chương 4, chúng ta sẽ đề cập đến việc nâng cấp, nói về việc các khai báo được coi là hiện có trong toàn bộ scope mà chúng xảy ra.

Tuy nhiên, các khai báo được thực hiện với `let` sẽ *không* nâng lên toàn bộ scope của khối mà chúng xuất hiện. Các khai báo như vậy sẽ không "tồn tại" trong khối cho đến khi có câu lệnh khai báo.

```js
{
   console.log( bar ); // ReferenceError!
   let bar = 2;
}
```

#### Garbage Collection

Một lý do khác khiến block scope hữu ích liên quan đến việc đóng gói và thu gom rác để lấy lại bộ nhớ. Chúng ta sẽ minh họa ngắn gọn ở đây, nhưng cơ chế closure được giải thích chi tiết trong Chương 5.

Xem xét:

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

Lệnh gọi lại trình xử lý nhấp chuột của hàm `click` không *cần* biến `someReallyBigData`. Điều đó có nghĩa là, về mặt lý thuyết, sau khi chạy `process(..)`, cấu trúc dữ liệu nặng bộ nhớ lớn có thể được thu thập rác. Tuy nhiên, có nhiều khả năng (mặc dù phụ thuộc vào việc triển khai) rằng công cụ JS vẫn sẽ phải giữ cấu trúc xung quanh, vì hàm `click` có một closure trên toàn bộ scope.

Block scope có thể giải quyết mối quan tâm này, làm rõ ràng hơn với engine rằng nó không cần phải giữ `someReallyBigData` xung quanh:

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

Khai báo các khối rõ ràng cho các biến để liên kết cục bộ là một công cụ mạnh mẽ mà bạn có thể thêm vào hộp công cụ code của mình.

#### `let` Loops

Một trường hợp cụ thể trong đó `let` nằm trong trường hợp vòng lặp như chúng ta đã thảo luận trước đây.

```js
for (let i=0; i<10; i++) {
	console.log( i );
}

console.log( i ); // ReferenceError
```

`let` trong khởi tạo vòng lặp không chỉ liên kết `i` với nội dung vòng lặp, mà trên thực tế, nó **liên kết lại nó** với mỗi *lần lặp* của vòng lặp, đảm bảo rằng gán lại cho nó giá trị từ cuối lần lặp vòng lặp trước đó.

Đây là một cách khác để minh họa hành vi liên kết mỗi lần lặp lại xảy ra:

```js
{
	let j;
	for (j=0; j<10; j++) {
		let i = j; // re-bound for each iteration!
		console.log( i );
	}
}
```

Lý do tại sao ràng buộc mỗi lần lặp lại thú vị này sẽ trở nên rõ ràng trong Chương 5 khi chúng ta thảo luận về các closure.

Bởi vì khai báo `let` gắn vào các khối tùy ý thay vì scope của hàm bao quanh (hoặc toàn cục), có thể có các lỗi trong đó code hiện tại có sự phụ thuộc ẩn vào các khai báo `var` trong function-scope và thay thế `var` bằng `let` có thể yêu cầu chăm sóc bổ sung khi cấu trúc lại code.

Xem xét:

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

Code này khá dễ dàng được re-factored như là:

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

Tuy nhiên, hãy cẩn thận với những thay đổi như vậy khi sử dụng các biến block scope:

```js
var foo = true, baz = 10;

if (foo) {
	let bar = 3;

	if (baz > bar) { // <-- don't forget `bar` when moving!
		console.log( baz );
	}
}
```

Xem Phụ lục B để biết kiểu block scope thay thế (rõ ràng hơn) có thể cung cấp code dễ duy trì/cấu trúc lại, mạnh mẽ hơn cho các trường hợp này.

### `const`

Ngoài `let`, ES6 giới thiệu `const`, cũng tạo ra một biến block scope, nhưng giá trị của nó là hằng số (không đổi). Bất kỳ nỗ lực nào để thay đổi giá trị đó sau đó đều dẫn đến lỗi.

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

Hàm là đơn vị scope phổ biến nhất trong JavaScript. Các biến và hàm được khai báo bên trong một hàm khác về cơ bản là "ẩn" khỏi bất kỳ "scope" bao quanh, đó là một nguyên tắc thiết kế có chủ đích của phần mềm tốt.

Nhưng các hàm không có nghĩa là đơn vị duy nhất của scope. Block scope đề cập đến ý tưởng rằng các biến và hàm có thể thuộc về một khối tùy ý (nói chung, bất kỳ cặp mã `{..}` nào), thay vì chỉ cho hàm bao.

Bắt đầu với ES3, cấu trúc `try/catch` có block scope trong mệnh đề `catch`.

Trong ES6, từ khóa `let` (anh em họ với từ khóa `var`) được giới thiệu để cho phép khai báo các biến trong bất kỳ khối mã tùy ý nào. `if (..) {let a = 2;}` sẽ khai báo một biến `a` về cơ bản chiếm quyền điều khiển scope của khối `if` `{..}` và tự gắn vào đó.

Mặc dù một số người có vẻ tin như vậy, nhưng block scope không nên được coi là sự thay thế hoàn toàn của function scope `var`. Cả hai chức năng cùng tồn tại và các nhà phát triển có thể và nên sử dụng cả kỹ thuật function scope và block scope khi thích hợp để tạo ra code tốt hơn, dễ đọc hơn/dễ bảo trì hơn.

[^note-leastprivilege]: [Principle of Least Privilege](http://en.wikipedia.org/wiki/Principle_of_least_privilege)
