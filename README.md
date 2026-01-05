# NoteHub — Draft Notes with Zustand (Next.js App Router)

## 📌 Description
A Next.js (App Router) notes application focused on SEO metadata setup and a draft-saving workflow using Zustand.
The project demonstrates SSR/CSR rendering, REST API integration, and persistent draft state stored in localStorage.

## 🚀 Demo
YOUR_VERCEL_URL_HERE

## 🛠 Tech Stack
- Next.js (App Router)
- TypeScript
- React
- CSS Modules
- Axios
- TanStack Query (React Query)
- Zustand (+ persist middleware)
- Prettier

## ✅ Key Features
- Notes list with search / pagination / tag filtering
- Note details page with dynamic SEO metadata
- Create note page as a separate route (`/notes/action/create`)
- Draft saving while typing (Zustand store)
- Draft persistence in `localStorage` via `zustand/middleware/persist`
- SSR + CSR support (per task requirements)

## 🔎 SEO & Metadata (App Router)
Implemented metadata configuration across the app:
- Global `metadata` in `app/layout.tsx` (title, description, Open Graph)
- Metadata for `app/not-found.tsx`
- Dynamic `generateMetadata` for:
  - `app/notes/filter/[...slug]/page.tsx` (based on selected filter)
  - `app/notes/[id]/page.tsx` (based on note content)

## ✍️ Draft Saving with Zustand
Draft logic is implemented in `lib/store/noteStore.ts`:
- `draft` state: `{ title, content, tag }`
- `setDraft(note)` updates draft on every form change
- `clearDraft()` resets draft after successful note creation
- Draft is persisted using `persist` middleware to keep state after reload

### Draft behavior
- While typing in `NoteForm`, changes are saved immediately via `onChange`
- On **Submit** (success): draft is cleared and user navigates back
- On **Cancel**: draft is NOT cleared, user navigates back

## 👤 My Contribution
- Built route-based note creation flow (`/notes/action/create`)
- Refactored `NoteForm` to use standard HTML form + `formAction`
- Implemented Zustand draft store with `persist` (localStorage)
- Configured SEO metadata using `metadata` and `generateMetadata`
- Integrated API requests with Axios and TanStack Query
- Ensured SSR/CSR behavior and deployed to Vercel

## 📦 Deployment
Deployed on Vercel.

