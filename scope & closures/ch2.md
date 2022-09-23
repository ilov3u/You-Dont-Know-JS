# You Don't Know JS: Scope & Closures
# Chapter 2: Lexical Scope

Trong Chương 1, chúng ta đã định nghĩa "scope (phạm vi)" là tập hợp các quy tắc chi phối cách *Engine* có thể tìm kiếm một biến theo tên định danh của nó và tìm biến đó, trong *Scope* hiện tại hoặc trong bất kỳ *Scope lồng nhau nào* nó được chứa bên trong.

Có hai mô hình chủ yếu về cách thức hoạt động của scope. Cách đầu tiên trong số này cho đến nay là phổ biến nhất, được sử dụng bởi đại đa số các ngôn ngữ lập trình. Nó được gọi là **Lexical Scope** và chúng tôi sẽ xem xét chuyên sâu về nó. Mô hình khác, vẫn được một số ngôn ngữ sử dụng (chẳng hạn như tập lệnh Bash, một số chế độ trong Perl, v.v.) được gọi là **Dynamic Scope**.

Dynamic Scope được đề cập trong Phụ lục A. Tôi đề cập đến nó ở đây chỉ để cung cấp sự tương phản với Lexical Scope, là mô hình scope mà JavaScript sử dụng.

## Lex-time

Như chúng ta đã thảo luận trong Chương 1, giai đoạn truyền thống đầu tiên của trình biên dịch ngôn ngữ chuẩn được gọi là lexing (hay còn gọi là mã hóa - tokenizing). Nếu bạn nhớ lại, quy trình lexing sẽ kiểm tra một chuỗi ký tự mã nguồn và gán ý nghĩa ngữ nghĩa cho các token do một số phân tích trạng thái.

Chính khái niệm này cung cấp nền tảng để hiểu lexical scope là gì và tên bắt nguồn từ đâu.

Để định nghĩa nó hơi tròn trịa, lexical scope là scope được xác định tại thời điểm lexing(từ vựng). Nói cách khác, lexical scope (phạm vi từ vựng) dựa trên nơi các biến và khối scope được tác giả, bởi bạn, tại thời điểm viết, và do đó (hầu hết) được thiết lập sẵn sàng vào thời điểm lexer xử lý mã của bạn.

**Ghi Chú:** Chúng ta sẽ thấy một số cách để gian lận lexical scope, do đó sửa đổi nó sau khi lexer đã trôi qua, nhưng những cách này đều không được chấp nhận. Nó được coi là phương pháp hay nhất để coi lexical scope, trên thực tế, chỉ là từ vựng, và do đó hoàn toàn mang bản chất của tác giả thời gian.

Hãy xem xét khối code này:

```js
function foo(a) {

	var b = a * 2;

	function bar(c) {
		console.log( a, b, c );
	}

	bar(b * 3);
}

foo( 2 ); // 2 4 12
```

Có ba phạm vi lồng nhau vốn có trong đoạn code ví dụ này. Có thể hữu ích khi nghĩ về những scope này như những bong bóng bên trong nhau.

<img src="fig2.png" width="500">

**Bong bóng 1** bao gồm scope toàn cầu và chỉ có một mã định danh (identifier) trong đó: `foo`.

**Bong bóng 2** bao gồm scope của `foo`, bao gồm ba identifier: `a`, `bar` và `b`.

**Bong bóng 3** bao gồm scope của `bar` và nó chỉ bao gồm một identifier:` c`.

Bong bóng scope được xác định theo nơi viết các khối scope, cái nào được lồng vào bên trong cái kia, v.v. Trong chương tiếp theo, chúng ta sẽ thảo luận về các đơn vị scope khác nhau, nhưng hiện tại, hãy giả sử rằng mỗi hàm tạo ra một bong bóng của scope.

Bong bóng cho `bar` hoàn toàn được chứa trong bong bóng cho `foo`, bởi vì (và chỉ vì) đó là nơi chúng tôi chọn để xác định hàm `bar`.

Chú ý rằng các bong bóng lồng nhau này được lồng vào nhau một cách chặt chẽ. Chúng tôi không nói về biểu đồ Venn nơi các bong bóng có thể vượt qua ranh giới. Nói cách khác, không có bong bóng nào cho một số chức năng có thể đồng thời tồn tại (một phần) bên trong hai bong bóng scope bên ngoài khác, cũng như không có chức năng nào có thể nằm một phần bên trong mỗi trong số hai chức năng cha.

