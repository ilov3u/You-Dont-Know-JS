# You Don't Know JS: *this* & Object Prototypes
# Chapter 1: `this` Or That?

Một trong những cơ chế gây nhầm lẫn nhất trong JavaScript là từ khóa `this`. Đó là một từ khóa định danh đặc biệt được tự động xác định trong scope của mọi function, nhưng chính xác thì nó chọc tức ngay cả những nhà phát triển JavaScript dày dạn kinh nghiệm.

> Bất kỳ công nghệ đủ *tiên tiến* nào đều không thể phân biệt được với ma thuật. -- Arthur C. Clarke

Cơ chế `this` của JavaScript thực ra không phải là *that* nâng cao, nhưng các nhà phát triển thường diễn giải câu trích dẫn theo ý mình bằng cách chèn "phức tạp" hoặc "khó hiểu", và không có câu hỏi nào mà không có sự hiểu biết rõ ràng,`this` có thể có vẻ hết sức kỳ diệu trong sự bối rối * của bạn *.

**Lưu ý:** Từ "this" là một đại từ rất phổ biến trong diễn ngôn nói chung. Vì vậy, có thể rất khó, đặc biệt là bằng lời nói, để xác định xem chúng ta đang sử dụng "this" như một đại từ hay sử dụng nó để chỉ định danh từ khóa thực tế. Để rõ ràng, tôi sẽ luôn sử dụng `this` để chỉ từ khóa đặc biệt và "cái này" hoặc *cái này* với các trường hợp khác.

## Why `this`?

Nếu cơ chế `this` rất khó hiểu, ngay cả đối với các nhà phát triển JavaScript dày dạn kinh nghiệm, người ta có thể tự hỏi tại sao nó thậm chí còn hữu ích? Nó có nhiều rắc rối hơn nó đáng giá không? Trước khi chúng ta chuyển sang *how*, chúng ta nên kiểm tra *why*.

Hãy cố gắng minh họa tích cực và tiện ích của `this`:

```js
function identify() {
	return this.name.toUpperCase();
}

function speak() {
	var greeting = "Hello, I'm " + identify.call( this );
	console.log( greeting );
}

var me = {
	name: "Kyle"
};

var you = {
	name: "Reader"
};

identify.call( me ); // KYLE
identify.call( you ); // READER

speak.call( me ); // Hello, I'm KYLE
speak.call( you ); // Hello, I'm READER
```

Nếu *cách* của đoạn code này khiến bạn bối rối, đừng lo lắng! Chúng ta sẽ nắm được điều đó trong thời gian ngắn. Chỉ cần đặt những câu hỏi đó qua một bên ngắn gọn để chúng ta có thể xem xét *why* rõ ràng hơn.

Đoạn mã này cho phép sử dụng lại function `identify()` và `speak()` với nhiều object *context* (`me` và `you`), thay vì cần một phiên bản hàm riêng biệt cho từng object.

Thay vì dựa vào `this`, bạn có thể đã chuyển một cách rõ ràng trong một context object sang cả `identify()` và `speak()`.

```js
function identify(context) {
	return context.name.toUpperCase();
}

function speak(context) {
	var greeting = "Hello, I'm " + identify( context );
	console.log( greeting );
}

identify( you ); // READER
speak( me ); // Hello, I'm KYLE
```

Tuy nhiên, cơ chế `this` cung cấp một cách thanh lịch hơn để "truyền" ngầm một object reference, dẫn đến thiết kế API clean hơn và dễ dàng sử dụng lại hơn.

Cách sử dụng của bạn càng phức tạp, bạn sẽ càng thấy rõ ràng rằng việc truyền context xung quanh dưới dạng một tham số rõ ràng thường phức tạp hơn so với việc truyền xung quanh context `this`. Khi chúng ta khám phá các object và prototypes(nguyên mẫu), bạn sẽ thấy sự hữu ích của một tập hợp các function có thể tự động tham chiếu đến đối tượng context thích hợp.

## Confusions (Nhầm Lẫn)

Chúng ta sẽ sớm bắt đầu giải thích cách hoạt động *thực sự* của `this`, nhưng trước tiên chúng ta phải xua tan một số quan niệm sai lầm về cách nó *không* thực sự hoạt động.

