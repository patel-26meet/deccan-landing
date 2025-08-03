# Deccan Landing 🚀

A modern, responsive landing page built with Next.js 15 and TypeScript, showcasing AI expertise opportunities and community features.

## 🌐 Live Demo

**[View Live Site →](https://patel-26meet.github.io/deccan-landing/)**

## 📸 Features

- **🎨 Modern UI/UX** - Clean, professional design with smooth animations
- **📱 Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **⚡ Performance Optimized** - Lazy loading, image optimization, and efficient bundling
- **🎭 Interactive Animations** - Lottie animations and CSS transitions
- **🔄 Dynamic Components** - Interactive flip cards, carousels, and simulators
- **♿ Accessible** - Built with accessibility best practices
- **🌙 GitHub Pages Ready** - Configured for seamless deployment

## 🛠️ Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** SCSS/Sass with CSS Modules
- **Animations:** Lottie (react-lottie-player)
- **Icons:** Solar Icons React
- **State Management:** React Hooks (useState, useCallback, useMemo)
- **Authentication:** Descope NextJS SDK
- **Deployment:** GitHub Pages with GitHub Actions
- **Code Quality:** ESLint, Prettier, Husky, lint-staged

## 📚 What I Learned

### 🎯 **Frontend Development**
- **Production-grade React/Next.js architecture** - Clean component structure, custom hooks, and performance optimization
- **TypeScript best practices** - Proper typing, interfaces, and type safety throughout the application
- **Modern React patterns** - Custom hooks, memo optimization, and efficient state management

### 🎨 **Styling & Design**
- **SCSS mastery** - Advanced mixins, variables, and modular architecture for maintainable stylesheets
- **Responsive design principles** - Mobile-first approach with breakpoints and fluid layouts
- **CSS Grid & Flexbox** - Complex layouts with modern CSS techniques
- **CSS animations** - Smooth transitions, hover effects, and interactive elements

### ⚡ **Performance Optimization**
- **Lazy loading strategies** - Images, components, and dynamic imports for better performance
- **Image optimization** - Next.js Image component and asset optimization
- **Code splitting** - Dynamic imports and route-based splitting
- **Bundle optimization** - Tree shaking and efficient bundling strategies

### 🎭 **Animations & Interactions**
- **Lottie animations integration** - Complex animations with react-lottie-player
- **Interactive UI components** - Flip cards, carousels, and dynamic content
- **Smooth transitions** - CSS and JS-based animations for enhanced UX
- **Gesture handling** - Touch and mouse interactions for different devices

### 🔧 **Development Workflow**
- **Git workflows** - Feature branches, conventional commits, and CI/CD integration
- **Code quality tools** - ESLint, Prettier, and pre-commit hooks with Husky
- **GitHub Actions** - Automated testing, building, and deployment pipelines
- **Static site deployment** - GitHub Pages configuration and optimization

### 🏗️ **Architecture & Best Practices**
- **Component architecture** - Reusable, maintainable component structure
- **Custom hooks development** - useDeviceType, useIntersectionObserver, useDebounce
- **Constants management** - Centralized data management and configuration
- **TypeScript interfaces** - Proper type definitions and contracts

### 🚀 **DevOps & Deployment**
- **GitHub Pages deployment** - Static site generation and hosting
- **CI/CD pipelines** - Automated workflows with GitHub Actions
- **Environment configuration** - Development and production optimizations
- **Asset optimization** - Path resolution and static asset management

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- Yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/patel-26meet/deccan-landing.git
   cd deccan-landing
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Run the development server**
   ```bash
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

- `yarn dev` - Start development server with Turbopack
- `yarn build` - Build for production
- `yarn export` - Build and export static files for deployment
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint issues
- `yarn format` - Format code with Prettier

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── pages/            # Page-specific components
│   └── shared/           # Reusable components
├── constants/            # Application constants
├── interfaces/           # TypeScript interfaces
├── lib/                  # Utilities and custom hooks
│   └── hooks/           # Custom React hooks
├── styles/              # SCSS stylesheets
│   ├── components/      # Component styles
│   ├── layout/          # Layout styles
│   └── variables.scss   # Global variables
└── utils/               # Helper functions
```

## 🎨 Key Components

- **Hero Section** - Dynamic Lottie animations with responsive design
- **Benefits Showcase** - Interactive cards with hover effects
- **Stories Section** - Flip cards with testimonials and images
- **Simulator** - Interactive AI process demonstration
- **Campus Partners** - Animated logo carousel
- **FAQ Section** - Collapsible accordion interface

## 🔧 Configuration

### GitHub Pages Deployment

The project is configured for automatic deployment to GitHub Pages using GitHub Actions. The workflow:

1. Builds the Next.js application
2. Exports static files
3. Deploys to GitHub Pages
4. Automatically updates on push to `init` branch

### Environment Setup

- **Node.js 20+** for compatibility with latest features
- **Yarn** for dependency management
- **ESLint + Prettier** for code quality
- **Husky** for pre-commit hooks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- Kartika 🤝 (the Designer)
- Shoubhik bhai 🙏 (the Mentor)
- Jaskaran (the Designer Mentor)

---

**Built with ❤️ using Next.js, TypeScript, and SCSS**
