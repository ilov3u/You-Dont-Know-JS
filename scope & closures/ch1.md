# You Don't Know JS: Scope & Closures
# Chapter 1: Scope là gì?

Một trong những mô hình cơ bản nhất của gần như tất cả các ngôn ngữ lập trình là khả năng lưu trữ các giá trị trong các biến và sau đó truy xuất hoặc sửa đổi các giá trị đó. Trên thực tế, khả năng lưu trữ các giá trị và kéo các giá trị ra khỏi các biến là những gì mang lại cho một *state (trạng thái)* chương trình.

Nếu không có khái niệm như vậy, một chương trình có thể thực hiện một số nhiệm vụ, nhưng chúng sẽ cực kỳ hạn chế và không thú vị lắm.

Nhưng việc đưa các biến vào chương trình của chúng ta đặt ra những câu hỏi thú vị nhất mà chúng ta sẽ giải quyết bây giờ: những biến đó *hoạt động* ở đâu? Nói cách khác, chúng được lưu trữ ở đâu? Và, quan trọng nhất, làm thế nào để chương trình của chúng ta tìm thấy chúng khi nó cần chúng?

Những câu hỏi này nói lên sự cần thiết phải có một bộ quy tắc được xác định rõ ràng để lưu trữ các biến ở một số vị trí và để tìm các biến đó sau này. Chúng tôi sẽ gọi bộ quy tắc đó là: *Scope (Phạm vi)*.
Nhưng, những quy tắc *Scope* này được thiết lập ở đâu và như thế nào?

## Lý Thuyết Biên Dịch (Compiler Theory)

Nó có thể tự hiển nhiên hoặc có thể đáng ngạc nhiên, tùy thuộc vào mức độ tương tác của bạn với các ngôn ngữ khác nhau, nhưng mặc dù thực tế là JavaScript thuộc danh mục chung của các ngôn ngữ "dynamic (động)" hoặc "interpreted (thông dịch)", nó thực tế là một ngôn ngữ compiled (được biên dịch). Nó *không* được biên dịch trước, cũng như nhiều ngôn ngữ được biên dịch theo cách truyền thống, cũng như kết quả của việc biên dịch có thể phân phối giữa các hệ thống phân tán khác nhau.

Nhưng, tuy nhiên, công cụ JavaScript thực hiện nhiều bước tương tự, mặc dù theo những cách phức tạp hơn chúng ta có thể thường biết, đối với bất kỳ trình biên dịch ngôn ngữ truyền thống nào(traditional language-compiler).

Trong một quy trình ngôn ngữ biên dịch truyền thống, một đoạn mã nguồn, chương trình của bạn, thường sẽ trải qua ba bước *trước khi* nó được thực thi, tạm gọi là "biên dịch":

1. **Tokenizing/Lexing:** chia nhỏ một chuỗi ký tự thành các phần có ý nghĩa (đối với ngôn ngữ), được gọi là mã thông báo(token). Ví dụ, hãy xem xét chương trình: `var a = 2;`. Chương trình này có thể sẽ được chia thành các token sau: `var`, `a`, `=`, `2`, và `;`. Khoảng trắng có thể tồn tại hoặc không như một token, tùy thuộc vào việc nó có ý nghĩa hay không.

    **Lưu ý:** Sự khác biệt giữa tokenizing và lexing là tinh tế và mang tính học thuật, nhưng nó tập trung vào việc các token này có được xác định theo cách *stateless (không trạng thái)* hoặc *stateful (trạng thái)* hay không. Nói một cách đơn giản, nếu tokenizer gọi các quy tắc phân tích cú pháp trạng thái để tìm ra liệu `a` nên được coi là một token riêng biệt hay chỉ là một phần của token khác, *đó* sẽ là **lexing**.

