# You Don't Know JS: Types & Grammar
# Chapter 3: Natives

Nhiều lần trong Chương 1 và 2, chúng tôi đã ám chỉ đến nhiều build-in khác nhau, thường được gọi là "native", như `String` và `Number`. Bây giờ chúng ta hãy xem xét những điều đó một cách chi tiết.

Dưới đây là danh sách những native được sử dụng phổ biến nhất:

* `String()`
* `Number()`
* `Boolean()`
* `Array()`
* `Object()`
* `Function()`
* `RegExp()`
* `Date()`
* `Error()`
* `Symbol()` -- được thêm trong ES6!

Như bạn có thể thấy, những native này thực sự là các build-in function.

Nếu bạn đến với JS từ một ngôn ngữ như Java, thì `String()` của JavaScript sẽ trông giống như hàm tạo `String(..)` mà bạn đã quen dùng để tạo các giá trị string. Vì vậy, bạn sẽ nhanh chóng nhận thấy rằng bạn có thể làm những việc như:

```js
var s = new String( "Hello World!" );

console.log( s.toString() ); // "Hello World!"
```

Nó *là* đúng là phần tử trong số những native này có thể được sử dụng làm native constructor. Nhưng những gì đang được xây dựng có thể khác với bạn nghĩ.

```js
var a = new String( "abc" );

typeof a; // "object" ... not "String"

a instanceof String; // true

Object.prototype.toString.call( a ); // "[object String]"
```

Kết quả của hình thức tạo giá trị của hàm tạo (`new String("abc")`) là một object wrapper xung quanh giá trị primitive (`"abc"`).

Điều quan trọng là, `typeof` cho thấy rằng các đối tượng này không phải là *loại* đặc biệt của riêng chúng, mà đúng hơn là chúng là các subtype của loại `object`.

object wrapper này có thể được quan sát thêm với:

```js
console.log( a );
```

Đầu ra của câu lệnh đó khác nhau tùy thuộc vào trình duyệt của bạn, vì bảng điều khiển dành cho nhà phát triển được tự do lựa chọn tuy nhiên họ cảm thấy việc sắp xếp theo thứ tự đối tượng để nhà phát triển kiểm tra là phù hợp.

**Lưu ý:** Tại thời điểm viết bài này, Chrome mới nhất in nội dung như sau: `String {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]] :"abc"}`. Nhưng các phiên bản Chrome cũ hơn thường chỉ in: `Chuỗi {0: "a", 1: "b", 2: "c"}`. Firefox mới nhất hiện in `Chuỗi ["a","b","c"]`, nhưng được sử dụng để in `"abc"` in nghiêng, có thể nhấp vào để mở trình kiểm tra đối tượng. Tất nhiên, những kết quả này có thể thay đổi nhanh chóng và trải nghiệm của bạn có thể thay đổi.

Vấn đề là, `new String("abc")` tạo một string object wrapper xung quanh `"abc"`, chứ không chỉ bản thân giá trị `"abc"` primitive.

## Internal `[[Class]]`

Các giá trị là `typeof` `"object"` (chẳng hạn như một array) được gắn thẻ bổ sung với thuộc tính `[[Class]]` bên trong (hãy coi đây là một *class*ification -phân loại nội bộ- hơn là liên quan đến các class từ truyền thống class-oriented coding). Thuộc tính này không thể được truy cập trực tiếp, nhưng thường có thể được tiết lộ gián tiếp bằng cách mượn phương thức `Object.prototype.toString(..)` mặc định được gọi đối với giá trị. Ví dụ:

```js
Object.prototype.toString.call( [1,2,3] );			// "[object Array]"

Object.prototype.toString.call( /regex-literal/i );	// "[object RegExp]"
```

Vì vậy, đối với array trong ví dụ này, giá trị `[[Class]]` bên trong là `"Array"` và đối với biểu thức chính quy, đó là `"RegExp"`. Trong hầu hết các trường hợp, giá trị `[[Class]]` bên trong này tương ứng với hàm tạo riêng được tích hợp sẵn (xem bên dưới) có liên quan đến giá trị, nhưng không phải lúc nào cũng vậy.

Còn các giá trị nguyên thủy thì sao? Đầu tiên, `null` và `undefined`:

```js
Object.prototype.toString.call( null );			// "[object Null]"
Object.prototype.toString.call( undefined );	// "[object Undefined]"
```

