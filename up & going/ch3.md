# You Don't Know JS: Up & Going
# Chapter 3: Into YDKJS

Bộ sách này nói về cái gì? Nói một cách đơn giản, đó là việc thực hiện nghiêm túc nhiệm vụ học *tất cả các phần của JavaScript*, không chỉ một số tập hợp con của ngôn ngữ mà ai đó gọi là "các phần tốt" và không chỉ là bất kỳ số tiền tối thiểu nào bạn cần để hoàn thành công việc của mình.

Các nhà phát triển nghiêm túc ở các ngôn ngữ khác mong đợi sẽ nỗ lực học hầu hết hoặc tất cả (các) ngôn ngữ mà họ chủ yếu viết, nhưng các nhà phát triển JS dường như nổi bật so với đám đông theo nghĩa thường không học nhiều ngôn ngữ đó. Đây không phải là một điều tốt và nó không phải là điều chúng ta nên tiếp tục cho phép trở thành tiêu chuẩn.

Loạt bài *You Don't Know JS* (*YDKJS*) hoàn toàn trái ngược với các cách tiếp cận điển hình để học JS và không giống như bất kỳ cuốn sách JS nào khác mà bạn sẽ đọc. Nó thách thức bạn vượt ra khỏi vùng an toàn của mình và đặt những câu hỏi "tại sao" sâu hơn cho mọi hành vi mà bạn gặp phải. Bạn có sẵn sàng cho thử thách đó không?

Tôi sẽ sử dụng chương cuối cùng này để tóm tắt ngắn gọn những gì mong đợi từ phần còn lại của các cuốn sách trong bộ sách và cách xây dựng nền tảng học JS hiệu quả nhất trên *YDKJS*.

## Scope & Closures

Có lẽ một trong những điều cơ bản nhất mà bạn cần phải nhanh chóng hiểu ra là scope của các biến thực sự hoạt động như thế nào trong JavaScript. Không nên có những *niềm tin* mơ hồ mang tính giai thoại về scope.

Cuốn sách *Scope & Closures* bắt đầu bằng cách loại bỏ quan niệm sai lầm phổ biến rằng JS là một "ngôn ngữ được thông dịch" và do đó không được biên dịch. Không.

Công cụ JS biên dịch mã của bạn ngay trước khi (và đôi khi trong khi thực thi!). Vì vậy, chúng tôi sử dụng một số hiểu biết sâu hơn về cách tiếp cận của trình biên dịch đối với mã của chúng tôi để hiểu cách nó tìm và xử lý các khai báo biến và hàm. Trong quá trình tìm hiểu, chúng ta thấy phép ẩn dụ điển hình cho quản lý phạm vi biến JS, "Hoisting".

Sự hiểu biết quan trọng về "lexical scope" này là những gì chúng tôi căn cứ để khám phá kết thúc chương cuối cùng của cuốn sách. Closure có lẽ là khái niệm quan trọng nhất trong tất cả JS, nhưng nếu bạn chưa nắm chắc cách thức hoạt động của scope, thì closure có thể sẽ nằm ngoài khả năng nắm bắt của bạn.

Một ứng dụng quan trọng của closure là module, như chúng tôi đã giới thiệu ngắn gọn trong cuốn sách này ở Chương 2. Module pattern có lẽ là pattern tổ chức mã phổ biến nhất trong tất cả JavaScript; hiểu biết sâu sắc về nó nên là một trong những ưu tiên cao nhất của bạn.

## this & Object Prototypes

Có lẽ một trong những sai lầm phổ biến và dai dẳng nhất về JavaScript là từ khóa `this` đề cập đến chức năng mà nó xuất hiện. Sự thiếu sót nghiêm trọng.

Từ khóa `this` được liên kết động dựa trên cách hàm được đề cập đến được thực thi và hóa ra có bốn quy tắc đơn giản để hiểu và xác định đầy đủ ràng buộc `this`.

Liên quan chặt chẽ đến từ khóa `this` là cơ chế object prototype(nguyên mẫu đối tượng), là một chuỗi tra cứu các thuộc tính, tương tự như cách tìm các biến lexical scope. Nhưng gói gọn trong các prototype (nguyên mẫu) là một điểm sai lầm lớn khác về JS: ý tưởng mô phỏng các lớp (giả mạo) và kế thừa (cái gọi là "prototype").

