import { TextToSpeech } from '@capacitor-community/text-to-speech';
(() => {
'use strict';
const $ = (s,root=document)=>root.querySelector(s);
const app=$('#app');
const STORAGE='be-hoc-vui-save-v1';
const worlds=[
 {id:'math',name:'Lâu Đài Toán Học',short:'Toán vui',emoji:'🏰',tone:'tone-pink',desc:'Đếm số, cộng trừ và quy luật',unlocked:true},
 {id:'language',name:'Đại Dương Ngôn Ngữ',short:'Tiếng Việt',emoji:'🐠',tone:'tone-blue',desc:'Từ ngữ, chữ cái và đọc hiểu',unlocked:true},
 {id:'nature',name:'Rừng Sinh Vật',short:'Khám phá tự nhiên',emoji:'🌳',tone:'tone-green',desc:'Động vật, cây cối và môi trường',unlocked:true},
 {id:'space',name:'Vũ Trụ Khám Phá',short:'Tư duy logic',emoji:'🚀',tone:'tone-purple',desc:'Quy luật, quan sát và mê cung',unlocked:true}
];
const lessons=[
 {id:'count',world:'math',title:'Đếm số cùng thỏ',icon:'🍎',type:'quiz',skill:'Đếm số lượng',age:'5–6 tuổi',description:'Đếm đồ vật và chọn số đúng',questions:[
  q('count1','Có bao nhiêu quả táo?','🍎 🍎 🍎 🍎 🍎',[3,4,5,6],5,'Hãy đếm từng quả táo từ trái sang phải.','Có 5 quả táo. Mỗi quả tương ứng với một số khi đếm.','count'),
  q('count2','Có bao nhiêu chú cá?','🐟 🐟 🐟',[2,3,4,5],3,'Con thử chỉ vào từng chú cá nhé.','Có 3 chú cá.','count'),
  q('count3','Có bao nhiêu ngôi sao?','⭐ ⭐ ⭐ ⭐',[3,4,5,6],4,'Đếm từng ngôi sao một lần.','Có 4 ngôi sao.','count'),
  q('count4','Có bao nhiêu quả bóng?','⚽ ⚽',[1,2,3,4],2,'Chỉ có hai quả bóng trong hình.','Có 2 quả bóng.','count'),
  q('count5','Có bao nhiêu bông hoa?','🌼 🌼 🌼 🌼 🌼 🌼',[4,5,6,7],6,'Đếm từng bông hoa.','Có 6 bông hoa.','count')
 ]},
 {id:'add',world:'math',title:'Phép cộng vui vẻ',icon:'➕',type:'quiz',skill:'Phép cộng',age:'6–8 tuổi',description:'Cộng các số nhỏ qua hình ảnh',questions:[
  q('add1','2 quả táo và thêm 1 quả. Có tất cả bao nhiêu?','🍎 🍎  +  🍎',[2,3,4,5],3,'Bắt đầu với 2, rồi đếm thêm 1.','2 + 1 = 3.','addition'),
  q('add2','3 + 2 bằng mấy?', '🟡 🟡 🟡  +  🟡 🟡',[4,5,6,7],5,'Đếm 3 rồi thêm 2 bước.','3 + 2 = 5.','addition'),
  q('add3','4 + 1 bằng mấy?','🧸 🧸 🧸 🧸 + 🧸',[4,5,6,7],5,'Thêm một là số tiếp theo.','4 + 1 = 5.','addition'),
  q('add4','2 + 2 bằng mấy?','🦋 🦋 + 🦋 🦋',[3,4,5,6],4,'Gộp hai nhóm lại rồi đếm.','2 + 2 = 4.','addition')
 ]},
 {id:'words',world:'language',title:'Từ ngữ quanh em',icon:'📖',type:'quiz',skill:'Từ vựng',age:'5–8 tuổi',description:'Nhận biết từ qua hình ảnh',questions:[
  q('word1','Con vật nào kêu “meo meo”?','🐶  🐱  🐮',['Chó','Mèo','Bò','Vịt'],'Mèo','Hãy nghĩ đến thú cưng thường nằm cuộn tròn và kêu meo meo.','Mèo thường kêu “meo meo”.','vocab'),
  q('word2','Quả nào có màu vàng và thường được khỉ thích?','🍓  🍌  🍇  🍉',['Dâu','Chuối','Nho','Dưa hấu'],'Chuối','Nhìn hình quả dài màu vàng.','Đó là quả chuối.','vocab'),
  q('word3','Ban đêm trên trời thường thấy gì?','🌞  🌙  🌻  🌈',['Mặt trời','Mặt trăng','Hoa','Cầu vồng'],'Mặt trăng','Vật này thường phát sáng trên bầu trời đêm.','Ban đêm ta thường thấy Mặt trăng và các vì sao.','vocab'),
  q('word4','Từ nào chỉ một loại cây?','🪑  🌳  🚗  📚',['Cái ghế','Cây xanh','Xe hơi','Sách'],'Cây xanh','Tìm hình có thân và cành lá.','Cây xanh là một loại thực vật.','vocab')
 ]},
 {id:'nature',world:'nature',title:'Bạn động vật',icon:'🦊',type:'matching',skill:'Phân loại sinh vật',age:'5–8 tuổi',description:'Chọn nơi sống phù hợp',questions:[
  q('nature1','Con vật nào sống dưới nước?','🐪  🐟  🐈  🐓',['Lạc đà','Cá','Mèo','Gà'],'Cá','Hãy chọn con vật có thể bơi và thở bằng mang.','Cá sống trong nước.','habitat'),
  q('nature2','Bộ phận nào giúp cây hút nước?','🌿  🌸  🌱  🍃',['Rễ','Hoa','Quả','Lá'],'Rễ','Bộ phận này nằm dưới đất.','Rễ giúp cây hút nước và chất khoáng.','plants'),
  q('nature3','Con vật nào thường sống trong tổ?','🐝  🐬  🐧  🐄',['Ong','Cá heo','Chim cánh cụt','Bò'],'Ong','Nghĩ đến nơi có nhiều ong sống cùng nhau.','Ong sống thành đàn trong tổ.','habitat')
 ]},
 {id:'logic',world:'space',title:'Mê cung tư duy',icon:'🤖',type:'sequence',skill:'Tư duy logic',age:'7–10 tuổi',description:'Tìm quy luật và chọn bước tiếp theo',questions:[
  q('logic1','Số tiếp theo là số nào? 2, 4, 6, ...','🔢',[7,8,9,10],8,'Mỗi lần tăng thêm 2.','Dãy số tăng thêm 2: 2, 4, 6, 8.','patterns'),
  q('logic2','Hình nào tiếp theo? 🔴 🔵 🔴 🔵 ...','🔴 🔵',[ '🔴','🔵','🟢','🟡'],'🔴','Hai màu đỏ và xanh luân phiên nhau.','Sau màu xanh là màu đỏ.','patterns'),
  q('logic3','Bạn đi 2 bước rồi thêm 1 bước. Tổng cộng mấy bước?','👣 👣 + 👣',[2,3,4,5],3,'Cộng số bước đã đi.','2 + 1 = 3 bước.','sequence')
 ]},
 {id:'subtract',world:'math',title:'Phép trừ thần kỳ',icon:'➖',type:'quiz',skill:'Phép trừ',age:'6–8 tuổi',description:'Bớt đi và tìm kết quả',questions:[
  q('sub1','Có 5 quả bóng, bay mất 2 quả. Còn mấy quả?','⚽ ⚽ ⚽ ⚽ ⚽  →  💨 💨',[2,3,4,5],3,'Bắt đầu từ 5 rồi bớt đi 2.','5 − 2 = 3 quả bóng.','subtraction'),
  q('sub2','7 − 3 bằng mấy?','🔢',[3,4,5,6],4,'Đếm lùi ba bước từ 7.','7 − 3 = 4.','subtraction'),
  q('sub3','Có 9 chiếc kẹo, bé ăn 1 chiếc. Còn bao nhiêu?','🍬 🍬 🍬 🍬 🍬 🍬 🍬 🍬 🍬',[7,8,9,10],8,'Bớt một thì còn số liền trước.','9 − 1 = 8.','subtraction'),
  q('sub4','10 − 5 bằng mấy?','🔟',[4,5,6,7],5,'Một nửa của 10 là 5.','10 − 5 = 5.','subtraction'),
  q('sub5','6 − 2 bằng mấy?','🦋 🦋 🦋 🦋 🦋 🦋',[3,4,5,6],4,'Đếm lùi từ 6 hai bước.','6 − 2 = 4.','subtraction')
 ]},
 {id:'shapes',world:'math',title:'Thế giới hình khối',icon:'🔺',type:'quiz',skill:'Hình học cơ bản',age:'5–8 tuổi',description:'Nhận biết hình và đặc điểm',questions:[
  q('shape1','Hình nào có 3 cạnh?','🔺 🔵 🟦',['Hình tròn','Hình tam giác','Hình vuông','Hình chữ nhật'],'Hình tam giác','Hãy đếm các cạnh thẳng của từng hình.','Hình tam giác có 3 cạnh.','shapes'),
  q('shape2','Hình vuông có bao nhiêu cạnh?','🟦',[3,4,5,6],4,'Đếm bốn cạnh xung quanh hình.','Hình vuông có 4 cạnh bằng nhau.','shapes'),
  q('shape3','Vật nào có dạng hình cầu?','⚽ 📕 🥪',['Quả bóng','Quyển sách','Miếng bánh'],'Quả bóng','Vật nào tròn đều như quả bóng?','Quả bóng có dạng gần giống hình cầu.','shapes'),
  q('shape4','Hình tròn có góc nhọn không?','⭕',['Có 1 góc','Có 4 góc','Không có góc','Có 3 góc'],'Không có góc','Hãy nhìn đường cong liền mạch của hình tròn.','Hình tròn không có cạnh thẳng và không có góc.','shapes'),
  q('shape5','Hình chữ nhật thường có bao nhiêu góc vuông?','▭',[2,3,4,5],4,'Đếm bốn góc của hình.','Hình chữ nhật có 4 góc vuông.','shapes')
 ]},
 {id:'moneytime',world:'math',title:'Tiền và thời gian',icon:'⏰',type:'quiz',skill:'Toán thực tế',age:'7–10 tuổi',description:'Làm quen đồng hồ và phép tính đời sống',questions:[
  q('mt1','Một giờ có bao nhiêu phút?','🕐',[30,45,60,100],60,'Kim phút đi hết một vòng mặt đồng hồ.','Một giờ có 60 phút.','time'),
  q('mt2','Bây giờ là 3 giờ. Một giờ nữa là mấy giờ?','🕒',['2 giờ','3 giờ','4 giờ','5 giờ'],'4 giờ','Đi thêm một số trên mặt đồng hồ.','3 giờ cộng 1 giờ là 4 giờ.','time'),
  q('mt3','Bé có 5.000 đồng, mua bút giá 2.000 đồng. Còn bao nhiêu?','✏️ 💵',[2000,3000,4000,5000],3000,'Lấy số tiền có trừ giá chiếc bút.','5.000 − 2.000 = 3.000 đồng.','money'),
  q('mt4','Một tuần có bao nhiêu ngày?','📅',[5,6,7,8],7,'Đếm từ thứ Hai đến Chủ nhật.','Một tuần có 7 ngày.','time'),
  q('mt5','Nửa giờ bằng bao nhiêu phút?','⏳',[15,20,30,60],30,'Nửa của 60 là bao nhiêu?','Nửa giờ bằng 30 phút.','time')
 ]},
 {id:'vietnameseletters',world:'language',title:'Chữ cái vui nhộn',icon:'🔤',type:'quiz',skill:'Nhận biết chữ cái',age:'5–7 tuổi',description:'Nhận diện chữ cái đầu từ',questions:[
  q('letter1','Từ “mèo” bắt đầu bằng chữ nào?','🐱',['M','B','T','C'],'M','Nghe âm đầu của từ mèo.','“Mèo” bắt đầu bằng chữ M.','letters'),
  q('letter2','Từ “cá” bắt đầu bằng chữ nào?','🐟',['G','C','L','N'],'C','Phát âm chậm từ cá.','“Cá” bắt đầu bằng chữ C.','letters'),
  q('letter3','Chữ nào là nguyên âm?','🔤',['B','T','A','M'],'A','Nguyên âm có thể phát âm thành tiếng rõ ràng.','A là một nguyên âm trong tiếng Việt.','letters'),
  q('letter4','Từ nào có dấu sắc?','📚',['bà','bé','bò','bù'],'bé','Tìm tiếng có dấu nhỏ đi lên trên chữ.','“Bé” có dấu sắc ở chữ e.','letters'),
  q('letter5','Từ nào chỉ đồ vật dùng để viết?','✏️',['bàn','bút','bát','bóng'],'bút','Đồ vật này thường cầm trên tay khi viết.','Bút dùng để viết hoặc vẽ.','letters')
 ]},
 {id:'reading',world:'language',title:'Đọc hiểu câu ngắn',icon:'📘',type:'quiz',skill:'Đọc hiểu',age:'6–9 tuổi',description:'Đọc câu và suy luận đơn giản',questions:[
  q('read1','“Lan tưới cây mỗi sáng.” Lan làm gì?','🌱',['Tưới cây','Đá bóng','Ngủ','Nấu cơm'],'Tưới cây','Tìm hành động được nhắc trong câu.','Lan tưới cây mỗi sáng.','reading'),
  q('read2','“Trời mưa, Nam mở ô.” Vì sao Nam mở ô?','☔',['Để che mưa','Để ăn cơm','Để đi ngủ','Để vẽ tranh'],'Để che mưa','Ô giúp chúng ta tránh điều gì từ trên trời rơi xuống?','Nam mở ô để che mưa.','reading'),
  q('read3','“Bé cho cá ăn rồi thay nước.” Bé chăm sóc con gì?','🐠',['Mèo','Cá','Chim','Thỏ'],'Cá','Câu nhắc đến việc cho ăn và thay nước.','Bé đang chăm sóc cá.','reading'),
  q('read4','“Minh có 2 quyển truyện và mượn thêm 1 quyển.” Minh có tất cả mấy quyển?','📚',[2,3,4,5],3,'Cộng số truyện có sẵn với số mượn thêm.','2 + 1 = 3 quyển truyện.','reading'),
  q('read5','Việc nào nên làm sau khi đọc sách?','📖',['Cất sách gọn gàng','Xé trang sách','Vẽ lên sách','Ném sách'],'Cất sách gọn gàng','Hãy chọn cách giữ gìn sách.','Cất sách gọn gàng giúp sách bền và dễ tìm.','reading')
 ]},
 {id:'bodyhealth',world:'nature',title:'Cơ thể khỏe mạnh',icon:'🧼',type:'quiz',skill:'Sức khỏe cá nhân',age:'5–9 tuổi',description:'Thói quen vệ sinh và chăm sóc bản thân',questions:[
  q('health1','Khi nào nên rửa tay bằng xà phòng?','🧼',['Trước khi ăn và sau khi đi vệ sinh','Chỉ khi tay thơm','Không bao giờ','Chỉ trước khi ngủ'],'Trước khi ăn và sau khi đi vệ sinh','Bàn tay có thể mang vi trùng dù nhìn vẫn sạch.','Rửa tay bằng xà phòng trước khi ăn và sau khi đi vệ sinh giúp giảm vi trùng.','health'),
  q('health2','Thói quen nào tốt cho răng?','🦷',['Đánh răng đều đặn','Ăn kẹo cả ngày','Không uống nước','Dùng chung bàn chải'],'Đánh răng đều đặn','Chọn việc giúp làm sạch răng.','Đánh răng đều đặn giúp bảo vệ răng miệng.','health'),
  q('health3','Đồ uống nào nên chọn thường xuyên nhất?','🥤',['Nước lọc','Nước ngọt có ga','Nước tăng lực','Siro thật ngọt'],'Nước lọc','Cơ thể cần nước để hoạt động.','Nước lọc là lựa chọn tốt để uống hằng ngày.','nutrition'),
  q('health4','Khi qua đường, bé nên làm gì?','🚦',['Đi cùng người lớn và quan sát tín hiệu','Chạy thật nhanh','Vừa đi vừa nhìn điện thoại','Chơi đùa giữa đường'],'Đi cùng người lớn và quan sát tín hiệu','Đường phố có xe cộ nên cần được người lớn hướng dẫn.','Hãy đi cùng người lớn, quan sát tín hiệu và qua đường ở nơi an toàn.','safety'),
  q('health5','Khi cảm thấy không khỏe, bé nên làm gì?','🤒',['Báo cho người lớn đáng tin cậy','Giấu mọi người','Tự uống thuốc bất kỳ','Bỏ ăn cả ngày'],'Báo cho người lớn đáng tin cậy','Người lớn có thể giúp bé được chăm sóc phù hợp.','Hãy nói với cha mẹ, thầy cô hoặc người lớn đáng tin cậy.','health')
 ]},
 {id:'environment',world:'nature',title:'Bảo vệ Trái Đất',icon:'🌍',type:'quiz',skill:'Môi trường',age:'5–10 tuổi',description:'Phân loại rác và tiết kiệm tài nguyên',questions:[
  q('env1','Vỏ chuối nên bỏ vào đâu nếu có thùng rác hữu cơ?','🍌',['Thùng rác hữu cơ','Bể cá','Ngăn đông','Bàn học'],'Thùng rác hữu cơ','Vỏ trái cây có thể phân hủy tự nhiên.','Vỏ chuối có thể được phân loại vào rác hữu cơ.','environment'),
  q('env2','Khi rời phòng và không còn ai dùng đèn, nên làm gì?','💡',['Tắt đèn','Bật thêm đèn','Để đèn sáng cả ngày','Che đèn bằng giấy'],'Tắt đèn','Tắt thiết bị không cần dùng giúp tiết kiệm điện.','Tắt đèn khi không cần giúp tiết kiệm năng lượng.','energy'),
  q('env3','Việc nào giúp tiết kiệm nước?','🚰',['Khóa vòi khi đánh răng','Để vòi chảy liên tục','Rửa sân bằng vòi cả giờ','Chơi nước cả ngày'],'Khóa vòi khi đánh răng','Nước không cần chảy trong suốt lúc đánh răng.','Khóa vòi khi đánh răng giúp tiết kiệm nước.','water'),
  q('env4','Khi đi dã ngoại, rác nên được xử lý thế nào?','🏕️',['Thu gom và bỏ đúng nơi','Để lại dưới gốc cây','Ném xuống suối','Chôn mọi loại rác tùy ý'],'Thu gom và bỏ đúng nơi','Hãy giữ nơi vui chơi sạch sẽ cho mọi người và động vật.','Thu gom rác và bỏ đúng nơi giúp bảo vệ thiên nhiên.','environment'),
  q('env5','Cây xanh giúp ích gì cho môi trường?','🌳',['Tạo bóng mát và hấp thụ khí carbon dioxide','Làm bẩn không khí','Ngăn mọi cơn mưa','Tạo ra rác nhựa'],'Tạo bóng mát và hấp thụ khí carbon dioxide','Cây sử dụng khí carbon dioxide trong quá trình quang hợp.','Cây tạo bóng mát và hấp thụ carbon dioxide khi quang hợp.','plants')
 ]},
 {id:'spacefacts',world:'space',title:'Khám phá vũ trụ',icon:'🪐',type:'quiz',skill:'Khoa học tự nhiên',age:'6–10 tuổi',description:'Hành tinh, Mặt Trời và quan sát bầu trời',questions:[
  q('space1','Trái Đất quay quanh thiên thể nào?','🌍',['Mặt Trời','Mặt Trăng','Sao Hỏa','Sao Kim'],'Mặt Trời','Trái Đất là một hành tinh trong Hệ Mặt Trời.','Trái Đất quay quanh Mặt Trời.','space'),
  q('space2','Mặt Trăng là gì?','🌙',['Vệ tinh tự nhiên của Trái Đất','Một ngôi sao','Một đại dương','Một đám mây'],'Vệ tinh tự nhiên của Trái Đất','Mặt Trăng chuyển động quanh Trái Đất.','Mặt Trăng là vệ tinh tự nhiên của Trái Đất.','space'),
  q('space3','Nguồn sáng tự nhiên chính của Trái Đất là gì?','☀️',['Mặt Trời','Sao biển','Cầu vồng','Mây'],'Mặt Trời','Ánh sáng ban ngày đến từ ngôi sao gần Trái Đất nhất.','Mặt Trời cung cấp phần lớn ánh sáng và năng lượng cho Trái Đất.','space'),
  q('space4','Hành tinh chúng ta đang sống tên là gì?','🌏',['Sao Hỏa','Trái Đất','Sao Mộc','Sao Thổ'],'Trái Đất','Đó là hành tinh có đại dương và sự sống mà chúng ta biết.','Chúng ta sống trên hành tinh Trái Đất.','space'),
  q('space5','Ngày và đêm xảy ra chủ yếu vì điều gì?','🌗',['Trái Đất tự quay quanh trục','Mặt Trời tắt vào ban đêm','Mặt Trăng che Mặt Trời mỗi ngày','Các ngôi sao di chuyển quanh nhà'],'Trái Đất tự quay quanh trục','Một phía của Trái Đất hướng về Mặt Trời trong khi phía kia khuất sáng.','Trái Đất tự quay quanh trục nên các nơi lần lượt có ngày và đêm.','space')
 ]},
 {id:'english',world:'language',title:'English đầu tiên',icon:'🇬🇧',type:'quiz',skill:'Tiếng Anh cơ bản',age:'7–10 tuổi',description:'Từ tiếng Anh quen thuộc qua hình ảnh',questions:[
  q('eng1','“Apple” có nghĩa là gì?','🍎',['Quả táo','Quả chuối','Con mèo','Quyển sách'],'Quả táo','Apple là tên một loại quả thường có màu đỏ hoặc xanh.','Apple nghĩa là quả táo.','english'),
  q('eng2','“Cat” là con gì?','🐱',['Con chó','Con mèo','Con cá','Con chim'],'Con mèo','Con vật này thường kêu meo meo.','Cat nghĩa là con mèo.','english'),
  q('eng3','“Hello” dùng để làm gì?','👋',['Chào hỏi','Tạm biệt','Cảm ơn','Xin lỗi'],'Chào hỏi','Đây là lời thường dùng khi gặp ai đó.','Hello có nghĩa là xin chào.','english'),
  q('eng4','Số “three” là số mấy?','🔢',[2,3,4,5],3,'One, two, rồi đến từ này.','Three nghĩa là số ba.','english'),
  q('eng5','“Thank you” có nghĩa là gì?','😊',['Cảm ơn','Xin chào','Tạm biệt','Chúc ngủ ngon'],'Cảm ơn','Dùng khi muốn bày tỏ sự biết ơn.','Thank you nghĩa là cảm ơn.','english')
 ]},
 {id:'feelings',world:'nature',title:'Cảm xúc và tình bạn',icon:'💗',type:'quiz',skill:'Cảm xúc xã hội',age:'5–9 tuổi',description:'Nhận biết cảm xúc và cách cư xử tử tế',questions:[
  q('feel1','Bạn mình buồn vì làm rơi đồ chơi. Bé nên làm gì?','🧸',['Hỏi thăm và giúp bạn nếu có thể','Cười chê bạn','Giấu đồ chơi của bạn','Bỏ mặc bạn để trêu'],'Hỏi thăm và giúp bạn nếu có thể','Hãy nghĩ cách làm bạn cảm thấy được quan tâm.','Hỏi thăm và giúp đỡ là cách thể hiện sự đồng cảm.','empathy'),
  q('feel2','Khi tức giận, cách nào có thể giúp bé bình tĩnh?','🌬️',['Hít thở chậm và nói với người lớn','Đánh bạn','Ném đồ vật','La hét vào mặt mọi người'],'Hít thở chậm và nói với người lớn','Dừng lại một chút giúp cơ thể dịu xuống.','Hít thở chậm và nhờ người lớn hỗ trợ là cách an toàn.','emotions'),
  q('feel3','Khi muốn mượn đồ chơi của bạn, bé nên làm gì?','🪀',['Hỏi xin phép trước','Tự lấy mà không hỏi','Giấu đồ chơi','Giật khỏi tay bạn'],'Hỏi xin phép trước','Đồ của người khác cần được tôn trọng.','Hãy hỏi xin phép và chờ bạn đồng ý.','kindness'),
  q('feel4','Nếu vô tình làm bạn buồn, bé có thể làm gì?','🤝',['Xin lỗi chân thành và sửa sai','Đổ lỗi cho bạn','Giả vờ không biết','Tiếp tục trêu bạn'],'Xin lỗi chân thành và sửa sai','Nhận trách nhiệm giúp hàn gắn tình bạn.','Xin lỗi và cố gắng sửa sai thể hiện sự tôn trọng.','kindness'),
  q('feel5','Mỗi người có thể có cảm xúc khác nhau không?','🙂 😢',['Có, và ta nên lắng nghe nhau','Không ai được buồn','Chỉ một người được vui','Cảm xúc luôn giống nhau'],'Có, và ta nên lắng nghe nhau','Mọi người có trải nghiệm và cảm nhận riêng.','Mỗi người có thể cảm thấy khác nhau; hãy tôn trọng và lắng nghe.','emotions')
 ]}

];
function q(id,prompt,visual,answers,answer,hint,explanation,skill){return{id,prompt,visual,answers,answer,hint,explanation,skill};}
function fresh(){return{version:1,stars:0,coins:0,completed:[],attempts:[],skills:{},unlockedPets:['panda'],settings:{sound:true,age:'5-8',largeText:false},lastPlayed:null};}
let state=load(), screen='home', selectedWorld=null, currentLesson=null, questionIndex=0, session={correct:0,firstTry:0,hints:0,answered:false,attempts:0,earned:0};
function load(){try{const x=JSON.parse(localStorage.getItem(STORAGE)||'null');return x&&x.version===1?{...fresh(),...x}:fresh()}catch{return fresh()}}
function save(){try{localStorage.setItem(STORAGE,JSON.stringify(state))}catch{};$('#starCount').textContent=state.stars}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}
function nav(tab){screen=tab;document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));render()}
function head(title,sub=''){return `<div class="page-title"><button class="back" data-action="back">←</button><div><h1>${title}</h1>${sub?`<p>${sub}</p>`:''}</div></div>`}
function render(){save();if(screen==='home')renderHome();else if(screen==='learn')renderLearn();else if(screen==='collection')renderCollection();else if(screen==='progress')renderProgress();else if(screen==='world')renderWorld();else if(screen==='game')renderGame();else if(screen==='result')renderResult();else if(screen==='profile')renderProfile()}
function renderHome(){
 const done=state.completed.length;
 app.innerHTML=`<section class="hero"><h1>Chào nhà thám hiểm nhí! 🌟</h1><p>Mỗi ngày khám phá một điều mới. Cùng các bạn thú khôi phục phép màu cho vương quốc nhé!</p><div class="mascot">🐼</div></section>
 <div class="section-head"><h2>🌟 Nhiệm vụ hôm nay</h2><span>${done} bài đã hoàn thành</span></div>
 <section class="mission"><div class="mission-icon">🧩</div><div style="flex:1"><strong>${done===0?'Bắt đầu hành trình đầu tiên':done<3?'Tiếp tục khám phá nhé':'Tuyệt vời! Bé đang tiến bộ'}</strong><p>${done===0?'Chơi một bài ngắn để nhận sao đầu tiên.':'Hoàn thành thêm một bài và ôn lại kiến thức đã học.'}</p></div><button class="primary" data-action="start">Chơi</button></section>
 <div class="section-head"><h2>🗺️ Khám phá vương quốc</h2><span>4 vùng đất</span></div>
 <div class="world-grid">${worlds.map(w=>`<button class="world-card ${w.tone}" data-world="${w.id}"><span class="world-emoji">${w.emoji}</span><strong>${w.name}</strong><small>${w.desc}</small><span class="lock">✨</span></button>`).join('')}</div>
 <div class="section-head"><h2>🌱 Tiến bộ của bé</h2><span data-action="progress">Xem tất cả →</span></div>
 <div class="stat-grid"><div class="stat"><strong>${state.stars} ⭐</strong><small>Sao học tập</small></div><div class="stat"><strong>${done} 📚</strong><small>Bài đã học</small></div><div class="stat"><strong>${Object.keys(state.skills).filter(k=>state.skills[k].mastery>=80).length} 🌟</strong><small>Kỹ năng vững</small></div></div>`;
}
function renderLearn(){app.innerHTML=`${head('Chọn chuyến phiêu lưu','Mỗi bài chỉ mất khoảng 2–4 phút')}<div class="lesson-list">${lessons.map(l=>`<button class="lesson-card" data-lesson="${l.id}"><span class="lesson-icon">${l.icon}</span><span class="lesson-info"><strong>${l.title}</strong><small>${l.age} · ${l.questions.length} câu · ${l.description}</small></span><span class="chevron">›</span></button>`).join('')}</div><section class="panel" style="margin-top:14px"><strong>💡 Mẹo nhỏ</strong><p style="margin:5px 0 0;color:var(--muted);font-size:13px">Nếu câu hỏi khó, hãy dùng gợi ý. Học chậm mà hiểu rõ cũng rất tuyệt!</p></section>`}
function renderWorld(){const w=worlds.find(x=>x.id===selectedWorld);const ls=lessons.filter(l=>l.world===selectedWorld);app.innerHTML=`${head(w.name,w.desc)}<div class="hero" style="min-height:135px"><h1 style="font-size:24px;max-width:72%">Cùng ${w.emoji} khám phá!</h1><p style="max-width:72%">Hoàn thành bài học để tích lũy kiến thức và sao.</p><div class="mascot">${w.emoji}</div></div><div class="section-head"><h2>Bài học trong vùng đất</h2><span>${ls.length} bài</span></div><div class="lesson-list">${ls.map(l=>lessonCard(l)).join('')}</div>`}
function lessonCard(l){return `<button class="lesson-card" data-lesson="${l.id}"><span class="lesson-icon">${l.icon}</span><span class="lesson-info"><strong>${l.title}</strong><small>${l.age} · ${l.questions.length} câu · ${l.description}</small></span><span class="chevron">›</span></button>`}
function startLesson(id){currentLesson=lessons.find(l=>l.id===id);if(!currentLesson)return;questionIndex=0;session={correct:0,firstTry:0,hints:0,answered:false,attempts:0,earned:0};state.lastPlayed=id;screen='game';render()}
let speechRequestId = 0;
async function stopSpeech(){
 speechRequestId++;
 try { await TextToSpeech.stop(); } catch {}
 if ('speechSynthesis' in window) { try { window.speechSynthesis.cancel(); } catch {} }
}
async function speakQuestion(text){
 if(!state.settings.sound) return;
 const requestId = ++speechRequestId;
 const cleanText = String(text).replace(/[🔢⭐🌙🌞]/gu,' ').replace(/\.\.\./g,' ').trim();
 // In the Android/iOS app, use native device TTS first. This avoids relying
 // on the often-missing speechSynthesis implementation in Android WebView.
 try {
  const isNative = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
  if (isNative) {
   await TextToSpeech.stop().catch(()=>{});
   if (requestId !== speechRequestId || !state.settings.sound) return;
   await TextToSpeech.speak({
    text: cleanText,
    lang: 'vi-VN',
    rate: 0.88,
    pitch: 1.04,
    volume: 1.0,
    category: 'ambient'
   });
   return;
  }
 } catch (err) {
  console.warn('Native TTS unavailable; trying browser speech:', err);
 }
 // PWA/browser fallback. Some browsers require the first speak to follow a tap.
 if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
  toast('Thiết bị chưa hỗ trợ đọc câu hỏi. Hãy kiểm tra dịch vụ Chuyển văn bản thành giọng nói.');
  return;
 }
 try {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'vi-VN';
  utterance.rate = 0.88;
  utterance.pitch = 1.04;
  const voices = window.speechSynthesis.getVoices();
  const vietnameseVoice = voices.find(v => /^vi(-|$)/i.test(v.lang));
  if (vietnameseVoice) utterance.voice = vietnameseVoice;
  utterance.onerror = () => toast('Không phát được giọng đọc. Hãy nhấn nút loa hoặc kiểm tra giọng tiếng Việt trên thiết bị.');
  window.speechSynthesis.speak(utterance);
 } catch (e) {
  toast('Không thể phát âm thanh trên thiết bị này.');
 }
}
function renderGame(){
 const l=currentLesson,q=l.questions[questionIndex];session.answered=false;
 const pct=Math.round(questionIndex/l.questions.length*100);
 app.innerHTML=`${head(l.title,`Câu ${questionIndex+1}/${l.questions.length} · ${l.age}`)}<section class="game-panel"><div class="question-label">CÙNG HỌC NÀO! ✨</div><div class="progress-line"><div style="width:${pct}%"></div></div><div class="question-row"><div class="question">${esc(q.prompt)}</div><button class="speak-btn" data-action="speakQuestion" aria-label="Nghe lại câu hỏi" title="Nghe lại câu hỏi">🔊</button></div><div class="visual">${esc(q.visual)}</div><div class="answers">${q.answers.map((a,i)=>`<button class="answer" data-answer="${i}">${esc(a)}</button>`).join('')}</div><div id="feedback"></div><div class="game-actions"><button class="secondary" data-action="hint">💡 Gợi ý</button><button class="secondary" data-action="quit">Tạm dừng</button></div></section>`;
 // Automatically read each question aloud when it appears. The speaker button can replay it.
 setTimeout(() => { if(screen==='game' && currentLesson===l && questionIndex>=0) speakQuestion(q.prompt); }, 180);
}
function answer(index){
 if(session.answered)return;
 const q=currentLesson.questions[questionIndex],chosen=q.answers[index],correct=String(chosen)===String(q.answer);
 session.answered=true;session.attempts++;
 const btns=[...document.querySelectorAll('[data-answer]')];
 btns.forEach((b,i)=>{b.disabled=true;if(String(q.answers[i])===String(q.answer))b.classList.add('correct');if(i===index&&!correct)b.classList.add('wrong')});
 const fb=$('#feedback');fb.className='feedback '+(correct?'':'bad');
 fb.innerHTML=`<strong>${correct?'🎉 Chính xác! Giỏi quá!':'🌱 Gần đúng rồi, mình thử học nhé!'}</strong><p>${esc(q.explanation)}</p>${!correct?`<p>Gợi ý: ${esc(q.hint)}</p>`:''}<button class="primary full" data-action="next">${questionIndex===currentLesson.questions.length-1?'Xem kết quả':'Tiếp tục'} →</button>`;
 if(correct){session.correct++;if(session.attempts===1)session.firstTry++;session.earned+=2;recordSkill(q.skill,true)}
 else{recordSkill(q.skill,false)}
 state.attempts.push({questionId:q.id,correct,firstTry:correct&&session.attempts===1,hintUsed:session.hints>0,at:new Date().toISOString()});if(state.attempts.length>500)state.attempts=state.attempts.slice(-500);
 save();
}
function recordSkill(id,correct){const s=state.skills[id]||{seen:0,correct:0,mastery:0};s.seen++;if(correct)s.correct++;s.mastery=Math.round(s.correct/s.seen*100);state.skills[id]=s}
function showHint(){if(session.answered)return;session.hints++;const q=currentLesson.questions[questionIndex];const fb=$('#feedback');fb.className='feedback';fb.innerHTML=`<strong>💡 Gợi ý nho nhỏ</strong><p>${esc(q.hint)}</p>`;toast('Cố lên, bé làm được!')}
function nextQuestion(){if(questionIndex<currentLesson.questions.length-1){questionIndex++;session.attempts=0;renderGame()}else finishLesson()}
function finishLesson(){const l=currentLesson;const percent=Math.round(session.correct/l.questions.length*100);const earned=Math.max(1,Math.round(session.correct*2+(percent>=80?2:0)));session.earned=earned;state.stars+=earned;state.coins+=earned*2;if(!state.completed.includes(l.id))state.completed.push(l.id);if(state.completed.length>=2&&!state.unlockedPets.includes('rabbit'))state.unlockedPets.push('rabbit');if(state.completed.length>=4&&!state.unlockedPets.includes('fox'))state.unlockedPets.push('fox');save();screen='result';render()}
function renderResult(){const percent=Math.round(session.correct/currentLesson.questions.length*100);app.innerHTML=`<section class="panel result"><div class="big">${percent>=80?'🏆':percent>=50?'🌟':'🌱'}</div><h1>${percent>=80?'Xuất sắc!':percent>=50?'Làm tốt lắm!':'Cùng luyện thêm nhé!'}</h1><p>Bé đã hoàn thành “${currentLesson.title}”. Mỗi lần thử là một bước tiến!</p><div class="stat-grid"><div class="stat"><strong>${session.correct}/${currentLesson.questions.length}</strong><small>Câu đúng</small></div><div class="stat"><strong>+${session.earned} ⭐</strong><small>Sao nhận được</small></div><div class="stat"><strong>${percent}%</strong><small>Kết quả</small></div></div><button class="primary full" data-action="replay">🔁 Chơi lại bài này</button><button class="secondary full" data-action="nextLesson">Khám phá bài khác →</button><button class="secondary full" data-action="home">Về vương quốc 🏰</button></section>`}
const pets=[{id:'panda',name:'Gấu trúc Bông',emoji:'🐼',need:0},{id:'rabbit',name:'Thỏ Mây',emoji:'🐰',need:2},{id:'fox',name:'Cáo Đuôi Bông',emoji:'🦊',need:4},{id:'dino',name:'Khủng long Tí Hon',emoji:'🦕',need:7},{id:'unicorn',name:'Kỳ lân Cầu Vồng',emoji:'🦄',need:10},{id:'owl',name:'Cú Mèo Thông Thái',emoji:'🦉',need:12}];
function renderCollection(){app.innerHTML=`${head('Bộ sưu tập','Những người bạn đồng hành của bé')}<section class="panel" style="margin-bottom:14px"><strong>🎒 Túi kho báu</strong><p style="margin:5px 0 0;color:var(--muted);font-size:13px">Bé có ${state.coins} xu ảo. Nhận thêm bằng cách học và khám phá.</p></section><div class="collection-grid">${pets.map(p=>{const unlocked=state.unlockedPets.includes(p.id)||state.completed.length>=p.need&&p.need===0;return `<div class="pet ${unlocked?'':'locked'}"><div class="pet-emoji">${unlocked?p.emoji:'🔒'}</div><strong>${p.name}</strong><small>${unlocked?'Bạn đồng hành của bé':`Hoàn thành ${p.need} bài để mở khóa`}</small></div>`}).join('')}</div><div class="section-head"><h2>🏡 Trang trí nhà</h2></div><section class="panel"><div style="font-size:44px;text-align:center">🏡 🌷 🌳</div><p style="text-align:center;color:var(--muted);font-size:13px">Góc nhà của bé sẽ có thêm đồ trang trí trong các bản cập nhật tiếp theo.</p></section>`}
function renderProgress(){const attempts=state.attempts;const independent=attempts.filter(a=>a.correct&&a.firstTry).length;const accuracy=attempts.length?Math.round(attempts.filter(a=>a.correct).length/attempts.length*100):0;app.innerHTML=`${head('Tiến bộ của bé','Cùng nhìn lại những điều đã học')}<div class="stat-grid"><div class="stat"><strong>${state.completed.length}</strong><small>Bài hoàn thành</small></div><div class="stat"><strong>${accuracy}%</strong><small>Tỷ lệ đúng</small></div><div class="stat"><strong>${state.stars} ⭐</strong><small>Sao tích lũy</small></div></div><div class="section-head"><h2>🌱 Kỹ năng đang luyện</h2><span>${Object.keys(state.skills).length} kỹ năng</span></div><section class="panel">${Object.entries(state.skills).length?Object.entries(state.skills).map(([k,s])=>`<div class="skill-row"><span class="skill-emoji">${s.mastery>=80?'🌟':'🌱'}</span><div class="skill-body"><strong>${esc(({count:'Đếm số lượng',addition:'Phép cộng',subtraction:'Phép trừ',shapes:'Hình học cơ bản',time:'Thời gian',money:'Tiền và tính toán',vocab:'Từ vựng',letters:'Nhận biết chữ cái',reading:'Đọc hiểu',habitat:'Môi trường sống',plants:'Thực vật',health:'Sức khỏe cá nhân',nutrition:'Dinh dưỡng',safety:'An toàn cá nhân',environment:'Môi trường',energy:'Tiết kiệm năng lượng',water:'Tiết kiệm nước',patterns:'Nhận biết quy luật',sequence:'Trình tự',space:'Khoa học vũ trụ',english:'Tiếng Anh cơ bản',empathy:'Đồng cảm',emotions:'Cảm xúc',kindness:'Lòng tốt'}[k]||k))}</strong><small>${s.correct} câu đúng trên ${s.seen} lần trả lời · ${s.mastery>=80?'Đang rất tốt':'Tiếp tục luyện tập nhé'}</small><div class="skill-meter"><div style="width:${s.mastery}%"></div></div></div><strong>${s.mastery}%</strong></div>`).join(''):'<div class="empty">🌼 Bé hãy chơi bài đầu tiên để bắt đầu ghi nhận tiến bộ nhé!</div>'}</section><div class="section-head"><h2>📘 Gợi ý cho phụ huynh</h2></div><section class="panel"><p style="margin:0;font-size:13px;color:var(--muted)">Tỷ lệ đúng là chỉ số tham khảo. Để đánh giá ghi nhớ, hãy cho bé làm lại câu hỏi tương tự sau vài ngày và quan sát khả năng giải thích bằng lời của bé.</p></section>`}
function renderProfile(){app.innerHTML=`${head('Góc cài đặt','Thiết lập trải nghiệm phù hợp cho bé')}<section class="panel"><div class="profile-row"><label for="age">Nhóm tuổi</label><select id="age"><option value="5-6" ${state.settings.age==='5-6'?'selected':''}>5–6 tuổi</option><option value="7-8" ${state.settings.age==='7-8'?'selected':''}>7–8 tuổi</option><option value="9-10" ${state.settings.age==='9-10'?'selected':''}>9–10 tuổi</option><option value="5-8" ${state.settings.age==='5-8'?'selected':''}>5–8 tuổi</option></select></div><div class="profile-row"><label for="sound">Âm thanh hướng dẫn</label><input id="sound" type="checkbox" ${state.settings.sound?'checked':''}></div><div class="profile-row"><label for="largeText">Chữ lớn</label><input id="largeText" type="checkbox" ${state.settings.largeText?'checked':''}></div><button class="primary full" data-action="saveSettings">Lưu cài đặt</button><button class="secondary full" data-action="reset">Đặt lại tiến độ trên thiết bị này</button></section><section class="panel" style="margin-top:12px"><strong>🔒 Riêng tư và an toàn</strong><p style="font-size:13px;color:var(--muted)">Bản MVP lưu tiến độ cục bộ trên thiết bị. Chưa có tài khoản, quảng cáo hay đồng bộ đám mây. Phụ huynh nên hỗ trợ trẻ khi sử dụng.</p></section>`}
function back(){stopSpeech();if(screen==='game'){screen='learn'}else if(screen==='world'){screen='home'}else if(screen==='result'){screen='home'}else screen='home';render()}
document.addEventListener('click',e=>{
 const navBtn=e.target.closest('[data-tab]');if(navBtn){nav(navBtn.dataset.tab);return}
 const world=e.target.closest('[data-world]');if(world){selectedWorld=world.dataset.world;screen='world';render();return}
 const lesson=e.target.closest('[data-lesson]');if(lesson){startLesson(lesson.dataset.lesson);return}
 const answerBtn=e.target.closest('[data-answer]');if(answerBtn){answer(Number(answerBtn.dataset.answer));return}
 const action=e.target.closest('[data-action]');if(!action)return;
 switch(action.dataset.action){
  case 'back':back();break;
  case 'start':nav('learn');break;
  case 'progress':nav('progress');break;
  case 'home':nav('home');break;
  case 'hint':showHint();break;
  case 'speakQuestion':if(currentLesson && currentLesson.questions[questionIndex]) speakQuestion(currentLesson.questions[questionIndex].prompt);break;
  case 'next':nextQuestion();break;
  case 'quit':if(confirm('Bé muốn tạm dừng bài này chứ? Tiến độ các câu đã trả lời vẫn được lưu.')){stopSpeech();screen='learn';render()}break;
  case 'replay':startLesson(currentLesson.id);break;
  case 'nextLesson':nav('learn');break;
  case 'saveSettings':state.settings.age=$('#age').value;state.settings.sound=$('#sound').checked;state.settings.largeText=$('#largeText').checked;if(!state.settings.sound)stopSpeech();save();document.body.classList.toggle('large-text',state.settings.largeText);toast('Đã lưu cài đặt!');nav('home');break;
  case 'reset':if(confirm('Xóa toàn bộ tiến độ trên thiết bị này? Hành động này không thể hoàn tác.')){state=fresh();save();nav('home');toast('Đã đặt lại tiến độ')}break;
 }
});
$('#profileBtn').addEventListener('click',()=>{screen='profile';render()});
document.addEventListener('keydown',e=>{if(screen==='game'&&['1','2','3','4'].includes(e.key)){const b=document.querySelectorAll('[data-answer]')[Number(e.key)-1];if(b&&!b.disabled)b.click()}});
const style=document.createElement('style');style.textContent='.large-text body,.large-text button,.large-text p{font-size:1.08em!important}';document.head.append(style);
render();
})();