Bạn sẽ lưu ý rằng không có `Null()` hoặc `Undefined()` native constructors, tuy nhiên, `"Null"` và `"Undefined"` là các giá trị `[[Class]]` bên trong được hiển thị.

Nhưng đối với các primitive đơn giản khác như `string`, `number` và `boolean`, một hành vi khác thực sự bắt đầu, thường được gọi là "boxing" (xem phần "Boxing Wrappers" tiếp theo):

```js
Object.prototype.toString.call( "abc" );	// "[object String]"
Object.prototype.toString.call( 42 );		// "[object Number]"
Object.prototype.toString.call( true );		// "[object Boolean]"
```

Trong đoạn code này, mỗi primitive đơn giản được tự động đóng hộp bởi các object wrapper tương ứng của chúng, đó là lý do tại sao `"String"`, `"Number"` và `"Boolean"` được hiển thị dưới dạng `[[Class]]` bên trong tương ứng giá trị.

**Lưu ý:** Hành vi của `toString()` và `[[Class]]` như được minh họa ở đây đã thay đổi một chút từ ES5 sang ES6, nhưng chúng tôi đề cập đến những chi tiết đó trong cuốn *ES6 & Beyond* của bộ sách này.

## Boxing Wrappers

Các object wrapper (trình bao bọc đối tượng) này phục vụ một mục đích rất quan trọng. Các giá trị primitive không có thuộc tính hoặc phương thức, do đó, để truy cập `.length` hoặc `.toString()`, bạn cần có một object wrapper xung quanh giá trị. Rất may, JS sẽ tự động *box* (còn gọi là gói) giá trị primitive để thực hiện các truy cập đó.

```js
var a = "abc";

a.length; // 3
a.toUpperCase(); // "ABC"
```

Vì vậy, nếu bạn định truy cập thường xuyên các properties/methods này trên các giá trị string của mình, chẳng hạn như điều kiện `i < a.length` trong vòng lặp `for`, thì có vẻ hợp lý khi chỉ có object dạng của giá trị ngay từ đầu, vì vậy công cụ JS không cần phải ngầm tạo nó cho bạn.

Nhưng hóa ra đó là một ý tưởng tồi. Các trình duyệt từ lâu đã tối ưu hóa hiệu suất cho các trường hợp phổ biến như `.length`, có nghĩa là chương trình của bạn *thực sự sẽ chậm hơn* nếu bạn cố gắng "tối ưu hóa trước" bằng cách sử dụng trực tiếp object form (không nằm trên đường dẫn được tối ưu hóa).

Nói chung, về cơ bản không có lý do gì để sử dụng trực tiếp object form. Tốt hơn là cứ để đóng gói diễn ra ngầm khi cần thiết. Nói cách khác, đừng bao giờ làm những việc như `new String("abc")`, `new Number(42)`, v.v. -- luôn ưu tiên sử dụng các giá trị primitive theo nghĩa đen `"abc"` và `42`.

### Object Wrapper Gotchas

Có một số vấn đề với việc sử dụng trực tiếp các object wrapper mà bạn nên biết nếu bạn *hành động* chọn sử dụng chúng.

Ví dụ: xem xét các giá trị được bao bọc bởi `Boolean`:

```js
var a = new Boolean( false );

if (!a) {
	console.log( "Oops" ); // never runs
}
```

Vấn đề là bạn đã tạo một object wrapper(trình bao bọc đối tượng) xung quanh giá trị `false`, nhưng bản thân các object là "truthy" (xem Chương 4), do đó, việc sử dụng object sẽ có hành vi ngược lại với việc sử dụng chính giá trị `false` bên dưới, điều này khá trái với mong đợi thông thường.

Nếu bạn muốn đóng hộp một giá trị nguyên thủy theo cách thủ công, bạn có thể sử dụng hàm `Object(..)` (không có từ khóa `new`):

```js
var a = "abc";
var b = new String( a );
var c = Object( a );

typeof a; // "string"
typeof b; // "object"
typeof c; // "object"

b instanceof String; // true
c instanceof String; // true

Object.prototype.toString.call( b ); // "[object String]"
Object.prototype.toString.call( c ); // "[object String]"
```

