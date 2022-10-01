# You Don't Know JS: Scope & Closures
# Chapter 5: Scope Closure

Chúng ta đến thời điểm này với hy vọng có được sự hiểu biết rất đúng đắn và vững chắc về cách thức hoạt động của scope.

Chúng ta chuyển sự chú ý của mình sang một phần cực kỳ quan trọng nhưng khó nắm bắt, *gần như thần thoại*, của ngôn ngữ: **closure**. Nếu bạn đã theo dõi cuộc thảo luận của chúng ta về lexical scope cho đến nay, thì mục tiêu hướng tới là closure, phần lớn, là phản khoa học, gần như tự hiển nhiên. *Có một người đàn ông đằng sau bức màn của thuật sĩ, và chúng ta sắp được nhìn thấy anh ta*. Không, tên anh ấy không phải là Crockford!

Tuy nhiên, nếu bạn có câu hỏi dai dẳng về lexical scope, bây giờ sẽ là thời điểm tốt để quay lại và xem lại Chương 2 trước khi tiếp tục.

## Enlightenment (Minh Bạch)

Đối với những người đã có kinh nghiệm về JavaScript, nhưng có lẽ chưa bao giờ hiểu đầy đủ về khái niệm closure, *hiểu closure* có thể giống như một thành tựu đặc biệt mà người ta phải cố gắng và hy sinh để đạt được.

Tôi nhớ lại những năm trước khi tôi đã nắm chắc về JavaScript, nhưng không biết closure là gì. Gợi ý rằng có *mặt này bên kia* đối với ngôn ngữ, thứ hứa hẹn nhiều khả năng hơn cả những gì tôi đã sở hữu, đã trêu chọc và chế nhạo tôi. Tôi nhớ đã đọc qua mã nguồn của các framework ban đầu để cố gắng hiểu cách nó thực sự hoạt động. Tôi nhớ lần đầu tiên một cái gì đó về "mô-đun" bắt đầu xuất hiện trong đầu tôi. Tôi nhớ những khoảnh khắc *a-ha!* Khá sống động.

Điều tôi không biết hồi đó, điều mà tôi đã mất nhiều năm để hiểu, và điều tôi hy vọng sẽ truyền đạt cho bạn hiện tại, chính là bí mật này: **closure ở xung quanh bạn trong JavaScript, bạn chỉ cần nhận ra và nắm lấy nó.** Closures không phải là một công cụ chọn tham gia đặc biệt mà bạn phải học cú pháp và patterns mới. Không, closure thậm chí không phải là một vũ khí mà bạn phải học cách sử dụng và thành thạo như Luke được đào tạo trong The Force.

Closure xảy ra do việc viết mã dựa trên lexical scope. Chúng chỉ xảy ra. Bạn thậm chí không thực sự phải cố ý tạo ra các closure để tận dụng chúng. Closure được tạo và sử dụng cho bạn trên toàn bộ code của bạn. Những gì bạn đang *thiếu* là bối cảnh tinh thần thích hợp để nhận ra, đón nhận và tận dụng các closure theo ý muốn của bạn.

Khoảnh khắc khai sáng nên là: **ồ, các closure đã xảy ra trên toàn bộ code của tôi, cuối cùng thì tôi cũng có thể *nhìn thấy* chúng ngay bây giờ.** Việc hiểu các closure giống như khi Neo nhìn thấy Ma trận lần đầu tiên.

## Nitty Gritty

OK, đủ tham chiếu phim cường điệu và vô liêm sỉ.

Dưới đây là một định nghĩa đơn giản về những gì bạn cần biết để hiểu và nhận ra closure:

> Closure khi một function có thể nhớ và truy cập lexical scope của nó ngay cả khi function đó đang thực thi bên ngoài lexical scope của nó.

Hãy chuyển sang một số đoạn code để minh họa định nghĩa đó.

```js
function foo() {
	var a = 2;

	function bar() {
		console.log( a ); // 2
	}

	bar();
}

foo();
```

Đoạn code này sẽ trông quen thuộc từ các cuộc thảo luận của chúng ta về Nested Scope. Function `bar ()` có *quyền truy cập* vào biến `a` trong scope bao bọc bên ngoài do các quy tắc tra cứu lexical scope (trong trường hợp này, đó là tra cứu tham chiếu RHS).

Đây có phải là "closure"?

