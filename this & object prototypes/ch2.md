# You Don't Know JS: *this* & Object Prototypes
# Chapter 2: `this` All Makes Sense Now!

Trong Chương 1, chúng ta đã loại bỏ các quan niệm sai lầm khác nhau về `this` và thay vào đó học được rằng `this` là một ràng buộc được tạo cho mỗi lệnh gọi function, hoàn toàn dựa trên **call-site** của nó (cách hàm được gọi).

## Call-site

Để hiểu ràng buộc `this`, chúng ta phải hiểu call-site: vị trí trong code nơi một hàm được gọi (**không phải nơi nó được khai báo**). Chúng ta phải kiểm tra call-site để trả lời câu hỏi: cái gì là *cái* `this` tham chiếu đến?

Tìm kiếm call-site nói chung là: "hãy xác định vị trí một hàm được gọi từ đâu", nhưng không phải lúc nào cũng dễ dàng như vậy, vì một số coding pattern nhất định có thể che khuất  call-site  *thực sự*.

Điều quan trọng là hãy nghĩ về **call-stack** (ngăn xếp các hàm đã được gọi để đưa chúng ta đến thời điểm hiện tại trong quá trình thực thi). Call-site mà chúng ta quan tâm là *trong* lệnh gọi *trước* function hiện đang thực thi.

Hãy chứng minh call-stack và call-site:

```js
function baz() {
    // call-stack is: `baz`
    // so, our call-site is in the global scope

    console.log( "baz" );
    bar(); // <-- call-site for `bar`
}

function bar() {
    // call-stack is: `baz` -> `bar`
    // so, our call-site is in `baz`

    console.log( "bar" );
    foo(); // <-- call-site for `foo`
}

function foo() {
    // call-stack is: `baz` -> `bar` -> `foo`
    // so, our call-site is in `bar`

    console.log( "foo" );
}

baz(); // <-- call-site for `baz`
```

Hãy cẩn thận khi phân tích code để tìm call-site thực tế (từ call-stack), vì đó là điều duy nhất quan trọng đối với ràng buộc `this`.

**Lưu ý:** Bạn có thể hình dung call-stack trong tâm trí mình bằng cách xem xét chuỗi lệnh gọi function theo thứ tự, như chúng ta đã làm với các nhận xét trong đoạn code trên. Nhưng điều này là khó khăn và dễ xảy ra sai sót. Một cách khác để xem call-stack là sử dụng công cụ gỡ lỗi(debugger) trong trình duyệt của bạn. Hầu hết các trình duyệt máy tính để bàn hiện đại đều có các công cụ dành cho nhà phát triển được tích hợp sẵn, bao gồm trình gỡ lỗi JS. Trong đoạn code trên, bạn có thể đã đặt break point trong các công cụ cho dòng đầu tiên của hàm `foo()` hoặc chỉ cần chèn câu lệnh `debugger;` vào dòng đầu tiên đó. Khi bạn chạy trang, trình gỡ lỗi sẽ tạm dừng tại vị trí này và sẽ hiển thị cho bạn danh sách các hàm đã được gọi để đến dòng đó, đây sẽ là call-stack của bạn. Vì vậy, nếu bạn đang cố gắng chẩn đoán ràng buộc `this`, hãy sử dụng các công cụ dành cho nhà phát triển để lấy call-stack, sau đó tìm mục thứ hai từ trên cùng và điều đó sẽ hiển thị cho bạn call-site thực sự.

## Nothing But Rules

Bây giờ chúng ta chuyển sự chú ý của mình sang *cách* call-site xác định nơi `this` sẽ trỏ đến trong quá trình thực thi một function.

Bạn phải kiểm tra call-site và xác định quy tắc nào trong 4 quy tắc áp dụng. Trước tiên, chúng ta sẽ giải thích độc lập từng quy tắc trong số 4 quy tắc này và sau đó chúng ta sẽ minh họa thứ tự ưu tiên của chúng, nếu nhiều quy tắc *có thể* áp dụng cho trang web gọi.

### Default Binding (Ràng Buộc Mặc Định)

Quy tắc đầu tiên chúng ta sẽ kiểm tra xuất phát từ trường hợp phổ biến nhất của các lệnh gọi function: lệnh gọi function độc lập. Hãy coi quy tắc *này* `this` là quy tắc nhận tất cả mặc định khi không có quy tắc nào khác áp dụng.

Hãy xem xét đoạn code này:

```js
function foo() {
	console.log( this.a );
}

var a = 2;

foo(); // 2
```

Điều đầu tiên cần lưu ý, nếu bạn chưa biết, là các biến được khai báo trong scope toàn cục, như `var a = 2`, đồng nghĩa với các thuộc tính của global-object có cùng tên. Chúng không phải là bản sao của nhau, chúng *là* của nhau. Hãy coi nó như hai mặt của cùng một đồng xu.

Thứ hai, chúng ta thấy rằng khi `foo()` được gọi, `this.a` sẽ phân giải thành biến toàn cục `a` của chúng ta. Tại sao? Bởi vì trong trường hợp này, *ràng buộc mặc định* cho `this` áp dụng cho lệnh gọi hàm và do đó trỏ `this` vào đối tượng toàn cục.

Làm cách nào để chúng ta biết rằng quy tắc *ràng buộc mặc định* áp dụng ở đây? Chúng tôi kiểm tra trang web cuộc gọi để xem cách gọi `foo ()`. Trong đoạn code của chúng ta, `foo()` được gọi với một tham chiếu hàm đơn giản, không được trang trí. Không có quy tắc nào khác mà chúng ta sẽ trình bày sẽ áp dụng ở đây, vì vậy *ràng buộc mặc định* sẽ được áp dụng thay thế.