Một lần nữa, việc sử dụng trực tiếp trình bao bọc đối tượng được đóng hộp (như `b` và `c` ở trên) thường không được khuyến khích, nhưng có thể có một số trường hợp hiếm gặp mà bạn sẽ gặp phải khi chúng có thể hữu ích.

## Unboxing

Nếu bạn có một object wrapper và bạn muốn lấy giá trị primitive cơ bản ra, bạn có thể sử dụng phương thức `valueOf()`:

```js
var a = new String( "abc" );
var b = new Number( 42 );
var c = new Boolean( true );

a.valueOf(); // "abc"
b.valueOf(); // 42
c.valueOf(); // true
```

Unboxing cũng có thể xảy ra hoàn toàn, khi sử dụng giá trị object wrapper theo cách yêu cầu giá trị primitive. Quá trình này (ép kiểu) sẽ được đề cập chi tiết hơn trong Chương 4, nhưng ngắn gọn:

```js
var a = new String( "abc" );
var b = a + ""; // `b` has the unboxed primitive value "abc"

typeof a; // "object"
typeof b; // "string"
```

## Natives as Constructors

Đối với các giá trị `array`, `object`, `function` và regular-expression, hầu như mọi người đều ưa thích sử dụng literal form để tạo các giá trị, nhưng dạng chữ tạo ra cùng một loại object như constructor form (dạng hàm tạo) (nghĩa là không có nonwrapped value).

Cũng giống như chúng ta đã thấy ở trên với những natives khác, nói chung nên tránh các dạng constructor form (hàm tạo) này, trừ khi bạn thực sự biết mình cần chúng, chủ yếu là vì chúng đưa ra các ngoại lệ và vấn đề mà bạn có thể không thực sự *muốn* giải quyết.

### `Array(..)`

```js
var a = new Array( 1, 2, 3 );
a; // [1, 2, 3]

var b = [1, 2, 3];
b; // [1, 2, 3]
```

**Note:** constructor `Array(..)` không yêu cầu từ khóa `new` phía trước nó. Nếu bạn bỏ qua nó, nó sẽ hoạt động như thể bạn đã sử dụng nó. Vì vậy, `Array(1,2,3)` có cùng kết quả với `new Array(1,2,3)`.

constructor `Array` có một dạng đặc biệt trong đó nếu chỉ một đối số `number` được truyền, thay vì cung cấp giá trị đó dưới dạng *nội dung* của mảng, thì nó được lấy làm độ dài để "đặt trước kích thước mảng" (tốt, sắp xếp).

Đây là một ý tưởng khủng khiếp. Thứ nhất, bạn có thể vô tình lướt qua biểu mẫu đó vì nó rất dễ quên.

Nhưng quan trọng hơn, không có thứ gọi là thực sự định cỡ mảng. Thay vào đó, những gì bạn đang tạo là một mảng trống, nhưng đặt thuộc tính `length` của mảng thành giá trị số được chỉ định.

Một mảng không có giá trị rõ ràng trong các vị trí của nó, nhưng có thuộc tính `length` *ngụ ý* các vị trí tồn tại, là một kiểu cấu trúc dữ liệu kỳ lạ trong JS với một số hành vi rất kỳ lạ và khó hiểu. Khả năng tạo ra một giá trị như vậy hoàn toàn đến từ các chức năng lịch sử cũ, không dùng nữa ("các đối tượng giống như mảng" như đối tượng `arguments`).

**Lưu ý:** Một mảng có ít nhất một "khe trống" trong nó thường được gọi là "sparse array (mảng thưa)".

Vấn đề không phải là đây là một ví dụ khác trong đó bảng điều khiển dành cho nhà phát triển trình duyệt khác nhau về cách chúng thể hiện một đối tượng như vậy, điều này gây ra nhiều nhầm lẫn hơn.

Cho ví dụ:

```js
var a = new Array( 3 );

a.length; // 3
a;
```

Số thứ tự của `a` trong Chrome là (tại thời điểm viết): `[ undefined x 3 ]`. **Điều này thực sự đáng tiếc.** Nó ngụ ý rằng có ba giá trị `undefined` trong các vị trí của mảng này, trong khi thực tế các vị trí đó không tồn tại (cái gọi là "empty slots" -- cũng là một cái tên xấu!) .

Để hình dung sự khác biệt, hãy thử điều này:

```js
var a = new Array( 3 );
var b = [ undefined, undefined, undefined ];
var c = [];
c.length = 3;

a;
b;
c;
```

**Lưu ý:** Như bạn có thể thấy với `c` trong ví dụ này, các vị trí trống trong một mảng có thể xảy ra sau khi tạo mảng. Thay đổi `độ dài` của một mảng để vượt quá số lượng giá trị vị trí được xác định thực tế của nó, bạn ngầm giới thiệu các vị trí trống. Trên thực tế, bạn thậm chí có thể gọi `delete b[1]` trong đoạn mã trên và nó sẽ đưa một vị trí trống vào giữa `b`.

Đối với `b` (hiện tại, trong Chrome), bạn sẽ thấy `[ undefined, undefined, undefined ]` dưới dạng tuần tự hóa, trái ngược với `[ undefined x 3 ]` cho `a` và `c`. Bối rối? Vâng, những người khác cũng vậy.

Tệ hơn nữa, tại thời điểm viết bài này, Firefox báo cáo `[ , , , ]` cho `a` và `c`. Bạn có hiểu tại sao điều đó lại khó hiểu không? Nhìn kĩ. Ba dấu phẩy ngụ ý bốn vị trí chứ không phải ba vị trí như chúng ta mong đợi.

**Cái gì!?** Firefox đặt thêm `,` vào cuối chuỗi tuần tự hóa của chúng ở đây vì kể từ ES5, các dấu phẩy ở cuối danh sách (giá trị mảng, danh sách thuộc tính, v.v.) được cho phép (và do đó bị loại bỏ và bỏ qua). Vì vậy, nếu bạn nhập giá trị `[ , , , ]` vào chương trình hoặc bảng điều khiển của mình, bạn thực sự sẽ nhận được giá trị cơ bản giống như `[ , , ]` (nghĩa là một mảng có ba vị trí trống) . Lựa chọn này, mặc dù gây nhầm lẫn nếu đọc bảng điều khiển dành cho nhà phát triển, nhưng được bảo vệ vì thay vào đó làm cho hành vi sao chép và dán chính xác.

Nếu bây giờ bạn đang lắc đầu hoặc đảo mắt, thì bạn không đơn độc đâu! Nhún vai.

Thật không may, nó trở nên tồi tệ hơn. Không chỉ là đầu ra của bảng điều khiển gây nhầm lẫn, `a` và `b` từ đoạn code trên thực sự hoạt động giống nhau trong một số trường hợp **nhưng khác trong các trường hợp khác**:

```js
a.join( "-" ); // "--"
b.join( "-" ); // "--"

a.map(function(v,i){ return i; }); // [ undefined x 3 ]
b.map(function(v,i){ return i; }); // [ 0, 1, 2 ]
```

**Ugh.**

Lệnh gọi `a.map(..)` *không thành công* vì các vị trí không thực sự tồn tại, vì vậy `map(..)` không có gì để lặp lại. `join(..)` hoạt động theo cách khác. Về cơ bản, chúng ta có thể nghĩ về nó được triển khai như thế này:

```js
function fakeJoin(arr,connector) {
	var str = "";
	for (var i = 0; i < arr.length; i++) {
		if (i > 0) {
			str += connector;
		}
		if (arr[i] !== undefined) {
			str += arr[i];
		}
	}
	return str;
}

var a = new Array( 3 );
fakeJoin( a, "-" ); // "--"
```

Như bạn có thể thấy, `join(..)` hoạt động chỉ bằng cách *giả sử* các vị trí tồn tại và lặp đến giá trị `length`. Bất kể `map(..)` làm gì bên trong, nó (dường như) không đưa ra giả định như vậy, do đó, kết quả từ mảng "empty slots" lạ là không mong muốn và có khả năng gây ra lỗi.

Vì vậy, nếu bạn muốn *thực sự* tạo một mảng các giá trị `không xác định` thực tế (không chỉ là "các vị trí trống"), bạn có thể làm điều đó như thế nào (ngoài cách thủ công)?

```js
var a = Array.apply( null, { length: 3 } );
a; // [ undefined, undefined, undefined ]
```

Bối rối? Vâng. Đây là cách nó hoạt động.

`apply(..)` là một utility(tiện ích) có sẵn cho tất cả các function, nó gọi function được sử dụng nhưng theo một cách đặc biệt.