Ồ, về mặt kỹ thuật thì ... *có lẽ*. Nhưng theo định nghĩa điều-bạn-cần-biết của chúng ta ở trên ... *không chính xác*. Tôi nghĩ cách chính xác nhất để giải thích `bar ()` tham chiếu đến `a` là thông qua các quy tắc tra cứu lexical scope và các quy tắc đó là *chỉ* (quan trọng!) **một phần** của closure là gì.

Từ một góc độ học thuật thuần túy, những gì được nói về đoạn code trên là hàm `bar()` có *closure* trên scope của `foo()` (và thực sự, ngay cả trên các scope còn lại, nó cũng có quyền truy cập chẳng hạn như scope toàn cầu trong trường hợp của chúng ta). Nói khác đi một chút, người ta nói rằng `bar()` đóng trong scope của `foo()`. Tại sao? Bởi vì `bar()` xuất hiện lồng vào bên trong của `foo()`. Thông thường và đơn giản.

Tuy nhiên, closure được xác định theo cách này không trực tiếp *có thể quan sát được*, cũng như chúng ta không thấy closure *thực hiện* trong đoạn code đó. Chúng ta thấy rõ ràng lexical scope, nhưng closure vẫn là một cái bóng chuyển dịch bí ẩn đằng sau code.

Sau đó, chúng ta hãy xem xét đoạn code đưa closure ra ánh sáng:

```js
function foo() {
	var a = 2;

	function bar() {
		console.log( a );
	}

	return bar;
}

var baz = foo();

baz(); // 2 -- Whoa, closure was just observed, man.
```

Function `bar()` có quyền truy cập lexical scope vào scope bên trong của `foo()`. Nhưng sau đó, chúng ta lấy `bar()`, chính là function, và truyền nó *dưới dạng* một giá trị. Trong trường hợp này, chúng ta `trả về` chính đối tượng hàm mà `bar` tham chiếu.

Sau khi chúng ta thực thi `foo()`, chúng ta gán giá trị mà nó trả về (function `bar()` bên trong) cho một biến có tên là `baz`, và sau đó chúng ta thực sự gọi `baz()`, tất nhiên nó đang gọi hàm bên trong `bar()`, chỉ bởi một tham chiếu mã định danh khác.

`bar()` được thực thi, chắc chắn. Nhưng trong trường hợp này, nó được thực thi *bên ngoài* lexical scope đã khai báo của nó.

Sau khi thực thi `foo()`, thông thường chúng ta sẽ mong đợi rằng toàn bộ scope bên trong của `foo()` sẽ biến mất, vì chúng ta biết rằng *Engine* sử dụng *Garbage Collector* đi kèm và giải phóng bộ nhớ một khi nó không còn được sử dụng. Vì có vẻ như nội dung của `foo()` không còn được sử dụng nữa, nên có vẻ như chúng sẽ được coi là *biến mất*.

Nhưng "phép thuật" của những closure không để điều này xảy ra. Trên thực tế, scope bên trong đó *vẫn* "được sử dụng", và do đó không biến mất. Ai đang sử dụng nó? **Function `bar()` của chính nó**.

Nhờ vào nơi nó được khai báo, `bar()` có một lexical scope closure trên scope bên trong đó của `foo()`, điều này giữ cho scope đó tồn tại để `bar()` tham chiếu bất kỳ lúc nào sau này.

**`bar ()` vẫn có một tham chiếu đến scope đó và tham chiếu đó được gọi là closure.**

Vì vậy, vài micro giây sau, khi biến `baz` được gọi (gọi hàm bên trong mà ban đầu chúng ta gắn nhãn là `bar`), nó có *quyền truy cập* vào lexical scope theo thời gian của tác giả, vì vậy nó có thể truy cập biến `a` đúng như chúng ta mong đợi.

Hàm đang được gọi tốt bên ngoài lexical scope theo thời gian tác giả của nó. **Closure** cho phép hàm tiếp tục truy cập lexical scope mà nó được xác định tại thời điểm tác giả.

Tất nhiên, bất kỳ cách nào trong số các cách khác nhau mà các hàm có thể được *truyền xung quanh* dưới dạng giá trị và thực sự được gọi ở các vị trí khác, tất cả đều là ví dụ về việc quan sát/thực hiện closure.

```js
function foo() {
	var a = 2;

	function baz() {
		console.log( a ); // 2
	}

	bar( baz );
}

function bar(fn) {
	fn(); // look ma, I saw closure!
}
```

