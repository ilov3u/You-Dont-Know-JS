# You Don't Know JS: Scope & Closures
# Appendix B: Polyfilling Block Scope

Trong Chương 3, chúng ta đã khám phá Block scope. Chúng ta đã thấy rằng mệnh đề `with` và mệnh đề `catch` đều là những ví dụ nhỏ về block scope đã tồn tại trong JavaScript kể từ ít nhất là sự ra đời của ES3.

Nhưng việc giới thiệu `let` của ES6 cuối cùng đã cung cấp khả năng xác định block scope đầy đủ, không bị kiểm soát cho code của chúng ta. Có rất nhiều điều thú vị, cả về mặt chức năng và kiểu code, block scope đó sẽ cho phép.

Nhưng điều gì sẽ xảy ra nếu chúng ta muốn sử dụng block scope trong môi trường trước ES6?

Xem xét đoạn code này:

```js
{
	let a = 2;
	console.log( a ); // 2
}

console.log( a ); // ReferenceError
```

Điều này sẽ hoạt động tốt trong môi trường ES6. Nhưng liệu chúng ta có thể làm như vậy trước ES6 không? `catch` là câu trả lời.

```js
try{throw 2}catch(a){
	console.log( a ); // 2
}

console.log( a ); // ReferenceError
```

Ái chà! Đó là một số code trông xấu xí, kỳ lạ. Chúng ta thấy một `try/catch` dường như buộc phải ném ra một lỗi, nhưng "lỗi" mà nó ném ra chỉ là một giá trị `2`, và sau đó khai báo biến nhận được nó nằm trong mệnh đề `catch(a)`. Tâm tĩnh lặng: haizza.

Đúng vậy, mệnh đề `catch` có block scope đối với nó, có nghĩa là nó có thể được sử dụng như một polyfill cho block scope trong môi trường trước ES6.

"Nhưng..." bạn nói. "... không ai muốn viết code xấu xí như thế!" Đúng. Không ai viết (một số) đầu ra code bằng trình biên dịch CoffeeScript. Đó không phải là vấn đề.

Vấn đề là các công cụ có thể chuyển code ES6 để hoạt động trong các môi trường trước ES6. Bạn có thể viết code bằng cách sử dụng block scope và hưởng lợi từ chức năng đó, đồng thời để công cụ từng bước xây dựng đảm nhận việc tạo ra code thực sự *hoạt động* khi được triển khai.

Đây thực sự là con đường di chuyển ưa thích cho tất cả (ahem, hầu hết) của ES6: sử dụng một code transpiler (trình chuyển mã) để lấy code ES6 và tạo ra code tương thích với ES5 trong quá trình chuyển đổi từ trước ES6 sang ES6.

## Traceur

Google duy trì một dự án có tên "Traceur" [^note-traceur], được giao nhiệm vụ chính xác là chuyển các tính năng của ES6 thành pre-ES6 (chủ yếu là ES5, nhưng không phải tất cả!) Để sử dụng chung. Ủy ban TC39 dựa vào công cụ này (và những công cụ khác) để kiểm tra ngữ nghĩa của các tính năng mà họ chỉ định.

Traceur tạo ra gì từ đoạn code của chúng ta? Bạn đoán nó!

```js
{
	try {
		throw undefined;
	} catch (a) {
		a = 2;
		console.log( a );
	}
}

console.log( a );
```

Vì vậy, với việc sử dụng các công cụ như vậy, chúng ta có thể bắt đầu tận dụng phạm vi khối bất kể chúng ta có đang nhắm mục tiêu ES6 hay không, bởi vì `try/catch` đã xuất hiện (và hoạt động theo cách này) từ những ngày ES3.

## Implicit vs. Explicit Blocks

Trong Chương 3, chúng ta đã xác định một số cạm bẫy tiềm ẩn đối với khả năng bảo trì/tái cấu trúc code khi chúng ta giới thiệu block scope. Có cách nào khác để tận dụng block scope nhưng để giảm bớt nhược điểm này không?

Hãy xem xét dạng thay thế này của `let`, được gọi là "khối lệnh let" hoặc "câu lệnh let" (tương phản với "khai báo let" trước đó).

```js
let (a = 2) {
	console.log( a ); // 2
}

console.log( a ); // ReferenceError
```

Thay vì chiếm đoạt ngầm một block hiện có, let-statement tạo ra một block rõ ràng để ràng buộc scope của nó. Block rõ ràng không chỉ nổi bật hơn, và có lẽ hoạt động mạnh mẽ hơn trong việc tái cấu trúc code, nó tạo ra code sạch hơn về mặt ngữ pháp, buộc tất cả các khai báo ở trên cùng của block. Điều này giúp bạn dễ dàng nhìn vào bất kỳ block nào và biết những gì thuộc scope của nó và không.

