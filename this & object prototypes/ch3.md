# You Don't Know JS: *this* & Object Prototypes
# Chapter 3: Objects

Trong Chương 1 và 2, chúng ta đã giải thích cách ràng buộc `this` trỏ đến các object khác nhau tùy thuộc vào call-site của lệnh gọi hàm. Nhưng chính xác thì các object là gì, và tại sao chúng ta cần chỉ ra chúng? Chúng ta sẽ khám phá các object một cách chi tiết trong chương này.

## Syntax

Các object có hai dạng: declarative (literal) form và constructed form.

Cú pháp literal(kí tự) cho một object trông như thế này:

```js
var myObj = {
	key: value
	// ...
};
```

Constructed form trông như thế này:

```js
var myObj = new Object();
myObj.key = value;
```

Constructed form và literal form dẫn đến cùng một loại object. Sự khác biệt duy nhất thực sự là bạn có thể thêm một hoặc nhiều cặp key/value (khóa/giá trị) vào khai báo literal, trong khi với các object tạo bằng constructed form, bạn phải thêm từng thuộc tính một (one by one).

**Lưu Ý:** Rất hiếm khi sử dụng "constructed form" để tạo các object như được minh hoạ. Bạn sẽ luôn muốn sử dụng dạng cú pháp theo literal. Điều này cũng đúng với hầu hết các object tích hợp sẵn (xem bên dưới).

## Type

Các object là khối xây dựng chung mà phần lớn JS được xây dựng trên đó. Chúng là một trong 6 loại chính (được gọi là "loại ngôn ngữ" trong đặc tả) trong JS:

* `string`
* `number`
* `boolean`
* `null`
* `undefined`
* `object`

Lưu ý rằng *simple primitives* (`string`, `number`, `boolean`, `null`, và `undefined`)  **không phải** bản thân nó là các `object`. `null` đôi khi được gọi là một loại object, nhưng quan niệm sai lầm này bắt nguồn từ một lỗi trong ngôn ngữ khiến `typeof null` trả về chuỗi `"object"` không chính xác (và gây nhầm lẫn). Trên thực tế, `null` là kiểu primitives của riêng nó.

**Đó là một tuyên bố sai phổ biến rằng "mọi thứ trong JavaScript đều là một object". Điều này rõ ràng là không đúng.**

Ngược lại, có *có* một vài object sub-types đặc biệt, mà chúng ta có thể gọi là *complex primitives*.

`function` là một sub-type(kiểu phụ) của object (về mặt kỹ thuật, là một "callable object" (đối tượng có thể gọi)). Các function trong JS được cho là "first-class" vì về cơ bản chúng chỉ là các object bình thường (với ngữ nghĩa hành vi có thể gọi được bật lên) và vì vậy chúng có thể được xử lý giống như bất kỳ object đơn giản nào khác.

Array cũng là một dạng object, có thêm hành vi. Việc tổ chức nội dung trong mảng có cấu trúc hơn một chút so với các object chung.

### Built-in Objects

Có một số sub-type object khác, thường được gọi là build-in object. Đối với một số thứ trong số đó, tên của nó dường như ngụ ý rằng nó có liên quan trực tiếp đến các thành phầm simple primitives của nó, nhưng trên thực tế, mối quan hệ của nó phức tạp hơn, mà chúng ta sẽ khám phá ngay sau đây..

* `String`
* `Number`
* `Boolean`
* `Object`
* `Function`
* `Array`
* `Date`
* `RegExp`
* `Error`

Các build-in này có vẻ ngoài là các kiểu thực sự, thậm chí là các class, nếu bạn dựa vào sự tương tự với các ngôn ngữ khác, chẳng hạn như class `String` của Java.

Nhưng trong JS, đây thực sự chỉ là những build-in function. Mỗi build-in function này có thể được sử dụng như một constructor (nghĩa là, một lệnh gọi function với toán tử `new` - xem Chương 2), với kết quả là một object mới *được xây dựng* của sub-type được đề cập. Ví dụ:

```js
var strPrimitive = "I am a string";
typeof strPrimitive;							// "string"
strPrimitive instanceof String;					// false

var strObject = new String( "I am a string" );
typeof strObject; 								// "object"
strObject instanceof String;					// true

// inspect the object sub-type
Object.prototype.toString.call( strObject );	// [object String]
```

Chúng ta sẽ xem chi tiết trong chương sau về cách thức hoạt động của `Object.prototype.toString...`, nhưng ngắn gọn, chúng ta có thể kiểm tra sub-type bên trong bằng cách mượn phương thức `toString()` mặc định cơ sở và bạn có thể thấy nó tiết lộ rằng `strObject` là một object trên thực tế được tạo bởi function tạo `String`.

Giá trị primitive `"I am a string"` không phải là một object, nó là một primitive theo nghĩa đen(literal) và immutable (không thay đổi). Để thực hiện các thao tác trên nó, chẳng hạn như kiểm tra độ dài của nó, truy cập nội dung ký tự riêng lẻ của nó, v.v., cần có object `String`.

May mắn thay, ngôn ngữ này tự động ép kiểu một primitive `"string"` thành một object `String` khi cần thiết, có nghĩa là bạn hầu như không bao giờ cần phải tạo mẫu Object một cách rõ ràng. Phần lớn cộng đồng JS được **đặc biệt ưa thích** sử dụng literal form cho một giá trị, nếu có thể, thay vì constructed object form.

Xem xét:

```js
var strPrimitive = "I am a string";

console.log( strPrimitive.length );			// 13

console.log( strPrimitive.charAt( 3 ) );	// "m"
```

Trong cả hai trường hợp, chúng ta gọi một thuộc tính hoặc phương thức trên một chuỗi primitive và công cụ tự động ép kiểu nó thành một object `String`, để quyền truy cập thuộc tính/phương thức hoạt động.

Tương tự kiểu ép kiểu cũng có giữa số primitive theo literal `42` và object wrapper `new Number(42)`, khi sử dụng các phương thức như `42.359.toFixed(2)`. Tương tự như vậy đối với object `Boolean` từ primitive `"boolean"`.

`null` và `undefined` không có object wrapper form, chỉ có các giá trị primitive của chúng. Ngược lại, các giá trị `Date` chỉ có thể *chỉ* được tạo bằng constructed object form của chúng, vì chúng không có phần đối lập literal form.

`Object`, `Array`, `Function` và `RegExp`(biểu thức chính quy) là các object bất kể là literal form hay constructed form được sử dụng. Trong một số trường hợp, constructed form cung cấp nhiều tùy chọn hơn trong việc tạo so với literal form. Vì các object được tạo ra theo cả hai cách, nên literal form đơn giản hơn hầu như được ưa thích hơn. **Chỉ sử dụng construced form nếu bạn cần các tùy chọn bổ sung.**

Các object `Error` hiếm khi được tạo rõ ràng trong code, nhưng thường được tạo tự động khi các ngoại lệ được ném ra. Chúng có thể được tạo với construced form là `new Error(..)`, nhưng nó thường không cần thiết.

## Contents

Như đã đề cập trước đó, nội dung(contents) của một object bao gồm các giá trị (bất kỳ loại nào) được lưu trữ tại các *vị trí* được đặt tên cụ thể, mà chúng ta gọi là thuộc tính(property).

Điều quan trọng cần lưu ý là mặc dù chúng ta nói "content" ngụ ý rằng các giá trị này *thực sự* được lưu trữ bên trong object, đó chỉ là hình thức bên ngoài. Engine lưu trữ các giá trị theo những cách phụ thuộc vào việc triển khai và rất có thể không lưu trữ chúng *trong* một số vùng chứa object. Những gì *là* được lưu trữ trong vùng chứa là những tên thuộc tính này, hoạt động như con trỏ (về mặt kỹ thuật, *tham chiếu*) đến nơi các giá trị được lưu trữ.

