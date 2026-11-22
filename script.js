const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('musicToggle');
const musicFloatingBtn = document.getElementById('musicFloatingBtn');
let isMusicPlaying = false;

function syncMusicUI(playing) {
  isMusicPlaying = playing;
  if (musicToggle) musicToggle.classList.toggle('playing', playing);
  if (musicFloatingBtn) musicFloatingBtn.classList.toggle('playing', playing);
}

function toggleMusic() {
  if (!bgMusic) return;
  if (!bgMusic.paused) {
    bgMusic.pause();
    syncMusicUI(false);
  } else {
    bgMusic.play().then(() => {
      syncMusicUI(true);
    }).catch(e => console.warn("Music play failed:", e));
  }
}

// Automatically play music right on page open + fallback on earliest user gesture
const initMusic = () => {
  if (!bgMusic) return;
  bgMusic.volume = 0.7;

  const tryPlay = () => {
    if (!bgMusic.paused) {
      syncMusicUI(true);
      return;
    }
    bgMusic.play().then(() => {
      syncMusicUI(true);
      removeGestureListeners();
    }).catch(() => {});
  };

  const gestureEvents = ['pointerdown', 'mousedown', 'touchstart', 'keydown', 'wheel', 'click'];
  const onFirstGesture = (e) => {
    // Ignore clicks directly on the music toggle button so it doesn't double-toggle
    if (e.target && (e.target.closest('#musicToggle') || e.target.closest('#musicFloatingBtn'))) {
      removeGestureListeners();
      return;
    }
    tryPlay();
  };

  const removeGestureListeners = () => {
    gestureEvents.forEach(evt => document.removeEventListener(evt, onFirstGesture));
  };

  gestureEvents.forEach(evt => document.addEventListener(evt, onFirstGesture, { passive: true }));

  bgMusic.addEventListener('play', () => syncMusicUI(true));
  bgMusic.addEventListener('pause', () => syncMusicUI(false));

  // Immediate attempt on script load
  tryPlay();
};
initMusic();