2. **Phân tích cú pháp:** lấy một stream (array) token và biến nó thành một cây gồm các phần tử lồng nhau, đại diện chung cho cấu trúc ngữ pháp của chương trình. Cây này được gọi là "AST" (<b>A</b>bstract <b>S</b>yntax <b>T</b>ree).

    Cây cho `var a = 2;` có thể bắt đầu với một nút cấp cao nhất gọi là `variabledeclaration`, với một nút con được gọi là `identifier (định danh)` (có giá trị là `a`) và một nút con khác được gọi là `AssignmentExpression`, mà chính nút con này lại có một nút con được gọi là `NumericLiteral` (có giá trị là `2`).

3. **Code-Generation(Tạo mã):** Quá trình lấy AST và biến nó thành mã thực thi. Phần này thay đổi rất nhiều tùy thuộc vào ngôn ngữ, nền tảng mà nó đang hướng tới, v.v.

    Vì vậy, thay vì bị sa lầy chi tiết, chúng ta sẽ chỉ tay và nói rằng có một cách để lấy AST được mô tả ở trên của chúng ta cho `var a = 2;` và biến nó thành một tập hợp các hướng dẫn máy để thực sự *tạo* một biến được gọi là `a` (bao gồm cả bộ nhớ dự trữ, v.v.), sau đó lưu trữ một giá trị thành `a`.

    ** Lưu ý:** Chi tiết về cách công cụ quản lý tài nguyên hệ thống sâu hơn chúng ta sẽ nghiên cứu, vì vậy chúng ta sẽ chỉ coi đó là điều hiển nhiên rằng công cụ có thể tạo và lưu trữ các biến khi cần thiết.

Công cụ JavaScript(The JavaScript engine) phức tạp hơn rất nhiều so với *chỉ* ba bước đó, cũng như hầu hết các trình biên dịch ngôn ngữ khác. Chẳng hạn, trong quá trình phân tích cú pháp và tạo mã, chắc chắn có các bước để tối ưu hóa hiệu suất thực hiện, bao gồm các yếu tố dự phòng, v.v.

Vì vậy, tôi chỉ mô tả với những cái nhìn rộng ở đây. Nhưng tôi nghĩ bạn sẽ sớm thấy lý do tại sao *những* chi tiết này mà chúng ta *thực hiện* đề cập, ngay cả ở cấp độ cao, lại có liên quan.

Có một điều, các công cụ JavaScript không có nhiều thời gian để tối ưu hóa (giống như các trình biên dịch ngôn ngữ khác), bởi vì việc biên dịch JavaScript không diễn ra trong một bước xây dựng trước thời hạn(ahead of time), như với các ngôn ngữ khác.

Đối với JavaScript, quá trình biên dịch xảy ra, trong nhiều trường hợp, chỉ bằng micro giây (hoặc ít hơn!) Trước khi mã được thực thi. Để đảm bảo hiệu suất nhanh nhất, các công cụ JS sử dụng tất cả các loại thủ thuật (như JIT, lazy compile và thậm chí hot re-compile, v.v.) nằm ngoài "phạm vi" thảo luận của chúng ta ở đây.

Hãy chỉ nói rằng, vì lý do đơn giản, bất kỳ đoạn mã JavaScript nào cũng phải được biên dịch trước (thường là *đúng* trước khi!) Nó được thực thi. Vì vậy, trình biên dịch JS sẽ lấy chương trình `var a = 2;` và biên dịch nó *đầu tiên*, sau đó sẵn sàng thực thi nó, thường là ngay lập tức.

## Hiểu Scope

Cách chúng ta sẽ tiếp cận việc học về scope(phạm vi) là nghĩ về quy trình dưới dạng một cuộc trò chuyện. Nhưng, *ai* đang trò chuyện?
### Diễn Viên (The Cast)

Chúng ta hãy gặp gỡ dàn nhân vật tương tác để xử lý chương trình `var a = 2;`, vì vậy chúng ta hiểu các cuộc trò chuyện của họ mà chúng ta sẽ lắng nghe trong thời gian ngắn:

1. *Engine*: chịu trách nhiệm biên dịch từ đầu đến cuối và thực thi chương trình JavaScript của chúng tôi.

2. *Compiler*: một trong những người bạn của *Engine*; xử lý tất cả các công việc phân tích cú pháp và code-generator (tạo mã) (xem phần trước).