Xem xét:

```js
var myObject = {
	a: 2
};

myObject.a;		// 2

myObject["a"];	// 2
```

Để truy cập giá trị tại *vị trí* `a` trong `myObject`, chúng ta cần sử dụng toán tử `.` hoặc toán tử `[]`. Cú pháp `.a` thường được gọi là truy cập "thuộc tính" ("property" access), trong khi cú pháp `["a"]` thường được gọi là truy cập "khóa" ("key" access). Trên thực tế, cả hai đều truy cập cùng một *vị trí* và sẽ lấy ra cùng một giá trị, `2`, vì vậy các thuật ngữ có thể được sử dụng thay thế cho nhau. Chúng ta sẽ sử dụng thuật ngữ phổ biến nhất, "property access" kể từ đây trở đi.

Sự khác biệt chính giữa hai cú pháp là toán tử `.` yêu cầu tên thuộc tính tương thích `Identifier` sau nó, trong khi cú pháp `[".."]` về cơ bản có thể lấy bất kỳ chuỗi tương thích UTF-8/unicode nào làm tên cho thuộc tính. Ví dụ: để tham chiếu một thuộc tính có tên "Super-Fun!", Bạn sẽ phải sử dụng cú pháp truy cập `[" Super-Fun! "]`, Vì `Super-Fun!` Không phải là `Identifier` hợp lệ tên thuộc tính.

Ngoài ra, vì cú pháp `[".."]` sử dụng **giá trị** của chuỗi để chỉ định vị trí, điều này có nghĩa là chương trình có thể lập trình tạo giá trị của chuỗi, chẳng hạn như:

```js
var wantA = true;
var myObject = {
	a: 2
};

var idx;

if (wantA) {
	idx = "a";
}

// later

console.log( myObject[idx] ); // 2
```

Trong các đối tượng, tên thuộc tính **luôn** là string. Nếu bạn sử dụng bất kỳ giá trị nào khác ngoài `string` (primitive) làm thuộc tính, thì trước tiên nó sẽ được chuyển đổi thành string. Điều này thậm chí còn bao gồm các số, thường được sử dụng làm chỉ số mảng, vì vậy hãy cẩn thận để không nhầm lẫn việc sử dụng số giữa các object và mảng.

```js
var myObject = { };

myObject[true] = "foo";
myObject[3] = "bar";
myObject[myObject] = "baz";

myObject["true"];				// "foo"
myObject["3"];					// "bar"
myObject["[object Object]"];	// "baz"
```

### Computed Property Names (Tên Thuộc Tính Được Tính Toán)

Cú pháp truy cập thuộc tính `myObject[..]` mà chúng ta vừa mô tả rất hữu ích nếu bạn cần sử dụng giá trị biểu thức được tính toán *làm* tên khóa, như `myObject[prefix + name]`. Nhưng điều đó không thực sự hữu ích khi khai báo các object sử dụng cú pháp object-literal.

ES6 thêm *computed property name*, nơi bạn có thể chỉ định một biểu thức, được bao quanh bởi cặp `[]`, ở vị trí key-name của khai báo object-literal:

```js
var prefix = "foo";

var myObject = {
	[prefix + "bar"]: "hello",
	[prefix + "baz"]: "world"
};

myObject["foobar"]; // hello
myObject["foobaz"]; // world
```

Cách sử dụng phổ biến nhất của *computed property names* có thể sẽ dành cho các `Symbol` của ES6, mà chúng ta sẽ không trình bày chi tiết trong cuốn sách này. Nói tóm lại, chúng là một kiểu dữ liệu nguyên thủy mới có giá trị không rõ ràng không thể đoán được (về mặt kỹ thuật là giá trị `string`). Bạn sẽ thực sự không khuyến khích làm việc với *giá trị thực* của một `Symbol` (về mặt lý thuyết có thể khác nhau giữa các công cụ JS khác nhau), vì vậy tên của `Symbol`, chẳng hạn như `Symbol.Something` (chỉ là một cái tên được tạo thành!), sẽ là những gì bạn sử dụng:

```js
var myObject = {
	[Symbol.Something]: "hello world"
};
```

### Property vs. Method

Một số nhà phát triển muốn phân biệt khi nói về quyền truy cập thuộc tính trên một object, nếu giá trị được truy cập tình cờ là một function. Bởi vì thật hấp dẫn khi nghĩ function là *thuộc về* object và trong các ngôn ngữ khác, các function thuộc về object (hay còn gọi là "class") được gọi là "method", nên không có gì lạ khi nghe nói, "method access" trái ngược với "property access".

**The specification makes this same distinction**, một cách thú vị.

Về mặt kỹ thuật, các function không bao giờ "thuộc về" các object, vì vậy nói rằng một function chỉ tình cờ được truy cập trên một object reference sẽ tự động là một "method" có vẻ hơi phức tạp về ngữ nghĩa.

Nó *là* đúng cho một số function có tham chiếu `this` trong chúng, và rằng *đôi khi* các tham chiếu `this` này tham chiếu đến tham chiếu object tại call-site. Nhưng cách sử dụng này thực sự không làm cho function đó trở thành một "method" hơn bất kỳ function nào khác, vì `this` được ràng buộc động tại thời điểm chạy, tại call-site, và do đó, mối quan hệ của nó với object là gián tiếp, tốt nhất là.

Mỗi khi bạn truy cập một thuộc tính trên một object, đó là **property access**, bất kể loại giá trị bạn nhận lại là gì. Nếu bạn *tình cờ* nhận được một function từ property access đó, thì nó không phải là một "method" kỳ diệu tại thời điểm đó. Không có gì đặc biệt (ngoài ràng buộc tiềm ẩn có thể có `this` như đã giải thích trước đó) về một function đến từ property access.

Cho minh hoạ:

```js
function foo() {
	console.log( "foo" );
}

var someFoo = foo;	// variable reference to `foo`

var myObject = {
	someFoo: foo
};

foo;				// function foo(){..}

someFoo;			// function foo(){..}

myObject.someFoo;	// function foo(){..}
```

`someFoo` và `myObject.someFoo` chỉ là hai tham chiếu riêng biệt đến cùng một function, và không ngụ ý bất kỳ điều gì về function là đặc biệt hoặc "thuộc sở hữu" của bất kỳ object nào khác. Nếu `foo()` ở trên được xác định là có một `this` reference bên trong nó, rằng `myObject.someFoo` *implicit binding* sẽ là sự khác biệt **duy nhất** có thể quan sát được giữa hai tham chiếu. Không tham chiếu nào thực sự có ý nghĩa khi được gọi là "method".

**Có thể ai đó có thể tranh luận** rằng một function *trở thành một method*, không phải tại thời điểm định nghĩa, mà trong thời gian chạy chỉ cho lệnh gọi đó, tùy thuộc vào cách nó được gọi tại call-site của nó (có object reference context hay không - xem Chương 2 để biết thêm chi tiết). Ngay cả cách giải thích này cũng hơi dài dòng.

Kết luận an toàn nhất có lẽ là "function" và "method" có thể hoán đổi cho nhau trong JavaScript.

**Lưu Ý:** ES6 thêm một tham chiếu `super`, thường sẽ được sử dụng với `class` (xem Phụ lục A). Cách thức hoạt động của `super` (static binding chứ không phải late binding như` this`) tạo thêm sức nặng cho ý tưởng rằng một function được `super` ràng buộc ở đâu đó giống một "method" hơn là "function". Nhưng một lần nữa, đây chỉ là những sắc thái ngữ nghĩa tinh tế (và cơ học).

Ngay cả khi bạn khai báo một function expression như một phần của object-literal, thì function đó không *thuộc về* object một cách kỳ diệu - vẫn chỉ là nhiều tham chiếu đến cùng một function object:

```js
var myObject = {
	foo: function foo() {
		console.log( "foo" );
	}
};

var someFoo = myObject.foo;

someFoo;		// function foo(){..}

myObject.foo;	// function foo(){..}
```

**Lưu Ý:** Trong Chương 6, chúng ta sẽ trình bày một cách viết tắt ES6 cho cú pháp khai báo `foo: function foo(){..}` trong object-literal của chúng ta.

### Arrays

Array cũng sử dụng mẫu truy cập `[ ]`, tuy nhiên như đã đề cập ở trên, nó có tổ chức có cấu trúc hơn một chút về cách thức và vị trí các giá trị được lưu trữ (mặc dù vẫn không hạn chế về *kiểu* giá trị nào được lưu trữ). Array thiết lập *numeric indexing*, có nghĩa là các giá trị được lưu trữ ở các vị trí, thường được gọi là *chỉ số*, tại các số nguyên không âm, chẳng hạn như `0` và `42`.

```js
var myArray = [ "foo", 42, "bar" ];

myArray.length;		// 3

myArray[0];			// "foo"

myArray[2];			// "bar"
```

Arrays *là* những objects, vì vậy, mặc dù mỗi chỉ mục là một số nguyên dương, bạn có thể *cũng* thêm thuộc tính vào array:

```js
var myArray = [ "foo", 42, "bar" ];

myArray.baz = "baz";

myArray.length;	// 3

myArray.baz;	// "baz"
```

Lưu ý rằng việc thêm các thuộc tính bằng tên (bất kể cú pháp toán tử `.` hoặc `[]`) sẽ không thay đổi `length` được báo cáo của array.

Bạn *có thể* sử dụng một array như một object key/value thuần túy và không bao giờ thêm bất kỳ chỉ số số nào, nhưng đây là một ý tưởng tồi vì array có hành vi và tối ưu hóa cụ thể cho mục đích sử dụng của chúng và tương tự như vậy với các object thuần túy. Sử dụng các object để lưu trữ các cặp key/value và array để lưu trữ các giá trị tại các chỉ số số.

**Hãy cẩn thận:** Nếu bạn cố gắng thêm một thuộc tính vào một array, nhưng tên thuộc tính *trông* giống như một số, thay vào đó nó sẽ kết thúc dưới dạng một chỉ mục số (do đó sửa đổi nội dung của mảng):

```js
var myArray = [ "foo", 42, "bar" ];

myArray["3"] = "baz";

myArray.length;	// 4

myArray[3];		// "baz"
```

### Duplicating Objects (Sao Chép Object)

Một trong những tính năng thường được yêu cầu khi các nhà phát triển mới sử dụng ngôn ngữ JavaScript là cách sao chép một đối tượng. Có vẻ như chỉ nên có một build-in `copy()` method, phải không? Nó chỉ ra rằng nó phức tạp hơn một chút, bởi vì nó không hoàn toàn rõ ràng, theo mặc định, nên là thuật toán cho sự trùng lặp.

Ví dụ, hãy xem xét đối tượng này:

```js
function anotherFunction() { /*..*/ }

var anotherObject = {
	c: true
};

var anotherArray = [];

var myObject = {
	a: 2,
	b: anotherObject,	// reference, not a copy!
	c: anotherArray,	// another reference!
	d: anotherFunction
};

anotherArray.push( anotherObject, myObject );
```

Chính xác thì cái gì nên là đại diện của một *bản sao* của `myObject`?

Trước tiên, chúng ta nên trả lời nếu nó là một bản sao *shallow (cạn)* hoặc *deep (sâu)*. Một *shallow copy* sẽ kết thúc bằng `a` trên object mới dưới dạng bản sao của giá trị `2`, nhưng các thuộc tính `b`, `c` và `d` chỉ là các tham chiếu đến cùng vị trí với các tham chiếu trong object ban đầu. Một *deep copy* sẽ sao chép không chỉ `myObject`, mà cả `anotherObject` và `anotherArray`. Nhưng sau đó chúng ta gặp vấn đề rằng `anotherArray` có tham chiếu đến `anotherObject` và `myObject` trong đó, vì vậy *những thứ đó* đó cũng nên được sao chép thay vì được giữ nguyên tham chiếu. Bây giờ chúng ta có một vấn đề sao chép vòng tròn vô hạn vì tham chiếu vòng tròn.

Chúng ta có nên phát hiện một tham chiếu vòng tròn và chỉ phá vỡ đường truyền vòng tròn (để deep element không được sao chép hoàn toàn) không? Chúng ta có nên sửa lỗi hoàn toàn không? Một cái gì đó ở giữa?

Hơn nữa, nó không thực sự rõ ràng "nhân bản" một function sẽ có nghĩa là gì? Có một số thủ thuật như rút ra tuần tự hóa `toString()` của mã nguồn của một function (thay đổi giữa các lần triển khai và thậm chí không đáng tin cậy trong tất cả các công cụ tùy thuộc vào loại function đang được kiểm tra).

Vậy làm cách nào để giải quyết tất cả những câu hỏi hóc búa này? Mỗi framework JS khác nhau đã chọn cách diễn giải riêng và đưa ra quyết định của riêng mình. Nhưng JS nào trong số này (nếu có) nên áp dụng làm tiêu chuẩn? Trong một thời gian dài, không có câu trả lời rõ ràng..

Một giải pháp tập hợp con là các object JSON an toàn (có nghĩa là, có thể được tuần tự hóa thành một chuỗi JSON và sau đó được phân tích cú pháp lại thành object có cùng cấu trúc và giá trị) có thể dễ dàng *nhân bản* với:

```js
var newObj = JSON.parse( JSON.stringify( someObj ) );
```

Tất nhiên, điều đó đòi hỏi bạn phải đảm bảo object của bạn là JSON safe. Đối với một số tình huống, điều đó thật tầm thường. Đối với những người khác, nó không đủ.

Đồng thời, một shallow copy khá dễ hiểu và ít gặp vấn đề hơn, vì vậy ES6 hiện đã định nghĩa `Object.assign(..)` cho tác vụ này. `Object.assign(..)` nhận một *target* object làm tham số đầu tiên và một hoặc nhiều *source* object làm tham số tiếp theo của nó. Nó lặp lại tất cả các khóa *có thể liệt kê* (xem bên dưới), *thuộc sở hữu* (**hiện ngay**) trên (các)  *source* object và sao chép chúng (chỉ qua `=` gán) sang *target*. Nó cũng hữu ích trả về *target*, như bạn có thể thấy bên dưới:

```js
var newObj = Object.assign( {}, myObject );

newObj.a;						// 2
newObj.b === anotherObject;		// true
newObj.c === anotherArray;		// true
newObj.d === anotherFunction;	// true
```

**Ghi Chú:** Trong phần tiếp theo, chúng ta mô tả "property (bộ mô tả thuộc tính)" (đặc điểm thuộc tính) và trình bày cách sử dụng `Object.defineProperty(..)`. Tuy nhiên, sự trùng lặp xảy ra đối với `Object.assign(..)` hoàn toàn là cách gán kiểu `=`, vì vậy bất kỳ đặc điểm đặc biệt nào của một thuộc tính (như `writable`) trên một source object **sẽ không được bảo toàn** trên target object.

### Property Descriptors

Trước ES5, ngôn ngữ JavaScript không có cách nào trực tiếp để code của bạn kiểm tra hoặc rút ra bất kỳ sự phân biệt nào giữa các đặc tính của các thuộc tính, chẳng hạn như liệu thuộc tính có ở chế độ read-only hay không.

Nhưng kể từ ES5, tất cả các thuộc tính được mô tả dưới dạng **property descriptor**.

Xem xét code này:

```js
var myObject = {
	a: 2
};

Object.getOwnPropertyDescriptor( myObject, "a" );
// {
//    value: 2,
//    writable: true,
//    enumerable: true,
//    configurable: true
// }
```

