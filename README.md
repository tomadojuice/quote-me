# 💬 quote-me

> *Your personal quote vault in the terminal* ✨

## 🎯 What's This About?

**quote-me** is the coolest CLI tool for quote collectors! 🚀 Whether you're hoarding wisdom from ancient philosophers, stealing one-liners from your favorite movies, or saving that perfect comeback you thought of in the shower - we've got you covered! 

Turn your terminal into a treasure chest of inspiration 💎

## 🔥 Features That Slap

- ✨ **Add quotes** with author attribution (because credit matters!)
- 📋 **List all quotes** in a beautiful format
- 🗑️ **Delete quotes** when they no longer spark joy
- 💾 **Export to JSON** - backup your wisdom!
- 📥 **Import quotes** - migrate your collection like a pro
- 🌐 **Web interface** - view your quotes in style
- 🔄 **Cross-platform** storage (Windows, macOS, Linux)
- ⚡ **Lightning fast** and lightweight
- 🎨 **Clean CLI** interface that doesn't suck

## 🚀 Prerequisites

- Node.js >= 20.0.0

## 💿 Installation

### 🏷️ GitHub Package Registry (The Cool Way)

Install from GitHub's package registry! First, you'll need to set up authentication:

#### 🔑 Create a GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name like `npm-packages`
4. Select the **`read:packages`** scope (this allows reading packages)
5. Click **"Generate token"** and copy it (you won't see it again!)

#### 🚀 Configure npm and Install

Now configure npm to use GitHub registry:

```bash
# Login to GitHub registry (it will prompt for your token)
npm login --scope=@tomadojuice --registry=https://npm.pkg.github.com
```

When prompted:
- **Username:** Your GitHub username
- **Password:** Paste your personal access token (not your GitHub password!)
- **Email:** Your GitHub email

Then install the package:
```bash
npm install -g @tomadojuice/quote-me
```

> **💡 Pro tip:** The token only needs `read:packages` permission since this is a public package! 🎯

## 🎮 How to Use This Beast

### ✨ Add a Quote

Drop that wisdom into your collection:

```bash
quote-me add "The only way to do great work is to love what you do." "Steve Jobs"
```

**Lazy fingers?** Use the short form:
```bash
quote-me a "Be yourself; everyone else is already taken." "Oscar Wilde"
```

### 📋 List Your Collection

Show off your quote collection:

```bash
quote-me list
```

**Short form** (because we're all about efficiency):
```bash
quote-me l
```

**Sample output** (prepare to be amazed):
```
[a1b2c3d4-e5f6-7890-abcd-ef1234567890] "The only way to do great work is to love what you do." - Steve Jobs (added on 2024-01-15T10:30:00.000Z)
[b2c3d4e5-f6a7-8901-bcde-f12345678901] "Be yourself; everyone else is already taken." - Oscar Wilde (added on 2024-01-15T10:31:00.000Z)
```

### 🗑️ Delete a Quote

Had a change of heart? Remove quotes by ID:

```bash
quote-me delete a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

**Quick delete:**
```bash
quote-me d a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

### 💾 Export Your Wisdom

Backup your quotes to JSON (smart move!):

```bash
quote-me export
```

Creates a beautiful `quotes.json` file:
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

### 📥 Import Quotes

Got quotes from somewhere else? Import them like a pro:

```bash
quote-me import quotes.json
```

**Pro feature:** Automatically skips duplicates based on UUID! 🎯

### 🌐 Web Interface

Want to see your quotes in a browser? Fire up the web interface:

```bash
quote-me web
```

Then open your browser and enjoy the visual feast! 🍕

### 🆘 Get Help

Stuck? We got you:

```bash
quote-me --help
```

**Check your version** (flex those updates):

```bash
quote-me --version
```

## Data Storage

quote-me stores your quotes in a JSON file located in your system's standard application data directory:

- **Windows**: `%APPDATA%\quotes\quotes.json` (typically `C:\Users\<username>\AppData\Roaming\quotes\quotes.json`)
- **macOS**: `~/Library/Application Support/quotes/quotes.json`
- **Linux**: `$XDG_DATA_HOME/quotes/quotes.json` (or `~/.local/share/quotes/quotes.json` if `XDG_DATA_HOME` is not set)

The data directory is automatically created when you first use the tool.

## 🛠️ Development

### 🚀 Essential Commands

**Run CLI locally:**
```bash
npm start -- <command> [arguments]
```

Example:
```bash
npm start -- add "Test quote" "Test Author"
```

**Package for distribution:**
```bash
npm run build:package
```

### 🌐 Web Development Mode

**Development Mode:**
```bash
npm run dev:web
```

This starts the web server with `nodemon` for automatic restarts when you make changes to the server code.

**Production Mode:**
```bash
quote-me web
```

The web interface uses Express + HTMX for a simple, fast, and modern experience without the complexity of a build process.

### 📁 Project Structure

```
quote-me/
├── src/
│   ├── app.js          # Main CLI application
│   └── web/            # Express + HTMX web interface
│       ├── server.js   # Express web server
│       ├── index.html  # HTMX-powered web interface
│       └── style.css   # Styling for the web interface
├── package.json        # Main project metadata
└── README.md          # This file
```

## Technologies Used

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web application framework
- [HTMX](https://htmx.org/) - Modern HTML-driven interactivity
- [lowdb](https://github.com/typicode/lowdb) - Simple local JSON database
- [Commander.js](https://github.com/tj/commander.js) - Command-line interface framework
- [uuid](https://github.com/uuidjs/uuid) - UUID generation for unique quote IDs

## License

MIT

## Author

tomadojuice

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.
