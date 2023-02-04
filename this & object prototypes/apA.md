# You Don't Know JS: *this* & Object Prototypes
# Appendix A: ES6 `class`

Nếu có bất kỳ thông điệp rút ra nào từ nửa sau của cuốn sách này (Chương 4-6), thì đó là các class là một design pattern tùy chọn cho code (không bắt buộc phải có), và hơn nữa chúng thường khá khó triển khai trong một Ngôn ngữ `[[Prototype]]` như JavaScript.

Sự lúng túng này *không* chỉ là về cú pháp, mặc dù đó là một phần quan trọng của nó. Chương 4 và 5 đã xem xét khá nhiều lỗi về cú pháp, từ mức độ dài dòng của các tham chiếu `.prototype` làm lộn xộn mã, đến *giả đa hình rõ ràng* (xem Chương 4) khi bạn đặt cho các phương thức cùng tên ở các cấp độ khác nhau của chuỗi và cố gắng triển khai tham chiếu đa hình từ phương thức cấp thấp hơn sang phương thức cấp cao hơn. `.constructor` bị hiểu sai thành "được xây dựng bởi" và không đáng tin cậy đối với định nghĩa đó lại là một lỗi cú pháp khác.

Nhưng các vấn đề với thiết kế class còn sâu sắc hơn nhiều. Chương 4 chỉ ra rằng các class trong các ngôn ngữ class-oriented truyền thống thực sự tạo ra một hành động *sao chép* từ cha đến con, trong khi trong `[[Prototype]]`, hành động đó **không** là một bản sao, mà là ngược lại -- một liên kết ủy quyền.

Khi so sánh với sự đơn giản của code kiểu OLOO và behavior delegation (xem Chương 6), bao gồm `[[Prototype]]` thay vì ẩn nó, các class nổi bật như một ngón tay cái đau nhức trong JS.

## `class`

Nhưng chúng ta *không* cần phải tranh luận lại trường hợp đó. Tôi chỉ đề cập lại những vấn đề đó một cách ngắn gọn để bạn luôn ghi nhớ chúng khi bây giờ chúng ta chuyển sự chú ý sang cơ chế `class` của ES6. Ở đây, chúng tôi sẽ trình bày cách thức hoạt động của nó và xem liệu `class` có làm bất cứ điều gì đáng kể để giải quyết bất kỳ mối quan tâm nào về "class" đó hay không.

Hãy xem lại ví dụ `Widget` / `Button` từ Chương 6:

```js
class Widget {
	constructor(width,height) {
		this.width = width || 50;
		this.height = height || 50;
		this.$elem = null;
	}
	render($where){
		if (this.$elem) {
			this.$elem.css( {
				width: this.width + "px",
				height: this.height + "px"
			} ).appendTo( $where );
		}
	}
}

class Button extends Widget {
	constructor(width,height,label) {
		super( width, height );
		this.label = label || "Default";
		this.$elem = $( "<button>" ).text( this.label );
	}
	render($where) {
		super.render( $where );
		this.$elem.click( this.onClick.bind( this ) );
	}
	onClick(evt) {
		console.log( "Button '" + this.label + "' clicked!" );
	}
}
```

Ngoài việc cú pháp này *trông* đẹp hơn, ES6 giải quyết vấn đề gì?

1. Không còn tham chiếu nào (tốt, sắp xếp, xem bên dưới!) đến `.prototype` làm lộn xộn code.
2. `Button` được khai báo trực tiếp để "kế thừa từ" (còn gọi là `extends`) `Widget`, thay vì cần sử dụng `Object.create(..)` để thay thế đối tượng `.prototype` được liên kết hoặc có để thiết lập với `.__proto__` hoặc `Object.setPrototypeOf(..)`.
3. `super(..)` hiện cung cấp cho chúng ta khả năng **relative polymorphism** rất hữu ích, để bất kỳ phương thức nào ở một cấp độ của chuỗi có thể tham chiếu tương đối một cấp độ cao hơn của chuỗi tới một phương thức cùng tên. Điều này bao gồm một giải pháp cho lưu ý từ Chương 4 về sự kỳ lạ của các hàm tạo không thuộc class của chúng, và do đó không liên quan -- `super()` hoạt động bên trong các hàm tạo chính xác như bạn mong đợi.
4. Cú pháp chữ `class` không có khả năng chỉ định các thuộc tính (chỉ các phương thức). Điều này có vẻ hạn chế đối với một số người, nhưng người ta cho rằng phần lớn các trường hợp trong đó một thuộc tính (state - trạng thái) tồn tại ở nơi khác ngoài "instance" chuỗi cuối, đây thường là một sai lầm và đáng ngạc nhiên (vì state đó được "chia sẻ" ngầm giữa tất cả các "instance"). Vì vậy, một người *có thể* nói rằng cú pháp `class` đang bảo vệ bạn khỏi những sai lầm.
5. `extends` cho phép bạn mở rộng ngay cả các loại build-in object (sub)types, như `Array` hoặc `RegExp`, theo cách rất tự nhiên. Làm như vậy mà không có `class .. extends` từ lâu đã là một nhiệm vụ cực kỳ phức tạp và khó chịu, một nhiệm vụ mà chỉ những tác giả khuôn khổ lão luyện nhất mới có thể giải quyết chính xác. Bây giờ, nó sẽ khá tầm thường!

