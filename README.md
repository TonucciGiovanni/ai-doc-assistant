# AI Document Assistant

A modern web application that leverages AI-powered grammar and spelling corrections to enhance your documents effortlessly.

## 🎯 Overview

**AI Document Assistant** is a Next.js-powered web application that helps users improve their documents through intelligent grammar and spelling corrections. Built with React and TypeScript, it provides a seamless, interactive experience for document refinement with support for multiple file formats.

## ✨ Features

- **📄 Multi-Format Upload**: Support for `.txt`, `.docx`, and `.pdf` files
- **🔍 Grammar & Spelling Check**: Real-time corrections via LanguageTool API integration
- **✏️ Interactive Editing**: Review suggestions and accept/reject changes on a per-correction basis
- **👀 Real-time Preview**: View modifications before finalizing your document
- **⬇️ Easy Download**: Export your corrected document with a single click
- **⚡ Fast & Responsive**: Built on Next.js 15 with React 19 for optimal performance

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Next.js 15, TypeScript |
| **Styling** | Tailwind CSS |
| **State Management** | Redux Toolkit |
| **Document Processing** | FileReader API, Mammoth (DOCX), PDF.js (PDF) |
| **Grammar API** | LanguageTool API |
| **Testing** | Jest, React Testing Library |
| **Version Control** | Git & GitHub |

## 🚀 How It Works

1. **Upload Document** - Select and upload your document (TXT, DOCX, or PDF)
2. **Automatic Analysis** - LanguageTool API analyzes grammar and spelling
3. **Review Suggestions** - View all corrections with context
4. **Select Changes** - Choose which corrections to apply
5. **Preview Result** - See the final corrected document
6. **Download** - Export your improved document

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn installed

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/TonucciGiovanni/ai-doc-assistant.git
   cd ai-doc-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`

### Additional Commands

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Run tests
npm test

# Watch mode for tests
npm test:watch

# Generate coverage report
npm test:coverage
```

## 🔌 API Integration

The application integrates with the **LanguageTool API** for grammar and spelling checks.

### Example Usage

```typescript
async function checkGrammar(text: string) {
  const response = await fetch("https://api.languagetool.org/v2/check", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ 
      text: text, 
      language: "en-US" 
    }),
  });
  
  const data = await response.json();
  return data.matches; // Array of grammar/spelling issues
}
```

### API Response Example

```json
{
  "matches": [
    {
      "message": "Possible spelling mistake found",
      "offset": 0,
      "length": 5,
      "replacements": [{"value": "correct_word"}]
    }
  ]
}
```

## 📁 Project Structure

```
ai-doc-assistant/
├── app/                 # Next.js app directory
├── lib/                 # Utility functions and helpers
├── public/              # Static assets
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── jest.config.js       # Jest testing configuration
└── README.md            # This file
```

## 🔮 Future Enhancements

- 🤖 **AI-Powered Paraphrasing** - Suggest alternative phrasings
- 📊 **Document Summarization** - Auto-generate concise summaries
- 📚 **Additional Format Support** - Markdown, Google Docs, ODT
- 👥 **Real-time Collaboration** - Multi-user document editing
- 🌍 **Multi-language Support** - Extend beyond English
- 📈 **Advanced Analytics** - Writing style metrics and suggestions
- 💾 **Cloud Storage Integration** - Save and sync documents

## 📋 Requirements

### Runtime
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher (or yarn 3.6.0+)

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request with:
- Clear description of changes
- Reference to related issues
- Tests for new functionality

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Giovanni Tonucci**
- GitHub: [@TonucciGiovanni](https://github.com/TonucciGiovanni)

## 🙋 Support & Feedback

If you encounter any issues or have suggestions for improvement:
1. Check existing [Issues](https://github.com/TonucciGiovanni/ai-doc-assistant/issues)
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [LanguageTool API Docs](https://languagetool.org/http-api/)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)

---

**Last Updated**: February 2025 | **Version**: 0.1.0
