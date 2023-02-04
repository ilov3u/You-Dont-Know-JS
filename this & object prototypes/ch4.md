# You Don't Know JS: *this* & Object Prototypes
# Chapter 4: Mixing (Up) "Class" Objects

Sau khi chúng ta khám phá các object từ chương trước, tự nhiên bây giờ chúng ta chuyển sự chú ý sang "object oriented (OO) programming", với "các class". Trước tiên, chúng ta sẽ xem xét "class orientation" như một design pattern, trước khi xem xét cơ chế của "class": "instantiation (tức thời)", "inheritance (kế thừa)" và "(relative) polymorphism (đa hình (tương đối))".

Chúng ta sẽ thấy rằng những khái niệm này không thực sự ánh xạ một cách tự nhiên đến cơ chế đối tượng trong JS và độ dài (mixin, v.v.) mà nhiều nhà phát triển JavaScript phải vượt qua những thách thức như vậy.

**Ghi Chú:** Chương này dành khá nhiều thời gian (nửa đầu!) Cho lý thuyết nặng về "lập trình hướng đối tượng". Cuối cùng, chúng tôi liên hệ những ý tưởng này với mã JavaScript cụ thể thực sự trong nửa sau, khi chúng tôi nói về "Mixin". Nhưng có rất nhiều khái niệm và mã giả để vượt qua trước tiên, vì vậy đừng để bị lạc - chỉ cần gắn bó với nó!

## Class Theory

"Class/Inheritance" (lớp/kế thừa) mô tả một dạng tổ chức và kiến trúc code nhất định - một cách mô hình hóa các miền vấn đề trong thế giới thực trong phần mềm của chúng ta.

OO hay class oriented programming nhấn mạnh rằng dữ liệu về bản chất có hành vi liên kết (tất nhiên, khác nhau tùy thuộc vào loại và bản chất của dữ liệu!) hoạt động trên đó, vì vậy thiết kế phù hợp là đóng gói (hay còn gọi là đóng gói) dữ liệu và hành vi lại với nhau. Điều này đôi khi được gọi là "cấu trúc dữ liệu" trong khoa học máy tính chính thức.

Ví dụ, một chuỗi các ký tự đại diện cho một từ hoặc cụm từ thường được gọi là "string". Các ký tự là dữ liệu. Nhưng bạn hầu như không bao giờ chỉ quan tâm đến dữ liệu, bạn thường muốn *làm mọi việc* với dữ liệu, vì vậy các hành vi có thể áp dụng *cho* dữ liệu đó (tính toán độ dài của nó, thêm dữ liệu, tìm kiếm, v.v.) đều được thiết kế như các phương thức của một class `String`.

Bất kỳ string nhất định nào cũng chỉ là một thể hiện của class này, có nghĩa là nó là một gói được thu thập gọn gàng của cả dữ liệu ký tự và function mà chúng ta có thể thực hiện trên nó.

Các class cũng ngụ ý một cách *classifying (phân loại)* một cấu trúc dữ liệu nhất định. Cách chúng ta làm điều này là suy nghĩ về bất kỳ cấu trúc nhất định nào như một biến thể cụ thể của định nghĩa cơ sở tổng quát hơn.

Hãy cùng khám phá quy trình phân loại này bằng cách xem một ví dụ thường được trích dẫn. *Car* có thể được mô tả như một cách triển khai cụ thể của một "class" vật chung chung hơn, được gọi là *Vehicle*.

Chúng ta mô hình hóa mối quan hệ này trong software với các class bằng cách xác định class `Vehicle` và class `Car`.

Định nghĩa về `Vehicle` có thể bao gồm những thứ như sức đẩy (động cơ, v.v.), khả năng chở người, v.v., tất cả đều sẽ là hành vi. Những gì chúng tôi định nghĩa trong `Vehicle` là tất cả những thứ chung cho tất cả (hoặc hầu hết) các loại phương tiện khác nhau (" máy bay, tàu hỏa và ô tô ").

Phần mềm của chúng ta có thể không có ý nghĩa khi định nghĩa lại bản chất cơ bản của "khả năng chở người" đối với từng loại phương tiện khác nhau. Thay vào đó, chúng ta xác định khả năng đó một lần trong `Vehicle`, và sau đó khi chúng ta định nghĩa `Car`, chúng ta chỉ đơn giản chỉ ra rằng nó "inherit" (h oặc "extends") định nghĩa cơ sở từ `Vehicle`. Định nghĩa của `Car` được cho là chuyên biệt hóa định nghĩa chung về `Vehicle`.

Mặc dù `Vehicle` và `Car` cùng nhau định nghĩa hành vi bằng cách dùng các phương thức, nhưng dữ liệu trong một phiên bản sẽ là những thứ như số VIN(Vehicle identification number) duy nhất của một chiếc xe cụ thể, v.v.

**Và do đó, các lớp, kế thừa và khởi tạo xuất hiện.**

Một khái niệm quan trọng khác với các class là "đa hình(polymorphism)", mô tả ý tưởng rằng một hành vi chung từ lớp cha có thể được ghi đè trong lớp con để cung cấp cho nó chi tiết cụ thể hơn. Trên thực tế, tính đa hình tương đối cho phép chúng ta tham chiếu hành vi cơ sở từ hành vi bị ghi đè.

Lý thuyết Class đề xuất mạnh mẽ rằng một class cha và một class con chia sẻ cùng một tên phương thức cho một hành vi nhất định, để lớp con ghi đè lớp cha (một cách khác biệt). Như chúng ta sẽ thấy ở phần sau, làm như vậy trong mã JavaScript của bạn sẽ dẫn đến sự thất vọng và tính dễ gãy của mã.

### "Class" Design Pattern

