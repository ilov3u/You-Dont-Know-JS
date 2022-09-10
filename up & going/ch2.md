# You Don't Know JS: Up & Going
# Chapter 2: Tìm hiểu JavaScript

Trong chương trước, tôi đã giới thiệu các khối lệnh cơ bản của lập trình, chẳng hạn như các biến, vòng lặp, điều kiện, và hàm. Tất nhiên, tất cả các mã đều được trình bày bằng ngôn ngữ Javascript. Tuy nhiên trong chương này, chúng tôi muốn tập trung đặc biệt vào những điều bạn cần biết về JavaScript để bắt đầu và trở thành một nhà phát triển Javascript.

Chúng tôi sẽ giới thiệu khá nhiều khái niệm trong chương này mà sẽ được khám phá đầy đủ trong các cuốn sách *YDKJS* tiếp theo. Bạn có thể coi chương này như một tổng quan về các chủ đề được đề cập chi tiết trong suốt phần còn lại của bộ sách này.

Đặc biệt nếu bạn là người mới làm quen với JavaScript, bạn nên dành khá nhiều thời gian để xem lại các khái niệm và ví dụ code ở đây nhiều lần. Bất kỳ nền tảng tốt nào đều được đặt từng viên gạch, vì vậy đừng mong đợi rằng bạn sẽ hiểu ngay lập tức tất cả những gì bạn trải qua lần đầu tiên.

Hành trình tìm hiểu sâu về JavaScript của bạn bắt đầu từ đây.

**Ghi chú:** Như tôi đã nói ở Chương 1, bạn chắc chắn nên tự mình thử tất cả mã này khi bạn đọc và làm việc qua chương này. Lưu ý rằng một số code ở đây giả định có được giới thiệu trong phiên bản JavaScript mới nhất tại thời điểm viết bài này (thường được gọi là "ES6" cho phiên bản thứ 6 của ECMAScript -- tên chính thức của đặc tả JS). Nếu bạn tình cờ sử dụng một trình duyệt cũ, trình duyệt chưa hỗ trợ ES6, code có thể không hoạt động. Nên sử dụng bản cập nhật gần đây của trình duyệt hiện đại (như Chrome, Firefox hoặc IE).

## Values & Types(Giá trị và kiểu)

Như chúng tôi đã khẳng định trong Chương 1, JavaScript có các kiểu giá trị chứ không phải kiểu biến. Có sẵn các loại tích hợp sau:

* `string`
* `number`
* `boolean`
* `null` and `undefined`
* `object`
* `symbol` (mới từ ES6)

JavaScript cung cấp toán tử `typeof` có thể kiểm tra một giá trị và cho bạn biết nó là loại gì:

```js
var a;
typeof a;				// "undefined"

a = "hello world";
typeof a;				// "string"

a = 42;
typeof a;				// "number"

a = true;
typeof a;				// "boolean"

a = null;
typeof a;				// "object" -- weird, bug

a = undefined;
typeof a;				// "undefined"

a = { b: "c" };
typeof a;				// "object"
```

Giá trị trả về từ toán tử `typeof` luôn là một trong sáu (bảy tính đến ES6! - kiểu "symbol") giá trị chuỗi. Đó là, `typeof "abc"` trả về `"string"`, không phải `string`.

Lưu ý rằng trong đoạn mã này, biến `a` chứa mọi loại giá trị khác nhau như thế nào và điều đó mặc dù xuất hiện, `typeof a` không yêu cầu "kiểu của `a`", thay vào đó là "kiểu của giá trị được lưu ở `a`." Chỉ các giá trị có loại trong JavaScript; các biến chỉ là các vùng chứa đơn giản cho các giá trị đó.

`typeof null` là một trường hợp thú vị, bởi vì nó trả lại một cách sai lầm `"object"`, khi bạn mong đợi nó trả về `"null"`.

**Cảnh báo:** Đây là một lỗi lâu đời trong JS, nhưng một lỗi có thể sẽ không bao giờ được sửa. Quá nhiều code trên Web dựa vào lỗi đó và do đó việc sửa nó sẽ gây ra nhiều lỗi hơn!

Cũng thế, với `a = undefined`. Chúng ta đang thiết lập một cách rõ ràng `a` có giá trị `undefined`, nhưng điều đó về mặt biểu hiện không khác gì một biến chưa được đặt giá trị, giống như dòng `var a;` ở đầu đoạn mã. Một biến có thể đạt được trạng thái giá trị "undefined" này theo một số cách khác nhau, bao gồm các hàm không trả về giá trị và sử dụng toán tử `void`.

### Objects(Đối tượng)

Kiểu `object` đề cập đến một giá trị phức hợp trong đó bạn có thể đặt các thuộc tính (vị trí được đặt tên) mà mỗi thuộc tính giữ các giá trị riêng của chúng thuộc bất kỳ kiểu nào. Đây có lẽ là một trong những kiểu giá trị hữu ích nhất trong tất cả JavaScript.

```js
var obj = {
	a: "hello world",
	b: 42,
	c: true
};

obj.a;		// "hello world"
obj.b;		// 42
obj.c;		// true

obj["a"];	// "hello world"
obj["b"];	// 42
obj["c"];	// true
```

Có thể hữu ích khi nghĩ về giá trị `obj` này một cách trực quan:

<img src="fig4.png">

Các thuộc tính có thể được truy cập bằng  *ký hiệu dấu chấm* (vd., `obj.a`) hoặc *ký hiệu dấu ngoặc* (vd., `obj["a"]`). Ký hiệu dấu chấm ngắn hơn và thường dễ đọc hơn, do đó được ưu tiên hơn khi có thể.

Ký hiệu dấu ngoặc hữu ích nếu bạn có tên thuộc tính có các ký tự đặc biệt trong đó, giống như `obj["hello world!"]` -- các thuộc tính như vậy thường được gọi là *keys(khóa)* khi được truy cập thông qua ký hiệu dấu ngoặc. Kí hiệu `[ ]` yêu cầu một biến (được giải thích sau) hoặc một `string` *literal* (cần được bao bao trong `" .. "` hoặc `' .. '`).

Tất nhiên, ký hiệu dấu ngoặc cũng hữu ích nếu bạn muốn truy cập thuộc tính/khóa nhưng tên được lưu trữ trong một biến khác, chẳng hạn như:

```js
var obj = {
	a: "hello world",
	b: 42
};

var b = "a";

obj[b];			// "hello world"
obj["b"];		// 42
```

