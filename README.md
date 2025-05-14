# BharatBrainrot: Indian Tech Twitter Generator SaaS

A full-stack SaaS application that generates satirical tech Twitter posts for the Indian tech audience with varying levels of "brainrot" (buzzwords, hype cycles, and tech opinions).

## Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, ShadCN UI
- **Backend**: Next.js API routes, Supabase Functions
- **Database**: Supabase PostgreSQL
- **Auth**: Supabase Auth with email/password + social login
- **Payments**: Razorpay integration
- **AI**: Gemini API for content generation

## Features

- Landing page with pricing tiers
- User authentication with email and Google OAuth
- Content generation with customizable parameters:
  - Toxicity level
  - Tone selection
  - Topic focus
  - Buzzword density
- Premium subscription management
- Generation history tracking
- User preferences management

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bharatbrainrot.git
   cd bharatbrainrot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with the following variables:
   ```
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

   # Razorpay Configuration
   RAZORPAY_KEY_ID=your-razorpay-key-id
   RAZORPAY_KEY_SECRET=your-razorpay-key-secret

   # Gemini API Configuration
   GEMINI_API_KEY=your-gemini-api-key

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Enable email and Google OAuth authentication
   - Run the database schema from `supabase/schema.sql`

5. **Set up Razorpay**
   - Create a Razorpay account
   - Create a subscription plan with ID 'plan_premium'
   - Get your API keys

6. **Set up Gemini API**
   - Get your API key from Google AI Studio

7. **Run the development server**
   ```bash
   npm run dev
   ```

8. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Database Schema

The application uses three main tables:

1. **user_profiles**
   - Extends Supabase Auth users
   - Stores user preferences and quotas

2. **generations**
   - Stores generation history
   - Links to user profiles

3. **subscriptions**
   - Manages premium subscriptions
   - Tracks Razorpay integration

## API Routes

- `POST /api/generate` - Generate new content
- `GET /api/user/usage` - Check quota usage
- `POST /api/payments/create-subscription` - Create Razorpay subscription
- `POST /api/payments/verify-subscription` - Verify payment
- `POST /api/payments/cancel-subscription` - Cancel subscription
- `PUT /api/user/preferences` - Update preferences

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.