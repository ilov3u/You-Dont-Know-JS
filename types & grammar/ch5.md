# You Don't Know JS: Types & Grammar
# Chapter 5: Grammar

Chủ đề chính cuối cùng mà chúng tôi muốn giải quyết là cách cú pháp ngôn ngữ của JavaScript hoạt động (hay còn gọi là ngữ pháp của nó). Bạn có thể nghĩ rằng mình biết cách viết JS, nhưng có rất nhiều sắc thái đối với các phần khác nhau của ngữ pháp ngôn ngữ dẫn đến nhầm lẫn và hiểu sai, vì vậy chúng tôi muốn đi sâu vào những phần đó và làm sáng tỏ một số điều.

**Lưu ý:** Thuật ngữ "gramma (ngữ pháp)" có thể ít quen thuộc hơn với người đọc so với thuật ngữ "syntax (cú pháp)". Theo nhiều cách, chúng là các thuật ngữ tương tự nhau, mô tả *quy tắc* về cách thức hoạt động của ngôn ngữ. Có những khác biệt về sắc thái, nhưng chúng hầu như không quan trọng đối với cuộc thảo luận của chúng ta ở đây. Ngữ pháp cho JavaScript là một cách có cấu trúc để mô tả cách cú pháp (toán tử, từ khóa, v.v.) khớp với nhau thành các chương trình hợp lệ, được định dạng tốt. Nói cách khác, thảo luận về cú pháp mà không có ngữ pháp sẽ bỏ sót rất nhiều chi tiết quan trọng. Vì vậy, trọng tâm của chúng ta ở đây trong chương này được mô tả chính xác nhất là *ngữ pháp*, mặc dù cú pháp thô của ngôn ngữ là thứ mà các nhà phát triển tương tác trực tiếp.

## Statements & Expressions

Các nhà phát triển thường cho rằng thuật ngữ "câu lệnh (statement)" và "biểu thức (expression)" gần như tương đương nhau. Nhưng ở đây chúng ta cần phân biệt giữa hai loại này, bởi vì có một số khác biệt rất quan trọng trong các chương trình JS của chúng ta.

Để phân biệt, chúng ta hãy mượn từ thuật ngữ mà bạn có thể quen thuộc hơn: ngôn ngữ tiếng Anh.

Một "sentence (câu)" là một hình thức hoàn chỉnh của các từ diễn đạt một suy nghĩ. Nó bao gồm một hoặc nhiều "phrases (cụm từ)", mỗi cụm từ có thể được kết nối bằng dấu chấm câu hoặc liên từ ("và", "hoặc", v.v.). Bản thân một cụm từ có thể được tạo thành từ các cụm từ nhỏ hơn. Một số cụm từ không đầy đủ và không tự hoàn thành được nhiều việc, trong khi các cụm từ khác có thể tự đứng vững. Những quy tắc này được gọi chung là *ngữ pháp* của tiếng Anh.

Và do đó, nó phù hợp với ngữ pháp JavaScript. Câu lệnh (statement) là câu (sentence), biểu thức (expression) là cụm từ (phrase) và toán tử (operators) là liên từ/dấu chấm câu.

Mỗi biểu thức trong JS có thể được đánh giá thành một kết quả giá trị cụ thể, duy nhất. Ví dụ:

```js
var a = 3 * 6;
var b = a;
b;
```

Trong đoạn code này, `3 * 6` là một biểu thức - expression - (được đánh giá bằng giá trị `18`). Nhưng `a` trên dòng thứ hai cũng là một biểu thức, giống như `b` trên dòng thứ ba. Cả hai biểu thức `a` và `b` đều đánh giá các giá trị được lưu trữ trong các biến đó tại thời điểm đó, cũng là `18`.

Hơn nữa, mỗi dòng trong ba dòng là một câu lệnh chứa các biểu thức. `var a = 3 * 6` và `var b = a` được gọi là "câu lệnh khai báo" vì mỗi câu lệnh khai báo một biến (và tùy ý gán giá trị cho biến đó). Phép gán `a = 3 * 6` và `b = a` (trừ `var`) được gọi là biểu thức gán.

Dòng thứ ba chỉ chứa biểu thức `b`, nhưng bản thân nó cũng là một mệnh đề (mặc dù không phải là một mệnh đề thú vị cho lắm!). Điều này thường được gọi là một "expression statement (câu lệnh biểu thức.)"

### Statement Completion Values

Một thực tế khá ít được biết đến là tất cả các câu lệnh đều có giá trị hoàn thành (ngay cả khi giá trị đó chỉ là `undefined`).

Làm thế nào bạn thậm chí có thể nhìn thấy giá trị hoàn thành của một statement?

Câu trả lời rõ ràng nhất là nhập câu lệnh vào console dành cho nhà phát triển của trình duyệt của bạn, bởi vì khi bạn thực thi nó, theo mặc định, bảng console sẽ báo cáo giá trị hoàn thành của câu lệnh gần đây nhất mà nó đã thực thi.

Hãy xem xét `var b = a`. Giá trị hoàn thành của statement đó là gì?

Biểu thức gán `b = a` dẫn đến giá trị đã được gán (`18` ở trên), nhưng chính câu lệnh `var` lại dẫn đến `undefined`. Tại sao? Bởi vì các câu lệnh `var` được định nghĩa theo cách đó trong thông số kỹ thuật. Nếu bạn đặt `var a = 42;` vào console của mình, bạn sẽ thấy `undefined` được báo cáo lại thay vì `42`.

**Lưu ý:** Về mặt kỹ thuật, nó phức tạp hơn thế một chút. Trong đặc tả ES5, phần 12.2 "Variable Statement", thuật toán `VariableDeclaration` thực sự *có* trả về một giá trị (`string` chứa tên của biến được khai báo -- lạ nhỉ!?), nhưng giá trị đó về cơ bản là bị thuật toán `VariableStatement` nuốt chửng (ngoại trừ việc vòng lặp `for..in` sử dụng), thuật toán này buộc một giá trị hoàn thành trống (còn gọi là `undefined`).

Trên thực tế, nếu bạn đã thực hiện nhiều thử nghiệm code trong console của mình (hoặc trong môi trường JavaScript REPL -- công cụ read/evaluate/print/loop), bạn có thể đã thấy `undefined` được báo cáo sau nhiều câu lệnh khác nhau và có lẽ chưa bao giờ nhận ra tại sao hoặc đó là gì. Nói một cách đơn giản, console chỉ báo cáo giá trị hoàn thành của câu lệnh.

Nhưng những gì console in ra cho giá trị hoàn thành không phải là thứ chúng ta có thể sử dụng bên trong chương trình của mình. Vậy làm thế nào chúng ta có thể nắm bắt được giá trị hoàn thành?

Đó là một nhiệm vụ phức tạp hơn nhiều. Trước khi chúng tôi giải thích *how (cách thức)*, hãy khám phá *why (tại sao)* bạn muốn làm điều đó.

Chúng ta cần xem xét các loại giá trị hoàn thành câu lệnh khác. Ví dụ: bất kỳ khối `{ .. }` thông thường nào cũng có giá trị hoàn thành của giá trị hoàn thành của câu lệnh/biểu thức chứa cuối cùng của nó.

Xem xét:

```js
var b;

if (true) {
	b = 4 + 38;
}
```

Nếu bạn đã nhập nội dung đó vào console/REPL của mình, bạn có thể thấy `42` được báo cáo, vì `42` là giá trị hoàn thành của khối `if`, khối này nhận giá trị hoàn thành của câu lệnh biểu thức gán cuối cùng của nó `b = 4+38`.

Nói cách khác, giá trị hoàn thành của một khối giống như một *implicit return (trả về ngầm định)* của giá trị câu lệnh cuối cùng trong khối.

**Lưu ý:** Đây là khái niệm quen thuộc trong các ngôn ngữ như CoffeeScript, có giá trị implicit `return` từ `function` giống với giá trị câu lệnh cuối cùng trong function.

Nhưng có một vấn đề rõ ràng. Loại code này không hoạt động:

```js
var a, b;

a = if (true) {
	b = 4 + 38;
};
```

Chúng ta không thể nắm bắt giá trị hoàn thành của một câu lệnh và gán nó vào một biến khác theo bất kỳ cách ngữ pháp/cú pháp dễ dàng nào (ít nhất là chưa!).

Vậy chúng ta có thể làm gì?

**Cảnh báo**: Chỉ dành cho mục đích demo -- không thực sự làm như sau trong code thực của bạn!

Chúng ta có thể sử dụng hàm `eval(..)` (đôi khi được phát âm là "evil (ác)") bị sai nhiều để nắm bắt giá trị hoàn thành này.

```js
var a, b;

a = eval( "if (true) { b = 4 + 38; }" );

a;	// 42
```

Yeeeaaahhhh. Điều đó thật tồi tệ. Nhưng nó đã có tác dụng! Và nó minh họa điểm rằng các giá trị hoàn thành câu lệnh là một điều thực tế có thể được nắm bắt không chỉ trong console của chúng tôi mà còn trong các chương trình của chúng tôi.

Có một đề xuất cho ES7 được gọi là "do expression (biểu thức thực hiện)". Đây là cách nó có thể hoạt động:

```js
var a, b;

a = do {
	if (true) {
		b = 4 + 38;
	}
};

a;	// 42
```

Biểu thức `do { .. }` thực thi một khối (có một hoặc nhiều câu lệnh trong đó) và giá trị hoàn thành câu lệnh cuối cùng bên trong khối trở thành giá trị hoàn thành *của* biểu thức `do`, sau đó có thể được gán cho `a` như hình.

