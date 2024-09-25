# Text Analyzer Tool

A text analyzer application built with **Node.js** and **MySQL**. The tool allows users to create, read, update, and delete text entries, and provides API endpoints to perform text analysis, including counting words, characters, sentences, paragraphs, and identifying the longest words in paragraphs.

This project follows **Test-Driven Development (TDD)** and includes comprehensive unit tests and coverage reports using **Jest** and **Supertest**.

## Features

- **Create, Read, Update, and Delete (CRUD)** text entries.
- Analyze text to:
  - Count the number of words.
  - Count the number of characters.
  - Count the number of sentences.
  - Count the number of paragraphs.
  - Identify the longest word in each paragraph.
- RESTful API.
- Input validation using **Joi**.
- Follows TDD practices with **Jest** for testing.

## API Endpoints

The following APIs are exposed:

- **POST** `/api/text`: Create a new text entry.
- **GET** `/api/text/:id/words`: Get the word count of a specific text.
- **GET** `/api/text/:id/characters`: Get the character count of a specific text.
- **GET** `/api/text/:id/sentences`: Get the sentence count of a specific text.
- **GET** `/api/text/:id/paragraphs`: Get the paragraph count of a specific text.
- **GET** `/api/text/:id/longest-words`: Get the longest word in each paragraph of a specific text.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Validation**: Joi
- **Testing**: Jest, Supertest

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14+)
- [MySQL](https://www.mysql.com/) (v5.7+)

### Steps

1. Clone the repository:

```bash
git clone https://github.com/your-username/text-analyzer.git
cd text-analyzer

2. Install dependencies:

```bash
npm install

3. Create a .env file and configure your MySQL database connection:

PORT = 3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=text_analyzer
DB_PORT=3306

4. Run Project

```bash
npm run dev

5. Testing

```bash
npm test