3. *Scope*: một người bạn khác của *Engine*; thu thập và duy trì một danh sách tra cứu của tất cả các định danh đã khai báo (biến), đồng thời thực thi một bộ quy tắc nghiêm ngặt về cách có thể truy cập chúng đối với mã hiện đang thực thi.

Để bạn *fully understand (hiểu đầy đủ)* cách JavaScript hoạt động, bạn cần bắt đầu *suy nghĩ* như *Engine* (và bạn bè) suy nghĩ, đặt câu hỏi họ hỏi và trả lời những câu hỏi đó giống nhau.

### Back & Forth

Khi bạn nhìn thấy chương trình `var a = 2;`, rất có thể bạn nghĩ đó là một câu lệnh. Nhưng đó không phải là cách mà người bạn mới của chúng ta *Engine* nhìn thấy. Trên thực tế, *Engine* nhìn thấy hai câu lệnh khác nhau, một câu lệnh mà *Compiler (Trình biên dịch)* sẽ xử lý trong quá trình biên dịch và một câu lệnh *Engine* sẽ xử lý trong quá trình thực thi.

Vì vậy, hãy phân tích cách *Engine* và bạn bè sẽ tiếp cận chương trình `var a = 2;`.

Điều đầu tiên *Compiler* sẽ làm với chương trình này là thực hiện lexing để chia nhỏ nó thành các token, sau đó nó sẽ phân tích cú pháp thành một cây. Nhưng khi *Compiler* được code-generator(tạo mã), nó sẽ xử lý chương trình này hơi khác so với giả định.

Một giả định hợp lý sẽ là *Compiler* sẽ tạo ra mã có thể được tóm tắt bằng mã giả này: "Phân bổ bộ nhớ cho một biến, gắn nhãn nó là `a`, sau đó dán giá trị `2` vào biến đó." Thật không may, điều đó không hoàn toàn chính xác.

*Compiler* thay vào đó sẽ tiến hành như:

1. Gặp `var a`, *Compiler* hỏi *Scope* để xem liệu biến `a` đã tồn tại cho tập hợp phạm vi cụ thể đó chưa. Nếu đúng, *Compiler* bỏ qua khai báo này và tiếp tục. Nếu không, *Compiler* hỏi *Scope* để khai báo một biến mới được gọi là `a` cho tập hợp phạm vi đó.

2. *Compiler* sau đó tạo mã cho *Engine* để thực thi sau này, để xử lý phép gán `a = 2`. Đoạn mã *Engine* chạy đầu tiên sẽ hỏi *Scope* nếu có một biến được gọi là `a` có thể truy cập trong tập hợp phạm vi hiện tại. Nếu có, *Engine* sử dụng biến đó. Nếu không, *Engine* tìm *ở nơi khác* (xem mục lồng *Scope* bên dưới).

Nếu *Engine* cuối cùng tìm thấy một biến, nó sẽ gán giá trị `2` cho nó. Nếu không, *Engine* sẽ giơ tay và báo lỗi!

Tóm tắt: hai hành động khác nhau được thực hiện cho một phép gán biến: Đầu tiên, *Compiler* khai báo một biến (nếu chưa được khai báo trước đó trong phạm vi hiện tại) và thứ hai, khi thực thi, *Engine* tra cứu biến trong *Scope* và gán cho nó, nếu được tìm thấy.

### Compiler Nói

Chúng tôi cần thêm một chút thuật ngữ Compiler để tiếp tục hiểu sâu hơn.

Khi *Engine* thực thi code mà *Compiler* tạo ra cho bước (2), nó phải tra cứu biến `a` để xem liệu nó đã được khai báo chưa, và tra cứu này là tham khảo *Scope*. Nhưng kiểu tra cứu mà *Engine* thực hiện sẽ ảnh hưởng đến kết quả tra cứu.

Trong trường hợp của chúng tôi, người ta nói rằng *Engine* sẽ thực hiện tra cứu(look-up) "LHS" cho biến `a`. Loại tra cứu khác được gọi là "RHS".