Bạn có thể chưa bao giờ nghĩ về các class như là một "design pattern", vì nó phổ biến nhất khi thấy thảo luận về các "OO Design Patterns" phổ biến, như "Iterator", "Observer", "Factory", "Singleton", v.v. Như đã trình bày theo cách này, gần như giả định rằng các class OO là cơ chế cấp thấp hơn mà chúng tôi triển khai tất cả các mẫu thiết kế (cấp cao hơn), như thể OO là nền tảng nhất định cho *tất cả* (thích hợp) code.

Tùy thuộc vào trình độ học vấn chính thức của bạn về lập trình, bạn có thể đã nghe nói về "procedural programming" như một cách mô tả mã chỉ bao gồm các thủ tục (hay còn gọi là hàm) gọi các hàm khác mà không có bất kỳ sự trừu tượng nào cao hơn. Bạn có thể đã được dạy rằng các lớp là cách *thích hợp* để chuyển đổi "mã spaghetti" theo kiểu thủ tục thành mã được tổ chức tốt và được định dạng tốt.

Tất nhiên, nếu bạn có kinh nghiệm với "functional programming" (Monads, v.v.), bạn sẽ biết rất rõ rằng các class chỉ là một trong số các design pattern phổ biến. Nhưng đối với những người khác, đây có thể là lần đầu tiên bạn tự hỏi liệu các class có thực sự là nền tảng cơ bản cho code hay chúng là một sự trừu tượng tùy chọn hàng đầu của code.

Một số ngôn ngữ (như Java) không cung cấp cho bạn lựa chọn, vì vậy nó không *tùy chọn* chút nào -- mọi thứ đều là một class. Các ngôn ngữ khác như C/C++ hoặc PHP cung cấp cho bạn cả cú pháp thủ tục và hướng lớp, và tùy thuộc vào sự lựa chọn của nhà phát triển xem phong cách hoặc hỗn hợp các phong cách phù hợp hơn.

### JavaScript "Classes"

JavaScript rơi vào đâu trong vấn đề này? JS đã có *một số* thành phần cú pháp giống như lớp (như `new` và `instanceof`) trong một thời gian khá dài và gần đây hơn trong ES6, một số bổ sung, như từ khóa `class` (xem Phụ lục A).

Nhưng điều đó có nghĩa là JavaScript thực sự *có* các class? Rõ ràng và đơn giản: **Không.**

Vì các class là một design pattern, nên bạn *có thể*, với khá nhiều nỗ lực (như chúng ta sẽ thấy trong suốt phần còn lại của chương này), triển khai các phép tính gần đúng cho nhiều chức năng của class cổ điển. JS cố gắng thỏa mãn *mong muốn* cực kỳ phổ biến để thiết kế với các class bằng cách cung cấp cú pháp có vẻ giống như class.

Mặc dù chúng ta có thể có một syntax trông giống như các class, nhưng như thể các cơ chế JavaScript đang chống lại bạn bằng cách sử dụng *class design pattern*, bởi vì đằng sau bức màn, các cơ chế mà bạn xây dựng đang hoạt động hoàn toàn khác. Đường cú pháp và các thư viện JS "Class" (được sử dụng cực kỳ rộng rãi) giúp bạn che giấu thực tế này một cách lâu dài, nhưng sớm hay muộn bạn sẽ phải đối mặt với thực tế là *class* bạn có trong các ngôn ngữ khác không giống như "class" bạn đang giả mạo trong JS.

Điều này tóm lại là các lớp là một pattern tùy chọn trong thiết kế phần mềm và bạn có quyền lựa chọn sử dụng chúng trong JavaScript hay không. Vì nhiều nhà phát triển có mối quan hệ mật thiết với thiết kế phần mềm class oriented, nên chúng ta sẽ dành phần còn lại của chương này để khám phá những điều cần thiết để duy trì ảo tưởng về class với những gì JS cung cấp và những điểm khó khăn mà chúng ta gặp phải.

## Class Mechanics

Trong nhiều ngôn ngữ class-oriented, "standard library" cung cấp một "stack" data structure (push, pop, etc.) dưới dạng một class `Stack`. Class này sẽ có một tập hợp các biến nội bộ lưu trữ dữ liệu và nó sẽ có một tập hợp các hành vi ("phương thức") có thể truy cập công khai do class cung cấp, giúp code của bạn có khả năng tương tác với dữ liệu (ẩn) (thêm & xóa dữ liệu, v.v.).

Nhưng trong các ngôn ngữ như vậy, bạn không thực sự thao tác trực tiếp trên `Stack` (trừ khi tạo tham chiếu thành viên class **Static**, nằm ngoài phạm vi thảo luận của chúng ta). Class `Stack` chỉ là một giải thích trừu tượng về những gì mà *bất kỳ* "stack" nào nên làm, nhưng bản thân nó không phải là *một* "stack". Bạn phải **khởi tạo** class `Stack` trước khi bạn có cấu trúc dữ liệu cụ thể *thứ* để hoạt động chống lại.

### Building

Phép ẩn dụ truyền thống cho tư duy dựa trên "class" và "instance" xuất phát từ việc xây dựng một công trình.

Một kiến trúc sư lên kế hoạch cho tất cả các đặc điểm của một tòa nhà: rộng bao nhiêu, cao bao nhiêu, có bao nhiêu cửa sổ và ở những vị trí nào, thậm chí loại vật liệu nào sẽ sử dụng cho tường và mái. Tại thời điểm này, cô ấy không nhất thiết phải quan tâm, *ở đâu (where)* tòa nhà sẽ được xây dựng, cô ấy cũng không quan tâm *có bao nhiêu (how many)* bản sao của tòa nhà đó sẽ được xây dựng.

Cô ấy cũng không quan tâm lắm đến chi tiết của tòa nhà -- đồ nội thất, giấy dán tường, quạt trần, v.v. -- chỉ quan tâm đến loại cấu trúc mà chúng sẽ được chứa trong đó..

