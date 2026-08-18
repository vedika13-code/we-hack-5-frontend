# Contributing

## Page ownership (no two people touch the same file)

| Pages                                              | Maps to |
|-----------------------------------------------------|---------|
| `pages/Signup, VerifyEmail, Login, ForgotPassword, ResetPassword, Dashboard, Profile` | Person 2 |
| `pages/Registration, Team`                          | Person 3 |
| `pages/Submission`                                  | Person 4 |
| `pages/admin/*`                                     | Person 5 |
| `pages/Home, About, Timeline, ProblemStatements, Judges, Mentors, Leaderboard` | Person 1 |
| `components/`, `lib/api.ts`                         | Shared — PR + review, everything depends on these |

## Workflow

1. Branch off `main`: `git checkout -b feature/registration-form`
2. Build inside your page(s) only; if you need a new shared component, add it to `components/`
   in its own PR so it doesn't get tangled with page-specific changes
3. Open a PR into `main` — CI must pass (`npm run build`, which includes the TS typecheck)
4. `main` is always deployable

## Rules

- Every new API call goes through `lib/api.ts` — one place to see every backend endpoint the
  frontend depends on, and one place to update if a route changes.
- Don't inline `fetch()` calls in page components.
- Any page behind login: put it inside `<ProtectedRoute>` in `App.tsx`, not a manual auth check
  inside the page.
