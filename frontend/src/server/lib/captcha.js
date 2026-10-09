import axios from "axios";

export async function verifyCaptcha(captchaToken) {
    const secret = process.env.GOOGLE_RECAPTCHA_SECRET_KEY;
    if (!secret) {
        throw new Error("GOOGLE_RECAPTCHA_SECRET_KEY is not configured in the server environment.");
    }
    const response = await axios.post("https://www.google.com/recaptcha/api/siteverify", null, {
        params: { secret, response: captchaToken },
    });
    const { success, score } = response.data;
    console.log("Captcha verification response:", response.data);
    return success === true && score >= 0.5;
}