Ý tưởng chung là có thể coi các câu lệnh là các biểu thức -- chúng có thể hiển thị bên trong các câu lệnh khác -- mà không cần gói chúng trong một biểu thức hàm nội tuyến và thực hiện `return ..` rõ ràng.

Hiện tại, các giá trị hoàn thành câu lệnh không nhiều hơn những chuyện vặt vãnh. Nhưng chúng có thể sẽ có nhiều ý nghĩa hơn khi JS phát triển và hy vọng rằng các biểu thức `do { .. }` sẽ làm giảm sự cám dỗ để sử dụng những thứ như `eval(..)`.

**Cảnh báo:** Lặp lại lời khuyên trước đây của tôi: tránh `eval(..)`. Nghiêm túc. Xem tập *Scope & Closure* của bộ sách này để được giải thích thêm.

### Expression Side Effects

Hầu hết các biểu hiện không có side effects. Ví dụ:

```js
var a = 2;
var b = a + 3;
```

Biểu thức `a + 3` *bản thân nó* không có side effects, ví dụ như thay đổi `a`. Nó có một kết quả là `5` và kết quả đó được gán cho `b` trong câu lệnh `b = a + 3`.

Ví dụ phổ biến nhất của một biểu thức có (có thể) side effect là một function call expression (biểu thức gọi hàm):

```js
function foo() {
	a = a + 1;
}

var a = 1;
foo();		// result: `undefined`, side effect: changed `a`
```

Tuy nhiên, có những biểu hiện side effects khác. Ví dụ:

```js
var a = 42;
var b = a++;
```

Biểu thức `a++` có hai hành vi riêng biệt. *Đầu tiên*, nó trả về giá trị hiện tại của `a`, là `42` (sau đó được gán cho `b`). Nhưng *next*, nó thay đổi giá trị của chính `a`, tăng giá trị đó lên một.

```js
var a = 42;
var b = a++;

a;	// 43
b;	// 42
```

Nhiều nhà phát triển sẽ lầm tưởng rằng `b` có giá trị `43` giống như `a`. Nhưng sự nhầm lẫn xuất phát từ việc không xem xét đầy đủ *về* side effects của toán tử `++`.

Toán tử tăng `++` và toán tử giảm `--` đều là toán tử đơn nguyên (xem Chương 4), có thể được sử dụng ở vị trí hậu tố ("sau") hoặc vị trí tiền tố ("trước").

```js
var a = 42;

a++;	// 42
a;		// 43

++a;	// 44
a;		// 44
```

Khi `++` được sử dụng ở vị trí tiền tố là `++a`, side effect của nó (tăng `a`) xảy ra *trước* giá trị được trả về từ biểu thức, thay vì *sau* như với `a++`.

**Lưu ý:** Bạn có nghĩ `++a++` là cú pháp hợp pháp không? Nếu thử, bạn sẽ gặp lỗi `ReferenceError`, nhưng tại sao? Bởi vì các side-effecting operators **yêu cầu tham chiếu biến** để nhắm mục tiêu các side effects của chúng. Đối với `++a++`, phần `a++` được đánh giá trước (do ưu tiên của toán tử -- xem bên dưới), phần này mang lại giá trị của `a` _trước_ phần tăng. Nhưng sau đó, nó cố gắng đánh giá `++42`, mà (nếu bạn thử nó) đưa ra cùng một lỗi `ReferenceError`, vì `++` không thể có side effects trực tiếp trên một giá trị như `42`.

Đôi khi người ta lầm tưởng rằng bạn có thể gói gọn side effect *after* của `a++` bằng cách gói nó trong một cặp `( )`, như:

```js
var a = 42;
var b = (a++);

a;	// 43
b;	// 42
```

Thật không may, bản thân `( )` không xác định một biểu thức được bao bọc mới sẽ được đánh giá *sau* *after side effect* của biểu thức `a++`, như chúng ta có thể đã hy vọng. Trên thực tế, ngay cả khi có, `a++` trả về `42` trước và trừ khi bạn có một biểu thức khác đánh giá lại `a` sau side effect của `++`, bạn sẽ không nhận được `43` từ đó biểu thức, vì vậy `b` sẽ không được gán `43`.

Tuy nhiên, có một tùy chọn: toán tử dấu phẩy chuỗi câu lệnh `,`. Toán tử này cho phép bạn xâu chuỗi nhiều câu lệnh biểu thức độc lập lại với nhau thành một câu lệnh:

```js
var a = 42, b;
b = ( a++, a );

a;	// 43
b;	// 43
```

**Lưu ý:** `( .. )` xung quanh `a++, a` là bắt buộc ở đây. Lý do là quyền ưu tiên của toán tử, mà chúng ta sẽ đề cập sau trong chương này.

Biểu thức `a++, a` có nghĩa là biểu thức câu lệnh `a` thứ hai được ước tính *sau* *after side effects* của biểu thức câu lệnh `a++` đầu tiên, có nghĩa là nó trả về giá trị `43` để gán cho `b `.

Một ví dụ khác về side-effecting operator là `delete`. Như chúng tôi đã trình bày trong Chương 2, `delete` được sử dụng để xóa thuộc tính khỏi `object` hoặc vị trí khỏi `array`. Nhưng nó thường chỉ được gọi là một tuyên bố độc lập:

```js
var obj = {
	a: 42
};

obj.a;			// 42
delete obj.a;	// true
obj.a;			// undefined
```

Giá trị kết quả của toán tử `delete` là `true` nếu thao tác được yêu cầu hợp lệ/được phép hoặc `false` nếu không. Nhưng side effect của toán tử là nó loại bỏ thuộc tính (hoặc vị trí array).

**Lưu ý:** Ý nghĩa của từ hợp lệ/được phép là gì? Các thuộc tính không tồn tại hoặc các thuộc tính tồn tại và là configurable (xem Chương 3 của tập *this & Object Prototypes* của bộ sách này) sẽ trả về `true` từ toán tử `delete`. Nếu không, kết quả sẽ là `false` hoặc lỗi.

Một ví dụ cuối cùng về side-effecting operator, có thể vừa rõ ràng vừa không rõ ràng, là toán tử gán `=`.

Xem xét:

```js
var a;

a = 42;		// 42
a;			// 42
```

Có vẻ như `=` trong `a = 42` không phải là side-effecting operator cho biểu thức. Nhưng nếu chúng ta kiểm tra giá trị kết quả của câu lệnh `a = 42`, thì đó là giá trị vừa được gán (`42`), do đó, việc gán cùng giá trị đó cho `a` về cơ bản là một side effect.

**Mẹo:** Lý do tương tự về side effect áp dụng cho các toán tử gán tổ hợp như `+=`, `-=`, v.v. Ví dụ: `a = b += 2` được xử lý trước tiên dưới dạng `b + = 2` (là `b = b + 2`) và kết quả của phép gán *đó* `=` sau đó được gán cho `a`.

Hành vi mà một biểu thức gán (hoặc câu lệnh) dẫn đến giá trị được gán chủ yếu hữu ích cho các phép gán theo chuỗi, chẳng hạn như:

```js
var a, b, c;

a = b = c = 42;
```

Ở đây, `c = 42` được tính thành `42` (với side effect là gán `42` cho `c`), sau đó `b = 42` được tính thành `42` (với side effect là gán `42 ` thành `b`) và cuối cùng `a = 42` được tính (với side effect là gán `42` cho `a`).

**Cảnh báo:** Một lỗi phổ biến mà các nhà phát triển mắc phải với các phép gán chuỗi giống như `var a = b = 42`. Trong khi điều này trông giống như điều tương tự, nó không phải. Nếu câu lệnh đó xảy ra mà không có `var b` riêng biệt (ở đâu đó trong scope) để chính thức khai báo `b`, thì `var a = b = 42` sẽ không trực tiếp khai báo `b`. Tùy thuộc vào chế độ `strict`, điều đó sẽ gây ra lỗi hoặc tạo ra một accidental global (xem tập *Phạm vi & Đóng cửa* của bộ sách này).

Một kịch bản khác để xem xét:

```js
function vowels(str) {
	var matches;

	if (str) {
		// pull out all the vowels
		matches = str.match( /[aeiou]/g );

		if (matches) {
			return matches;
		}
	}
}

vowels( "Hello World" ); // ["e","o","o"]
```

Điều này hoạt động và nhiều nhà phát triển thích như vậy. Nhưng sử dụng một thành ngữ mà chúng ta tận dụng tác dụng phụ của phép gán, chúng ta có thể đơn giản hóa bằng cách kết hợp hai câu lệnh `if` thành một:

```js
function vowels(str) {
	var matches;

	// pull out all the vowels
	if (str && (matches = str.match( /[aeiou]/g ))) {
		return matches;
	}
}

vowels( "Hello World" ); // ["e","o","o"]
```

**Lưu ý:** `( .. )` xung quanh `matches = str.match..` là bắt buộc. Lý do là thứ tự ưu tiên của toán tử, mà chúng ta sẽ đề cập đến trong phần "Thứ tự ưu tiên của toán tử" ở phần sau của chương này.

Tôi thích kiểu viết ngắn hơn này, vì tôi nghĩ nó làm rõ ràng hơn rằng hai điều kiện thực tế có liên quan với nhau hơn là tách biệt. Nhưng như với hầu hết các lựa chọn phong cách trong JS, đó hoàn toàn là ý kiến ​​về cái nào *tốt hơn*.

### Contextual Rules

Có khá nhiều chỗ trong các quy tắc ngữ pháp JavaScript trong đó cùng một cú pháp có nghĩa là những thứ khác nhau tùy thuộc vào vị trí/cách nó được sử dụng. Điều này có thể gây ra khá nhiều nhầm lẫn.

