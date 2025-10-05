# quote-me

A simple CLI tool for managing and storing your favorite quotes.

## Description

quote-me is a lightweight command-line interface tool that helps you collect, organize, and manage your favorite quotes. Whether you're saving inspirational quotes, memorable lines from books, or wise words from friends, quote-me provides an easy way to keep them all in one place.

## Features

- ✨ Add quotes with author attribution
- 📋 List all saved quotes
- 🗑️ Delete quotes by ID
- 💾 Export quotes to JSON format
- 🔄 Cross-platform data storage (Windows, macOS, Linux)
- 🚀 Fast and lightweight
- 📦 Simple command-line interface

## Requirements

- Node.js >= 20.0.0

## Installation

Install directly from GitHub:

```bash
npm install -g git+https://github.com/tomadojuice/quote-me.git
```

### From source (for development)

1. Clone the repository:
```bash
git clone https://github.com/tomadojuice/quote-me.git
cd quote-me
```

2. Install dependencies:
```bash
npm install
```

3. Link the package globally:
```bash
npm link
```

## Usage

### Add a quote

Add a new quote to your collection:

```bash
quote-me add "The only way to do great work is to love what you do." "Steve Jobs"
```

Short form:
```bash
quote-me a "Be yourself; everyone else is already taken." "Oscar Wilde"
```

### List all quotes

Display all your saved quotes:

```bash
quote-me list
```

Short form:
```bash
quote-me l
```

Output example:
```
[a1b2c3d4-e5f6-7890-abcd-ef1234567890] "The only way to do great work is to love what you do." - Steve Jobs (added on 2024-01-15T10:30:00.000Z)
[b2c3d4e5-f6a7-8901-bcde-f12345678901] "Be yourself; everyone else is already taken." - Oscar Wilde (added on 2024-01-15T10:31:00.000Z)
```

### Delete a quote

Remove a quote by its ID:

```bash
quote-me delete a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

Short form:
```bash
quote-me d a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

### Export to JSON

Export all quotes to a `quotes.json` file in your current directory:

```bash
quote-me json
```

This creates a JSON file with the following structure:
```json
{
  "quotes": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "quote": "The only way to do great work is to love what you do.",
      "author": "Steve Jobs",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### Display help

Get help and see all available commands:

```bash
quote-me --help
```

Check version:

```bash
quote-me --version
```

## Data Storage

quote-me stores your quotes in a JSON file located in your system's standard application data directory:

- **Windows**: `%APPDATA%\quotes\quotes.json` (typically `C:\Users\<username>\AppData\Roaming\quotes\quotes.json`)
- **macOS**: `~/Library/Application Support/quotes/quotes.json`
- **Linux**: `$XDG_DATA_HOME/quotes/quotes.json` (or `~/.local/share/quotes/quotes.json` if `XDG_DATA_HOME` is not set)

The data directory is automatically created when you first use the tool.

## Development

### Run locally

```bash
npm start -- <command> [arguments]
```

Example:
```bash
npm start -- add "Test quote" "Test Author"
```

### Project Structure

```
quote-me/
├── src/
│   └── app.js          # Main application file
├── package.json        # Project metadata and dependencies
└── README.md          # This file
```

## Technologies Used

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [lowdb](https://github.com/typicode/lowdb) - Simple local JSON database
- [Commander.js](https://github.com/tj/commander.js) - Command-line interface framework
- [uuid](https://github.com/uuidjs/uuid) - UUID generation for unique quote IDs

## License

MIT

## Author

Alessio Seeberger

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.