// ===== BILINGUAL (VI / EN) TRANSLATION ENGINE =====
const i18nTranslations = {
  vi: {
    "meta.title": "NGUYỄN TRẦN TIẾN PHÚC | Portfolio",
    "meta.description": "Portfolio cá nhân - Nguyễn Trần Tiến Phúc | Sinh viên chuyên ngành Thị trường Chứng khoán & Kinh doanh Quốc tế UEH",
    "nav.logoTitle": "TIẾN PHÚC",
    "nav.logoSub": "— Tài chính & Công nghệ —",
    "nav.home": "Trang chủ",
    "nav.about": "Giới thiệu",
    "nav.certificates": "Chứng chỉ",
    "nav.portfolio": "Dự án",
    "nav.contact": "Liên hệ",
    "marquee.about": "VỀ BẢN THÂN",
    "about.label": "✦ Đam mê Tài chính & Lập trình Công nghệ ✦",
    "about.title": "XIN CHÀO, TÔI LÀ",
    "about.name": "NGUYỄN TRẦN TIẾN PHÚC",
    "about.bio": "Tôi là sinh viên song ngành <strong>Thị trường Chứng khoán & Kinh doanh Quốc tế</strong> tại UEH (Khóa K51), đồng thời tham gia chương trình trao đổi về Kinh doanh bền vững tại <strong>Universitas Airlangga</strong>. Tôi luôn hướng tới việc kết hợp phân tích Tài chính với năng lực Lập trình & AI để tạo ra các giải pháp công nghệ mang lại giá trị thiết thực cho cộng đồng.",
    "about.quote": "\"Kết hợp Tài chính và Công nghệ để kiến tạo những giá trị xã hội bền vững.\"",
    "about.portraitAlt": "Chân dung",
    "about.creativity": "Sáng tạo",
    "about.skillsTitle": "Kỹ Năng & Chứng Nhận",
    "about.skill1": "Phân tích Chứng khoán & ESG",
    "about.skill2": "AI Automation (n8n, Make, Botpress)",
    "about.skill3": "Google Data Analytics",
    "about.skill4": "MOS Expert & IELTS 6.0",
    "about.skill5": "Quản lý Dự án & Lãnh đạo",
    "cv.badge": "Hồ sơ năng lực (CV)",
    "cv.zoomHint": "Nhấn vào CV để phóng to",
    "cv.clickToView": "Xem chi tiết & Phóng to CV",
    "cv.langNote": "Phiên bản Tiếng Việt (Đổi ngôn ngữ EN/VI ở góc trên để xem CV tiếng Anh)",
    "journey.label": "✦ Năng lực cốt lõi từ trải nghiệm thực tiễn ✦",
    "journey.title": "<span class=\"accent\">KỸ NĂNG</span> CHUYÊN MÔN",
    "journey.t1Title": "FINANCE & AI BOT",
    "journey.t1Desc": "Phân tích kỹ thuật & Bot đầu tư n8n (Lợi nhuận 10%/3 tháng)",
    "journey.t2Title": "AI & AUTOMATION",
    "journey.t2Desc": "Tự động hóa quy trình với n8n, Make, Kodular, Botpress & Veo 3",
    "journey.t3Title": "DATA & WEB DEV",
    "journey.t3Desc": "Google Data Analytics, MOS Expert & Xây dựng Web thương mại",
    "journey.t4Title": "ESG & LEADERSHIP",
    "journey.t4Desc": "Founder VNDEER, Leader B&B (HuReA) & Green Youth Lab (Unicef)",
    "cert.label": "Thành tích",
    "cert.title": "<span class=\"accent\">CHỨNG CHỈ</span> CÁ NHÂN",
    "cert.featuredTitle": "<i class=\"fa-solid fa-star\" style=\"color: var(--color-accent);\"></i> Chứng Chỉ Tiêu Biểu (Featured)",
    "cert.featuredBadge": "<i class=\"fa-solid fa-star\"></i> TIÊU BIỂU",
    "cert.otherTitle": "<i class=\"fa-solid fa-award\"></i> Chứng Chỉ Khác",
    "portfolio.label": "Kho lưu trữ giải pháp công nghệ",
    "portfolio.title": "<span class=\"accent\">DỰ ÁN</span> TIÊU BIỂU",
    "pStock.badge": "SECTION 01 • FINTECH & QUANTITATIVE TRADING",
    "pStock.title": "1. Dự án Phân tích & Sàng lọc Cổ phiếu Tự động (VN100)",
    "pStock.overview": "Hệ thống tự động quét ~130 mã cổ phiếu VN100, phân tích chỉ báo kỹ thuật thời gian thực, kiểm thử chiến lược (Backtest) và đề xuất kế hoạch giao dịch theo tỷ lệ thắng (Win Rate).",
    "pStock.f1Title": "Sàng lọc Cổ phiếu Tự động",
    "pStock.f1Desc": "Quét tự động ~130 mã cổ phiếu qua 8 chiến lược định lượng, xếp hạng Top 10 mã ngắn hạn (3–14 ngày) có tỷ lệ thắng (Win Rate) cao nhất.",
    "pStock.f2Title": "Kế hoạch Giao dịch & Quản trị Rủi ro",
    "pStock.f2Desc": "Tự động xác định vùng mua/bán, điểm chốt lời (TP), cắt lỗ (SL), tỷ lệ R:R và đề xuất chia tỷ trọng giải ngân an toàn theo 3 đợt.",
    "pStock.f3Title": "Biểu đồ Kỹ thuật & Dữ liệu Real-time",
    "pStock.f3Desc": "Cập nhật bảng giá trực tiếp trong phiên cùng biểu đồ nến Nhật tích hợp Fibonacci, Ichimoku, Bollinger Bands, RSI, Stochastic và ADX.",
    "pStock.f4Title": "Kiểm thử Chiến lược (Backtest)",
    "pStock.f4Desc": "So sánh hiệu suất các chỉ báo trên khung ngắn hạn và dài hạn, thống kê tỷ lệ thắng/thua, nhật ký lệnh và tháng giao dịch tốt nhất.",
    "pStock.heroCaption": "Kế hoạch hành động giao dịch tự động & Quản trị rủi ro (Nhấn để phóng to)",
    "pStock.img1Caption": "Quét tự động ~130 mã VN100",
    "pStock.img2Caption": "Top 10 Ngắn hạn (Win Rate)",
    "pStock.img3Caption": "Vùng Mua/Bán & R:R 1:3.6",
    "pStock.img4Caption": "Giá Real-time & Tín hiệu Mua",
    "pStock.img5Caption": "Nến Nhật, Fibonacci & Ichimoku",
    "pStock.img6Caption": "RSI, Stochastic, StdDev & ADX",
    "pStock.img7Caption": "Backtest Ngắn & Dài hạn",
    "pStock.img8Caption": "Win Rate 100% & Chu kỳ tháng",
    "pStock.img9Caption": "Hiệu suất tháng & Nhật ký lệnh",
    "pHurea.badge": "SECTION 02 • HR TECH & CLUB ERP PLATFORM",
    "pHurea.title": "2. Dự án Hệ thống Quản trị Nhân sự CLB (HuReA Hub)",
    "pHurea.overview": "Nền tảng quản trị nội bộ và đồng bộ dữ liệu thời gian thực cho 113+ thành viên CLB HuReA, số hóa toàn diện từ hồ sơ nhân sự, điều phối dự án đến đánh giá hiệu suất 360°.",
    "pHurea.f1Title": "Quản trị Nhân sự & Đa Nhiệm kỳ",
    "pHurea.f1Desc": "Quản lý hồ sơ 113+ thành viên theo các Ban chuyên môn, vinh danh Top 5 cá nhân xuất sắc, chuyển đổi linh hoạt giữa các nhiệm kỳ và hỗ trợ ẩn danh dữ liệu nhạy cảm.",
    "pHurea.f2Title": "Điều phối Dự án & Minh chứng",
    "pHurea.f2Desc": "Theo dõi tiến độ chương trình (Setup, Running, Finish), phân công Project Leader, chia team nhân sự và quản lý thư mục nộp minh chứng chuẩn hóa.",
    "pHurea.f3Title": "Đánh giá 360° & Xuất Báo cáo",
    "pHurea.f3Desc": "Chấm điểm tự động theo 4 cấu phần (Hoạt động CLB, Ban, Đánh giá chéo, Điểm cộng), tổng hợp xếp loại thang 10 và xuất file PDF/Excel hàng loạt.",
    "pHurea.f4Title": "Xếp Lịch Họp & Tiện ích Nội bộ",
    "pHurea.f4Desc": "Tạo vote tìm khung giờ họp tối ưu cho nhóm, tích hợp hòm Góp ý & Confession ẩn danh, báo lỗi hệ thống và cấp phát mật khẩu hàng loạt.",
    "pHurea.heroCaption": "Giao diện Dashboard Quản trị HuReA Hub Admin V20 (Nhấn để phóng to)",
    "pHurea.img1Caption": "Cổng Đăng nhập & Showcase",
    "pHurea.img2Caption": "Danh bạ 113+ Nhân sự (Grid)",
    "pHurea.img3Caption": "Hồ sơ Chi tiết Thành viên",
    "pHurea.img4Caption": "Thiết lập Dự án & Team/PL",
    "pHurea.img5Caption": "Quản lý Nhiệm kỳ & Các Ban",
    "pHurea.img6Caption": "Chấm điểm & Nhập Excel",
    "pHurea.img7Caption": "Bảng Điểm & Xuất PDF/Excel",
    "pHurea.img8Caption": "Vote & Xếp Lịch Họp Tối ưu",
    "pHurea.img9Caption": "Hồ sơ Lead Dev & Báo lỗi",
    "pHurea.img10Caption": "Góp ý & Confession Ẩn danh",
    "pHurea.img11Caption": "Hệ thống Nộp Minh Chứng",
    "pHurea.img12Caption": "Quản lý Mật khẩu Hàng loạt",
    "p1.badge": "SECTION 07 • HEALTH TECH & AI",
    "p1.title": "7. Dự án Bot phân tích sức khỏe (AVI Health)",
    "p1.overview": "Hệ sinh thái chăm sóc sức khỏe chủ động kết hợp Trợ lý ảo thông minh (Botpress) và Thị giác máy tính (Teachable Machine AI), giúp cá nhân hóa thực đơn dinh dưỡng, kiểm định độ tươi thực phẩm qua camera và đồng hành rèn luyện thể chất mỗi ngày.",
    "p1.f1Title": "Trợ lý ảo thông minh (Avi)",
    "p1.f1Desc": "Sử dụng nền tảng Botpress để giao tiếp tự nhiên, tính toán chính xác chỉ số BMI từ chiều cao và cân nặng. Bot tự động thiết kế thực đơn chi tiết dựa trên lượng calo mục tiêu và các nguyên liệu người dùng đang có sẵn (ví dụ: thịt heo, cà chua, cà rốt), kèm theo hướng dẫn chế biến từng bước và gợi ý lịch tập luyện khoa học.",
    "p1.f2Title": "Kiểm định thực phẩm bằng AI",
    "p1.f2Desc": "Tích hợp mô hình học máy (Teachable Machine Image Model) cho phép quét và phân tích độ tươi ngon của thịt, cá, trái cây, rau củ trực tiếp qua camera điện thoại theo thời gian thực, cảnh báo thực phẩm kém chất lượng để bảo vệ sức khỏe gia đình.",
    "p1.f3Title": "Cộng đồng & Tiện ích Sức khỏe",
    "p1.f3Desc": "Tích hợp diễn đàn hỏi đáp sức khỏe cộng đồng, cập nhật tin tức dinh dưỡng, mẹo bảo quản thực phẩm an toàn cùng hệ thống công cụ nhắc nhở uống thuốc và lịch tập luyện thông minh.",
    "p1.videoCaption": "Video thử nghiệm thực tế sản phẩm AVI Health",
    "p1.img1Caption": "Tổng quan AVI Health",
    "p1.img2Caption": "AI Quét độ tươi thực phẩm",
    "p1.img3Caption": "Tính BMI & Thiết kế thực đơn",
    "p2.badge": "SECTION 08 • E-COMMERCE & EXPRESS LOGISTICS",
    "p2.title": "8. Dự án Sàn thương mại rau củ (AVI Ship)",
    "p2.overview": "Nền tảng thương mại điện tử chuyên biệt cung ứng nông sản, thực phẩm tươi sống và nhu yếu phẩm gia đình, kết hợp luồng vận chuyển hỏa tốc theo thời gian thực để tối ưu hóa trọn vẹn trải nghiệm đi chợ online.",
    "p2.f1Title": "Mô hình mua sắm thực phẩm chuyên biệt",
    "p2.f1Desc": "Hoạt động độc lập như một nền tảng thương mại điện tử chuyên biệt, phân chia khoa học và rõ ràng các danh mục từ rau củ, trái cây tươi, trứng sạch đến các mặt hàng đồ dùng chăm sóc gia đình.",
    "p2.f2Title": "Vận chuyển hỏa tốc thời gian thực",
    "p2.f2Desc": "Tích hợp luồng giao hàng nhanh theo thời gian thực (ví dụ: hiển thị lộ trình giao hỏa tốc trực tiếp đến trường THPT Lý Tự Trọng), đáp ứng tức thì nhu cầu cung ứng thực phẩm tươi sống trong ngày với chất lượng nguyên vẹn.",
    "p2.f3Title": "Kích cầu mua sắm & Tối ưu trải nghiệm",
    "p2.f3Desc": "Hiển thị nổi bật các mặt hàng bán chạy trong ngày (Best Sellers) cùng hệ thống danh mục khuyến mãi trực quan nhằm kích cầu mua sắm và tối ưu hóa trải nghiệm đi chợ online nhanh chóng, tiện lợi.",
    "p2.videoCaption": "Video giới thiệu hệ sinh thái AVI Health & Sàn thương mại AVI Ship",
    "p2.img1Caption": "Bộ đôi AVI Health & Ship",
    "p2.img2Caption": "Danh mục nông sản & Khuyến mãi",
    "p2.img3Caption": "Giao hỏa tốc THPT Lý Tự Trọng",
    "p3.badge": "SECTION 09 • SOCIAL IMPACT & DISASTER RELIEF TECH",
    "p3.title": "9. Dự án VNDEER (Hệ thống điều phối cứu trợ thiên tai)",
    "p3.overview": "Hệ thống công nghệ điều phối cứu trợ và ứng phó khẩn cấp toàn diện khi xảy ra thiên tai tại Việt Nam, tích hợp bản đồ SOS thời gian thực, định danh VNeID minh bạch, hồ sơ y tế khẩn cấp (ICE) và cảnh báo xả lũ hồ đập.",
    "p3.f1Title": "Bản đồ tuyến đầu thời gian thực",
    "p3.f1Desc": "Hiển thị trực quan các tín hiệu cấp cứu (SOS), vị trí các đội cứu hộ và điểm tập kết. Hệ thống cung cấp số liệu phân loại rõ ràng theo từng địa bàn (ví dụ: 16 hộ đang cần cứu trợ khẩn cấp tại Xã Vĩnh Lương) để điều hướng nguồn lực chính xác, tránh chồng chéo.",
    "p3.f2Title": "Định danh minh bạch (VNeID)",
    "p3.f2Desc": "Xác thực người nhận hàng cứu trợ thông qua tính năng quét mã QR trên Thẻ căn cước (VNeID), đảm bảo vật tư cứu trợ đến đúng người, đúng thời điểm và có thể truy xuất minh bạch toàn bộ lịch sử nhận hỗ trợ.",
    "p3.f3Title": "Hồ sơ Y tế khẩn cấp (ICE)",
    "p3.f3Desc": "Lưu trữ các chỉ số sinh tồn và tiền sử bệnh lý quan trọng (nhóm máu, dị ứng, lịch sử phẫu thuật) cùng thông tin liên hệ của người thân, giúp lực lượng cứu hộ y tế có ngay phác đồ xử lý an toàn khi tiếp cận nạn nhân.",
    "p3.f4Title": "Cảnh báo rủi ro sinh tồn & Thủy điện",
    "p3.f4Desc": "Cập nhật liên tục lưu lượng xả lũ, mực nước của các đập thủy điện (như đập Sông Cái) và cung cấp cẩm nang sinh tồn chi tiết khi bị cô lập, ngập lụt hoặc phải di chuyển trong vùng nguy hiểm.",
    "p3.video1Caption": "Video Showcase vận hành hệ thống điều phối VNDEER",
    "p3.video2Caption": "Trailer chính thức dự án cứu trợ thiên tai VNDEER",
    "p3.img1Caption": "Mạng lưới cứu trợ VNDEER",
    "p3.img2Caption": "Bản đồ SOS & Đập Sông Cái",
    "p3.img3Caption": "Định danh VNeID & Hồ sơ ICE",
    "portfolio.stat1": "Dự án GitHub",
    "portfolio.stat2": "Quỹ gây dựng (Tr.đ)",
    "portfolio.stat3": "Khóa K51 UEH",
    "gallery.label": "Ảnh nghệ thuật",
    "gallery.title": "<span class=\"accent\">MASONRY</span> GALLERY",
    "contact.label": "Kết nối",
    "contact.title": "<span class=\"accent\">LIÊN HỆ</span> VỚI TÔI",
    "contact.emailLabel": "Email",
    "contact.phoneLabel": "Điện thoại",
    "contact.addressLabel": "Địa chỉ",
    "contact.addressValue": "Đại học Kinh tế TP.HCM (UEH), TP. Hồ Chí Minh",
    "contact.githubLabel": "GitHub",
    "contact.formName": "Họ và tên",
    "contact.formNamePlaceholder": "Nhập họ tên...",
    "contact.formEmail": "Email",
    "contact.formEmailPlaceholder": "Nhập email...",
    "contact.formSubject": "Chủ đề",
    "contact.formSubjectPlaceholder": "Nhập chủ đề...",
    "contact.formMessage": "Tin nhắn",
    "contact.formMessagePlaceholder": "Nhập tin nhắn...",
    "contact.formSubmit": "<i class=\"fa-solid fa-paper-plane\"></i> Gửi Tin Nhắn",
    "contact.alertSuccess": "Cảm ơn bạn đã gửi tin nhắn!",
    "lightbox.zoom": "Phóng to / Thu nhỏ",
    "lightbox.close": "Đóng",
    "footer.copyright": "&copy; 2026 <span class=\"primary\">NGUYỄN TRẦN TIẾN PHÚC</span>. Thiết kế với <i class=\"fa-solid fa-heart\" style=\"color:#FF6B6B\"></i> và niềm đam mê công nghệ.",
    "p1.badge": "SECTION 07 • HEALTH TECH & AI",
    "p1.title": "7. Dự án Bot phân tích sức khỏe (AVI Health)",
    "p2.badge": "SECTION 08 • E-COMMERCE & EXPRESS LOGISTICS",
    "p2.title": "8. Dự án Sàn thương mại rau củ (AVI Ship)",
    "p3.badge": "SECTION 09 • SOCIAL IMPACT & DISASTER RELIEF TECH",
    "p3.title": "9. Dự án VNDEER (Hệ thống điều phối cứu trợ thiên tai)",
    "pOM.badge": "SECTION 03 • AI VIDEO PRODUCTION STUDIO",
    "pOM.title": "3. Dự án Xưởng Phim AI & Pipeline Remotion (OpenMontage)",
    "pOM.overview": "Xưởng sản xuất video AI chạy hoàn toàn tại local, kết hợp 750+ phong cách dàn dựng, 37+ giọng đọc đa thể loại (Piper & Edge TTS), 40+ font chữ tiếng Việt, nhận diện phụ đề Faster-Whisper STT và kết xuất MP4 tự động qua Remotion & FFmpeg.",
    "pOM.f1Title": "Thư viện 750+ Phong cách & Playbook",
    "pOM.f1Desc": "Cung cấp 750+ mẫu kịch bản và bảng màu từ Cyberpunk, Finance, Documentary đến TikTok/Shorts, áp dụng bảng màu thương hiệu và chèn cảnh vào Timeline chỉ bằng 1 chạm.",
    "pOM.f2Title": "37+ Giọng Đọc AI & Phụ đề Karaoke Whisper",
    "pOM.f2Desc": "Tích hợp phòng thu đa giọng đọc (Nam/Nữ/Tin tức/Podcast/Trailer) chạy offline với Piper TTS và bóc băng Faster-Whisper tự động đồng bộ phụ đề Karaoke từng từ.",
    "pOM.f3Title": "Công cụ Sáng tạo AI & Render Engine",
    "pOM.f3Desc": "Tích hợp vẽ sơ đồ Mermaid, tạo Code Card Pygments, tách nền rembg, nâng nét khuôn mặt GFPGAN/Real-ESRGAN và xuất video MP4 chuẩn 1080p qua Backlot & Remotion.",
    "pOM.videoCaption": "Video demo sản phẩm tạo từ OpenMontage AI Studio",
    "pOM.img1Caption": "Giao diện Studio Chính",
    "pOM.img2Caption": "Kho 750+ Mẫu & Style",
    "pOM.img3Caption": "Kịch bản & Timeline",
    "pOM.img4Caption": "37+ Giọng đọc Đa thể loại",
    "pOM.img5Caption": "40+ Font Tiếng Việt",
    "pOM.img6Caption": "Piper TTS & Whisper STT",
    "pOM.img7Caption": "Bộ Công cụ AI Sáng tạo",
    "pOM.img8Caption": "Tiến trình Render MP4",
    "pOM.img9Caption": "Trình phát Video Thành phẩm",
    "pMike.badge": "SECTION 04 • WEB VIDEO EDITOR & MOTION CODE",
    "pMike.title": "4. Dự án Trình Dựng Video Đa Lớp (Mike Editor Pro 4.0 & Hyperframes)",
    "pMike.overview": "Hệ sinh thái dựng video nền web gồm Mike Editor Pro 4.0 (kho 1.200+ mẫu LUT, VFX, Graphic, Font, Chuyển cảnh, SFX/BGM tự tổng hợp) và không gian Video Editor Workspace kết hợp Hyperframes dựng video giới thiệu TP.HCM bằng code.",
    "pMike.f1Title": "Timeline Đa Lớp & 1.200+ Preset Chuyên Nghiệp",
    "pMike.f1Desc": "Hỗ trợ 7 track song song (Video, VFX, Text, Graphic, Subs, PiP B-roll, Audio/SFX) với kho 200 bộ màu LUT, 200 VFX, 200 Graphic CTA, 200 kiểu chữ & 20 hiệu ứng chuyển cảnh.",
    "pMike.f2Title": "Keyframes, Safe Zone & Kho Âm thanh Tự Tạo",
    "pMike.f2Desc": "Chỉnh sửa trực tiếp trên Canvas, đặt Keyframe chuyển động, bật khung an toàn TikTok/Reels 9:16 và sử dụng kho 200 SFX/BGM tổng hợp sẵn trước khi xuất FFmpeg MP4.",
    "pMike.f3Title": "Hyperframes — Dựng Video Bằng Code (HCM Intro)",
    "pMike.f3Desc": "Kết xuất video giới thiệu TP. Hồ Chí Minh sắc nét từng khung hình bằng Hyperframes HTML/CSS/JS motion composition và kiểm thử snapshot tự động.",
    "pMike.videoCaption": "Video giới thiệu TP.HCM kết xuất từ Hyperframes & Mike Editor",
    "pMike.img1Caption": "Giao diện Timeline Đa Lớp",
    "pMike.img2Caption": "Kho 200 Bộ Màu LUT",
    "pMike.img3Caption": "Chỉnh Màu Điện Ảnh",
    "pMike.img4Caption": "20 Hiệu Ứng Chuyển Cảnh",
    "pMike.img5Caption": "200 Font & Keyframes",
    "pMike.img6Caption": "Chỉnh Sửa Trực Tiếp Canvas",
    "pMike.img7Caption": "Kho 200 SFX & Nhạc Nền",
    "pMike.img8Caption": "Hyperframes HCM Intro (1)",
    "pMike.img9Caption": "Hyperframes HCM Intro (2)",
    "pJob.badge": "SECTION 05 • CAREER TECH & AI ATS AUTOMATION",
    "pJob.title": "5. Dự án Semi-Auto AI Job Hub & Bộ Lọc career-ops ATS",
    "pJob.overview": "Hệ thống thu thập việc làm đa nguồn (Remotive, Himalayas, LinkedIn, TopCV), chấm điểm Fit 5 chiều & tối ưu từ khóa ATS, tạo CV A4 gắn mã QR Portfolio, khử dấu hiệu AI Writing và gửi email hàng loạt qua Gmail SMTP.",
    "pJob.f1Title": "Đánh Giá Độ Fit 5 Chiều & Đảo Ngược ATS",
    "pJob.f1Desc": "Dán bất kỳ mô tả công việc (JD) nào để phân tích từ khóa ATS thành 3 nhóm (Khớp trực tiếp, Bằng chứng gián tiếp, Khoảng trống trung thực) và tự động tạo hồ sơ phù hợp.",
    "pJob.f2Title": "Bộ Lọc Chống Văn Phong AI (WP:AISIGNS)",
    "pJob.f2Desc": "Tự động rà soát và thay thế các cụm từ sáo rỗng đặc trưng của AI trong tiêu đề email, Cover Letter và CV bằng minh chứng thực tế (10% ROI, 113+ thành viên, dạy học 3 tháng).",
    "pJob.f3Title": "Gửi Hàng Loạt Gmail Web & SMTP Kèm PDF CV",
    "pJob.f3Desc": "Mở soạn thảo Gmail hàng loạt theo đợt an toàn hoặc gửi trực tiếp qua local Python bulk_mailer.py đính kèm đúng bản CV Tiếng Việt hoặc Tiếng Anh chuẩn hóa.",
    "pJob.heroCaption": "Giao diện Tối ưu CV Chuẩn ATS tích hợp mã QR trỏ về Portfolio (Nhấn để phóng to)",
    "pHL.badge": "SECTION 06 • HUMANITARIAN AI & 5D VECTOR MATCHING",
    "pHL.title": "6. Dự án Đối Chiếu AI 5D Tìm Người Thân Thất Lạc (haylentieng.vn)",
    "pHL.overview": "Dự án AI phi lợi nhuận tự động thu thập ~13.000 hồ sơ tìm người thân trên 1.083 trang từ haylentieng.vn, áp dụng bộ đối chiếu đa chiều (5D Matching Engine) kết hợp lịch sử sáp nhập/chia tách địa giới hành chính Việt Nam để tìm kiếm các cặp hồ sơ trùng khớp cao.",
    "pHL.f1Title": "Scraper Song Song 13.000+ Hồ Sơ (Node & Python)",
    "pHL.f1Desc": "Thu thập có kiểm soát retry và chuẩn hóa toàn bộ thông tin mã số, năm thất lạc, họ tên, cha mẹ, anh chị em và câu chuyện tìm kiếm từ haylentieng.vn.",
    "pHL.f2Title": "Lọc Phễu 4 Tầng & Chuẩn Hóa Địa Danh Lịch Sử",
    "pHL.f2Desc": "Tích hợp từ điển chuyển đổi tên tỉnh/huyện cũ sang mới (ví dụ: Hà Tây, Minh Hải, Thuận Hải, Vĩnh Phú...) giúp không bỏ sót hồ sơ thất lạc nhiều thập kỷ.",
    "pHL.m1": "Hồ sơ đã thu thập",
    "pHL.m2": "Trang dữ liệu quét",
    "pHL.m3": "Chấm điểm 5 chiều",
    "pHL.m4": "Phi lợi nhuận cộng đồng",
    "pHL.note": "Dashboard hỗ trợ lọc nhanh các cặp trùng khớp ≥80%, trùng 100% tên cha/mẹ và in báo cáo đối chiếu tức thì trên trình duyệt.",
    "pHL.cta": "Mở Bảng Đối Chiếu AI Live",
    "links.brokerGit": "GitHub: broker",
    "links.brokerLive": "Live: Broker",
    "links.quantGit": "GitHub: vn100-linear-quant",
    "links.quantLive": "Live: Quant",
    "links.ckGit": "GitHub: chungkhoan",
    "links.widgetGit": "GitHub: vn-stock-widget",
    "links.hureaHubGit": "GitHub: hurea_hub",
    "links.hureaHubLive": "Live: HuReA Hub (Vercel)",
    "links.hureaGit": "GitHub: hurea",
    "links.hureaLive": "Live: GitHub Pages",
    "links.omGit": "GitHub: OpenMontage",
    "links.omLive": "Live: OpenMontage Portal",
    "links.mikeGit": "GitHub: mike-editor",
    "links.mikeLive": "Live: Mike Editor",
    "links.veGit": "GitHub: video-editor",
    "links.veLive": "Live: Workspace",
    "links.jobGit": "GitHub: semi-auto-job-hub",
    "links.jobLive": "Live: Job Hub Studio",
    "links.hlGit": "GitHub: haylentieng-scraper",
    "links.hlLive": "Live: AI Matching Dashboard",
    "links.foodcheckGit": "GitHub: foodcheck",
    "links.foodcheckLive": "Live: FoodCheck AI",
    "links.foodcheckerGit": "GitHub: foodchecker",
    "links.foodcheckerLive": "Live: FoodChecker",
    "links.aviEcosystemGit": "GitHub Ecosystem",
    "links.aviEcosystemLive": "Live Demo",
    "links.vndeerGit": "GitHub: VNDeer",
    "links.vndeerLive": "Live: VNDeer Suite",
    "links.vndeerViGit": "GitHub: VN-DEER",
    "links.vndeerEnGit": "GitHub: VN-DEER_EN",
    "portfolio.stat1": "Dự án GitHub",
    "githubDir.label": "✦ Toàn Bộ Hệ Sinh Thái Mã Nguồn Mở ✦",
    "githubDir.title": "<span class=\"accent\">TẤT CẢ 21 DỰ ÁN</span> GITHUB",
    "githubDir.subtitle": "Tổng hợp đầy đủ 21 repository trên GitHub <strong>github.com/Tonykosuy</strong> kèm mô tả chi tiết, giao diện song ngữ Việt/Anh khi truy cập và đường dẫn trực tiếp tới mã nguồn &amp; web chạy thực tế.",
    "githubDir.filterAll": "Tất cả (21)",
    "githubDir.filterFintech": "FinTech & Quant (4)",
    "githubDir.filterAiVideo": "AI & Video Studio (4)",
    "githubDir.filterHr": "HR & Automation (4)",
    "githubDir.filterSocial": "Cộng đồng & Sức khỏe (6)",
    "githubDir.filterWeb": "Web & Sáng tạo (3)",
    "githubDir.searchPlaceholder": "Tìm dự án, công nghệ hoặc mô tả...",
    "githubDir.gitBtn": "GitHub Repo",
    "githubDir.liveBtn": "Mở Web Live",
    "githubDir.cat.fintech": "FINTECH & QUANT",
    "githubDir.cat.ai_video": "AI & VIDEO STUDIO",
    "githubDir.cat.hr": "HR & AUTOMATION",
    "githubDir.cat.social": "SOCIAL & HEALTH",
    "githubDir.cat.web": "WEB & CREATIVE",
    "repo.broker.title": "Broker — Sàng Lọc & Phân Tích Kỹ Thuật VN100",
    "repo.broker.desc": "Hệ thống web tự động quét ~130 mã cổ phiếu VN100 qua 8 chiến lược định lượng, tính Win Rate, tỷ lệ Risk:Reward và đề xuất kế hoạch giải ngân 3 đợt theo thời gian thực.",
    "repo.broker.feat": "Auto-Screener • Backtest 8 chỉ báo • Kế hoạch TP/SL • Tin tức FireAnt",
    "repo.chungkhoan.title": "Chứng Khoán — Truy Xuất Dữ Liệu & Xuất Excel 100 Mã VN100",
    "repo.chungkhoan.desc": "Công cụ truy xuất lịch sử giá cổ phiếu VN100/VN30, tra cứu hồ sơ doanh nghiệp HOSE/HNX/UPCOM, vẽ biểu đồ nến kỹ thuật và xuất báo cáo Excel 100 sheet theo nhóm ngành.",
    "repo.chungkhoan.feat": "Xuất 100 Sheet Excel • Lịch sử giá OHLCV • Tra cứu Doanh nghiệp • PTKT",
    "repo.vn100_linear_quant.title": "VN100 Linear Quant — Hồi Quy Tuyến Tính & Tứ Phân Vị Ghép Nhóm",
    "repo.vn100_linear_quant.desc": "Hệ thống phân tích định lượng cổ phiếu VN100 kết hợp hồi quy tuyến tính OLS (y = ax + b), tứ phân vị mẫu số liệu ghép nhóm (Q1, Q2, Q3, IQR), nhận diện S/R và điểm mua/bán đa nhân tố.",
    "repo.vn100_linear_quant.feat": "OLS Đa Khung (1W–1Y) • Phân vị Ghép nhóm • Pivot S/R • SSI/DNSE Live",
    "repo.vn_stock_widget.title": "VN Stock Widget — Tiện Ích Desktop Chứng Khoán & Năng Suất Pastel",
    "repo.vn_stock_widget.desc": "Bộ 6 widget desktop Windows nổi (Always-on-top) theo dõi VN-INDEX, danh mục P&L thực tế, Speech-to-Text Whisper offline, báo thức Pomodoro, quản lý công việc và kệ lưu trữ nhanh.",
    "repo.vn_stock_widget.feat": "Bảng giá VCI/SSI 5s • Danh mục P&L • Whisper Offline • Tự ẩn khi chơi game",
    "repo.hurea_hub.title": "HuReA Hub — Nền Tảng Quản Trị Nhân Sự & ERP CLB (Vercel)",
    "repo.hurea_hub.desc": "Cổng triển khai chính thức của hệ thống quản trị nội bộ CLB Nhân sự HuReA (UEH) cho 113+ thành viên: quản lý đa nhiệm kỳ, điều phối dự án, chấm điểm 360° và xuất PDF/Excel hàng loạt.",
    "repo.hurea_hub.feat": "113+ Thành viên • Đánh giá 360° • Xếp lịch họp • Xuất PDF/Excel hàng loạt",
    "repo.hurea.title": "HuReA Dashboard — Hệ Thống Điều Hành Thành Viên & Minh Chứng",
    "repo.hurea.desc": "Phiên bản web dashboard đầy đủ của CLB HuReA với đăng nhập PIN 6 số, paste nhập nhanh từ Excel, hòm Góp ý & Confession ẩn danh, Photobooth và lưu trữ minh chứng chuẩn hóa.",
    "repo.hurea.feat": "Đăng nhập PIN • Nhập nhanh Excel • Confession ẩn danh • Photobooth",
    "repo.OpenMontage.title": "OpenMontage — Xưởng Phim AI Đa Tác Tử & Remotion Pipeline",
    "repo.OpenMontage.desc": "Studio sản xuất video AI chạy local tích hợp 750+ phong cách dàn dựng, 37+ giọng đọc Piper/Edge TTS, 40+ font chữ tiếng Việt, Faster-Whisper STT và pipeline kết xuất Remotion MP4.",
    "repo.OpenMontage.feat": "750+ Styles • 37+ Giọng đọc • Faster-Whisper STT • Ink Theater & Backlot",
    "repo.mike_editor.title": "Mike Editor Pro 4.0 — Trình Dựng Video Timeline Đa Lớp Nền Web",
    "repo.mike_editor.desc": "Trình chỉnh sửa video đa lớp trực quan trên trình duyệt với 200 bộ màu LUT điện ảnh, 200 VFX filters, 200 graphic CTA, 200 kiểu chữ/font, 20 chuyển cảnh, keyframes và kho 200 SFX/BGM.",
    "repo.mike_editor.feat": "1.200+ Presets (LUT/VFX/Font/SFX) • Keyframe • Safe Zone • FFmpeg MP4",
    "repo.video_editor.title": "Video Editor Workspace — Dựng Video Bằng Code (Hyperframes)",
    "repo.video_editor.desc": "Không gian tích hợp các dự án dựng phim bằng code gồm Mike Editor Pro 4.0, video giới thiệu TP.HCM dựng bằng Hyperframes và template timeline render tự động.",
    "repo.video_editor.feat": "HCM Intro Hyperframes • Mike Editor Pro • Render Frame-Accurate",
    "repo.semi_auto_job_hub.title": "Semi-Auto AI Job Hub — Phân Tích ATS & Gửi CV Hàng Loạt",
    "repo.semi_auto_job_hub.desc": "Hệ thống thu thập việc làm đa nguồn, chấm điểm Fit 5 chiều & đảo ngược ATS (career-ops), tùy biến CV gắn QR Portfolio, khử dấu hiệu AI Writing và gửi Gmail SMTP kèm CV PDF.",
    "repo.semi_auto_job_hub.feat": "Chấm điểm ATS 5D • Khử AI Writing • Kèm CV PDF (VI/EN) • Gmail Bulk",
    "repo.haylentieng_scraper.title": "Haylentieng.vn — AI 5D Matching Tìm Người Thân Thất Lạc",
    "repo.haylentieng_scraper.desc": "Dự án phi lợi nhuận thu thập ~13.000 hồ sơ từ haylentieng.vn (1.083 trang), sử dụng bộ đối chiếu AI 5 chiều & phễu 4 tầng kết hợp lịch sử địa danh hành chính Việt Nam để gợi ý đoàn tụ.",
    "repo.haylentieng_scraper.feat": "13.000+ Hồ sơ • AI 5D Matching • Lịch sử Địa danh VN • Dashboard Trực quan",
    "repo.VNDeer.title": "VNDeer — Hệ Sinh Thái Điều Phối Cứu Trợ Thiên Tai Toàn Diện",
    "repo.VNDeer.desc": "Hệ thống đầy đủ gồm 7 trang web điều phối cứu trợ: Bản đồ SOS tuyến đầu, tra cứu hộ dân ngập lụt, định danh QR VNeID, hồ sơ y tế ICE, cảnh báo xả lũ thủy điện và đồng bộ Google Sheets.",
    "repo.VNDeer.feat": "7 Trang Chức năng • Bản đồ SOS GIS • Quét QR VNeID • Hồ sơ Y tế ICE",
    "repo.VN_DEER.title": "VN-DEER — Cổng Điều Phối & Xác Minh Cứu Trợ (Bản Tiếng Việt)",
    "repo.VN_DEER.desc": "Ứng dụng web di động tối ưu cho tình nguyện viên và người dân vùng lũ gửi tín hiệu SOS kèm tọa độ GPS, báo triệu chứng y tế khẩn cấp và xác thực nhận hàng qua mã QR VNeID.",
    "repo.VN_DEER.feat": "Gửi SOS & GPS • Xác thực CCCD/VNeID • Cảnh báo Đập Thủy điện",
    "repo.VN_DEER_EN.title": "VN-DEER EN — Hệ Thống Điều Phối Cứu Trợ Khẩn Cấp (Bản Quốc Tế)",
    "repo.VN_DEER_EN.desc": "Phiên bản quốc tế hóa song ngữ của hệ thống VN-DEER dành cho các tổ chức cứu trợ, tình nguyện viên quốc tế và trình diễn cuộc thi đổi mới sáng tạo xã hội (YAI / SV.STARTUP).",
    "repo.VN_DEER_EN.feat": "Chuẩn Quốc tế • Định danh VNeID • Hồ sơ Y tế ICE • Bản đồ Tuyến đầu",
    "repo.foodcheck.title": "FoodCheck (AVI Health) — AI Quét & Kiểm Định Độ Tươi Thực Phẩm",
    "repo.foodcheck.desc": "Ứng dụng web kết hợp cẩm nang nhận biết độ tươi thịt/cá/trái cây, mẹo bảo quản chuẩn nhiệt độ và mô hình Thị giác máy tính Teachable Machine quét độ tươi thực phẩm qua camera.",
    "repo.foodcheck.feat": "Camera AI Quét Thực phẩm • Hướng dẫn Bảo quản • Cảnh báo Ôi thiu",
    "repo.foodchecker.title": "FoodChecker — Mô-đun Kiểm Tra An Toàn & Độ Tươi Thực Phẩm",
    "repo.foodchecker.desc": "Phiên bản web chuyên biệt phục vụ kiểm định chất lượng nông sản & thực phẩm tươi sống trực tiếp trên trình duyệt điện thoại, tích hợp chuyển đổi camera trước/sau tức thì.",
    "repo.foodchecker.feat": "Chuyển Camera Trước/Sau • Nhận diện AI Thời gian thực • Mobile-First",
    "repo.stamplocker.title": "StampLocker — Sổ Tay Sưu Tầm Tem Ảnh Kỷ Niệm (Coffee Journal)",
    "repo.stamplocker.desc": "Ứng dụng web chụp ảnh kỷ niệm với khung tem đục lỗ cổ điển SVG, đếm ngược đóng dấu, hiệu ứng âm thanh màn trập, ghi chú tay và lưu trữ vào sổ lưu bút qua Google Apps Script.",
    "repo.stamplocker.feat": "Khung Tem SVG Đục lỗ • Zoom 1x/2x • Sổ Lưu bút Đám mây",
    "repo.Nguoi_yeu_vu_tru.title": "Aether Particles v7.0 — Không Gian Hạt Vũ Trụ 3D Tương Tác Cử Chỉ",
    "repo.Nguoi_yeu_vu_tru.desc": "Trải nghiệm nghệ thuật 3D WebGL điều khiển hàng nghìn hạt ánh sáng thành Hệ Mặt Trời, Trái Đất, Sao Hỏa, Sao Mộc và Trái Tim bằng cử chỉ tay qua webcam kết hợp âm nhạc.",
    "repo.Nguoi_yeu_vu_tru.feat": "Điều khiển Cử chỉ 2 Tay • Đồ họa Neon 3D • Nhạc nền & Thiệp Valentine",
    "repo.Taphuandangoai_T12_2025.title": "Tập Huấn Dã Ngoại T12/2025 — Cổng Thông Tin Ban Tổ Chức Travel",
    "repo.Taphuandangoai_T12_2025.desc": "Trang thông tin chính thức giới thiệu mục tiêu gắn kết, cơ cấu Core Team và mô tả chi tiết nhiệm vụ 6 team chuyên môn (Truyền thông, Sân khấu, Địa điểm, Setup, Hậu cần, Hoạt náo).",
    "repo.Taphuandangoai_T12_2025.feat": "Cơ cấu 6 Team BTC • Hướng dẫn CTV/TV • Giao diện Responsive",
    "repo.nusa_valo_watcher.title": "Nusa Valorant Watcher — Tự Động Điều Phối Tiến Trình Windows",
    "repo.nusa_valo_watcher.desc": "Tiện ích PowerShell chạy ngầm không cửa sổ dùng khóa Mutex hệ thống để theo dõi tiến trình Valorant mỗi 3 giây, tự động dừng Nusa khi vào game và khởi chạy lại sau khi thoát.",
    "repo.nusa_valo_watcher.feat": "Khóa Mutex 1 Instance • Chạy ẩn VBScript • Tự khởi chạy lại Nusa",
    "repo.portfolio.title": "Personal Portfolio — Website Hồ Sơ Nghệ Thuật Van Gogh & 21 Dự Án",
    "repo.portfolio.desc": "Website portfolio cá nhân chủ đề Đêm Đầy Sao (Van Gogh) tích hợp hiệu ứng Starlight Particles, GSAP Anti-Gravity, CV song ngữ phóng to, chứng chỉ và danh mục toàn bộ 21 dự án GitHub.",
    "repo.portfolio.feat": "Song ngữ Việt/Anh • Lightbox CV/Chứng chỉ • 21 Dự án GitHub • Bảo vệ Media"
  },
  en: {
    "meta.title": "NGUYEN TRAN TIEN PHUC | Portfolio",
    "meta.description": "Personal Portfolio - Nguyen Tran Tien Phuc | Dual Major in Stock Market & International Business at UEH",
    "nav.logoTitle": "TIEN PHUC",
    "nav.logoSub": "— Finance & Technology —",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.certificates": "Certificates",
    "nav.portfolio": "Projects",
    "nav.contact": "Contact",
    "marquee.about": "ABOUT ME",
    "about.label": "✦ Passion for Finance & Tech Programming ✦",
    "about.title": "HELLO, I AM",
    "about.name": "NGUYEN TRAN TIEN PHUC",
    "about.bio": "I am a dual-major student in <strong>Stock Market & International Business</strong> at UEH (Batch K51) and an exchange student in Sustainable Business at <strong>Universitas Airlangga</strong>. I strive to combine Financial analysis with AI & Programming capabilities to build impactful technology solutions for the community.",
    "about.quote": "\"Combining Finance and Technology to create sustainable social values.\"",
    "about.portraitAlt": "Portrait",
    "about.creativity": "Creativity",
    "about.skillsTitle": "Skills & Certifications",
    "about.skill1": "Stock Market & ESG Analysis",
    "about.skill2": "AI Automation (n8n, Make, Botpress)",
    "about.skill3": "Google Data Analytics",
    "about.skill4": "MOS Expert & IELTS 6.0",
    "about.skill5": "Project Management & Leadership",
    "cv.badge": "Curriculum Vitae (CV)",
    "cv.zoomHint": "Click CV to zoom in",
    "cv.clickToView": "View Full & Zoom In CV",
    "cv.langNote": "English Version (Switch EN/VI language at the top to view the Vietnamese CV)",
    "journey.label": "✦ Core Competencies Built Through Real-World Impact ✦",
    "journey.title": "<span class=\"accent\">CORE</span> SKILLS",
    "journey.t1Title": "FINANCE & AI BOT",
    "journey.t1Desc": "Technical Analysis & n8n Investment Bot (10% ROI in 3 months)",
    "journey.t2Title": "AI & AUTOMATION",
    "journey.t2Desc": "Automated AI Pipelines via n8n, Make, Kodular, Botpress & Veo 3",
    "journey.t3Title": "DATA & WEB DEV",
    "journey.t3Desc": "Google Data Analytics, MOS Expert & Commercial Web Platforms",
    "journey.t4Title": "ESG & LEADERSHIP",
    "journey.t4Desc": "Founder VNDEER, Leader B&B (HuReA) & Green Youth Lab (Unicef)",
    "cert.label": "Achievements",
    "cert.title": "<span class=\"accent\">PERSONAL</span> CERTIFICATES",
    "cert.featuredTitle": "<i class=\"fa-solid fa-star\" style=\"color: var(--color-accent);\"></i> Featured Certificates",
    "cert.featuredBadge": "<i class=\"fa-solid fa-star\"></i> FEATURED",
    "cert.otherTitle": "<i class=\"fa-solid fa-award\"></i> Other Certificates",
    "portfolio.label": "Technology Solutions Archive",
    "portfolio.title": "<span class=\"accent\">FEATURED</span> PROJECTS",
    "pStock.badge": "SECTION 01 • FINTECH & QUANTITATIVE TRADING",
    "pStock.title": "1. Automated Stock Screener & Analysis System (VN100)",
    "pStock.overview": "Automatically scans ~130 VN100 stocks, analyzes real-time technical indicators, runs strategy backtests, and generates trading plans ranked by Win Rate.",
    "pStock.f1Title": "Automated Stock Screener",
    "pStock.f1Desc": "Scans ~130 market tickers across 8 quantitative strategies to rank the Top 10 short-term stocks (3–14 days) with the highest Win Rate.",
    "pStock.f2Title": "Trading Plan & Risk Control",
    "pStock.f2Desc": "Automatically calculates buy/sell zones, Take Profit (TP), Stop Loss (SL), R:R ratio, and 3-step position sizing to control risk.",
    "pStock.f3Title": "Live Charts & Technical Indicators",
    "pStock.f3Desc": "Streams real-time intraday prices alongside interactive candlestick charts with Fibonacci, Ichimoku, Bollinger Bands, RSI, Stochastic, and ADX.",
    "pStock.f4Title": "Strategy Backtesting",
    "pStock.f4Desc": "Compares indicator performance across short and long timeframes, tracking win/loss ratios, trade logs, and best-performing months.",
    "pStock.heroCaption": "Automated Trading Action Plan & Risk Management Dashboard (Click to zoom)",
    "pStock.img1Caption": "Auto-Screener (~130 Tickers)",
    "pStock.img2Caption": "Top 10 Short-Term Win Rate",
    "pStock.img3Caption": "Buy/Sell Zones & 1:3.6 R:R",
    "pStock.img4Caption": "Real-Time OHLCV & Buy Signal",
    "pStock.img5Caption": "Candlesticks, Fib & Ichimoku",
    "pStock.img6Caption": "RSI, Stochastic, StdDev & ADX",
    "pStock.img7Caption": "Short & Long-Term Backtest",
    "pStock.img8Caption": "100% Win Rate & Seasonality",
    "pStock.img9Caption": "Monthly Returns & Trade Log",
    "pHurea.badge": "SECTION 02 • HR TECH & CLUB ERP PLATFORM",
    "pHurea.title": "2. Club HR Management & Data Sync Platform (HuReA Hub)",
    "pHurea.overview": "An internal ERP and real-time data synchronization platform for 113+ HuReA Club members, digitizing HR profiles, project staffing, and 360° evaluations.",
    "pHurea.f1Title": "HR Directory & Multi-Term Sync",
    "pHurea.f1Desc": "Manages 113+ member profiles across departments, highlights Top 5 performers, switches smoothly between terms, and masks sensitive data.",
    "pHurea.f2Title": "Project & Evidence Management",
    "pHurea.f2Desc": "Tracks program stages (Setup, Running, Finish), assigns Project Leaders, organizes sub-teams, and standardizes evidence submission folders.",
    "pHurea.f3Title": "360° Evaluation & Report Export",
    "pHurea.f3Desc": "Automates 10-point grading across 4 pillars (Club, Department, 360° Peer Review, Bonus) with 1-click batch PDF and Excel exports.",
    "pHurea.f4Title": "Smart Scheduler & Internal Tools",
    "pHurea.f4Desc": "Finds optimal group meeting slots via availability polls, paired with an anonymous Confession Box, bug tracker, and bulk password manager.",
    "pHurea.heroCaption": "HuReA Hub Admin V20 Executive Dashboard Interface (Click to zoom)",
    "pHurea.img1Caption": "Login Portal & Showcase Mode",
    "pHurea.img2Caption": "113+ Member HR Grid View",
    "pHurea.img3Caption": "Detailed Member Profile Modal",
    "pHurea.img4Caption": "Project & Team/PL Allocation",
    "pHurea.img5Caption": "Multi-Term & Department Setup",
    "pHurea.img6Caption": "Club Scoring & Excel Import",
    "pHurea.img7Caption": "Final Scoreboard & PDF Export",
    "pHurea.img8Caption": "Optimal Meeting Slot Scheduler",
    "pHurea.img9Caption": "Lead Dev Profile & Bug Tracker",
    "pHurea.img10Caption": "Anonymous Feedback & Confession",
    "pHurea.img11Caption": "Standardized Evidence Hub",
    "pHurea.img12Caption": "Bulk Password Administration",
    "p1.badge": "SECTION 07 • HEALTH TECH & AI",
    "p1.title": "7. AI Health Analysis Bot & Assistant (AVI Health)",
    "p1.overview": "A proactive healthcare ecosystem combining an Intelligent Virtual Assistant (Botpress) and Computer Vision (Teachable Machine AI) to personalize nutrition meal plans, inspect food freshness via smartphone camera, and guide daily fitness routines.",
    "p1.f1Title": "Intelligent Virtual Assistant (Avi)",
    "p1.f1Desc": "Powered by Botpress for natural communication, accurately calculating BMI from height and weight. Automatically designs detailed meal plans based on target calories and ingredients the user already has on hand (e.g., pork, tomatoes, carrots), complete with step-by-step cooking instructions and tailored workout schedules.",
    "p1.f2Title": "AI Food Freshness Inspection",
    "p1.f2Desc": "Integrates a Teachable Machine Image Model to scan and analyze the freshness quality of meat, fish, fruits, and vegetables directly through a smartphone camera in real time, alerting users to spoiled produce.",
    "p1.f3Title": "Community & Health Utilities",
    "p1.f3Desc": "Features an interactive health Q&A forum, curated nutrition news, food preservation tips, and smart reminder tools for taking medication and maintaining daily workouts.",
    "p1.videoCaption": "Live Product Demo — AVI Health Assistant & AI Scanner",
    "p1.img1Caption": "AVI Health Overview",
    "p1.img2Caption": "AI Food Freshness Scanner",
    "p1.img3Caption": "BMI & Custom Meal Planner",
    "p2.badge": "SECTION 08 • E-COMMERCE & EXPRESS LOGISTICS",
    "p2.title": "8. Fresh Produce E-Commerce Platform (AVI Ship)",
    "p2.overview": "A specialized e-commerce marketplace supplying fresh farm produce and household essentials, integrated with real-time express delivery routing to optimize the online grocery shopping experience.",
    "p2.f1Title": "Specialized Grocery Shopping Model",
    "p2.f1Desc": "Operates independently as a dedicated e-commerce platform with clear, intuitive categories spanning fresh vegetables, fruits, organic eggs, and family household care products.",
    "p2.f2Title": "Real-Time Express Delivery",
    "p2.f2Desc": "Integrates real-time rapid delivery workflows (e.g., live express delivery tracking directly to Ly Tu Trong High School) to fulfill daily fresh grocery demands with guaranteed quality.",
    "p2.f3Title": "Smart Merchandising & Demand Stimulation",
    "p2.f3Desc": "Prominently showcases daily best-selling items and curated promotional categories to stimulate purchasing and streamline the online grocery shopping journey.",
    "p2.videoCaption": "Ecosystem Walkthrough — AVI Health & AVI Ship Marketplace",
    "p2.img1Caption": "AVI Health & Ship Duo",
    "p2.img2Caption": "Produce Categories & Promos",
    "p2.img3Caption": "Express Delivery to Ly Tu Trong HS",
    "p3.badge": "SECTION 09 • SOCIAL IMPACT & DISASTER RELIEF TECH",
    "p3.title": "9. VNDEER Project (Disaster Relief Coordination System)",
    "p3.overview": "A comprehensive disaster relief coordination and emergency response system in Vietnam, integrating real-time frontline SOS mapping, transparent VNeID citizen verification, emergency medical profiles (ICE), and hydropower dam flood alerts.",
    "p3.f1Title": "Real-Time Frontline Rescue Map",
    "p3.f1Desc": "Visually displays live SOS distress signals, rescue team positions, and assembly points. Provides clear regional breakdowns (e.g., 16 households in urgent need in Vinh Luong Commune) to route relief resources accurately and prevent overlap.",
    "p3.f2Title": "Transparent Citizen Verification (VNeID)",
    "p3.f2Desc": "Authenticates relief recipients by scanning QR codes on Citizen ID cards (VNeID), ensuring relief supplies reach the right people at the right time with a fully traceable support history.",
    "p3.f3Title": "Emergency Medical Profile (ICE)",
    "p3.f3Desc": "Stores vital signs and critical medical history (blood type, allergies, surgical history) along with family emergency contacts, enabling medical rescue teams to apply safe treatment protocols immediately upon reaching victims.",
    "p3.f4Title": "Survival Risk & Hydropower Flood Alerts",
    "p3.f4Desc": "Continuously updates flood discharge rates and water levels of hydropower dams (such as Song Cai Dam) while providing detailed survival handbooks for isolation, flooding, or evacuation through hazardous zones.",
    "p3.video1Caption": "VNDEER Command System Showcase Video",
    "p3.video2Caption": "Official VNDEER Disaster Relief Project Trailer",
    "p3.img1Caption": "VNDEER Relief Network",
    "p3.img2Caption": "SOS Map & Song Cai Dam Alert",
    "p3.img3Caption": "VNeID QR & ICE Medical Profile",
    "portfolio.stat1": "GitHub Projects",
    "portfolio.stat2": "Funds Raised (M VND)",
    "portfolio.stat3": "UEH Batch K51",
    "gallery.label": "Art Gallery",
    "gallery.title": "<span class=\"accent\">MASONRY</span> GALLERY",
    "contact.label": "Get in Touch",
    "contact.title": "<span class=\"accent\">CONTACT</span> ME",
    "contact.emailLabel": "Email",
    "contact.phoneLabel": "Phone",
    "contact.addressLabel": "Location",
    "contact.addressValue": "University of Economics Ho Chi Minh City (UEH), HCMC",
    "contact.githubLabel": "GitHub",
    "contact.formName": "Full Name",
    "contact.formNamePlaceholder": "Enter your full name...",
    "contact.formEmail": "Email",
    "contact.formEmailPlaceholder": "Enter your email...",
    "contact.formSubject": "Subject",
    "contact.formSubjectPlaceholder": "Enter subject...",
    "contact.formMessage": "Message",
    "contact.formMessagePlaceholder": "Write your message...",
    "contact.formSubmit": "<i class=\"fa-solid fa-paper-plane\"></i> Send Message",
    "contact.alertSuccess": "Thank you for your message!",
    "lightbox.zoom": "Zoom In / Out",
    "lightbox.close": "Close",
    "footer.copyright": "&copy; 2026 <span class=\"primary\">NGUYEN TRAN TIEN PHUC</span>. Designed with <i class=\"fa-solid fa-heart\" style=\"color:#FF6B6B\"></i> and a passion for technology.",
    "p1.badge": "SECTION 07 • HEALTH TECH & AI",
    "p1.title": "7. AI Health Analysis Bot & Assistant (AVI Health)",
    "p2.badge": "SECTION 08 • E-COMMERCE & EXPRESS LOGISTICS",
    "p2.title": "8. Fresh Produce E-Commerce Platform (AVI Ship)",
    "p3.badge": "SECTION 09 • SOCIAL IMPACT & DISASTER RELIEF TECH",
    "p3.title": "9. VNDEER Project (Disaster Relief Coordination System)",
    "pOM.badge": "SECTION 03 • AI VIDEO PRODUCTION STUDIO",
    "pOM.title": "3. AI Video Production Studio & Remotion Pipeline (OpenMontage)",
    "pOM.overview": "A local-first AI video production studio combining 750+ visual playbooks, 37+ Piper & Edge TTS voice personas, 40+ fonts, Faster-Whisper STT karaoke subtitles, and automated MP4 rendering via Remotion & FFmpeg.",
    "pOM.f1Title": "750+ Visual Styles & Playbook Library",
    "pOM.f1Desc": "Ships 750+ styled templates spanning Cyberpunk, Finance, Documentary, and TikTok/Shorts with 1-click palette sync and direct Timeline scene insertion.",
    "pOM.f2Title": "37+ AI Voices & Faster-Whisper Subtitles",
    "pOM.f2Desc": "Includes a multi-genre voice studio (News, Podcast, Storytelling, Trailer) with offline Piper TTS and Faster-Whisper word-level karaoke caption sync.",
    "pOM.f3Title": "AI Creative Tools & Remotion Render Engine",
    "pOM.f3Desc": "Built-in Mermaid architecture diagrams, Pygments code cards, rembg background removal, GFPGAN/Real-ESRGAN enhancement, and 1080p Backlot MP4 rendering.",
    "pOM.videoCaption": "Product Demo Video Generated by OpenMontage AI Studio",
    "pOM.img1Caption": "Main Studio Workspace",
    "pOM.img2Caption": "750+ Styles & Playbooks",
    "pOM.img3Caption": "Script & Scene Timeline",
    "pOM.img4Caption": "37+ Multi-Genre Voices",
    "pOM.img5Caption": "40+ Typography Presets",
    "pOM.img6Caption": "Piper TTS & Whisper STT",
    "pOM.img7Caption": "Creative AI Toolchain",
    "pOM.img8Caption": "MP4 Render Progress",
    "pOM.img9Caption": "Final Video Player",
    "pMike.badge": "SECTION 04 • WEB VIDEO EDITOR & MOTION CODE",
    "pMike.title": "4. Multi-Track Web Video Editor (Mike Editor Pro 4.0 & Hyperframes)",
    "pMike.overview": "A web video creation ecosystem pairing Mike Editor Pro 4.0 (1,200+ cinema LUTs, VFX, motion graphics, fonts, transitions, synthesized SFX/BGM) with the Hyperframes code-driven video workspace.",
    "pMike.f1Title": "Multi-Track Timeline & 1,200+ Pro Presets",
    "pMike.f1Desc": "Supports 7 parallel tracks (Video, VFX, Text, Graphic, Subtitles, PiP B-roll, Audio/SFX) loaded with 200 LUTs, 200 VFX, 200 CTA graphics, 200 fonts, and 20 transitions.",
    "pMike.f2Title": "Keyframes, Safe Zones & Synthesized Audio",
    "pMike.f2Desc": "Direct canvas editing, keyframe animation, TikTok/Reels 9:16 safe-zone overlays, and 200 built-in synthesized SFX/BGM tracks ready for FFmpeg export.",
    "pMike.f3Title": "Hyperframes — Code-Driven Video (HCM Intro)",
    "pMike.f3Desc": "Renders a frame-accurate Ho Chi Minh City showcase film using HTML/CSS/JS Hyperframes motion composition and automated visual checks.",
    "pMike.videoCaption": "Ho Chi Minh City Intro Film Rendered with Hyperframes & Mike Editor",
    "pMike.img1Caption": "Multi-Track Timeline UI",
    "pMike.img2Caption": "200 Cinema LUT Library",
    "pMike.img3Caption": "Cinematic Color Grading",
    "pMike.img4Caption": "20 Scene Transitions",
    "pMike.img5Caption": "200 Fonts & Keyframes",
    "pMike.img6Caption": "Direct Canvas Editing",
    "pMike.img7Caption": "200 SFX & BGM Library",
    "pMike.img8Caption": "Hyperframes HCM Intro (1)",
    "pMike.img9Caption": "Hyperframes HCM Intro (2)",
    "pJob.badge": "SECTION 05 • CAREER TECH & AI ATS AUTOMATION",
    "pJob.title": "5. Semi-Auto AI Job Hub & career-ops ATS Dispatcher",
    "pJob.overview": "Multi-source job scraper (Remotive, Himalayas, LinkedIn, TopCV) featuring 5D fit scoring, reverse ATS keyword matching, QR-linked tailored A4 CVs, Anti-AI writing guard, and Gmail SMTP bulk dispatch.",
    "pJob.f1Title": "5D Fit Evaluation & Reverse ATS Analysis",
    "pJob.f1Desc": "Paste any job description (JD) to break down ATS keywords into Direct Matches, Indirect Evidence, and Honest Gaps while generating a tailored application kit.",
    "pJob.f2Title": "Anti-AI Writing Guard (WP:AISIGNS)",
    "pJob.f2Desc": "Automatically flags and replaces stereotypical AI phrasing in subjects, cover letters, and CVs with verifiable metrics (10% ROI, 113+ club members, 3-month teaching).",
    "pJob.f3Title": "Gmail Wave & Local SMTP Bulk Dispatch",
    "pJob.f3Desc": "Launches popup-safe Gmail compose waves or sends directly via local Python bulk_mailer.py with the matching VI/EN PDF CV attached.",
    "pJob.heroCaption": "ATS-Optimized Tailored CV Interface with Portfolio QR Link (Click to zoom)",
    "pHL.badge": "SECTION 06 • HUMANITARIAN AI & 5D VECTOR MATCHING",
    "pHL.title": "6. AI 5D Matching Engine for Missing Relatives (haylentieng.vn)",
    "pHL.overview": "Non-profit humanitarian AI project scraping ~13,000 missing-person profiles across 1,083 pages from haylentieng.vn and running a 5D matching engine paired with historical Vietnamese administrative boundary mapping.",
    "pHL.f1Title": "Parallel Scraper for 13,000+ Profiles (Node & Python)",
    "pHL.f1Desc": "Fault-tolerant scraping with retry logic normalizing case IDs, disappearance year, names, parents, siblings, and family search narratives.",
    "pHL.f2Title": "4-Stage Screening Funnel & Geo-History Normalization",
    "pHL.f2Desc": "Translates legacy Vietnamese province/district names (e.g., Ha Tay, Minh Hai, Thuan Hai, Vinh Phu) to prevent missed cross-decade matches.",
    "pHL.m1": "Profiles Scraped",
    "pHL.m2": "Pages Indexed",
    "pHL.m3": "5-Dimension Scoring",
    "pHL.m4": "Non-Profit Community",
    "pHL.note": "Interactive browser dashboard supports instant filtering for ≥80% matches, 100% parent-name overlaps, and print-ready verification reports.",
    "pHL.cta": "Open Live AI Matching Dashboard",
    "links.brokerGit": "GitHub: broker",
    "links.brokerLive": "Live: Broker",
    "links.quantGit": "GitHub: vn100-linear-quant",
    "links.quantLive": "Live: Quant",
    "links.ckGit": "GitHub: chungkhoan",
    "links.widgetGit": "GitHub: vn-stock-widget",
    "links.hureaHubGit": "GitHub: hurea_hub",
    "links.hureaHubLive": "Live: HuReA Hub (Vercel)",
    "links.hureaGit": "GitHub: hurea",
    "links.hureaLive": "Live: GitHub Pages",
    "links.omGit": "GitHub: OpenMontage",
    "links.omLive": "Live: OpenMontage Portal",
    "links.mikeGit": "GitHub: mike-editor",
    "links.mikeLive": "Live: Mike Editor",
    "links.veGit": "GitHub: video-editor",
    "links.veLive": "Live: Workspace",
    "links.jobGit": "GitHub: semi-auto-job-hub",
    "links.jobLive": "Live: Job Hub Studio",
    "links.hlGit": "GitHub: haylentieng-scraper",
    "links.hlLive": "Live: AI Matching Dashboard",
    "links.foodcheckGit": "GitHub: foodcheck",
    "links.foodcheckLive": "Live: FoodCheck AI",
    "links.foodcheckerGit": "GitHub: foodchecker",
    "links.foodcheckerLive": "Live: FoodChecker",
    "links.aviEcosystemGit": "GitHub Ecosystem",
    "links.aviEcosystemLive": "Live Demo",
    "links.vndeerGit": "GitHub: VNDeer",
    "links.vndeerLive": "Live: VNDeer Suite",
    "links.vndeerViGit": "GitHub: VN-DEER",
    "links.vndeerEnGit": "GitHub: VN-DEER_EN",
    "portfolio.stat1": "GitHub Projects",
    "githubDir.label": "✦ Complete Open-Source Ecosystem ✦",
    "githubDir.title": "<span class=\"accent\">ALL 21 GITHUB</span> PROJECTS",
    "githubDir.subtitle": "Complete directory of all 21 repositories on <strong>github.com/Tonykosuy</strong> with detailed bilingual descriptions, VI/EN entry language selector on every web app, and direct links to source code &amp; live demos.",
    "githubDir.filterAll": "All (21)",
    "githubDir.filterFintech": "FinTech & Quant (4)",
    "githubDir.filterAiVideo": "AI & Video Studio (4)",
    "githubDir.filterHr": "HR & Automation (4)",
    "githubDir.filterSocial": "Social & Health (6)",
    "githubDir.filterWeb": "Web & Creative (3)",
    "githubDir.searchPlaceholder": "Search project, tech stack, or description...",
    "githubDir.gitBtn": "GitHub Repo",
    "githubDir.liveBtn": "Open Live Web",
    "githubDir.cat.fintech": "FINTECH & QUANT",
    "githubDir.cat.ai_video": "AI & VIDEO STUDIO",
    "githubDir.cat.hr": "HR & AUTOMATION",
    "githubDir.cat.social": "SOCIAL & HEALTH",
    "githubDir.cat.web": "WEB & CREATIVE",
    "repo.broker.title": "Broker — VN100 Auto-Screener & Technical Analysis",
    "repo.broker.desc": "Automated web platform scanning ~130 VN100 stocks across 8 quantitative strategies, calculating Win Rate, R:R ratios, and generating 3-tranche trading plans in real time.",
    "repo.broker.feat": "Auto-Screener • 8-Indicator Backtest • TP/SL Planner • FireAnt News",
    "repo.chungkhoan.title": "Chungkhoan — VN100 Historical Scraper & 100-Sheet Excel Exporter",
    "repo.chungkhoan.desc": "Extracts VN100/VN30 historical OHLCV data, looks up company fundamentals, renders candlestick charts, and exports 100-sheet Excel workbooks grouped by sector.",
    "repo.chungkhoan.feat": "100-Sheet Excel Export • OHLCV History • Corporate Lookup • TA Charts",
    "repo.vn100_linear_quant.title": "VN100 Linear Quant — OLS Regression & Grouped Quartile Engine",
    "repo.vn100_linear_quant.desc": "Quantitative analyzer combining OLS linear regression (y = ax + b), grouped data quartiles (Q1, Q2, Q3, IQR), automated S/R zones, and 6-factor Bayesian/Kelly trade signals.",
    "repo.vn100_linear_quant.feat": "Multi-TF OLS • Grouped Quartiles • Pivot S/R • SSI/DNSE Live API",
    "repo.vn_stock_widget.title": "VN Stock Widget — Pastel Desktop Stock Tracker & Productivity Suite",
    "repo.vn_stock_widget.desc": "Always-on-top Windows desktop productivity suite featuring live VN-INDEX & P&L tracking, offline Whisper Speech-to-Text, Pomodoro alarms, task tracker, and quick-copy shelf.",
    "repo.vn_stock_widget.feat": "5s VCI/SSI Board • Live P&L • Offline Whisper STT • Auto-Hide Watcher",
    "repo.hurea_hub.title": "HuReA Hub — Cloud Club HR & 360° Performance ERP (Vercel)",
    "repo.hurea_hub.desc": "Production deployment of HuReA Club's internal HR ERP (113+ members): multi-term directories, project & PL tracking, 4-pillar 360° evaluation, and batch PDF/Excel exports.",
    "repo.hurea_hub.feat": "113+ Members • 360° Peer Review • Meeting Polls • Batch PDF/Excel",
    "repo.hurea.title": "HuReA Dashboard — Member Operations, Evidence & Confession Hub",
    "repo.hurea.desc": "Full web dashboard featuring 6-digit PIN auth, rapid Excel paste import, anonymous Feedback & Confession box, built-in Photobooth, and centralized evidence storage.",
    "repo.hurea.feat": "PIN Auth • Rapid Excel Import • Anonymous Confessions • Photobooth",
    "repo.OpenMontage.title": "OpenMontage — Multi-Agent AI Video Production Studio & Remotion",
    "repo.OpenMontage.desc": "Local AI video production suite combining 750+ visual playbooks, 37+ Piper/Edge voices, 40+ fonts, Faster-Whisper speech-to-subtitle, and automated Remotion MP4 rendering.",
    "repo.OpenMontage.feat": "750+ Styles • 37+ Voices • Faster-Whisper STT • Ink Theater & Backlot",
    "repo.mike_editor.title": "Mike Editor Pro 4.0 — Web Multi-Track Timeline Video Editor",
    "repo.mike_editor.desc": "Browser-based multi-track video editor packing 200 cinema LUTs, 200 VFX filters, 200 motion graphics, 200 fonts & text styles, 20 transitions, keyframes, and 200 synthesized SFX/BGM.",
    "repo.mike_editor.feat": "1,200+ Presets • Keyframe Animation • Safe Zone • FFmpeg MP4 Export",
    "repo.video_editor.title": "Video Editor Workspace — Code-Driven Motion & Hyperframes",
    "repo.video_editor.desc": "Unified motion engineering workspace housing Mike Editor Pro 4.0, the Hyperframes-powered Ho Chi Minh City intro film, and frame-accurate HTML/CSS/JS video templates.",
    "repo.video_editor.feat": "HCM Intro Hyperframes • Mike Editor Pro • Frame-Accurate Rendering",
    "repo.semi_auto_job_hub.title": "Semi-Auto AI Job Hub — ATS Matcher, Anti-AI Guard & Bulk Mailer",
    "repo.semi_auto_job_hub.desc": "Multi-source job hub with 5D fit scoring & reverse ATS analysis, QR-linked CV tailoring, WP:AISIGNS Anti-AI prose guard, and Gmail Web / SMTP bulk PDF CV dispatching.",
    "repo.semi_auto_job_hub.feat": "5D ATS Scoring • Anti-AI Guard • Dual VI/EN PDF CV • Gmail Bulk Send",
    "repo.haylentieng_scraper.title": "Haylentieng.vn — AI 5D Missing Relatives Matching Dashboard",
    "repo.haylentieng_scraper.desc": "Non-profit initiative scraping ~13,000 missing-person profiles from haylentieng.vn with a 5D AI matching engine, 4-stage funnel, and Vietnam historical province mapping.",
    "repo.haylentieng_scraper.feat": "13,000+ Profiles • 5D AI Matching • VN Historical Geo-Map • Live Dashboard",
    "repo.VNDeer.title": "VNDeer — Full Disaster Relief & Emergency Coordination Suite",
    "repo.VNDeer.desc": "Complete 7-module disaster relief platform: frontline SOS GIS map, flood household lookup, VNeID QR verification, ICE medical profiles, dam discharge alerts, and Google Sheets sync.",
    "repo.VNDeer.feat": "7-Page Web Suite • SOS GIS Map • VNeID QR Auth • ICE Medical Profile",
    "repo.VN_DEER.title": "VN-DEER — Emergency Relief Verification Portal (VN Edition)",
    "repo.VN_DEER.desc": "Mobile-first disaster response web app enabling flood victims and volunteers to broadcast GPS SOS alerts, report medical symptoms, and verify relief aid via VNeID QR codes.",
    "repo.VN_DEER.feat": "GPS SOS Dispatch • VNeID Verification • Hydropower Flood Alerts",
    "repo.VN_DEER_EN.title": "VN-DEER EN — Emergency Relief Verification System (Global Edition)",
    "repo.VN_DEER_EN.desc": "International bilingual edition of VN-DEER built for global NGOs, international rescue coordinators, and social-impact pitch competitions (YAI / SV.STARTUP).",
    "repo.VN_DEER_EN.feat": "Global NGO Ready • VNeID Auth • ICE Medical Card • Frontline GIS Map",
    "repo.foodcheck.title": "FoodCheck (AVI Health) — AI Food Freshness & Camera Inspector",
    "repo.foodcheck.desc": "Web app combining fresh meat/fish/produce inspection guides, cold-storage best practices, and a live Teachable Machine computer-vision camera scanner for food freshness.",
    "repo.foodcheck.feat": "Live AI Camera Scan • Freshness Guides • Spoilage Detection",
    "repo.foodchecker.title": "FoodChecker — Smart Produce Quality & Safety Inspector",
    "repo.foodchecker.desc": "Dedicated mobile-browser food safety inspection module supporting instant front/rear camera switching, visual freshness checklists, and Teachable Machine classification.",
    "repo.foodchecker.feat": "Dual-Camera Switch • Real-Time AI Inference • Mobile-First UI",
    "repo.stamplocker.title": "StampLocker — Coffee Journal Edition Interactive Photo Stamp Book",
    "repo.stamplocker.desc": "Interactive vintage camera web app that frames photos inside perforated SVG postage stamps with slam animation, handwritten captions, and cloud scrapbook sync via Google Apps Script.",
    "repo.stamplocker.feat": "Perforated SVG Stamps • Camera Zoom • Cloud Scrapbook Sync",
    "repo.Nguoi_yeu_vu_tru.title": "Aether Particles v7.0 // Neon Cosmos — Gesture-Controlled 3D Space",
    "repo.Nguoi_yeu_vu_tru.desc": "Interactive Three.js WebGL cosmos morphing thousands of neon particles into Solar System, Earth, Mars, Jupiter, and Heart formations via webcam hand-gesture controls & music.",
    "repo.Nguoi_yeu_vu_tru.feat": "Dual-Hand Gesture Nav • 3D Neon Particles • Valentine Audio Card",
    "repo.Taphuandangoai_T12_2025.title": "Outdoor Training Camp Dec/2025 — Travel Organizing Committee Portal",
    "repo.Taphuandangoai_T12_2025.desc": "Official onboarding portal detailing the Dec/2025 outdoor training camp vision, Core Team leadership, and job descriptions across all 6 Organizing Committee sub-teams.",
    "repo.Taphuandangoai_T12_2025.feat": "6 OC Team Roles • Member Onboarding Guide • Clean Responsive Layout",
    "repo.nusa_valo_watcher.title": "Nusa Valorant Watcher — Automated PowerShell Mutex Process Watcher",
    "repo.nusa_valo_watcher.desc": "Silent background PowerShell utility guarded by a Windows Mutex lock that polls Valorant every 3 seconds, pausing Nusa during gameplay and relaunching it cleanly on exit.",
    "repo.nusa_valo_watcher.feat": "Single-Instance Mutex • Hidden VBScript Runner • Auto-Relaunch",
    "repo.portfolio.title": "Personal Portfolio — Interactive Van Gogh 3D & 21-Project Showcase",
    "repo.portfolio.desc": "Starry Night themed personal portfolio featuring Three.js/GSAP anti-gravity tickets, bilingual VI/EN switcher & welcome prompt, zoomable CVs, certificates, and all 21 GitHub repos.",
    "repo.portfolio.feat": "Bilingual VI/EN • Zoomable CV & Certs • All 21 GitHub Repos • Media Guard"
  }
};