Nếu `strict mode` được sử dụng, global object không đủ điều kiện cho *ràng buộc mặc định*, vì vậy `this` thay vào đó được đặt thành `undefined`.

```js
function foo() {
	"use strict";

	console.log( this.a );
}

var a = 2;

foo(); // TypeError: `this` is `undefined`
```

Một chi tiết tinh tế nhưng quan trọng là: mặc dù các quy tắc ràng buộc `this` tổng thể hoàn toàn dựa trên call-site, global object **chỉ** đủ điều kiện cho *ràng buộc mặc định* nếu **nội dung** của `foo()`đang **không** chạy trong `strict mode`; trạng thái `strict mode` của call-site của `foo()` là không liên quan.

```js
function foo() {
	console.log( this.a );
}

var a = 2;

(function(){
	"use strict";

	foo(); // 2
})();
```

**Lưu ý:** Việc cố ý trộn lẫn `strict mode` và `non-strict mode` với nhau trong code của riêng bạn thường khiến bạn khó chịu. Toàn bộ chương trình của bạn có thể phải là **strict mode** hoặc **non-strict mode**. Tuy nhiên, đôi khi bạn đưa vào thư viện của bên thứ ba có nội dung **strict mode** khác với code của riêng bạn, vì vậy bạn phải cẩn thận với những chi tiết tương thích tinh tế này.

### Implicit Binding (Ràng Buộc Ngầm)

Một quy tắc khác cần xem xét là: call-site có context object hay không, còn được gọi là đối tượng sở hữu hoặc đối tượng chứa, mặc dù *các thuật ngữ thay thế* này có thể hơi gây hiểu lầm.

Xem xét:

```js
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

obj.foo(); // 2
```

Đầu tiên, hãy chú ý cách mà `foo()` được khai báo và sau đó được thêm vào làm reference property (thuộc tính tham chiếu) vào `obj`. Bất kể `foo()` được khai báo ban đầu *trên* `obj` hay được thêm vào làm tham chiếu sau đó (như đoạn code này hiển thị), trong cả hai trường hợp, **function** thực sự là "là của" hay "chứa" bởi object `obj`.

Tuy nhiên, call-site *sử dụng* context của `obj` để **tham chiếu** function, vì vậy bạn *có thể* nói rằng object `obj` "sở hữu" hoặc "chứa" **tham chiếu hàm (function reference)** tại thời điểm hàm được gọi.

Bất cứ điều gì bạn chọn để gọi pattern này, tại điểm mà `foo()` được gọi, nó đứng trước một object reference đến `obj`. Khi có một context object cho một function reference, quy tắc *ràng buộc ngầm định* nói rằng đó là đối tượng *đó* nên được sử dụng cho ràng buộc của lệnh gọi hàm `this`.

Vì `obj` là `this` cho lệnh gọi `foo()` nên `this.a` đồng nghĩa với `obj.a`.

Chỉ cấp cao nhất/cuối cùng của chuỗi tham object property reference mới quan trọng đối với call-site. Ví dụ:

```js
function foo() {
	console.log( this.a );
}

var obj2 = {
	a: 42,
	foo: foo
};

var obj1 = {
	a: 2,
	obj2: obj2
};

obj1.obj2.foo(); // 42
```

#### Implicitly Lost (Bị mất một cách rõ ràng)

Một trong những sự thất vọng phổ biến nhất mà liên kết `this` tạo ra là khi một hàm *bị ràng buộc ngầm định* mất liên kết đó, thường có nghĩa là nó trở lại *ràng buộc mặc định*, của object toàn cục hoặc `undefined`, tùy thuộc vào `strict mode`.

Xem xét:

```js
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

var bar = obj.foo; // function reference/alias!

var a = "oops, global"; // `a` also property on global object

bar(); // "oops, global"
```

Mặc dù `bar` dường như là một tham chiếu đến `obj.foo`, trên thực tế, nó thực sự chỉ là một tham chiếu khác cho chính `foo`. Hơn nữa, call-site là thứ quan trọng, và call-site là `bar()`, là một lệnh gọi đơn giản, không được trang trí và do đó, *ràng buộc mặc định* được áp dụng.

Cách tinh tế hơn, phổ biến hơn và bất ngờ hơn, điều này xảy ra là khi chúng ta xem xét việc truyền một callback function:

```js
function foo() {
	console.log( this.a );
}

function doFoo(fn) {
	// `fn` is just another reference to `foo`

	fn(); // <-- call-site!
}

var obj = {
	a: 2,
	foo: foo
};

var a = "oops, global"; // `a` also property on global object

doFoo( obj.foo ); // "oops, global"
```

Truyền tham số chỉ là một phép gán ngầm và vì chúng ta đang truyền một function, đó là một phép gán tham chiếu ngầm, vì vậy kết quả cuối cùng giống như đoạn code trước đó.

Điều gì sẽ xảy ra nếu hàm bạn đang truyền callback-function vào không phải do bạn viết mà được tích hợp sẵn cho ngôn ngữ? Không có sự khác biệt, cùng một kết quả.

```js
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

var a = "oops, global"; // `a` also property on global object

setTimeout( obj.foo, 100 ); // "oops, global"
```

Hãy nghĩ về cách triển khai giả lý thuyết thô sơ này của `setTimeout()` được cung cấp dưới dạng một built-in từ môi trường JavaScript:

```js
function setTimeout(fn,delay) {
	// wait (somehow) for `delay` milliseconds
	fn(); // <-- call-site!
}
```

