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

But another important part is code comments. These are bits of text in your program that are inserted purely to explain things to a human. The interpreter/compiler will always ignore these comments.

There are lots of opinions on what makes well-commented code; we can't really define absolute universal rules. But some observations and guidelines are quite useful:

* Code without comments is suboptimal.
* Too many comments (one per line, for example) is probably a sign of poorly written code.
* Comments should explain *why*, not *what*. They can optionally explain *how* if that's particularly confusing.

In JavaScript, there are two types of comments possible: a single-line comment and a multiline comment.

Consider:

```js
// This is a single-line comment

/* But this is
       a multiline
             comment.
                      */
```

The `//` single-line comment is appropriate if you're going to put a comment right above a single statement, or even at the end of a line. Everything on the line after the `//` is treated as the comment (and thus ignored by the compiler), all the way to the end of the line. There's no restriction to what can appear inside a single-line comment.

Consider:

```js
var a = 42;		// 42 is the meaning of life
```

The `/* .. */` multiline comment is appropriate if you have several lines worth of explanation to make in your comment.

Here's a common usage of multiline comments:

```js
/* The following value is used because
   it has been shown that it answers
   every question in the universe. */
var a = 42;
```

It can also appear anywhere on a line, even in the middle of a line, because the `*/` ends it. For example:

```js
var a = /* arbitrary value */ 42;

console.log( a );	// 42
```

The only thing that cannot appear inside a multiline comment is a `*/`, because that would be interpreted to end the comment.

You will definitely want to begin your learning of programming by starting off with the habit of commenting code. Throughout the rest of this chapter, you'll see I use comments to explain things, so do the same in your own practice. Trust me, everyone who reads your code will thank you!

## Variables

Most useful programs need to track a value as it changes over the course of the program, undergoing different operations as called for by your program's intended tasks.

The easiest way to go about that in your program is to assign a value to a symbolic container, called a *variable* -- so called because the value in this container can *vary* over time as needed.

In some programming languages, you declare a variable (container) to hold a specific type of value, such as `number` or `string`. *Static typing*, otherwise known as *type enforcement*, is typically cited as a benefit for program correctness by preventing unintended value conversions.

Other languages emphasize types for values instead of variables. *Weak typing*, otherwise known as *dynamic typing*, allows a variable to hold any type of value at any time. It's typically cited as a benefit for program flexibility by allowing a single variable to represent a value no matter what type form that value may take at any given moment in the program's logic flow.

JavaScript uses the latter approach, *dynamic typing*, meaning variables can hold values of any *type* without any *type* enforcement.

As mentioned earlier, we declare a variable using the `var` statement -- notice there's no other *type* information in the declaration. Consider this simple program:

```js
var amount = 99.99;

amount = amount * 2;

console.log( amount );		// 199.98

// convert `amount` to a string, and
// add "$" on the beginning
amount = "$" + String( amount );

console.log( amount );		// "$199.98"
```

The `amount` variable starts out holding the number `99.99`, and then holds the `number` result of `amount * 2`, which is `199.98`.

The first `console.log(..)` command has to *implicitly* coerce that `number` value to a `string` to print it out.

Then the statement `amount = "$" + String(amount)` *explicitly* coerces the `199.98` value to a `string` and adds a `"$"` character to the beginning. At this point, `amount` now holds the `string` value `"$199.98"`, so the second `console.log(..)` statement doesn't need to do any coercion to print it out.

JavaScript developers will note the flexibility of using the `amount` variable for each of the `99.99`, `199.98`, and the `"$199.98"` values. Static-typing enthusiasts would prefer a separate variable like `amountStr` to hold the final `"$199.98"` representation of the value, because it's a different type.

Either way, you'll note that `amount` holds a running value that changes over the course of the program, illustrating the primary purpose of variables: managing program *state*.

In other words, *state* is tracking the changes to values as your program runs.

Another common usage of variables is for centralizing value setting. This is more typically called *constants*, when you declare a variable with a value and intend for that value to *not change* throughout the program.

You declare these *constants*, often at the top of a program, so that it's convenient for you to have one place to go to alter a value if you need to. By convention, JavaScript variables as constants are usually capitalized, with underscores `_` between multiple words.

Here's a silly example:

```js
var TAX_RATE = 0.08;	// 8% sales tax

var amount = 99.99;

amount = amount * 2;

amount = amount + (amount * TAX_RATE);

console.log( amount );				// 215.9784
console.log( amount.toFixed( 2 ) );	// "215.98"
```

