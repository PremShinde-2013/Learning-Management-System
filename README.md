
# LearnifyPro 🚀

Welcome to **LearnifyPro** - the ultimate Learning Management System (LMS) that empowers educators, students, and administrators to create, manage, and excel in the world of learning!

This project is built with modern technologies like **React**, **Node.js**, **MongoDB**, and **TypeScript** to deliver a robust and user-friendly LMS.

---

## 🚀 **Key Features**
- **Efficient Backend:** Powered by **Node.js** and **Express.js** for fast and scalable server-side operations.
- **Real-time Communication:** Seamless, live updates with **Socket.IO**.
- **Data Management:** Reliable storage with **MongoDB**.
- **Performance Boost:** Optimized with **Redis** caching mechanism for faster data retrieval.
- **Client-side Rendering:** Smooth, fast user experiences using **Next.js**.
- **Stylish UI:** Aesthetic and responsive UI enhanced by **Material-UI**, **Next UI**, and **Tailwind CSS**.
- **Effortless Deployment:** Frontend deployed on **Vercel** and backend on **Render** for easy management.
- Admin panel for course and user management.
- Payment integration with **Stripe**.
- Authentication and security using **Clerk** and JWT.

---

## 🛠️ **Tech Stack**

| **Category**        | **Technology**                |
|---------------------|--------------------------------|
| Frontend            | **Next.js**, **Tailwind CSS**, **Material-UI**, **Next UI** |
| Backend             | **Node.js**, **Express.js**    |
| Database            | **MongoDB**, **Redis**         |
| Real-time Features  | **Socket.IO**                  |
| Authentication      | **Clerk**, **JWT**             |
| Payment Gateway     | **Stripe**                     |
| Deployment          | **Vercel** (Frontend), **Render** (Backend) |
| UI Components       | **Shadcn-UI**, **Framer Motion** |

---

## 🎯 **Project Setup**

Follow these steps to clone, install, and run LearnifyPro locally.

### 1️⃣ **Clone the Repository**

Open your terminal and run the following command:

```bash
# Clone the repository
git clone https://github.com/PremShinde-2013/Learning-Management-System.git

# Move into the project directory
cd Learning-Management-System
```

---

### 2️⃣ **Set Up the Server**

1. Navigate to the **server** folder:
   ```bash
   cd server
   ```
2. Install the dependencies:
   ```bash
   pnpm install
   ```
3. Create a `.env` file in the **server** directory with the following details:

```dotenv
PORT = 8000
ORIGIN = ['http://localhost:3000']
NODE_ENV = development

DB_URL = 'mongodb+srv://<your-mongodb-username>:<your-mongodb-password>@lms.iukma3o.mongodb.net/LMS'

CLOUD_NAME = <your-cloudinary-cloud-name>
CLOUD_API_KEY = <your-cloudinary-api-key>
CLOUD_SECRET_KEY = <your-cloudinary-secret-key>

REDIS_URL = rediss://<your-redis-url>

ACTIVATION_SECRET = <your-activation-secret>

ACCESS_TOKEN = <your-access-token>
REFRESH_TOKEN = <your-refresh-token>

ACCESS_TOKEN_EXPIRE = 5
REFRESH_TOKEN_EXPIRE = 3

SMTP_HOST= smtp.gmail.com
SMTP_SERVICE=gmail
SMTP_PORT=465
SMTP_MAIL=<your-email>
SMTP_PASSWORD=<your-email-app-password>

VDOCIPHER_API_SECRET = <your-vdocipher-api-secret>

STRIPE_PUBLISHABLE_KEY = <your-stripe-publishable-key>
STRIPE_SECRET_KEY = <your-stripe-secret-key>
```

4. Run the server:
   ```bash
   pnpm run dev
   ```
   The server should now be running at `http://localhost:8000`.

---

### 3️⃣ **Set Up the Client**

1. Open a new terminal and navigate to the **client** folder:
   ```bash
   cd client
   ```
2. Install the dependencies:
   ```bash
   pnpm install
   ```
3. Create a `.env` file in the **client** directory with the following details:

```dotenv
NEXT_PUBLIC_SERVER_URI = "http://localhost:8000/api/v1"
NEXT_PUBLIC_SOCKET_SERVER_URI = "http://localhost:8000/"

GOOGLE_CLIENT_ID = <your-google-client-id>
GOOGLE_CLIENT_SECRET = <your-google-client-secret>

GITHUB_CLIENT_ID = <your-github-client-id>
GITHUB_CLIENT_SECRET = <your-github-client-secret>

SECRET = <your-secret-key>

# Stripe Backup and Passkey (Optional)
# STRIPE_BACKUP = <your-stripe-backup-key>
# STRIPE_PASSKEY = <your-stripe-passkey>
```

4. Run the client:
   ```bash
   pnpm run dev
   ```
   The client should now be running at `http://localhost:3000`.

---

### 4️⃣ **Access the Application**

- **Client**: `http://localhost:3000`
- **API**: `http://localhost:8000/api/v1`

---

## 🌟 **Folder Structure**

Here's an overview of the project structure:

```plaintext
learnifypro/
│
├── client/           # Frontend code (Next.js)
│   ├── src/
│   ├── public/
│   ├── .env.example
│   └── ...
│
├── server/           # Backend code (Node.js + Express)
│   ├── src/
│   ├── .env.example
│   └── ...
│
├── README.md         # Documentation
└── ...
```

---

## 🧩 **Integrations**
LearnifyPro integrates seamlessly with popular services:

- **Stripe**: Payment gateway for subscriptions.
- **Clerk**: Authentication and user management.
- **Socket.IO**: Real-time chat and notifications.
- **MongoDB**: NoSQL database for data management.
- **Cloudinary**: Media storage and optimization.

---

## 🤝 **Contributing**

We welcome contributions to LearnifyPro! 🎉

To get started:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your meaningful commit message"
   ```
4. Push to your fork and submit a Pull Request.

---

## 📧 **Contact**

If you have questions, feel free to reach out:

- **Name**: Prem Shinde  
- **Email**: [shindeprem102@gmail.com](mailto:shindeprem102@gmail.com)
- **GitHub**: [PremShinde-2013](https://github.com/PremShinde-2013)
- **Portfolio**: [premshindedev.vercel.app](https://premshindedev.vercel.app/)

---


**Happy Coding! 🎉🚀**

---

