# Online Bookstore Web App

A professional React + TypeScript bookstore application with customer and admin views.

## Project Overview

This is a full-stack bookstore web application built with modern technologies:
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: Context API
- **Forms**: React Hook Form patterns
- **Data**: Mock API (can be replaced with JSON Server or backend)

## Features

### Customer Features
- Browse and search books with debounced search
- Filter by category
- View detailed book information
- Add books to shopping cart
- Place orders
- Dark/light theme toggle
- Responsive design for all devices

### Admin Features
- Manage book catalog (CRUD operations)
- Add, edit, delete books with form validation
- Manage inventory
- Admin authentication with demo login
- Protected admin routes

## Folder Structure

\`\`\`
src/
├── components/
│   ├── Button.tsx              # Reusable button component
│   ├── BookCard.tsx            # Book display card
│   ├── Navbar.tsx              # Navigation bar
│   ├── Footer.tsx              # Footer component
│   ├── Modal.tsx               # Reusable modal
│   ├── Input.tsx               # Form input component
│   ├── SearchBar.tsx           # Search input component
│   └── ConfirmDialog.tsx        # Confirmation dialog
├── pages/
│   ├── Home.tsx                # Home page
│   ├── Catalog.tsx             # Book catalog with search/filter
│   ├── BookDetails.tsx         # Individual book details
│   ├── Cart.tsx                # Shopping cart
│   └── Admin.tsx               # Admin dashboard
├── context/
│   ├── CartContext.tsx         # Cart state management
│   ├── UserContext.tsx         # User authentication
│   └── ThemeContext.tsx        # Theme (dark/light)
├── hooks/
│   ├── useCart.ts              # Cart context hook
│   ├── useUser.ts              # User context hook
│   ├── useTheme.ts             # Theme context hook
│   ├── useBooks.ts             # CRUD operations hook
│   └── useDebounce.ts          # Debounce utility hook
├── services/
│   ├── api.ts                  # API calls
│   └── localStorage.ts         # Local storage utilities
├── types/
│   └── index.ts                # TypeScript interfaces
├── data/
│   └── mockBooks.ts            # Mock book data
├── router.tsx                  # React Router configuration
├── App.tsx                     # Main app component
└── main.tsx                    # Entry point
\`\`\`

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-username/bookstore-frontend.git
cd bookstore-frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Install additional packages (if needed):
\`\`\`bash
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

4. Start development server:
\`\`\`bash
npm run dev
\`\`\`

The application will be available at `http://localhost:5173`

## Project Implementation

### Day 1: Setup & Basic Components ✅
- [x] Initialize Vite + TypeScript project
- [x] Create professional folder structure
- [x] Create Home page with featured books
- [x] Create reusable components (Button, BookCard, Navbar, Footer)
- [x] Set up TypeScript interfaces

### Day 2: Routing & Pages ✅
- [x] Add React Router with createBrowserRouter
- [x] Create Catalog page with category filtering
- [x] Create BookDetails page with related books
- [x] Create Cart page with order summary
- [x] Implement client-side navigation

### Day 3: Context API & Auth ✅
- [x] Create CartContext for global cart management
- [x] Create UserContext for authentication
- [x] Implement role-based access control
- [x] Create custom hooks (useCart, useUser)
- [x] Update all pages to use contexts

### Day 4: Admin & CRUD ✅
- [x] Create Admin page with authentication
- [x] Build reusable UI components (Modal, Input, ConfirmDialog)
- [x] Implement full CRUD operations
- [x] Create useBooks hook for book management
- [x] Add form validation
- [x] Implement admin table

### Day 5: Optimization & Polish ✅
- [x] Add SearchBar component with debounce
- [x] Implement search and filter functionality
- [x] Add React.memo for performance optimization
- [x] Create ThemeContext for dark/light mode
- [x] Add theme toggle button
- [x] Create useDebounce custom hook
- [x] Optimize component re-renders
- [x] Polish UI and improve UX

## Development Workflow

### Git Workflow

