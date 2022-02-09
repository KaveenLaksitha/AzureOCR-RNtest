import axios from "axios";
import { connectStorageEmulator } from "firebase/storage";
import { AZURE_KEY, AZURE_ENDPOINT } from "../config";

export const AzureOCRService = async (baseImageUrl) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": AZURE_KEY,
        },
    };
    const ImageToCovertObject = {
        url: baseImageUrl,
    };
    try {
        const response = await axios.post(
            `${AZURE_ENDPOINT}/vision/v3.0/ocr?language=unk&detectOrientation=true`,
            ImageToCovertObject,
            config
        )
        if (response.data.regions[0]?.lines) {
            return {
                ok: true, data: response.data.regions[0].lines
            };
        } else {
            throw new Error("error in ocr")
        }
    } catch (error) {
        console.error("error", error)
        return {
            ok: false, err: error
        };
    }
};