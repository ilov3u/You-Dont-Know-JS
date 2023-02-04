# You Don't Know JS: *this* & Object Prototypes
# Chapter 6: Behavior Delegation

Trong Chương 5, chúng ta đã đề cập chi tiết đến cơ chế `[[Prototype]]` và *tại sao* cơ chế này khó hiểu và không phù hợp (mặc dù đã có vô số nỗ lực trong gần hai thập kỷ) để mô tả nó là "lớp" hoặc "kế thừa". Chúng ta đã lướt qua không chỉ cú pháp khá dài dòng (`.prototype` rải rác trong mã), mà còn nhiều vấn đề khác nhau (chẳng hạn như độ phân giải `.constructor` đáng ngạc nhiên hoặc cú pháp giả đa hình xấu xí). Chúng tôi đã khám phá các biến thể của phương pháp "mixin" mà nhiều người sử dụng để cố gắng làm phẳng những khu vực gồ ghề như vậy.

Tại thời điểm này, phản ứng phổ biến là tự hỏi tại sao phải phức tạp như vậy để làm một việc tưởng chừng như đơn giản như vậy. Bây giờ chúng ta đã vén bức màn lên và thấy mọi thứ bẩn thỉu đến mức nào, không có gì ngạc nhiên khi hầu hết các nhà phát triển JS không bao giờ tìm hiểu sâu về vấn đề này mà thay vào đó, chuyển mớ hỗn độn đó sang một thư viện "class" để xử lý giúp họ.

Tôi hy vọng bây giờ bạn không hài lòng với việc chỉ lướt qua và để lại những chi tiết như vậy cho thư viện "blackbox". Bây giờ chúng ta hãy tìm hiểu xem chúng ta *có thể và nên* suy nghĩ như thế nào về cơ chế `[[Prototype]]` của object trong JS, theo cách **đơn giản và dễ hiểu hơn nhiều** so với sự nhầm lẫn giữa các class.

Như một đánh giá ngắn gọn về các kết luận của chúng tôi từ Chương 5, cơ chế `[[Prototype]]` là một liên kết nội bộ tồn tại trên một object tham chiếu đến một object khác.

Liên kết này được thực hiện khi tham chiếu thuộc tính/phương thức được thực hiện đối với object đầu tiên và không tồn tại thuộc tính/phương thức nào như vậy. Trong trường hợp đó, liên kết `[[Prototype]]` báo cho công cụ tìm kiếm thuộc tính/phương thức trên object được liên kết với. Đổi lại, nếu object đó không thể hoàn thành tra cứu, `[[Prototype]]` của nó sẽ được theo sau, v.v. Chuỗi liên kết này giữa các đối tượng tạo thành cái được gọi là "chuỗi nguyên mẫu".

Nói cách khác, cơ chế thực tế, bản chất của những gì quan trọng đối với chức năng mà chúng ta có thể tận dụng trong JavaScript, là **tất cả về các object được liên kết với các object khác.**

Quan sát đơn lẻ đó là cơ bản và quan trọng để hiểu động cơ và cách tiếp cận cho phần còn lại của chương này!

## Towards Delegation-Oriented Design

Để tập trung suy nghĩ của chúng ta vào cách sử dụng `[[Prototype]]` theo cách đơn giản nhất, chúng ta phải nhận ra rằng nó đại diện cho một design pattern khác về cơ bản so với các class (xem Chương 4).

**Lưu ý:** *Một số* nguyên tắc của thiết kế hướng lớp vẫn còn hiệu lực, vì vậy đừng bỏ qua mọi thứ bạn biết (chỉ phần lớn thôi!). Ví dụ: *encapsulation* khá mạnh và tương thích (mặc dù không phổ biến) với delegation.

Chúng ta cần cố gắng thay đổi suy nghĩ của mình từ class/inheritance design pattern sang behavior delegation design pattern. Nếu bạn đã thực hiện hầu hết hoặc tất cả các chương trình trong tư duy giáo dục/nghề nghiệp của mình trong các class, điều này có thể không thoải mái hoặc cảm thấy không tự nhiên. Bạn có thể cần thử bài tập tinh thần này vài lần để hiểu rõ cách suy nghĩ rất khác biệt này.

Trước tiên, tôi sẽ hướng dẫn bạn qua một số bài tập lý thuyết, sau đó chúng ta sẽ xem xét song song một ví dụ cụ thể hơn để cung cấp cho bạn ngữ cảnh thực tế cho code của riêng bạn.

### Class Theory

Giả sử chúng ta có một số nhiệm vụ tương tự ("XYZ", "ABC", v.v.) mà chúng ta cần lập mô hình trong phần mềm của mình.

Với các class, cách bạn thiết kế kịch bản là: xác định một class cha (cơ sở) chung như `Task`, xác định hành vi được chia sẻ cho tất cả các tác vụ "giống nhau". Sau đó, bạn định nghĩa các class con `XYZ` và `ABC`, cả hai đều kế thừa từ `Task` và mỗi class này bổ sung hành vi chuyên biệt để xử lý các tác vụ tương ứng của chúng.

**Điều quan trọng,** class design pattern sẽ khuyến khích bạn rằng để tận dụng tối đa tính kế thừa, bạn sẽ muốn sử dụng tính năng ghi đè phương thức (và tính đa hình), trong đó bạn ghi đè định nghĩa của một số phương thức `Task` chung trong `XYZ`, thậm chí có thể sử dụng `super` để gọi đến phiên bản cơ sở của phương thức đó trong khi thêm nhiều hành vi hơn vào nó. **Bạn có thể sẽ tìm thấy khá nhiều nơi** nơi bạn có thể "trừu tượng hóa" hành vi chung cho class cha và chuyên biệt hóa (ghi đè) nó trong các class con của bạn.

Dưới đây là một số loose pseudo-code cho kịch bản đó:

```js
class Task {
	id;

	// constructor `Task()`
	Task(ID) { id = ID; }
	outputTask() { output( id ); }
}

class XYZ inherits Task {
	label;

	// constructor `XYZ()`
	XYZ(ID,Label) { super( ID ); label = Label; }
	outputTask() { super(); output( label ); }
}

class ABC inherits Task {
	// ...
}
```

Giờ đây, bạn có thể khởi tạo một hoặc nhiều **bản sao** của lớp con `XYZ` và sử dụng (các) instance đó để thực hiện tác vụ "XYZ". Các instance này có **sao chép cả** hành vi được xác định chung của `Task` cũng như hành vi được xác định của `XYZ` cụ thể. Tương tự như vậy, các instance của class `ABC` sẽ có các bản sao của hành vi `Task` và hành vi `ABC` cụ thể. Sau khi xây dựng, nhìn chung bạn sẽ chỉ tương tác với các instance (chứ không phải các class), vì mỗi instance đều có bản sao của tất cả các hành vi bạn cần để thực hiện tác vụ dự định.

### Delegation Theory

Nhưng bây giờ, hãy thử nghĩ về cùng một miền vấn đề, nhưng sử dụng *behavior delegation* thay vì *class*.

Trước tiên, bạn sẽ định nghĩa một **object** (không phải class, cũng không phải `function` như hầu hết các lập trình viên JS khiến bạn tin tưởng) được gọi là `Task`, và nó sẽ có hành vi cụ thể bao gồm các utility method khác nhau. nhiệm vụ có thể sử dụng (đọc: *delegate to*!). Sau đó, đối với mỗi task ("XYZ", "ABC"), bạn xác định một **object** để giữ hành vi/dữ liệu dành riêng cho nhiệm vụ đó. Bạn **liên kết** (các) object dành riêng cho nhiệm vụ của mình với object tiện ích `Task`, cho phép họ ủy quyền cho object đó khi họ cần.