\`\`\`bash
# Clone repository
git clone https://github.com/your-username/bookstore-frontend.git
cd bookstore-frontend

# Create feature branch
git checkout -b feature/day1-setup development

# Make changes and commit
git add .
git commit -m "feat: setup Vite + TypeScript project"
git commit -m "feat: add folder structure"
git commit -m "feat: create Home page"

# Push to remote
git push -u origin feature/day1-setup

# Create Pull Request and merge to development
# Then merge development to main when all days are complete
\`\`\`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter (if configured)

## Technologies & Libraries

### Core
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing

### State Management
- **Context API** - Global state management
- **localStorage** - Persistent storage

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

### Forms & Validation
- **React Hook Form** - Form state management (ready to integrate)
- **Custom validation** - Form field validation

### Performance
- **React.memo** - Component memoization
- **useCallback** - Function memoization
- **useMemo** - Value memoization
- **useDebounce** - Debounced search

## Key Features Implemented

### Search & Filter
- Real-time book search with debouncing (500ms)
- Category-based filtering
- Search across title, author, and description
- Results counter

### Performance Optimizations
- Memoized BookCard component to prevent unnecessary re-renders
- Debounced search queries
- useCallback for event handlers
- useMemo for filtered book lists

### Theme System
- Dark/light mode toggle
- Persistent theme preference in localStorage
- Easy to extend with more themes

### Form Validation
- Title, author, category required
- Price validation (must be positive)
- Stock validation (must be >= 0)
- Rating validation (0-5 range)
- Real-time error messages

### Cart Management
- Add items with auto-increment quantity
- Remove items from cart
- Update item quantities
- Clear entire cart
- Calculate totals with tax and shipping
- Persistent cart (ready to implement)

### Admin Features
- Demo admin login
- Protected admin routes
- Full CRUD operations
- Form validation
- Confirmation dialogs for delete
- Responsive admin table

## Component Architecture

### Reusable Components
- **Button** - Primary, secondary, danger variants
- **BookCard** - Display book with add to cart
- **Input** - Form input with error handling
- **Modal** - Generic modal for forms
- **SearchBar** - Search with clear button
- **ConfirmDialog** - Confirmation for actions

### Page Components
- **Home** - Landing page with featured books
- **Catalog** - Browse all books with search/filter
- **BookDetails** - Detailed book view with related books
- **Cart** - Shopping cart with checkout
- **Admin** - Book management dashboard

## Context API Architecture

### CartContext
- Global cart state
- Add, remove, update quantity
- Calculate totals
- Clear cart

### UserContext
- User authentication
- Role-based access (customer/admin)
- Persistent user storage

### ThemeContext
- Current theme (light/dark)
- Theme toggle
- Persistent preference

## Custom Hooks

\`\`\`typescript
// Cart management
const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();

// User authentication
const { user, isAdmin, login, logout } = useUser();

// Theme toggle
const { theme, toggleTheme } = useTheme();

// Book CRUD
const { books, addBook, updateBook, deleteBook } = useBooks();

// Debounced value
const debouncedSearchQuery = useDebounce(searchQuery, 500);
\`\`\`

## Testing the Application

### Customer Flow
1. Visit home page
2. Browse featured books
3. Go to Catalog and search for books
4. Filter by category
5. View book details
6. Add books to cart
7. View and modify cart
8. Proceed to checkout (demo)

### Admin Flow
1. Go to Admin page
2. Click "Demo Admin Login"
3. Add new books
4. Edit existing books
5. Delete books
6. View changes reflected in catalog

### Theme Testing
1. Click theme toggle button (moon/sun icon)
2. Verify dark mode styling
3. Refresh page - theme persists

## Future Enhancements

- [ ] Backend integration with Node.js/Express
- [ ] Real database (MongoDB, PostgreSQL)
- [ ] User registration and authentication
- [ ] Payment integration (Stripe)
- [ ] Order management and history
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search filters
- [ ] Admin analytics dashboard
- [ ] Email notifications
- [ ] User profile page
- [ ] Multiple payment methods

## Performance Tips

- Search uses debouncing to reduce re-renders
- BookCard components are memoized
- Event handlers use useCallback
- Filtered lists use useMemo
- Theme preference stored in localStorage
- Images are lazy-loaded

## Troubleshooting

### Cart not persisting
- Implement localStorage sync in CartContext useEffect
- Example: Save cart to localStorage when cartItems changes

### Search too slow
- Increase debounce delay in Catalog page
- Implement search indexing for large datasets

### Admin page access
- Click "Demo Admin Login" button
- User role must be "admin"
- Check UserContext for auth state

## License

MIT

## Support

For issues or questions, please create an issue on GitHub.

## Credits

Built as part of React Frontend Development Training Program

---

**Project Statistics:**
- Components: 11
- Pages: 5
- Context Providers: 3
- Custom Hooks: 6
- Total Lines of Code: ~2000+
- Build Time: < 1 second with Vite
