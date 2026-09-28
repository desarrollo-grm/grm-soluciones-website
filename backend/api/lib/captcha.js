import axios from "axios";

export async function verifyCaptcha(captchaToken) {
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPTCHA_SECRET_KEY}&response=${captchaToken}`;

    const googleRes = await axios.post(verifyUrl);
    const { success, score } = googleRes.data;

    // Decide if it's a bot (Score < 0.5 is usually a bot)
    if (!success || score < 0.5) {
        return false;
    }
    return true;
}
