# Project Assumptions Log

## Date: April 30, 2026

### Assumptions for Universal Profile Engine Project

1. **Technology Stack**: Will use React/Next.js since Construct (the reference app) is React-based
2. **Starting Point**: Will use or reference the Construct app as a foundation
3. **Data Storage**: All user data (bio, images, social links) will be stored via Selise Data Gateway/Content Block using GraphQL
4. **Authentication**: Will use Selise IAM Block for user login/registration
5. **Images**: Will use Selise Media Block for profile picture/header image storage
6. **URL System**: Profile URLs might use a path like `/profile/{username}` rather than subdomains (not confirmed)
7. **Environment**: Need to set up a project in Selise Blocks Cloud portal first before development
8. **Schema**: Will need to create custom schema fields in Data Gateway for: displayName, headline, bio, profileImage, headerImage, socialLinks

### Questions to Clarify
- What technology stack specifically? → ASSUMED: React (Construct is React-based)
- How does the unique URL system work? → Path-based like /profile/:username
- Project deadline? → 2 DAYS (confirmed by user)
- Any design requirements? → Not specified

### Updated Assumptions (April 30, 2026)
- Deadline: 2 DAYS - Very tight!
- Will use Selise Blocks Cloud (cloud.seliseblocks.com)
- Will use Construct as the starting point
- Will use X-Blocks-Key + access token for API calls
- GraphQL for all data operations (Data Gateway)
- React + Vite + TanStack Query stack

### From Web Search (docs.seliseblocks.com)
1. Blocks Cloud portal: cloud.seliseblocks.com
2. Construct React: github.com/SELISEdigitalplatforms/blocks-construct-react
3. API requires: X-Blocks-Key header + access token
4. Get X-Blocks-Key from Environment Overview page
5. Get access token via client credentials flow
6. Data Gateway uses GraphQL for CRUD operations
7. Docs: docs.seliseblocks.com

---

*This log created based on reading project brief and class notes*