Về cơ bản, bạn nghĩ về việc thực hiện nhiệm vụ "XYZ" là cần các hành vi từ hai object anh chị em/ngang hàng (`XYZ` và `Task`) để hoàn thành nó. Nhưng thay vì cần phải kết hợp chúng lại với nhau, thông qua các bản sao class, chúng ta có thể giữ chúng trong các object riêng biệt của chúng và chúng ta có thể cho phép object `XYZ` **delegate** cho `Task` khi cần.

Đây là một số mã đơn giản để gợi ý cách bạn thực hiện điều đó:

```js
var Task = {
	setID: function(ID) { this.id = ID; },
	outputID: function() { console.log( this.id ); }
};

// make `XYZ` delegate to `Task`
var XYZ = Object.create( Task );

XYZ.prepareTask = function(ID,Label) {
	this.setID( ID );
	this.label = Label;
};

XYZ.outputTaskDetails = function() {
	this.outputID();
	console.log( this.label );
};

// ABC = Object.create( Task );
// ABC ... = ...
```

Trong code này, `Task` và `XYZ` không phải là class (hoặc function), chúng **chỉ là object**. `XYZ` được thiết lập thông qua `Object.create(..)` để `[[Prototype]]` delegate cho object `Task` (xem Chương 5).

So với class-oriented (hay còn gọi là OO -- object oriented), tôi gọi style code này là **"OLOO"** (objects-linked-to-other-objects). Tất cả những gì chúng tôi *thực sự* quan tâm là object `XYZ` delegate cho object `Task` (cũng như object `ABC`).

Trong JavaScript, cơ chế `[[Prototype]]` liên kết **object** với **object** khác. Không có cơ chế trừu tượng nào như "class", cho dù bạn có cố gắng thuyết phục bản thân đến mức nào đi chăng nữa. Nó giống như chèo xuồng ngược dòng: bạn *có thể* làm được, nhưng bạn *chọn* đi ngược dòng chảy tự nhiên, vì vậy rõ ràng **sẽ khó đến được nơi bạn muốn hơn.**

Một số điểm khác biệt khác cần lưu ý với **OLOO style code**:

1. Cả hai thành viên dữ liệu `id` và `label` từ ví dụ class trước đều là các thuộc tính dữ liệu trực tiếp trên `XYZ` (không phải trên `Task`). Nói chung, với sự tham gia của ủy quyền `[[Prototype]]`, **bạn muốn state ở trên người ủy quyền** (`XYZ`, `ABC`), chứ không phải ở trên người được ủy quyền (`Task`).
2. Với class design pattern, chúng tôi cố ý đặt tên `outputTask` giống nhau cho cả cấp độ gốc (`Task`) và cấp độ con (`XYZ`), để chúng tôi có thể tận dụng lợi thế của tính năng ghi đè (polymorphism). Trong behavior delegation, chúng tôi làm ngược lại: **chúng tôi tránh nếu có thể đặt tên những thứ giống nhau** ở các cấp độ khác nhau của chuỗi `[[Prototype]]` (gọi là shadowing -- xem Chương 5), bởi vì có những tên đó xung đột tạo ra cú pháp khó hiểu/lỏng lẻo để phân biệt các tham chiếu (xem Chương 4) và chúng tôi muốn tránh điều đó nếu có thể.

   Mẫu thiết kế này yêu cầu ít tên phương thức chung dễ bị ghi đè hơn và thay vào đó là nhiều tên phương thức mô tả, *cụ thể* đối với loại hành vi mà mỗi object đang thực hiện. **Điều này thực sự có thể tạo code dễ hiểu/duy trì hơn**, bởi vì tên của các phương thức (không chỉ ở vị trí định nghĩa mà còn nằm rải rác trong các mã khác) rõ ràng hơn (tự ghi lại tài liệu).
3. `this.setID(ID);` bên trong một phương thức trên object `XYZ` trước tiên tìm trên `XYZ` để tìm `setID(..)`, nhưng vì nó không tìm thấy phương thức có tên đó trên `XYZ`, `[[Prototype]]` *delegation* có nghĩa là nó có thể theo liên kết đến `Task` để tìm kiếm `setID(..)`, tất nhiên nó sẽ tìm thấy. Ngoài ra, do các quy tắc ràng buộc `this` của trang gọi ẩn (xem Chương 2), khi `setID(..)` chạy, mặc dù phương thức được tìm thấy trên `Task`, thì ràng buộc `this` cho lệnh gọi hàm đó là `XYZ` chính xác như chúng tôi mong đợi và mong muốn. Chúng ta cũng thấy điều tương tự với `this.outputID()` sau này trong danh sách code.

   Nói cách khác, các phương thức tiện ích chung tồn tại trên `Task` có sẵn cho chúng ta khi tương tác với `XYZ`, bởi vì `XYZ` có thể deligate cho `Task`.

**Behavior Delegation** có nghĩa là: để một số object (`XYZ`) cung cấp delegation (cho `Task`) cho các tham chiếu phương thức hoặc thuộc tính nếu không tìm thấy trên object (`XYZ`).

Đây là một design pattern *cực kỳ mạnh mẽ*, rất khác biệt với ý tưởng về các class cha và con, thừa kế, đa hình, v.v. Thay vì sắp xếp các object trong tâm trí của bạn theo chiều dọc, với Cha mẹ chảy xuống Trẻ em, hãy nghĩ về các object cạnh nhau -bên, với tư cách là đồng nghiệp, với bất kỳ hướng liên kết ủy quyền nào giữa các đối tượng khi cần thiết.

**Lưu ý:** Deligation được sử dụng đúng cách hơn như một chi tiết triển khai nội bộ hơn là được hiển thị trực tiếp trong thiết kế API. Trong ví dụ trên, chúng ta không nhất thiết *có ý định* với thiết kế API của chúng ta để các nhà phát triển gọi `XYZ.setID()` (mặc dù tất nhiên là chúng ta có thể!). Chúng ta sắp xếp *ẩn* ủy quyền dưới dạng một chi tiết nội bộ của API của chúng tôi, trong đó `XYZ.prepareTask(..)` ủy quyền cho `Task.setID(..)`. Xem phần "Liên kết dưới dạng dự phòng?" thảo luận trong Chương 5 để biết thêm chi tiết.

#### Mutual Delegation (Disallowed) - Ủy quyền lẫn nhau (Không được phép)

Bạn không thể tạo một *chu kỳ* trong đó hai hoặc nhiều đối tượng được ủy quyền lẫn nhau (hai chiều) cho nhau. Nếu bạn tạo `B` được liên kết với `A`, rồi cố gắng liên kết `A` với `B`, bạn sẽ gặp lỗi.

Thật đáng tiếc (không quá ngạc nhiên, nhưng hơi khó chịu) rằng điều này không được phép. Nếu bạn đã tham chiếu đến một thuộc tính/phương thức không tồn tại ở cả hai nơi, thì bạn sẽ có một đệ quy vô hạn trên vòng lặp `[[Prototype]]`. Nhưng nếu tất cả các tham chiếu đều có mặt nghiêm ngặt, thì `B` có thể ủy quyền cho `A` và ngược lại, và nó *có thể* hoạt động. Điều này có nghĩa là bạn có thể sử dụng một trong hai đối tượng để ủy thác cho đối tượng kia, cho các nhiệm vụ khác nhau. Có một vài trường hợp sử dụng thích hợp mà điều này có thể hữu ích.

Nhưng điều đó không được phép vì những người triển khai công cụ đã nhận thấy rằng việc kiểm tra (và từ chối!) tham chiếu vòng tròn vô hạn một lần vào thời điểm đã đặt sẽ hiệu quả hơn thay vì cần phải kiểm tra hiệu suất của bộ bảo vệ đó mỗi khi bạn tra cứu một thuộc tính trên một đối tượng.

