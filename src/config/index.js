export const config = {
    googleCilentId:String(import.meta.env.VITE_GOOGLE_CLIENT_ID),
    googleCilentSecret:String(import.meta.env.VITE_GOOGLE_CLIENT_SECRET),
    emailjsServiceId:String(import.meta.env.VITE_EMAILJS_SERVICE_ID),
    emailjsTemplateId:String(import.meta.env.VITE_EMAILJS_TEMPLATE_ID),
    emailjsPublicKey:String(import.meta.env.VITE_EMAILJS_PUBLIC_KEY),
    emailjsTemplateSecoundId:String(import.meta.env.VITE_EMAILJS_TEMPLATE_SECOUND_ID),
    geminiApiKey:String(import.meta.env.VITE_GEMINI_API_KEY)
}