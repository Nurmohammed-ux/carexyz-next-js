# Care.xyz – Baby Sitting & Elderly Care Service Platform

Care.xyz is a full-stack caregiving platform designed to make it easier for people in Bangladesh to find and book trusted caregivers for babies, elderly family members, and sick individuals.

The platform allows users to explore caregiving services, book services based on their requirements, make online payments, and manage their bookings.

## 🌐 Live Website

**Live URL:** https://care-xyz-iota.vercel.app/

## 🎯 Project Purpose

Finding reliable caregivers for family members can be challenging. Care.xyz aims to simplify this process by connecting people with caregiving services through an accessible online platform.

The main goal is to make caregiving services easier to discover, book, and manage while providing a convenient experience for users.

## ✨ Key Features

- **User Authentication:** Register and log in using credentials or Google authentication.
- **Care Services:** Explore babysitting, elderly care, and sick-person care services.
- **Service Booking:** Book services based on duration and location.
- **Dynamic Pricing:** Calculate the total service cost based on the selected duration.
- **Secure Payments:** Pay for bookings through Stripe Checkout.
- **Payment Verification:** Verify payments using Stripe webhooks.
- **Booking Management:** View and manage personal bookings.
- **Booking Status:** Track booking statuses such as Pending, Confirmed, Completed, and Cancelled.
- **Invoice Emails:** Receive booking/payment-related email notifications.
- **Responsive Design:** User-friendly interface across desktop, tablet, and mobile devices.
- **Protected Routes:** Restrict private pages to authenticated users.

## 🛠️ Technologies Used

### Frontend
- Next.js
- React
- JavaScript
- Tailwind CSS
- DaisyUI
- React Icons

### Backend
- Next.js App Router
- Next.js API Routes
- MongoDB
- NextAuth.js
- Stripe
- Nodemailer

### Authentication & Security
- NextAuth.js
- Google OAuth
- Credentials Authentication
- Protected Routes
- Environment Variables
- Stripe Webhook Signature Verification

### Deployment
- Vercel
- MongoDB Atlas
- Stripe

## 📦 NPM Packages

The project uses the following packages and libraries:

- `next`
- `react`
- `react-dom`
- `next-auth`
- `mongodb`
- `stripe`
- `nodemailer`
- `sweetalert2`
- `react-icons`
- `tailwindcss`
- `daisyui`

Check `package.json` for the exact installed versions and additional dependencies.

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project Directory

```bash
cd care-xyz
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory.

```env
# MongoDB
DB_USER=your_mongodb_username
URI=your_mongodb_connection_string

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Email Configuration
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Application URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Important:** Never upload `.env.local` or expose your API keys, database credentials, OAuth secrets, or payment credentials to GitHub.

### 5. Start the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

## 💳 Stripe Payment Integration

Care.xyz uses Stripe Checkout to process online payments.

The payment workflow:

1. A user selects a caregiving service.
2. The application creates a Stripe Checkout Session.
3. The user completes payment through Stripe.
4. Stripe sends a `checkout.session.completed` event to the application webhook.
5. The webhook verifies the payment and updates the payment record in MongoDB.
6. The application creates the corresponding booking and processes the invoice email.

### Local Webhook Testing

Install the Stripe CLI and run:

```bash
stripe listen --forward-to localhost:3000/api/payment/webhook --events checkout.session.completed
```

Copy the generated webhook signing secret into `.env.local`:

```env
STRIPE_WEBHOOK_SECRET=whsec_your_local_webhook_secret
```

For production, configure a separate webhook endpoint in your Stripe Dashboard:

```text
https://care-xyz-iota.vercel.app/api/payment/webhook
```

Subscribe to:

```text
checkout.session.completed
```

Use the production endpoint's signing secret in Vercel environment variables.

## 🔐 Environment & Security

- Keep sensitive credentials in environment variables.
- Never expose Stripe secret keys in client-side code.
- Verify Stripe webhook signatures before processing payment events.
- Validate booking information on the server.
- Protect private routes and verify user ownership of bookings.
- Do not trust client-provided payment status or user roles.

## 📁 Project Structure

A simplified overview of the project:

```text
care-xyz/
│
├── public/
│   └── carexyzlogo.png
│
├── src/
│   ├── action/
│   │   └── server/
│   │
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── bookings/
│   │   │   ├── payment/
│   │   │   └── ...
│   │   │
│   │   ├── login/
│   │   ├── register/
│   │   ├── booking/
│   │   ├── my-bookings/
│   │   └── ...
│   │
│   ├── components/
│   └── lib/
│
├── .env.local
├── .gitignore
├── package.json
└── README.md
```

*The structure above is illustrative; adjust it to match the actual repository.*

## 🚀 Deployment

The application is deployed on Vercel.

To deploy your own version:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Add your production domain to Google OAuth authorized origins and redirect URIs.
5. Configure the production Stripe webhook.
6. Deploy the application.

## 👨‍💻 Author

**Nur Mohammed**

Full-Stack Web Developer

## 📄 License

This project was developed for educational and portfolio purposes.