Thật không may, mong muốn mang tư duy mẫu thiết kế lớp và kế thừa vào JavaScript chỉ là điều tồi tệ nhất mà bạn có thể cố gắng làm, bởi vì trong khi cú pháp có thể đánh lừa bạn nghĩ rằng có một cái gì đó giống như các lớp hiện diện, trên thực tế, cơ chế nguyên mẫu về cơ bản ngược lại trong hành vi của nó.

Vấn đề là liệu tốt hơn nên bỏ qua sự không phù hợp và giả vờ rằng những gì bạn đang triển khai là "kế thừa" hay liệu việc tìm hiểu và nắm bắt cách thức hoạt động của hệ thống nguyên mẫu đối tượng thực sự là phù hợp hơn. Sau này được đặt tên thích hợp hơn là "behavior delegation(ủy quyền hành vi)".

Đây không chỉ là sở thích về cú pháp. Delegation(Ủy quyền) là một mẫu thiết kế hoàn toàn khác và mạnh mẽ hơn, một mẫu thay thế nhu cầu thiết kế với các lớp và kế thừa. Nhưng những khẳng định này sẽ hoàn toàn bay xa khi đối mặt với gần như mọi bài đăng blog, sách và cuộc hội thảo khác về chủ đề này trong suốt thời gian tồn tại của JavaScript.

Những tuyên bố mà tôi đưa ra liên quan đến ủy quyền so với kế thừa không phải xuất phát từ việc không thích ngôn ngữ và cú pháp của nó, mà từ mong muốn thấy khả năng thực sự của ngôn ngữ được tận dụng đúng cách và sự bối rối và thất vọng vô tận đã được xóa bỏ.

Nhưng trường hợp tôi thực hiện liên quan đến nguyên mẫu và ủy quyền là một trường hợp liên quan nhiều hơn những gì tôi sẽ yêu thích ở đây. Nếu bạn đã sẵn sàng xem xét lại mọi thứ bạn nghĩ rằng bạn biết về "class" và "kế thừa" JavaScript, tôi cho bạn cơ hội "uống viên thuốc màu đỏ" (*Matrix* 1999) và xem Chương 4-6 của cuốn *this & Object Prototypes* của bộ sách này.

## Types & Grammar

Cuốn thứ ba trong bộ sách này chủ yếu tập trung vào việc giải quyết một chủ đề gây tranh cãi khác: ép kiểu. Có lẽ không có chủ đề nào gây ra sự thất vọng với các nhà phát triển JS hơn là khi bạn nói về những bối rối xung quanh sự ép kiểu ngầm.

Cho đến nay, thông thường cho rằng ép kiểu ngầm là một "phần xấu" của ngôn ngữ và cần phải tránh bằng mọi giá. Trên thực tế, một số đã đi xa đến mức gọi nó là một "lỗ hổng" trong thiết kế ngôn ngữ. Thật vậy, có những công cụ mà toàn bộ công việc của chúng là không làm gì khác ngoài việc quét mã của bạn và phàn nàn nếu bạn đang làm bất cứ điều gì thậm chí từ xa như ép kiểu.

Nhưng liệu sự ép buộc có thực sự khó hiểu, tồi tệ, nguy hiểm đến mức mã của bạn sẽ bị hủy diệt ngay từ đầu nếu bạn sử dụng nó?

Tôi nói là không. Sau khi đã xây dựng sự hiểu biết về cách các loại và giá trị thực sự hoạt động trong Chương 1-3, Chương 4 sẽ tiếp tục cuộc tranh luận này và giải thích đầy đủ cách hoạt động của ép kiểu, trong tất cả các ngóc ngách của nó. Chúng ta chỉ thấy những phần nào của sự ép kiểu thực sự đáng ngạc nhiên và những phần nào thực sự hoàn toàn có ý nghĩa nếu dành thời gian để tìm hiểu.

Nhưng tôi không chỉ gợi ý rằng ép kiểu là hợp lý và có thể học được, tôi khẳng định rằng ép kiểu là một công cụ cực kỳ hữu ích và hoàn toàn bị đánh giá thấp mà *bạn nên sử dụng trong mã của mình.* Tôi đang nói rằng ép kiểu, khi được sử dụng đúng cách, không chỉ hoạt động mà còn làm cho mã của bạn tốt hơn. Tất cả những người phản đối và nghi ngờ chắc chắn sẽ chế giễu một vị trí như vậy, nhưng tôi tin rằng đó là một trong những chìa khóa chính để nâng cao khả năng làm chủ JS của bạn.