Bản thiết kế kiến trúc mà cô ấy tạo ra chỉ là *kế hoạch* cho một tòa nhà. Chúng không thực sự tạo thành một tòa nhà mà chúng ta có thể bước vào và ngồi xuống. Chúng ta cần một người xây dựng cho nhiệm vụ đó. Một người xây dựng sẽ lấy những kế hoạch đó và làm theo chúng một cách chính xác, khi anh ta *xây dựng* tòa nhà. Theo một nghĩa rất thực tế, anh ấy đang *sao chép* các đặc điểm dự kiến từ các kế hoạch sang tòa nhà vật lý.

Sau khi hoàn thành, tòa nhà là sự khởi tạo vật lý của các kế hoạch thiết kế, hy vọng là một *bản sao* hoàn hảo về cơ bản. Và sau đó người xây dựng có thể di chuyển đến lô đất trống bên cạnh và làm lại từ đầu, tạo ra một *bản sao* khác.

Mối quan hệ giữa tòa nhà và bản thiết kế là gián tiếp. Bạn có thể kiểm tra bản thiết kế để hiểu tòa nhà được cấu trúc như thế nào, đối với bất kỳ bộ phận nào mà việc kiểm tra trực tiếp tòa nhà là không đủ. Nhưng nếu bạn muốn mở một cánh cửa, bạn phải đến chính tòa nhà -- bản thiết kế chỉ có các đường được vẽ trên một trang *đại diện* vị trí của cánh cửa đó.

Một class là một bản thiết kế(blue-print). Để thực sự *lấy* một object mà chúng ta có thể tương tác, chúng ta phải xây dựng (hay còn gọi là "khởi tạo (instantiate)") một thứ gì đó từ class. Kết quả cuối cùng của việc "xây dựng" như vậy là một object, thường được gọi là "instance (thể hiện)", mà chúng ta có thể gọi trực tiếp các phương thức và truy cập bất kỳ thuộc tính dữ liệu công khai nào từ đó, nếu cần.

**Object này là một *bản sao*** của tất cả các đặc điểm được mô tả bởi class.

Bạn có thể sẽ không mong đợi bước vào một tòa nhà và tìm thấy, được đóng khung và treo trên tường, một bản sao của các bản thiết kế được sử dụng để lên kế hoạch cho tòa nhà, mặc dù các bản thiết kế này có thể được lưu trữ tại một văn phòng hồ sơ công cộng. Tương tự, bạn thường không sử dụng một object instance để truy cập trực tiếp và thao tác với class của nó, nhưng thường thì ít nhất bạn cũng có thể xác định một object instance thuộc *lớp nào*.

Sẽ hữu ích hơn khi xem xét mối quan hệ trực tiếp của một class với một object instance, hơn là bất kỳ mối quan hệ gián tiếp nào giữa một object instance và class mà nó xuất phát. **Một class được khởi tạo thành dạng object bằng thao tác sao chép.**

<img src="fig1.png">

Như bạn có thể thấy, các mũi tên di chuyển từ trái sang phải và từ trên xuống dưới, biểu thị các thao tác sao chép diễn ra, cả về mặt khái niệm và vật lý.

### Constructor

Các instance của các class được xây dựng bằng một phương thức đặc biệt của class, thường có cùng tên với class, được gọi là *constructor*. Công việc rõ ràng của phương thức này là khởi tạo bất kỳ thông tin (trạng thái) nào mà instance sẽ cần.

Cho minh hoạ, xem xét đoạn pseudo-code (cú pháp tự sáng chế) cho class:

```js
class CoolGuy {
	specialTrick = nothing

	CoolGuy( trick ) {
		specialTrick = trick
	}

	showOff() {
		output( "Here's my trick: ", specialTrick )
	}
}
```

Để *tạo* một `CoolGuy` instance, chúng ta sẽ gọi constructor của class:

```js
Joe = new CoolGuy( "jumping rope" )

Joe.showOff() // Here's my trick: jumping rope
```

Để ý rằng `CoolGuy` class có một constructor `CoolGuy()`, thứ mà thực sự được gọi khi chúng ta gọi `new CoolGuy(..)`. Chúng ta nhận về một object (một instance của class của chúng ta) từ constructor, và chúng ta có thể gọi method `showOff()`, thứ mà in ra special trick của `CoolGuy` đó.

*Rõ ràng, nhảy dây khiến Joe trở thành một chàng trai khá ngầu.*

Constructor của một class *thuộc về* class, hầu như phổ biến có cùng tên với class. Đồng thời, constructor hầu như luôn cần được gọi với từ khoá `new` để cho ngôn ngữ biết bạn muốn tạo một instance *mới* của class.

## Class Inheritance

Trong các ngôn ngữ class-oriented, bạn không chỉ có thể định nghĩa một class có thể tự khởi tạo mà còn có thể định nghĩa một class khác **kế thừa** từ class đầu tiên.

Class thứ hai thường được gọi là "child class" trong khi class thứ nhất là "parent class". Những thuật ngữ này rõ ràng xuất phát từ phép ẩn dụ của cha mẹ và con cái, mặc dù các phép ẩn dụ ở đây hơi kéo dài, như bạn sẽ thấy ngay sau đây.

Khi cha mẹ có con ruột, các đặc điểm di truyền của cha mẹ được sao chép vào đứa trẻ. Rõ ràng, trong hầu hết các hệ thống sinh sản sinh học, có hai bố mẹ cùng đóng góp các gen vào hỗn hợp. Nhưng với mục đích của phép ẩn dụ, chúng ta sẽ giả sử chỉ có một phụ huynh.

