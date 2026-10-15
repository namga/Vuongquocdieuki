package vn.vuonky.dieu;

import android.app.Activity;
import android.os.Bundle;
import android.os.Build;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.graphics.Color;
import android.speech.tts.TextToSpeech;
import android.view.View;
import android.view.Window;
import java.util.Locale;

public class MainActivity extends Activity {
    private WebView webView;
    private TextToSpeech tts;
    private boolean ttsReady = false;

    private class AudioBridge {
        @JavascriptInterface public void speak(String text) {
            runOnUiThread(() -> {
                if (tts != null && ttsReady) {
                    tts.stop();
                    tts.setLanguage(new Locale("vi", "VN"));
                    tts.setSpeechRate(0.88f);
                    tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "garden-utterance");
                } else if (webView != null) {
                    webView.evaluateJavascript("window.showAudioFallback && window.showAudioFallback()", null);
                }
            });
        }
        @JavascriptInterface public void stop() {
            runOnUiThread(() -> { if (tts != null) tts.stop(); });
        }
    }

    @Override public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Window window = getWindow();
        if (Build.VERSION.SDK_INT >= 30) window.setDecorFitsSystemWindows(true);
        window.setStatusBarColor(Color.rgb(234,245,223));
        window.setNavigationBarColor(Color.rgb(251,252,245));
        window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR | View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR);
        tts = new TextToSpeech(this, status -> {
            if (status == TextToSpeech.SUCCESS) {
                int result = tts.setLanguage(new Locale("vi", "VN"));
                ttsReady = result != TextToSpeech.LANG_MISSING_DATA && result != TextToSpeech.LANG_NOT_SUPPORTED;
            }
        });
        webView = new WebView(this);
        webView.setBackgroundColor(Color.rgb(251,252,245));
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        webView.addJavascriptInterface(new AudioBridge(), "AndroidTTS");
        webView.setWebChromeClient(new WebChromeClient());
        webView.setWebViewClient(new WebViewClient());
        setContentView(webView);
        if (savedInstanceState == null) webView.loadUrl("file:///android_asset/index.html");
        else webView.restoreState(savedInstanceState);
    }
    @Override protected void onSaveInstanceState(Bundle outState) { super.onSaveInstanceState(outState); if(webView!=null) webView.saveState(outState); }
    @Override protected void onDestroy() {
        if (tts != null) { tts.stop(); tts.shutdown(); }
        if (webView != null) webView.destroy();
        super.onDestroy();
    }
    @Override public void onBackPressed() { if (webView != null && webView.canGoBack()) webView.goBack(); else super.onBackPressed(); }
}