let currentLang = localStorage.getItem('portfolio_lang') || 'vi';

// Helper to build split-text spans while preserving .accent styling
const buildSplitText = (el, htmlString) => {
  const temp = document.createElement('div');
  temp.innerHTML = htmlString;
  el.innerHTML = '';
  let charIndex = 0;

  const processNode = (node, isAccent = false) => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent.split('').forEach((char) => {
        const span = document.createElement('span');
        span.innerText = char === ' ' ? '\u00A0' : char;
        if (isAccent) span.classList.add('accent');
        span.style.transitionDelay = `${charIndex * 30}ms`;
        el.appendChild(span);
        charIndex++;
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const accent = isAccent || node.classList.contains('accent');
      node.childNodes.forEach(child => processNode(child, accent));
    }
  };

  temp.childNodes.forEach(node => processNode(node, false));
};

function applyLanguage(lang) {
  const dict = i18nTranslations[lang] || i18nTranslations.vi;
  currentLang = lang;
  localStorage.setItem('portfolio_lang', lang);

  // Update HTML lang, title, and meta description
  document.documentElement.lang = lang;
  if (dict["meta.title"]) document.title = dict["meta.title"];
  const metaDesc = document.getElementById('meta-description');
  if (metaDesc && dict["meta.description"]) {
    metaDesc.setAttribute('content', dict["meta.description"]);
  }

  // Switch CV image according to selected language (VI vs EN)
  const cvImg = document.getElementById('cv-preview-img');
  const expectedCvSrc = lang === 'en' ? 'asset/cv/CV_ENG.png' : 'asset/cv/CV_VIE.png';
  if (cvImg) {
    const lightboxImg = document.getElementById('cert-lightbox-img');
    const isCvOpenInLightbox = lightboxImg && lightboxImg.src && (lightboxImg.src.includes('CV_VIE.png') || lightboxImg.src.includes('CV_ENG.png'));
    cvImg.src = expectedCvSrc;
    cvImg.alt = lang === 'en' ? 'CV - Nguyen Tran Tien Phuc (English)' : 'CV - Nguyễn Trần Tiến Phúc (Tiếng Việt)';
    if (isCvOpenInLightbox) {
      lightboxImg.src = expectedCvSrc;
    }
  }

  // Plain text elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  // HTML elements
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  // Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  // Image alt attributes
  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const key = el.getAttribute('data-i18n-alt');
    if (dict[key] !== undefined) {
      el.setAttribute('alt', dict[key]);
    }
  });

  // Split-text headings
  document.querySelectorAll('[data-i18n-split]').forEach(el => {
    const key = el.getAttribute('data-i18n-split');
    if (dict[key] !== undefined) {
      buildSplitText(el, dict[key]);
    }
  });

  // Update toggle button states
  document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.classList.toggle('active', opt.getAttribute('data-lang-opt') === lang);
  });
  const floatingCode = document.getElementById('langFloatingCode');
  if (floatingCode) {
    floatingCode.textContent = lang.toUpperCase();
  }
}

