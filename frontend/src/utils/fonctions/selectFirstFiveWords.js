export const selectFirstFiveWords = (str) => {
    // Sépare la chaîne de caractères en un tableau de mots en utilisant l'espace comme délimiteur
    const words = str.split(" ");

    // Sélectionne les cinq premiers mots
    const selectedWords = words.slice(0, 5);

    // Rejoindre les mots sélectionnés en une seule chaîne de caractères
    // avec des espaces entre chaque mot
    const result = selectedWords.join(" ");

    return result;
};
