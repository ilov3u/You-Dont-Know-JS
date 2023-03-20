# You Don't Know JS: Types & Grammar
# Chapter 4: Coercion

Bây giờ chúng ta đã hiểu đầy đủ hơn về các loại và giá trị của JavaScript, chúng ta chuyển sự chú ý sang một chủ đề gây tranh cãi: sự coercion (ép kiểu).

Như chúng tôi đã đề cập trong Chương 1, các cuộc tranh luận về việc liệu tính ép kiểu(coercion) là một tính năng hữu ích hay một lỗ hổng trong thiết kế của ngôn ngữ (hoặc ở đâu đó ở giữa!) đã nổ ra ngay từ ngày đầu tiên. Nếu bạn đã đọc những cuốn sách nổi tiếng khác về JS, bạn sẽ biết rằng *thông điệp* phổ biến ngoài kia là sự ép kiểu là ma thuật, xấu xa, khó hiểu và hoàn toàn là một ý tưởng tồi.

Theo tinh thần chung của bộ sách này, thay vì chạy trốn khỏi sự coercion (ép kiểu) bởi vì những người khác cũng vậy, hoặc bởi vì bạn bị cắn bởi một số điều kỳ quặc, tôi nghĩ bạn nên hướng tới những gì bạn không hiểu và tìm cách *có được nó* đầy đủ hơn.

Mục tiêu của chúng tôi là khám phá đầy đủ những ưu và nhược điểm (vâng, *có* ưu!) của sự coercion, để bạn có thể đưa ra quyết định sáng suốt về sự phù hợp của nó trong chương trình của mình.

## Converting Values

Chuyển đổi một giá trị từ type này sang type khác thường được gọi là "type casting (truyền kiểu)" khi được thực hiện rõ ràng và "coercion (ép kiểu)" khi được thực hiện ngầm (bắt buộc bởi các quy tắc về cách sử dụng giá trị).

**Lưu ý:** Điều này có thể không rõ ràng, nhưng các lệnh ép kiểu JavaScript luôn dẫn đến một trong các giá trị scalar primitive (xem Chương 2), như `string`, `number` hoặc `boolean`. Không có sự ép kiểu nào dẫn đến một giá trị phức tạp như `object` hoặc `function`. Chương 3 đề cập đến "boxing", bao bọc các giá trị scalar primitive trong các đối tượng `object` của chúng, nhưng đây không thực sự là sự ép kiểu theo nghĩa chính xác.

Một cách khác mà các thuật ngữ này thường được phân biệt như sau: "type casting (truyền kiểu)" (hoặc "type conversion (chuyển đổi kiểu)") xảy ra trong các ngôn ngữ được nhập tĩnh tại thời điểm biên dịch, trong khi "coercion (ép buộc kiểu)" là chuyển đổi thời gian chạy cho các ngôn ngữ được nhập động.

Tuy nhiên, trong JavaScript, hầu hết mọi người gọi tất cả các loại chuyển đổi này là *coercion - ép buộc*, vì vậy cách tôi muốn phân biệt là nói "implicit coercion (ép buộc ngầm)" so với "explicit coercion (ép buộc tường minh)".

Sự khác biệt phải rõ ràng: "explicit coercion" là khi nhìn vào code rõ ràng là chuyển đổi type đang xảy ra có chủ ý, trong khi "implicit coercion" là khi chuyển đổi type sẽ xảy ra như một side effect ít rõ ràng hơn của một số cố ý khác hoạt động.

Ví dụ, hãy xem xét hai cách tiếp cận sau để coercion:

```js
var a = 42;

var b = a + "";			// implicit coercion

var c = String( a );	// explicit coercion
```

Đối với `b`, sự ép kiểu xảy ra diễn ra hoàn toàn, bởi vì toán tử `+` được kết hợp với một trong các toán hạng là giá trị `string` (`""`) sẽ nhấn mạnh vào hoạt động là phép nối `string` (thêm hai các string với nhau), mà *với tư cách là một side effect (ẩn)* sẽ buộc giá trị `42` trong `a` bị ép thành giá trị `string` tương đương: `"42"`.

Ngược lại, hàm `String(..)` cho thấy khá rõ ràng rằng nó rõ ràng lấy giá trị trong `a` và buộc nó thành biểu diễn `string`.

Cả hai cách tiếp cận đều đạt được hiệu quả như nhau: `"42"` bắt nguồn từ `42`. Nhưng chính *cách thức* mới là tâm điểm của các cuộc tranh luận sôi nổi về coercion (sự ép buộc) của JavaScript.

**Lưu ý:** Về mặt kỹ thuật, có một số sắc thái khác biệt về hành vi ở đây ngoài sự khác biệt về phong cách. Chúng tôi sẽ trình bày chi tiết hơn ở phần sau của chương này, trong phần "Implicitly: String <--> Number".

Các thuật ngữ "explicit (rõ ràng)" và "implicit (ngầm ý)" hoặc "obvious (minh bạch)" và "hidden side effect (tác dụng phụ tiềm ẩn)" là *tương đối*.

Nếu bạn biết chính xác `a + ""` đang làm gì và bạn đang cố tình làm điều đó để ép buộc một `string`, bạn có thể cảm thấy thao tác này đủ "explicit (rõ ràng)". Ngược lại, nếu bạn chưa bao giờ thấy hàm `String(..)` được sử dụng để ép kiểu `string`, thì hành vi của nó có vẻ ẩn đến mức khiến bạn cảm thấy "implicit".

Nhưng chúng ta đang có cuộc thảo luận về "explicit" so với "implicit" dựa trên ý kiến có thể có của một nhà phát triển *trung bình, được cung cấp thông tin hợp lý, nhưng không phải là chuyên gia hoặc nhà phát triển đặc tả JS*. Dù bạn thấy mình nằm gọn trong cái xô đó ở mức độ nào, bạn sẽ cần phải điều chỉnh quan điểm của mình đối với những quan sát của chúng ta ở đây cho phù hợp.

Chỉ cần nhớ rằng: hiếm khi chúng ta viết code của mình và là người duy nhất đọc nó. Ngay cả khi bạn là chuyên gia về tất cả thông tin chi tiết về JS, hãy xem xét cảm giác của một đồng đội ít kinh nghiệm hơn của bạn khi họ đọc code của bạn. Nó sẽ "explicit" hay "implicit" đối với họ giống như đối với bạn?

## Abstract Value Operations

Trước khi có thể khám phá sự ép kiểu *explicit* so với *implicit*, chúng ta cần tìm hiểu các quy tắc cơ bản chi phối cách các giá trị *trở thành* hoặc là `string`, `number` hoặc `boolean`. Thông số kỹ thuật ES5 trong phần 9 xác định một số "hoạt động trừu tượng" (thông số kỹ thuật ưa thích cho "hoạt động chỉ dành cho nội bộ") với các quy tắc chuyển đổi giá trị. Chúng tôi sẽ đặc biệt chú ý đến: `ToString`, `ToNumber` và `ToBoolean` và ở mức độ thấp hơn là `ToPrimitive`.

### `ToString`

Khi bất kỳ giá trị không phải `string` nào bị ép buộc thành biểu diễn `string`, thì chuyển đổi được xử lý bởi thao tác trừu tượng `ToString` trong phần 9.8 của đặc tả.

Các giá trị primitive có nature stringification (chuỗi hóa tự nhiên): `null` trở thành `"null"`, `undefined` trở thành `"undefined"` và `true` trở thành `"true"`. `number` thường được thể hiện theo cách tự nhiên mà bạn mong đợi, nhưng như chúng ta đã thảo luận trong Chương 2, `number` rất nhỏ hoặc rất lớn được thể hiện ở dạng số mũ:

```js
// multiplying `1.07` by `1000`, seven times over
var a = 1.07 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000;

// seven times three digits => 21 digits
a.toString(); // "1.07e21"
```

Đối với các object thông thường, trừ khi bạn chỉ định đối tượng của riêng mình, `toString()` mặc định (nằm trong `Object.prototype.toString()`) sẽ trả về *internal `[[Class]]`* (xem Chương 3), như ví dụ `"[object Object]"`.

Nhưng như đã trình bày trước đó, nếu một object có phương thức `toString()` của riêng nó trên đó và bạn sử dụng object đó theo cách giống như `string`, thì `toString()` của nó sẽ tự động được gọi và `string` thay vào đó, kết quả của cuộc gọi đó sẽ được sử dụng.

**Lưu ý:** Cách một object được ép kiểu vào một `string` về mặt kỹ thuật đi qua thao tác trừu tượng `ToPrimitive` (thông số ES5, phần 9.1), nhưng các chi tiết cụ thể đó sẽ được đề cập chi tiết hơn trong phần `ToNumber` sau trong chương này, vì vậy chúng tôi sẽ bỏ qua chúng ở đây.

Mảng có một overridden mặc định `toString()`, xâu chuỗi thành chuỗi nối (chuỗi) của tất cả các giá trị của nó (mỗi giá trị được xâu chuỗi riêng), với `","` ở giữa mỗi giá trị:

```js
var a = [1,2,3];

a.toString(); // "1,2,3"
```

Một lần nữa, `toString()` có thể được gọi một cách explicit hoặc nó sẽ tự động được gọi nếu không phải là `string` được sử dụng trong ngữ cảnh `string`.

#### JSON Stringification

Một nhiệm vụ khác có vẻ rất liên quan đến `ToString` là khi bạn sử dụng utility `JSON.stringify(..)` để tuần tự hóa một giá trị thành giá trị `string` tương thích với JSON.

Điều quan trọng cần lưu ý là sự xâu chuỗi này không hoàn toàn giống với sự ép kiểu. Nhưng vì nó liên quan đến các quy tắc `ToString` ở trên, nên chúng tôi sẽ có một chút chuyển hướng để đề cập đến các hành vi xâu chuỗi JSON tại đây.

Đối với hầu hết các giá trị đơn giản, JSON stringification về cơ bản hoạt động giống như chuyển đổi `toString()`, ngoại trừ kết quả tuần tự hóa *luôn là `string`*:

```js
JSON.stringify( 42 );	// "42"
JSON.stringify( "42" );	// ""42"" (a string with a quoted string value in it)
JSON.stringify( null );	// "null"
JSON.stringify( true );	// "true"
```

Bất kỳ giá trị *JSON-safe* nào cũng có thể được xâu chuỗi bằng `JSON.stringify(..)`. Nhưng *An toàn với JSON* là gì? Bất kỳ giá trị nào có thể được biểu diễn hợp lệ trong biểu diễn JSON.

Có thể dễ dàng hơn khi xem xét các giá trị **không** JSON-safe. Một số ví dụ: `undefined`, `function`, (ES6+) `symbol` và `object` với các tham chiếu vòng tròn (trong đó các tham chiếu thuộc tính trong một cấu trúc đối tượng tạo ra một chu kỳ không bao giờ kết thúc qua nhau). Đây là tất cả các giá trị không hợp lệ đối với cấu trúc JSON tiêu chuẩn, chủ yếu là do chúng không thể chuyển sang các ngôn ngữ khác sử dụng các giá trị JSON.

Utility `JSON.stringify(..)` sẽ tự động bỏ qua các giá trị `undefined`, `function` và `symbol` khi bắt gặp chúng. Nếu một giá trị như vậy được tìm thấy trong một `array`, thì giá trị đó sẽ được thay thế bằng `null` (để thông tin về vị trí của mảng không bị thay đổi). Nếu được tìm thấy dưới dạng thuộc tính của một `object`, thì thuộc tính đó sẽ bị loại trừ.

Xem xét:

```js
JSON.stringify( undefined );					// undefined
JSON.stringify( function(){} );					// undefined

JSON.stringify( [1,undefined,function(){},4] );	// "[1,null,null,4]"
JSON.stringify( { a:2, b:function(){} } );		// "{"a":2}"
```

Nhưng nếu bạn cố gắng `JSON.stringify(..)` một `object` có (các) tham chiếu vòng trong đó, thì sẽ xảy ra lỗi.

JSON stringification có hành vi đặc biệt là nếu một giá trị `object` có phương thức `toJSON()` được xác định, thì phương thức này sẽ được gọi trước để lấy giá trị sử dụng cho tuần tự hóa.

Nếu bạn định JSON xâu chuỗi một object có thể chứa (các) giá trị JSON bất hợp pháp hoặc nếu bạn chỉ có các giá trị trong `object` không phù hợp để tuần tự hóa, thì bạn nên xác định một phương thức `toJSON()` cho nó trả về phiên bản *JSON-safe* của `object`.

For example:

```js
var o = { };

var a = {
	b: 42,
	c: o,
	d: function(){}
};

// create a circular reference inside `a`
o.e = a;

// would throw an error on the circular reference
// JSON.stringify( a );

// define a custom JSON value serialization
a.toJSON = function() {
	// only include the `b` property for serialization
	return { b: this.b };
};

JSON.stringify( a ); // "{"b":42}"
```

Một quan niệm sai lầm rất phổ biến là `toJSON()` sẽ trả về một biểu diễn chuỗi hóa JSON. Điều đó có thể không chính xác, trừ khi bạn thực sự muốn xâu chuỗi chính `string` (thường là không!). `toJSON()` sẽ trả về giá trị thông thường thực tế (thuộc bất kỳ loại nào) phù hợp và bản thân `JSON.stringify(..)` sẽ xử lý quá trình xâu chuỗi hóa.

Nói cách khác, `toJSON()` nên được hiểu là "với một giá trị an toàn JSON phù hợp để xâu chuỗi hóa", chứ không phải "với một chuỗi JSON" như nhiều nhà phát triển lầm tưởng.

Xem xét:

```js
var a = {
	val: [1,2,3],

	// probably correct!
	toJSON: function(){
		return this.val.slice( 1 );
	}
};

var b = {
	val: [1,2,3],

	// probably incorrect!
	toJSON: function(){
		return "[" +
			this.val.slice( 1 ).join() +
		"]";
	}
};

JSON.stringify( a ); // "[2,3]"

JSON.stringify( b ); // ""[2,3]""
```

Trong cuộc gọi thứ hai, chúng tôi đã xâu chuỗi `string` được trả về thay vì chính `array`, đây có thể không phải là điều chúng tôi muốn làm.

Trong khi chúng ta đang nói về `JSON.stringify(..)`, chúng ta hãy thảo luận về một số chức năng ít được biết đến hơn nhưng vẫn có thể rất hữu ích.

Đối số thứ hai tùy chọn có thể được chuyển đến `JSON.stringify(..)` được gọi là *replacer*. Đối số này có thể là `array` hoặc `function`. Nó được sử dụng để tùy chỉnh quá trình tuần tự hóa đệ quy của một `object` bằng cách cung cấp một cơ chế lọc cho các thuộc tính nên và không nên đưa vào, theo cách tương tự như cách `toJSON()` có thể chuẩn bị một giá trị cho quá trình tuần tự hóa.

Nếu *replacer* là một `array`, thì nó phải là một `array` gồm `string`, mỗi string sẽ chỉ định tên thuộc tính được phép đưa vào tuần tự hóa của `object`. Nếu một property tồn tại không có trong danh sách này, nó sẽ bị bỏ qua.

Nếu *replacer* là một `function`, thì nó sẽ được gọi một lần cho chính `object`, sau đó một lần cho mỗi thuộc tính trong `object` và mỗi lần được truyền hai đối số, *key* và *value*. Để bỏ qua *key* trong quá trình tuần tự hóa, hãy trả về `undefined`. Nếu không, hãy trả về *giá trị* đã cung cấp.

```js
var a = {
	b: 42,
	c: "42",
	d: [1,2,3]
};

JSON.stringify( a, ["b","c"] ); // "{"b":42,"c":"42"}"

JSON.stringify( a, function(k,v){
	if (k !== "c") return v;
} );
// "{"b":42,"d":[1,2,3]}"
```

**Lưu ý:** Trong trường hợp `function` *replacer*, đối số chính `k` là `undefined` cho lệnh gọi đầu tiên (trong đó chính object `a` được chuyển vào). Câu lệnh `if` **lọc ra** thuộc tính có tên `"c"`. Stringification là đệ quy, do đó, array `[1,2,3]` có từng giá trị của nó (`1`, `2` và `3`) được chuyển dưới dạng `v` sang *replacer*, với các chỉ mục (`0 `, `1` và `2`) dưới dạng `k`.

Đối số tùy chọn thứ ba cũng có thể được chuyển đến `JSON.stringify(..)`, được gọi là *space*, được sử dụng làm thụt đầu dòng cho đầu ra đẹp hơn, thân thiện với con người hơn. *space* có thể là một số nguyên dương để cho biết có bao nhiêu ký tự khoảng trắng nên được sử dụng ở mỗi mức thụt đầu dòng. Hoặc, *space* có thể là một `chuỗi`, trong trường hợp đó, tối đa mười ký tự đầu tiên của giá trị của nó sẽ được sử dụng cho mỗi cấp độ thụt lề.

```js
var a = {
	b: 42,
	c: "42",
	d: [1,2,3]
};

JSON.stringify( a, null, 3 );
// "{
//    "b": 42,
//    "c": "42",
//    "d": [
//       1,
//       2,
//       3
//    ]
// }"

JSON.stringify( a, null, "-----" );
// "{
// -----"b": 42,
// -----"c": "42",
// -----"d": [
// ----------1,
// ----------2,
// ----------3
// -----]
// }"
```

Hãy nhớ rằng, `JSON.stringify(..)` không trực tiếp là một hình thức coercion. Tuy nhiên, chúng tôi đề cập đến vấn đề này ở đây vì hai lý do liên quan đến hành vi của nó với sự coercion `ToString`:

1. Tất cả các giá trị `string`, `number`, `boolean` và `null` đều xâu chuỗi hóa cho JSON về cơ bản giống như cách chúng ép buộc các giá trị `string` thông qua các quy tắc của thao tác trừu tượng `ToString`.
2. Nếu bạn chuyển một giá trị `object` cho `JSON.stringify(..)` và `object` đó có phương thức `toJSON()` trên đó, thì `toJSON()` sẽ tự động được gọi tới (đại loại là) "ép buộc" giá trị phải *JSON-safe* trước khi xâu chuỗi.

### `ToNumber`

Nếu bất kỳ giá trị nào không phải là `number` được sử dụng theo cách yêu cầu giá trị đó phải là `number`, chẳng hạn như một phép toán, thông số kỹ thuật ES5 sẽ xác định phép toán trừu tượng `ToNumber` trong phần 9.3.

Ví dụ: `true` trở thành `1` và `false` trở thành `0`. `undefined` trở thành `NaN`, nhưng (thật kỳ lạ) `null` trở thành `0`.

`ToNumber` cho một giá trị `string` về cơ bản hoạt động đối với hầu hết các phần giống như các quy tắc/cú pháp cho các chữ số (xem Chương 3). Nếu không thành công, kết quả là `NaN` (thay vì lỗi cú pháp như với chữ `number`). Một điểm khác biệt ví dụ là các số bát phân có tiền tố `0` không được xử lý dưới dạng bát phân (giống như các số thập phân cơ số 10 thông thường) trong thao tác này, mặc dù các bát phân như vậy có giá trị dưới dạng chữ `number` (xem Chương 2).

**Lưu ý:** Sự khác biệt giữa ngữ pháp chữ `number` và `ToNumber` trên giá trị `string` là tinh tế và có nhiều sắc thái, do đó sẽ không được đề cập thêm ở đây. Tham khảo phần 9.3.1 của thông số kỹ thuật ES5 để biết thêm thông tin.

Các object (và array) trước tiên sẽ được chuyển đổi thành giá trị primitive tương đương và giá trị kết quả (nếu là primitive nhưng chưa phải là `number`) được buộc thành `number` theo quy tắc `ToNumber` vừa được đề cập.

Để chuyển đổi thành giá trị primitive tương đương này, thao tác trừu tượng `ToPrimitive` (đặc tả ES5, phần 9.1) sẽ tham khảo giá trị (sử dụng thao tác `DefaultValue` nội bộ -- thông số ES5, phần 8.12.8) được đề cập để xem liệu nó có phương thức `valueOf()`. Nếu `valueOf()` khả dụng và nó trả về một giá trị nguyên thủy, thì giá trị *đó* được sử dụng để coercion (ép kiểu). Nếu không, nhưng `toString()` có sẵn, nó sẽ cung cấp giá trị cho sự coercion.

Nếu không hoạt động nào có thể cung cấp giá trị nguyên thủy, thì `TypeError` sẽ được đưa ra.

Kể từ ES5, bạn có thể tạo một đối tượng không thể ép buộc như vậy -- một đối tượng không có `valueOf()` và `toString()` -- nếu nó có giá trị `null` cho `[[Prototype]]` của nó, thường được tạo bằng ` Object.create(null)`. Xem tập *this & Object Prototypes* của bộ sách này để biết thêm thông tin về `[[Prototype]]`.

**Lưu ý:** Chúng tôi sẽ đề cập chi tiết cách ép kiểu đến `number` ở phần sau của chương này, nhưng đối với đoạn code tiếp theo này, chỉ cần giả sử hàm `Number(..)` làm như vậy.

Xem xét:

```js
var a = {
	valueOf: function(){
		return "42";
	}
};

var b = {
	toString: function(){
		return "42";
	}
};

var c = [4,2];
c.toString = function(){
	return this.join( "" );	// "42"
};

Number( a );			// 42
Number( b );			// 42
Number( c );			// 42
Number( "" );			// 0
Number( [] );			// 0
Number( [ "abc" ] );	// NaN
```

### `ToBoolean`

Tiếp theo, chúng ta hãy trò chuyện một chút về cách `boolean` hoạt động trong JS. Có **rất nhiều nhầm lẫn và quan niệm sai lầm** xung quanh chủ đề này, vì vậy hãy chú ý!

Đầu tiên và quan trọng nhất, JS có các từ khóa thực tế `true` và `false`, và chúng hoạt động chính xác như bạn mong đợi về các giá trị `boolean`. Một quan niệm sai lầm phổ biến là các giá trị `1` và `0` giống hệt với `true`/`false`. Mặc dù điều đó có thể đúng với các ngôn ngữ khác, nhưng trong JS, `số` là `số` và `boolean` là `boolean`. Bạn có thể ép buộc `1` thành `true` (và ngược lại) hoặc `0` thành `false` (và ngược lại). Nhưng chúng không giống nhau.

#### Falsy Values

Nhưng đó không phải là kết thúc của câu chuyện. Chúng ta cần thảo luận về cách các giá trị khác với hai `boolean` hoạt động bất cứ khi nào bạn ép buộc *thành* tương đương `boolean` của chúng.

Tất cả các giá trị của JavaScript có thể được chia thành hai nhóm:

1. các giá trị sẽ trở thành `false` nếu bị ép thành `boolean`
2. mọi thứ khác (rõ ràng sẽ trở thành `true`)

Tôi không chỉ là một người hài hước. Đặc tả JS xác định một danh sách cụ thể, hẹp gồm các giá trị sẽ ép thành `false` khi bị ép thành giá trị `boolean`.

Làm thế nào để chúng ta biết danh sách các giá trị là gì? Trong thông số kỹ thuật ES5, phần 9.2 định nghĩa một thao tác trừu tượng `ToBoolean`, cho biết chính xác điều gì sẽ xảy ra với tất cả các giá trị có thể khi bạn cố ép chúng "thành boolean".

Từ bảng đó, chúng tôi nhận được danh sách giá trị được gọi là "falsy" sau đây:

* `undefined`
* `null`
* `false`
* `+0`, `-0`, and `NaN`
* `""`

Đó là nó. Nếu một giá trị nằm trong danh sách đó, thì đó là giá trị "falsy" và nó sẽ ép buộc thành `false` nếu bạn ép buộc `boolean` lên nó.

Theo kết luận hợp lý, nếu một giá trị *không* trong danh sách đó, thì giá trị đó phải nằm trong *danh sách khác*, mà chúng tôi gọi là danh sách giá trị "truthy". Nhưng JS không thực sự định nghĩa một danh sách "truthy". Nó đưa ra một số ví dụ, chẳng hạn như nói rõ ràng rằng tất cả các đối tượng là truthy, nhưng hầu hết thông số kỹ thuật chỉ ngụ ý: **bất cứ điều gì không tồn tại trong danh sách falsy do đó là truthy.**

#### Falsy Objects

Đợi một chút, tiêu đề của phần đó thậm chí nghe có vẻ mâu thuẫn. Tôi thực sự *vừa nói* thông số kỹ thuật gọi tất cả các object là truthy, phải không? Không nên có cái gọi là "falsy object".

Điều đó thậm chí có thể có nghĩa là gì?

Bạn có thể nghĩ rằng nó có nghĩa là một object wrapper (xem Chương 3) xung quanh một giá trị giả (chẳng hạn như `""`, `0` hoặc `false`). Nhưng đừng rơi vào *cái bẫy* đó.

**Lưu ý:** Đó là một trò đùa tinh tế về thông số kỹ thuật mà một số bạn có thể mắc phải.

Xem xét:

```js
var a = new Boolean( false );
var b = new Number( 0 );
var c = new String( "" );
```

Chúng ta biết cả ba giá trị ở đây đều là các object (xem Chương 3) bao quanh các giá trị rõ ràng là falsy. Nhưng những object này hoạt động như `true` hay `false`? Thật dễ dàng để trả lời:

```js
var d = Boolean( a && b && c );

d; // true
```

Vì vậy, cả ba đều hành xử như `true`, vì đó là cách duy nhất `d` có thể trở thành `true`.

**Mẹo:** Lưu ý `Boolean( .. )` bao quanh biểu thức `a && b && c` -- bạn có thể thắc mắc tại sao lại có biểu thức đó. Chúng ta sẽ quay lại vấn đề đó sau trong chương này, vì vậy hãy ghi nhớ nó trong đầu. Để xem trước (đố vui), hãy tự mình thử xem `d` sẽ là gì nếu bạn chỉ thực hiện `d = a && b && c` mà không có lệnh gọi `Boolean( .. )`!

Vì vậy, nếu "falsy object" **không chỉ là object bao quanh các giá trị falsy**, thì chúng là cái quái gì vậy?

Điều khó khăn là chúng có thể xuất hiện trong chương trình JS của bạn, nhưng bản thân chúng không thực sự là một phần của JavaScript.

**What!?**

Có một số trường hợp mà các trình duyệt đã tạo ra loại hành vi giá trị *kỳ lạ* của riêng chúng, cụ thể là ý tưởng về "falsy object" này trên ngữ nghĩa JS thông thường.

"Falsy object" là một giá trị có hình thức và hoạt động giống như một object bình thường (thuộc tính, v.v.), nhưng khi bạn ép buộc nó thành một `boolean`, nó sẽ ép buộc thành một giá trị `false`.

**Why!?**

Trường hợp nổi tiếng nhất là `document.all`: một (object) dạng array được cung cấp cho chương trình JS của bạn *bởi DOM* (không phải chính công cụ JS), hiển thị các thành phần trong trang của bạn cho chương trình JS của bạn. Nó *đã từng* hoạt động như một object bình thường--nó sẽ hoạt động truthy. Nhưng không còn nữa.

Bản thân `document.all` chưa bao giờ thực sự là "tiêu chuẩn" và từ lâu đã không còn được dùng nữa/bị bỏ rơi.

"Vậy họ không thể gỡ bỏ nó sao?" Xin lỗi, cố gắng tốt đẹp. Ước gì họ có thể. Nhưng có quá nhiều cơ sở code JS kế thừa dựa trên việc sử dụng nó.

Vì vậy, tại sao làm cho nó hoạt động sai? Bởi vì việc ép buộc `document.all` thành `boolean` (như trong các câu lệnh `if`) hầu như luôn được sử dụng như một phương tiện để phát hiện IE cũ, không chuẩn.

IE từ lâu đã tuân thủ các tiêu chuẩn và trong nhiều trường hợp đang đẩy web tiến lên nhiều hoặc hơn bất kỳ trình duyệt nào khác. Nhưng tất cả mã `if (document.all) { /* it's IE */ }` cũ đó vẫn còn tồn tại và phần lớn trong số đó có lẽ sẽ không bao giờ biến mất. Tất cả code kế thừa này vẫn giả định rằng nó đang chạy trong IE đã có tuổi đời hàng chục năm, điều này chỉ dẫn đến trải nghiệm duyệt web không tốt cho người dùng IE.

Vì vậy, chúng tôi không thể xóa hoàn toàn `document.all`, nhưng IE không muốn mã `if (document.all) { .. }` hoạt động nữa, để người dùng trong IE hiện đại nhận được mã mới, tuân thủ tiêu chuẩn Hợp lý.

"Chúng ta nên làm gì?" **"Tôi hiểu rồi! Hãy phá hủy hệ thống loại JS và giả vờ rằng `document.all` là falsy!"

Ư. Điều đó thật tệ. Đó là một vấn đề điên rồ mà hầu hết các nhà phát triển JS không hiểu. Nhưng giải pháp thay thế (không làm gì với các vấn đề không thắng ở trên) thật tệ *chỉ một chút nữa thôi*.

Vì vậy, ... đó là những gì chúng ta có: "object falsy" điên rồ, phi tiêu chuẩn được trình duyệt thêm vào JavaScript bởi trình duyệt. Vâng!

#### Truthy Values

Quay lại danh sách truthy. Các giá trị truthy chính xác là gì? Hãy nhớ rằng: **một giá trị là truthy nếu nó không nằm trong danh sách falsy.**

Xem xét:

```js
var a = "false";
var b = "0";
var c = "''";

var d = Boolean( a && b && c );

d;
```

Bạn mong đợi `d` có giá trị gì ở đây? Nó phải là `true` hoặc `false`.

Nó là `true`. Tại sao? Bởi vì mặc dù nội dung của các giá trị `string` đó trông giống như các giá trị falsy, nhưng bản thân các giá trị `string` đều là truthy, bởi vì `""` là giá trị `string` duy nhất trong danh sách falsy.

Cái gì về những điều này?

```js
var a = [];				// empty array -- truthy or falsy?
var b = {};				// empty object -- truthy or falsy?
var c = function(){};	// empty function -- truthy or falsy?

var d = Boolean( a && b && c );

d;
```

Đúng, bạn đã đoán ra rồi, `d` vẫn là `true` ở đây. Tại sao? Cùng một lý do như trước đây. Mặc dù nó có vẻ như thế nào, `[]`, `{}` và `function(){}` *không* nằm trong danh sách falsy và do đó là các giá trị truthy.

Nói cách khác, danh sách truthy dài vô tận. Không thể lập một danh sách như vậy. Bạn chỉ có thể tạo một danh sách giả hữu hạn và tham khảo *nó*.

Hãy dành năm phút, viết danh sách giả falsy vào một tờ giấy ghi chú dán lên màn hình máy tính của bạn hoặc ghi nhớ nó nếu bạn thích. Dù bằng cách nào, bạn sẽ dễ dàng có thể tạo một danh sách truthy bất cứ khi nào bạn cần bằng cách hỏi xem nó có nằm trong danh sách falsy hay không.

Tầm quan trọng của truthy và falsy là trong việc hiểu giá trị sẽ hoạt động như thế nào nếu bạn ép kiểu nó (dù rõ ràng hay ngầm định) thành giá trị `boolean`. Bây giờ bạn đã có hai danh sách đó trong đầu, chúng ta có thể đi sâu vào các ví dụ coercion.

## Explicit Coercion

*Explicit* coercion đề cập đến chuyển đổi kiểu minh bạch và rõ ràng. Có nhiều cách sử dụng chuyển đổi kiểu rõ ràng thuộc danh mục *explicit* coercion đối với hầu hết các nhà phát triển.

Mục tiêu ở đây là xác định các pattern trong code của chúng ta, nơi chúng ta có thể làm cho nó rõ ràng và hiển nhiên rằng chúng ta đang chuyển đổi một giá trị từ loại này sang loại khác, để không để lại các lỗ hổng cho các nhà phát triển trong tương lai. Chúng ta càng rõ ràng thì càng có nhiều khả năng ai đó sau này sẽ có thể đọc mã của chúng ta và hiểu mà không cần nỗ lực quá mức về mục đích của chúng ta.

Thật khó để tìm thấy bất kỳ sự bất đồng nổi bật nào với sự *explicit* coercion, vì nó phù hợp nhất với cách thực hành chuyển đổi loại được chấp nhận phổ biến hoạt động trong các ngôn ngữ được nhập tĩnh. Do đó, chúng ta sẽ chấp nhận (hiện tại) rằng *explicit* coercion có thể được thỏa thuận là không xấu xa hoặc gây tranh cãi. Tuy nhiên, chúng ta sẽ xem lại điều này sau.

### Explicitly: Strings <--> Numbers

Chúng ta sẽ bắt đầu với thao tác ép kiểu đơn giản nhất và có lẽ là phổ biến nhất: ép kiểu các giá trị giữa biểu diễn `string` và `number`.

Để ép kiểu giữa `string` và `number`, chúng ta sử dụng các hàm `String(..)` và `Number(..)` tích hợp sẵn (mà chúng ta gọi là "native constructor" trong Chương 3), nhưng **rất quan trọng**, chúng ta không sử dụng từ khóa `new` trước chúng. Như vậy, chúng ta không tạo object wrapper.

Thay vào đó, chúng tôi đang thực sự *ràng buộc ép kiểu* giữa hai kiểu:

```js
var a = 42;
var b = String( a );

var c = "3.14";
var d = Number( c );

b; // "42"
d; // 3.14
```

`String(..)` ép buộc từ bất kỳ giá trị nào khác thành giá trị primitive `string`, sử dụng các quy tắc của thao tác `ToString` đã thảo luận trước đó. `Number(..)` ép buộc từ bất kỳ giá trị nào khác thành giá trị primitive `number`, sử dụng các quy tắc của thao tác `ToNumber` đã thảo luận trước đó.

Tôi gọi đây là sự *explicit* coercion vì nhìn chung, hầu hết các nhà phát triển đều thấy rõ rằng kết quả cuối cùng của các hoạt động này là chuyển đổi kiểu có thể áp dụng.

Trên thực tế, cách sử dụng này thực sự trông rất giống với một số ngôn ngữ được nhập tĩnh khác.

Ví dụ: trong C/C++, bạn có thể nói `(int)x` hoặc `int(x)` và cả hai sẽ chuyển đổi giá trị trong `x` thành một số nguyên. Cả hai hình thức đều hợp lệ, nhưng nhiều người thích hình thức sau, trông giống như một lời gọi hàm. Trong JavaScript, khi bạn nói `Number(x)`, nó trông cực kỳ giống nhau. Có vấn đề gì khi nó *thực sự* là một lệnh gọi hàm trong JS không? Không thực sự.

Ngoài `String(..)` và `Number(..)`, còn có nhiều cách khác để chuyển đổi "rõ ràng" các giá trị này giữa `string` và `number`:

```js
var a = 42;
var b = a.toString();

var c = "3.14";
var d = +c;

b; // "42"
d; // 3.14
```

Việc gọi `a.toString()` có vẻ rõ ràng (khá rõ ràng rằng "toString" có nghĩa là "đến một chuỗi"), nhưng có một số ẩn ý ở đây. `toString()` không thể được gọi trên một giá trị *primitive* như `42`. Vì vậy, JS tự động "đóng hộp" (xem Chương 3) `42` trong một object wrapper (trình bao bọc đối tượng), để `toString()` có thể được gọi đối với object. Nói cách khác, bạn có thể gọi nó là "ngầm rõ ràng."