**Note:** Similar to how `console.log(..)` is a function `log(..)` accessed as an object property on the `console` value, `toFixed(..)` here is a function that can be accessed on `number` values. JavaScript `number`s aren't automatically formatted for dollars -- the engine doesn't know what your intent is and there's no type for currency. `toFixed(..)` lets us specify how many decimal places we'd like the `number` rounded to, and it produces the `string` as necessary.

The `TAX_RATE` variable is only *constant* by convention -- there's nothing special in this program that prevents it from being changed. But if the city raises the sales tax rate to 9%, we can still easily update our program by setting the `TAX_RATE` assigned value to `0.09` in one place, instead of finding many occurrences of the value `0.08` strewn throughout the program and updating all of them.

The newest version of JavaScript at the time of this writing (commonly called "ES6") includes a new way to declare *constants*, by using `const` instead of `var`:

```js
// as of ES6:
const TAX_RATE = 0.08;

var amount = 99.99;

// ..
```

Constants are useful just like variables with unchanged values, except that constants also prevent accidentally changing value somewhere else after the initial setting. If you tried to assign any different value to `TAX_RATE` after that first declaration, your program would reject the change (and in strict mode, fail with an error -- see "Strict Mode" in Chapter 2).

By the way, that kind of "protection" against mistakes is similar to the static-typing type enforcement, so you can see why static types in other languages can be attractive!

**Note:** For more information about how different values in variables can be used in your programs, see the *Types & Grammar* title of this series.

## Blocks

The phone store employee must go through a series of steps to complete the checkout as you buy your new phone.

Similarly, in code we often need to group a series of statements together, which we often call a *block*. In JavaScript, a block is defined by wrapping one or more statements inside a curly-brace pair `{ .. }`. Consider:

```js
var amount = 99.99;

// a general block
{
	amount = amount * 2;
	console.log( amount );	// 199.98
}
```

This kind of standalone `{ .. }` general block is valid, but isn't as commonly seen in JS programs. Typically, blocks are attached to some other control statement, such as an `if` statement (see "Conditionals") or a loop (see "Loops"). For example:

```js
var amount = 99.99;

// is amount big enough?
if (amount > 10) {			// <-- block attached to `if`
	amount = amount * 2;
	console.log( amount );	// 199.98
}
```

We'll explain `if` statements in the next section, but as you can see, the `{ .. }` block with its two statements is attached to `if (amount > 10)`; the statements inside the block will only be processed if the conditional passes.

**Note:** Unlike most other statements like `console.log(amount);`, a block statement does not need a semicolon (`;`) to conclude it.

## Conditionals

"Do you want to add on the extra screen protectors to your purchase, for $9.99?" The helpful phone store employee has asked you to make a decision. And you may need to first consult the current *state* of your wallet or bank account to answer that question. But obviously, this is just a simple "yes or no" question.

There are quite a few ways we can express *conditionals* (aka decisions) in our programs.

The most common one is the `if` statement. Essentially, you're saying, "*If* this condition is true, do the following...". For example:

```js
var bank_balance = 302.13;
var amount = 99.99;

if (amount < bank_balance) {
	console.log( "I want to buy this phone!" );
}
```

The `if` statement requires an expression in between the parentheses `( )` that can be treated as either `true` or `false`. In this program, we provided the expression `amount < bank_balance`, which indeed will either evaluate to `true` or `false` depending on the amount in the `bank_balance` variable.

You can even provide an alternative if the condition isn't true, called an `else` clause. Consider:

