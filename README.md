# 🌊 ShoreSquad

**Rally your crew, track weather, and hit the next beach cleanup with our dope map app!**

## Project Overview

ShoreSquad is a social beach cleanup coordination platform that mobilizes young people to participate in environmental conservation. The app combines interactive maps, real-time weather tracking, and community features to make eco-action fun and accessible.

### Key Features
- 🗺️ **Interactive Map** - Visualize beach cleanup events near you using Leaflet.js
- 🌦️ **Real-Time Weather** - Check weather conditions before heading out (Open-Meteo API)
- 👥 **Social Events** - Browse and join community cleanup events
- 📱 **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- ♿ **Accessible** - WCAG AA compliant with keyboard navigation and screen reader support
- ⚡ **Performance Optimized** - Fast load times with lazy loading and efficient code

## Brand Identity

### Color Palette
- **Primary Ocean Blue**: `#0077BE` - Trust and ocean connection
- **Secondary Coral**: `#FF6B6B` - Energy and action
- **Accent Sea Green**: `#20C997` - Eco-consciousness
- **Text Charcoal**: `#2D3436` - Readability

### Target Audience
Gen Z & millennials (18-35) passionate about environmental impact and community engagement

## Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables and Grid/Flexbox
- **Vanilla JavaScript** - Lightweight, no framework overhead
- **Leaflet.js** - Interactive mapping
- **Open-Meteo API** - Free weather data (no API key required)

### Development Tools
- **Live Server** - Local development server
- **VS Code** - Recommended IDE
- **Git** - Version control

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Live Server extension for VS Code (recommended)

### Installation

1. **Clone or navigate to the project**
   ```bash
   cd ShoreSquad
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   
   Or if using VS Code Live Server extension:
   - Right-click `index.html` → "Open with Live Server"

4. **Open in browser**
   - Navigate to `http://localhost:5500`

## Project Structure

```
ShoreSquad/
├── index.html              # Main HTML5 boilerplate
├── css/
│   └── styles.css         # Complete styling with brand colors
├── js/
│   └── app.js             # Main application logic
├── .vscode/
│   └── settings.json      # VS Code configuration
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## Key JavaScript Features

### Interactive Map
- Leaflet.js integration for displaying beach locations
- Custom markers for each event
- Popup cards with event details
- User geolocation tracking

### Weather Integration
- Real-time weather fetching via Open-Meteo API
- No API key required
- Temperature, wind speed, and conditions display
- WMO weather code interpretation

### Event Management
- Mock event data (expandable to API)
- Search and filter functionality
- Difficulty level categorization
- Dynamic rendering and DOM updates

### Performance & Optimization
- Lazy loading for images
- Service Worker support (extensible)
- Local Storage for user preferences
- Core Web Vitals monitoring
- Efficient CSS with CSS variables

### Accessibility (a11y)
- Semantic HTML with ARIA labels
- Keyboard navigation support
- High contrast color combinations (WCAG AA)
- Focus indicators for all interactive elements
- Responsive text sizing
- Skip-to-content links (ready to implement)

## UX Design Principles

1. **Mobile-First** - Optimized for small screens first
2. **Clarity** - Clear CTAs and information hierarchy
3. **Speed** - Sub-3 second load time
4. **Accessibility** - Inclusive design for all users
5. **Community** - Social features encourage participation
6. **Simplicity** - Intuitive navigation and minimal cognitive load

## Future Enhancements

### Planned Features
- User authentication and profiles
- Event creation and management
- Real-time notifications
- Social media integration
- Leaderboards and achievement badges
- Photo uploads and galleries
- Direct messaging between crew members
- Integration with environmental tracking APIs

### Backend Development
- Node.js/Express server
- Database integration (MongoDB/PostgreSQL)
- RESTful API endpoints
- Authentication system
- Real-time WebSocket updates

### Progressive Web App (PWA)
- Service Worker implementation
- Offline functionality
- Install-to-home-screen capability
- Push notifications

## API Configuration

### Open-Meteo Weather API
Currently implemented with free, no-key-required service.

For other weather providers (e.g., OpenWeatherMap):
1. Sign up at [openweathermap.org](https://openweathermap.org)
2. Get your API key
3. Update `CONFIG.openWeatherApiKey` in `js/app.js`

## Code Style Guidelines

- Use semantic HTML
- Follow CSS naming conventions (BEM-inspired)
- Use CSS variables for consistent theming
- Write self-documenting JavaScript with JSDoc comments
- Keep functions small and single-responsibility
- Use const/let (no var)
- Include error handling and logging

## Performance Targets

- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Lighthouse Score: 90+

## Accessibility Testing

Test with:
- Screen readers (NVDA, JAWS)
- Keyboard navigation only
- High contrast mode
- Zoom at 200%
- Mobile devices

## Contributing

Contributions welcome! Please follow the code style guidelines and ensure accessibility compliance.

## License

MIT License - See LICENSE file for details

## Contact & Support

For questions or issues, please open a GitHub issue or contact the ShoreSquad team.

---

**Made with 💙 for our beaches and communities** 🌊