Chúng ta truyền hàm bên trong `baz` vào `bar` và gọi hàm bên trong đó (giờ được đặt tên là `fn`), và khi chúng ta thực hiện, closure của nó đối với scope bên trong của `foo()` được quan sát bằng cách truy cập vào `a`.

Những việc truyền tham số xung quanh các function này cũng có thể là gián tiếp.

```js
var fn;

function foo() {
	var a = 2;

	function baz() {
		console.log( a );
	}

	fn = baz; // assign `baz` to global variable
}

function bar() {
	fn(); // look ma, I saw closure!
}

foo();

bar(); // 2
```

Bất kỳ phương cách nào chúng ta sử dụng để *vận chuyển* một function bên trong bên ngoài lexical scope của nó, nó sẽ duy trì một scope reference đến nơi nó được khai báo ban đầu và bất cứ nơi nào chúng ta thực thi nó, closure đó sẽ được thực hiện.

## Now I Can See

Các đoạn code phía trên hơi mang tính hàn lâm và được xây dựng để minh họa *cách sử dụng closure*. Nhưng tôi đã hứa với bạn rằng đó không chỉ là một món đồ chơi mới tuyệt vời. Tôi đã hứa rằng closure là một cái gì đó xung quanh bạn trong code hiện có của bạn. Bây giờ chúng ta hãy *xem* sự thật đó.

```js
function wait(message) {

	setTimeout( function timer(){
		console.log( message );
	}, 1000 );

}

wait( "Hello, closure!" );
```

Chúng ta lấy một hàm bên trong (có tên là `timer`) và chuyển nó vào `setTimeout(..)`. Nhưng `timer` có một scope closure trên scope của `wait(..)`, thực sự giữ và sử dụng một tham chiếu đến biến `message`.

Một nghìn mili giây sau khi chúng ta thực hiện `wait(..)` và scope bên trong của nó sẽ biến mất từ lâu, hàm bên trong `timer` vẫn có closure trên scope đó.

Sâu trong ruột của *Engine*, tiện ích tích hợp sẵn `setTimeout(..)` có tham chiếu đến một số tham số, có thể được gọi là `fn` hoặc `func` hoặc tương tự như vậy. *Engine* sẽ gọi hàm đó, hàm này đang gọi hàm `timer` bên trong của chúng ta và tham chiếu lexical scope vẫn còn nguyên vẹn.

**Closure.**

Hoặc, nếu bạn thuộc về tín đồ của jQuery (hoặc bất kỳ framework JS nào, cho vấn đề đó):

```js
function setupBot(name,selector) {
	$( selector ).click( function activator(){
		console.log( "Activating: " + name );
	} );
}

setupBot( "Closure Bot 1", "#bot_1" );
setupBot( "Closure Bot 2", "#bot_2" );
```

Tôi không chắc bạn viết code loại gì, nhưng tôi thường xuyên viết code chịu trách nhiệm kiểm soát toàn bộ đội quân máy bay không người lái toàn cục gồm các bot closure, vì vậy điều này hoàn toàn thực tế!

(Một số) nói đùa sang một bên, về cơ bản *bất cứ khi nào* và *bất cứ nơi nào* bạn coi các hàm (truy cập lexical scope tương ứng của riêng chúng) là các giá trị first-class và truyền chúng xung quanh, bạn có thể thấy các hàm đó thực hiện closure. Thử timers, event handlers, Ajax requests, cross-window messaging, web workers hoặc bất kỳ tác vụ không đồng bộ (hoặc đồng bộ!) Nào khác, khi bạn truyền vào *callback*, hãy sẵn sàng xử lý một số closure!

**Lưu ý:** Chương 3 đã giới thiệu mẫu IIFE. Mặc dù người ta thường nói rằng IIFE (một mình) là một ví dụ về closure được quan sát, tôi sẽ hơi không đồng ý, theo định nghĩa của chúng tôi ở trên.

```js
var a = 2;

(function IIFE(){
	console.log( a );
})();
```

Code này "hoạt động", nhưng nó không hoàn toàn có thể quan sát hoạt động closure ở đây. Tại sao? Bởi vì hàm (mà chúng ta đặt tên là "IIFE" ở đây) không được thực thi bên ngoài lexical scope của nó. Nó vẫn được gọi ngay tại đó trong cùng một scope như đã được khai báo (scope bao quanh / toàn cục cũng chứa `a`). `a` được tìm thấy thông qua tra cứu lexical scope thông thường, không thực sự thông qua closure.

