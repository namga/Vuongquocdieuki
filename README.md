# Vương Quốc Diệu Kì

Game giáo dục tiếng Việt cho trẻ 5–10 tuổi, dùng chung codebase Web/PWA và Android/iOS qua Capacitor.

## Có trong bản MVP
- Bản đồ 4 vùng đất: Toán học, Tiếng Việt, Sinh vật, Vũ trụ/logic.
- 4 nhóm mini-game nền tảng: trắc nghiệm hình ảnh, đếm số, từ vựng, quy luật logic.
- Phản hồi giải thích, gợi ý, sao học tập, xu ảo và thú cưng mở khóa.
- Tiến độ và kỹ năng lưu tự động bằng `localStorage`.
- PWA cache offline cho các tệp lõi.
- Tự động đọc câu hỏi bằng giọng tiếng Việt (`vi-VN`) khi mở mỗi câu; có nút loa để nghe lại và tắt âm thanh trong cài đặt.
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
1. Tạo repository mới, ví dụ `vuong-quoc-dieu-ki`.
2. Giải nén ZIP này và tải toàn bộ nội dung lên repository (thư mục `.github/workflows` phải được giữ nguyên).
3. Có thể dùng GitHub web: **Add file → Upload files**, kéo thả toàn bộ nội dung.
4. Hoặc dùng Git:
```bash
git init
git add .
git commit -m "Initial Be Hoc Vui game MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vuong-quoc-dieu-ki.git
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


## App icon Android
The Android GitHub Actions workflow applies the branded Vương Quốc Diệu Kì icon into Android `mipmap` resources after generating/syncing the Capacitor project. Re-run the Android workflow and install the newly generated APK; an APK already downloaded will keep its old icon.


## iOS workflow troubleshooting
The iOS Simulator workflow disables Xcode's generated Swift asset-symbol extensions to avoid a known class of failures compiling `GeneratedAssetSymbols.swift` on some Xcode runner configurations. If it still fails, expand the log lines immediately above `Command SwiftCompile failed`; the first `error:` line identifies the remaining root cause.


## Audio câu hỏi (bản cập nhật)
- Android/iOS dùng plugin native `@capacitor-community/text-to-speech` trước, thay vì phụ thuộc hoàn toàn vào `speechSynthesis` trong WebView.
- PWA/browser vẫn dùng Web Speech API làm phương án dự phòng.
- Cần có dịch vụ TTS và giọng tiếng Việt (`vi-VN`) được cài trên thiết bị. Nếu thiết bị không có giọng tiếng Việt, native TTS có thể báo lỗi hoặc dùng giọng mặc định tùy engine.
- Sau khi cập nhật, phải chạy lại GitHub Actions và cài APK mới; APK đã tải trước đó không chứa thay đổi.


## Nội dung học tập mở rộng
Bản nội dung mở rộng có 15 bài học với khoảng 65 câu hỏi, gồm: đếm số, cộng, trừ, hình học, tiền và thời gian, chữ cái, đọc hiểu, động vật/thực vật, sức khỏe, an toàn giao thông, môi trường, vũ trụ, tiếng Anh cơ bản và cảm xúc/tình bạn. Các câu hỏi có gợi ý và giải thích; độ tuổi được ghi theo từng bài.


## Đổi tên ứng dụng
Tên hiển thị của ứng dụng đã đổi thành **Vương Quốc Diệu Kì** cho PWA và dự án Capacitor Android/iOS. `appId` vẫn giữ nguyên `com.behocvui.vuongquockydieu` để bản cài mới có thể nâng cấp bản cũ thay vì xuất hiện như một ứng dụng khác. Sau khi đổi tên, cần chạy lại GitHub Actions để tên mới xuất hiện trên APK mới.


## Fix dependency for Capacitor 7
The text-to-speech dependency is pinned to `^6.1.0`, which is a published version compatible with Capacitor 7. Version `^7.0.0` was not published, which caused npm `ETARGET / notarget` during dependency installation. The workflow uses `npm install` to resolve and install dependencies.
