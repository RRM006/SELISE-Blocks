**CSE226** **-** **Vibe** **Coding** **Project** **Universal**
**Profile** **Engine**

**Overview**

The **Universal** **Profile** **Engine** is a simplified "Website
Builder" SaaS (Software as a Service). The goal is to build a platform
that allows any person to sign up, configure a personal digital
presence, and have it hosted at a unique URL. Instead of building the
backend from scratch, you will use **Selise** **Blocks** as the core
infrastructure for identity, storage, and media. **Requirements**

Your application must provide three distinct user experiences:

**1.** **The** **Authentication** **Layer** **(Identity)**

> ● **User** **Onboarding:** A new user must be able to create an
> account and log in securely. ● **Integration:** This must be powered
> by the **Selise** **IAM** **Block**. You are expected to
>
> configure the block to handle user registration and session
> management.
>
> ● **Access** **Control:** Only authenticated users should be able to
> access the "Editor" dashboard.

**2.** **The** **Site** **Editor** **(Creator** **Dashboard)**

Once logged in, the user is presented with a management interface. The
editor must allow users to:

> ● **Modify** **Identity** **Data:** Update their display name,
> professional headline, and a multi-line "About Me" bio.
>
> ● **Manage** **Visual** **Assets:** Upload a profile picture or header
> image. This must interface directly with the **Selise** **Media**
> **Block**.
>
> ● **Define** **Social** **Connections:** Add links to their LinkedIn,
> GitHub, or Portfolio.
>
> ● **Persistence:** All data entered must be saved to the **Selise**
> **Content** **Block**. The app should "remember" their data every time
> they log back in.

**3.** **The** **Public** **Renderer** **(The** **Live** **Site)**

This is the "Website" part of the builder. The application must generate
a public-facing view that:

> ● **Dynamic** **Data** **Fetching:** Fetches the saved information
> from the **Selise** **Content** **Block** based on a unique identifier
> (like a username or ID).
>
> ● **Professional** **Presentation:** Displays the user's uploaded
> images, bio, and links in a clean, pre-designed layout.
>
> ● **Public** **Access:** This page must be viewable by anyone (even
> without a login), representing the "published" version of the user's
> site.

**Technical** **Constraints**

> ● **No** **Custom** **Backends:** You are prohibited from building
> your own SQL/NoSQL database or custom API servers for the core
> features. All data persistence must live in **Selise** **Blocks**.
>
> ● **Schema** **Design:** You must design the "Content Schema" within
> the Selise dashboard to match the fields in your editor (e.g.,
> creating fields for bio_text, profile_image_url, etc.).
>
> ● **Frontend-First:** Your focus should be on "orchestrating" the
> blocks. The logic of your app should involve calling the Selise APIs
> to fetch, save, and update data in real-time.

**Core** **Concept:** **"Platform,** **Not** **a** **Page"**

The challenge is not just to make a pretty website for yourself. It is
to build a **builder** that allows *other* people to make websites.
Every time a new user signs up, the system should treat them as a new
"customer" with their own unique data stored in the Selise ecosystem.