```js
const ACCESSORY_PRICE = 9.99;

var bank_balance = 302.13;
var amount = 99.99;

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

Here, if `amount < bank_balance` is `true`, we'll print out `"I'll take the accessory!"` and add the `9.99` to our `amount` variable. Otherwise, the `else` clause says we'll just politely respond with `"No, thanks."` and leave `amount` unchanged.

As we discussed in "Values & Types" earlier, values that aren't already of an expected type are often coerced to that type. The `if` statement expects a `boolean`, but if you pass it something that's not already `boolean`, coercion will occur.

JavaScript defines a list of specific values that are considered "falsy" because when coerced to a `boolean`, they become `false` -- these include values like `0` and `""`. Any other value not on the "falsy" list is automatically "truthy" -- when coerced to a `boolean` they become `true`. Truthy values include things like `99.99` and `"free"`. See "Truthy & Falsy" in Chapter 2 for more information.

*Conditionals* exist in other forms besides the `if`. For example, the `switch` statement can be used as a shorthand for a series of `if..else` statements (see Chapter 2). Loops (see "Loops") use a *conditional* to determine if the loop should keep going or stop.

**Note:** For deeper information about the coercions that can occur implicitly in the test expressions of *conditionals*, see Chapter 4 of the *Types & Grammar* title of this series.

## Loops

During busy times, there's a waiting list for customers who need to speak to the phone store employee. While there's still people on that list, she just needs to keep serving the next customer.

Repeating a set of actions until a certain condition fails -- in other words, repeating only while the condition holds -- is the job of programming loops; loops can take different forms, but they all satisfy this basic behavior.

A loop includes the test condition as well as a block (typically as `{ .. }`). Each time the loop block executes, that's called an *iteration*.

For example, the `while` loop and the `do..while` loop forms illustrate the concept of repeating a block of statements until a condition no longer evaluates to `true`:

```js
while (numOfCustomers > 0) {
	console.log( "How may I help you?" );

	// help the customer...

	numOfCustomers = numOfCustomers - 1;
}

// versus:

do {
	console.log( "How may I help you?" );

	// help the customer...

	numOfCustomers = numOfCustomers - 1;
} while (numOfCustomers > 0);
```

The only practical difference between these loops is whether the conditional is tested before the first iteration (`while`) or after the first iteration (`do..while`).

In either form, if the conditional tests as `false`, the next iteration will not run. That means if the condition is initially `false`, a `while` loop will never run, but a `do..while` loop will run just the first time.

Sometimes you are looping for the intended purpose of counting a certain set of numbers, like from `0` to `9` (ten numbers). You can do that by setting a loop iteration variable like `i` at value `0` and incrementing it by `1` each iteration.

**Warning:** For a variety of historical reasons, programming languages almost always count things in a zero-based fashion, meaning starting with `0` instead of `1`. If you're not familiar with that mode of thinking, it can be quite confusing at first. Take some time to practice counting starting with `0` to become more comfortable with it!

The conditional is tested on each iteration, much as if there is an implied `if` statement inside the loop.

We can use JavaScript's `break` statement to stop a loop. Also, we can observe that it's awfully easy to create a loop that would otherwise run forever without a `break`ing mechanism.

Let's illustrate:

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

**Warning:** This is not necessarily a practical form you'd want to use for your loops. It's presented here for illustration purposes only.

While a `while` (or `do..while`) can accomplish the task manually, there's another syntactic form called a `for` loop for just that purpose:

```js
for (var i = 0; i <= 9; i = i + 1) {
	console.log( i );
}
// 0 1 2 3 4 5 6 7 8 9
```

As you can see, in both cases the conditional `i <= 9` is `true` for the first 10 iterations (`i` of values `0` through `9`) of either loop form, but becomes `false` once `i` is value `10`.

The `for` loop has three clauses: the initialization clause (`var i=0`), the conditional test clause (`i <= 9`), and the update clause (`i = i + 1`). So if you're going to do counting with your loop iterations, `for` is a more compact and often easier form to understand and write.

There are other specialized loop forms that are intended to iterate over specific values, such as the properties of an object (see Chapter 2) where the implied conditional test is just whether all the properties have been processed. The "loop until a condition fails" concept holds no matter what the form of the loop.

## Functions

The phone store employee probably doesn't carry around a calculator to figure out the taxes and final purchase amount. That's a task she needs to define once and reuse over and over again. Odds are, the company has a checkout register (computer, tablet, etc.) with those "functions" built in.

Similarly, your program will almost certainly want to break up the code's tasks into reusable pieces, instead of repeatedly repeating yourself repetitiously (pun intended!). The way to do this is to define a `function`.

A function is generally a named section of code that can be "called" by name, and the code inside it will be run each time. Consider:

```js
function printAmount() {
	console.log( amount.toFixed( 2 ) );
}

var amount = 99.99;

printAmount(); // "99.99"

amount = amount * 2;