`+c` ở đây đang hiển thị dạng *unary operator (toán tử đơn hạng)* (toán tử chỉ có một toán hạng) của toán tử `+`. Thay vì thực hiện phép cộng toán học (hoặc nối chuỗi -- xem bên dưới), đơn vị `+` ép buộc toán hạng của nó (`c`) một cách rõ ràng với giá trị `number`.

Có phải `+c` *explicit* coercion không? Phụ thuộc vào kinh nghiệm và quan điểm của bạn. Nếu bạn biết (bạn biết rồi đấy!) rằng `+` đơn nguyên được dự định rõ ràng cho việc ép kiểu `number`, thì điều đó khá rõ ràng và hiển nhiên. Tuy nhiên, nếu bạn chưa từng thấy nó trước đây, thì nó có vẻ cực kỳ khó hiểu, ẩn ý, với các tác dụng phụ tiềm ẩn, v.v.

**Lưu ý:** Quan điểm thường được chấp nhận trong cộng đồng JS nguồn mở là `+` đơn nguyên là một hình thức *explicit* coercion được chấp nhận.

Ngay cả khi bạn thực sự thích biểu mẫu `+c`, chắc chắn vẫn có những chỗ khiến nó trông cực kỳ khó hiểu. Xem xét:

```js
var c = "3.14";
var d = 5+ +c;

d; // 8.14
```

Toán tử `-` đơn nguyên cũng cưỡng bức giống như `+`, nhưng nó cũng đảo ngược dấu của số. Tuy nhiên, bạn không thể đặt hai dấu `--` cạnh nhau để bỏ lật dấu, vì dấu đó được phân tích thành toán tử giảm dần. Thay vào đó, bạn sẽ cần thực hiện: `- -"3.14"` với khoảng trắng ở giữa và điều đó sẽ dẫn đến việc ép buộc thành `3.14`.

Bạn có thể có thể nghĩ ra tất cả các loại kết hợp gớm ghiếc của các toán tử nhị phân (như `+` để bổ sung) bên cạnh dạng đơn nguyên của toán tử. Đây là một ví dụ điên rồ khác:

```js
1 + - + + + - + 1;	// 2
```

Bạn nên cân nhắc kỹ lưỡng việc tránh ép buộc `+` (hoặc `-`) đơn nguyên khi nó liền kề với các toán tử khác. Trong khi các công việc trên, nó hầu như sẽ được coi là một ý tưởng tồi. Ngay cả `d = +c` (hoặc `d =+ c` đối với vấn đề đó!) cũng có thể dễ dàng bị nhầm lẫn với `d += c`, điều này hoàn toàn khác!

**Lưu ý:** Một vị trí cực kỳ khó hiểu khác đối với `+` đơn nguyên được sử dụng liền kề với toán tử khác sẽ là toán tử tăng `++` và toán tử giảm `--`. Ví dụ: `a +++b`, `a + ++b` và `a + + +b`. Xem "Tác dụng phụ của biểu thức" trong Chương 5 để biết thêm về `++`.

Hãy nhớ rằng chúng tôi đang cố gắng trình bày rõ ràng và **giảm thiểu** sự nhầm lẫn, chứ không làm cho vấn đề trở nên tồi tệ hơn nhiều!

#### `Date` To `number`

Một cách sử dụng phổ biến khác của toán tử `+` đơn nguyên là ép buộc đối tượng `Date` thành một `number`, bởi vì kết quả là dấu thời gian unix (mili giây đã trôi qua kể từ ngày 1 tháng 1 năm 1970 00:00:00 UTC) biểu thị ngày/ giá trị thời gian:

```js
var d = new Date( "Mon, 18 Aug 2014 08:53:06 CDT" );

+d; // 1408369986000
```

Cách sử dụng phổ biến nhất của thành ngữ này là lấy khoảnh khắc *bây giờ* hiện tại làm timestamp (dấu thời gian), chẳng hạn như:

```js
var timestamp = +new Date();
```

**Lưu ý:** Một số nhà phát triển biết về một "thủ thuật" cú pháp đặc biệt trong JavaScript, đó là `()` được đặt trong một lệnh gọi hàm tạo (một hàm được gọi với `new`) là *tùy chọn* nếu không có đối số để vượt qua. Vì vậy, bạn có thể chạy qua biểu mẫu `var timestamp = +new Date;`. Tuy nhiên, không phải tất cả các nhà phát triển đều đồng ý rằng việc bỏ qua `()` sẽ cải thiện khả năng đọc, vì đây là một ngoại lệ cú pháp không phổ biến chỉ áp dụng cho biểu mẫu cuộc gọi `new fn()` chứ không phải biểu mẫu cuộc gọi `fn()` thông thường.

Nhưng coercion không phải là cách duy nhất để lấy timestamp ra khỏi object `Date`. Cách tiếp cận không ép kiểu thậm chí còn được ưa chuộng hơn, vì nó thậm chí còn rõ ràng hơn:

```js
var timestamp = new Date().getTime();
// var timestamp = (new Date()).getTime();
// var timestamp = (new Date).getTime();
```

Nhưng một tùy chọn không ép buộc *thậm chí nhiều hơn* thích hợp hơn là sử dụng hàm tĩnh `Date.now()` đã thêm vào ES5:

```js
var timestamp = Date.now();
```

Và nếu bạn muốn polyfill `Date.now()` vào các trình duyệt cũ hơn, thì khá đơn giản:

```js
if (!Date.now) {
	Date.now = function() {
		return +new Date();
	};
}
```

Tôi khuyên bạn nên bỏ qua các hình thức coercion liên quan đến ngày tháng. Sử dụng `Date.now()` cho timestamp *bây giờ* hiện tại và `new Date( .. ).getTime()` để nhận timestamp của ngày/giờ *không phải bây giờ* cụ thể mà bạn cần chỉ định.

#### The Curious Case of the `~`

Một toán tử JS cưỡng chế thường bị bỏ qua và thường rất dễ nhầm lẫn là toán tử dấu ngã `~` (hay còn gọi là "bitwise NOT"). Nhiều người thậm chí hiểu những gì nó làm sẽ thường xuyên muốn tránh nó. Nhưng theo tinh thần của cách tiếp cận của chúng ta trong cuốn sách và bộ sách này, chúng ta hãy đào sâu vào nó để tìm hiểu xem `~` có bất kỳ điều gì hữu ích để cung cấp cho chúng ta hay không.

Trong phần "Số nguyên 32-bit (Có dấu)" của Chương 2, chúng ta đã đề cập đến cách các toán tử theo chiều bit trong JS được định nghĩa chỉ cho các hoạt động 32-bit, nghĩa là chúng buộc các toán hạng của chúng tuân theo các biểu diễn giá trị 32-bit. Các quy tắc về cách điều này xảy ra được kiểm soát bởi thao tác trừu tượng `ToInt32` (thông số ES5, phần 9.5).

`ToInt32` trước tiên thực hiện ép buộc `ToNumber`, có nghĩa là nếu giá trị là `"123"`, thì trước tiên giá trị đó sẽ trở thành `123` trước khi áp dụng quy tắc `ToInt32`.

Mặc dù bản thân nó không *về mặt kỹ thuật* ép buộc (vì loại không thay đổi!), nhưng việc sử dụng các toán tử bitwise (như `|` hoặc `~`) với các giá trị `number` đặc biệt nhất định sẽ tạo ra hiệu ứng ép buộc dẫn đến một `number` khác giá trị.

Ví dụ: trước tiên chúng ta hãy xem xét toán tử `|` "bitwise OR" được sử dụng trong thành ngữ no-op khác `0 | x`, mà (như Chương 2 đã trình bày) về cơ bản chỉ thực hiện chuyển đổi `ToInt32`:

```js
0 | -0;			// 0
0 | NaN;		// 0
0 | Infinity;	// 0
0 | -Infinity;	// 0
```

Các số đặc biệt này không thể biểu diễn 32 bit (vì chúng đến từ tiêu chuẩn IEEE 754 64 bit -- xem Chương 2), vì vậy `ToInt32` chỉ xác định `0` là kết quả từ các giá trị này.

Nó gây tranh cãi nếu `0 | __` là một dạng *explicit* của thao tác `ToInt32` cưỡng chế này hoặc nếu nó *implicit* hơn. Từ góc độ thông số kỹ thuật, chắc chắn đó là *explicit*, nhưng nếu bạn không hiểu các hoạt động bitwise ở cấp độ này, thì nó có vẻ kỳ diệu *implicit* hơn một chút. Tuy nhiên, phù hợp với các khẳng định khác trong chương này, chúng tôi sẽ gọi nó là *explicit*.

Vì vậy, hãy chuyển sự chú ý của chúng ta trở lại `~`. Trước tiên, toán tử `~` "ép buộc" giá trị `number` 32 bit, sau đó thực hiện phép phủ định theo bit (lật tính chẵn lẻ của từng bit).

**Lưu ý:** Điều này rất giống với cách `!` không chỉ ép buộc giá trị của nó thành `boolean` mà còn đảo ngược tính chẵn lẻ của nó (xem phần thảo luận về "đơn vị `!`" sau).

Nhưng cái gì!? Tại sao chúng ta quan tâm đến việc các bit bị lật? Đó là một số thứ khá chuyên biệt, sắc thái. Rất hiếm khi các nhà phát triển JS cần suy luận về các bit riêng lẻ.

Một cách suy nghĩ khác về định nghĩa của `~` xuất phát từ khoa học máy tính/Toán học rời rạc kiểu cũ: `~` thực hiện phần bù hai. Tuyệt vời, cảm ơn, điều đó hoàn toàn rõ ràng hơn!

Hãy thử lại: `~x` gần giống với `-(x+1)`. Điều đó thật kỳ lạ, nhưng dễ giải thích hơn một chút. Vì thế:

```js
~42;	// -(42+1) ==> -43
```

Có lẽ bạn vẫn đang tự hỏi tất cả những thứ `~` này là về cái quái gì, hoặc tại sao nó thực sự quan trọng đối với một cuộc thảo luận cưỡng chế. Hãy nhanh chóng đi vào vấn đề.

Xét `-(x+1)`. Giá trị duy nhất mà bạn có thể thực hiện thao tác đó sẽ tạo ra kết quả `0` (hoặc `-0` về mặt kỹ thuật!) là gì? `-1`. Nói cách khác, `~` được sử dụng với một phạm vi giá trị `number` sẽ tạo ra giá trị `0` falsy (dễ bị ép buộc thành `false`) cho giá trị đầu vào `-1` và bất kỳ `number` truthy nào khác nếu không.

Tại sao điều đó có liên quan?

`-1` thường được gọi là "sentinel value", về cơ bản có nghĩa là một giá trị được cung cấp một ý nghĩa ngữ nghĩa tùy ý trong tập hợp lớn hơn các giá trị cùng loại của nó (`number`). Ngôn ngữ C sử dụng sentinel value `-1` cho nhiều hàm trả về giá trị `>= 0` cho "thành công" và `-1` cho "thất bại".

JavaScript đã áp dụng tiền lệ này khi xác định thao tác `string` `indexOf(..)`, tìm kiếm một chuỗi con và nếu tìm thấy sẽ trả về vị trí chỉ mục dựa trên 0 của nó hoặc `-1` nếu không tìm thấy.

Việc cố gắng sử dụng `indexOf(..)` không chỉ như một thao tác để lấy vị trí, mà còn như một cách kiểm tra `boolean` về sự hiện diện/vắng mặt của một chuỗi con trong một `string` khác là khá phổ biến. Đây là cách các nhà phát triển thường thực hiện kiểm tra như vậy:

```js
var a = "Hello World";

if (a.indexOf( "lo" ) >= 0) {	// true
	// found it!
}
if (a.indexOf( "lo" ) != -1) {	// true
	// found it
}

if (a.indexOf( "ol" ) < 0) {	// true
	// not found!
}
if (a.indexOf( "ol" ) == -1) {	// true
	// not found!
}
```

Tôi thấy hơi thô thiển khi nhìn vào `>= 0` hoặc `== -1`. Về cơ bản, đó là một "sự trừu tượng bị rò rỉ", trong đó nó đang rò rỉ hành vi triển khai cơ bản -- việc sử dụng sentinel `-1` cho "lỗi" -- vào mã của tôi. Tôi muốn ẩn một chi tiết như vậy.

Và bây giờ, cuối cùng, chúng ta đã hiểu tại sao `~` có thể giúp chúng ta! Sử dụng `~` với `indexOf()` "ép buộc" (thực ra chỉ biến đổi) giá trị **thành `boolean`-coercible** một cách thích hợp:

```js
var a = "Hello World";

~a.indexOf( "lo" );			// -4   <-- truthy!

if (~a.indexOf( "lo" )) {	// true
	// found it!
}

~a.indexOf( "ol" );			// 0    <-- falsy!
!~a.indexOf( "ol" );		// true

if (!~a.indexOf( "ol" )) {	// true
	// not found!
}
```

`~` lấy giá trị trả về của `indexOf(..)` và biến đổi nó: đối với "lỗi" `-1`, chúng tôi nhận được `0` falsy và mọi giá trị khác là trusthy.

**Lưu ý:** Thuật toán giả `-(x+1)` cho `~` sẽ ngụ ý rằng `~-1` là `-0`, nhưng trên thực tế nó tạo ra `0` vì hoạt động cơ bản thực sự là theo bit , không phải toán học.

Về mặt kỹ thuật, `if (~a.indexOf(..))` vẫn dựa vào sự ép buộc *implicit* của kết quả `0` thành `false` hoặc khác 0 thành `true`. Nhưng nhìn chung, `~` đối với tôi vẫn giống như một cơ chế ép buộc *explicit* hơn, miễn là bạn biết ý định của nó trong thành ngữ này là gì.

Tôi thấy code này sạch hơn code `>= 0` / `== -1` trước đó.

##### Truncating Bits (Cắt bớt bit)

Còn một vị trí nữa `~` có thể xuất hiện trong mã mà bạn chạy qua: một số nhà phát triển sử dụng dấu ngã kép `~~` để cắt bớt phần thập phân của một `số` (nghĩa là "ép buộc" nó thành một số nguyên "số nguyên" ). Người ta thường (mặc dù nhầm lẫn) cho rằng đây là kết quả giống như việc gọi `Math.floor(..)`.

Cách `~~` hoạt động là `~` đầu tiên áp dụng "coercion" `ToInt32` và thực hiện lật bit, sau đó `~` thứ hai thực hiện lật bit khác, lật tất cả các bit trở lại trạng thái ban đầu. Kết quả cuối cùng chỉ là "coercion" `ToInt32` (còn gọi là truncation - cắt ngắn).

**Lưu ý:** Thao tác lật hai lần theo bit của `~~` rất giống với hành vi `!!` phủ định kép chẵn lẻ, được giải thích trong phần "Rõ ràng: * -> Boolean" sau này.

Tuy nhiên, `~~` cần thận trọng/làm rõ. Đầu tiên, nó chỉ hoạt động đáng tin cậy trên các giá trị 32 bit. Nhưng quan trọng hơn, nó không hoạt động giống như `Math.floor(..)` trên các số âm!

```js
Math.floor( -49.6 );	// -50
~~-49.6;				// -49
```

Đặt chênh lệch `Math.floor(..)` sang một bên, `~~x` có thể cắt ngắn thành số nguyên (32 bit). Nhưng `x | 0`, và dường như với (hơi) *ít nỗ lực hơn*.

Vì vậy, tại sao bạn có thể chọn `~~x` thay vì `x | 0` thì sao? Toán tử ưu tiên (xem Chương 5):

```js
~~1E20 / 10;		// 166199296

1E20 | 0 / 10;		// 1661992960
(1E20 | 0) / 10;	// 166199296
```

Cũng giống như tất cả các lời khuyên khác ở đây, chỉ sử dụng `~` và `~~` làm cơ chế rõ ràng để "coercion" và chuyển đổi giá trị nếu tất cả những người đọc/viết code như vậy đều nhận thức đúng về cách thức hoạt động của các toán tử này!

### Explicitly: Parsing Numeric Strings (Rõ ràng: Phân tích chuỗi số)

Có thể đạt được kết quả tương tự đối với việc ép `string` thành `number` bằng cách phân tích cú pháp `number` từ nội dung ký tự của `string`. Tuy nhiên, có sự khác biệt rõ ràng giữa phân tích cú pháp này và chuyển đổi loại mà chúng tôi đã kiểm tra ở trên.

Xem xét:

```js
var a = "42";
var b = "42px";

Number( a );	// 42
parseInt( a );	// 42

Number( b );	// NaN
parseInt( b );	// 42
```

Parsing (phân tích cú pháp) một giá trị number từ một string *bỏ qua* các ký tự không phải là number -- nó chỉ dừng phân tích cú pháp từ trái sang phải khi gặp phải -- trong khi tính năng coercion (cưỡng chế) *không cho phép* và dẫn đến giá trị `NaN`.

Parsing (Phân tích cú pháp) không nên được coi là một sự thay thế cho coercion (sự ép buộc). Hai nhiệm vụ này, trong khi giống nhau, có mục đích khác nhau. Parse (phân tích cú pháp) `string` dưới dạng `number` khi bạn không biết/quan tâm đến những ký tự không phải số nào khác có thể có ở phía bên tay phải. Coercion (ép buộc) `string` (thành `number`) khi các giá trị duy nhất được chấp nhận là số và giá trị nào đó như `"42px"` nên bị từ chối dưới dạng `number`.

**Mẹo:** `parseInt(..)` có một cặp song sinh, `parseFloat(..)`, mà (như cách gọi của nó) lấy ra một số dấu phẩy động từ một string.

Đừng quên rằng `parseInt(..)` hoạt động trên các giá trị `string`. Hoàn toàn vô nghĩa khi chuyển một giá trị `number` cho `parseInt(..)`. Cũng không hợp lý khi chuyển bất kỳ loại giá trị nào khác, chẳng hạn như `true`, `function(){..}` hoặc `[1,2,3]`.

