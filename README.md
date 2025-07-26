# Welcome to your Lovable project

## Restaurant Management System

A full-stack restaurant management application with separate admin and user interfaces.

### Features

#### Admin Features
- Admin registration and authentication
- Menu item management (CRUD operations)
- Order management and status updates
- Dashboard with analytics

#### User Features
- User registration and authentication
- Browse menu items with search and filters
- Place orders
- Order history and tracking
- Profile management

#### Technical Features
- JWT-based authentication
- SQLite databases (separate for admin and user data)
- RESTful API design
- Input validation and sanitization
- Rate limiting and security headers
- Comprehensive logging
- Error handling with consistent response format

## Project info

**URL**: https://lovable.dev/projects/9f4baad9-a7c2-4e14-b351-a93a482f06bc

## Backend Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the backend directory:
```sh
cd back
```

2. Install dependencies:
```sh
npm install
```

3. Create environment file:
```sh
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production_2024
PORT=5000
NODE_ENV=development
```

5. Start the backend server:
```sh
npm run dev
```

The backend will be available at `http://localhost:5000`

### API Endpoints

#### Public Endpoints
- `GET /api/public/health` - Health check
- `GET /api/public/menu` - Get menu items (with filters)
- `GET /api/public/menu/categories` - Get menu categories
- `GET /api/public/menu/featured` - Get featured items

#### Admin Endpoints
- `POST /api/admin/register` - Admin registration
- `POST /api/admin/login` - Admin login
- `GET /api/admin/menu-items` - Get all menu items
- `POST /api/admin/menu-items` - Create menu item
- `PUT /api/admin/menu-items/:id` - Update menu item
- `DELETE /api/admin/menu-items/:id` - Delete menu item
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id/status` - Update order status

#### User Endpoints
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `POST /api/user/orders` - Create order
- `GET /api/user/orders` - Get user orders
- `PUT /api/user/orders/:id/cancel` - Cancel order

## Frontend Setup

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9f4baad9-a7c2-4e14-b351-a93a482f06bc) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Install backend dependencies.
cd back && npm i && cd ..

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev:full
```

This will start both the frontend (port 8080) and backend (port 5000) servers.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

### Frontend
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

### Backend
- Node.js
- Express.js
- SQLite with Sequelize ORM
- JWT for authentication
- bcryptjs for password hashing
- Express validation and rate limiting

## Database Schema

### Admin Database (`admin.sqlite`)
- **admins** - Admin user accounts
- **menu_items** - Restaurant menu items

### User Database (`user.sqlite`)
- **users** - Customer accounts
- **orders** - Customer orders

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9f4baad9-a7c2-4e14-b351-a93a482f06bc) and click on Share -> Publish.

Note: For production deployment, make sure to:
1. Set strong JWT secrets
2. Configure proper CORS origins
3. Set up production database
4. Enable HTTPS
5. Configure proper logging levels

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Troubleshooting

### Common Issues

1. **CORS errors**: Make sure the frontend URL is added to CORS_ORIGINS in the backend .env file
2. **Database connection issues**: Check that the databases directory exists and has proper permissions
3. **JWT errors**: Ensure JWT_SECRET is set in the .env file
4. **Port conflicts**: Make sure ports 5000 (backend) and 8080 (frontend) are available

### Logs
Backend logs are stored in the `back/logs/` directory, organized by date.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License."# BOLT" 
