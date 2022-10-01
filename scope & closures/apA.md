# You Don't Know JS: Scope & Closures
# Appendix A: Dynamic Scope

Trong Chương 2, chúng ta đã nói về "Dynamic Scope" như một sự tương phản với mô hình "Lexical Scope", đó là cách scope hoạt động trong JavaScript (và trên thực tế, hầu hết các ngôn ngữ khác).

Chúng tôi sẽ xem xét ngắn gọn dynamic scope, để tìm ra độ tương phản. Nhưng, quan trọng hơn, dynamic scope thực sự là một người anh em họ gần với một cơ chế khác (`this`) trong JavaScript, mà chúng ta đã đề cập trong cuốn "*this & Object Prototypes*" của bộ sách này.

Như chúng ta đã thấy trong Chương 2, lexical scope là tập hợp các quy tắc về cách *Engine* có thể tìm kiếm một biến và nơi nó sẽ tìm thấy nó. Đặc điểm chính của lexical scope là nó được xác định tại thời điểm tác giả, khi code được viết (giả sử bạn không gian lận với `eval()` hoặc `with`).

Dynamic scope dường như ngụ ý và vì lý do chính đáng, rằng có một mô hình theo đó scope có thể được xác định động trong thời gian chạy, thay vì tĩnh tại thời điểm viết. Đó là trong thực tế trường hợp. Hãy minh họa qua đoạn code:

```js
function foo() {
	console.log( a ); // 2
}

function bar() {
	var a = 3;
	foo();
}

var a = 2;

bar();
```

Lexical scope cho rằng tham chiếu RHS tới `a` trong `foo()` sẽ được phân giải thành biến toàn cục `a`, điều này sẽ dẫn đến giá trị `2` được xuất.

Ngược lại, dynamic scope không quan tâm đến cách thức và vị trí các function và scope được khai báo, mà là **chúng được gọi từ đâu**. Nói cách khác, chuỗi scope dựa trên call-stack (ngăn xếp lệnh gọi), không phải là sự lồng ghép của các scope trong code.

Vì vậy, nếu JavaScript có dynamic scope, khi `foo()` được thực thi, **về mặt lý thuyết** code bên dưới thay vào đó sẽ dẫn đến kết quả đầu ra là `3`.

```js
function foo() {
	console.log( a ); // 3  (not 2!)
}

function bar() {
	var a = 3;
	foo();
}

var a = 2;

bar();
```

Làm sao có thể như vậy? Bởi vì khi `foo()` không thể giải quyết tham chiếu biến cho `a`, thay vì đẩy chuỗi scope(lexical) lồng nhau lên, nó sẽ đi lên ngăn xếp gọi, để tìm nơi `foo()` *được gọi từ* . Vì `foo()` được gọi từ `bar()`, nó sẽ kiểm tra các biến trong phạm vi cho `bar()` và tìm một dấu `a` ở đó với giá trị `3`.

Lạ lùng? Có lẽ bạn đang nghĩ như vậy vào lúc này.

Nhưng đó chỉ là vì bạn có thể chỉ từng làm việc trên (hoặc ít nhất là đã xem xét sâu sắc) code có lexical scope. Vì vậy, dynamic scope dường như là ngoại lai. Nếu bạn chỉ từng viết code bằng một ngôn ngữ có dynamic scope, thì điều đó có vẻ tự nhiên, và lexical scope sẽ là một điều kỳ quặc.

Để rõ ràng, JavaScript **trên thực tế không có dynamic scope**. Nó có lexical scope. Thông thường và đơn giản. Nhưng cơ chế `this` giống như dynamic scope.

Sự tương phản chính: **lexical scope là thời điểm viết code, trong khi dynamic scope (và `this`!) là thời điểm code chạy**. Lexical scope quan tâm *nơi một function được khai báo*, nhưng dynamic scope quan tâm đến nơi một hàm được *gọi từ đâu*.

Cuối cùng: `this` quan tâm *cách một hàm được gọi là*, điều này cho thấy cơ chế `this` có liên quan chặt chẽ như thế nào với ý tưởng về dynamic scope. Để tìm hiểu thêm về `this`, hãy đọc cuốn "*this & Object Prototypes*".
