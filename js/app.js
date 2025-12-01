/**
 * ShoreSquad - Beach Cleanup Social App
 * Main JavaScript Application
 * Features: Map Integration, Weather API, Event Management, Local Storage
 */

// ==========================================
// Configuration
// ==========================================

const CONFIG = {
    openWeatherApiKey: 'YOUR_API_KEY_HERE', // Replace with actual key from openweathermap.org
    defaultZoom: 12,
    defaultLat: 34.0195,
    defaultLon: -118.4912, // Default to Santa Monica Beach
};

// Mock Event Data (Replace with API call in production)
const MOCK_EVENTS = [
    {
        id: 1,
        title: 'Santa Monica Beach Cleanup',
        location: 'Santa Monica Beach',
        date: '2025-12-07',
        time: '09:00 AM',
        difficulty: 'easy',
        participants: 45,
        lat: 34.0195,
        lon: -118.4912,
        description: 'Join us for a morning cleanup at iconic Santa Monica Beach',
    },
    {
        id: 2,
        title: 'Malibu Cove Conservation Day',
        location: 'Malibu Cove',
        date: '2025-12-14',
        time: '10:00 AM',
        difficulty: 'moderate',
        participants: 28,
        lat: 34.0282,
        lon: -118.6784,
        description: 'Help restore the stunning Malibu Cove ecosystem',
    },
    {
        id: 3,
        title: 'Venice Beach Extreme Cleanup',
        location: 'Venice Beach',
        date: '2025-12-21',
        time: '08:00 AM',
        difficulty: 'challenging',
        participants: 52,
        lat: 33.9850,
        lon: -118.4695,
        description: 'Intensive cleanup covering Venice Beach and surrounding areas',
    },
    {
        id: 4,
        title: 'Long Beach Environmental Stewardship',
        location: 'Long Beach Harbor',
        date: '2025-12-15',
        time: '02:00 PM',
        difficulty: 'moderate',
        participants: 34,
        lat: 33.7437,
        lon: -118.2597,
        description: 'Protect our harbor with focused cleanup efforts',
    },
    {
        id: 5,
        title: 'Zuma Beach Family Cleanup',
        location: 'Zuma Beach',
        date: '2025-12-08',
        time: '11:00 AM',
        difficulty: 'easy',
        participants: 19,
        lat: 34.0365,
        lon: -118.8232,
        description: 'Family-friendly cleanup event with activities for kids',
    },
];

// ==========================================
// Global State
// ==========================================

const appState = {
    map: null,
    markers: {},
    events: [],
    userLocation: { lat: CONFIG.defaultLat, lon: CONFIG.defaultLon },
    filteredEvents: [],
};

// ==========================================
// Initialization
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

/**
 * Main application initialization
 */
async function initializeApp() {
    console.log('🌊 ShoreSquad initializing...');
    
    // Initialize components
    initializeNavigation();
    initializeMap();
    loadEvents();
    setupEventListeners();
    
    // Try to get user's geolocation
    getUserLocation();
    
    console.log('✅ ShoreSquad ready!');
}

// ==========================================
// Navigation
// ==========================================

/**
 * Setup mobile navigation toggle
 */
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

// ==========================================
// Map Integration (Leaflet.js)
// ==========================================

/**
 * Initialize the interactive map
 */
function initializeMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Create map
    appState.map = L.map('map').setView(
        [CONFIG.defaultLat, CONFIG.defaultLon],
        CONFIG.defaultZoom
    );

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        tileSize: 256,
    }).addTo(appState.map);

    // Add event markers
    addEventMarkers();

    console.log('🗺️ Map initialized');
}

/**
 * Add markers to map for each event
 */
function addEventMarkers() {
    if (!appState.map) return;

    appState.events.forEach(event => {
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div class="marker-pin" style="background-color: var(--primary);">📍</div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
        });

        const marker = L.marker([event.lat, event.lon], { icon: customIcon })
            .bindPopup(`
                <div class="popup-content">
                    <h4>${event.title}</h4>
                    <p><strong>📍</strong> ${event.location}</p>
                    <p><strong>📅</strong> ${event.date} at ${event.time}</p>
                    <p><strong>👥</strong> ${event.participants} participants</p>
                    <p><strong>🎯</strong> ${capitalizeFirst(event.difficulty)}</p>
                </div>
            `)
            .addTo(appState.map);

        appState.markers[event.id] = marker;
    });
}

/**
 * Get user's current geolocation
 */
function getUserLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                appState.userLocation = { lat: latitude, lon: longitude };
                
                // Add user location marker
                if (appState.map) {
                    L.marker([latitude, longitude], {
                        icon: L.icon({
                            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41],
                        })
                    }).addTo(appState.map).bindPopup('📍 Your Location');
                }
                
                console.log('📍 User location detected', { latitude, longitude });
            },
            (error) => console.warn('⚠️ Geolocation error:', error)
        );
    }
}

// ==========================================
// Events Management
// ==========================================

/**
 * Load events and render them
 */
function loadEvents() {
    // In production, this would fetch from an API
    appState.events = MOCK_EVENTS;
    appState.filteredEvents = [...MOCK_EVENTS];
    renderEvents();
    console.log('📅 Events loaded');
}

/**
 * Render events to the DOM
 */
