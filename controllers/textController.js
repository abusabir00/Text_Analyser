const Text = require('../models/text');
const TextService = require('../services/TextService');
const Joi = require('joi');
const textSchema = Joi.object({
  text: Joi.string().min(3).max(255).required().messages({
    'string.base': `"text" should be a type of 'text'`,
    'string.empty': `"text" cannot be an empty field`,
    'string.min': `"text" should have a minimum length of {#limit}`,
    'any.required': `"text" is a required field`,
  })
});

exports.createText = async (req, res) => {
  try {
    // Validate req.body against the schema
    const { error } = textSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    // Save data to database
    const { text } = req.body;
    const data = await Text.create({ text });
    res.status(201).json(data);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.errors.map(e => e.message) });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Path: controllers/textController.js
exports.getWordCount = async (req, res) => { 
  try {
    const { id } = req.params;
    // Validate that ID is a number
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid text ID format' });
    }
    const text = await Text.findByPk(id);
    if (!text) {
      return res.status(404).json({ error: 'Text not found' });
    }
    // Calculate word count using the service
    const wordCount = TextService.countWords(text.text);
    return res.status(200).json({ wordCount });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getCharacterCount = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate that ID is a number
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid text ID format' });
    }
    const text = await Text.findByPk(id);
    if (!text) {
      return res.status(404).json({ error: 'Text not found' });
    }
    // Calculate character count using the service
    const characterCount = TextService.countCharacters(text.text);
    return res.status(200).json({ characterCount });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getSentenceCount = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate that ID is a number
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid text ID format' });
    }
    const text = await Text.findByPk(id);
    if (!text) {
      return res.status(404).json({ error: 'Text not found' });
    }
    // Calculate sentence count using the service
    const sentenceCount = TextService.countSentences(text.text);
    return res.status(200).json({ sentenceCount });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getParagraphCount = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate that ID is a number
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid text ID format' });
    }
    const text = await Text.findByPk(id);
    if (!text) {
      return res.status(404).json({ error: 'Text not found' });
    }
    // Calculate paragraph count using the service
    const paragraphCount = TextService.countParagraphs(text.text);
    return res.status(200).json({ paragraphCount });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getLongestWords = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate that ID is a number
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid text ID format' });
    }
    const text = await Text.findByPk(id);
    if (!text) {
      return res.status(404).json({ error: 'Text not found' });
    }
    // Calculate longest words in paragraph using the service
    const longestWords = TextService.longestWordInParagraph(text.text);
    return res.status(200).json({ longestWords });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}