Như bạn có thể thấy, property descriptor (được gọi là "data descriptor" vì nó chỉ để giữ một giá trị dữ liệu) cho thuộc tính đối tượng bình thường của chúng ta `a` nhiều hơn là chỉ `giá trị` của `2`. Nó bao gồm 3 đặc điểm khác: `writable`, `enumerable`(có thể liệt kê được) và `configurable`.

Mặc dù chúng ta có thể xem các giá trị mặc định cho các đặc tính của property descriptor là gì khi chúng ta tạo một thuộc tính bình thường, chúng ta có thể sử dụng `Object.defineProperty(...)` để thêm một thuộc tính mới hoặc sửa đổi một thuộc tính hiện có (nếu nó là `configurable` !), với các đặc điểm mong muốn.

Cho ví dụ:

```js
var myObject = {};

Object.defineProperty( myObject, "a", {
	value: 2,
	writable: true,
	configurable: true,
	enumerable: true
} );

myObject.a; // 2
```

Sử dụng `defineProperty(..)`, chúng ta đã thêm rõ ràng, normal `a` property tới `myObject` theo cách thủ công rõ ràng. Tuy nhiên, bạn thường sẽ không sử dụng cách tiếp cận thủ công này trừ khi bạn muốn sửa đổi một trong các đặc điểm của bộ mô tả từ hành vi bình thường của nó.

#### Writable

Khả năng bạn thay đổi giá trị của thuộc tính được kiểm soát bởi `writable`.

Xem xét:

```js
var myObject = {};

Object.defineProperty( myObject, "a", {
	value: 2,
	writable: false, // not writable!
	configurable: true,
	enumerable: true
} );

myObject.a = 3;

myObject.a; // 2
```

Như bạn thấy, việc sửa đổi `giá trị` của chúng ta đã âm thầm thất bại. Nếu chúng ta thử trong `strict mode`, chúng ta sẽ nhận một lỗi:

```js
"use strict";

var myObject = {};

Object.defineProperty( myObject, "a", {
	value: 2,
	writable: false, // not writable!
	configurable: true,
	enumerable: true
} );

myObject.a = 3; // TypeError
```

Lỗi `TypeError` cho chúng ta biết rằng chúng ta không thể thay đổi thuộc tính non-writable.

**Ghi Chú:** Chúng ta sẽ thảo luận về getters/setters ngay sau đây, nhưng ngắn gọn, bạn có thể nhận thấy rằng `writeable: false` có nghĩa là một giá trị không thể thay đổi được, điều này tương đương với việc bạn đã định nghĩa một no-op setter. Trên thực tế, bộ cài đặt no-op của bạn sẽ cần phải trả ra một `TypeError` khi được gọi, để thực sự phù hợp với `writeable: false`.

#### Configurable

Miễn là một thuộc tính hiện tại là configurable, chúng ta có thể sửa đổi descriptor definition của nó, bằng cách sử dụng cùng một utility `defineProperty(..)`.

```js
var myObject = {
	a: 2
};

myObject.a = 3;
myObject.a;					// 3

Object.defineProperty( myObject, "a", {
	value: 4,
	writable: true,
	configurable: false,	// not configurable!
	enumerable: true
} );

myObject.a;					// 4
myObject.a = 5;
myObject.a;					// 5

Object.defineProperty( myObject, "a", {
	value: 6,
	writable: true,
	configurable: true,
	enumerable: true
} ); // TypeError
```

Kết quả gọi `defineProperty(..)` cuối cùng trả về một lỗi  TypeError, bất chấp `strict mode`, nếu bạn cố gắng thay đổi định nghĩa bộ mô tả của thuộc tính không thể định cấu hình. Hãy cẩn thận: như bạn có thể thấy, việc thay đổi `configurable` thành `false` là **hành động một chiều và không thể hoàn tác!**

**Ghi Chú:** Có một ngoại lệ cần lưu ý: ngay cả khi thuộc tính đã là `configurable: false` ,`writable` luôn có thể được thay đổi từ `true` thành `false` mà không có lỗi, nhưng không trở lại thành `true` nếu đã là `false`.

Một điều khác mà `configurable: false` ngăn chặn là khả năng sử dụng toán tử `delete` để xóa một thuộc tính hiện có.

```js
var myObject = {
	a: 2
};

myObject.a;				// 2
delete myObject.a;
myObject.a;				// undefined

Object.defineProperty( myObject, "a", {
	value: 2,
	writable: true,
	configurable: false,
	enumerable: true
} );

myObject.a;				// 2
delete myObject.a;
myObject.a;				// 2
```

Như bạn có thể thấy, lệnh gọi `delete` cuối cùng không thành công (âm thầm) vì chúng ta đã đặt thuộc tính `a` là non-configurable.

`delete` chỉ được sử dụng để loại bỏ các object properties (có thể được xóa) trực tiếp khỏi object được đề cập. Nếu một thuộc tính object là *tham chiếu* cuối cùng còn lại đối với một số object/function và bạn `delete` nó, điều đó sẽ xóa tham chiếu và bây giờ object/function không được tham chiếu đó có thể được thu gom. Tuy nhiên, **không** phù hợp khi coi `delete` như một công cụ để giải phóng bộ nhớ được cấp phát như nó làm trong các ngôn ngữ khác (như C/C ++). `delete` chỉ là một thao tác xóa object property - không có gì khác.

#### Enumerable

Descriptor characteristic cuối cùng mà chúng ta đề cập ở đây (có hai đặng điểm khác, mà chúng ta sẽ giải quyết ngay khi thảo luận về getter/setters) là `enumerable`.

Tên có thể làm cho nó rõ ràng, nhưng đặc tính này kiểm soát nếu một thuộc tính sẽ hiển thị trong một số kiểu liệt kê thuộc tính đối tượng nhất định, chẳng hạn như vòng lặp `for..in`. Đặt thành `false` để ngăn nó hiển thị trong các bảng liệt kê như vậy, mặc dù nó vẫn hoàn toàn có thể truy cập được. Đặt thành `true` để giữ cho nó hiện diện.

Tất cả các thuộc tính thông thường do người dùng xác định được mặc định là `enumerable`, vì đây là điều bạn muốn. Nhưng nếu bạn có một thuộc tính đặc biệt mà bạn muốn ẩn khỏi việc liệt kê, hãy đặt nó thành `enumerable: false`.

Chúng ta sẽ sớm chứng minh khả năng liệt kê chi tiết hơn, vì vậy hãy ghi nhớ lại chủ đề này.

### Immutability

Đôi khi người ta muốn tạo ra các thuộc tính hoặc object không thể thay đổi (do vô tình hoặc cố ý). ES5 bổ sung hỗ trợ để xử lý điều đó theo nhiều cách khác nhau mang nhiều sắc thái.

Điều quan trọng cần lưu ý là **tất cả** các cách tiếp cận này đều tạo ra shallow immutability. Tức là chúng chỉ ảnh hưởng đến object và các đặc điểm thuộc tính trực tiếp của nó. Nếu một object có tham chiếu đến một đối tượng khác (mảng, đối tượng, hàm, v.v.), thì  *content* của object đó không bị ảnh hưởng và vẫn có thể thay đổi.

```js
myImmutableObject.foo; // [1,2,3]
myImmutableObject.foo.push( 4 );
myImmutableObject.foo; // [1,2,3,4]
```

Chúng ta giả sử trong đoạn code này rằng `myImmutableObject` đã được tạo và bảo vệ dưới dạng immutable (bất biến). Tuy nhiên, để bảo vệ nội dung của `myImmutableObject.foo` (là object riêng của nó - mảng), bạn cũng cần làm cho `foo` không thể thay đổi, bằng cách sử dụng một hoặc nhiều function sau.