Một khi đứa trẻ được sinh ra, nó tách biệt khỏi cha mẹ. Đứa trẻ chịu ảnh hưởng sâu sắc bởi sự di truyền từ cha mẹ của mình, nhưng là duy nhất và khác biệt. Nếu một đứa trẻ có mái tóc đỏ, điều đó không có nghĩa là tóc của cha mẹ *từng* hoặc tự động *trở thành* đỏ.

Theo cách tương tự, một khi child class được định nghĩa, nó sẽ tách biệt và khác biệt với parent class. Child class chứa một bản sao ban đầu của behavior từ parent class, nhưng sau đó có thể ghi đè bất kỳ hành vi kế thừa nào và thậm chí định nghĩa hành vi mới.

Điều quan trọng cần nhớ là chúng ta đang nói về **các class** về parent và child, đây không phải là những thứ vật chất. Đây là chỗ mà ẩn dụ cha và con hơi khó hiểu, bởi vì chúng ta thực sự nên nói rằng parent class giống như DNA của cha và child class giống như DNA của con. Chúng ta phải tạo ra (hay còn gọi là "khởi tạo") một người trong mỗi bộ DNA để thực sự có một người thực sự để trò chuyện cùng.

Hãy tạm gác cha mẹ ruột và con cái sang một bên và nhìn vào sự thừa kế qua một lăng kính hơi khác: các loại phương tiện khác nhau. Đó là một trong những phép ẩn dụ kinh điển nhất (và thường đáng phàn nàn) để hiểu về sự kế thừa.

Cùng xem lại cuộc thảo luận `Vehicle` và `Car` ở đầu chương này. Xem xét pseudo-code này cho các class kế thừa:

```js
class Vehicle {
	engines = 1

	ignition() {
		output( "Turning on my engine." )
	}

	drive() {
		ignition()
		output( "Steering and moving forward!" )
	}
}

class Car inherits Vehicle {
	wheels = 4

	drive() {
		inherited:drive()
		output( "Rolling on all ", wheels, " wheels!" )
	}
}

class SpeedBoat inherits Vehicle {
	engines = 2

	ignition() {
		output( "Turning on my ", engines, " engines." )
	}

	pilot() {
		inherited:drive()
		output( "Speeding through the water with ease!" )
	}
}
```

**Ghi chú:** Để rõ ràng và ngắn gọn, các hàm constructor cho các lớp này đã được lược bỏ.

Chúng ta định nghĩa class `Vehicle` giả định một động cơ, một cách để bật hệ thống đánh lửa và một cách để lái xe xung quanh. Nhưng bạn sẽ không bao giờ chỉ sản xuất một "phương tiện" chung chung, vì vậy nó thực sự chỉ là một khái niệm trừu tượng vào thời điểm này.

Vì vậy, sau đó chúng ta định nghĩa hai loại phương tiện cụ thể: `Car` và `SpeedBoat`. Mỗi loại đều kế thừa các đặc điểm chung của `Vehicle`, nhưng sau đó chúng chuyên biệt hóa các đặc điểm thích hợp cho từng loại. Một chiếc ô tô cần 4 bánh và một chiếc thuyền cao tốc cần 2 động cơ, điều đó có nghĩa là nó cần được chú ý nhiều hơn để bật đánh lửa của cả hai động cơ.

### Polymorphism

`Car` định nghĩa phương thức `drive()` của nó, thứ mà ghi đè lên phương thức cùng tên thuộc `Vehicle`. Nhưng sau đó, phương thức `drive()` của `Car` gọi `inherited:drive()`, cho biết rằng `Car` có thể tham chiếu `drive()` ban đầu trước khi ghi đè mà nó kế thừa. Phương thức `pilot()` của `SpeedBoat` cũng tạo một tham chiếu đến bản sao kế thừa của `drive()`.

Kỹ thuật này được gọi là "polymorphism", hay "virtual polymorphism". Cụ thể hơn cho điểm hiện tại của chúng tôi, chúng tôi sẽ gọi nó là "relative polymorphism".

Đa hình là một chủ đề rộng hơn nhiều so với những gì chúng ta sẽ nói hết ở đây, nhưng ngữ nghĩa "tương đối" hiện tại của chúng ta đề cập đến một khía cạnh cụ thể: ý tưởng rằng bất kỳ phương thức nào cũng có thể tham chiếu đến một phương thức khác (cùng tên hoặc khác tên) ở cấp độ cao hơn của hệ thống phân cấp kế thừa. Chúng tôi nói "tương đối" bởi vì chúng tôi không xác định hoàn toàn cấp độ kế thừa (hay còn gọi là class) mà chúng tôi muốn truy cập, mà tương đối tham chiếu nó bằng cách nói "tìm kiếm một cấp độ".

Trong nhiều ngôn ngữ, từ khóa `super` được sử dụng, thay cho từ `inherited:` trong ví dụ này, dựa trên ý tưởng rằng một "super class" là cha/tổ tiên của lớp hiện tại.

Một khía cạnh khác của polymorphism là một tên phương thức có thể có nhiều định nghĩa ở các cấp độ khác nhau của chuỗi thừa kế và các định nghĩa này được tự động chọn khi thích hợp khi giải quyết phương thức nào đang được gọi.

Chúng ta thấy hai lần xuất hiện của hành vi đó trong ví dụ của chúng ta ở trên: `drive()` được định nghĩa bởi cả `Vehicle` và `Car`, và `ignition()` được định nghĩa bởi cả `Vehicle` và `SpeedBoat`.

**Ghi chú:** Một điều khác mà các ngôn ngữ class-oriented truyền thống cung cấp cho bạn thông qua `super` là một cách trực tiếp để constructor của class con tham chiếu constructor của lớp cha của nó. Điều này phần lớn đúng bởi vì với các class thực tế, constructor thuộc về class. Tuy nhiên, trong JS thì ngược lại -- thực sự thích hợp hơn khi nghĩ về "class" thuộc về constructor (các tham chiếu kiểu `Foo.prototype...`). Vì trong JS, mối quan hệ giữa con và cha chỉ tồn tại giữa hai đối tượng `.prototype` của các constructor tương ứng, bản thân các constructor không liên quan trực tiếp và do đó không có cách đơn giản nào để tham chiếu tương đối cái này với cái kia (xem Phụ lục A để biết ES6 `class` sẽ "giải quyết" vấn đề này bằng `super`).

