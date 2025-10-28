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

## Todos
    Here I will elaborate on things i have not managed to complete in the time frame I had, or things i would implement different.

1. **Tests**

2. **Validations** 
    There are some validations, but i would have wanted to validate the structure of the data in the csv if i would have more time.

3. **Async Reconcile**
    Right now the reconcile process happening synchronically after every data insertion, I would have wanted to implement it async using queus or different way in order to release the request and send back the response to client faster.

4. **Optamizations**
    There are some parts of the application that can be optimized, if its related to the reconciliation process (save already reconciled data), or related to caching certain things.

5. **UX/UI**
    There are some things I would have improved in the UI UX like, handling erros, the abillity to upload more than one file, refetching reconciled data after uploading files.