**Ghi Chú:** Việc tạo các đối tượng bất biến cố định sâu trong các chương trình JS không quá phổ biến. Các trường hợp đặc biệt chắc chắn có thể yêu cầu nó, nhưng như một mẫu thiết kế chung, nếu bạn thấy mình muốn *niêm phong* hoặc *đóng băng* tất cả các đối tượng của mình, bạn có thể muốn lùi lại một bước và xem xét lại thiết kế chương trình của mình để mạnh mẽ hơn những thay đổi tiềm ẩn trong giá trị của đối tượng.

#### Object Constant

Bằng cách kết hợp `writable:false` và `configurable:false`, về cơ bản bạn có thể tạo một *constant* (không thể changed, redefined hoặc deleted) như một thuộc tính đối tượng, như:

```js
var myObject = {};

Object.defineProperty( myObject, "FAVORITE_NUMBER", {
	value: 42,
	writable: false,
	configurable: false
} );
```

#### Prevent Extensions

Nếu bạn muốn ngăn một object có các thuộc tính mới được thêm vào nó, nhưng nếu không, hãy để phần còn lại của các thuộc tính của đối tượng một mình, hãy gọi `Object.preventExtensions(..)`:

```js
var myObject = {
	a: 2
};

Object.preventExtensions( myObject );

myObject.b = 3;
myObject.b; // undefined
```

Trong `non-strict mode`, tạo `b` thất bại ngầm(không thực thi được ko kèm theo báo lỗi). Trong `strict mode`, nó sẽ báo lỗi `TypeError`.

#### Seal

`Object.seal(..)` tạo một object "seal (được niêm phong)", có nghĩa là nó lấy một object hiện có và về cơ bản gọi `Object.preventExtensions(..)` trên đó, nhưng cũng đánh dấu tất cả các thuộc tính hiện có của nó là `configurable: false`.

Vì vậy, bạn không những không thể thêm bất kỳ thuộc tính nào mà còn không thể định cấu hình lại hoặc xóa bất kỳ thuộc tính hiện có nào (mặc dù bạn *vẫn có thể* sửa đổi giá trị của chúng).

#### Freeze

`Object.freeze (..)` tạo một đối tượng được đóng băng, có nghĩa là nó lấy một đối tượng hiện có và về cơ bản gọi `Object.seal(..)` trên đó, nhưng nó cũng đánh dấu tất cả các thuộc tính "data accessor" là `writable: false`, do đó giá trị của chúng không thể thay đổi.

Cách tiếp cận này là mức độ bất biến cao nhất mà bạn có thể đạt được cho chính một đối tượng, vì nó ngăn chặn bất kỳ thay đổi nào đối với đối tượng hoặc bất kỳ thuộc tính trực tiếp nào của nó (mặc dù, như đã đề cập ở trên, nội dung của bất kỳ đối tượng nào khác được tham chiếu đều không bị ảnh hưởng).

Bạn có thể "deep freeze" một đối tượng bằng cách gọi `Object.freeze(..)` trên đối tượng, sau đó lặp lại đệ quy trên tất cả các đối tượng mà nó tham chiếu (cho đến nay sẽ không bị ảnh hưởng) và gọi `Object.freeze(. .)` trên chúng nữa. Tuy nhiên, hãy cẩn thận vì điều đó có thể ảnh hưởng đến các đối tượng (được chia sẻ) khác mà bạn không có ý định ảnh hưởng.


### `[[Get]]`

Có một chi tiết tinh tế, nhưng quan trọng, về cách thực hiện quyền truy cập thuộc tính.

Xem xét:

```js
var myObject = {
	a: 2
};

myObject.a; // 2
```

`myObject.a` là một propety access, nhưng nó không *chỉ* tìm trong `myObject` để tìm thuộc tính có tên `a`, vì nó có vẻ như.

Theo thông số kỹ thuật, đoạn code trên thực sự thực hiện một hoạt động `[[Get]]` (giống như một lệnh gọi hàm:  `[[Get]]()`) trên `myObject`. Phép toán `[[Get]]` tích hợp mặc định cho một đối tượng *đầu tiên* kiểm tra đối tượng để tìm thuộc tính có tên được yêu cầu và nếu tìm thấy nó, nó sẽ trả về giá trị tương ứng.

Tuy nhiên, thuật toán `[[Get]]` xác định hành vi quan trọng khác nếu nó * không * tìm thấy thuộc tính của tên được yêu cầu. Chúng ta sẽ xem xét trong Chương 5 điều gì sẽ xảy ra *tiếp theo* (truyền qua chuỗi `[[Prototype]]`, nếu có).

Nhưng một kết quả quan trọng của hoạt động `[[Get]]` này là nếu nó không thể thông qua bất kỳ cách nào để đưa ra giá trị cho thuộc tính được yêu cầu, thay vào đó nó sẽ trả về giá trị `undefined'.

```js
var myObject = {
	a: 2
};

myObject.b; // undefined
```

Hành vi này khác với khi bạn tham chiếu *biến* bằng tên định danh của chúng. Nếu bạn tham chiếu đến một biến không thể được giải quyết trong tra cứu lexical scope hiện hành, kết quả không phải là `undefined` như đối với thuộc tính đối tượng, mà thay vào đó, một `ReferenceError` sẽ được đưa ra.

```js
var myObject = {
	a: undefined
};

myObject.a; // undefined

myObject.b; // undefined
```

Từ quan điểm *giá trị*, không có sự khác biệt giữa hai tham chiếu này - cả hai đều dẫn đến `undefined`. Tuy nhiên, hoạt động `[[Get]]` bên dưới, mặc dù tinh tế trong nháy mắt, nhưng có khả năng thực hiện "công việc" nhiều hơn một chút cho tham chiếu `myObject.b` so với tham chiếu `myObject.a`.

Chỉ kiểm tra kết quả giá trị, bạn không thể phân biệt liệu một thuộc tính có tồn tại và giữ giá trị rõ ràng `undefined` hay không, hay liệu thuộc tính *không* tồn tại và `undefined` là giá trị trả về mặc định sau khi `[[Get]]` không thành trả lại một cái gì đó một cách rõ ràng. Tuy nhiên, chúng tôi sẽ xem ngay cách bạn *có thể* phân biệt hai trường hợp này.

### `[[Put]]`

Vì có một hoạt động `[[Get]]` được xác định nội bộ để nhận một giá trị từ một thuộc tính, nên hiển nhiên là cũng có một hoạt động `[[Put]]` mặc định.

Có thể bạn sẽ cảm thấy hấp dẫn khi nghĩ rằng việc gán cho một thuộc tính trên một đối tượng sẽ chỉ gọi `[[Put]]` để đặt hoặc tạo thuộc tính đó trên đối tượng được đề cập. Nhưng tình hình còn nhiều sắc thái hơn thế.

Khi gọi `[[Put]]`, cách nó hoạt động sẽ khác nhau dựa trên một số yếu tố, bao gồm (tác động mạnh nhất) đến việc thuộc tính đã có trên đối tượng hay chưa.

Nếu thuộc tính có mặt, thuật toán `[[Put]]` sẽ kiểm tra sơ bộ:

1. Thuộc tính có phải là accessor descriptor (xem phần "Getters & Setters" bên dưới) không? **Nếu vậy, hãy gọi setter, nếu có.**
2. Thuộc tính có phải là accessor descriptor với giá trị `writable` của `false` không? **Nếu vậy, hãy im lặng không thành công ở `non-strict mode`, hoặc báo lỗi `TypeError` ở `strict mode`.**
3. Nếu không, hãy đặt giá trị cho thuộc tính hiện có như bình thường.

Nếu thuộc tính chưa xuất hiện trên đối tượng được đề cập, thì hoạt động `[[Put]]` thậm chí còn nhiều sắc thái và phức tạp hơn. Chúng ta sẽ xem lại kịch bản này trong Chương 5 khi chúng ta thảo luận về `[[Prototype]]` để làm rõ hơn.

### Getters & Setters

Các toán tử mặc định `[[Put]]` và `[[Get]]` cho các đối tượng hoàn toàn kiểm soát cách các giá trị được đặt thành các thuộc tính hiện có hoặc mới hoặc được truy xuất từ các thuộc tính hiện có, tương ứng.

**Ghi Chú:** Sử dụng các khả năng nâng cao/trong tương lai của ngôn ngữ, có thể ghi đè các thao tác mặc định `[[Get]]` hoặc `[[Put]]` cho toàn bộ đối tượng (không chỉ mỗi thuộc tính). Điều này nằm ngoài phạm vi thảo luận của chúng ta trong cuốn sách này, nhưng sẽ được đề cập sau trong loạt bài "You Don't Know JS".

ES5 đã giới thiệu một cách để ghi đè một phần của các hoạt động mặc định này, không phải ở cấp đối tượng mà là cấp mỗi thuộc tính, thông qua việc sử dụng getters và setters. Getters là các thuộc tính thực sự gọi một hàm ẩn để truy xuất một giá trị. Setters là các thuộc tính thực sự gọi một hàm ẩn để đặt giá trị.

Khi bạn xác định một thuộc tính để có một getter hoặc một setter hoặc cả hai, định nghĩa của nó sẽ trở thành một "accessor descriptor (bộ mô tả trình truy cập)" (trái ngược với "data descriptor (bộ mô tả dữ liệu)"). Đối với accessor-descriptors, các đặc điểm `value` và `writable` của bộ mô tả được tranh luận và bỏ qua, thay vào đó JS xem xét các đặc điểm `set` và `get` của thuộc tính (cũng như `configurable` và `enumerable`).

Xem xét:

```js
var myObject = {
	// define a getter for `a`
	get a() {
		return 2;
	}
};