Có thể thấy cụ thể một ý nghĩa thú vị của polymorphism với `ignition()`. Bên trong `pilot()`, một relative-polymorphic reference được tạo cho phiên bản `Vehicle` của `drive()` (kế thừa). Nhưng `drive()` đó chỉ tham chiếu một phương thức `ignition()` theo tên (không có tham chiếu tương đối).

Language engine sẽ sử dụng phiên bản nào của `ignition()`, phiên bản từ `Vehicle` hay phiên bản từ `SpeedBoat`? **Nó sử dụng phiên bản `SpeedBoat` của `ignition()`.** Nếu bạn *đã* khởi tạo chính lớp `Vehicle`, sau đó gọi `drive()` của nó, thì language engine sẽ chỉ sử dụng định nghĩa phương thức `ignition()` của  `Vehicle`.

Nói cách khác, định nghĩa cho phương thức `ignition()` *đa hình* (thay đổi) tùy thuộc vào lớp (mức độ kế thừa) mà bạn đang tham chiếu đến một thể hiện của.

Điều này có vẻ giống như chi tiết học thuật quá sâu. Nhưng việc hiểu những chi tiết này là cần thiết để đối chiếu chính xác các hành vi tương tự (nhưng khác biệt) trong cơ chế `[[Prototype]]` của JavaScript.

Khi các lớp được kế thừa, có một cách **cho chính các lớp** (không phải các thể hiện đối tượng được tạo từ chúng!) để tham chiếu *tương đối* lớp được kế thừa từ đó và tham chiếu tương đối này thường được gọi là `super`.

Nhớ sơ đồ này từ trước đó:

<img src="fig1.png">

Lưu ý cách khởi tạo (`a1`, `a2`, `b1`, và `b2`) *và* kế thừa (`Bar`), các mũi tên biểu thị thao tác sao chép.

Về mặt khái niệm, có vẻ như một class con `Bar` có thể truy cập hành vi trong class cha của nó `Foo` bằng cách sử dụng một relative-polymorphic reference(tham chiếu đa hình tương đối) (hay còn gọi là `super`). Tuy nhiên, trong thực tế, class con chỉ đơn thuần được cung cấp một bản sao của hành vi được kế thừa từ class cha của nó. Nếu phần tử con "ghi đè" một phương thức mà nó kế thừa, thì cả phiên bản gốc và phiên bản được ghi đè của phương thức đó đều thực sự được duy trì để cả hai đều có thể truy cập được.

Đừng để tính đa hình khiến bạn nhầm lẫn khi nghĩ rằng một class con được liên kết với class cha của nó. Thay vào đó, một class con nhận được một bản sao của những gì nó cần từ lớp cha. **Kế thừa class ngụ ý các bản sao.**

### Multiple Inheritance

Nhớ lại cuộc thảo luận trước đây của chúng ta về cha mẹ và con cái và DNA? Chúng tôi đã nói rằng phép ẩn dụ hơi kỳ lạ vì về mặt sinh học, hầu hết con cái đều có cha và mẹ. Nếu một class có thể kế thừa từ hai class khác, nó sẽ phù hợp hơn với phép ẩn dụ cha/con.

Một số ngôn ngữ class-oriented cho phép bạn chỉ định nhiều hơn một class "cha" để "kế thừa" từ đó. Đa kế thừa có nghĩa là mỗi định nghĩa của class cha được sao chép vào class con.

Nhìn bề ngoài, đây có vẻ như là một bổ sung mạnh mẽ cho định hướng class, cho chúng ta khả năng kết hợp nhiều function hơn với nhau. Tuy nhiên, chắc chắn có một số câu hỏi phức tạp phát sinh. Nếu cả hai class cha cung cấp một phương thức có tên là `drive()`, thì tham chiếu `drive()` trong class con sẽ chuyển thành phiên bản nào? Bạn có luôn phải chỉ định thủ công `drive()` của class cha nào không, do đó làm mất đi một số nét duyên dáng của tính kế thừa đa hình?

Có một biến thể khác, cái gọi là "Diamond problem", đề cập đến kịch bản trong đó một class con "D" kế thừa từ hai class cha ("B" và "C") và mỗi class này lần lượt kế thừa từ class cha chung là A. Nếu "A" cung cấp một phương thức `drive()`, và cả "B" và "C" đều ghi đè (đa hình) phương thức đó, thì khi `D` tham chiếu `drive()`, nó sẽ sử dụng phiên bản nào (`B:drive ()` hay `C:drive()`)?

<img src="fig2.png">

Những phức tạp này thậm chí còn đi sâu hơn nhiều so với cái nhìn nhanh chóng này. Chúng ta giải quyết chúng ở đây chỉ để chúng tôi có thể đối chiếu với cách thức hoạt động của các cơ chế của JavaScript.

JavaScript đơn giản hơn: nó không cung cấp cơ chế riêng cho "đa kế thừa". Nhiều người coi đây là một điều tốt, bởi vì sự phức tạp giúp tiết kiệm nhiều hơn là bù đắp cho chức năng "giảm bớt". Nhưng điều này không ngăn được các nhà phát triển cố gắng giả mạo nó theo nhiều cách khác nhau, như chúng ta sẽ thấy tiếp theo.

## Mixins

Cơ chế object của JavaScript không *tự động* thực hiện hành vi sao chép khi bạn "kế thừa" hoặc "khởi tạo". Rõ ràng, không có "class" nào trong JavaScript để khởi tạo, chỉ có các object. Và các đối tượng không được sao chép sang các object khác, chúng được *liên kết với nhau* (thêm về điều đó trong Chương 5).

