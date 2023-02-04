# You Don't Know JS: *this* & Object Prototypes
# Foreword (Lời tựa)

Trong khi đọc cuốn sách này để chuẩn bị viết lời nói đầu này, tôi buộc phải suy nghĩ về cách tôi đã học JavaScript và nó đã thay đổi như thế nào trong 15 năm qua mà tôi đã lập trình và phát triển cùng với nó.

Khi tôi bắt đầu sử dụng JavaScript 15 năm trước, cách sử dụng các công nghệ không phải HTML như CSS và JS trong các trang web của bạn được gọi là DHTML hoặc HTML động. Trước đó, tính hữu ích của JavaScript rất đa dạng và dường như nghiêng về việc thêm các bông tuyết hoạt hình vào trang web của bạn hoặc đồng hồ động báo thời gian trên thanh trạng thái. Có thể nói rằng, tôi không thực sự chú ý nhiều đến JavaScript trong giai đoạn đầu của sự nghiệp vì tính mới của các triển khai mà tôi thường thấy trên Internet.

Mãi cho đến năm 2005, lần đầu tiên tôi khám phá lại JavaScript như một ngôn ngữ lập trình thực sự mà tôi cần chú ý hơn. Sau khi đào sâu vào bản phát hành beta đầu tiên của Google Maps, tôi đã bị thu hút bởi tiềm năng mà nó có. Vào thời điểm đó, Google Maps là ứng dụng độc nhất vô nhị -- ứng dụng này cho phép bạn di chuyển bản đồ xung quanh bằng chuột, phóng to và thu nhỏ cũng như thực hiện các yêu cầu máy chủ mà không cần tải lại trang -- tất cả đều có JavaScript. Nó có vẻ như ma thuật!

Khi bất cứ điều gì có vẻ giống như ma thuật, đó thường là một dấu hiệu tốt cho thấy bạn đang ở buổi bình minh của một cách làm việc mới. Và bạn ơi, tôi không sai đâu -- tua nhanh đến ngày hôm nay, tôi sẽ nói rằng JavaScript là một trong những ngôn ngữ chính mà tôi sử dụng cho cả lập trình phía máy khách và máy chủ, và tôi sẽ không có cách nào khác.

Một trong những điều hối tiếc của tôi khi nhìn lại 15 năm qua là tôi đã không cho JavaScript nhiều cơ hội hơn trước năm 2005, hay chính xác hơn là tôi đã thiếu tầm nhìn xa để coi JavaScript là một ngôn ngữ lập trình thực sự hữu ích như C++, C#, Java và nhiều ngôn ngữ khác.

Nếu tôi có bộ sách *You Don't Know JS* này khi bắt đầu sự nghiệp của mình, lịch sử sự nghiệp của tôi sẽ khác nhiều so với ngày nay. Và đó là một trong những điều tôi yêu thích ở loạt bài này: nó giải thích về JS ở mức độ giúp bạn hiểu rõ hơn khi xem qua loạt bài này, nhưng theo một cách thú vị và nhiều thông tin.

*this & Object Prototype* là phần tiếp theo tuyệt vời của series. Nó thực hiện một công việc tuyệt vời và tự nhiên là xây dựng dựa trên cuốn sách trước, Phạm vi & Đóng cửa, đồng thời mở rộng kiến thức đó sang một phần rất quan trọng của ngôn ngữ JS, từ khóa `this` và các nguyên mẫu. Hai điều đơn giản này là mấu chốt cho những gì bạn sẽ học trong các cuốn sách sau này, bởi vì chúng là nền tảng để lập trình thực sự với JavaScript. Khái niệm về cách tạo các đối tượng, liên kết chúng và mở rộng chúng để thể hiện những thứ trong ứng dụng của bạn là cần thiết để tạo các ứng dụng lớn và phức tạp trong JavaScript. Và nếu không có chúng, việc tạo các ứng dụng phức tạp (chẳng hạn như Google Maps) sẽ không thể thực hiện được bằng JavaScript.

Tôi muốn nói rằng đại đa số các nhà phát triển web có thể chưa bao giờ xây dựng một đối tượng JavaScript và chỉ coi ngôn ngữ này là chất kết dính sự kiện giữa các nút và yêu cầu AJAX. Tôi đã ở trong trại đó vào một thời điểm trong sự nghiệp của mình, nhưng sau khi tôi học cách thành thạo các nguyên mẫu và tạo các đối tượng trong JavaScript, một thế giới khả năng đã mở ra cho tôi. Nếu bạn thuộc trường hợp chỉ tạo mã keo liên kết sự kiện, thì cuốn sách này là cuốn sách phải đọc; nếu bạn chỉ cần ôn lại, cuốn sách này sẽ là một nguồn tài nguyên cần thiết cho bạn. Dù bằng cách nào, bạn sẽ không phải thất vọng. Tin tôi đi!

Nick Berardi<br>
[nickberardi.com](http://nickberardi.com), [@nberardi](http://twitter.com/nberardi)