Mặc dù về mặt kỹ thuật, closure có thể xảy ra vào thời điểm khai báo, nhưng điều này *không* có thể quan sát được một cách nghiêm túc, và vì vậy, như người ta nói, *đó là một cái đổ trong rừng mà không ai xung quanh nghe thấy.*

Mặc dù IIFE không phải là *bản thân* là một ví dụ của closure, nhưng nó hoàn toàn tạo ra scope và đó là một trong những công cụ phổ biến nhất mà chúng ta sử dụng để tạo scope có thể được đóng lại. Vì vậy, IIFE thực sự có liên quan nhiều đến closure, ngay cả khi bản thân họ không thực hiện closure.

Hãy đặt cuốn sách này xuống ngay bây giờ, bạn đọc thân mến. Tôi có một nhiệm vụ dành cho bạn. Mở một số code JavaScript gần đây của bạn. Tìm kiếm các hàm làm giá trị của bạn và xác định vị trí bạn đang sử dụng closure và thậm chí có thể chưa biết về nó trước đây.

Tôi sẽ chờ.

Bây giờ... bạn thấy đấy!

## Loops + Closure

Ví dụ chính tắc phổ biến nhất được sử dụng để minh họa closure liên quan đến vòng lặp đơn giản.

```js
for (var i=1; i<=5; i++) {
	setTimeout( function timer(){
		console.log( i );
	}, i*1000 );
}
```

**Lưu ý:** Các Linters (Trình kiểm tra code) thường báo cáo khi bạn đặt các hàm bên trong các vòng lặp, vì lỗi không hiểu về closure **rất phổ biến giữa các nhà phát triển**. Chúng ta giải thích cách làm như vậy đúng cách ở đây, tận dụng toàn bộ sức mạnh của closure. Nhưng sự tinh tế đó thường bị mất đi trong linters và nó sẽ phàn nàn bất kể, giả sử rằng bạn không *thực sự* biết mình đang làm gì.

Tinh thần của đoạn mã này là chúng ta thường *mong đợi* đối với hành vi là các số "1", "2", .. "5" sẽ được in ra, mỗi lần một cái, một giây, tương ứng.

Trên thực tế, nếu bạn chạy mã này, bạn sẽ in "6" ra 5 lần, cách nhau một giây.

**Huh?**

Đầu tiên, hãy giải thích `6` đến từ đâu. Điều kiện kết thúc của vòng lặp là khi `i` là *không phải là* `<= 5`. Lần đầu tiên trường hợp này xảy ra là khi `i` bằng 6. Vì vậy, đầu ra phản ánh giá trị cuối cùng của `i` sau khi vòng lặp kết thúc.

Điều này thực sự có vẻ rõ ràng trong cái nhìn thứ hai. Tất cả các lệnh gọi lại hàm timeout đều chạy tốt sau khi hoàn thành vòng lặp. Trên thực tế, khi timers trôi đi, ngay cả khi nó là `setTimeout(.., 0)` trên mỗi lần lặp, tất cả các lệnh gọi lại hàm đó sẽ vẫn chạy đúng sau khi hoàn thành vòng lặp và do đó in `6` mỗi lần.

Nhưng có một câu hỏi sâu hơn ở đây. Điều gì *còn thiếu* trong code của chúng ta để nó thực sự hoạt động như chúng ta đã ngụ ý về mặt ngữ nghĩa?

Điều còn thiếu là chúng ta đang cố gắng *ngụ ý* rằng mỗi lần lặp lại của vòng lặp sẽ "bắt" bản sao của chính `i`, tại thời điểm lặp. Tuy nhiên, cách thức hoạt động của scope, tất cả 5 hàm đó, mặc dù chúng được định nghĩa riêng biệt trong mỗi lần lặp vòng lặp, tất cả **đều được đóng trên cùng một phạm vi toàn cục được chia sẻ**, trên thực tế, chỉ có một chữ `i` trong đó.

Nói theo cách đó, *tất nhiên* tất cả các hàm đều chia sẻ một tham chiếu đến cùng một `i`. Một cái gì đó về cấu trúc vòng lặp có xu hướng khiến chúng ta nhầm lẫn khi nghĩ rằng có một thứ gì đó khác phức tạp hơn trong công việc. Không có. Không có gì khác biệt so với việc mỗi trong số 5 lệnh gọi lại thời gian chờ chỉ được khai báo lần lượt ngay sau lần gọi lại kia, không có vòng lặp nào cả.