Công bằng mà nói, đó là một số giải pháp quan trọng cho nhiều vấn đề (cú pháp) rõ ràng nhất và khiến mọi người ngạc nhiên với mã kiểu nguyên mẫu cổ điển.

## `class` Gotchas

Tuy nhiên, đó không phải là tất cả kẹo cao su và hoa hồng. Vẫn còn một số vấn đề sâu sắc và rắc rối sâu sắc khi sử dụng "class" làm design pattern trong JS.

Thứ nhất, cú pháp `class` có thể thuyết phục bạn rằng có một cơ chế "class" mới tồn tại trong JS kể từ ES6. **Không phải như vậy.** `class` chủ yếu chỉ là cú pháp nằm trên cơ chế `[[Prototype]]` (delegation - uỷ quyền!) hiện có.

Điều đó có nghĩa là `class` không thực sự sao chép các định nghĩa một cách tĩnh tại thời điểm khai báo giống như trong các ngôn ngữ class-oriented truyền thống. Nếu bạn thay đổi/thay thế một phương thức (có mục đích hoặc vô tình) trên "class" cha, thì "class" con và/hoặc các instance vẫn sẽ bị "ảnh hưởng", theo nghĩa là chúng không nhận được bản sao tại thời điểm khai báo, chúng tất cả vẫn đang sử dụng mô hình ủy quyền trực tiếp dựa trên `[[Prototype]]`:

```js
class C {
	constructor() {
		this.num = Math.random();
	}
	rand() {
		console.log( "Random: " + this.num );
	}
}

var c1 = new C();
c1.rand(); // "Random: 0.4324299..."

C.prototype.rand = function() {
	console.log( "Random: " + Math.round( this.num * 1000 ));
};

var c2 = new C();
c2.rand(); // "Random: 867"

c1.rand(); // "Random: 432" -- oops!!!
```

Đây chỉ có vẻ là hành vi hợp lý *nếu bạn đã biết* về bản chất ủy quyền của mọi thứ, thay vì mong đợi *bản sao* từ "các lớp thực". Vì vậy, câu hỏi đặt ra cho chính bạn là, tại sao bạn lại chọn cú pháp `class` cho một cái gì đó về cơ bản khác với các class?

Không phải cú pháp `class` của ES6 **chỉ làm cho việc nhìn và hiểu sự khác biệt giữa các lớp truyền thống và các đối tượng được ủy quyền trở nên khó khăn hơn** sao?

Cú pháp `class` *không* cung cấp cách khai báo các thuộc tính của class (chỉ các phương thức). Vì vậy, nếu bạn cần làm điều đó để theo dõi trạng thái được chia sẻ giữa các instance, thì cuối cùng bạn sẽ quay lại cú pháp `.prototype` xấu xí, như thế này:

```js
class C {
	constructor() {
		// make sure to modify the shared state,
		// not set a shadowed property on the
		// instances!
		C.prototype.count++;

		// here, `this.count` works as expected
		// via delegation
		console.log( "Hello: " + this.count );
	}
}

// add a property for shared state directly to
// prototype object
C.prototype.count = 0;

var c1 = new C();
// Hello: 1

var c2 = new C();
// Hello: 2

c1.count === 2; // true
c1.count === c2.count; // true
```

