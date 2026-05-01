# ProfileForge UI Design Specification

## Overview
This document specifies the UI/UX design requirements for the ProfileForge application.

## 1. Login Page (`/login`)

### Layout
- **Background**: Gradient from blue-600 via purple-600 to indigo-700
- **Container**: Centered card with backdrop blur, white/95 opacity
- **Logo**: Selise logo (white/inverted) at top, centered
- **Title**: "Welcome to ProfileForge" (white, 3xl)
- **Subtitle**: "Build your universal profile in minutes" (blue-100)
- **Tabs**: Sign In / Sign Up (active tab has blue-600 background, white text)
- **Form Inputs**: Height 11 (h-11), rounded corners
- **Buttons**: Full width, blue-600 background, white text, h-11 height
- **Footer**: "Powered by Selise Blocks" (blue-100, small text)

### Sign In Tab
- Email input (type: email)
- Password input (type: password)
- Submit button: "Sign In"

### Sign Up Tab
- First Name input
- Last Name input
- Email input (type: email)
- Password input (type: password)
- Submit button: "Create Account"

---

## 2. Profile Editor Page (`/editor`)

### Layout
- **Background**: Light background (bg-background)
- **Container**: Max width 2xl, centered, vertical spacing (space-y-6)
- **Header Section** (centered):
  - Logo: Selise logo in a blue-600/10 background box, h-12, centered
  - Title Row: "Profile Editor" (3xl, bold) + Logout button (outline, right-aligned)
- **Public URL Card** (when username is set):
  - Shows public profile URL as clickable link (opens in new tab)
- **Profile Information Card**:
  - Card with shadow, rounded corners
  - Username input (for public URL)
  - Display Name input
  - Headline input
  - Bio textarea (4 rows)
  - Two-column grid:
    - Profile Picture upload (ImageUpload component)
    - Header Image upload (ImageUpload component)
  - Social Links (SocialLinkInput component)
  - Save Profile button (full width)

### Functionality
- Pre-fills form with existing profile data (if any)
- Saves profile via GraphQL mutation
- After save, reloads profile and updates form data
- Shows public URL after username is set

---

## 3. Public Profile Page (`/profile/:username`)

### Layout
- **Background**: Light background (bg-background)
- **Header Image**: Full width, 48 (mobile) to 64 (desktop) height
  - If no header image: gradient from blue-500 to purple-600
  - With overlay: `bg-black/20`
- **Profile Card** (centered, max-w-4xl, relative positioning -mt-16 to -mt-20):
  - Card with rounded-xl, shadow-xl, padding
  - **Profile Picture**: 
    - Centered, w-32 h-32 (mobile) to w-40 h-40 (desktop)
    - Rounded full, border-4, object-cover, shadow-lg
    - If no image: gradient background with first letter of display name
  - **Name & Headline**: 
    - Display Name: 3xl (mobile) to 4xl (desktop), bold, centered
    - Headline: muted-foreground, lg text, centered
  - **Bio Section**:
    - "About" heading (xl, semibold)
    - Bio text: muted-foreground, pre-wrap, centered, max-w-2xl mx-auto
  - **Social Links**:
    - Centered flex container (justify-center)
    - Buttons with icons: LinkedIn (blue-600), GitHub (gray-900), Portfolio (green-600)
    - Each: px-5 py-2.5, rounded-lg, white text, shadow-md
  - **Footer**: 
    - "Powered by ProfileForge" (small text, muted-foreground, centered)

### Functionality
- Fetches public profile via GraphQL query
- Displays all profile fields (name, headline, bio, images, social links)
- Social links open in new tabs
- Shows 404 page if profile not found

---

## 4. Component Styling

### Buttons
- Primary: `bg-blue-600 hover:bg-blue-700 text-white`
- Outline: `variant="outline"`
- Full width: `w-full`

### Cards
- `rounded-xl shadow-xl p-6 md:p-8 border`

### Inputs
- `h-11` for consistent height
- Rounded corners
- Focus states with primary color

### Images
- Object cover: `object-cover`
- Rounded: `rounded-full` for profile, `rounded-lg` for cards
- Shadow: `shadow-md` or `shadow-lg`

---

## 5. Responsive Design

### Mobile (default)
- Single column layouts
- Smaller text sizes (3xl for headings)
- Smaller images (w-32 h-32)

### Desktop (md: prefix)
- Two-column grids where appropriate
- Larger text sizes (4xl for headings)
- Larger images (w-40 h-40)

---

## 6. Color Palette

### Primary
- Blue: `blue-600` (#2563eb)
- Purple: `purple-600` (#9333ea)
- Indigo: `indigo-700` (#4338ca)

### Neutral
- Background: `bg-background` (from theme)
- Card: `bg-card` (from theme)
- Muted: `text-muted-foreground` (from theme)

### Social
- LinkedIn: `bg-blue-600`
- GitHub: `bg-gray-900`
- Portfolio: `bg-green-600`

---

## 7. Icons

### Libraries
- **lucide-react**: For UI icons (LinkedIn, Github, Globe, ArrowLeft, etc.)

### Usage
- Size: `size={20}` for small icons
- Color: Inherit from parent or explicit (e.g., `text-white`)

---

## 8. Navigation

### Header
- Logo links to home (if logged in, goes to `/editor`)
- Logout button (Editor page only)

### Links
- Public profile URLs: `/profile/{username}`
- Opens in new tab: `target="_blank" rel="noopener noreferrer"`

---

## 9. Error States

### 404 Page
- Large "404" text (4xl, bold)
- "Profile not found" message
- "Go back" link with arrow icon

### Loading States
- Centered spinner/text: "Loading..." or "Loading profile..."
- Full screen overlay with `min-h-screen flex items-center justify-center`

---

## 10. Accessibility

### Form Labels
- All inputs have associated `<Label>` elements
- Required fields marked with `required` prop

### Images
- All images have `alt` attributes
- Profile pictures have descriptive alt text (e.g., display name)

### Keyboard Navigation
- All interactive elements are focusable
- Tab order follows visual order

---

## 11. Performance

### Images
- Optimized via Selise Media Block
- Lazy loading where appropriate

### GraphQL
- Queries cached via TanStack Query
- Mutations invalidate cache after success

---

**End of Design Specification**