Chúng tôi sẽ không liệt kê đầy đủ tất cả các trường hợp như vậy ở đây mà chỉ nêu ra một số trường hợp phổ biến.

#### `{ .. }` Curly Braces

Có hai vị trí chính (và nhiều vị trí khác nữa khi JS phát triển!) mà một cặp dấu ngoặc nhọn `{ .. }` sẽ hiển thị trong mã của bạn. Chúng ta hãy xem xét từng người trong số họ.

##### Object Literals

Đầu tiên, là một `object` literal:

```js
// assume there's a `bar()` function defined

var a = {
	foo: bar()
};
```

Làm thế nào để chúng tôi biết đây là một `object` literal? Bởi vì cặp `{ .. }` là một giá trị được gán cho `a`.

**Lưu ý:** Tham chiếu `a` được gọi là "l-value" (còn gọi là giá trị bên trái) vì nó là mục tiêu của một phép gán. Cặp `{ .. }` là một "r-value" (còn gọi là giá trị bên tay phải) vì nó được sử dụng *chỉ* làm giá trị (trong trường hợp này là nguồn của một phép gán).

##### Labels

Điều gì xảy ra nếu chúng ta xóa phần `var a =` của đoạn code trên?

```js
// assume there's a `bar()` function defined

{
	foo: bar()
}
```

Rất nhiều nhà phát triển cho rằng cặp `{ .. }` chỉ là một standalone `object` literal (`object` độc lập) không được chỉ định ở bất kỳ đâu. Nhưng nó thực sự hoàn toàn khác nhau.

Ở đây, `{ .. }` chỉ là một khối mã thông thường. Việc có một khối `{ .. }` độc lập như thế không phải là thành ngữ trong JavaScript (còn hơn thế nữa trong các ngôn ngữ khác!), nhưng đó là ngữ pháp JS hoàn toàn hợp lệ. Nó có thể đặc biệt hữu ích khi kết hợp với khai báo phạm vi khối `let` (xem cuốn *Scope & Closure* trong bộ sách này).

Khối mã `{ .. }` ở đây về mặt chức năng khá giống với khối mã được đính kèm với một số câu lệnh, như vòng lặp `for`/`while`, điều kiện `if`, v.v.

Nhưng nếu đó là một khối mã bình thường, thì cú pháp `foo: bar()` trông kỳ lạ đó là gì và nó hợp pháp như thế nào?

Đó là do một tính năng ít được biết đến (và nói thẳng ra là không khuyến khích) trong JavaScript được gọi là "các câu lệnh được gắn label (nhãn)". `foo` là label (nhãn) cho câu lệnh `bar()` (đã bỏ qua dấu `;` -- xem phần "Dấu chấm phẩy tự động" ở phần sau của chương này). Nhưng ý nghĩa của một câu lệnh được dán label (nhãn) là gì?

Nếu JavaScript có câu lệnh `goto`, thì về mặt lý thuyết, bạn có thể nói `goto foo` và thực hiện nhảy tới vị trí đó trong code. `goto` thường được coi là những thành ngữ mã hóa khủng khiếp vì chúng làm cho code khó hiểu hơn nhiều (hay còn gọi là "code spaghetti"), vì vậy *rất tốt* là JavaScript không có `goto`.

Tuy nhiên, JS *có* hỗ trợ một dạng đặc biệt, giới hạn của `goto`: các bước nhảy có nhãn. Cả hai câu lệnh `continue` và `break` đều có thể tùy chọn chấp nhận một nhãn cụ thể, trong trường hợp đó, luồng chương trình "nhảy" giống như `goto`. Coi như:

```js
// `foo` labeled-loop
foo: for (var i=0; i<4; i++) {
	for (var j=0; j<4; j++) {
		// whenever the loops meet, continue outer loop
		if (j == i) {
			// jump to the next iteration of
			// the `foo` labeled-loop
			continue foo;
		}

		// skip odd multiples
		if ((j * i) % 2 == 1) {
			// normal (non-labeled) `continue` of inner loop
			continue;
		}

		console.log( i, j );
	}
}
// 1 0
// 2 0
// 2 1
// 3 0
// 3 2
```

**Lưu ý:** `continue foo` không có nghĩa là "đi đến vị trí được gắn nhãn 'foo' để tiếp tục", mà là "tiếp tục vòng lặp được gắn nhãn 'foo' với lần lặp tiếp theo." Vì vậy, nó không *thực sự* là một `goto` tùy ý.

Như bạn có thể thấy, chúng tôi đã bỏ qua bước lặp bội số lẻ `3 1`, nhưng bước nhảy vòng lặp có nhãn cũng bỏ qua các lần lặp `1 1` và `2 2`.

Có lẽ một hình thức nhảy có nhãn hữu ích hơn một chút là với `break __` từ bên trong vòng lặp bên trong nơi bạn muốn thoát ra khỏi vòng lặp bên ngoài. Nếu không có nhãn `break`, logic tương tự này đôi khi có thể hơi khó viết:

```js
// `foo` labeled-loop
foo: for (var i=0; i<4; i++) {
	for (var j=0; j<4; j++) {
		if ((i * j) >= 3) {
			console.log( "stopping!", i, j );
			// break out of the `foo` labeled loop
			break foo;
		}

		console.log( i, j );
	}
}
// 0 0
// 0 1
// 0 2
// 0 3
// 1 0
// 1 1
// 1 2
// stopping! 1 3
```

**Lưu ý:** `break foo` không có nghĩa là "đi đến vị trí được gắn nhãn 'foo' để tiếp tục", mà là "thoát ra khỏi vòng lặp/khối được gắn nhãn 'foo' và tiếp tục *sau* nó." Không chính xác là `goto` theo nghĩa truyền thống, phải không?

Phương án thay thế `break` không được gắn nhãn cho cách trên có thể sẽ cần liên quan đến một hoặc nhiều chức năng, quyền truy cập biến phạm vi được chia sẻ, v.v. Nó có thể sẽ gây nhầm lẫn hơn so với `break` được gắn nhãn, vì vậy ở đây sử dụng `break` có gắn nhãn có lẽ là cách tốt nhất lựa chọn tốt hơn.

Nhãn có thể áp dụng cho block không vòng lặp, nhưng chỉ `break` mới có thể tham chiếu nhãn không vòng lặp như vậy. Bạn có thể thực hiện `break ___` được gắn nhãn ra khỏi bất kỳ block được gắn nhãn nào, nhưng bạn không thể `continue ___` nhãn không vòng lặp, bạn cũng không thể thực hiện `break` ra khỏi block không được gắn nhãn.

```js
function foo() {
	// `bar` labeled-block
	bar: {
		console.log( "Hello" );
		break bar;
		console.log( "never runs" );
	}
	console.log( "World" );
}

foo();
// Hello
// World
```

Các vòng lặp/block được gắn nhãn là cực kỳ hiếm và thường bị phản đối. Tốt nhất là tránh chúng nếu có thể; ví dụ: sử dụng các lệnh gọi hàm thay vì các bước nhảy vòng lặp. Nhưng có lẽ có một số trường hợp hạn chế mà chúng có thể hữu ích. Nếu bạn định sử dụng bước nhảy có nhãn, hãy đảm bảo ghi lại những gì bạn đang làm với nhiều nhận xét!

Mọi người thường tin rằng JSON là một tập hợp con thích hợp của JS, do đó, một chuỗi JSON (như `{"a":42}` -- lưu ý các dấu ngoặc kép xung quanh tên thuộc tính mà JSON yêu cầu!) được cho là hợp lệ chương trình JavaScript. **Không đúng!** Hãy thử đặt `{"a":42}` vào JS console của bạn và bạn sẽ gặp lỗi.

Đó là bởi vì nhãn câu lệnh không thể có dấu ngoặc kép xung quanh chúng, vì vậy `"a"` không phải là nhãn hợp lệ và do đó `:` không thể đứng ngay sau nó.

Vì vậy, JSON thực sự là một tập hợp con của cú pháp JS, nhưng bản thân JSON không phải là ngữ pháp JS hợp lệ.

Một quan niệm sai lầm cực kỳ phổ biến dọc theo những dòng này là nếu bạn tải tệp JS vào thẻ `<script src=..>` chỉ có nội dung JSON trong đó (như từ lệnh gọi API), thì dữ liệu sẽ được đọc dưới dạng JavaScript hợp lệ nhưng không thể truy cập được vào chương trình. JSON-P (thực hành gói dữ liệu JSON trong một lệnh gọi hàm, như `foo({"a":42})`) thường được cho là để giải quyết tình trạng không thể truy cập này bằng cách gửi giá trị tới một trong các hàm của chương trình.

**Không đúng!** Bản thân giá trị JSON hoàn toàn hợp lệ `{"a":42}` sẽ thực sự gây ra lỗi JS vì giá trị này được hiểu là khối câu lệnh có nhãn không hợp lệ. Nhưng `foo({"a":42})` là JS hợp lệ vì trong đó, `{"a":42}` là một giá trị chữ `đối tượng` được truyền cho `foo(..)`. Vì vậy, nói một cách chính xác, **JSON-P biến JSON thành ngữ pháp JS hợp lệ!**

##### Blocks

Một gotcha JS thường được trích dẫn khác (liên quan đến coercion -- xem Chương 4) là:

```js
[] + {}; // "[object Object]"
{} + []; // 0
```

Điều này dường như ngụ ý rằng toán tử `+` cho các kết quả khác nhau tùy thuộc vào toán hạng đầu tiên là `[]` hay `{}`. Nhưng điều đó thực sự không có gì để làm với nó!