Tôi cá là bạn có thể đoán được chữ "L" và "R" nghĩa là gì. Các thuật ngữ này là viết tắt của "Right-hand side (bên trái)" và "Left-hand side (bên phải)".

Bên... của cái gì? **Of an assignment operation.**

Nói cách khác, tra cứu LHS được thực hiện khi một biến xuất hiện ở bên trái của thao tác gán và tra cứu RHS được thực hiện khi biến xuất hiện ở bên phải của thao tác gán.

Thực ra, hãy nói chính xác hơn một chút. Đối với mục đích của chúng tôi, tra cứu RHS là không thể phân biệt được, chỉ đơn giản là tra cứu giá trị của một số biến, trong khi tra cứu LHS đang cố gắng tìm chính vùng chứa biến để nó có thể gán. Theo cách này, RHS không *thực sự* có nghĩa là "phía bên phải của một phép gán", nó chỉ, chính xác hơn, có nghĩa là "không phải phía bên trái".

Hơi lo lắng trong giây lát, bạn cũng có thể nghĩ "RHS" thay vào đó có nghĩa là "retrieve his/her source (value)(truy xuất nguồn (giá trị) của anh ấy / cô ấy)", ngụ ý rằng RHS có nghĩa là "đi lấy giá trị của ...".

Hãy tìm hiểu sâu hơn về điều đó.

Khi tôi nói:

```js
console.log( a );
```

Tham chiếu tới `a` là tham chiếu RHS, vì không có gì được gán cho `a` ở đây. Thay vào đó, chúng tôi đang tìm kiếm để truy xuất giá trị của `a`, để giá trị có thể được chuyển đến `console.log (..)`.

Ngược lại:

```js
a = 2;
```

Tham chiếu đến `a` ở đây là tham chiếu LHS, bởi vì chúng tôi thực sự không quan tâm giá trị hiện tại là gì, chúng tôi chỉ muốn tìm biến làm mục tiêu cho hoạt động gán `= 2`.

**Ghi chú:** LHS và RHS nghĩa là "left/right-hand side of an assignment" không nhất thiết có nghĩa đen "bên trái/phải của toán tử gán `=`". Có một số cách khác để thực hiện nhiệm vụ, và vì vậy tốt hơn là bạn nên nghĩ về nó một cách khái niệm như: "ai là mục tiêu của nhiệm vụ (LHS)" và "ai là nguồn của nhiệm vụ (RHS)".

Hãy xem xét chương trình này, có cả tham chiếu LHS và RHS:

```js
function foo(a) {
	console.log( a ); // 2
}

foo( 2 );
```

Dòng cuối cùng gọi `foo(..)` như một lời gọi hàm yêu cầu tham chiếu RHS đến `foo`, nghĩa là "hãy tra cứu giá trị của `foo` và đưa nó cho tôi." Hơn nữa, `(..)` có nghĩa là giá trị của `foo` nên được thực thi, vì vậy nó thực sự nên là một hàm!

Có một phép gán tinh tế nhưng quan trọng ở đây. **Bạn có phát hiện ra nó không?**

Bạn có thể đã bỏ sót `a = 2` ngầm trong đoạn mã này. Điều này xảy ra khi giá trị `2` được truyền làm đối số cho hàm `foo (..)`, trong trường hợp đó giá trị `2` được **gán** cho tham số `a`. Để gán (ngầm định) cho tham số `a`, một tra cứu LHS được thực hiện.

Ngoài ra còn có một tham chiếu RHS cho giá trị của `a` và giá trị kết quả đó được chuyển đến `console.log(..)`. `console.log(..)` cần một tham chiếu để thực thi. Đó là một tra cứu RHS cho đối tượng `console`, sau đó xử lý thuộc tính để xem liệu nó có phương thức gọi là `log` hay không.