function toggleLanguage() {
  const nextLang = currentLang === 'vi' ? 'en' : 'vi';
  applyLanguage(nextLang);
}

function handleContactSubmit(event) {
  event.preventDefault();
  const dict = i18nTranslations[currentLang] || i18nTranslations.vi;
  alert(dict["contact.alertSuccess"]);
}

// ===== STARLIGHT PARTICLES SYSTEM =====
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

const starColors = [
  { r: 212, g: 165, b: 116 },
  { r: 232, g: 197, b: 146 },
  { r: 193, g: 123, b: 69 },
  { r: 240, g: 232, b: 216 },
  { r: 180, g: 190, b: 220 },
  { r: 160, g: 170, b: 210 },
];

class Star {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.15;
    this.speedY = (Math.random() - 0.5) * 0.15 - 0.05;
    this.color = starColors[Math.floor(Math.random() * starColors.length)];
    this.opacity = Math.random() * 0.6 + 0.1;
    this.maxOpacity = this.opacity;
    this.twinkleSpeed = Math.random() * 0.02 + 0.005;
    this.twinklePhase = Math.random() * Math.PI * 2;
    this.life = 0;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life += this.twinkleSpeed;
    this.opacity = this.maxOpacity * (0.5 + 0.5 * Math.sin(this.life + this.twinklePhase));