Ở dòng đầu tiên, `{}` xuất hiện trong biểu thức của toán tử `+`, và do đó được hiểu là một giá trị thực (một `object` trống). Chương 4 giải thích rằng `[]` bị ép buộc thành `""` và do đó `{}` cũng bị ép buộc thành một giá trị `string` do đó thành: `"[object Object]"`.

Nhưng ở dòng thứ hai, `{}` được hiểu là một standalone `{}` empty block (không có tác dụng gì). Các block không cần dấu chấm phẩy để kết thúc chúng, vì vậy việc thiếu một dấu chấm phẩy ở đây không phải là vấn đề. Cuối cùng, `+ []` là một biểu thức *explicitly coerces* (xem Chương 4) `[]` thành một `number`, là giá trị `0`.

##### Object Destructuring

Bắt đầu với ES6, một vị trí khác mà bạn sẽ thấy các cặp `{ .. }` hiển thị là "destructuring assignments" (xem tập *ES6 & Beyond* của bộ sách này để biết thêm thông tin), cụ thể là destructuring `object`. Xem xét:

```js
function getData() {
	// ..
	return {
		a: 42,
		b: "foo"
	};
}

var { a, b } = getData();

console.log( a, b ); // 42 "foo"
```

Như bạn có thể biết, `var { a , b } = ..` là một dạng ES6 destructuring assignment, gần tương đương với:

```js
var res = getData();
var a = res.a;
var b = res.b;
```

**Lưu ý:** `{ a, b }` thực ra là viết tắt ES6 destructuring cho `{ a: a, b: b }`, vì vậy một trong hai cách này sẽ hoạt động, nhưng `{ a, b }` ngắn hơn sẽ được mong đợi trở thành hình thức ưa thích.

Object destructuring bằng cặp `{ .. }` cũng có thể được sử dụng cho các đối số hàm được đặt tên, đây là đường cho cùng loại gán thuộc tính đối tượng ngầm định này:

```js
function foo({ a, b, c }) {
	// no need for:
	// var a = obj.a, b = obj.b, c = obj.c
	console.log( a, b, c );
}

foo( {
	c: [1,2,3],
	a: 42,
	b: "foo"
} );	// 42 "foo" [1, 2, 3]
```

Vì vậy, ngữ cảnh chúng ta sử dụng các cặp `{ .. }` hoàn toàn xác định ý nghĩa của chúng, điều này minh họa sự khác biệt giữa cú pháp và ngữ pháp. Điều rất quan trọng là phải hiểu những sắc thái này để tránh những diễn giải không mong muốn của công cụ JS.

#### `else if` And Optional Blocks

Một quan niệm sai lầm phổ biến là JavaScript có mệnh đề `else if`, bởi vì bạn có thể làm:

```js
if (a) {
	// ..
}
else if (b) {
	// ..
}
else {
	// ..
}
```

Nhưng có một đặc điểm ẩn của ngữ pháp JS ở đây: không có `else if`. Nhưng các câu lệnh `if` và `else` được phép bỏ qua `{ }` xung quanh block đính kèm của chúng nếu chúng chỉ chứa một câu lệnh duy nhất. Chắc chắn bạn đã thấy điều này nhiều lần trước đây:

```js
if (a) doSomething( a );
```

Nhiều hướng dẫn về phong cách JS sẽ nhấn mạnh rằng bạn luôn sử dụng `{ }` xung quanh một khối câu lệnh, như:

```js
if (a) { doSomething( a ); }
```

Tuy nhiên, quy tắc ngữ pháp chính xác giống như vậy áp dụng cho mệnh đề `else`, do đó, dạng `else if` mà bạn có thể luôn mã hóa được *thực sự* phân tích thành:

```js
if (a) {
	// ..
}
else {
	if (b) {
		// ..
	}
	else {
		// ..
	}
}
```

`if (b) { .. } else { .. }` là một câu lệnh đơn theo sau `else`, vì vậy bạn có thể đưa `{ }` xung quanh vào hoặc không. Nói cách khác, khi bạn sử dụng `else if`, về mặt kỹ thuật, bạn đang phá vỡ quy tắc hướng dẫn phong cách phổ biến đó và chỉ xác định `else` của bạn bằng một câu lệnh `if` duy nhất.

Tất nhiên, thành ngữ `else if` cực kỳ phổ biến và dẫn đến một mức độ thụt đầu dòng ít hơn, vì vậy nó rất hấp dẫn. Cho dù bạn làm theo cách nào, chỉ cần gọi rõ ràng trong hướng dẫn/quy tắc văn phong của riêng bạn và đừng cho rằng những thứ như `else if` là các quy tắc ngữ pháp trực tiếp.

## Operator Precedence

Như chúng ta đã đề cập trong Chương 4, phiên bản `&&` và `||` của JavaScript thú vị ở chỗ chúng chọn và trả về một trong các toán hạng của chúng, thay vì chỉ dẫn đến `true` hoặc `false`. Thật dễ dàng để giải thích nếu chỉ có hai toán hạng và một toán tử.

```js
var a = 42;
var b = "foo";

a && b;	// "foo"
a || b;	// 42
```

Nhưng còn khi có hai toán tử tham gia và ba toán hạng thì sao?

```js
var a = 42;
var b = "foo";
var c = [1,2,3];

a && b || c; // ???
a || b && c; // ???
```

Để hiểu kết quả của những biểu thức đó là gì, chúng ta sẽ cần hiểu quy tắc nào chi phối cách các toán tử được xử lý khi có nhiều hơn một biểu thức xuất hiện trong một biểu thức.

Những quy tắc này được gọi là "operator precedence (toán tử ưu tiên)."

Tôi cá rằng hầu hết độc giả cảm thấy họ nắm bắt được operator precedence. Nhưng cũng như mọi thứ khác mà chúng tôi đã đề cập trong bộ sách này, chúng tôi sẽ tìm hiểu và đánh giá sự hiểu biết đó để xem nó thực sự vững chắc đến mức nào và hy vọng sẽ học được một số điều mới trong quá trình thực hiện.

Nhớ lại ví dụ trước đó:

```js
var a = 42, b;
b = ( a++, a );

a;	// 43
b;	// 43
```

Nhưng điều gì sẽ xảy ra nếu chúng ta loại bỏ `( )`?

```js
var a = 42, b;
b = a++, a;

a;	// 43
b;	// 42
```

Chờ đã! Tại sao điều đó lại thay đổi giá trị được gán cho `b`?

Vì toán tử `,` có độ ưu tiên thấp hơn toán tử `=`. Vì vậy, `b = a++, a` được hiểu là `(b = a++), a`. Bởi vì (như chúng tôi đã giải thích trước đó) `a++` có *after side effect*, nên giá trị được gán cho `b` là giá trị `42` trước khi `++` thay đổi `a`.

Đây chỉ là một vấn đề đơn giản cần hiểu về quyền ưu tiên của toán tử. Nếu bạn định sử dụng `,` làm toán tử chuỗi câu lệnh, điều quan trọng cần biết là nó thực sự có mức độ ưu tiên thấp nhất. Mọi toán tử khác sẽ liên kết chặt chẽ hơn `,` sẽ.

Bây giờ, hãy nhớ lại ví dụ này từ trước đó:

```js
if (str && (matches = str.match( /[aeiou]/g ))) {
	// ..
}
```

Chúng tôi đã nói `( )` xung quanh phép gán là bắt buộc, nhưng tại sao? Bởi vì `&&` có mức độ ưu tiên cao hơn `=`, nên nếu không có `( )` để bắt buộc liên kết, thay vào đó, biểu thức sẽ được coi là `(str &&match) = str.match..`. Nhưng đây sẽ là một lỗi, bởi vì kết quả của `(str && Match)` sẽ không phải là một biến, mà thay vào đó là một giá trị (trong trường hợp này là `undefined`), và do đó, nó không thể là bên trái- mặt trái của một bài tập `=`!

OK, vì vậy bạn có thể nghĩ rằng bạn đã hiểu được thứ tự ưu tiên của toán tử này.

Hãy chuyển sang một ví dụ phức tạp hơn (mà chúng ta sẽ thực hiện trong suốt các phần tiếp theo của chương này) để *thực sự* kiểm tra sự hiểu biết của bạn:

```js
var a = 42;
var b = "foo";
var c = false;

var d = a && b || c ? c || b ? a : c && b : a;

d;		// ??
```

OK, xấu xa, tôi thừa nhận nó. Sẽ không ai viết một chuỗi các biểu thức như vậy, phải không? *Có thể* là không, nhưng chúng ta sẽ sử dụng nó để kiểm tra các vấn đề khác nhau xung quanh việc xâu chuỗi nhiều toán tử lại với nhau, đây *là* một nhiệm vụ rất phổ biến.

Kết quả ở trên là `42`. Nhưng điều đó gần như không thú vị bằng cách chúng ta có thể tìm ra câu trả lời đó mà không cần cắm nó vào chương trình JS để JavaScript sắp xếp nó.

Nào cùng phân tích.

Câu hỏi đầu tiên -- có thể bạn chưa từng nghĩ đến để hỏi -- là, phần đầu tiên (`a && b || c`) có hoạt động như `(a && b) || c` hay như `a && (b || c)`? Bạn có biết chắc chắn không? Bạn thậm chí có thể thuyết phục bản thân rằng họ thực sự khác nhau không?

```js
(false && true) || true;	// true
false && (true || true);	// false
```

Vì vậy, có bằng chứng họ khác nhau. Tuy nhiên, làm thế nào để `false && true || true` thực hiện? Câu trả lời:

```js
false && true || true;		// true
(false && true) || true;	// true
```

Vì vậy, chúng tôi có câu trả lời của chúng tôi. Toán tử `&&` được tính toán đầu tiên và toán tử `||` được toán thứ hai.

Nhưng đó chỉ là do xử lý từ trái sang phải? Hãy đảo ngược thứ tự của các toán tử:

```js
true || false && false;		// true

(true || false) && false;	// false -- nope
true || (false && false);	// true -- winner, winner!
```

Bây giờ chúng tôi đã chứng minh rằng `&&` được tính toán trước rồi mới đến `||`, và trong trường hợp này, điều đó thực sự trái ngược với quy trình xử lý từ trái sang phải được mong đợi chung.

Vậy nguyên nhân của hành vi này là gì? **Operator precedence**.

Mỗi ngôn ngữ xác định danh sách ưu tiên toán tử của riêng mình. Tuy nhiên, thật đáng thất vọng khi các nhà phát triển JS đã đọc danh sách của JS.

Nếu bạn biết rõ về nó, thì các ví dụ trên sẽ không làm bạn vấp ngã chút nào, bởi vì bạn đã biết rằng `&&` có nhiều tiền lệ hơn `||`. Nhưng tôi cá rằng một số lượng lớn độc giả đã phải suy nghĩ về nó một chút.

**Lưu ý:** Thật không may, đặc tả JS không thực sự có danh sách ưu tiên toán tử của nó ở một vị trí duy nhất, thuận tiện. Bạn phải phân tích cú pháp và hiểu tất cả các quy tắc ngữ pháp. Vì vậy, chúng tôi sẽ cố gắng sắp xếp các bit phổ biến và hữu ích hơn ở đây theo định dạng thuận tiện hơn. Để biết danh sách đầy đủ về mức độ ưu tiên của toán tử, hãy xem "Mức độ ưu tiên của toán tử" trên trang web MDN (* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence).

### Short Circuited

Trong Chương 4, chúng tôi đã đề cập trong một lưu ý phụ về bản chất "đoản mạch(Short Circuited)" của các toán tử như `&&` và `||`. Bây giờ chúng ta hãy xem lại chi tiết hơn.

Đối với cả toán tử `&&` và `||`, toán hạng bên phải sẽ **không được đánh giá** nếu toán hạng bên trái đủ để xác định kết quả của phép toán. Do đó mới có tên gọi "Short Circuited" (ở chỗ nếu có thể thì sẽ đi tắt sớm).

Ví dụ: với `a && b`, `b` không được đánh giá nếu `a` là sai, bởi vì kết quả của toán hạng `&&` đã là chắc chắn, vì vậy không cần bận tâm kiểm tra `b`. Tương tự, với `a || b`, nếu `a` là đúng, thì kết quả của toán hạng đã là chắc chắn, vì vậy không có lý do gì để kiểm tra `b`.

Short circuiting có thể rất hữu ích và thường được sử dụng:

```js
function doSomething(opts) {
	if (opts && opts.cool) {
		// ..
	}
}
```

Phần `opts` của thử nghiệm `opts && opts.cool` hoạt động như một loại bảo vệ, bởi vì nếu `opts` không được đặt (hoặc không phải là `đối tượng`), biểu thức `opts.cool` sẽ báo lỗi . Thử nghiệm `opts` không thành công cộng với đoản mạch có nghĩa là `opts.cool` thậm chí sẽ không được đánh giá, do đó không có lỗi!

Tương tự, bạn có thể sử dụng `||` short circuiting:

```js
function doSomething(opts) {
	if (opts.cache || primeCache()) {
		// ..
	}
}
```

Ở đây, trước tiên, chúng tôi kiểm tra `opts.cache` và nếu có, chúng tôi sẽ không gọi hàm `primeCache()`, do đó tránh được công việc có thể không cần thiết.

### Tighter Binding

Nhưng hãy chuyển sự chú ý của chúng ta trở lại ví dụ về câu lệnh phức tạp trước đó với tất cả các toán tử được xâu chuỗi, cụ thể là `? :` bộ phận toán tử ba ngôi. `? :` có nhiều hay ít quyền ưu tiên hơn các toán tử `&&` và `||`?

```js
a && b || c ? c || b ? a : c && b : a
```

Có phải như thế này không:

```js
a && b || (c ? c || (b ? a : c) && b : a)
```

hay cái này?

```js
(a && b || c) ? (c || b) ? a : (c && b) : a
```

Câu trả lời là cái thứ hai. Nhưng tại sao?

Bởi vì `&&` có nhiều ưu tiên hơn `||` và `||` có nhiều ưu tiên hơn `? :`.

Vì vậy, biểu thức `(a && b || c)` được ước tính *đầu tiên* trước `? :` nó tham gia. Một cách khác mà điều này thường được giải thích là `&&` và `||` "liên kết chặt chẽ hơn" so với `? :`. Nếu điều ngược lại là đúng, thì `c ? c...` sẽ liên kết chặt chẽ hơn và nó sẽ hoạt động (như lựa chọn đầu tiên) như `a && b || (c? c..)`.

### Associativity (tính liên kết)

Vì vậy, các toán tử `&&` và `||` liên kết trước, sau đó là `? :` toán tử. Nhưng còn nhiều toán tử có cùng mức độ ưu tiên thì sao? Họ luôn xử lý từ trái sang phải hay từ phải sang trái?

Nói chung, các toán tử là liên kết trái hoặc liên kết phải, đề cập đến việc **gom nhóm xảy ra từ bên trái hay từ bên phải**.

Điều quan trọng cần lưu ý là tính kết hợp *không* giống như xử lý từ trái sang phải hoặc từ phải sang trái.

Nhưng tại sao việc xử lý từ trái sang phải hay từ phải sang trái lại quan trọng? Bởi vì các biểu thức có thể có side effect, chẳng hạn như với các lệnh gọi hàm:

```js
var a = foo() && bar();
```

Ở đây, `foo()` được đánh giá trước, sau đó có thể là `bar()` tùy thuộc vào kết quả của biểu thức `foo()`. Điều đó chắc chắn có thể dẫn đến hành vi chương trình khác với nếu `bar()` được gọi trước `foo()`.

Nhưng hành vi này *chỉ* xử lý từ trái sang phải (hành vi mặc định trong JavaScript!) -- nó không liên quan gì đến tính kết hợp của `&&`. Trong ví dụ đó, vì chỉ có một `&&` và do đó không có nhóm liên quan nào ở đây, tính kết hợp thậm chí không phát huy tác dụng.

Nhưng với một biểu thức như `a && b && c`, việc nhóm *sẽ* diễn ra hoàn toàn, nghĩa là `a && b` hoặc `b && c` sẽ được đánh giá trước.

Về mặt kỹ thuật, `a && b && c` sẽ được xử lý như `(a && b) && c`, vì `&&` là liên kết trái (nhân tiện, `||` cũng vậy). Tuy nhiên, phương án thay thế liên kết phải `a && (b && c)` hoạt động theo cùng một cách có thể quan sát được. Đối với các giá trị giống nhau, các biểu thức giống nhau được đánh giá theo cùng một thứ tự.

**Lưu ý:** Nếu theo giả thuyết `&&` là liên kết đúng, nó sẽ được xử lý giống như khi bạn sử dụng `( )` theo cách thủ công để tạo nhóm như `a && (b && c)`. Nhưng điều đó vẫn **không có nghĩa là** rằng `c` sẽ được xử lý trước `b`. Tính liên kết phải **không** có nghĩa là đánh giá từ phải sang trái, mà có nghĩa là **nhóm** từ phải sang trái. Dù bằng cách nào, bất kể nhóm/liên kết như thế nào, thứ tự nghiêm ngặt của đánh giá sẽ là `a`, sau đó là `b`, sau đó là `c` (còn gọi là từ trái sang phải).

Vì vậy, việc `&&` và `||` là liên kết trái không thực sự quan trọng, ngoại trừ việc chính xác trong cách chúng ta thảo luận về định nghĩa của chúng.

Nhưng không phải lúc nào cũng vậy. Một số toán tử sẽ hành xử rất khác nhau tùy thuộc vào tính kết hợp bên trái so với tính kết hợp bên phải.

Hãy xem xét `? :` toán tử ("ba ngôi" hay "điều kiện"):

```js
a ? b : c ? d : e;
```

`? :` là liên kết phải, vậy nhóm nào biểu thị cách nó sẽ được xử lý?

* `a ? b : (c ? d : e)`
* `(a ? b : c) ? d : e`

Câu trả lời là `a ? b: (c? d: e)`. Không giống như `&&` và `||` ở trên, tính liên kết phải ở đây thực sự quan trọng, vì `(a ? b : c) ? d : e` *will* hoạt động khác đi đối với một số kết hợp giá trị (nhưng không phải tất cả!).

Một ví dụ như vậy:

```js
true ? false : true ? true : true;		// false

true ? false : (true ? true : true);	// false
(true ? false : true) ? true : true;	// true
```

Thậm chí nhiều sự khác biệt về sắc thái ẩn giấu với các kết hợp giá trị khác, ngay cả khi kết quả cuối cùng là như nhau. Xem xét:

```js
true ? false : true ? true : false;		// false

true ? false : (true ? true : false);	// false
(true ? false : true) ? true : false;	// false
```

Từ kịch bản đó, kết quả cuối cùng tương tự ngụ ý rằng nhóm đang tranh luận. Tuy nhiên:

```js
var a = true, b = false, c = true, d = true, e = false;

a ? b : (c ? d : e); // false, evaluates only `a` and `b`
(a ? b : c) ? d : e; // false, evaluates `a`, `b` AND `e`
```