**Ghi chú:** Thêm thông tin về JavaScript `object`, xem trong cuốn *this & Object Prototypes* của bộ sách này, đặc biệt là Chương 3.

Có một số loại giá trị khác mà bạn sẽ thường tương tác trong các chương trình JavaScript: *array* và *function*. Nhưng thay vì là các kiểu tích hợp phù hợp, chúng nên được coi giống như kiểu con hơn - các phiên bản chuyên biệt của kiểu `object`.

#### Arrays(Mảng)

Mảng là một `object` chứa các giá trị (thuộc bất kỳ loại nào) không được gán trong các thuộc tính/khóa được đặt tên, mà là ở các vị trí được lập chỉ mục số. Cho ví dụ:

```js
var arr = [
	"hello world",
	42,
	true
];

arr[0];			// "hello world"
arr[1];			// 42
arr[2];			// true
arr.length;		// 3

typeof arr;		// "object"
```

**Ghi chú:** Nhiều ngôn ngữ đếm bắt đầu từ số 0, giống như JS làm, sử dụng `0` như phần tử đầu tiên trong danh sách.

Có thể hữu ích khi nghĩ về `arr` một cách trực quan:

<img src="fig5.png">

Vì mảng là các đối tượng đặc biệt (như ngụ ý của `typeof`), chúng cũng có thể có các thuộc tính, bao gồm cả thuộc tính `length` được cập nhật tự động.

Về mặt lý thuyết, bạn có thể sử dụng một mảng như một đối tượng bình thường với các thuộc tính được đặt tên của riêng bạn hoặc bạn có thể sử dụng một `object` nhưng chỉ cung cấp cho nó các thuộc tính số (`0`, `1`, v.v.) tương tự như một mảng. Tuy nhiên, điều này thường được coi là sử dụng không đúng các loại tương ứng.

Cách tiếp cận tốt nhất và tự nhiên nhất là sử dụng mảng cho các giá trị được định vị bằng số và sử dụng `object` cho các thuộc tính được đặt tên.

#### Functions(Hàm)

Loại `object` phụ khác mà bạn sẽ sử dụng trên tất cả các chương trình JS của mình là một hàm:

```js
function foo() {
	return 42;
}

foo.bar = "hello world";

typeof foo;			// "function"
typeof foo();		// "number"
typeof foo.bar;		// "string"
```

Một lần nữa, các hàm(functions) là một loại phụ của `objects` -- `typeof` trả về `"function"`, điều đó ngụ ý rằng một `function` là một kiểu chính -- và do đó có thể có các thuộc tính, nhưng bạn thường sẽ chỉ sử dụng các thuộc tính đối tượng hàm (giống như `foo.bar`) trong một số trường hợp giới hạn.

**Ghi chú:** Để biết thêm thông tin về các giá trị JS và kiểu của chúng, hãy xem hai chương đầu tiên của cuốn *Types & Grammar* trong bộ sách này.

### Built-In Type Methods(Những Kiểu Phương Thức Tích Hợp)

Các kiểu và kiểu con tích hợp mà chúng ta vừa thảo luận có các hành vi được hiển thị dưới dạng các thuộc tính và phương thức khá mạnh mẽ và hữu ích.

Cho ví dụ:

```js
var a = "hello world";
var b = 3.14159;

a.length;				// 11
a.toUpperCase();		// "HELLO WORLD"
b.toFixed(4);			// "3.1416"
```

"Làm thế nào" đằng sau việc có thể gọi `a.toUpperCase()` phức tạp hơn là chỉ phương pháp đó tồn tại trên giá trị.

Tóm tắt, có một biểu mẫu bao bọc đối tượng `String` (viết hoa` S`), thường được gọi là "native(gốc)," cặp với kiểu `string` nguyên thủy; chính là trình bao bọc đối tượng này sẽ xác định phương thức `toUpperCase ()` trên prototype(nguyên mẫu) của nó.

Khi bạn sử dụng một giá trị nguyên thủy như `"hello world"` như một `object` bằng cách tham chiếu một thuộc tính hoặc phương thức (vd, `a.toUpperCase()` trong đoạn code minh hoạ bên trên), JS tự động "đóng hộp" giá trị cho phần đối ứng của trình bao bọc đối tượng của nó (ẩn bên dưới).

Một giá trị `string` có thể được bao bọc bởi một đối tượng  `String`, một `number` có thể được bao bọc bởi một đối tượng `Number`, và một giá trị `boolean` có thể được bao bởi một đối tượng `Boolean`. For the most part, you don't need to worry about or directly use these object wrapper forms of the values -- prefer the primitive value forms in practically all cases and JavaScript will take care of the rest for you.

**Ghi chú:** Để thêm thông tin về JS natives và "boxing," xem Chương 3 của cuốn *Types & Grammar* trong bộ sách này. Để hiểu rõ hơn về nguyên mẫu(prototype) của một đối tượng, xem Chương 5 của cuốn *this & Object Prototypes* trong bộ sách này.

### So Sánh Giá Trị

Có hai kiểu so sánh giá trị chính mà bạn sẽ cần thực hiện trong các chương trình JS của mình: *equality(so sánh bằng)* và *inequality(so sánh khác)*. Kết quả của bất kỳ so sánh nào là một giá trị `boolean` (`true` hoặc `false`), bất kể loại giá trị nào được so sánh.

#### Coercion(Ép kiểu)

Chúng ta đã nói sơ qua về ép kiểu trong Chương 1, nhưng chúng ta hãy xem lại nó ở đây.

Sự ép kiểu có hai dạng trong JavaScript: *explicit(tường minh)* và *implicit(ngầm định)*. Sự ép kiểu tường minh chỉ đơn giản là bạn có thể thấy rõ ràng từ mã rằng chuyển đổi từ loại này sang loại khác sẽ xảy ra, trong khi ép kiểu ngầm định là khi chuyển đổi kiểu có thể xảy ra như một tác dụng phụ không rõ ràng của một số hoạt động khác.

Bạn có thể đã từng nghe những cảm nghĩ như "ép kiểu là xấu" được rút ra từ thực tế rằng rõ ràng có những nơi mà việc ép kiểu có thể tạo ra một số kết quả đáng ngạc nhiên. Có lẽ không có gì gợi lên sự thất vọng từ các nhà phát triển hơn là khi ngôn ngữ làm họ ngạc nhiên.

