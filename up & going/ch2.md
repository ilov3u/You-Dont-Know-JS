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

Một điểm khác biệt chính (cải tiến!) với strict mode là không cho phép khai báo biến toàn cục tự động ngầm định bỏ qua `var`:

```js
function foo() {
	"use strict";	// turn on strict mode
	a = 1;			// `var` missing, ReferenceError
}

foo();
```

Nếu bạn bật strict mode trong code của mình và bạn gặp lỗi hoặc code bắt đầu hoạt động lỗi, bạn có thể muốn tránh chế độ strict mode. Nhưng bản năng đó sẽ là một ý tưởng tồi cho sự lạm dụng. Nếu strict mode gây ra sự cố trong chương trình của bạn, gần như chắc chắn đó là dấu hiệu cho thấy bạn có những thứ trong chương trình của mình mà bạn nên khắc phục.

Strict mode không chỉ giúp giữ code của bạn hoạt động theo cách an toàn hơn và không chỉ giúp code của bạn tối ưu hơn mà còn đại diện cho hướng tương lai của ngôn ngữ. Bây giờ bạn sẽ dễ dàng làm quen với strict mode hơn là tiếp tục đặt nó - sau này sẽ chỉ khó chuyển đổi hơn!

**Lưu Ý:** Để biết thêm thông tin về strict mode, xem trong Chương 5 của cuốn *Types & Grammar* của bộ sách này.

## Functions As Values

Cho đến nay, chúng ta đã thảo luận về các function(hàm) như là cơ chế chính của *scope(phạm vi)* trong JavaScript. Bạn nhớ lại cú pháp khai báo `function` điển hình như sau:

```js
function foo() {
	// ..
}
```

Mặc dù cú pháp đó có vẻ không rõ ràng, nhưng về cơ bản, `foo` chỉ là một biến trong phạm vi bao bọc bên ngoài được cung cấp tham chiếu đến `function` đang được khai báo. Nghĩa là, bản thân `function` là một giá trị, giống như sẽ là `42` hoặc `[1,2,3]`.

Thoạt nghe, điều này có vẻ là một khái niệm kỳ lạ, vì vậy hãy dành một chút thời gian để suy ngẫm về nó. Bạn không chỉ có thể truyền một giá trị(đối số) *cho* một function(hàm), mà bản thân *một function có thể là một giá trị* được gán cho các biến, hoặc được truyền vào hoặc trả về từ các function khác.

Do đó, một giá trị function nên được coi là một biểu thức, giống như bất kỳ giá trị hoặc biểu thức nào khác.

Xem xét:

```js
var foo = function() {
	// ..
};

var x = function bar(){
	// ..
};
```

Biểu thức function đầu tiên được gán cho biến `foo` được gọi là *anonymous (vô danh)* vì nó không có `tên`.

Biểu thức function thứ hai là *có tên* (`bar`), ngay cả khi tham chiếu đến nó cũng được gán cho biến `x`. *Biểu thức function được đặt tên* thường được ưu tiên hơn, mặc dù *biểu thức function vô danh* vẫn cực kỳ phổ biến.

Để thêm thông tin, xem trong cuốn *Scope & Closures* của bộ sách này.

### Immediately Invoked Function Expressions (IIFEs)(Biểu Thức Hàm Được Gọi Ngay Lập Tức)

Trong đoạn code trước, cả hai biểu thức function đều không được thực thi - chúng ta có thể thực hiện nếu chúng ta đã bao gồm `foo()` hoặc `x()`, chẳng hạn.

Có một cách khác để thực thi một biểu thức hàm, thường được gọi là *immediately invoked function expression* (IIFE):

```js
(function IIFE(){
	console.log( "Hello!" );
})();
// "Hello!"
```

Phần ngoài `(..)` bao quanh biểu thức hàm `(function IIFE(){..})` chỉ là một sắc thái của ngữ pháp JS cần thiết để ngăn nó được coi như một khai báo hàm bình thường.

Cuối cùng `()` ở cuối biểu thức - dòng `})();` - là những gì thực sự thực thi biểu thức hàm được tham chiếu ngay trước nó.

Điều đó có vẻ lạ, nhưng nó không xa lạ như cái nhìn đầu tiên. Hãy xem xét những điểm tương đồng giữa `foo` và` IIFE` tại đây:

```js
function foo() { .. }

// `foo` function reference expression,
// then `()` executes it
foo();

// `IIFE` function expression,
// then `()` executes it
(function IIFE(){ .. })();
```