OK, vậy, quay lại câu hỏi nóng bỏng của chúng ta. Cái gì còn thiếu? Chúng ta cần thêm scope đã đóng. Cụ thể, chúng ta cần một closure scope mới cho mỗi lần lặp lại của vòng lặp.

Chúng ta đã học trong Chương 3 rằng IIFE tạo scope bằng cách khai báo một hàm và ngay lập tức thực thi nó.

Let's try:

```js
for (var i=1; i<=5; i++) {
	(function(){
		setTimeout( function timer(){
			console.log( i );
		}, i*1000 );
	})();
}
```

Điều đó có hiệu quả không? Thử nó. Một lần nữa, tôi sẽ đợi.

Tôi sẽ kết thúc hồi hộp cho bạn. **Không.** Nhưng tại sao? Bây giờ chúng ta rõ ràng có nhiều lexical scope hơn. Mỗi lệnh gọi lại hàm timeout thực sự đóng trên scope mỗi lần lặp lại của chính nó được tạo tương ứng bởi mỗi IIFE.

Không đủ để có một scope để đóng lại **nếu scope đó trống**. Nhìn kĩ. IIFE của chúng tôi chỉ là một scope trống rỗng. Nó cần *một cái gì đó* trong đó để hữu ích cho chúng ta.

Nó cần biến riêng, với một bản sao của giá trị `i` ở mỗi lần lặp.

```js
for (var i=1; i<=5; i++) {
	(function(){
		var j = i;
		setTimeout( function timer(){
			console.log( j );
		}, j*1000 );
	})();
}
```

**Eureka! It works!**

Một biến thể nhỏ mà một số người thích là:

```js
for (var i=1; i<=5; i++) {
	(function(j){
		setTimeout( function timer(){
			console.log( j );
		}, j*1000 );
	})( i );
}
```

Tất nhiên, vì các IIFE này chỉ là các hàm, chúng ta có thể truyền vào `i`, và chúng ta có thể gọi nó là` j` nếu chúng ta thích, hoặc thậm chí chúng ta có thể gọi lại nó là `i`. Dù bằng cách nào, code hoạt động ngay bây giờ.

Việc sử dụng IIFE bên trong mỗi lần lặp đã tạo ra một scope mới cho mỗi lần lặp, điều này mang lại cho các lệnh gọi lại hàm thời gian chờ của chúng tôi có cơ hội đóng qua một scope mới cho mỗi lần lặp, một trong đó có một biến với giá trị mỗi lần lặp phù hợp cho chúng ta để truy cập.

Problem solved!

### Block Scoping Revisited

Xem xét kỹ lưỡng phân tích của chúng ta về giải pháp trước đó. Chúng ta đã sử dụng IIFE để tạo scope mới cho mỗi lần lặp. Nói cách khác, chúng ta thực sự *cần* block scope **mỗi lần lặp lại**. Chương 3 đã cho chúng ta thấy khai báo `let`, chiếm quyền điều khiển một khối và khai báo một biến ngay tại đó trong khối.

**Về cơ bản, nó biến một khối thành một scope mà chúng ta có thể đóng lại.** Vì vậy, đoạn mã tuyệt vời sau "hoạt động":

```js
for (var i=1; i<=5; i++) {
	let j = i; // yay, block-scope for closure!
	setTimeout( function timer(){
		console.log( j );
	}, j*1000 );
}
```

*Nhưng, đó không phải là tất cả!* (Bằng giọng Bob Barker hay nhất của tôi). Có một hành vi đặc biệt được xác định cho các khai báo `let` được sử dụng trong phần đầu của vòng lặp for. Hành vi này nói rằng biến sẽ được khai báo không chỉ một lần cho vòng lặp, **mà mỗi lần lặp**. Và, hữu ích, nó sẽ được khởi tạo ở mỗi lần lặp tiếp theo với giá trị từ cuối lần lặp trước đó.

```js
for (let i=1; i<=5; i++) {
	setTimeout( function timer(){
		console.log( i );
	}, i*1000 );
}
```

Làm sao tuyệt như vậy? Xác định scope và đóng khối làm việc cùng nhau, giải quyết tất cả các vấn đề của thế giới. Tôi không biết bạn thế nào, nhưng điều đó khiến tôi trở thành một JavaScripter hạnh phúc.

## Modules

Có những code pattern khác tận dụng sức mạnh của closure nhưng bề ngoài không có vẻ là về các lệnh gọi lại. Hãy xem xét điểm mạnh nhất trong số chúng: *module*.

