const fs = require('fs');
const path = require('path');

// Generate a dummy image for testing
const dummyImgPath = path.join(__dirname, 'test_img.jpg');
fs.writeFileSync(dummyImgPath, Buffer.from([]));

(async () => {
    let token = '';

    console.log("=== STARTING FULL API END-TO-END TEST ===");

    // 1. LOGIN
    try {
        console.log("\n[1] Testing Login...");
        const loginRes = await fetch('http://localhost:5000/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'admin', password: 'admin123' })
        });
        const loginData = await loginRes.json();
        if (!loginRes.ok) throw new Error(loginData.message);
        token = loginData.accessToken;
        console.log("✅ Login Success! Token retrieved.");
    } catch (e) {
        console.error("❌ Login Failed:", e.message);
        process.exit(1);
    }

    // Custom fetch wrapper with Bearer token
    const apiFetch = async (url, options = {}) => {
        options.headers = { ...options.headers, 'Authorization': `Bearer ${token}` };
        const res = await fetch(`http://localhost:5000/api/v1${url}`, options);
        if (!res.ok) {
            const errBody = await res.text();
            throw new Error(`HTTP ${res.status}: ${errBody}`);
        }
        return res.json();
    };

    // Custom multipart/form-data generator for fetch
    const buildFormData = (fields) => {
        const formData = new FormData();
        for (const key in fields) {
            formData.append(key, fields[key]);
        }
        return formData;
    };

    // 2. HERO GET & PUT (Multipart)
    try {
        console.log("\n[2] Testing Hero API...");
        const heroData = await apiFetch('/hero');
        console.log("✅ GET /hero Success. Name:", heroData.data.name);

        const putRes = await apiFetch('/hero', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }, // Fallback without file for now
            body: JSON.stringify({ name: "Imran Ahmad E2E Test" })
        });
        console.log("✅ PUT /hero Success!");
    } catch (e) {
        console.error("❌ Hero API Failed:", e.message);
    }

    // 3. EXPERIENCE POST
    try {
        console.log("\n[3] Testing Experience API...");
        const expData = await buildFormData({
            role: 'Tester',
            company: 'QA Inc',
            period: '2026',
            description: 'Automated test'
        });
        const postRes = await apiFetch('/experience', {
            method: 'POST',
            body: expData
        }); // Fetch handles multipart boundary natively when passing FormData
        console.log("✅ POST /experience Success!");

        // Cleanup
        await apiFetch(`/experience/${postRes.data._id}`, { method: 'DELETE' });
        console.log("✅ DELETE /experience Success!");
    } catch (e) {
        console.error("❌ Experience API Failed:", e.message);
    }

    // 4. MARQUEE API
    try {
        console.log("\n[4] Testing Marquee API...");
        const getMarquee = await apiFetch('/marquee');
        console.log("✅ GET /marquee Success. Text:", getMarquee.data.text.slice(0, 20) + "...");
    } catch (e) {
        console.error("❌ Marquee API Failed:", e.message);
    }

    fs.unlinkSync(dummyImgPath);
    console.log("\n=== ALL TESTS FINISHED ===");
})();