function renderEvents() {
    const container = document.getElementById('eventsContainer');
    if (!container) return;

    if (appState.filteredEvents.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No events found matching your filters.</p>';
        return;
    }

    container.innerHTML = appState.filteredEvents.map(event => `
        <article class="event-card" data-event-id="${event.id}">
            <div class="event-card-header">
                <h3>${event.title}</h3>
            </div>
            <div class="event-card-body">
                <p><strong>📍</strong> ${event.location}</p>
                <p><strong>📅</strong> ${formatDate(event.date)} at ${event.time}</p>
                <p><strong>👥</strong> ${event.participants} people joining</p>
                <p>${event.description}</p>
                <span class="event-tag difficulty-${event.difficulty}">${capitalizeFirst(event.difficulty)}</span>
            </div>
        </article>
    `).join('');

    // Add click handlers
    container.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', () => {
            const eventId = parseInt(card.dataset.eventId);
            const event = appState.events.find(e => e.id === eventId);
            if (event && appState.markers[eventId]) {
                appState.map.setView([event.lat, event.lon], CONFIG.defaultZoom);
                appState.markers[eventId].openPopup();
            }
        });
    });
}

/**
 * Filter events based on search and difficulty
 */
function filterEvents() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const difficultyFilter = document.getElementById('difficultyFilter')?.value || '';

    appState.filteredEvents = appState.events.filter(event => {
        const matchesSearch = 
            event.title.toLowerCase().includes(searchTerm) ||
            event.location.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm);

        const matchesDifficulty = !difficultyFilter || event.difficulty === difficultyFilter;

        return matchesSearch && matchesDifficulty;
    });

    renderEvents();
}

// ==========================================
// Weather Integration
// ==========================================

/**
 * Fetch and display weather information
 */
async function getWeather() {
    const weatherBtn = document.getElementById('weatherBtn');
    const weatherInfo = document.getElementById('weatherInfo');

    if (!weatherInfo) return;

    try {
        weatherBtn.disabled = true;
        weatherBtn.textContent = 'Loading...';

        const { lat, lon } = appState.userLocation;
        
        // Using Open-Meteo (free, no API key required)
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&temperature_unit=fahrenheit`
        );

        if (!response.ok) throw new Error('Weather fetch failed');

        const data = await response.json();
        const current = data.current;

        // Update weather display
        document.getElementById('weatherLocation').textContent = `Weather at Your Location`;
        document.getElementById('weatherDesc').textContent = getWeatherDescription(current.weather_code);
        document.getElementById('weatherTemp').textContent = `🌡️ Temperature: ${current.temperature_2m}°F`;
        document.getElementById('weatherWind').textContent = `💨 Wind Speed: ${current.wind_speed_10m} mph`;

        weatherInfo.classList.remove('hidden');
        weatherBtn.textContent = 'Refresh Weather';
    } catch (error) {
        console.error('Weather error:', error);
        weatherInfo.innerHTML = '<p style="color: #e74c3c;">Unable to fetch weather. Please try again.</p>';
        weatherInfo.classList.remove('hidden');
        weatherBtn.textContent = 'Get My Weather';
    } finally {
        weatherBtn.disabled = false;
    }
}

/**
 * Decode WMO weather codes to descriptions
 */
function getWeatherDescription(code) {
    const descriptions = {
        0: '☀️ Clear sky',
        1: '🌤️ Mostly clear',
        2: '⛅ Partly cloudy',
        3: '☁️ Overcast',
        45: '🌫️ Foggy',
        48: '🌫️ Rime fog',
        51: '🌦️ Light drizzle',
        61: '🌧️ Slight rain',
        63: '🌧️ Moderate rain',
        65: '⛈️ Heavy rain',
        71: '🌨️ Slight snow',
        80: '🌧️ Slight rain showers',
        95: '⛈️ Thunderstorm',
    };
    return descriptions[code] || 'Weather data unavailable';
}

// ==========================================
// Event Listeners Setup
// ==========================================

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Search and filter
    const searchInput = document.getElementById('searchInput');
    const difficultyFilter = document.getElementById('difficultyFilter');

    if (searchInput) {
        searchInput.addEventListener('input', filterEvents);
    }
    if (difficultyFilter) {
        difficultyFilter.addEventListener('change', filterEvents);
    }

    // Weather
    const weatherBtn = document.getElementById('weatherBtn');
    if (weatherBtn) {
        weatherBtn.addEventListener('click', getWeather);
    }

    // Get Started button
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// ==========================================
// Utility Functions
// ==========================================

/**
 * Format date to readable string
 */
function formatDate(dateString) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Capitalize first letter
 */
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Save to local storage
 */
function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('LocalStorage error:', error);
    }
}

/**
 * Get from local storage
 */
function getFromLocalStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('LocalStorage error:', error);
        return null;
    }
}

/**
 * Service Worker registration for offline support
 */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(err => {
        console.log('Service Worker registration failed:', err);
    });
}

// ==========================================
// Performance Monitoring
// ==========================================

/**
 * Log Core Web Vitals
 */
if ('PerformanceObserver' in window) {
    try {
        // Largest Contentful Paint
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // Cumulative Layout Shift
        new PerformanceObserver((list) => {
            let clsValue = 0;
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            console.log('CLS:', clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
        console.log('Performance monitoring not available');
    }
}
