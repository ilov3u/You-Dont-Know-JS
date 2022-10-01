# You Don't Know JS: Scope & Closures
# Appendix C: Lexical-this

Mặc dù cuốn này không đề cập chi tiết đến cơ chế `this`, nhưng có một chủ đề ES6 liên quan đến `this` với lexical scope theo một cách quan trọng, chúng ta sẽ nhanh chóng kiểm tra.

ES6 bổ sung một dạng khai báo hàm cú pháp đặc biệt được gọi là "arrow function". Nó trông như thế này:

```js
var foo = a => {
	console.log( a );
};

foo( 2 ); // 2
```

Cái gọi là "fat arrow" thường được nhắc đến như một cách viết tắt của từ khóa *dài dòng một cách tẻ nhạt* (mỉa mai) `function`.

Nhưng có điều gì đó quan trọng hơn nhiều đang xảy ra với các hàm mũi tên không liên quan gì đến việc lưu các tổ hợp phím trong khai báo của bạn.

Tóm lại, code này gặp sự cố:

```js

var obj = {
	id: "awesome",
	cool: function coolFn() {
		console.log( this.id );
	}
};

var id = "not awesome";

obj.cool(); // awesome

setTimeout( obj.cool, 100 ); // not awesome
```

Vấn đề là mất liên kết `this` trên hàm `cool()`. Có nhiều cách khác nhau để giải quyết vấn đề đó, nhưng một giải pháp thường được lặp lại là `var self = this;`.

Điều đó có thể trông giống như:

```js
var obj = {
	count: 0,
	cool: function coolFn() {
		var self = this;

		if (self.count < 1) {
			setTimeout( function timer(){
				self.count++;
				console.log( "awesome?" );
			}, 100 );
		}
	}
};

obj.cool(); // awesome?
```

Không đi quá nhiều vào ngoài lề ở đây, `var self = this` "giải pháp" chỉ giải quyết toàn bộ vấn đề về việc hiểu và sử dụng đúng cách ràng buộc `this`, và thay vào đó, chúng ta có thể cảm thấy thoải mái hơn: lexical scope. `self` chỉ trở thành một định danh có thể được giải quyết thông qua lexical scope và closure, và không quan tâm đến điều gì đã xảy ra với ràng buộc `this` trong quá trình thực hiện.

Mọi người không thích viết những thứ dài dòng, đặc biệt là khi họ làm đi làm lại. Vì vậy, động lực của ES6 là giúp giảm bớt các tình huống này và thực sự, *sửa chữa* các vấn đề về thành ngữ phổ biến, chẳng hạn như trường hợp này.

Giải pháp ES6, arrow function, giới thiệu một hành vi được gọi là "lexical scope".

```js
var obj = {
	count: 0,
	cool: function coolFn() {
		if (this.count < 1) {
			setTimeout( () => { // arrow-function ftw?
				this.count++;
				console.log( "awesome?" );
			}, 100 );
		}
	}
};

obj.cool(); // awesome?
```

Giải thích ngắn gọn là các hàm mũi tên hoàn toàn không hoạt động như các hàm bình thường khi nói đến ràng buộc `this` của chúng. Họ loại bỏ tất cả các quy tắc thông thường cho ràng buộc `this`, và thay vào đó lấy giá trị `this` của scope bao bọc lexical tức thì của họ, bất kể nó là gì.

Vì vậy, trong đoạn code đó, arrow function không nhận được liên kết `this` của nó theo một cách không thể đoán trước được, nó chỉ "kế thừa" ràng buộc `this` của hàm `cool()` (điều này đúng nếu chúng ta gọi nó như hình!).

Mặc dù điều này làm cho code ngắn hơn, nhưng quan điểm của tôi là các arrow function thực sự chỉ mã hóa thành cú pháp ngôn ngữ, một *lỗi* phổ biến của các nhà phát triển, đó là nhầm lẫn và kết hợp các quy tắc "this binding" với các quy tắc "lexical scope".

Nói một cách khác: tại sao lại gặp rắc rối và dài dòng khi sử dụng mô hình mã hóa phong cách `this`, chỉ để cắt bỏ nó ở đầu gối bằng cách trộn nó với các tham chiếu lexical. Có vẻ tự nhiên khi áp dụng phương pháp này hay phương pháp khác cho bất kỳ đoạn code nhất định nào và không trộn chúng trong cùng một đoạn code.

**Lưu ý:** một điểm hạn chế khác từ các arrow function là chúng ẩn danh, không được đặt tên. Xem Chương 3 để biết lý do tại sao các arrow function ít được mong muốn hơn các hàm được đặt tên.

Theo quan điểm của tôi, một cách tiếp cận phù hợp hơn đối với "vấn đề" này là sử dụng và nắm bắt cơ chế `this` một cách chính xác.

```js
var obj = {
	count: 0,
	cool: function coolFn() {
		if (this.count < 1) {
			setTimeout( function timer(){
				this.count++; // `this` is safe because of `bind(..)`
				console.log( "more awesome" );
			}.bind( this ), 100 ); // look, `bind()`!
		}
	}
};

obj.cool(); // more awesome
```

Cho dù bạn thích hành vi lexical-this của các arrow function hay bạn thích `bind()` đã thử-và-đúng, thì điều quan trọng cần lưu ý là các arrow function **không** chỉ là việc gõ ít chữ hơn "function".

Chúng có *sự khác biệt về hành vi có chủ đích* mà chúng ta nên học và hiểu, và nếu chúng ta chọn, hãy tận dụng.

Bây giờ chúng ta đã hiểu đầy đủ về lexical scope (và kết thúc!), Việc hiểu lexical-this thật dễ dàng!
