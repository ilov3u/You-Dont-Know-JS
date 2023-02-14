# You Don't Know JS: Types & Grammar
# Chapter 2: Values

`array`, `string` và `number` là các khối xây dựng cơ bản nhất của bất kỳ chương trình nào, nhưng JavaScript có một số đặc điểm riêng với các loại này có thể khiến bạn thích thú hoặc bối rối.

Hãy xem xét một số loại giá trị tích hợp sẵn trong JS và khám phá cách chúng ta có thể hiểu đầy đủ hơn và tận dụng chính xác các hành vi của chúng.

## Arrays

So với các ngôn ngữ type-enforced (thực thi kiểu khác), `array` của JavaScript chỉ là vùng chứa cho bất kỳ loại giá trị nào, từ `string` đến `number` đến `object` thậm chí đến cả `array` khác (đó là cách bạn có được `array` đa chiều).

```js
var a = [ 1, "2", [3] ];

a.length;		// 3
a[0] === 1;		// true
a[2][0] === 3;	// true
```

Bạn không cần định cỡ trước cho `array` của mình (xem "Array" trong Chương 3), bạn chỉ cần khai báo chúng và thêm giá trị khi thấy phù hợp:

```js
var a = [ ];

a.length;	// 0

a[0] = 1;
a[1] = "2";
a[2] = [ 3 ];

a.length;	// 3
```

**Cảnh báo:** Sử dụng `delete` trên giá trị `array` sẽ xóa vị trí đó khỏi `array`, nhưng ngay cả khi bạn xóa phần tử cuối cùng, nó **không** cập nhật thuộc tính `length`, vì vậy hãy cẩn thận! Chúng ta sẽ đề cập chi tiết hơn về toán tử `delete` trong Chương 5.

Hãy cẩn thận về việc tạo các `array` "thưa thớt" (để trống hoặc tạo các vị trí trống/thiếu):

```js
var a = [ ];

a[0] = 1;
// no `a[1]` slot set here
a[2] = [ 3 ];

a[1];		// undefined

a.length;	// 3
```

Trong khi điều đó hoạt động, nó có thể dẫn đến một số hành vi khó hiểu với "các vị trí trống" mà bạn để lại ở giữa. Mặc dù vị trí dường như có giá trị `undefined` trong đó, nhưng nó sẽ không hoạt động giống như nếu vị trí được đặt rõ ràng (`a[1] = undefined`). Xem "Array" trong Chương 3 để biết thêm thông tin.

`array` được lập chỉ mục bằng số (như bạn mong đợi), nhưng điều khó khăn là chúng cũng là các object có thể có các keys/properties `string` được thêm vào chúng (nhưng không được tính vào `length` của `array`):

```js
var a = [ ];

a[0] = 1;
a["foobar"] = 2;

a.length;		// 1
a["foobar"];	// 2
a.foobar;		// 2
```

Tuy nhiên, một vấn đề cần lưu ý là nếu một giá trị `string` được dùng làm khóa có thể bị ép buộc thành một `number` cơ sở 10 tiêu chuẩn, thì giả định rằng bạn muốn sử dụng nó làm chỉ mục `number` chứ không phải hơn là một phím `string`!

```js
var a = [ ];

a["13"] = 42;

a.length; // 14
```

Nói chung, không nên thêm các keys/properties `string` vào `array`. Sử dụng `object` để giữ các giá trị trong keys/properties và lưu `array` cho các giá trị được lập chỉ mục bằng số nghiêm ngặt.

### Array-Likes

Sẽ có những lúc bạn cần chuyển đổi một giá trị `array`-like (một tập hợp các giá trị được lập chỉ mục bằng số) thành một `array` thực, thường thì bạn có thể gọi các tiện ích array (như `indexOf(..)`, `concat (..)`, `forEach(..)`, v.v.) đối với collection của các value.

Ví dụ: các hoạt động truy vấn DOM khác nhau trả về danh sách các phần tử DOM không đúng với `array` nhưng đủ giống `array` cho mục đích chuyển đổi của chúng ta. Một ví dụ phổ biến khác là khi các hàm hiển thị object `arguments` (`array`-like) (kể từ ES6, không được dùng nữa) để truy cập các đối số dưới dạng danh sách.

Một cách rất phổ biến để thực hiện chuyển đổi như vậy là mượn tiện ích `slice(..)` đối với giá trị:

```js
function foo() {
	var arr = Array.prototype.slice.call( arguments );
	arr.push( "bam" );
	console.log( arr );
}

foo( "bar", "baz" ); // ["bar","baz","bam"]
```

Nếu `slice()` được gọi mà không có bất kỳ tham số nào khác, vì nó thực sự nằm trong đoạn mã trên, thì các giá trị mặc định cho các tham số của nó có tác dụng sao chép `array` (hoặc, trong trường hợp này, `array`-like) .

Kể từ ES6, cũng có một tiện ích tích hợp có tên `Array.from(..)` có thể thực hiện tác vụ tương tự:

```js
...
var arr = Array.from( arguments );
...
```

**Lưu ý:** `Array.from(..)` có một số khả năng mạnh mẽ và sẽ được đề cập chi tiết trong cuốn *ES6 & Beyond* của bộ sách này.

## Strings

Có một niềm tin rất phổ biến rằng `string` về cơ bản chỉ là `array` ký tự. Mặc dù việc triển khai dưới vỏ bọc có thể sử dụng hoặc không sử dụng `array`, nhưng điều quan trọng là phải nhận ra rằng `string` trong JavaScript thực sự không giống với `array` ký tự. Sự giống nhau chủ yếu chỉ là bề ngoài.

Ví dụ: hãy xem xét hai giá trị sau:

```js
var a = "foo";
var b = ["f","o","o"];
```

Các string thực sự tương đồng với `array` -- `array` giống như trên -- chẳng hạn, cả hai đều có thuộc tính `length`, phương thức `indexOf(..)` (phiên bản `array` chỉ kể từ ES5) và phương thức `concat(..)`:

```js
a.length;							// 3
b.length;							// 3

a.indexOf( "o" );					// 1
b.indexOf( "o" );					// 1

var c = a.concat( "bar" );			// "foobar"
var d = b.concat( ["b","a","r"] );	// ["f","o","o","b","a","r"]

a === c;							// false
b === d;							// false

a;									// "foo"
b;									// ["f","o","o"]
```

Vì vậy, về cơ bản cả hai đều chỉ là "mảng ký tự", phải không? **Không chính xác**:

```js
a[1] = "O";
b[1] = "O";

a; // "foo"
b; // ["f","O","o"]
```

`string` trong JavaScript là immutable (bất biến), trong khi `array` hoàn toàn mutable (có thể thay đổi). Ngoài ra, biểu mẫu truy cập vị trí ký tự `a[1]` không phải lúc nào cũng là JavaScript hợp lệ rộng rãi. Các phiên bản IE cũ hơn không cho phép cú pháp đó (nhưng bây giờ thì có). Thay vào đó, cách tiếp cận *đúng* là `a.charAt(1)`.

Một ảnh hưởng khác của immutable `string` là không phương thức nào của `string` làm thay đổi nội dung của nó có thể sửa đổi tại chỗ, mà phải tạo và trả về `string` mới. Ngược lại, nhiều phương thức thay đổi nội dung `array` thực sự *làm* sửa đổi tại chỗ.

```js
c = a.toUpperCase();
a === c;	// false
a;			// "foo"
c;			// "FOO"

b.push( "!" );
b;			// ["f","O","o","!"]
```

