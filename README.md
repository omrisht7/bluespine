# BlueSpine - Healthcare Claims Reconciliation Dashboard

BlueSpine is a full-stack application designed to help healthcare providers reconcile claims and invoices efficiently. It provides a modern, user-friendly interface for tracking and analyzing payment discrepancies between claims and their corresponding invoices.

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Omrisht7/bluespine.git
   cd bluespine
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```
   This will install dependencies for the root project, client, and server.

3. **Generate test data**
   ```bash
   npm run generate-data
   ```
   This creates sample claims, invoices, and patient data for testing.

4. **Development Mode**
   ```bash
   npm run dev
   ```
   This starts both the client (port 5173) and server (port 4000) in development mode with hot reloading.

5. **Production Mode**
   ```bash
   npm run start
   ```
   This builds and starts both client and server in production mode.