Cuối cùng, chúng ta có thể khái quát hoá rằng có một trao đổi LHS/RHS để truyền giá trị `2` (bằng cách tra cứu RHS của biến `a`) vào `log(..)`. Bên trong triển khai gốc của `log(..)`, chúng ta có thể giả sử nó có các tham số, tham số đầu tiên (có lẽ được gọi là `arg1`) có tra cứu tham chiếu LHS, trước khi gán `2` cho nó.

**Lưu ý:** Bạn có thể muốn khái niệm hóa khai báo hàm `function foo(a) {...` như một khai báo và gán biến bình thường, chẳng hạn như `var foo` và `foo = function(a) {. ..`. Khi làm như vậy, sẽ rất hấp dẫn khi nghĩ rằng khai báo hàm này liên quan đến tra cứu LHS.

Tuy nhiên, sự khác biệt nhỏ nhưng quan trọng là *Compiler* xử lý cả khai báo và định nghĩa giá trị trong quá trình tạo mã, như vậy khi *Engine* đang thực thi mã, không cần xử lý để "gán" giá trị hàm cho `foo`. Vì vậy, không thực sự thích hợp khi coi một khai báo hàm như một nhiệm vụ tra cứu LHS theo cách chúng ta đang thảo luận ở đây.

### Cuộc Trò Chuyện Engine/Scope

```js
function foo(a) {
	console.log( a ); // 2
}

foo( 2 );
```

Hãy tưởng tượng cuộc trao đổi ở trên (xử lý đoạn mã này) như một cuộc trò chuyện. Cuộc trò chuyện sẽ giống như thế này:

> ***Engine***: Này *Scope*, Tôi có một tham chiếu RHS cho `foo`. Đã bao giờ nghe nói về nó chưa?

> ***Scope***: Tại sao vâng, tôi có. *Compiler* đã khai báo nó chỉ một giây trước. Anh ta là một function. Của bạn đây.

> ***Engine***: Cảm ơn rất nhiều! OK, tôi đang thực thi `foo`.

> ***Engine***: Này, *Scope*, Tôi có một tham chiếu LHS cho `a`, đã từng nghe nói về nó chưa?

> ***Scope***: Tại sao vâng, Tôi có. *Compiler* vừa khai báo nó như một tham số chính thức cho `foo`. Của bạn đây.

> ***Engine***: Hữu ích như mọi khi, *Scope*. Cám ơn lần nữa. Bây giờ, thời điểm để gán `2` cho `a`.

> ***Engine***: Này, *Scope*, xin lỗi anh bạn lần nữa. Tôi cần một tham chiếu RHS cho `console`. Đã từng nghe về nó chưa?

> ***Scope***: Không vấn đề, *Engine*, tôi làm việc này cả ngày. Vâng, Tôi có `console`. Anh ấy được tích hợp sẵn. Của bạn đây.

> ***Engine***: Hoàn hảo. Tra cứu `log(..)`. OK, tuyệt, nó là một function.

> ***Engine***: Này, *Scope*. Bạn có thể giúp tôi với tham chiếu RHS tới `a` không. Tôi nghĩ rằng tôi nhớ nó, nhưng chỉ muốn kiểm tra lại.

> ***Scope***: Bạn nói đúng, *Engine*. Cùng một chàng trai, không thay đổi. Của bạn đây.

> ***Engine***: Tuyệt. Truyền giá trị của `a`, có giá trị là `2`, vào `log(..)`.

> ...

### Quiz

Kiểm tra sự hiểu biết của bạn cho đến nay. Đảm bảo chơi một phần của *Engine* và "trò chuyện" với *Scope*:

```js
function foo(a) {
	var b = a;
	return a + b;
}

var c = foo( 2 );
```

1. Xác định tất cả các tra cứu LHS (Ở đó có 3!).

2. Xác định tất cả các tra cứu RHS (Ở đó có 4!).

**Note:** Xem phần tổng kết chương để biết câu trả lời cho câu hỏi!

## Scope Lồng

Chúng ta nói rằng *Scope* là một tập hợp các quy tắc để tra cứu các biến theo tên định danh của chúng. Tuy nhiên, thường có nhiều hơn một *Scope* để xem xét.

