# Book Recommendation System

**Overview:**
- **Purpose:** A simplified book recommendation web application that allows users to browse books, search by title/author, view details and provide feedback.
- **Data source:** Book data is fetched from the Google Books API.
- **Project type:** Front-end only.

**Tech Stack:**
- Front-end: React + TypeScript
- UI: Material UI, AG Grid

**Key Features:**
- **Login:** Enter username and password; initials stored in browser storage for session persistence.
- **Book List:** Browse a list of books showing Title, Author, Genre and Average Rating.
- **Search:** Dynamic search for book Title or Author.
- **Book Details & Reviews:** View details of a book and leave a feedback.

**Project Structure (high level)**
- `src/components/` — UI components
- `src/pages/` — Page views (book list, book details, login)
- `src/services/` — API client and service wrappers
- `src/store/` — Redux slices and store configuration
- `src/api-models/` — Google Books API models and mapper utilities
- `src/types/` — TypeScript interfaces and types
- `src/hooks/` — Custom hooks

**Additional Improvements**
 - Debounced search input using a custom hook.
 - Search keyword is retained across navigation
 - Robust error handling.
 - Logout functionality.

**Setup & Installation**

Prerequisites:
- Node.js (v16+ recommended)
- Yarn or npm

1. Clone the repository:
2. Install dependencies (using Yarn):
3. Start the dev server:


**Usage**
- **Default credentials to login:** `username: admin`, `password: 1234`