### Look-ups

Cấu trúc và vị trí tương đối của các bong bóng phạm vi này giải thích đầy đủ cho *Engine* tất cả các vị trí mà nó cần xem xét để tìm identifier.

Trong đoạn code trên, *Engine* thực thi câu lệnh `console.log (..)` và tìm kiếm ba biến được tham chiếu `a`, `b` và `c`. Đầu tiên nó bắt đầu với bong bóng scope trong cùng, scope của hàm `bar(..)`. Nó sẽ không tìm thấy `a` ở đó, vì vậy nó tăng lên một cấp, đến bong bóng scope gần nhất tiếp theo, scope của `foo(..)`. Nó tìm thấy `a` ở đó, và vì vậy nó sử dụng `a` đó. Điều tương tự đối với `b`. Nhưng `c`, nó không tìm thấy bên trong của `bar(..)`.

Nếu có câu lệnh `c` cả bên trong `bar(..)` và bên trong `foo(..)`, thì câu lệnh `console.log(..)` sẽ tìm thấy và sử dụng câu lệnh trong `bar( ..)`, không bao giờ nhận cái trong `foo(..)`.

**Việc tra cứu scope dừng lại sau khi tìm thấy kết quả phù hợp đầu tiên**. Tên identifier giống nhau có thể được chỉ định ở nhiều lớp của phạm vi lồng nhau, được gọi là "shadowing" (identifier bên trong "phủ lên trên" identifier bên ngoài). Bất kể shadowing, tra cứu scope luôn bắt đầu ở scope trong cùng đang được thực thi tại thời điểm đó và hoạt động theo hướng ra ngoài/hướng lên cho đến khi khớp đầu tiên và dừng lại.

**Ghi Chú:** Các biến toàn cục cũng tự động là thuộc tính của đối tượng toàn cục (`window` trong trình duyệt, v.v.), vì vậy *có thể* tham chiếu trực tiếp đến biến toàn cục không trực tiếp bằng tên từ vựng của nó, mà thay vào đó gián tiếp dưới dạng tham chiếu thuộc tính của đối tượng toàn cục.

```js
window.a
```

Kỹ thuật này cho phép truy cập vào một biến toàn cục mà nếu không sẽ không thể truy cập được do nó bị che khuất. Tuy nhiên, không thể truy cập các biến ẩn không toàn cục.

Bất kể *ở đâu* một hàm được gọi từ, hoặc thậm chí *cách* nó được gọi, lexical scope của nó là **chỉ** được xác định bởi nơi hàm được khai báo.

Quy trình tra cứu lexical scope *chỉ* áp dụng cho các first-class identifier, chẳng hạn như `a`, `b` và `c`. Nếu bạn có tham chiếu đến `foo.bar.baz` trong một đoạn code, tra cứu lexical scope sẽ áp dụng để tìm identifier `foo`, nhưng khi nó định vị biến đó, các quy tắc truy cập thuộc tính đối tượng sẽ tiếp nhận giải quyết các thuộc tính `bar` và` baz`, tương ứng.

## Cheating Lexical

Nếu lexical scope chỉ được xác định theo nơi một hàm được khai báo, điều này hoàn toàn là quyết định của tác giả thời gian, làm thế nào có thể có cách "sửa đổi" (hay còn gọi là gian lận) lexical scope trong quá trình chạy?

JavaScript có hai cơ chế như vậy. Cả hai đều bị coi thường trong cộng đồng rộng lớn như những phương pháp không tốt để sử dụng trong code của bạn. Nhưng các lập luận điển hình chống lại chúng thường thiếu điểm quan trọng nhất: **gian lận lexical scope dẫn đến hiệu suất kém hơn.**

Tuy nhiên, trước khi tôi giải thích về vấn đề hiệu suất, hãy xem cách hoạt động của hai cơ chế này.

### `eval`

Hàm `eval(..)` trong JavaScript nhận một chuỗi làm đối số và xử lý nội dung của chuỗi như thể nó thực sự là tác giả của code tại thời điểm đó trong chương trình. Nói cách khác, bạn có thể lập trình tạo code bên trong code của bạn và chạy code được tạo như thể nó đã ở đó vào thời điểm tác giả.

