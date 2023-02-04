# You Don't Know JS: *this* & Object Prototypes
# Chapter 5: Prototypes

Trong những Chương 3 và 4 chúng ta đã đề cập đến chuỗi `[[Prototype]]` nhiều lần, tuy nhiên chưa từng nói nó chính xác là gì. Bây giờ chúng ta sẽ kiểm tra các prototype một cách chi tiết.

**Lưu Ý:** Tất cả các nỗ lực mô phỏng hành vi sao chép class, như được mô tả trước đó trong Chương 4, được gắn nhãn là các biến thể của "mixin", hoàn toàn phá vỡ cơ chế chuỗi `[[Prototype]]` mà chúng ta sẽ xem xét ở đây trong chương này.

## `[[Prototype]]`

Các Object trong JavaScript có một thuộc tính nội bộ, ký hiệu trong đặc tả kỹ thuật là `[[Prototype]]`, thứ mà chỉ đơn giản là một tham chiếu đến một object khác. Hầu như tất cả các object đều được cung cấp một giá trị khác `null` cho thuộc tính này, tại thời điểm chúng được tạo ra.

**Lưu Ý:** Chúng ta sẽ sớm thấy rằng *là* khả thi cho một object có liên kết `[[Prototype]]` rỗng, mặc dù điều này hơi ít phổ biến hơn.

Xem xét:

```js
var myObject = {
	a: 2
};

myObject.a; // 2
```

Tham chiếu `[[Prototype]]` được dùng để làm gì? Trong Chương 3, chúng ta đã kiểm tra phương thức `[[Get]]` thứ được gọi khi bạn tham chiếu một thuộc tính trên một object, tựa như `myObject.a`. Đối với phương thức `[[Get]]` mặc định đó, bước đầu tiên là kiểm tra xem bản thân object có thuộc tính `a` trên đó hay không và nếu có thì thuộc tính đó được sử dụng.

**Lưu Ý:** ES6 Proxies nằm ngoài phạm vi thảo luận của chúng ta trong cuốn sách này (sẽ được đề cập trong cuốn sách sau của bộ sách này!), nhưng mọi thứ chúng ta thảo luận ở đây về hành vi `[[Get]]` và `[[Put]]` bình thường thì không áp dụng nếu có liên quan đến `Proxy`.

Nhưng đó là điều sẽ xảy ra nếu `a` **không có** trên `myObject` khiến chúng ta chú ý đến liên kết `[[Prototype]]` của object.

Phương thức `[[Get]]` mặc định sẽ tiếp tục theo **liên kết** `[[Prototype]]` của object nếu nó không thể tìm thấy thuộc tính được yêu cầu trên object một cách trực tiếp.

```js
var anotherObject = {
	a: 2
};

// create an object linked to `anotherObject`
var myObject = Object.create( anotherObject );

myObject.a; // 2
```

**Ghi Chú:** Chúng ta sẽ giải thích `Object.create(..)` làm gì, và nó hoạt động như thế nào, ngắn gọn. Hiện tại, chỉ cần giả sử rằng nó tạo ra một object có liên kết `[[Prototype]]` mà chúng ta đang kiểm tra object được chỉ định.

Do đó, chúng ta có `myObject` object mà đã có liên kết `[[Prototype]]` tới `anotherObject`. Rõ ràng `myObject.a` không thực sự tồn tại, nhưng tuy nhiên, truy cập thuộc tính thành công (thay vào đó được tìm thấy trên `anotherObject`) và thực sự tìm thấy giá trị `2`.

Tuy nhiên, nếu `a` không được tìm thấy trên `anotherObject`, chuỗi `[[Prototype]]` của nó, nếu không rỗng, sẽ lại được xem xét tiếp theo.

Quá trình này tiếp tục cho đến khi tìm thấy tên thuộc tính phù hợp, hoặc chuỗi `[[Prototype]]` kết thúc. Nếu không tìm thấy thuộc tính phù hợp nào ở cuối chuỗi, thì kết quả trả về từ thao tác `[[Get]]` là `undefined`.

Tương tự với quá trình tra cứu chuỗi `[[Prototype]]` này, nếu bạn sử dụng một vòng lặp `for..in` để duyệt qua một object, bất kỳ thuộc tính nào có thể được truy cập thông qua chuỗi của nó (và cũng là `enumerable` -- xem Chương 3) sẽ được liệt kê. Nếu bạn sử dụng toán tử `in` để kiểm tra sự tồn tại của một thuộc tính trên một object, `in` sẽ kiểm tra toàn bộ chuỗi của object (bất kể property descriptor `enumerable` có giá trị là `true` hay `false`).

```js
var anotherObject = {
	a: 2
};

// create an object linked to `anotherObject`
var myObject = Object.create( anotherObject );

for (var k in myObject) {
	console.log("found: " + k);
}
// found: a

("a" in myObject); // true
```

Vì vậy, chuỗi `[[Prototype]]` được tham khảo, mỗi lần một liên kết, khi bạn thực hiện tra cứu thuộc tính theo nhiều cách khác nhau. Quá trình tra cứu dừng lại khi tìm thấy thuộc tính hoặc chuỗi kết thúc.

### `Object.prototype`

Nhưng chính xác chuỗi `[[Prototype]]` "kết thúc" *ở đâu*?

Phần trên cùng của mỗi chuỗi *normal* `[[Prototype]]` là build-in `Object.prototype`. Object này bao gồm nhiều utinity phổ biến được sử dụng trên toàn bộ JS, bởi vì tất cả các object thông thường (build-in, not host-specific extension) trong JavaScript đều "xuất phát từ" (hay còn gọi là, có ở đầu chuỗi `[[Prototype]]` của họ) `Object.prototype` object.

Một số utinity được tìm thấy ở đây mà bạn có thể quen thuộc bao gồm `.toString()` và `.valueOf()`. Trong Chương 3, chúng ta đã giới thiệu: `.hasOwnProperty(..)`. Và còn một function khác trên `Object.prototype` mà bạn có thể không quen thuộc, nhưng chúng ta sẽ đề cập đến function này sau trong chương này, đó là `.isPrototypeOf(..)`.

### Setting & Shadowing Properties

Trở lại Chương 3, chúng ta đã đề cập rằng việc thiết lập các thuộc tính trên một object mang nhiều sắc thái hơn là chỉ thêm một thuộc tính mới vào object hoặc thay đổi giá trị của một thuộc tính hiện có. Bây giờ chúng ta sẽ xem xét lại tình huống này một cách đầy đủ hơn.

```js
myObject.foo = "bar";
```

Nếu object `myObject` đã có một thuộc tính trình truy cập dữ liệu bình thường được gọi là `foo` hiện diện trực tiếp trên object đó, thì việc gán cũng đơn giản như thay đổi giá trị của thuộc tính hiện có.

Nếu `foo` chưa có mặt trực tiếp trên `myObject`, chuỗi `[[Prototype]]` được duyệt qua, giống như thao tác `[[Get]]`. Nếu `foo` không được tìm thấy ở bất kì đâu trong chuỗi, property `foo` được thêm trực tiếp vào `myObject` với giá trị đã chỉ định, như mong đợi.

Tuy nhiên, nếu `foo` đã có mặt ở đâu đó cao hơn trong chuỗi, hành vi sắc thái (và có lẽ đáng ngạc nhiên) có thể xảy ra với phép gán `myObject.foo = "bar"`. Chúng ta sẽ kiểm tra điều đó nhiều hơn chỉ trong giây lát.

Nếu tên thuộc tính `foo` kết thúc trên chính `myObject` và ở cấp độ cao hơn của chuỗi `[[Prototype]]` bắt đầu từ `myObject`, điều này được gọi là *shadowing*. Thuộc tính `foo` trực tiếp trên `myObject` *shadows* bất kỳ thuộc tính `foo` nào xuất hiện cao hơn trong chuỗi, bởi vì tra cứu `myObject.foo` sẽ luôn tìm thấy thuộc tính `foo` thấp nhất trong chuỗi.

Như chúng ta vừa gợi ý, shadowing `foo` trên `myObject` không đơn giản như vẻ ngoài của nó. Bây giờ chúng ta sẽ kiểm tra ba tình huống cho phép gán `myObject.foo = "bar"` khi `foo` **không** trực tiếp có trên `myObject`, nhưng **ở** cấp độ cao hơn của  chuỗi `[[Prototype]]` của object `myObject`:

1. Nếu một thuộc tính của trình truy cập dữ liệu thông thường (xem Chương 3) có tên `foo` được tìm thấy ở vị trí cao hơn trên chuỗi `[[Prototype]]`, **và thuộc tính đó không được đánh dấu là readonly (`writable: false`)** thì một thuộc tính mới có tên `foo` được thêm trực tiếp vào `myObject`, dẫn đến thuộc tính **shadowed**.
2. Nếu một `foo` được tìm thấy cao hơn trên chuỗi `[[Prototype]]`, nhưng nó được đánh dấu là **readonly (`writable: false`)**, thì cả cài đặt của thuộc tính hiện có đó cũng như việc tạo thuộc tính shadowed trên `myObject` **không được phép**. Nếu code đang chạy ở `strict mode`, sẽ xảy ra lỗi. Nếu không, cài đặt của giá trị thuộc tính sẽ âm thầm bị bỏ qua. Dù bằng cách nào, **không xảy ra hiện tượng shadowing**.
3. Nếu một `foo` được tìm thấy cao hơn trên chuỗi `[[Prototype]]` và đó là một setter (xem Chương 3), thì setter sẽ luôn được gọi. Sẽ không có `foo` nào được thêm vào (hay còn gọi là shadowed trên) `myObject`, cũng như setter `foo` sẽ không được xác định lại.