#### Debugged

Chúng tôi sẽ trình bày ngắn gọn một chi tiết tinh tế có thể gây nhầm lẫn cho các nhà phát triển. Nói chung, đặc tả JS không kiểm soát cách các công cụ dành cho nhà phát triển trình duyệt sẽ biểu thị các giá trị/cấu trúc cụ thể cho nhà phát triển, vì vậy mỗi trình duyệt/công cụ được tự do diễn giải những thứ đó khi họ thấy phù hợp. Do đó, các trình duyệt/công cụ *không phải lúc nào cũng đồng ý*. Cụ thể, hành vi mà chúng tôi sẽ kiểm tra hiện chỉ được quan sát thấy trong Công cụ dành cho nhà phát triển của Chrome.

Hãy xem xét mã JS kiểu "class constructor" truyền thống này, vì nó sẽ xuất hiện trong *bảng điều khiển* của Công cụ dành cho nhà phát triển Chrome:

```js
function Foo() {}

var a1 = new Foo();

a1; // Foo {}
```

Hãy xem xét dòng cuối cùng của đoạn mã đó: kết quả của việc đánh giá biểu thức `a1`, sẽ in ra `Foo {}`. Nếu bạn thử cùng mã này trong Firefox, bạn có thể sẽ thấy `Object {}`. Tại sao sự khác biệt? Những đầu ra này có ý nghĩa gì?

Về cơ bản, Chrome đang nói "{} là một đối tượng trống được tạo bởi một hàm có tên 'Foo'". Firefox đang nói "{} là một đối tượng trống của cấu trúc chung từ Object". Sự khác biệt tinh tế là Chrome đang tích cực theo dõi, dưới dạng *intenal property*, tên của function thực tế đã thực hiện việc xây dựng, trong khi các trình duyệt khác không theo dõi thông tin bổ sung đó.

Sẽ rất hấp dẫn nếu cố gắng giải thích điều này bằng cơ chế JavaScript:

```js
function Foo() {}

var a1 = new Foo();

a1.constructor; // Foo(){}
a1.constructor.name; // "Foo"
```

Vì vậy, đó có phải là cách Chrome xuất ra "Foo", chỉ bằng cách kiểm tra `.constructor.name` của object không? Thật khó hiểu, câu trả lời là cả "có" và "không".

Hãy xem xét code này:

```js
function Foo() {}

var a1 = new Foo();

Foo.prototype.constructor = function Gotcha(){};

a1.constructor; // Gotcha(){}
a1.constructor.name; // "Gotcha"

a1; // Foo {}
```

Mặc dù chúng tôi thay đổi `a1.constructor.name` thành một cái gì đó hợp pháp khác ("Gotcha"), bảng điều khiển của Chrome vẫn sử dụng tên "Foo".

Vì vậy, có vẻ như câu trả lời cho câu hỏi trước đó (nó có sử dụng `.constructor.name` không?) là **không**, nó phải theo dõi nó ở một nơi khác, trong nội bộ.

Nhưng, Không quá nhanh! Hãy xem loại hành vi này hoạt động như thế nào với OLOO-style code:

```js
var Foo = {};

var a1 = Object.create( Foo );

a1; // Object {}

Object.defineProperty( Foo, "constructor", {
	enumerable: false,
	value: function Gotcha(){}
});

a1; // Gotcha {}
```

A ha! **Hiểu rồi!** Tại đây, bảng điều khiển của Chrome **đã** tìm và sử dụng `.constructor.name`. Trên thực tế, trong khi viết cuốn sách này, hành vi chính xác này đã được xác định là một lỗi trong Chrome và vào thời điểm bạn đọc nó, nó có thể đã được sửa. Vì vậy, thay vào đó, bạn có thể đã thấy `a1; // Object {}`.

Ngoài lỗi đó, theo dõi nội bộ (dường như chỉ dành cho mục đích đầu ra gỡ lỗi) của "tên hàm tạo" mà Chrome thực hiện (hiển thị trong các đoạn mã trước đó) là một hành vi mở rộng có chủ ý chỉ dành cho Chrome ngoài những gì đặc tả JS yêu cầu.

Nếu bạn không sử dụng "hàm tạo" để tạo các đối tượng của mình, vì chúng tôi không khuyến khích mã kiểu OLOO ở đây trong chương này, thì bạn sẽ nhận được các đối tượng mà Chrome *không* theo dõi "tên hàm tạo" nội bộ cho và các đối tượng như vậy sẽ chỉ được xuất chính xác là "Object {}", nghĩa là "đối tượng được tạo từ cấu trúc Object()".

**Đừng nghĩ** điều này thể hiện một nhược điểm của OLOO-style coding. Khi bạn viết code bằng OLOO và behavior delegation làm design pattern của mình, *ai* "được xây dựng" (nghĩa là *chức năng nào* được gọi với `new`?), một số đối tượng là chi tiết không liên quan. Theo dõi "constructor name" nội bộ cụ thể của Chrome thực sự chỉ hữu ích nếu bạn hoàn toàn sử dụng "class style" coding, nhưng sẽ gây tranh cãi nếu thay vào đó bạn sử dụng ủy quyền OLOO.

### Mental Models Compared

Bây giờ bạn có thể thấy sự khác biệt giữa các design pattern "class" và "deligation", ít nhất là về mặt lý thuyết, hãy xem ý nghĩa của các mẫu thiết kế này đối với các mô hình tinh thần mà chúng ta sử dụng để suy luận về mã của mình.

Chúng ta sẽ kiểm tra một số code ("Foo", "Bar") lý thuyết hơn và so sánh cả hai cách (OO so với OLOO) trong việc triển khai code. Đoạn code đầu tiên sử dụng kiểu OO cổ điển ("prototypal"):

```js
function Foo(who) {
	this.me = who;
}
Foo.prototype.identify = function() {
	return "I am " + this.me;
};

function Bar(who) {
	Foo.call( this, who );
}
Bar.prototype = Object.create( Foo.prototype );

Bar.prototype.speak = function() {
	alert( "Hello, " + this.identify() + "." );
};

var b1 = new Bar( "b1" );
var b2 = new Bar( "b2" );

b1.speak();
b2.speak();
```

Class cha `Foo`, được kế thừa bởi class con `Bar`, class này sau đó được khởi tạo hai lần dưới dạng `b1` và `b2`. Những gì chúng tôi có là `b1` ủy quyền cho `Bar.prototype` mà ủy quyền cho `Foo.prototype`. Điều này sẽ trông khá quen thuộc với bạn, vào thời điểm này. Không có gì quá đột phá đang diễn ra.

Bây giờ, hãy triển khai **chính xác chức năng tương tự** bằng cách sử dụng code kiểu *OLOO*:

```js
var Foo = {
	init: function(who) {
		this.me = who;
	},
	identify: function() {
		return "I am " + this.me;
	}
};

var Bar = Object.create( Foo );

Bar.speak = function() {
	alert( "Hello, " + this.identify() + "." );
};

var b1 = Object.create( Bar );
b1.init( "b1" );
var b2 = Object.create( Bar );
b2.init( "b2" );

b1.speak();
b2.speak();
```

Chúng ta tận dụng chính xác lợi thế của việc ủy quyền `[[Prototype]]` từ `b1` sang `Bar` sang `Foo` như chúng ta đã làm trong đoạn code trước giữa `b1`, `Bar.prototype` và `Foo.prototype `. **Chúng ta vẫn có 3 object giống nhau được liên kết với nhau**.

