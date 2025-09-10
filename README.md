# Employee Dashboard - Next.js Application

A comprehensive employee management dashboard built with Next.js, TypeScript, and TailwindCSS. This application provides a modern interface for viewing, searching, filtering, and managing employee data with both card and row view layouts.

## 🚀 Features

### Core Functionality
- **Dual View Modes**: Switch between card-based and row-based (table) layouts
- **Advanced Search**: Real-time search across name, email, position, department, and location
- **Multi-Field Filtering**: Filter by department, status, and location
- **Flexible Sorting**: Sort by name, department, position, salary, join date, or location
- **Pagination**: Efficient data loading with customizable page sizes
- **Responsive Design**: Optimized for desktop and mobile devices

### Technical Features
- **Local API Integration**: Custom Next.js API routes serving JSON data
- **Debounced Search**: Optimized search performance with 300ms debouncing
- **TypeScript**: Strict typing throughout the application
- **Error Handling**: Comprehensive error states with retry functionality
- **Loading States**: Smooth loading indicators for better UX
- **Performance Optimized**: Efficient re-renders and data fetching

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Data**: Local JSON file with API endpoints
- **State Management**: React hooks with custom data fetching

## 📁 Project Structure

```
nextjs-data-dashboard/
├── app/
│   ├── api/employees/
│   │   └── route.ts          # Employee API endpoint
│   ├── globals.css           # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Home page
├── components/
│   ├── EmployeeDashboard.tsx # Main dashboard component
│   ├── EmployeeCard.tsx     # Card view component
│   ├── EmployeeTable.tsx    # Table view component
│   ├── SearchBar.tsx        # Search input component
│   ├── FilterControls.tsx   # Filter dropdown controls
│   ├── SortControls.tsx     # Sort controls
│   ├── ViewToggle.tsx       # View mode toggle
│   ├── Pagination.tsx       # Pagination component
│   ├── LoadingSpinner.tsx   # Loading state component
│   └── ErrorMessage.tsx     # Error state component
├── hooks/
│   └── useEmployees.ts      # Custom hook for employee data
├── lib/
│   └── utils.ts             # Utility functions
├── types/
│   └── index.ts             # TypeScript type definitions
├── data/
│   └── data.json            # Employee data (1000 records)
└── Configuration files...
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/1234-ad/nextjs-data-dashboard.git
   cd nextjs-data-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 📊 API Documentation

### GET /api/employees

Fetches employee data with support for pagination, search, filtering, and sorting.

#### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `query` | string | '' | Search term for name, email, position, department, location |
| `page` | number | 1 | Page number for pagination |
| `limit` | number | 10 | Number of items per page |
| `sortBy` | string | 'id' | Field to sort by (name, department, position, salary, joinDate, location) |
| `sortOrder` | string | 'asc' | Sort direction (asc, desc) |
| `department` | string | '' | Filter by department |
| `status` | string | '' | Filter by status (Active, Inactive) |
| `location` | string | '' | Filter by location |

#### Response Format

```json
{
  "data": [
    {
      "id": 1,
      "name": "John Smith",
      "email": "john.smith@example.com",
      "department": "Engineering",
      "position": "Senior Developer",
      "salary": 95000,
      "joinDate": "2022-03-15",
      "status": "Active",
      "location": "New York",
      "skills": ["JavaScript", "React", "Node.js"]
    }
  ],
  "total": 1000,
  "page": 1,
  "limit": 10,
  "totalPages": 100
}
```

## 🎨 Design Implementation

The application implements a clean, modern design with:

- **Card View**: Grid layout with employee cards showing key information
- **Row View**: Table layout with comprehensive employee data
- **Consistent Color Scheme**: Primary blue theme with gray accents
- **Interactive Elements**: Hover states, transitions, and visual feedback
- **Responsive Grid**: Adaptive layouts for different screen sizes

## 🔧 Key Components

### EmployeeDashboard
Main orchestrating component that manages:
- View mode state (card/row)
- Search and filter parameters
- Data fetching and error handling
- Layout and component composition

### useEmployees Hook
Custom hook providing:
- Data fetching with error handling
- Debounced search functionality
- Pagination management
- Loading states

### API Route Handler
Server-side functionality:
- JSON file reading
- Search and filtering logic
- Sorting implementation
- Pagination calculations

## 🚀 Performance Optimizations

- **Debounced Search**: 300ms delay prevents excessive API calls
- **Efficient Pagination**: Only loads required data per page
- **Memoized Calculations**: Optimized filter options and pagination info
- **Optimistic Updates**: Immediate UI feedback for better UX
- **Error Boundaries**: Graceful error handling with retry options

## 🧪 Development Features

- **TypeScript**: Strict typing for better development experience
- **ESLint**: Code quality and consistency
- **Hot Reload**: Fast development iteration
- **Component Isolation**: Modular, reusable components
- **Custom Hooks**: Reusable business logic

## 📱 Responsive Design

The application is optimized for:
- **Desktop**: Full feature set with optimal layout
- **Tablet**: Adapted grid and table layouts
- **Mobile**: Stacked layouts and touch-friendly controls

## 🔮 Future Enhancements

Potential improvements for production use:
- Real database integration
- User authentication and authorization
- Employee CRUD operations
- Advanced filtering (date ranges, salary ranges)
- Export functionality (CSV, PDF)
- Real-time updates with WebSockets
- Advanced search with autocomplete
- Bulk operations
- Employee profile pages
- Analytics and reporting

## 📄 License

This project is created for demonstration purposes.

## 🤝 Contributing

This is a demonstration project. For production use, consider:
- Adding comprehensive testing
- Implementing proper error logging
- Adding monitoring and analytics
- Setting up CI/CD pipelines
- Adding security measures
- Implementing caching strategies

---

**Built with ❤️ using Next.js, TypeScript, and TailwindCSS**