Đánh giá `eval(..)` (dự định chơi chữ) trong ánh sáng đó, cần rõ ràng cách `eval(..)` cho phép bạn sửa đổi môi trường lexical scope bằng cách gian lận và giả vờ rằng mã tác giả-thời gian (hay còn gọi là từ vựng) đã ở đó suốt.

Trên các dòng code tiếp theo sau khi một `eval(..)` được thực thi, *Engine* sẽ không "biết" hoặc "quan tâm" rằng mã trước đó được đề cập đã được diễn giải động và do đó đã sửa đổi môi trường lexical scope. *Engine* sẽ đơn giản thực hiện tra cứu lexical scope của nó như mọi khi.

Hãy xem xét đoạn mã sau:

```js
function foo(str, a) {
	eval( str ); // cheating!
	console.log( a, b );
}

var b = 2;

foo( "var b = 3;", 1 ); // 1 3
```

Chuỗi `"var b = 3;"` được xử lý, tại điểm của lệnh gọi `eval (..)`, như là mã ở đó. Vì mã đó tình cờ khai báo một biến mới `b`, nó sửa đổi lexical scope hiện có của `foo(..)`. Trên thực tế, như đã đề cập ở trên, đoạn mã này thực sự tạo ra biến `b` bên trong `foo(..)` làm phủ lên `b` đã được khai báo trong scope bên ngoài (toàn cục).

Khi lệnh gọi `console.log(..)` được thực thi, nó tìm thấy cả `a` và` b` trong scope của `foo(..)` và không bao giờ tìm `b` bên ngoài. Do đó, chúng ta in ra "1 3" thay vì "1 2" như thường thấy.

**Ghi Chú:** Trong ví dụ này, vì lý do đơn giản, chuỗi "code" mà chúng ta chuyển vào là một ký tự cố định. Nhưng nó có thể dễ dàng được tạo theo chương trình bằng cách thêm các ký tự lại với nhau dựa trên logic của chương trình của bạn. `eval(..)` thường được sử dụng để thực thi mã được tạo động, vì đánh giá động về cơ bản code tĩnh từ một chuỗi ký tự sẽ không mang lại lợi ích thực sự nào nếu chỉ tạo code trực tiếp.

Theo mặc định, nếu một chuỗi code mà `eval(..)` thực thi chứa một hoặc nhiều khai báo (hoặc biến hoặc hàm), thì hành động này sẽ sửa đổi lexical scope hiện có mà `eval(..)` nằm trong đó. Về mặt kỹ thuật, `eval(..)` có thể được gọi "gián tiếp", thông qua nhiều thủ thuật khác nhau (ngoài cuộc thảo luận của chúng ta ở đây), khiến nó thay vào đó thực thi trong ngữ cảnh của phạm vi toàn cục, do đó sửa đổi nó. Nhưng trong cả hai trường hợp, `eval(..)` có thể sửa đổi lexical scope theo thời gian tác giả.

**Ghi Chú:** `eval(..)` khi được sử dụng strict-mode hoạt động trong lexical scope của riêng nó, có nghĩa là các khai báo được thực hiện bên trong `eval()` không thực sự sửa đổi scope bao quanh.

```js
function foo(str) {
   "use strict";
   eval( str );
   console.log( a ); // ReferenceError: a is not defined
}

foo( "var a = 2" );
```

Có những phương thức khác trong JavaScript có tác dụng rất giống với `eval(..)`. `setTimeout(..)` và `setInterval(..)` *có thể* lấy một chuỗi cho đối số đầu tiên tương ứng của chúng, nội dung của chúng được `đánh giá` như code của một hàm được tạo động. Đây là hành vi cũ, cũ và đã không còn được sử dụng từ lâu. Đừng làm điều đó!

Tương tự, phương thức khởi tạo hàm `new Function(..)` lấy một chuỗi code trong tham số **cuối cùng** của nó để biến thành một hàm được tạo động ((các) đối số đầu tiên, nếu có, là các tham số được đặt tên cho chức năng mới). Cú pháp hàm tạo hàm này an toàn hơn một chút so với `eval(..)`, nhưng vẫn nên tránh nó trong code của bạn.

Các trường hợp sử dụng để tạo code động bên trong chương trình của bạn là cực kỳ hiếm, vì sự suy giảm hiệu suất hầu như không bao giờ xứng đáng với khả năng.