```js
function foo() {
	var something = "cool";
	var another = [1, 2, 3];

	function doSomething() {
		console.log( something );
	}

	function doAnother() {
		console.log( another.join( " ! " ) );
	}
}
```

Vì code này đứng ngay bây giờ, không có closure có thể quan sát được nào đang diễn ra. Chúng tôi chỉ đơn giản có một số biến dữ liệu riêng tư `something` và `another`, và một vài hàm bên trong `doSomething()` và `doAnother()`, cả hai đều có lexical scope (và do closure!) trong scope bên trong của `foo()`.

Nhưng bây giờ hãy xem xét :

```js
function CoolModule() {
	var something = "cool";
	var another = [1, 2, 3];

	function doSomething() {
		console.log( something );
	}

	function doAnother() {
		console.log( another.join( " ! " ) );
	}

	return {
		doSomething: doSomething,
		doAnother: doAnother
	};
}

var foo = CoolModule();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

Đây là pattern trong JavaScript mà chúng ta gọi là *module*. Cách phổ biến nhất để triển khai module thường được gọi là "Revealing Module (Mô-đun tiết lộ)" và đó là biến thể mà chúng ta trình bày ở đây.

Hãy xem xét một số điều về đoạn code này.

Thứ nhất, `CoolModule()` chỉ là một function, nhưng nó *phải được gọi* để có một module intance được tạo. Nếu không thực thi function bên ngoài, việc tạo scope bên trong và closure sẽ không xảy ra.

Thứ hai, function `CoolModule()` trả về một object, được biểu thị bằng cú pháp đối tượng-chữ `{key: value, ...} '. Object mà chúng ta nhận về có các tham chiếu đến các function bên trong, nhưng *không phải* đến các biến dữ liệu bên trong. Chúng ta giữ bí mật và riêng tư. Thật thích hợp khi nghĩ về giá trị trả về của đối tượng này về cơ bản là một **API công khai cho module của chúng ta**.

Giá trị trả về của object này cuối cùng được gán cho biến bên ngoài `foo` và sau đó chúng ta có thể truy cập các phương thức thuộc tính đó trên API, như `foo.doSomething()`.

**Lưu ý:** Chúng ta không bắt buộc phải trả về một object thực sự (theo nghĩa đen) từ module của chúng ta. Chúng ta có thể chỉ trả lại trực tiếp một function bên trong. jQuery thực sự là một ví dụ điển hình về điều này. Các định danh `jQuery` và `$` là API công khai cho "module" jQuery, nhưng bản thân chúng chỉ là một function (bản thân nó có thể có các thuộc tính, vì tất cả các hàm đều là đối tượng).

Các function `doSomething()` và `doAnother()` có closure trong phạm vi bên trong của module "instance" (đến bằng cách thực sự gọi `CoolModule()`). Khi chúng ta chuyển các function đó ra ngoài lexical scope, bằng cách tham chiếu thuộc tính trên object mà chúng ta trả về, bây giờ chúng ta đã thiết lập một điều kiện để có thể quan sát và thực hiện closure.

Nói một cách đơn giản hơn, có hai "yêu cầu" đối với module pattern được thực hiện:

1. Phải có một function bao bọc bên ngoài và nó phải được gọi ít nhất một lần (mỗi lần tạo một module instance mới).

2. Function bao quanh phải trả về ít nhất một function bên trong, để function bên trong này có closure trên private scope và có thể truy cập và/hoặc sửa đổi private state đó.

Một object có một function property trên nó không *thực sự* là một module. Một object được trả về từ một lệnh gọi function mà chỉ có thuộc tính dữ liệu trên đó và không có closured functions (hàm bị đóng) nào thì không phải là *thực sự* là một module, theo nghĩa có thể quan sát được.

Đoạn code ở trên hiển thị một trình tạo module độc lập có tên là `CoolModule()` có thể được gọi bất kỳ số lần nào, mỗi lần tạo một module instance mới. Một sự thay đổi nhỏ đối với mô hình này là khi bạn chỉ quan tâm đến một trường hợp, một "singleton":

```js
var foo = (function CoolModule() {
	var something = "cool";
	var another = [1, 2, 3];

	function doSomething() {
		console.log( something );
	}

	function doAnother() {
		console.log( another.join( " ! " ) );
	}

	return {
		doSomething: doSomething,
		doAnother: doAnother
	};
})();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

Ở đây, chúng ta đã chuyển module function của mình thành một IIFE (xem Chương 3), và chúng ta *ngay lập tức* gọi nó và gán giá trị trả về của nó trực tiếp cho single module instance identifier của chúng ta `foo`.

Module chỉ là các function, vì vậy chúng có thể nhận các tham số:

```js
function CoolModule(id) {
	function identify() {
		console.log( id );
	}

	return {
		identify: identify
	};
}