Đối số đầu tiên là ràng buộc đối tượng `this` (có trong tập *this & Object Prototypes* của bộ sách này), mà chúng tôi không quan tâm ở đây, vì vậy chúng tôi đặt nó thành `null`. Đối số thứ hai được cho là một mảng (hoặc thứ gì đó *giống như* một mảng -- hay còn gọi là "array-like object"). Nội dung của "array" này được "trải rộng" dưới dạng đối số cho hàm được đề cập.

Vì vậy, `Array.apply(..)` đang gọi hàm `Array(..)` và phân bổ các giá trị (của giá trị đối tượng `{ length: 3 }`) làm đối số của nó.

Bên trong `apply(..)`, chúng ta có thể hình dung có một vòng lặp `for` khác (giống như `join(..)` ở trên) đi từ `0` lên, nhưng không bao gồm `length` (`3` trong trường hợp của chúng tôi).

Đối với mỗi index, nó lấy khóa đó từ đối tượng. Vì vậy, nếu tham số đối tượng mảng được đặt tên `arr` bên trong hàm `apply(..)`, thì quyền truy cập thuộc tính sẽ thực sự là `arr[0]`, `arr[1]` và `arr[2]`. Tất nhiên, không thuộc tính nào trong số đó tồn tại trên giá trị đối tượng `{ length: 3 }`, vì vậy cả ba lần truy cập thuộc tính đó sẽ trả về giá trị `undefined`.

Nói cách khác, nó kết thúc việc gọi `Array(..)` về cơ bản như sau: `Array(undefined, undefined, undefined)`, đó là cách chúng ta kết thúc với một mảng chứa đầy các giá trị `undefined`, và không chỉ những giá trị đó khe trống.

Mặc dù `Array.apply( null, { length: 3 } )` là một cách kỳ lạ và dài dòng để tạo một mảng chứa đầy các giá trị `undefined`, nhưng nó **rất** tốt hơn và đáng tin cậy hơn những gì bạn nhận được với các ô trống `Array(3)`.

Điểm mấu chốt: **không bao giờ, trong mọi trường hợp**, nếu bạn cố tình tạo và sử dụng các array có khe trống kỳ lạ này. Chỉ cần không làm điều đó. Nó kinh khủng.

### `Object(..)`, `Function(..)`, and `RegExp(..)`

Các constructor(hàm tạo) `Object(..)`/`Function(..)`/`RegExp(..)` nói chung cũng là tùy chọn (và do đó thường nên tránh trừ khi được yêu cầu cụ thể):

```js
var c = new Object();
c.foo = "bar";
c; // { foo: "bar" }

var d = { foo: "bar" };
d; // { foo: "bar" }

var e = new Function( "a", "return a * 2;" );
var f = function(a) { return a * 2; };
function g(a) { return a * 2; }

var h = new RegExp( "^a*b+", "g" );
var i = /^a*b+/g;
```

Thực tế không có lý do gì để sử dụng biểu mẫu hàm tạo `new Object()`, đặc biệt là vì nó buộc bạn phải thêm từng thuộc tính thay vì nhiều thuộc tính cùng một lúc ở dạng literal form.

Constructor `Function` chỉ hữu ích trong những trường hợp hiếm gặp nhất, khi bạn cần xác định động các tham số của function và/hoặc thân function của nó. **Đừng chỉ coi `Function(..)` là một dạng thay thế của `eval(..)`.** Hầu như bạn sẽ không bao giờ cần phải xác định động một function theo cách này.

Các biểu thức chính quy được xác định ở literal form (`/^a*b+/g`) được ưu tiên mạnh mẽ, không chỉ vì dễ sử dụng cú pháp mà còn vì lý do hiệu suất -- công cụ JS biên dịch trước và lưu trữ chúng trước khi thực thi mã. Không giống như các biểu mẫu hàm tạo khác mà chúng ta đã thấy cho đến nay, `RegExp(..)` có một số tiện ích hợp lý: để xác định động mẫu cho một biểu thức chính quy.

```js
var name = "Kyle";
var namePattern = new RegExp( "\\b(?:" + name + ")+\\b", "ig" );

var matches = someText.match( namePattern );
```

Loại tình huống này thỉnh thoảng xảy ra một cách hợp pháp trong các chương trình JS, vì vậy bạn cần sử dụng biểu mẫu `new RegExp("pattern","flags")`.

