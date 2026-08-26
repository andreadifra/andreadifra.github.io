# Netlify hosting migration specification

Status: Planned

Tracking issue: [#12](https://github.com/andreadifra/andreadifra.github.io/issues/12)

## Objective

Move the Quarto website from GitHub Pages to Netlify before the first tutorial
is published. Give the website a provider-independent canonical domain, Git
deploy previews, automatic production deploys, and a documented recovery path.

The public issue tracker and commits must refer to the target as the
**canonical domain** until it has been registered.

## Current state

- Source is hosted in the personal GitHub repository
  `andreadifra/andreadifra.github.io`.
- GitHub Pages publishes the generated site from `gh-pages`.
- Production publishing is manual and leaves generated-site commits on that
  branch.
- The repository is public because GitHub Pages on GitHub Free requires it.
- Posts use committed `_freeze/` output; the tutorial requires R 4.6.0 and must
  not execute during a hosted build.
- A PowerShell post-render hook removes the private recruiter page from the
  sitemap and hard-codes the current GitHub Pages origin.

## Target state

```text
Local executable render
        |
        v
Committed source + _freeze on GitHub
        |
        v
Netlify Git integration + Quarto build plugin
        |
        +---- pull request --> public unlisted Deploy Preview
        |
        +---- master -------> public production deploy
                                  |
                                  v
                         canonical apex domain
```

- The GitHub repository is private and remains owned by the personal account.
- Netlify Free builds the site from the private repository through its GitHub
  App, with access limited to this repository.
- Production and Deploy Previews are public. Preview URLs are unlisted.
- Merging to `master` publishes production automatically.
- Because private-repository branch protection requires GitHub Pro, a successful
  Netlify preview is a documented solo-owner merge rule rather than an enforced
  status check.
- The canonical apex domain redirects `www` to the apex.
- Cloudflare Registrar and Cloudflare DNS own registration and DNS. Netlify
  owns hosting only.
- R computation stays local. Hosted builds render committed frozen output.

## Decisions

### Canonical domain

- Use a short name-based `.com` domain.
- Confirm availability, standard pricing, UK taxes, and annual renewal of no
  more than GBP 20-25 at checkout.
- Keep the exact unregistered candidate out of public issues and commits.
- Enable automatic renewal, registrar lock, MFA, offline recovery codes, WHOIS
  redaction, and DNSSEC. Enable DNSSEC after the Netlify DNS cutover succeeds.
- Domain email is out of scope.

### Deployment

- Use Netlify's Git integration and the Quarto Netlify build plugin.
- Pin the plugin through a lockfile.
- Publish `_site`; keep `_site/` ignored.
- Keep `_freeze/` committed.
- Preserve GitHub Pages until the new site has completed a seven-day production
  observation period.

### Repository visibility

- Connect and validate Netlify while the repository remains public.
- Make the repository private only after staging succeeds.
- Push a harmless validation commit after the visibility change and confirm
  that Netlify still produces a Deploy Preview and a production deploy.
- The site has one contributor. A second human contributor to a private
  repository requires a Netlify plan review.

### GitHub Pages retirement

- Do not publish a redirect-only copy or preserve the prototype deployment.
- After seven stable days, disable GitHub Pages and delete the remote
  `gh-pages` branch.
- Do not create an archival tag for the old generated site.
- Recovery rebuilds the current source on GitHub Pages or another static host.

## Work packages

### 1. Make the publication build portable ([#13](https://github.com/andreadifra/andreadifra.github.io/issues/13))

Replace the PowerShell-only sitemap hook with a cross-platform implementation.
The hook must derive the recruiter-page URL from the configured canonical site
URL and preserve the private recruiter page contract in `CONTEXT.md`.

Completion criteria:

- A focused automated test proves that the recruiter page is removed from the
  sitemap and unrelated URLs remain.
- The hook runs on Windows and in a Linux build environment.
- No GitHub Pages origin remains hard-coded in publishing code.
- Existing local preview and render workflows still work.

### 2. Configure and validate Netlify staging ([#14](https://github.com/andreadifra/andreadifra.github.io/issues/14))

Add the pinned Quarto Netlify plugin and file-based Netlify configuration.
Connect Netlify to the public repository and establish a noncanonical staging
deployment.

Completion criteria:

- Netlify renders the full website from committed frozen output without
  executing R.
- A pull request produces a public unlisted Deploy Preview.
- A merge to the production branch produces a production deploy.
- The homepage, Blog, Projects, About, tutorial, feeds, search, sitemap,
  `robots.txt`, and `llms.txt` pass staging checks.
- The private recruiter page remains direct-link accessible but absent from
  public discovery surfaces.

### 3. Register and configure the canonical domain ([#15](https://github.com/andreadifra/andreadifra.github.io/issues/15))

Register the chosen domain through Cloudflare and configure Cloudflare DNS for
Netlify. Use a credential-safe interactive wizard for the human-only steps.

Completion criteria:

- Checkout confirms an ordinary-price domain within the renewal ceiling.
- Registrar MFA, recovery codes, auto-renewal, WHOIS redaction, and registrar
  lock are confirmed.
- Netlify verifies the apex and `www` hostnames.
- The apex is primary and `www` redirects to it.
- TLS is active before traffic moves.
- `_quarto.yml`, the sitemap hook, README, metadata, feeds, and canonical URLs
  use the registered origin.
- DNSSEC is enabled after DNS and TLS validation.

### 4. Make the repository private ([#16](https://github.com/andreadifra/andreadifra.github.io/issues/16))

Change repository visibility only after Netlify staging and domain validation.
Restrict the Netlify GitHub App to this repository and retest continuous
deployment.

Completion criteria:

- The repository is private.
- Production remains public.
- Deploy Previews remain public and unlisted.
- A post-privacy pull request builds successfully.
- A post-privacy merge to `master` publishes successfully.
- `docs/operations/hosting.md` records the solo-owner GitHub Free merge rule.

### 5. Cut over and retire GitHub Pages ([#17](https://github.com/andreadifra/andreadifra.github.io/issues/17))

Run the publication review during a monitored daytime window, move the
canonical domain to Netlify, and observe production for seven days.

Completion criteria:

- DNS, TLS, canonical metadata, publication images, feeds, sitemap, search, and
  recruiter-page privacy pass on the public domain.
- Netlify Free usage alerts are configured at approximately 70% and 90%.
- The site remains stable for seven days.
- GitHub Pages is disabled.
- The remote `gh-pages` branch is deleted.
- Repository documentation contains no active GitHub Pages publishing
  instructions.
- The temporary registrar research note has been removed.

## Human-step wizard

The implementation must provide an ephemeral Bash wizard using the repository's
wizard template. It covers only steps an agent cannot perform:

1. Confirm Cloudflare, GitHub, and Netlify MFA and offline recovery.
2. Recheck and purchase the canonical domain without printing it to logs.
3. Authorize the Netlify GitHub App for this repository only.
4. Confirm production and preview visibility in Netlify.
5. Confirm Cloudflare DNS records and Netlify domain verification.
6. Confirm TLS before cutover.
7. Make the GitHub repository private.
8. Confirm the post-privacy preview and production deployments.
9. Enable DNSSEC and usage alerts.
10. After the observation period, disable GitHub Pages and confirm branch
    deletion.

The wizard stores no passwords, tokens, MFA codes, recovery codes, billing
details, or registrar credentials. It uses confirmation gates before domain
purchase, DNS cutover, repository visibility changes, Pages disablement, and
branch deletion.

## Publication gate

For posts and reader-facing layout changes:

1. Open a pull request.
2. Wait for a successful Netlify Deploy Preview.
3. Run the publication review against that preview.
4. Merge only after both checks pass.

Documentation-only and operational changes require a successful preview but do
not require the full publication review.

## Operations and contingency documentation

Create `docs/operations/hosting.md` during implementation. It must document:

- ownership of GitHub, Cloudflare, and Netlify responsibilities;
- normal preview and production deployment;
- local executable rendering and committed frozen output;
- Netlify Free usage alerts and the solo-owner constraint;
- recovery from failed preview and production deploys;
- DNS and domain recovery without storing secrets;
- rebuilding current source on GitHub Pages;
- migrating to another static host;
- the seven-day cutover checklist and clean `gh-pages` removal.

## Rollback

### Before cutover

GitHub Pages remains production. Fix or discard the Netlify staging deployment.

### During the seven-day observation period

Restore the last successful Netlify deploy first. If Netlify cannot serve the
site, republish current source to GitHub Pages and restore the previous DNS
configuration documented in the private operational inventory.

### After GitHub Pages retirement

Follow `docs/operations/hosting.md` to render current source and recreate a
GitHub Pages deployment or move the generated static site to another host.

## Out of scope

- Domain email hosting.
- Executing the tutorial's R environment in Netlify.
- Netlify Functions, forms, authentication, or server-side features.
- Paid Netlify or GitHub plans unless a documented constraint changes.
- Preserving or redirecting the old prototype GitHub Pages site.
- Renaming the GitHub repository.
- Broader analytics, navigation, or content changes.

## Final acceptance

The migration is complete when the canonical domain serves the reviewed site
from Netlify, previews and production deploy automatically from the private
repository, the tutorial renders from committed frozen output, the recruiter
page privacy contract holds, seven days pass without a hosting regression, and
GitHub Pages and `gh-pages` are removed.
