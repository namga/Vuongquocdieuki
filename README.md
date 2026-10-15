# Bé Học Vui – Vương Quốc Kỳ Diệu

Game giáo dục tiếng Việt cho trẻ 5–10 tuổi, dùng chung codebase Web/PWA và Android/iOS qua Capacitor.

## Có trong bản MVP
- Bản đồ 4 vùng đất: Toán học, Tiếng Việt, Sinh vật, Vũ trụ/logic.
- 4 nhóm mini-game nền tảng: trắc nghiệm hình ảnh, đếm số, từ vựng, quy luật logic.
- Phản hồi giải thích, gợi ý, sao học tập, xu ảo và thú cưng mở khóa.
- Tiến độ và kỹ năng lưu tự động bằng `localStorage`.
- PWA cache offline cho các tệp lõi.
- GitHub Actions build APK Android và build app iOS Simulator.

> Đây là MVP khởi đầu. Nội dung và giao diện cần được kiểm thử với trẻ/phụ huynh trước khi phát hành rộng rãi. Một số hình ảnh hiện dùng emoji để giữ dự án nhẹ và không phụ thuộc bộ ảnh thương mại.

## Chạy thử trên máy tính
Cần Node.js 22+.
```bash
npm install
npm run start
```
Mở `http://localhost:8080`.

## Đưa lên GitHub
1. Tạo repository mới, ví dụ `be-hoc-vui-vuong-quoc-ky-dieu`.
2. Giải nén ZIP này và tải toàn bộ nội dung lên repository (thư mục `.github/workflows` phải được giữ nguyên).
3. Có thể dùng GitHub web: **Add file → Upload files**, kéo thả toàn bộ nội dung.
4. Hoặc dùng Git:
```bash
git init
git add .
git commit -m "Initial Be Hoc Vui game MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/be-hoc-vui-vuong-quoc-ky-dieu.git
git push -u origin main
```

## Android APK qua GitHub Actions
- Vào tab **Actions**, chọn **Build Android APK**, bấm **Run workflow**. Workflow cũng chạy khi push lên `main` hoặc `master`.
- Khi chạy xong, mở run thành công → **Artifacts** → tải `Be-Hoc-Vui-Android-debug-APK`.
- APK debug dùng để thử nghiệm/cài đặt nội bộ, không phải bản phát hành Google Play đã ký bằng khóa release.

## iOS qua GitHub Actions
- Workflow **Build iOS Simulator App** chạy trên macOS và tạo app cho iOS Simulator, tải artifact `Be-Hoc-Vui-iOS-Simulator-App`.
- Bản Simulator **không cài trực tiếp lên iPhone thật** và không phải IPA phát hành.
- Để tạo IPA cài trên iPhone hoặc phát hành App Store cần Apple Developer Program, signing certificate, provisioning profile và cấu hình secrets phù hợp. Workflow hiện tại không giả vờ tạo IPA đã ký khi chưa có thông tin ký.

## Build local bằng Capacitor
Sau `npm install`:
```bash
npx cap add android
npx cap sync android
npx cap open android
```
iOS cần macOS và Xcode:
```bash
npx cap add ios
npx cap sync ios
npx cap open ios
```

## Lưu ý kỹ thuật
- ID ứng dụng: `com.behocvui.vuongquockydieu`.
- Dữ liệu học được lưu cục bộ trong trình duyệt/WebView trên thiết bị. Gỡ ứng dụng hoặc xóa dữ liệu có thể làm mất tiến trình.
- Chưa có đồng bộ nhiều thiết bị, tài khoản phụ huynh, CMS nội dung hoặc analytics.
- Không chứa quảng cáo hay mua hàng.