Nếu bạn chuyển một giá trị không phải là `string`, thì giá trị bạn chuyển sẽ tự động bị ép thành `string` trước (xem "`ToString`" trước đó), đây rõ ràng là một loại ép buộc *implicit (ngầm)* ẩn. Việc dựa vào một hành vi như vậy trong chương trình của bạn thực sự là một ý tưởng tồi, vì vậy đừng bao giờ sử dụng `parseInt(..)` với giá trị không phải là `string`.

Trước ES5, một gotcha khác đã tồn tại với `parseInt(..)`, đây là nguồn gốc của nhiều lỗi chương trình JS. Nếu bạn không chuyển đối số thứ hai để cho biết cơ số (còn gọi là cơ số) nào sẽ được sử dụng để diễn giải nội dung `string` số, `parseInt(..)` sẽ xem xét (các) ký tự bắt đầu để đoán.

Nếu hai ký tự đầu tiên là `"0x"` hoặc `"0X"`, thì phỏng đoán (theo quy ước) là bạn muốn diễn giải `string` dưới dạng `number` thập lục phân (cơ số 16). Mặt khác, nếu ký tự đầu tiên là `"0"`, thì phỏng đoán (một lần nữa, theo quy ước) là bạn muốn diễn giải `string` dưới dạng một `number` bát phân (cơ số 8).

Các `string` thập lục phân (với `0x` hoặc `0X` đứng đầu) không dễ bị lẫn lộn lắm. Nhưng việc đoán số bát phân tỏ ra phổ biến một cách quỷ quyệt. Ví dụ:

```js
var hour = parseInt( selectedHour.value );
var minute = parseInt( selectedMinute.value );

console.log( "The time you selected was: " + hour + ":" + minute);
```

Có vẻ như vô hại, phải không? Thử chọn `08` cho giờ và `09` cho phút. Bạn sẽ nhận được `0:0`. Tại sao? bởi vì cả `8` và `9` đều không phải là ký tự hợp lệ trong cơ số bát phân-8.

Bản sửa lỗi trước ES5 rất đơn giản nhưng rất dễ quên: **luôn truyền `10` làm đối số thứ hai**. Điều này hoàn toàn an toàn:

```js
var hour = parseInt( selectedHour.value, 10 );
var minute = parseInt( selectedMiniute.value, 10 );
```

Kể từ ES5, `parseInt(..)` không còn đoán bát phân nữa. Trừ khi bạn nói khác, nó giả định cơ sở-10 (hoặc cơ sở-16 cho các tiền tố `"0x"`). Điều đó đẹp hơn nhiều. Chỉ cần cẩn thận nếu mã của bạn phải chạy trong môi trường trước ES5, trong trường hợp đó, bạn vẫn cần truyền `10` cho cơ số.

#### Parsing Non-Strings

Một ví dụ hơi tai tiếng về hành vi của `parseInt(..)` được nêu bật trong một bài đăng đùa châm biếm cách đây vài năm, chế nhạo hành vi JS này:

```js
parseInt( 1/0, 19 ); // 18
```

Khẳng định giả định (nhưng hoàn toàn không hợp lệ) là, "Nếu tôi vượt qua Infinity và phân tích một số nguyên từ đó, tôi sẽ lấy lại Infinity chứ không phải 18." Chắc hẳn JS phải phát điên lên vì kết cục này đúng không?

Mặc dù ví dụ này rõ ràng là giả tạo và không thực tế, nhưng chúng ta hãy tận hưởng sự điên rồ trong giây lát và kiểm tra xem liệu JS có thực sự điên rồ đến thế không.

Trước hết, lỗi rõ ràng nhất đã phạm phải ở đây là truyền một non-`string` vào `parseInt(..)`. Đó là một không-không. Làm điều đó và bạn đang yêu cầu rắc rối. Nhưng ngay cả khi bạn làm như vậy, JS vẫn lịch sự ép buộc những gì bạn truyền vào thành một `string` mà nó có thể cố phân tích cú pháp.

Một số người sẽ lập luận rằng đây là hành vi không hợp lý và `parseInt(..)` nên từ chối hoạt động trên một giá trị non-`string`. Có lẽ nó nên ném một lỗi? Thành thật mà nói, điều đó sẽ rất giống Java. Tôi rùng mình khi nghĩ rằng JS nên bắt đầu ném lỗi khắp nơi để `try..catch` là cần thiết ở hầu hết mọi dòng.

Nó có nên trả lại `NaN` không? Có lẽ. Nhưng... còn:

```js
parseInt( new String( "42") );
```

Điều đó cũng nên thất bại? Đó là một giá trị không phải là `chuỗi`. Nếu bạn muốn object wrapper `String` đó được mở hộp thành `"42"`, thì việc `42` đầu tiên trở thành `"42"` để `42` có thể được phân tích cú pháp trở lại có thực sự bất thường không?

Tôi cho rằng sự ép buộc nửa *explicit*, nửa *implicit* này có thể xảy ra thường có thể là một điều rất hữu ích. Ví dụ:

```js
var a = {
	num: 21,
	toString: function() { return String( this.num * 2 ); }
};

parseInt( a ); // 42
```

Thực tế là `parseInt(..)` ép buộc giá trị của nó thành `string` để thực hiện phân tích cú pháp là khá hợp lý. Nếu bạn bỏ rác vào và bạn lấy lại được rác, đừng đổ lỗi cho thùng rác -- nó chỉ làm công việc của mình một cách trung thực.

Vì vậy, nếu bạn chuyển vào một giá trị như `Infinity` (rõ ràng là kết quả của `1 / 0`), thì kiểu biểu diễn `string` nào sẽ có ý nghĩa nhất đối với sự ép buộc của nó? Bạn chỉ nghĩ đến hai lựa chọn hợp lý: `"Infinity"` và `"∞"`. JS đã chọn `"Infinity"`. Tôi rất vui vì nó đã làm.

Tôi nghĩ thật tốt khi **tất cả các giá trị** trong JS có một số loại biểu diễn `string` mặc định, do đó chúng không phải là những hộp đen bí ẩn mà chúng ta không thể gỡ lỗi và suy luận.

Bây giờ, còn cơ sở 19 thì sao? Rõ ràng, hoàn toàn không có thật và giả tạo. Không có chương trình JS nào sử dụng base-19. Thật vô lý. Nhưng một lần nữa, hãy thưởng thức sự lố bịch. Trong cơ số 19, các ký tự số hợp lệ là `0` - `9` và `a` - `i` (không phân biệt chữ hoa chữ thường).

Vì vậy, hãy quay lại ví dụ `parseInt( 1/0, 19 )` của chúng ta. Về cơ bản, nó là `parseInt("Infinity", 19 )`. Làm thế nào để nó phân tích cú pháp? Ký tự đầu tiên là `"I"`, là giá trị `18` trong cơ sở ngớ ngẩn-19. Ký tự thứ hai `"n"` không nằm trong tập hợp các ký tự số hợp lệ và do đó, quá trình phân tích cú pháp chỉ dừng lại một cách lịch sự, giống như khi nó chạy qua `"p"` trong `"42px"`.

Kết quả? `18`. Chính xác như nó hợp lý nên được. Các hành vi liên quan để đưa chúng ta đến đó, chứ không phải lỗi hay bản thân `Infinity`, là **rất quan trọng** đối với JS và không nên dễ dàng loại bỏ.

Các ví dụ khác về hành vi này với `parseInt(..)` có thể gây ngạc nhiên nhưng khá hợp lý bao gồm:

```js
parseInt( 0.000008 );		// 0   ("0" from "0.000008")
parseInt( 0.0000008 );		// 8   ("8" from "8e-7")
parseInt( false, 16 );		// 250 ("fa" from "false")
parseInt( parseInt, 16 );	// 15  ("f" from "function..")

parseInt( "0x10" );			// 16
parseInt( "103", 2 );		// 2
```

`parseInt(..)` thực sự khá dễ đoán và nhất quán trong hành vi của nó. Nếu bạn sử dụng nó một cách chính xác, bạn sẽ nhận được kết quả hợp lý. Nếu bạn sử dụng nó không đúng cách, kết quả điên rồ mà bạn nhận được không phải là lỗi của JavaScript.

### Explicitly: * --> Boolean

Bây giờ, hãy kiểm tra việc ép kiểu từ bất kỳ giá trị không phải `boolean` nào thành `boolean`.

Cũng giống như với `String(..)` và `Number(..)` ở trên, `Boolean(..)` (tất nhiên là không có `new`!) là một cách rõ ràng để ép kiểu `ToBoolean`:

```js
var a = "0";
var b = [];
var c = {};

var d = "";
var e = 0;
var f = null;
var g;

Boolean( a ); // true
Boolean( b ); // true
Boolean( c ); // true

Boolean( d ); // false
Boolean( e ); // false
Boolean( f ); // false
Boolean( g ); // false
```

Mặc dù `Boolean(..)` rõ ràng là rõ ràng, nhưng nó hoàn toàn không phổ biến hoặc thành ngữ.

Cũng giống như toán tử đơn nguyên `+` ép buộc một giá trị thành `number` (xem ở trên), toán tử phủ định `!` đơn nguyên ép buộc một giá trị thành `boolean` một cách rõ ràng. *Vấn đề* là nó cũng chuyển giá trị từ truthy sang falsy hoặc ngược lại. Vì vậy, cách phổ biến nhất mà các nhà phát triển JS buộc phải sử dụng `boolean` một cách rõ ràng là sử dụng toán tử phủ định kép `!!`, bởi vì `!` thứ hai sẽ lật tính chẵn lẻ trở lại ban đầu:

```js
var a = "0";
var b = [];
var c = {};

var d = "";
var e = 0;
var f = null;
var g;

!!a;	// true
!!b;	// true
!!c;	// true

!!d;	// false
!!e;	// false
!!f;	// false
!!g;	// false
```

Bất kỳ sự ép buộc `ToBoolean` nào trong số này sẽ xảy ra *ngầm định* mà không có `Boolean(..)` hoặc `!!`, nếu được sử dụng trong ngữ cảnh `boolean`, chẳng hạn như câu lệnh `if (..) ..`. Nhưng mục tiêu ở đây là ép buộc giá trị thành `boolean` một cách rõ ràng để làm rõ ràng hơn rằng mục đích ép buộc `ToBoolean` là có ý định.

Một trường hợp sử dụng ví dụ khác cho cưỡng chế `ToBoolean` rõ ràng là nếu bạn muốn cưỡng chế giá trị `true`/`false` trong tuần tự hóa JSON của cấu trúc dữ liệu:

```js
var a = [
	1,
	function(){ /*..*/ },
	2,
	function(){ /*..*/ }
];

JSON.stringify( a ); // "[1,null,2,null]"

JSON.stringify( a, function(key,val){
	if (typeof val == "function") {
		// force `ToBoolean` coercion of the function
		return !!val;
	}
	else {
		return val;
	}
} );
// "[1,true,2,true]"
```

Nếu bạn đến với JavaScript từ Java, bạn có thể nhận ra cú pháp này:

```js
var a = 42;

var b = a ? true : false;
```

`? :` Toán tử ba ngôi sẽ kiểm tra tính đúng đắn của `a` và dựa trên kiểm tra đó sẽ gán `true` hoặc `false` cho `b`, tương ứng.

Nhìn bề ngoài, cú pháp này trông giống như một dạng ép kiểu *explicit(tường minh)* `ToBoolean`, vì rõ ràng là chỉ có `true` hoặc `false` xuất hiện trong phép toán.

Tuy nhiên, có một sự ép kiểu *implicit (ngầm)* ẩn, trong đó biểu thức `a` trước tiên phải được ép kiểu thành `boolean` để thực hiện kiểm tra tính đúng đắn. Tôi muốn gọi biểu thức này là "rõ ràng ngầm hiểu." Hơn nữa, tôi đề nghị **bạn nên tránh hoàn toàn thành ngữ này** trong JavaScript. Nó không mang lại lợi ích thực sự nào, và tệ hơn, nó giả dạng thành một thứ không phải.

`Boolean(a)` và `!!a` là các tùy chọn ép kiểu *rõ ràng* tốt hơn nhiều.

## Implicit Coercion (Ép kiểu ngầm)

*Implicit* coercion đề cập đến các chuyển đổi loại bị ẩn, với các non-obvious side-effects (tác dụng phụ không rõ ràng) xảy ra ngầm từ các hành động khác. Nói cách khác, *implicit coercions* là bất kỳ loại chuyển đổi nào không rõ ràng (đối với bạn).

Mặc dù rõ ràng mục tiêu của *explicit* coercion là (làm cho mã rõ ràng và dễ hiểu hơn), nhưng có thể *quá* rõ ràng rằng *implicit* coercion có mục tiêu ngược lại: làm cho code khó hiểu hơn.

Xét theo giá trị bề ngoài, tôi tin rằng đó là lý do bắt nguồn phần lớn sự phẫn nộ đối với sự ép kiểu. Phần lớn các khiếu nại về "JavaScript coercion" thực sự nhằm vào (dù họ có nhận ra hay không) vào sự *implicit* coercion.

**Lưu ý:** Douglas Crockford, tác giả của *"JavaScript: The Good Part"*, đã tuyên bố trong nhiều bài viết và bài nói chuyện tại hội nghị rằng nên tránh sử dụng tính cưỡng chế của JavaScript. Nhưng ý của anh ấy dường như là sự *implicit* coercion là xấu (theo ý kiến của anh ấy). Tuy nhiên, nếu bạn đọc code của chính anh ấy, bạn sẽ tìm thấy rất nhiều ví dụ về sự ép buộc, cả *ngầm* và *rõ ràng*! Trên thực tế, sự tức giận của anh ấy dường như chủ yếu nhắm vào thao tác `==`, nhưng như bạn sẽ thấy trong chương này, đó chỉ là một phần của cơ chế ép buộc.

Vì vậy, **cưỡng chế ngầm** có xấu xa không? Nó có nguy hiểm không? Đây có phải là một lỗ hổng trong thiết kế của JavaScript không? Chúng ta có nên tránh nó bằng mọi giá?

Tôi cá là hầu hết các bạn độc giả đều có xu hướng cổ vũ nhiệt tình, "Vâng!"

**Không quá nhanh.** Hãy nghe tôi nói.

Chúng ta hãy có một góc nhìn khác về *implicit* coercion (sự ép buộc/kiểu *ngầm*) là gì, và có thể là gì, hơn là việc nó "đối lập với hình thức ép buộc rõ ràng tốt." Điều đó quá hẹp và bỏ lỡ một sắc thái quan trọng.

Hãy xác định mục tiêu của *implicit* coercion là: để giảm mức độ dài dòng, bản tóm tắt và/hoặc chi tiết triển khai không cần thiết làm lộn xộn code của chúng ta bằng tiếng ồn làm xao nhãng ý định quan trọng hơn.

### Simplifying Implicitly

Trước khi chúng ta bắt đầu với JavaScript, hãy để tôi đề xuất một thứ gì đó psudo-code (giả mã) từ một số ngôn ngữ ràng buộc kiểu chặt chẽ về mặt lý thuyết để minh họa:

```js
SomeType x = SomeType( AnotherType( y ) )
```

Trong ví dụ này, tôi có một số loại giá trị tùy ý trong `y` mà tôi muốn chuyển đổi thành loại `SomeType`. Vấn đề là, ngôn ngữ này không thể chuyển trực tiếp từ `y` hiện tại sang `SomeType`. Nó cần một bước trung gian, trong đó đầu tiên nó chuyển đổi thành `AnotherType`, sau đó từ `AnotherType` thành `SomeType`.

Bây giờ, điều gì sẽ xảy ra nếu ngôn ngữ đó (hoặc định nghĩa mà bạn có thể tự tạo bằng ngôn ngữ đó) *đã làm* chỉ để bạn nói:

```js
SomeType x = SomeType( y )
```

Nhìn chung, bạn có đồng ý rằng chúng tôi đã đơn giản hóa việc chuyển đổi loại ở đây để giảm bớt "nhũng nhiễu" không cần thiết của bước chuyển đổi trung gian không? Ý tôi là, điều đó có *thực sự* quan trọng đến vậy không, ngay tại thời điểm này trong mã, để xem và xử lý thực tế là `y` đi đến `AnotherType` trước rồi mới đến `SomeType`?

Một số sẽ tranh luận, ít nhất là trong một số trường hợp, vâng. Nhưng tôi nghĩ có thể đưa ra một lập luận bình đẳng về nhiều trường hợp khác mà ở đây, sự đơn giản hóa **thực sự hỗ trợ khả năng đọc mã** bằng cách trừu tượng hóa hoặc ẩn đi các chi tiết đó, trong chính ngôn ngữ đó hoặc trong sự trừu tượng hóa của chính chúng ta.

Không còn nghi ngờ gì nữa, đằng sau hậu trường, ở đâu đó, bước chuyển đổi trung gian vẫn đang diễn ra. Nhưng nếu chi tiết đó bị ẩn khỏi chế độ xem ở đây, chúng ta có thể lập luận về việc sử dụng `y` để nhập `SomeType` như một thao tác chung và ẩn các chi tiết lộn xộn.

Mặc dù không phải là một phép loại suy hoàn hảo, nhưng điều tôi sẽ tranh luận trong suốt phần còn lại của chương này là *implicit* coercion của JS có thể được coi là cung cấp một trợ giúp tương tự cho code của bạn.

Nhưng, **và điều này rất quan trọng**, đó không phải là một tuyên bố tuyệt đối, vô giới hạn. Chắc chắn có rất nhiều *tệ nạn* ẩn nấp xung quanh *implicit* coercion, điều đó sẽ gây hại cho code của bạn nhiều hơn bất kỳ cải tiến tiềm năng nào về khả năng đọc. Rõ ràng, chúng ta phải học cách tránh những cấu trúc như vậy để chúng ta không đầu độc code của mình bằng đủ loại lỗi.

