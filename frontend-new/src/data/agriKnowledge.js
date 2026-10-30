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
        keywords: ['fertilizer', 'npk', 'urea', 'खाद'],
        response: "For general crop health, NPK (Nitrogen, Phosphorus, Potassium) ratio of 4:2:1 is often recommended, but it varies by crop. Soil testing is highly advised before applying bulk fertilizers. Vermicompost (5t/ha) boosts soil microbes."
    },
    {
        keywords: ['scan', 'disease', 'pest', 'leaf', 'बीमारी', 'रोग', 'ರೋಗ'],
        response: "You can diagnose plant diseases instantly using our **Scan** page! Upload or capture any leaf photo to receive real-time disease identification, infected area percentage, and scientifically backed remedies."
    },
    {
        keywords: ['potato', 'आलू', 'ಆಲೂಗಡ್ಡೆ'],
        response: "Watch out for Potato Late Blight under cool, humid conditions. Use certified disease-free tubers, destroy volunteer plants, and apply preventive Mancozeb or Metalaxyl fungicides."
    },
    {
        keywords: ['subsidy', 'scheme', 'kusum', 'योजना', 'ಯೋಜನೆ'],
        response: "Under the PM-KUSUM scheme, farmers can receive up to 90% subsidies on standalone solar agriculture pumps. Also check out the Soil Health Card Scheme at your nearest Krishi Vigyan Kendra."
    }
];

export const GENERAL_RESPONSES = [
    "I can help with crop diseases, soil types (like Black or Alluvial), fertilizer ratios, and market trends.",
    "Try asking: 'What grows in black soil?' or 'How to cure tomato blight?' or 'Tell me about PM-KUSUM'.",
    "I am Krishi AI, trained to assist farmers with sustainable and high-yield agricultural practices!"
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
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('namaste') || lowerInput.includes('नमस्ते') || lowerInput.includes('ನಮಸ್ಕಾರ')) {
        return "Namaste farmer! How can I help your harvest today? Ask me about crop diseases, soil types, mandi prices, or our leaf scan tool.";
    }
    if (lowerInput.includes('weather') || lowerInput.includes('rain') || lowerInput.includes('मौसम') || lowerInput.includes('ಮಳೆ')) {
        return "Ensure adequate drainage before heavy showers to prevent fungal root rot. Check our Scan tool to evaluate microclimate fungal risks.";
    }
    if (lowerInput.includes('market') || lowerInput.includes('price') || lowerInput.includes('mandi') || lowerInput.includes('रेट') || lowerInput.includes('ಬೆಲೆ')) {
        return "Check our 'Market' page for real-time Mandi prices and direct farmer-to-buyer sales.";
    }
    if (lowerInput.includes('doctor') || lowerInput.includes('consult') || lowerInput.includes('expert') || lowerInput.includes('तज्ञ')) {
        return "Our 'Consult' page connects you with certified agricultural scientists and agronomists via live chat and audio/video calls.";
    }

    return "I am Krishi AI! Ask me about soils ('What grows in Black soil?'), disease remedies ('How to treat tomato early blight?'), or government subsidies.";
}
