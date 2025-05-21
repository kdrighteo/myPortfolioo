# Portfolio Web App

A professional portfolio web application built with Next.js and Tailwind CSS to showcase projects, demos, and experience.

## Features

- 📱 Responsive design for all devices
- 🔍 SEO optimized with metadata
- 🖼️ Project gallery with filtering by category, technology, and more
- 📄 Detailed project pages with images, videos, and demos
- 💨 Fast performance with Next.js App Router
- 🎨 Beautiful UI with Tailwind CSS
- 🔄 Easily update with new projects

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later

### Installation

1. Clone the repository or download the files

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
portfolio/
├── public/              # Static assets
│   └── images/          # Project images
├── src/                 # Source code
│   ├── app/             # Next.js App Router
│   │   ├── projects/    # Projects pages
│   │   └── page.tsx     # Homepage
│   ├── components/      # Reusable components
│   ├── data/            # Project data
│   ├── lib/             # Utility functions
│   └── styles/          # Global styles
├── package.json         # Dependencies
└── tailwind.config.js   # Tailwind configuration
```

## Customization

### Adding New Projects

1. Edit `src/data/projects.ts` to add your project details
2. Add project images to `public/images/projects/`

### Updating Personal Information

- Edit the homepage content in `src/app/page.tsx`
- Update contact information in the footer component

## Deployment

This portfolio can be easily deployed to Vercel with a single click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/portfolio)

### Other Deployment Options

- **Netlify**: Connect your GitHub repository and deploy
- **GitHub Pages**: Use the `next export` command to generate static files
- **AWS Amplify**: Connect your repository for CI/CD deployment

## Technologies Used

- **Next.js** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations (ready to implement)

## License

This project is open source and available under the [MIT License](LICENSE).
