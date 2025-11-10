# Video Compression For Dummies

A simple, modern web application that compresses video files entirely in your browser—no uploads, no server, no hassle. Perfect for quickly reducing video file sizes without any technical knowledge.

## ✨ Features

- **🔒 Privacy-First**: All compression happens locally in your browser. Your videos never leave your device.
- **⚡ Client-Side Processing**: No server uploads required—everything runs in the browser using WebAssembly.
- **📊 Real-Time Progress**: Visual progress bar shows compression status in real-time.
- **💾 Size Savings Display**: See exactly how much space you saved with clear before/after comparisons.
- **🎨 Modern UI**: Clean, intuitive interface designed for general audiences—no technical jargon.
- **🌓 Dark Mode**: Built-in theme toggle for comfortable viewing in any lighting.
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm/bun
- A modern browser with WebAssembly support (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vid-compressor.git
cd vid-compressor
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

1. **Upload a Video**: Drag and drop a video file onto the page, or click to browse and select one.
2. **Automatic Compression**: The video will automatically start compressing once selected.
3. **Monitor Progress**: Watch the progress bar as your video is compressed.
4. **Download Results**: Once complete, download your compressed video and see how much space you saved.

### Supported Formats

- **Input**: MP4, MOV, AVI, WebM
- **Output**: MP4 (H.264 codec)

### File Size Limits

- Maximum file size: 500MB (configurable)

## 🛠️ Tech Stack

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[mediabunny](https://github.com/mediabunny/mediabunny)** - Client-side video compression library (WebAssembly)
- **[shadcn/ui](https://ui.shadcn.com/)** - UI component library
- **[Biome](https://biomejs.dev/)** - Linting and formatting

## 🏗️ Project Structure

```
vid-compressor/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   │   ├── file-upload/  # File upload components
│   │   ├── video-compression/  # Compression UI components
│   │   ├── layout/      # Layout components
│   │   └── ui/          # Reusable UI components
│   └── lib/             # Utilities and services
│       ├── video-compressor.ts  # Compression service
│       └── types/       # TypeScript type definitions
├── specs/               # Feature specifications and documentation
└── public/              # Static assets
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome

### Code Style

This project uses [Biome](https://biomejs.dev/) for linting and formatting. Run `npm run format` before committing.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Technical Details

### Compression Settings

The default compression configuration is optimized for maximum file size reduction while maintaining acceptable visual quality:

- **Codec**: H.264 (AVC)
- **Quality**: Medium preset
- **Processing**: Client-side using WebAssembly

### Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

### Performance

- Compression time varies based on file size and device performance
- Typical compression: 20-50% size reduction
- Processing happens entirely in the browser—no network upload required

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [mediabunny](https://github.com/mediabunny/mediabunny) for the excellent client-side video compression library
- [shadcn/ui](https://ui.shadcn.com/) for beautiful, accessible UI components
- [Next.js](https://nextjs.org/) team for the amazing framework

---

Made with ❤️ for everyone who just wants to shrink their videos without the hassle.