Như một pattern, nó phản ánh cách tiếp cận mà nhiều người sử dụng trong function-scoping khi họ di chuyển/nâng tất cả các khai báo `var` của họ lên đầu hàm theo cách thủ công. Câu lệnh let đặt chúng ở đầu khối theo mục đích và nếu bạn không sử dụng các khai báo `let` trong suốt, các khai báo block scope của bạn sẽ dễ dàng hơn để xác định và duy trì.

Nhưng, có một vấn đề. Biểu mẫu let-statement không có trong ES6. Trình biên dịch Traceur chính thức cũng không chấp nhận dạng code đó.

Chúng ta có hai lựa chọn. Chúng ta có thể định dạng bằng cú pháp hợp lệ ES6 và một chút kỷ luật code:

```js
/*let*/ { let a = 2;
	console.log( a );
}

console.log( a ); // ReferenceError
```

Tuy nhiên, các công cụ nhằm giải quyết các vấn đề của chúng ta. Vì vậy, tùy chọn khác là viết các khối câu lệnh let rõ ràng và để một công cụ chuyển đổi chúng thành code hoạt động hợp lệ.

Vì vậy, tôi đã xây dựng một công cụ có tên "let-er" [^note-let_er] để giải quyết vấn đề này. *let-er* là một trình chuyển mã từng bước xây dựng, nhưng nhiệm vụ duy nhất của nó là tìm các dạng câu lệnh let và chuyển chúng. Nó sẽ để lại một mình bất kỳ phần còn lại nào của code của bạn, bao gồm bất kỳ khai báo nào. Bạn có thể an toàn sử dụng *let-er* làm bước chuyển tiếp ES6 đầu tiên, sau đó chuyển code của bạn qua thứ gì đó như Traceur nếu cần.

Hơn nữa, *let-er* có cờ cấu hình `--es6`, khi được bật (tắt theo mặc định), sẽ thay đổi loại code được tạo. Thay vì hack polyfill ES3 `try/catch`, *let-er* sẽ lấy đoạn code của chúng tôi và tạo ra phiên bản hoàn toàn tuân thủ ES6, không hack:

```js
{
	let a = 2;
	console.log( a );
}

console.log( a ); // ReferenceError
```

Vì vậy, bạn có thể bắt đầu sử dụng *let-er* ngay lập tức và nhắm mục tiêu tất cả các môi trường pre-ES6 và khi bạn chỉ quan tâm đến ES6, bạn có thể thêm cờ và ngay lập tức chỉ nhắm mục tiêu ES6.

Và quan trọng nhất, **bạn có thể sử dụng biểu mẫu tuyên bố thích hợp hơn và rõ ràng hơn** mặc dù nó chưa phải là một phần chính thức của bất kỳ phiên bản ES nào (chưa).

## Performance

Hãy để tôi thêm một ghi chú ngắn cuối cùng về hiệu suất của `try/catch` và/hoặc để giải quyết câu hỏi, "tại sao không chỉ sử dụng IIFE để tạo phạm vi?"

Thứ nhất, hiệu suất của `try/catch` *là* chậm hơn, nhưng không có giả định hợp lý rằng nó *phải* theo cách đó, hoặc thậm chí rằng nó *luôn sẽ* theo cách đó. Vì trình chuyển tiếp ES6 được TC39 phê duyệt chính thức sử dụng `try/catch`, nhóm Traceur đã yêu cầu Chrome cải thiện hiệu suất của `try/catch` và họ rõ ràng có động lực để làm như vậy.

Thứ hai, IIFE không phải là một sự so sánh táo tợn công bằng với `try/catch`, bởi vì một hàm được bao bọc xung quanh bất kỳ mã tùy ý nào sẽ thay đổi ý nghĩa bên trong mã đó, của `this`, `return`, `break`, và `continue`. IIFE không phải là một chất thay thế chung thích hợp. Nó chỉ có thể được sử dụng thủ công trong một số trường hợp nhất định.

Câu hỏi thực sự trở thành: bạn có muốn block scope hay không. Nếu bạn làm vậy, các công cụ này cung cấp cho bạn tùy chọn đó. Nếu không, hãy tiếp tục sử dụng `var` và tiếp tục viết code của bạn!

[^note-traceur]: [Google Traceur](http://google.github.io/traceur-compiler/demo/repl.html)

[^note-let_er]\: [let-er](https://github.com/getify/let-er)
