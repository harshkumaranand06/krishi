import { Droplet, Sprout, X, Sun, Wind, Thermometer, Shield, CheckCircle, AlertOctagon, TrendingDown, Hammer } from 'lucide-react';

export const DISEASE_DATA = {
    // 1. Tomato Early Blight
    'tomato_early_blight': {
        en: {
            disease: "Tomato Early Blight",
            description: "Caused by Alternaria solani. Manifests as target-like spots with yellow halos on older leaves first.",
            harmful_effect: "Severe defoliation exposes fruit to sunscald. Reduces photosynthesis capability, leading to smaller, lower-quality fruits. Can kill the plant if unchecked.",
            economic_impact: "High Impact: Yield losses typically range from 30% to 50%. Market value drops due to sun-damaged fruits.",
            immediate_action: "Remove and burn infected lower leaves immediately. Stake plants to keep foliage off the soil. Avoid overhead watering.",
            doctor_advice: "Consult an expert if >20% of the crop is affected for a fungicide schedule.",
            precautions: ["Crop Rotation (2-3 years)", "Mulching to reduce soil splash", "Drip irrigation"],
            treatments: [
                { type: "Organic", desc: "Neem oil or Copper fungicide.", icon: Sprout },
                { type: "Chemical", desc: "Chlorothalonil or Mancozeb sprays.", icon: Droplet }
            ]
        },
        hi: {
            disease: "टमाटर का अगेती झुलसा",
            description: "अल्टरनेरिया सोलानी कवक के कारण होता है। शुरुआत में पुराने पत्तों पर पीले घेरे वाले धब्बे दिखाई देते हैं।",
            harmful_effect: "पत्तियां झड़ने से फलों पर धूप से दाग पड़ जाते हैं। प्रकाश संश्लेषण कम होने से फल छोटे रह जाते हैं।",
            economic_impact: "उच्च प्रभाव: फसल उत्पादन में 30% से 50% तक की कमी आ सकती है। फलों की गुणवत्ता खराब होने से बाजार भाव गिर जाता है।",
            immediate_action: "संक्रमित निचली पत्तियों को तुरंत हटाकर जला दें। पौधों को सहारा (स्टेकिंग) दें ताकि पत्ते जमीन को न छुएं।",
            doctor_advice: "यदि 20% से अधिक फसल प्रभावित है, तो कवकनाशी अनुसूची के लिए विशेषज्ञ से सलाह लें।",
            precautions: ["फसल चक्र अपनाएं", "ड्रिप सिंचाई का प्रयोग करें", "मल्चिंग करें"],
            treatments: [
                { type: "जैविक", desc: "नीम का तेल या तांबा कवकनाशी।", icon: Sprout },
                { type: "रासायनिक", desc: "क्लोरोथलोनिल या मैंकोजेब।", icon: Droplet }
            ]
        },
        kn: {
            disease: "ಟೊಮೆಟೊ ಮುಂಚಿನ ರೋಗ",
            description: "ಅಲ್ಟರ್ನೇರಿಯಾ ಶಿಲೀಂಧ್ರದಿಂದ ಉಂಟಾಗುತ್ತದೆ. ಹಳೆಯ ಎಲೆಗಳ ಮೇಲೆ ಹಳದಿ ವರ್ತುಲಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ.",
            harmful_effect: "ಎಲೆಗಳು ಉದುರುವುದರಿಂದ ಹಣ್ಣುಗಳಿಗೆ ಹಾನಿಯಾಗುತ್ತದೆ. ಇಳುವರಿ ಮತ್ತು ಹಣ್ಣಿನ ಗುಣಮಟ್ಟ ಕಡಿಮೆಯಾಗುತ್ತದೆ.",
            economic_impact: "ಹೆಚ್ಚಿನ ಪರಿಣಾಮ: ಇಳುವರಿಯಲ್ಲಿ 30% ರಿಂದ 50% ನಷ್ಟವಾಗಬಹುದು. ಮಾರುಕಟ್ಟೆ ಮೌಲ್ಯ ಕುಸಿಯುತ್ತದೆ.",
            immediate_action: "ರೋಗಪೀಡಿತ ಕೆಳಗಿನ ಎಲೆಗಳನ್ನು ತಕ್ಷಣ ತೆಗೆದು ಸುಟ್ಟುಹಾಕಿ. ಗಿಡಗಳಿಗೆ ಆಸರೆ ನೀಡಿ.",
            doctor_advice: "20% ಕ್ಕಿಂತ ಹೆಚ್ಚು ಬೆಳೆ ಹಾನಿಗೊಳಗಾಗಿದ್ದರೆ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
            precautions: ["ಬೆಳೆ ಪರಿವರ್ತನೆ", "ಹನಿ ನೀರಾವರಿ", "ಮಲ್ಚಿಂಗ್"],
            treatments: [
                { type: "ಸಾವಯವ", desc: "ಬೇವು ಎಣ್ಣೆ ಅಥವಾ ತಾಮ್ರದ ಶಿಲೀಂಧ್ರನಾಶಕ.", icon: Sprout },
                { type: "ರಾಸಾಯನಿಕ", desc: "ಮ್ಯಾಂಕೋಜೆಬ್ ಸಿಂಪಡಿಸಿ.", icon: Droplet }
            ]
        }
    },

    // 2. Potato Late Blight
    'potato_late_blight': {
        en: {
            disease: "Potato Late Blight",
            description: "A devastating disease causing water-soaked spots on leaves that turn brown/black. White mold appears under leaves in humidity.",
            harmful_effect: "Rapidly destroys foliage and infects tubers, causing them to rot. Can wipe out an entire field in days under wet conditions.",
            economic_impact: "Critical Impact: Can cause 100% crop failure if not managed instantly. Tubers may rot in storage.",
            immediate_action: "Monitor weather strictly. If spots appear, destroy infected plants immediately (`roguing`). Stop overhead irrigation.",
            doctor_advice: "Urgent: Contact an extension officer immediately. This is a highly contagious community threat.",
            precautions: ["Use certified disease-free seed tubers", "Destroy cull piles", "Monitor weather"],
            treatments: [
                { type: "Preventive", desc: "Apply Metalaxyl based fungicides.", icon: Shield },
                { type: "Action", desc: "Destroy infected plants immediately.", icon: X }
            ]
        },
        hi: {
            disease: "आलू का पछेती झुलसा",
            description: "पत्तियों पर पानी जैसे धब्बे जो काले हो जाते हैं। नमी में पत्तियों के नीचे सफेद फफूंद दिखाई देती है।",
            harmful_effect: "यह तेजी से पत्तियों को नष्ट करता है और कंदों (आलू) को सड़ने का कारण बनता है। गीले मौसम में पूरी फसल बर्बाद हो सकती है।",
            economic_impact: "गंभीर प्रभाव: यदि तुरंत रोका नहीं गया तो 100% फसल नष्ट हो सकती है। भंडारण में आलू सड़ सकते हैं।",
            immediate_action: "मौसम पर कड़ी नज़र रखें। संक्रमित पौधों को तुरंत उखाड़ कर नष्ट करें। ऊपर से सिंचाई बंद करें।",
            doctor_advice: "अत्यावश्यक: तुरंत कृषि अधिकारी से संपर्क करें। यह तेजी से फैलने वाला रोग है।",
            precautions: ["प्रमाणित बीजों का प्रयोग करें", "संक्रमित ढेर नष्ट करें", "मौसम पर नज़र रखें"],
            treatments: [
                { type: "रोकथाम", desc: "मेटालेक्सिल कवकनाशी का छिड़काव करें।", icon: Shield },
                { type: "कार्रवाई", desc: "संक्रमित पौधों को तुरंत नष्ट करें।", icon: X }
            ]
        },
        kn: {
            disease: "ಆಲೂಗಡ್ಡೆ ಲೇಟ್ ಬ್ಲೈಟ್",
            description: "ಎಲೆಗಳ ಮೇಲೆ ಕಪ್ಪು ಕಲೆಗಳು. ತೇವಾಂಶವಿದ್ದಾಗ ಎಲೆಗಳ ಅಡಿಯಲ್ಲಿ ಬಿಳಿ ಶಿಲೀಂಧ್ರ ಕಾಣುತ್ತದೆ.",
            harmful_effect: "ಇದು ಎಲೆಗಳನ್ನು ಮತ್ತು ಗಡ್ಡೆಗಳನ್ನು ವೇಗವಾಗಿ ನಾಶಪಡಿಸುತ್ತದೆ. ಇಡೀ ಬೆಳೆಯನ್ನು ಹಾಳುಮಾಡಬಹುದು.",
            economic_impact: "ಗಂಭೀರ ಪರಿಣಾಮ: 100% ಬೆಳೆ ನಷ್ಟವಾಗಬಹುದು. ಶೇಖರಣೆಯಲ್ಲಿ ಗಡ್ಡೆಗಳು ಕೊಳೆಯಬಹುದು.",
            immediate_action: "ರೋಗಪೀಡಿತ ಗಿಡಗಳನ್ನು ತಕ್ಷಣ ಕಿತ್ತು ಹಾಕಿ. ವಾತಾವರಣದ ಮೇಲೆ ನಿಗಾ ಇರಿಸಿ.",
            doctor_advice: "ತುರ್ತು: ತಕ್ಷಣ ಕೃಷಿ ಅಧಿಕಾರಿಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ.",
            precautions: ["ಒಳ್ಳೆಯ ಬೀಜ ಬಳಸಿ", "ತ್ಯಾಜ್ಯ ವಿಲೇವಾರಿ", "ಹವಾಮಾನ ಗಮನಿಸಿ"],
            treatments: [
                { type: "ತಡೆಗಟ್ಟುವಿಕೆ", desc: "ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಿಸಿ.", icon: Shield },
                { type: "ಕ್ರಮ", desc: "ರೋಗಪೀಡಿತ ಗಿಡಗಳನ್ನು ನಾಶಮಾಡಿ.", icon: X }
            ]
        }
    },

    // 3. Corn Common Rust
    'corn_common_rust': {
        en: {
            disease: "Corn Common Rust",
            description: "Caused by Puccinia sorghi. Recognized by red-brick/cinnamon pustules on both upper and lower leaf surfaces.",
            harmful_effect: "Interferes with photosynthesis. Severe infection causes leaves to chlorose and die, leading to stunted ears and incomplete grain fill.",
            economic_impact: "Moderate Impact: Yield loss is usually minor (<10%) unless infection occurs very early (knee-high stage).",
            immediate_action: "Assess the stage of growth. If crop is near maturity, no action is needed. Early stage? Consider fungicide.",
            doctor_advice: "Consult if pustules cover >50% of leaf area in young plants.",
            precautions: ["Plant resistant hybrids", "Plant early to avoid peak rust season"],
            treatments: [
                { type: "Cultural", desc: "Early planting can help avoid peak rust.", icon: Sun },
                { type: "Chemical", desc: "Fungicides with Azoxystrobin.", icon: Droplet }
            ]
        },
        hi: {
            disease: "मक्का का रतुआ रोग (Rust)",
            description: "पत्तियों के दोनों ओर ईंट जैसे लाल-भूरे फफोले हो जाते हैं। यह पक्सिनिया सोरघी कवक के कारण होता है।",
            harmful_effect: "प्रकाश संश्लेषण में बाधा डालता है। गंभीर संक्रमण से पत्तियां मर जाती हैं, जिससे भुट्टे छोटे रह जाते हैं।",
            economic_impact: "मध्यम प्रभाव: आमतौर पर नुकसान कम (<10%) होता है, जब तक कि संक्रमण बहुत शुरुआती अवस्था में न हो।",
            immediate_action: "फसल की अवस्था जांचें। यदि फसल पकने वाली है, तो कुछ न करें। यदि पौधा छोटा है, तो दवा सोचें।",
            doctor_advice: "यदि छोटे पौधों में 50% से अधिक पत्तियां प्रभावित हों तो सलाह लें।",
            precautions: ["प्रतिरोधी किस्में लगाएं", "जल्दी बुवाई करें"],
            treatments: [
                { type: "सांस्कृतिक", desc: "शुरुआती रोपण से बचें।", icon: Sun },
                { type: "रासायनिक", desc: "एज़ोक्सीस्ट्रोबिन कवकनाशी।", icon: Droplet }
            ]
        },
        kn: {
            disease: "ಜೋಳದ ತುಕ್ಕು ರೋಗ",
            description: "ಎಲೆಗಳ ಮೇಲೆ ಕೆಂಪು ಬಣ್ಣದ ಇಟ್ಟಿಗೆಯಂತಹ ಗುಳ್ಳೆಗಳು. ಶಿಲೀಂಧ್ರದಿಂದ ಉಂಟಾಗುತ್ತದೆ.",
            harmful_effect: "ಗಿಡದ ಬೆಳವಣಿಗೆಯನ್ನು ಕುಂಠಿತಗೊಳಿಸುತ್ತದೆ. ಕಾಳುಗಳು ಸರಿಯಾಗಿ ತುಂಬುವುದಿಲ್ಲ.",
            economic_impact: "ಮಧ್ಯಮ ಪರಿಣಾಮ: ಸಾಮಾನ್ಯವಾಗಿ <10% ನಷ್ಟವಾಗುತ್ತದೆ.",
            immediate_action: "ಬೆಳೆಯ ಹಂತವನ್ನು ಪರಿಶೀಲಿಸಿ. ಅದು ಪಕ್ವವಾಗುತ್ತಿದ್ದರೆ ಕ್ರಮ ಅಗತ್ಯವಿಲ್ಲ.",
            doctor_advice: "ಎಳೆಯ ಗಿಡಗಳಲ್ಲಿ ರೋಗ ತೀವ್ರವಾಗಿದ್ದರೆ ತಜ್ಞರನ್ನು ಕೇಳಿ.",
            precautions: ["ರೋಗ ನಿರೋಧಕ ತಳಿ ಬಳಸಿ", "ಬೇಗ ಬಿತ್ತನೆ ಮಾಡಿ"],
            treatments: [
                { type: "ಸಾಂಸ್ಕೃತಿಕ", desc: "ಬೇಗನೆ ನಾಟಿ ಮಾಡಿ.", icon: Sun },
                { type: "ರಾಸಾಯನಿಕ", desc: "ಸೂಕ್ತ ಶಿಲೀಂಧ್ರನಾಶಕ ಬಳಸಿ.", icon: Droplet }
            ]
        }
    },

    // 4. Grape Black Rot
    'grape_black_rot': {
        en: {
            disease: "Grape Black Rot",
            description: "Fungal disease causing brown circular lesions on leaves. Infected berries shrivel into hard, black mummies.",
            harmful_effect: "Directly attacks the fruit (grapes), rendering them unusable. Can destroy an entire harvest if climatic conditions favor the fungus.",
            economic_impact: "Severe Impact: 50-80% crop loss possible in warm, humid seasons without control.",
            immediate_action: "Remove all 'mummified' berries remaining on the vine from the previous season. Prune vines to increase airflow.",
            doctor_advice: "Consult for a strict spray schedule from bud break to veraison.",
            precautions: ["Remove mummified berries", "Prune for air circulation"],
            treatments: [
                { type: "Spray", desc: "Captan or Myclobutanil sprays.", icon: Droplet },
                { type: "Cultural", desc: "Keep canopy open for sunlight.", icon: Sun }
            ]
        },
        hi: {
            disease: "अंगूर का ब्लैक रॉट",
            description: "पत्तियों पर भूरे गोल घाव। संक्रमित अंगूर सख्त होकर काले और सूखे (ममी) बन जाते हैं।",
            harmful_effect: "यह सीधे फलों पर हमला करता है, जिससे वे खाने योग्य नहीं रहते। गर्म और नम मौसम में पूरी फसल नष्ट हो सकती है।",
            economic_impact: "गंभीर प्रभाव: बिना नियंत्रण के 50-80% फसल का नुकसान हो सकता है।",
            immediate_action: "बेल पर बचे हुए सभी सूखे/काले अंगूरों को हटा दें। हवा के लिए लताओं की छंटाई (pruning) करें।",
            doctor_advice: "बड ब्रेक से लेकर फलों के पकने तक स्प्रे शेड्यूल के लिए सलाह लें।",
            precautions: ["सूखे फलों को हटाएं", "हवा के लिए छंटाई करें"],
            treatments: [
                { type: "छिड़काव", desc: "कैप्टन या माइक्लोबुटानिल।", icon: Droplet },
                { type: "सांस्कृतिक", desc: "धूप आने दें।", icon: Sun }
            ]
        },
        kn: {
            disease: "ದ್ರಾಕ್ಷಿ ಕಪ್ಪು ಕೊಳೆತ",
            description: "ಎಲೆಗಳ ಮೇಲೆ ಕಂದು ಕಲೆಗಳು; ಹಣ್ಣುಗಳು ಕಪ್ಪಾಗಿ ಒಣಗಿ ಕಲ್ಲಾಗುತ್ತವೆ.",
            harmful_effect: "ಹಣ್ಣುಗಳನ್ನು ನೇರವಾಗಿ ಹಾಳುಮಾಡುತ್ತದೆ. ಇಡೀ ಬೆಳೆ ನಾಶವಾಗಬಹುದು.",
            economic_impact: "ಗಂಭೀರ ಪರಿಣಾಮ: 50-80% ಬೆಳೆ ನಷ್ಟವಾಗಬಹುದು.",
            immediate_action: "ಒಣಗಿದ ಹಣ್ಣುಗಳನ್ನು ಬಳ್ಳಿಯಿಂದ ತೆಗೆದುಹಾಕಿ. ಗಾಳಿಯಾಡಲು ಬಳ್ಳಿಗಳನ್ನು ಕತ್ತರಿಸಿ.",
            doctor_advice: "ಔಷಧಿ ಸಿಂಪಡಣೆ ವೇಳಾಪಟ್ಟಿಗಾಗಿ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
            precautions: ["ಒಣಗಿದ ಹಣ್ಣು ತೆಗೆಯಿರಿ", "ಗಾಳಿಯಾಡಲು ಅವಕಾಶ ನೀಡಿ"],
            treatments: [
                { type: "ಸಿಂಪಡಣೆ", desc: "ಸೂಕ್ತ ರಾಸಾಯನಿಕ ಬಳಸಿ.", icon: Droplet },
                { type: "ಸಾಂಸ್ಕೃತಿಕ", desc: "ಬಿಸಿಲು ಬೀಳುವಂತೆ ಮಾಡಿ.", icon: Sun }
            ]
        }
    },

    // 5. Healthy
    'healthy': {
        en: {
            disease: "Healthy Plant",
            description: "Your plant looks vibrant and disease-free! The leaves are green and show no signs of distress or infection.",
            harmful_effect: "None. The plant is thriving.",
            economic_impact: "Positive: Healthy plants lead to maximum potential yield and highest market value.",
            immediate_action: "Maintain current care routine. Ensure consistent watering and periodic soil testing.",
            doctor_advice: "No need to consult. Keep up the good work!",
            precautions: ["Regular watering", "Monitor for pests", "Add compost"],
            treatments: [
                { type: "Care", desc: "Continue regular maintenance.", icon: CheckCircle },
                { type: "Boost", desc: "Use organic fertilizer for growth.", icon: Sprout }
            ]
        },
        hi: {
            disease: "स्वस्थ पौधा",
            description: "आपका पौधा स्वस्थ और रोगमुक्त दिख रहा है! पत्तियां हरी हैं और कोई संक्रमण नहीं है।",
            harmful_effect: "कोई नहीं। पौधा फल-फूल रहा है।",
            economic_impact: "सकारात्मक: स्वस्थ पौधों से अधिकतम उत्पादन और उच्च बाजार मूल्य मिलता है।",
            immediate_action: "वर्तमान देखभाल जारी रखें। नियमित सिंचाई और समय-समय पर मिट्टी की जांच करें।",
            doctor_advice: "सलाह लेने की आवश्यकता नहीं है। बहुत अच्छा काम कर रहे हैं!",
            precautions: ["नियमित सिंचाई", "कीड़ों की जांच", "खाद डालें"],
            treatments: [
                { type: "देखभाल", desc: "नियमित देखभाल जारी रखें।", icon: CheckCircle },
                { type: "पोषण", desc: "जैविक खाद का प्रयोग करें।", icon: Sprout }
            ]
        },
        kn: {
            disease: "ಆರೋಗ್ಯಕರ ಗಿಡ",
            description: "ನಿಮ್ಮ ಗಿಡ ಆರೋಗ್ಯಕರವಾಗಿದೆ! ಎಲೆಗಳು ಹಸಿರಾಗಿವೆ.",
            harmful_effect: "ಯಾವುದೂ ಇಲ್ಲ.",
            economic_impact: "ಧನಾತ್ಮಕ: ಉತ್ತಮ ಇಳುವರಿ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಸಿಗುತ್ತದೆ.",
            immediate_action: "ಈಗಿನ ಆರೈಕೆಯನ್ನು ಮುಂದುವರಿಸಿ. ನೀರು ಮತ್ತು ಗೊಬ್ಬರ ಹಾಕಿ.",
            doctor_advice: "ಸಲಹೆ ಅಗತ್ಯವಿಲ್ಲ.",
            precautions: ["ನಿಯಮಿತ ನೀರು", "ಕೀಟಗಳ ಪರಿಶೀಲನೆ", "ಗೊಬ್ಬರ ಹಾಕಿ"],
            treatments: [
                { type: "ಆರೈಕೆ", desc: "ಆರೈಕೆ ಮುಂದುವರಿಸಿ.", icon: CheckCircle },
                { type: "ಪೋಷಣೆ", desc: "ಸಾವಯವ ಗೊಬ್ಬರ ಬಳಸಿ.", icon: Sprout }
            ]
        }
    },

    // ── NEW PlantVillage diseases (38-class model support) ──────────────────
    'tomato_late_blight': {
        en: { disease: "Tomato Late Blight", description: "Caused by Phytophthora infestans. Water-soaked spots turn brown-black with white mould on undersides in humid weather.", harmful_effect: "Destroys foliage rapidly. Can wipe out entire crop within days.", economic_impact: "Critical: 70–100% crop loss if untreated.", immediate_action: "Remove all infected tissue immediately. Stop overhead irrigation. Apply fungicide within 24 hours.", doctor_advice: "Urgent: Contact an extension officer immediately.", precautions: ["Avoid overhead watering", "Use certified seedlings", "Destroy crop residue after harvest"], treatments: [{ type: "Preventive", desc: "Metalaxyl+Mancozeb before rains.", icon: Shield }, { type: "Curative", desc: "Cymoxanil 8%+Mancozeb 64% WP @ 2g/liter.", icon: Droplet }] },
        hi: { disease: "टमाटर का पछेती झुलसा", description: "पत्तियों पर काले धब्बे, नमी में सफेद फफूंद।", harmful_effect: "पूरी फसल तेजी से नष्ट।", economic_impact: "गंभीर: 70-100% हानि।", immediate_action: "संक्रमित पौधे हटाएं और कवकनाशी छिड़कें।", doctor_advice: "तुरंत कृषि अधिकारी से संपर्क करें।", precautions: ["ऊपर से सिंचाई न करें"], treatments: [{ type: "रासायनिक", desc: "मेटालेक्सिल+मैंकोजेब।", icon: Droplet }] },
        kn: { disease: "ಟೊಮೆಟೊ ತಡ ರೋಗ", description: "ಕಪ್ಪು ಕಲೆ, ತೇವದಲ್ಲಿ ಬಿಳಿ ಶಿಲೀಂಧ್ರ.", harmful_effect: "ಇಡೀ ಬೆಳೆ ನಾಶ.", economic_impact: "70-100% ನಷ್ಟ.", immediate_action: "ರೋಗ ಗಿಡ ತೆಗೆಯಿರಿ.", doctor_advice: "ತಕ್ಷಣ ತಜ್ಞರನ್ನು ಕರೆಯಿರಿ.", precautions: ["ಮೇಲಿನಿಂದ ನೀರು ಕೊಡಬೇಡಿ"], treatments: [{ type: "ರಾಸಾಯನಿಕ", desc: "ಮೆಟಲಾಕ್ಸಿಲ್ ಸಿಂಪಡಿಸಿ.", icon: Droplet }] }
    },
    'tomato_bacterial_spot': {
        en: { disease: "Tomato Bacterial Spot", description: "Caused by Xanthomonas bacteria. Small water-soaked lesions on leaves/fruits turn dark brown with yellow halos.", harmful_effect: "Premature defoliation and unmarketable fruits. 10–50% yield reduction.", economic_impact: "Moderate: 10–50% yield reduction.", immediate_action: "Remove infected leaves. Apply copper spray immediately.", doctor_advice: "Consult if >30% of leaves are affected.", precautions: ["Use certified seeds", "Avoid overhead irrigation", "Sanitize tools"], treatments: [{ type: "Copper Spray", desc: "Copper hydroxide @ 2g/litre.", icon: Shield }, { type: "Antibiotic", desc: "Streptomycin sulfate per label.", icon: Droplet }] },
        hi: { disease: "टमाटर का जीवाणु धब्बा", description: "जैंथोमोनस से छोटे काले धब्बे।", harmful_effect: "10-50% नुकसान।", economic_impact: "मध्यम।", immediate_action: "तांबा कवकनाशी छिड़कें।", doctor_advice: "30% से अधिक प्रभावित होने पर सलाह लें।", precautions: ["प्रमाणित बीज लगाएं"], treatments: [{ type: "तांबा", desc: "कॉपर हाइड्रोक्साइड @ 2g/लीटर।", icon: Shield }] },
        kn: { disease: "ಟೊಮೆಟೊ ಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಕಲೆ", description: "ಕ್ಸ್ಯಾಂಥೊಮೊನಾಸ್‌ನಿಂದ ಕಪ್ಪು ಕಲೆ.", harmful_effect: "10-50% ನಷ್ಟ.", economic_impact: "ಮಧ್ಯಮ.", immediate_action: "ತಾಮ್ರ ಸಿಂಪಡಿಸಿ.", doctor_advice: "30% ಮೀರಿದರೆ ತಜ್ಞರ ಸಲಹೆ.", precautions: ["ಒಳ್ಳೆ ಬೀಜ ಬಳಸಿ"], treatments: [{ type: "ತಾಮ್ರ", desc: "ಕಾಪರ್ ಹೈಡ್ರಾಕ್ಸೈಡ್ @ 2g/ಲೀ.", icon: Shield }] }
    },
    'tomato_leaf_mold': {
        en: { disease: "Tomato Leaf Mold", description: "Caused by Passalora fulva. Yellow patches on upper leaf, olive-green velvety mold on undersides.", harmful_effect: "Leaves curl and die. 10–30% yield loss.", economic_impact: "10–30% yield loss, worse in greenhouses.", immediate_action: "Improve airflow by pruning. Apply fungicide.", doctor_advice: "Recommend resistant varieties if recurring.", precautions: ["Improve plant spacing", "Avoid wetting leaves"], treatments: [{ type: "Organic", desc: "Copper spray or Trichoderma viride.", icon: Sprout }, { type: "Chemical", desc: "Thiram or Chlorothalonil.", icon: Droplet }] },
        hi: { disease: "टमाटर का पत्ती फफूंद", description: "पत्तियों के ऊपर पीले और नीचे जैतून फफूंद।", harmful_effect: "10-30% नुकसान।", economic_impact: "मध्यम।", immediate_action: "हवा बढ़ाएं और कवकनाशी लगाएं।", doctor_advice: "प्रतिरोधी किस्में अपनाएं।", precautions: ["पौधों के बीच दूरी रखें"], treatments: [{ type: "रासायनिक", desc: "थिरम या क्लोरोथलोनिल।", icon: Droplet }] },
        kn: { disease: "ಟೊಮೆಟೊ ಎಲೆ ಶಿಲೀಂಧ್ರ", description: "ಮೇಲೆ ಹಳದಿ, ಕೆಳಗೆ ಹಸಿರು ಶಿಲೀಂಧ್ರ.", harmful_effect: "10-30% ನಷ್ಟ.", economic_impact: "ಮಧ್ಯಮ.", immediate_action: "ಗಾಳಿ ಸಂಚಾರ ಸುಧಾರಿಸಿ.", doctor_advice: "ನಿರೋಧಕ ತಳಿ ಬಳಸಿ.", precautions: ["ಎಲೆ ಒದ್ದೆ ಆಗದಂತೆ ನೋಡಿ"], treatments: [{ type: "ರಾಸಾಯನಿಕ", desc: "ಥಿರಾಮ್ ಸಿಂಪಡಿಸಿ.", icon: Droplet }] }
    },
    'tomato_septoria': {
        en: { disease: "Tomato Septoria Leaf Spot", description: "Caused by Septoria lycopersici. Small circular spots with dark borders and light centers on lower leaves first.", harmful_effect: "Severe defoliation, fruit sunscald. 20–40% yield loss.", economic_impact: "Moderate: 20–40%.", immediate_action: "Remove infected lower leaves. Apply fungicide at first sign.", doctor_advice: "Weekly fungicide program if >15% leaves affected.", precautions: ["Crop rotation", "Remove crop debris", "Stake plants"], treatments: [{ type: "Organic", desc: "Copper fungicide every 7–10 days.", icon: Sprout }, { type: "Chemical", desc: "Chlorothalonil or Mancozeb 75 WP.", icon: Droplet }] },
        hi: { disease: "टमाटर का सेप्टोरिया धब्बा", description: "निचली पत्तियों पर गोल धब्बे।", harmful_effect: "20-40% नुकसान।", economic_impact: "मध्यम।", immediate_action: "संक्रमित पत्तियाँ हटाएं।", doctor_advice: "साप्ताहिक कवकनाशी।", precautions: ["फसल चक्र अपनाएं"], treatments: [{ type: "रासायनिक", desc: "मैंकोजेब 75 WP।", icon: Droplet }] },
        kn: { disease: "ಟೊಮೆಟೊ ಸೆಪ್ಟೋರಿಯಾ ಕಲೆ", description: "ಕೆಳ ಎಲೆ ಮೇಲೆ ಗೋಲ ಕಲೆ.", harmful_effect: "20-40% ನಷ್ಟ.", economic_impact: "ಮಧ್ಯಮ.", immediate_action: "ಸೋಂಕಿತ ಎಲೆ ತೆಗೆಯಿರಿ.", doctor_advice: "ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಿಸಿ.", precautions: ["ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ"], treatments: [{ type: "ರಾಸಾಯನಿಕ", desc: "ಮ್ಯಾಂಕೋಜೆಬ್.", icon: Droplet }] }
    },
    'tomato_spider_mites': {
        en: { disease: "Tomato Spider Mites", description: "Tetranychus urticae mite infestation. Fine webbing on leaf undersides with yellow stippling on surfaces.", harmful_effect: "Leaves bronze and drop. 30–60% yield loss in hot/dry seasons.", economic_impact: "High in hot/dry seasons.", immediate_action: "Spray water forcefully on leaf undersides. Apply miticide or neem oil.", doctor_advice: "Consult if mites spread to >20% canopy.", precautions: ["Avoid excess nitrogen", "Increase humidity by mulching"], treatments: [{ type: "Organic", desc: "Neem oil + soap on undersides.", icon: Sprout }, { type: "Chemical", desc: "Abamectin or Spiromesifen miticide.", icon: Droplet }] },
        hi: { disease: "टमाटर का मकड़ी कीट", description: "पत्तियों पर महीन जाला और पीले धब्बे।", harmful_effect: "30-60% नुकसान।", economic_impact: "उच्च।", immediate_action: "जोरदार पानी छिड़कें।", doctor_advice: "माइटीसाइड लगाएं।", precautions: ["नीम तेल नियमित लगाएं"], treatments: [{ type: "जैविक", desc: "नीम तेल + साबुन।", icon: Sprout }] },
        kn: { disease: "ಟೊಮೆಟೊ ಸ್ಪೈಡರ್ ಮೈಟ್", description: "ಎಲೆ ಕೆಳಗೆ ಜಾಲ ಮತ್ತು ಹಳದಿ ಚುಕ್ಕೆ.", harmful_effect: "30-60% ನಷ್ಟ.", economic_impact: "ಹೆಚ್ಚಿನ.", immediate_action: "ನೀರು ಜೋರಾಗಿ ಸಿಂಪಡಿಸಿ.", doctor_advice: "ಮೈಟ್ ನಾಶಕ ಬಳಸಿ.", precautions: ["ಬೇವು ಎಣ್ಣೆ ಬಳಸಿ"], treatments: [{ type: "ಸಾವಯವ", desc: "ಬೇವು ಎಣ್ಣೆ + ಸೋಪ್.", icon: Sprout }] }
    },
    'tomato_target_spot': {
        en: { disease: "Tomato Target Spot", description: "Caused by Corynespora cassiicola. Large brown target-like lesions on leaves, stems and fruits.", harmful_effect: "Leaf drop reduces photosynthesis. Fruit lesions are unmarketable.", economic_impact: "15–45% yield loss.", immediate_action: "Remove infected parts. Apply fungicide.", doctor_advice: "Preventive fungicide in high-risk humid seasons.", precautions: ["Well-drained soil", "Wide crop spacing", "Avoid evening watering"], treatments: [{ type: "Preventive", desc: "Copper fungicide every 10–14 days.", icon: Shield }, { type: "Curative", desc: "Azoxystrobin or Difenoconazole.", icon: Droplet }] },
        hi: { disease: "टमाटर का टार्गेट धब्बा", description: "बड़े गोल भूरे धब्बे।", harmful_effect: "15-45% नुकसान।", economic_impact: "मध्यम-उच्च।", immediate_action: "संक्रमित हिस्से हटाएं।", doctor_advice: "नम मौसम में निवारक छिड़काव।", precautions: ["अच्छी नालियां बनाएं"], treatments: [{ type: "रासायनिक", desc: "एज़ोक्सीस्ट्रोबिन।", icon: Droplet }] },
        kn: { disease: "ಟೊಮೆಟೊ ಟಾರ್ಗೆಟ್ ಕಲೆ", description: "ಎಲೆ ಮೇಲೆ ಗೋಲ ಕಂದು ಕಲೆ.", harmful_effect: "15-45% ನಷ್ಟ.", economic_impact: "ಮಧ್ಯಮ-ಹೆಚ್ಚಿನದು.", immediate_action: "ಸೋಂಕಿತ ಭಾಗ ತೆಗೆಯಿರಿ.", doctor_advice: "ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಿಸಿ.", precautions: ["ಒಳ್ಳೆ ಬಸಿಗಾಲು ಜಮೀನು"], treatments: [{ type: "ರಾಸಾಯನಿಕ", desc: "ಅಜೋಕ್ಸಿಸ್ಟ್ರೋಬಿನ್.", icon: Droplet }] }
    },
    'tomato_yellow_curl': {
        en: { disease: "Tomato Yellow Leaf Curl Virus", description: "Viral disease spread by whiteflies. Young leaves curl upward and turn yellow. Severe plant stunting.", harmful_effect: "50–100% yield loss if infected early in season.", economic_impact: "Devastating: 50–100% crop loss.", immediate_action: "Destroy infected plants. Control whitefly aggressively.", doctor_advice: "Urgent: Consult immediately — resistant varieties are the only long-term solution.", precautions: ["Use whitefly-proof nets", "Plant resistant varieties", "Install yellow sticky traps"], treatments: [{ type: "Insecticide", desc: "Imidacloprid or Thiamethoxam to kill whiteflies.", icon: AlertOctagon }, { type: "Remove", desc: "Uproot and burn infected plants.", icon: X }] },
        hi: { disease: "टमाटर का पीला पत्ती मुड़ना वायरस", description: "सफेद मक्खी से फैलता है। पत्तियाँ पीली और मुड़ी।", harmful_effect: "50-100% फसल नष्ट।", economic_impact: "विनाशकारी।", immediate_action: "सफेद मक्खी नियंत्रित करें।", doctor_advice: "तुरंत सलाह लें।", precautions: ["प्रतिरोधी किस्में लगाएं"], treatments: [{ type: "कीटनाशक", desc: "इमिडाक्लोप्रिड।", icon: AlertOctagon }] },
        kn: { disease: "ಟೊಮೆಟೊ ಹಳದಿ ಸುರುಳಿ ವೈರಸ್", description: "ಬಿಳಿ ನೊಣದಿಂದ ಎಲೆ ಹಳದಿ.", harmful_effect: "50-100% ನಷ್ಟ.", economic_impact: "ವಿನಾಶಕಾರಿ.", immediate_action: "ಸೋಂಕಿತ ಗಿಡ ಕಿತ್ತು ಸುಡಿ.", doctor_advice: "ತಕ್ಷಣ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ.", precautions: ["ನಿರೋಧಕ ತಳಿ ಬಳಸಿ"], treatments: [{ type: "ಕೀಟನಾಶಕ", desc: "ಇಮಿಡಾಕ್ಲೋಪ್ರಿಡ್.", icon: AlertOctagon }] }
    },
    'tomato_mosaic_virus': {
        en: { disease: "Tomato Mosaic Virus", description: "Highly contagious viral disease spread by contact and aphids. Leaves show mosaic pattern of light/dark green patches.", harmful_effect: "Stunts growth, distorts leaves and fruits. 20–50% yield loss.", economic_impact: "Moderate–High: 20–50% yield loss.", immediate_action: "Remove infected plants. Disinfect all tools with 10% bleach.", doctor_advice: "Consult for seed treatment and resistant variety options.", precautions: ["Virus-free certified seeds", "Control aphids", "Disinfect tools frequently"], treatments: [{ type: "Prevention", desc: "No chemical cure exists — prevention is key.", icon: Shield }, { type: "Remove", desc: "Remove infected plants and apply insecticide for aphids.", icon: X }] },
        hi: { disease: "टमाटर का मोज़ेक वायरस", description: "स्पर्श और एफिड से फैलता है।", harmful_effect: "20-50% नुकसान।", economic_impact: "मध्यम-उच्च।", immediate_action: "संक्रमित पौधे हटाएं, औजार साफ करें।", doctor_advice: "प्रतिरोधी किस्में अपनाएं।", precautions: ["प्रमाणित बीज लगाएं"], treatments: [{ type: "रोकथाम", desc: "कोई रासायनिक इलाज नहीं।", icon: Shield }] },
        kn: { disease: "ಟೊಮೆಟೊ ಮೊಸಾಯಿಕ್ ವೈರಸ್", description: "ಸ್ಪರ್ಶ ಮತ್ತು ಕೀಟದಿಂದ ಹರಡುತ್ತದೆ.", harmful_effect: "20-50% ನಷ್ಟ.", economic_impact: "ಮಧ್ಯಮ.", immediate_action: "ಸೋಂಕಿತ ಗಿಡ ತೆಗೆಯಿರಿ.", doctor_advice: "ನಿರೋಧಕ ತಳಿ ಬಳಸಿ.", precautions: ["ಒಳ್ಳೆ ಬೀಜ ಬಳಸಿ"], treatments: [{ type: "ತಡೆ", desc: "ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸೆ ಇಲ್ಲ.", icon: Shield }] }
    },
    'potato_early_blight': {
        en: { disease: "Potato Early Blight", description: "Caused by Alternaria solani. Dark brown target-like spots with yellow halos on older leaves.", harmful_effect: "Reduces photosynthesis and results in smaller tubers.", economic_impact: "Moderate: 10–30% yield loss.", immediate_action: "Remove infected leaves. Apply Mancozeb spray.", doctor_advice: "Begin weekly sprays at first sign.", precautions: ["Crop rotation", "Certified seed tubers", "Destroy crop debris"], treatments: [{ type: "Fungicide", desc: "Mancozeb 75% WP @ 2g/litre.", icon: Droplet }, { type: "Organic", desc: "Copper-based fungicide spray.", icon: Sprout }] },
        hi: { disease: "आलू का अगेती झुलसा", description: "पुरानी पत्तियों पर निशाना जैसे काले धब्बे।", harmful_effect: "कंद छोटे रह जाते हैं।", economic_impact: "10-30% नुकसान।", immediate_action: "मैंकोजेब छिड़कें।", doctor_advice: "साप्ताहिक छिड़काव।", precautions: ["फसल चक्र"], treatments: [{ type: "रासायनिक", desc: "मैंकोजेब 75%।", icon: Droplet }] },
        kn: { disease: "ಆಲೂಗಡ್ಡೆ ಮುಂಚಿನ ರೋಗ", description: "ಹಳೆ ಎಲೆ ಮೇಲೆ ಕಪ್ಪು ಕಲೆ.", harmful_effect: "ಗಡ್ಡೆ ಚಿಕ್ಕದು.", economic_impact: "10-30% ನಷ್ಟ.", immediate_action: "ಮ್ಯಾಂಕೋಜೆಬ್ ಸಿಂಪಡಿಸಿ.", doctor_advice: "ವಾರಕ್ಕೊಮ್ಮೆ ಸಿಂಪಡಿಸಿ.", precautions: ["ಬೆಳೆ ಪರಿವರ್ತನೆ"], treatments: [{ type: "ರಾಸಾಯನಿಕ", desc: "ಮ್ಯಾಂಕೋಜೆಬ್.", icon: Droplet }] }
    },
    'corn_gray_leaf_spot': {
        en: { disease: "Corn Gray Leaf Spot", description: "Caused by Cercospora zeae-maydis. Long rectangular gray-to-tan lesions parallel to leaf veins.", harmful_effect: "15–50% yield loss in severe years.", economic_impact: "Moderate–High.", immediate_action: "Apply fungicide before tasseling.", doctor_advice: "Consult for hybrid resistance ratings.", precautions: ["Plant resistant hybrids", "Reduce crop residue", "Avoid night irrigation"], treatments: [{ type: "Fungicide", desc: "Pyraclostrobin or Azoxystrobin at VT/R1.", icon: Droplet }, { type: "Cultural", desc: "Crop rotation and tillage.", icon: Sun }] },
        hi: { disease: "मक्का का ग्रे पत्ती धब्बा", description: "लंबे भूरे धब्बे पत्तियों पर।", harmful_effect: "15-50% नुकसान।", economic_impact: "मध्यम-उच्च।", immediate_action: "कवकनाशी छिड़कें।", doctor_advice: "प्रतिरोधी किस्में।", precautions: ["रात में सिंचाई न करें"], treatments: [{ type: "रासायनिक", desc: "पायराक्लोस्ट्रोबिन।", icon: Droplet }] },
        kn: { disease: "ಮೆಕ್ಕೆ ಜೋಳ ಬೂದು ಕಲೆ", description: "ಎಲೆ ಮೇಲೆ ಉದ್ದ ಬೂದು ಗೆರೆ.", harmful_effect: "15-50% ನಷ್ಟ.", economic_impact: "ಮಧ್ಯಮ-ಹೆಚ್ಚಿನದು.", immediate_action: "ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಿಸಿ.", doctor_advice: "ನಿರೋಧಕ ತಳಿ ಬಳಸಿ.", precautions: ["ರಾತ್ರಿ ನೀರು ಕೊಡಬೇಡಿ"], treatments: [{ type: "ರಾಸಾಯನಿಕ", desc: "ಅಜೋಕ್ಸಿಸ್ಟ್ರೋಬಿನ್.", icon: Droplet }] }
    },
    'corn_northern_blight': {
        en: { disease: "Corn Northern Leaf Blight", description: "Caused by Exserohilum turcicum. Cigar-shaped gray-green lesions 2.5–15cm on lower leaves moving upward.", harmful_effect: "30–50% yield loss when infection occurs before silking.", economic_impact: "Moderate–High.", immediate_action: "Apply fungicide if lesions appear before tasseling.", doctor_advice: "Consult for fungicide resistance management.", precautions: ["Plant resistant varieties", "Crop rotation", "Avoid dense planting"], treatments: [{ type: "Fungicide", desc: "Triazole or strobilurin fungicide at VT stage.", icon: Droplet }, { type: "Resistant Varieties", desc: "Choose hybrids with NLB resistance.", icon: Shield }] },
        hi: { disease: "मक्का का उत्तरी पत्ती झुलसा", description: "लंबे सिगार जैसे धब्बे।", harmful_effect: "30-50% नुकसान।", economic_impact: "उच्च।", immediate_action: "कवकनाशी छिड़कें।", doctor_advice: "प्रतिरोधी किस्में।", precautions: ["घनी बुवाई न करें"], treatments: [{ type: "रासायनिक", desc: "ट्राइज़ोल कवकनाशी।", icon: Droplet }] },
        kn: { disease: "ಮೆಕ್ಕೆ ಉತ್ತರ ಎಲೆ ರೋಗ", description: "ಉದ್ದ ಕಲೆ ಕೆಳ ಎಲೆ.", harmful_effect: "30-50% ನಷ್ಟ.", economic_impact: "ಹೆಚ್ಚಿನ.", immediate_action: "ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಿಸಿ.", doctor_advice: "ನಿರೋಧಕ ತಳಿ.", precautions: ["ದಟ್ಟ ಬಿತ್ತನೆ ಬೇಡ"], treatments: [{ type: "ರಾಸಾಯನಿಕ", desc: "ಟ್ರಯಾಜೋಲ್.", icon: Droplet }] }
    },
    'grape_esca': {
        en: { disease: "Grape Esca (Black Measles)", description: "Complex fungal disease causing tiger-stripe pattern on leaves. Berries develop dark spots and shrivel.", harmful_effect: "Progressive vine decline over years. Entire vine can die acutely.", economic_impact: "10–15% of vineyards lost annually in endemic areas.", immediate_action: "Remove infected canes. Apply wound sealant. Do not stress vines.", doctor_advice: "Consult urgently — no fully effective cure exists.", precautions: ["Prune in dry weather", "Seal all pruning wounds"], treatments: [{ type: "Fungicide", desc: "Thiophanate-methyl on pruning wounds.", icon: Shield }, { type: "Surgery", desc: "Remove infected wood to healthy tissue.", icon: Hammer }] },
        hi: { disease: "अंगूर का एस्का रोग", description: "बाघ-धारी पैटर्न पत्तियों पर।", harmful_effect: "बेल कई वर्षों में मर सकती है।", economic_impact: "10-15% बागान नुकसान।", immediate_action: "संक्रमित शाखाएं काटें।", doctor_advice: "तुरंत सलाह लें।", precautions: ["सूखे में छंटाई करें"], treatments: [{ type: "घाव उपचार", desc: "थायोफानेट-मेथिल।", icon: Shield }] },
        kn: { disease: "ದ್ರಾಕ್ಷಿ ಎಸ್ಕಾ ರೋಗ", description: "ಹುಲಿ ಗೆರೆ ಎಲೆ ಮೇಲೆ.", harmful_effect: "ಬಳ್ಳಿ ನಿಧಾನ ಸಾಯುತ್ತದೆ.", economic_impact: "10-15% ತೋಟ ನಷ್ಟ.", immediate_action: "ಸೋಂಕಿತ ಕೊಂಬೆ ಕಡಿಯಿರಿ.", doctor_advice: "ತಕ್ಷಣ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ.", precautions: ["ಒಣ ವಾತಾವರಣದಲ್ಲಿ ಕಡಿಯಿರಿ"], treatments: [{ type: "ರಾಸಾಯನಿಕ", desc: "ಗಾಯಕ್ಕೆ ಶಿಲೀಂಧ್ರನಾಶಕ.", icon: Shield }] }
    },
    'grape_leaf_blight': {
        en: { disease: "Grape Leaf Blight", description: "Caused by Pseudocercospora vitis. Dark brown irregular spots on older leaves causing premature drop.", harmful_effect: "Reduces sugar accumulation in fruits. Quality loss 20–40%.", economic_impact: "Moderate: Mainly a quality issue.", immediate_action: "Remove infected leaves. Apply fungicide.", doctor_advice: "Consult for optimal spray timing before harvest.", precautions: ["Open canopy for airflow", "Avoid foliage irrigation", "Destroy fallen leaves"], treatments: [{ type: "Fungicide", desc: "Captan or copper spray every 10–14 days.", icon: Droplet }, { type: "Cultural", desc: "Open canopy to improve airflow.", icon: Sun }] },
        hi: { disease: "अंगूर का पत्ती झुलसा", description: "पुरानी पत्तियों पर गहरे भूरे धब्बे।", harmful_effect: "गुणवत्ता में 20-40% कमी।", economic_impact: "मध्यम।", immediate_action: "संक्रमित पत्तियाँ हटाएं।", doctor_advice: "स्प्रे का सही समय तय करें।", precautions: ["पत्तियों पर पानी न दें"], treatments: [{ type: "रासायनिक", desc: "कैप्टन का छिड़काव।", icon: Droplet }] },
        kn: { disease: "ದ್ರಾಕ್ಷಿ ಎಲೆ ಕರಕ", description: "ಹಳೆ ಎಲೆ ಮೇಲೆ ಕಂದು ಕಲೆ.", harmful_effect: "20-40% ಗುಣಮಟ್ಟ ಇಳಿಕೆ.", economic_impact: "ಮಧ್ಯಮ.", immediate_action: "ಸೋಂಕಿತ ಎಲೆ ತೆಗೆಯಿರಿ.", doctor_advice: "ಸಿಂಪಡಣೆ ಸಮಯ ಕೇಳಿ.", precautions: ["ಎಲೆ ಒದ್ದೆ ಆಗದಂತೆ"], treatments: [{ type: "ರಾಸಾಯನಿಕ", desc: "ಕ್ಯಾಪ್ಟಾನ್.", icon: Droplet }] }
    },
    'apple_scab': {
        en: { disease: "Apple Scab", description: "Caused by Venturia inaequalis. Olive-green to black scab-like lesions on leaves and fruit surfaces.", harmful_effect: "50–80% fruit loss. Fruits develop corky scabs.", economic_impact: "High: Most economically important apple disease worldwide.", immediate_action: "Apply protective fungicide before and after rain. Remove fallen leaves.", doctor_advice: "Follow a spray calendar from dormancy break to harvest.", precautions: ["Rake and destroy fallen leaves", "Prune for open canopy", "Choose scab-resistant varieties"], treatments: [{ type: "Protectant", desc: "Captan or Ziram before rain.", icon: Shield }, { type: "Curative", desc: "Trifloxystrobin or Myclobutanil.", icon: Droplet }] },
        hi: { disease: "सेब का पपड़ी रोग", description: "पत्तियों और फलों पर पपड़ीदार धब्बे।", harmful_effect: "50-80% फल बर्बाद।", economic_impact: "उच्च।", immediate_action: "बारिश से पहले कवकनाशी लगाएं।", doctor_advice: "स्प्रे कैलेंडर अपनाएं।", precautions: ["गिरी पत्तियाँ नष्ट करें"], treatments: [{ type: "निवारक", desc: "कैप्टन बारिश से पहले।", icon: Shield }] },
        kn: { disease: "ಸೇಬು ಸ್ಕ್ಯಾಬ್", description: "ಎಲೆ ಮತ್ತು ಹಣ್ಣಿನ ಮೇಲೆ ಕಲೆ.", harmful_effect: "50-80% ಹಣ್ಣು ನಷ್ಟ.", economic_impact: "ಹೆಚ್ಚಿನ.", immediate_action: "ಮಳೆ ಮೊದಲು ಶಿಲೀಂಧ್ರನಾಶಕ.", doctor_advice: "ಸಿಂಪಡಣೆ ಕ್ಯಾಲೆಂಡರ್ ಅನುಸರಿಸಿ.", precautions: ["ಬಿದ್ದ ಎಲೆ ನಾಶ ಮಾಡಿ"], treatments: [{ type: "ರಕ್ಷಣೆ", desc: "ಕ್ಯಾಪ್ಟಾನ್ ಮಳೆ ಮೊದಲು.", icon: Shield }] }
    },
    'apple_black_rot': {
        en: { disease: "Apple Black Rot", description: "Caused by Botryosphaeria obtusa. Circular lesions with purple border on leaves. Fruits rot starting at the calyx end.", harmful_effect: "20–50% crop losses. Long-term tree weakening.", economic_impact: "Moderate–High.", immediate_action: "Remove mummified fruits and dead wood. Apply fungicide.", doctor_advice: "Prune dead wood before bud break. Seal wounds.", precautions: ["Remove mummy fruits", "Prune infected wood", "Improve orchard sanitation"], treatments: [{ type: "Fungicide", desc: "Captan or Thiram at 7–10 day intervals.", icon: Droplet }, { type: "Sanitation", desc: "Remove all infected material.", icon: X }] },
        hi: { disease: "सेब का काला सड़ांध", description: "फलों पर कैलिक्स सिरे से सड़ांध।", harmful_effect: "20-50% फसल बर्बाद।", economic_impact: "मध्यम-उच्च।", immediate_action: "मृत लकड़ी और ममी फल हटाएं।", doctor_advice: "कली फटने से पहले छंटाई।", precautions: ["बगीचे की सफाई"], treatments: [{ type: "रासायनिक", desc: "कैप्टन या थिरम।", icon: Droplet }] },
        kn: { disease: "ಸೇಬು ಕಪ್ಪು ಕೊಳೆ", description: "ಹಣ್ಣು ಕ್ಯಾಲಿಕ್ಸ್ ತುದಿಯಿಂದ ಕೊಳೆ.", harmful_effect: "20-50% ನಷ್ಟ.", economic_impact: "ಮಧ್ಯಮ-ಹೆಚ್ಚಿನದು.", immediate_action: "ಸತ್ತ ಮರ ಮತ್ತು ಹಣ್ಣು ತೆಗೆಯಿರಿ.", doctor_advice: "ಮೊಗ್ಗು ಮೊದಲು ಕಡಿಯಿರಿ.", precautions: ["ತೋಟ ಸ್ವಚ್ಛ ಇಡಿ"], treatments: [{ type: "ರಾಸಾಯನಿಕ", desc: "ಕ್ಯಾಪ್ಟಾನ್.", icon: Droplet }] }
    },
    'apple_cedar_rust': {
        en: { disease: "Apple Cedar Rust", description: "Caused by Gymnosporangium juniperi-virginianae. Bright orange spots with concentric rings on upper leaf surfaces.", harmful_effect: "15–30% defoliation. Infected fruits deformed and drop early.", economic_impact: "Moderate.", immediate_action: "Apply protectant fungicide at pink bud stage through petal fall.", doctor_advice: "Remove nearby cedar/juniper trees — they are the alternate host.", precautions: ["Remove nearby cedars", "Plant rust-resistant varieties", "Begin spray at pink bud"], treatments: [{ type: "Protectant", desc: "Myclobutanil or Mancozeb at pink bud through petal fall.", icon: Shield }, { type: "Cultural", desc: "Remove galls from cedar trees in winter.", icon: Sun }] },
        hi: { disease: "सेब का देवदार-जंग रोग", description: "पत्तियों पर चमकीले नारंगी धब्बे।", harmful_effect: "15-30% पत्तियाँ झड़ जाती हैं।", economic_impact: "मध्यम।", immediate_action: "कली अवस्था में कवकनाशी लगाएं।", doctor_advice: "पास के देवदार हटाएं।", precautions: ["प्रतिरोधी किस्में"], treatments: [{ type: "निवारक", desc: "माइक्लोबुटानिल।", icon: Shield }] },
        kn: { disease: "ಸೇಬು ದೇವದಾರ ತುಕ್ಕು", description: "ಎಲೆ ಮೇಲೆ ಕಿತ್ತಳೆ ಕಲೆ.", harmful_effect: "15-30% ಎಲೆ ಉದುರುತ್ತದೆ.", economic_impact: "ಮಧ್ಯಮ.", immediate_action: "ಮೊಗ್ಗು ಸಮಯ ಸಿಂಪಡಿಸಿ.", doctor_advice: "ಹತ್ತಿರದ ದೇವದಾರ ತೆಗೆಯಿರಿ.", precautions: ["ನಿರೋಧಕ ತಳಿ ಬಳಸಿ"], treatments: [{ type: "ರಕ್ಷಣೆ", desc: "ಮೈಕ್ಲೋಬುಟನಿಲ್.", icon: Shield }] }
    },
    'powdery_mildew': {
        en: { disease: "Powdery Mildew", description: "White powdery fungal coating on leaves, stems and fruits. Thrives in warm days and cool, humid nights.", harmful_effect: "Infected tissue distorts and dies. 15–40% yield loss.", economic_impact: "Moderate: 15–40% depending on crop.", immediate_action: "Apply sulfur-based or systemic fungicide. Improve air circulation.", doctor_advice: "Begin preventive sprays before favorable conditions.", precautions: ["Plant resistant varieties", "Avoid excess nitrogen", "Maintain good airflow"], treatments: [{ type: "Organic", desc: "Potassium bicarbonate or neem oil.", icon: Sprout }, { type: "Chemical", desc: "Thiophanate-methyl or Trifloxystrobin.", icon: Droplet }] },
        hi: { disease: "चूर्णी फफूंद", description: "पत्तियों पर सफेद पाउडर जैसी फफूंद।", harmful_effect: "15-40% नुकसान।", economic_impact: "मध्यम।", immediate_action: "सल्फर कवकनाशी लगाएं।", doctor_advice: "अनुकूल मौसम से पहले छिड़काव करें।", precautions: ["प्रतिरोधी किस्में लगाएं"], treatments: [{ type: "जैविक", desc: "नीम तेल।", icon: Sprout }] },
        kn: { disease: "ಪೌಡರಿ ಮಿಲ್ಡ್ಯೂ", description: "ಎಲೆ ಮೇಲೆ ಬಿಳಿ ಪುಡಿ ಶಿಲೀಂಧ್ರ.", harmful_effect: "15-40% ನಷ್ಟ.", economic_impact: "ಮಧ್ಯಮ.", immediate_action: "ಗಂಧಕ ಶಿಲೀಂಧ್ರನಾಶಕ.", doctor_advice: "ಅನುಕೂಲ ಮೊದಲು ಸಿಂಪಡಿಸಿ.", precautions: ["ನಿರೋಧಕ ತಳಿ ಬಳಸಿ"], treatments: [{ type: "ಸಾವಯವ", desc: "ಬೇವು ಎಣ್ಣೆ.", icon: Sprout }] }
    },
    'pepper_bacterial_spot': {
        en: { disease: "Pepper Bacterial Spot", description: "Caused by Xanthomonas bacteria. Small water-soaked spots on leaves, stems and fruits turn brown and scabby.", harmful_effect: "Defoliation and unmarketable fruits. 20–40% yield loss.", economic_impact: "Moderate.", immediate_action: "Apply copper-based bactericide spray. Avoid working in wet fields.", doctor_advice: "Use streptomycin if copper is not effective.", precautions: ["Certified disease-free seeds", "Avoid overhead irrigation", "Rotate crops"], treatments: [{ type: "Copper", desc: "Copper hydroxide @ 2g/litre every 7 days.", icon: Shield }, { type: "Antibiotic", desc: "Streptomycin sulfate per label.", icon: Droplet }] },
        hi: { disease: "मिर्च का जीवाणु धब्बा", description: "पत्तियों और फलों पर छोटे धब्बे।", harmful_effect: "20-40% नुकसान।", economic_impact: "मध्यम।", immediate_action: "तांबा कवकनाशी छिड़कें।", doctor_advice: "स्ट्रेप्टोमाइसिन प्रयोग करें।", precautions: ["प्रमाणित बीज"], treatments: [{ type: "तांबा", desc: "कॉपर हाइड्रोक्साइड @ 2g/लीटर।", icon: Shield }] },
        kn: { disease: "ಮೆಣಸು ಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಕಲೆ", description: "ಎಲೆ ಮತ್ತು ಕಾಯಿ ಮೇಲೆ ಕಲೆ.", harmful_effect: "20-40% ನಷ್ಟ.", economic_impact: "ಮಧ್ಯಮ.", immediate_action: "ತಾಮ್ರ ಸಿಂಪಡಿಸಿ.", doctor_advice: "ಸ್ಟ್ರೆಪ್ಟೊಮೈಸಿನ್ ಬಳಸಿ.", precautions: ["ಮೇಲಿನಿಂದ ನೀರು ಕೊಡಬೇಡಿ"], treatments: [{ type: "ತಾಮ್ರ", desc: "ಕಾಪರ್ ಹೈಡ್ರಾಕ್ಸೈಡ್.", icon: Shield }] }
    },
    'strawberry_leaf_scorch': {
        en: { disease: "Strawberry Leaf Scorch", description: "Caused by Diplocarpon earlianum. Small purplish-red spots on leaves that coalesce causing a scorched appearance.", harmful_effect: "Defoliation weakens plants, reducing fruit size and number.", economic_impact: "Moderate: Reduces productivity over 2–3 seasons.", immediate_action: "Remove infected leaves. Improve air circulation. Apply fungicide.", doctor_advice: "Renovate the strawberry bed after harvest if severe.", precautions: ["Renovate beds after harvest", "Avoid overhead irrigation", "Use disease-free runners"], treatments: [{ type: "Fungicide", desc: "Captan or Myclobutanil at 10-day intervals.", icon: Droplet }, { type: "Cultural", desc: "Remove old leaves and mulch after harvest.", icon: Sun }] },
        hi: { disease: "स्ट्रॉबेरी का पत्ती झुलसा", description: "पत्तियों पर बैंगनी-लाल धब्बे।", harmful_effect: "फल छोटे और कम होते हैं।", economic_impact: "मध्यम।", immediate_action: "संक्रमित पत्तियाँ हटाएं।", doctor_advice: "फसल के बाद बेड नवीनीकरण।", precautions: ["ऊपर से सिंचाई न करें"], treatments: [{ type: "रासायनिक", desc: "कैप्टन छिड़कें।", icon: Droplet }] },
        kn: { disease: "ಸ್ಟ್ರಾಬೆರಿ ಎಲೆ ಕರಕ", description: "ಎಲೆ ಮೇಲೆ ನೇರಳೆ ಕಲೆ.", harmful_effect: "ಹಣ್ಣು ಚಿಕ್ಕದು.", economic_impact: "ಮಧ್ಯಮ.", immediate_action: "ಸೋಂಕಿತ ಎಲೆ ತೆಗೆಯಿರಿ.", doctor_advice: "ಕಟಾವಿನ ನಂತರ ನವೀಕರಿಸಿ.", precautions: ["ಮೇಲಿನಿಂದ ನೀರು ಕೊಡಬೇಡಿ"], treatments: [{ type: "ರಾಸಾಯನಿಕ", desc: "ಕ್ಯಾಪ್ಟಾನ್.", icon: Droplet }] }
    },
    'orange_citrus_greening': {
        en: { disease: "Citrus Greening (Huanglongbing)", description: "Most devastating citrus disease worldwide. Bacteria spread by Asian citrus psyllid insect. No cure exists.", harmful_effect: "Trees produce small, bitter fruits and slowly die.", economic_impact: "Catastrophic: Has destroyed millions of citrus trees globally.", immediate_action: "Report to agricultural authorities IMMEDIATELY. Remove and destroy infected trees.", doctor_advice: "URGENT: Contact agriculture department — this is a notifiable disease.", precautions: ["Use psyllid-free nursery stock", "Install insect netting", "Control psyllid with insecticide"], treatments: [{ type: "URGENT", desc: "Remove and destroy infected trees — no chemical cure.", icon: AlertOctagon }, { type: "Psyllid Control", desc: "Imidacloprid soil drench to control the insect vector.", icon: X }] },
        hi: { disease: "संतरे का सिट्रस ग्रीनिंग", description: "दुनिया की सबसे खतरनाक नींबू रोग। कोई इलाज नहीं।", harmful_effect: "पेड़ धीरे-धीरे मर जाता है।", economic_impact: "विनाशकारी।", immediate_action: "तुरंत कृषि विभाग को सूचित करें।", doctor_advice: "अत्यावश्यक — तुरंत अधिकारियों को बताएं।", precautions: ["नर्सरी में जाल लगाएं"], treatments: [{ type: "अत्यावश्यक", desc: "संक्रमित पेड़ तुरंत हटाएं।", icon: AlertOctagon }] },
        kn: { disease: "ನಿಂಬೆ ಸಿಟ್ರಸ್ ಗ್ರೀನಿಂಗ್", description: "ಜಗತ್ತಿನ ಅತ್ಯಂತ ಅಪಾಯಕಾರಿ ನಿಂಬೆ ರೋಗ.", harmful_effect: "ಮರ ನಿಧಾನ ಸಾಯುತ್ತದೆ.", economic_impact: "ವಿನಾಶಕಾರಿ.", immediate_action: "ತಕ್ಷಣ ಕೃಷಿ ಇಲಾಖೆಗೆ ತಿಳಿಸಿ.", doctor_advice: "ತುರ್ತು — ಅಧಿಕಾರಿಗಳನ್ನು ಕರೆಯಿರಿ.", precautions: ["ಕೀಟ ನಿಯಂತ್ರಿಸಿ"], treatments: [{ type: "ತುರ್ತು", desc: "ಸೋಂಕಿತ ಮರ ತಕ್ಷಣ ತೆಗೆಯಿರಿ.", icon: AlertOctagon }] }
    },
    'peach_bacterial_spot': {
        en: { disease: "Peach Bacterial Spot", description: "Caused by Xanthomonas arboricola. Spots on leaves turn angular and dark. Fruits develop pits, cracks, and gummy spots.", harmful_effect: "30–60% crop losses in wet springs. Fruit is unmarketable.", economic_impact: "High: 30–60% in wet regions.", immediate_action: "Apply copper-based bactericide at petal fall and continue through summer.", doctor_advice: "Follow strict copper spray program from dormancy.", precautions: ["Plant in well-drained sites", "Avoid susceptible varieties"], treatments: [{ type: "Copper", desc: "Copper hydroxide spray through season.", icon: Shield }, { type: "Oxytetracycline", desc: "Antibiotic spray for severe outbreaks.", icon: Droplet }] },
        hi: { disease: "आड़ू का जीवाणु धब्बा", description: "पत्तियों पर काले धब्बे और फलों पर गड्ढे।", harmful_effect: "30-60% फसल बर्बाद।", economic_impact: "उच्च।", immediate_action: "पुष्पन के बाद तांबा कवकनाशी।", doctor_advice: "पूरे सीजन कॉपर स्प्रे।", precautions: ["अच्छी जल निकासी वाली जगह"], treatments: [{ type: "तांबा", desc: "कॉपर हाइड्रोक्साइड।", icon: Shield }] },
        kn: { disease: "ಪೀಚ್ ಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಕಲೆ", description: "ಎಲೆ ಮೇಲೆ ಕಪ್ಪು ಕಲೆ ಮತ್ತು ಹಣ್ಣಿನ ಮೇಲೆ ಗುಳಿ.", harmful_effect: "30-60% ನಷ್ಟ.", economic_impact: "ಹೆಚ್ಚಿನ.", immediate_action: "ಹೂ ನಂತರ ತಾಮ್ರ ಸಿಂಪಡಿಸಿ.", doctor_advice: "ಇಡೀ ಋತು ಕಾಪರ್ ಸ್ಪ್ರೇ.", precautions: ["ಬಸಿಗಾಲು ಜಾಗ ಆಯ್ಕೆ"], treatments: [{ type: "ತಾಮ್ರ", desc: "ಕಾಪರ್ ಹೈಡ್ರಾಕ್ಸೈಡ್.", icon: Shield }] }
    }
};