Như bạn có thể thấy, việc liệt kê `(function IIFE(){..})` trước khi nó thực thi `()` về cơ bản giống như việc bao gồm `foo` trước khi nó thực thi `()`; trong cả hai trường hợp, tham chiếu function được thực thi với `()` ngay sau nó.

Bởi vì IIFE chỉ là một function và các function tạo ra biến *scope(phạm vi)*, việc sử dụng IIFE theo cách này thường được sử dụng để khai báo các biến sẽ không ảnh hưởng đến mã xung quanh bên ngoài IIFE:

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

*Closure* là một trong những phần quan trọng nhất, và thường ít được hiểu nhất, khái niệm trong JavaScript. Tôi sẽ không trình bày chi tiết về nó ở đây, và thay vào đó, giới thiệu bạn đến cuốn *Scope & Closures* của bộ sách này. Nhưng tôi muốn nói một vài điều về nó để bạn hiểu khái niệm chung. Nó sẽ là một trong những kỹ thuật quan trọng nhất trong bộ kỹ năng JS của bạn.

Bạn có thể coi closure như một cách để "ghi nhớ" và tiếp tục truy cập vào scope của một hàm(các biến của nó) ngay cả khi hàm đã chạy xong.

Xem xét:

```js
function makeAdder(x) {
	// parameter `x` is an inner variable

	// inner function `add()` uses `x`, so
	// it has a "closure" over it
	function add(y) {
		return y + x;
	};

	return add;
}a
```

Tham chiếu đến hàm `add(..)` bên trong được trả về với mỗi lệnh gọi đến hàm bên ngoài `makeAdder(..)` có thể nhớ bất kỳ giá trị `x` nào đã được chuyển vào `makeAdder(..)`. Bây giờ, hãy sử dụng `makeAdder(..)`:

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

Tìm hiểu thêm về cách mã này hoạt động:

1. Khi chúng ta gọi `makeAdder(1)`, chúng ta nhận lại một tham chiếu đến `add(..)` bên trong của nó nhớ `x` là `1`. Chúng tôi gọi đây là tham chiếu hàm(function reference) `plusOne(..)`.
2. Khi chúng ta gọi `makeAdder(10)`, chúng tôi nhận lại một tham chiếu khác về bên trong của nó `add(..)` và nhớ `x` là `10`. Chúng tôi gọi đây là tham chiếu hàm `plusTen(..)`.
3. Khi chúng ta gọi `plusOne(3)`, nó thêm `3` (bên trong của nó `y`) cộng với `1` (được nhớ bởi` x`), và chúng ta nhận `4` là kết quả.
4. Khi chúng ta goi `plusTen(13)`, Nó thêm `13` (bên trong `y` của nó) cộng với `10` (nhớ bởi `x`), và chúng ta nhận được `23` là kết quả.

Đừng lo lắng nếu điều này có vẻ lạ và khó hiểu lúc đầu - nó có thể được! Sẽ mất rất nhiều thực hành để hiểu nó đầy đủ.

Nhưng hãy tin tôi, một khi bạn làm được, đó là một trong những kỹ thuật mạnh mẽ và hữu ích nhất trong lập trình. Nó chắc chắn đáng để cố gắng để bộ não của bạn sôi sục khi đóng cửa một chút. Trong phần tiếp theo, chúng ta sẽ thực hành thêm một chút về cách đóng.

#### Modules

Cách sử dụng phổ biến nhất của bao đóng trong JavaScript là pattern module. Module cho phép bạn xác định chi tiết triển khai riêng tư (biến, hàm) bị ẩn khỏi thế giới bên ngoài, cũng như API công khai *có thể* truy cập từ bên ngoài.

Xem xét:

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

Hàm `User()` đóng vai trò như một phạm vi bên ngoài chứa các biến `username` và `password`, cũng như hàm `doLogin()` bên trong; đây là tất cả các chi tiết riêng tư bên trong của mô-đun `User` này mà không thể truy cập từ bên ngoài.

**Cảnh báo:** Chúng tôi không cố ý gọi `new User()` ở đây, mặc dù thực tế là có vẻ phổ biến hơn đối với hầu hết người đọc. `User()` chỉ là một hàm, không phải là một lớp để được khởi tạo, vì vậy nó chỉ được gọi bình thường. Sử dụng `new` sẽ không phù hợp và thực sự lãng phí tài nguyên.

