export const selectFirstFiveWords = (str, nbrWords = 5) => {
    const words = str.split(" ");
    if (words.length <= 5) return str;
    const selectedWords = words.slice(0, nbrWords);
    const result = selectedWords.join(" ");
    return result + " ...";
};
