import axios from "axios";
import * as SecureStore from "expo-secure-store";

// API sunucusunun temel URL'si
export const BASE_URL = "http://192.168.1.103:3505";
// Eğer farklı bir ortamda da çalıştırıyorsanız, burada yönetebilirsiniz:
// export const BASE_URL = "https://production-blossom-app.onrender.com/";

// İstekler için zaman aşımı süresi
const TIME_OUT = 30000;

// Kullanıcı token'ını kaydetmek için kullanılan anahtar adı
export const BLOSSOM_TOKEN_NAME = "blossom_user_token";

// Axios örneği oluşturuluyor
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
});

// Secure Store'dan token kaydetme
export const saveToken = async (key, value) => {
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (error) {
        console.error("Token kaydedilirken hata oluştu", error);
        throw error;
    }
};

// Axios istek göndermeden önce çalışacak olan interceptor
axiosInstance.interceptors.request.use(async (req) => {
    try {
        const accessToken = await SecureStore.getItemAsync(BLOSSOM_TOKEN_NAME);
        if (accessToken) {
            req.headers.Authorization = `Bearer ${accessToken}`;
        }
        return req;
    } catch (error) {
        console.error("Request interceptor hatası", error);
        return req;
    }
});

// Axios ile GET isteği yapan fonksiyon
export const getRequest = async (url) => {
    try {
        const response = await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        console.error("GET isteği sırasında hata oluştu", error);
        throw error;
    }
};

// Axios ile POST isteği yapan fonksiyon
export const postRequest = async (url, data) => {
    try {
        const response = await axiosInstance.post(url, data);
        return response.data;
    } catch (error) {
        console.error("POST isteği sırasında hata oluştu", error);
        throw error;
    }
};

// Axios örneğini dışa aktar
export default axiosInstance;