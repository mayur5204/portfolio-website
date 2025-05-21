# Mayur Patil - AI & ML Engineer Portfolio

A cutting-edge 3D AI-powered portfolio website for Mayur Machhindra Patil, a 3rd-year AI & ML Engineering student based in Pune, Maharashtra. This interactive portfolio showcases technical expertise through immersive 3D visualizations, neural network animations, and a futuristic UI built with modern web technologies including Three.js, GSAP, and React Three Fiber.

## Features

- **Interactive 3D Neural Network**: Stunning brain visualization with particle systems and dynamic animations
- **AI-Themed Dark Mode UI**: Modern design with purple/cyan gradients and futuristic aesthetics
- **Adaptive Performance**: Automatic optimization based on device capabilities
- **Responsive Design**: Seamlessly adapts to mobile, tablet, and desktop devices
- **Dynamic Content Sections**:
  - Hero section with 3D background visualization
  - About section with interactive timeline and skill ratings
  - Projects portfolio with filterable categories
  - AI + You section demonstrating AI collaboration potential
  - Contact section with form and social links
- **Smooth Animations**: Scroll-triggered effects and transitions using GSAP and Framer Motion
- **Optimized Build & Deploy**: Configured for Vercel's continuous deployment

## Technologies Used

- **Next.js**: React framework with App Router
- **TypeScript**: For type safety
- **Three.js**: For 3D visualizations
- **React Three Fiber**: React renderer for Three.js
- **GSAP**: For advanced animations
- **Framer Motion**: For component animations
- **Tailwind CSS**: For styling
- **React Icons**: For icons

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/mayur5204/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
  ├── animations/      # Animation utilities
  ├── app/             # Next.js app router pages
  ├── components/      
  │   ├── 3d/          # 3D components (Three.js)
  │   ├── layout/      # Layout components (Navbar, Footer)
  │   ├── sections/    # Page sections (Hero, Projects, About, etc.)
  │   └── ui/          # UI components
  ├── hooks/           # Custom React hooks
  └── utils/           # Utility functions
```

## Deployment

This site is configured for automatic deployment with Vercel's GitHub integration:

1. **Automatic Deployment** (Recommended):
   - Push your code to the GitHub repository
   - Vercel automatically detects changes and deploys the site
   - Visit the deployed site at your Vercel URL or custom domain

2. **Manual Deployment** (If needed):
   ```bash
   # Use the provided script for manual deployment
   ./deploy.sh
   ```

## Development Workflow

1. **Pull latest changes** (when working across devices):
   ```bash
   ./update.sh
   ```

2. **Make your changes locally**

3. **Test in development mode**:
   ```bash
   npm run dev
   # Visit http://localhost:3000 to preview
   ```

4. **Push changes to deploy**:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```

## Contact Information

- **GitHub**: [github.com/mayur5204](https://github.com/mayur5204)
- **LinkedIn**: [linkedin.com/in/mayur5204](https://www.linkedin.com/in/mayur5204)
- **Email**: [mayurpatil5204@outlook.com](mailto:mayurpatil5204@outlook.com)
- **Location**: Pune, Maharashtra, India

## Credits

- Designed and developed by Mayur Machhindra Patil
- 3D animations and visualizations created using Three.js and React Three Fiber
- Performance optimizations implemented for various device capabilities
- Built with assistance from GitHub Copilot and VS Code AI Agents (May 2025)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
