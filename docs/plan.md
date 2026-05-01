# Universal Profile Engine - Project Plan

## Project Overview
A "Website Builder" SaaS where users can sign up, create their personal profile, and get a unique URL to share. Built on top of **Selise Blocks** (no custom backend).

## Timeline
**2 Days** - Very tight! Must prioritize.

---

## What is Selise Blocks?

Think of it like this:

| Traditional Building | Selise Blocks |
|---------------------|---------------|
| Build your own authentication | Use ready-made Identity Block |
| Build your own database | Use Data Gateway (NoSQL via GraphQL) |
| Build your own file storage | Use Media Block |
| Build your own deployment | Use Hosting |
| Build your own monitoring | Use Observability |

**You just build the UI and business logic. Everything else is pre-made!**

---

## How It Works (System Architecture)

```
┌─────────────────────────────────────────────────────────────────┐
│                    YOUR APPLICATION                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐ │
│  │   Login     │    │   Editor    │    │   Public Profile   │ │
│  │   Page      │    │   Dashboard │    │   (Anyone can see) │ │
│  └──────┬──────┘    └──────┬──────┘    └──────────┬──────────┘ │
└─────────┼──────────────────┼──────────────────────┼─────────────┘
          │                  │                      │
          ▼                  ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    YOUR FRONTEND CODE                            │
│         (React - calling Selise APIs via GraphQL)              │
└─────────────────────────────────────────────────────────────────┘
          │                  │                      │
          ▼                  ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SELISE BLOCKS CLOUD                          │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              IDENTITY BLOCK (IAM)                        │  │
│  │   • User registration/login                               │  │
│  │   • JWT tokens                                            │  │
│  │   • Roles & permissions                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              DATA GATEWAY (Content Block)                │  │
│  │   • Store: name, bio, headline, social links            │  │
│  │   • GraphQL API for CRUD                                  │  │
│  │   • Row-level security                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              MEDIA BLOCK (Storage)                       │  │
│  │   • Profile picture upload                                │  │
│  │   • Header image upload                                   │  │
│  │   • S3-compatible storage                                 │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Project Requirements Mapping

### 1. Authentication Layer
```
User Action → Your React App → Selise Identity Block
                     │
                     ▼
          • Register new account
          • Login with email/password
          • Get JWT token
          • Protect editor route
```

**Used Selise Block:** Identity/IAM Block

### 2. Site Editor (Dashboard)
```
User Action → Your React App → Save to Data Gateway
                     │
                     ▼
          • Edit display name
          • Edit headline
          • Edit bio (multi-line)
          • Upload profile image → Media Block
          • Upload header image → Media Block
          • Add social links (LinkedIn, GitHub, Portfolio)
```

**Used Selise Blocks:** Data Gateway (Content Block) + Media Block

### 3. Public Renderer
```
Anyone → Your React App → Fetch from Data Gateway (no login needed)
                     │
                     ▼
          • Display profile by username/ID
          • Show profile picture
          • Show bio and headline
          • Show social links
```

**Used Selise Block:** Data Gateway (read-only, public access)

---

## Data Schema Design (What you need to create in Selise Dashboard)

Create a schema called `UserProfile` with these fields:

| Field Name | Type | Description |
|------------|------|-------------|
| userId | string | Links to Selise user (from IAM) |
| username | string | Unique identifier for URL |
| displayName | string | Full name |
| headline | string | Professional title |
| bio | string | Multi-line about me |
| profileImageUrl | string | URL from Media Block |
| headerImageUrl | string | URL from Media Block |
| linkedInUrl | string | LinkedIn link |
| githubUrl | string | GitHub link |
| portfolioUrl | string | Portfolio link |

---

## Step-by-Step Implementation Plan

### Phase 1: Setup (Hour 1-2)
1. ✓ Already have GitHub repo: https://github.com/RRM006/SELISE-Blocks
2. Create project in Selise Blocks Cloud
3. Connect GitHub repo to Selise project
4. Get X-Blocks-Key and API credentials
5. Clone Construct starter template

### Phase 2: Authentication (Hour 2-4)
1. Configure Identity Block in portal
2. Enable email/password login
3. Set up client credentials
4. Build login/register UI
5. Protect /editor route

### Phase 3: Data Schema (Hour 4-5)
1. Go to Data Gateway in portal
2. Create UserProfile schema
3. Add all required fields
4. Set permissions (owner can edit, public can read)

### Phase 4: Editor Dashboard (Hour 5-8)
1. Build profile form (name, headline, bio)
2. Build image upload to Media Block
3. Build social links inputs
4. Save to Data Gateway on submit

### Phase 5: Public Profile Page (Hour 8-10)
1. Create route: /profile/:username
2. Fetch data from Data Gateway
3. Display in nice layout
4. Make publicly accessible

### Phase 6: Deployment (Hour 10-12)
1. Deploy via Blocks Cloud
2. Test everything works
3. Fix any issues

---

## Critical Things to Know

### API Authentication
```javascript
// Header needed for all API calls
headers: {
  "x-blocks-key": "YOUR_PROJECT_KEY",
  "Authorization": "Bearer YOUR_ACCESS_TOKEN"
}
```

### GraphQL (NOT REST!)
```javascript
// Example query to get user profile
query {
  UserProfiles(filter: { username: "john" }) {
    items {
      displayName
      headline
      bio
      profileImageUrl
    }
  }
}
```

### Public Access
For the public profile page, you need to either:
1. Use a public role in Data Gateway
2. Or use a service/client credential with public access

---

## Questions to Answer Before Starting

1. **Should we use Construct as the starting point?** (Recommended - saves time)
2. **Do you want subdomains (user.site.com) or paths (/u/user)?** 
3. **Which features are must-have vs nice-to-have?**
4. **Do you have any design preferences for the profile page?**

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Selise Cloud not set up | HIGH | User must create project first |
| 2 days too short | HIGH | Prioritize core features only |
| API authentication issues | MEDIUM | Test early, get credentials |
| Schema design changes | MEDIUM | Keep schema simple initially |
| Image upload complexity | MEDIUM | Use Media Block pre-signed URLs |

---

*Plan created: April 30, 2026*