Ép kiểu không phải là điều xấu xa, cũng không phải là điều đáng ngạc nhiên. Trong thực tế, phần lớn các trường hợp bạn có thể xây dựng với kiểu ép kiểu là khá hợp lý và dễ hiểu, và thậm chí có thể được sử dụng để *cải thiện* khả năng đọc code của bạn. Nhưng chúng ta sẽ không đi sâu hơn vào cuộc tranh luận đó -- Chương 4 của cuốn *Types & Grammar* trong bộ sách này đề cập đến các khía cạnh.

Đây là ví dụ của ép kiểu  *explicit(tường minh)*:

```js
var a = "42";

var b = Number( a );

a;				// "42"
b;				// 42 -- the number!
```

Và đây là ví dụ của ép kiểu *implicit(ngầm định)*:

```js
var a = "42";

var b = a * 1;	// "42" implicitly coerced to 42 here

a;				// "42"
b;				// 42 -- the number!
```

#### Truthy & Falsy

Trong Chương 1, chúng ta đã đề cập ngắn gọn tới tính chất của các giá trị "truthy" và "falsy": khi một giá trị non-`boolean` được ép kiểu về `boolean`, nó trở thành `true` hoặc `false`, tương ứng?

Danh sách cụ thể của những giá trị "falsy" trong JavaScript là:

* `""` (chuỗi rỗng)
* `0`, `-0`, `NaN` (`number` không hợp lệ)
* `null`, `undefined`
* `false`

Bất kì giá trị nào không thuộc về danh sách "falsy" này là "truthy." Đây là một số mình hoạ của những giá trị "truthy":

* `"hello"`
* `42`
* `true`
* `[ ]`, `[ 1, "2", 3 ]` (arrays)
* `{ }`, `{ a: 42 }` (objects)
* `function foo() { .. }` (functions)

Điều quan trọng cần nhớ là giá trị non-`boolean` chỉ tuân theo sự ép kiểu "truthy"/"falsy" nếu nó thực sự bị ép kiểu thành `boolean`.

#### Equality(So Sánh)

Có bốn toán tử so sánh: `==`, `===`, `!=`, và `!==`. Các dạng `!` Tất nhiên là các phiên bản đối "không bằng nhau" của các đối của chúng; *non-equality* không nên nhầm lẫn với *inequality*.

Sự khác biệt giữa `==` và `===` thường được đặc trưng rằng `==` kiểm tra so sánh giá trị và `===` kiểm tra so sánh cả giá trị và kiểu. Tuy nhiên, điều này là không chính xác. Cách thích hợp để mô tả chúng là `==` kiểm tra so sánh giá trị với sự ép kiểu được phép, và `===` kiểm tra so sánh về giá trị mà không cho phép ép kiểu; `===` thường được gọi là "so sánh nghiêm ngặt" vì lý do này.

Xem xét sự ép kiểu ngầm được cho phép bởi `==` loose-equality(so sánh lỏng lẻo) và không với  `===` strict-equality(so sánh nghiêm ngặt):

```js
var a = "42";
var b = 42;

a == b;			// true
a === b;		// false
```

Trong so sánh này `a == b`, JS nhận thấy rằng các kiểu không khớp nhau, vì vậy nó trải qua một loạt các bước có thứ tự để ép kiểu một hoặc cả hai giá trị sang một kiểu khác cho đến khi các kiểu khớp với nhau, khi đó một giá trị so sánh đơn giản có thể được kiểm tra.

Nếu bạn nghĩ về nó, có hai cách khả thi để `a == b` có thể trả về giá trị `true` thông qua ép kiểu. Hoặc sự so sánh có thể kết thúc là `42 == 42` hoặc nó nó có thể là `"42" == "42"`. Vậy nó là cái nào?

Câu trả lời: `"42"` trở thành `42`, để làm phép so sánh `42 == 42`. Trong một ví dụ đơn giản như vậy, nó dường như không thực sự quan trọng quá trình đó diễn ra theo cách nào, vì kết quả cuối cùng là giống nhau. Có nhiều trường hợp phức tạp hơn mà vấn đề không chỉ là kết quả cuối cùng của phép so sánh, mà là *cách nào* bạn lấy được kết quả cuối cùng.

Câu lệnh `a === b` trả về `false`, bởi vì sự ép kiểu không được phép, do đó việc so sánh giữa hai giá trị đơn giản là thất bại. Nhiều nhà phát triển cảm thấy rằng so sánh `===` thì dễ dự đoán kết quả hơn, vì vậy họ chủ trương luôn sử dụng hình thức đó và tránh xa cách so sánh `==`. Tôi nghĩ rằng quan điểm này là rất thiển cận. Tôi tin rằng so sánh `==` là một công cụ mạnh mẽ hỗ trợ cho chương trình của bạn, *Nếu như bạn dành thời gian để học xem nó hoạt động như thế nào.*