Khá phổ biến là các function callback của chúng ta *mất* ràng buộc `this` của chúng, như chúng ta vừa thấy. Nhưng một cách khác mà `this` có thể làm chúng ta ngạc nhiên là khi function chúng ta đã truyền callback của mình để cố ý thay đổi `this` cho cuộc gọi. Các trình xử lý sự kiện trong các thư viện JavaScript phổ biến khá thích việc buộc lệnh gọi lại của bạn phải có `this`, ví dụ, trỏ đến phần tử DOM đã kích hoạt sự kiện. Mặc dù điều đó đôi khi có thể hữu ích, nhưng những lần khác, nó có thể cực kỳ tức giận. Thật không may, những công cụ này hiếm khi cho phép bạn lựa chọn.

Dù bằng cách nào thì `this` bị thay đổi bất ngờ, bạn không thực sự kiểm soát được cách tham chiếu hàm gọi lại của mình sẽ được thực thi, vì vậy bạn không có cách nào (chưa) kiểm soát call-site để đưa ra ràng buộc dự định của mình. Chúng ta sẽ sớm thấy một cách "khắc phục" vấn đề đó bằng cách *sửa chữa* `this`.

### Explicit Binding (Ràng Buộc Tường Minh)

Với *implicit binding (ràng buộc ngầm định)* như chúng ta vừa thấy, chúng ta phải thay đổi đối tượng được đề cập để bao gồm một tham chiếu về chính nó vào hàm và sử dụng tham chiếu hàm thuộc tính này để gián tiếp (ngầm định) ràng buộc `this` với đối tượng.

Nhưng, điều gì sẽ xảy ra nếu bạn muốn ép một lệnh gọi hàm sử dụng một object cụ thể cho ràng buộc `this`, mà không đặt tham chiếu hàm thuộc tính trên object?

"Tất cả" các function trong ngôn ngữ có một số tiện ích (utilities) có sẵn cho chúng (thông qua `[[Prototype]]` của chúng - sẽ có thêm thông tin về điều đó sau này) có thể hữu ích cho tác vụ này. Cụ thể, các function có phương thức `call(..)` và `apply(..)`. Về mặt kỹ thuật, môi trường chạy JavaScript đôi khi cung cấp các chức năng đủ đặc biệt (một cách diễn đạt!) Mà chúng không có chức năng như vậy. Nhưng đó là số ít. Phần lớn các function được cung cấp và chắc chắn là tất cả các hàm bạn sẽ tạo đều có quyền truy cập vào `call(..)` và `apply(..)`.

Làm thế nào để các utilities này hoạt động? Cả hai đều lấy, làm tham số đầu tiên, một đối tượng để sử dụng cho `this`, và sau đó gọi hàm với `this` được chỉ định. Vì bạn đang trực tiếp nói rõ bạn muốn `this` là gì, nên chúng tôi gọi nó là *explicit binding (ràng buộc tường minh)*.

Xem xét:

```js
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2
};

foo.call( obj ); // 2
```

Gọi `foo` với *explicit binding* bằng `foo.call(..)` cho phép chúng ta ép `this` của nó thành `obj`.

Nếu bạn truyền một giá trị nguyên thủy (thuộc kiểu `string`,` boolean` hoặc `number`) dưới dạng ràng buộc `this`, giá trị nguyên thủy được bao bọc trong dạng object của nó (`new String(..)`, `new Boolean(..)`, hoặc `new Number(..)`, tương ứng). Đây thường được gọi là "quyền anh".

**Lưu ý:** Đối với ràng buộc `this`, `call(..)` và `apply(..)` giống hệt nhau. Chúng *thực hiện* hoạt động khác nhau với các thông số bổ sung của chúng, nhưng đó không phải là điều chúng ta quan tâm hiện tại.

Thật không may, chỉ riêng *explicit binding* vẫn không đưa ra bất kỳ giải pháp nào cho vấn đề được đề cập trước đây, về một function "mất" ràng buộc `this` dự định của nó hoặc chỉ để nó được mở rộng bởi một framework, v.v.

#### Hard Binding (Ràng Buộc Chặt Chẽ)

Nhưng một biến thể pattern xung quanh *explicit binding* thực sự có tác dụng. Xem xét:

```js
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2
};

var bar = function() {
	foo.call( obj );
};

bar(); // 2
setTimeout( bar, 100 ); // 2

// `bar` hard binds `foo`'s `this` to `obj`
// so that it cannot be overriden
bar.call( window ); // 2
```

Hãy xem xét cách thức hoạt động của biến thể này. Chúng ta tạo một hàm `bar()`, bên trong thâm hàm, gọi `foo.call(obj)`, do đó buộc phải gọi `foo` với ràng buộc `obj` cho `this`. Bất kể sau này bạn gọi hàm `bar` như thế nào, nó sẽ luôn gọi `foo` với `obj`. Liên kết này vừa rõ ràng vừa mạnh mẽ, vì vậy chúng ta gọi nó là *hard binding*.

Cách điển hình nhất để bọc một hàm bằng *hard binding* là tạo ra một phương thức truyền của bất kỳ đối số nào được truyền và bất kỳ giá trị trả về nào nhận được:

```js
function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}

var obj = {
	a: 2
};

var bar = function() {
	return foo.apply( obj, arguments );
};

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

Một cách khác để thể hiện pattern này là tạo một trình trợ giúp có thể sử dụng lại:

```js
function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}

// simple `bind` helper
function bind(fn, obj) {
	return function() {
		return fn.apply( obj, arguments );
	};
}

var obj = {
	a: 2
};

var bar = bind( foo, obj );

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

Vì *hard binding* là một pattern phổ biến như vậy, nó được cung cấp với một build-in utility của ES5: `Function.prototype.bind`, và nó được sử dụng như thế này:

```js
function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}

var obj = {
	a: 2
};

var bar = foo.bind( obj );

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

`bind (..)` trả về một function mới được hard-coded để gọi function ban đầu với context `this` được đặt như bạn đã chỉ định.

**Lưu ý:** Kể từ ES6, hàm ràng buộc cứng được tạo bởi `bind(..)` có thuộc tính `.name` bắt nguồn từ *target function* ban đầu. Ví dụ: `bar = foo.bind(..)` phải có giá trị `bar.name` là `"bound foo"`, là tên gọi hàm sẽ hiển thị trong một dấu vết ngăn xếp.

#### API Call "Contexts"

Nhiều hàm của thư viện và thực sự là nhiều hàm tích hợp mới trong ngôn ngữ JavaScript và môi trường chạy Javascript, cung cấp một tham số tùy chọn, thường được gọi là "context", được thiết kế như một công việc để bạn không cần phải sử dụng `bind(. .)` để đảm bảo callback function của bạn sử dụng một `this` cụ thể.

Ví dụ:

```js
function foo(el) {
	console.log( el, this.id );
}

var obj = {
	id: "awesome"
};

// use `obj` as `this` for `foo(..)` calls
[1, 2, 3].forEach( foo, obj ); // 1 awesome  2 awesome  3 awesome
```

Trong nội bộ, các function khác nhau này gần như chắc chắn sử dụng *explicit binding* thông qua `call(..)` hoặc `apply (..)`, giúp bạn tiết kiệm rắc rối.

### `new` Binding

Quy tắc thứ tư và cuối cùng cho ràng buộc `this` yêu cầu chúng ta nghĩ lại một quan niệm sai lầm rất phổ biến về các function và object trong JavaScript.

Trong các ngôn ngữ class-oriented truyền thống, "constructors" là các function đặc biệt gắn liền với các class, khi class đó được khởi tạo bằng toán tử `new`, thì constructor của class đó sẽ được gọi. Điều này thường trông giống như:

```js
something = new MyClass(..);
```

JavaScript có toán tử `new` và pattern code để sử dụng nó về cơ bản giống với những gì chúng ta thấy trong các ngôn ngữ class-oriented đó; hầu hết các nhà phát triển đều cho rằng cơ chế của JavaScript đang hoạt động tương tự. Tuy nhiên, thực sự là *không mối niên hệ* với class-oriented functionality được ngụ ý bởi cách sử dụng `new` trong JS.

Đầu tiên, hãy định nghĩa lại "constructor" trong JavaScript là gì. Trong JS, các constructor là **chỉ các function** tình cờ được gọi với toán tử `new` ở phía trước chúng. Chúng không được gắn vào các class, cũng không phải là khởi tạo một class. Chúng thậm chí không phải là loại function đặc biệt. Chúng chỉ là những function thông thường, về bản chất, bị chiếm đoạt bằng cách sử dụng `new` trong lời gọi của chúng.

Ví dụ: hàm `Number (..)` hoạt động như một hàm tạo, trích dẫn từ ES5.1 spec:

> 15.7.2 The Number Constructor
>
> Khi Number được gọi như một phần của một biểu thức mới, nó là một constructor: nó khởi tạo object mới được tạo.

Vì vậy, khá nhiều function, bao gồm các build-in object function như `Number(..)` (xem Chương 3) có thể được gọi với `new` ở phía trước nó, và điều đó làm cho function đó gọi một *constructor call*. Đây là một sự khác biệt quan trọng nhưng tinh tế: thực sự không có cái gọi là "constructor function", mà là các construction call *của các function*.

Khi một function được gọi với `new` phía trước nó, hay còn gọi là constructor call, những việc sau được thực hiện tự động:

1. một object hoàn toàn mới được tạo ra (hay còn gọi là được constructed) từ thin air
2. *the newly constructed object is `[[Prototype]]`-linked*
3. object mới được xây dựng được đặt làm ràng buộc `this` cho lệnh gọi function đó
4. trừ khi function trả về **object** thay thế của chính nó, thì lệnh gọi hàm `new` sẽ *tự động* trả về object mới được xây dựng.

Các bước 1, 3 và 4 áp dụng cho cuộc thảo luận hiện tại của chúng ta. Bây giờ chúng ta sẽ bỏ qua bước 2 và quay lại với nó trong Chương 5.

Hãy xem xét đoạn code này:

```js
function foo(a) {
	this.a = a;
}

var bar = new foo( 2 );
console.log( bar.a ); // 2
```

Việc gọi `foo(..)` với `new` trước nó, chúng ta đã tạo một object mới và đặt object mới đó là `this` cho lệnh gọi `foo(..)`. **Do `new` là cách cuối cùng mà một lệnh gọi function `this` có thể bị ràng buộc.** Chúng ta sẽ gọi đây là *ràng buộc new*.

## Everything In Order (Mọi Thứ Theo Thứ Tự)

Vì vậy, bây giờ chúng ta đã khám phá ra 4 quy tắc để ràng buộc `this` trong các lệnh gọi hàm. *Tất cả* bạn cần làm là tìm trang call-site và kiểm tra nó để xem quy tắc nào áp dụng. Nhưng, điều gì sẽ xảy ra nếu call-site có nhiều quy tắc đủ điều kiện? Phải có thứ tự ưu tiên cho các quy tắc này và vì vậy, tiếp theo chúng ta sẽ trình bày thứ tự áp dụng các quy tắc.

Cần phải rõ ràng rằng *default binding* là quy tắc ưu tiên thấp nhất trong số 4. Vì vậy, chúng ta sẽ chỉ đặt điều đó sang một bên.

Cái nào sẽ áp dụng trước, *implicit binding* hoặc *explicit binding*? Hãy kiểm tra nó:

```js
function foo() {
	console.log( this.a );
}