Object.defineProperty(
	myObject,	// target
	"b",		// property name
	{			// descriptor
		// define a getter for `b`
		get: function(){ return this.a * 2 },

		// make sure `b` shows up as an object property
		enumerable: true
	}
);

myObject.a; // 2

myObject.b; // 4
```

Hoặc thông qua cú pháp object-literal với `get a() {..}` hoặc thông qua định nghĩa rõ ràng với `defineProperty(..)`, trong cả hai trường hợp, chúng ta đã tạo một thuộc tính trên đối tượng thực sự không chứa giá trị, nhưng mà quyền truy cập tự động dẫn đến một cuộc gọi hàm ẩn đến hàm getter, với bất kỳ giá trị nào mà nó trả về là kết quả của property access.

```js
var myObject = {
	// define a getter for `a`
	get a() {
		return 2;
	}
};

myObject.a = 3;

myObject.a; // 2
```

Vì chúng ta chỉ định nghĩa getter cho `a`, nếu chúng ta cố gắng gán giá trị của `a` sau đó, hoạt động set sẽ không tạo ra lỗi mà sẽ chỉ âm thầm loại bỏ nhiệm vụ. Ngay cả khi có một setter hợp lệ, getter tùy chỉnh của chúng ta được mã hóa cứng để chỉ trả về `2`, do đó, hoạt động thiết lập sẽ được tranh luận.

Để làm cho kịch bản này trở nên hợp lý hơn, các thuộc tính cũng nên được định nghĩa bằng setter, bộ điều khiển này ghi đè hoạt động mặc định `[[Put]]` (hay còn gọi là phép gán), cho mỗi thuộc tính, giống như bạn mong đợi. Bạn gần như chắc chắn sẽ muốn luôn khai báo cả getter và setter (chỉ có cái này hoặc cái kia thường dẫn đến hành vi không mong muốn/đáng ngạc nhiên):

```js
var myObject = {
	// define a getter for `a`
	get a() {
		return this._a_;
	},

	// define a setter for `a`
	set a(val) {
		this._a_ = val * 2;
	}
};

myObject.a = 2;

myObject.a; // 4
```

**Ghi Chú:** Trong ví dụ này, chúng ta thực sự lưu trữ giá trị được chỉ định `2` của phép gán (phép toán `[[Put]]`) vào một biến khác `_a_`. Tên `_a_` hoàn toàn là theo quy ước cho ví dụ này và ngụ ý không có gì đặc biệt về hành vi của nó - nó là một thuộc tính bình thường như bất kỳ thuộc tính nào khác.

### Existence

Trước đó, chúng ta đã chỉ ra rằng một property access như `myObject.a` có thể dẫn đến giá trị `undefined` nếu `undefined` rõ ràng được lưu trữ ở đó hoặc thuộc tính `a` hoàn toàn không tồn tại. Vì vậy, nếu giá trị là như nhau trong cả hai trường hợp, làm cách nào khác để chúng ta phân biệt chúng?

Chúng ta có thể hỏi một đối tượng nếu nó có một thuộc tính nhất định *mà không* yêu cầu lấy giá trị của thuộc tính đó:

```js
var myObject = {
	a: 2
};

("a" in myObject);				// true
("b" in myObject);				// false

myObject.hasOwnProperty( "a" );	// true
myObject.hasOwnProperty( "b" );	// false
```

Toán tử `in` sẽ kiểm tra xem thuộc tính có ở *trong* object hay nó tồn tại ở bất kỳ cấp cao hơn nào của phương thức truyền đối tượng chuỗi `[[Prototype]]` (xem Chương 5). Ngược lại, `hasOwnProperty(..)` *chỉ* kiểm tra xem liệu `myObject` có thuộc tính hay không và sẽ *không* tham khảo chuỗi `[[Prototype]]`. Chúng ta sẽ quay lại những điểm khác biệt quan trọng giữa hai hoạt động này trong Chương 5 khi chúng ta khám phá chi tiết về `[[Prototype]]`.

`hasOwnProperty(..)` có thể truy cập được cho tất cả các đối tượng bình thường thông qua ủy quyền cho `Object.prototype` (xem Chương 5). Nhưng có thể tạo một đối tượng không liên kết với `Object.prototype` (thông qua `Object.create(null)` - xem Chương 5). Trong trường hợp này, một lệnh gọi phương thức như `myObject.hasOwnProperty(..)` sẽ không thành công.

Trong trường hợp đó, một cách mạnh mẽ hơn để thực hiện kiểm tra như vậy là `Object.prototype.hasOwnProperty.call(myObject,"a")`, mượn phương thức cơ sở `hasOwnProperty(..)` và sử dụng *rõ ràng `this` ràng buộc* (xem Chương 2) để áp dụng nó với `myObject` của chúng ta.

**Ghi Chú:** Toán tử `in` có vẻ như nó sẽ kiểm tra sự tồn tại của một *giá trị* bên trong một vùng chứa, nhưng nó thực sự kiểm tra sự tồn tại của một tên thuộc tính. Sự khác biệt này là quan trọng cần lưu ý đối với các mảng, vì sự cám dỗ để thử kiểm tra như `4 in [2, 4, 6]` là rất mạnh, nhưng điều này sẽ không hoạt động như mong đợi.

#### Enumeration

Trước đây, chúng ta đã giải thích ngắn gọn ý tưởng về "enumerability (khả năng liệt kê)" khi chúng ta xem xét đặc tính của bộ mô tả thuộc tính `enumerable`. Hãy xem lại điều đó và xem xét nó chi tiết hơn.

```js
var myObject = { };

Object.defineProperty(
	myObject,
	"a",
	// make `a` enumerable, as normal
	{ enumerable: true, value: 2 }
);

Object.defineProperty(
	myObject,
	"b",
	// make `b` NON-enumerable
	{ enumerable: false, value: 3 }
);