Vì vậy, chúng tôi đã chứng minh rõ ràng rằng `? :` là liên kết phải và nó thực sự quan trọng đối với cách toán tử hành xử nếu bị chained (chồng) với chính nó.

Một ví dụ khác về tính liên kết phải (nhóm) là toán tử `=`. Nhớ lại ví dụ gán chuỗi từ đầu chương:

```js
var a, b, c;

a = b = c = 42;
```

Chúng tôi đã khẳng định trước đó rằng `a = b = c = 42` được xử lý bằng cách đánh giá phép gán `c = 42` trước, sau đó là `b = ..` và cuối cùng là `a = ..`. Tại sao? Do tính liên kết phải, cái thực sự xử lý mệnh đề như sau: `a = (b = (c = 42))`.

Bạn có nhớ ví dụ về biểu thức gán phức tạp đang chạy ở đầu chương này không?

```js
var a = 42;
var b = "foo";
var c = false;

var d = a && b || c ? c || b ? a : c && b : a;

d;		// 42
```

Được trang bị kiến thức về mức độ ưu tiên và tính kết hợp, giờ đây chúng ta có thể chia nhỏ mã thành hành vi nhóm của nó như sau:

```js
((a && b) || c) ? ((c || b) ? a : (c && b)) : a
```

Hoặc, để trình bày nó thụt vào nếu điều đó dễ hiểu hơn:

```js
(
  (a && b)
    ||
  c
)
  ?
(
  (c || b)
    ?
  a
    :
  (c && b)
)
  :
a
```

Hãy giải quyết nó ngay bây giờ:

1. `(a && b)` is `"foo"`.
2. `"foo" || c` is `"foo"`.
3. For the first `?` test, `"foo"` is truthy.
4. `(c || b)` is `"foo"`.
5. For the second `?` test, `"foo"` is truthy.
6. `a` is `42`.

Vậy là xong, chúng ta đã hoàn tất! Câu trả lời là `42`, giống như chúng ta đã thấy trước đó. Điều đó thực sự không quá khó phải không?

### Disambiguation (định hướng)

Giờ đây, bạn sẽ hiểu rõ hơn nhiều về mức độ ưu tiên của toán tử (và tính kết hợp) và cảm thấy thoải mái hơn nhiều khi hiểu mã với nhiều toán tử được xâu chuỗi sẽ hoạt động như thế nào.

Nhưng vẫn còn một câu hỏi quan trọng: tất cả chúng ta có nên viết code hiểu và dựa hoàn toàn vào tất cả các quy tắc về mức độ ưu tiên/kết hợp của toán tử không? Chúng ta có nên chỉ sử dụng nhóm thủ công `( )` khi cần buộc một ràng buộc/thứ tự xử lý khác không?

Hoặc, mặt khác, chúng ta có nên nhận ra rằng mặc dù các quy tắc như vậy *trên thực tế* có thể học được, nhưng vẫn có đủ vấn đề để đảm bảo bỏ qua quyền ưu tiên/liên kết tự động? Nếu vậy, chúng ta có nên luôn sử dụng nhóm thủ công `( )` và loại bỏ mọi sự phụ thuộc vào các hành vi tự động này không?

Cuộc tranh luận này mang tính chủ quan cao và rất đối xứng với cuộc tranh luận trong Chương 4 về *implicit* coercion. Hầu hết các nhà phát triển đều cảm thấy giống nhau về cả hai cuộc tranh luận: hoặc họ chấp nhận cả hành vi và mã mong đợi chúng, hoặc họ loại bỏ cả hai hành vi và tuân theo các thành ngữ thủ công/rõ ràng.

Tất nhiên, tôi không thể trả lời câu hỏi này một cách dứt khoát cho độc giả ở đây nhiều hơn những gì tôi có thể làm trong Chương 4. Nhưng tôi đã trình bày cho bạn những ưu và nhược điểm, và hy vọng sẽ khuyến khích đủ hiểu biết sâu sắc hơn để bạn có thể đưa ra những quyết định sáng suốt thay vì những quyết định cường điệu.

Theo tôi, có một nền tảng trung gian quan trọng. Chúng ta nên kết hợp cả hai nhóm thủ công ưu tiên/liên kết toán tử *và* `( )` vào các chương trình của mình -- Tôi tranh luận theo cách tương tự trong Chương 4 về việc sử dụng cưỡng chế *ngầm* lành mạnh/an toàn, nhưng chắc chắn không chỉ xác nhận nó mà không có giới hạn.

Ví dụ: `if (a && b && c) ..` hoàn toàn phù hợp với tôi và tôi sẽ không làm `if ((a && b) && c) ..` chỉ để gọi rõ ràng tính liên kết, bởi vì Tôi nghĩ rằng nó quá dài dòng.

Mặt khác, nếu tôi cần xâu chuỗi hai `? :` các toán tử có điều kiện cùng nhau, tôi chắc chắn sẽ sử dụng cách nhóm thủ công `( )` để làm rõ hoàn toàn logic dự định của tôi là gì.

Vì vậy, lời khuyên của tôi ở đây tương tự như lời khuyên ở Chương 4: **sử dụng quyền ưu tiên/liên kết toán tử ở những nơi nó dẫn đến mã ngắn hơn và rõ ràng hơn, nhưng sử dụng nhóm thủ công `( )` ở những nơi giúp tạo sự rõ ràng và giảm nhầm lẫn.**

## Automatic Semicolons

ASI (Chèn dấu chấm phẩy tự động) là khi JavaScript giả định một `;` ở một số vị trí nhất định trong chương trình JS của bạn ngay cả khi bạn không đặt một dấu chấm phẩy ở đó.

Tại sao bạn đã làm được điều đó? Bởi vì nếu bạn bỏ qua dù chỉ một dấu `;` bắt buộc, chương trình của bạn sẽ thất bại. Không tha thứ lắm. ASI cho phép JS khoan dung ở một số nơi nhất định mà `;` thường không được cho là cần thiết.

Điều quan trọng cần lưu ý là ASI sẽ chỉ có hiệu lực khi có dòng mới (còn gọi là ngắt dòng). Dấu chấm phẩy không được chèn vào giữa dòng.

Về cơ bản, nếu trình phân tích cú pháp JS phân tích cú pháp một dòng nơi sẽ xảy ra lỗi trình phân tích cú pháp (dự kiến là thiếu `;`), và nó có thể chèn một dòng một cách hợp lý, thì nó sẽ làm như vậy. Điều gì hợp lý để chèn? Chỉ khi không có gì ngoài khoảng trắng và/hoặc nhận xét giữa phần cuối của câu lệnh nào đó và dấu xuống dòng/ngắt dòng của dòng đó.

Xem xét:

```js
var a = 42, b
c;
```

JS có nên coi `c` trên dòng tiếp theo là một phần của câu lệnh `var` không? Nó chắc chắn sẽ xảy ra nếu một `,` xuất hiện ở bất kỳ đâu (thậm chí là một dòng khác) giữa `b` và `c`. Nhưng vì không có cái nào, thay vào đó, JS giả định rằng có một `;` ngụ ý (ở dòng mới) sau `b`. Do đó, `c;` được để lại như một câu lệnh biểu thức độc lập.

Tương tự:

```js
var a = 42, b = "foo";

a
b	// "foo"
```

Đó vẫn là một chương trình hợp lệ không có lỗi, bởi vì các câu lệnh biểu thức cũng chấp nhận ASI.

Có một số nơi mà ASI hữu ích, chẳng hạn như:

```js
var a = 42;

do {
	// ..
} while (a)	// <-- ; expected here!
a;
```

Ngữ pháp yêu cầu dấu `;` sau vòng lặp `do..while`, nhưng không phải sau vòng lặp `while` hoặc `for`. Nhưng hầu hết các nhà phát triển không nhớ điều đó! Vì vậy, ASI đã bước vào và chèn một cách hữu ích.

Như chúng ta đã nói trước đó trong chương, các khối câu lệnh không yêu cầu chấm dứt `;`, vì vậy ASI là không cần thiết:

```js
var a = 42;

while (a) {
	// ..
} // <-- no ; expected here
a;
```

Trường hợp chính khác mà ASI khởi động là với các từ khóa `break`, `continue`, `return` và (ES6) `yield`:

```js
function foo(a) {
	if (!a) return
	a *= 2;
	// ..
}
```

Câu lệnh `return` không chuyển qua dòng mới sang biểu thức `a *= 2`, vì ASI giả định `;` kết thúc câu lệnh `return`. Tất nhiên, các câu lệnh `return` *có thể* dễ dàng ngắt giữa nhiều dòng, chỉ khi không có gì sau `return` ngoài dấu ngắt dòng/dòng mới.

```js
function foo(a) {
	return (
		a * 2 + 3 / 12
	);
}
```

Lập luận giống hệt nhau áp dụng cho `break`, `tiếp tục` và `yield`.

### Error Correction (Sửa Lỗi)

Một trong những *cuộc chiến quan điểm* gây tranh cãi gay gắt nhất trong cộng đồng JS (bên cạnh các tab so với khoảng trắng) là liệu có nên phụ thuộc nhiều/độc quyền vào ASI hay không.

Hầu hết, nhưng không phải tất cả, dấu chấm phẩy là tùy chọn, nhưng hai dấu `;` trong header vòng lặp `for ( .. ) ..` là bắt buộc.

