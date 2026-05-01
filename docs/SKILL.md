# ProfileForge — AI Coding Skill
> Feed this file to your AI coding assistant (opencode) at the start of every session.
> It contains everything needed to build the app correctly without guessing.

---

## 1. What You Are Building

**ProfileForge** is a SaaS website builder for CSE226. Any user can sign up, fill in their profile, upload images, and get a public URL that shows their profile to the world.

Three distinct screens:
1. `/login` — Auth (register + login). Public.
2. `/editor` — Profile editor dashboard. Private (must be logged in).
3. `/profile/:username` — Public profile renderer. No login required.

**The golden rule:** There is no custom backend. No Express, no FastAPI, no custom DB. Everything goes through Selise Blocks APIs.

---

## 2. Project Identifiers & Credentials

```
Project Name      : ProfileForge
Project Slug      : dotved
X-Blocks-Key      : D9e0c86bdaa6145fa8e0fe19421495e44
App Domain        : https://dotved-dzcgr.seliseblocks.com
Blocks API URL    : https://api.seliseblocks.com

IAM Client Id     : 63c299e7-5adb-4a5e-b870-7cdc38b0b0b6
IAM Client Secret : 5f7430b50e3545fe8eb5281c0b8f5c0c

GitHub Repo       : https://github.com/RRM006/SELISE-Blocks
```

These values are already wired into the `.env` by the Blocks CLI. Reference them via environment variables, never hardcode them again in source files.

```env
# How they appear in .env (Construct standard naming)
VITE_BLOCKS_KEY=D9e0c86bdaa6145fa8e0fe19421495e44
VITE_APP_DOMAIN=https://dotved-dzcgr.seliseblocks.com
VITE_BLOCKS_API_URL=https://api.seliseblocks.com
VITE_IAM_CLIENT_ID=63c299e7-5adb-4a5e-b870-7cdc38b0b0b6
```

---

## 3. Tech Stack

| Layer | Tool |
|---|---|
| Framework | React + TypeScript (Construct base) |
| Styling | `npx getdesign@latest add mintlify` — use its components and tokens |
| Routing | React Router v6 (`BrowserRouter`) |
| State | React Context or Zustand (for auth state) |
| API — Auth | REST: `POST {APP_DOMAIN}/idp/v1/Authentication/Token` |
| API — Data | GraphQL via Data Gateway (URL from portal) |
| API — Media | Selise Media Block upload endpoint |
| Auth guard | Wrapper component that checks JWT, redirects to `/login` if missing |

**Do not install:** axios (use native `fetch`), any custom ORM, any SQL library, any Express/Fastify/Hono server file.

---

## 4. Selise Blocks — How Each Block Works

### 4.1 Identity Block (IAM) — Authentication

**Getting an access token (email/password login):**
```http
POST https://dotved-dzcgr.seliseblocks.com/idp/v1/Authentication/Token
Content-Type: application/json
X-Blocks-Key: D9e0c86bdaa6145fa8e0fe19421495e44

{
  "grantType": "password",
  "clientId": "63c299e7-5adb-4a5e-b870-7cdc38b0b0b6",
  "clientSecret": "5f7430b50e3545fe8eb5281c0b8f5c0c",
  "username": "user@email.com",
  "password": "userpassword"
}
```
Response contains `accessToken` (JWT). Store it in `localStorage` as `blocks_token`.

**User registration:**
```http
POST https://dotved-dzcgr.seliseblocks.com/idp/v1/Account/Register
Content-Type: application/json
X-Blocks-Key: D9e0c86bdaa6145fa8e0fe19421495e44

{
  "email": "user@email.com",
  "password": "userpassword",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Google OAuth:** Already configured in portal. Use the Construct-provided Google login button/flow — do not re-implement OAuth from scratch.

**Auth headers for all protected calls:**
```typescript
const headers = {
  "Content-Type": "application/json",
  "X-Blocks-Key": import.meta.env.VITE_BLOCKS_KEY,
  "Authorization": `Bearer ${localStorage.getItem("blocks_token")}`
}
```

**Logout:** Remove `blocks_token` from localStorage and redirect to `/login`.

---

### 4.2 Data Gateway — Profile Data (GraphQL)

The Data Gateway endpoint is found in the Selise Cloud Portal under **Data Gateway → Settings → API URL**. It looks like:
```
https://api.seliseblocks.com/data-gateway/dotved/graphql
```
All requests are `POST` with `Content-Type: application/json`.

**Headers for Data Gateway:**
```typescript
{
  "Content-Type": "application/json",
  "X-Blocks-Key": import.meta.env.VITE_BLOCKS_KEY,
  "Authorization": `Bearer ${localStorage.getItem("blocks_token")}`   // omit for public reads
}
```

**UserProfile Schema** (already created in portal):
```
Schema name : UserProfile
Fields:
  - userId           (String)  — the IAM user's ID
  - username         (String)  — unique, used in public URL
  - displayName      (String)
  - headline         (String)  — e.g. "Software Engineer at XYZ"
  - bio              (String)  — multi-line about me
  - profileImageUrl  (String)  — URL returned by Media Block
  - headerImageUrl   (String)  — URL returned by Media Block
  - linkedInUrl      (String)
  - githubUrl        (String)
  - portfolioUrl     (String)
