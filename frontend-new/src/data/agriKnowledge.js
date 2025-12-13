export const AGRI_KNOWLEDGE = [
    {
        keywords: ['black soil', 'regur'],
        response: "Black soil (Regur soil) is ideal for growing **Cotton**, as it retains moisture very well. It is also suitable for growing cereals, oilseeds, and citrus fruits. It is rich in calcium carbonate, magnesium, potash, and lime but poor in nitrogen and phosphorous."
    },
    {
        keywords: ['alluvial soil', 'river'],
        response: "Alluvial soil is highly fertile and supports a wide variety of crops. It is best for **Rice, Wheat, Sugarcane, Cotton, and Jute**. It is found in river basins and is rich in potash and phosphoric acid."
    },
    {
        keywords: ['red soil'],
        response: "Red soil develops on crystalline igneous rocks in low rainfall areas. It fits well for **Groundnut, Potato, Maize, Ragi, and Tobacco**. It needs irrigation and nitrogenous fertilizers for better yield."
    },
    {
        keywords: ['tomato', 'blight'],
        response: "For tomatoes, watch out for Early Blight. Use **Copper-based fungicides** and ensure proper spacing. Rotate crops every 3 years to prevent soil-borne diseases."
    },
    {
        keywords: ['wheat', 'rabi'],
        response: "Wheat is a Rabi crop sown in winter. It requires cool growing season and bright sunshine at ripening. Ideal temperature: 10°C-15°C for sowing, 21°C-26°C for ripening."
    },
    {
        keywords: ['rice', 'paddy', 'kharif'],
        response: "Rice is a Kharif crop requiring high temperature (above 25°C) and high humidity with annual rainfall above 100cm. It grows best in clayey alluvial soil."
    },
    {
        keywords: ['fertilizer', 'npk'],
        response: "For general crop health, NPK (Nitrogen, Phosphorus, Potassium) ratio of 4:2:1 is often recommended, but it varies by crop. Soil testing is highly advised before applying bulk fertilizers."
    }
];

export const GENERAL_RESPONSES = [
    "I can help with crop diseases, soil types (like Black or Alluvial), and market trends.",
    "Try asking: 'What grows in black soil?' or 'How to cure tomato blight?'",
    "I am an AI trained to assist farmers. Ask me about your crops!"
];

export function getSmartResponse(input) {
    const lowerInput = input.toLowerCase();

    // Check knowledge base
    for (const item of AGRI_KNOWLEDGE) {
        if (item.keywords.some(k => lowerInput.includes(k))) {
            return item.response;
        }
    }

    // Fallback logic
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) return "Hello farmer! How can I help your harvest today? Ask me about soils or crops.";
    if (lowerInput.includes('weather')) return "I can't check live weather yet, but generally, ensure your irrigation plan matches the current season.";
    if (lowerInput.includes('market') || lowerInput.includes('price')) return "Check our 'Market' page for real-time Mandi prices.";
    if (lowerInput.includes('doctor') || lowerInput.includes('consult')) return "Our 'Consult' page connects you with expert agronomists via video call.";

    return "I'm focusing on crops and soil right now. Try asking 'What crops grow in Alluvial soil?' or 'Benefits of Black soil'.";
}
