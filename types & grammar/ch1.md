# You Don't Know JS: Types & Grammar
# Chapter 1: Types

Hầu hết các nhà phát triển sẽ nói rằng một ngôn ngữ động (như JS) không có *type*. Hãy xem thông số kỹ thuật ES5.1 (http://www.ecma-international.org/ecma-262/5.1/) nói gì về chủ đề này:

> Các thuật toán trong đặc tả này thao tác các giá trị mà mỗi thuật toán có một loại liên quan. Các loại giá trị có thể chính xác là những loại được định nghĩa trong điều khoản này. Các loại được phân loại phụ thành các loại ngôn ngữ ECMAScript và các loại đặc tả.
>
> Loại ngôn ngữ ECMAScript tương ứng với các giá trị được lập trình viên ECMAScript thao tác trực tiếp bằng ngôn ngữ ECMAScript. Các loại ngôn ngữ ECMAScript là Undefined, Null, Boolean, String, Number và Object.

Bây giờ, nếu bạn là người yêu thích các ngôn ngữ có type chặt chẽ (được gõ tĩnh), bạn có thể phản đối việc sử dụng từ "type". Trong các ngôn ngữ đó, "type" có ý nghĩa *nhiều hơn* so với ở đây trong JS.

Một số người nói rằng JS không nên tuyên bố có "type" và thay vào đó, chúng nên được gọi là "tag" hoặc có lẽ là "subtype".

Bah! Chúng ta sẽ sử dụng định nghĩa sơ bộ này (cùng một định nghĩa dường như định hướng cách diễn đạt của thông số kỹ thuật): *type* là một tập hợp các đặc điểm nội tại, tích hợp sẵn giúp xác định duy nhất hành vi của một giá trị cụ thể và phân biệt nó từ các giá trị khác, cho cả engine **và nhà phát triển**.

Nói cách khác, nếu cả engine và nhà phát triển xử lý giá trị `42` (number) khác với giá trị `"42"` (string), thì hai giá trị đó có *type* -- `number` và `string`, tương ứng. Khi bạn sử dụng `42`, bạn *có ý định* làm điều gì đó thuộc số, chẳng hạn như toán học. Nhưng khi bạn sử dụng `"42"`, bạn *có ý định* làm điều gì đó giống như chuỗi, chẳng hạn như xuất ra trang, v.v. **Hai giá trị này có các loại khác nhau.**

Đó không phải là một định nghĩa hoàn hảo. Nhưng nó đủ tốt cho cuộc thảo luận này. Và nó phù hợp với cách JS mô tả chính nó.

# A Type By Any Other Name...

Ngoài những bất đồng về định nghĩa học thuật, tại sao JavaScript có *type* hay không lại quan trọng?

Hiểu đúng về từng *type* và hành vi nội tại của nó là vô cùng cần thiết để hiểu cách chuyển đổi đúng và chính xác các giá trị thành các loại khác nhau (xem Coercion - ép kiểu, Chương 4). Gần như mọi chương trình JS từng được viết sẽ cần xử lý việc ép kiểu giá trị ở một dạng hoặc hình thức nào đó, vì vậy điều quan trọng là bạn phải làm như vậy một cách có trách nhiệm và tự tin.

Nếu bạn có giá trị `number` `42`, nhưng bạn muốn xử lý nó như một `string`, chẳng hạn như kéo ra `"2"` làm ký tự ở vị trí `1`, rõ ràng trước tiên bạn phải chuyển đổi (coerce ) giá trị từ `number` đến `string`.

Điều đó có vẻ đủ đơn giản.

Nhưng có nhiều cách khác nhau mà sự ép kiểu như vậy có thể xảy ra. Một số cách này là rõ ràng, dễ suy luận và đáng tin cậy. Nhưng nếu bạn không cẩn thận, sự ép kiểu có thể xảy ra theo những cách rất kỳ lạ và đáng ngạc nhiên.

Sự nhầm lẫn ép kiểu có lẽ là một trong những nỗi thất vọng sâu sắc nhất đối với các nhà phát triển JavaScript. Nó thường bị chỉ trích là *nguy hiểm* đến mức bị coi là một lỗ hổng trong thiết kế của ngôn ngữ, cần phải xa lánh và tránh xa.

Được trang bị kiến thức đầy đủ về các loại(type) JavaScript, chúng tôi muốn minh họa lý do tại sao *tiếng xấu* của tính cưỡng chế phần lớn bị thổi phồng quá mức và phần nào không được coi trọng -- để thay đổi quan điểm của bạn, để thấy được sức mạnh và tính hữu ích của tính năng ép kiểu. Nhưng trước tiên, chúng ta phải hiểu rõ hơn về các giá trị và loại.

## Built-in Types

JavaScript định nghĩa bảy loại build-in:

* `null`
* `undefined`
* `boolean`
* `number`
* `string`
* `object`
* `symbol` -- được thêm trong ES6!

**Note:** Tất cả các loại này ngoại trừ `object` được gọi là "primitives (nguyên thuỷ)".

Toán tử `typeof` kiểm tra type của giá trị đã cho và luôn trả về một trong bảy giá trị chuỗi -- đáng ngạc nhiên là không có kết quả khớp chính xác 1 đối 1 với bảy loại dựng sẵn mà chúng tôi vừa liệt kê.

```js
typeof undefined     === "undefined"; // true
typeof true          === "boolean";   // true
typeof 42            === "number";    // true
typeof "42"          === "string";    // true
typeof { life: 42 }  === "object";    // true

// added in ES6!
typeof Symbol()      === "symbol";    // true
```

Sáu loại được liệt kê này có các giá trị của loại tương ứng và trả về một giá trị chuỗi cùng tên, như được hiển thị. `Symbol` là một loại dữ liệu mới kể từ ES6 và sẽ được đề cập trong Chương 3.

Như bạn có thể nhận thấy, tôi đã loại trừ `null` khỏi danh sách trên. Đó là *đặc biệt* -- đặc biệt theo nghĩa nó có lỗi khi kết hợp với toán tử `typeof`:

```js
typeof null === "object"; // true
```

Sẽ thật tuyệt (và chính xác!) nếu nó trả về `"null"`, nhưng lỗi ban đầu này trong JS đã tồn tại gần hai thập kỷ và có thể sẽ không bao giờ được sửa vì có quá nhiều nội dung web hiện có phụ thuộc vào lỗi của nó hành vi "sửa" lỗi sẽ *tạo ra* nhiều "lỗi" hơn và làm hỏng nhiều phần mềm web.

Nếu bạn muốn kiểm tra giá trị `null` bằng cách sử dụng loại của nó, thì bạn cần một điều kiện phức hợp:

```js
var a = null;

(!a && typeof a === "object"); // true
```

`null` là giá trị primitive duy nhất "falsy" (hay còn gọi là false-like; xem Chương 4) nhưng giá trị đó cũng trả về `"object"` từ kiểm tra `typeof`.

Vậy giá trị chuỗi thứ bảy mà `typeof` có thể trả về là gì?

```js
typeof function a(){ /* .. */ } === "function"; // true
```

Thật dễ dàng để nghĩ rằng `function` sẽ là một loại tích hợp cấp cao nhất trong JS, đặc biệt là với hành vi này của toán tử `typeof`. Tuy nhiên, nếu bạn đọc thông số kỹ thuật, bạn sẽ thấy nó thực sự là một "subtype (kiểu phụ)" của object. Cụ thể, một function được gọi là "callable object" -- một object có thuộc tính `[[Call]]` bên trong cho phép nó được gọi.

Thực tế là các function thực sự là các object khá hữu ích. Quan trọng nhất, nó có thể có properties. Ví dụ:

```js
function a(b,c) {
	/* .. */
}
```

Function object có thuộc tính `length` được đặt thành số tham số hình thức được khai báo với nó.

```js
a.length; // 2
```

Vì bạn đã khai báo function với hai tham số được đặt tên chính thức (`b` và `c`), nên "độ dài của function" là `2`.

Còn mảng thì sao? Chúng có nguồn gốc từ JS, vậy chúng có phải là special type không?

```js
typeof [1,2,3] === "object"; // true
```

Không, chỉ là object. Điều thích hợp nhất là coi chúng như một "subtype" của object (xem Chương 3), trong trường hợp này với các đặc điểm bổ sung là được lập chỉ mục bằng số (ngược lại với việc chỉ được khóa chuỗi như các object đơn giản) và duy trì cập nhật tự động. Thuộc tính `.length`.

## Values as Types

Trong JavaScript, các biến không có type -- **giá trị có type**. Các biến có thể giữ bất kỳ giá trị nào, tại bất kỳ thời điểm nào.

Một cách khác để nghĩ về các type JS là JS không có "type enforcement (thực thi kiểu)", trong đó công cụ không nhấn mạnh rằng một *biến* luôn giữ các giá trị của *cùng loại ban đầu* mà nó bắt đầu. Một biến có thể, trong một câu lệnh gán, giữ một `chuỗi`, và trong lần tiếp theo giữ một `số`, v.v.

*giá trị* `42` có loại nội tại là `number` và không thể thay đổi *loại* của nó. Một giá trị khác, chẳng hạn như `"42"` với loại `string`, có thể được tạo *từ* giá trị `number` `42` thông qua một quá trình gọi là **coercion (ép kiểu)** (xem Chương 4).

Nếu bạn sử dụng `typeof` đối với một biến, nó sẽ không hỏi "loại biến là gì?" có vẻ như, vì các biến JS không có kiểu. Thay vào đó, nó hỏi "loại giá trị *trong* biến là gì?"

```js
var a = 42;
typeof a; // "number"

a = true;
typeof a; // "boolean"
```

Toán tử `typeof` luôn trả về một chuỗi. Vì thế:

```js
typeof typeof 42; // "string"
```

`typeof 42` đầu tiên trả về `"number"` và `typeof "number"` là `"string"`.

### `undefined` vs "undeclared"

Các biến không có giá trị *hiện tại*, thực sự có giá trị `undefined`. Gọi `typeof` đối với các biến như vậy sẽ trả về `"undefined"`:

```js
var a;

typeof a; // "undefined"

var b = 42;
var c;

// later
b = c;

typeof b; // "undefined"
typeof c; // "undefined"
```

Hầu hết các nhà phát triển đều nghĩ đến từ "undefined (không xác định)" và coi nó như một từ đồng nghĩa với "undeclared (không được khai báo)". Tuy nhiên, trong JS, hai khái niệm này khá khác nhau.

Biến "undefined" là biến đã được khai báo trong phạm vi có thể truy cập, nhưng *tại thời điểm này* không có giá trị nào khác trong đó. Ngược lại, biến "undeclared (không được khai báo)" là biến chưa được khai báo chính thức trong phạm vi có thể truy cập.

Consider:

```js
var a;

a; // undefined
b; // ReferenceError: b is not defined
```

Một sự nhầm lẫn khó chịu là thông báo lỗi mà các trình duyệt gán cho tình trạng này. Như bạn có thể thấy, thông báo là "b is not defined", tất nhiên là rất dễ nhầm lẫn với "b is undefined". Một lần nữa, "undefined" và "is not defined" là những thứ rất khác nhau. Sẽ thật tuyệt nếu các trình duyệt nói điều gì đó như "b is not found" hoặc "b is not declared" để giảm bớt sự nhầm lẫn!

Ngoài ra còn có một hành vi đặc biệt liên quan đến `typeof` vì nó liên quan đến các biến không được khai báo thậm chí còn làm tăng thêm sự nhầm lẫn. Coi như:

```js
var a;

typeof a; // "undefined"

typeof b; // "undefined"
```

Toán tử `typeof` trả về `"undefined"` ngay cả đối với các biến "undeclared" (hoặc "not defined"). Lưu ý rằng không có lỗi nào xảy ra khi chúng tôi thực thi `typeof b`, mặc dù `b` là một biến không được khai báo. Đây là biện pháp bảo vệ an toàn đặc biệt trong hành vi của `typeof`.

Tương tự như trên, sẽ rất tuyệt nếu `typeof` được sử dụng với biến không khai báo trả về "undeclared" thay vì kết hợp giá trị kết quả với trường hợp "undefined" khác.

### `typeof` Undeclared

Tuy nhiên, biện pháp bảo vệ an toàn này là một tính năng hữu ích khi xử lý JavaScript trong trình duyệt, nơi nhiều tệp tập lệnh có thể tải các biến vào không gian tên chung được chia sẻ.

**Lưu ý:** Nhiều nhà phát triển tin rằng không bao giờ nên có bất kỳ biến nào trong không gian tên chung và mọi thứ phải được chứa trong các mô-đun và không gian tên riêng tư/riêng biệt. Điều này là tuyệt vời về mặt lý thuyết nhưng gần như không thể trong thực tế; nó vẫn là một mục tiêu tốt để phấn đấu hướng tới! May mắn thay, ES6 đã thêm hỗ trợ first-class cho các mô-đun, điều này cuối cùng sẽ làm cho điều đó trở nên thiết thực hơn nhiều.

Lấy một ví dụ đơn giản, hãy tưởng tượng có một "debug mode (chế độ gỡ lỗi)" trong chương trình của bạn được kiểm soát bởi một global variable (biến toàn cục) (flag - cờ) có tên là `DEBUG`. Bạn muốn kiểm tra xem biến đó đã được khai báo chưa trước khi thực hiện tác vụ debug (gỡ lỗi) như ghi thông báo vào console. Khai báo toàn cục cấp cao nhất `var DEBUG = true` sẽ chỉ được bao gồm trong tệp "debug.js", mà bạn chỉ tải vào trình duyệt khi bạn đang development/testing chứ không phải trong production.

Tuy nhiên, bạn phải quan tâm đến cách bạn kiểm tra biến `DEBUG` chung trong phần còn lại của mã ứng dụng của mình, để bạn không ném ra `ReferenceError`. Bộ bảo vệ an toàn trên `typeof` là bạn của chúng ta trong trường hợp này.

```js
// oops, this would throw an error!
if (DEBUG) {
	console.log( "Debugging is starting" );
}

// this is a safe existence check
if (typeof DEBUG !== "undefined") {
	console.log( "Debugging is starting" );
}
```

Kiểu kiểm tra này hữu ích ngay cả khi bạn không xử lý các biến do người dùng định nghĩa (như `DEBUG`). Nếu bạn đang thực hiện kiểm tra tính năng cho build-in API, bạn cũng có thể thấy hữu ích khi kiểm tra mà không gây ra lỗi:

```js
if (typeof atob === "undefined") {
	atob = function() { /*..*/ };
}
```

**Lưu ý:** Nếu bạn đang xác định "polyfill" cho một feature chưa tồn tại, bạn có thể muốn tránh sử dụng `var` để thực hiện khai báo `atob`. Nếu bạn khai báo `var atob` bên trong câu lệnh `if`, thì khai báo này sẽ được hoisted (xem cuốn *Scope & Closure* của loạt bài này) lên đầu của scope, ngay cả khi điều kiện `if` không vượt qua ( bởi vì `atob` toàn cục đã tồn tại!). Trong một số trình duyệt và đối với một số loại biến tích hợp toàn cục đặc biệt (thường được gọi là "host object"), khai báo trùng lặp này có thể gây ra lỗi. Việc bỏ qua `var` sẽ ngăn hoisted khai báo này.

Một cách khác để thực hiện các kiểm tra này đối với các biến toàn cục nhưng không có tính năng bảo vệ an toàn của `typeof` là quan sát xem tất cả các biến toàn cục cũng là thuộc tính của global object, mà trong trình duyệt về cơ bản là object `window`. Vì vậy, các kiểm tra trên có thể đã được thực hiện (khá an toàn) như:

```js
if (window.DEBUG) {
	// ..
}

if (!window.atob) {
	// ..
}
```

Không giống như tham chiếu đến các biến không được khai báo, sẽ không có `ReferenceError` được ném ra nếu bạn cố gắng truy cập một object property (ngay cả trên đối tượng `window` chung) không tồn tại.

Mặt khác, việc tham chiếu biến toàn cục theo cách thủ công bằng tham chiếu `window` là điều mà một số nhà phát triển muốn tránh, đặc biệt nếu code của bạn cần chạy trong nhiều môi trường JS (chẳng hạn như không chỉ trình duyệt mà cả node.js phía máy chủ ), khi đó global object có thể không phải lúc nào cũng được gọi là `window`.

Về mặt kỹ thuật, biện pháp bảo vệ an toàn này trên `typeof` hữu ích ngay cả khi bạn không sử dụng các biến toàn cục, mặc dù những trường hợp này ít phổ biến hơn và một số nhà phát triển có thể thấy phương pháp thiết kế này ít được ưa chuộng hơn. Hãy tưởng tượng một chức năng tiện ích mà bạn muốn người khác sao chép và dán vào chương trình hoặc mô-đun của họ, trong đó bạn muốn kiểm tra xem chương trình bao gồm đã xác định một biến nhất định (để bạn có thể sử dụng nó) hay chưa:

```js
function doSomethingCool() {
	var helper =
		(typeof FeatureXYZ !== "undefined") ?
		FeatureXYZ :
		function() { /*.. default feature ..*/ };

	var val = helper();
	// ..
}
```

`doSomethingCool()` kiểm tra một biến có tên là `FeatureXYZ` và nếu tìm thấy, hãy sử dụng nó, còn nếu không, hãy sử dụng biến đó. Bây giờ, nếu ai đó đưa utility(tiện ích) này vào module/chương trình của họ, nó sẽ kiểm tra một cách an toàn xem họ đã xác định `FeatureXYZ` hay chưa:

```js
// an IIFE (see "Immediately Invoked Function Expressions"
// discussion in the *Scope & Closures* title of this series)
(function(){
	function FeatureXYZ() { /*.. my XYZ feature ..*/ }

	// include `doSomethingCool(..)`
	function doSomethingCool() {
		var helper =
			(typeof FeatureXYZ !== "undefined") ?
			FeatureXYZ :
			function() { /*.. default feature ..*/ };

		var val = helper();
		// ..
	}

	doSomethingCool();
})();
```

Ở đây, `FeatureXYZ` hoàn toàn không phải là một biến toàn cục, nhưng chúng tôi vẫn đang sử dụng biện pháp bảo vệ an toàn của `typeof` để đảm bảo an toàn khi kiểm tra. Và quan trọng là, ở đây *không có* object mà chúng ta có thể sử dụng (giống như chúng ta đã làm với các biến toàn cục với `window.___`) để kiểm tra, vì vậy `typeof` khá hữu ích.

Các nhà phát triển khác sẽ thích một mẫu thiết kế có tên là "dependency injection", trong đó thay vì `doSomethingCool()` kiểm tra hoàn toàn để `FeatureXYZ` được xác định bên ngoài/xung quanh nó, nó sẽ cần phải đưa thông tin phụ thuộc vào một cách rõ ràng, chẳng hạn như:

```js
function doSomethingCool(FeatureXYZ) {
	var helper = FeatureXYZ ||
		function() { /*.. default feature ..*/ };

	var val = helper();
	// ..
}
```

Có rất nhiều lựa chọn khi thiết kế chức năng như vậy. Không có mô hình nào ở đây là "đúng" hay "sai" -- mỗi cách tiếp cận đều có sự đánh đổi khác nhau. Nhưng nhìn chung, thật tuyệt khi bộ phận bảo vệ an toàn không được khai báo `typeof` mang lại cho chúng tôi nhiều lựa chọn hơn.

## Review

JavaScript có bảy *kiểu* tích hợp sẵn: `null`, `undefined`, `boolean`, `number`, `string`, `object`, `symbol`. Chúng có thể được xác định bởi toán tử `typeof`.

Các biến không có kiểu, nhưng các giá trị trong chúng thì có. Các loại này xác định hành vi nội tại của các giá trị.

Nhiều nhà phát triển sẽ cho rằng "undefined" và "undeclared" gần như giống nhau, nhưng trong JavaScript, chúng hoàn toàn khác nhau. `undefined` là một giá trị mà một biến đã khai báo có thể nắm giữ. "undeclared" có nghĩa là một biến chưa bao giờ được khai báo.

Thật không may, JavaScript lại kết hợp hai thuật ngữ này, không chỉ trong các thông báo lỗi của nó ("ReferenceError: a is not defined") mà còn trong các giá trị trả về của `typeof`, là `"undefined"` cho cả hai trường hợp.

Tuy nhiên, biện pháp bảo vệ an toàn (ngăn lỗi) trên `typeof` khi được sử dụng đối với một biến không được khai báo có thể hữu ích trong một số trường hợp nhất định.
