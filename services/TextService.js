
const TextService = {
    countWords: (text) => text.split(/\s+/).filter(Boolean).length,
  
    countCharacters: (text) => text.replace(/\s+/g, '').length,
  
    countSentences: (text) => text.split(/[.!?]+/).filter(Boolean).length,
  
    countParagraphs: (text) => text.split(/\n+/).filter(Boolean).length,
  
    longestWordInParagraph: (text) => {
      return text.split(/\n+/).map(paragraph => 
        paragraph.split(/\s+/).reduce((longest, word) =>
          word.length > longest.length ? word : longest, '')
      );
    },
  };
  
  module.exports = TextService;
  