```

**Query — fetch own profile (editor page):**
```graphql
query GetMyProfile($userId: String!) {
  UserProfiles(filter: { userId: { eq: $userId } }) {
    items {
      _id
      userId
      username
      displayName
      headline
      bio
      profileImageUrl
      headerImageUrl
      linkedInUrl
      githubUrl
      portfolioUrl
    }
  }
}
```

**Query — fetch public profile (public page, no auth needed):**
```graphql
query GetPublicProfile($username: String!) {
  UserProfiles(filter: { username: { eq: $username } }) {
    items {
      displayName
      headline
      bio
      profileImageUrl
      headerImageUrl
      linkedInUrl
      githubUrl
      portfolioUrl
    }
  }
}
```

**Mutation — create profile (first save):**
```graphql
mutation CreateProfile($input: UserProfileInsertInput!) {
  insertUserProfile(input: $input) {
    _id
    userId
    username
  }
}
```

**Mutation — update profile:**
```graphql
mutation UpdateProfile($id: String!, $input: UserProfileUpdateInput!) {
  updateUserProfile(id: $id, input: $input) {
    _id
    displayName
  }
}
```

**How to call GraphQL from TypeScript:**
```typescript
async function gqlRequest(query: string, variables: object, requiresAuth = true) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Blocks-Key": import.meta.env.VITE_BLOCKS_KEY,
  };
  if (requiresAuth) {
    headers["Authorization"] = `Bearer ${localStorage.getItem("blocks_token")}`;
  }

  const res = await fetch(DATA_GATEWAY_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}
```
Define `DATA_GATEWAY_URL` as a constant once — copy the exact URL from the portal.

---

### 4.3 Media Block — Image Uploads

Used for profile picture and header image.

**Upload flow:**
1. User selects file in the editor.
2. App sends file to Media Block upload endpoint.
3. Media Block returns a public URL.
4. App saves that URL into the `profileImageUrl` or `headerImageUrl` field via Data Gateway mutation.

**Upload request:**
```http
POST https://api.seliseblocks.com/media/v1/upload
X-Blocks-Key: D9e0c86bdaa6145fa8e0fe19421495e44
Authorization: skillsBearer {accessToken}
Content-Type: multipart/form-data