Cũng giống như một khối hoặc hàm được lồng bên trong một khối hoặc hàm khác, các scope được lồng bên trong các scope khác. Vì vậy, nếu không thể tìm thấy một biến trong scope ngay lập tức, *Engine* sẽ tư vấn cho scope chứa bên ngoài tiếp theo, tiếp tục cho đến khi tìm thấy hoặc cho đến khi đạt đến scope ngoài cùng (hay còn gọi là toàn cục).

Xem xét:

```js
function foo(a) {
	console.log( a + b );
}

var b = 2;

foo( 2 ); // 4
```

Tham chiếu RHS cho `b` không thể được giải quyết bên trong hàm `foo`, nhưng nó có thể được giải quyết trong *Scope* xung quanh nó (trong trường hợp này là toàn cục).

Vì vậy, xem lại các cuộc hội thoại giữa *Engine* và *Scope*, chúng ta nghe được:

> ***Engine***: "Này, *Scope* của `foo` ơi, bạn đã bao giờ nghe nói về `b`? Có một tham chiếu RHS cho nó."

> ***Scope***: "Không, chưa bao giờ nghe nói về nó. Đi câu cá đây."

> ***Engine***: "Này, *Scope* bên ngoài của `foo` ơi, ồ bạn là *Scope* toàn cục, ok tuyệt. Đã bao giờ nghe về `b` chưa? Có một tham chiếu RHS tới nó."

> ***Scope***: "Vâng, chắc chắn có. Của bạn đây."

Các quy tắc đơn giản để duyệt qua *Scope* lồng nhau: *Engine* bắt đầu tại *Scope* hiện đang thực thi, tìm kiếm biến ở đó, sau đó nếu không tìm thấy, tiếp tục tăng một cấp, v.v. Nếu đạt đến scope toàn cục ngoài cùng, quá trình tìm kiếm sẽ dừng lại, cho dù nó có tìm thấy biến hay không.

### Building on Metaphors(Xây dựng dựa trên ẩn dụ)

Để hình dung quá trình phân giải *Scope* lồng nhau, tôi muốn bạn nghĩ về tòa nhà cao tầng này.

<img src="fig1.png" width="250">

Tòa nhà đại diện cho bộ quy tắc *Scope* lồng nhau của chương trình của chúng tôi. Tầng đầu tiên của tòa nhà đại diện cho *Scope* hiện đang thực hiện của bạn, cho dù bạn ở đâu. Tầng cao nhất của tòa nhà là *Scope* toàn cục.

Bạn giải quyết các tham chiếu LHS và RHS bằng cách nhìn vào tầng hiện tại của bạn, và nếu bạn không tìm thấy nó, hãy đi thang máy lên tầng tiếp theo, tìm ở đó, tiếp theo, v.v. Khi bạn lên đến tầng cao nhất (*Scope* toàn cục), bạn có thể tìm thấy những gì bạn đang tìm kiếm hoặc bạn không. Nhưng bạn phải dừng lại bất kể ra sao.

## Errors

Tại sao nó lại quan trọng cho dù chúng ta gọi nó là LHS hay RHS?

Bởi vì hai loại tra cứu này hoạt động khác nhau trong trường hợp biến chưa được khai báo (không tìm thấy trong bất kỳ *Scope* nào).

Xem xét:

```js
function foo(a) {
	console.log( a + b );
	b = a;
}

foo( 2 );
```

Khi tra cứu RHS xảy ra cho `b` lần đầu tiên, nó sẽ không được tìm thấy. Đây được cho là một biến "không được khai báo", bởi vì nó không được tìm thấy trong Scope.

Nếu tra cứu RHS không bao giờ tìm thấy một biến, ở bất kỳ đâu trong *Scope* được lồng vào nhau, điều này dẫn đến một `ReferenceError` được thông báo bởi *Engine*. Điều quan trọng cần lưu ý là lỗi thuộc loại `ReferenceError`.

