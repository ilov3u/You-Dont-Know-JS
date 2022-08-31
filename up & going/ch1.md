# You Don't Know JS: Up & Going
# Chương 1: Tham Gia Vào Lập Trình 

Chào mừng đến loạt sách *You Don't Know JS* (*YDKJS*).

*Up & Going* là phần giới thiệu về một số khái niệm cơ bản về lập trình - tất nhiên chúng tôi nghiêng về JavaScript (thường được viết tắt là JS) cụ thể - và cách tiếp cận và hiểu phần còn lại của các tiêu đề trong loạt bài này. Đặc biệt nếu bạn mới bắt đầu học lập trình và / hoặc JavaScript, cuốn sách này sẽ khám phá ngắn gọn những gì bạn cần để *phát triển và tiến lên*.

Cuốn sách này bắt đầu giải thích các nguyên tắc cơ bản của lập trình ở cấp độ rất cao. Nó chủ yếu nhằm mục đích nếu bạn đang bắt đầu * YDKJS * với ít hoặc không có kinh nghiệm lập trình trước đó và đang tìm kiếm những cuốn sách này để giúp bạn bắt đầu con đường tìm hiểu lập trình thông qua lăng kính JavaScript.

Chương 1 nên được tiếp cận như một tổng quan nhanh về những điều bạn sẽ muốn tìm hiểu thêm và thực hành để *tham gia vào lập trình*. Ngoài ra còn có nhiều tài nguyên giới thiệu lập trình tuyệt vời khác có thể giúp bạn tìm hiểu sâu hơn về các chủ đề này và tôi khuyến khích bạn học từ chúng ngoài chương này.

Khi bạn cảm thấy thoải mái với những kiến ​​thức cơ bản về lập trình, Chương 2 sẽ giúp hướng dẫn bạn làm quen với hương vị lập trình của JavaScript. Chương 2 giới thiệu JavaScript là gì, nhưng một lần nữa, nó không phải là một hướng dẫn toàn diện - đó là phần còn lại của các cuốn sách *YDKJS* dành cho!

Nếu bạn đã khá thoải mái với JavaScript, trước tiên hãy xem Chương 3 như một cái nhìn sơ lược về những gì mong đợi từ *YDKJS*, sau đó bắt đầu ngay!

## Code

Hãy bắt đầu từ đầu.

Chương trình, thường được gọi là *mã nguồn(source code)* hoặc chỉ *mã(code)*, là một tập hợp các lệnh đặc biệt để cho máy tính biết các tác vụ cần thực hiện. Thông thường, mã được lưu trong tệp văn bản, mặc dù với JavaScript, bạn cũng có thể nhập mã trực tiếp vào bảng điều khiển dành cho nhà phát triển trong trình duyệt mà chúng tôi sẽ đề cập ngay sau đây.

Các quy tắc cho định dạng hợp lệ và kết hợp các hướng dẫn được gọi là *ngôn ngữ máy tính*, đôi khi được gọi là *cú pháp* của nó, giống như tiếng Anh cho bạn biết cách đánh vần các từ và cách tạo câu hợp lệ bằng cách sử dụng từ và dấu câu.

### Các câu lệnh

Trong ngôn ngữ máy tính, một nhóm từ, số và toán tử thực hiện một tác vụ cụ thể là một *câu lệnh*. Trong JavaScript, một câu lệnh có thể trông như sau:

```js
a = b * 2;
```

Các ký tự `a` và` b` được gọi là *biến* (xem "Biến"), giống như các hộp đơn giản mà bạn có thể lưu trữ bất kỳ thứ nào của mình. Trong chương trình, các biến giữ các giá trị (như số `42`) để được sử dụng bởi chương trình. Hãy coi chúng như các trình giữ chỗ tượng trưng cho chính các giá trị.

Ngược lại, `2` chỉ là một giá trị, được gọi là *giá trị theo nghĩa đen*, bởi vì nó đứng một mình mà không được lưu trữ trong một biến.

Các ký tự `=` và `*` là *toán tử* (xem "Toán tử") - chúng thực hiện các hành động với các giá trị và biến như phép gán và phép nhân toán học.