file: [binary]
```

**TypeScript upload helper:**
```typescript
async function uploadMedia(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${import.meta.env.VITE_BLOCKS_API_URL}/media/v1/upload`, {
    method: "POST",
    headers: {
      "X-Blocks-Key": import.meta.env.VITE_BLOCKS_KEY,
      "Authorization": `Bearer ${localStorage.getItem("blocks_token")}`,
    },
    body: formData,
  });
  const data = await res.json();
  return data.url; // use this URL to store in Data Gateway
}
```
> **Note:** Check the exact upload endpoint path in the Selise Blocks docs at `https://docs.seliseblocks.com` if the above returns 404. The response field for the URL may be `url`, `fileUrl`, or `publicUrl` — log the response on first use.

---

## 5. Application Architecture

```
src/
├── main.tsx
├── App.tsx                  # Router setup
├── lib/
│   ├── api.ts               # gqlRequest helper + DATA_GATEWAY_URL constant
│   ├── auth.ts              # login(), register(), logout(), getToken()
│   └── media.ts             # uploadMedia() helper
├── context/
│   └── AuthContext.tsx      # Global auth state (token, userId, isLoading)
├── components/
│   ├── AuthGuard.tsx        # Redirects to /login if no token
│   ├── ImageUpload.tsx      # Reusable file input + preview + upload
│   └── SocialLinkInput.tsx  # Reusable input for LinkedIn/GitHub/Portfolio
├── pages/
│   ├── LoginPage.tsx        # /login  — register + login tabs
│   ├── EditorPage.tsx       # /editor — protected profile editor
│   └── ProfilePage.tsx      # /profile/:username — public renderer
└── types/
    └── profile.ts           # UserProfile TypeScript interface
```

---

## 6. Routing Setup (`App.tsx`)

```tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthGuard from "./components/AuthGuard";
import LoginPage from "./pages/LoginPage";
import EditorPage from "./pages/EditorPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route
          path="/editor"
          element={
            <AuthGuard>
              <EditorPage />
            </AuthGuard>
          }
        />
        <Route path="/" element={<Navigate to="/editor" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 7. AuthGuard Component

```tsx
// src/components/AuthGuard.tsx
import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("blocks_token");
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
```

---

## 8. TypeScript Types

```typescript
// src/types/profile.ts
export interface UserProfile {
  _id?: string;
  userId: string;
  username: string;
  displayName: string;
  headline: string;
  bio: string;
  profileImageUrl: string;
  headerImageUrl: string;
  linkedInUrl: string;
  githubUrl: string;
  portfolioUrl: string;
}
```

---

## 9. Page-by-Page Instructions

### `/login` — LoginPage
- Two tabs: **Sign In** and **Sign Up**
- Sign In: email + password → call `login()` → store token → redirect to `/editor`
- Sign Up: firstName, lastName, email, password → call `register()` → auto-login → redirect to `/editor`
- Google login button: use Construct's built-in Google OAuth component if available
- Mintlify design system: use clean card layout, centered on page
- On successful login, after storing the token, also fetch the user's profile from Data Gateway and store `userId` in AuthContext

### `/editor` — EditorPage
- Protected by AuthGuard
- On mount: call GraphQL to fetch the user's existing `UserProfile` using their `userId`
- If no profile exists yet: show a "Set up your profile" message and create one on first save
- Form fields: displayName, headline, bio (textarea), username (used for public URL), LinkedIn, GitHub, Portfolio
- Image upload sections: profile picture, header image — use `ImageUpload` component
- Show a preview of their public URL: `{window.location.origin}/profile/{username}`
- Save button: calls update mutation if `_id` exists, insert mutation if new
- Logout button: clears token, redirects to `/login`

### `/profile/:username` — ProfilePage
- Public, no auth required
- On mount: extract `:username` from URL params → call GraphQL query (no auth header)
- Show: header image (full width banner), profile picture (circle, overlapping banner), displayName, headline, bio, social link buttons
- If no user found: show a 404-style "Profile not found" message
- Mintlify design: clean, professional card layout, good typography

---

## 10. Editor Save Logic (Important)

```typescript
// On editor save:
async function handleSave(formData: UserProfile) {
  if (existingProfile._id) {
    // Update
    await gqlRequest(UPDATE_PROFILE_MUTATION, {
      id: existingProfile._id,
      input: { ...formData }
    });
  } else {
    // First time — insert
    await gqlRequest(CREATE_PROFILE_MUTATION, {
      input: { ...formData, userId: currentUserId }
    });
  }
}
```

---

## 11. Data Gateway Access Rules (Already Set in Portal)

| Operation | Access Level |
|---|---|
| Read UserProfile (by username) | **Public** — anyone can query |
| Insert UserProfile | **Owner** — only logged-in user |
| Update UserProfile | **Owner** — only the record's owner |
| Delete UserProfile | **Owner** — only the record's owner |

This is what makes the public profile page work without a token.

---

## 12. Hard Rules — Never Break These

1. **No custom backend files** — no `server.js`, no `api/` folder with Express routes, no database connection strings.
2. **No SQL** — the DB is MongoDB via Selise. You never touch it directly.
3. **All data goes through GraphQL** to the Data Gateway. No REST calls for profile data.
4. **All file storage goes through the Media Block** — no base64 in the database.
5. **Auth always goes through IAM** — do not build your own JWT system.
6. **Never commit credentials** — they are already in `.env`, reference via `import.meta.env.*`.
7. **The Data Gateway GraphQL URL must be copied from the portal** — do not guess it.

---

## 13. Where to Find Things in the Portal

| What you need | Where to find it |
|---|---|
| Data Gateway GraphQL URL | Portal → Data Gateway → Settings → API Endpoint |
| Media upload endpoint | Portal → Media → Settings OR Docs: docs.seliseblocks.com |
| User's `userId` after login | Decoded from the JWT (`sub` claim) or from `/idp/v1/Account/Me` |
| Schema field names (exact) | Portal → Data Gateway → UserProfile schema |
| IAM token endpoint | `{APP_DOMAIN}/idp/v1/Authentication/Token` |

**Get the userId after login:**
```typescript
// Option A: hit the account info endpoint
const res = await fetch(`${APP_DOMAIN}/idp/v1/Account/Me`, {
  headers: { "Authorization": `Bearer ${token}`, "X-Blocks-Key": BLOCKS_KEY }
});
const user = await res.json();
// user.id or user.userId — log response to find exact field name
```

---

## 14. Design System

The project uses `npx getdesign@latest add mintlify`.

- Follow Mintlify's component naming and import paths as installed in the project.
- Use its color tokens, typography scale, and spacing — do not introduce raw hex codes or inline styles.
- For layouts not covered by Mintlify components, use Tailwind utility classes (Construct includes Tailwind by default).
- Keep the public profile page visually impressive — it is the "product" the user is showing the world.

---

## 15. Useful Reference Links

- Selise Blocks Docs: https://docs.seliseblocks.com
- Data Gateway Docs: https://docs.seliseblocks.com/cloud/data-gateway/
- Identity / Auth Docs: https://docs.seliseblocks.com/cloud/identity/authentication/
- Construct React Repo: https://github.com/SELISEdigitalplatforms/blocks-construct-react
- GraphQL Basics: https://graphql.org/learn/
- JWT Decoder (for debugging): https://jwt.io

---

*Skill created: May 1, 2026 — ProfileForge / CSE226*