var foo1 = CoolModule( "foo 1" );
var foo2 = CoolModule( "foo 2" );

foo1.identify(); // "foo 1"
foo2.identify(); // "foo 2"
```

Một biến thể nhỏ nhưng mạnh mẽ khác trên module pattern là đặt tên object bạn đang trả về làm public API của bạn:

```js
var foo = (function CoolModule(id) {
	function change() {
		// modifying the public API
		publicAPI.identify = identify2;
	}

	function identify1() {
		console.log( id );
	}

	function identify2() {
		console.log( id.toUpperCase() );
	}

	var publicAPI = {
		change: change,
		identify: identify1
	};

	return publicAPI;
})( "foo module" );

foo.identify(); // foo module
foo.change();
foo.identify(); // FOO MODULE
```

Bằng cách giữ lại tham chiếu bên trong đến đối tượng public API bên trong instance module của bạn, bạn có thể sửa đổi instance module đó **từ bên trong**, bao gồm thêm và xóa các phương thức, thuộc tính, *và* thay đổi giá trị của chúng.

### Modern Modules

Các trình quản lý/tải phụ thuộc module (module dependence loaders/managers) khác nhau về cơ bản gói gọn pattern định nghĩa module này thành một API thân thiện. Thay vì kiểm tra bất kỳ thư viện cụ thể nào, hãy để tôi trình bày một bằng chứng khái niệm *rất đơn giản* **(chỉ) cho mục đích minh họa**:

```js
var MyModules = (function Manager() {
	var modules = {};

	function define(name, deps, impl) {
		for (var i=0; i<deps.length; i++) {
			deps[i] = modules[deps[i]];
		}
		modules[name] = impl.apply( impl, deps );
	}

	function get(name) {
		return modules[name];
	}

	return {
		define: define,
		get: get
	};
})();
```

Phần quan trọng của đoạn code này là `modules[name] = impl.apply(impl, deps)`. Điều này đang gọi definition wrapper function cho một module (truyền vào bất kỳ dependencies nào) và lưu trữ giá trị trả về, API của module, vào danh sách nội bộ của các module được theo dõi theo tên.

Và đây là cách tôi có thể sử dụng nó để define một số module:

```js
MyModules.define( "bar", [], function(){
	function hello(who) {
		return "Let me introduce: " + who;
	}

	return {
		hello: hello
	};
} );

MyModules.define( "foo", ["bar"], function(bar){
	var hungry = "hippo";

	function awesome() {
		console.log( bar.hello( hungry ).toUpperCase() );
	}

	return {
		awesome: awesome
	};
} );

var bar = MyModules.get( "bar" );
var foo = MyModules.get( "foo" );

console.log(
	bar.hello( "hippo" )
); // Let me introduce: hippo