var obj1 = {
	a: 2,
	foo: foo
};

var obj2 = {
	a: 3,
	foo: foo
};

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call( obj2 ); // 3
obj2.foo.call( obj1 ); // 2
```

Vì vậy, *explicit binding* được ưu tiên hơn *implicit binding*, có nghĩa là bạn nên hỏi **trước** nếu *explicit binding* áp dụng trước khi kiểm tra *implicit binding*.

Bây giờ, chúng ta chỉ cần tìm ra nơi *new binding* phù hợp với thứ tự ưu tiên.

```js
function foo(something) {
	this.a = something;
}

var obj1 = {
	foo: foo
};

var obj2 = {};

obj1.foo( 2 );
console.log( obj1.a ); // 2

obj1.foo.call( obj2, 3 );
console.log( obj2.a ); // 3

var bar = new obj1.foo( 4 );
console.log( obj1.a ); // 2
console.log( bar.a ); // 4
```

OK, *new binding* có nhiều tiền lệ hơn so với *implicit binding*. Nhưng bạn có nghĩ rằng *new binding* ít nhiều có tiền lệ hơn *explicit binding* không?

**Lưu ý:** `new` và `call`/`apply` không thể sử dụng cùng nhau, vì vậy `new foo.call(obj1)` là không được phép, để kiểm tra *new binding* trực tiếp chống lại *explicit binding*. Tuy nhiên chúng ta có thể vẫn sử dụng một *hard binding* để kiểm tra mức độ ưu tiên của hai quy tắc.

Trước khi chúng ta khám phá điều đó trong một danh sách code, hãy nghĩ lại cách hoạt động của *hard binding*, đó là `Function.prototype.bind(..)` tạo một function wrapper mới được mã hóa cứng để bỏ qua `this` ràng buộc (bất kể nó có thể là gì) và sử dụng chỉ dẫn do chúng ta cung cấp.

Theo lý luận đó, có vẻ hiển nhiên khi cho rằng *hard binding* (là một dạng của *explicit binding*) có tiền lệ hơn *new binding*, và do đó không thể bị ghi đè bằng `new`.

Hãy kiểm tra:

```js
function foo(something) {
	this.a = something;
}

var obj1 = {};

var bar = foo.bind( obj1 );
bar( 2 );
console.log( obj1.a ); // 2

var baz = new bar( 3 );
console.log( obj1.a ); // 2
console.log( baz.a ); // 3
```

Ái chà! `bar` bị ràng buộc với `obj1`, nhưng `new bar(3)` đã **không** thay đổi `obj1.a` thành `3` như chúng ta mong đợi. Thay vào đó, lệnh gọi *hard bind* (tới `obj1`) gọi tới `bar(..)` ***là*** có thể bị ghi đè bằng `new`. Kể từ khi áp dụng `new`, chúng ta đã lấy lại đối tượng mới được tạo, chúng ta đặt tên là `baz`, và chúng ta thấy trên thực tế, `baz.a` có giá trị là `3`.

Điều này sẽ gây ngạc nhiên nếu bạn quay lại trình trợ giúp "fake" bind của chúng ta:

```js
function bind(fn, obj) {
	return function() {
		fn.apply( obj, arguments );
	};
}
```

Nếu bạn lý luận về cách code của trình trợ giúp hoạt động, nó không có cách nào để lệnh gọi của toán tử `new` ghi đè liên kết cứng thành `obj` như chúng ta vừa quan sát.

Nhưng tích hợp sẵn `Function.prototype.bind (..)` của ES5 thì phức tạp hơn, trên thực tế là một chút. Đây là polyfill (được định dạng lại một chút) do trang MDN cung cấp cho `bind (..)`:

```js
if (!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5
			// internal IsCallable function
			throw new TypeError( "Function.prototype.bind - what " +
				"is trying to be bound is not callable"
			);
		}

		var aArgs = Array.prototype.slice.call( arguments, 1 ),
			fToBind = this,
			fNOP = function(){},
			fBound = function(){
				return fToBind.apply(
					(
						this instanceof fNOP &&
						oThis ? this : oThis
					),
					aArgs.concat( Array.prototype.slice.call( arguments ) )
				);
			}
		;

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
}
```

**Lưu Ý:** Polyfill `bind(..)` được trình bày ở trên khác với `bind(..)` tích hợp sẵn trong ES5 liên quan đến các function bị ràng buộc cứng sẽ được sử dụng với `new` (xem bên dưới để biết lý do tại sao điều đó lại hữu ích). Bởi vì polyfill không thể tạo một function mà không có `.prototype` như tiện ích tích hợp sẵn, nên có một số hướng sắc thái để ước lượng cùng một hành vi. Đọc kỹ nếu bạn định sử dụng `new` với một function bị ràng buộc và bạn dựa vào polyfill này.

Phần cho phép ghi đè `new` là:

```js
this instanceof fNOP &&
oThis ? this : oThis

// ... and:

fNOP.prototype = this.prototype;
fBound.prototype = new fNOP();
```

Chúng ta sẽ không thực sự đi sâu vào giải thích cách thức hoạt động của thủ thuật này (nó phức tạp và vượt quá phạm vi của chúng ta ở đây), nhưng về cơ bản utility xác định xem liệu hàm bị ràng buộc cứng có được gọi bằng `new` hay không (dẫn đến một đối tượng mới được xây dựng là của nó `this`), và nếu vậy, nó sử dụng *cái đó* mới được tạo `this` thay vì *hard binding* được chỉ định trước đó cho `this`.

Tại sao `new` có thể ghi đè *hard binding* hữu ích?

Lý do chính cho hành vi này là tạo một hàm (có thể được sử dụng với `new` để xây dựng các đối tượng) về cơ bản bỏ qua *ràng buộc cứng* `this` nhưng nó đặt trước một số hoặc tất cả các đối số của hàm. Một trong những khả năng của `bind(..)` là bất kỳ đối số nào được truyền sau đối số ràng buộc `this` đầu tiên được mặc định là đối số tiêu chuẩn cho hàm cơ bản (về mặt kỹ thuật được gọi là "ứng dụng một phần ", là một tập con của "currying").

Cho ví dụ:

```js
function foo(p1,p2) {
	this.val = p1 + p2;
}

