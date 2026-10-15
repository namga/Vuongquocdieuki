# Vườn Cây Kì Diệu 🌱

**Thông điệp:** Mỗi điều con học được sẽ giúp khu vườn lớn lên.

Bản MVP gồm Web/PWA và project Android Studio (WebView dùng chung giao diện và logic). App dùng tiếng Việt, lưu hồ sơ/tiến độ trên thiết bị, có 48 nhiệm vụ với biến thể độ khó theo nhóm tuổi, giọng đọc tiếng Việt qua TTS của thiết bị, 30 cây, danh mục riêng cho 15 côn trùng, 15 động vật, 7 bạn đồng hành, 8 vùng đất trong bộ sưu tập và 20 đồ trang trí, phần thưởng không có mua vật phẩm hay chuỗi đăng nhập hằng ngày.

## Chạy Web/PWA

- Mở `web/index.html` để thử nhanh trên trình duyệt. Một số tính năng PWA/cài đặt offline cần chạy qua HTTPS hoặc localhost.
- Để chạy local, vào thư mục `web` và chạy `python -m http.server 8080`, sau đó mở `http://localhost:8080`.
- Dữ liệu lưu bằng `localStorage` trên thiết bị/trình duyệt hiện tại. Xóa dữ liệu trình duyệt có thể xóa tiến độ.

## Android Studio / APK

1. Mở thư mục `android/` bằng Android Studio (Android Gradle Plugin 8.7.3, JDK 17, compile SDK 35).
2. Đồng bộ Gradle và chạy trên thiết bị hoặc build `app` > `Build APK(s)`.
3. GitHub Actions ở `.github/workflows/build-apk.yml` tự build debug APK khi push thay đổi Android lên `main`/`master`, hoặc chạy thủ công ở tab **Actions**. Tải APK tại phần **Artifacts** của lượt chạy.

Để GitHub Actions build APK, push toàn bộ thư mục dự án lên repository GitHub, đảm bảo nhánh là `main` hoặc `master`.

## Góc phụ huynh

- Mã mặc định: `1234` và thêm một phép tính đơn giản để mở khóa. Đổi mã ngay trong cài đặt khi sử dụng thực tế.
- Chọn nhóm tuổi, thời lượng phiên và chủ đề được phép.
- Phiên chơi có nhắc nghỉ theo thời lượng đã chọn. Đây là MVP phía thiết bị; giới hạn không phải công cụ kiểm soát phụ huynh ở cấp hệ điều hành và không chống được trẻ biết mã/biết xóa dữ liệu.

## Lưu ý bản MVP

- Giọng đọc dùng Vietnamese TTS nếu trình duyệt/thiết bị có giọng `vi-VN`; nếu không, cần cài giọng tiếng Việt trên thiết bị.
- Nội dung nhiệm vụ là mẫu giáo dục khởi đầu, cần người lớn kiểm duyệt/điều chỉnh theo chương trình và từng độ tuổi trước khi phát hành rộng.
- APK debug do workflow tạo ra không phải APK phát hành đã ký bằng khóa riêng. Trước khi phát hành lên cửa hàng, cần thiết lập signing key và quy trình bảo vệ secrets.


## Quyền riêng tư, an toàn nội dung và xóa dữ liệu

- Đọc `PRIVACY_POLICY.md` và `CONTENT_SAFETY_POLICY.md` trước khi phát hành. Đây là chính sách MVP; cần điền thông tin liên hệ nhà phát hành và rà soát pháp lý trước khi công bố.
- Góc phụ huynh có **Xóa tiến độ (giữ cài đặt)** và **Xóa toàn bộ dữ liệu ứng dụng**. Dữ liệu hiện lưu trên thiết bị, không có tài khoản hoặc đồng bộ máy chủ.
- Ứng dụng không yêu cầu quyền micro/camera/vị trí/danh bạ. TTS dùng giọng đọc hệ thống/trình duyệt.
- Mã phụ huynh mặc định `1234` chỉ dùng thử nghiệm; đổi mã trước khi sử dụng. Mã chưa được mã hóa trong MVP.
