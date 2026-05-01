# Selise Blocks - Knowledge Graph

## 🌐 What is Selise Blocks?

**Simple Explanation:**
Selise Blocks is like a "lego set" for building web applications. Instead of building every piece yourself (auth, database, storage, deployment), you use pre-made blocks that connect together.

---

## Visual System Architecture

```
┌────────────────────────────────────────────────────────────────────────────┐
│                           YOUR APP (Universal Profile Engine)               │
│                                                                            │
│   ┌──────────────┐    ┌──────────────┐    ┌────────────────────────────┐   │
│   │   LOGIN      │    │   EDITOR     │    │     PUBLIC PROFILE        │   │
│   │   (Public)   │    │  (Private)   │    │       (Public)            │   │
│   └──────┬───────┘    └──────┬───────┘    └────────────┬─────────────┘   │
│          │                   │                        │                   │
│          ▼                   ▼                        ▼                   │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                    REACT FRONTEND CODE                             │   │
│   │         (Your custom UI - orchestrates the blocks)                │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ API Calls (GraphQL + JWT)
                                    ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                        SELISE BLOCKS CLOUD PLATFORM                       │
│                                                                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │   IDENTITY  │  │DATA GATEWAY │  │    MEDIA    │  │  HOSTING    │       │
│  │   (IAM)     │  │ (Content)   │  │  (Storage)  │  │ (Deploy)    │       │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘       │
│                                                                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │OBSERVABILITY│  │LOCALIZATION │  │   BLOCKS AI │  │  WORKFLOWS  │       │
│  │  (Logs)     │  │  (i18n)     │  │  (Agents)   │  │  (Automation│       │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘       │
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     BLOCKS CLOUD PORTAL                            │   │
│  │          (cloud.seliseblocks.com - Configure everything here)      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## How Each Block Works

### 1. IDENTITY BLOCK (IAM) 🆔
```
What it does: Handles user authentication and authorization

Features:
• Email/password login
• Social login (Google, etc.)
• JWT tokens (like a temporary ID card)
• Roles and permissions
• MFA (optional)

For your project:
→ Users register and login here
→ Only logged-in users can access editor
```

### 2. DATA GATEWAY (Content Block) 💾
```
What it does: Acts as your database (NoSQL - MongoDB)

How to use:
1. Go to portal → Data Gateway
2. Create a "schema" (like a form definition)
3. Add fields (name, bio, etc.)
4. Get GraphQL endpoint
5. Read/Write data using GraphQL

For your project:
→ Store: displayName, headline, bio, social links
→ Each user gets their own record
```

### 3. MEDIA BLOCK (Storage) 🖼️
```
What it does: File storage (like AWS S3)

How to use:
1. Upload images via API
2. Get back a URL
3. Use URL anywhere

For your project:
→ Profile pictures
→ Header images
```

### 4. HOSTING (Deployment) 🚀
```
What it does: Deploy and host your application

Features:
• Connect GitHub repo
• Automatic deployments
• Custom domains
• HTTPS included

For your project:
→ Deploy your app so everyone can access it
```

---

## How Your Project Maps to Blocks

```
Universal Profile Engine Requirements

Requirement                          Selise Block Used
────────────────────────────────────────────────────────────────
User signup/login                   → Identity Block (IAM)
Edit profile (name, bio, etc.)      → Data Gateway (Content)
Upload profile picture              → Media Block
Upload header image                 → Media Block
Add social links (LinkedIn, etc.)   → Data Gateway (Content)
Save data (persistence)             → Data Gateway (Content)
Show public profile (anyone)        → Data Gateway (Content) - Public access
Deploy the app                      → Hosting Block
```

---

## The Data Flow

### Registration & Login Flow
```
1. User visits /login
2. Enters email/password
3. App calls: POST /idp/v1/Authentication/Token
4. Identity Block validates & returns JWT
5. App stores JWT, redirects to /editor
```

### Saving Profile Data Flow
```
1. User fills form (name, bio, etc.)
2. User clicks "Save"
3. App calls Data Gateway GraphQL mutation:
   
   mutation {
     insertUserProfile(input: {
       userId: "user-123",
       username: "john",
       displayName: "John Doe",
       headline: "Software Engineer",
       bio: "Hello world!"
     })
   }
4. Data Gateway saves to MongoDB
5. Success response returned
```

### Viewing Public Profile Flow
```
1. Anyone visits /profile/john
2. App calls Data Gateway GraphQL query:
   
   query {
     UserProfiles(filter: { username: "john" }) {
       items {
         displayName
         headline
         bio
         profileImageUrl
         linkedInUrl
       }
     }
   }
3. Data Gateway returns data (if public access allowed)
4. App displays the profile
```

---

## Key Concepts You Need to Understand

### 1. API Key (X-Blocks-Key)
```
What: Your project's unique ID
Where to get: Selise Cloud Portal → Environment → Copy key
Use: In every API call header
```

### 2. Access Token (JWT)
```
What: Temporary authentication token
How to get: Use client credentials (client_id + client_secret)
Use: In API calls that need authentication
Valid for: Limited time (configurable in portal)
```

### 3. GraphQL (NOT REST!)
```
What: Query language for APIs
Why: More flexible than REST - get exactly what you need
Example:
  REST: GET /users/123 (returns fixed format)
  GraphQL: query { user(id: 123) { name bio } } (you choose fields)
```

### 4. Schema
```
What: Definition of your data structure
Where: Data Gateway in portal
Example:
  Schema: UserProfile
  Fields:
    - displayName (string)
    - headline (string)
    - bio (text)
    - profileImageUrl (string)
```

### 5. Permissions (RLS - Row Level Security)
```
What: Controls who can see/edit data
Types:
  - Owner: Only the user who created the record
  - All logged in: Any signed-in user
  - Public: Anyone (even not logged in)
```

---

## How to Connect Your GitHub Repo

```
Step 1: Go to cloud.seliseblocks.com
        ↓
Step 2: Create a new project
        ↓
Step 3: Connect GitHub (select your repo)
        ↓
Step 4: Select environments (dev, prod)
        ↓
Step 5: Branch mapping:
        - main branch → Production
        - dev branch → Development
        ↓
Step 6: Deploy!
```

---

## Ready-to-Use: Construct

Selise provides a starter app called **Construct**:
- Pre-wired to all Blocks
- React + TypeScript
- Has login, dashboard, forms already
- You just customize it!

**For this project:**
Start with Construct, then:
1. Add your profile schema
2. Customize the editor
3. Add public profile page

---

## Summary

| Concept | Purpose |
|---------|---------|
| Selise Blocks | Pre-made services (auth, DB, storage) |
| Blocks Cloud | Portal to configure everything |
| Identity Block | User login/register |
| Data Gateway | Your database (GraphQL) |
| Media Block | Image/file storage |
| Construct | Starter template app |
| X-Blocks-Key | Your project ID |
| JWT Token | Authentication proof |
| GraphQL | API to read/write data |

---

*Knowledge Graph created: April 30, 2026*