// Pseudo-Deterministically select a disease based on image data
export function analyzeDiseases(imageData, fileName = "") {
    const f = fileName.toLowerCase();

    // 1. Precise Keyword Matching (Simulation for Testing)
    if (f.includes('tomato') || f.includes('early')) return { key: 'tomato_early_blight', confidence: 98 };
    if (f.includes('potato') || f.includes('late')) return { key: 'potato_late_blight', confidence: 96 };
    if (f.includes('corn') || f.includes('rust')) return { key: 'corn_common_rust', confidence: 94 };
    if (f.includes('grape') || f.includes('rot')) return { key: 'grape_black_rot', confidence: 92 };
    if (f.includes('healthy')) return { key: 'healthy', confidence: 99 };

    // 1.5 Non-Plant / Invalid Image Detection (Simulation)
    if (f.includes('spiderman') || f.includes('hero') || f.includes('man') || f.includes('person') || f.includes('cat') || f.includes('dog')) {
        return { key: 'not_plant', confidence: 0 };
    }

    // 2. Fallback: Create a hash from the image string (simulate analyzing features)
    let hash = 0;
    for (let i = 0; i < imageData.length; i++) {
        hash = ((hash << 5) - hash) + imageData.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }

    // 3. Select a disease key based on the hash (Absolute value to handle negatives)
    // EXCLUDE 'healthy' from fallback to prevent false negatives on actual diseased leaves without keywords.
    const keys = Object.keys(DISEASE_DATA).filter(k => k !== 'healthy');
    const index = Math.abs(hash) % keys.length;

    return {
        key: keys[index],
        confidence: 85 + (Math.abs(hash) % 14) // Random confidence between 85% and 99%
    };
}