// using `null` here because we don't care about
// the `this` hard-binding in this scenario, and
// it will be overridden by the `new` call anyway!
var bar = foo.bind( null, "p1" );

var baz = new bar( "p2" );

baz.val; // p1p2
```

### Xác định `this`

Bây giờ, chúng ta có thể tóm tắt các quy tắc để xác định `this` từ call-site gọi của function, theo thứ tự ưu tiên của chúng. Đặt những câu hỏi này theo thứ tự này và dừng lại khi quy tắc đầu tiên áp dụng.

1. Là function được gọi với từ khoá `new` (**new binding**)? Nếu vậy, `this` là object mới được xây dựng.

    `var bar = new foo()`

2. Là function được gọi với `call` hoặc `apply` (**explicit binding**), thậm chí ẩn bên trong một `bind` *hard binding*? Nếu vậy, `this` là object được chỉ định rõ ràng.

    `var bar = foo.call( obj2 )`

3. Là function được gọi với một context (**implicit binding**), còn được biết như sở hữu hoặc chứa object? Nếu vậy, `this` là context object *đó*.

    `var bar = obj1.foo()`

4. Nếu không thì, mặc định `this` (**default binding**). Nếu trong `strict mode`, nhận `undefined`, nếu không nhận `global` object.

    `var bar = foo()`

Đó là nó. Đó là *tất cả những gì cần* để hiểu các quy tắc của ràng buộc `this` đối với các lệnh gọi hàm thông thường. Chà ... gần như hầu hết.

## Binding Exceptions

Như thường lệ, có một số *ngoại lệ* đối với "quy tắc".

Hành vi ràng buộc `this` trong một số trường hợp có thể gây ngạc nhiên, trong đó bạn dự định một ràng buộc khác nhưng cuối cùng bạn lại có hành vi ràng buộc từ quy tắc *ràng buộc mặc định* (xem phần trước).

### Ignored `this` (Bỏ Qua `this`)

Nếu bạn truyền `null` hoặc `undefined` như một tham số ràng buộc `this` cho `call`, `apply`, hoặc `bind`, những giá trị đó bị bỏ qua một cách hiệu quả, và thay vào đó quy tắc *default binding* áp dụng cho lệnh gọi.

```js
function foo() {
	console.log( this.a );
}

var a = 2;

foo.call( null ); // 2
```

Tại sao bạn cố tình chuyển một cái gì đó như `null` cho một ràng buộc `this`?

Nó khá phổ biến khi sử dụng `apply(..)` để truyền các mảng giá trị làm tham số cho một lời gọi hàm. Tương tự, `bind(..)` có thể xử lý các tham số (giá trị đặt trước), điều này có thể rất hữu ích.

```js
function foo(a,b) {
	console.log( "a:" + a + ", b:" + b );
}

// spreading out array as parameters
foo.apply( null, [2, 3] ); // a:2, b:3

// currying with `bind(..)`
var bar = foo.bind( null, 2 );
bar( 3 ); // a:2, b:3
```

Cả hai utility này đều yêu cầu ràng buộc `this` cho tham số đầu tiên. Nếu các hàm được đề cập không quan tâm đến `this`, bạn cần một giá trị giữ chỗ và `null` có vẻ là một lựa chọn hợp lý như được hiển thị trong đoạn code này.

**Lưu Ý:** Chúng ta không đề cập đến nó trong cuốn sách này, nhưng ES6 có toán tử lây lan `...` sẽ cho phép bạn "trải rộng" một mảng về mặt cú pháp dưới dạng các tham số mà không cần `apply(..)`, chẳng hạn như `foo(...[1,2])`, có giá trị là `foo(1,2)`- về mặt cú pháp, tránh ràng buộc `this` nếu nó không cần thiết. Thật không may, không có cú pháp ES6 thay thế cho currying, vì vậy tham số `this` của lệnh gọi `bind(..)` vẫn cần được chú ý.

Tuy nhiên, có một chút "nguy hiểm" tiềm ẩn trong việc luôn sử dụng `null` khi bạn không quan tâm đến ràng buộc `this`. Nếu bạn từng sử dụng nó để chống lại một lệnh gọi hàm (ví dụ: một hàm thư viện của bên thứ ba mà bạn không kiểm soát) và hàm đó *thực hiện* tạo tham chiếu `this`, quy tắc *default binding* có nghĩa là nó có thể vô tình tham chiếu (hoặc tệ hơn, biến đổi!) đối tượng `global` (`window` trong trình duyệt).

Rõ ràng, một cạm bẫy như vậy có thể dẫn đến nhiều loại lỗi *rất khó* để chẩn đoán/theo dõi.

#### Safer `this`

Có lẽ một cách thực hành hơi "an toàn hơn" là truyền một object được thiết lập cụ thể cho `this` được đảm bảo không phải là một object có thể tạo ra side effects (các tác dụng phụ) có vấn đề trong chương trình của bạn. Mượn thuật ngữ từ mạng (và quân sự), chúng ta có thể tạo một đối tượng "DMZ" (khu phi quân sự) - không có gì đặc biệt hơn một đối tượng hoàn toàn trống rỗng, không được ủy quyền (xem Chương 5 và 6).

Nếu chúng ta luôn truyền một object DMZ cho các ràng buộc `this` bị bỏ qua mà chúng ta nghĩ rằng chúng ta không cần quan tâm đến, chúng ta chắc chắn rằng bất kỳ cách sử dụng ẩn/không mong muốn nào của `this` sẽ bị hạn chế đối với oibject trống, điều này cách ly chương trình của chúng ta object `global` từ các side effects.

Vì object này hoàn toàn trống, nên cá nhân tôi muốn đặt cho nó tên biến `ø` (ký hiệu toán học viết thường cho tập trống). Trên nhiều bàn phím (như US-layout trên Mac), biểu tượng này dễ dàng được nhập bằng `⌥` +` o` (option + `o`). Một số hệ thống cũng cho phép bạn thiết lập phím tắt cho các ký hiệu cụ thể. Nếu bạn không thích ký hiệu `ø` hoặc bàn phím của bạn không dễ gõ, bạn có thể gọi nó bất cứ thứ gì bạn muốn.

Dù bạn gọi nó là gì, cách dễ nhất để thiết lập nó **hoàn toàn rỗng** là `Object.create(null)` (xem Chương 5). `Object.create(null)` tương tự như `{ }`, nhưng không có uỷ thác cho `Object.prototype`, do đó nó "rỗng hơn" là chỉ `{ }`.

```js
function foo(a,b) {
	console.log( "a:" + a + ", b:" + b );
}