foo.awesome(); // LET ME INTRODUCE: HIPPO
```

Cả hai module "foo" và "bar" đều được xác định bằng một hàm trả về một public API. "foo" thậm chí còn nhận được instance của "bar" làm dependency parameter và có thể sử dụng nó cho phù hợp.

Hãy dành một chút thời gian để kiểm tra các đoạn code này để hiểu đầy đủ về sức mạnh của các closure được sử dụng cho các mục đích tốt của chúng ta. Điểm mấu chốt là không thực sự có bất kỳ "phép thuật" cụ thể nào đối với các module managers (nhà quản lý mô-đun). Chúng đáp ứng cả hai đặc điểm của module pattern mà tôi đã liệt kê ở trên: gọi một function definition wrapper và giữ giá trị trả về của nó làm API cho module đó.

Nói cách khác, module chỉ là module, ngay cả khi bạn đặt một friendly wrapper tool (công cụ trình bao bọc thân thiện) lên trên chúng.

### Future Modules

ES6 bổ sung hỗ trợ syntax first-class cho khái niệm module. Khi được tải(load) qua hệ thống mô-đun(module system), ES6 coi một file như một mô-đun riêng biệt(sperate module). Mỗi module đều có thể nhập các module khác hoặc các thành viên API cụ thể, cũng như xuất các thành viên public API của riêng chúng.

**Lưu ý:** Các module function-base không phải là một pattern được nhận dạng tĩnh (điều gì đó mà compiler (trình biên dịch) biết về), vì vậy ngữ nghĩa API của chúng sẽ không được xem xét cho đến khi chạy. Nghĩa là, bạn thực sự có thể sửa đổi API của module trong thời gian chạy (xem thảo luận về  `publicAPI` trước đó).

Ngược lại, các ES6 Module API là tĩnh (các API không thay đổi tại thời điểm chạy). Vì compiler (trình biên dịch) biết *điều đó*, nó có thể (và thực hiện được!) kiểm tra trong quá trình biên dịch (tải file và) xem có tham chiếu đến thành viên của API của module được nhập *thực sự tồn tại* hay không. Nếu tham chiếu API không tồn tại, trình biên dịch sẽ đưa ra lỗi "sớm" tại thời điểm biên dịch, thay vì đợi giải pháp thời gian chạy động truyền thống (và các lỗi, nếu có).

Các module ES6 **không** có định dạng "inline", chúng phải được xác định trong các file riêng biệt (một file cho mỗi mô-đun). Các trình duyệt/công cụ có "module loader (trình tải mô-đun)" mặc định (có thể ghi đè, nhưng điều đó nằm ngoài cuộc thảo luận của chúng ta ở đây) tải đồng bộ file module khi nó được nhập.

Xem xét:

**bar.js**c
```js
function hello(who) {
	return "Let me introduce: " + who;
}

export hello;
```

**foo.js**
```js
// import only `hello()` from the "bar" module
import hello from "bar";

var hungry = "hippo";

function awesome() {
	console.log(
		hello( hungry ).toUpperCase()
	);
}

export awesome;
```

```js
// import the entire "foo" and "bar" modules
module foo from "foo";
module bar from "bar";

console.log(
	bar.hello( "rhino" )
); // Let me introduce: rhino

foo.awesome(); // LET ME INTRODUCE: HIPPO
```

**Lưu ý:** Cần tạo các file riêng biệt **"foo.js"** và **"bar.js"**, với nội dung tương ứng như được hiển thị trong hai đoạn code đầu tiên. Sau đó, chương trình của bạn sẽ load/import các module đó để sử dụng chúng, như được hiển thị trong đoạn mã thứ ba.

`import` nhập một hoặc nhiều thành viên từ API của module vào scope hiện tại, mỗi thành viên vào một biến bị ràng buộc (`hello` trong trường hợp của chúng ta). `module` nhập toàn bộ module API vào một biến bị ràng buộc (`foo`, `bar` trong trường hợp của chúng ta). `export` xuất một identifier (biến, hàm) sang public API cho module hiện tại. Các toán tử này có thể được sử dụng nhiều lần trong định nghĩa của module nếu cần thiết.

Nội dung bên trong *file module* được xử lý như thể được bao bọc trong một scope closure, giống như với các function-closure module đã thấy trước đó.

## Review (TL;DR)

Closure dường như đối với người chưa được khai sáng giống như một thế giới thần bí nằm tách biệt bên trong JavaScript mà chỉ một số linh hồn dũng cảm nhất mới có thể chạm tới. Nhưng nó thực sự chỉ là một sự thật tiêu chuẩn và gần như hiển nhiên về cách chúng ta viết code trong một môi trường có lexical scope, nơi các function là các giá trị và có thể được truyền theo ý muốn.

**Closure là khi một function có thể nhớ và truy cập lexical scope của nó ngay cả khi nó được gọi ra bên ngoài lexical scope của nó.**

Closure có thể khiến chúng ta khó chịu, chẳng hạn như với các vòng lặp, nếu chúng ta không cẩn thận để nhận ra chúng và cách chúng hoạt động. Nhưng chúng cũng là một công cụ vô cùng mạnh mẽ, cho phép các pattern như *module* ở các dạng khác nhau.

Module yêu cầu hai đặc điểm chính: 1) một wrapping function (hàm bao bọc) bên ngoài đang được gọi, để tạo enclosing scope (phạm vi bao bọc) 2) giá trị trả về của hàm bao bọc (wrapping function) phải bao gồm tham chiếu đến ít nhất một function bên trong mà sau đó sẽ closure scope bên trong riêng tư của trình bao bọc(wrapper).

Giờ đây, chúng ta có thể thấy các closure xung quanh mã hiện tại của mình và chúng ta có khả năng nhận ra và tận dụng chúng để mang lại lợi ích cho chính mình!