Vấn đề lớn nhất ở đây là nó phản bội cú pháp `class` bằng cách để lộ (rò rỉ!) `.prototype` như một chi tiết triển khai.

Tuy nhiên, chúng ta vẫn có một điều bất ngờ là `this.count++` sẽ ngầm tạo một thuộc tính `.count` được shadowed riêng biệt trên cả hai object `c1` và `c2`, thay vì cập nhật state được chia sẻ. `class` không mang lại cho chúng ta sự an ủi nào từ vấn đề đó, ngoại trừ (có lẽ) để ám chỉ việc thiếu hỗ trợ cú pháp rằng bạn không nên làm điều đó *hoàn toàn*.

Hơn nữa, shadowing vô tình vẫn là một mối nguy hiểm:

```js
class C {
	constructor(id) {
		// oops, gotcha, we're shadowing `id()` method
		// with a property value on the instance
		this.id = id;
	}
	id() {
		console.log( "Id: " + this.id );
	}
}

var c1 = new C( "c1" );
c1.id(); // TypeError -- `c1.id` is now the string "c1"
```

Ngoài ra còn có một số vấn đề rất tế nhị về cách hoạt động của `super`. Bạn có thể cho rằng `super` sẽ bị ràng buộc theo cách tương tự như cách `this` bị ràng buộc (xem Chương 2), nghĩa là `super` sẽ luôn bị ràng buộc ở một cấp cao hơn bất kỳ vị trí nào của phương thức hiện tại trong chuỗi `[[Prototype]]`.

Tuy nhiên, vì lý do hiệu suất (liên kết `this` thực sự nặng), `super` không được liên kết động. Đó là loại "tĩnh" bị ràng buộc, như thời gian khai báo. Không có vấn đề lớn, phải không?

Ehh... có thể, có thể không. Nếu bạn, giống như hầu hết các nhà phát triển JS, bắt đầu gán function xung quanh các object khác nhau (xuất phát từ định nghĩa `class`), theo nhiều cách khác nhau, thì có lẽ bạn sẽ không nhận thức được rằng trong tất cả các trường hợp đó, cơ chế `super` bên dưới phải được đóng lại mỗi lần.

Và tùy thuộc vào loại cách tiếp cận cú pháp mà bạn thực hiện đối với các bài tập này, rất có thể có trường hợp `super` không thể được ràng buộc đúng cách (ít nhất, không phải nơi bạn nghi ngờ), vì vậy bạn có thể (tại thời điểm viết, Thảo luận TC39 đang diễn ra về chủ đề này) phải liên kết thủ công `super` với `toMethod(..)` (giống như bạn phải thực hiện `bind(..)` cho `this` -- xem Chương 2).

Bạn đã quen với việc có thể gán xung quanh các method cho các object khác nhau để *tự động* tận dụng tính năng động của `this` thông qua quy tắc *ràng buộc ngầm* (xem Chương 2). Nhưng điều tương tự có thể sẽ không đúng với các method sử dụng `super`.

Hãy xem `super` nên làm gì ở đây (đối với `D` và `E`):

```js
class P {
	foo() { console.log( "P.foo" ); }
}

class C extends P {
	foo() {
		super();
	}
}

var c1 = new C();
c1.foo(); // "P.foo"

var D = {
	foo: function() { console.log( "D.foo" ); }
};

var E = {
	foo: C.prototype.foo
};

// Link E to D for delegation
Object.setPrototypeOf( E, D );

E.foo(); // "P.foo"
```

Nếu bạn đang nghĩ (khá hợp lý!) rằng `super` sẽ bị ràng buộc động tại thời điểm gọi, thì bạn có thể mong đợi rằng `super()` sẽ tự động nhận ra rằng `E` ủy quyền cho `D`, vì vậy `E.foo( )` sử dụng `super()` sẽ gọi tới `D.foo()`.

**Không phải vậy.** Vì lý do thực dụng về hiệu suất, `super` không *bị ràng buộc muộn* (hay còn gọi là bị ràng buộc động) như `this`. Thay vào đó, nó bắt nguồn từ `[[HomeObject]].[[Prototype]]`, trong đó `[[HomeObject]]` được liên kết tĩnh tại thời điểm tạo.

Trong trường hợp cụ thể này, `super()` vẫn đang phân giải thành `P.foo()`, vì `[[HomeObject]]` của phương thức vẫn là `C` và `C.[[Prototype]]` là `P `.