Tên "this" tạo ra sự nhầm lẫn khi các nhà phát triển cố gắng nghĩ về nó quá theo nghĩa đen. Có hai nghĩa thường được giả định, nhưng cả hai đều không chính xác.

### Itself (Bản Thân Nó)

Sự cám dỗ phổ biến đầu tiên là cho rằng `this` đề cập đến chính function (the function itself). Đó là một suy luận ngữ pháp hợp lý, ít nhất.

Tại sao bạn muốn tham chiếu đến một function từ bên trong chính nó? Những lý do phổ biến nhất sẽ là những thứ như đệ quy (gọi một function từ bên trong chính nó) hoặc có một trình xử lý sự kiện có thể tự hủy liên kết khi nó được gọi lần đầu tiên.

Các nhà phát triển mới sử dụng cơ chế của JS thường nghĩ rằng việc tham chiếu function như một object (tất cả các function trong JavaScript đều là object!) cho phép bạn lưu trữ *trạng thái(state)* (giá trị trong thuộc tính) giữa các lần gọi function. Mặc dù điều này chắc chắn có thể thực hiện được và có một số mục đích sử dụng hạn chế, phần còn lại của cuốn sách sẽ giải thích trên nhiều pattern khác để *tốt hơn* nơi lưu trữ state (trạng thái) bên cạnh đối tượng function.

Nhưng chỉ trong giây lát, chúng ta sẽ khám phá pattern đó, để minh họa cách mà `this` không cho phép một function nhận tham chiếu đến chính nó như chúng ta có thể đã giả định.

Hãy xem xét đoạn code sau, nơi chúng ta cố gắng theo dõi số lần một function (`foo`) được gọi:

```js
function foo(num) {
	console.log( "foo: " + num );

	// keep track of how many times `foo` is called
	this.count++;
}

foo.count = 0;

var i;

for (i=0; i<10; i++) {
	if (i > 5) {
		foo( i );
	}
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log( foo.count ); // 0 -- WTF?
```

`foo.count` *vẫn* là `0`, mặc dù bốn câu lệnh `console.log` chỉ ra rõ ràng `foo(..)` trên thực tế đã được gọi bốn lần. Sự thất vọng bắt nguồn từ cách giải thích *quá theo nghĩa đen* về ý nghĩa của `this` (trong `this.count++`).

Khi code thực thi `foo.count = 0`, thực sự nó đang thêm thuộc tính `count` vào function object `foo`. Nhưng đối với tham chiếu `this.count` bên trong function, `this` trên thực tế không trỏ *chút nào* đến function object đó, và do đó, mặc dù tên thuộc tính giống nhau, các đối tượng gốc là khác nhau và gây nhầm lẫn tiếp theo.

**Lưu ý:** Một nhà phát triển có trách nhiệm *nên* hỏi tại thời điểm này, "Nếu tôi đang tăng thuộc tính `count` nhưng nó không phải là thuộc tính tôi mong đợi, thì `count` tôi *đã* tăng lên là cái nào?" Trên thực tế, nếu cô ấy tìm hiểu sâu hơn, cô ấy sẽ thấy rằng cô ấy đã vô tình tạo ra một biến toàn cục `count` (xem Chương 2 để biết *như thế nào* điều đó đã xảy ra!), Và nó hiện có giá trị là `NaN`. Tất nhiên, một khi cô ấy xác định được kết quả đặc biệt này, cô ấy sẽ có một loạt câu hỏi khác: "Nó toàn cục như thế nào, và tại sao nó lại kết thúc bằng `NaN` thay vì một giá trị số đếm thích hợp?" (xem Chương 2).

Thay vì dừng lại ở điểm này và tìm hiểu lý do tại sao tham chiếu `this` dường như không hoạt động như *mong đợi* và trả lời những câu hỏi hóc búa nhưng quan trọng đó, nhiều nhà phát triển chỉ cần tránh hoàn toàn vấn đề và tìm kiếm một số giải pháp khác, chẳng hạn như tạo một đối tượng khác để giữ thuộc tính `count`:

```js
function foo(num) {
	console.log( "foo: " + num );

	// keep track of how many times `foo` is called
	data.count++;
}

var data = {
	count: 0
};

var i;

for (i=0; i<10; i++) {
	if (i > 5) {
		foo( i );
	}
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log( data.count ); // 4
```