Nhưng, quan trọng là, chúng ta đã đơn giản hóa rất nhiều *tất cả những thứ khác* đang diễn ra, bởi vì bây giờ chúng ta chỉ cần thiết lập các **đối tượng** được liên kết với nhau, mà không cần đến tất cả sự lộn xộn và lộn xộn của những thứ có vẻ như (nhưng không cư xử!) giống như các lớp, với các hàm tạo và nguyên mẫu và các lệnh gọi `new`.

Hãy tự hỏi: nếu tôi có thể có cùng chức năng với code OLOO-style như tôi làm với code "class"-style, nhưng OLOO đơn giản hơn và có ít điều phải suy nghĩ hơn, thì **OLOO có tốt hơn không**?

Hãy xem xét các mô hình tư tưởng liên quan giữa hai đoạn code này.

Đầu tiên, đoạn code class-style ngụ ý mô hình tư tưởng này của các thực thể và các mối quan hệ của chúng:

<img src="fig4.png">

Trên thực tế, điều đó hơi không công bằng/gây hiểu lầm, bởi vì nó hiển thị rất nhiều chi tiết bổ sung mà bạn không *về mặt kỹ thuật* cần phải biết mọi lúc (mặc dù bạn *thực sự* cần phải hiểu nó!). Một điểm đáng chú ý là nó là một chuỗi các mối quan hệ khá phức tạp. Nhưng một điều cần rút ra: nếu bạn dành thời gian để theo dõi các mũi tên mối quan hệ xung quanh đó, **có một mức độ nhất quán bên trong đáng kinh ngạc** trong các cơ chế của JS.

Chẳng hạn, khả năng truy cập `call(..)`, `apply(..)` và `bind(..)` của một function JS (xem Chương 2) là do bản thân các function là các object và các function-object cũng có liên kết `[[Prototype]]`, với object `Function.prototype`, định nghĩa các phương thức mặc định mà bất kỳ function-object nào cũng có thể ủy quyền. JS có thể làm những điều đó, *và bạn cũng có thể!*.

Được rồi, bây giờ chúng ta hãy xem xét một phiên bản *hơi* đơn giản hóa của sơ đồ đó để so sánh "công bằng" hơn một chút -- nó chỉ hiển thị các thực thể và mối quan hệ *có liên quan*.

<img src="fig5.png">

Vẫn còn khá phức tạp, phải không? Các đường chấm chấm mô tả các mối quan hệ ngụ ý khi bạn thiết lập "kế thừa" giữa `Foo.prototype` và `Bar.prototype` và chưa *sửa* tham chiếu thuộc tính **thiếu** `.constructor` (xem " Constructor Redux" trong Chương 5). Ngay cả khi những đường chấm đó đã bị loại bỏ, mô hình tinh thần vẫn còn rất nhiều thứ để tung hứng mỗi khi bạn làm việc với các mối liên kết object.

Bây giờ, hãy xem mô hình tinh thần cho style code OLOO:

<img src="fig6.png">

Như bạn có thể thấy khi so sánh chúng, rõ ràng là mã kiểu OLOO có *rất ít thứ* phải lo lắng, bởi vì mã kiểu OLOO bao hàm **thực tế** rằng điều duy nhất chúng ta thực sự quan tâm là **các đối tượng được liên kết với các đối tượng khác**.

Tất cả các hành trình "đẳng cấp" khác là một cách khó hiểu và phức tạp để có được kết quả cuối cùng giống nhau. Loại bỏ những thứ đó và mọi thứ trở nên đơn giản hơn nhiều (mà không làm mất bất kỳ khả năng nào).

## Classes vs. Objects

Chúng ta vừa thấy nhiều khám phá lý thuyết và tư tưởng mô hình khác nhau về "class" so với "behavior delegation". Tuy nhiên, bây giờ chúng ta hãy xem xét các kịch bản code cụ thể hơn để cho biết bạn thực sự sử dụng những ý tưởng này như thế nào.

Trước tiên, chúng ta sẽ xem xét một tình huống điển hình trong nhà phát triển web front-end: tạo các tiện ích giao diện người dùng (nút, trình đơn thả xuống, v.v.).

### Widget "Classes"

Bởi vì bạn có thể vẫn còn quá quen với mẫu thiết kế OO, nên bạn có thể sẽ nghĩ ngay đến miền vấn đề này dưới dạng một class cha (có lẽ được gọi là `Widget`) với tất cả hành vi chung của tiện ích con cơ sở, và sau đó là các lớp dẫn xuất con. cho các loại tiện ích con cụ thể (như `Button`).

**Lưu ý:** Chúng ta sẽ sử dụng jQuery ở đây để thao tác DOM và CSS, chỉ vì đó là chi tiết mà chúng ta không thực sự quan tâm cho mục đích thảo luận hiện tại của chúng ta. Không code nào trong số này quan tâm đến Framework JS nào (jQuery, Dojo, YUI, v.v.), nếu có, bạn có thể giải quyết các tác vụ thông thường như vậy bằng.

Hãy xem xét cách chúng ta triển khai thiết kế "class" trong JS thuần kiểu cổ điển mà không có bất kỳ thư viện hoặc cú pháp trợ giúp "class" nào:

```js
// Parent class
function Widget(width,height) {
	this.width = width || 50;
	this.height = height || 50;
	this.$elem = null;
}

Widget.prototype.render = function($where){
	if (this.$elem) {
		this.$elem.css( {
			width: this.width + "px",
			height: this.height + "px"
		} ).appendTo( $where );
	}
};

// Child class
function Button(width,height,label) {
	// "super" constructor call
	Widget.call( this, width, height );
	this.label = label || "Default";

	this.$elem = $( "<button>" ).text( this.label );
}

// make `Button` "inherit" from `Widget`
Button.prototype = Object.create( Widget.prototype );

// override base "inherited" `render(..)`
Button.prototype.render = function($where) {
	// "super" call
	Widget.prototype.render.call( this, $where );
	this.$elem.click( this.onClick.bind( this ) );
};

Button.prototype.onClick = function(evt) {
	console.log( "Button '" + this.label + "' clicked!" );
};

$( document ).ready( function(){
	var $body = $( document.body );
	var btn1 = new Button( 125, 30, "Hello" );
	var btn2 = new Button( 150, 40, "World" );

	btn1.render( $body );
	btn2.render( $body );
} );
```

OO design pattern yêu cầu chúng ta khai báo một `render(..)` cơ sở trong lớp cha, sau đó ghi đè nó trong lớp con của chúng ta, nhưng không thay thế nó một mình, thay vào đó để tăng cường chức năng cơ sở bằng hành vi dành riêng cho button.

Lưu ý sự xấu xí của *explicit pseudo-polymorphism* (xem Chương 4) với các tham chiếu `Widget.call` và `Widget.prototype.render.call` để giả mạo các lệnh gọi "super" từ các phương thức "class" con backup vào "cha" các phương thức cơ sở của class. Kinh quá.

#### ES6 `class` sugar

We cover ES6 `class` syntax sugar in detail in Appendix A, but let's briefly demonstrate how we'd implement the same code using `class`:

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