Nhiều nhà phát triển tin rằng nếu một cơ chế có thể thực hiện một số điều hữu ích **A** nhưng cũng có thể bị lạm dụng hoặc lạm dụng để thực hiện một số điều tồi tệ **Z**, thì chúng ta nên loại bỏ hoàn toàn cơ chế đó, để đảm bảo an toàn.

Lời động viên của tôi dành cho bạn là: đừng chấp nhận điều đó. Don't "throw the baby out with the bathwater." (idom trong tiếng anh hàm ý cái tốt bị loại bỏ khi bỏ một cái xấu) Đừng cho rằng sự *implicit* coercion là hoàn toàn xấu vì tất cả những gì bạn nghĩ bạn từng thấy là "phần xấu" của nó. Tôi nghĩ rằng có những "phần tốt" ở đây và tôi muốn giúp đỡ cũng như truyền cảm hứng cho nhiều bạn hơn để tìm và nắm lấy chúng!

### Implicitly: Strings <--> Numbers

Trước đó trong chương này, chúng ta đã khám phá sự ép buộc *rõ ràng* giữa các giá trị `string` và `number`. Bây giờ, hãy cùng khám phá nhiệm vụ tương tự nhưng với cách tiếp cận *implicit* coercion. Nhưng trước khi làm, chúng ta phải xem xét một số sắc thái của các hoạt động sẽ *ngầm* cưỡng chế.

Toán tử `+` bị quá tải để phục vụ mục đích của cả phép cộng `số` và phép nối `chuỗi`. Vậy làm cách nào để JS biết loại hoạt động nào bạn muốn sử dụng? Xem xét:

```js
var a = "42";
var b = "0";

var c = 42;
var d = 0;

a + b; // "420"
c + d; // 42
```

Điều gì khác biệt gây ra `"420"` so với `42`? Đó là một quan niệm sai lầm phổ biến rằng sự khác biệt là liệu một hoặc cả hai toán hạng có phải là một `string` hay không, vì điều đó có nghĩa là `+` sẽ đảm nhận phép nối `string`. Mặc dù điều đó đúng một phần, nhưng nó phức tạp hơn thế.

Xem xét:

```js
var a = [1,2];
var b = [3,4];

a + b; // "1,23,4"
```

Cả hai toán hạng này đều không phải là `string`, nhưng rõ ràng cả hai đều bị ép buộc thành `string` và sau đó phép nối `string` bắt đầu hoạt động. Vậy điều gì đang thực sự xảy ra?

(**Cảnh báo:** Sắp có bài phát biểu cụ thể gay gắt sâu sắc, vì vậy hãy bỏ qua hai đoạn tiếp theo nếu điều đó khiến bạn sợ hãi!)

-----

Theo phần đặc tả ES5 11.6.1, thuật toán `+` (khi giá trị `đối tượng` là một toán hạng) sẽ nối nếu một trong hai toán hạng đã là một `string` hoặc nếu các bước sau tạo ra một biểu diễn `string`. Vì vậy, khi `+` nhận được một `string` (bao gồm `array`) cho một trong hai toán hạng, trước tiên, nó gọi thao tác trừu tượng `ToPrimitive` (phần 9.1) trên giá trị, sau đó gọi thuật toán `[[DefaultValue]]` (phần 8.12.8) với gợi ý ngữ cảnh là `number`.

