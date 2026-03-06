(async () => {
    try {
        console.log("1. Logging in...");
        const loginRes = await fetch('http://localhost:5000/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'admin', password: 'admin123' })
        });

        const loginData = await loginRes.json();
        if (!loginRes.ok) throw new Error("Login fail: " + JSON.stringify(loginData));

        const token = loginData.accessToken;
        console.log("✅ Logged in correctly. Token length:", token.length);

        console.log("2. Testing protected route (PUT /api/v1/hero)...");
        const putRes = await fetch('http://localhost:5000/api/v1/hero', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: "Imran Ahmad Test" })
        });

        const putData = await putRes.json();
        if (!putRes.ok) throw new Error("PUT fail: " + JSON.stringify(putData));
        console.log("✅ PUT Success!", putData.success);
    } catch (e) {
        console.error("❌ Action Failed:", e.message);
    }
})();