### `Date(..)` and `Error(..)`

Các native constructors (hàm tạo gốc) `Date(..)` và `Error(..)` hữu ích hơn nhiều so với các hàm tạo gốc khác, bởi vì không có literal form cho cả hai.

Để tạo một giá trị đối tượng ngày tháng, bạn phải sử dụng `new Date()`. Hàm tạo `Date(..)` chấp nhận các đối số tùy chọn để chỉ định ngày/giờ sẽ sử dụng, nhưng nếu bị bỏ qua, thì ngày/giờ hiện tại sẽ được giả định.

Cho đến nay, lý do phổ biến nhất mà bạn xây dựng một đối tượng ngày là để lấy giá trị dấu thời gian hiện tại (số nguyên mili giây đã đánh dấu kể từ ngày 1 tháng 1 năm 1970). Bạn có thể làm điều này bằng cách gọi `getTime()` trên một date object instance.

Nhưng một cách thậm chí còn dễ dàng hơn là gọi hàm trợ giúp tĩnh được định nghĩa từ ES5: `Date.now()`. Và để polyfill cho pre-ES5 khá dễ dàng:

```js
if (!Date.now) {
	Date.now = function(){
		return (new Date()).getTime();
	};
}
```

**Lưu ý:** Nếu bạn gọi `Date()` mà không có `new`, bạn sẽ nhận được một chuỗi đại diện cho ngày/giờ tại thời điểm đó. Hình thức chính xác của biểu diễn này không được chỉ định trong thông số ngôn ngữ, mặc dù các trình duyệt có xu hướng đồng ý về một điều gì đó gần giống với: `"Fri Jul 18 2014 00:31:02 GMT-0500 (CDT)"`.

`Error(..)` constructor (cũng giống `Array()` ở trên) hoạt động tương tự với từ khóa `new` hiện tại hoặc bị bỏ qua.

Lý do chính mà bạn muốn tạo một error object là vì nó captures the current execution stack context (nắm bắt ngữ cảnh ngăn xếp thực thi hiện tại) vào object (trong hầu hết các công cụ JS, được hiển thị dưới dạng thuộc tính `.stack` chỉ đọc sau khi được tạo). Stack context này bao gồm function call-stack(ngăn xếp lệnh gọi hàm) và số dòng nơi đối tượng lỗi được tạo, giúp việc gỡ lỗi đó dễ dàng hơn nhiều.

Thông thường, bạn sẽ sử dụng một đối tượng lỗi như vậy với toán tử `throw`:

```js
function foo(x) {
	if (!x) {
		throw new Error( "x wasn't provided" );
	}
	// ..
}
```

Các Error object instances thường có ít nhất một thuộc tính `message` và đôi khi là các thuộc tính khác (mà bạn nên coi là readonly), như `type`. Tuy nhiên, ngoài việc kiểm tra thuộc tính `stack` đã đề cập ở trên, tốt nhất bạn chỉ nên gọi `toString()` trên error object (một cách rõ ràng hoặc ngầm định thông qua ép kiểu -- xem Chương 4) để nhận được một lỗi có định dạng thân thiện tin nhắn.

**Mẹo:** Về mặt kỹ thuật, ngoài kiểu `Error(..)` native, còn có một số kiểu specific-error-type (loại lỗi cụ thể) native khác: `EvalError(..)`, `RangeError(..)`, ` ReferenceError(..)`, `SyntaxError(..)`, `TypeError(..)` và `URIError(..)`. Nhưng rất hiếm khi sử dụng thủ công các specific error natives này. Chúng được tự động sử dụng nếu chương trình của bạn thực sự gặp phải một ngoại lệ thực sự (chẳng hạn như tham chiếu một biến không được khai báo và gặp lỗi `ReferenceError`).

### `Symbol(..)`

Mới kể từ ES6, một loại giá trị primitive bổ sung đã được thêm vào, được gọi là "Symbol". Các symbol(ký hiệu) là các giá trị "duy nhất" đặc biệt (không được đảm bảo nghiêm ngặt!) có thể được sử dụng làm thuộc tính trên các object mà không sợ va chạm. Chúng được thiết kế chủ yếu cho các hành vi tích hợp sẵn đặc biệt của các cấu trúc ES6, nhưng bạn cũng có thể xác định các symbol của riêng mình.

