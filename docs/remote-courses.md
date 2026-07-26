# Remote courses integration

The main Academy homepage now includes a dedicated **Remote learning** section between the curriculum and membership pricing.

## What was added

- Six online course pathways with level, duration, delivery format, access level, modules and a practical outcome.
- Expandable course outlines that work with keyboard navigation.
- Course-specific enquiry buttons.
- Prefilled Academy enquiry messages, including the selected course name.
- Server-side validation for the new `remote-course` enquiry service.
- Responsive layouts for desktop, tablet and mobile.
- Updated section numbering and navigation.

## Main files

- `src/components/RemoteCoursesSection.tsx` — course content and section markup.
- `src/index.css` — styles under the `/* Remote courses */` heading.
- `src/pages/HomePage.tsx` — places the section on the homepage.
- `src/components/Navbar.tsx` — links the main Learn destination to the remote courses section.
- `src/components/EnquiryForm.tsx` — adds and prefills the remote-course enquiry.
- `api/enquiries.ts` — allows the new enquiry service on the server.

## Editing courses

Open `src/components/RemoteCoursesSection.tsx` and edit the `remoteCourses` array. Each entry contains:

- `code`
- `title`
- `level`
- `duration`
- `delivery`
- `access`
- `description`
- `modules`
- `outcome`

Course dates are intentionally not hard-coded. The page tells students that live-session times and dates are confirmed during enrolment.

## Run and deploy

```bash
npm install
npm run check
npm run dev
```

For production, deploy the project through the existing Vercel workflow. The remote-course enquiry uses the same `/api/enquiries` endpoint and Supabase `enquiries` table already used by the site.
