export default async function handler(req, res) {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: "City parameter is required" });
    }

    try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            return res.status(response.status).json({ error: "Failed to fetch weather data" });
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}
