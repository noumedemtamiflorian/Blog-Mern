// Fonction utilitaire qui sélectionne les cinq premiers mots d'une chaîne de caractères
// et ajoute des points de suspension à la fin si elle est plus longue que cinq mots
export const selectFirstFiveWords = (str, nbrWords = 5) => {
    // Sépare la chaîne de caractères en un tableau de mots individuels
    const words = str.split(" ");
    // Si la chaîne de caractères a cinq mots ou moins,
    // renvoie simplement la chaîne d'origine
    if (words.length <= 5) return str;
    // Sélectionne les cinq premiers mots du tableau de mots
    const selectedWords = words.slice(0, nbrWords);
    // Rejoindre les cinq premiers mots en une chaîne de caractères
    const result = selectedWords.join(" ");
    // Ajouter des points de suspension à la fin de la chaîne résultante
    return result + " ...";
};
