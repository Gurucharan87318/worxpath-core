### 📋 Project Installation Sequence

```bash
# Clone the repository and enter the directory
git clone https://github.com/Gurucharan87318/worxpath-core.git
cd worxpath-core

# Install the package dependencies
npm install

# Initialize your local database mapping and architecture
npx prisma generate
npx prisma db push

# Launch the development platform locally
npm run dev

```
Both need to be running simultaneously in separate terminal
Run the frontend [ CD C:\Users\chara\Downloads\worxpath\apps\web ] [npm run dev]
Run the Backend [ CD C:\Users\chara\Downloads\worxpath\apps\api ] [pnpm start]
---

### 🔑 Local Environment Keys (`.env`)

Create an `.env` file in the root folder and add your private infrastructure strings:

```env
DATABASE_URL="postgresql://postgres:your_password@db.supabase.co:5432/postgres"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGci..."

```

---

### 🛡️ Critical Guidelines

* **Main Branch Block:** The `main` branch is locked; you must create a branch via `git checkout -b feature/your-feature` to make changes.
* **Pull Request Rule:** All completed code must be submitted via a GitHub Pull Request for code review before merging.
* **Credentials Lock:** Never commit your `.env` file to Git—keep all API keys and database strings local.
* **Nested Git Guard:** Ensure no hidden nested `.git` folders exist inside subdirectories like `apps/api/` to avoid build crashes.
