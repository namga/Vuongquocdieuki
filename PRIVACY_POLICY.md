# Chính sách quyền riêng tư — Vườn Cây Kì Diệu

**Phiên bản:** MVP cục bộ, cập nhật 15/10/2026.

## 1. Phạm vi
Chính sách này mô tả bản MVP Web/PWA và Android hiện tại. Đây là bản dự thảo sản phẩm, cần được rà soát pháp lý trước khi phát hành rộng rãi hoặc đưa lên cửa hàng ứng dụng.

## 2. Dữ liệu được lưu
Ứng dụng lưu trên thiết bị các cài đặt nhóm tuổi, thời lượng phiên, chủ đề được phép, mã phụ huynh, hạt giống/giọt nước, nhiệm vụ đã hoàn thành, lịch sử học, vật phẩm đã mở khóa và bố cục vườn. Bản hiện tại không yêu cầu tên thật, email, số điện thoại, ngày sinh chính xác hay tài khoản.

## 3. Cách xử lý và chia sẻ
Dữ liệu tiến độ được lưu bằng `localStorage` trong trình duyệt/WebView. Bản MVP không có máy chủ tài khoản, đồng bộ đám mây, quảng cáo, công cụ phân tích, theo dõi quảng cáo, trò chuyện, định vị hoặc chia sẻ công khai. Vì vậy nhà phát triển không nhận dữ liệu tiến độ qua máy chủ trong phiên bản này. Dịch vụ hosting có thể ghi nhật ký truy cập kỹ thuật riêng khi người dùng tải trang; hãy xem chính sách của nhà cung cấp hosting nếu triển khai công khai.

## 4. Âm thanh và quyền thiết bị
Giọng đọc dùng Text-to-Speech của trình duyệt/hệ điều hành. Ứng dụng không cần quyền micro để đọc câu hỏi và không yêu cầu camera, vị trí, danh bạ hay thư viện ảnh. Dịch vụ giọng đọc của hệ điều hành có thể có cách xử lý riêng theo cài đặt thiết bị.

## 5. Trẻ em và vai trò phụ huynh
Ứng dụng hướng tới trẻ 5–15 tuổi. Phụ huynh chọn nhóm tuổi, thời lượng, chủ đề và theo dõi tiến độ trong khu vực khóa. Mã mặc định `1234` chỉ để thử nghiệm; phụ huynh cần đổi mã trước khi dùng thực tế. Mã và dữ liệu cục bộ không được mã hóa trong MVP, do đó đây không phải lớp bảo mật chống người có quyền truy cập thiết bị.

## 6. Lưu giữ và xóa dữ liệu
Dữ liệu giữ trên thiết bị đến khi người dùng xóa hoặc xóa dữ liệu ứng dụng/trình duyệt. Trong Góc phụ huynh:
- **Xóa tiến độ (giữ cài đặt):** xóa lịch sử học, phần thưởng, vật phẩm đã mở khóa và trạng thái khu vườn; giữ nhóm tuổi, thời lượng, chủ đề và mã phụ huynh.
- **Xóa toàn bộ dữ liệu ứng dụng:** xóa khóa dữ liệu cục bộ `magicGardenState`, đặt lại phiên ứng dụng và đưa mã về mặc định `1234`. Không có dữ liệu tài khoản trên máy chủ trong bản hiện tại để xóa.
- Xóa dữ liệu trang web trong trình duyệt hoặc xóa dữ liệu ứng dụng Android cũng có thể xóa tiến độ.

## 7. Thay đổi chính sách
Nếu thêm tài khoản, phân tích, đồng bộ đám mây, quảng cáo, thanh toán hoặc SDK bên thứ ba, phải cập nhật chính sách, thông báo rõ dữ liệu mới, mục đích, bên nhận, thời gian lưu và cơ chế đồng ý/xóa trước khi phát hành.

## 8. Liên hệ
Trước khi phát hành công khai, nhà phát hành cần điền thông tin liên hệ hỗ trợ/quyền riêng tư chính thức tại đây.
