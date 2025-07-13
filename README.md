# CarePlus - Modern Healthcare Appointment System

![CarePlus Logo](public/logo/logo.svg)

CarePlus is a comprehensive healthcare platform designed to streamline patient registration, appointment scheduling, and medical record management. It features complex form handling and SMS notifications to enhance user experience and communication efficiency. Ideal for clinics and hospitals aiming to optimize patient workflows.

## 🌟 Live Demo

Check out the live demo: [CarePlus Live](https://careplus-theta.vercel.app/)

## ✨ Features

- **Patient Registration**: Secure and efficient sign-up process
- **Appointment Management**: Easy scheduling and tracking of medical appointments
- **User Authentication**: Secure login system with proper session management
- **Responsive Design**: Fully responsive interface that works on all devices
- **Form Validation**: Robust form handling with React Hook Form and Zod
- **Modern UI**: Built with Radix UI and Tailwind CSS for a clean, professional look

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- Appwrite instance (for backend services)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/careplus.git
   cd careplus
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add the following variables:

   ```
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
   NEXT_PUBLIC_APPWRITE_COLLECTION_USERS=users_collection_id
   NEXT_PUBLIC_APPWRITE_COLLECTION_APPOINTMENTS=appointments_collection_id
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **State Management**: React Hook Form
- **Backend**: Appwrite
- **Deployment**: Vercel
- **Monitoring**: Sentry

## 🏗 Project Structure

```
careplus/
├── app/                    # App router pages
│   ├── admin/             # Admin dashboard
│   └── patients/          # Patient routes
├── components/            # Reusable components
│   ├── ui/                # UI components
│   └── forms/             # Form components
├── lib/                   # Utility functions
├── public/                # Static files
│   ├── images/            # Image assets
│   └── logo/              # Logo and icons
└── types/                 # TypeScript type definitions
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Appwrite Documentation](https://appwrite.io/docs)

## 🚀 Deployment

The application is deployed on Vercel. You can deploy your own instance by:

1. Forking this repository
2. Connecting it to your Vercel account
3. Setting up the required environment variables
4. Deploying!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fcareplus)

---

Made with ❤️ by Abinash Sahoo | [![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Fyourusername)](https://twitter.com/yourusername)