printAmount(); // "199.98"
```

Functions can optionally take arguments (aka parameters) -- values you pass in. And they can also optionally return a value back.

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

The function `printAmount(..)` takes a parameter that we call `amt`. The function `formatAmount()` returns a value. Of course, you can also combine those two techniques in the same function.

Functions are often used for code that you plan to call multiple times, but they can also be useful just to organize related bits of code into named collections, even if you only plan to call them once.

Consider:

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

Although `calculateFinalPurchaseAmount(..)` is only called once, organizing its behavior into a separate named function makes the code that uses its logic (the `amount = calculateFinal...` statement) cleaner. If the function had more statements in it, the benefits would be even more pronounced.

### Scope

If you ask the phone store employee for a phone model that her store doesn't carry, she will not be able to sell you the phone you want. She only has access to the phones in her store's inventory. You'll have to try another store to see if you can find the phone you're looking for.

Programming has a term for this concept: *scope* (technically called *lexical scope*). In JavaScript, each function gets its own scope. Scope is basically a collection of variables as well as the rules for how those variables are accessed by name. Only code inside that function can access that function's *scoped* variables.

A variable name has to be unique within the same scope -- there can't be two different `a` variables sitting right next to each other. But the same variable name `a` could appear in different scopes.

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

Also, a scope can be nested inside another scope, just like if a clown at a birthday party blows up one balloon inside another balloon. If one scope is nested inside another, code inside the innermost scope can access variables from either scope.

Consider:

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

Lexical scope rules say that code in one scope can access variables of either that scope or any scope outside of it.

So, code inside the `inner()` function has access to both variables `a` and `b`, but code in `outer()` has access only to `a` -- it cannot access `b` because that variable is only inside `inner()`.

Recall this code snippet from earlier:

```js
const TAX_RATE = 0.08;

function calculateFinalPurchaseAmount(amt) {
	// calculate the new amount with the tax
	amt = amt + (amt * TAX_RATE);

	// return the new amount
	return amt;
}
```

The `TAX_RATE` constant (variable) is accessible from inside the `calculateFinalPurchaseAmount(..)` function, even though we didn't pass it in, because of lexical scope.

**Note:** For more information about lexical scope, see the first three chapters of the *Scope & Closures* title of this series.

## Practice

There is absolutely no substitute for practice in learning programming. No amount of articulate writing on my part is alone going to make you a programmer.

With that in mind, let's try practicing some of the concepts we learned here in this chapter. I'll give the "requirements," and you try it first. Then consult the code listing below to see how I approached it.

* Write a program to calculate the total price of your phone purchase. You will keep purchasing phones (hint: loop!) until you run out of money in your bank account. You'll also buy accessories for each phone as long as your purchase amount is below your mental spending threshold.
* After you've calculated your purchase amount, add in the tax, then print out the calculated purchase amount, properly formatted.
* Finally, check the amount against your bank account balance to see if you can afford it or not.
* You should set up some constants for the "tax rate," "phone price," "accessory price," and "spending threshold," as well as a variable for your "bank account balance.""
* You should define functions for calculating the tax and for formatting the price with a "$" and rounding to two decimal places.
* **Bonus Challenge:** Try to incorporate input into this program, perhaps with the `prompt(..)` covered in "Input" earlier. You may prompt the user for their bank account balance, for example. Have fun and be creative!

OK, go ahead. Try it. Don't peek at my code listing until you've given it a shot yourself!

**Note:** Because this is a JavaScript book, I'm obviously going to solve the practice exercise in JavaScript. But you can do it in another language for now if you feel more comfortable.

Here's my JavaScript solution for this exercise:

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

**Note:** The simplest way to run this JavaScript program is to type it into the developer console of your nearest browser.

How did you do? It wouldn't hurt to try it again now that you've seen my code. And play around with changing some of the constants to see how the program runs with different values.

## Review

Learning programming doesn't have to be a complex and overwhelming process. There are just a few basic concepts you need to wrap your head around.

These act like building blocks. To build a tall tower, you start first by putting block on top of block on top of block. The same goes with programming. Here are some of the essential programming building blocks:

* You need *operators* to perform actions on values.
* You need values and *types* to perform different kinds of actions like math on `number`s or output with `string`s.
* You need *variables* to store data (aka *state*) during your program's execution.
* You need *conditionals* like `if` statements to make decisions.
* You need *loops* to repeat tasks until a condition stops being true.
* You need *functions* to organize your code into logical and reusable chunks.

Code comments are one effective way to write more readable code, which makes your program easier to understand, maintain, and fix later if there are problems.

Finally, don't neglect the power of practice. The best way to learn how to write code is to write code.

I'm excited you're well on your way to learning how to code, now! Keep it up. Don't forget to check out other beginner programming resources (books, blogs, online training, etc.). This chapter and this book are a great start, but they're just a brief introduction.

The next chapter will review many of the concepts from this chapter, but from a more JavaScript-specific perspective, which will highlight most of the major topics that are addressed in deeper detail throughout the rest of the series.