myObject.b; // 3
("b" in myObject); // true
myObject.hasOwnProperty( "b" ); // true

// .......

for (var k in myObject) {
	console.log( k, myObject[k] );
}
// "a" 2
```

Bạn sẽ nhận thấy rằng `myObject.b` trên thực tế **tồn tại** và có một giá trị có thể truy cập, nhưng nó không hiển thị trong vòng lặp `for..in` (tuy nhiên, đáng ngạc nhiên là nó **là** được tiết lộ bởi kiểm tra sự tồn tại của toán tử `in`). Đó là bởi vì "enumerable" về cơ bản có nghĩa là "sẽ được đưa vào nếu các thuộc tính của đối tượng được lặp qua".

**Ghi Chú:** Vòng lặp `for..in` được áp dụng cho mảng có thể cho kết quả hơi bất ngờ, trong đó việc liệt kê một mảng sẽ không chỉ bao gồm tất cả các chỉ số số mà còn bất kỳ thuộc tính nào. Bạn nên sử dụng vòng lặp `for..in` *chỉ* trên các đối tượng và vòng lặp `for` truyền thống với phép lặp chỉ mục số cho các giá trị được lưu trữ trong mảng.

Một cách khác để phân biệt các thuộc tính có thể liệt kê và không liệt kê được:

```js
var myObject = { };

Object.defineProperty(
	myObject,
	"a",
	// make `a` enumerable, as normal
	{ enumerable: true, value: 2 }
);

Object.defineProperty(
	myObject,
	"b",
	// make `b` non-enumerable
	{ enumerable: false, value: 3 }
);

myObject.propertyIsEnumerable( "a" ); // true
myObject.propertyIsEnumerable( "b" ); // false

Object.keys( myObject ); // ["a"]
Object.getOwnPropertyNames( myObject ); // ["a", "b"]
```

`propertyIsEnumerable(..)` kiểm tra xem tên thuộc tính đã cho có tồn tại *trực tiếp* trên đối tượng hay không và cũng là `enumerable: true`.

`Object.keys(..)` trả về một array gồm tất cả enumerable properties, trong khi `Object.getOwnPropertyNames(..)` trả về một array các *tất cả* thuộc tính, có thể liệt kê hoặc không.

Trong khi `in` so với `hasOwnProperty(..)` khác nhau ở chỗ chúng có tham khảo chuỗi `[[Prototype]]` hay không, `Object.keys(..)` và `Object.getOwnPropertyNames(..)` cả hai kiểm tra *chỉ* đối tượng trực tiếp được chỉ định.

(Hiện tại) không có cách nào được tích hợp sẵn để nhận danh sách **tất cả các thuộc tính** tương đương với những gì mà kiểm tra toán tử `in` sẽ tham khảo (duyệt qua tất cả các thuộc tính trên toàn bộ chuỗi `[[Prototype]]`, như giải thích trong Chương 5). Bạn có thể ước lượng một tiện ích như vậy bằng cách duyệt đệ quy chuỗi `[[Prototype]]` của một đối tượng và đối với mỗi cấp, nắm bắt danh sách từ `Object.keys(..)` - chỉ thuộc tính liệt kê.

## Iteration (Sự lặp lại)

Vòng lặp `for..in` lặp qua danh sách các thuộc tính có thể liệt kê trên một đối tượng (bao gồm cả chuỗi `[[Prototype]]` của nó). Nhưng nếu bạn muốn lặp lại các giá trị thì sao?

Với các mảng được lập chỉ mục số, việc lặp lại các giá trị thường được thực hiện với vòng lặp `for` tiêu chuẩn, như:

```js
var myArray = [1, 2, 3];

for (var i = 0; i < myArray.length; i++) {
	console.log( myArray[i] );
}
// 1 2 3
```

Tuy nhiên, điều này không phải là lặp qua các giá trị, mà là lặp qua các chỉ số, nơi bạn sử dụng chỉ mục để tham chiếu giá trị, như là `myArray[i]`.

ES5 cũng đã thêm một số trình trợ giúp lặp lại cho các mảng, bao gồm `forEach(..)`, `every(..)` và `some(..)`. Mỗi trình trợ giúp này chấp nhận một hàm gọi lại để áp dụng cho từng phần tử trong mảng, chỉ khác nhau về cách chúng tương ứng phản hồi với giá trị trả về từ lệnh gọi lại.

`forEach (..)` sẽ lặp lại trên tất cả các giá trị trong mảng và bỏ qua mọi giá trị trả về gọi lại. `every(..)` tiếp tục cho đến khi kết thúc *hoặc* lệnh gọi lại trả về giá trị `false` (hoặc "falsy"), trong khi `some(..)` tiếp tục cho đến khi kết thúc *hoặc* lệnh gọi lại trả về một Giá trị `true` (hoặc" truthy ").

Các giá trị trả về đặc biệt này bên trong `every(..)` và `some(..)` hoạt động giống như một câu lệnh `break` bên trong vòng lặp `for` bình thường, trong đó chúng dừng quá trình lặp lại sớm trước khi nó kết thúc.

Nếu bạn lặp lại trên một đối tượng bằng vòng lặp `for..in`, bạn cũng chỉ nhận được các giá trị một cách gián tiếp, bởi vì nó thực sự chỉ lặp qua các thuộc tính có thể liệt kê của đối tượng, khiến bạn phải truy cập các thuộc tính theo cách thủ công để lấy các giá trị.

**Ghi Chú:** Ngược lại với việc lặp qua các chỉ số của mảng theo cách có thứ tự số (vòng lặp `for` hoặc các trình vòng lặp khác), thứ tự lặp qua các thuộc tính của đối tượng **không được đảm bảo** và có thể khác nhau giữa các công cụ JS khác nhau. **Không dựa** vào bất kỳ thứ tự quan sát nào cho bất kỳ thứ gì đòi hỏi sự nhất quán giữa các môi trường, vì bất kỳ thỏa thuận quan sát nào đều không đáng tin cậy.

Nhưng điều gì sẽ xảy ra nếu bạn muốn lặp qua các giá trị trực tiếp thay vì chỉ số mảng (hoặc thuộc tính đối tượng)? Một cách hữu ích, ES6 thêm cú pháp vòng lặp `for..of` để lặp qua các mảng (và các đối tượng, nếu đối tượng xác định trình lặp tùy chỉnh của riêng nó):

```js
var myArray = [ 1, 2, 3 ];

for (var v of myArray) {
	console.log( v );
}
// 1
// 2
// 3
```

Vòng lặp `for..of` yêu cầu một iterator object (từ một hàm nội bộ mặc định được gọi là `@@iterator` trong spec-speak) của *thứ* được lặp lại và sau đó vòng lặp sẽ lặp qua các giá trị trả về liên tiếp từ việc gọi phương thức `next()` của đối tượng trình vòng lặp đó, một lần cho mỗi lần lặp vòng lặp.

Mảng có tích hợp sẵn `@@iterator`, vì vậy `for..of` hoạt động dễ dàng trên chúng, như được minh họa. Nhưng hãy lặp lại mảng theo cách thủ công, bằng cách sử dụng trình lặp @@ tích hợp sẵn, để xem nó hoạt động như thế nào:

```js
var myArray = [ 1, 2, 3 ];
var it = myArray[Symbol.iterator]();