Nếu để ý kỹ, bạn sẽ nhận thấy rằng thao tác này hiện giống hệt với cách thao tác trừu tượng `ToNumber` xử lý `object` (xem phần "`ToNumber`"" trước đó). `valueOf()` hoạt động trên `array` sẽ không thể tạo ra một nguyên hàm đơn giản, do đó, nó sẽ chuyển thành biểu diễn `toString()`. Do đó, hai `array` trở thành `"1,2"` và `"3,4"` , tương ứng. Bây giờ, `+` nối hai `string` như bạn thường mong đợi: `"1,23,4"`.

-----

Hãy tạm gác những chi tiết lộn xộn đó sang một bên và quay trở lại phần giải thích đơn giản, trước đó: nếu toán hạng của `+` là một `string` (hoặc trở thành một với các bước trên!), thao tác sẽ là phép nối `string`. Mặt khác, nó luôn là phép cộng số.

**Lưu ý:** Một coercion gotcha thường được trích dẫn là `[] + {}` so với `{} + []`, vì hai biểu thức đó dẫn đến kết quả tương ứng là `"[đối tượng đối tượng]"` và `0` . Tuy nhiên, còn nhiều điều nữa và chúng tôi sẽ đề cập đến những chi tiết đó trong "Blocks" ở Chương 5.

Điều đó có ý nghĩa gì đối với *implicit* coercion?

Bạn có thể ép buộc `number` thành `string` chỉ bằng cách "thêm" `number` và `""` empty `string`:

```js
var a = 42;
var b = a + "";

b; // "42"
```

**Mẹo:** Phép cộng số với toán tử `+` có tính chất giao hoán, có nghĩa là `2 + 3` giống như `3 + 2`. Nối chuỗi với `+` rõ ràng không phải là giao hoán, **nhưng** với trường hợp cụ thể của `""`, nó có tính giao hoán hiệu quả, vì `a + ""` và `"" + a` sẽ tạo ra kết quả tương tự .

Việc (*ngầm*) ép buộc `number` thành `string` bằng thao tác `+ ""` là cực kỳ phổ biến/thành ngữ. Trên thực tế, thật thú vị, ngay cả một số người chỉ trích mạnh mẽ nhất về sự ép buộc *ngầm* vẫn sử dụng cách tiếp cận đó trong code của riêng họ, thay vì một trong những lựa chọn thay thế *rõ ràng* của nó.

**Tôi nghĩ đây là một ví dụ tuyệt vời** về một hình thức hữu ích trong *implicit* coercion, bất chấp tần suất cơ chế này bị chỉ trích!

So sánh *implicit* coercion này của `a + ""` với ví dụ trước đây của chúng ta về sự ép buộc `String(a)` *rõ ràng*, có một vấn đề bổ sung cần lưu ý. Do cách hoạt động của thao tác trừu tượng `ToPrimitive`, `a + ""` gọi `valueOf()` trên giá trị `a`, giá trị trả về của nó sau đó cuối cùng được chuyển đổi thành `string` thông qua thao tác trừu tượng `ToString` bên trong . Nhưng `String(a)` chỉ gọi trực tiếp `toString()`.

Cả hai cách tiếp cận cuối cùng đều dẫn đến một `string`, nhưng nếu bạn đang sử dụng một `object` thay vì một giá trị `number` nguyên thủy thông thường, bạn có thể không nhất thiết phải nhận được giá trị *giống nhau* `string`!

Xem xét:

```js
var a = {
	valueOf: function() { return 42; },
	toString: function() { return 4; }
};

a + "";			// "42"

String( a );	// "4"
```

Nói chung, loại gotcha này sẽ không cắn bạn trừ khi bạn thực sự đang cố gắng tạo các cấu trúc dữ liệu và hoạt động khó hiểu, nhưng bạn nên cẩn thận nếu bạn đang xác định cả hai phương thức `valueOf()` và `toString()` của riêng mình đối với một số `object`, vì cách bạn ép buộc giá trị có thể ảnh hưởng đến kết quả.

Còn hướng khác thì sao? Làm cách nào chúng ta có thể *ngầm ép buộc* từ `string` thành `number`?

```js
var a = "3.14";
var b = a - 0;

b; // 3.14
```

Toán tử `-` chỉ được xác định cho phép trừ số, do đó, `a - 0` buộc giá trị của `a` thành một `số`. Mặc dù ít phổ biến hơn nhiều, nhưng `a * 1` hoặc `a / 1` sẽ cho kết quả tương tự, vì các toán tử đó cũng chỉ được xác định cho các phép toán số.

Còn các giá trị `đối tượng` với toán tử `-` thì sao? Câu chuyện tương tự như đối với `+` ở trên:

```js
var a = [3];
var b = [1];

a - b; // 2
```

Cả hai giá trị `array` phải trở thành `number`, nhưng cuối cùng chúng bị ép thành `string` (sử dụng cách sắp xếp theo thứ tự `toString()` dự kiến), sau đó được ép thành `number`, cho `- ` phép trừ để thực hiện trên.

Vì vậy, có phải sự ép buộc *ngầm* của các giá trị `string` và `number` là ác quỷ xấu xí mà bạn luôn nghe những câu chuyện kinh dị? Cá nhân tôi không nghĩ như vậy.

So sánh `b = String(a)` (*rõ ràng*) với `b = a + ""` (*ngầm*). Tôi nghĩ rằng các trường hợp có thể được thực hiện cho cả hai cách tiếp cận hữu ích trong mã của bạn. Chắc chắn `b = a + ""` khá phổ biến hơn một chút trong các chương trình JS, chứng minh tiện ích của chính nó bất kể *cảm xúc* về giá trị hay mối nguy hiểm của sự ép buộc *ngầm* nói chung.

### Implicitly: Booleans --> Numbers

Tôi nghĩ rằng một trường hợp mà sự ép buộc *ngầm* có thể thực sự tỏa sáng là đơn giản hóa một số loại logic `boolean` phức tạp thành phép cộng số đơn giản. Tất nhiên, đây không phải là một kỹ thuật có mục đích chung, mà là một giải pháp cụ thể cho các trường hợp cụ thể.

Xem xét:

```js
function onlyOne(a,b,c) {
	return !!((a && !b && !c) ||
		(!a && b && !c) || (!a && !b && c));
}

var a = true;
var b = false;

onlyOne( a, b, b );	// true
onlyOne( b, a, b );	// true

onlyOne( a, b, a );	// false
```

Tiện ích `onlyOne(..)` này chỉ nên trả về `true` nếu chính xác một trong các đối số là `true` / sự thật. Đó là sử dụng cưỡng chế *ngầm* đối với các lần kiểm tra truthy và cưỡng chế *rõ ràng* đối với các kiểm tra khác, bao gồm cả giá trị trả về cuối cùng.

Nhưng nếu chúng ta cần utility (tiện ích) đó để có thể xử lý bốn, năm hoặc hai mươi cờ theo cùng một cách thì sao? Thật khó để tưởng tượng việc triển khai mã sẽ xử lý tất cả các hoán vị so sánh đó.

Nhưng đây là nơi việc ép buộc các giá trị `boolean` thành `number` (rõ ràng là `0` hoặc `1`) có thể giúp ích rất nhiều:

```js
function onlyOne() {
	var sum = 0;
	for (var i=0; i < arguments.length; i++) {
		// skip falsy values. same as treating
		// them as 0's, but avoids NaN's.
		if (arguments[i]) {
			sum += arguments[i];
		}
	}
	return sum == 1;
}

var a = true;
var b = false;

onlyOne( b, a );		// true
onlyOne( b, a, b, b, b );	// true

onlyOne( b, b );		// false
onlyOne( b, a, b, b, b, a );	// false
```

**Lưu ý:** Tất nhiên, thay vì vòng lặp `for` trong `onlyOne(..)`, bạn có thể sử dụng tiện ích `reduce(..)` của ES5 một cách ngắn gọn hơn, nhưng tôi không muốn che khuất các khái niệm.

Những gì chúng tôi đang làm ở đây là dựa vào `1` cho các cưỡng chế `true`/truthy và cộng tất cả chúng lại bằng số. `sum += arguments[i]` sử dụng cưỡng chế *ngầm* để thực hiện điều đó. Nếu một và chỉ một giá trị trong danh sách `arguments` là `true`, thì tổng số sẽ là `1`, nếu không thì tổng sẽ không phải là `1` và do đó điều kiện mong muốn không được đáp ứng.

Tất nhiên, chúng ta có thể làm điều này bằng cách ép buộc *rõ ràng*:

```js
function onlyOne() {
	var sum = 0;
	for (var i=0; i < arguments.length; i++) {
		sum += Number( !!arguments[i] );
	}
	return sum === 1;
}
```

Trước tiên, chúng tôi sử dụng `!!arguments[i]` để ép buộc giá trị thành `true` hoặc `false`. Đó là để bạn có thể chuyển các giá trị không phải `boolean` vào, chẳng hạn như `onlyOne( "42", 0 )`, và nó vẫn hoạt động như mong đợi (nếu không, bạn sẽ kết thúc với phép nối `string` và logic sẽ không chính xác ).

Khi chúng tôi chắc chắn đó là `boolean`, chúng tôi thực hiện một phép cưỡng chế *rõ ràng* khác với `Number(..)` để đảm bảo giá trị là `0` hoặc `1`.

Hình thức cưỡng chế *rõ ràng* của utility này có "tốt hơn" không? Nó tránh bẫy `NaN` như được giải thích trong các nhận xét về code. Nhưng, cuối cùng, nó phụ thuộc vào nhu cầu của bạn. Cá nhân tôi nghĩ rằng phiên bản cũ, dựa vào sự ép buộc *ngầm* sẽ tao nhã hơn (nếu bạn không chuyển `undefined` hoặc `NaN`) và phiên bản *rõ ràng* dài dòng hơn một cách không cần thiết.

Nhưng cũng giống như hầu hết mọi thứ chúng ta đang thảo luận ở đây, đó là một lời kêu gọi phán xét.

**Lưu ý:** Bất kể cách tiếp cận *ngầm* hay *rõ ràng*, bạn có thể dễ dàng tạo các biến thể `onlyTwo(..)` hoặc `onlyFive(..)` bằng cách chỉ cần thay đổi phép so sánh cuối cùng từ `1` thành ` 2` hoặc `5`, tương ứng. Điều đó dễ dàng hơn rất nhiều so với việc thêm một loạt các biểu thức `&&` và `||`. Vì vậy, nói chung, cưỡng chế là rất hữu ích trong trường hợp này.

### Implicitly: * --> Boolean

Bây giờ, chúng ta hãy chuyển sự chú ý của chúng ta sang sự ép buộc *ngầm* đối với các giá trị `boolean`, vì cho đến nay nó là phổ biến nhất và cũng có khả năng gây rắc rối nhất.

Hãy nhớ rằng, cưỡng chế *ngầm* là những gì bắt đầu khi bạn sử dụng một giá trị theo cách mà nó buộc giá trị phải được chuyển đổi. Đối với các phép toán số và `string`, khá dễ dàng để biết cách thức cưỡng chế có thể xảy ra.

Tuy nhiên, loại thao tác biểu thức nào yêu cầu/buộc (*ngầm*) một phép cưỡng chế `boolean`?

1. Biểu thức kiểm tra trong câu lệnh `if (..)`.
2. Biểu thức kiểm tra (mệnh đề thứ hai) trong cú pháp `for ( .. ; .. ; .. )`.
3. Biểu thức kiểm tra trong các vòng lặp `while (..)` và `do..while(..)`.
4. Biểu thức kiểm tra (mệnh đề đầu tiên) trong `? :` biểu thức bậc ba.
5. Toán hạng bên trái (đóng vai trò là biểu thức kiểm tra -- xem bên dưới!) cho toán tử `||` ("logic hoặc") và `&&` ("logic và").

Bất kỳ giá trị nào được sử dụng trong các ngữ cảnh này mà chưa phải là `boolean` sẽ bị *ngầm* ép buộc thành `boolean` bằng cách sử dụng các quy tắc của thao tác trừu tượng `ToBoolean` được trình bày trước đó trong chương này.

Hãy xem xét một số ví dụ:

```js
var a = 42;
var b = "abc";
var c;
var d = null;

if (a) {
	console.log( "yep" );		// yep
}

while (c) {
	console.log( "nope, never runs" );
}

c = d ? a : b;
c;					// "abc"

if ((a && d) || c) {
	console.log( "yep" );		// yep
}
```

Trong tất cả các ngữ cảnh này, các giá trị không phải `boolean` được *ngầm ép buộc* với các giá trị `boolean` tương đương của chúng để đưa ra các quyết định thử nghiệm.

### Operators `||` and `&&`

Rất có thể bạn đã thấy các toán tử `||` ("logic hoặc") và `&&` ("logic và") trong hầu hết hoặc tất cả các ngôn ngữ khác mà bạn đã sử dụng. Vì vậy, thật tự nhiên khi cho rằng chúng hoạt động cơ bản giống nhau trong JavaScript cũng như trong các ngôn ngữ tương tự khác.

Có một số sắc thái rất ít được biết đến, nhưng rất quan trọng ở đây.

Trên thực tế, tôi cho rằng các toán tử này thậm chí không nên được gọi là "toán tử ___ logic", vì tên đó không đầy đủ trong việc mô tả những gì chúng làm. Nếu tôi đặt cho chúng một cái tên chính xác hơn (nếu vụng về hơn), tôi sẽ gọi chúng là "toán tử bộ chọn" hoặc đầy đủ hơn là "toán tử bộ chọn toán hạng".

Tại sao? Bởi vì chúng không thực sự dẫn đến giá trị *logic* (hay còn gọi là `boolean`) trong JavaScript, như chúng làm trong một số ngôn ngữ khác.

Vì vậy, những gì *làm* họ dẫn đến? Chúng dẫn đến giá trị của một (và chỉ một) trong hai toán hạng của chúng. Nói cách khác, **họ chọn một trong hai giá trị của toán hạng**.

Trích dẫn thông số ES5 từ phần 11.11:

> Giá trị được tạo bởi && hoặc || toán tử không nhất thiết phải thuộc kiểu Boolean. Giá trị được tạo ra sẽ luôn là giá trị của một trong hai biểu thức toán hạng.

Hãy minh họa:

```js
var a = 42;
var b = "abc";
var c = null;

a || b;		// 42
a && b;		// "abc"

c || b;		// "abc"
c && b;		// null
```

**Đợi đã, cái gì!?** Hãy nghĩ về điều đó. Trong các ngôn ngữ như C và PHP, những biểu thức đó dẫn đến `true` hoặc `false`, nhưng trong JS (và Python và Ruby, đối với vấn đề đó!), kết quả đến từ chính các giá trị đó.

Cả toán tử `||` và `&&` đều thực hiện kiểm tra `boolean` trên **toán hạng đầu tiên** (`a` hoặc `c`). Nếu toán hạng chưa phải là `boolean` (vì nó không phải ở đây), thì một sự ép buộc `ToBoolean` bình thường sẽ xảy ra để có thể thực hiện kiểm tra.

Đối với toán tử `||`, nếu phép kiểm tra là `true`, thì biểu thức `||` sẽ trả về giá trị của *toán hạng đầu tiên* (`a` hoặc `c`). Nếu kiểm tra là `false`, thì biểu thức `||` dẫn đến giá trị của *toán hạng thứ hai* (`b`).

Ngược lại, đối với toán tử `&&`, nếu kiểm tra là `true`, thì biểu thức `&&` sẽ trả về giá trị của toán hạng *thứ hai* (`b`). Nếu kiểm tra là `false`, thì biểu thức `&&` sẽ trả về giá trị của *toán hạng đầu tiên* (`a` hoặc `c`).

Kết quả của biểu thức `||` hoặc `&&` luôn là giá trị cơ bản của một trong các toán hạng, **chứ không phải** kết quả (có thể bị ép buộc) của phép thử. Trong `c && b`, `c` là `null`, và do đó sai. Nhưng bản thân biểu thức `&&` dẫn đến `null` (giá trị trong `c`), chứ không phải `false` bị ép buộc được sử dụng trong thử nghiệm.

Bây giờ bạn có thấy các toán tử này hoạt động như "bộ chọn toán hạng" không?

Một cách suy nghĩ khác về các toán tử này:

```js
a || b;
// roughly equivalent to:
a ? a : b;

a && b;
// roughly equivalent to:
a ? b : a;
```

**Lưu ý:** Tôi gọi `a || b` "gần tương đương" với `a ? a : b` vì kết quả giống hệt nhau, nhưng có một sự khác biệt về sắc thái. Trong `a ? a : b`, nếu `a` là một biểu thức phức tạp hơn (chẳng hạn như biểu thức có thể có side effect như gọi một `function`, v.v.), thì biểu thức `a` có thể được tính toán hai lần (nếu biểu thức đầu tiên đánh giá truthy). Ngược lại, đối với `a || b`, biểu thức `a` chỉ được ước tính một lần và giá trị đó được sử dụng cho cả phép thử cưỡng chế cũng như giá trị kết quả (nếu thích hợp). Sắc thái tương tự áp dụng cho `a && b` và `a ? biểu thức b : a`.

Một cách sử dụng hành vi này cực kỳ phổ biến và hữu ích, rất có thể bạn đã từng sử dụng trước đây và chưa hiểu rõ, đó là:

```js
function foo(a,b) {
	a = a || "hello";
	b = b || "world";

	console.log( a + " " + b );
}

foo();					// "hello world"
foo( "yeah", "yeah!" );	// "yeah yeah!"
```

Biểu thức `a = a || "hello"` (đôi khi được cho là JavaScript's version of the C# "null coalescing operator") hoạt động để kiểm tra `a` và nếu nó không có giá trị (hoặc chỉ là giá trị giả không mong muốn), thì sẽ cung cấp giá trị mặc định dự phòng (`"hello"`).

**Hãy cẩn thận**, mặc dù!

```js
foo( "That's it!", "" ); // "That's it! world" <-- Oops!
```

Thấy vấn đề? `""` vì đối số thứ hai là một giá trị falsy (xem `ToBoolean` trước đó trong chương này), vì vậy `b = b || "world"` không thành công và giá trị mặc định `"world"` được thay thế, mặc dù mục đích có thể là để `""` được thông qua rõ ràng là giá trị được gán cho `b`.

Biểu thức `||` này cực kỳ phổ biến và khá hữu ích, nhưng bạn chỉ phải sử dụng nó trong những trường hợp nên bỏ qua *tất cả các giá trị falsy*. Nếu không, bạn sẽ cần phải rõ ràng hơn trong bài kiểm tra của mình và có thể sử dụng toán tử ba ngôi `? :` thay thế.

Biểu thức *gán giá trị mặc định* này rất phổ biến (và hữu ích!) đến nỗi ngay cả những người công khai và kịch liệt chỉ trích sự ép buộc của JavaScript cũng thường sử dụng nó trong mã của họ!

Còn `&&` thì sao?

Có một biểu thức khác ít được viết thủ công hơn một chút, nhưng lại được các công cụ JS minifier sử dụng thường xuyên. Toán tử `&&` "chọn" toán hạng thứ hai khi và chỉ khi toán hạng thứ nhất kiểm tra tính truthy và cách sử dụng này đôi khi được gọi là "toán tử bảo vệ" (cũng xem "Short Circuited (đoản mạch)" trong Chương 5) -- phép kiểm tra biểu thức đầu tiên "bảo vệ" biểu thức thứ hai:

```js
function foo() {
	console.log( a );
}

var a = 42;

a && foo(); // 42
```

`foo()` được gọi chỉ vì `a` kiểm tra truthy. Nếu kiểm tra đó không thành công, câu lệnh biểu thức `a && foo()` này sẽ dừng âm thầm -- điều này được gọi là "short circuited" -- và không bao giờ gọi `foo()`.

Một lần nữa, việc mọi người viết ra những thứ như vậy gần như không phổ biến. Thông thường, họ sẽ làm `if (a) { foo(); }` thay vào đó. Nhưng các công cụ khai thác JS chọn `a && foo()` vì nó ngắn hơn nhiều. Vì vậy, bây giờ, nếu bạn phải giải mã mã như vậy, bạn sẽ biết nó đang làm gì và tại sao.

OK, vì vậy `||` và `&&` có một số thủ thuật tinh vi, miễn là bạn sẵn sàng cho phép *implicit* coercion vào trộn lẫn.

**Lưu ý:** Cả `a = b || Các thành ngữ "something"` và `a && b()` dựa trên hành vi short circuiting (đoản mạch) mà chúng tôi sẽ đề cập chi tiết hơn trong Chương 5.

Thực tế là những toán tử này không thực sự dẫn đến `true` và `false` có thể khiến đầu óc bạn hơi rối bời. Có lẽ bạn đang thắc mắc tất cả các câu lệnh `if` và các vòng lặp `for` của bạn đã hoạt động như thế nào, nếu chúng bao gồm các biểu thức logic phức hợp như `a && (b || c)`.

Đừng lo lắng! Bầu trời không rơi xuống. Code của bạn (có lẽ) vẫn ổn. Chỉ là trước đây bạn có thể chưa bao giờ nhận ra rằng có một sự ép buộc *ngầm* đối với `boolean` đang diễn ra **sau** biểu thức ghép được đánh giá.

Xem xét:

```js
var a = 42;
var b = null;
var c = "foo";

if (a && (b || c)) {
	console.log( "yep" );
}
```

Đoạn code này vẫn hoạt động theo cách bạn vẫn nghĩ, ngoại trừ một chi tiết bổ sung tinh tế. Biểu thức `a && (b || c)` *thực sự* dẫn đến `"foo"`, không phải `true`. Vì vậy, câu lệnh `if` *sau đó* buộc giá trị `"foo"` buộc thành `boolean`, tất nhiên giá trị này sẽ là `true`.

Hiểu chứ? Không có lý do để hoảng sợ. Mã của bạn có thể vẫn an toàn. Nhưng bây giờ bạn biết nhiều hơn về cách nó làm những gì nó làm.

Và bây giờ bạn cũng nhận ra rằng đoạn mã đó đang sử dụng sự ép buộc *ngầm*. Nếu bạn vẫn đang ở trong "trại tránh (ngầm) cưỡng chế", bạn sẽ cần phải quay lại và thực hiện tất cả các bài kiểm tra đó *rõ ràng*:

```js
if (!!a && (!!b || !!c)) {
	console.log( "yep" );
}
```

Chúc may mắn với điều đó! ... Xin lỗi, chỉ trêu chọc thôi.

### Symbol Coercion

Cho đến thời điểm này, hầu như không có sự khác biệt về kết quả có thể quan sát được giữa *explicit* và *implicit* coercion -- chỉ có khả năng đọc code bị đe dọa.

Nhưng ES6 Symbols giới thiệu một điều mới vào coercion system mà chúng ta cần thảo luận ngắn gọn. Vì những lý do vượt xa phạm vi những gì chúng ta sẽ thảo luận trong cuốn sách này, việc *explicit* coercion một `symbol` thành một `string` được cho phép, nhưng việc *implicit* coercion như vậy là không được phép và gây ra lỗi.

Xem xét:

```js
var s1 = Symbol( "cool" );
String( s1 );					// "Symbol(cool)"

var s2 = Symbol( "not cool" );
s2 + "";						// TypeError
```

Giá trị `symbol` hoàn toàn không thể ép buộc đối với `number` (dẫn đến lỗi), nhưng kỳ lạ là chúng có thể *rõ ràng* và *ngầm* ép buộc đối với `boolean` (luôn luôn là `true`).

Tính nhất quán luôn dễ học hơn và các ngoại lệ không bao giờ thú vị để giải quyết, nhưng chúng ta chỉ cần cẩn thận với các giá trị `symbol` ES6 mới và cách chúng ta ép buộc chúng.

Tin tốt: có lẽ sẽ cực kỳ hiếm khi bạn cần ép buộc một giá trị `symbol`. Cách chúng thường được sử dụng (xem Chương 3) có thể sẽ không đòi hỏi sự ép buộc trên cơ sở bình thường.

## Loose Equals vs. Strict Equals

Bằng lỏng lẻo là toán tử `==` và bằng nghiêm ngặt là toán tử `===`. Cả hai toán tử đều được sử dụng để so sánh hai giá trị cho "bình đẳng", nhưng "lỏng lẻo" so với "nghiêm ngặt" biểu thị sự khác biệt **rất quan trọng** trong hành vi giữa hai giá trị, cụ thể là cách chúng quyết định "bình đẳng".

Một quan niệm sai lầm rất phổ biến về hai toán tử này là: "`==` kiểm tra giá trị bằng nhau và `===` kiểm tra cả giá trị và kiểu cho bằng nhau." Mặc dù điều đó nghe có vẻ hay và hợp lý, nhưng nó không chính xác. Vô số sách và blog về JavaScript có uy tín đã nói chính xác điều đó, nhưng tiếc là chúng đều *sai*.

Mô tả chính xác là: "`==` cho phép coercion trong so sánh bình đẳng và `===` không cho phép coercion."

### Equality Performance

Hãy dừng lại và suy nghĩ về sự khác biệt giữa cách giải thích đầu tiên (không chính xác) và cách giải thích thứ hai (chính xác) này.

Trong phần giải thích đầu tiên, có vẻ như `===` đang *làm nhiều việc hơn* hơn `==`, bởi vì nó *cũng* phải kiểm tra kiểu. Trong cách giải thích thứ hai, `==` là cách *làm nhiều việc hơn* vì nó phải tuân theo các bước cưỡng chế nếu các loại khác nhau.

Tuy nhiên, đừng rơi vào cái bẫy khi nghĩ rằng điều này có liên quan gì đến hiệu suất, như thể `==` sẽ chậm hơn `===` theo bất kỳ cách nào có liên quan. Mặc dù có thể đo lường được rằng việc cưỡng chế mất *một chút* thời gian xử lý, nhưng nó chỉ tính bằng phần triệu giây (vâng, đó là một phần triệu giây!).

Nếu bạn đang so sánh hai giá trị cùng loại, thì `==` và `===` sử dụng cùng một thuật toán và do đó, ngoài những khác biệt nhỏ trong triển khai công cụ, chúng sẽ thực hiện cùng một công việc.

Nếu bạn đang so sánh hai giá trị thuộc các loại khác nhau, thì hiệu suất không phải là yếu tố quan trọng. Điều bạn nên tự hỏi mình là: khi so sánh hai giá trị này, tôi có muốn bị coercion hay không?

Nếu bạn muốn coercion, hãy sử dụng `==` bình đẳng lỏng lẻo, nhưng nếu bạn không muốn coercion, hãy sử dụng `===` bình đẳng nghiêm ngặt.

**Lưu ý:** Hàm ý ở đây là cả `==` và `===` đều kiểm tra các loại toán hạng của chúng. Sự khác biệt là cách họ phản hồi nếu các loại không khớp.

### Abstract Equality

Hành vi của toán tử `==` được định nghĩa là "Thuật toán so sánh bình đẳng trừu tượng" trong phần 11.9.3 của thông số ES5. Những gì được liệt kê ở đó là một thuật toán toàn diện nhưng đơn giản, nêu rõ mọi kết hợp có thể có của các loại và cách thức cưỡng chế (nếu cần) sẽ xảy ra đối với mỗi kết hợp.

**Cảnh báo:** Khi sự (*implicit*) coercion bị coi là quá phức tạp và quá thiếu sót để trở thành một *phần tốt hữu ích*, thì chính các quy tắc "bình đẳng trừu tượng" này đang bị lên án. Nói chung, chúng được cho là quá phức tạp và quá không trực quan để các nhà phát triển học và sử dụng trên thực tế, đồng thời chúng dễ gây ra lỗi trong các chương trình JS hơn là giúp mã dễ đọc hơn. Tôi tin rằng đây là một tiền đề thiếu sót -- rằng độc giả của bạn là những nhà phát triển có năng lực, những người viết (và đọc và hiểu!) thuật toán (hay còn gọi là mã) suốt cả ngày. Vì vậy, những gì tiếp theo là một giải thích rõ ràng về "sự bình đẳng trừu tượng" trong các thuật ngữ đơn giản. Nhưng tôi khuyên bạn cũng nên đọc phần thông số kỹ thuật ES5 11.9.3. Tôi nghĩ bạn sẽ ngạc nhiên về mức độ hợp lý của nó.

Về cơ bản, mệnh đề đầu tiên (11.9.3.1) cho biết, nếu hai giá trị được so sánh thuộc cùng một loại, thì chúng được so sánh đơn giản và tự nhiên thông qua Danh tính như bạn mong đợi. Ví dụ: `42` chỉ bằng `42` và `"abc"` chỉ bằng `"abc"`.

Một số ngoại lệ nhỏ đối với kỳ vọng bình thường cần lưu ý:

* `NaN` không bao giờ bằng chính nó (xem Chương 2)
* `+0` và `-0` bằng nhau (xem Chương 2)

Điều khoản cuối cùng trong điều khoản 11.9.3.1 dành cho `==` so sánh bình đẳng lỏng lẻo với `object` (bao gồm cả `array` và `function`). Hai giá trị như vậy chỉ *bằng nhau* nếu cả hai đều tham chiếu đến *chính xác cùng một giá trị*. Không có sự ép buộc xảy ra ở đây.

**Lưu ý:** Phép so sánh đẳng thức nghiêm ngặt `===` được định nghĩa giống hệt với 11.9.3.1, bao gồm điều khoản về hai giá trị `object`. Một thực tế rất ít được biết đến là **`==` và `===` hoạt động giống hệt nhau** trong trường hợp hai `object` đang được so sánh!

Phần còn lại của thuật toán trong 11.9.3 chỉ định rằng nếu bạn sử dụng `==` đẳng thức lỏng lẻo để so sánh hai giá trị thuộc các loại khác nhau, thì một hoặc cả hai giá trị sẽ cần được *ngầm* ép buộc. Sự ép buộc này xảy ra sao cho cả hai giá trị cuối cùng đều có cùng loại, sau đó có thể so sánh trực tiếp về sự bình đẳng bằng cách sử dụng Giá trị đơn giản Nhận dạng.

**Lưu ý:** Phép toán lỏng lẻo không bình đẳng `!=` được định nghĩa chính xác như bạn mong đợi, theo nghĩa đen là phép so sánh `==` được thực hiện toàn bộ, sau đó là phủ định kết quả. Điều tương tự cũng xảy ra với hoạt động không bình đẳng nghiêm ngặt `!==`.

#### Comparing: `string`s to `number`s

Để minh họa sự ép buộc `==`, trước tiên chúng ta hãy xây dựng các ví dụ `string` và `number` trước đó trong chương này:

```js
var a = 42;
var b = "42";

a === b;	// false
a == b;		// true
```

Như chúng ta mong đợi, `a === b` không thành công vì không cho phép ép buộc và thực tế là các giá trị `42` và `"42"` là khác nhau.

Tuy nhiên, so sánh thứ hai `a == b` sử dụng đẳng thức lỏng lẻo, có nghĩa là nếu các loại xảy ra khác nhau, thuật toán so sánh sẽ thực hiện ép buộc *ngầm* trên một hoặc cả hai giá trị.

Nhưng chính xác thì kiểu ép buộc nào xảy ra ở đây? Giá trị `a` của `42` trở thành `string` hay giá trị `b` của `"42"` trở thành `number`?

Trong thông số ES5, các điều khoản 11.9.3.4-5 nói:

> 4. If Type(x) is Number and Type(y) is String,
>    return the result of the comparison x == ToNumber(y).
> 5. If Type(x) is String and Type(y) is Number,
>    return the result of the comparison ToNumber(x) == y.

**Cảnh báo:** Thông số kỹ thuật sử dụng `Number` và `String` làm tên chính thức cho các loại, trong khi cuốn sách này ưu tiên `number` và `string` cho các loại nguyên thủy. Đừng để cách viết hoa của `Number` trong thông số kỹ thuật khiến bạn nhầm lẫn với hàm gốc `Number()`. Đối với mục đích của chúng tôi, việc viết hoa tên loại là không liên quan -- về cơ bản chúng có cùng ý nghĩa.

Rõ ràng, thông số kỹ thuật cho biết giá trị `"42"` bị ép thành một `số` để so sánh. *Cách thức* của sự ép buộc đó đã được đề cập trước đó, cụ thể là với thao tác trừu tượng `ToNumber`. Trong trường hợp này, rõ ràng là hai giá trị `42` kết quả là bằng nhau.

#### So sánh: bất cứ thứ gì với `boolean`

Một trong những vấn đề lớn nhất với *implicit* coercion của `==` đẳng thức lỏng lẻo xuất hiện khi bạn cố gắng so sánh trực tiếp một giá trị với `true` hoặc `false`.

Xem xét:

```js
var a = "42";
var b = true;

a == b;	// false
```

Đợi đã, chuyện gì đã xảy ra ở đây vậy!? Chúng tôi biết rằng `"42"` là một giá trị truthy (xem phần đầu của chương này). Vì vậy, tại sao nó không `==` lỏng lẻo bằng `true`?

Lý do vừa đơn giản vừa phức tạp. Nó rất dễ gây hiểu lầm, nhiều nhà phát triển JS không bao giờ chú ý đủ để nắm bắt nó một cách đầy đủ.

Hãy trích dẫn lại thông số kỹ thuật, điều khoản 11.9.3.6-7:

> 6. If Type(x) is Boolean,
>    return the result of the comparison ToNumber(x) == y.
> 7. If Type(y) is Boolean,
>    return the result of the comparison x == ToNumber(y).

Hãy phân tích nó. Đầu tiên:

```js
var x = true;
var y = "42";

x == y; // false
```

`Type(x)` thực sự là `Boolean`, do đó, nó thực hiện `ToNumber(x)`, buộc `true` thành `1`. Bây giờ, `1 == "42"` được đánh giá. Các loại vẫn khác nhau, vì vậy (về cơ bản là đệ quy), chúng tôi xem xét lại thuật toán, như trên sẽ ép buộc `"42"` thành `42` và `1 == 42` rõ ràng là `false`.

Đảo ngược nó và chúng tôi vẫn nhận được kết quả tương tự:

```js
var x = "42";
var y = false;

x == y; // false
```

`Type(y)` lần này là `Boolean`, vì vậy `ToNumber(y)` mang lại `0`. `"42" == 0` theo cách đệ quy trở thành `42 == 0`, tất nhiên là `false`.

Nói cách khác, **giá trị `"42"` không phải là `== true` cũng không phải `== false`.** Lúc đầu, tuyên bố đó có vẻ điên rồ. Làm thế nào một giá trị có thể không phải là truthy cũng không phải là falsy?

Nhưng đó là vấn đề! Bạn đang hỏi sai câu hỏi, hoàn toàn. Đó không phải là lỗi của bạn, thực sự. Bộ não của bạn đang đánh lừa bạn.

`"42"` thực sự đúng, nhưng `"42" == true` **hoàn toàn không thực hiện kiểm tra/ép buộc boolean**, bất kể bộ não của bạn nói gì. `"42"` *không* bị ép thành `boolean` (`true`), nhưng thay vào đó `true` đang bị ép thành `1`, và sau đó `"42"` bị ép thành `42`.

Cho dù chúng ta có thích hay không, `ToBoolean` thậm chí không liên quan ở đây, vì vậy tính đúng hay sai của `"42"` không liên quan đến thao tác `==` !

Điều *có liên quan* là hiểu cách thuật toán so sánh `==` hoạt động với tất cả các kết hợp loại khác nhau. Vì nó liên quan đến giá trị `boolean` ở hai bên của `==`, nên `boolean` luôn bắt buộc phải có `số` *đầu tiên*.

Nếu điều đó có vẻ xa lạ với bạn, bạn không đơn độc. Cá nhân tôi khuyên bạn không bao giờ, trong mọi trường hợp, sử dụng `== true` hoặc `== false`. Bao giờ.

Nhưng hãy nhớ rằng, tôi chỉ nói về `==` ở đây. `=== true` và `=== false` sẽ không cho phép ép buộc, vì vậy chúng sẽ an toàn trước sự ép buộc `ToNumber` ẩn này.

Xem xét:

```js
var a = "42";

// bad (will fail!):
if (a == true) {
	// ..
}

// also bad (will fail!):
if (a === true) {
	// ..
}

// good enough (works implicitly):
if (a) {
	// ..
}

// better (works explicitly):
if (!!a) {
	// ..
}

// also great (works explicitly):
if (Boolean( a )) {
	// ..
}
```

Nếu bạn tránh sử dụng `== true` hoặc `== false` (hay còn gọi là đẳng thức lỏng lẻo với `boolean`) trong code của mình, thì bạn sẽ không bao giờ phải lo lắng về nhận thức tinh thần về tính trung thực/giả dối này.

#### Comparing: `null`s to `undefined`s

Có thể thấy một ví dụ khác về *implicit* coercion với `==` sự bình đẳng lỏng lẻo giữa các giá trị `null` và `undefined`. Tuy nhiên, một lần nữa trích dẫn thông số kỹ thuật ES5, điều khoản 11.9.3.2-3:

> 2. If x is null and y is undefined, return true.
> 3. If x is undefined and y is null, return true.

`null` và `undefined`, khi so sánh với `==` bình đẳng lỏng lẻo, tương đương (hay còn gọi là ép buộc) lẫn nhau (rõ ràng là cũng như chính chúng) và không có giá trị nào khác trong toàn bộ ngôn ngữ.

Điều này có nghĩa là `null` và `undefined` có thể được coi là không thể phân biệt được cho mục đích so sánh, nếu bạn sử dụng toán tử đẳng thức lỏng lẻo `==` để cho phép ép buộc *ngầm* lẫn nhau của chúng.

```js
var a = null;
var b;

a == b;		// true
a == null;	// true
b == null;	// true

a == false;	// false
b == false;	// false
a == "";	// false
b == "";	// false
a == 0;		// false
b == 0;		// false
```

Sự ép buộc giữa `null` và `undefined` là an toàn và có thể dự đoán được, đồng thời không có giá trị nào khác có thể đưa ra kết quả dương tính giả trong quá trình kiểm tra như vậy. Tôi khuyên bạn nên sử dụng biện pháp cưỡng chế này để cho phép `null` và `undefined` không thể phân biệt được và do đó được coi là cùng một giá trị.

Cho ví dụ:

```js
var a = doSomething();

if (a == null) {
	// ..
}
```

Kiểm tra `a == null` sẽ chỉ vượt qua nếu `doSomething()` trả về `null` hoặc `undefined` và sẽ không thành công với bất kỳ giá trị nào khác, ngay cả các giá trị giả khác như `0`, `false` và ` ""`.

Hình thức kiểm tra *rõ ràng*, không cho phép bất kỳ sự ép buộc nào như vậy, là (tôi nghĩ) xấu hơn một cách không cần thiết (và có lẽ kém hiệu quả hơn một chút!):

```js
var a = doSomething();

if (a === undefined || a === null) {
	// ..
}
```

Theo ý kiến của tôi, biểu mẫu `a == null` là một ví dụ khác trong đó việc *implicit* coercion cải thiện khả năng đọc mã, nhưng làm như vậy theo cách an toàn đáng tin cậy.

#### Comparing: `object`s to non-`object`s

Nếu một `đối tượng`/`hàm`/`mảng` được so sánh với một simple scalar primitive (nguyên hàm vô hướng đơn giản) (`string`, `number` hoặc `boolean`), thông số kỹ thuật ES5 cho biết trong các điều khoản 11.9.3.8-9:

> 8. If Type(x) is either String or Number and Type(y) is Object,
>    return the result of the comparison x == ToPrimitive(y).
> 9. If Type(x) is Object and Type(y) is either String or Number,
>    return the result of the comparison ToPrimitive(x) == y.

**Lưu ý:** Bạn có thể nhận thấy rằng các mệnh đề này chỉ đề cập đến `String` và `Number` chứ không đề cập đến `Boolean`. Đó là bởi vì, như được trích dẫn trước đó, các mệnh đề 11.9.3.6-7 đảm nhiệm việc ép buộc bất kỳ toán hạng `Boolean` nào được trình bày trước một `Number`.

Xem xét:

```js
var a = 42;
var b = [ 42 ];

a == b;	// true
```

Giá trị `[ 42 ]` có thao tác trừu tượng `ToPrimitive` được gọi là (xem phần "Abstract Value Operations" trước đó), dẫn đến giá trị `"42"`. Từ đó, nó chỉ là `42 == "42"`, như chúng ta đã đề cập, trở thành `42 == 42`, vì vậy `a` và `b` được coi là bằng nhau một cách cưỡng chế.

**Mẹo:** Tất cả các đặc điểm của thao tác trừu tượng `ToPrimitive` mà chúng ta đã thảo luận trước đó trong chương này (`toString()`, `valueOf()`) đều áp dụng ở đây như bạn mong đợi. Điều này có thể khá hữu ích nếu bạn có cấu trúc dữ liệu phức tạp mà bạn muốn xác định phương thức `valueOf()` tùy chỉnh trên đó, để cung cấp một giá trị đơn giản cho mục đích so sánh đẳng thức.

Trong Chương 3, chúng ta đã đề cập đến "unboxing", trong đó một trình bao bọc `object` bao quanh một giá trị nguyên thủy (ví dụ như từ `new String("abc")`) được mở và giá trị nguyên thủy bên dưới (`"abc"` ) Được trả lại. Hành vi này có liên quan đến cưỡng chế `ToPrimitive` trong thuật toán `==`:

```js
var a = "abc";
var b = Object( a );	// same as `new String( a )`

a === b;				// false
a == b;					// true
```

`a == b` là `true` vì `b` bị ép buộc (aka "unboxed," unwrapped) thông qua `ToPrimitive` đối với giá trị nguyên thủy vô hướng đơn giản `"abc"` bên dưới, giống với giá trị trong ` a`.

Tuy nhiên, có một số giá trị không đúng như vậy do các quy tắc quan trọng khác trong thuật toán `==`. Xem xét:

```js
var a = null;
var b = Object( a );	// same as `Object()`
a == b;					// false

var c = undefined;
var d = Object( c );	// same as `Object()`
c == d;					// false

var e = NaN;
var f = Object( e );	// same as `new Number( e )`
e == f;					// false
```

Không thể đóng hộp các giá trị `null` và `undefined` -- chúng không có trình bao bọc đối tượng tương đương -- vì vậy `Object(null)` giống như `Object()` ở chỗ cả hai chỉ tạo ra một object bình thường.

`NaN` có thể được đóng hộp tương đương với trình bao bọc đối tượng `Number` của nó, nhưng khi `==` gây ra việc mở hộp, phép so sánh `NaN == NaN` không thành công vì `NaN` không bao giờ bằng chính nó (xem Chương 2).

### Edge Cases

Bây giờ chúng ta đã xem xét kỹ lưỡng cách thức hoạt động của *implicit* coercion của `==` bình đẳng lỏng lẻo (theo cả cách hợp lý và đáng ngạc nhiên), hãy thử chỉ ra những trường hợp tồi tệ nhất, điên rồ nhất để chúng ta có thể thấy những gì chúng ta cần tránh để không bị bọ cưỡng chế cắn.

Đầu tiên, hãy xem xét cách sửa đổi các build-in native prototype có thể tạo ra kết quả điên rồ như thế nào:

#### A Number By Any Other Value Would...

```js
Number.prototype.valueOf = function() {
	return 3;
};

new Number( 2 ) == 3;	// true
```

**Cảnh báo:** `2 == 3` sẽ không rơi vào cái bẫy này, bởi vì cả `2` và `3` đều không gọi phương thức `Number.prototype.valueOf()` tích hợp vì cả hai đều đã sẵn sàng các giá trị `number` nguyên thủy và có thể được so sánh trực tiếp. Tuy nhiên, `new Number(2)` phải trải qua quá trình ép buộc `ToPrimitive` và do đó gọi `valueOf()`.

Ác nhỉ? Tất nhiên là thế rồi. Không ai nên làm một điều như vậy. Việc bạn *có thể* làm điều này đôi khi được sử dụng như một lời chỉ trích về sự ép buộc và `==`. Nhưng đó là sự thất vọng sai hướng. JavaScript không *xấu* vì bạn có thể làm những việc như vậy, một nhà phát triển là *xấu* **nếu họ làm những việc như vậy**. Đừng rơi vào ngụy biện "ngôn ngữ lập trình của tôi nên bảo vệ tôi khỏi chính tôi".

Tiếp theo, hãy xem xét một ví dụ phức tạp khác, đưa cái ác từ ví dụ trước lên một cấp độ khác:

```js
if (a == 2 && a == 3) {
	// ..
}
```

Bạn có thể nghĩ rằng điều này là không thể, bởi vì `a` không bao giờ có thể bằng cả `2` và `3` *đồng thời*. Nhưng "đồng thời" là không chính xác, vì biểu thức đầu tiên `a == 2` xảy ra hoàn toàn *trước* `a == 3`.

Vì vậy, điều gì sẽ xảy ra nếu chúng ta làm cho `a.valueOf()` có tác dụng phụ mỗi khi được gọi, chẳng hạn như lần đầu tiên nó trả về `2` và lần thứ hai được gọi, nó trả về `3`? Khá dễ dàng:

```js
var i = 2;

Number.prototype.valueOf = function() {
	return i++;
};

var a = new Number( 42 );

if (a == 2 && a == 3) {
	console.log( "Yep, this happened." );
}
```

Một lần nữa, đây là những thủ đoạn xấu xa. Đừng làm chúng. Nhưng cũng đừng sử dụng chúng như những lời phàn nàn chống lại sự ép buộc. Khả năng lạm dụng một cơ chế không phải là bằng chứng đầy đủ để lên án cơ chế đó. Chỉ cần tránh những mánh khóe điên rồ này và chỉ sử dụng biện pháp cưỡng chế hợp lệ và đúng đắn.

#### False-y Comparisons

Khiếu nại phổ biến nhất chống lại *implicit* coercion trong các phép so sánh `==` xuất phát từ cách các giá trị falsy hoạt động một cách đáng ngạc nhiên khi so sánh với nhau.

Để minh họa, chúng ta hãy xem danh sách các tình huống xung quanh việc so sánh giá trị falsy, để xem trường hợp nào hợp lý và trường hợp nào rắc rối:

```js
"0" == null;			// false
"0" == undefined;		// false
"0" == false;			// true -- UH OH!
"0" == NaN;				// false
"0" == 0;				// true
"0" == "";				// false

false == null;			// false
false == undefined;		// false
false == NaN;			// false
false == 0;				// true -- UH OH!
false == "";			// true -- UH OH!
false == [];			// true -- UH OH!
false == {};			// false

"" == null;				// false
"" == undefined;		// false
"" == NaN;				// false
"" == 0;				// true -- UH OH!
"" == [];				// true -- UH OH!
"" == {};				// false

0 == null;				// false
0 == undefined;			// false
0 == NaN;				// false
0 == [];				// true -- UH OH!
0 == {};				// false
```

Trong danh sách 24 so sánh này, 17 trong số đó khá hợp lý và dễ đoán. Ví dụ: chúng tôi biết rằng `""` và `NaN` hoàn toàn không phải là các giá trị có thể đánh đồng và thực sự chúng không bắt buộc phải bằng nhau lỏng lẻo, trong khi `"0"` và `0` có thể đánh đồng một cách hợp lý và *do* cưỡng chế như lỏng lẻo bằng.

Tuy nhiên, bảy trong số các phép so sánh được đánh dấu bằng "UH OH!" bởi vì là dương tính giả, nhiều khả năng chúng là những vấn đề có thể khiến bạn vấp ngã. `""` và `0` chắc chắn là các giá trị khác nhau rõ ràng và hiếm khi bạn muốn coi chúng là ngang nhau, do đó, sự ép buộc lẫn nhau của chúng rất rắc rối. Lưu ý rằng không có bất kỳ phủ định sai nào ở đây.

#### The Crazy Ones

Tuy nhiên, chúng ta không phải dừng lại ở đó. Chúng ta có thể tiếp tục tìm kiếm những sự ép buộc rắc rối hơn nữa:

```js
[] == ![];		// true
```

Oooo, điều đó có vẻ ở mức độ điên rồ cao hơn, phải không!? Bộ não của bạn có thể đánh lừa bạn rằng bạn đang so sánh một giá trị trung thực với một giá trị giả, vì vậy kết quả `true` thật đáng ngạc nhiên, vì chúng ta *biết* một giá trị không bao giờ có thể vừa trung thực vừa sai cùng một lúc!

Nhưng đó không phải là những gì đang thực sự xảy ra. Hãy chia nhỏ nó ra. Chúng ta biết gì về toán tử đơn nguyên `!`? Nó ép buộc một cách rõ ràng thành `boolean` bằng cách sử dụng các quy tắc `ToBoolean` (và nó cũng đảo ngược tính chẵn lẻ). Vì vậy, trước khi `[] == ![]` thậm chí được xử lý, nó thực sự đã được dịch thành `[] == false`. Chúng tôi đã thấy biểu mẫu đó trong danh sách trên (`false == []`), vì vậy kết quả bất ngờ của nó *không mới* đối với chúng tôi.

Làm thế nào về các trường hợp góc khác?

```js
2 == [2];		// true
"" == [null];	// true
```

Như chúng ta đã nói trước đó trong cuộc thảo luận về `ToNumber`, các giá trị `[2]` và `[null]` bên tay phải sẽ trải qua quá trình cưỡng chế `ToPrimitive` để chúng có thể dễ dàng so sánh hơn với các giá trị nguyên thủy đơn giản (`2 ` và `""`, tương ứng) ở phía bên tay trái. Vì các giá trị `valueOf()` cho `array` chỉ trả về chính `array`, nên việc ép buộc rơi vào việc xâu chuỗi `array`.

`[2]` sẽ trở thành `"2"`, sau đó là `ToNumber` bị ép thành `2` cho giá trị bên phải trong so sánh đầu tiên. `[null]` chỉ thẳng trở thành `""`.

Vì vậy, `2 == 2` và `"" ==""` là hoàn toàn dễ hiểu.

Nếu bản năng của bạn là vẫn không thích những kết quả này, thì sự thất vọng của bạn thực ra không phải do bị ép buộc như bạn có thể nghĩ. Đó thực sự là một lời phàn nàn về hành vi ép buộc giá trị `chuỗi` của các giá trị `mảng` mặc định' `ToPrimitive`. Nhiều khả năng, bạn chỉ ước rằng `[2].toString()` không trả về `"2"`, hoặc `[null].toString()` không trả về `""`.

Nhưng chính xác *nên* những sự ép buộc `string` này dẫn đến kết quả gì? Tôi thực sự không thể nghĩ ra bất kỳ sự ép buộc `string` thích hợp nào khác của `[2]` ngoài `"2"`, có lẽ ngoại trừ `"[2]"` -- nhưng điều đó có thể rất lạ trong các ngữ cảnh khác!

Bạn hoàn toàn có thể đưa ra trường hợp rằng vì `String(null)` trở thành `"null"`, nên `String([null])` cũng sẽ trở thành `"null"`. Đó là một khẳng định hợp lý. Vì vậy, đó là thủ phạm thực sự.

Bản thân *implicit* coercion không phải là điều ác ở đây. Ngay cả một *explicit* coercion của `[null]` đối với một `string` cũng dẫn đến `""`. Điều mâu thuẫn là liệu có hợp lý hay không đối với các giá trị `array` để xâu chuỗi thành các giá trị tương đương với nội dung của chúng và chính xác điều đó xảy ra như thế nào. Vì vậy, hãy hướng sự thất vọng của bạn vào các quy tắc dành cho `String([..])`, bởi vì đó là nguồn gốc của sự điên rồ. Có lẽ không nên có sự ép buộc xâu chuỗi hóa `array` nào cả? Nhưng điều đó sẽ có nhiều nhược điểm khác trong các phần khác của ngôn ngữ.

Một gotcha được trích dẫn nổi tiếng khác:

```js
0 == "\n";		// true
```

Như chúng ta đã thảo luận trước đó với `""` trống, `"\n"` (hoặc `" "` hoặc bất kỳ tổ hợp khoảng trắng nào khác) được ép buộc thông qua `ToNumber` và kết quả là `0`. Giá trị `number` nào khác mà bạn muốn khoảng trắng bắt buộc? Bạn có thấy phiền khi *rõ ràng* `Number(" ")` mang lại `0` không?

Thực sự, giá trị `number` hợp lý duy nhất khác mà các chuỗi rỗng hoặc chuỗi khoảng trắng có thể ép buộc là `NaN`. Nhưng điều đó *thực sự* sẽ tốt hơn? Việc so sánh `" " == NaN` tất nhiên sẽ thất bại, nhưng không rõ là chúng tôi đã thực sự *khắc phục* bất kỳ mối lo ngại tiềm ẩn nào chưa.

Khả năng một chương trình JS trong thế giới thực không thành công vì `0 == "\n"` là cực kỳ hiếm và các trường hợp góc như vậy rất dễ tránh.

Chuyển kiểu **luôn** có corner cases (trường hợp góc), trong bất kỳ ngôn ngữ nào -- không có gì cụ thể để ép buộc. Các vấn đề ở đây là về việc đoán lần thứ hai một tập hợp các trường hợp góc nhất định (và có lẽ đúng như vậy!?), nhưng đó không phải là một lập luận nổi bật chống lại cơ chế cưỡng chế tổng thể.

Điểm mấu chốt: hầu hết mọi sự ép buộc điên rồ giữa *giá trị bình thường* mà bạn có khả năng gặp phải (ngoài các thủ đoạn hack `valueOf()` hoặc `toString()` có chủ ý thủ đoạn như trước đó) sẽ được rút gọn thành danh sách bảy mục ngắn gọn về sự ép buộc gotcha mà chúng tôi đã xác định ở trên.

Để đối chiếu với 24 đối tượng có khả năng bị tình nghi cưỡng bức này, hãy xem xét một danh sách khác như sau:

```js
42 == "43";							// false
"foo" == 42;						// false
"true" == true;						// false

42 == "42";							// true
"foo" == [ "foo" ];					// true
```

Trong những trường hợp không nonfalsy, không nghiêm túc này (và thực sự có vô số phép so sánh mà chúng tôi có thể đưa vào danh sách này), kết quả cưỡng chế là hoàn toàn an toàn, hợp lý và có thể giải thích được.

#### Sanity Check

OK, chúng tôi chắc chắn đã tìm thấy một số thứ điên rồ khi chúng tôi xem xét sâu về *implicit* coercion. Không có gì ngạc nhiên khi hầu hết các nhà phát triển cho rằng cưỡng chế là xấu xa và nên tránh, phải không!?

Nhưng hãy lùi lại một bước và sanity check.

Bằng cách so sánh mức độ, chúng tôi có *một danh sách* gồm bảy sự ép buộc rắc rối, nhưng chúng tôi có *một danh sách khác* gồm (ít nhất 17, nhưng thực sự là vô hạn) những sự ép buộc hoàn toàn lành mạnh và có thể giải thích được.

Nếu bạn đang tìm kiếm một ví dụ trong sách giáo khoa về việc "throwing the baby out with the bathwater", thì đây chính là: loại bỏ toàn bộ hành vi ép buộc (danh sách vô số các hành vi an toàn và hữu ích) vì một danh sách đúng nghĩa chỉ có bảy vấn đề.

Phản ứng khôn ngoan hơn sẽ là hỏi, "làm thế nào tôi có thể sử dụng vô số *phần tốt* của sự ép buộc, nhưng tránh một số *phần xấu*?"

Hãy xem lại danh sách *xấu*:

```js
"0" == false;			// true -- UH OH!
false == 0;				// true -- UH OH!
false == "";			// true -- UH OH!
false == [];			// true -- UH OH!
"" == 0;				// true -- UH OH!
"" == [];				// true -- UH OH!
0 == [];				// true -- UH OH!
```

Bốn trong số bảy mục trong danh sách này liên quan đến so sánh `== false`, mà chúng tôi đã nói trước đó bạn nên **luôn luôn** tránh. Đó là một quy tắc khá dễ nhớ.

Bây giờ danh sách giảm xuống còn ba.

```js
"" == 0;				// true -- UH OH!
"" == [];				// true -- UH OH!
0 == [];				// true -- UH OH!
```

Đây có phải là những sự ép buộc hợp lý mà bạn sẽ thực hiện trong một chương trình JavaScript bình thường không? Trong những điều kiện nào chúng sẽ thực sự xảy ra?

Tôi không nghĩ rằng rất có thể bạn sẽ sử dụng `== []` theo nghĩa đen trong một bài kiểm tra `boolean` trong chương trình của mình, ít nhất là không nếu bạn biết mình đang làm gì. Thay vào đó, bạn có thể đang thực hiện `== ""` hoặc `== 0`, chẳng hạn như:

```js
function doSomething(a) {
	if (a == "") {
		// ..
	}
}
```

Bạn sẽ rất tiếc nếu vô tình gọi `doSomething(0)` hoặc `doSomething([])`. Một kịch bản khác:

```js
function doSomething(a,b) {
	if (a == b) {
		// ..
	}
}
```

Một lần nữa, điều này có thể bị hỏng nếu bạn làm điều gì đó như `doSomething("",0)` hoặc `doSomething([],"")`.

Vì vậy, trong khi các tình huống *có thể* tồn tại trong đó những sự ép buộc này sẽ cắn bạn và bạn sẽ muốn cẩn thận với chúng, thì chúng có thể không quá phổ biến trên toàn bộ code base của bạn.

#### Safely Using Implicit Coercion

Lời khuyên quan trọng nhất mà tôi có thể đưa ra cho bạn: kiểm tra chương trình của bạn và suy luận về những giá trị nào có thể hiển thị ở hai bên của phép so sánh `==`. Để tránh một cách hiệu quả các vấn đề với những so sánh như vậy, đây là một số quy tắc heuristic cần tuân theo:

1. Nếu một trong hai bên của phép so sánh có thể có giá trị `true` hoặc `false`, thì KHÔNG BAO GIỜ, BAO GIỜ sử dụng `==`.
2. Nếu một trong hai bên của phép so sánh có thể có các giá trị `[]`, `""` hoặc `0`, hãy cân nhắc nghiêm túc việc không sử dụng `==`.

Trong những trường hợp này, gần như chắc chắn tốt hơn là sử dụng `===` thay vì `==`, để tránh bị ép buộc không mong muốn. Hãy tuân theo hai quy tắc đơn giản đó và hầu như tất cả các vấn đề về cưỡng chế có thể gây tổn thương cho bạn một cách hợp lý sẽ được tránh một cách hiệu quả.

**Trở nên rõ ràng/dài dòng hơn trong những trường hợp này sẽ giúp bạn không phải đau đầu.**

Câu hỏi về `==` so với `===` thực sự được đóng khung một cách thích hợp là: bạn có nên cho phép sự ép buộc để so sánh hay không?

Có rất nhiều trường hợp mà sự ép buộc như vậy có thể hữu ích, cho phép bạn diễn đạt một số logic so sánh một cách ngắn gọn hơn (ví dụ như với `null` và `undefined`).

Trong sơ đồ tổng thể của mọi thứ, có tương đối ít trường hợp ép buộc *ngầm* thực sự nguy hiểm. Nhưng ở những nơi đó, để đảm bảo an toàn, hãy chắc chắn sử dụng `===`.

**Mẹo:** Một nơi khác mà tính năng ép buộc được đảm bảo *không* cắn bạn là toán tử `typeof`. `typeof` sẽ luôn trả về cho bạn một trong bảy chuỗi (xem Chương 1), và không có chuỗi nào là chuỗi `""` trống. Như vậy, không có trường hợp nào việc kiểm tra loại của một số giá trị sẽ dẫn đến sự ép buộc *ngầm*. `typeof x == "function"` an toàn và đáng tin cậy 100% như `typeof x === "function"`. Theo nghĩa đen, thông số kỹ thuật cho biết thuật toán sẽ giống hệt nhau trong tình huống này. Vì vậy, đừng mù quáng sử dụng `===` ở mọi nơi đơn giản chỉ vì đó là những gì công cụ mã của bạn yêu cầu bạn làm hoặc (tệ nhất là) vì bạn đã được bảo trong một số cuốn sách là **đừng nghĩ về nó** . Bạn sở hữu chất lượng của mã của bạn.

Ép buộc *ngầm* có xấu xa và nguy hiểm không? Trong một vài trường hợp, có, nhưng phần lớn là không.

Hãy là một nhà phát triển có trách nhiệm và trưởng thành. Tìm hiểu cách sử dụng sức mạnh của sự ép buộc (cả *explicit* và *implicit*) một cách hiệu quả và an toàn. Và dạy những người xung quanh bạn làm như vậy.

Đây là một bảng tiện dụng được tạo bởi Alex Dorey (@dorey trên GitHub) để trực quan hóa nhiều cách so sánh:

<img src="fig1.png" width="600">

Source: https://github.com/dorey/JavaScript-Equality-Table

## Abstract Relational Comparison

Mặc dù phần ép buộc *ngầm* này thường ít được chú ý hơn, tuy nhiên, điều quan trọng là phải suy nghĩ về điều gì xảy ra với phép so sánh `a < b` (tương tự như cách chúng ta vừa xem xét chi tiết `a == b`).

Thuật toán "Abstract Relational Comparison (So sánh quan hệ trừu tượng)" trong ES5 phần 11.8.5 về cơ bản chia thành hai phần: phải làm gì nếu so sánh liên quan đến cả hai giá trị `string` (nửa sau) hoặc bất kỳ giá trị nào khác (nửa đầu).

**Lưu ý:** Thuật toán chỉ được xác định cho `a < b`. Vì vậy, `a > b` được xử lý là `b < a`.

Trước tiên, thuật toán gọi cưỡng chế `ToPrimitive` trên cả hai giá trị và nếu kết quả trả về của một trong hai lệnh gọi không phải là `string`, thì cả hai giá trị đều bị cưỡng chế thành giá trị `number` bằng cách sử dụng quy tắc hoạt động `ToNumber` và được so sánh bằng số.

Ví dụ:

```js
var a = [ 42 ];
var b = [ "43" ];

a < b;	// true
b < a;	// false
```

**Lưu ý:** Những lưu ý tương tự đối với `-0` và `NaN` áp dụng ở đây giống như trong thuật toán `==` đã thảo luận trước đó.

Tuy nhiên, nếu cả hai giá trị đều là `string` để so sánh `<`, phép so sánh từ điển đơn giản (chữ cái tự nhiên) trên các ký tự được thực hiện:

```js
var a = [ "42" ];
var b = [ "043" ];

a < b;	// false
```

`a` và `b` *không* bị ép buộc thành `số`, bởi vì cả hai đều kết thúc dưới dạng `string` sau khi ép buộc `ToPrimitive` trên hai `array`. Vì vậy, `"42"` được so sánh từng ký tự với `"043"`, bắt đầu với các ký tự đầu tiên tương ứng là `"4"` và `"0"`. Vì `"0"` về mặt từ điển *nhỏ hơn* so với `"4"`, phép so sánh trả về `false`.

Chính xác cùng một hành vi và lý luận dành cho:

```js
var a = [ 4, 2 ];
var b = [ 0, 4, 3 ];

a < b;	// false
```

Ở đây, `a` trở thành `"4,2"` và `b` trở thành `"0,4,3"` và những từ vựng này so sánh giống hệt với đoạn code trước đó.

Thế còn:

```js
var a = { b: 42 };
var b = { b: 43 };

a < b;	// ??
```

`a < b` cũng là `false`, vì `a` trở thành `[object Object]` và `b` trở thành `[object Object]`, và do đó rõ ràng `a` không nhỏ hơn `b` về mặt từ điển.

Nhưng lạ thay:

```js
var a = { b: 42 };
var b = { b: 43 };

a < b;	// false
a == b;	// false
a > b;	// false

a <= b;	// true
a >= b;	// true
```

Tại sao `a == b` không phải là `true`? Chúng có cùng giá trị `string` (`"[object Object]"`), vì vậy có vẻ như chúng phải bằng nhau, phải không? Không. Nhớ lại cuộc thảo luận trước đây về cách `==` hoạt động với các tham chiếu `object`.

Nhưng sau đó làm thế nào để `a <= b` và `a >= b` dẫn đến `true`, nếu `a < b` **và** `a == b` **và** `a > b` tất cả đều là `false`?

Bởi vì thông số kỹ thuật cho biết `a <= b`, nên nó thực sự sẽ đánh giá `b < a` trước, sau đó phủ nhận kết quả đó. Vì `b < a` *cũng* `false` nên kết quả của `a <= b` là `true`.

Điều đó có lẽ hoàn toàn trái ngược với cách bạn có thể đã giải thích những gì `<=` làm cho đến bây giờ, vốn có thể là nghĩa đen: "nhỏ hơn *hoặc* bằng." JS coi `<=` là "không lớn hơn" (`!(a > b)`, mà JS coi là `!(b < a)`). Ngoài ra, `a >= b` được giải thích bằng cách trước tiên coi nó là `b <= a`, sau đó áp dụng lý luận tương tự.

Thật không may, không có "so sánh quan hệ chặt chẽ" như có cho bình đẳng. Nói cách khác, không có cách nào để ngăn sự ép buộc *ngầm* xảy ra với các phép so sánh quan hệ như `a < b`, ngoài việc đảm bảo rằng `a` và `b` cùng loại một cách rõ ràng trước khi thực hiện phép so sánh.

Sử dụng lý do tương tự từ cuộc thảo luận kiểm tra tình trạng `==` so với `===` trước đó của chúng tôi. Nếu tính năng cưỡng chế hữu ích và an toàn ở mức độ hợp lý, chẳng hạn như trong phép so sánh `42 < "43"`, **hãy sử dụng tính năng này**. Mặt khác, nếu bạn cần an toàn về so sánh quan hệ, *rõ ràng ép buộc* các giá trị trước, trước khi sử dụng `<` (hoặc các giá trị tương ứng của nó).

```js
var a = [ 42 ];
var b = "043";

a < b;						// false -- string comparison!
Number( a ) < Number( b );	// true -- number comparison!
```

## Review

Trong chương này, chúng ta đã chú ý đến cách các chuyển đổi kiểu JavaScript xảy ra, được gọi là **coercion (ép buộc)**, có thể được mô tả là *explicit (rõ ràng)* hoặc *implicit (ngầm)*.

Sự ép buộc bị mang tiếng xấu, nhưng nó thực sự khá hữu ích trong nhiều trường hợp. Một nhiệm vụ quan trọng đối với nhà phát triển JS có trách nhiệm là dành thời gian tìm hiểu tất cả thông tin chi tiết về sự ép buộc để quyết định phần nào sẽ giúp cải thiện code của họ và phần nào họ thực sự nên tránh.

*Explicit* coercion là code hiển nhiên rằng mục đích là để chuyển đổi một giá trị từ loại này sang loại khác. Lợi ích là cải thiện khả năng đọc và khả năng bảo trì của code bằng cách giảm nhầm lẫn.

*Implicit* coercion là ép buộc "ẩn" dưới dạng side effect của một số hoạt động khác, trong đó việc chuyển đổi loại sẽ xảy ra không rõ ràng. Mặc dù có vẻ như việc ép buộc *ngầm* trái ngược với *rõ ràng* và do đó là xấu (và thực tế, nhiều người nghĩ như vậy!), nhưng thực ra, việc ép buộc *ngầm* cũng nhằm cải thiện khả năng đọc code.

Đặc biệt đối với *ngầm*, sự ép buộc phải được sử dụng một cách có trách nhiệm và có ý thức. Biết lý do tại sao bạn viết code bạn đang viết và cách code hoạt động. Cố gắng viết code mà những người khác cũng có thể dễ dàng học hỏi và hiểu được.
