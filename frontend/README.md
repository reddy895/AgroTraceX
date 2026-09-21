# AgroTraceX Frontend

AgroTraceX is an enterprise field-trial operations interface for managing agricultural research from seed lot registration through field execution, observation capture, laboratory testing, and certified reporting.

The frontend is designed around a calm, data-dense workflow for platform administrators, seed companies, agronomists, and field officers. It currently runs with local mock data so the product experience can be demonstrated without a backend service.

## What It Includes

- Executive dashboard with trial KPIs, progress pipeline, operational alerts, field intelligence, and recent trial registry.
- Trial lifecycle management with list and detail views.
- Seed lot, field, farmer, agronomist, company, observation, sample, report, analytics, and settings views.
- Field officer workflow for capturing operational field activity.
- Sample chain-of-custody and seed-to-result traceability views.
- Role switching for the supported demo personas.
- Global search with keyboard shortcut support.
- Reusable tables, cards, badges, status indicators, forms, dialogs, drawers, tabs, pagination, loading states, and empty states.
- Responsive layouts for desktop, tablet, and mobile screens.

## Technology

- React 19
- React Router 7
- Vite 8
- Tailwind CSS 4
- Lucide React icons
- Oxlint

## Requirements

- Node.js 18 or newer
- npm 9 or newer

Check your installed versions:

```bash
node --version
npm --version
```

## Getting Started

From this directory:

```bash
npm install
npm run dev
```

Vite will print the local development URL, normally `http://localhost:5173`.

The app opens on the dashboard. The `/login` route is also available for testing the login presentation and role selection flow.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot module replacement. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Serve the production build locally for verification. |
| `npm run lint` | Run Oxlint across the frontend source. |

Recommended verification sequence:

```bash
npm run lint
npm run build
npm run preview
```

## Application Routes

| Route | View |
| --- | --- |
| `/` | Executive dashboard |
| `/login` | Demo login screen |
| `/trials` | Trial registry |
| `/trials/:id` | Trial details and lifecycle information |
| `/seed-lots` | Seed lot registry |
| `/fields` | Field and site registry |
| `/farmers` | Farmer registry |
| `/agronomists` | Agronomist registry |
| `/field-officer` | Field officer operational workflow |
| `/observations` | Observation registry and entry workflow |
| `/samples` | Sample registry and laboratory status |
| `/reports` | Reports registry |
| `/reports/:id` | Report details |
| `/companies` | Company registry; visible to administrators |
| `/analytics` | Trial and portfolio analytics |
| `/settings` | Application settings |

Unknown routes redirect to `/`.

## Demo Roles

The role switcher changes the active demo persona and stores the selected role in `localStorage` under `agrotracex_role`.

| Role | Demo persona | Primary perspective |
| --- | --- | --- |
| `ADMIN` | Dr. Alok Verma | Platform administration and operations |
| `COMPANY` | Dr. Ananya Sen | Company and research portfolio oversight |
| `AGRONOMIST` | Dr. Arvind Shrivastava | Scientific verification and trial review |
| `FIELD OFFICER` | Vikas Shekhawat | Field execution and observations |

The administrator role can access the Companies view. The current role model is intended for product demonstration and UI development; it is not a security boundary.

## Keyboard Shortcuts

- `Ctrl + K` on Windows/Linux or `Cmd + K` on macOS: open or close global search.
- `Escape`: close global search, dialogs, and drawers where supported.
- `Enter` or `Space`: activate clickable KPI cards when focused.

## Project Structure

```text
src/
├── components/
│   ├── layout/       Application shell, sidebar, topbar, search, role switcher
│   ├── shared/       Domain visualizations and reusable operational views
│   └── ui/           Reusable interface primitives
├── context/          Auth, search, and toast providers
├── data/             Mock domain records used by the frontend
├── pages/            Route-level screens and page-specific workflows
├── routes/           React Router route definitions
├── App.jsx           Provider composition and application entry component
├── index.css         Tailwind import and global design tokens
└── main.jsx          React DOM bootstrap
```

### Important Files

- `src/routes/AppRoutes.jsx` defines all application routes.
- `src/context/AuthContext.jsx` defines demo users, roles, login, logout, and role switching.
- `src/context/SearchContext.jsx` owns global search visibility and the keyboard shortcut.
- `src/components/layout/AppLayout.jsx` defines the authenticated shell.
- `src/components/ui/` contains shared primitives used across pages.
- `src/data/` contains the mock records used by the current UI.
- `src/index.css` contains the cream, olive, neutral, status, typography, and spacing foundations.

## Data and State Model

The current frontend is self-contained:

- Domain records are static JavaScript exports in `src/data/`.
- Auth state is held in React context and the selected role is persisted in `localStorage`.
- Search visibility is held in React context.
- Toast notifications are held in React context and expire automatically.
- Forms and modals manage their own local UI state unless a page explicitly owns the state.

There is currently no API client, database, server-side session, or remote persistence layer in this repository. To connect a backend, keep the existing page and component contracts where possible and introduce a service layer rather than placing fetch calls directly inside shared UI primitives.

## Design System Guidance

The visual language uses:

- Warm cream and off-white surfaces for the application canvas.
- Olive and deep forest green for primary actions and active states.
- Restrained blue for location, laboratory, and information signals.
- Amber for warnings and field conditions.
- Red only for critical or overdue states.
- Subtle borders and restrained shadows instead of heavy card effects.

When adding UI, prefer the existing primitives before creating new one-off styles:

- `Button` for actions
- `Card` for framed content sections
- `StatCard` for KPI metrics
- `Badge` and `StatusBadge` for status communication
- `Table` for data registries
- `Modal`, `Drawer`, and `ConfirmDialog` for focused workflows
- `EmptyState` and `LoadingSkeleton` for non-success states
- `Input`, `Select`, and `Tabs` for common controls

Status should be communicated with text and an icon or indicator, not color alone. Keep layouts aligned to the existing spacing rhythm and ensure tables remain horizontally scrollable on narrow screens.

## Adding a New Page

1. Add the page component under the closest folder in `src/pages/`.
2. Add its route in `src/routes/AppRoutes.jsx`.
3. Reuse shared UI primitives from `src/components/ui/`.
4. Add or extend mock records in `src/data/` only when the page needs new domain data.
5. Add navigation in `src/components/layout/Sidebar.jsx` when the page should be globally discoverable.
6. Verify desktop and mobile layouts.
7. Run lint and build before submitting the change.

## Production Readiness Notes

Before connecting this frontend to production data, add:

- Server-backed authentication and authorization.
- API or query service boundaries for domain records.
- Request loading, retry, and error handling for remote operations.
- Server-side validation for all create and update workflows.
- Persistent notification and audit history.
- Automated tests for route access, forms, tables, role permissions, and critical field workflows.
- Environment-specific configuration for API URLs and deployment settings.

The current mock data and demo role system are intentionally useful for UI review, interaction design, and frontend development, but should not be treated as production access control or data storage.

## Troubleshooting

### Port 5173 is already in use

Vite will normally choose another available port and print it in the terminal. Use the printed URL, or stop the existing process before restarting the development server.

### The selected demo role persists after reload

Clear the `agrotracex_role` key from browser local storage, then reload the page. The application defaults back to the administrator role.

### The production bundle reports a large chunk

The current build may report a chunk-size warning because the application is bundled as a single dashboard-oriented client. This is a warning, not a build failure. Route-level lazy imports and intentional code splitting can be introduced later as the application grows.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
