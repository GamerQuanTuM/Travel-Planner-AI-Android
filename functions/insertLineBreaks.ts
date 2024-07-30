const insertLineBreaks = (text: string, maxLength: number) => {
    if (!text) return '';
    const words = text.split(' ');
    let result = '';
    let lineLength = 0;

    for (let i = 0; i < words.length; i++) {
        if (lineLength + words[i].length + 1 > maxLength) {
            result += '\n';
            lineLength = 0;
        }
        result += words[i] + ' ';
        lineLength += words[i].length + 1;
    }
    return result.trim();
};

export default insertLineBreaks