Ngược lại, nếu *Engine* đang thực hiện tra cứu LHS và đến tầng cao nhất (scope *toàn cục*) mà không tìm thấy nó và nếu chương trình không chạy ở "strict mode" [^note-strictmode], thì *Scope* toàn cục sẽ tạo một biến mới có tên đó **trong scope toàn cục** và giao lại cho *Engine*.

*"Không, trước đây chưa có cái nào, nhưng tôi rất hữu ích và đã tạo một cái cho bạn."*

"Strict Mode" [^note-strictmode], điều được thêm trong ES5, có một số hành vi khác với chế độ bình thường/thư giãn/lười biếng. Một trong những hành vi như vậy là nó không cho phép tạo biến toàn cục tự động/ngầm định. Trong trường hợp đó, sẽ không có biến thuộc *Scope* toàn cục trả lại từ tra cứu LHS và *Engine* sẽ thông báo một `ReferenceError` tương tự như trường hợp RHS.

Bây giờ, nếu một biến được tìm để tra cứu RHS, nhưng bạn cố gắng làm điều gì đó với giá trị của nó mà không thể, chẳng hạn như cố gắng execute-as-function một giá trị không phải hàm hoặc tham chiếu một thuộc tính trên `null` hoặc `undefined`, sau đó *Engine* thông báo một loại lỗi khác, được gọi là `TypeError`.

`ReferenceError` là liên quan đến thất bại trong tìm kiếm biến trong *Scope*, trong khi đó `TypeError` ngụ ý rằng tìm kiếm biến trong *Scope* đã thành công, nhưng có một hành động không được phép/không thể thực hiện nhằm ngăn trả lại kết quả.

## Đánh Giá (TL;DR)

Scope là tập hợp các quy tắc xác định vị trí và cách thức một biến (định danh) có thể được tra cứu. Việc tra cứu này có thể nhằm mục đích gán cho biến, là tham chiếu LHS (bên trái), hoặc có thể nhằm mục đích truy xuất giá trị của nó, là tham chiếu RHS (bên phải).

Tham chiếu LHS là kết quả của các thao tác gán. Các phép gán liên quan đến *Scope* có thể xảy ra với toán tử `=` hoặc bằng cách truyền giá trị (gán cho) cho các tham số hàm.

JavaScript *Engine* đầu tiên biên dịch mã trước khi nó thực thi và khi làm như vậy, nó tách các câu lệnh như `var a = 2;` thành hai bước riêng biệt:

1. Đầu tiên, `var a` để khai báo nó trong *Scope* đó. Điều này được thực hiện ngay từ đầu, trước khi thực thi mã.

2. Sau đó, `a = 2` để tra cứu biến (tham chiếu LHS) và gán cho nó nếu tìm thấy.

Cả hai tra cứu tham chiếu LHS và RHS đều bắt đầu ở *Scope* hiện đang thực thi, và nếu cần (nghĩa là họ không tìm thấy thứ họ đang tìm ở đó), chúng sẽ hoạt động theo cách của họ với *Scope* lồng nhau, một scope(tầng) tại một thời điểm, tìm kiếm định danh, cho đến khi họ đến scope toàn cầu (tầng trên cùng) và dừng lại, đồng thời tìm thấy nó hoặc không.

Các tham chiếu RHS không trả được kết quả dẫn đến `ReferenceError` được thông báo. Các tham chiếu LHS không trả về kết quả dẫn đến toàn cục được tạo tự động, được tạo ngầm của tên đó (nếu không ở "Chế độ nghiêm ngặt" [^note-strictmode]) hoặc `ReferenceError` (nếu ở" Chế độ nghiêm ngặt "[^note-strictmode]).

### Các Câu Trả Lời Cho Câu Hỏi

```js
function foo(a) {
	var b = a;
	return a + b;
}

var c = foo( 2 );
```

1. Xác định tất cả các tra cứu LHS (có 3!).

	**`c = ..`, `a = 2` (implicit param assignment) and `b = ..`**

2. Xác định tất cả các tra cứu RHS (có 4!).

    **`foo(2..`, `= a;`, `a + ..` and `.. + b`**


[^note-strictmode]: MDN: [Strict Mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode)