Về phía ủng hộ cuộc tranh luận này, nhiều nhà phát triển tin rằng ASI là một cơ chế hữu ích cho phép họ viết mã ngắn gọn hơn (và "đẹp" hơn) bằng cách bỏ qua tất cả trừ các dấu `;` được yêu cầu nghiêm ngặt (rất ít). Người ta thường khẳng định rằng ASI tạo ra nhiều `;` tùy chọn, do đó, một chương trình được viết chính xác *không có chúng* không khác gì một chương trình được viết chính xác *có chúng*.

Về mặt trái của cuộc tranh luận, nhiều nhà phát triển khác sẽ khẳng định rằng có *quá nhiều* chỗ có thể là sự cố ngẫu nhiên, đặc biệt là đối với các nhà phát triển mới hơn, ít kinh nghiệm hơn, nơi mà `;` được chèn vào một cách kỳ diệu sẽ thay đổi ý nghĩa. Tương tự như vậy, một số nhà phát triển sẽ lập luận rằng nếu họ bỏ qua dấu chấm phẩy, thì đó là một lỗi rõ ràng và họ muốn các công cụ của mình (linters, v.v.) bắt được nó trước khi công cụ JS *sửa chữa* lỗi dưới vỏ bọc.

Hãy để tôi chỉ chia sẻ quan điểm của tôi. Việc đọc kỹ thông số kỹ thuật nghiêm ngặt ngụ ý rằng ASI là một thói quen "sửa lỗi". Những loại lỗi, bạn có thể yêu cầu? Cụ thể, một **parser error (lỗi trình phân tích cú pháp)**. Nói cách khác, trong nỗ lực làm cho trình phân tích cú pháp ít bị lỗi hơn, ASI cho phép nó trở nên khoan dung hơn.

Nhưng khoan dung cái gì? Theo quan điểm của tôi, cách duy nhất xảy ra **lỗi trình phân tích cú pháp** là nếu nó được cung cấp một chương trình không chính xác/bị lỗi để phân tích cú pháp. Vì vậy, trong khi ASI đang sửa lỗi trình phân tích cú pháp một cách nghiêm ngặt, thì cách duy nhất để nó có thể nhận được các lỗi như vậy là nếu có lỗi tác giả chương trình đầu tiên -- bỏ qua dấu chấm phẩy khi các quy tắc ngữ pháp yêu cầu chúng.

Vì vậy, nói một cách thẳng thắn hơn, khi tôi nghe ai đó tuyên bố rằng họ muốn bỏ qua "dấu chấm phẩy tùy chọn", bộ não của tôi dịch tuyên bố đó thành "Tôi muốn viết chương trình bị hỏng trình phân tích cú pháp nhất mà tôi có thể vẫn hoạt động."

Tôi thấy đó là một vị trí lố bịch và các lập luận về việc tiết kiệm các lần gõ phím và có nhiều "mã đẹp" hơn là yếu nhất.

Hơn nữa, tôi không đồng ý rằng đây cũng giống như cuộc tranh luận về dấu cách và tab -- rằng đó hoàn toàn là vấn đề trình bày code -- nhưng đúng hơn, tôi tin rằng đó là một câu hỏi cơ bản về việc viết code tuân thủ các yêu cầu ngữ pháp so với viết code dựa vào ngữ pháp ngoại lệ để vừa đủ trượt qua.

Một cách nhìn khác là việc dựa vào ASI về cơ bản coi các dòng mới là "khoảng trắng" quan trọng. Các ngôn ngữ khác như Python có khoảng trắng thực sự quan trọng. Nhưng có thực sự phù hợp khi nghĩ rằng JavaScript có các dòng mới quan trọng như ngày nay không?

Quan điểm của tôi: **sử dụng dấu chấm phẩy ở bất cứ nơi nào bạn biết chúng là "bắt buộc" và hạn chế các giả định của bạn về ASI ở mức tối thiểu.**