Ngoài ra, nhiều phương thức `array` có thể hữu ích khi xử lý `string` không thực sự có sẵn cho chúng, nhưng chúng ta có thể "mượn" các phương thức `array` non-mutation với `string` của mình:

```js
a.join;			// undefined
a.map;			// undefined

var c = Array.prototype.join.call( a, "-" );
var d = Array.prototype.map.call( a, function(v){
	return v.toUpperCase() + ".";
} ).join( "" );

c;				// "f-o-o"
d;				// "F.O.O."
```

Hãy lấy một ví dụ khác: đảo ngược một `string` (nhân tiện, đây là một câu hỏi đố phỏng vấn JavaScript phổ biến!). `array` có phương thức biến đổi tại chỗ `reverse()`, nhưng `string` thì không:

```js
a.reverse;		// undefined

b.reverse();	// ["!","o","O","f"]
b;				// ["!","o","O","f"]
```

Thật không may, việc "mượn" này không hoạt động với các trình biến đổi `array`, bởi vì `string` là immutable và do đó không thể sửa đổi tại chỗ:

```js
Array.prototype.reverse.call( a );
// still returns a String object wrapper (see Chapter 3)
// for "foo" :(
```

Một cách giải quyết khác (còn gọi là hack) là chuyển đổi `string` thành `array`, thực hiện thao tác mong muốn, sau đó chuyển đổi lại thành `string`.

```js
var c = a
	// split `a` into an array of characters
	.split( "" )
	// reverse the array of characters
	.reverse()
	// join the array of characters back to a string
	.join( "" );

c; // "oof"
```

Nếu điều đó cảm thấy xấu xí, nó là. Tuy nhiên, *nó hoạt động* đối với `string` đơn giản, vì vậy nếu bạn cần thứ gì đó nhanh-và-xấu-xí, thường thì cách tiếp cận như vậy sẽ hoàn thành công việc.