    if (mouse.x !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        this.x -= dx * 0.005;
        this.y -= dy * 0.005;
        this.opacity = Math.min(this.maxOpacity * 1.5, 1);
      }
    }

    if (this.x < -10 || this.x > canvas.width + 10 || this.y < -10 || this.y > canvas.height + 10) {
      this.reset();
    }
  }
  draw() {
    const { r, g, b } = this.color;
    if (this.size > 1.2) {
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4);
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.15})`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.fillStyle = gradient;
      ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
    ctx.fill();
  }
}

function initStars() {
  stars = [];
  const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 10000));
  for (let i = 0; i < count; i++) {
    stars.push(new Star());
  }
}
initStars();

function connectStars() {
  for (let a = 0; a < stars.length; a++) {
    for (let b = a + 1; b < stars.length; b++) {
      const dx = stars[a].x - stars[b].x;
      const dy = stars[a].y - stars[b].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const avgColor = {
          r: (stars[a].color.r + stars[b].color.r) / 2,
          g: (stars[a].color.g + stars[b].color.g) / 2,
          b: (stars[a].color.b + stars[b].color.b) / 2
        };
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${avgColor.r}, ${avgColor.g}, ${avgColor.b}, ${0.04 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(stars[a].x, stars[a].y);
        ctx.lineTo(stars[b].x, stars[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => { s.update(); s.draw(); });
  connectStars();
  requestAnimationFrame(animateStars);
}
animateStars();

// ===== NAVBAR SCROLL (Show past Hero) =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > window.innerHeight * 0.7);
});

// ===== NAV ACTIVE LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 150;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinksAll.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// ===== MOBILE NAV TOGGLE =====
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ===== COUNT UP ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      let current = 0;
      const increment = target / 80;
      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target;
          clearInterval(counter);
        } else {
          el.textContent = Math.floor(current);
        }
      }, 30);
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => countObserver.observe(el));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== SPLIT TEXT ENGINE =====
const initSplitText = () => {
  const elements = document.querySelectorAll('.split-text');
  elements.forEach(el => {
    if (!el.hasAttribute('data-i18n-split')) {
      buildSplitText(el, el.innerHTML);
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
};

// ===== SHAPE BLUR & SPOTLIGHT TRACKING =====
const initMouseEffects = () => {
  const mouseBlur = document.getElementById('mouse-blur');
  const spotlightCards = document.querySelectorAll('.spotlight-card');

  window.addEventListener('mousemove', (e) => {
    if (mouseBlur) {
      const x = e.clientX - 250;
      const y = e.clientY - 250;
      mouseBlur.style.transform = `translate(${x}px, ${y}px)`;
    }

    spotlightCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
};

// ===== GLOBAL LIGHTBOX (CV, CERTIFICATES, PROJECT ILLUSTRATIONS) =====
const initCertLightbox = () => {
  const lightbox = document.getElementById('cert-lightbox');
  if (!lightbox) return;

  const lightboxContent = document.getElementById('cert-lightbox-content');
  const lightboxImg = document.getElementById('cert-lightbox-img');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const zoomBtn = document.getElementById('lightbox-zoom-btn');
  const overlay = document.getElementById('cert-lightbox-overlay');

  const openLightboxWithSrc = (src, autoZoom = false) => {
    if (!lightboxImg || !src) return;
    lightboxImg.src = src;
    if (lightboxContent) {
      lightboxContent.classList.toggle('zoomed', autoZoom);
      lightboxContent.scrollTop = 0;
    }
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('show');
    if (lightboxContent) lightboxContent.classList.remove('zoomed');
    document.body.style.overflow = '';
  };

  const toggleZoom = (e) => {
    if (e) e.stopPropagation();
    if (lightboxContent) {
      lightboxContent.classList.toggle('zoomed');
    }
  };

  // Delegate clicks on any .zoomable-card or .cert-card
  document.querySelectorAll('.zoomable-card, .cert-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      const img = card.querySelector('.zoomable-img, .cert-img, img');
      if (img && img.src) {
        const isCvCard = card.id === 'cv-showcase-card' || img.id === 'cv-preview-img';
        openLightboxWithSrc(img.src, isCvCard);
      }
    });
  });

  if (lightboxImg) {
    lightboxImg.addEventListener('click', toggleZoom);
  }
  if (zoomBtn) {
    zoomBtn.addEventListener('click', toggleZoom);
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });
  }
  if (overlay) {
    overlay.addEventListener('click', closeLightbox);
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('show')) {
      closeLightbox();
    }
  });
};

// ===== ANTI-GRAVITY GSAP ANIMATIONS (4 Skill Tickets) =====
const initAntiGravity = () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn("GSAP or ScrollTrigger not loaded");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector('.starry-night-section');
  const tickets = document.querySelectorAll('.ticket-card');
  const floatingEls = document.querySelectorAll('.floating-el');
  const parallaxWraps = document.querySelectorAll('.parallax-wrap');

  if (!section) return;

  // 1. Entrance Animation for Skill Tickets
  if (tickets.length > 0) {
    gsap.fromTo(tickets,
      { y: 80, rotation: -4, opacity: 0 },
      {
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse"
        },
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.14,
        ease: "power3.out"
      }
    );
  }

  // 2. Continuous Anti-gravity floating (Bobbing)
  floatingEls.forEach((el, i) => {
    gsap.to(el, {
      y: "-=16",
      rotation: "random(-2, 2)",
      duration: "random(2.5, 3.8)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: i * 0.2
    });
  });

  // 3. Parallax Effect (SCRUB)
  parallaxWraps.forEach(wrap => {
    const depth = parseFloat(wrap.getAttribute('data-depth')) || 0.08;
    gsap.to(wrap, {
      y: -200 * depth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5
      }
    });
  });
};

// ===== CERTIFICATE CAROUSEL CONTROL =====
const initCertCarousels = () => {
  document.querySelectorAll('.cert-carousel-container').forEach(container => {
    const track = container.querySelector('.cert-carousel-track');
    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');
    if (!track) return;

    const getScrollAmount = () => track.clientWidth * 0.8;

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
      });
    }

    const updateButtons = () => {
      const isScrollable = track.scrollWidth > track.clientWidth;
      if (!isScrollable) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
      }

      if (prevBtn) {
        prevBtn.style.display = 'flex';
        if (track.scrollLeft <= 10) {
          prevBtn.style.opacity = '0.2';
          prevBtn.style.pointerEvents = 'none';
        } else {
          prevBtn.style.opacity = '1';
          prevBtn.style.pointerEvents = 'auto';
        }
      }

      if (nextBtn) {
        nextBtn.style.display = 'flex';
        const isAtEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 10;
        if (isAtEnd) {
          nextBtn.style.opacity = '0.2';
          nextBtn.style.pointerEvents = 'none';
        } else {
          nextBtn.style.opacity = '1';
          nextBtn.style.pointerEvents = 'auto';
        }
      }
    };

    track.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);
    
    setTimeout(updateButtons, 500);
    setTimeout(updateButtons, 1500);
  });
};

const initAll = () => {
  const safeInit = (name, fn) => {
    try {
      fn();
    } catch (e) {
      console.error(`Error initializing ${name}:`, e);
    }
  };

  safeInit('applyLanguage', () => applyLanguage(currentLang));
  safeInit('initSplitText', initSplitText);
  safeInit('initMouseEffects', initMouseEffects);

  // Video background adjustments
  try {
    const globalVideo = document.getElementById('globalVideo');
    if (globalVideo) {
      globalVideo.currentTime = 3.0;
      globalVideo.play().catch(e => console.warn("Autoplay failed:", e));

      globalVideo.addEventListener('ended', () => {
        globalVideo.currentTime = 3.0;
        globalVideo.play();
      });
    }
  } catch (e) {
    console.error("Error initializing video background:", e);
  }

  safeInit('initAntiGravity', initAntiGravity);
  safeInit('initCertLightbox', initCertLightbox);
  safeInit('initCertCarousels', initCertCarousels);
  safeInit('initAssetProtection', initAssetProtection);
};

// ===== ASSET & MEDIA PROTECTION (DISABLE RIGHT-CLICK, DRAG, VIDEO DOWNLOAD & SHORTCUTS) =====
const initAssetProtection = () => {
  // 1. Block context menu (right-click) globally
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, true);

  // 2. Block dragging of images, videos, links, and other assets
  window.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
  }, true);

  // 3. Enforce nodownload & disablePictureInPicture on all video/audio/img elements
  document.querySelectorAll('video, audio').forEach((media) => {
    media.setAttribute('controlsList', 'nodownload noplaybackrate');
    media.setAttribute('disablePictureInPicture', 'true');
    media.setAttribute('disableRemotePlayback', 'true');
    media.disablePictureInPicture = true;
    media.draggable = false;
    media.addEventListener('contextmenu', (e) => e.preventDefault());
  });

  document.querySelectorAll('img').forEach((img) => {
    img.setAttribute('draggable', 'false');
    img.draggable = false;
    img.addEventListener('contextmenu', (e) => e.preventDefault());
  });

  // 4. Block keyboard shortcuts for saving page/assets or inspecting media URLs
  window.addEventListener('keydown', (e) => {
    const key = (e.key || '').toLowerCase();
    const ctrlOrCmd = e.ctrlKey || e.metaKey;

    // Block Ctrl+S (Save), Ctrl+U (View Source), Ctrl+P (Print/Save PDF)
    if (ctrlOrCmd && (key === 's' || key === 'u' || key === 'p')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Block F12 & Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
    if (
      e.key === 'F12' ||
      (ctrlOrCmd && e.shiftKey && (key === 'i' || key === 'j' || key === 'c'))
    ) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);
};

// Activate protection immediately
initAssetProtection();

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}


// ===== WELCOME LANGUAGE MODAL & ALL-21 GITHUB DIRECTORY FILTERING =====
function choosePortfolioLanguage(lang) {
  applyLanguage(lang);
  sessionStorage.setItem('portfolio_lang_chosen', lang);
  const modal = document.getElementById('portfolio-lang-modal');
  if (modal) modal.classList.add('hidden');
  // User click unlocks audio autoplay smoothly
  if (bgMusic && bgMusic.paused) {
    bgMusic.play().then(() => syncMusicUI(true)).catch(() => {});
  }
}

function openPortfolioLanguageModal() {
  const modal = document.getElementById('portfolio-lang-modal');
  if (modal) modal.classList.remove('hidden');
}

const initGithubDirectory = () => {
  const tabs = document.querySelectorAll('#githubFilterTabs .repo-filter-btn');
  const searchInput = document.getElementById('githubRepoSearch');
  const cards = document.querySelectorAll('#githubReposGrid .github-repo-card');
  if (!tabs.length || !cards.length) return;

  let activeCat = 'all';

  const applyFilter = () => {
    const q = (searchInput ? searchInput.value : '').trim().toLowerCase();
    cards.forEach(card => {
      const catMatch = activeCat === 'all' || card.getAttribute('data-category') === activeCat;
      const text = (card.getAttribute('data-search') || '') + ' ' + card.textContent.toLowerCase();
      const qMatch = !q || text.includes(q);
      card.classList.toggle('repo-hidden', !(catMatch && qMatch));
    });
  };

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.getAttribute('data-filter') || 'all';
      applyFilter();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilter);
  }
};

// Re-initialize directory filter cleanly on load
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initGithubDirectory);
} else {
  initGithubDirectory();
}