Thực thi `User()` tạo ra một *instance* của module `User` -- một phạm vi hoàn toàn mới được tạo và do đó một bản sao hoàn toàn mới của mỗi biến / hàm bên trong này. Chúng tôi gán trường hợp này cho `fred`. Nếu chúng tôi chạy lại `User()`, chúng tôi sẽ nhận được một phiên bản mới hoàn toàn tách biệt với `fred`.

Hàm `doLogin()` bên trong có closure đối với `username` và `password`, có nghĩa là nó sẽ giữ lại quyền truy cập vào chúng ngay cả sau khi hàm `User()` chạy xong.

`publicAPI` là một đối tượng có một thuộc tính/phương thức trên đó, `login`, là một tham chiếu đến hàm `doLogin()` bên trong. Khi chúng tôi trả về `publicAPI` từ `User()`, nó sẽ trở thành đối tượng mà chúng ta gọi là `fred`.

Tại thời điểm này, hàm `User()` bên ngoài đã hoàn tất quá trình thực thi. Thông thường, bạn nghĩ rằng các biến bên trong như `username` và `password` đã biến mất. Nhưng ở đây thì không, bởi vì có một sự đóng lại(closure) trong hàm `login()` giữ cho chúng tồn tại.

Đó là lý do tại sao chúng ta có thể gọi `fred.login (..)` - giống như gọi nội dung `doLogin (..)` - và nó vẫn có thể truy cập các biến bên trong `username` và `password`.

Có một cơ hội tốt là chỉ với cái nhìn thoáng qua về closure và mô hình module, một số vẫn còn hơi khó hiểu. Vậy là được rồi! Cần một số công việc để quấn lấy bộ não của bạn xung quanh nó.

Từ đây, hãy đọc cuốn *Scope & Closures* của bộ sách này để khám phá sâu hơn.

## Định Danh `this`

Một khái niệm rất hay bị hiểu lầm khác trong JavaScript là từ định danh `this`. Một lần nữa, có một vài chương về nó trong cuốn *this & Object Prototypes* của bộ sách này, vì vậy ở đây chúng tôi sẽ chỉ giới thiệu ngắn gọn khái niệm.

Mặc dù thường có vẻ như `this` liên quan đến "các mẫu hướng đối tượng" , nhưng trong JS `this` là một cơ chế khác.

Nếu một function có tham chiếu `this` bên trong nó, thì tham chiếu `this` đó thường trỏ đến một `object`. Nhưng `object` nào mà nó trỏ đến phụ thuộc vào cách hàm được gọi.

Điều quan trọng là phải nhận ra rằng `this` *không* tham chiếu đến chính hàm, đây là quan niệm sai lầm phổ biến nhất.

Đây là một minh họa nhanh:

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

Có bốn quy tắc về cách thiết lập `this` và chúng được hiển thị trong bốn dòng cuối cùng của đoạn mã đó.

1. `foo()` kết thúc việc thiết lập `this` thành đối tượng toàn cục ở chế độ không nghiêm ngặt - ở chế độ nghiêm ngặt, `this` sẽ là `undefined` và bạn sẽ gặp lỗi khi truy cập thuộc tính `bar` - vì vậy `"global "` là giá trị được tìm thấy cho `this.bar`.
2. `obj1.foo()` thiết lập `this` thành đối tượng object `obj1`.
3. `foo.call(obj2)` thiết lập `this` thành đối tượng object `obj2`.
4. `new foo()` thiết lập `this` tới một object rỗng mới hoàn toàn.

Điểm mấu chốt: để hiểu `this` trỏ đến điều gì, bạn phải kiểm tra xem function được đề cập được gọi như thế nào. Nó sẽ là một trong bốn cách vừa được hiển thị, và điều đó sẽ trả lời `this` là gì.

**Lưu ý:** Để biết thêm thông tin về `this`, hãy xem Chương 1 và 2 của cuốn *this & Object Prototypes* của loạt bài này.

## Prototypes (Nguyên Mẫu)

Cơ chế nguyên mẫu trong JavaScript khá phức tạp. Chúng tôi sẽ chỉ lướt qua nó ở đây. Bạn sẽ muốn dành nhiều thời gian xem lại Chương 4-6 của cuốn *this & Object Prototypes* của bộ sách này để biết tất cả các chi tiết.