Mặc dù đúng là cách tiếp cận này "giải quyết" được vấn đề, nhưng thật không may, nó chỉ đơn giản là bỏ qua vấn đề thực sự - thiếu hiểu `this` có nghĩa là gì và nó hoạt động như thế nào - và thay vào đó rơi trở lại vùng thoải mái của một cơ chế quen thuộc hơn: lexical scope.

**Lưu ý:** Lexical scope là một cơ chế hoàn toàn tốt và hữu ích; Tôi không coi thường việc sử dụng nó, dưới bất kỳ hình thức nào (xem *"Scope & Closure"* cuốn sách của bộ sách này). Nhưng liên tục *đoán* về cách sử dụng `this`, và thường là *sai*, không phải là lý do chính đáng để rút lui về lexical scope và không bao giờ học *tại sao* `this` lẩn tránh bạn.

Để tham chiếu một function object từ bên trong chính nó, `this` tự nó thường sẽ không đủ. Thông thường, bạn cần một tham chiếu đến function thông qua một định danh từ vựng (biến) trỏ vào đối tượng đó.

Hãy xem xét hai function này:

```js
function foo() {
	foo.count = 4; // `foo` refers to itself
}

setTimeout( function(){
	// anonymous function (no name), cannot
	// refer to itself
}, 10 );
```

Trong function đầu tiên, được gọi là "named function (hàm được đặt tên)", `foo` là một tham chiếu có thể được sử dụng để tham chiếu đến function từ bên trong chính nó.

Nhưng trong ví dụ thứ hai, function callback được truyền vào `setTimeout(..)` không có name identifier (vì vậy được gọi là "anonymous function"), vì vậy không có cách nào thích hợp để tham chiếu đến chính function object..

**Lưu ý:** Tham chiếu `arguments.callee` cũ nhưng không được chấp nhận và không được chấp nhận bên trong một function *cũng* trỏ đến function object hiện đang thực thi. Tham chiếu này thường là cách duy nhất để truy cập đối tượng của một anonymous function từ bên trong chính nó. Tuy nhiên, cách tiếp cận tốt nhất là tránh hoàn toàn việc sử dụng các anonymous function, ít nhất là đối với những function yêu cầu tự tham chiếu và thay vào đó hãy sử dụng một named function (biểu thức). `arguments.callee` không được dùng nữa và không nên được sử dụng.

Vì vậy, một giải pháp khác cho ví dụ đang chạy của chúng ta là sẽ sử dụng identifier `foo` làm tham chiếu function object ở mỗi nơi, và hoàn toàn không sử dụng `this`, mà *hoạt động*:

```js
function foo(num) {
	console.log( "foo: " + num );

	// keep track of how many times `foo` is called
	foo.count++;
}

foo.count = 0;

var i;

for (i=0; i<10; i++) {
	if (i > 5) {
		foo( i );
	}
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log( foo.count ); // 4
```

Tuy nhiên, cách tiếp cận đó tương tự như các bước phụ sự hiểu biết *thực sự* về `this` và hoàn toàn dựa vào lexical scope của biến `foo`.

Tuy nhiên, một cách khác để tiếp cận vấn đề là buộc `this` thực sự trỏ vào function object `foo`:

```js
function foo(num) {
	console.log( "foo: " + num );

	// keep track of how many times `foo` is called
	// Note: `this` IS actually `foo` now, based on
	// how `foo` is called (see below)
	this.count++;
}

foo.count = 0;

var i;

for (i=0; i<10; i++) {
	if (i > 5) {
		// using `call(..)`, we ensure the `this`
		// points at the function object (`foo`) itself
		foo.call( foo, i );
	}
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log( foo.count ); // 4
```

**Thay vì tránh `this`, chúng ta nắm lấy nó.** Chúng ta sẽ giải thích một chút *cách* các kỹ thuật như vậy hoạt động hoàn chỉnh hơn nhiều, vì vậy đừng lo lắng nếu bạn vẫn còn hơi bối rối!

### Its Scope (Phạm Vi Của Nó)

Quan niệm sai lầm phổ biến nhất tiếp theo về ý nghĩa của `this` là nó bằng cách nào đó đề cập đến scope của function. Đó là một câu hỏi khó, bởi vì theo một nghĩa nào đó thì có một số sự thật, nhưng theo nghĩa khác, nó khá sai lầm.