### `with`

Tính năng khác đã được chấp nhận (và hiện không được dùng nữa!) Trong JavaScript đánh lừa lexical scope là từ khóa `with`. Có nhiều cách hợp lệ mà `with` có thể được giải thích, nhưng tôi sẽ chọn ở đây để giải thích nó từ quan điểm về cách nó tương tác và ảnh hưởng đến phạm vi từ vựng.

`with` thường được giải thích là một thủ pháp ngắn gọn để tạo nhiều tham chiếu thuộc tính chống lại một đối tượng *mà không* lặp lại chính tham chiếu đối tượng mỗi lần.

Cho ví dụ:

```js
var obj = {
	a: 1,
	b: 2,
	c: 3
};

// more "tedious" to repeat "obj"
obj.a = 2;
obj.b = 3;
obj.c = 4;

// "easier" short-hand
with (obj) {
	a = 3;
	b = 4;
	c = 5;
}
```

Tuy nhiên, có nhiều điều đang diễn ra ở đây hơn là chỉ viết tắt thuận tiện để truy cập thuộc tính đối tượng. Xem xét:

```js
function foo(obj) {
	with (obj) {
		a = 2;
	}
}

var o1 = {
	a: 3
};

var o2 = {
	b: 3
};

foo( o1 );
console.log( o1.a ); // 2

foo( o2 );
console.log( o2.a ); // undefined
console.log( a ); // 2 -- Oops, leaked global!
```

Trong đoạn code ví dụ này, hai đối tượng `o1` và` o2` được tạo. Một cái có thuộc tính `a`, còn cái kia thì không. Hàm `foo(..)` nhận tham chiếu đối tượng `obj` làm đối số và gọi `with (obj){..}` trên tham chiếu. Bên trong khối `with`, chúng ta tạo ra những gì có vẻ là một tham chiếu từ vựng thông thường cho một biến `a`, một tham chiếu LHS trên thực tế (xem Chương 1), để gán cho nó giá trị của `2`.

Khi chúng ta truyền vào `o1`, phép gán `a = 2` sẽ tìm thuộc tính `o1.a` và gán cho nó giá trị `2`, như được phản ánh trong câu lệnh `console.log(o1.a)` tiếp theo. Tuy nhiên, khi chúng ta truyền vào `o2`, vì nó không có thuộc tính `a` nên không có thuộc tính nào như vậy được tạo và `o2.a` vẫn là `undefined`.

Nhưng sau đó, chúng ta nhận thấy một tác dụng phụ(side-effect) đặc biệt, thực tế là một biến toàn cục `a` được tạo ra bởi phép gán `a = 2`. Làm sao có thể?

Câu lệnh `with` nhận một đối tượng, một đối tượng không có hoặc nhiều thuộc tính và **xử lý đối tượng đó như thể *nó* là một lexical scope hoàn toàn riêng biệt**, và do đó, các thuộc tính của đối tượng được coi là các định danh từ vựng được định nghĩa trong "scope" đó.

**Lưu ý:** Mặc dù khối `with` xử lý một đối tượng như một lexical scope, một khai báo `var` bình thường bên trong khối `with` đó sẽ không được xác định scope đối với khối `with` đó, mà thay vào đó là scope hàm chứa.

Trong khi hàm `eval(..)` có thể sửa đổi lexical scope hiện có nếu nó sử dụng một chuỗi code có một hoặc nhiều khai báo trong đó, thì câu lệnh `with` thực sự tạo ra một **lexical scope hoàn toàn mới** ngoài luồng , từ đối tượng bạn chuyển sang nó.

Hiểu theo cách này, "scope" được khai báo bởi câu lệnh `with` khi chúng ta truyền vào `o1` là `o1` và "scope" đó có một "identifier" trong đó tương ứng với thuộc tính `o1.a` . Nhưng khi chúng tôi sử dụng `o2` làm "scope", nó không có "identifier" `a` như vậy trong đó, và do đó, các quy tắc bình thường của tra cứu mã định danh LHS (xem Chương 1) đã xảy ra.

Cả "scope" của `o2`, cũng không phải scope của `foo(..)`, thậm chí cả scope toàn cục, đều không tìm thấy mã identifier `a`, vì vậy khi `a = 2` được thực thi, kết quả là trong toàn cầu tự động đang được tạo (vì chúng tôi không ở chế độ strict-mode).