Khi bạn tham chiếu một thuộc tính trên một đối tượng, nếu thuộc tính đó không tồn tại, JavaScript sẽ tự động sử dụng tham chiếu nguyên mẫu(prototype) bên trong của đối tượng đó để tìm một đối tượng khác để tìm thuộc tính. Bạn có thể coi đây gần như là một dự phòng nếu thuộc tính bị thiếu.

Liên kết tham chiếu nguyên mẫu(prototype) nội bộ từ một đối tượng đến dự phòng của nó xảy ra tại thời điểm đối tượng được tạo. Cách đơn giản nhất để minh họa nó là với một tiện ích tích hợp có tên là `Object.create (..)`.

Xem xét:

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

Nó có thể giúp hình dung các đối tượng `foo` và `bar` và mối quan hệ của chúng:

<img src="fig6.png">

Thuộc tính `a` không thực sự tồn tại trên đối tượng` bar`, nhưng vì `bar` được liên kết nguyên mẫu với` foo`, JavaScript tự động quay trở lại tìm kiếm `a` trên đối tượng` foo`, nơi nó được tìm thấy.

Mối liên kết này có vẻ như là một đặc điểm kỳ lạ của ngôn ngữ. Cách phổ biến nhất mà tính năng này được sử dụng - và tôi cho rằng bị lạm dụng - là cố gắng mô phỏng/giả mạo một cơ chế "lớp" với "kế thừa".

Nhưng một cách tự nhiên hơn để áp dụng các nguyên mẫu là một mẫu được gọi là "ủy quyền hành vi(behavior delegation)", trong đó bạn cố ý thiết kế các đối tượng được liên kết của mình để có thể *ủy quyền(delegate)* từ cái này sang cái khác cho các phần của hành vi cần thiết.

**Lưu ý:** Để biết thêm thông tin về nguyên mẫu(prototype) và ủy quyền hành vi(behavior delegation), hãy xem Chương 4-6 của cuốn *this & Object Prototypes* của bộ sách này.

## Cũ & Mới

Một số tính năng JS mà chúng tôi đã đề cập và chắc chắn nhiều tính năng được đề cập trong phần còn lại của loạt bài này, là những bổ sung mới hơn và sẽ không nhất thiết phải có trong các trình duyệt cũ. Trên thực tế, một số tính năng mới nhất trong đặc điểm kỹ thuật thậm chí chưa được triển khai trong bất kỳ trình duyệt ổn định nào.

Vì vậy, bạn sẽ làm gì với những thứ mới? Bạn có phải đợi khoảng vài năm hoặc nhiều thập kỷ để tất cả các trình duyệt cũ dần trở nên mờ mịt không?

Đó là cách nhiều người nghĩ về tình huống này, nhưng nó thực sự không phải là một cách tiếp cận lành mạnh đối với JS.

Có hai kỹ thuật chính mà bạn có thể sử dụng để "mang" nội dung JavaScript mới hơn đến các trình duyệt cũ hơn: polyfilling và transpiling.

### Polyfilling