Bạn có muốn tiếp tục làm theo những gì đám đông nói hay bạn sẵn sàng đặt tất cả các giả định sang một bên và nhìn vào sự ép kiểu với một góc nhìn mới mẻ? Cuốn *Types & Grammar* của bộ sách này sẽ ép kiểu suy nghĩ của bạn.

## Async & Performance

Ba cuốn đầu tiên của bộ sách này tập trung vào cơ chế cốt lõi của ngôn ngữ, nhưng cuốn thứ tư phân nhánh một chút để đề cập đến các mẫu trên cơ chế ngôn ngữ để quản lý lập trình không đồng bộ. Tính không đồng bộ không chỉ quan trọng đối với hiệu suất của các ứng dụng của chúng ta, mà nó ngày càng trở thành *yếu tố* quan trọng trong khả năng ghi và khả năng bảo trì.

Cuốn sách bắt đầu bằng cách giải quyết rất nhiều sự nhầm lẫn về thuật ngữ và khái niệm xung quanh những thứ như "async (không đồng bộ)", "parallel (song song)" và "concurrent (đồng thời)", đồng thời giải thích sâu về cách những thứ như vậy hoạt động và không áp dụng cho JS.

Sau đó, chúng tôi chuyển sang kiểm tra các lệnh gọi lại như là phương pháp chính để kích hoạt tính đồng bộ. Nhưng ở đây, chúng ta nhanh chóng thấy rằng chỉ riêng callback là không đủ cho nhu cầu hiện đại của lập trình không đồng bộ. Chúng tôi xác định hai thiếu sót chính của mã hóa chỉ gọi lại: Mất tin cậy *Inversion of Control* (IoC) và thiếu khả năng lý do tuyến tính.

Để giải quyết hai thiếu sót chính này, ES6 giới thiệu hai cơ chế mới (và thực sự là các mẫu): promises và generators.

Promise là một trình bao bọc không phụ thuộc vào thời gian xung quanh "giá trị tương lai", cho phép bạn suy luận và soạn chúng bất kể giá trị đó đã sẵn sàng hay chưa. Hơn nữa, họ giải quyết hiệu quả các vấn đề về độ tin cậy của IoC bằng cách định tuyến các cuộc gọi lại thông qua cơ chế hứa có thể kết hợp và đáng tin cậy.

Generators(Trình tạo) giới thiệu một chế độ thực thi mới cho các hàm JS, theo đó generator có thể bị tạm dừng tại các điểm `yield (năng suất)` và được tiếp tục lại một cách không đồng bộ sau đó. Khả năng tạm dừng và tiếp tục cho phép mã tìm kiếm đồng bộ, tuần tự trong generator được xử lý không đồng bộ ở hậu trường. Bằng cách làm như vậy, chúng tôi giải quyết các nhầm lẫn phi tuyến tính, không cục bộ của các lệnh gọi lại và do đó làm cho mã đồng bộ hóa không đồng bộ của chúng tôi trông có vẻ hợp lý hơn.

Nhưng chính sự kết hợp của các promise và genetator mới "tạo ra" parrtern code không đồng bộ hiệu quả nhất của chúng tôi cho đến nay trong JavaScript. Trên thực tế, phần lớn sự tinh vi trong tương lai của tính đồng bộ trong ES7 và sau này chắc chắn sẽ được xây dựng trên nền tảng này. Để nghiêm túc về việc lập trình một cách hiệu quả trong một thế giới không đồng bộ, bạn sẽ cần phải thực sự thoải mái với việc kết hợp các promise và generator.

Nếu các promise và generator là về việc thể hiện các mẫu cho phép các chương trình của chúng tôi chạy đồng thời hơn và do đó có nhiều quá trình xử lý hoàn thành hơn trong thời gian ngắn hơn, thì JS có nhiều khía cạnh khác của việc tối ưu hóa hiệu suất đáng để khám phá.

Chương 5 đi sâu vào các chủ đề như parallelism (song song) chương trình với Web worker và (song song) dữ liệu với SIMD, cũng như các kỹ thuật tối ưu hóa cấp thấp như ASM.js. Chương 6 xem xét tối ưu hóa hiệu suất từ góc độ của các kỹ thuật đo điểm chuẩn thích hợp, bao gồm những loại hiệu suất nào cần lo lắng và những gì cần bỏ qua.

Viết JavaScript một cách hiệu quả có nghĩa là viết mã có thể phá vỡ các rào cản hạn chế của việc được chạy động trong một loạt các trình duyệt và các môi trường khác. Việc lập kế hoạch phức tạp và chi tiết cũng như nỗ lực từ các bộ phận của chúng tôi để đưa một chương trình từ "nó hoạt động" thành "nó hoạt động tốt".

