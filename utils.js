import { facilities, facilities_es } from "./hotelbeds_facilities";

const translations = {};

facilities.forEach(eng => {
    const match = facilities_es.find(
        es => es.code === eng.code && es.facilityGroupCode === eng.facilityGroupCode
    );
    if (match) {
        translations[eng.description.content] = match.description.content;
    }
});

// Save to JSON file
fs.writeFileSync("translations.json", JSON.stringify(translations, null, 2), "utf-8");

console.log("✅ Translations saved to translations.json");