// our DMZ empty object
var ø = Object.create( null );

// spreading out array as parameters
foo.apply( ø, [2, 3] ); // a:2, b:3

// currying with `bind(..)`
var bar = foo.bind( ø, 2 );
bar( 3 ); // a:2, b:3
```

Không chỉ "an toàn hơn" về mặt chức năng, còn có một loại lợi ích về mặt phong cách đối với `ø`, ở chỗ nó truyền đạt về mặt ngữ nghĩa "Tôi muốn `this` trống" rõ ràng hơn một chút so với `null` có thể. Nhưng một lần nữa, hãy đặt tên cho đối tượng DMZ của bạn bất cứ điều gì bạn thích.

### Indirection (Chuyển Hướng)

Một điều khác cần lưu ý là bạn có thể (cố ý hoặc không!) tạo "indirect references (tham chiếu gián tiếp)" đến các function và trong những trường hợp đó, khi tham chiếu function đó được gọi, quy tắc *default binding* cũng được áp dụng.

Một trong những cách phổ biến nhất mà *indirect references* xảy ra là từ một phép gán:

```js
function foo() {
	console.log( this.a );
}

var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };

o.foo(); // 3
(p.foo = o.foo)(); // 2
```

*Giá trị trả về* của biểu thức gán `p.foo = o.foo` chỉ là một tham chiếu đến đối tượng hàm cơ bản. Do đó, call-site áp dụng chỉ là `foo()`, không phải `p.foo()` hoặc `o.foo()` như bạn có thể mong đợi. Theo các quy tắc ở trên, áp dụng quy tắc *default binding*.

Nhắc nhở: bất kể cách bạn truy cập vào một lệnh gọi hàm bằng cách sử dụng quy tắc *default binding*, trạng thái `strict mode` của **nội dung** của function được gọi làm tham chiếu `this` - không phải là call-site hàm - xác định giá trị *default binding*: `global` object nếu ở chế độ non-`strict mode` hoặc `undefined` nếu ở chế độ `strict mode`.

### Softening Binding

Trước đó, chúng ta đã thấy rằng *hard binding* là một chiến lược để ngăn một lệnh gọi hàm vô tình quay trở lại quy tắc *default binding*, bằng cách làm nó bị ràng buộc với một `this` cụ thể (trừ khi bạn sử dụng `new` để ghi đè nó! ). Vấn đề là, *hard-binding* làm giảm đáng kể tính linh hoạt của một hàm, ngăn chặn việc ghi đè thủ công `this` với các lần thử *implicit binding* hoặc thậm chí là *explicit binding* tiếp theo.

Sẽ rất tuyệt nếu có một cách để cung cấp một mặc định khác cho *default binding* (không phải `global` hoặc` undefined`), trong khi vẫn để hàm có thể được ràng buộc thủ công `this` thông qua *implicit binding* hoặc *explicit binding*.

Chúng ta có thể xây dựng một utility được gọi là *soft binding* mô phỏng hành vi mong muốn của chúng ta.

```js
if (!Function.prototype.softBind) {
	Function.prototype.softBind = function(obj) {
		var fn = this,
			curried = [].slice.call( arguments, 1 ),
			bound = function bound() {
				return fn.apply(
					(!this ||
						(typeof window !== "undefined" &&
							this === window) ||
						(typeof global !== "undefined" &&
							this === global)
					) ? obj : this,
					curried.concat.apply( curried, arguments )
				);
			};
		bound.prototype = Object.create( fn.prototype );
		return bound;
	};
}
```

`softBind(..)` utility được viết ở đây làm việc tương tự với built-in ES5 `bind(..)` utility, ngoại trừ hành vi *soft binding* của chúng ta. Nó bao bọc hàm được chỉ định trong logic kiểm tra `this` tại thời điểm gọi và nếu nó là `global` hoặc `undefined`, hãy sử dụng thay thế được chỉ định trước *mặc định* (`obj`). Nếu không thì dấu `this` được giữ nguyên. Nó cũng cung cấp curr (xem thảo luận `bind (..)` trước đó).

Hãy chứng minh cách sử dụng của nó:

```js
function foo() {
   console.log("name: " + this.name);
}

var obj = { name: "obj" },
    obj2 = { name: "obj2" },
    obj3 = { name: "obj3" };

