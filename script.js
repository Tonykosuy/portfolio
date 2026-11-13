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
    "p1.badge": "SECTION 03 • HEALTH TECH & AI",
    "p1.title": "3. Dự án Bot phân tích sức khỏe (AVI Health)",
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
    "p2.badge": "SECTION 04 • E-COMMERCE & EXPRESS LOGISTICS",
    "p2.title": "4. Dự án Sàn thương mại rau củ (AVI Ship)",
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
    "p3.badge": "SECTION 05 • SOCIAL IMPACT & DISASTER RELIEF TECH",
    "p3.title": "5. Dự án VNDEER (Hệ thống điều phối cứu trợ thiên tai)",
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
    "portfolio.stat1": "Dự án sáng lập",
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
    "footer.copyright": "&copy; 2026 <span class=\"primary\">NGUYỄN TRẦN TIẾN PHÚC</span>. Thiết kế với <i class=\"fa-solid fa-heart\" style=\"color:#FF6B6B\"></i> và niềm đam mê công nghệ."
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
    "p1.badge": "SECTION 03 • HEALTH TECH & AI",
    "p1.title": "3. AI Health Analysis Bot & Assistant (AVI Health)",
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
    "p2.badge": "SECTION 04 • E-COMMERCE & EXPRESS LOGISTICS",
    "p2.title": "4. Fresh Produce E-Commerce Platform (AVI Ship)",
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
    "p3.badge": "SECTION 05 • SOCIAL IMPACT & DISASTER RELIEF TECH",
    "p3.title": "5. VNDEER Project (Disaster Relief Coordination System)",
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
    "portfolio.stat1": "Founded Projects",
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
    "footer.copyright": "&copy; 2026 <span class=\"primary\">NGUYEN TRAN TIEN PHUC</span>. Designed with <i class=\"fa-solid fa-heart\" style=\"color:#FF6B6B\"></i> and a passion for technology."
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