Đó là một kiểu suy nghĩ kỳ lạ khi thấy `with` biến đổi, trong thời gian chạy, một đối tượng và các thuộc tính của nó thành một "scope" *with* "identifier". Nhưng đó là lời giải thích rõ ràng nhất mà tôi có thể đưa ra cho kết quả mà chúng ta thấy.

**Lưu ý:** Ngoài việc là một ý tưởng tồi khi sử dụng, cả `eval(..)` và `with` đều bị ảnh hưởng (hạn chế) bởi strict-mode. `with` hoàn toàn không được phép, trong khi các hình thức gián tiếp hoặc không an toàn khác `eval(..)`không được phép trong khi vẫn giữ được chức năng cốt lõi.

### Performance

Cả `eval (..)` và `with` đều gian lận lexical scope do tác giả xác định theo thời gian bằng cách sửa đổi hoặc tạo lexical scope trong thời gian chạy.

Vì vậy, vấn đề lớn là gì, bạn hỏi? Nếu chúng cung cấp chức năng phức tạp hơn và tính linh hoạt khi mã hóa, thì những tính năng *tốt* này không phải là? **Không.**

JavaScript *Engine* có một số tối ưu hóa hiệu suất mà nó thực hiện trong giai đoạn biên dịch. Một số trong số này bắt đầu có khả năng phân tích tĩnh về cơ bản mã khi nó lexes và xác định trước vị trí của tất cả các khai báo biến và hàm, do đó sẽ tốn ít nỗ lực hơn để giải quyết các identifier trong quá trình thực thi.

Nhưng nếu *Engine* tìm thấy một `eval(..)` hoặc `with` trong code, thì về cơ bản, nó phải *giả định* rằng tất cả nhận thức của nó về vị trí số nhận dạng có thể không hợp lệ, bởi vì nó không thể biết chính xác những gì tại thời điểm lexing mã bạn có thể chuyển đến `eval(..)` để sửa đổi phạm vi từ vựng hoặc nội dung của đối tượng mà bạn có thể chuyển đến `with` để tạo một phạm vi từ vựng mới được tham khảo.

Nói cách khác, theo nghĩa bi quan, hầu hết những tối ưu hóa mà nó *sẽ* tạo ra đều vô nghĩa nếu có `eval(..)` hoặc `with`, vì vậy nó chỉ đơn giản là không thực hiện tối ưu hóa *chút nào*.

Code của bạn gần như chắc chắn sẽ có xu hướng chạy chậm hơn chỉ đơn giản là bạn bao gồm `eval(..)` hoặc `with` ở bất kỳ đâu trong code. Cho dù *Engine* có thể cố gắng hạn chế các tác dụng phụ của những giả định bi quan này đến mức nào đi chăng nữa, **thì thực tế là không có sự tối ưu hóa, code sẽ chạy chậm hơn.**

## Review (TL;DR)

Lexical scope có nghĩa là scope được xác định bởi các quyết định theo tác giả thời gian về nơi các chức năng được khai báo. Giai đoạn biên dịch từ vựng về cơ bản có thể biết vị trí và cách thức khai báo tất cả các số nhận dạng, và do đó dự đoán cách chúng sẽ được tra cứu trong quá trình thực thi.

Hai cơ chế trong JavaScript có thể "gian lận" phạm vi từ vựng: `eval(..)` và `with`. Cái trước có thể sửa đổi lexical scope hiện có (trong thời gian chạy) bằng cách đánh giá một chuỗi "code" có một hoặc nhiều khai báo trong đó. Về cơ bản, scope sau này tạo ra một lexical scope hoàn toàn mới (một lần nữa, trong thời gian chạy) bằng cách coi một tham chiếu đối tượng *là* một "scope" và các thuộc tính của đối tượng đó là scope identifier.

Nhược điểm của các cơ chế này là nó đánh bại khả năng của *Engine* trong việc thực hiện tối ưu hóa thời gian biên dịch liên quan đến tra cứu scope, bởi vì *Engine* phải bi quan cho rằng những tối ưu hóa đó sẽ không hợp lệ. Code *sẽ* chạy chậm hơn do sử dụng một trong hai tính năng. **Không sử dụng chúng.**
