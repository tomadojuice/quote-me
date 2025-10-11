# Publishing to GitHub Package Registry

This repository is configured to automatically publish packages to the GitHub Package Registry using GitHub Actions.

## How it works

### Beta Releases (Automatic)
- **Trigger**: Every push to the `main` branch
- **Version**: Appends `-beta.YYYYMMDDHHMMSS` to the current version
- **Example**: `1.0.1-beta.20231011143022`

### Stable Releases (Manual)
- **Trigger**: Creating a new release on GitHub
- **Version**: Uses the release tag (removes 'v' prefix if present)
- **Example**: Release tag `v1.0.2` becomes version `1.0.2`

## Installation

### Installing the latest stable version
```bash
npm install @tomadojuice/quote-me
```

### Installing a specific beta version
```bash
npm install @tomadojuice/quote-me@1.0.1-beta.20231011143022
```

### Authentication for private packages
If this becomes a private package, users need to authenticate:

1. Create a GitHub Personal Access Token with `read:packages` scope
2. Configure npm:
```bash
npm login --scope=@tomadojuice --registry=https://npm.pkg.github.com
```

Or add to your `~/.npmrc`:
```
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
@tomadojuice:registry=https://npm.pkg.github.com
```

## Creating a Release

To publish a stable version:

1. Go to the GitHub repository
2. Click "Releases" → "Create a new release"
3. Create a new tag (e.g., `v1.0.2`)
4. Fill in the release notes
5. Click "Publish release"

The GitHub Action will automatically:
- Build the package
- Set the correct version
- Publish to GitHub Package Registry
- Create a summary of the published package

## Best Practices Implemented

- ✅ **Semantic Versioning**: Proper version management for beta and stable releases
- ✅ **Scoped Packages**: Uses `@tomadojuice/quote-me` scope for GitHub registry
- ✅ **Caching**: Dependencies are cached to speed up builds
- ✅ **Security**: Uses minimal required permissions and GitHub's built-in token
- ✅ **Testing**: Runs tests if available before publishing
- ✅ **Build Process**: Ensures package is built before publishing
- ✅ **Environment Separation**: Different versioning for beta vs stable
- ✅ **Comprehensive Logging**: Clear summaries and logs for troubleshooting