Cuốn sách *Async & Performance* được thiết kế để cung cấp cho bạn tất cả các công cụ và kỹ năng cần thiết để viết mã JavaScript hợp lý và hiệu quả.

## ES6 & Beyond

Cho dù cho đến thời điểm này, bạn có cảm thấy mình đã thành thạo JavaScript đến đâu, sự thật là JavaScript sẽ không bao giờ ngừng phát triển, và hơn nữa, tốc độ tiến hóa đang tăng lên nhanh chóng. Sự thật này gần như là một phép ẩn dụ cho tinh thần của bộ truyện này, để hiểu rằng chúng ta sẽ không bao giờ *biết đầy đủ* mọi phần của JS, bởi vì ngay khi bạn nắm vững tất cả, sẽ có những thứ mới sắp xuất hiện mà bạn cần phải học.

Cuốn này dành riêng cho cả tầm nhìn ngắn hạn và trung hạn về vị trí mà ngôn ngữ hướng đến, không chỉ những thứ *đã biết* như ES6 mà còn là những thứ *có khả năng* xa hơn.

Mặc dù tất cả các tiêu đề của loạt bài này đều có trạng thái JavaScript tại thời điểm viết bài này, tức là đang giữa chừng thông qua việc áp dụng ES6, trọng tâm chính của loạt bài này là về ES5. Bây giờ, chúng tôi muốn chuyển sự chú ý của mình sang ES6, ES7 và ...

Vì ES6 đã gần hoàn thiện tại thời điểm viết bài này, *ES6 & Beyond* bắt đầu bằng cách chia nội dung cụ thể từ bối cảnh ES6 thành một số danh mục chính, bao gồm cú pháp mới, cấu trúc dữ liệu mới (collections), khả năng xử lý và API mới . Chúng tôi đề cập đến từng tính năng ES6 mới này, ở các mức độ chi tiết khác nhau, bao gồm cả việc xem xét các chi tiết được đề cập đến trong các cuốn sách khác của loạt bài này.

Một số điều thú vị của ES6 mong muốn được đọc về: cấu trúc, giá trị tham số mặc định, ký hiệu, phương thức ngắn gọn, thuộc tính được tính toán, hàm mũi tên, phạm vi khối, promise, generator, trình lặp, mô-đun, proxy, weakmaps, và nhiều hơn nữa! Phù, ES6 đóng gói khá tốt!

Phần đầu tiên của cuốn sách là một lộ trình cho tất cả những thứ bạn cần học để sẵn sàng cho JavaScript mới và cải tiến mà bạn sẽ viết và khám phá trong vài năm tới.

Phần sau của cuốn sách hướng sự chú ý đến những thứ mà chúng ta có thể mong đợi sẽ thấy trong tương lai gần của JavaScript. Nhận thức quan trọng nhất ở đây là sau ES6, JS có khả năng sẽ phát triển theo từng tính năng hơn là từng phiên bản, có nghĩa là chúng ta có thể mong đợi những điều tương lai gần này đến sớm hơn nhiều so với những gì bạn có thể tưởng tượng.

Tương lai cho JavaScript rất tươi sáng. Tại sao bây giờ không phải là lúc chúng ta bắt đầu học nó!?

## Review

Chuỗi *YDKJS* dành riêng cho đề xuất rằng tất cả các nhà phát triển JS có thể và nên học tất cả các phần của ngôn ngữ tuyệt vời này. Không có ý kiến của người nào, không có giả định của khuôn khổ và không có thời hạn của dự án sẽ là lý do giải thích tại sao bạn không bao giờ học và hiểu sâu sắc về JavaScript.

Chúng ta tập trung vào từng lĩnh vực quan trọng trong ngôn ngữ và dành một cuốn sách ngắn nhưng rất dày đặc để khám phá đầy đủ tất cả các phần của nó mà bạn có thể nghĩ rằng bạn đã biết nhưng có lẽ chưa đầy đủ.

"Bạn không biết JS" không phải là một lời chỉ trích hay một sự xúc phạm. Đó là một nhận thức rằng tất cả chúng ta, bao gồm cả bản thân tôi, đều phải chấp nhận. Học JavaScript không phải là mục tiêu cuối cùng mà là một quá trình. Chúng tôi chưa biết JavaScript. Nhưng chúng ta sẽ làm!
