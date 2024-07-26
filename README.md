# Friends in Flats

## Project Description

Friends in Flats is a comprehensive web application designed to connect landlords with potential tenants. The platform enables landlords to add apartments and rooms, complete with detailed descriptions, locations, and prices. Users can easily search for available flats based on various filters such as location and price. The application is built using Next.js for the frontend, Tailwind CSS for styling, and Supabase for backend services, including authentication and database management.

### Key Features

- **Landlord Onboarding**: A dedicated onboarding process for landlords to add apartments and rooms.
- **User Authentication**: Secure user authentication system powered by Supabase.
- **Search Filters**: Users can filter apartments by location and price.
- **Responsive Design**: Ensures a seamless experience across devices using Tailwind CSS.
- **Apartment and Room Management**: Landlords can add, and manage their property listings.
- **User Experience Enhancements**: Includes a slider for room images within an apartment listing for better user experience.
- **Security**: Redirects unauthenticated users trying to access landlord functionalities to the login page.

### What Has Been Implemented

1. **Authentication**:
    - Integrated Supabase authentication for user sign-up, login, and password recovery.
    - Ensured that only authenticated users can access landlord functionalities.

2. **Landlord Onboarding**:
    - Created forms for landlords to add apartments and rooms.
    - Redirected unauthenticated users to the login page if they try to access the landlord onboarding page.

3. **Apartment and Room Management**:
    - Built forms to add apartments and rooms with detailed descriptions, images, and other relevant details.
    - Displayed success messages when an apartment or room is successfully added.
    - Show error messages if the fields are not completed.

4. **Search Filters**:
    - Implemented location and price range filters.
    - Dynamically fetched unique locations from the database and sorted them alphabetically for the location filter.
    - Set the minimum and maximum price dynamically based on the available apartments in the database.

5. **User Interface**:
    - Designed a responsive UI using Tailwind CSS.
    - Added navigation links and headers with a consistent theme across the application.
    - Styled forms and buttons for a clean and modern look.

6. **Error Handling**:
    - Displayed appropriate error messages for invalid actions or failed operations.

7. **Deployment**:
    - Prepared the application for deployment on Vercel for a live demo.

## Getting Started

Please follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [npm](https://www.npmjs.com/get-npm) (v6 or higher) or [yarn](https://classic.yarnpkg.com/en/docs/install/)
- [Visual Studio Code](https://code.visualstudio.com/)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/razienauruci/friends_in_flats.git
    cd friends_in_flats
    ```

2. **Open the project in Visual Studio Code**:
    ```bash
    code .
    ```

3. **Set up Supabase**:
    - Create a `.env.local` file in the root directory and add the Supabase credentials:
        ```env
        NEXT_PUBLIC_SUPABASE_URL=https://hltzhprdivfousdfnnvi.supabase.co
        NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsdHpocHJkaXZmb3VzZGZubnZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE0MDg2MTgsImV4cCI6MjAzNjk4NDYxOH0.kUlC_LaE6WcrjrMu0F5ZtAUVtsCujhlP1-662BFnqV4
        ```
4. **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

5. **Run the development server**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

6. **Open the app in your browser**:
    ```bash
    http://localhost:3000
    ```

### Deployment

The project is deployed on Vercel. You can view the live demo here:
[Live Demo](https://friendsinflats-4zoiwftxg-razienaurucis-projects.vercel.app/)