$( document ).ready( function(){
	var $body = $( document.body );
	var btn1 = new Button( 125, 30, "Hello" );
	var btn2 = new Button( 150, 40, "World" );

	btn1.render( $body );
	btn2.render( $body );
} );
```

Không còn nghi ngờ gì nữa, một số cú pháp xấu của cách tiếp cận cổ điển trước đây đã được làm mượt bằng `class` của ES6. Sự hiện diện của một `super(..)` nói riêng có vẻ khá hay (mặc dù khi bạn tìm hiểu sâu về nó, nó không phải là toàn hoa hồng!).

Mặc dù có những cải tiến về cú pháp, nhưng **đây không phải là các class *thực***, vì chúng vẫn hoạt động dựa trên cơ chế `[[Prototype]]`. Họ mắc phải tất cả những sự không phù hợp về mental-model mà chúng ta đã khám phá trong Chương 4, 5 và cho đến nay trong chương này. Phụ lục A sẽ trình bày chi tiết về cú pháp `class` của ES6 và ý nghĩa của nó. Chúng ta sẽ thấy tại sao việc giải quyết các trục trặc cú pháp không giải quyết được đáng kể sự nhầm lẫn class của chúng ta trong JS, mặc dù nó tạo ra một nỗ lực dũng cảm giả dạng một giải pháp!

Cho dù bạn sử dụng cú pháp prototype cổ điển hay ES6 mới, thì bạn vẫn phải thực hiện *lựa chọn* để lập mô hình miền vấn đề (UI widgets) với các "class". Và như một số chương trước đã cố gắng chứng minh, *sự lựa chọn* này trong JavaScript đang khiến bạn thêm đau đầu và phải chịu thuế tinh thần.

### Delegating Widget Objects

Đây là các ví dụ đơn giản về `Widget` / `Button` của chúng ta, sử dụng **OLOO style delegation**:

```js
var Widget = {
	init: function(width,height){
		this.width = width || 50;
		this.height = height || 50;
		this.$elem = null;
	},
	insert: function($where){
		if (this.$elem) {
			this.$elem.css( {
				width: this.width + "px",
				height: this.height + "px"
			} ).appendTo( $where );
		}
	}
};

var Button = Object.create( Widget );

Button.setup = function(width,height,label){
	// delegated call
	this.init( width, height );
	this.label = label || "Default";

	this.$elem = $( "<button>" ).text( this.label );
};
Button.build = function($where) {
	// delegated call
	this.insert( $where );
	this.$elem.click( this.onClick.bind( this ) );
};
Button.onClick = function(evt) {
	console.log( "Button '" + this.label + "' clicked!" );
};

$( document ).ready( function(){
	var $body = $( document.body );

	var btn1 = Object.create( Button );
	btn1.setup( 125, 30, "Hello" );

	var btn2 = Object.create( Button );
	btn2.setup( 150, 40, "World" );

	btn1.build( $body );
	btn2.build( $body );
} );
```

Với cách tiếp cận kiểu OLOO này, chúng ta không coi `Widget` là cha và `Button` là con. Thay vào đó, `Widget` **chỉ là một object** và là một loại tập hợp utility mà bất kỳ loại widget cụ thể nào cũng có thể muốn ủy quyền cho, và `Button` **cũng chỉ là một stand-alone object (đối tượng độc lập)** (với tất nhiên là một liên kết ủy quyền tới `Widget`!).

Từ góc độ design pattern, chúng ta **không** chia sẻ cùng một tên phương thức `render(..)` trong cả hai object, theo cách các class đề xuất, mà thay vào đó chúng ta chọn các tên khác nhau (`insert(..)` và `build(..)`) mô tả rõ hơn về nhiệm vụ cụ thể mà mỗi tác vụ thực hiện. Các phương thức *khởi tạo* lần lượt được gọi là `init(..)` và `setup(..)` vì những lý do tương tự.

Delegation design pattern này không chỉ đề xuất các tên khác nhau và mang tính mô tả hơn (thay vì các tên được chia sẻ và chung chung hơn), mà làm như vậy với OLOO nhằm tránh sự xấu xí của các lệnh gọi giả đa hình rõ ràng (`Widget.call` và `Widget. prototype.render.call`), như bạn có thể thấy qua các lệnh gọi đơn giản, tương đối, được ủy quyền tới `this.init(..)` và `this.insert(..)`.

Về mặt cú pháp, chúng ta cũng không có bất kỳ constructor nào, `.prototype` hoặc `new`, vì trên thực tế, chúng chỉ là hành trình không cần thiết.

Bây giờ, nếu để ý kỹ, bạn có thể nhận thấy rằng trước đây chỉ có một lệnh gọi (`var btn1 = new Button(..)`) giờ là hai lệnh gọi (`var btn1 = Object.create(Button)` và `btn1.setup(..)`). Ban đầu, điều này có vẻ như là một nhược điểm (nhiều code hơn).

Tuy nhiên, ngay cả đây cũng là thứ **code kiểu OLOO chuyên nghiệp** so với code kiểu prototype cổ điển. Làm sao?

Với các constructor của class, bạn bị "bắt buộc" (không thực sự, nhưng được đề xuất mạnh mẽ) để thực hiện cả việc construction và initialization trong cùng một bước. Tuy nhiên, có nhiều trường hợp có thể thực hiện hai bước này một cách riêng biệt (như bạn làm với OLOO!) sẽ linh hoạt hơn.

Ví dụ: giả sử bạn tạo tất cả các instance của mình trong một nhóm khi bắt đầu chương trình, nhưng bạn đợi để khởi tạo chúng với thiết lập cụ thể cho đến khi chúng được lấy từ nhóm và được sử dụng. Chúng ta đã cho thấy hai cuộc gọi xảy ra ngay cạnh nhau, nhưng tất nhiên chúng có thể xảy ra vào những thời điểm rất khác nhau và ở những phần rất khác nhau trong code của chúng ta, nếu cần.

**OLOO** hỗ trợ *tốt hơn* nguyên tắc phân tách các mối quan tâm, trong đó việc creation và intialization không nhất thiết phải được gộp vào cùng một thực thi.

## Simpler Design

Ngoài việc OLOO cung cấp code có vẻ đơn giản hơn (và linh hoạt hơn!), behavior delegation dưới dạng pattern thực sự có thể dẫn đến kiến trúc code đơn giản hơn. Hãy xem xét một ví dụ cuối cùng minh họa cách OLOO đơn giản hóa thiết kế tổng thể của bạn.

Kịch bản mà chúng ta sẽ xem xét là hai controller object, một object để xử lý form đăng nhập của trang web và một object khác để thực sự xử lý xác thực (giao tiếp) với máy chủ.

Chúng ta sẽ cần một trình trợ giúp tiện ích để thực hiện giao tiếp Ajax với máy chủ. Chúng ta sẽ sử dụng jQuery (mặc dù bất kỳ framework nào cũng sẽ hoạt động tốt), vì nó không chỉ xử lý Ajax cho chúng ta mà còn trả về một promise giống như một câu trả lời để chúng ta có thể lắng nghe phản hồi trong code của mình với `.then(. .)`.

**Lưu ý:** Chúng ta không đề cập đến Promise ở đây, nhưng chúng ta sẽ đề cập đến chúng trong tương lai của loạt bài *"You Don't Know JS"*.

Theo class design pattern điển hình, chúng ta sẽ chia tác vụ thành chức năng cơ sở trong một class gọi là `Controller`, sau đó chúng ta sẽ dẫn xuất hai class con, `LoginController` và `AuthController`, cả hai đều kế thừa từ `Controller` và chuyên biệt hóa một số hành vi cơ bản đó.

```js
// Parent class
function Controller() {
	this.errors = [];
}
Controller.prototype.showDialog = function(title,msg) {
	// display title & message to user in dialog
};
Controller.prototype.success = function(msg) {
	this.showDialog( "Success", msg );
};
Controller.prototype.failure = function(err) {
	this.errors.push( err );
	this.showDialog( "Error", err );
};
```

```js
// Child class
function LoginController() {
	Controller.call( this );
}
// Link child class to parent
LoginController.prototype = Object.create( Controller.prototype );
LoginController.prototype.getUser = function() {
	return document.getElementById( "login_username" ).value;
};
LoginController.prototype.getPassword = function() {
	return document.getElementById( "login_password" ).value;
};
LoginController.prototype.validateEntry = function(user,pw) {
	user = user || this.getUser();
	pw = pw || this.getPassword();

	if (!(user && pw)) {
		return this.failure( "Please enter a username & password!" );
	}
	else if (pw.length < 5) {
		return this.failure( "Password must be 5+ characters!" );
	}

	// got here? validated!
	return true;
};
// Override to extend base `failure()`
LoginController.prototype.failure = function(err) {
	// "super" call
	Controller.prototype.failure.call( this, "Login invalid: " + err );
};
```

```js
// Child class
function AuthController(login) {
	Controller.call( this );
	// in addition to inheritance, we also need composition
	this.login = login;
}
// Link child class to parent
AuthController.prototype = Object.create( Controller.prototype );
AuthController.prototype.server = function(url,data) {
	return $.ajax( {
		url: url,
		data: data
	} );
};
AuthController.prototype.checkAuth = function() {
	var user = this.login.getUser();
	var pw = this.login.getPassword();

	if (this.login.validateEntry( user, pw )) {
		this.server( "/check-auth",{
			user: user,
			pw: pw
		} )
		.then( this.success.bind( this ) )
		.fail( this.failure.bind( this ) );
	}
};
// Override to extend base `success()`
AuthController.prototype.success = function() {
	// "super" call
	Controller.prototype.success.call( this, "Authenticated!" );
};
// Override to extend base `failure()`
AuthController.prototype.failure = function(err) {
	// "super" call
	Controller.prototype.failure.call( this, "Auth Failed: " + err );
};
```

```js
var auth = new AuthController(
	// in addition to inheritance, we also need composition
	new LoginController()
);
auth.checkAuth();
```

Chúng ta có các hành vi cơ bản mà tất cả các controller chia sẻ, đó là `success(..)`, `failure(..)` và `showDialog(..)`. Các class của chúng ta `LoginController` và `AuthController` override `failure(..)` và `success(..)` để tăng cường hành vi lớp cơ sở mặc định. Cũng lưu ý rằng `AuthController` cần một instance của `LoginController` để tương tác với biểu mẫu đăng nhập, do đó trở thành một property.

Một điều khác cần đề cập là chúng tôi đã chọn một số *composition* để thêm vào phần inheritance. `AuthController` cần biết về `LoginController`, vì vậy chúng ta khởi tạo nó (`new LoginController()`) và tạo một thuộc tính class `this.login` để tham chiếu đến nó, do đó `AuthController` có thể gọi hành vi trên `LoginController`.

**Lưu ý:** *Có thể* đã có một chút cám dỗ để làm cho `AuthController` kế thừa từ `LoginController` hoặc ngược lại, như vậy chúng ta đã có *vitual composition* thông qua chuỗi kế thừa. Nhưng đây là một ví dụ rõ ràng về những gì không ổn với kế thừa class làm mô hình cho miền vấn đề, bởi vì cả `AuthController` và `LoginController` đều không chuyên biệt hóa hành vi cơ sở của class kia, vì vậy việc kế thừa giữa chúng không có ý nghĩa gì trừ khi các class là design pattern duy nhất của bạn. Thay vào đó, chúng ta xếp class trong một số *composition* đơn giản và bây giờ chúng có thể hợp tác, trong khi cả hai vẫn được hưởng lợi từ sự kế thừa từ cơ sở gốc `Controller`.

Nếu bạn đã quen với class-oriented (OO), tất cả điều này sẽ trông khá quen thuộc và tự nhiên.

### De-class-ified

Tuy nhiên, **chúng ta có thực sự cần mô hình hóa vấn đề này không** với một class cha `Controller`, hai class con, **và một số composition**? Có cách nào để tận dụng behavior delegation kiểu OLOO và có thiết kế *đơn giản hơn nhiều* không? **Đúng!**

```js
var LoginController = {
	errors: [],
	getUser: function() {
		return document.getElementById( "login_username" ).value;
	},
	getPassword: function() {
		return document.getElementById( "login_password" ).value;
	},
	validateEntry: function(user,pw) {
		user = user || this.getUser();
		pw = pw || this.getPassword();

		if (!(user && pw)) {
			return this.failure( "Please enter a username & password!" );
		}
		else if (pw.length < 5) {
			return this.failure( "Password must be 5+ characters!" );
		}

		// got here? validated!
		return true;
	},
	showDialog: function(title,msg) {
		// display success message to user in dialog
	},
	failure: function(err) {
		this.errors.push( err );
		this.showDialog( "Error", "Login invalid: " + err );
	}
};
```

```js
// Link `AuthController` to delegate to `LoginController`
var AuthController = Object.create( LoginController );

