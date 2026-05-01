# ProfileForge — Phase Tracker

> Last updated: 2026-05-01
> Data Gateway URL: `https://api.seliseblocks.com/uds/v1/dotved/gateway`
> UserProfile schema: ✅ Published

---

## ✅ Phase 0: Portal Setup (Done)
- [x] UserProfile schema confirmed in Data Gateway
- [x] Data Gateway GraphQL URL obtained: `https://api.seliseblocks.com/uds/v1/dotved/gateway`
- [x] IAM Client ID available: `63c299e7-5adb-4a5e-b870-7cdc38b0b0b6`

---

## ✅ Phase 1: Environment Setup (COMPLETED)
- [x] Update `.env` with `VITE_APP_DOMAIN` and `VITE_IAM_CLIENT_ID`
- [ ] Verify `npx getdesign@latest add mintlify` (check if already installed)

---

## ✅ Phase 2: Core Infrastructure (COMPLETED)
- [x] Create `src/types/profile.ts`
- [x] Create `src/modules/profile-editor/graphql/queries.ts` (GraphQL queries/mutations)
- [x] Create `src/modules/profile-editor/services/profile.service.ts` (profile API)
- [x] Create `src/lib/media.ts` (uploadMedia helper)

---

## ✅ Phase 3: Components (COMPLETED)
- [x] Create `src/components/AuthGuard.tsx`
- [x] Create `src/components/ImageUpload.tsx`
- [x] Create `src/components/SocialLinkInput.tsx`

---

## ⬜ Phase 3: Components
- [ ] Create `src/components/AuthGuard.tsx`
- [ ] Create `src/components/ImageUpload.tsx`
- [ ] Create `src/components/SocialLinkInput.tsx`

---

## ✅ Phase 4: Pages (COMPLETED)
- [x] Create `src/pages/LoginPage.tsx` (`/login`)
- [x] Create `src/modules/profile-editor/pages/EditorPage.tsx` (`/editor`)
- [x] Create `src/modules/public-profile/pages/ProfilePage.tsx` (`/profile/:username`)

---

## ✅ Phase 5: Routing & App Setup (COMPLETED)
- [x] Update `src/routes/app-routes.tsx` with new routes
- [x] `/` redirects to `/editor`
- [x] AuthGuard integration complete

---

## ✅ Phase 6: Test & Deploy (IN PROGRESS)
- [ ] Run `npm run dev` and test login/register flow
- [ ] Test profile editor save/update
- [ ] Test public profile page (`/profile/:username`)
- [x] Build succeeds with no errors
- [ ] Deploy to Selise Cloud

---

## ⬜ Phase 6: Test & Deploy
- [ ] Run `npm run dev` and test login/register flow
- [ ] Test profile editor save/update
- [ ] Test public profile page (`/profile/:username`)
- [ ] Deploy to Selise Cloud

---

## Notes
- Data Gateway URL uses `x-blocks-key` header (not `X-Blocks-Key` — will test both)
- GraphQL endpoint: `https://api.seliseblocks.com/uds/v1/dotved/gateway`
- Auth endpoint: `{APP_DOMAIN}/idp/v1/Authentication/Token`
- Media upload: `https://api.seliseblocks.com/media/v1/upload`