var fooOBJ = foo.softBind( obj );

fooOBJ(); // name: obj

obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2   <---- look!!!

fooOBJ.call( obj3 ); // name: obj3   <---- look!

setTimeout( obj2.foo, 10 ); // name: obj   <---- falls back to soft-binding
```

Phiên bản soft-bound của hàm `foo ()` có thể được liên kết `this` thành `obj2` hoặc `obj3` như được hiển thị, nhưng nó sẽ trở lại thành `obj` nếu *default binding* sẽ được áp dụng..

## Lexical `this`

Các chức năng bình thường tuân theo 4 quy tắc mà chúng ta vừa đề cập. Nhưng ES6 giới thiệu một loại hàm đặc biệt không sử dụng các quy tắc này: arrow-function.

Các arrow-function (hàm mũi tên) được biểu thị không phải bằng từ khóa `function`, mà bởi toán tử `=>` nên được gọi là "fat arrow". Thay vì sử dụng bốn quy tắc tiêu chuẩn `this`, các arrow-function áp dụng ràng buộc `this` từ scope bao quanh (function hoặc toàn cục).

Hãy minh họa lexical scope của arrow-function:

```js
function foo() {
	// return an arrow function
	return (a) => {
		// `this` here is lexically adopted from `foo()`
		console.log( this.a );
	};
}

var obj1 = {
	a: 2
};

var obj2 = {
	a: 3
};

var bar = foo.call( obj1 );
bar.call( obj2 ); // 2, not 3!
```

Arrow-function được tạo trong `foo()` về mặt lexical nắm bắt bất cứ thứ gì `this` của `foo()` tại thời điểm gọi của nó. Vì `foo()` bị ràng buộc bởi `this` với `obj1`, `bar` (tham chiếu đến arrow-function trả về) cũng sẽ bị ràng buộc `this` thành `obj1`. Không thể ghi đè ràng buộc lexical của một arrow-function (ngay cả với `new`!).

Trường hợp sử dụng phổ biến nhất có thể sẽ là dùng callback, chẳng hạn như event handlers hoặc timers:

```js
function foo() {
	setTimeout(() => {
		// `this` here is lexically adopted from `foo()`
		console.log( this.a );
	},100);
}

var obj = {
	a: 2
};

foo.call( obj ); // 2
```

Mặc dù các arrow-function cung cấp một giải pháp thay thế cho việc sử dụng `bind(..)` trên một function để đảm bảo `this` của nó, điều này có vẻ hấp dẫn, nhưng điều quan trọng cần lưu ý là chúng về cơ bản đang vô hiệu hóa cơ chế `this` truyền thống để có lợi hơn lexical scope được hiểu rộng rãi. Trước ES6, chúng ta đã có một mô hình khá phổ biến để làm như vậy, về cơ bản hầu như không thể phân biệt được với tinh thần của các arrow-function ES6:

```js
function foo() {
	var self = this; // lexical capture of `this`
	setTimeout( function(){
		console.log( self.a );
	}, 100 );
}

var obj = {
	a: 2
};

foo.call( obj ); // 2
```

Mặc dù `self = this` và arrow-functions đều có vẻ là "giải pháp" tốt để không muốn sử dụng `bind(..)`, nhưng về cơ bản chúng đang chạy trốn khỏi `this` thay vì hiểu và chấp nhận nó.

Nếu bạn thấy mình đang viết code kiểu `this`, nhưng hầu hết hoặc mọi lúc, bạn đánh bại cơ chế `this` bằng lexical `self = this` hoặc "thủ thuật" arrow-function, có lẽ bạn nên:

1. Chỉ sử dụng phạm vi từ vựng và quên đi sự giả mạo của code kiểu `this`.

2. Nắm bắt hoàn toàn các cơ chế kiểu `this`, bao gồm cả việc sử dụng `bind(..)` khi cần thiết và cố gắng tránh các thủ thuật `self = this` và arrow-function "lexical this".

Một chương trình có thể sử dụng hiệu quả cả hai phong cách code (lexical và `this`), nhưng bên trong cùng một function và thực sự đối với các loại tra cứu giống nhau, việc trộn hai cơ chế thường yêu cầu code khó bảo trì hơn, và có lẽ đã làm việc quá chăm chỉ để trở nên thông minh.

## Review (TL;DR)

Việc xác định ràng buộc `this` cho một function đang thực thi đòi hỏi phải tìm call-site trực tiếp của function đó. Sau khi kiểm tra, bốn quy tắc có thể được áp dụng cho call-site, theo thứ tự ưu tiên *this*:

1. Gọi với từ khoá `new` không? Nếu có sử dụng object mới được tạo.

2. Gọi với `call` hoặc `apply` (hay `bind`)? Sử dụng object được chỉ định cụ thể.

3. Gọi với một context object sở hữu lệnh gọi? Sử dụng context object đó.

4. Mặc định: `undefined` trong `strict mode`, hay global object với trường hợp khác.

Hãy cẩn thận khi vô tình/vô ý gọi quy tắc *default binding*. Trong trường hợp bạn muốn "an toàn" bỏ qua ràng buộc `this`, đối tượng "DMZ"như `ø = Object.create(null)` là một giá trị giữ chỗ phù hợp để bảo vệ đối tượng `toàn cục` khỏi các side-effect không mong muốn.

Thay vì bốn quy tắc ràng buộc tiêu chuẩn, arrow function của ES6 sử dụng lexical scope cho ràng buộc `this`, có nghĩa là chúng chấp nhận ràng buộc `this` (bất kể nó là gì) từ lệnh gọi hàm bao quanh của nó. Về cơ bản, chúng là sự thay thế cú pháp của `self = this` trong mã hóa trước ES6.