AuthController.errors = [];
AuthController.checkAuth = function() {
	var user = this.getUser();
	var pw = this.getPassword();

	if (this.validateEntry( user, pw )) {
		this.server( "/check-auth",{
			user: user,
			pw: pw
		} )
		.then( this.accepted.bind( this ) )
		.fail( this.rejected.bind( this ) );
	}
};
AuthController.server = function(url,data) {
	return $.ajax( {
		url: url,
		data: data
	} );
};
AuthController.accepted = function() {
	this.showDialog( "Success", "Authenticated!" )
};
AuthController.rejected = function(err) {
	this.failure( "Auth Failed: " + err );
};
```

Vì `AuthController` chỉ là một object (`LoginController` cũng vậy), chúng ta không cần khởi tạo (như `new AuthController()`) để thực hiện tác vụ của mình. Tất cả những gì chúng ta cần làm là:

```js
AuthController.checkAuth();
```

Tất nhiên, với OLOO, nếu bạn cần tạo một hoặc nhiều object bổ sung trong delegation chain, điều đó thật dễ dàng và vẫn không yêu cầu bất kỳ thứ gì như khởi tạo class:

```js
var controller1 = Object.create( AuthController );
var controller2 = Object.create( AuthController );
```

Với behavior delegation, `AuthController` và `LoginController` là **chỉ là object**, *ngang hàng* với nhau và không được sắp xếp hoặc liên quan với tư cách là cha và con con trong class-oriention. Chúng ta hơi tùy tiện chọn để `AuthController` ủy quyền cho `LoginController` -- việc ủy quyền đi theo hướng ngược lại cũng hợp lệ như vậy.

Điểm nổi bật chính của danh sách mã thứ hai này là chúng ta chỉ có hai thực thể (`LoginController` và `AuthController`), **không phải ba** như trước đây.

Chúng ta không cần một base `Controller` class  để "chia sẻ" hành vi giữa hai class, bởi vì ủy quyền là một cơ chế đủ mạnh để cung cấp cho chúng ta chức năng mà chúng ta cần. Như đã lưu ý trước đây, chúng ta cũng không cần khởi tạo các class của mình để làm việc với chúng, bởi vì không có class nào, **chỉ có chính các object.** Hơn nữa, không cần *composition* khi ủy quyền cho hai object khả năng hợp tác *khác biệt* khi cần thiết.

Cuối cùng, chúng ta đã tránh được những cạm bẫy về tính đa hình của thiết kế class-oriented bằng cách không đặt tên `success(..)` và `failure(..)` giống nhau trên cả hai object, điều này sẽ yêu cầu giả đa hình rõ ràng xấu xí. Thay vào đó, chúng ta gọi chúng là `accepted()` và `rejected(..)` trên `AuthController` -- tên mang tính mô tả hơn một chút cho các tác vụ cụ thể của chúng.

**Điểm mấu chốt**: chúng ta có cùng khả năng, nhưng thiết kế (đáng kể) đơn giản hơn. Đó là sức mạnh của mã kiểu OLOO và sức mạnh của mẫu thiết kế *behavior delegation*.

## Nicer Syntax

Một trong những điều thú vị hơn khiến `class` của ES6 trở nên hấp dẫn một cách dễ hiểu (xem Phụ lục A về lý do tại sao nên tránh nó!) là cú pháp ngắn gọn để khai báo các phương thức class:

```js
class Foo {
	methodName() { /* .. */ }
}
```

Chúng ta có thể bỏ từ `function` khỏi phần khai báo, điều này khiến các nhà phát triển JS ở khắp mọi nơi vui mừng!

Và bạn có thể đã nhận thấy và thất vọng rằng cú pháp OLOO được đề xuất ở trên có rất nhiều kiểu dáng của `function`, điều này có vẻ hơi làm giảm mục tiêu đơn giản hóa OLOO. **Nhưng không nhất thiết phải như vậy!**

Kể từ ES6, chúng ta có thể sử dụng *concise method declarations (khai báo phương thức ngắn gọn)* trong bất kỳ object theo nghĩa đen nào, do đó, một object theo kiểu OLOO có thể được khai báo theo cách này (cùng một cách ngắn gọn như với cú pháp nội dung `class`):

```js
var LoginController = {
	errors: [],
	getUser() { // Look ma, no `function`!
		// ...
	},
	getPassword() {
		// ...
	}
	// ...
};
```

Về sự khác biệt duy nhất là các ký tự đối tượng sẽ vẫn yêu cầu dấu phân cách dấu phẩy `,` giữa các phần tử trong khi cú pháp `class` thì không. Sự nhượng bộ khá nhỏ trong toàn bộ kế hoạch của mọi thứ.

Ngoài ra, kể từ ES6, cú pháp phức tạp hơn mà bạn sử dụng (như đối với định nghĩa `AuthController`), trong đó bạn gán các thuộc tính riêng lẻ và không sử dụng object literal, có thể được viết lại bằng object literal (để bạn có thể sử dụng concise method), và bạn chỉ có thể sửa đổi `[[Prototype]]` của object đó bằng `Object.setPrototypeOf(..)`, như sau:

```js
// use nicer object literal syntax w/ concise methods!
var AuthController = {
	errors: [],
	checkAuth() {
		// ...
	},
	server(url,data) {
		// ...
	}
	// ...
};

