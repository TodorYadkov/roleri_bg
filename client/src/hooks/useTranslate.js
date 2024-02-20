import { useLanguage } from "../context/Language.jsx";

export function useTranslate() {
    const { index } = useLanguage();

    const translatePhrase = (text) => {
        return text.split("&/&").at(index) ?? text;
    };

    const translatePhraseFn = (objectToTranslate) => Object.entries(objectToTranslate)
        .reduce((acc, [key, value]) => {
            return typeof value === "string" && value.includes("&/&")
                ? ({ ...acc, [key]: value.split("&/&").at(index) })
                : ({ ...acc, [key]: value });
        }, {});


    return { translatePhrase, translatePhraseFn }
}