Nói rõ hơn, `this`, theo bất kỳ cách nào, không tham chiếu đến **lexical scope** của một function. Đúng là về mặt nội bộ, scope giống như một đối tượng với các thuộc tính cho từng identifier có sẵn. Nhưng scope "object" không thể truy cập được đối với mã JavaScript. Đó là một phần bên trong của quá trình triển khai *Engine*.

Hãy xem xét code cố gắng (và không thành công!) vượt qua ranh giới và sử dụng `this` để tham chiếu ngầm đến lexical scope của một function:

```js
function foo() {
	var a = 2;
	this.bar();
}

function bar() {
	console.log( this.a );
}

foo(); //undefined
```

Có nhiều sai lầm trong đoạn code này. Mặc dù nó có vẻ giống như cũ, nhưng mã bạn thấy là sự chắt lọc của code thực tế trong thế giới thực đã được trao đổi trong các diễn đàn trợ giúp cộng đồng công khai. Đó là một minh họa tuyệt vời (nếu không muốn nói là đáng buồn) về mức độ sai lầm của những giả định `this` '.

Đầu tiên, một nỗ lực được thực hiện để tham chiếu đến hàm `bar()` thông qua `this.bar()`. Nó gần như chắc chắn là một *tai nạn* mà nó hoạt động, nhưng chúng tôi sẽ giải thích *làm sao* điều đó ngay sau đây. Cách tự nhiên nhất để gọi `bar()` là bỏ đi từ đầu `this.` và chỉ tạo một tham chiếu từ vựng đến identifier.

Tuy nhiên, nhà phát triển viết code như vậy đang cố gắng sử dụng `this` để tạo cầu nối giữa các lexical scope của `foo()` và `bar()`, để `bar()` có quyền truy cập vào biến `a` trong scope bên trong của `foo()`. **Không thể có cầu nối như vậy** Bạn không thể sử dụng tham chiếu `this` để tra cứu điều gì đó trong lexical scope. Điều đó là không thể.

Mỗi khi bạn cảm thấy bản thân đang cố gắng kết hợp tra cứu lexical scope với `this`, hãy nhắc nhở bản thân: *không có cầu nối*.

## What's `this`?

Bỏ qua nhiều giả định không chính xác khác nhau, bây giờ chúng ta hãy chuyển sự chú ý đến cách cơ chế `this` thực sự hoạt động.

Chúng tôi đã nói trước đó rằng `this` không phải là ràng buộc author-time mà là ràng buộc về runtime (thời gian chạy). Nó dựa trên context dựa trên các điều kiện của lệnh gọi của function. Ràng buộc `this` không liên quan gì đến nơi khai báo một function, nhưng thay vào đó, nó liên quan đến mọi thứ liên quan đến cách thức mà function được gọi.

Khi một hàm được gọi, một bản ghi kích hoạt, còn được gọi là execute context (bối cảnh thực thi), sẽ được tạo. Bản ghi này chứa thông tin về nơi hàm được gọi từ (call-stack - ngăn xếp cuộc gọi), *cách* hàm được gọi, những tham số nào đã được truyền, v.v. Một trong những thuộc tính của bản ghi này là tham chiếu `this` sẽ được sử dụng trong khoảng thời gian thực hiện function đó.

Trong chương tiếp theo, chúng ta sẽ học cách tìm **call-site** của một hàm để xác định cách thực thi của nó sẽ ràng buộc `this`.

## Review (TL;DR)

Ràng buộc `this` là một nguồn thường xuyên gây nhầm lẫn cho các nhà phát triển JavaScript, những người không dành thời gian để tìm hiểu cơ chế thực sự hoạt động như thế nào. Đoán, thử-và-sai và copy-n-paste từ các câu trả lời của Stack Overflow không phải là cách hiệu quả hoặc thích hợp để tận dụng cơ chế *này* quan trọng `this`.

Để học `this`, trước tiên bạn phải học `this` *không phải* là gì, bất chấp bất kỳ giả định hoặc quan niệm sai lầm nào có thể dẫn bạn đến những con đường đó. `this` không phải là tham chiếu đến chính function, cũng không phải là tham chiếu đến *lexical* scope của function.

`this` thực sự là một ràng buộc được tạo ra khi một hàm được gọi, và *cái gì* mà nó tham chiếu được xác định hoàn toàn bởi call-site nơi hàm được gọi.