Từ "polyfill" là một thuật ngữ được phát minh (bởi Remy Sharp) (https://remysharp.com/2010/10/08/what-is-a-polyfill) được sử dụng để chỉ việc lấy định nghĩa của một tính năng mới hơn và sinh ra một đoạn mã tương đương với hành vi, nhưng có thể chạy trong môi trường JS cũ hơn.

Ví dụ: ES6 định nghĩa một tiện ích có tên là `Number.isNaN(..)` để cung cấp một kiểm tra không lỗi chính xác cho các giá trị `NaN`, không chấp nhận tiện ích `isNaN(..)` ban đầu. Nhưng thật dễ dàng để ghép nối tiện ích đó để bạn có thể bắt đầu sử dụng nó trong mã của mình bất kể người dùng cuối có đang sử dụng trình duyệt ES6 hay không.

Xem xét:

```js
if (!Number.isNaN) {
	Number.isNaN = function isNaN(x) {
		return x !== x;
	};
}
```

Câu lệnh `if` bảo vệ chống lại việc áp dụng định nghĩa polyfill trong các trình duyệt ES6 nơi nó đã tồn tại. Nếu nó chưa xuất hiện, chúng ta định nghĩa `Number.isNaN(..)`.

**Lưu ý:** Việc kiểm tra mà chúng ta thực hiện ở đây tận dụng lợi thế của một sai lệch với các giá trị `NaN`, đó là chúng là giá trị duy nhất trong toàn bộ ngôn ngữ không bằng với chính nó. Vì vậy, giá trị `NaN` là giá trị duy nhất làm cho `x! == x` là `true`.

Không phải tất cả các tính năng mới đều có thể polyfill hoàn toàn. Đôi khi hầu hết các hành vi có thể được thực hiện polyfill, nhưng vẫn có những sai lệch nhỏ. Bạn nên thực sự, thực sự cẩn thận trong việc tự mình thực hiện polyfill, để đảm bảo rằng bạn đang tuân thủ các thông số kỹ thuật một cách nghiêm ngặt nhất có thể.

Hoặc tốt hơn, hãy sử dụng một bộ polyfills đã được kiểm duyệt mà bạn có thể tin tưởng, chẳng hạn như các polyfills được cung cấp bởi ES5-Shim (https://github.com/es-shims/es5-shim) và ES6-Shim (https://github.com/es-shims/es5-shim.

### Transpiling (Chuyển Ngữ)

Không có cách nào để ghép các cú pháp mới đã được thêm vào ngôn ngữ. Cú pháp mới sẽ gây ra lỗi trong công cụ JS cũ như không được công nhận/không hợp lệ.

Vì vậy, lựa chọn tốt hơn là sử dụng một công cụ chuyển đổi mã mới hơn của bạn thành các mã tương đương cũ hơn. Quá trình này thường được gọi là "transpiling", một thuật ngữ để chuyển đổi(transforming) + biên dịch(compiling).

Về cơ bản, mã nguồn của bạn được tạo ra ở dạng cú pháp mới, nhưng những gì bạn triển khai cho trình duyệt là mã chuyển đổi ở dạng cú pháp cũ. Bạn thường chèn trình chuyển tiếp vào quy trình xây dựng của mình, tương tự như trình ghép mã(linter) hoặc trình thu nhỏ(minifier) của bạn.

Bạn có thể tự hỏi tại sao bạn lại gặp khó khăn khi viết cú pháp mới chỉ để nó chuyển sang mã cũ hơn - tại sao không viết trực tiếp mã cũ hơn?

Có một số lý do quan trọng mà bạn nên quan tâm về việc transpiling:

* Cú pháp mới được thêm vào ngôn ngữ được thiết kế để làm cho mã của bạn dễ đọc và dễ bảo trì hơn. Các thiết bị tương đương cũ hơn thường phức tạp hơn nhiều. Bạn nên viết cú pháp mới hơn và rõ ràng hơn, không chỉ cho chính bạn mà cho tất cả các thành viên khác trong nhóm phát triển.
* Nếu bạn chỉ transpile cho các trình duyệt cũ hơn, nhưng cung cấp cú pháp mới cho các trình duyệt mới nhất, bạn sẽ tận dụng được lợi thế của việc tối ưu hóa hiệu suất trình duyệt với cú pháp mới. Điều này cũng cho phép các nhà sản xuất trình duyệt có nhiều mã trong thế giới thực hơn để kiểm tra việc triển khai và tối ưu hóa của họ trên.
* Việc sử dụng cú pháp mới trước đó cho phép nó được kiểm tra mạnh mẽ hơn trong thế giới thực, cung cấp phản hồi sớm hơn cho ủy ban JavaScript (TC39). Nếu các vấn đề được phát hiện đủ sớm, chúng có thể được thay đổi/khắc phục trước khi những lỗi thiết kế ngôn ngữ đó trở thành vĩnh viễn.

Đây là một ví dụ nhanh về transpiling(chuyển ngữ). ES6 thêm một tính năng được gọi là "giá trị tham số mặc định." Nó trông như thế này:

```js
function foo(a = 2) {
	console.log( a );
}

foo();		// 2
foo( 42 );	// 42
```

Đơn giản, phải không? Cũng hữu ích! Nhưng đó là cú pháp mới không hợp lệ trong các công cụ trước ES6. Vì vậy, một trình chuyển đổi sẽ làm gì với mã đó để làm cho nó chạy trong các môi trường cũ hơn?

```js
function foo() {
	var a = arguments[0] !== (void 0) ? arguments[0] : 2;
	console.log( a );
}
```

Như bạn có thể thấy, nó sẽ kiểm tra xem giá trị `arguments[0]` có phải là `void 0` (hay còn gọi là `undefined`) hay không và nếu đúng thì cung cấp giá trị mặc định `2`; nếu không, nó được gán cho bất cứ tham số gì đã được truyền.

Ngoài việc hiện có thể sử dụng cú pháp đẹp hơn ngay cả trong các trình duyệt cũ hơn, việc nhìn vào mã transpiled thực sự giải thích hành vi dự định rõ ràng hơn.

Có thể bạn đã không nhận ra chỉ khi nhìn vào phiên bản ES6 rằng `undefined` là giá trị duy nhất không thể được chuyển vào một cách rõ ràng cho tham số giá trị mặc định, nhưng mã chuyển đổi làm cho điều đó rõ ràng hơn nhiều.

Chi tiết quan trọng cuối cùng cần nhấn mạnh về bộ chuyển mã là giờ đây chúng nên được coi là một phần tiêu chuẩn của quy trình và hệ sinh thái phát triển JS. JS sẽ tiếp tục phát triển, nhanh hơn nhiều so với trước đây, vì vậy cứ sau vài tháng, cú pháp mới và các tính năng mới sẽ được thêm vào.

Nếu bạn sử dụng một trình chuyển đổi theo mặc định, bạn sẽ luôn có thể thực hiện chuyển đổi đó sang cú pháp mới hơn bất cứ khi nào bạn thấy nó hữu ích, thay vì luôn chờ đợi nhiều năm cho các trình duyệt ngày nay loại bỏ dần.

Có khá nhiều bộ chuyển đổi tuyệt vời cho bạn lựa chọn. Dưới đây là một số lựa chọn tốt tại thời điểm viết bài này:

* Babel (https://babeljs.io) (trước kia 6to5): Transpiles ES6+ thành ES5
* Traceur (https://github.com/google/traceur-compiler): Transpiles ES6, ES7, và hơn thế thành ES5

## Non-JavaScript

Cho đến nay, những thứ duy nhất chúng tôi đã đề cập là bằng chính ngôn ngữ JS. Thực tế là hầu hết JS được viết để chạy và tương tác với các môi trường như trình duyệt. Nói đúng ra, một phần tốt những thứ bạn viết trong mã của mình là không được kiểm soát trực tiếp bởi JavaScript. Nghe có vẻ hơi lạ.

JavaScript không phải JavaScript phổ biến nhất mà bạn sẽ gặp là API DOM. Ví dụ:

```js
var el = document.getElementById( "foo" );
```

Biến `document` tồn tại dưới dạng biến toàn cục khi mã của bạn đang chạy trong trình duyệt. Nó không được cung cấp bởi công cụ JS, cũng như không được kiểm soát đặc biệt bởi đặc tả JavaScript. Nó có dạng một thứ gì đó trông rất giống một `object` JS bình thường, nhưng nó không thực sự chính xác như vậy. Đó là một `đối tượng` đặc biệt, thường được gọi là "host object(đối tượng chủ)".

Hơn nữa, phương thức `getElementById(..)` trên `document` trông giống như một hàm JS bình thường, nhưng nó chỉ là một giao diện mỏng tiếp xúc với một phương thức tích hợp được cung cấp bởi DOM từ trình duyệt của bạn. Trong một số trình duyệt (thế hệ mới hơn), lớp này cũng có thể ở trong JS, nhưng theo truyền thống DOM và hành vi của nó được triển khai trong một thứ giống như C/C++ hơn.

Another example is with input/output (I/O).

Everyone's favorite `alert(..)` pops up a message box in the user's browser window. `alert(..)` is provided to your JS program by the browser, not by the JS engine itself. The call you make sends the message to the browser internals and it handles drawing and displaying the message box.

The same goes with `console.log(..)`; your browser provides such mechanisms and hooks them up to the developer tools.

This book, and this whole series, focuses on JavaScript the language. That's why you don't see any substantial coverage of these non-JavaScript JavaScript mechanisms. Nevertheless, you need to be aware of them, as they'll be in every JS program you write!

## Review

The first step to learning JavaScript's flavor of programming is to get a basic understanding of its core mechanisms like values, types, function closures, `this`, and prototypes.

Of course, each of these topics deserves much greater coverage than you've seen here, but that's why they have chapters and books dedicated to them throughout the rest of this series. After you feel pretty comfortable with the concepts and code samples in this chapter, the rest of the series awaits you to really dig in and get to know the language deeply.

The final chapter of this book will briefly summarize each of the other titles in the series and the other concepts they cover besides what we've already explored.