it.next(); // { value:1, done:false }
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { done:true }
```

**Ghi Chú:** Chúng ta nhận được tại `@@iterator` *thuộc tính bên trong* của một object bằng cách sử dụng ES6 `Symbol`: `Symbol.iterator`. Chúng ta đã đề cập ngắn gọn ngữ nghĩa của `Symbol` trước đó trong chương (xem "Computed Property Names"), vì vậy lý do tương tự cũng áp dụng ở đây. Bạn sẽ luôn muốn tham chiếu các thuộc tính đặc biệt như vậy bằng tham chiếu tên `Symbol` thay vì bằng giá trị đặc biệt mà nó có thể giữ. Ngoài ra, bất chấp hàm ý của tên, `@@iterator` không phải là **iterator object**, mà là một **function trả về** iterator object - một chi tiết nhỏ nhưng quan trọng!

Như đoạn mã trên tiết lộ, giá trị trả về từ lệnh gọi `next()` của iterator(trình vòng lặp) là một object có dạng `{value: .., done: ..}`, trong đó `value` là giá trị lặp hiện tại và `done` là một `boolean` cho biết nếu còn nhiều phần tử để lặp lại.

Lưu ý rằng giá trị `3` được trả về bằng dấu `done: false`, thoạt nhìn có vẻ lạ. Bạn phải gọi `next()` lần thứ tư (mà vòng lặp `for..of` trong đoạn mã trước đó tự động thực hiện) để nhận: `done: true` và biết rằng bạn đã thực sự lặp lại xong. Lý do cho câu hỏi này nằm ngoài phạm vi của những gì chúng ta sẽ thảo luận ở đây, nhưng nó đến từ ngữ nghĩa của các hàm của trình tạo ES6.

Trong khi các mảng tự động lặp lại trong các vòng lặp `for..of`, thì các đối tượng thông thường **không có tích hợp sẵn `@@iterator`**. Lý do cho sự thiếu sót có chủ ý này phức tạp hơn chúng ta sẽ xem xét ở đây, nhưng nói chung tốt hơn là không bao gồm một số cách triển khai có thể gây rắc rối cho các loại đối tượng trong tương lai.

*Có thể* định nghĩa trình lặp mặc định của riêng bạn `@@iterator` cho bất kỳ object nào mà bạn muốn lặp lại. Ví dụ:

```js
var myObject = {
	a: 2,
	b: 3
};

Object.defineProperty( myObject, Symbol.iterator, {
	enumerable: false,
	writable: false,
	configurable: true,
	value: function() {
		var o = this;
		var idx = 0;
		var ks = Object.keys( o );
		return {
			next: function() {
				return {
					value: o[ks[idx++]],
					done: (idx > ks.length)
				};
			}
		};
	}
} );

// iterate `myObject` manually
var it = myObject[Symbol.iterator]();
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { value:undefined, done:true }

// iterate `myObject` with `for..of`
for (var v of myObject) {
	console.log( v );
}
// 2
// 3
```

**Ghi Chú:** Chúng ta đã sử dụng `Object.defineProperty(..)` để định nghĩa `@@iterator` tùy chỉnh của chúng ta (chủ yếu để chúng ta có thể làm cho nó không thể liệt kê được), nhưng sử dụng `Symbol` như một *computed property name* (đã đề cập trước đó trong chương này), chúng ta có thể khai báo nó trực tiếp, như `var myObject = {a: 2, b: 3, [Symbol.iterator]: function () {/ * .. * /}}`.

Mỗi lần vòng lặp `for..of` gọi `next()` trên interator object của `myObject`, con trỏ nội bộ sẽ tiến lên và trả về giá trị tiếp theo từ danh sách thuộc tính của đối tượng (xem lưu ý trước về thứ tự lặp trên thuộc tính/giá trị đối tượng).

Phép lặp mà chúng tôi vừa trình bày là phép lặp giá trị theo giá trị đơn giản, nhưng tất nhiên bạn có thể xác định các phép lặp phức tạp tùy ý cho cấu trúc dữ liệu tùy chỉnh của mình, khi bạn thấy phù hợp. Các trình vòng lặp tùy chỉnh kết hợp với vòng lặp `for..of` của ES6 là một công cụ cú pháp mới mạnh mẽ để thao tác các đối tượng do người dùng định nghĩa.

Ví dụ: danh sách các đối tượng `Pixel` (với các giá trị tọa độ `x` và `y`) có thể quyết định sắp xếp thứ tự lặp lại của nó dựa trên khoảng cách tuyến tính từ điểm gốc `(0,0)` hoặc lọc ra các điểm "quá xa", v.v. Miễn là trình lặp của bạn trả về giá trị `{value: ..}` mong đợi trả về từ các lệnh gọi `next()` và `{done: true}` sau khi hoàn thành lặp lại, ES6's `for..of` có thể lặp lại nó.

Trên thực tế, bạn thậm chí có thể tạo các trình vòng lặp "vô hạn" không bao giờ "kết thúc" và luôn trả về một giá trị mới (chẳng hạn như một số ngẫu nhiên, một giá trị tăng dần, một số nhận dạng duy nhất, v.v.), mặc dù bạn có thể sẽ không sử dụng các trình vòng lặp đó với một vòng lặp `for..of` không bị ràng buộc, vì nó sẽ không bao giờ kết thúc và sẽ treo chương trình của bạn.

```js
var randoms = {
	[Symbol.iterator]: function() {
		return {
			next: function() {
				return { value: Math.random() };
			}
		};
	}
};

var randoms_pool = [];
for (var n of randoms) {
	randoms_pool.push( n );

	// don't proceed unbounded!
	if (randoms_pool.length === 100) break;
}
```

Trình lặp này sẽ tạo các số ngẫu nhiên "mãi mãi", vì vậy chúng ta cẩn thận chỉ lấy ra 100 giá trị để chương trình của chúng ta không bị treo.

## Review (TL;DR)

Các đối tượng trong JS có cả dạng literal form (chẳng hạn như `var a = {..}`) và dạng constructed form (chẳng hạn như `var a = new Array (..)`). Literal form gần như luôn được ưa thích, nhưng constructed form cung cấp, trong một số trường hợp, nhiều tùy chọn tạo hơn.

Nhiều người nhầm lẫn tuyên bố "mọi thứ trong JavaScript là một object", nhưng điều này không chính xác. Object là một trong 6 (hoặc 7, tùy thuộc vào quan điểm của bạn) kiểu nguyên thủy (primitive type). Các object có các kiểu con, bao gồm `function`, và cũng có thể chuyên biệt về hành vi, như `[object Array]` như là nhãn bên trong đại diện cho kiểu con của đối tượng mảng.

Object là tập hợp (collection) các cặp key/value (khóa/giá trị). Các giá trị có thể được truy cập dưới dạng thuộc tính, thông qua cú pháp `.propName` hoặc `["propName"]`. Bất cứ khi nào một thuộc tính được truy cập, công cụ thực sự gọi hoạt động mặc định bên trong `[[Get]]` (và `[[Put]]` để thiết lập các giá trị), không chỉ tìm kiếm thuộc tính trực tiếp trên đối tượng mà còn đi qua chuỗi `[[Prototype]]` (xem Chương 5) nếu không tìm thấy.

Các thuộc tính có một số đặc điểm nhất định có thể được kiểm soát thông qua các bộ property descriptor, chẳng hạn như `writable` và `configurable`. Ngoài ra, các object có thể được kiểm soát khả năng thay đổi (và thuộc tính của chúng) ở các mức độ bất biến khác nhau bằng cách sử dụng `Object.preventExtensions(..)`, `Object.seal(..)` và `Object.freeze(..)`.

Thuộc tính không nhất thiết phải chứa giá trị - chúng cũng có thể là "accessor property", với getters/setters. Chúng cũng có thể là *enumerable* hoặc không, điều này kiểm soát nếu chúng hiển thị trong các lần lặp vòng lặp `for..in`, chẳng hạn.

Bạn cũng có thể lặp lại (iterate) **các giá trị** trong cấu trúc dữ liệu (array, object, v.v.) bằng cách sử dụng cú pháp ES6 `for..of`, tìm kiếm object `@@iterator` tích hợp sẵn hoặc tùy chỉnh bao gồm phương thức `next()` để chuyển qua từng giá trị dữ liệu một.
