const express = require('express');
const { 
    createText, 
    getWordCount, 
    getCharacterCount, 
    getSentenceCount, 
    getParagraphCount, 
    getLongestWords  
} = require('../controllers/textController');

const router = express.Router();

router.post('/text', createText);
router.get('/text/:id/words', getWordCount);
router.get('/text/:id/characters', getCharacterCount);
router.get('/text/:id/sentences', getSentenceCount);
router.get('/text/:id/paragraphs', getParagraphCount);
router.get('/text/:id/longest-words', getLongestWords);

module.exports = router;