Chúng tôi sẽ không trình bày tất cả các chi tiết thực tế về cách hoạt động của việc ép kiểu trong các so sánh `==` ở đây. Phần lớn trong số đó là khá hợp lý, nhưng có một số trường hợp khía cạnh quan trọng cần cẩn thận. Bạn có thể đọc phần 11.9.3 của đặc tả ES5 (http://www.ecma-international.org/ecma-262/5.1/) để xem các quy tắc chính xác và bạn sẽ ngạc nhiên về mức độ đơn giản của cơ chế này, so với tất cả những lời thổi phồng tiêu cực xung quanh nó.

Để tóm tắt rất nhiều chi tiết thành một vài điều đơn giản và giúp bạn biết nên sử dụng `==` hay `===` trong các tình huống khác nhau, đây là các quy tắc đơn giản của tôi:

* Nếu một trong hai giá trị (còn gọi là bên) trong phép so sánh có thể là giá trị `true` hoặc` false`, hãy tránh `==` và sử dụng `===`.
* Nếu một trong hai giá trị trong phép so sánh có thể là một trong các giá trị cụ thể này (`0`,`""` hoặc `[]`- mảng rỗng, hãy tránh `==` và sử dụng `===`.
* Trong *tất cả* các trường hợp khác, bạn có thể yên tâm sử dụng `==`. Nó không chỉ an toàn mà trong nhiều trường hợp, nó đơn giản hóa mã của bạn theo cách cải thiện khả năng đọc.

Những quy tắc này đòi hỏi bạn phải suy nghĩ chín chắn về mã của mình và về những loại giá trị nào có thể đến thông qua các biến được so sánh. Nếu bạn có thể chắc chắn về các giá trị, và `==` là an toàn, sử dụng nó! Nếu bạn không thể chắc chắn về các giá trị, sử dụng `===`. Nó đơn giản mà.

So sánh `!=` là một cặp với `==`, và so sánh `!==` là cặp với `===`. Tất cả các quy tắc và quan sát mà chúng ta vừa thảo luận giữ đối xứng cho những so sánh không bình đẳng này.

Bạn nên lưu ý đặc biệt về quy tắc so sánh `==` và `===` nếu bạn đang so sánh hai giá trị không phải nguyên thủy, như `object` (bao gồm `function` và `array`). Bởi vì những giá trị đó thực sự được giữ bằng tham chiếu, cả hai phép so sánh `==` và `===` sẽ chỉ kiểm tra xem các tham chiếu có khớp nhau hay không, chứ không phải bất kỳ điều gì về các giá trị cơ bản.

Cho ví dụ, `array` được mặc định ép kiểu về `string` bằng cách nối các phần tử của mảng với nhau thông qua dấu (`,`) ở giữa. Bạn có thể nghĩ rằng hai `array` có cùng nội dung sẽ là `==` bằng nhau, nhưng chúng không:

```js
var a = [1,2,3];
var b = [1,2,3];
var c = "1,2,3";

a == c;		// true
b == c;		// true
a == b;		// false
```

**Lưu ý:** Để biết thêm thông tin về quy tắc so sánh đẳng thức `==`, hãy xem đặc tả ES5 (section 11.9.3) và cũng tham khảo Chương 4 của cuốn *Type & Grammar* của bộ sách này; xem Chương 2 để biết thêm thông tin về giá trị so với tham chiếu.

#### Inequality(So Sánh Không Bằng Nhau)

Các toán tử `<`, `>`, `<=`, và `>=` được sử dụng cho so sánh khác, được gọi trong đặc điểm kỹ thuật là "so sánh quan hệ." Thông thường, chúng sẽ được sử dụng với các giá trị có thể so sánh theo thứ tự như `number`. Có thể hiểu đơn giản rằng `3 < 4`.

Nhưng các giá trị `string` trong JavaScript cũng có thể được so sánh, bằng cách sử dụng các quy tắc bảng chữ cái điển hình (`"bar" < "foo"`).

Còn chuyện ép kiểu thì sao? Các quy tắc tương tự như so sánh `==` (mặc dù không hoàn toàn giống nhau!). Áp dụng cho các toán tử bất đẳng thức. Đáng chú ý, không có toán tử "strict inequality(bất bình đẳng nghiêm ngặt)" nào giống như kiểu so sánh bằng và không cho phép tự ép kiểu `===`.

Xem xét:

```js
var a = 41;
var b = "42";
var c = "43";

a < b;		// true
b < c;		// true
```

Chuyện gì xảy ra ở đây? Trong section 11.8.5 của đặc tả ES5, nó nói rằng nếu cả hai giá trị trong phép so sánh `<` là `string`, giống như với `b < c`, thì phép so sánh sẽ được thực hiện theo từ điển (hay còn gọi là theo thứ tự bảng chữ cái giống như một từ điển). Nhưng nếu một hoặc cả hai không phải là `string`, như với `a < b`, thì cả hai giá trị đều bị ép kiểu phải là `number` và xảy ra so sánh số điển hình.

Vấn đề lớn nhất mà bạn có thể gặp phải ở đây khi so sánh giữa các loại giá trị tiềm năng khác nhau - hãy nhớ rằng không có hình thức "strict inenquality(bất bình đẳng nghiêm ngặt)" để sử dụng - là khi một trong các giá trị không thể được biến thành số hợp lệ, chẳng hạn như:

```js
var a = 42;
var b = "foo";

a < b;		// false
a > b;		// false
a == b;		// false
```

Chờ đã, làm sao cả ba phép so sánh đó đều là `false` được? Bởi vì giá trị `b` đang bị ép buộc thành "giá trị số không hợp lệ(Not a number)" `NaN` trong phép so sánh `<` và `>` và thông số kỹ thuật cho biết rằng `NaN` không lớn hơn cũng không nhỏ hơn bất kỳ giá trị nào khác.

So sánh `==` không thành công vì một lý do khác. `a == b` có thể không thành công nếu nó được hiểu là `42 == NaN` hoặc `"42" == "foo"` - như chúng tôi đã giải thích trước đó, trường hợp trước là trường hợp xảy ra.

**Lưu ý:** Để biết thêm thông tin về các quy tắc so sánh bất đẳng thức, hãy xem phần 11.8.5 của đặc tả ES5 và cũng tham khảo Chương 4 của cuốn *Types & Grammar* của bộ sách này.

## Biến(Variables)

Trong JavaScript, tên biến (bao gồm cả tên hàm) phải là *mã định danh(identifiers)* hợp lệ. Các quy tắc nghiêm ngặt và đầy đủ cho các ký tự hợp lệ trong mã định danh hơi phức tạp khi bạn xem xét các ký tự phi truyền thống như Unicode. Tuy nhiên, nếu bạn chỉ xem xét các ký tự chữ và số ASCII điển hình, các quy tắc rất đơn giản.

Một mã định danh cần bắt đầu với `a`-`z`, `A`-`Z`, `$`, or `_`. Nó có thể chứa thêm các kí tự số `0`-`9`.

Nói chung, các quy tắc tương tự áp dụng cho tên thuộc tính cũng như cho một số nhận dạng biến. Tuy nhiên, một số từ nhất định không thể được sử dụng làm biến, nhưng có thể được dùng làm tên thuộc tính. Những từ này được gọi là "các từ dành riêng(reserved words)" và bao gồm các từ khóa JS (`for`,` in`, `if`, v.v.) cũng như` null`, `true` và` false`.

**Lưu ý:** Để biết thêm thông tin về các từ dành riêng, hãy xem Phụ lục A của cuốn *Types & Grammar* của bộ sách này.

### Function Scopes(Phạm Vi Hàm)

Bạn sử dụng từ khóa `var` để khai báo một biến sẽ thuộc phạm vi hàm hiện tại hoặc phạm vi toàn cục nếu ở cấp cao nhất bên ngoài bất kỳ hàm nào.

#### Hoisting

Bất cứ nơi nào một `var` xuất hiện bên trong một phạm vi, thì khai báo đó được coi là thuộc về toàn bộ phạm vi và có thể truy cập ở mọi nơi thông qua đó.

Nói một cách ẩn dụ, hành vi này được gọi là *hoisting*, khi một khai báo `var` về mặt khái niệm được "chuyển" lên đầu phạm vi bao quanh của nó. Về mặt kỹ thuật, quá trình này được giải thích chính xác hơn về cách mã được biên dịch, nhưng chúng ta có thể bỏ qua những chi tiết đó ngay bây giờ.

Xem xét:

```js
var a = 2;

foo();					// works because `foo()`
						// declaration is "hoisted"

function foo() {
	a = 3;

	console.log( a );	// 3

	var a;				// declaration is "hoisted"
						// to the top of `foo()`
}

console.log( a );	// 2
```

**Cảnh báo:** Việc dựa vào biến *hoisting* để sử dụng một biến sớm hơn trong phạm vi của nó là không phổ biến hay là ý kiến hay; nó có thể khá khó hiểu. Phổ biến hơn và được chấp nhận sử dụng là khai báo hàm *hoisted*, như chúng ta làm với lệnh gọi `foo ()` xuất hiện trước khai báo chính thức của nó.

#### Lồng Khối Lệnh(Nested Scopes)

Khi bạn khai báo một biến, nó có thể dùng ở bất kỳ đâu trong phạm vi đó, cũng như bất kỳ phạm vi nào bên dưới/bên trong. Ví dụ:

```js
function foo() {
	var a = 1;

	function bar() {
		var b = 2;

		function baz() {
			var c = 3;

			console.log( a, b, c );	// 1 2 3
		}

		baz();
		console.log( a, b );		// 1 2
	}

	bar();
	console.log( a );				// 1
}

foo();
```

Lưu ý rằng `c` không khả dụng bên trong` bar () `, bởi vì nó chỉ được khai báo bên trong phạm vi` baz () `bên trong và` b` không khả dụng cho `foo ()` vì lý do tương tự.

Nếu bạn cố gắng truy cập giá trị của một biến trong một phạm vi mà nó không có sẵn, bạn sẽ nhận được một `ReferenceError` được ném ra. Nếu bạn cố gắng đặt một biến chưa được khai báo, bạn sẽ kết thúc việc tạo một biến trong phạm vi toàn cầu cấp cao nhất (xấu!) Hoặc gặp lỗi, tùy thuộc vào "strict mode" (xem "Strict Mode"). Hãy cùng xem::

```js
function foo() {
	a = 1;	// `a` not formally declared
}

foo();
a;			// 1 -- oops, auto global variable :(
```

Đây là một cách thực hành rất tệ. Đừng làm điều đó! Luôn khai báo chính thức các biến của bạn.

Ngoài việc tạo khai báo cho các biến ở cấp hàm, ES6 *cho phép* bạn khai báo các biến thuộc các khối riêng lẻ (cặp `{..}`), bằng cách sử dụng từ khóa `let`. Bên cạnh một số chi tiết sắc thái, các quy tắc xác định phạm vi sẽ hoạt động gần giống như chúng ta vừa thấy với các hàm:

```js
function foo() {
	var a = 1;

	if (a >= 1) {
		let b = 2;

		while (b < 5) {
			let c = b * 2;
			b++;

			console.log( a + c );
		}
	}
}

foo();
// 5 7 9
```

Bởi vì sử dụng `let` thay vì `var`, `b` sẽ chỉ thuộc về khối lệnh `if` và do đó không phải thuộc về toàn bộ phạm vi hàm `foo()`. Tương tự như vậy, `c` chỉ thuộc về vòng lặp `while`. Phạm vi khối(block scope) rất hữu ích để quản lý phạm vi biến của bạn theo cách chi tiết hơn, điều này có thể giúp mã của bạn dễ bảo trì hơn nhiều theo thời gian.

**Lưu ý:** Để biết thêm thông tin về scope, hãy xem cuốn *Scope & Closures* của bộ sách này. Xem cuốn *ES6 & Beyond* của bộ sách này để biết thêm thông tin về block scope `let`.

## Conditionals

Ngoài câu lệnh `if` mà chúng tôi đã giới thiệu ngắn gọn trong Chương 1, JavaScript cung cấp một số cơ chế điều kiện khác mà chúng ta nên xem qua.

Đôi khi bạn có thể thấy mình đang viết một loạt câu lệnh `if..else..if` như thế này:

```js
if (a == 2) {
	// do something
}
else if (a == 10) {
	// do another thing
}
else if (a == 42) {
	// do yet another thing
}
else {
	// fallback to here
}
```

Cấu trúc này hoạt động, nhưng hơi dài dòng vì bạn cần chỉ định kiểm tra `a` cho từng trường hợp. Đây là một tùy chọn khác, câu lệnh `switch`:

```js
switch (a) {
	case 2:
		// do something
		break;
	case 10:
		// do another thing
		break;
	case 42:
		// do yet another thing
		break;
	default:
		// fallback to here
}
```

Dấu `break` rất quan trọng nếu bạn chỉ muốn (các) câu lệnh trong một `case` chạy. Nếu bạn bỏ qua `break` khỏi một `case` và `case` đó khớp hoặc chạy, thì việc thực thi sẽ tiếp tục với các câu lệnh tiếp theo của các `case` tiếp theo cho dù không khớp với điều kiện các `case` đó. Điều này được gọi là "rơi qua" đôi khi hữu ích/mong muốn:

```js
switch (a) {
	case 2:
	case 10:
		// some cool stuff
		break;
	case 42:
		// other stuff
		break;
	default:
		// fallback
}
```

Ở đây, nếu `a` là` 2` hoặc `10`, nó sẽ thực thi các câu lệnh mã "some cool stuff".

Một dạng khác của điều kiện trong JavaScript là "toán tử điều kiện", thường được gọi là "toán tử ba ngôi". Nó giống như một dạng ngắn gọn hơn của một câu lệnh `if..else`, chẳng hạn như:

```js
var a = 42;

var b = (a > 41) ? "hello" : "world";

// similar to:

// if (a > 41) {
//    b = "hello";
// }
// else {
//    b = "world";
// }
```

Nếu biểu thức kiểm tra (`a > 41` ở đây) cho kết quả là `true`, thì kết quả là (`"Hello"`), nếu không thì là mệnh đề thứ hai (`" thế giới "`) và cho dù kết quả là gì được gán cho `b`.

Toán tử điều kiện không nhất thiết phải được sử dụng trong một phép gán, nhưng đó chắc chắn là cách sử dụng phổ biến nhất.

**Lưu ý:** Để biết thêm thông tin về điều kiện thử nghiệm và các mẫu khác cho `switch` và `? : `, xem cuốn *Types & Grammar* của bộ sách này.

## Strict Mode

ES5 đã thêm một "chế độ nghiêm ngặt(strict mode)" vào ngôn ngữ, điều mà thắt chặt các quy tắc cho các hành vi nhất định. Nói chung, những hạn chế này được coi là giữ cho mã tuân theo một bộ nguyên tắc an toàn hơn và phù hợp hơn. Ngoài ra, việc tuân thủ chế độ nghiêm ngặt(strict mode) làm cho mã của bạn nói chung được công cụ tối ưu hóa hơn. Chế độ nghiêm ngặt(strict mode) là một chiến thắng lớn cho mã và bạn nên sử dụng nó cho tất cả các chương trình của mình.

Bạn có thể chọn áp dụng chế độ nghiêm ngặt cho một chức năng riêng lẻ hoặc toàn bộ file, tùy thuộc vào vị trí bạn đặt pragma chế độ nghiêm ngặt:

```js
function foo() {
	"use strict";

	// this code is strict mode

	function bar() {
		// this code is strict mode
	}
}

// this code is not strict mode
```

Compare that to:

```js
"use strict";

function foo() {
	// this code is strict mode

	function bar() {
		// this code is strict mode
	}
}

// this code is strict mode
```

One key difference (improvement!) with strict mode is disallowing the implicit auto-global variable declaration from omitting the `var`:

```js
function foo() {
	"use strict";	// turn on strict mode
	a = 1;			// `var` missing, ReferenceError
}

foo();
```

If you turn on strict mode in your code, and you get errors, or code starts behaving buggy, your temptation might be to avoid strict mode. But that instinct would be a bad idea to indulge. If strict mode causes issues in your program, almost certainly it's a sign that you have things in your program you should fix.

Not only will strict mode keep your code to a safer path, and not only will it make your code more optimizable, but it also represents the future direction of the language. It'd be easier on you to get used to strict mode now than to keep putting it off -- it'll only get harder to convert later!

**Note:** For more information about strict mode, see the Chapter 5 of the *Types & Grammar* title of this series.

## Functions As Values

So far, we've discussed functions as the primary mechanism of *scope* in JavaScript. You recall typical `function` declaration syntax as follows:

```js
function foo() {
	// ..
}
```

Though it may not seem obvious from that syntax, `foo` is basically just a variable in the outer enclosing scope that's given a reference to the `function` being declared. That is, the `function` itself is a value, just like `42` or `[1,2,3]` would be.

This may sound like a strange concept at first, so take a moment to ponder it. Not only can you pass a value (argument) *to* a function, but *a function itself can be a value* that's assigned to variables, or passed to or returned from other functions.

As such, a function value should be thought of as an expression, much like any other value or expression.

Consider:

```js
var foo = function() {
	// ..
};

var x = function bar(){
	// ..
};
```

The first function expression assigned to the `foo` variable is called *anonymous* because it has no `name`.

The second function expression is *named* (`bar`), even as a reference to it is also assigned to the `x` variable. *Named function expressions* are generally more preferable, though *anonymous function expressions* are still extremely common.

For more information, see the *Scope & Closures* title of this series.

### Immediately Invoked Function Expressions (IIFEs)

In the previous snippet, neither of the function expressions are executed -- we could if we had included `foo()` or `x()`, for instance.

There's another way to execute a function expression, which is typically referred to as an *immediately invoked function expression* (IIFE):

```js
(function IIFE(){
	console.log( "Hello!" );
})();
// "Hello!"
```

The outer `( .. )` that surrounds the `(function IIFE(){ .. })` function expression is just a nuance of JS grammar needed to prevent it from being treated as a normal function declaration.

The final `()` on the end of the expression -- the `})();` line -- is what actually executes the function expression referenced immediately before it.

That may seem strange, but it's not as foreign as first glance. Consider the similarities between `foo` and `IIFE` here:

```js
function foo() { .. }

// `foo` function reference expression,
// then `()` executes it
foo();

// `IIFE` function expression,
// then `()` executes it
(function IIFE(){ .. })();
```

As you can see, listing the `(function IIFE(){ .. })` before its executing `()` is essentially the same as including `foo` before its executing `()`; in both cases, the function reference is executed with `()` immediately after it.

Because an IIFE is just a function, and functions create variable *scope*, using an IIFE in this fashion is often used to declare variables that won't affect the surrounding code outside the IIFE:

```js
var a = 42;

(function IIFE(){
	var a = 10;
	console.log( a );	// 10
})();

console.log( a );		// 42
```

IIFEs can also have return values:

```js
var x = (function IIFE(){
	return 42;
})();

x;	// 42
```

The `42` value gets `return`ed from the `IIFE`-named function being executed, and is then assigned to `x`.

### Closure

*Closure* is one of the most important, and often least understood, concepts in JavaScript. I won't cover it in deep detail here, and instead refer you to the *Scope & Closures* title of this series. But I want to say a few things about it so you understand the general concept. It will be one of the most important techniques in your JS skillset.

You can think of closure as a way to "remember" and continue to access a function's scope (its variables) even once the function has finished running.

Consider:

```js
function makeAdder(x) {
	// parameter `x` is an inner variable

	// inner function `add()` uses `x`, so
	// it has a "closure" over it
	function add(y) {
		return y + x;
	};

	return add;
}
```

The reference to the inner `add(..)` function that gets returned with each call to the outer `makeAdder(..)` is able to remember whatever `x` value was passed in to `makeAdder(..)`. Now, let's use `makeAdder(..)`:

```js
// `plusOne` gets a reference to the inner `add(..)`
// function with closure over the `x` parameter of
// the outer `makeAdder(..)`
var plusOne = makeAdder( 1 );

// `plusTen` gets a reference to the inner `add(..)`
// function with closure over the `x` parameter of
// the outer `makeAdder(..)`
var plusTen = makeAdder( 10 );

plusOne( 3 );		// 4  <-- 1 + 3
plusOne( 41 );		// 42 <-- 1 + 41

plusTen( 13 );		// 23 <-- 10 + 13
```

More on how this code works:

1. When we call `makeAdder(1)`, we get back a reference to its inner `add(..)` that remembers `x` as `1`. We call this function reference `plusOne(..)`.
2. When we call `makeAdder(10)`, we get back another reference to its inner `add(..)` that remembers `x` as `10`. We call this function reference `plusTen(..)`.
3. When we call `plusOne(3)`, it adds `3` (its inner `y`) to the `1` (remembered by `x`), and we get `4` as the result.
4. When we call `plusTen(13)`, it adds `13` (its inner `y`) to the `10` (remembered by `x`), and we get `23` as the result.

Don't worry if this seems strange and confusing at first -- it can be! It'll take lots of practice to understand it fully.

But trust me, once you do, it's one of the most powerful and useful techniques in all of programming. It's definitely worth the effort to let your brain simmer on closures for a bit. In the next section, we'll get a little more practice with closure.

#### Modules

The most common usage of closure in JavaScript is the module pattern. Modules let you define private implementation details (variables, functions) that are hidden from the outside world, as well as a public API that *is* accessible from the outside.

Consider:

```js
function User(){
	var username, password;

	function doLogin(user,pw) {
		username = user;
		password = pw;

		// do the rest of the login work
	}

	var publicAPI = {
		login: doLogin
	};

	return publicAPI;
}

// create a `User` module instance
var fred = User();

fred.login( "fred", "12Battery34!" );
```

The `User()` function serves as an outer scope that holds the variables `username` and `password`, as well as the inner `doLogin()` function; these are all private inner details of this `User` module that cannot be accessed from the outside world.

**Warning:** We are not calling `new User()` here, on purpose, despite the fact that probably seems more common to most readers. `User()` is just a function, not a class to be instantiated, so it's just called normally. Using `new` would be inappropriate and actually waste resources.

Executing `User()` creates an *instance* of the `User` module -- a whole new scope is created, and thus a whole new copy of each of these inner variables/functions. We assign this instance to `fred`. If we run `User()` again, we'd get a new instance entirely separate from `fred`.

The inner `doLogin()` function has a closure over `username` and `password`, meaning it will retain its access to them even after the `User()` function finishes running.

`publicAPI` is an object with one property/method on it, `login`, which is a reference to the inner `doLogin()` function. When we return `publicAPI` from `User()`, it becomes the instance we call `fred`.

At this point, the outer `User()` function has finished executing. Normally, you'd think the inner variables like `username` and `password` have gone away. But here they have not, because there's a closure in the `login()` function keeping them alive.

That's why we can call `fred.login(..)` -- the same as calling the inner `doLogin(..)` -- and it can still access `username` and `password` inner variables.

There's a good chance that with just this brief glimpse at closure and the module pattern, some of it is still a bit confusing. That's OK! It takes some work to wrap your brain around it.

From here, go read the *Scope & Closures* title of this series for a much more in-depth exploration.

## `this` Identifier

Another very commonly misunderstood concept in JavaScript is the `this` identifier. Again, there's a couple of chapters on it in the *this & Object Prototypes* title of this series, so here we'll just briefly introduce the concept.

While it may often seem that `this` is related to "object-oriented patterns," in JS `this` is a different mechanism.

If a function has a `this` reference inside it, that `this` reference usually points to an `object`. But which `object` it points to depends on how the function was called.

It's important to realize that `this` *does not* refer to the function itself, as is the most common misconception.

Here's a quick illustration:

```js
function foo() {
	console.log( this.bar );
}

var bar = "global";

var obj1 = {
	bar: "obj1",
	foo: foo
};

var obj2 = {
	bar: "obj2"
};

// --------

foo();				// "global"
obj1.foo();			// "obj1"
foo.call( obj2 );		// "obj2"
new foo();			// undefined
```

There are four rules for how `this` gets set, and they're shown in those last four lines of that snippet.

1. `foo()` ends up setting `this` to the global object in non-strict mode -- in strict mode, `this` would be `undefined` and you'd get an error in accessing the `bar` property -- so `"global"` is the value found for `this.bar`.
2. `obj1.foo()` sets `this` to the `obj1` object.
3. `foo.call(obj2)` sets `this` to the `obj2` object.
4. `new foo()` sets `this` to a brand new empty object.

Bottom line: to understand what `this` points to, you have to examine how the function in question was called. It will be one of those four ways just shown, and that will then answer what `this` is.

**Note:** For more information about `this`, see Chapters 1 and 2 of the *this & Object Prototypes* title of this series.

## Prototypes

The prototype mechanism in JavaScript is quite complicated. We will only glance at it here. You will want to spend plenty of time reviewing Chapters 4-6 of the *this & Object Prototypes* title of this series for all the details.

When you reference a property on an object, if that property doesn't exist, JavaScript will automatically use that object's internal prototype reference to find another object to look for the property on. You could think of this almost as a fallback if the property is missing.

The internal prototype reference linkage from one object to its fallback happens at the time the object is created. The simplest way to illustrate it is with a built-in utility called `Object.create(..)`.

Consider:

```js
var foo = {
	a: 42
};

// create `bar` and link it to `foo`
var bar = Object.create( foo );

bar.b = "hello world";

bar.b;		// "hello world"
bar.a;		// 42 <-- delegated to `foo`
```

It may help to visualize the `foo` and `bar` objects and their relationship:

<img src="fig6.png">

The `a` property doesn't actually exist on the `bar` object, but because `bar` is prototype-linked to `foo`, JavaScript automatically falls back to looking for `a` on the `foo` object, where it's found.

This linkage may seem like a strange feature of the language. The most common way this feature is used -- and I would argue, abused -- is to try to emulate/fake a "class" mechanism with "inheritance."

But a more natural way of applying prototypes is a pattern called "behavior delegation," where you intentionally design your linked objects to be able to *delegate* from one to the other for parts of the needed behavior.

**Note:** For more information about prototypes and behavior delegation, see Chapters 4-6 of the *this & Object Prototypes* title of this series.

## Old & New

Some of the JS features we've already covered, and certainly many of the features covered in the rest of this series, are newer additions and will not necessarily be available in older browsers. In fact, some of the newest features in the specification aren't even implemented in any stable browsers yet.

So, what do you do with the new stuff? Do you just have to wait around for years or decades for all the old browsers to fade into obscurity?

That's how many people think about the situation, but it's really not a healthy approach to JS.

There are two main techniques you can use to "bring" the newer JavaScript stuff to the older browsers: polyfilling and transpiling.

### Polyfilling

The word "polyfill" is an invented term (by Remy Sharp) (https://remysharp.com/2010/10/08/what-is-a-polyfill) used to refer to taking the definition of a newer feature and producing a piece of code that's equivalent to the behavior, but is able to run in older JS environments.

For example, ES6 defines a utility called `Number.isNaN(..)` to provide an accurate non-buggy check for `NaN` values, deprecating the original `isNaN(..)` utility. But it's easy to polyfill that utility so that you can start using it in your code regardless of whether the end user is in an ES6 browser or not.

Consider:

```js
if (!Number.isNaN) {
	Number.isNaN = function isNaN(x) {
		return x !== x;
	};
}
```

The `if` statement guards against applying the polyfill definition in ES6 browsers where it will already exist. If it's not already present, we define `Number.isNaN(..)`.

**Note:** The check we do here takes advantage of a quirk with `NaN` values, which is that they're the only value in the whole language that is not equal to itself. So the `NaN` value is the only one that would make `x !== x` be `true`.

Not all new features are fully polyfillable. Sometimes most of the behavior can be polyfilled, but there are still small deviations. You should be really, really careful in implementing a polyfill yourself, to make sure you are adhering to the specification as strictly as possible.

Or better yet, use an already vetted set of polyfills that you can trust, such as those provided by ES5-Shim (https://github.com/es-shims/es5-shim) and ES6-Shim (https://github.com/es-shims/es6-shim).

### Transpiling

There's no way to polyfill new syntax that has been added to the language. The new syntax would throw an error in the old JS engine as unrecognized/invalid.

So the better option is to use a tool that converts your newer code into older code equivalents. This process is commonly called "transpiling," a term for transforming + compiling.

Essentially, your source code is authored in the new syntax form, but what you deploy to the browser is the transpiled code in old syntax form. You typically insert the transpiler into your build process, similar to your code linter or your minifier.

You might wonder why you'd go to the trouble to write new syntax only to have it transpiled away to older code -- why not just write the older code directly?

There are several important reasons you should care about transpiling:

* The new syntax added to the language is designed to make your code more readable and maintainable. The older equivalents are often much more convoluted. You should prefer writing newer and cleaner syntax, not only for yourself but for all other members of the development team.
* If you transpile only for older browsers, but serve the new syntax to the newest browsers, you get to take advantage of browser performance optimizations with the new syntax. This also lets browser makers have more real-world code to test their implementations and optimizations on.
* Using the new syntax earlier allows it to be tested more robustly in the real world, which provides earlier feedback to the JavaScript committee (TC39). If issues are found early enough, they can be changed/fixed before those language design mistakes become permanent.

Here's a quick example of transpiling. ES6 adds a feature called "default parameter values." It looks like this:

```js
function foo(a = 2) {
	console.log( a );
}

foo();		// 2
foo( 42 );	// 42
```

Simple, right? Helpful, too! But it's new syntax that's invalid in pre-ES6 engines. So what will a transpiler do with that code to make it run in older environments?

```js
function foo() {
	var a = arguments[0] !== (void 0) ? arguments[0] : 2;
	console.log( a );
}
```

As you can see, it checks to see if the `arguments[0]` value is `void 0` (aka `undefined`), and if so provides the `2` default value; otherwise, it assigns whatever was passed.

In addition to being able to now use the nicer syntax even in older browsers, looking at the transpiled code actually explains the intended behavior more clearly.

You may not have realized just from looking at the ES6 version that `undefined` is the only value that can't get explicitly passed in for a default-value parameter, but the transpiled code makes that much more clear.

The last important detail to emphasize about transpilers is that they should now be thought of as a standard part of the JS development ecosystem and process. JS is going to continue to evolve, much more quickly than before, so every few months new syntax and new features will be added.

If you use a transpiler by default, you'll always be able to make that switch to newer syntax whenever you find it useful, rather than always waiting for years for today's browsers to phase out.

There are quite a few great transpilers for you to choose from. Here are some good options at the time of this writing:

* Babel (https://babeljs.io) (formerly 6to5): Transpiles ES6+ into ES5
* Traceur (https://github.com/google/traceur-compiler): Transpiles ES6, ES7, and beyond into ES5

## Non-JavaScript

So far, the only things we've covered are in the JS language itself. The reality is that most JS is written to run in and interact with environments like browsers. A good chunk of the stuff that you write in your code is, strictly speaking, not directly controlled by JavaScript. That probably sounds a little strange.

The most common non-JavaScript JavaScript you'll encounter is the DOM API. For example:

```js
var el = document.getElementById( "foo" );
```

The `document` variable exists as a global variable when your code is running in a browser. It's not provided by the JS engine, nor is it particularly controlled by the JavaScript specification. It takes the form of something that looks an awful lot like a normal JS `object`, but it's not really exactly that. It's a special `object,` often called a "host object."

Moreover, the `getElementById(..)` method on `document` looks like a normal JS function, but it's just a thinly exposed interface to a built-in method provided by the DOM from your browser. In some (newer-generation) browsers, this layer may also be in JS, but traditionally the DOM and its behavior is implemented in something more like C/C++.

Another example is with input/output (I/O).

Everyone's favorite `alert(..)` pops up a message box in the user's browser window. `alert(..)` is provided to your JS program by the browser, not by the JS engine itself. The call you make sends the message to the browser internals and it handles drawing and displaying the message box.

The same goes with `console.log(..)`; your browser provides such mechanisms and hooks them up to the developer tools.

This book, and this whole series, focuses on JavaScript the language. That's why you don't see any substantial coverage of these non-JavaScript JavaScript mechanisms. Nevertheless, you need to be aware of them, as they'll be in every JS program you write!

## Review

The first step to learning JavaScript's flavor of programming is to get a basic understanding of its core mechanisms like values, types, function closures, `this`, and prototypes.

Of course, each of these topics deserves much greater coverage than you've seen here, but that's why they have chapters and books dedicated to them throughout the rest of this series. After you feel pretty comfortable with the concepts and code samples in this chapter, the rest of the series awaits you to really dig in and get to know the language deeply.

The final chapter of this book will briefly summarize each of the other titles in the series and the other concepts they cover besides what we've already explored.
