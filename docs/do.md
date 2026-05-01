# Universal Profile Engine - Build Complete!

## What Was Built

I've created the full application with 3 main components:

### 1. Authentication Layer ✅
- Uses existing Construct login/register (Selise IAM Block)
- Located at `/signin` and `/signup`

### 2. Editor Dashboard ✅ (NEW)
- Route: `/editor`
- Features:
  - Create or edit user profile
  - Edit: display name, headline, bio
  - Add profile image URL
  - Add header image URL
  - Add social links (LinkedIn, GitHub, Portfolio)
  - Save to Selise Data Gateway
- Menu: Added "PROFILE_EDITOR" in sidebar

### 3. Public Profile Page ✅ (NEW)
- Route: `/profile/:username`
- Anyone can view (no login required)
- Shows: profile image, header image, name, headline, bio, social links

---

## How to Run

### 1. Navigate to project:
```bash
cd profileforge
```

### 2. Install dependencies (if needed):
```bash
npm install
```

### 3. Run the app:
```bash
npm run dev
```

### 4. Open browser:
- Go to: `http://localhost:5173` (or the port shown)

---

## How to Test

### Step 1: Register/Login
1. Go to `/signin` or `/signup`
2. Create an account or login

### Step 2: Create Profile
1. Click "Profile Editor" in sidebar (or go to `/editor`)
2. Fill in your profile details:
   - Username (unique - used in URL)
   - Display Name
   - Headline
   - Bio
   - Profile Image URL (paste a URL)
   - Header Image URL (paste a URL)
   - LinkedIn URL
   - GitHub URL
   - Portfolio URL
3. Click "Create Profile"

### Step 3: View Public Profile
1. After saving, click "View Public Profile"
2. Or go to `/profile/your-username`

---

## API Keys Used

| Key | Value |
|-----|-------|
| X-Blocks-Key | `D9e0c86bdaa6145fa8e0fe19421495e44` |
| Project Slug | `dotved` |
| GraphQL URL | `https://api.seliseblocks.com/graphql` |

These are already configured in `.env` file.

---

## Project Structure

```
profileforge/
├── src/
│   ├── modules/
│   │   ├── profile-editor/          # NEW - Editor Dashboard
│   │   │   ├── graphql/
│   │   │   │   ├── queries.ts        # GraphQL queries
│   │   │   │   └── mutations.ts      # GraphQL mutations
│   │   │   ├── hooks/
│   │   │   │   └── use-profile.ts    # React Query hooks
│   │   │   ├── services/
│   │   │   │   └── profile.service.ts # API service
│   │   │   ├── types/
│   │   │   │   └── user-profile.types.ts # TypeScript types
│   │   │   └── pages/
│   │   │       └── profile-editor/
│   │   │           └── profile-editor.tsx # Editor page
│   │   │
│   │   └── public-profile/           # NEW - Public Profile
│   │       └── pages/
│   │           └── public-profile/
│   │               └── public-profile.tsx # Public page
│   │
│   └── routes/
│       └── app-routes.tsx           # Added routes
│
│   └── constant/
│       └── sidebar-menu.ts          # Added menu item
│
└── .env                             # Already configured
```

---

## What to Do Next

### 1. Test locally:
- Run `npm run dev`
- Create a profile
- View the public profile

### 2. Deploy to Selise Cloud:
1. Push code to GitHub:
   ```bash
   git add .
   git commit -m "Add Universal Profile Engine"
   git push origin main
   ```

2. In Selise Cloud Portal:
   - Go to Deployment
   - Deploy from main branch
   - Get your live URL

### 3. Test with real data:
- Create users
- Each user gets their own profile
- Public can view any profile

---

## Troubleshooting

### If profile doesn't save:
1. Check that schema is published in Data Gateway
2. Check permissions are set correctly (Public read, Auth write)
3. Check browser console for errors

### If public profile shows "Not Found":
1. Make sure username is set in profile
2. Check that permissions allow Public read
3. Verify the username in URL matches exactly

---

*Built: April 30, 2026*