Các symbol có thể được sử dụng làm tên thuộc tính nhưng bạn không thể xem hoặc truy cập giá trị thực của một symbol từ chương trình của mình cũng như từ developer console. Ví dụ: nếu bạn đánh giá một symbol trong bảng điều khiển dành cho nhà phát triển, những gì được hiển thị sẽ giống như `Symbol(Symbol.create)`.

Có một số symbol được xác định trước trong ES6, được truy cập dưới dạng thuộc tính tĩnh của đối tượng hàm `Symbol`, như `Symbol.create`, `Symbol.iterator`, v.v. Để sử dụng chúng, hãy làm điều gì đó như:

```js
obj[Symbol.iterator] = function(){ /*..*/ };
```

Để định nghĩa các symbol tùy chỉnh của riêng bạn, hãy sử dụng `Symbol(..)` native. "Constructor" gốc `Symbol(..)` là duy nhất ở chỗ bạn không được phép sử dụng `new` với nó, vì làm như vậy sẽ gây ra lỗi.

```js
var mysym = Symbol( "my own symbol" );
mysym;				// Symbol(my own symbol)
mysym.toString();	// "Symbol(my own symbol)"
typeof mysym; 		// "symbol"

var a = { };
a[mysym] = "foobar";

Object.getOwnPropertySymbols( a );
// [ Symbol(my own symbol) ]
```

Mặc dù các symbol không thực sự private (`Object.getOwnPropertySymbols(..)` phản ánh đối tượng và hiển thị các symbol khá công khai), việc sử dụng chúng cho các thuộc tính private hoặc đặc biệt có thể là trường hợp sử dụng chính của chúng. Đối với hầu hết các nhà phát triển, họ có thể thay thế tên thuộc tính bằng tiền tố dấu gạch dưới `_`, hầu như luôn luôn theo các tín hiệu quy ước để nói, "này, đây là thuộc tính riêng tư/đặc biệt/nội bộ, vì vậy hãy để nó yên!"

**Ghi chú:** `Symbol` *không* phải là `object`, chúng đơn giản là scalar primitives.

### Native Prototypes

Mỗi built-in native constructors đều có object `.prototype` riêng -- `Array.prototype`, `String.prototype`, etc.

Các object này chứa hành vi duy nhất cho particular object subtype (kiểu phụ đối tượng cụ thể) của chúng.

Ví dụ: tất cả các string object và theo extension (phần mở rộng) (thông qua boxing) primitive `string`, có quyền truy cập vào hành vi mặc định như các phương thức được xác định trên đối tượng `String.prototype`.

**Lưu ý:** Theo quy ước tài liệu, `String.prototype.XYZ` được rút ngắn thành `String#XYZ` và tương tự như vậy đối với tất cả các `.prototype` khác.

* `String#indexOf(..)`: tìm vị trí trong chuỗi của một chuỗi con khác
* `String#charAt(..)`: truy cập ký tự tại một vị trí trong chuỗi
* `String#substr(..)`, `String#substring(..)`, and `String#slice(..)`: trích xuất một phần của chuỗi dưới dạng một chuỗi mới
* `String#toUpperCase()` và `String#toLowerCase()`: tạo một chuỗi mới được chuyển thành chữ hoa hoặc chữ thường
* `String#trim()`: tạo một chuỗi mới đã loại bỏ mọi khoảng trắng ở cuối hoặc ở đầu

Không có phương pháp nào sửa đổi string *tại chỗ*. Các sửa đổi (như chuyển đổi vị trí hoặc cắt bớt) tạo ra một giá trị mới từ giá trị hiện có.

Nhờ prototype delegation (ủy quyền nguyên mẫu) (xem tập *this & Object Prototypes* trong bộ sách này), bất kỳ giá trị chuỗi nào cũng có thể truy cập các phương thức sau:

```js
var a = " abc ";

a.indexOf( "c" ); // 3
a.toUpperCase(); // " ABC "
a.trim(); // "abc"
```

Các constructor prototype khác chứa các hành vi phù hợp với loại của chúng, chẳng hạn như `Number#toFixed(..)` (xâu chuỗi một số có số chữ số thập phân cố định) và `Array#concat(..)` (hợp nhất các mảng). Tất cả các hàm đều có quyền truy cập vào `apply(..)`, `call(..)` và `bind(..)` vì `Function.prototype` định nghĩa chúng.