Nhưng đừng tin lời tôi nói. Trở lại năm 2012, người tạo ra JavaScript Brendan Eich đã nói (http://brendaneich.com/2012/04/the-infernal-semiacolon/) như sau:

> Đạo đức của câu chuyện này: ASI (nói một cách chính thức) là một quy trình sửa lỗi cú pháp. Nếu bạn bắt đầu viết mã như thể đó là quy tắc dòng mới có ý nghĩa chung, thì bạn sẽ gặp rắc rối.
> ..
> Tôi ước tôi đã làm cho các dòng mới trở nên quan trọng hơn trong JS trong mười ngày đó vào tháng 5 năm 1995.
> ..
> Hãy cẩn thận không sử dụng ASI như thể nó mang lại cho JS những dòng mới quan trọng.

## Errors

Not only does JavaScript have different *subtypes* of errors (`TypeError`, `ReferenceError`, `SyntaxError`, etc.), but also the grammar defines certain errors to be enforced at compile time, as compared to all other errors that happen during runtime.

In particular, there have long been a number of specific conditions that should be caught and reported as "early errors" (during compilation). Any straight-up syntax error is an early error (e.g., `a = ,`), but also the grammar defines things that are syntactically valid but disallowed nonetheless.

Since execution of your code has not begun yet, these errors are not catchable with `try..catch`; they will just fail the parsing/compilation of your program.

**Tip:** There's no requirement in the spec about exactly how browsers (and developer tools) should report errors. So you may see variations across browsers in the following error examples, in what specific subtype of error is reported or what the included error message text will be.

One simple example is with syntax inside a regular expression literal. There's nothing wrong with the JS syntax here, but the invalid regex will throw an early error:

```js
var a = /+foo/;		// Error!
```

The target of an assignment must be an identifier (or an ES6 destructuring expression that produces one or more identifiers), so a value like `42` in that position is illegal and can be reported right away:

```js
var a;
42 = a;		// Error!
```

ES5's `strict` mode defines even more early errors. For example, in `strict` mode, function parameter names cannot be duplicated:

```js
function foo(a,b,a) { }					// just fine

function bar(a,b,a) { "use strict"; }	// Error!
```

Another `strict` mode early error is an object literal having more than one property of the same name:

```js
(function(){
	"use strict";

	var a = {
		b: 42,
		b: 43
	};			// Error!
})();
```

**Note:** Semantically speaking, such errors aren't technically *syntax* errors but more *grammar* errors -- the above snippets are syntactically valid. But since there is no `GrammarError` type, some browsers use `SyntaxError` instead.

### Using Variables Too Early

ES6 defines a (frankly confusingly named) new concept called the TDZ ("Temporal Dead Zone").

The TDZ refers to places in code where a variable reference cannot yet be made, because it hasn't reached its required initialization.

The most clear example of this is with ES6 `let` block-scoping:

```js
{
	a = 2;		// ReferenceError!
	let a;
}
```

The assignment `a = 2` is accessing the `a` variable (which is indeed block-scoped to the `{ .. }` block) before it's been initialized by the `let a` declaration, so it's in the TDZ for `a` and throws an error.

Interestingly, while `typeof` has an exception to be safe for undeclared variables (see Chapter 1), no such safety exception is made for TDZ references:

```js
{
	typeof a;	// undefined
	typeof b;	// ReferenceError! (TDZ)
	let b;
}
```

## Function Arguments

Another example of a TDZ violation can be seen with ES6 default parameter values (see the *ES6 & Beyond* title of this series):

```js
var b = 3;

function foo( a = 42, b = a + b + 5 ) {
	// ..
}
```

The `b` reference in the assignment would happen in the TDZ for the parameter `b` (not pull in the outer `b` reference), so it will throw an error. However, the `a` in the assignment is fine since by that time it's past the TDZ for parameter `a`.

When using ES6's default parameter values, the default value is applied to the parameter if you either omit an argument, or you pass an `undefined` value in its place:

```js
function foo( a = 42, b = a + 1 ) {
	console.log( a, b );
}

foo();					// 42 43
foo( undefined );		// 42 43
foo( 5 );				// 5 6
foo( void 0, 7 );		// 42 7
foo( null );			// null 1
```

**Note:** `null` is coerced to a `0` value in the `a + 1` expression. See Chapter 4 for more info.

From the ES6 default parameter values perspective, there's no difference between omitting an argument and passing an `undefined` value. However, there is a way to detect the difference in some cases:

```js
function foo( a = 42, b = a + 1 ) {
	console.log(
		arguments.length, a, b,
		arguments[0], arguments[1]
	);
}

foo();					// 0 42 43 undefined undefined
foo( 10 );				// 1 10 11 10 undefined
foo( 10, undefined );	// 2 10 11 10 undefined
foo( 10, null );		// 2 10 null 10 null
```

Even though the default parameter values are applied to the `a` and `b` parameters, if no arguments were passed in those slots, the `arguments` array will not have entries.

Conversely, if you pass an `undefined` argument explicitly, an entry will exist in the `arguments` array for that argument, but it will be `undefined` and not (necessarily) the same as the default value that was applied to the named parameter for that same slot.

While ES6 default parameter values can create divergence between the `arguments` array slot and the corresponding named parameter variable, this same disjointedness can also occur in tricky ways in ES5:

```js
function foo(a) {
	a = 42;
	console.log( arguments[0] );
}

foo( 2 );	// 42 (linked)
foo();		// undefined (not linked)
```

If you pass an argument, the `arguments` slot and the named parameter are linked to always have the same value. If you omit the argument, no such linkage occurs.

But in `strict` mode, the linkage doesn't exist regardless:

```js
function foo(a) {
	"use strict";
	a = 42;
	console.log( arguments[0] );
}

foo( 2 );	// 2 (not linked)
foo();		// undefined (not linked)
```

It's almost certainly a bad idea to ever rely on any such linkage, and in fact the linkage itself is a leaky abstraction that's exposing an underlying implementation detail of the engine, rather than a properly designed feature.

Use of the `arguments` array has been deprecated (especially in favor of ES6 `...` rest parameters -- see the *ES6 & Beyond* title of this series), but that doesn't mean that it's all bad.

Prior to ES6, `arguments` is the only way to get an array of all passed arguments to pass along to other functions, which turns out to be quite useful. You can also mix named parameters with the `arguments` array and be safe, as long as you follow one simple rule: **never refer to a named parameter *and* its corresponding `arguments` slot at the same time.** If you avoid that bad practice, you'll never expose the leaky linkage behavior.

```js
function foo(a) {
	console.log( a + arguments[1] ); // safe!
}

foo( 10, 32 );	// 42
```

## `try..finally`

You're probably familiar with how the `try..catch` block works. But have you ever stopped to consider the `finally` clause that can be paired with it? In fact, were you aware that `try` only requires either `catch` or `finally`, though both can be present if needed.

The code in the `finally` clause *always* runs (no matter what), and it always runs right after the `try` (and `catch` if present) finish, before any other code runs. In one sense, you can kind of think of the code in a `finally` clause as being in a callback function that will always be called regardless of how the rest of the block behaves.

So what happens if there's a `return` statement inside a `try` clause? It obviously will return a value, right? But does the calling code that receives that value run before or after the `finally`?

```js
function foo() {
	try {
		return 42;
	}
	finally {
		console.log( "Hello" );
	}

	console.log( "never runs" );
}

console.log( foo() );
// Hello
// 42
```

The `return 42` runs right away, which sets up the completion value from the `foo()` call. This action completes the `try` clause and the `finally` clause immediately runs next. Only then is the `foo()` function complete, so that its completion value is returned back for the `console.log(..)` statement to use.

The exact same behavior is true of a `throw` inside `try`:

```js
 function foo() {
	try {
		throw 42;
	}
	finally {
		console.log( "Hello" );
	}

	console.log( "never runs" );
}

console.log( foo() );
// Hello
// Uncaught Exception: 42
```

Now, if an exception is thrown (accidentally or intentionally) inside a `finally` clause, it will override as the primary completion of that function. If a previous `return` in the `try` block had set a completion value for the function, that value will be abandoned.

```js
function foo() {
	try {
		return 42;
	}
	finally {
		throw "Oops!";
	}

	console.log( "never runs" );
}

console.log( foo() );
// Uncaught Exception: Oops!
```

It shouldn't be surprising that other nonlinear control statements like `continue` and `break` exhibit similar behavior to `return` and `throw`:

```js
for (var i=0; i<10; i++) {
	try {
		continue;
	}
	finally {
		console.log( i );
	}
}
// 0 1 2 3 4 5 6 7 8 9
```

The `console.log(i)` statement runs at the end of the loop iteration, which is caused by the `continue` statement. However, it still runs before the `i++` iteration update statement, which is why the values printed are `0..9` instead of `1..10`.

**Note:** ES6 adds a `yield` statement, in generators (see the *Async & Performance* title of this series) which in some ways can be seen as an intermediate `return` statement. However, unlike a `return`, a `yield` isn't complete until the generator is resumed, which means a `try { .. yield .. }` has not completed. So an attached `finally` clause will not run right after the `yield` like it does with `return`.

A `return` inside a `finally` has the special ability to override a previous `return` from the `try` or `catch` clause, but only if `return` is explicitly called:

```js
function foo() {
	try {
		return 42;
	}
	finally {
		// no `return ..` here, so no override
	}
}

function bar() {
	try {
		return 42;
	}
	finally {
		// override previous `return 42`
		return;
	}
}

function baz() {
	try {
		return 42;
	}
	finally {
		// override previous `return 42`
		return "Hello";
	}
}

foo();	// 42
bar();	// undefined
baz();	// "Hello"
```

Normally, the omission of `return` in a function is the same as `return;` or even `return undefined;`, but inside a `finally` block the omission of `return` does not act like an overriding `return undefined`; it just lets the previous `return` stand.

In fact, we can really up the craziness if we combine `finally` with labeled `break` (discussed earlier in the chapter):

```js
function foo() {
	bar: {
		try {
			return 42;
		}
		finally {
			// break out of `bar` labeled block
			break bar;
		}
	}

	console.log( "Crazy" );

	return "Hello";
}

console.log( foo() );
// Crazy
// Hello
```

But... don't do this. Seriously. Using a `finally` + labeled `break` to effectively cancel a `return` is doing your best to create the most confusing code possible. I'd wager no amount of comments will redeem this code.

## `switch`

Let's briefly explore the `switch` statement, a sort-of syntactic shorthand for an `if..else if..else..` statement chain.

```js
switch (a) {
	case 2:
		// do something
		break;
	case 42:
		// do another thing
		break;
	default:
		// fallback to here
}
```

As you can see, it evaluates `a` once, then matches the resulting value to each `case` expression (just simple value expressions here). If a match is found, execution will begin in that matched `case`, and will either go until a `break` is encountered or until the end of the `switch` block is found.

That much may not surprise you, but there are several quirks about `switch` you may not have noticed before.

First, the matching that occurs between the `a` expression and each `case` expression is identical to the `===` algorithm (see Chapter 4). Often times `switch`es are used with absolute values in `case` statements, as shown above, so strict matching is appropriate.

However, you may wish to allow coercive equality (aka `==`, see Chapter 4), and to do so you'll need to sort of "hack" the `switch` statement a bit:

```js
var a = "42";

switch (true) {
	case a == 10:
		console.log( "10 or '10'" );
		break;
	case a == 42:
		console.log( "42 or '42'" );
		break;
	default:
		// never gets here
}
// 42 or '42'
```

This works because the `case` clause can have any expression (not just simple values), which means it will strictly match that expression's result to the test expression (`true`). Since `a == 42` results in `true` here, the match is made.

Despite `==`, the `switch` matching itself is still strict, between `true` and `true` here. If the `case` expression resulted in something that was truthy but not strictly `true` (see Chapter 4), it wouldn't work. This can bite you if you're for instance using a "logical operator" like `||` or `&&` in your expression:

```js
var a = "hello world";
var b = 10;

switch (true) {
	case (a || b == 10):
		// never gets here
		break;
	default:
		console.log( "Oops" );
}
// Oops
```

Since the result of `(a || b == 10)` is `"hello world"` and not `true`, the strict match fails. In this case, the fix is to force the expression explicitly to be a `true` or `false`, such as `case !!(a || b == 10):` (see Chapter 4).

Lastly, the `default` clause is optional, and it doesn't necessarily have to come at the end (although that's the strong convention). Even in the `default` clause, the same rules apply about encountering a `break` or not:

```js
var a = 10;

switch (a) {
	case 1:
	case 2:
		// never gets here
	default:
		console.log( "default" );
	case 3:
		console.log( "3" );
		break;
	case 4:
		console.log( "4" );
}
// default
// 3
```

**Note:** As discussed previously about labeled `break`s, the `break` inside a `case` clause can also be labeled.

The way this snippet processes is that it passes through all the `case` clause matching first, finds no match, then goes back up to the `default` clause and starts executing. Since there's no `break` there, it continues executing in the already skipped over `case 3` block, before stopping once it hits that `break`.

While this sort of round-about logic is clearly possible in JavaScript, there's almost no chance that it's going to make for reasonable or understandable code. Be very skeptical if you find yourself wanting to create such circular logic flow, and if you really do, make sure you include plenty of code comments to explain what you're up to!

## Review

JavaScript grammar has plenty of nuance that we as developers should spend a little more time paying closer attention to than we typically do. A little bit of effort goes a long way to solidifying your deeper knowledge of the language.

Statements and expressions have analogs in English language -- statements are like sentences and expressions are like phrases. Expressions can be pure/self-contained, or they can have side effects.

The JavaScript grammar layers semantic usage rules (aka context) on top of the pure syntax. For example, `{ }` pairs used in various places in your program can mean statement blocks, `object` literals, (ES6) destructuring assignments, or (ES6) named function arguments.

JavaScript operators all have well-defined rules for precedence (which ones bind first before others) and associativity (how multiple operator expressions are implicitly grouped). Once you learn these rules, it's up to you to decide if precedence/associativity are *too implicit* for their own good, or if they will aid in writing shorter, clearer code.

ASI (Automatic Semicolon Insertion) is a parser-error-correction mechanism built into the JS engine, which allows it under certain circumstances to insert an assumed `;` in places where it is required, was omitted, *and* where insertion fixes the parser error. The debate rages over whether this behavior implies that most `;` are optional (and can/should be omitted for cleaner code) or whether it means that omitting them is making mistakes that the JS engine merely cleans up for you.

JavaScript has several types of errors, but it's less known that it has two classifications for errors: "early" (compiler thrown, uncatchable) and "runtime" (`try..catch`able). All syntax errors are obviously early errors that stop the program before it runs, but there are others, too.

Function arguments have an interesting relationship to their formal declared named parameters. Specifically, the `arguments` array has a number of gotchas of leaky abstraction behavior if you're not careful. Avoid `arguments` if you can, but if you must use it, by all means avoid using the positional slot in `arguments` at the same time as using a named parameter for that same argument.

The `finally` clause attached to a `try` (or `try..catch`) offers some very interesting quirks in terms of execution processing order. Some of these quirks can be helpful, but it's possible to create lots of confusion, especially if combined with labeled blocks. As always, use `finally` to make code better and clearer, not more clever or confusing.

The `switch` offers some nice shorthand for `if..else if..` statements, but beware of many common simplifying assumptions about its behavior. There are several quirks that can trip you up if you're not careful, but there's also some neat hidden tricks that `switch` has up its sleeve!