Hầu hết các câu lệnh trong JavaScript đều kết thúc bằng dấu chấm phẩy (`; ') ở cuối.

Câu lệnh `a = b * 2;` nói với máy tính, đại khái, lấy giá trị hiện tại được lưu trữ trong biến `b`, nhân giá trị đó với` 2`, sau đó lưu trữ lại kết quả vào một biến khác mà chúng ta gọi là `a`.

Chương trình chỉ là tập hợp của nhiều câu lệnh như vậy, cùng nhau mô tả tất cả các bước cần thiết để thực hiện mục đích chương trình của bạn.

### Biểu thức

Các câu lệnh được tạo thành từ một hoặc nhiều *biểu thức*. Một biểu thức là bất kỳ tham chiếu nào đến một biến hoặc giá trị hoặc một tập hợp (các) biến và (các) giá trị được kết hợp với các toán tử.

Cho ví dụ:

```js
a = b * 2;
```

Câu lệnh này có bốn biểu thức trong đó:

* `2` là một *biểu thức giá trị theo nghĩa đen*
* `b` là một *biểu thức biến*, có nghĩa là lấy lại giá trị hiện tại của nó
* `b * 2` là một *biểu thức số học*, có nghĩa là thực hiện phép nhân
* `a = b * 2` là một *biểu thức gán*, nghĩa là gán kết quả của biểu thức `b * 2` vào biến `a` (nhiều hơn về bài tập sau này)

Một biểu thức tổng quát đứng một mình còn được gọi là *câu lệnh biểu thức*, chẳng hạn như sau:

```js
b * 2;
```

Biểu thức này không phổ biến hoặc hữu ích lắm, vì nói chung nó sẽ không ảnh hưởng gì đến việc chạy chương trình - nó sẽ lấy giá trị của `b` và nhân nó với` 2`, nhưng sau đó sẽ không làm bất cứ điều gì với kết quả đó.

Một câu lệnh biểu thức phổ biến hơn là câu lệnh *biểu thức gọi* (xem "Functions"), vì toàn bộ câu lệnh là chính biểu thức gọi hàm:

```js
alert( a );
```

### Thực thi một chương trình

Làm thế nào để tập hợp các câu lệnh lập trình đó cho máy tính biết phải làm gì? Chương trình cần được *thực thi*, còn được gọi là *chạy chương trình*.

Các câu lệnh như `a = b * 2` hữu ích cho các nhà phát triển khi đọc và viết, nhưng không thực sự ở dạng mà máy tính có thể hiểu trực tiếp. Vì vậy, một tiện ích đặc biệt trên máy tính (có thể là *thông dịch* hoặc *biên dịch*) được sử dụng để dịch mã bạn viết thành các lệnh mà máy tính có thể hiểu được.

Đối với một số ngôn ngữ máy tính, việc dịch các lệnh này thường được thực hiện từ trên xuống dưới, từng dòng một, mỗi khi chương trình được chạy, thường được gọi là *thông dịch* mã.

Đối với các ngôn ngữ khác, bản dịch được thực hiện trước, được gọi là *biên dịch* mã, vì vậy khi chương trình *chạy* sau đó, những gì đang chạy thực sự là các hướng dẫn máy tính đã được biên dịch sẵn sàng hoạt động.

Nó thường khẳng định rằng JavaScript được *thông dịch*, bởi vì mã nguồn JavaScript của bạn được xử lý mỗi khi nó chạy. Nhưng điều đó không hoàn toàn chính xác. Công cụ JavaScript thực sự *biên dịch* chương trình một cách nhanh chóng và sau đó ngay lập tức chạy mã đã biên dịch.

**Lưu ý:** Để biết thêm thông tin về biên dịch JavaScript, hãy xem hai chương đầu tiên của tiêu đề *Scope & Closures* của loạt bài này.

## Hãy tự mình thử

Chương này sẽ giới thiệu từng khái niệm lập trình với các đoạn mã đơn giản, tất cả đều được viết bằng JavaScript (hiển nhiên!).

Nó không thể được nhấn mạnh đủ: trong khi bạn xem qua chương này - và bạn có thể cần dành thời gian để xem lại nó nhiều lần - bạn nên thực hành từng khái niệm này bằng cách tự gõ mã. Cách dễ nhất để làm điều đó là mở bảng điều khiển công cụ dành cho nhà phát triển trong trình duyệt gần nhất của bạn (Firefox, Chrome, IE, v.v.).

**Mẹo:** Thông thường, bạn có thể khởi chạy bảng điều khiển dành cho nhà phát triển bằng phím tắt hoặc từ một mục menu. Để biết thêm thông tin chi tiết về cách khởi chạy và sử dụng bảng điều khiển trong trình duyệt yêu thích của bạn, hãy xem "Mastering The Developer Tools Console" (http://blog.teamtreehouse.com/mastering-developer-tools-console). Để nhập nhiều dòng vào bảng điều khiển cùng một lúc, hãy sử dụng `<shift> + <enter>` để chuyển sang dòng mới tiếp theo. Sau khi bạn nhấn `<enter>` của chính nó, bảng điều khiển sẽ chạy mọi thứ bạn vừa nhập.

Hãy làm quen với quá trình chạy mã trong bảng điều khiển. Đầu tiên, tôi khuyên bạn nên mở một tab trống trong trình duyệt của mình. Tôi thích làm điều này hơn bằng cách gõ `about: blank` vào thanh địa chỉ. Sau đó, hãy đảm bảo bảng điều khiển dành cho nhà phát triển của bạn đang mở, như chúng tôi vừa đề cập.

Bây giờ, hãy nhập mã này và xem nó chạy như thế nào:

```js
a = 21;

b = a * 2;

console.log( b );
```

Nhập mã trước đó vào bảng điều khiển trong Chrome sẽ tạo ra một cái gì đó giống như sau:

<img src="fig1.png" width="500">

Tiếp tục, thử nó. Cách tốt nhất để học lập trình là bắt đầu viết mã!

### Output

Trong đoạn mã trước, chúng tôi đã sử dụng `console.log (..)`. Tóm lại, hãy xem dòng mã đó là gì.

Bạn có thể đoán, nhưng đó chính xác là cách chúng tôi in văn bản (còn gọi là *output(đầu ra)* cho người dùng) trong bảng điều khiển dành cho nhà phát triển. Có hai đặc điểm của câu nói đó mà chúng ta nên giải thích.

Đầu tiên, phần `log(b)` được gọi là một lời gọi hàm (xem "Functions"). Điều gì đang xảy ra là chúng ta đang giao biến `b` cho hàm đó, yêu cầu nó nhận giá trị của `b` và in nó ra bảng điều khiển.

Thứ hai, phần `console.` là một tham chiếu đối tượng nơi chứa hàm `log(..) `. Chúng tôi trình bày chi tiết hơn về các đối tượng và thuộc tính của chúng trong Chương 2.

Một cách khác để tạo đầu ra mà bạn có thể thấy là chạy câu lệnh `alert (..)`. Ví dụ:

```js
alert( b );
```

Nếu bạn chạy nó, bạn sẽ để ý thấy thay vì in output ở bảng điều khiển, nó hiển thị một hộp bật lên "OK" với nội dung của biến `b`. Tuy nhiên, sử dụng `console.log(..)` nói chung sẽ làm cho việc học về lập trình và chạy các chương trình của bạn trong bảng điều khiển dễ dàng hơn so với việc sử dụng `alert (..)`, vì bạn có thể xuất nhiều giá trị cùng một lúc mà không làm gián đoạn giao diện trình duyệt.

Trong sách này, chúng ta sẽ sử dụng `console.log(..)` cho output.

### Input

Trong khi chúng ta đang thảo luận về output, bạn cũng có thể thắc mắc về *input* (tức là nhận thông tin từ người dùng).

Cách phổ biến nhất xảy ra là trang HTML hiển thị các phần tử biểu mẫu (như text boxes(hộp văn bản)) cho người dùng mà họ có thể nhập vào và sau đó sử dụng JS để đọc các giá trị đó vào các biến chương trình của bạn.

Nhưng có một cách dễ dàng hơn để lấy đầu vào cho các mục đích học tập và trình diễn đơn giản, chẳng hạn như những gì bạn sẽ làm trong suốt cuốn sách này. Sử dụng hàm `prompt(..)`:

```js
age = prompt( "Please tell me your age:" );

console.log( age );
```

Như bạn có thể đã đoán, tin nhắn bạn chuyển đến `prompt(..)` -- trong trường hợp này, `"Please tell me your age:"` -- được in vào cửa sổ bật lên.

Điều này sẽ tương tự như sau:

<img src="fig2.png" width="500">

Khi bạn gửi văn bản đầu vào bằng cách nhấp vào "OK", bạn sẽ thấy rằng giá trị bạn đã nhập được lưu trữ trong biến `age`, sau đó chúng tôi *output* với `console.log(..)`:

<img src="fig3.png" width="500">

Để giữ mọi thứ đơn giản trong khi chúng ta đang học các khái niệm lập trình cơ bản, các ví dụ trong cuốn sách này sẽ không yêu cầu đầu vào. Nhưng bây giờ bạn đã thấy cách sử dụng `prompt(..)`, nếu bạn muốn thử thách bản thân, bạn có thể thử sử dụng input để khám phá các ví dụ.

## Operators(Toán tử)

Toán tử là cách chúng ta thực hiện các hành động trên các biến và giá trị. Chúng tôi đã thấy hai toán tử JavaScript, dấu `=` và dấu `*`.

Toán tử `*` thực hiện phép nhân toán học. Đủ đơn giản để hiểu, phải không?

Toán tử bằng `=` được sử dụng cho *việc gán(assignment)* -- trước tiên chúng ta tính toán giá trị ở *bên phải* (giá trị nguồn) của dấu `=` và sau đó đặt nó vào biến mà chúng ta chỉ định ở *bên trái* (biến mục tiêu).

**Cảnh báo:** Đây có vẻ như là một thứ tự ngược lại kỳ lạ để chỉ định nhiệm vụ. Thay vì `a = 42`, một số có thể thích lật thứ tự để giá trị nguồn ở bên trái và biến đích ở bên phải, như `42 -> a` (đây không phải là JavaScript hợp lệ!). Thật không may, dạng có thứ tự `a = 42` và các biến thể tương tự, khá phổ biến trong các ngôn ngữ lập trình hiện đại. Nếu cảm thấy không tự nhiên, chỉ cần dành thời gian tập dượt thứ tự đó trong đầu để quen với nó.

Để ý:

```js
a = 2;
b = a + 1;
```

Ở đây, chúng tôi gán giá trị `2` cho biến` a`. Sau đó, chúng ta lấy giá trị của biến `a` (vẫn là` 2`), thêm `1` vào nó dẫn đến giá trị` 3`, sau đó lưu trữ giá trị đó trong biến `b`.

Mặc dù về mặt kỹ thuật không phải là toán tử, nhưng bạn sẽ cần từ khóa `var` trong mọi chương trình, vì đó là cách chính bạn *declare(khai báo)* (hay còn gọi là *tạo*) *var*iables (xem "Variables").

Bạn luôn phải khai báo biến theo tên trước khi sử dụng. Nhưng bạn chỉ cần khai báo một biến một lần cho mỗi *scope(phạm vi)* (xem "Scope"); nó có thể được sử dụng nhiều lần sau đó nếu cần.
Ví dụ:

```js
var a = 20;

a = a + 1;
a = a * 2;

console.log( a );	// 42
```

Dưới đây là một số toán tử phổ biến nhất trong JavaScript:

* Assignment(Phép gán): `=` như trong `a = 2`.
* Math(Toán học): `+` (addition, cộng), `-` (subtraction, trừ), `*` (multiplication, nhân), và  `/` (division, chia), như trong `a * 3`.
* Compound Assignment(Phép gán ghép): `+=`, `-=`, `*=`, và `/=` là các toán tử ghép kết hợp phép toán với phép gán, như trong `a += 2` (tương tự như `a = a + 2`).
* Increment/Decrement(Tăng giảm): `++` (increment, tăng), `--` (decrement, giảm), như trong `a++` (tương tự với `a = a + 1`).
* Object Property Access(Truy cập thuộc tính đối tượng): `.` như trong `console.log()`.

   Đối tượng(Object) là các giá trị chứa các giá trị khác tại các vị trí được đặt tên cụ thể được gọi là thuộc tính. `obj.a` có nghĩa là một giá trị đối tượng được gọi là `obj` với một thuộc tính có tên là `a`. Các thuộc tính có thể được truy cập theo cách khác như `obj["a"]`. Xem trong Chương 2.
* Equality(bằng): `==` (loose-equals, bằng giá trị), `===` (strict-equals, bằng giá trị và kiểu dữ liệu), `!=` (loose not-equals, không bằng giá trị), `!==` (strict not-equals, không bằng giá trị và kiểu dữ liệu), như trong `a == b`.

   Xem thêm "Values & Types" và Chương 2.
* Comparison(So sánh): `<` (less than, ít hơn), `>` (greater than, lớn hơn), `<=` (less than or loose-equals, ít hơn hoặc bằng), `>=` (greater than or loose-equals, lớn hơn hoặc bằng), như trong `a <= b`.

   Xem thêm "Values & Types" và Chương 2.
* Logical: `&&` (and), `||` (or), như trong `a || b` chọn một trong hai `a` *hoặc* `b`.

   Các toán tử này được sử dụng để thể hiện các điều kiện ghép (xem "Conditionals"), như nếu `a` *hoặc*` b` là true.

**Lưu ý:** Để biết thêm chi tiết và phạm vi của các nhà khai thác không được đề cập ở đây, hãy xem Mozilla Developer Network (MDN)'s "Expressions and Operators" (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators).

## Values & Types(Giá trị & Kiểu dữ liệu)

Nếu bạn hỏi nhân viên tại một cửa hàng điện thoại giá một chiếc điện thoại nhất định là bao nhiêu và họ nói "chín mươi chín, chín mươi chín" (tức là 99,99 đô la), họ sẽ đưa cho bạn một con số đô la thực tế đại diện cho những gì bạn sẽ cần phải trả (cộng với thuế) để mua nó. Nếu bạn muốn mua hai trong số những chiếc điện thoại đó, bạn có thể dễ dàng tính nhẩm để nhân đôi giá trị đó để nhận được $ 199,98 cho chi phí cơ bản của bạn.

Nếu cùng một nhân viên đó chọn một chiếc điện thoại tương tự khác nhưng nói rằng nó "miễn phí" (có thể kèm theo dấu ngoặc kép), họ sẽ không cung cấp cho bạn một con số, mà thay vào đó là một loại đại diện khác về chi phí dự kiến của bạn ($ 0,00) - từ "miễn phí."

Sau đó, khi bạn hỏi điện thoại có bộ sạc hay không, câu trả lời đó chỉ có thể là "có" hoặc "không".

Theo những cách rất giống nhau, khi bạn thể hiện các giá trị trong một chương trình, bạn chọn các cách biểu diễn khác nhau cho các giá trị đó dựa trên những gì bạn định làm với chúng.

Các đại diện khác nhau cho các giá trị này được gọi là *types(loại hoặc kiểu)* trong thuật ngữ lập trình. JavaScript có các kiểu tích hợp cho mỗi kiểu này được gọi là giá trị *nguyên thủy(primitive)*:

* Khi bạn cần làm toán, bạn muốn một `số(number)`.
* Khi bạn cần in một giá trị trên màn hình, bạn cần một `chuỗi(string)` (một hoặc nhiều kí tự, nhiều từ, nhiều câu).
* Khi bạn muốn làm một quyết định trong chương trình của bạn, bạn cần một `boolean` (`true` hoặc `false`).

Các giá trị được bao gồm trực tiếp trong mã nguồn được gọi là *literals*. `string` literals được bao quanh bởi dấu ngoặc kép `"..."` hoặc ngoặc đơn (`'...'`) -- sự khác biệt duy nhất là sở thích phong cách. `number` và `boolean` literals chỉ được trình bày như hiện tại (i.e., `42`, `true`, etc.).

Để ý:

```js
"I am a string";
'I am also a string';

42;

true;
false;
```

Ngoài các kiểu giá trị `string`/`number`/`boolean`, ngôn ngữ lập trình cung cấp *arrays*, *objects*, *functions*, và hơn nữa. Chúng tôi sẽ trình bày nhiều hơn về các giá trị và loại trong suốt chương này và phần tiếp theo.

### Chuyển Đổi Giữa Các Kiểu Dữ Liệu 

Nếu bạn có một `số(number)` nhưng cần in nó trên màn hình, bạn cần chuyển đổi giá trị thành `chuỗi(string)` và trong JavaScript, chuyển đổi này được gọi là "ép buộc(coercion)". Tương tự, nếu ai đó nhập một chuỗi ký tự số vào một biểu mẫu trên trang thương mại điện tử, đó là `chuỗi(string)`, nhưng nếu bạn cần sau đó sử dụng giá trị đó để thực hiện các phép toán, bạn cần phải *ép buộc(coercion)* nó thành một `số(number)`.

JavaScript cung cấp một số phương tiện khác nhau để ép buộc giữa các *kiểu(type)*. Ví dụ:

```js
var a = "42";
var b = Number( a );

console.log( a );	// "42"
console.log( b );	// 42
```

Sử dụng `Number(..)` (a built-in function, một hàm tích hợp) như được hiển thị là sự ép kiểu *tường minnh(explicit)* từ bất kỳ kiểu nào khác đối với kiểu `số`. Điều đó sẽ khá đơn giản.

Nhưng một chủ đề gây tranh cãi là điều gì sẽ xảy ra khi bạn cố gắng so sánh hai giá trị không cùng loại, điều này sẽ yêu cầu sự ép kiểu *ngầm định(implicit)*.

Khi so sánh chuỗi `"99,99"` với số `99,99`, hầu hết mọi người sẽ đồng ý rằng chúng tương đương nhau. Nhưng chúng không hoàn toàn giống nhau, phải không? Nó có cùng một giá trị trong hai biểu diễn khác nhau, hai *kiểu* khác nhau. Bạn có thể nói nó "bằng nhau một cách lỏng lẻo", phải không?

Để giúp bạn trong những trường hợp phổ biến này, JavaScript đôi khi sẽ khởi động và *ngầm định(implicitly)* ép kiểu các giá trị cho các loại đối sánh.

Vì vậy, nếu bạn sử dụng toán tử `==` lỏng bằng bằng để so sánh `" 99,99 "== 99,99`, JavaScript sẽ chuyển đổi bên trái `"99,99" `thành `number` tương đương `99,99` của nó. So sánh sau đó trở thành `99,99 == 99,99`, tất nhiên là `true`.

Mặc dù được thiết kế để giúp bạn, nhưng sự ép kiểu ngầm định có thể tạo ra sự nhầm lẫn nếu bạn không dành thời gian để tìm hiểu các quy tắc chi phối hành vi của nó. Hầu hết các nhà phát triển JS không bao giờ có, vì vậy cảm giác chung là sự ép kiểu ngầm gây nhầm lẫn và gây hại cho các chương trình với các lỗi không mong muốn, và do đó nên tránh. Nó thậm chí đôi khi được gọi là một lỗ hổng trong thiết kế của ngôn ngữ.

Tuy nhiên, ép kiểu ngầm định là một cơ chế *có thể học được* và hơn thế nữa *nên được học* bởi bất kỳ ai muốn học lập trình JavaScript một cách nghiêm túc. Nó không chỉ không gây nhầm lẫn khi bạn học các quy tắc mà còn có thể làm cho chương trình của bạn tốt hơn! Nỗ lực rất xứng đáng.

**Lưu ý:** Để biết thêm thông tin về ép kiểu, hãy xem Chương 2 của sách này và Chương 4 của sách *Types & Grammar* của loạt bài này.

## Code Comments

Nhân viên cửa hàng điện thoại có thể ghi lại một số ghi chú về các tính năng của điện thoại mới phát hành hoặc về các kế hoạch mới mà công ty của cô ấy đưa ra. Những ghi chú này chỉ dành cho nhân viên - chúng không dành cho khách hàng đọc. Tuy nhiên, những ghi chú này giúp nhân viên thực hiện công việc của mình tốt hơn bằng cách ghi lại cách thức và lý do của những gì cô ấy nên nói với khách hàng.

Một trong những bài học quan trọng nhất bạn có thể học về cách viết mã là nó không chỉ dành cho máy tính. Mã nhiều hơn một chút, nếu không muốn nói là nhiều hơn, đối với nhà phát triển cũng như đối với trình biên dịch.

Máy tính của bạn chỉ quan tâm đến mã máy, một chuỗi các số 0 và 1 nhị phân, đến từ *biên dịch*. Có một số lượng gần như vô hạn các chương trình mà bạn có thể viết mang lại cùng một chuỗi các số 0 và 1. Những lựa chọn bạn thực hiện về cách viết chương trình của mình rất quan trọng - không chỉ đối với bạn, mà còn với các thành viên khác trong nhóm của bạn và thậm chí với cả bản thân bạn trong tương lai.

Bạn nên cố gắng không chỉ để viết các chương trình hoạt động chính xác, mà còn là các chương trình có ý nghĩa khi được kiểm tra. Bạn có thể đi một chặng đường dài trong nỗ lực đó bằng cách chọn tên hay cho các biến của mình (xem "Variables") và hàm (xem "Functions").

Tuy nhiên một phần quan trọng khác là comment code. Đây là những đoạn văn bản trong chương trình của bạn được chèn vào để giải thích cho mọi người. Trình thông dịch/trình biên dịch sẽ luôn bỏ qua những comment này.

Có rất nhiều ý kiến về những gì tạo nên mã được commnent tốt; chúng ta không thể thực sự xác định các quy tắc phổ quát tuyệt đối. Nhưng một số quan sát và hướng dẫn khá hữu ích:

* Mã không có comment là không tối ưu.
* Quá nhiều comment (ví dụ: một comment trên mỗi dòng) có thể là dấu hiệu của mã được viết kém.
* Nhận xét phải giải thích *tại sao(why)*, không phải *cái gì(what)*. Họ có thể tùy ý giải thích *cách làm(how)* nếu điều đó đặc biệt khó hiểu.

Trong JavaScript, có thể có hai loại comment: comment một dòng và comment nhiều dòng.

Để ý:

```js
// This is a single-line comment

/* But this is
       a multiline
             comment.
                      */
```

Comment một dòng `//` thích hợp nếu bạn định đặt một comment ngay phía trên một câu lệnh hoặc thậm chí ở cuối dòng. Mọi thứ trên dòng sau dấu `//` được coi là comment (và do đó bị trình biên dịch bỏ qua), cho đến cuối dòng. Không có giới hạn đối với những gì có thể xuất hiện bên trong một comment một dòng.

Để ý:

```js
var a = 42;		// 42 is the meaning of life
```

Comment nhiều dòng `/ * .. * /` thích hợp nếu bạn có một số dòng cần giải thích trong comment của mình.

Đây là cách sử dụng phổ biến của comment nhiều dòng:

```js
/* The following value is used because
   it has been shown that it answers
   every question in the universe. */
var a = 42;
```

Nó cũng có thể xuất hiện ở bất kỳ đâu trên một dòng, ngay cả ở giữa dòng, vì dấu `* /` kết thúc nó. Ví dụ:

```js
var a = /* arbitrary value */ 42;

console.log( a );	// 42
```

Điều duy nhất không thể xuất hiện bên trong một comment nhiều dòng là dấu `* /`, bởi vì điều đó sẽ được hiểu là để kết thúc comment.

Bạn chắc chắn sẽ muốn bắt đầu học lập trình bằng cách bắt đầu với thói quen comment code. Trong suốt phần còn lại của chương này, bạn sẽ thấy tôi sử dụng các comment để giải thích mọi thứ, vì vậy hãy làm như vậy trong thực tế của riêng bạn. Tin tôi đi, mọi người đọc code của bạn sẽ cảm ơn bạn!

## Variables(Biến)

Hầu hết các chương trình hữu ích cần phải theo dõi một giá trị khi nó thay đổi trong quá trình của chương trình, trải qua các hoạt động khác nhau như được yêu cầu bởi các nhiệm vụ dự định của chương trình của bạn.

Cách dễ nhất để thực hiện điều đó trong chương trình của bạn là gán một giá trị cho một vùng chứa tượng trưng, được gọi là *variale(biến)* - được gọi như vậy vì giá trị trong vùng chứa này có thể *thay đổi* theo thời gian khi cần thiết.

Trong một số ngôn ngữ lập trình, bạn khai báo một biến (vùng chứa) để chứa một loại giá trị cụ thể, chẳng hạn như `số(number)` hoặc`chuỗi(string)`. *Nhập tĩnh(Static typing)*, còn được gọi là *kiểu bắt buộc(type enforcement)*, thường được coi là một lợi ích cho tính đúng đắn của chương trình bằng cách ngăn chặn các chuyển đổi giá trị không mong muốn.

Các ngôn ngữ khác nhấn mạnh các kiểu cho các giá trị thay vì các biến. *Nhập yếu(Weak typing)*, còn được gọi là *nhập động(dynamic typing)*, cho phép một biến giữ bất kỳ loại giá trị nào vào bất kỳ lúc nào. Nó thường được trích dẫn như một lợi ích cho tính linh hoạt của chương trình bằng cách cho phép một biến duy nhất đại diện cho một giá trị bất kể dạng giá trị nào mà giá trị đó có thể nhận vào bất kỳ thời điểm nhất định nào trong luồng logic của chương trình.

JavaScript sử dụng cách tiếp cận thứ hai, *nhập động*, nghĩa là các biến có thể giữ các giá trị thuộc bất kỳ *kiểu(type)* nào mà không cần bắt buộc *kiểu(type)* nào.

Như đã đề cập trước đó, chúng ta khai báo một biến bằng câu lệnh `var` - lưu ý rằng không có thông tin *kiểu(type)* nào khác trong khai báo. Hãy xem xét chương trình đơn giản này:

```js
var amount = 99.99;

amount = amount * 2;

console.log( amount );		// 199.98

// convert `amount` to a string, and
// add "$" on the beginning
amount = "$" + String( amount );

console.log( amount );		// "$199.98"
```

Biến `amount` bắt đầu giữ số `99,99`, sau đó giữ kết quả `số(number)` của `amount * 2`, là `199,98`.

Lệnh `console.log (..)` đầu tiên phải ép kiểu *ngầm định(implicitly)* giá trị `number` đó thành một` string` để in nó ra.

Sau đó, câu lệnh `amount =" $ "+ String( amount )` ép kiểu *tường minh(explicitly)* giá trị `199,98` thành một `string` và thêm một ký tự `"$"`vào đầu. Tại thời điểm này, `amount` bây giờ chứa `string` có giá trị là `"$ 199,98"`, vì vậy câu lệnh `console.log (..) `thứ hai không cần phải thực hiện bất kỳ sự ép kiểu nào để in nó ra.

Các nhà phát triển JavaScript sẽ lưu ý sự linh hoạt của việc sử dụng biến số `amount` cho mỗi giá trị `99,99`, `199,98` và `"$ 199,98"`. Những người đam mê nhập tĩnh sẽ thích một biến riêng biệt như `amountStr` để giữ biểu diễn cuối cùng của giá trị `"$ 199,98"`, bởi vì nó là một kiểu khác.

Dù bằng cách nào, bạn sẽ lưu ý rằng `số lượng` giữ một giá trị đang chạy thay đổi trong quá trình của chương trình, minh họa mục đích chính của các biến: quản lý *trạng thái(state)* chương trình.

Nói cách khác, *trạng thái(state)* đang theo dõi các thay đổi đối với các giá trị khi chương trình của bạn chạy.

Một cách sử dụng phổ biến khác của các biến là thiết lập giá trị tập trung. Điều này thường được gọi là *hằng số(constants)*, khi bạn khai báo một biến với một giá trị và định cho giá trị đó *không thay đổi(not change)* trong suốt chương trình.

Bạn khai báo các *hằng số(constants)* này, thường ở đầu chương trình, để thuận tiện cho bạn khi có một nơi để đi đến thay đổi giá trị nếu bạn cần. Theo quy ước, các biến JavaScript dưới dạng hằng số thường được viết hoa, với dấu gạch dưới `_` giữa nhiều từ.

Đây là một ví dụ ngớ ngẩn:

```js
var TAX_RATE = 0.08;	// 8% sales tax

var amount = 99.99;

amount = amount * 2;

amount = amount + (amount * TAX_RATE);

console.log( amount );				// 215.9784
console.log( amount.toFixed( 2 ) );	// "215.98"
```

**Ghi chú:** Tương tự như cách `console.log (..)` là một hàm `log(..)` được truy cập như một thuộc tính đối tượng trên giá trị `console`,` toFixed (..) `đây là một hàm có thể được truy cập vào các giá trị `số(number)`. JavaScript `number` không được định dạng tự động cho đô la - công cụ không biết mục đích của bạn là gì và không có loại cho tiền tệ. `toFixed (..)` cho phép chúng tôi chỉ định có bao nhiêu chữ số thập phân mà chúng tôi muốn `number(số)` được làm tròn thành và nó tạo ra `string(chuỗi)` khi cần thiết.

Biến `TAX_RATE` chỉ là *hằng số(constant)* theo quy ước - không có gì đặc biệt trong chương trình này ngăn nó bị thay đổi. Nhưng nếu thành phố tăng thuế suất bán hàng lên 9%, chúng tôi vẫn có thể dễ dàng cập nhật chương trình của mình bằng cách đặt giá trị được chỉ định `TAX_RATE` thành` 0,09` ở một nơi, thay vì tìm thấy nhiều lần xuất hiện của giá trị `0,08` rải rác trong lập trình và cập nhật tất cả chúng.

Phiên bản JavaScript mới nhất tại thời điểm viết bài này (thường được gọi là "ES6") bao gồm một cách mới để khai báo *hằng số(constant)*, bằng cách sử dụng `const` thay vì `var`:

```js
// as of ES6:
const TAX_RATE = 0.08;

var amount = 99.99;

// ..
```

Hằng số hữu ích giống như các biến có giá trị không thay đổi, ngoại trừ việc hằng số cũng ngăn chặn việc vô tình thay đổi giá trị ở nơi khác sau cài đặt ban đầu. Nếu bạn cố gắng gán bất kỳ giá trị nào khác cho `TAX_RATE` sau lần khai báo đầu tiên đó, chương trình của bạn sẽ từ chối thay đổi (và ở strict mode(chế độ nghiêm ngặt), không thành công với lỗi - xem "Strict Mode" trong Chương 2).

Nhân tiện, kiểu "bảo vệ" chống lại lỗi đó cũng tương tự như kiểu thực thi kiểu gõ tĩnh, vì vậy bạn có thể thấy tại sao kiểu tĩnh trong các ngôn ngữ khác có thể hấp dẫn!

**Ghi chú:** Để biết thêm thông tin về cách các giá trị khác nhau trong các biến có thể được sử dụng trong chương trình của bạn, hãy xem tập *Types & Grammar* của bộ sách này.

## Blocks(Khối lệnh)

Nhân viên cửa hàng điện thoại phải thực hiện một loạt các bước để hoàn tất việc thanh toán khi bạn mua điện thoại mới.

Tương tự, trong code chúng ta thường cần nhóm một loạt các câu lệnh lại với nhau, mà chúng ta thường gọi là *khối(block)*. Trong JavaScript, một block(khối) được định nghĩa bằng cách gói một hoặc nhiều câu lệnh bên trong cặp ngoặc nhọn `{..}`. Xem xét:

```js
var amount = 99.99;

// a general block
{
	amount = amount * 2;
	console.log( amount );	// 199.98
}
```

Kiểu khối `{..}` đứng độc lập này hợp lệ, nhưng không thường thấy trong các chương trình JS. Thông thường, các khối được đính kèm với một số câu lệnh điều khiển khác, chẳng hạn như câu lệnh `if` (xem "Conditionals(Điều kiện)") hoặc một vòng lặp (xem "Loops(Vòng lặp)"). Ví dụ:

```js
var amount = 99.99;

// is amount big enough?
if (amount > 10) {			// <-- block attached to `if`
	amount = amount * 2;
	console.log( amount );	// 199.98
}
```

Chúng tôi sẽ giải thích các câu lệnh `if` trong phần tiếp theo, nhưng như bạn có thể thấy, khối(block) `{..}`với hai câu lệnh của nó được đính kèm với `if (amount > 10) `; các câu lệnh bên trong khối(block) sẽ chỉ được xử lý nếu điều kiện thoả mãn.

**Ghi chú:** Không giống như hầu hết các câu lệnh khác như `console.log (amount);`, một khối(block) không cần dấu chấm phẩy (`;`) để kết thúc nó.

## Conditionals(Điều kiện)

"Bạn có muốn thêm miếng dán bảo vệ màn hình bổ sung vào giao dịch mua của mình, với giá 9,99 đô la không?" Nhân viên cửa hàng điện thoại hữu ích đã yêu cầu bạn đưa ra quyết định. Và trước tiên bạn có thể cần tham khảo *trạng thái(state)* hiện tại của ví hoặc tài khoản ngân hàng của mình để trả lời câu hỏi đó. Nhưng rõ ràng, đây chỉ là một câu hỏi đơn giản "có hoặc không".

Có khá nhiều cách chúng ta có thể thể hiện *điều kiện* (hay còn gọi là quyết định) trong chương trình của mình.

Câu lệnh phổ biến nhất là câu lệnh `if`. Về cơ bản, bạn đang nói, "*Nếu* điều kiện này là đúng, hãy làm như sau ...". Ví dụ:

```js
var bank_balance = 302.13;
var amount = 99.99;

if (amount < bank_balance) {
	console.log( "I want to buy this phone!" );
}
```

Câu lệnh `if` yêu cầu một biểu thức ở giữa các dấu ngoặc đơn `()`có thể được coi là `true` hoặc `false`. Trong chương trình này, chúng tôi đã cung cấp biểu thức `amount < bank_balance`, thực sự sẽ đánh giá thành `true` hoặc `false` tùy thuộc vào số tiền trong biến `bank_balance`.

Bạn thậm chí có thể cung cấp một giải pháp thay thế nếu điều kiện không đúng, được gọi là mệnh đề `else`. Xem xét:

```js
const ACCESSORY_PRICE = 9.99; // Giá trang sức

var bank_balance = 302.13; // Số dư ngân hàng
var amount = 99.99; // Số tiền tổng cộng

amount = amount * 2;

// can we afford the extra purchase?
if ( amount < bank_balance ) {
	console.log( "I'll take the accessory!" );
	amount = amount + ACCESSORY_PRICE;
}
// otherwise:
else {
	console.log( "No, thanks." );
}
```

Ở đây, nếu `amount < bank_balance` là `true`, chúng ta sẽ in ra `"I'll take the accessory!"` và thêm `9.99` cho biến `amount`. Nếu không, mệnh đề `else` cho biết chúng ta sẽ chỉ trả lời một cách lịch sự bằng `"Không, cảm ơn"`. Và giữ nguyên `amount`.

Như chúng ta đã thảo luận trong phần "Values & Types" trước đó, các giá trị không thuộc kiểu mong đợi thường bị ép kiểu vào kiểu đó. Câu lệnh `if` yêu cầu một `boolean`, nhưng nếu bạn chuyển nó vào một thứ gì đó chưa phải là `boolean`, thì sự ép kiểu sẽ xảy ra.

JavaScript định nghĩa một danh sách các giá trị cụ thể được coi là "falsy" vì khi bị ép kiểu thành `boolean`, chúng sẽ trở thành `false` - những giá trị này bao gồm các giá trị như `0` và `""`. Bất kỳ giá trị nào khác không có trong danh sách "falsy" sẽ tự động là "true" - khi bị ép kiểu thành `boolean` thì chúng sẽ trở thành `true`. Giá trị truthy bao gồm những thứ như `99,99` và `"miễn phí"`. Xem "Truthy & Falsy" trong Chương 2 để biết thêm thông tin.

*Các điều kiện* tồn tại ở các dạng khác ngoài lệnh `if`. Ví dụ, câu lệnh `switch` có thể được sử dụng như một cách viết tắt cho một loạt các câu lệnh `if..else` (xem Chương 2). Vòng lặp (xem "Loops(Vòng lặp)") sử dụng *có điều kiện* để xác định xem vòng lặp nên tiếp tục hay dừng lại.

**Ghi chú:** Để biết thêm thông tin về các ép kiểu có thể xảy ra ngầm trong các biểu thức kiểm tra của *điều kiện*, hãy xem Chương 4 của cuốn *Types and Grammar(Loại & Ngữ pháp)* của bộ sách này.

## Loops(Vòng lặp)

Trong thời gian bận rộn, có một danh sách chờ cho những khách hàng cần nói chuyện với nhân viên cửa hàng điện thoại. Trong khi vẫn còn những người trong danh sách đó, cô ấy chỉ cần tiếp tục phục vụ khách hàng tiếp theo.

Lặp lại một tập hợp các hành động cho đến khi một điều kiện nào đó không thành công - nói cách khác, chỉ lặp lại trong khi điều kiện giữ nguyên - là công việc của các vòng lặp lập trình; các vòng lặp có thể có các dạng khác nhau, nhưng tất cả chúng đều đáp ứng hành vi cơ bản này.

Một vòng lặp bao gồm điều kiện kiểm tra cũng như một khối (thường là `{..}`). Mỗi khi khối lặp thực thi, đó được gọi là *lần lặp(iteration)*.

Ví dụ: vòng lặp `while` và các dạng vòng lặp `do.. while` minh họa khái niệm lặp lại một khối câu lệnh cho đến khi một điều kiện không còn đánh giá là `true`:

```js
while (numOfCustomers > 0) {
	console.log( "How may I help you?" );

	// help the customer...

	numOfCustomers = numOfCustomers - 1;
}

// so với:

do {
	console.log( "How may I help you?" );

	// help the customer...

	numOfCustomers = numOfCustomers - 1;
} while (numOfCustomers > 0);
```

Sự khác biệt thực tế duy nhất giữa các vòng lặp này là liệu điều kiện có được kiểm tra trước lần lặp(iteration) đầu tiên (`while`) hay sau lần lặp đầu tiên (` do.. while`).

Ở cả hai dạng, nếu các kiểm tra có điều kiện là `false`, thì lần lặp tiếp theo sẽ không chạy. Điều đó có nghĩa là nếu điều kiện ban đầu là `false`, vòng lặp `while` sẽ không bao giờ chạy, nhưng vòng lặp `do.. while` sẽ chỉ chạy lần đầu tiên.

Đôi khi bạn lặp lại với mục đích dự định là đếm một tập hợp số nhất định, chẳng hạn như từ `0` đến` 9` (mười số). Bạn có thể làm điều đó bằng cách đặt một biến lặp vòng lặp như `i` với giá trị `0` và tăng nó lên `1` mỗi lần lặp.

**Cảnh báo:** Vì nhiều lý do lịch sử khác nhau, các ngôn ngữ lập trình hầu như luôn đếm mọi thứ theo kiểu số 0, nghĩa là bắt đầu bằng `0` thay vì` 1`. Nếu bạn không quen với cách suy nghĩ đó, ban đầu bạn có thể khá bối rối. Hãy dành một chút thời gian để tập đếm bắt đầu bằng số `0` để trở nên thoải mái hơn với nó!

Điều kiện được kiểm tra trên mỗi lần lặp, giống như thể có một câu lệnh `if` ngụ ý bên trong vòng lặp.

Chúng ta có thể sử dụng câu lệnh `break` của JavaScript để dừng một vòng lặp. Ngoài ra, chúng ta có thể quan sát thấy rằng thật dễ dàng để tạo một vòng lặp mà nếu không sẽ chạy mãi mãi mà không có cơ chế ngắt bằng `break`.

Hãy minh họa:

```js
var i = 0;

// a `while..true` loop would run forever, right?
while (true) {
	// stop the loop?
	if ((i <= 9) === false) {
		break;
	}

	console.log( i );
	i = i + 1;
}
// 0 1 2 3 4 5 6 7 8 9
```

**Cảnh báo:** Đây không nhất thiết phải là một biểu mẫu thực tế mà bạn muốn sử dụng cho các vòng lặp của mình. Nó được trình bày ở đây chỉ cho mục đích minh họa.

Trong khi một `while` (hoặc` do.. while`) có thể hoàn thành nhiệm vụ theo cách thủ công, có một dạng cú pháp khác được gọi là vòng lặp `for` chỉ cho mục đích đó:

```js
for (var i = 0; i <= 9; i = i + 1) {
	console.log( i );
}
// 0 1 2 3 4 5 6 7 8 9
```

Như bạn có thể thấy, trong cả hai trường hợp, điều kiện `i <= 9` là` true` cho 10 lần lặp đầu tiên (`i` của các giá trị từ` 0` đến `9`) của một trong hai dạng lặp, nhưng sẽ trở thành` false` một lần `i` là giá trị` 10`.

Vòng lặp `for` có ba mệnh đề: mệnh đề khởi tạo (`var i = 0`), mệnh đề kiểm tra có điều kiện (`i <= 9`) và mệnh đề cập nhật (`i = i + 1`). Vì vậy, nếu bạn định đếm với các lần lặp vòng lặp của mình, `for` là một dạng nhỏ gọn hơn và thường dễ hiểu và dễ viết hơn.

Có những dạng vòng lặp chuyên biệt khác nhằm mục đích lặp lại các giá trị cụ thể, chẳng hạn như các thuộc tính của một đối tượng (xem Chương 2), trong đó kiểm tra điều kiện ngụ ý chỉ là liệu tất cả các thuộc tính đã được xử lý hay chưa. Khái niệm "vòng lặp cho đến khi một điều kiện không thành công" không có vấn đề gì hình thức của vòng lặp.

## Functions(Hàm)

Nhân viên cửa hàng điện thoại có lẽ không mang theo máy tính để tính thuế và số tiền mua hàng cuối cùng. Đó là nhiệm vụ cô ấy cần xác định một lần và sử dụng lại nhiều lần. Tỷ lệ cược là, công ty có một sổ đăng ký thanh toán (máy tính, máy tính bảng, v.v.) với những "chức năng" được tích hợp sẵn.

Tương tự, chương trình của bạn gần như chắc chắn sẽ muốn chia nhỏ các nhiệm vụ của mã thành các phần có thể tái sử dụng, thay vì lặp đi lặp lại nhiều lần (ý định chơi chữ!). Cách để làm điều này là xác định một `function(hàm)`.

Một hàm nói chung là một phần mã được đặt tên có thể được "gọi" theo tên và mã bên trong nó sẽ được chạy mỗi lần gọi. Xem xét:

```js
function printAmount() {
	console.log( amount.toFixed( 2 ) );
}

var amount = 99.99;

printAmount(); // "99.99"

amount = amount * 2;

printAmount(); // "199.98"
```

Các hàm có thể tùy chọn nhận các đối số (hay còn gọi là tham số) - các giá trị bạn truyền vào. Và chúng cũng có thể tùy chọn trả về một giá trị.

```js
function printAmount(amt) {
	console.log( amt.toFixed( 2 ) );
}

function formatAmount() {
	return "$" + amount.toFixed( 2 );
}

var amount = 99.99;

printAmount( amount * 2 );		// "199.98"

amount = formatAmount();
console.log( amount );			// "$99.99"
```

Hàm `printAmount(..)` nhận một tham số được gọi là `amt`. Hàm `formatAmount()` trả về một giá trị. Lẽ dĩ nhiên, bạn cũng có thể kết hợp hai kỹ thuật đó trong cùng một chức năng.

Các hàm thường được sử dụng cho mã mà bạn định gọi nhiều lần, nhưng chúng cũng có thể hữu ích chỉ để tổ chức các đoạn mã liên quan thành các nhóm được đặt tên, ngay cả khi bạn chỉ định gọi chúng một lần.

Xem xét:

```js
const TAX_RATE = 0.08;

function calculateFinalPurchaseAmount(amt) {
	// calculate the new amount with the tax
	amt = amt + (amt * TAX_RATE);

	// return the new amount
	return amt;
}

var amount = 99.99;

amount = calculateFinalPurchaseAmount( amount );

console.log( amount.toFixed( 2 ) );		// "107.99"
```

Mặc dù chỉ được gọi một lần `allowFinalPurchaseAmount(..)`, việc tổ chức hành vi của nó thành một hàm được đặt tên riêng biệt sẽ làm cho mã sử dụng logic của nó (câu lệnh `amount = allowFinal ...`) sạch hơn. Nếu hàm có nhiều câu lệnh hơn trong đó, thì lợi ích sẽ càng rõ rệt hơn.

### Scope(Phạm vi biến hoặc có thể dịch là giới hạn của biến)

Nếu bạn hỏi nhân viên cửa hàng điện thoại về một mẫu điện thoại mà cửa hàng của cô ấy không có, cô ấy sẽ không thể bán cho bạn chiếc điện thoại bạn muốn. Cô ấy chỉ có quyền truy cập vào điện thoại trong kho của cửa hàng của mình. Bạn sẽ phải thử một cửa hàng khác để xem liệu bạn có thể tìm thấy chiếc điện thoại mình đang tìm kiếm hay không.

Lập trình có một thuật ngữ cho khái niệm này: *phạm vi(scope)* (về mặt kỹ thuật được gọi là *phạm vi từ vựng(lexical scope)*). Trong JavaScript, mỗi hàm có phạm vi riêng. Phạm vi về cơ bản là một tập hợp các biến cũng như các quy tắc về cách các biến đó được truy cập theo tên. Chỉ mã bên trong hàm đó mới có thể truy cập các biến thuộc *phạm vi(scope)* của hàm đó.

Tên biến phải là duy nhất trong cùng một phạm vi(scope) - không thể có hai biến `a` khác nhau nằm ngay cạnh nhau. Nhưng cùng một tên biến `a` có thể xuất hiện trong các phạm vi(scope) khác nhau.

```js
function one() {
	// this `a` only belongs to the `one()` function
	var a = 1;
	console.log( a );
}

function two() {
	// this `a` only belongs to the `two()` function
	var a = 2;
	console.log( a );
}

one();		// 1
two();		// 2
```

Ngoài ra, một phạm vi có thể được lồng vào trong một phạm vi khác, giống như khi một chú hề trong bữa tiệc sinh nhật thổi bay một quả bóng bay bên trong một quả bóng bay khác. Nếu một phạm vi được lồng bên trong phạm vi khác, mã bên trong phạm vi trong cùng có thể truy cập các biến từ một trong hai phạm vi.

Xem xét:

```js
function outer() {
	var a = 1;

	function inner() {
		var b = 2;

		// we can access both `a` and `b` here
		console.log( a + b );	// 3
	}

	inner();

	// we can only access `a` here
	console.log( a );			// 1
}

outer();
```

Các quy tắc lexical scope nói rằng mã trong một phạm vi có thể truy cập các biến của phạm vi đó hoặc bất kỳ phạm vi nào bên ngoài phạm vi đó.

Do đó, code bên trong hàm `inner()` có thể truy cập đến cả biến `a` và `b`, tuy nhiên hàm `outer()` chỉ có thể truy cập tới biến `a` -- nó không thể truy cập vào biến `b` bởi vì biến đó chỉ có ở trong hàm `inner()`.

Nhớ lại đoạn mã này từ trước đó:

```js
const TAX_RATE = 0.08;

function calculateFinalPurchaseAmount(amt) {
	// calculate the new amount with the tax
	amt = amt + (amt * TAX_RATE);

	// return the new amount
	return amt;
}
```

Hằng (biến) `TAX_RATE` có thể truy cập ở bên trong hàm `calculateFinalPurchaseAmount(..)`, mặc dù chúng ta không truyền nó vào, bởi vì lexical scope.

**Ghi chú:** Để thêm thông tin về lexical scope, xem trong chương đầu tiên của cuốn *Scope & Closures* thuộc bộ sách này.

## Thực hành

Không có gì thay thế được thực hành trong việc học lập trình. Không có phần nào cách viết rõ ràng về phần tôi sẽ giúp bạn trở thành một lập trình viên.

Với ý nghĩ đó, chúng ta hãy thử thực hành một số khái niệm mà chúng ta đã học ở đây trong chương này. Tôi sẽ đưa ra các "yêu cầu" và bạn thử nó trước. Sau đó, hãy tham khảo danh sách mã bên dưới để xem tôi đã tiếp cận nó như thế nào.

* Viết chương trình tính tổng giá mua điện thoại của bạn. Bạn sẽ tiếp tục mua điện thoại (gợi ý: vòng lặp!) Cho đến khi hết tiền trong tài khoản ngân hàng của mình. Bạn cũng sẽ mua phụ kiện cho mỗi điện thoại miễn là số tiền mua của bạn dưới ngưỡng chi tiêu tinh thần của bạn.
* Sau khi bạn đã tính toán số tiền mua hàng của mình, hãy thêm thuế, sau đó in ra số tiền mua hàng đã tính toán, được định dạng đúng.
* Cuối cùng, hãy kiểm tra số tiền so với số dư tài khoản ngân hàng của bạn để xem bạn có đủ khả năng chi trả hay không.
* Bạn nên thiết lập một số hằng số cho "tax rate(thuế suất)," "phone price(giá điện thoại)," "accessory price(giá phụ kiện)," and "spending threshold(ngưỡng chi tiêu)," cũng như biến số "bank account balance(số dư tài khoản ngân hàng)" của bạn.
* Bạn nên xác định các hàm để tính thuế và định dạng giá bằng "$" và làm tròn đến hai chữ số thập phân.
* **Bổ sung thách thức:** Cố gắng kết hợp đầu vào vào chương trình này, có thể với `prompt(..)` được nói đến trong "Đầu vào(Input)" trước đó. Ví dụ, bạn có thể nhắc người dùng về số dư tài khoản ngân hàng của họ. Hãy vui vẻ và sáng tạo!

OK đi về phía trước. Thử nó. Đừng nhìn vào danh sách mã của tôi cho đến khi bạn đã tự thử!

**Note:** Vì đây là một cuốn sách về JavaScript, nên rõ ràng tôi sẽ giải bài tập thực hành về JavaScript. Nhưng bạn có thể làm điều đó bằng một ngôn ngữ khác ngay bây giờ nếu bạn cảm thấy thoải mái hơn.

Đây là giải pháp JavaScript của tôi cho bài tập này:

```js
const SPENDING_THRESHOLD = 200;
const TAX_RATE = 0.08;
const PHONE_PRICE = 99.99;
const ACCESSORY_PRICE = 9.99;

var bank_balance = 303.91;
var amount = 0;

function calculateTax(amount) {
	return amount * TAX_RATE;
}

function formatAmount(amount) {
	return "$" + amount.toFixed( 2 );
}

// keep buying phones while you still have money
while (amount < bank_balance) {
	// buy a new phone!
	amount = amount + PHONE_PRICE;

	// can we afford the accessory?
	if (amount < SPENDING_THRESHOLD) {
		amount = amount + ACCESSORY_PRICE;
	}
}

// don't forget to pay the government, too
amount = amount + calculateTax( amount );

console.log(
	"Your purchase: " + formatAmount( amount )
);
// Your purchase: $334.76

// can you actually afford this purchase?
if (amount > bank_balance) {
	console.log(
		"You can't afford this purchase. :("
	);
}
// You can't afford this purchase. :(
```

**Ghi chú:** Cách đơn giản nhất để chạy chương trình JavaScript này là nhập nó vào bảng điều khiển dành cho nhà phát triển(Với chorme là DevTool/Console) của trình duyệt của bạn.

Bạn đã làm như thế nào? Sẽ không hại gì nếu thử lại ngay bây giờ khi bạn đã thấy mã của tôi. Và thử thay đổi một số hằng số để xem chương trình chạy như thế nào với các giá trị khác nhau.

## Đánh giá

Học lập trình không cần phải là một quá trình phức tạp và quá sức. Chỉ có một số khái niệm cơ bản mà bạn cần phải hiểu.

Chúng hoạt động giống như các khối xây dựng. Để xây dựng một tòa tháp cao, trước tiên bạn bắt đầu bằng cách đặt khối trên đầu khối lên trên khối. Lập trình cũng vậy. Dưới đây là một số khối xây dựng lập trình cần thiết:

* Bạn cần *operators(toán tử)* để thực thi trên các giá trị.
* Bạn cần các giá trị và các *kiểu dữ liệu* để thực thi các hành động khác nhau như toán học với kiểu `number(số)` hoặc in ra với `string(chuỗi)`.
* Bạn cần các *biến(variable)* để chứa dữ liệu (hay có thể gọi là *state(trạng thái)*) trong quá trình thực thi chương trình.
* Bạn cần một số lệnh *điều kiện(conditionals)* giống như lệnh `if` để thực hiện các quyết định.
* Bạn cần những *vòng lặp(loops)* để lặp lại các nhiệm vụ cho tới khi điều kiện dừng là true.
* Bạn cần những *functions(hàm)* để tổ chức mã của bạn thành các phần hợp lý và có thể tái sử dụng.

Comment code là một cách hiệu quả để viết mã dễ đọc hơn, giúp chương trình của bạn dễ hiểu, dễ bảo trì và sửa chữa sau này nếu có vấn đề.

Cuối cùng, đừng bỏ bê sức mạnh của việc luyện tập. Cách tốt nhất để học cách viết mã là viết mã.

Tôi rất vui vì bạn đang trên đường học cách viết mã, ngay bây giờ! Hãy duy trì nó. Đừng quên kiểm tra các tài nguyên lập trình cho người mới bắt đầu khác (sách, blog, đào tạo trực tuyến, v.v.). Chương này và cuốn sách này là một khởi đầu tuyệt vời, nhưng chúng chỉ là một phần giới thiệu ngắn gọn.

Chương tiếp theo sẽ xem xét nhiều khái niệm từ chương này, nhưng từ góc độ cụ thể hơn về JavaScript, sẽ làm nổi bật hầu hết các chủ đề chính được đề cập chi tiết hơn trong suốt phần còn lại của loạt bài.
