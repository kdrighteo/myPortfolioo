# CI/CD Pipeline Setup

This project uses GitHub Actions for continuous integration and deployment to Vercel.

## Pipeline Components

1. **Pre-commit Hooks** - Using Husky and lint-staged to catch issues before committing
2. **Automated Testing** - Jest and React Testing Library for component testing
3. **GitHub Actions Workflow** - Automated builds, tests, and deployments
4. **Vercel Deployments** - Automatic deployments to Vercel's global CDN

## Setting Up Vercel Token for GitHub Actions

To enable automated deployments to Vercel, you need to:

1. Generate a Vercel token:
   - Go to [Vercel Account Settings](https://vercel.com/account/tokens)
   - Click "Create" to generate a new token
   - Name it something like "GitHub Actions Deployment"
   - Copy the token value

2. Add the token to GitHub repository secrets:
   - Go to your GitHub repository
   - Click on "Settings" > "Secrets and variables" > "Actions"
   - Click "New repository secret"
   - Name: `VERCEL_TOKEN`
   - Value: [paste your token]
   - Click "Add secret"

## Running Tests Locally

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

## Pre-commit Checks

The following checks run automatically before each commit:
- ESLint to catch code quality issues
- Prettier to ensure consistent code formatting

## Continuous Integration Checks

For every pull request and push to main, GitHub Actions will:
1. Install dependencies
2. Run linting checks
3. Run automated tests
4. Build the project

## Continuous Deployment

When changes are pushed to the main branch and all CI checks pass:
1. GitHub Actions will automatically deploy to Vercel
2. The live site will be updated with the latest changes