Vì các hành vi của class được quan sát trong các ngôn ngữ khác ngụ ý các bản sao, hãy kiểm tra cách các nhà phát triển JS **giả mạo** hành vi sao chép *bị thiếu* của các class trong JavaScript: mixins. Chúng ta sẽ xem xét hai loại "mixin": **rõ ràng** và **ngầm định**.

### Explicit Mixins

Hãy xem lại ví dụ `Vehicle` và `Car` của chúng ta trước đó. Vì JavaScript sẽ không tự động sao chép hành vi từ `Vehicle` sang `Car`, thay vào đó, chúng ta có thể tạo một utinity (tiện ích) sao chép thủ công. Một tiện ích như vậy thường được nhiều thư viện/framework gọi là `extend(..)`, nhưng chúng ta sẽ gọi nó là `mixin(..)` ở đây cho mục đích minh họa.

```js
// vastly simplified `mixin(..)` example:
function mixin( sourceObj, targetObj ) {
	for (var key in sourceObj) {
		// only copy if not already present
		if (!(key in targetObj)) {
			targetObj[key] = sourceObj[key];
		}
	}

	return targetObj;
}

var Vehicle = {
	engines: 1,

	ignition: function() {
		console.log( "Turning on my engine." );
	},

	drive: function() {
		this.ignition();
		console.log( "Steering and moving forward!" );
	}
};

var Car = mixin( Vehicle, {
	wheels: 4,

	drive: function() {
		Vehicle.drive.call( this );
		console.log( "Rolling on all " + this.wheels + " wheels!" );
	}
} );
```

**Ghi Chú:** Một cách tế nhị nhưng quan trọng, chúng ta không xử lý các class nữa, vì không có class nào trong JavaScript. `Vehicle` và `Car` chỉ là các object mà chúng ta tạo bản sao tương ứng từ và sang.

`Car` hiện có bản sao các property và function từ `Xe`. Về mặt kỹ thuật, các chức năng không thực sự được sao chép mà thay vào đó, các *tham chiếu* đến các chức năng được sao chép. Vì vậy, `Car` hiện có một thuộc tính được gọi là `ignition`, là một tham chiếu được sao chép cho hàm `ignition()`, cũng như một thuộc tính có tên là `engines` với giá trị được sao chép là `1` từ `Vehicle`.

`Car` *thực sự* có một thuộc tính `drive` (function), để tham chiếu thuộc tính không bị ghi đè (xem câu lệnh `if` trong `mixin(..)` ở trên).

#### "Polymorphism" Revisited

Hãy xem xét câu lệnh này: `Vehicle.drive.call(this )`. Đây là cái mà tôi gọi là "explicit pseudo-polymorphism (đa hình giả rõ ràng)". Nhớ lại trong pseudo-code trước đây của chúng ta, dòng này là `inherited:drive()`, mà chúng ta gọi là "relative polymorphism (đa hình tương đối)".

JavaScript không có (trước ES6; xem Phụ lục A) cơ sở cho relative polymorphism. Vì vậy, **vì cả `Car` và `Vehicle` đều có function giống nhau: `drive()`**, nên để phân biệt lệnh gọi này hay lệnh kia, chúng ta phải tạo một tham chiếu tuyệt đối (không tương đối). Chúng ta chỉ định rõ ràng object `Vehicle` theo tên và gọi hàm `drive()` trên đó.

Nhưng nếu chúng ta nói `Vehicle.drive()`, ràng buộc `this` cho lệnh gọi hàm đó sẽ là đối tượng `Vehicle` thay vì đối tượng `Car` (xem Chương 2), đây không phải là điều chúng ta muốn. Vì vậy, thay vào đó, chúng tôi sử dụng `.call( this )` (Chương 2) để đảm bảo rằng `drive()` được thực thi trong ngữ cảnh của đối tượng `Car`.

**Ghi Chú:** Nếu định danh tên hàm cho `Car.drive()` không trùng lặp với (hay còn gọi là "shadowed"; xem Chương 5) `Vehicle.drive()`, thì chúng ta đã không thực hiện "method polymorphism". Vì vậy, tham chiếu đến `Vehicle.drive()` sẽ được sao chép bởi lệnh gọi `mixin(..)` và chúng ta có thể truy cập trực tiếp bằng `this.drive()`. Sự trùng lặp định danh được chọn **shadowing** là *lý do* chúng ta phải sử dụng phương pháp tiếp cận *explicit pseudo-polymorphism* phức tạp hơn.

Trong các ngôn ngữ class-oriented, có tính relative polymorphism, liên kết giữa `Car` và `Vehicle` được thiết lập một lần, ở đầu định nghĩa class, điều này tạo ra chỉ một nơi duy nhất để duy trì các mối quan hệ đó.

Nhưng do các đặc thù của JavaScript, explicit pseudo-polymorphism (vì shadowing!) tạo ra liên kết thủ công/rõ ràng mong manh **trong mọi function đơn lẻ mà bạn cần một tham chiếu đa hình (giả)** như vậy. Điều này có thể làm tăng đáng kể chi phí bảo trì. Hơn nữa, mặc dù giả đa hình rõ ràng có thể mô phỏng hành vi của "đa kế thừa", nhưng nó chỉ làm tăng độ phức tạp và độ mong manh.

Kết quả của những cách tiếp cận như vậy thường là code phức tạp hơn, khó đọc hơn, *và* khó bảo trì hơn. **Nên tránh giả đa hình rõ ràng bất cứ khi nào có thể**, bởi vì chi phí lớn hơn lợi ích trong hầu hết các khía cạnh.

#### Mixing Copies

Nhớ lại utility `mixin(..)` ở trên:

```js
// vastly simplified `mixin()` example:
function mixin( sourceObj, targetObj ) {
	for (var key in sourceObj) {
		// only copy if not already present
		if (!(key in targetObj)) {
			targetObj[key] = sourceObj[key];
		}
	}

	return targetObj;
}
```

Bây giờ, hãy xem cách thức hoạt động của `mixin(..)`. Nó lặp lại các thuộc tính của `sourceObj` (`Vehicle` trong ví dụ của chúng ta) và nếu không có thuộc tính phù hợp với tên đó trong `targetObj` (`Car` trong ví dụ của chúng tôi), nó sẽ tạo một bản sao. Vì chúng ta đang tạo bản sao sau khi object ban đầu tồn tại, chúng ta cẩn thận không ghi đè thuộc tính đích.

Nếu chúng ta tạo các bản sao trước, trước khi chỉ định nội dung cụ thể của `Car`, chúng ta có thể bỏ qua bước kiểm tra này đối với `targetObj`, nhưng điều đó phức tạp hơn một chút và kém hiệu quả hơn, vì vậy nó thường ít được ưu tiên hơn:

```js
// alternate mixin, less "safe" to overwrites
function mixin( sourceObj, targetObj ) {
	for (var key in sourceObj) {
		targetObj[key] = sourceObj[key];
	}

	return targetObj;
}

var Vehicle = {
	// ...
};

// first, create an empty object with
// Vehicle's stuff copied in
var Car = mixin( Vehicle, { } );

// now copy the intended contents into Car
mixin( {
	wheels: 4,

	drive: function() {
		// ...
	}
}, Car );
```

Dù là cách tiếp cận nào, chúng ta cũng đã sao chép rõ ràng các nội dung không chồng chéo của `Vehicle` vào `Car`. Cái tên "mixin" bắt nguồn từ một cách khác để giải thích nhiệm vụ: `Car` có nội dung của `Vehicle` **được trộn lẫn**, giống như bạn trộn vụn sô cô la vào bột bánh quy yêu thích của mình.

Do thao tác sao chép, `Car` sẽ hoạt động hơi tách biệt với `Vehicle`. Nếu bạn thêm một thuộc tính vào `Car`, nó sẽ không ảnh hưởng đến `Vehicle` và ngược lại.

**Lưu ý:** Một vài chi tiết nhỏ đã được lướt qua ở đây. Vẫn còn một số cách tinh tế mà hai object có thể "ảnh hưởng" lẫn nhau ngay cả sau khi sao chép, chẳng hạn như nếu cả hai đều chia sẻ tham chiếu đến một object chung (chẳng hạn như một mảng).

Vì hai object cũng chia sẻ các tham chiếu đến các function chung của chúng, điều đó có nghĩa là **ngay cả việc sao chép thủ công các function (hay còn gọi là mixin) từ object này sang object khác không *thực sự mô phỏng* sự sao chép thực sự từ class tới instance điều mà xảy ra trong các ngôn ngữ class-oriented**.

Các function của JavaScript thực sự không thể được sao chép (theo cách tiêu chuẩn, đáng tin cậy), vì vậy, thay vào đó, bạn nhận được một **tham chiếu trùng lặp** cho cùng một function object được chia sẻ (các function là các object; xem Chương 3). Ví dụ: nếu bạn đã sửa đổi một trong các đối tượng **chức năng** được chia sẻ (như `ignition()`) bằng cách thêm các thuộc tính lên trên nó, thì cả `Vehicle` và `Car` sẽ bị "ảnh hưởng" thông qua tham chiếu được chia sẻ.

Mixins rõ ràng là một cơ chế tốt trong JavaScript. Nhưng chúng có vẻ mạnh mẽ hơn thực tế. Không có nhiều lợi ích *thực sự* thu được từ việc sao chép thuộc tính từ object này sang object khác, **trái ngược với việc chỉ xác định thuộc tính hai lần**, một lần trên mỗi đối tượng. Và điều đó đặc biệt đúng với sắc thái tham chiếu đối tượng hàm mà chúng ta vừa đề cập.

Nếu bạn kết hợp rõ ràng hai hoặc nhiều object vào object đích của mình, bạn có thể **mô phỏng một phần** hành vi của "đa thừa kế", nhưng không có cách trực tiếp nào để xử lý xung đột nếu cùng một phương thức hoặc thuộc tính được sao chép từ nhiều object khác hơn một nguồn. Một số nhà phát triển/thư viện đã đưa ra các kỹ thuật "late binding" và các cách giải quyết kỳ lạ khác, nhưng về cơ bản, những "thủ thuật" này *thường* tốn nhiều công sức hơn (và hiệu suất thấp hơn!) so với kết quả thu được.

Cẩn thận chỉ sử dụng mixin khi nó thực sự giúp code dễ đọc hơn và tránh pattern nếu bạn thấy nó khiến code khó theo dõi hơn hoặc nếu bạn thấy nó tạo ra các phụ thuộc không cần thiết hoặc khó sử dụng giữa các object.

**Nếu việc sử dụng mixin đúng cách bắt đầu trở nên *khó hơn* so với trước khi bạn sử dụng chúng**, thì có lẽ bạn nên ngừng sử dụng mixin. Trên thực tế, nếu bạn phải sử dụng một thư viện/utility phức tạp để tìm ra tất cả các chi tiết này, đó có thể là dấu hiệu cho thấy bạn đang thực hiện nó theo cách khó hơn, có lẽ là không cần thiết. Trong Chương 6, chúng ta sẽ cố gắng chắt lọc một cách đơn giản hơn để đạt được kết quả mong muốn mà không cần quá nhiều phiền phức.

#### Parasitic Inheritance (Kế Thừa Kí Sinh)