// NOW, link `AuthController` to delegate to `LoginController`
Object.setPrototypeOf( AuthController, LoginController );
```

Kiểu OLOO kể từ ES6, với các phương thức ngắn gọn, **thân thiện hơn rất nhiều** so với trước đây (và thậm chí sau đó, nó đơn giản và đẹp hơn nhiều so với mã kiểu nguyên mẫu cổ điển). **Bạn không cần phải chọn class** (độ phức tạp) để có được cú pháp object sạch đẹp!

### Unlexical

*Có* một nhược điểm đối với concise method, tuy tinh tế nhưng quan trọng cần lưu ý. Hãy xem xét mã này:

```js
var Foo = {
	bar() { /*..*/ },
	baz: function baz() { /*..*/ }
};
```

Đây là cách syntactic de-sugaring thể hiện cách code đó sẽ hoạt động:

```js
var Foo = {
	bar: function() { /*..*/ },
	baz: function baz() { /*..*/ }
};
```

Thấy sự khác biệt? Từ viết tắt `bar()` đã trở thành một *biểu thức hàm ẩn danh* (`function()..`) được gắn vào thuộc tính `bar`, vì bản thân đối tượng hàm không có định danh tên. So sánh điều đó với *biểu thức hàm được đặt tên* (`hàm baz()..`) được chỉ định thủ công có định danh tên từ vựng `baz` ngoài việc được đính kèm với thuộc tính `.baz`.

Vậy thì sao? Trong cuốn *"Scope & Closures"* của bộ sách *"You Don't Know JS"* này, chúng ta đề cập chi tiết ba nhược điểm chính của *anonymous function expression*. Chúng ta sẽ chỉ lặp lại chúng một cách ngắn gọn để chúng ta có thể so sánh với phương pháp viết tắt ngắn gọn.

Thiếu định danh `tên` trên một function ẩn danh:

1. làm cho việc debugging stack traces khó khăn hơn
2. làm cho việc tự tham chiếu (recursion, event (un)binding, etc) khó khăn hơn
3. làm code (một chút) khó hiểu hơn

Mục 1 và 3 không áp dụng cho các concise method.

Mặc dù việc de-sugaring sử dụng một *anonymous function expression* mà thông thường sẽ không có `tên` trong stack trace, các phương thức ngắn gọn được chỉ định để đặt thuộc tính `tên` bên trong của đối tượng hàm một cách phù hợp, do đó, stack trace sẽ có thể sử dụng nó (mặc dù điều đó phụ thuộc vào việc triển khai nên không được đảm bảo).

Thật không may, Mục 2 **vẫn là một nhược điểm đối với các concise method**. Họ sẽ không có lexical identifier để sử dụng làm tham chiếu riêng. Xem xét:

```js
var Foo = {
	bar: function(x) {
		if (x < 10) {
			return Foo.bar( x * 2 );
		}
		return x;
	},
	baz: function baz(x) {
		if (x < 10) {
			return baz( x * 2 );
		}
		return x;
	}
};
```

Loại tham chiếu thủ công `Foo.bar(x*2)` ở trên là đủ trong ví dụ này, nhưng có nhiều trường hợp một function không nhất thiết phải làm được điều đó, chẳng hạn như các trường hợp function đang được chia sẻ trong ủy quyền trên các object khác nhau, sử dụng liên kết `this`, v.v. Bạn sẽ muốn sử dụng một tham chiếu tự thực sự và mã định danh `name` của đối tượng hàm là cách tốt nhất để thực hiện điều đó.

Chỉ cần lưu ý về cảnh báo này đối với các concise method và nếu bạn gặp phải các vấn đề như vậy do thiếu tự tham chiếu, hãy đảm bảo bỏ qua cú pháp concise method **chỉ dành cho khai báo đó** để sử dụng *function expression* được đặt tên thủ công: `baz: function baz(){..}`.

## Introspection (Nội quan)

Nếu bạn đã dành nhiều thời gian với lập trình class oriented (bằng JS hoặc các ngôn ngữ khác), thì có lẽ bạn đã quen thuộc với *type introspection*: kiểm tra một instance để tìm ra *kiểu* object đó là gì. Mục tiêu chính của *type introspection* với các instance của class là suy luận về cấu trúc/khả năng của object dựa trên *cách nó được tạo ra*.

Hãy xem đoạn code này sử dụng `instanceof` (xem Chương 5) để xem xét nội quan object `a1` để suy ra khả năng của nó:

```js
function Foo() {
	// ...
}
Foo.prototype.something = function(){
	// ...
}

var a1 = new Foo();

// later

if (a1 instanceof Foo) {
	a1.something();
}
```

Bởi vì `Foo.prototype` (không phải `Foo`!) nằm trong chuỗi `[[Prototype]]` (xem Chương 5) của `a1`, toán tử `instanceof` (một cách khó hiểu) giả vờ cho chúng ta biết rằng `a1` là một instance của "class" `Foo`. Với kiến thức này, sau đó chúng ta giả định rằng `a1` có các khả năng được mô tả bởi "class" `Foo`.

Tất nhiên, không có class `Foo`, chỉ có một function bình thường đơn giản `Foo`, có tham chiếu đến một object tùy ý (`Foo.prototype`) mà `a1` tình cờ được liên kết đến. Theo cú pháp của nó, `instanceof` giả vờ kiểm tra mối quan hệ giữa `a1` và `Foo`, nhưng nó thực sự cho chúng ta biết liệu `a1` và (đối tượng tùy ý được tham chiếu bởi) `Foo.prototype` có liên quan hay không.

Sự nhầm lẫn ngữ nghĩa (và không ngay thẳng) của cú pháp `instanceof` có nghĩa là để sử dụng introspection(nội quan) dựa trên `instanceof` để hỏi xem object `a1` có liên quan đến đối tượng khả năng được đề cập hay không, bạn *phải* có một hàm chứa tham chiếu đối tượng đó -- bạn không thể hỏi trực tiếp xem hai đối tượng có liên quan với nhau hay không.

Nhớ lại ví dụ trừu tượng `Foo` / `Bar` / `b1` ở đầu chương này, mà chúng ta sẽ viết tắt ở đây:

```js
function Foo() { /* .. */ }
Foo.prototype...