Vẫn còn phải xem liệu có những vấn đề nan giải khác mà các nhà phát triển sẽ gặp phải ngoài kịch bản này hay không. Dù thế nào đi nữa, bạn sẽ phải siêng năng và lưu ý xem những chỗ nào engine tự động tìm ra `super` cho bạn và những chỗ nào bạn phải tự xử lý. **Ồ!**

# Static > Dynamic?

Nhưng vấn đề lớn nhất về `class` của ES6 là tất cả các vấn đề khác nhau này có nghĩa là sắp xếp `class` sẽ đưa bạn vào một cú pháp dường như ngụ ý (giống như các class truyền thống) rằng một khi bạn khai báo một `class`, đó là một định nghĩa tĩnh của một điều (khởi tạo trong tương lai). Bạn hoàn toàn đánh mất sự thật rằng `C` là một đối tượng, một thứ cụ thể mà bạn có thể tương tác trực tiếp.

Trong các ngôn ngữ class-oriented truyền thống, bạn không bao giờ điều chỉnh định nghĩa của một class sau này, vì vậy class design pattern không đề xuất các khả năng như vậy. Nhưng **một trong những phần mạnh mẽ nhất** của JS là nó *là* động và định nghĩa của bất kỳ đối tượng nào (trừ khi bạn làm cho nó bất biến) là một *thứ* linh hoạt và có thể thay đổi.

`class` dường như ngụ ý rằng bạn không nên làm những việc như vậy, bằng cách buộc bạn sử dụng cú pháp `.prototype` xấu hơn để làm như vậy hoặc buộc bạn phải suy nghĩ về `super` gotchas, v.v. Nó cũng cung cấp hỗ trợ *rất ít* cho bất kỳ cạm bẫy nào mà sự năng động này có thể mang lại.

Nói cách khác, như thể `class` đang nói với bạn: "động quá khó, vì vậy đây có thể không phải là ý kiến hay. Đây là một cú pháp có vẻ tĩnh, vì vậy hãy viết code tĩnh cho nội dung của bạn."

Thật là một bình luận đáng buồn về JavaScript: **động quá khó, hãy giả vờ là (nhưng không thực sự là!) tĩnh**.

Đây là những lý do tại sao ES6 `class` đang giả vờ là một giải pháp tốt cho những cơn đau đầu về cú pháp, nhưng nó thực sự làm vấy bẩn nước hơn nữa và khiến mọi thứ trở nên tồi tệ hơn đối với JS cũng như để hiểu rõ ràng và ngắn gọn.

**Lưu ý:** Nếu bạn sử dụng tiện ích `.bind(..)` để tạo một hàm liên kết cứng (xem Chương 2), hàm được tạo sẽ không thể phân lớp con với ES6 `extend` giống như các hàm thông thường.

## Review (TL;DR)

`class` thực hiện rất tốt việc giả vờ khắc phục sự cố với class/inheritance design pattern trong JS. Nhưng nó thực sự làm điều ngược lại: **nó che giấu nhiều vấn đề và đưa ra những vấn đề tế nhị nhưng nguy hiểm khác**.

`class` góp phần vào sự nhầm lẫn đang diễn ra của "class" trong JavaScript, điều này đã cản trở ngôn ngữ này trong gần hai thập kỷ. Ở một số khía cạnh, nó đặt ra nhiều câu hỏi hơn là trả lời và về tổng thể, nó giống như một sự phù hợp rất không tự nhiên bên cạnh sự đơn giản tao nhã của cơ chế `[[Prototype]]`.

Điểm mấu chốt: nếu ES6 `class` làm cho việc tận dụng mạnh mẽ `[[Prototype]]` trở nên khó khăn hơn và che giấu bản chất quan trọng nhất của cơ chế đối tượng JS -- **liên kết ủy quyền trực tiếp giữa các đối tượng** -- thì không nên chúng ta thấy `class` đang tạo ra nhiều rắc rối hơn là nó giải quyết được, và chỉ chuyển nó thành một mô hình chống đối?

Tôi thực sự không thể trả lời câu hỏi đó cho bạn. Nhưng tôi hy vọng cuốn sách này đã khám phá đầy đủ vấn đề ở cấp độ sâu hơn so với những gì bạn từng xem trước đây và đã cung cấp cho bạn thông tin bạn cần *để tự trả lời*.
