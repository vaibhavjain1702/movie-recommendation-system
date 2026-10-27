document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const moviesContainer = document.getElementById('movies-container');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const genreFilter = document.getElementById('genre-filter');
    const ratingFilter = document.getElementById('rating-filter');
    const languageFilter = document.getElementById('language-filter');
    const yearFilter = document.getElementById('year-filter');
    const applyFiltersButton = document.getElementById('apply-filters');
    const modal = document.getElementById('movie-modal');
    const modalContent = document.querySelector('.modal-content');
    const closeModal = document.querySelector('.close');
    const modalMovieDetails = document.getElementById('modal-movie-details');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const currentPageSpan = document.getElementById('current-page');
    const sectionTitle = document.getElementById('section-title');
    const watchTrailerBtn = document.getElementById('watch-trailer');
    const addToFavoritesBtn = document.getElementById('add-to-favorites');
    const trailerContainer = document.getElementById('trailer-container');
    const reviewsContainer = document.getElementById('reviews-container');
    const submitReviewBtn = document.getElementById('submit-review');
    const reviewTextarea = document.getElementById('review-text');
    const starRating = document.querySelectorAll('.star-rating i');
    const showFavoritesBtn = document.getElementById('show-favorites');
    const favoritesModal = document.getElementById('favorites-modal');
    const closeFavoritesModal = document.querySelector('.close-favorites');
    const favoritesContainer = document.getElementById('favorites-container');
    
    // Auth Elements
    const loginSignupBtn = document.getElementById('login-signup-btn');
    const authModal = document.getElementById('auth-modal');
    const closeAuthModal = document.querySelector('.close-auth');
    const authTabs = document.querySelectorAll('.auth-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginSubmit = document.getElementById('login-submit');
    const signupSubmit = document.getElementById('signup-submit');
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');
    const signupUsername = document.getElementById('signup-username');
    const signupEmail = document.getElementById('signup-email');
    const signupPassword = document.getElementById('signup-password');
    const signupConfirm = document.getElementById('signup-confirm');
    const loginMessage = document.getElementById('login-message');
    const signupMessage = document.getElementById('signup-message');
    const userProfile = document.getElementById('user-profile');
    const usernameDisplay = document.getElementById('username-display');
    const logoutBtn = document.getElementById('logout-btn');
    
    // State variables
    let currentPage = 1;
    let totalPages = 1;
    let currentCategory = 'popular';
    let currentSearchQuery = '';
    let genresList = [];
    let currentFilters = {
        genre: '0',
        rating: '0',
        language: '',
        year: ''
    };
    let currentMovieId = null;
    let userRating = 0;
    let favorites = [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    
    // Check for stored API key
    const storedApiKey = localStorage.getItem('tmdb_api_key');
    if (storedApiKey) {
        config.apiKey = storedApiKey;
        console.log('Using stored API key');
    }
    
    // Load user-specific favorites
    loadUserFavorites();
    
    // Initialize the page
    init();
    
    // Event Listeners
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    applyFiltersButton.addEventListener('click', applyFilters);
    
    closeModal.addEventListener('click', function() {
        closeMovieModal();
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeMovieModal();
        }
        if (event.target === favoritesModal) {
            favoritesModal.style.display = 'none';
        }
    });
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            changeCategory(category);
        });
    });
    
    prevPageButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            loadMovies();
        }
    });
    
    nextPageButton.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            loadMovies();
        }
    });
    
    // Trailer button
    watchTrailerBtn.addEventListener('click', function() {
        loadMovieTrailer(currentMovieId);
    });
    
    // Favorites button
    addToFavoritesBtn.addEventListener('click', function() {
        toggleFavorite(currentMovieId);
    });
    
    // Show favorites
    showFavoritesBtn.addEventListener('click', function() {
        showFavorites();
    });
    
    // Close favorites modal
    closeFavoritesModal.addEventListener('click', function() {
        favoritesModal.style.display = 'none';
    });
    
    // Star rating
    starRating.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.dataset.rating);
            setUserRating(rating);
        });
        
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.dataset.rating);
            highlightStars(rating);
        });
        
        star.addEventListener('mouseout', function() {
            highlightStars(userRating);
        });
    });
    
    // Submit review
    submitReviewBtn.addEventListener('click', function() {
        submitReview();
    });
    
    // Auth event listeners
    loginSignupBtn.addEventListener('click', function() {
        authModal.style.display = 'block';
    });
    
    closeAuthModal.addEventListener('click', function() {
        authModal.style.display = 'none';
    });
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            if (tabName === 'login') {
                loginForm.classList.remove('hidden');
                signupForm.classList.add('hidden');
            } else {
                loginForm.classList.add('hidden');
                signupForm.classList.remove('hidden');
            }
        });
    });
    
    loginSubmit.addEventListener('click', function() {
        handleLogin();
    });
    
    signupSubmit.addEventListener('click', function() {
        handleSignup();
    });
    
    logoutBtn.addEventListener('click', function() {
        handleLogout();
    });
    
    // API Key Modal
    const apiKeyModal = document.getElementById('api-key-modal');
    const setApiKeyBtn = document.getElementById('set-api-key');
    const closeApiKeyModal = document.querySelector('.close-api-key');
    const apiKeyInput = document.getElementById('api-key-input');
    const saveApiKeyBtn = document.getElementById('save-api-key');
    
    setApiKeyBtn.addEventListener('click', function() {
        // Pre-fill with current API key if it exists
        const currentKey = localStorage.getItem('tmdb_api_key');
        if (currentKey) {
            apiKeyInput.value = currentKey;
        }
        apiKeyModal.style.display = 'block';
    });
    
    closeApiKeyModal.addEventListener('click', function() {
        apiKeyModal.style.display = 'none';
    });
    
    saveApiKeyBtn.addEventListener('click', function() {
        const apiKey = apiKeyInput.value.trim();
        if (apiKey) {
            localStorage.setItem('tmdb_api_key', apiKey);
            config.apiKey = apiKey;
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = 'API key saved! Reloading page...';
            document.body.appendChild(successMsg);
            
            // Close modal
            apiKeyModal.style.display = 'none';
            
            // Reload page after a short delay
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } else {
            alert('Please enter a valid API key');
        }
    });
    
    // Functions
    async function init() {
        // Load genres
        await loadGenres();
        
        // Populate year filter with options
        populateYearFilter();
        
        // Check if user is logged in
        updateAuthUI();
        
        // Load initial movies
        loadMovies();
    }
    
    function updateAuthUI() {
        if (currentUser) {
            // User is logged in
            loginSignupBtn.classList.add('hidden');
            userProfile.classList.remove('hidden');
            usernameDisplay.textContent = currentUser.username;
        } else {
            // User is logged out
            loginSignupBtn.classList.remove('hidden');
            userProfile.classList.add('hidden');
        }
    }
    
    function handleLogin() {
        const email = loginEmail.value.trim();
        const password = loginPassword.value.trim();
        
        // Simple validation
        if (!email || !password) {
            loginMessage.textContent = 'Please enter both email and password';
            loginMessage.className = 'auth-message error';
            return;
        }
        
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Find user with matching email
        const user = users.find(u => u.email === email);
        
        if (!user || user.password !== password) {
            loginMessage.textContent = 'Invalid email or password';
            loginMessage.className = 'auth-message error';
            return;
        }
        
        // Login successful
        currentUser = {
            id: user.id,
            username: user.username,
            email: user.email
        };
        
        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Load user's favorites
        loadUserFavorites();
        
        // Update UI
        updateAuthUI();
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = `Welcome back, ${user.username}!`;
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
            if (successMsg.parentNode) {
                successMsg.parentNode.removeChild(successMsg);
            }
        }, 2000);
        
        // Close modal
        authModal.style.display = 'none';
        
        // Reset form
        loginEmail.value = '';
        loginPassword.value = '';
        loginMessage.textContent = '';
    }
    
    function loadUserFavorites() {
        // Clear favorites first
        favorites = [];
        
        // If no user is logged in, favorites remain empty
        if (!currentUser) {
            return;
        }
        
        // Get all favorites from localStorage
        const allFavorites = JSON.parse(localStorage.getItem('allUserFavorites')) || {};
        
        // Get favorites for current user
        favorites = allFavorites[currentUser.id] || [];
        
        console.log(`Loaded ${favorites.length} favorites for user ${currentUser.username}`);
    }
    
    function handleSignup() {
        const username = signupUsername.value.trim();
        const email = signupEmail.value.trim();
        const password = signupPassword.value.trim();
        const confirmPassword = signupConfirm.value.trim();
        
        // Simple validation
        if (!username || !email || !password || !confirmPassword) {
            signupMessage.textContent = 'Please fill in all fields';
            signupMessage.className = 'auth-message error';
            return;
        }
        
        if (password !== confirmPassword) {
            signupMessage.textContent = 'Passwords do not match';
            signupMessage.className = 'auth-message error';
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            signupMessage.textContent = 'Please enter a valid email address';
            signupMessage.className = 'auth-message error';
            return;
        }
        
        // Password strength validation
        if (password.length < 6) {
            signupMessage.textContent = 'Password must be at least 6 characters long';
            signupMessage.className = 'auth-message error';
            return;
        }
        
        // Get existing users
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if email already exists
        if (users.some(user => user.email === email)) {
            signupMessage.textContent = 'Email already in use';
            signupMessage.className = 'auth-message error';
            return;
        }
        
        // Check if username already exists
        if (users.some(user => user.username === username)) {
            signupMessage.textContent = 'Username already taken';
            signupMessage.className = 'auth-message error';
            return;
        }
        
        // Create new user
        const newUser = {
            id: Date.now().toString(),
            username,
            email,
            password,
            createdAt: new Date().toISOString()
        };
        
        // Add to users array
        users.push(newUser);
        
        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        // Auto login
        currentUser = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Initialize empty favorites for the new user
        const allFavorites = JSON.parse(localStorage.getItem('allUserFavorites')) || {};
        allFavorites[newUser.id] = [];
        localStorage.setItem('allUserFavorites', JSON.stringify(allFavorites));
        
        // Load user's favorites (which will be empty)
        loadUserFavorites();
        
        // Update UI
        updateAuthUI();
        
        // Show success message
        signupMessage.textContent = 'Account created successfully!';
        signupMessage.className = 'auth-message success';
        
        // Show welcome message
        const welcomeMsg = document.createElement('div');
        welcomeMsg.className = 'success-message';
        welcomeMsg.textContent = `Welcome, ${username}! Your account has been created.`;
        document.body.appendChild(welcomeMsg);
        
        setTimeout(() => {
            if (welcomeMsg.parentNode) {
                welcomeMsg.parentNode.removeChild(welcomeMsg);
            }
        }, 3000);
        
        // Reset form after a delay
        setTimeout(() => {
            signupUsername.value = '';
            signupEmail.value = '';
            signupPassword.value = '';
            signupConfirm.value = '';
            signupMessage.textContent = '';
            
            // Close modal
            authModal.style.display = 'none';
        }, 1500);
    }
    
    function handleLogout() {
        // Clear current user
        currentUser = null;
        localStorage.removeItem('currentUser');
        
        // Clear favorites
        favorites = [];
        
        // Update UI
        updateAuthUI();
        
        // Show logout message
        const logoutMsg = document.createElement('div');
        logoutMsg.className = 'success-message';
        logoutMsg.textContent = 'You have been logged out successfully';
        document.body.appendChild(logoutMsg);
        
        setTimeout(() => {
            if (logoutMsg.parentNode) {
                logoutMsg.parentNode.removeChild(logoutMsg);
            }
        }, 2000);
    }
    
    function getLanguageName(languageCode) {
        const languages = {
            'en': 'English',
            'es': 'Spanish',
            'fr': 'French',
            'de': 'German',
            'it': 'Italian',
            'ja': 'Japanese',
            'ko': 'Korean',
            'zh': 'Chinese',
            'hi': 'Hindi',
            'ru': 'Russian',
            'pt': 'Portuguese',
            'ar': 'Arabic',
            'tr': 'Turkish',
            'nl': 'Dutch',
            'sv': 'Swedish',
            'pl': 'Polish',
            'da': 'Danish',
            'fi': 'Finnish',
            'no': 'Norwegian',
            'th': 'Thai',
            'cs': 'Czech',
            'hu': 'Hungarian',
            'el': 'Greek',
            'he': 'Hebrew',
            'id': 'Indonesian',
            'fa': 'Persian',
            'vi': 'Vietnamese',
            'ro': 'Romanian',
            'bn': 'Bengali',
            'ta': 'Tamil',
            'te': 'Telugu',
            'mr': 'Marathi',
            'ur': 'Urdu',
            'uk': 'Ukrainian',
            'ml': 'Malayalam'
        };
        
        return languages[languageCode] || languageCode;
    }
    
    async function loadGenres() {
        try {
            const url = `${config.baseUrl}/genre/movie/list?api_key=${config.apiKey}&language=en-US`;
            const response = await fetch(url);
            const data = await response.json();
            
            genresList = data.genres;
            
            // Populate genre filter dropdown
            genresList.forEach(genre => {
                const option = document.createElement('option');
                option.value = genre.id;
                option.textContent = genre.name;
                genreFilter.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading genres:', error);
        }
    }
    
    function populateYearFilter() {
        const currentYear = new Date().getFullYear();
        
        // Add individual years (current year down to 2000)
        for (let year = currentYear; year >= 2000; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearFilter.appendChild(option);
        }
        
        // Add decades
        const decades = ['1990s', '1980s', '1970s', '1960s', '1950s'];
        decades.forEach(decade => {
            const option = document.createElement('option');
            option.value = decade;
            option.textContent = decade;
            yearFilter.appendChild(option);
        });
    }
    
    function changeCategory(category) {
        // Update active button
        categoryButtons.forEach(btn => {
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update category and reset page
        currentCategory = category;
        currentPage = 1;
        currentSearchQuery = '';
        searchInput.value = '';
        
        // Update section title
        updateSectionTitle();
        
        // Load movies for the selected category
        loadMovies();
    }
    
    function updateSectionTitle() {
        let title;
        
        if (currentSearchQuery) {
            title = `Search Results for "${currentSearchQuery}"`;
        } else {
            switch (currentCategory) {
                case 'popular':
                    title = 'Popular Movies';
                    break;
                case 'top_rated':
                    title = 'Top Rated Movies';
                    break;
                case 'now_playing':
                    title = 'Now Playing';
                    break;
                case 'upcoming':
                    title = 'Upcoming Movies';
                    break;
                default:
                    title = 'Movies';
            }
        }
        
        sectionTitle.textContent = title;
    }
    
    function handleSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm === '') {
            return;
        }
        
        currentSearchQuery = searchTerm;
        currentPage = 1;
        
        // Reset category buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        updateSectionTitle();
        loadMovies();
    }
    
    function applyFilters() {
        currentFilters = {
            genre: genreFilter.value,
            rating: ratingFilter.value,
            language: languageFilter.value,
            year: yearFilter.value
        };
        
        currentPage = 1;
        loadMovies();
    }
    
    async function loadMovies() {
        // Show loader
        moviesContainer.innerHTML = '<div class="loader"></div>';
        
        try {
            let url;
            let useDiscoverEndpoint = false;
            
            // Determine if we should use the discover endpoint based on filters
            if (!currentSearchQuery && (currentFilters.genre !== '0' || (currentFilters.language && currentFilters.language !== '') || currentFilters.year)) {
                useDiscoverEndpoint = true;
                console.log('Using discover endpoint due to filters');
            }
            
            if (currentSearchQuery) {
                // Search query takes precedence
                url = `${config.baseUrl}/search/movie?api_key=${config.apiKey}&query=${encodeURIComponent(currentSearchQuery)}&page=${currentPage}&include_adult=false`;
            } else if (useDiscoverEndpoint) {
                // Use discover endpoint when filters are applied
                url = `${config.baseUrl}/discover/movie?api_key=${config.apiKey}&page=${currentPage}&sort_by=popularity.desc`;
            } else {
                // Category-based endpoint when no filters
                url = `${config.baseUrl}/movie/${currentCategory}?api_key=${config.apiKey}&page=${currentPage}`;
            }
            
            // Add filters if applicable
            if (currentFilters.genre !== '0') {
                url += `&with_genres=${currentFilters.genre}`;
            }
            
            // Always add language for results display
            url += `&language=en-US`;
            
            // Add language filter if selected
            if (currentFilters.language && currentFilters.language !== '') {
                // Use the correct parameter for language filtering
                url += `&with_original_language=${currentFilters.language}`;
                console.log(`Filtering by language: ${currentFilters.language}`);
            }
            
            if (currentFilters.year && currentFilters.year !== '') {
                if (currentFilters.year.includes('s')) {
                    // Decade filtering
                    const decade = currentFilters.year.replace('s', '');
                    const startYear = parseInt(decade);
                    const endYear = startYear + 9;
                    url += `&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`;
                } else {
                    // Specific year filtering
                    url += `&primary_release_year=${currentFilters.year}`;
                }
            }
            
            console.log('Fetching movies from URL:', url);
            
            const response = await fetch(url);
            const data = await response.json();
            
            // Debug the response
            console.log(`Received ${data.results ? data.results.length : 0} movies from API`);
            if (currentFilters.language && currentFilters.language !== '') {
                const langMovies = data.results ? data.results.filter(m => m.original_language === currentFilters.language) : [];
                console.log(`${langMovies.length} movies match the language filter ${currentFilters.language}`);
            }
            
            // Update pagination info
            totalPages = data.total_pages > 500 ? 500 : data.total_pages; // TMDB API limits to 500 pages
            currentPageSpan.textContent = `Page ${currentPage} of ${totalPages || 1}`;
            prevPageButton.disabled = currentPage === 1;
            nextPageButton.disabled = currentPage === totalPages || totalPages === 0;
            
            // Get movies and apply client-side rating filter
            let movies = data.results || [];
            
            // Apply rating filter (client-side)
            if (currentFilters.rating > 0) {
                const minRating = parseFloat(currentFilters.rating);
                movies = movies.filter(movie => {
                    // Only include movies with vote_average >= minRating
                    return movie.vote_average >= minRating;
                });
            }
            
            // Apply client-side language filter if search was used (since search doesn't support language filter)
            if (currentSearchQuery && currentFilters.language && currentFilters.language !== '') {
                console.log(`Applying client-side language filter: ${currentFilters.language}`);
                console.log(`Before filtering: ${movies.length} movies`);
                
                movies = movies.filter(movie => {
                    return movie.original_language === currentFilters.language;
                });
                
                console.log(`After filtering: ${movies.length} movies match language ${currentFilters.language}`);
            }
            
            if (movies.length === 0) {
                // Show a more specific message for language filters
                if (currentFilters.language && currentFilters.language !== '') {
                    const languageName = getLanguageName(currentFilters.language);
                    moviesContainer.innerHTML = `
                        <div class="no-results">
                            <p>No ${languageName} movies found matching your criteria.</p>
                            <p>Try a different language or adjust your other filters.</p>
                            <button id="clear-language-filter" class="action-btn">Clear Language Filter</button>
                        </div>
                    `;
                    
                    // Add event listener to the clear filter button
                    setTimeout(() => {
                        const clearBtn = document.getElementById('clear-language-filter');
                        if (clearBtn) {
                            clearBtn.addEventListener('click', () => {
                                languageFilter.value = '';
                                applyFilters();
                            });
                        }
                    }, 100);
                } else {
                    moviesContainer.innerHTML = `
                        <div class="no-results">
                            <p>No movies found matching your criteria.</p>
                            <p>Try adjusting your filters or search terms.</p>
                        </div>
                    `;
                }
            } else {
                displayMovies(movies);
            }
        } catch (error) {
            console.error('Error loading movies:', error);
            
            // If API key is invalid or there's an API error, use sample data
            if (error.message.includes('API') || error.message.includes('401')) {
                moviesContainer.innerHTML = `
                    <div class="api-error">
                        <h3>API Key Error</h3>
                        <p>Please update the API key in js/config.js with a valid TMDB API key.</p>
                        <p>You can get a free API key by creating an account at <a href="https://www.themoviedb.org/signup" target="_blank">themoviedb.org</a>.</p>
                        <p>Error details: ${error.message}</p>
                        <p>Loading sample data instead...</p>
                    </div>
                `;
                
                // Load sample data after a short delay
                setTimeout(() => {
                    loadSampleMovies();
                }, 2000);
            } else {
                moviesContainer.innerHTML = `
                    <div class="no-results">
                        <p>Error loading movies: ${error.message}</p>
                        <p>Please check your internet connection and try again.</p>
                    </div>
                `;
            }
        }
    }
    
    function loadSampleMovies() {
        // Sample movie data to display when API is not available
        const allSampleMovies = [
            {
                id: 1,
                title: "Action Movie 2025",
                poster_path: null,
                vote_average: 8.5,
                release_date: "2025-01-15",
                original_language: "en",
                overview: "This is a sample action movie for demonstration purposes.",
                genre_ids: [28, 12] // Action, Adventure
            },
            {
                id: 2,
                title: "French Drama",
                poster_path: null,
                vote_average: 7.8,
                release_date: "2025-02-20",
                original_language: "fr",
                overview: "This is a sample French drama for demonstration purposes.",
                genre_ids: [18] // Drama
            },
            {
                id: 3,
                title: "Spanish Comedy",
                poster_path: null,
                vote_average: 9.2,
                release_date: "2025-03-10",
                original_language: "es",
                overview: "This is a sample Spanish comedy for demonstration purposes.",
                genre_ids: [35] // Comedy
            },
            {
                id: 4,
                title: "Japanese Anime",
                poster_path: null,
                vote_average: 6.9,
                release_date: "2025-04-05",
                original_language: "ja",
                overview: "This is a sample Japanese anime for demonstration purposes.",
                genre_ids: [16, 10751] // Animation, Family
            },
            {
                id: 5,
                title: "Sci-Fi Adventure",
                poster_path: null,
                vote_average: 9.0,
                release_date: "2025-05-20",
                original_language: "en",
                overview: "This is a sample sci-fi adventure movie for demonstration purposes.",
                genre_ids: [878, 12] // Sci-Fi, Adventure
            },
            {
                id: 6,
                title: "Horror Night",
                poster_path: null,
                vote_average: 7.2,
                release_date: "2025-06-13",
                original_language: "en",
                overview: "This is a sample horror movie for demonstration purposes.",
                genre_ids: [27] // Horror
            },
            {
                id: 7,
                title: "Korean Drama",
                poster_path: null,
                vote_average: 8.7,
                release_date: "2025-07-08",
                original_language: "ko",
                overview: "This is a sample Korean drama for demonstration purposes.",
                genre_ids: [18, 10749] // Drama, Romance
            },
            {
                id: 8,
                title: "Classic Romance",
                poster_path: null,
                vote_average: 7.5,
                release_date: "2024-12-25",
                original_language: "en",
                overview: "This is a sample romance movie for demonstration purposes.",
                genre_ids: [10749] // Romance
            }
        ];
        
        // Apply filters to sample data
        let filteredMovies = [...allSampleMovies];
        
        // Apply genre filter
        if (currentFilters.genre !== '0') {
            const genreId = parseInt(currentFilters.genre);
            filteredMovies = filteredMovies.filter(movie => 
                movie.genre_ids && movie.genre_ids.includes(genreId)
            );
        }
        
        // Apply language filter
        if (currentFilters.language && currentFilters.language !== '') {
            filteredMovies = filteredMovies.filter(movie => 
                movie.original_language === currentFilters.language
            );
        }
        
        // Apply year filter
        if (currentFilters.year && currentFilters.year !== '') {
            if (currentFilters.year.includes('s')) {
                const decade = currentFilters.year.replace('s', '');
                const startYear = parseInt(decade);
                const endYear = startYear + 9;
                
                filteredMovies = filteredMovies.filter(movie => {
                    if (!movie.release_date) return false;
                    const movieYear = parseInt(movie.release_date.split('-')[0]);
                    return movieYear >= startYear && movieYear <= endYear;
                });
            } else {
                const year = parseInt(currentFilters.year);
                
                filteredMovies = filteredMovies.filter(movie => {
                    if (!movie.release_date) return false;
                    const movieYear = parseInt(movie.release_date.split('-')[0]);
                    return movieYear === year;
                });
            }
        }
        
        // Apply rating filter
        if (currentFilters.rating > 0) {
            const minRating = parseFloat(currentFilters.rating);
            filteredMovies = filteredMovies.filter(movie => 
                movie.vote_average >= minRating
            );
        }
        
        // Apply search filter
        if (currentSearchQuery) {
            const query = currentSearchQuery.toLowerCase();
            filteredMovies = filteredMovies.filter(movie => 
                movie.title.toLowerCase().includes(query) || 
                movie.overview.toLowerCase().includes(query)
            );
        }
        
        // Update pagination for sample data
        totalPages = 1;
        currentPageSpan.textContent = `Page ${currentPage} of ${totalPages}`;
        prevPageButton.disabled = true;
        nextPageButton.disabled = true;
        
        // Display filtered sample movies or show no results message
        if (filteredMovies.length === 0) {
            moviesContainer.innerHTML = `
                <div class="no-results">
                    <p>No sample movies found matching your criteria.</p>
                    <p>Try adjusting your filters or search terms.</p>
                </div>
            `;
        } else {
            displayMovies(filteredMovies);
        }
    }
    
    function displayMovies(movies) {
        moviesContainer.innerHTML = '';
        
        if (movies.length === 0) {
            moviesContainer.innerHTML = '<p class="no-results">No movies found matching your criteria.</p>';
            return;
        }
        
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.dataset.id = movie.id;
            
            const posterPath = movie.poster_path 
                ? `${config.imageBaseUrl}${config.posterSize}${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Poster+Available';
                
            const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
            const language = getLanguageName(movie.original_language);
            
            movieCard.innerHTML = `
                <img src="${posterPath}" alt="${movie.title}" class="movie-poster">
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <div class="movie-meta">
                        <p class="movie-year">${releaseYear}</p>
                        <p class="movie-language">${language}</p>
                    </div>
                    <div class="movie-rating">
                        <i class="fas fa-star"></i>
                        <span>${movie.vote_average.toFixed(1)}</span>
                    </div>
                </div>
            `;
            
            movieCard.addEventListener('click', function() {
                showMovieDetails(movie.id);
            });
            
            moviesContainer.appendChild(movieCard);
        });
    }
    
    async function showMovieDetails(movieId) {
        // Show loader in modal
        modalMovieDetails.innerHTML = '<div class="loader"></div>';
        modal.style.display = 'block';
        
        // Reset trailer container and user rating
        trailerContainer.innerHTML = '';
        trailerContainer.classList.add('hidden');
        userRating = 0;
        highlightStars(0);
        reviewTextarea.value = '';
        
        // Store current movie ID
        currentMovieId = movieId;
        
        try {
            // Fetch movie details
            const url = `${config.baseUrl}/movie/${movieId}?api_key=${config.apiKey}&append_to_response=credits,reviews`;
            const response = await fetch(url);
            const movie = await response.json();
            
            // Prepare data for display
            const posterPath = movie.poster_path 
                ? `${config.imageBaseUrl}${config.posterSize}${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Poster+Available';
                
            const releaseDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'N/A';
            const runtime = movie.runtime ? `${movie.runtime} min` : 'N/A';
            const language = getLanguageName(movie.original_language);
            
            // Get director(s)
            const directors = movie.credits.crew
                .filter(person => person.job === 'Director')
                .map(director => director.name)
                .join(', ');
            
            // Get cast (limit to top 10)
            const cast = movie.credits.cast.slice(0, 10);
            
            modalMovieDetails.innerHTML = `
                <div class="movie-detail-container">
                    <img src="${posterPath}" alt="${movie.title}" class="movie-detail-poster">
                    <div class="movie-detail-info">
                        <h2 class="movie-detail-title">${movie.title}</h2>
                        <div class="movie-detail-meta">
                            <span>${releaseDate}</span>
                            <span>|</span>
                            <span>${runtime}</span>
                            <span>|</span>
                            <span>${language}</span>
                        </div>
                        <div class="movie-detail-genres">
                            ${movie.genres.map(genre => `<span class="genre-tag">${genre.name}</span>`).join('')}
                        </div>
                        <div class="movie-detail-rating">
                            <i class="fas fa-star"></i>
                            <span>${movie.vote_average.toFixed(1)} Rating</span>
                        </div>
                        <p class="movie-detail-plot">${movie.overview || 'No overview available.'}</p>
                        <p><strong>Director:</strong> ${directors || 'N/A'}</p>
                    </div>
                </div>
                <div class="movie-detail-cast">
                    <h3>Cast</h3>
                    <div class="cast-list">
                        ${cast.map(actor => {
                            const profilePath = actor.profile_path 
                                ? `${config.imageBaseUrl}${config.profileSize}${actor.profile_path}`
                                : 'https://via.placeholder.com/185x185?text=No+Image';
                                
                            return `
                                <div class="cast-item">
                                    <img src="${profilePath}" alt="${actor.name}" class="cast-photo">
                                    <div class="cast-name">${actor.name}</div>
                                    <div class="cast-character">${actor.character}</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
            
            // Update favorites button
            updateFavoriteButton(movieId);
            
            // Load reviews
            loadReviews(movie.reviews.results);
            
        } catch (error) {
            console.error('Error loading movie details:', error);
            modalMovieDetails.innerHTML = '<p class="no-results">Error loading movie details. Please try again later.</p>';
        }
    }
    
    function closeMovieModal() {
        modal.style.display = 'none';
        trailerContainer.innerHTML = '';
        trailerContainer.classList.add('hidden');
    }
    
    async function loadMovieTrailer(movieId) {
        try {
            const url = `${config.baseUrl}/movie/${movieId}/videos?api_key=${config.apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            
            // Find a YouTube trailer
            const trailer = data.results.find(video => 
                (video.type === 'Trailer' || video.type === 'Teaser') && 
                video.site === 'YouTube'
            );
            
            if (trailer) {
                trailerContainer.innerHTML = `
                    <iframe 
                        src="https://www.youtube.com/embed/${trailer.key}" 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                `;
                trailerContainer.classList.remove('hidden');
            } else {
                trailerContainer.innerHTML = '<p class="no-results">No trailer available for this movie.</p>';
                trailerContainer.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Error loading trailer:', error);
            trailerContainer.innerHTML = '<p class="no-results">Error loading trailer. Please try again later.</p>';
            trailerContainer.classList.remove('hidden');
        }
    }
    
    function toggleFavorite(movieId) {
        // Check if user is logged in
        if (!currentUser) {
            // Show login prompt
            showLoginPrompt('favorites');
            return;
        }
        
        const index = favorites.findIndex(fav => fav.id === movieId);
        
        if (index === -1) {
            // Add to favorites
            addToFavorites(movieId);
        } else {
            // Remove from favorites
            favorites.splice(index, 1);
            
            // Save to user-specific favorites
            saveUserFavorites();
            
            // Update UI
            updateFavoriteButton(movieId);
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = 'Removed from favorites!';
            document.body.appendChild(successMsg);
            
            setTimeout(() => {
                if (successMsg.parentNode) {
                    successMsg.parentNode.removeChild(successMsg);
                }
            }, 2000);
        }
    }
    
    function saveUserFavorites() {
        if (!currentUser) return;
        
        // Get all favorites from localStorage
        const allFavorites = JSON.parse(localStorage.getItem('allUserFavorites')) || {};
        
        // Update favorites for current user
        allFavorites[currentUser.id] = favorites;
        
        // Save back to localStorage
        localStorage.setItem('allUserFavorites', JSON.stringify(allFavorites));
        
        console.log(`Saved ${favorites.length} favorites for user ${currentUser.username}`);
    }
    
    function showLoginPrompt(feature) {
        // Create a login prompt modal
        const loginPromptModal = document.createElement('div');
        loginPromptModal.className = 'login-prompt-modal';
        
        loginPromptModal.innerHTML = `
            <div class="login-prompt-content">
                <span class="close-login-prompt">&times;</span>
                <h3>Login Required</h3>
                <p>You need to be logged in to add movies to your favorites.</p>
                <p>Would you like to login or create an account?</p>
                <div class="login-prompt-buttons">
                    <button id="login-prompt-login">Login</button>
                    <button id="login-prompt-signup">Sign Up</button>
                    <button id="login-prompt-cancel">Cancel</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(loginPromptModal);
        
        // Add event listeners
        const closeBtn = loginPromptModal.querySelector('.close-login-prompt');
        const loginBtn = loginPromptModal.querySelector('#login-prompt-login');
        const signupBtn = loginPromptModal.querySelector('#login-prompt-signup');
        const cancelBtn = loginPromptModal.querySelector('#login-prompt-cancel');
        
        closeBtn.addEventListener('click', () => {
            loginPromptModal.remove();
        });
        
        loginBtn.addEventListener('click', () => {
            loginPromptModal.remove();
            authModal.style.display = 'block';
            // Switch to login tab
            authTabs.forEach(tab => {
                if (tab.dataset.tab === 'login') {
                    tab.click();
                }
            });
        });
        
        signupBtn.addEventListener('click', () => {
            loginPromptModal.remove();
            authModal.style.display = 'block';
            // Switch to signup tab
            authTabs.forEach(tab => {
                if (tab.dataset.tab === 'signup') {
                    tab.click();
                }
            });
        });
        
        cancelBtn.addEventListener('click', () => {
            loginPromptModal.remove();
        });
    }
    
    async function addToFavorites(movieId) {
        try {
            // First check if it's a sample movie (from our fallback data)
            if (movieId <= 8 && document.querySelector('.api-error')) {
                // Find the sample movie from our sample data
                const allSampleMovies = [
                    {
                        id: 1,
                        title: "Action Movie 2025",
                        poster_path: null,
                        vote_average: 8.5,
                        release_date: "2025-01-15",
                        original_language: "en"
                    },
                    {
                        id: 2,
                        title: "French Drama",
                        poster_path: null,
                        vote_average: 7.8,
                        release_date: "2025-02-20",
                        original_language: "fr"
                    },
                    {
                        id: 3,
                        title: "Spanish Comedy",
                        poster_path: null,
                        vote_average: 9.2,
                        release_date: "2025-03-10",
                        original_language: "es"
                    },
                    {
                        id: 4,
                        title: "Japanese Anime",
                        poster_path: null,
                        vote_average: 6.9,
                        release_date: "2025-04-05",
                        original_language: "ja"
                    },
                    {
                        id: 5,
                        title: "Sci-Fi Adventure",
                        poster_path: null,
                        vote_average: 9.0,
                        release_date: "2025-05-20",
                        original_language: "en"
                    },
                    {
                        id: 6,
                        title: "Horror Night",
                        poster_path: null,
                        vote_average: 7.2,
                        release_date: "2025-06-13",
                        original_language: "en"
                    },
                    {
                        id: 7,
                        title: "Korean Drama",
                        poster_path: null,
                        vote_average: 8.7,
                        release_date: "2025-07-08",
                        original_language: "ko"
                    },
                    {
                        id: 8,
                        title: "Classic Romance",
                        poster_path: null,
                        vote_average: 7.5,
                        release_date: "2024-12-25",
                        original_language: "en"
                    }
                ];
                
                const sampleMovie = allSampleMovies.find(movie => movie.id === movieId) || {
                    id: movieId,
                    title: `Sample Movie ${movieId}`,
                    poster_path: null,
                    vote_average: 8.5,
                    release_date: "2025-05-15",
                    original_language: "en"
                };
                
                favorites.push(sampleMovie);
                saveUserFavorites();
                updateFavoriteButton(movieId);
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.textContent = `Added "${sampleMovie.title}" to favorites!`;
                document.body.appendChild(successMsg);
                
                // Remove after 2 seconds
                setTimeout(() => {
                    if (successMsg.parentNode) {
                        successMsg.parentNode.removeChild(successMsg);
                    }
                }, 2000);
                
                return;
            }
            
            // Otherwise try to fetch from API
            const url = `${config.baseUrl}/movie/${movieId}?api_key=${config.apiKey}`;
            console.log('Fetching movie for favorites:', url);
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const movie = await response.json();
            
            if (movie.success === false) {
                throw new Error(movie.status_message || 'API Error');
            }
            
            const favoriteMovie = {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                vote_average: movie.vote_average,
                release_date: movie.release_date,
                original_language: movie.original_language
            };
            
            favorites.push(favoriteMovie);
            saveUserFavorites();
            updateFavoriteButton(movieId);
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = `Added "${movie.title}" to favorites!`;
            document.body.appendChild(successMsg);
            
            // Remove after 2 seconds
            setTimeout(() => {
                if (successMsg.parentNode) {
                    successMsg.parentNode.removeChild(successMsg);
                }
            }, 2000);
            
        } catch (error) {
            console.error('Error adding to favorites:', error);
            
            // Create a basic movie object from what we know
            const basicMovie = {
                id: movieId,
                title: document.querySelector('.movie-detail-title')?.textContent || `Movie ${movieId}`,
                poster_path: null,
                vote_average: 7.5,
                release_date: "2025-01-01",
                original_language: "en"
            };
            
            favorites.push(basicMovie);
            saveUserFavorites();
            updateFavoriteButton(movieId);
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = `Added "${basicMovie.title}" to favorites!`;
            document.body.appendChild(successMsg);
            
            // Remove after 2 seconds
            setTimeout(() => {
                if (successMsg.parentNode) {
                    successMsg.parentNode.removeChild(successMsg);
                }
            }, 2000);
        }
    }
    
    function updateFavoriteButton(movieId) {
        const isFavorite = favorites.some(fav => fav.id === movieId);
        
        if (isFavorite) {
            addToFavoritesBtn.innerHTML = '<i class="fas fa-heart"></i> Remove from Favorites';
            addToFavoritesBtn.classList.add('favorited');
        } else {
            addToFavoritesBtn.innerHTML = '<i class="far fa-heart"></i> Add to Favorites';
            addToFavoritesBtn.classList.remove('favorited');
        }
    }
    
    function showFavorites() {
        // Check if user is logged in
        if (!currentUser) {
            // Show login prompt
            showLoginPrompt('favorites');
            return;
        }
        
        favoritesContainer.innerHTML = '';
        
        if (favorites.length === 0) {
            favoritesContainer.innerHTML = `
                <div class="no-results">
                    <p>You have no favorite movies yet.</p>
                    <p>Click the heart icon on any movie to add it to your favorites.</p>
                </div>
            `;
        } else {
            // Create a header with user info
            const favoritesHeader = document.createElement('div');
            favoritesHeader.className = 'favorites-header';
            favoritesHeader.innerHTML = `
                <h2>${currentUser.username}'s Favorite Movies</h2>
                <p>You have ${favorites.length} favorite movie${favorites.length !== 1 ? 's' : ''}</p>
            `;
            favoritesContainer.appendChild(favoritesHeader);
            
            // Create a container for the movie cards
            const favoritesGrid = document.createElement('div');
            favoritesGrid.className = 'favorites-grid';
            favoritesContainer.appendChild(favoritesGrid);
            
            favorites.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.className = 'movie-card';
                movieCard.dataset.id = movie.id;
                
                const posterPath = movie.poster_path 
                    ? `${config.imageBaseUrl}${config.posterSize}${movie.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Poster+Available';
                    
                const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
                
                const language = getLanguageName(movie.original_language || 'en');
                
                movieCard.innerHTML = `
                    <img src="${posterPath}" alt="${movie.title}" class="movie-poster">
                    <div class="movie-info">
                        <h3 class="movie-title">${movie.title}</h3>
                        <div class="movie-meta">
                            <p class="movie-year">${releaseYear}</p>
                            <p class="movie-language">${language}</p>
                        </div>
                        <div class="movie-rating">
                            <i class="fas fa-star"></i>
                            <span>${movie.vote_average.toFixed(1)}</span>
                        </div>
                        <button class="remove-favorite" data-id="${movie.id}" title="Remove from favorites">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                
                movieCard.addEventListener('click', function(e) {
                    // Don't trigger if clicking the remove button
                    if (e.target.closest('.remove-favorite')) {
                        return;
                    }
                    
                    showMovieDetails(movie.id);
                    favoritesModal.style.display = 'none';
                });
                
                favoritesGrid.appendChild(movieCard);
            });
            
            // Add event listeners for remove buttons
            document.querySelectorAll('.remove-favorite').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const movieId = parseInt(this.dataset.id);
                    const index = favorites.findIndex(fav => fav.id === movieId);
                    
                    if (index !== -1) {
                        const movieTitle = favorites[index].title;
                        favorites.splice(index, 1);
                        saveUserFavorites();
                        
                        // Remove the movie card
                        this.closest('.movie-card').remove();
                        
                        // Update the favorites button if the movie is currently open
                        if (currentMovieId === movieId) {
                            updateFavoriteButton(movieId);
                        }
                        
                        // Update the favorites count
                        const countText = document.querySelector('.favorites-header p');
                        if (countText) {
                            countText.textContent = `You have ${favorites.length} favorite movie${favorites.length !== 1 ? 's' : ''}`;
                        }
                        
                        // Show empty message if no favorites left
                        if (favorites.length === 0) {
                            favoritesContainer.innerHTML = `
                                <div class="no-results">
                                    <p>You have no favorite movies yet.</p>
                                    <p>Click the heart icon on any movie to add it to your favorites.</p>
                                </div>
                            `;
                        }
                        
                        // Show success message
                        const successMsg = document.createElement('div');
                        successMsg.className = 'success-message';
                        successMsg.textContent = `Removed "${movieTitle}" from favorites`;
                        document.body.appendChild(successMsg);
                        
                        setTimeout(() => {
                            if (successMsg.parentNode) {
                                successMsg.parentNode.removeChild(successMsg);
                            }
                        }, 2000);
                    }
                });
            });
        }
        
        favoritesModal.style.display = 'block';
    }
    
    function loadReviews(reviews) {
        reviewsContainer.innerHTML = '';
        
        try {
            // Get user reviews from localStorage
            const userReviews = JSON.parse(localStorage.getItem(`reviews_${currentMovieId}`)) || [];
            
            if ((!reviews || reviews.length === 0) && userReviews.length === 0) {
                reviewsContainer.innerHTML = '<p class="no-reviews">No reviews available for this movie.</p>';
                return;
            }
            
            // Safely combine TMDB reviews with user reviews
            const tmdbReviews = Array.isArray(reviews) ? reviews.slice(0, 5) : [];
            const allReviews = [...userReviews, ...tmdbReviews];
            
            if (allReviews.length === 0) {
                reviewsContainer.innerHTML = '<p class="no-reviews">No reviews available for this movie.</p>';
                return;
            }
            
            allReviews.forEach(review => {
                if (!review) return; // Skip invalid reviews
                
                const reviewItem = document.createElement('div');
                reviewItem.className = 'review-item';
                
                const author = review.author || 'You';
                let rating = 'N/A';
                
                // Handle different rating formats
                if (review.rating) {
                    rating = review.rating;
                } else if (review.author_details && review.author_details.rating) {
                    rating = review.author_details.rating;
                }
                
                const content = review.content || 'No content provided';
                
                reviewItem.innerHTML = `
                    <div class="review-header">
                        <span class="review-author">${author}</span>
                        <span class="review-rating">
                            ${rating !== 'N/A' ? `<i class="fas fa-star"></i> ${rating}` : 'No rating'}
                        </span>
                    </div>
                    <div class="review-content">${content}</div>
                `;
                
                reviewsContainer.appendChild(reviewItem);
            });
        } catch (error) {
            console.error('Error loading reviews:', error);
            reviewsContainer.innerHTML = '<p class="no-reviews">Error loading reviews. Please try again later.</p>';
        }
    }
    
    function setUserRating(rating) {
        userRating = rating;
        highlightStars(rating);
    }
    
    function highlightStars(rating) {
        starRating.forEach((star, index) => {
            if (index < rating) {
                star.className = 'fas fa-star';
            } else {
                star.className = 'far fa-star';
            }
        });
    }
    
    function submitReview() {
        if (reviewTextarea.value.trim() === '') {
            alert('Please write a review before submitting.');
            return;
        }
        
        const review = {
            author: 'You',
            rating: userRating,
            content: reviewTextarea.value.trim(),
            date: new Date().toISOString()
        };
        
        // Get existing reviews or initialize empty array
        const existingReviews = JSON.parse(localStorage.getItem(`reviews_${currentMovieId}`)) || [];
        
        // Add new review
        existingReviews.push(review);
        
        // Save to localStorage
        localStorage.setItem(`reviews_${currentMovieId}`, JSON.stringify(existingReviews));
        
        // Reset form
        reviewTextarea.value = '';
        setUserRating(0);
        
        // Reload reviews
        loadReviews([...existingReviews]);
        
        alert('Your review has been submitted!');
    }
    
    // Add data viewer button (for demonstration purposes)
    function addDataViewerButton() {
        const dataViewerBtn = document.createElement('button');
        dataViewerBtn.id = 'data-viewer-btn';
        dataViewerBtn.innerHTML = '<i class="fas fa-database"></i> View Data';
        dataViewerBtn.style.position = 'fixed';
        dataViewerBtn.style.bottom = '20px';
        dataViewerBtn.style.right = '20px';
        dataViewerBtn.style.zIndex = '1000';
        dataViewerBtn.style.padding = '10px 15px';
        dataViewerBtn.style.backgroundColor = '#032541';
        dataViewerBtn.style.color = 'white';
        dataViewerBtn.style.border = 'none';
        dataViewerBtn.style.borderRadius = '4px';
        dataViewerBtn.style.cursor = 'pointer';
        dataViewerBtn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        document.body.appendChild(dataViewerBtn);
        
        dataViewerBtn.addEventListener('click', showStoredData);
    }
    
    // Function to show stored data
    function showStoredData() {
        // Create a modal to display the data
        const dataModal = document.createElement('div');
        dataModal.className = 'data-modal';
        dataModal.style.position = 'fixed';
        dataModal.style.top = '0';
        dataModal.style.left = '0';
        dataModal.style.width = '100%';
        dataModal.style.height = '100%';
        dataModal.style.backgroundColor = 'rgba(0,0,0,0.8)';
        dataModal.style.zIndex = '1001';
        dataModal.style.display = 'flex';
        dataModal.style.justifyContent = 'center';
        dataModal.style.alignItems = 'center';
        
        // Get all the data
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const allFavorites = JSON.parse(localStorage.getItem('allUserFavorites')) || {};
        const apiKey = localStorage.getItem('tmdb_api_key') || 'Not set';
        
        // Remove sensitive information (passwords)
        const safeUsers = users.map(user => {
            const { password, ...safeUser } = user;
            return { ...safeUser, password: '********' }; // Replace password with asterisks
        });
        
        // Format the data as JSON with indentation
        const formattedData = JSON.stringify({
            users: safeUsers,
            currentUser,
            allFavorites,
            apiKey: apiKey.length > 6 ? apiKey.substring(0, 3) + '...' + apiKey.substring(apiKey.length - 3) : 'Not set' // Show only first and last 3 chars
        }, null, 2);
        
        // Create the modal content
        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = 'white';
        modalContent.style.padding = '30px';
        modalContent.style.borderRadius = '8px';
        modalContent.style.width = '80%';
        modalContent.style.maxWidth = '800px';
        modalContent.style.maxHeight = '80vh';
        modalContent.style.overflow = 'auto';
        modalContent.style.position = 'relative';
        
        modalContent.innerHTML = `
            <span style="position: absolute; top: 10px; right: 15px; font-size: 24px; cursor: pointer;">&times;</span>
            <h2 style="color: #032541; margin-top: 0;">Stored Data</h2>
            <div style="display: flex; margin-bottom: 15px;">
                <button id="copy-data" style="margin-right: 10px; padding: 8px 15px; background-color: #01b4e4; color: white; border: none; border-radius: 4px; cursor: pointer;">Copy to Clipboard</button>
                <button id="export-data" style="padding: 8px 15px; background-color: #032541; color: white; border: none; border-radius: 4px; cursor: pointer;">Export as JSON</button>
            </div>
            <pre style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; overflow: auto; max-height: 60vh;">${formattedData}</pre>
        `;
        
        dataModal.appendChild(modalContent);
        document.body.appendChild(dataModal);
        
        // Add event listeners
        const closeBtn = modalContent.querySelector('span');
        const copyBtn = document.getElementById('copy-data');
        const exportBtn = document.getElementById('export-data');
        
        closeBtn.addEventListener('click', () => {
            dataModal.remove();
        });
        
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(formattedData)
                .then(() => {
                    alert('Data copied to clipboard!');
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                    // Fallback for Safari which might not support clipboard API
                    const textArea = document.createElement('textarea');
                    textArea.value = formattedData;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-999999px';
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    alert('Data copied to clipboard!');
                });
        });
        
        exportBtn.addEventListener('click', () => {
            // Create the data object
            const exportData = {
                users: safeUsers,
                currentUser,
                allFavorites,
                exportDate: new Date().toISOString()
            };
            
            // Convert to JSON string
            const jsonString = JSON.stringify(exportData, null, 2);
            
            // Create a blob and download link
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            // Create download link and trigger download
            const a = document.createElement('a');
            a.href = url;
            a.download = 'movie-app-data.json';
            document.body.appendChild(a);
            a.click();
            
            // Clean up
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }
    
    // Add the data viewer button when the page loads
    addDataViewerButton();
});