Hầu hết các nhà phát triển cho rằng việc gán một thuộc tính (`[[Put]]`) sẽ luôn dẫn đến shadowing nếu thuộc tính đó đã tồn tại ở vị trí cao hơn trong chuỗi `[[Prototype]]`, nhưng như bạn có thể thấy, điều đó chỉ đúng trong một (#1) trong ba tình huống vừa được mô tả.

Nếu bạn muốn tạo bóng `foo` trong trường hợp #2 và #3, bạn không thể sử dụng phép gán `=` mà phải sử dụng `Object.defineProperty(..)` (xem Chương 3) để thêm `foo` vào `myObject`.

**Lưu Ý:** Trường hợp #2 có thể là trường hợp đáng ngạc nhiên nhất trong ba trường hợp. Sự hiện diện của thuộc tính *read-only* ngăn không cho thuộc tính cùng tên được tạo hoàn toàn (shadowed) ở cấp độ thấp hơn của chuỗi `[[Prototype]]`. Lý do cho hạn chế này chủ yếu là để củng cố ảo tưởng về các thuộc tính kế thừa của class. Nếu bạn nghĩ `foo` ở cấp độ cao hơn của chuỗi như đã được kế thừa (sao chép) sang `myObject`, thì bạn nên thực thi bản chất không thể ghi của thuộc tính `foo` đó trên `myObject`. Tuy nhiên, nếu bạn tách ảo tưởng ra khỏi thực tế và nhận ra rằng không có sự sao chép kế thừa nào như vậy *thực sự* xảy ra (xem Chương 4 và 5), sẽ hơi bất thường khi `myObject` sẽ bị ngăn không có thuộc tính `foo` chỉ vì một số đối tượng khác có `foo` không thể ghi trên đó. Lạ lùng hơn nữa là hạn chế này chỉ áp dụng cho phép gán `=`, nhưng không được thực thi khi sử dụng `Object.defineProperty(..)`.

Shadowing với **phương thức** dẫn đến *explicit pseudo-polimorphism* xấu xí (xem Chương 4) nếu bạn cần ủy quyền giữa chúng. Thông thường, tạo bóng phức tạp và có nhiều sắc thái hơn so với giá trị của nó, **vì vậy bạn nên cố gắng tránh nó nếu có thể**. Xem Chương 6 để biết một design pattern thay thế, trong số những thứ khác, không khuyến khích shadowing để có lợi cho các lựa chọn thay thế rõ ràng hơn.

Shadowing thậm chí có thể xảy ra ngầm theo những cách tinh vi, vì vậy cần phải cẩn thận nếu cố gắng tránh nó. Xem xét:

```js
var anotherObject = {
	a: 2
};

var myObject = Object.create( anotherObject );

anotherObject.a; // 2
myObject.a; // 2

anotherObject.hasOwnProperty( "a" ); // true
myObject.hasOwnProperty( "a" ); // false

myObject.a++; // oops, implicit shadowing!

anotherObject.a; // 2
myObject.a; // 3

myObject.hasOwnProperty( "a" ); // true
```

Mặc dù có vẻ như `myObject.a++` nên tra cứu (thông qua ủy quyền) và chỉ cần tăng chính thuộc tính `anotherObject.a` *tại chỗ*, thay vào đó thao tác `++` tương ứng với `myObject.a = myObject.a + 1`. Kết quả là `[[Get]]` tra cứu thuộc tính `a` qua `[[Prototype]]` để lấy giá trị hiện tại `2` từ `anotherObject.a`, tăng giá trị lên một, sau đó `[[Put]]` gán giá trị `3` cho thuộc tính shadowed mới `a` trên `myObject`. Ối!

Hãy thật cẩn thận khi xử lý các thuộc tính được ủy quyền mà bạn sửa đổi. Nếu bạn muốn tăng `anotherObject.a`, cách thích hợp duy nhất là `anotherObject.a++`.

## "Class"

Tại thời điểm này, bạn có thể tự hỏi: "*Tại sao* một object cần liên kết với một object khác?" Lợi ích thực sự là gì? Đó là một câu hỏi rất thích hợp để đặt ra, nhưng trước tiên chúng ta phải hiểu `[[Prototype]]` **không phải là gì** trước khi chúng ta có thể hiểu và đánh giá đầy đủ nó *là gì* và nó hữu ích như thế nào.

Như chúng tôi đã giải thích trong Chương 4, trong JavaScript, không có abstract patterns/blueprint nào cho các object được gọi là "class" như trong các ngôn ngữ class-oriented. JavaScript **chỉ** có các object.

Trên thực tế, JavaScript **gần như là duy nhất** trong số các ngôn ngữ vì có lẽ là ngôn ngữ duy nhất có quyền sử dụng nhãn "hướng đối tượng", bởi vì đây là một trong danh sách rất ngắn các ngôn ngữ mà một object có thể được tạo trực tiếp mà không cần cả class.

Trong JavaScript, các class không thể (vì chúng không tồn tại!) mô tả những gì một object có thể làm. Object xác định hành vi của chính nó trực tiếp. ***chỉ* có object.**

### "Class" Functions

Có một loại hành vi đặc biệt trong JavaScript đã bị lạm dụng một cách đáng xấu hổ trong nhiều năm để *hack* thứ gì đó *trông* giống như "class". Chúng ta sẽ xem xét phương pháp này một cách chi tiết.

Hành vi "sort-of class" đặc biệt xoay quanh một đặc điểm kỳ lạ của các function: theo mặc định, tất cả các function đều có thuộc tính công khai, non-enumerable (xem Chương 3) trên chúng được gọi là `prototype`, thuộc tính này trỏ đến một object tùy ý khác.

```js
function Foo() {
	// ...
}

Foo.prototype; // { }
```

Object này thường được gọi là "prototype của Foo", bởi vì chúng ta truy cập nó thông qua tham chiếu thuộc tính `Foo.prototype` có tên rất tiếc. Tuy nhiên, thuật ngữ đó được định sẵn một cách vô vọng là dẫn chúng ta đến sự nhầm lẫn, như chúng ta sẽ thấy ngay sau đây. Thay vào đó, tôi sẽ gọi nó là "object trước đây được gọi là prototype của Foo". Chỉ đùa thôi. Làm thế nào về: "object được gắn nhãn tùy ý 'Foo chấm prototype'"?

Dù chúng ta gọi nó là gì, object này chính xác là gì?

Cách giải thích trực tiếp nhất là mỗi object được tạo từ việc gọi `new Foo()` (xem Chương 2) sẽ kết thúc (hơi tùy ý) `[[Prototype]]`-được liên kết với object "Foo chấm prototype" này.

Hãy minh họa:

```js
function Foo() {
	// ...
}

var a = new Foo();

Object.getPrototypeOf( a ) === Foo.prototype; // true
```

Khi `a` được tạo bằng cách gọi `new Foo()`, một trong những điều (xem Chương 2 để biết tất cả *bốn* bước) xảy ra là `a` nhận được liên kết `[[Prototype]]` nội bộ tới object mà `Foo.prototype` đang trỏ tới.

Hãy dừng lại một chút và suy ngẫm về hàm ý của câu nói đó.

Trong các ngôn ngữ class-oriented, có thể tạo nhiều **bản sao** (hay còn gọi là "instances") của một class, giống như dập một thứ gì đó ra khỏi khuôn. Như chúng ta đã thấy trong Chương 4, điều này xảy ra do quá trình khởi tạo (hoặc kế thừa từ) một class có nghĩa là "sao chép kế hoạch hành vi từ class đó vào một object vật lý" và quá trình này được thực hiện lại cho mỗi instance mới.

Nhưng trong JavaScript, không có hành động sao chép nào được thực hiện. Bạn không tạo nhiều instance của một class. Bạn có thể tạo nhiều object `[[Prototype]]` *liên kết* với một object chung. Nhưng theo mặc định, không có sự sao chép nào xảy ra và do đó, các object này không hoàn toàn tách biệt và không kết nối với nhau, mà thay vào đó, khá ***liên kết***.

`new Foo()` dẫn đến một object mới (chúng ta gọi nó là `a`) và object mới **đó** `a` được `[[Prototype]]` liên kết nội bộ với object `Foo.prototype`.

**Chúng ta kết thúc với hai object, được liên kết với nhau.** Đó là *nó*. Chúng ta đã không khởi tạo một class. Chúng ta chắc chắn đã không thực hiện bất kỳ hành vi sao chép nào từ một "class" vào một object cụ thể. Chúng ta chỉ làm cho hai object được liên kết với nhau.

Trên thực tế, bí mật khiến hầu hết các nhà phát triển JS lảng tránh, đó là việc gọi hàm `new Foo()` thực sự hầu như không có gì *trực tiếp* liên quan đến quá trình tạo liên kết. **Đó là một side-effect tình cờ.** `new Foo()` là một cách gián tiếp, vòng vo để đạt được điều chúng ta muốn: **một object mới được liên kết với một object khác**.

Chúng ta có thể đạt được điều mình muốn theo cách *trực tiếp* hơn không? **Có!** Anh hùng là `Object.create(..)`. Nhưng chúng ta sẽ đề cập đến nó sau.

#### What's in a name?

Trong JavaScript, chúng ta không tạo *bản sao* từ object này ("class") sang object khác ("instance"). Chúng ta tạo *liên kết* giữa các object. Đối với cơ chế `[[Prototype]]`, về mặt trực quan, các mũi tên di chuyển từ phải sang trái và từ dưới lên trên.

<img src="fig3.png">

Cơ chế này thường được gọi là "prototype inheritance" (chúng ta sẽ khám phá chi tiết về code ngay sau đây), thường được cho là phiên bản ngôn ngữ động của "classical inheritance (kế thừa cổ điển)". Đó là một nỗ lực để dựa trên sự hiểu biết chung về ý nghĩa của "kế thừa" trong thế giới class-oriented, nhưng *chỉnh sửa* (**đọc: mở rộng**) ngữ nghĩa đã hiểu, để phù hợp với kịch bản động.

Từ "inheritance (thừa kế)" có một ý nghĩa rất mạnh mẽ (xem Chương 4), với rất nhiều tiền lệ về mặt tinh thần. Việc chỉ thêm "prototypal (nguyên mẫu)" vào phía trước để phân biệt hành vi *thực sự gần như ngược lại* trong JavaScript đã để lại hậu quả là gần hai thập kỷ hỗn loạn.

Tôi muốn nói rằng việc đặt "prototypal" trước "inheritance" để đảo ngược hoàn toàn ý nghĩa thực tế của nó giống như một tay cầm quả cam, tay kia cầm quả táo và khăng khăng gọi quả táo là "quả cam đỏ". Bất kể tôi dán nhãn khó hiểu nào trước nó, điều đó không thay đổi *sự thật* rằng một loại quả là táo và quả kia là cam.

Cách tiếp cận tốt hơn là gọi một cách rõ ràng một quả táo là một quả táo -- sử dụng thuật ngữ trực tiếp và chính xác nhất. Điều đó giúp dễ dàng hiểu được cả điểm tương đồng và **nhiều điểm khác biệt** của chúng, bởi vì tất cả chúng ta đều có cách hiểu đơn giản, được chia sẻ chung về ý nghĩa của "quả táo".

Do sự nhầm lẫn và kết hợp các thuật ngữ, tôi tin rằng chính nhãn "prototypal inheritance" (và cố gắng áp dụng sai tất cả các thuật ngữ class-orientation liên quan của nó, như "class", "constructor", "instance", "polymorphism", v.v.) đã **có hại nhiều hơn có lợi** trong việc giải thích cơ chế *thực sự* của JavaScript hoạt động như thế nào.

"Inheritance" ngụ ý thao tác *sao chép* và JavaScript không sao chép các thuộc tính object (theo mặc định, nguyên bản). Thay vào đó, JS tạo một liên kết giữa hai object, trong đó một object về cơ bản có thể *delegate (ủy nhiệm)* quyền truy cập thuộc tính/function cho một object khác. "Delegate (Ủy quyền)" (xem Chương 6) là một thuật ngữ chính xác hơn nhiều cho cơ chế liên kết object của JavaScript.

Một thuật ngữ khác đôi khi được sử dụng trong JavaScript là "differential inheritance". Ý tưởng ở đây là chúng ta mô tả hành vi của một object theo những gì *khác* với một bộ mô tả tổng quát hơn. Ví dụ: bạn giải thích rằng ô tô là một loại phương tiện, nhưng là phương tiện có chính xác 4 bánh, thay vì mô tả lại tất cả các chi tiết cụ thể về những gì tạo nên một phương tiện nói chung (động cơ, v.v.).

Nếu bạn cố gắng coi bất kỳ object cụ thể nào trong JS là tổng của tất cả các hành vi *có sẵn* thông qua delegation (ủy quyền) và **trong tâm trí của bạn, bạn làm phẳng** tất cả các hành vi đó thành một *thứ* hữu hình, thì bạn có thể (sắp xếp) xem "differential inheritance" có thể phù hợp như thế nào.

Nhưng cũng giống như "prototypal inheritance", "differential inheritance" giả định rằng mô hình tinh thần của bạn quan trọng hơn những gì đang diễn ra trong ngôn ngữ. Nó bỏ qua thực tế là object `B` không thực sự được xây dựng theo cách khác, mà thay vào đó được xây dựng với các đặc điểm cụ thể được xác định, bên cạnh các "lỗ hổng" không có gì được xác định. Chính trong những "lỗ hổng" này (khoảng trống hoặc thiếu định nghĩa) mà deligation *có thể* đảm nhận và nhanh chóng "lấp đầy chúng" bằng hành vi được deligated.

Theo mặc định, object không được làm phẳng thành một object khác biệt duy nhất, **thông qua sao chép**, mà mô hình tinh thần của "differential inheritance" ngụ ý. Do đó, "differential inheritance" không phải là từ thích hợp để mô tả cơ chế `[[Prototype]]` của JavaScript thực sự hoạt động như thế nào.

Bạn *có thể chọn* thích thuật ngữ "differential inheritance" và mô hình tinh thần hơn, như một vấn đề sở thích, nhưng không thể phủ nhận thực tế rằng nó *chỉ* phù hợp với các pha nhào lộn tinh thần trong tâm trí bạn, chứ không phải hành vi vật lý trong engine.

### "Constructors"

Hãy quay lại một số đoạn code trước đó:

```js
function Foo() {
	// ...
}

var a = new Foo();
```

Chính xác thì điều gì khiến chúng ta nghĩ `Foo` là một "class"?

Đầu tiên, chúng ta thấy việc sử dụng từ khóa `new`, giống như các ngôn ngữ class-oriented thực hiện khi chúng xây dựng các instance của class. Mặt khác, có vẻ như chúng ta đang thực thi một phương thức *constructor* của một class, bởi vì `Foo()` thực sự là một phương thức được gọi, giống như cách constructor(hàm tạo) của một class thực được gọi khi bạn khởi tạo class đó.

Để tăng thêm sự nhầm lẫn về ngữ nghĩa của "constructor", object `Foo.prototype` được gắn nhãn tùy ý có một thủ thuật khác trong tay áo của nó. Hãy xem xét code này:

```js
function Foo() {
	// ...
}

Foo.prototype.constructor === Foo; // true

var a = new Foo();
a.constructor === Foo; // true
```

Theo mặc định, object `Foo.prototype` (tại thời điểm khai báo trên dòng 1 của đoạn code!) có một thuộc tính công khai, non-enumerable (xem Chương 3) có tên là `.constructor` và thuộc tính này là một tham chiếu trở lại Function (`Foo` trong trường hợp này) mà object được liên kết với. Hơn nữa, chúng ta thấy rằng object `a` được tạo bởi lệnh gọi "constructor" `new Foo()` *dường như* cũng có một thuộc tính trên đó gọi là `.constructor` tương tự trỏ đến "function đã tạo ra nó".
**Lưu ý:** Điều này không thực sự đúng. `a` không có thuộc tính `.constructor` trên đó và mặc dù `a.constructor` trên thực tế phân giải thành hàm `Foo`, nhưng "constructor" **không thực sự có nghĩa là** "được xây dựng bởi", vì nó xuất hiện. Chúng tôi sẽ giải thích sự kỳ lạ này ngay sau đây.
Ồ, vâng, còn nữa... theo quy ước trong thế giới JavaScript, các "class" được đặt tên bằng chữ in hoa, vì vậy thực tế là `Foo` thay vì `foo` là một manh mối rõ ràng mà chúng tôi dự định nó là một "class". Điều đó hoàn toàn rõ ràng với bạn, phải không!?
**Lưu ý:** Quy ước này mạnh đến nỗi nhiều JS linters thực sự *phàn nàn* nếu bạn gọi `new` trên một phương thức có tên viết thường hoặc nếu chúng ta không gọi `new` trên một function bắt đầu bằng một chữ in hoa. Điều đó khiến chúng tôi phải vật lộn rất nhiều để có được "class-orientation" *đúng* (giả mạo) trong JavaScript đến mức chúng tôi tạo ra các quy tắc linter để đảm bảo chúng tôi sử dụng chữ in hoa, mặc dù chữ in hoa không có nghĩa là ***bất cứ điều gì* ở tất cả** với JS engine.
#### Constructor Or Call?

Trong đoạn mã trên, thật hấp dẫn khi nghĩ rằng `Foo` là một "constructor", bởi vì chúng ta gọi nó bằng `new` và chúng ta quan sát thấy rằng nó "dựng" một object.

Trên thực tế, `Foo` không phải là một "constructor" hơn bất kỳ function nào khác trong chương trình của bạn. Bản thân các function **không** phải là constructor(hàm tạo). Tuy nhiên, khi bạn đặt từ khóa `new` trước một lệnh gọi function bình thường, điều đó làm cho function đó gọi một "lệnh gọi constructor". Trên thực tế, kiểu `new` chiếm quyền điều khiển bất kỳ function bình thường nào và gọi nó theo kiểu xây dựng một object, **ngoài bất kỳ chức năng nào khác mà nó sẽ thực hiện**.

Ví dụ:

```js
function NothingSpecial() {
	console.log( "Don't mind me!" );
}

var a = new NothingSpecial();
// "Don't mind me!"

a; // {}
```

`NothingSpecial` chỉ là một function bình thường đơn giản, tuy nhiên khi được gọi với `new`, nó *xây dựng* một object, gần như là một side-effect, mà chúng ta tình cờ gán cho `a`. Lệnh **gọi** là một *lệnh gọi constructor*, nhưng `NothingSpecial`, về bản chất không phải là một *constructor*.

Nói cách khác, trong JavaScript, cách thích hợp nhất để nói rằng "constructor" là **bất kỳ function nào được gọi với từ khóa `new`** phía trước nó.

Các function không phải là constructor, nhưng các lệnh gọi function là "các lệnh gọi constructor" khi và chỉ khi `new` được sử dụng.

### Mechanics

Có phải *những* đó là trình kích hoạt phổ biến duy nhất cho các cuộc thảo luận "class" xấu số trong JavaScript không?

**Không hoàn toàn.** Các nhà phát triển JS đã cố gắng mô phỏng nhiều nhất có thể về class-orientation:

```js
function Foo(name) {
	this.name = name;
}

Foo.prototype.myName = function() {
	return this.name;
};

var a = new Foo( "a" );
var b = new Foo( "b" );

a.myName(); // "a"
b.myName(); // "b"
```

Đoạn mã này hiển thị hai thủ thuật "class-orientation" bổ sung đang chơi:

1. `this.name = name`: thêm thuộc tính `.name` vào mỗi object (tương ứng `a` và `b`; xem Chapter 2 về  `this` binding), tương tự như cách các thể hiện của class đóng gói các giá trị dữ liệu.

2. `Foo.prototype.myName = ...`: có lẽ là kĩ thuật thú vị hơn, kĩ thuật này thêm thuộc tính (function) vào object `Foo.prototype`. Bây giờ, `a.myName()` hoạt động, nhưng có lẽ đáng ngạc nhiên. Thế nào?

Trong đoạn mã trên, thật thú vị khi nghĩ rằng `a` và `b` được tạo, các properties/functions trên object `Foo.prototype` được *sao chép* qua từng object `a` và `b`. **Tuy nhiên, điều đó không xảy ra.**

Ở đầu chương này, chúng ta đã giải thích về liên kết `[[Prototype]]`, và cách nó cung cấp các bước tra cứu dự phòng nếu không tìm thấy tham chiếu thuộc tính trực tiếp trên một object, như là một phần của thuật toán `[[Get]]` mặc định.

Vì vậy, tùy thuộc vào cách chúng được tạo ra, `a` và `b` đều kết thúc bằng một liên kết `[[Prototype]]` bên trong với `Foo.prototype`. Khi `myName` không tìm thấy trên `a` hoặc `b`, tương ứng, nó sẽ được tìm thấy (thông qua deligation(uỷ quyền), xem Chapter 6) trên `Foo.prototype`.

#### "Constructor" Redux

Nhớ lại cuộc thảo luận trước đó về thuộc tính `.constructor`, và cách nó *có vẻ* giống như `a.constructor === Foo` có nghĩa là `a` có một thuộc tính `.constructor` thực sự trên nó, chỉ vào `Foo`? **Không chính xác.**

Đây chỉ là sự nhầm lẫn đáng tiếc. Trên thực tế, tham chiếu `.constructor` cũng được *ủy quyền* cho tới `Foo.prototype`, mà **xảy ra với**, theo mặc định, có `.constructor` trỏ tới `Foo`.

*Có vẻ* vô cùng tiện lợi khi một object `a` "được xây dựng bởi" `Foo` sẽ có quyền truy cập vào thuộc tính `.constructor` trỏ đến `Foo`. Nhưng đó chẳng qua chỉ là một cảm giác an toàn giả tạo. Thật là một sự tình cờ thú vị, gần như là ngẫu nhiên, khi `a.constructor` *xảy ra* trỏ vào `Foo` thông qua ủy quyền `[[Prototype]]` mặc định này. Trên thực tế, có một số cách mà giả định tồi tệ về `.constructor` có nghĩa là "được xây dựng bởi" có thể quay lại cắn bạn.

Đầu tiên, thuộc tính `.constructor` trên `Foo.prototype` chỉ có ở đó theo mặc định trên object được tạo khi hàm `Foo` được khai báo. Nếu bạn tạo một object mới và thay thế tham chiếu đối tượng `.prototype` mặc định của hàm, đối tượng mới theo mặc định sẽ không có một `.constructor` trên đó một cách kỳ diệu.

Xem xét:

```js
function Foo() { /* .. */ }

Foo.prototype = { /* .. */ }; // create a new prototype object

var a1 = new Foo();
a1.constructor === Foo; // false!
a1.constructor === Object; // true!
```

`Object(..)` không "xây dựng" `a1` phải không? Có vẻ như `Foo()` đã "xây dựng" nó. Nhiều nhà phát triển nghĩ `Foo()` giống như việc xây dựng, nhưng mọi thứ trở nên tồi tệ khi bạn nghĩ "constructor" có nghĩa là "được xây dựng bởi", bởi vì theo lý luận đó, `a1.constructor` phải là `Foo`, nhưng không phải vậy!

Điều gì đang xảy ra? `a1` không có thuộc tính `.constructor`, do đó, nó ủy quyền chuỗi `[[Prototype]]` cho `Foo.prototype`. Nhưng đối tượng đó cũng không có `.constructor` (giống như đối tượng `Foo.prototype` mặc định sẽ có!), vì vậy nó tiếp tục ủy quyền, lần này lên tới `Object.prototype`, đầu chuỗi ủy quyền . Đối tượng *Đó* thực sự có một `.constructor` trên đó, trỏ đến hàm `Object(..)` được tích hợp sẵn.

**Misconception, busted.**

Tất nhiên, bạn có thể thêm `.constructor` trở lại đối tượng `Foo.prototype`, nhưng việc này cần thực hiện thủ công, đặc biệt nếu bạn muốn khớp native behavier và non-enumerable (xem Chương 3).

Cho ví dụ:

```js
function Foo() { /* .. */ }

Foo.prototype = { /* .. */ }; // create a new prototype object

// Need to properly "fix" the missing `.constructor`
// property on the new object serving as `Foo.prototype`.
// See Chapter 3 for `defineProperty(..)`.
Object.defineProperty( Foo.prototype, "constructor" , {
	enumerable: false,
	writable: true,
	configurable: true,
	value: Foo    // point `.constructor` at `Foo`
} );
```

Đó là rất nhiều công việc thủ công để sửa `.constructor`. Hơn nữa, tất cả những gì chúng ta đang thực sự làm là duy trì quan niệm sai lầm rằng "constructor" có nghĩa là "được xây dựng bởi". Đó là một ảo ảnh *tốn kém*.

Thực tế là, `.constructor` trên một object, theo mặc định, tùy ý chỉ vào một hàm có tham chiếu ngược trở lại object -- một tham chiếu mà nó gọi là `.prototype`. Các từ "constructor" và "prototype" chỉ có một ý nghĩa mặc định lỏng lẻo có thể đúng hoặc không đúng sau này. Điều tốt nhất cần làm là nhắc nhở bản thân, "constructor không có nghĩa là được xây dựng bởi".

`.constructor` không phải là thuộc tính magic immutable (bất biến ma thuật). Nó *là* non-enumerable (xem đoạn trích ở trên), nhưng giá trị của nó có thể ghi được (có thể thay đổi), và hơn nữa, bạn có thể thêm hoặc ghi đè (cố ý hoặc vô tình) một thuộc tính có tên `constructor` trên bất kỳ object nào trong bất kỳ chuỗi `[[Prototype]]`, với bất kỳ giá trị nào bạn thấy phù hợp.

Nhờ cách thuật toán `[[Get]]` đi qua chuỗi `[[Prototype]]`, một tham chiếu thuộc tính `.constructor` được tìm thấy ở bất kỳ đâu có thể giải quyết hoàn toàn khác so với bạn mong đợi.

Xem ý nghĩa của nó thực sự tùy ý như thế nào?

Kết quả? Một số tham chiếu object-property tùy ý như `a1.constructor` thực sự không thể được *tin cậy* làm tham chiếu hàm mặc định được giả định. Hơn nữa, như chúng ta sẽ thấy ngay sau đây, chỉ bằng một thiếu sót đơn giản, `a1.constructor` thậm chí có thể dẫn đến một điểm nào đó khá bất ngờ và khó hiểu.

`.constructor` cực kỳ không đáng tin cậy và là một tham chiếu không an toàn để dựa vào trong code của bạn. **Nói chung, nên tránh những tham chiếu như vậy nếu có thể.**

## "(Prototypal) Inheritance"

Chúng tôi đã thấy một số cơ chế "class" thường bị tấn công vào các chương trình JavaScript. Nhưng các "class" JavaScript sẽ khá trống rỗng nếu chúng ta không có tính chất gần giống "tính kế thừa".

Trên thực tế, chúng ta đã thấy cơ chế thường được gọi là "prototypal inheritance" hoạt động khi `a` có thể "kế thừa từ" `Foo.prototype` và do đó có quyền truy cập vào hàm `myName()`. Nhưng theo truyền thống, chúng ta nghĩ về "thừa kế" là mối quan hệ giữa hai "class", chứ không phải giữa "class" và "instance".

<img src="fig3.png">

Nhớ lại hình này từ trước đó, không chỉ hiển thị ủy quyền từ một object (hay còn gọi là "instance") `a1` sang object `Foo.prototype`, mà còn từ `Bar.prototype` sang `Foo.prototype`, phần nào giống với khái niệm kế thừa lớp Cha-Con. *Giống nhau*, tất nhiên là ngoại trừ hướng của các mũi tên, cho thấy đây là các liên kết ủy quyền chứ không phải thao tác sao chép.

Và, đây là mã "protype style" điển hình tạo ra các liên kết như vậy:

```js
function Foo(name) {
	this.name = name;
}

Foo.prototype.myName = function() {
	return this.name;
};

function Bar(name,label) {
	Foo.call( this, name );
	this.label = label;
}

// here, we make a new `Bar.prototype`
// linked to `Foo.prototype`
Bar.prototype = Object.create( Foo.prototype );

// Beware! Now `Bar.prototype.constructor` is gone,
// and might need to be manually "fixed" if you're
// in the habit of relying on such properties!

Bar.prototype.myLabel = function() {
	return this.label;
};

var a = new Bar( "a", "obj a" );

a.myName(); // "a"
a.myLabel(); // "obj a"
```

**Lưu ý:** Để hiểu tại sao `this` trỏ tới `a` trong đoạn mã trên, hãy xem Chương 2.

Phần quan trọng là `Bar.prototype = Object.create( Foo.prototype )`. `Object.create(..)` *tạo* một đối tượng "mới" ngoài luồng và liên kết `[[Prototype]` bên trong của đối tượng mới đó với đối tượng bạn chỉ định (`Foo.prototype` trong trường hợp này).

Nói cách khác, dòng đó có nội dung: "tạo đối tượng *mới* 'Bar dot prototype' được liên kết với 'Foo dot prototype'."

Khi `function Bar() { .. }` được khai báo, `Bar`, giống như bất kỳ hàm nào khác, có liên kết `.prototype` tới đối tượng mặc định của nó. Nhưng đối tượng *đó* không được liên kết với `Foo.prototype` như chúng ta muốn. Vì vậy, chúng ta tạo một đối tượng *mới* mà *được* liên kết như chúng ta muốn, loại bỏ đối tượng được liên kết không chính xác ban đầu một cách hiệu quả.

**Lưu ý:** Một sự nhầm lẫn/quan niệm sai phổ biến ở đây là một trong hai cách tiếp cận sau đây sẽ *cũng* hoạt động, nhưng chúng không hoạt động như bạn mong đợi:

```js
// doesn't work like you want!
Bar.prototype = Foo.prototype;

// works kinda like you want, but with
// side-effects you probably don't want :(
Bar.prototype = new Foo();
```

`Bar.prototype = Foo.prototype` không tạo đối tượng mới để `Bar.prototype` được liên kết tới. Nó chỉ làm cho `Bar.prototype` trở thành một tham chiếu khác đến `Foo.prototype`, liên kết trực tiếp `Bar` với ** cùng một đối tượng như ** `Foo` liên kết tới: `Foo.prototype` một cách hiệu quả. Điều này có nghĩa là khi bạn bắt đầu gán, chẳng hạn như `Bar.prototype.myLabel = ...`, bạn đang sửa đổi **không phải một đối tượng riêng biệt** mà *chính đối tượng `Foo.prototype` được chia sẻ*, điều này sẽ ảnh hưởng đến bất kỳ đối tượng nào được liên kết với `Foo.prototype`. Đây gần như chắc chắn không phải là những gì bạn muốn. Nếu nó *là* thứ bạn muốn, thì bạn có thể không cần `Bar` và chỉ nên sử dụng `Foo` và làm cho mã của bạn đơn giản hơn.

`Bar.prototype = new Foo()` **thực tế** có tạo một đối tượng mới được liên kết hợp lệ với `Foo.prototype` như chúng ta muốn. Tuy nhiên, nó sử dụng lệnh gọi hàm tạo `Foo(..)` để làm điều đó. Nếu chức năng đó có bất kỳ tác dụng phụ nào (chẳng hạn như ghi nhật ký, thay đổi trạng thái, đăng ký đối với các đối tượng khác, **thêm thuộc tính dữ liệu vào `this`**, v.v.), thì những tác dụng phụ đó xảy ra tại thời điểm liên kết này (và có khả năng chống lại đối tượng sai!), thay vì chỉ khi "hậu duệ" `Bar()` cuối cùng được tạo ra, như có thể được mong đợi.

Vì vậy, chúng ta chỉ còn cách sử dụng `Object.create(..)` để tạo một đối tượng mới được liên kết đúng cách, nhưng không gặp side-effects của việc gọi `Foo(..)`. Nhược điểm nhỏ là chúng ta phải tạo một đối tượng mới, loại bỏ đối tượng cũ thay vì sửa đổi đối tượng mặc định hiện có mà chúng ta đã cung cấp.

Sẽ là *tốt* nếu có một cách tiêu chuẩn và đáng tin cậy để sửa đổi liên kết của một đối tượng hiện có. Trước ES6, có một cách không chuẩn và không hoàn toàn đa trình duyệt, thông qua thuộc tính `.__proto__`, có thể cài đặt được. ES6 bổ sung tiện ích trợ giúp `Object.setPrototypeOf(..)`, thực hiện thủ thuật theo cách tiêu chuẩn và có thể dự đoán được.

So sánh các kỹ thuật được chuẩn hóa pre-ES6 và ES6 để liên kết `Bar.prototype` với `Foo.prototype`, với nhau:

```js
// pre-ES6
// throws away default existing `Bar.prototype`
Bar.prototype = Object.create( Foo.prototype );

// ES6+
// modifies existing `Bar.prototype`
Object.setPrototypeOf( Bar.prototype, Foo.prototype );
```

Bỏ qua nhược điểm nhỏ về hiệu suất (vứt đi một đối tượng mà sau này được thu gom rác) của phương pháp `Object.create(..)`, phương pháp này ngắn hơn một chút và có lẽ dễ đọc hơn một chút so với phương pháp ES6+. Nhưng nó có lẽ là một cú pháp rửa theo cách nào đó.

### Inspecting "Class" Relationships

Điều gì sẽ xảy ra nếu bạn có một object như `a` và muốn tìm hiểu xem nó ủy quyền cho object nào (nếu có)? Kiểm tra một instance (chỉ là một object trong JS) để tìm tổ tiên thừa kế của nó (liên kết ủy quyền trong JS) thường được gọi là *introspection(nội quan)* (hoặc *reflection(phản ánh)*) trong các môi trường class-oriented truyền thống.

Xem xét:

```js
function Foo() {
	// ...
}

Foo.prototype.blah = ...;

var a = new Foo();
```

Sau đó, làm thế nào để chúng ta xem xét nội quan `a` để tìm ra "tổ tiên" của nó (liên kết ủy nhiệm)? Cách tiếp cận đầu tiên bao trùm sự nhầm lẫn "class":

```js
a instanceof Foo; // true
```

Toán tử `instanceof` lấy một object đơn giản làm toán hạng bên trái và **function** làm toán hạng bên phải. Câu trả lời cho câu hỏi `instanceof` là: **trong toàn bộ chuỗi `[[Prototype]]` của `a`, đối tượng được chỉ định tùy ý bởi `Foo.prototype` có bao giờ xuất hiện không?**

Thật không may, điều này có nghĩa là bạn chỉ có thể hỏi về "tổ tiên" của một số đối tượng (`a`) nếu bạn có một số **function** (`Foo`, với tham chiếu `.prototype` đính kèm) để kiểm tra. Nếu bạn có hai đối tượng tùy ý, chẳng hạn như `a` và `b`, và muốn tìm hiểu xem liệu *các đối tượng* có liên quan với nhau thông qua chuỗi `[[Prototype]]` hay không thì chỉ riêng `instanceof` cũng không giúp được gì .

**Lưu ý:** Nếu bạn sử dụng tiện ích `.bind(..)` tích hợp sẵn để tạo hàm liên kết cứng (xem Chương 2), hàm được tạo sẽ không có thuộc tính `.prototype`. Việc sử dụng `instanceof` với hàm như vậy sẽ thay thế rõ ràng `.prototype` của *target function* mà từ đó hàm liên kết cứng được tạo ra.

Khá hiếm khi sử dụng các hàm giới hạn cứng làm "lời gọi hàm tạo", nhưng nếu bạn làm như vậy, nó sẽ hoạt động như thể *hàm mục tiêu* ban đầu được gọi thay thế, điều đó có nghĩa là sử dụng `instanceof` với một hàm giới hạn cứng cũng hoạt động theo chức năng ban đầu.

Đoạn mã này minh họa sự lố bịch của việc cố gắng suy luận về mối quan hệ giữa **hai đối tượng** bằng cách sử dụng ngữ nghĩa "class" và `instanceof`:

```js
// helper utility to see if `o1` is
// related to (delegates to) `o2`
function isRelatedTo(o1, o2) {
	function F(){}
	F.prototype = o2;
	return o1 instanceof F;
}

var a = {};
var b = Object.create( a );

isRelatedTo( b, a ); // true
```

Bên trong `isRelatedTo(..)`, chúng tôi mượn một hàm loại bỏ `F`, gán lại `.prototype` của nó để trỏ tùy ý tới đối tượng `o2` nào đó, sau đó hỏi xem `o1` có phải là "instance của" `F không `. Rõ ràng là `o1` không *thực sự* kế thừa hoặc có nguồn gốc hoặc thậm chí được xây dựng từ `F`, vì vậy cần hiểu rõ tại sao loại bài tập này lại ngớ ngẩn và khó hiểu. **Vấn đề bắt nguồn từ sự lúng túng của ngữ nghĩa class bắt buộc đối với JavaScript**, trong trường hợp này được tiết lộ bởi ngữ nghĩa gián tiếp của `instanceof`.

Cách thứ hai, và rõ ràng hơn nhiều, đối với phản ánh `[[Prototype]]` là:

```js
Foo.prototype.isPrototypeOf( a ); // true
```

Lưu ý rằng trong trường hợp này, chúng ta không thực sự quan tâm (hoặc thậm chí *cần*) `Foo`, chúng ta chỉ cần một **object** (trong trường hợp của chúng ta, được gắn nhãn tùy ý `Foo.prototype`) để kiểm tra đối tượng khác **vật**. Câu trả lời cho câu hỏi `isPrototypeOf(..)` là: **trong toàn bộ chuỗi `[[Prototype]]` của `a`, `Foo.prototype` có bao giờ xuất hiện không?**

Cùng một câu hỏi, và chính xác cùng một câu trả lời. Nhưng trong cách tiếp cận thứ hai này, chúng ta thực sự không cần sự gián tiếp tham chiếu một **hàm** (`Foo`) có thuộc tính `.prototype` sẽ tự động được tham khảo.

Chúng ta *chỉ cần* hai **đối tượng** để kiểm tra mối quan hệ giữa chúng. Ví dụ:

```js
// Simply: does `b` appear anywhere in
// `c`s [[Prototype]] chain?
b.isPrototypeOf( c );
```

Lưu ý, phương pháp này hoàn toàn không yêu cầu một function ("class") nào. Nó chỉ sử dụng các tham chiếu đối tượng trực tiếp đến `b` và `c`, đồng thời hỏi về mối quan hệ của chúng. Nói cách khác, tiện ích `isRelatedTo(..)` ở trên của chúng ta được tích hợp sẵn trong ngôn ngữ và được gọi là `isPrototypeOf(..)`.

Chúng ta cũng có thể truy xuất trực tiếp `[[Prototype]]` của một đối tượng. Kể từ ES5, cách tiêu chuẩn để làm điều này là:

```js
Object.getPrototypeOf( a );
```

Và bạn sẽ nhận thấy rằng tham chiếu đối tượng là những gì chúng ta mong đợi:

```js
Object.getPrototypeOf( a ) === Foo.prototype; // true
```

Hầu hết các trình duyệt (không phải tất cả!) từ lâu cũng đã hỗ trợ một cách thay thế không chuẩn để truy cập `[[Prototype]]` nội bộ:

```js
a.__proto__ === Foo.prototype; // true
```

Thuộc tính `.__proto__` kỳ lạ (không được chuẩn hóa cho đến ES6!) "một cách kỳ diệu" truy xuất `[[Prototype]]` bên trong của một đối tượng làm tham chiếu, điều này khá hữu ích nếu bạn muốn kiểm tra trực tiếp (hoặc thậm chí duyệt qua: chuỗi ` .__proto__.__proto__...`).

Giống như chúng ta đã thấy trước đó với `.constructor`, `.__proto__` không thực sự tồn tại trên đối tượng mà bạn đang kiểm tra (`a` trong ví dụ đang chạy của chúng ta). Trên thực tế, nó tồn tại (non-enumerable; xem Chương 2) trên `Object.prototype` tích hợp sẵn, cùng với các tiện ích phổ biến khác (`.toString()`, `.isPrototypeOf(..)`, v.v.) .

Ngoài ra, `.__proto__` trông giống như một thuộc tính, nhưng thực ra sẽ phù hợp hơn nếu coi nó như một getter/setter (xem Chương 3).

Đại khái, chúng ta có thể hình dung `.__proto__` được triển khai (xem Chương 3 để biết định nghĩa thuộc tính đối tượng) như sau:

```js
Object.defineProperty( Object.prototype, "__proto__", {
	get: function() {
		return Object.getPrototypeOf( this );
	},
	set: function(o) {
		// setPrototypeOf(..) as of ES6
		Object.setPrototypeOf( this, o );
		return o;
	}
} );
```

Vì vậy, khi chúng ta truy cập (lấy giá trị của) `a.__proto__`, nó giống như gọi `a.__proto__()` (gọi hàm getter). *Lời gọi hàm đó* có `a` là `this` của nó mặc dù hàm getter tồn tại trên đối tượng `Object.prototype` (xem Chương 2 để biết các quy tắc ràng buộc `this`), vì vậy nó giống như nói `Object.getPrototypeOf( a )`.

`.__proto__` cũng là một thuộc tính có thể thiết lập, giống như sử dụng `Object.setPrototypeOf(..)` của ES6 đã trình bày trước đó. Tuy nhiên, nhìn chung bạn **không nên thay đổi `[[Prototype]]` của một đối tượng hiện có**.

Có một số kỹ thuật nâng cao, rất phức tạp được sử dụng sâu trong một số framework cho phép thực hiện các thủ thuật như "subclassing" một `Array`, nhưng điều này thường không được chấp nhận trong thực tiễn lập trình nói chung, vì nó thường dẫn đến *rất nhiều* khó hiểu/bảo trì mã hơn .

**Lưu ý:** Kể từ ES6, từ khóa `class` sẽ cho phép thứ gì đó gần đúng với "subclassing" của tích hợp sẵn như `Array`. Xem Phụ lục A để thảo luận về cú pháp `class` được thêm vào trong ES6.

Ngoại lệ hẹp duy nhất khác (như đã đề cập trước đó) sẽ là đặt `[[Prototype]]` của đối tượng `.prototype` của hàm mặc định để tham chiếu một số đối tượng khác (ngoài `Object.prototype`). Điều đó sẽ tránh thay thế hoàn toàn đối tượng mặc định đó bằng một đối tượng được liên kết mới. Mặt khác, **tốt nhất là coi liên kết `[[Prototype]]` của đối tượng là đặc điểm chỉ đọc** để dễ đọc mã của bạn sau này.

**Lưu ý:** Cộng đồng JavaScript đã đặt ra thuật ngữ không chính thức cho dấu gạch dưới kép, cụ thể là dấu gạch dưới ở đầu trong các thuộc tính như `__proto__`: "dunder". Vì vậy, "những đứa trẻ tuyệt vời" trong JavaScript thường phát âm `__proto__` là "dunder proto".

## Object Links

Như chúng ta đã thấy, cơ chế `[[Prototype]]` là một liên kết nội bộ tồn tại trên một đối tượng tham chiếu đến một số đối tượng khác.

Mối liên kết này (chủ yếu) được thực hiện khi tham chiếu thuộc tính/phương thức được tạo đối với đối tượng đầu tiên và không tồn tại thuộc tính/phương thức nào như vậy. Trong trường hợp đó, liên kết `[[Prototype]]` báo cho công cụ tìm kiếm thuộc tính/phương thức trên đối tượng được liên kết với. Đổi lại, nếu đối tượng đó không thể hoàn thành tra cứu, `[[Prototype]]` của nó sẽ được theo sau, v.v. Chuỗi liên kết này giữa các đối tượng tạo thành cái được gọi là "prototype chain".

### `Create()`ing Links

Chúng ta đã giải thích cặn kẽ lý do tại sao cơ chế `[[Prototype]]` của JavaScript **không** giống như *các class* và chúng ta đã thấy cách nó tạo ra các **liên kết** giữa các object riêng biệt.

Ý nghĩa của cơ chế `[[Prototype]]` là gì? Tại sao các nhà phát triển JS lại nỗ lực rất nhiều (mô phỏng các class) trong code của họ để kết nối các liên kết này?

Hãy nhớ rằng chúng tôi đã nói trước đó rất nhiều trong chương này rằng `Object.create(..)` sẽ là một anh hùng? Bây giờ, chúng tôi đã sẵn sàng để xem làm thế nào.

```js
var foo = {
	something: function() {
		console.log( "Tell me something good..." );
	}
};

var bar = Object.create( foo );

bar.something(); // Tell me something good...
```

`Object.create(..)` tạo một đối tượng mới (`bar`) được liên kết với đối tượng mà chúng ta đã chỉ định (`foo`), cung cấp cho chúng ta tất cả quyền lực (ủy quyền) của cơ chế `[[Prototype]]`, nhưng không có bất kỳ sự phức tạp không cần thiết nào của các hàm `new` hoạt động như các class và lệnh gọi constructor, gây nhầm lẫn giữa các tham chiếu `.prototype` và `.constructor` hoặc bất kỳ nội dung bổ sung nào trong số đó.

**Lưu ý:** `Object.create(null)` tạo một đối tượng có liên kết trống (hay còn gọi là `null`) `[[Prototype]]` và do đó đối tượng không thể ủy quyền ở bất kỳ đâu. Vì một đối tượng như vậy không có chuỗi nguyên mẫu, nên toán tử `instanceof` (đã giải thích trước đó) không có gì để kiểm tra, do đó, nó sẽ luôn trả về `false`. Các đối tượng rỗng-`[[Prototype]]` đặc biệt này thường được gọi là "từ điển" vì chúng thường được sử dụng hoàn toàn để lưu trữ dữ liệu trong các thuộc tính, chủ yếu là do chúng không có tác động bất ngờ có thể có từ bất kỳ thuộc tính/chức năng được ủy quyền nào trên `[[Prototype ]]` và do đó hoàn toàn là bộ lưu trữ dữ liệu phẳng.

Chúng ta không *cần* các class để tạo mối quan hệ có ý nghĩa giữa hai đối tượng. Điều duy nhất chúng ta nên **thực sự quan tâm** là các đối tượng được liên kết với nhau để ủy quyền và `Object.create(..)` cung cấp cho chúng ta mối liên kết đó mà không cần các giả mạo class xấu xí.

#### `Object.create()` Polyfilled

`Object.create(..)` đã được thêm vào ES5. Bạn có thể cần hỗ trợ các môi trường trước ES5 (chẳng hạn như IE cũ hơn), vì vậy, hãy xem một **phần** polyfill đơn giản cho `Object.create(..)` cung cấp cho chúng ta khả năng mà chúng tôi cần ngay cả trong các môi trường đó. Môi trường JS cũ hơn:

```js
if (!Object.create) {
	Object.create = function(o) {
		function F(){}
		F.prototype = o;
		return new F();
	};
}
```

Polyfill này hoạt động bằng cách sử dụng hàm `F` và ghi đè thuộc tính `.prototype` của nó để trỏ đến đối tượng mà chúng ta muốn liên kết tới. Sau đó, chúng tôi sử dụng cấu trúc `new F()` để tạo một đối tượng mới sẽ được liên kết như chúng tôi đã chỉ định.

Cách sử dụng `Object.create(..)` này cho đến nay là cách sử dụng phổ biến nhất, bởi vì đó là phần *có thể được* polyfilled. Có một bộ chức năng bổ sung mà `Object.create(..)` tích hợp sẵn trong ES5 cung cấp, chức năng này **không thể polyfillable** cho pre-ES5. Như vậy, khả năng này ít được sử dụng phổ biến. Để hoàn thiện, hãy xem xét chức năng bổ sung đó:

```js
var anotherObject = {
	a: 2
};

var myObject = Object.create( anotherObject, {
	b: {
		enumerable: false,
		writable: true,
		configurable: false,
		value: 3
	},
	c: {
		enumerable: true,
		writable: false,
		configurable: false,
		value: 4
	}
} );

myObject.hasOwnProperty( "a" ); // false
myObject.hasOwnProperty( "b" ); // true
myObject.hasOwnProperty( "c" ); // true

myObject.a; // 2
myObject.b; // 3
myObject.c; // 4
```

Đối số thứ hai cho `Object.create(..)` chỉ định các tên thuộc tính để thêm vào đối tượng mới được tạo, thông qua việc khai báo *property descriptor* của mỗi thuộc tính mới (xem Chương 3). Bởi vì không thể điền đầy đủ các bộ mô tả thuộc tính polyfill vào pre-ES5, chức năng bổ sung này trên `Object.create(..)` cũng không thể được polyfill.

Phần lớn việc sử dụng `Object.create(..)` sử dụng tập hợp con chức năng an toàn cho polyfill, vì vậy hầu hết các nhà phát triển đều hài lòng với việc sử dụng **partial polyfill** trong môi trường pre-ES5.

Một số nhà phát triển có quan điểm chặt chẽ hơn nhiều, đó là không function nào nên polyfilled  trừ khi nó có thể được polyfilled *đầy đủ*. Vì `Object.create(..)` là một trong những tiện ích có thể điền đầy một phần đó, góc nhìn hẹp hơn này nói rằng nếu bạn cần sử dụng bất kỳ chức năng nào của `Object.create(..)` trong phiên bản pre-ES5 thay vì polyfilling, bạn nên sử dụng tiện ích tùy chỉnh và tránh sử dụng hoàn toàn tên `Object.create`. Thay vào đó, bạn có thể xác định tiện ích của riêng mình, như:

```js
function createAndLinkObject(o) {
	function F(){}
	F.prototype = o;
	return new F();
}

var anotherObject = {
	a: 2
};

var myObject = createAndLinkObject( anotherObject );

myObject.a; // 2
```

Tôi không chia sẻ quan điểm khắt khe này. Tôi hoàn toàn tán thành tính năng polyfill một phần phổ biến của `Object.create(..)` như được hiển thị ở trên và sử dụng nó trong mã của bạn ngay cả trong phiên bản tiền ES5. Tôi sẽ để nó cho bạn để đưa ra quyết định của riêng bạn.

### Links As Fallbacks?

Có thể sẽ hấp dẫn khi nghĩ rằng các liên kết này giữa các đối tượng *chủ yếu* cung cấp một loại dự phòng cho các thuộc tính hoặc phương thức "bị thiếu". Mặc dù đó có thể là một kết quả quan sát được, nhưng tôi không nghĩ nó thể hiện cách suy nghĩ đúng đắn về `[[Prototype]]`.

Consider:

```js
var anotherObject = {
	cool: function() {
		console.log( "cool!" );
	}
};

var myObject = Object.create( anotherObject );

myObject.cool(); // "cool!"
```

Mã đó sẽ hoạt động nhờ `[[Prototype]]`, nhưng nếu bạn viết nó theo cách đó để `anotherObject` hoạt động như một dự phòng ** đề phòng** `myObject` không thể xử lý một số thuộc tính/phương thức mà một số nhà phát triển có thể cố gắng gọi, tỷ lệ cược là phần mềm của bạn sẽ trở nên "kỳ diệu" hơn một chút và khó hiểu và khó bảo trì hơn.

Điều đó không có nghĩa là không có trường hợp dự phòng là một design pattern phù hợp, nhưng nó không phổ biến hoặc thành ngữ trong JS, vì vậy nếu bạn thấy mình đang làm như vậy, bạn có thể lùi lại một bước và xem xét lại nếu điều đó thực sự phù hợp và thiết kế hợp lý.

**Lưu ý:** Trong ES6, một chức năng nâng cao có tên là `Proxy` được giới thiệu có thể cung cấp một số loại hành vi "không tìm thấy phương thức". `Proxy` nằm ngoài phạm vi của cuốn sách này, nhưng sẽ được đề cập chi tiết trong một cuốn sách sau trong sê-ri *"You Don't Know JS"*.

**Đừng bỏ lỡ một điểm quan trọng nhưng sắc thái ở đây.**

Ví dụ: thiết kế phần mềm mà bạn dự định cho nhà phát triển gọi `myObject.cool()` và để phần mềm đó hoạt động mặc dù không có phương thức `cool()` trên `myObject` giới thiệu một số "phép thuật" vào thiết kế API của bạn có thể gây ngạc nhiên cho các nhà phát triển tương lai, những người duy trì phần mềm của bạn.

Tuy nhiên, bạn có thể thiết kế API của mình với ít "phép thuật" hơn nhưng vẫn tận dụng được sức mạnh của liên kết `[[Prototype]]`.

```js
var anotherObject = {
	cool: function() {
		console.log( "cool!" );
	}
};

var myObject = Object.create( anotherObject );

myObject.doCool = function() {
	this.cool(); // internal delegation!
};

myObject.doCool(); // "cool!"
```

Ở đây, chúng ta gọi `myObject.doCool()`, là một phương thức *thực sự tồn tại* trên `myObject`, làm cho thiết kế API của chúng ta rõ ràng hơn (ít "kỳ diệu" hơn). *Trong nội bộ*, việc triển khai của chúng ta tuân theo **mẫu thiết kế ủy quyền** (xem Chương 6), tận dụng lợi thế của `[[Prototype]]` ủy quyền cho `anotherObject.cool()`.

Nói cách khác, ủy quyền sẽ có xu hướng ít gây ngạc nhiên/khó hiểu hơn nếu đó là chi tiết triển khai nội bộ thay vì được hiển thị rõ ràng trong thiết kế API của bạn. Chúng tôi sẽ trình bày chi tiết về **delegation** trong chương tiếp theo.

## Review (TL;DR)

Khi thử truy cập thuộc tính trên một đối tượng không có thuộc tính đó, liên kết `[[Prototype]]` bên trong của đối tượng xác định vị trí tiếp theo của thao tác `[[Get]]` (xem Chương 3). Liên kết xếp tầng này từ đối tượng này sang đối tượng khác về cơ bản xác định một "prototype chain" (hơi giống với chuỗi phạm vi lồng nhau) của các đối tượng để duyệt qua để phân giải thuộc tính.

Tất cả các đối tượng thông thường đều có `Object.prototype` được tích hợp sẵn làm phần trên cùng của chuỗi nguyên mẫu (như phạm vi toàn cầu trong tra cứu phạm vi), trong đó quá trình phân giải thuộc tính sẽ dừng lại nếu không tìm thấy ở bất kỳ đâu trước đó trong chuỗi. `toString()`, `valueOf()` và một số tiện ích phổ biến khác tồn tại trên đối tượng `Object.prototype` này, giải thích cách tất cả các đối tượng trong ngôn ngữ có thể truy cập chúng.

Cách phổ biến nhất để liên kết hai đối tượng với nhau là sử dụng từ khóa `new` với một lệnh gọi hàm, trong bốn bước của nó (xem Chương 2), nó tạo ra một đối tượng mới được liên kết với một đối tượng khác.

"Đối tượng khác" mà đối tượng mới được liên kết tình cờ lại là đối tượng được tham chiếu bởi thuộc tính `.prototype` được đặt tên tùy ý của hàm được gọi với `new`. Các hàm được gọi với `new` thường được gọi là "hàm tạo", mặc dù thực tế là chúng không thực sự khởi tạo một lớp như *hàm tạo* thực hiện trong các ngôn ngữ định hướng lớp truyền thống.

Mặc dù các cơ chế JavaScript này có vẻ giống với "khởi tạo lớp" và "kế thừa lớp" từ các ngôn ngữ định hướng lớp truyền thống, điểm khác biệt chính là trong JavaScript, không có bản sao nào được tạo. Thay vào đó, các đối tượng cuối cùng được liên kết với nhau thông qua chuỗi `[[Prototype]]` bên trong.

Vì nhiều lý do, ít nhất trong số đó là tiền lệ thuật ngữ, "kế thừa" (và "kế thừa nguyên mẫu") và tất cả các thuật ngữ OO khác không có ý nghĩa gì khi xem xét cách JavaScript *thực sự* hoạt động (không chỉ áp dụng cho mô hình tinh thần cưỡng bức).

Thay vào đó, "delegation (ủy quyền)" là thuật ngữ phù hợp hơn, bởi vì các mối quan hệ này không phải là *bản sao* mà là **liên kết** ủy quyền.