Một biến thể của mẫu mixin rõ ràng này, theo cả hai cách rõ ràng và theo những cách khác, được gọi là "parasitic inheritance (di truyền ký sinh)", được phổ biến chủ yếu bởi Douglas Crockford.

Đây là cách nó có thể hoạt động:

```js
// "Traditional JS Class" `Vehicle`
function Vehicle() {
	this.engines = 1;
}
Vehicle.prototype.ignition = function() {
	console.log( "Turning on my engine." );
};
Vehicle.prototype.drive = function() {
	this.ignition();
	console.log( "Steering and moving forward!" );
};

// "Parasitic Class" `Car`
function Car() {
	// first, `car` is a `Vehicle`
	var car = new Vehicle();

	// now, let's modify our `car` to specialize it
	car.wheels = 4;

	// save a privileged reference to `Vehicle::drive()`
	var vehDrive = car.drive;

	// override `Vehicle::drive()`
	car.drive = function() {
		vehDrive.call( this );
		console.log( "Rolling on all " + this.wheels + " wheels!" );
	};

	return car;
}

var myCar = new Car();

myCar.drive();
// Turning on my engine.
// Steering and moving forward!
// Rolling on all 4 wheels!
```

Như bạn có thể thấy, ban đầu chúng ta tạo một bản sao của định nghĩa từ "class cha" (object) `Vehicle`, sau đó mixin vào định nghĩa "class con" (object) của chúng ta (giữ nguyên các tham chiếu class cha đặc quyền nếu cần) và chuyển object `car` này làm instance con của chúng ta.

**Lưu Ý:** khi chúng ta gọi `new Car()`, một object được tạo và được tham chiếu bởi tham chiếu `this` của các `Car` (xem Chương 2). Nhưng vì chúng ta không sử dụng đối tượng đó mà thay vào đó trả về đối tượng `car` của riêng mình, nên đối tượng được tạo ban đầu sẽ bị loại bỏ. Vì vậy, `Car()` có thể được gọi mà không cần từ khóa `new` và function ở trên sẽ giống hệt nhau, nhưng không có việc tạo đối tượng/thu gom rác lãng phí.

### Implicit Mixins

Các implicit mixin có liên quan chặt chẽ với *explicit pseudo-polymorphism* như đã giải thích trước đây. Như vậy, chúng đi kèm với những cản trở và cảnh báo giống nhau.
Xem xét đoạn code này:

```js
var Something = {
	cool: function() {
		this.greeting = "Hello World";
		this.count = this.count ? this.count + 1 : 1;
	}
};

Something.cool();
Something.greeting; // "Hello World"
Something.count; // 1

var Another = {
	cool: function() {
		// implicit mixin of `Something` to `Another`
		Something.cool.call( this );
	}
};

Another.cool();
Another.greeting; // "Hello World"
Another.count; // 1 (not shared state with `Something`)
```

Với `Something.cool.call( this )`, có thể xảy ra trong lệnh gọi "constructor" (phổ biến nhất) hoặc trong lệnh gọi phương thức (hiển thị ở đây), về cơ bản, chúng ta "mượn" hàm `Something.cool()` và gọi nó trong ngữ cảnh của `Another` (thông qua ràng buộc `this` của nó; xem Chương 2) thay vì `Something`. Kết quả cuối cùng là các phép gán mà `Something.cool()` thực hiện được áp dụng cho đối tượng `Another` thay vì đối tượng `Something`.

Vì vậy, nó nói rằng chúng ta đã "trộn lẫn" hành vi của `Something` với (hoặc vào) `Another`.

Mặc dù loại kỹ thuật này dường như tận dụng lợi thế hữu ích của chức năng rebinding `this`, nhưng lệnh gọi `Something.cool.call(this )` dễ gãy, không thể được tạo thành tham chiếu tương đối (và do đó linh hoạt hơn), mà bạn nên **chú ý thận trọng**. Nói chung, **tránh các cấu trúc như vậy nếu có thể** để giữ mã sạch hơn và dễ bảo trì hơn.

## Review (TL;DR)

Các Class là một design pattern (mẫu thiết kế). Nhiều ngôn ngữ cung cấp cú pháp cho phép thiết kế phần mềm class-oriented tự nhiên. JS cũng có một cú pháp tương tự, nhưng nó hoạt động **rất khác** so với những gì bạn đã quen với các class trong các ngôn ngữ khác đó.

**Classes có nghĩa là bản sao.**

Khi các class truyền thống được khởi tạo, một bản sao của hành vi từ class sang instance xảy ra. Khi các class được kế thừa, một bản sao hành vi từ class cha sang class con cũng xảy ra.

Polymorphism (tính đa hình) (có các function khác nhau ở nhiều cấp độ của chuỗi thừa kế có cùng tên) có vẻ như ngụ ý một liên kết tương đối tham chiếu từ con trở lại cha, nhưng nó vẫn chỉ là kết quả của hành vi sao chép.

JavaScript **không tự động** tạo các bản sao (như các class ngụ ý) giữa các object.

Mixin pattern (bao gồm cả explicit và implicit) thường được sử dụng để *sắp xếp* mô phỏng hành vi sao chép của class, nhưng điều này thường dẫn đến cú pháp xấu và khó hiểu như explicit pseudo-polymorphism (`OtherObj.methodName.call(this, ...)`), thường dẫn đến khó khăn hơn để hiểu và bảo trì code.

Explicit mixins rõ ràng cũng không hoàn toàn giống với class *sao chép*, vì các object (và các function!) Chỉ có các tham chiếu dùng chung được sao chép, chứ không phải các object/function được sao chép chính chúng. Không chú ý đến sắc thái như vậy là nguồn gốc của nhiều vấn đề.

Nói chung, việc giả mạo các class trong JS thường đặt ra nhiều bom mìn cho code trong tương lai hơn là giải quyết các vấn đề *thực* hiện tại.
