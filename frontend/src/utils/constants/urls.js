// URL de base de l'API backend utilisée par l'application
export const BASE_URL = "http://localhost:5000";
// URL pour accéder à la ressource "articles" via l'API backend
export const URL_ARTICLE = BASE_URL + "/api/articles";
// URL pour accéder à la ressource "categories" via l'API backend
export const URL_CATEGORY = BASE_URL + "/api/categories";
//  URL pour l'API de Cloudinary qui sera utilisée pour
//  stocker les images téléchargées depuis l'application.
export const URL_CLOUDINARY_UPLOAD =
    "https://api.cloudinary.com/v1_1/noumedemtamiflorian/image/upload";