Tuy nhiên, một số native prototype không *chỉ* là các đối tượng đơn giản:

```js
typeof Function.prototype;			// "function"
Function.prototype();				// it's an empty function!

RegExp.prototype.toString();		// "/(?:)/" -- empty regex
"abc".match( RegExp.prototype );	// [""]
```

Một ý tưởng đặc biệt tồi tệ, bạn thậm chí có thể sửa đổi các native prototype này (không chỉ thêm các thuộc tính như bạn có thể quen thuộc):

```js
Array.isArray( Array.prototype );	// true
Array.prototype.push( 1, 2, 3 );	// 3
Array.prototype;					// [1,2,3]

// don't leave it that way, though, or expect weirdness!
// reset the `Array.prototype` to empty
Array.prototype.length = 0;
```

Như bạn có thể thấy, `Function.prototype` là một function, `RegExp.prototype` là một regular-expression(biểu thức chính quy) và `Array.prototype` là một array. Thú vị và mát mẻ nhỉ?

#### Prototypes As Defaults

`Function.prototype` là một empty function, `RegExp.prototype` là một biểu thức chính quy "trống" (ví dụ: không khớp) và `Array.prototype` là một array trống, hãy đặt tất cả các giá trị "mặc định" đẹp này để gán thành các biến nếu các biến đó chưa có giá trị của loại thích hợp.

Cho ví dụ:

```js
function isThisCool(vals,fn,rx) {
	vals = vals || Array.prototype;
	fn = fn || Function.prototype;
	rx = rx || RegExp.prototype;

	return rx.test(
		vals.map( fn ).join( "" )
	);
}

isThisCool();		// true

isThisCool(
	["a","b","c"],
	function(v){ return v.toUpperCase(); },
	/D/
);					// false
```

**Lưu ý:** Kể từ ES6, chúng tôi không cần sử dụng `vals = vals || ..` Thủ thuật cú pháp giá trị mặc định (xem Chương 4) nữa, bởi vì giá trị mặc định có thể được đặt cho các tham số thông qua cú pháp gốc trong phần khai báo hàm (xem Chương 5).

Một lợi ích phụ nhỏ của phương pháp này là `.prototype` đã được tạo và tích hợp sẵn, do đó được tạo *chỉ một lần*. Ngược lại, việc sử dụng chính các giá trị `[]`, `function(){}` và `/(?:)/` cho các giá trị mặc định đó (có thể, tùy thuộc vào việc triển khai công cụ) đang tạo lại các giá trị đó (và có thể là thu gom rác chúng sau) cho *mỗi lệnh gọi* của `isThisCool(..)`. Đó có thể là lãng phí bộ nhớ/CPU.

Ngoài ra, hãy hết sức cẩn thận để không sử dụng `Array.prototype` làm giá trị mặc định **giá trị này sau đó sẽ được sửa đổi**. Trong ví dụ này, `vals` được sử dụng ở chế độ chỉ đọc, nhưng nếu thay vào đó, bạn thực hiện các thay đổi tại chỗ cho `vals`, thì bạn thực sự sẽ sửa đổi chính `Array.prototype`, điều này sẽ dẫn đến các vấn đề được đề cập trước đó!

**Lưu ý:** Mặc dù chúng tôi đang chỉ ra những nguyên mẫu gốc này và một số tính hữu ích, hãy thận trọng khi dựa vào chúng và thậm chí thận trọng hơn khi sửa đổi chúng theo bất kỳ cách nào. Xem Phụ lục A "Native Prototype" để thảo luận thêm.

## Review

JavaScript cung cấp các object wrapper xung quanh các giá trị primitive, được gọi là giá trị native (`String`, `Number`, `Boolean`, v.v.). Các object wrapper này cung cấp cho các giá trị quyền truy cập vào các hành vi phù hợp với từng loại phụ đối tượng (`String#trim()` và `Array#concat(..)`).

Nếu bạn có một giá trị scalar primitive(nguyên thủy vô hướng) đơn giản như `"abc"` và bạn truy cập thuộc tính `length` của nó hoặc một số phương thức `String.prototype`, thì JS sẽ tự động "đóng hộp" giá trị (bao bọc nó trong object wrapper tương ứng của nó) để quyền truy cập thuộc tính/phương thức có thể được thực hiện.