function Bar() { /* .. */ }
Bar.prototype = Object.create( Foo.prototype );

var b1 = new Bar( "b1" );
```

Đối với các mục đích *type introspection (xem xét nội quan kiểu)* trên các thực thể trong ví dụ đó, bằng cách sử dụng ngữ nghĩa `instanceof` và `.prototype`, đây là các bước kiểm tra khác nhau mà bạn có thể cần thực hiện:

```js
// relating `Foo` and `Bar` to each other
Bar.prototype instanceof Foo; // true
Object.getPrototypeOf( Bar.prototype ) === Foo.prototype; // true
Foo.prototype.isPrototypeOf( Bar.prototype ); // true

// relating `b1` to both `Foo` and `Bar`
b1 instanceof Foo; // true
b1 instanceof Bar; // true
Object.getPrototypeOf( b1 ) === Bar.prototype; // true
Foo.prototype.isPrototypeOf( b1 ); // true
Bar.prototype.isPrototypeOf( b1 ); // true
```

Thật công bằng khi nói rằng một số điều đó hơi tệ. Chẳng hạn, theo trực giác (với các class), bạn có thể muốn nói điều gì đó như `Bar instanceof Foo` (vì rất dễ nhầm lẫn "instance" nghĩa là gì khi nghĩ rằng nó bao gồm "inheritance(kế thừa)"), nhưng đó không phải là một phép so sánh hợp lý trong JS. Thay vào đó, bạn phải thực hiện `Bar.prototype instanceof Foo`.

Một mẫu phổ biến khác, nhưng có lẽ kém mạnh mẽ hơn, dành cho *type introspection*, mà nhiều nhà phát triển có vẻ thích hơn `instanceof`, được gọi là "duck typing". Thuật ngữ này xuất phát từ câu ngạn ngữ, "nếu nó trông giống một con vịt và kêu quạc quạc như một con vịt, thì đó nhất định là một con vịt".

Ví dụ:

```js
if (a1.something) {
	a1.something();
}
```

Thay vì kiểm tra mối quan hệ giữa `a1` và một object nắm giữ hàm `something()` có thể ủy quyền, chúng ta giả sử rằng kiểm tra cho `a1.something` đi qua có nghĩa là `a1` có khả năng gọi `.something() ` (bất kể nó tìm thấy phương thức trực tiếp trên `a1` hay được ủy quyền cho một số đối tượng khác). Tự nó, giả định đó không quá rủi ro.

Nhưng "duck typing" thường được mở rộng để đưa ra **các giả định khác về khả năng của object** bên cạnh những gì đang được thử nghiệm, điều này tất nhiên sẽ gây ra nhiều rủi ro hơn (hay còn gọi là thiết kế dễ vỡ) vào thử nghiệm.

Một ví dụ đáng chú ý về "duck typing" đi kèm với Promise ES6 (như một ghi chú trước đó đã giải thích sẽ không được đề cập trong cuốn sách này).

Vì nhiều lý do, cần phải xác định xem có bất kỳ tham chiếu đối tượng tùy ý nào *có phải là một Promise* hay không, nhưng cách kiểm tra được thực hiện là kiểm tra xem object có hàm `then()` trên đó hay không. Nói cách khác, **nếu bất kỳ đối tượng** nào có phương thức `then()`, thì ES6 Promises sẽ giả định vô điều kiện rằng đối tượng **là một đối tượng "có thể sử dụng được"** và do đó sẽ mong đợi đối tượng đó hoạt động tuân theo tất cả các tiêu chuẩn. hành vi của Promises.

Nếu bạn có bất kỳ object không phải Promise nào xảy ra vì bất kỳ lý do gì để có phương thức `then()` trên đó, bạn nên giữ nó cách xa cơ chế Promise của ES6 để tránh các giả định bị phá vỡ.

Ví dụ đó minh họa rõ ràng sự nguy hiểm của "duck typing". Bạn chỉ nên sử dụng các phương pháp như vậy một cách tiết kiệm và trong các điều kiện được kiểm soát.

Một lần nữa, chuyển sự chú ý của chúng ta trở lại code kiểu OLOO như được trình bày ở đây trong chương này, *type introspection* hóa ra lại rõ ràng hơn nhiều. Hãy nhớ lại (và viết tắt) ví dụ `Foo` / `Bar` / `b1` OLOO ở đầu chương:

```js
var Foo = { /* .. */ };

var Bar = Object.create( Foo );
Bar...

var b1 = Object.create( Bar );
```

Sử dụng cách tiếp cận OLOO này, trong đó tất cả những gì chúng ta có là các object đơn giản có liên quan thông qua ủy quyền `[[Prototype]]`, đây là cách *type introspection* khá đơn giản hóa mà chúng ta có thể sử dụng:

```js
// relating `Foo` and `Bar` to each other
Foo.isPrototypeOf( Bar ); // true
Object.getPrototypeOf( Bar ) === Foo; // true

// relating `b1` to both `Foo` and `Bar`
Foo.isPrototypeOf( b1 ); // true
Bar.isPrototypeOf( b1 ); // true
Object.getPrototypeOf( b1 ) === Bar; // true
```

Chúng ta không sử dụng `instanceof` nữa, bởi vì nó giả vờ có liên quan đến các class một cách khó hiểu. Bây giờ, chúng ta chỉ hỏi câu hỏi (được nêu không chính thức), "bạn có phải *là* prototype của tôi không?" Không cần thêm sự gián tiếp nào với những nội dung như `Foo.prototype` hoặc dài dòng một cách đau đớn `Foo.prototype.isPrototypeOf(..)`.

Tôi nghĩ thật công bằng khi nói rằng những kiểm tra này ít phức tạp/khó hiểu hơn đáng kể so với các kiểm tra nội quan trước đây. **Một lần nữa, chúng ta thấy rằng OLOO đơn giản hơn (nhưng có cùng sức mạnh của) class-style coding trong JavaScript.**

## Review (TL;DR)

Class và inheritance là một design pattern mà bạn có thể *chọn* hoặc *không chọn* trong kiến trúc phần mềm của mình. Hầu hết các nhà phát triển đều cho rằng các class là cách duy nhất (phù hợp) để tổ chức code, nhưng ở đây chúng ta đã thấy có một pattern khác ít được nói đến hơn nhưng lại thực sự khá hiệu quả: **behavior delegation**.

Behavior delegation đề xuất các object là đồng đẳng của nhau, ủy quyền cho nhau, thay vì các mối quan hệ của class cha và class con. Cơ chế `[[Prototype]]` của JavaScript, theo bản chất rất được thiết kế của nó, là một cơ chế ủy quyền hành vi. Điều đó có nghĩa là chúng ta có thể chọn đấu tranh để triển khai cơ chế lớp trên JS (xem Chương 4 và 5) hoặc chúng ta có thể chỉ sử dụng trạng thái tự nhiên của `[[Prototype]]` làm cơ chế ủy quyền.

Khi bạn thiết kế code chỉ với các object, nó không chỉ đơn giản hóa cú pháp bạn sử dụng mà còn thực sự có thể dẫn đến thiết kế kiến trúc code đơn giản hơn.

**OLOO** (objects-linked-to-other-objects) là một code style tạo và liên kết trực tiếp các object mà không có sự trừu tượng hóa của các class. OLOO triển khai khá tự nhiên behavior delegation dựa trên `[[Prototype]]`.