**Cảnh báo:** Hãy cẩn thận! Cách tiếp cận này **không hoạt động** đối với `string` có các ký tự phức tạp (unicode) trong đó (ký hiệu astral, ký tự nhiều byte, v.v.). Bạn cần các tiện ích thư viện phức tạp hơn, nhận biết unicode để các thao tác như vậy được xử lý chính xác. Tham khảo công trình của Mathias Bynens về chủ đề này: *Esrever* (https://github.com/mathiasbynens/esrever).

Một cách khác để xem xét vấn đề này là: nếu bạn thường thực hiện các tác vụ trên "string" của mình mà về cơ bản coi chúng là *mảng ký tự*, thì có lẽ tốt hơn là lưu trữ chúng dưới dạng `array` thay vì `string`. Bạn có thể sẽ tiết kiệm cho mình rất nhiều rắc rối khi chuyển đổi từ `string` sang `array` mỗi lần. Bạn luôn có thể gọi `join("")` trên `array` *ký tự* bất cứ khi nào bạn thực sự cần biểu diễn `string`.

## Numbers

JavaScript chỉ có một loại số: `number`. Loại này bao gồm cả giá trị "số nguyên" và số thập phân phân số. Tôi nói "số nguyên" trong dấu ngoặc kép bởi vì từ lâu người ta đã chỉ trích JS rằng không có số nguyên thực, như trong các ngôn ngữ khác. Điều đó có thể thay đổi vào một thời điểm nào đó trong tương lai, nhưng hiện tại, chúng tôi chỉ có `number` cho mọi thứ.

Vì vậy, trong JS, một "số nguyên" chỉ là một giá trị không có giá trị thập phân phân số. Nghĩa là, `42.0` cũng là một "số nguyên" như `42`.

Giống như hầu hết các ngôn ngữ hiện đại, thực tế bao gồm tất cả các ngôn ngữ tập lệnh, việc triển khai `number` của JavaScript dựa trên tiêu chuẩn "IEEE 754", thường được gọi là "floating-point (dấu chấm động)". JavaScript đặc biệt sử dụng định dạng "double precision (độ chính xác kép)" (còn gọi là "64-bit binary") của tiêu chuẩn.

Có rất nhiều bài viết tuyệt vời trên Web về các chi tiết cơ bản về cách các số dấu phẩy động nhị phân được lưu trữ trong bộ nhớ và ý nghĩa của những lựa chọn đó. Bởi vì việc hiểu các mẫu bit trong bộ nhớ là không cần thiết để hiểu cách sử dụng chính xác `number` trong JS, chúng tôi sẽ để nó như một bài tập cho người đọc quan tâm nếu bạn muốn tìm hiểu sâu hơn về các chi tiết của IEEE 754.

### Numeric Syntax

Chữ số được thể hiện trong JavaScript thường là chữ số thập phân cơ số 10. Ví dụ:

```js
var a = 42;
var b = 42.3;
```

Phần đầu của giá trị thập phân, nếu `0`, là tùy chọn:

```js
var a = 0.42;
var b = .42;
```

Tương tự, phần ở cuối (phân số) của một giá trị thập phân sau `.`, nếu `0`, là tùy chọn:

```js
var a = 42.0;
var b = 42.;
```

**Cảnh báo:** `42.` khá hiếm gặp và có lẽ không phải là ý hay nếu bạn đang cố tránh nhầm lẫn khi người khác đọc mã của bạn. Nhưng nó vẫn hợp lệ.

Theo mặc định, hầu hết `số` sẽ được xuất ra dưới dạng số thập phân cơ số 10, với phân số `0` ở cuối bị loại bỏ. Vì thế:

```js
var a = 42.300;
var b = 42.0;

a; // 42.3
b; // 42
```

Theo mặc định, `số` rất lớn hoặc rất nhỏ sẽ được xuất ra ở dạng số mũ, giống như kết quả của phương thức `toExponential()`, như:

```js
var a = 5E10;
a;					// 50000000000
a.toExponential();	// "5e+10"

var b = a * a;
b;					// 2.5e+21

var c = 1 / a;
c;					// 2e-11
```

Vì các giá trị `number` có thể được đóng hộp bằng trình bao bọc đối tượng `Number` (xem Chương 3), các giá trị `number` có thể truy cập các phương thức được tích hợp trong `Number.prototype` (xem Chương 3). Ví dụ: phương thức `toFixed(..)` cho phép bạn chỉ định có bao nhiêu vị trí thập phân phân số mà bạn muốn giá trị được biểu thị bằng:

```js
var a = 42.59;

a.toFixed( 0 ); // "43"
a.toFixed( 1 ); // "42.6"
a.toFixed( 2 ); // "42.59"
a.toFixed( 3 ); // "42.590"
a.toFixed( 4 ); // "42.5900"
```

Lưu ý rằng đầu ra thực sự là một biểu diễn `string` của `number` và giá trị được đệm `0` ở phía bên tay phải nếu bạn yêu cầu nhiều số thập phân hơn giá trị nắm giữ.

`toPrecision(..)` tương tự, nhưng chỉ định số lượng *chữ số có nghĩa* nên được sử dụng để biểu thị giá trị:

```js
var a = 42.59;

a.toPrecision( 1 ); // "4e+1"
a.toPrecision( 2 ); // "43"
a.toPrecision( 3 ); // "42.6"
a.toPrecision( 4 ); // "42.59"
a.toPrecision( 5 ); // "42.590"
a.toPrecision( 6 ); // "42.5900"
```

Bạn không cần phải sử dụng một biến có giá trị trong đó để truy cập các phương thức này; bạn có thể truy cập trực tiếp các phương thức này trên các chữ `number`. Nhưng bạn phải cẩn thận với toán tử `.`. Vì `.` là một ký tự số hợp lệ, nên trước tiên, ký tự này sẽ được hiểu là một phần của chữ `số`, nếu có thể, thay vì được hiểu là một trình truy cập thuộc tính.

```js
// invalid syntax:
42.toFixed( 3 );	// SyntaxError

// these are all valid:
(42).toFixed( 3 );	// "42.000"
0.42.toFixed( 3 );	// "0.420"
42..toFixed( 3 );	// "42.000"
```

`42.toFixed(3)` là cú pháp không hợp lệ, bởi vì `.` bị nuốt chửng như một phần của chữ `42.` (hợp lệ -- xem ở trên!), và do đó, không có toán tử thuộc tính `.` có mặt để tạo quyền truy cập `.toFixed`.

`42..toFixed(3)` hoạt động vì `.` đầu tiên là một phần của `number` và `.` thứ hai là toán tử thuộc tính. Nhưng nó có thể trông kỳ lạ và thực sự rất hiếm khi thấy thứ gì đó giống như vậy trong mã JavaScript thực tế. Trên thực tế, việc truy cập các phương thức trực tiếp trên bất kỳ giá trị nguyên thủy nào là khá hiếm. Không phổ biến không có nghĩa là *xấu* hoặc *sai*.

**Lưu ý:** Có những thư viện mở rộng `Number.prototype` tích hợp sẵn (xem Chương 3) để cung cấp các thao tác bổ sung trên/với `number`, và vì vậy, trong những trường hợp đó, việc sử dụng thứ gì đó như `10..makeItRain()` để bắt đầu hoạt ảnh cơn mưa tiền dài 10 giây hoặc thứ gì đó ngớ ngẩn khác tương tự.

Điều này cũng hợp lệ về mặt kỹ thuật (chú ý khoảng trắng):

```js
42 .toFixed(3); // "42.000"
```

Tuy nhiên, với chữ `number` cụ thể, **đây là kiểu viết code đặc biệt khó hiểu** và sẽ không phục vụ mục đích nào khác ngoài việc gây nhầm lẫn cho các nhà phát triển khác (và chính bạn trong tương lai). Tránh nó.

`number` cũng có thể được chỉ định ở dạng số mũ, điều này phổ biến khi biểu thị các `number` lớn hơn, chẳng hạn như:

```js
var onethousand = 1E3;						// means 1 * 10^3
var onemilliononehundredthousand = 1.1E6;	// means 1.1 * 10^6
```

Chữ `số` cũng có thể được biểu thị bằng các cơ số khác, như nhị phân, bát phân và thập lục phân.

Các định dạng này hoạt động trong các phiên bản JavaScript hiện tại:

```js
0xf3; // hexadecimal for: 243
0Xf3; // ditto

0363; // octal for: 243
```

**Lưu ý:** Bắt đầu với chế độ ES6 + `strict`, dạng `0363` của các ký tự bát phân không còn được phép nữa (xem bên dưới để biết dạng mới). Biểu mẫu `0363` vẫn được cho phép ở non-`strict` (chế độ không `nghiêm ngặt`), nhưng bạn vẫn nên ngừng sử dụng biểu mẫu này để phù hợp với tương lai (và vì bạn nên sử dụng `strict` mode - chế độ `nghiêm ngặt` - ngay bây giờ!).

Kể từ ES6, các biểu mẫu mới sau đây cũng hợp lệ:

```js
0o363;		// octal for: 243
0O363;		// ditto

0b11110011;	// binary for: 243
0B11110011; // ditto
```

Vui lòng giúp đỡ các nhà phát triển đồng nghiệp của bạn: không bao giờ sử dụng biểu mẫu `0O363`. `0` bên cạnh chữ hoa `O` chỉ là yêu cầu nhầm lẫn. Luôn sử dụng các vị từ viết thường `0x`, `0b` và `0o`.

### Small Decimal Values

Tác dụng phụ - side effect - (trong) nổi tiếng nhất của việc sử dụng các số dấu phẩy động nhị phân (hãy nhớ rằng điều này đúng với **tất cả** các ngôn ngữ sử dụng IEEE 754 -- chứ không phải *chỉ* JavaScript như nhiều người giả định/giả vờ) là:

```js
0.1 + 0.2 === 0.3; // false
```

Về mặt toán học, chúng tôi biết tuyên bố đó phải là `true`. Tại sao nó là `sai`?

Nói một cách đơn giản, các biểu diễn cho `0,1` và `0,2` trong dấu phẩy động nhị phân không chính xác, vì vậy khi chúng được thêm vào, kết quả sẽ không chính xác là `0,3`. Đó là **thực sự** gần: `0,30000000000000004`, nhưng nếu phép so sánh của bạn không thành công, thì "gần" là không liên quan.

**Lưu ý:** JavaScript có nên chuyển sang triển khai `số` khác có biểu diễn chính xác cho tất cả các giá trị không? Một số nghĩ như vậy. Đã có nhiều lựa chọn thay thế được trình bày trong những năm qua. Không ai trong số họ đã được chấp nhận, và có lẽ sẽ không bao giờ. Có vẻ dễ dàng như vẫy tay và nói, "đã sửa lỗi đó rồi!", nhưng gần như không dễ dàng như vậy. Nếu có, chắc chắn nó đã bị thay đổi từ lâu rồi.

Bây giờ, câu hỏi là, nếu một số `number` không thể *đáng tin cậy* chính xác, điều đó có nghĩa là chúng ta hoàn toàn không thể sử dụng `number`? **Dĩ nhiên là không.**

Có một số ứng dụng mà bạn cần phải cẩn thận hơn, đặc biệt là khi xử lý các giá trị thập phân phân số. Ngoài ra còn có rất nhiều ứng dụng (có thể là hầu hết?) Chỉ xử lý các số nguyên ("số nguyên") và hơn nữa, tối đa chỉ xử lý các số trong hàng triệu hoặc hàng nghìn tỷ. Các ứng dụng này đã và sẽ luôn luôn, **hoàn toàn an toàn** để sử dụng các phép toán số trong JS.

Điều gì sẽ xảy ra nếu chúng ta *đã* cần so sánh hai `số`, chẳng hạn như `0,1 + 0,2` với `0,3`, biết rằng phép thử đẳng thức đơn giản không thành công?

Phương pháp được chấp nhận phổ biến nhất là sử dụng một giá trị "lỗi làm tròn" nhỏ làm *dung sai* để so sánh. Giá trị nhỏ này thường được gọi là "epsilon máy", thường là `2^-52` (`2.220446049250313e-16`) cho loại `số` trong JavaScript.

Kể từ ES6, `Number.EPSILON` được xác định trước với giá trị dung sai này, vì vậy bạn muốn sử dụng nó, nhưng bạn có thể điền vào định nghĩa một cách an toàn cho ES6 trước:

```js
if (!Number.EPSILON) {
	Number.EPSILON = Math.pow(2,-52);
}
```

Chúng ta có thể sử dụng `Number.EPSILON` này để so sánh hai `số` cho "so sánh bằng" (trong phạm vi sai số làm tròn):

```js
function numbersCloseEnoughToEqual(n1,n2) {
	return Math.abs( n1 - n2 ) < Number.EPSILON;
}

var a = 0.1 + 0.2;
var b = 0.3;

numbersCloseEnoughToEqual( a, b );					// true
numbersCloseEnoughToEqual( 0.0000001, 0.0000002 );	// false
```

Giá trị dấu phẩy động tối đa có thể được biểu thị là khoảng `1.798e+308` (thực sự, thực sự, rất lớn!), được xác định trước cho bạn là `Number.MAX_VALUE`. Về mặt nhỏ, `Number.MIN_VALUE` gần bằng `5e-324`, không âm nhưng thực sự gần bằng 0!

### Safe Integer Ranges

Do cách biểu diễn của `number`, có một phạm vi giá trị "an toàn" cho toàn bộ "số nguyên" của `number` và nó nhỏ hơn đáng kể so với `Number.MAX_VALUE`.

Số nguyên tối đa có thể được biểu diễn "một cách an toàn" (nghĩa là có sự đảm bảo rằng giá trị được yêu cầu thực sự có thể biểu thị rõ ràng) là `2^53 - 1`, tức là `9007199254740991`. Nếu bạn thêm dấu phẩy vào, bạn sẽ thấy rằng con số này chỉ hơn 9 triệu tỷ. Vì vậy, đó là một con số khá lớn để `số` có phạm vi lên tới.

Giá trị này thực sự được xác định trước tự động trong ES6, dưới dạng `Number.MAX_SAFE_INTEGER`. Không có gì ngạc nhiên khi có một giá trị tối thiểu, `-9007199254740991`, và nó được định nghĩa trong ES6 là `Number.MIN_SAFE_INTEGER`.

Cách chính mà các chương trình JS phải đối mặt với việc xử lý các số lượng lớn như vậy là khi xử lý các ID 64-bit từ cơ sở dữ liệu, v.v. Các số 64-bit không thể được biểu diễn chính xác bằng loại `number`, do đó phải được lưu trữ trong (và truyền đến/từ) JavaScript sử dụng biểu diễn `string`.

Rất may, các phép toán số trên các giá trị `number` ID lớn như vậy (ngoài việc so sánh, sẽ ổn với `string`) không phải là tất cả phổ biến. Nhưng nếu bạn *làm* cần thực hiện phép toán trên những giá trị rất lớn này, thì bây giờ bạn sẽ cần sử dụng tiện ích *big number*. Số lượng lớn có thể nhận được hỗ trợ chính thức trong phiên bản JavaScript trong tương lai.

### Testing for Integers

Để kiểm tra xem một giá trị có phải là số nguyên hay không, bạn có thể sử dụng `Number.isInteger(..)` do ES6 chỉ định:

```js
Number.isInteger( 42 );		// true
Number.isInteger( 42.000 );	// true
Number.isInteger( 42.3 );	// false
```

Để polyfill `Number.isInteger(..)` cho pre-ES6:

```js
if (!Number.isInteger) {
	Number.isInteger = function(num) {
		return typeof num == "number" && num % 1 == 0;
	};
}
```

Để kiểm tra xem một giá trị có phải là *số nguyên an toàn* hay không, hãy sử dụng `Number.isSafeInteger(..)` do ES6 chỉ định:

```js
Number.isSafeInteger( Number.MAX_SAFE_INTEGER );	// true
Number.isSafeInteger( Math.pow( 2, 53 ) );			// false
Number.isSafeInteger( Math.pow( 2, 53 ) - 1 );		// true
```

Để polyfill `Number.isSafeInteger(..)` trong các trình duyệt pre-ES6:

```js
if (!Number.isSafeInteger) {
	Number.isSafeInteger = function(num) {
		return Number.isInteger( num ) &&
			Math.abs( num ) <= Number.MAX_SAFE_INTEGER;
	};
}
```

### 32-bit (Signed) Integers

Mặc dù các số nguyên có thể có phạm vi lên tới khoảng 9 triệu triệu tỷ một cách an toàn (53 bit), nhưng có một số phép toán số (như toán tử theo chiều bit) chỉ được xác định cho `number` 32 bit, do đó, "phạm vi an toàn" cho `number` được sử dụng theo cách đó phải nhỏ hơn nhiều.

Sau đó, phạm vi là `Math.pow(-2,31)` (`-2147483648`, khoảng -2,1 tỷ) cho đến `Math.pow(2,31)-1` (`2147483647`, khoảng +2,1 tỷ) .

Để buộc giá trị `number` trong `a` thành giá trị số nguyên có dấu 32 bit, hãy sử dụng `a | 0`. Điều này hoạt động vì toán tử `|` bitwise chỉ hoạt động đối với các giá trị số nguyên 32 bit (có nghĩa là nó chỉ có thể chú ý đến 32 bit và bất kỳ bit nào khác sẽ bị mất). Sau đó, "hoặc" với số 0 về cơ bản là cách nói không hợp tác.

**Lưu ý:** Một số giá trị đặc biệt (mà chúng tôi sẽ đề cập trong phần tiếp theo) chẳng hạn như `NaN` và `Infinity` không phải là "an toàn 32 bit", trong đó các giá trị đó khi được chuyển đến toán tử bitwise sẽ chuyển qua thao tác trừu tượng `ToInt32` (xem Chương 4) và đơn giản trở thành giá trị `+0` cho mục đích của thao tác bitwise đó.

## Special Values

Có một số giá trị đặc biệt trải rộng trên nhiều loại khác nhau mà *cảnh báo* các nhà phát triển JS cần biết và sử dụng đúng cách.

### The Non-value Values

Đối với loại `undefined`, có một và chỉ một giá trị: `undefined`. Đối với loại `null`, có một và chỉ một giá trị: `null`. Vì vậy, đối với cả hai, nhãn vừa là loại vừa là giá trị của nó.

Cả `undefined` và `null` thường được coi là có thể hoán đổi cho nhau dưới dạng giá trị "trống" hoặc giá trị "không". Các nhà phát triển khác thích phân biệt chúng bằng sắc thái. Ví dụ:

* `null` là một giá trị rỗng
* `undefined` là một giá trị còn thiếu

Hoặc:

* `undefined` vẫn chưa có giá trị
* `null` có một giá trị và không có gì nữa

Bất kể bạn chọn "xác định" và sử dụng hai giá trị này như thế nào, `null` là một từ khóa đặc biệt, không phải là một mã định danh và do đó bạn không thể coi nó như một biến để gán (tại sao bạn lại như vậy!?). Tuy nhiên, `undefined` *là* (không may) một mã định danh. Ờ ồ.

### Undefined

Ở non-`strict` mode, thực sự có thể (mặc dù cực kỳ không nên!) để gán một giá trị cho mã định danh `undefined` được cung cấp trên toàn cục:

```js
function foo() {
	undefined = 2; // really bad idea!
}

foo();
```

```js
function foo() {
	"use strict";
	undefined = 2; // TypeError!
}

foo();
```

Tuy nhiên, ở cả non-`strict` mode và `strict` mode, bạn có thể tạo một biến cục bộ có tên `không xác định`. Nhưng một lần nữa, đây là một ý tưởng khủng khiếp!

```js
function foo() {
	"use strict";
	var undefined = 2;
	console.log( undefined ); // 2
}

foo();
```

**Friends don't let friends override `undefined`.** Ever.

#### `void` Operator

Mặc dù `undefined` là một mã định danh tích hợp giữ (trừ khi được sửa đổi -- xem ở trên!) giá trị `undefined` tích hợp, một cách khác để lấy giá trị này là toán tử `void`.

Biểu thức `void ___` "bỏ trống" bất kỳ giá trị nào để kết quả của biểu thức luôn là giá trị `undefined`. Nó không sửa đổi giá trị hiện có; nó chỉ đảm bảo rằng không có giá trị nào quay lại từ biểu thức toán tử.

```js
var a = 42;

console.log( void a, a ); // undefined 42
```

Theo quy ước (hầu hết từ lập trình ngôn ngữ C), để biểu thị giá trị `undefined` độc lập bằng cách sử dụng `void`, bạn sẽ sử dụng `void 0` (mặc dù rõ ràng là ngay cả `void true` hoặc bất kỳ biểu thức `void` nào khác làm điều tương tự). Không có sự khác biệt thực tế nào giữa `void 0`, `void 1` và `undefined`.

Nhưng toán tử `void` có thể hữu ích trong một vài trường hợp khác, nếu bạn cần đảm bảo rằng một biểu thức không có giá trị kết quả (ngay cả khi nó có side effect).

Cho ví dụ:

```js
function doSomething() {
	// note: `APP.ready` is provided by our application
	if (!APP.ready) {
		// try again later
		return void setTimeout( doSomething, 100 );
	}

	var result;

	// do some other stuff
	return result;
}

// were we able to do it right away?
if (doSomething()) {
	// handle next tasks right away
}
```

Ở đây, hàm `setTimeout(..)` trả về một giá trị số (mã định danh duy nhất của khoảng thời gian hẹn giờ, nếu bạn muốn hủy nó), nhưng chúng tôi muốn `void` để loại bỏ giá trị trả về của hàm của chúng tôi không đưa ra false-positive với câu lệnh `if`.

Nhiều nhà phát triển thích thực hiện các hành động này một cách riêng biệt, hoạt động giống nhau nhưng không sử dụng toán tử `void`:

```js
if (!APP.ready) {
	// try again later
	setTimeout( doSomething, 100 );
	return;
}
```

Nói chung, nếu có một nơi mà một giá trị tồn tại (từ một số biểu thức) và bạn thấy giá trị đó là `undefined` là hữu ích, hãy sử dụng toán tử `void`. Điều đó có thể sẽ không quá phổ biến trong các chương trình của bạn, nhưng trong một số ít trường hợp bạn cần nó, nó có thể khá hữu ích.

### Special Numbers

Loại `number` bao gồm một số giá trị đặc biệt. Chúng ta sẽ xem xét từng chi tiết.

#### The Not Number, Number

Bất kỳ phép toán nào bạn thực hiện mà không có cả hai toán hạng là `number` (hoặc các giá trị có thể được hiểu là `number` thông thường trong cơ số 10 hoặc cơ số 16) sẽ dẫn đến thao tác không thể tạo ra một `number` hợp lệ, trong trường hợp đó bạn sẽ nhận được giá trị `NaN`.

`NaN` theo nghĩa đen là viết tắt của "Not a `Number`", mặc dù nhãn/mô tả này rất kém và dễ gây hiểu lầm, như chúng ta sẽ thấy ngay sau đây. Sẽ chính xác hơn nhiều nếu coi `NaN` là "số không hợp lệ", "số không thành công" hoặc thậm chí là "số xấu" hơn là coi nó là "không phải là số".

Cho ví dụ:

```js
var a = 2 / "foo";		// NaN

typeof a === "number";	// true
```

Nói cách khác: "kiểu not a number là 'number'!" Hoan hô cái tên và ngữ nghĩa khó hiểu.

`NaN` là một loại "giá trị trọng điểm" (một giá trị bình thường khác được gán một ý nghĩa đặc biệt) đại diện cho một loại tình trạng lỗi đặc biệt trong tập hợp `number`. Về bản chất, tình trạng lỗi là: "Tôi đã cố gắng thực hiện một phép toán nhưng không thành công, vì vậy đây là kết quả `number` không thành công."

Vì vậy, nếu bạn có một giá trị trong một số biến và muốn kiểm tra xem liệu đó có phải là số bị lỗi đặc biệt `NaN` này hay không, bạn có thể nghĩ rằng mình có thể so sánh trực tiếp với chính `NaN`, như bạn có thể làm với bất kỳ giá trị nào khác, như `null` hoặc `undefined`. Không.

```js
var a = 2 / "foo";

a == NaN;	// false
a === NaN;	// false
```

`NaN` là một giá trị rất đặc biệt ở chỗ nó không bao giờ bằng một giá trị `NaN` khác (nghĩa là nó không bao giờ bằng chính nó). Trên thực tế, đó là giá trị duy nhất không phản xạ (không có Đặc điểm nhận dạng `x === x`). Vì vậy, `NaN !== NaN`. Hơi lạ nhỉ?

Vậy làm cách nào *làm* chúng tôi kiểm tra nó, nếu chúng tôi không thể so sánh với `NaN` (vì phép so sánh đó sẽ luôn thất bại)?

```js
var a = 2 / "foo";

isNaN( a ); // true
```

Đủ dễ dàng, phải không? Chúng tôi sử dụng tiện ích toàn cầu được tích hợp sẵn có tên là `isNaN(..)` và tiện ích này cho chúng tôi biết liệu giá trị có phải là `NaN` hay không. Vấn đề đã được giải quyết!

Không nhanh như vậy.

Tiện ích `isNaN(..)` có một lỗ hổng nghiêm trọng. Có vẻ như nó đã cố hiểu nghĩa của `NaN` ("Không phải là số") theo nghĩa đen -- rằng công việc của nó về cơ bản là: "kiểm tra xem thứ được truyền vào không phải là `number` hay là `number`." Nhưng điều đó không hoàn toàn chính xác.

```js
var a = 2 / "foo";
var b = "foo";

a; // NaN
b; // "foo"

window.isNaN( a ); // true
window.isNaN( b ); // true -- ouch!
```

Rõ ràng, `"foo"` theo nghĩa đen *không phải là `number`*, nhưng nó chắc chắn cũng không phải là giá trị `NaN`! Lỗi này đã có trong JS ngay từ đầu (hơn 19 năm *ouch*).

Kể từ ES6, cuối cùng một tiện ích thay thế đã được cung cấp: `Number.isNaN(..)`. Một polyfill đơn giản cho nó để bạn có thể kiểm tra an toàn các giá trị `NaN` *ngay bây giờ* ngay cả trong các trình duyệt trước ES6 là:

```js
if (!Number.isNaN) {
	Number.isNaN = function(n) {
		return (
			typeof n === "number" &&
			window.isNaN( n )
		);
	};
}

var a = 2 / "foo";
var b = "foo";

Number.isNaN( a ); // true
Number.isNaN( b ); // false -- phew!
```

Trên thực tế, chúng ta có thể triển khai một polyfill `Number.isNaN(..)` thậm chí còn dễ dàng hơn, bằng cách tận dụng thực tế đặc biệt là `NaN` không bằng chính nó. `NaN` là giá trị *duy nhất* trong toàn bộ ngôn ngữ khi giá trị đó đúng; mọi giá trị khác luôn **bằng chính nó**.

So:

```js
if (!Number.isNaN) {
	Number.isNaN = function(n) {
		return n !== n;
	};
}
```

Lạ nhỉ? Nhưng nó đã có tác dụng!

`NaN` có lẽ là một thực tế trong rất nhiều chương trình JS trong thế giới thực, do mục đích hoặc tình cờ. Bạn nên sử dụng một thử nghiệm đáng tin cậy, chẳng hạn như `Number.isNaN(..)` như được cung cấp (hoặc điền nhiều ký tự), để nhận dạng đúng chúng.

Nếu bạn hiện chỉ đang sử dụng `isNaN(..)` trong một chương trình, thì thực tế đáng buồn là chương trình của bạn *có lỗi*, ngay cả khi bạn chưa bị nó cắn!

#### Infinities

Các nhà phát triển từ các ngôn ngữ được biên dịch truyền thống như C có thể đã quen với việc gặp lỗi trình biên dịch hoặc ngoại lệ thời gian chạy, chẳng hạn như "Chia cho số 0" đối với một thao tác như:

```js
var a = 1 / 0;
```

Tuy nhiên, trong JS, thao tác này được xác định rõ và dẫn đến giá trị `Infinity` (hay còn gọi là `Number.POSITIVE_INFINITY`). không ngạc nhiên:

```js
var a = 1 / 0;	// Infinity
var b = -1 / 0;	// -Infinity
```

Như bạn có thể thấy, `-Infinity` (hay còn gọi là `Number.NEGATIVE_INFINITY`) là kết quả của phép chia cho 0 trong đó một trong hai (nhưng không phải cả hai!) của toán hạng chia là âm.

JS sử dụng các biểu diễn số hữu hạn (floating-point - dấu phẩy động - IEEE 754, mà chúng tôi đã đề cập trước đó), do đó, trái ngược với toán học thuần túy, có vẻ như nó *có thể* bị tràn ngay cả với một phép toán như cộng hoặc trừ, trong trường hợp đó, bạn sẽ nhận được ` Infinity` hoặc `-Infinity`.

Cho minh hoạ:

```js
var a = Number.MAX_VALUE;	// 1.7976931348623157e+308
a + a;						// Infinity
a + Math.pow( 2, 970 );		// Infinity
a + Math.pow( 2, 969 );		// 1.7976931348623157e+308
```

Theo thông số kỹ thuật, nếu một hoạt động như phép cộng dẫn đến một giá trị quá lớn để biểu thị, thì chế độ "vòng đến gần nhất" của IEEE 754 sẽ chỉ định kết quả sẽ là gì. Vì vậy, theo nghĩa thô, `Number.MAX_VALUE + Math.pow( 2, 969 )` gần với `Number.MAX_VALUE` hơn là `Infinity`, do đó, nó "làm tròn xuống", trong khi `Number.MAX_VALUE + Math. pow( 2, 970 )` gần với `Infinity` hơn nên nó "làm tròn lên".

Nếu bạn nghĩ quá nhiều về điều đó, nó sẽ khiến bạn đau đầu. Vì vậy, không. Nghiêm túc, dừng lại!

Tuy nhiên, khi bạn tràn đến một trong các *infinity (vô cực)*, thì sẽ không quay lại được nữa. Nói cách khác, theo một nghĩa gần như thơ mộng, bạn có thể đi từ hữu hạn đến vô hạn nhưng không thể từ vô hạn trở lại hữu hạn.

Câu hỏi gần như mang tính triết học: "Vô cực chia hết cho vô cực là bao nhiêu". Bộ não ngây thơ của chúng ta có thể sẽ nói "1" hoặc có thể là "vô cùng". Hóa ra không phải là sự thật. Cả về mặt toán học và trong JavaScript, `Infinity/Infinity` không phải là một phép toán xác định. Trong JS, điều này dẫn đến `NaN`.

Nhưng còn bất kỳ `number` hữu hạn dương nào chia cho `Infinity` thì sao? Thật dễ dàng! `0`. Còn về `number` hữu hạn âm chia cho `Infinity` thì sao? Hãy đọc tiếp!

#### Zeros

Mặc dù có thể gây nhầm lẫn cho người đọc có đầu óc toán học, nhưng JavaScript có cả số 0 bình thường `0` (còn được gọi là số 0 dương `+0`) *và* số 0 âm `-0`. Trước khi giải thích tại sao `-0` tồn tại, chúng ta nên xem xét cách JS xử lý nó, vì nó có thể khá khó hiểu.

Ngoài việc được chỉ định theo nghĩa đen là `-0`, số 0 âm còn là kết quả của một số phép toán nhất định. Ví dụ:

```js
var a = 0 / -3; // -0
var b = 0 * -3; // -0
```

Phép cộng và phép trừ không thể dẫn đến số 0 âm.

Số 0 âm khi được kiểm tra trong bảng điều khiển dành cho nhà phát triển thường sẽ hiển thị `-0`, mặc dù đó không phải là trường hợp phổ biến cho đến gần đây, vì vậy một số trình duyệt cũ hơn mà bạn gặp vẫn có thể báo cáo là `0`.

Tuy nhiên, nếu bạn cố gắng stringify(xâu chuỗi) một giá trị âm 0, nó sẽ luôn được báo cáo là `"0"`, theo thông số kỹ thuật.

```js
var a = 0 / -3;

// (some browser) consoles at least get it right
a;							// -0

// but the spec insists on lying to you!
a.toString();				// "0"
a + "";						// "0"
String( a );				// "0"

// strangely, even JSON gets in on the deception
JSON.stringify( a );		// "0"
```

Thật thú vị, các hoạt động đảo ngược (đi từ `string` sang `number`) không nói dối:

```js
+"-0";				// -0
Number( "-0" );		// -0
JSON.parse( "-0" );	// -0
```

**Cảnh báo:** Hành vi `JSON.stringify(-0)` của `"0"` đặc biệt lạ khi bạn quan sát thấy rằng nó không nhất quán với điều ngược lại: `JSON.parse("-0")` báo cáo `-0` như bạn mong đợi một cách chính xác.

Ngoài việc xâu chuỗi số 0 âm là đánh lừa để che giấu giá trị thực của nó, các toán tử so sánh cũng (cố ý) được định cấu hình để *nói dối*.

```js
var a = 0;
var b = 0 / -3;

a == b;		// true
-0 == 0;	// true

a === b;	// true
-0 === 0;	// true

0 > -0;		// false
a > b;		// false
```

Rõ ràng, nếu bạn muốn phân biệt `-0` với `0` trong mã của mình, bạn không thể chỉ dựa vào những gì bảng điều khiển dành cho nhà phát triển xuất ra, vì vậy bạn sẽ phải thông minh hơn một chút:

```js
function isNegZero(n) {
	n = Number( n );
	return (n === 0) && (1 / n === -Infinity);
}

isNegZero( -0 );		// true
isNegZero( 0 / -3 );	// true
isNegZero( 0 );			// false
```

Bây giờ, tại sao chúng ta cần một số 0 âm, bên cạnh những câu đố học thuật?

Có một số ứng dụng mà nhà phát triển sử dụng độ lớn của một giá trị để biểu thị một phần thông tin (chẳng hạn như tốc độ di chuyển trên mỗi khung hoạt hình) và dấu của `số` đó để biểu thị một phần thông tin khác (chẳng hạn như hướng của chuyển động đó).

Trong các ứng dụng đó, chẳng hạn, nếu một biến số tiến đến số 0 và nó mất dấu, thì bạn sẽ mất thông tin về hướng mà nó đang di chuyển trước khi nó về số không. Giữ nguyên dấu của số 0 để tránh mất thông tin không mong muốn.

### Special Equality

Như chúng ta đã thấy ở trên, giá trị `NaN` và giá trị `-0` có hành vi đặc biệt khi so sánh đẳng thức. `NaN` không bao giờ bằng chính nó, vì vậy bạn phải sử dụng `Number.isNaN(..)` của ES6 (hoặc một polyfill). Tương tự, `-0` nói dối và giả vờ rằng nó bằng (thậm chí `===` bằng nghiêm ngặt -- xem Chương 4) với `0` dương thông thường, vì vậy bạn phải sử dụng tiện ích `isNegZero(..)` hơi khó hiểu chúng tôi đã đề xuất ở trên.

Kể từ ES6, có một tiện ích mới có thể được sử dụng để kiểm tra hai giá trị cho sự bằng nhau tuyệt đối mà không có bất kỳ ngoại lệ nào trong số này. Nó được gọi là `Object.is(..)`:

```js
var a = 2 / "foo";
var b = -3 * 0;

Object.is( a, NaN );	// true
Object.is( b, -0 );		// true

Object.is( b, 0 );		// false
```

Có một polyfill khá đơn giản cho `Object.is(..)` cho các môi trường trước ES6:

```js
if (!Object.is) {
	Object.is = function(v1, v2) {
		// test for `-0`
		if (v1 === 0 && v2 === 0) {
			return 1 / v1 === 1 / v2;
		}
		// test for `NaN`
		if (v1 !== v1) {
			return v2 !== v2;
		}
		// everything else
		return v1 === v2;
	};
}
```

`Object.is(..)` có lẽ không nên được sử dụng trong các trường hợp `==` hoặc `===` được biết là *an toàn* (xem Chương 4 "Coercion (Ép kiểu)"), vì các toán tử có thể sử dụng nhiều hiệu quả hơn và chắc chắn là thành ngữ/phổ biến hơn. `Object.is(..)` chủ yếu dành cho các trường hợp bình đẳng đặc biệt này.

## Value vs. Reference

Trong nhiều ngôn ngữ khác, các giá trị có thể được gán/chuyển bằng bản sao giá trị hoặc bản sao tham chiếu tùy thuộc vào cú pháp bạn sử dụng.

Ví dụ: trong C++ nếu bạn muốn truyền một biến `number` vào một function và cập nhật giá trị của biến đó, bạn có thể khai báo tham số hàm như `int& myNum` và khi bạn truyền một biến như `x`, ` myNum` sẽ là một **tham chiếu đến `x`**; các tham chiếu giống như một dạng con trỏ đặc biệt, nơi bạn có được một con trỏ tới một biến khác (như một *alias -bí danh-*). Nếu bạn không khai báo một tham số tham chiếu, thì giá trị được truyền vào sẽ *luôn* được sao chép, ngay cả khi đó là một object phức tạp.

Trong JavaScript, không có con trỏ và tham chiếu hoạt động hơi khác một chút. Bạn không thể có tham chiếu từ biến JS này sang biến khác. Điều đó là không thể.

Một tham chiếu trong JS trỏ đến một **giá trị** (được chia sẻ), vì vậy nếu bạn có 10 tham chiếu khác nhau, thì tất cả chúng luôn là các tham chiếu riêng biệt cho một giá trị được chia sẻ duy nhất; **không cái nào trong số chúng là tham chiếu/con trỏ cho nhau.**

Ngoài ra, trong JavaScript, không có gợi ý cú pháp nào kiểm soát giá trị so với việc gán/truyền tham chiếu. Thay vào đó, *loại* của giá trị *chỉ* kiểm soát liệu giá trị đó sẽ được gán bằng bản sao giá trị hay bằng bản sao tham chiếu.

Hãy minh họa:

```js
var a = 2;
var b = a; // `b` is always a copy of the value in `a`
b++;
a; // 2
b; // 3

var c = [1,2,3];
var d = c; // `d` is a reference to the shared `[1,2,3]` value
d.push( 4 );
c; // [1,2,3,4]
d; // [1,2,3,4]
```

Các giá trị đơn giản (aka scalar primitives) *luôn luôn* được gán/truyền bởi bản sao giá trị: `null`, `undefined`, `string`, `number`, `boolean` và `symbol` của ES6.

Các giá trị kết hợp -- `object` (bao gồm `array` và tất cả các trình bao bọc đối tượng được đóng gói -- xem Chương 3) và `function` -- *luôn* tạo một bản sao của tham chiếu khi gán hoặc truyền.

Trong đoạn code trên, vì `2` là một scalar primitive, `a` giữ một bản sao ban đầu của giá trị đó và `b` được gán một *bản sao* khác của giá trị. Khi thay đổi `b`, bạn hoàn toàn không thay đổi giá trị trong `a`.

Nhưng **cả `c` và `d`** đều là các tham chiếu riêng biệt đến cùng một giá trị được chia sẻ `[1,2,3]`, là một giá trị kết hợp. Điều quan trọng cần lưu ý là cả `c` và `d` đều không "sở hữu" giá trị `[1,2,3]` -- cả hai đều chỉ là tham chiếu ngang hàng với giá trị. Vì vậy, khi sử dụng một trong hai tham chiếu để sửa đổi (`.push(4)`) chính giá trị `array` được chia sẻ thực tế, nó chỉ ảnh hưởng đến một giá trị được chia sẻ và cả hai tham chiếu sẽ tham chiếu giá trị mới được sửa đổi `[1,2,3,4]`.

Vì các tham chiếu trỏ đến chính các giá trị chứ không phải các biến, nên bạn không thể sử dụng một tham chiếu để thay đổi nơi một tham chiếu khác được trỏ đến:

```js
var a = [1,2,3];
var b = a;
a; // [1,2,3]
b; // [1,2,3]

// later
b = [4,5,6];
a; // [1,2,3]
b; // [4,5,6]
```

Khi chúng tôi thực hiện phép gán `b = [4,5,6]`, chúng tôi hoàn toàn không làm gì để ảnh hưởng đến *nơi* `a` vẫn đang tham chiếu (`[1,2,3]`). Để làm điều đó, `b` sẽ phải là một con trỏ tới `a` chứ không phải là một tham chiếu tới `array` -- nhưng không có khả năng như vậy tồn tại trong JS!

Cách phổ biến nhất mà sự nhầm lẫn như vậy xảy ra là với các function parameters:

```js
function foo(x) {
	x.push( 4 );
	x; // [1,2,3,4]

	// later
	x = [4,5,6];
	x.push( 7 );
	x; // [4,5,6,7]
}

var a = [1,2,3];

foo( a );

a; // [1,2,3,4]  not  [4,5,6,7]
```

Khi chúng ta truyền đối số `a` vào, nó sẽ gán một bản sao của tham chiếu `a` cho `x`. `x` và `a` là các tham chiếu riêng biệt chỉ vào cùng một giá trị `[1,2,3]`. Bây giờ, bên trong hàm, chúng ta có thể sử dụng tham chiếu đó để thay đổi giá trị của chính nó (`push(4)`). Nhưng khi chúng ta thực hiện phép gán `x = [4,5,6]`, điều này không hề ảnh hưởng đến vị trí tham chiếu ban đầu `a` đang trỏ tới -- vẫn trỏ tới (hiện đã được sửa đổi) `[1,2,3,4]` giá trị.

Không có cách nào sử dụng tham chiếu `x` để thay đổi vị trí trỏ của `a`. Chúng tôi chỉ có thể sửa đổi nội dung của giá trị được chia sẻ mà cả `a` và `x` đều trỏ tới.

Để hoàn thành việc thay đổi `a` để có nội dung giá trị `[4,5,6,7]`, bạn không thể tạo `array` mới và gán -- bạn phải sửa đổi giá trị `array` hiện có:

```js
function foo(x) {
	x.push( 4 );
	x; // [1,2,3,4]

	// later
	x.length = 0; // empty existing array in-place
	x.push( 4, 5, 6, 7 );
	x; // [4,5,6,7]
}

var a = [1,2,3];

foo( a );

a; // [4,5,6,7]  not  [1,2,3,4]
```

Như bạn có thể thấy, `x.length = 0` và `x.push(4,5,6,7)` không tạo `array` mới mà sửa đổi `array` được chia sẻ hiện có. Vì vậy, tất nhiên, `a` tham chiếu nội dung `[4,5,6,7]` mới.

Hãy nhớ rằng: bạn không thể kiểm soát/ghi đè trực tiếp bản sao giá trị so với tham chiếu -- những ngữ nghĩa đó được kiểm soát hoàn toàn bởi loại giá trị cơ bản.

Để chuyển một giá trị phức hợp (chẳng hạn như `mảng`) một cách hiệu quả bằng cách sao chép giá trị, bạn cần tạo một bản sao của giá trị đó theo cách thủ công để tham chiếu được chuyển không còn trỏ đến giá trị gốc. Ví dụ:

```js
foo( a.slice() );
```

Theo mặc định, `slice(..)` không có tham số sẽ tạo một bản sao hoàn toàn mới (shallow) của `array`. Vì vậy, chúng tôi chỉ chuyển tham chiếu đến `array` đã sao chép và do đó `foo(..)` không thể ảnh hưởng đến nội dung của `a`.

Để thực hiện ngược lại -- chuyển một giá trị scala primitive theo cách mà giá trị cập nhật của nó có thể được nhìn thấy, giống như một tham chiếu -- bạn phải bọc giá trị đó trong một giá trị phức hợp khác (`object`, `symbol`, v.v.) *có thể* được chuyển qua bản sao tham chiếu:

```js
function foo(wrapper) {
	wrapper.a = 42;
}

var obj = {
	a: 2
};

foo( obj );

obj.a; // 42
```

Ở đây, `obj` hoạt động như một trình bao bọc cho thuộc tính scalar primitive `a`. Khi được chuyển đến `foo(..)`, một bản sao của tham chiếu `obj` được chuyển vào và đặt thành tham số `wrapper`. Bây giờ chúng ta có thể sử dụng tham chiếu `wrapper` để truy cập đối tượng được chia sẻ và cập nhật thuộc tính của nó. Sau khi hàm kết thúc, `obj.a` sẽ thấy giá trị được cập nhật là `42`.

Có thể xảy ra với bạn rằng nếu bạn muốn chuyển tham chiếu đến một giá trị scalar primitive như `2`, bạn chỉ cần đóng hộp giá trị đó trong trình bao bọc object `Number` của nó (xem Chương 3).

Bản sao của tham chiếu đến đối tượng `Number` này *sẽ* được truyền cho hàm *là* đúng, nhưng thật không may, việc có tham chiếu đến đối tượng được chia sẻ sẽ không cung cấp cho bạn khả năng sửa đổi giá trị primitive được chia sẻ, như bạn có thể mong đợi:

```js
function foo(x) {
	x = x + 1;
	x; // 3
}

var a = 2;
var b = new Number( a ); // or equivalently `Object(a)`

foo( b );
console.log( b ); // 2, not 3
```

Vấn đề là giá trị scalar primitive cơ bản *not mutable (không thể thay đổi)* (tương tự với `String` và `Boolean`). Nếu một đối tượng `Number` giữ giá trị scalar primitive `2`, thì đối tượng `Number` chính xác đó không bao giờ có thể được thay đổi để giữ một giá trị khác; bạn chỉ có thể tạo một đối tượng `Number` hoàn toàn mới với một giá trị khác.

Khi `x` được sử dụng trong biểu thức `x + 1`, giá trị scalar primitive `2` sẽ tự động được mở hộp (trích xuất) khỏi đối tượng `Number`, do đó, dòng `x = x + 1` thay đổi rất tinh vi ` x` từ một tham chiếu được chia sẻ đến đối tượng `Number`, sang việc chỉ giữ giá trị scalar primitive `3` do hoạt động cộng `2 + 1`. Do đó, `b` ở bên ngoài vẫn tham chiếu đến đối tượng `Number` không thay đổi/bất biến ban đầu đang giữ giá trị `2`.

Bạn *có thể* thêm các thuộc tính lên trên đối tượng `Number` (chỉ cần không thay đổi giá trị primitive bên trong của nó), vì vậy bạn có thể trao đổi thông tin gián tiếp thông qua các thuộc tính bổ sung đó.

Tuy nhiên, đây không phải là tất cả những gì phổ biến; nó có thể sẽ không được hầu hết các nhà phát triển coi là một phương pháp hay.

Thay vì sử dụng đối tượng trình bao bọc `Number` theo cách này, có lẽ tốt hơn nhiều là sử dụng cách tiếp cận trình bao bọc đối tượng thủ công (`obj`) trong đoạn mã trước đó. Điều đó không có nghĩa là không có cách sử dụng thông minh nào cho các trình bao bọc đối tượng được đóng hộp như `Number` -- chỉ là bạn có thể thích dạng giá trị scalar primitive hơn trong hầu hết các trường hợp.

Tham chiếu khá mạnh mẽ, nhưng đôi khi chúng cản trở bạn và đôi khi bạn cần chúng khi chúng không tồn tại. Kiểm soát duy nhất mà bạn có đối với hành vi tham chiếu so với hành vi sao chép giá trị là loại của chính giá trị đó, vì vậy bạn phải gián tiếp tác động đến hành vi gán/truyền theo loại giá trị mà bạn chọn sử dụng.

## Review

Trong JavaScript, `array` chỉ đơn giản là các tập hợp được lập chỉ mục bằng số của bất kỳ loại giá trị nào. `string` hơi giống "`array`", nhưng chúng có các hành vi riêng biệt và bạn phải cẩn thận nếu bạn muốn coi chúng là `array`. Các số trong JavaScript bao gồm cả giá trị "số nguyên" và dấu phẩy động.

Một số giá trị đặc biệt được xác định trong các kiểu nguyên thủy(primitive types).

Loại `null` chỉ có một giá trị: `null` và tương tự như vậy, loại `undefined` chỉ có giá trị `undefined`. `undefined` về cơ bản là giá trị mặc định trong bất kỳ biến hoặc thuộc tính nào nếu không có giá trị nào khác. Toán tử `void` cho phép bạn tạo giá trị `undefined` từ bất kỳ giá trị nào khác.

`number` bao gồm một số giá trị đặc biệt, như `NaN` (được cho là "Không phải là số", nhưng thực sự thích hợp hơn là "số không hợp lệ"); `+Infinity` và `-Infinity`; và `-0`.

Các scalar primitive đơn giản (`string`, `number`, v.v.) được gán/truyền bởi bản sao giá trị, nhưng các giá trị phức hợp (`object`, v.v.) được gán/truyền bởi bản sao tham chiếu. Tham chiếu không giống như tham chiếu/con trỏ trong các ngôn ngữ khác -- chúng không bao giờ được trỏ vào các biến/tham chiếu khác, chỉ vào các giá trị cơ bản.
