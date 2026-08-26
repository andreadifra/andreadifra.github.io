# Hosting operations

The canonical public site is <https://andreadifrancia.com/>. The canonical
origin is part of the site's identity and must not be replaced with a Netlify
deployment URL.

## Ownership

- **GitHub** owns the source repository, pull requests, and committed frozen
  computation output.
- **Cloudflare Registrar** owns the domain registration. Cloudflare DNS is the
  authoritative DNS provider.
- **Netlify** builds and serves Deploy Previews and production from Git. It does
  not own the canonical domain.

Do not store passwords, tokens, MFA codes, recovery codes, billing details, or
registrar credentials in this repository. Keep the private DNS inventory and
recovery material outside GitHub.

## Normal publication

1. Perform executable computation locally and commit the resulting `_freeze/`
   output.
2. Open a pull request. Netlify creates a public, unlisted Deploy Preview.
3. Require a successful preview before merging. Reader-facing changes also
   require a publication review on the preview.
4. Merge to `master`. Netlify deploys production automatically.
5. Confirm the production deploy references the merge commit, then smoke-test
   the canonical domain.

Do not use a manual production deploy while Git integration is healthy. Hosted
builds use `render --use-freezer`; they must not execute R.

## Required smoke tests

Check the homepage, Blog, Projects, About, the tutorial, `blog.xml`,
`index.xml`, `search.json`, `sitemap.xml`, `robots.txt`, and `llms.txt`.
Absolute discovery URLs must use the canonical origin.

`hire-me.html` must remain directly accessible with `noindex, nofollow`, while
remaining absent from navigation, listings, search, feeds, sitemap output, and
LLM discovery.

Verify that `https://www.andreadifrancia.com/` redirects to the HTTPS apex and
that TLS is valid before changing DNS or announcing a release.

## Plan constraints and usage

The repository has one owner. If it becomes private, GitHub Free cannot enforce
the Netlify status as a required check, so a successful preview is an
owner-controlled merge rule. Adding another contributor to a private repository
requires a Netlify plan review.

Configure Netlify usage notifications at approximately 70% and 90% of the Free
plan allowance. Review usage before large or repeated rebuilds.

## Failed preview or production deploy

- **Preview failure:** do not merge. Inspect the Netlify build log, reproduce
  with the pinned Quarto version and `render --use-freezer`, and update the pull
  request.
- **Production failure:** keep the last successful Netlify deploy published,
  correct the source through a pull request, and merge only after its preview
  succeeds.
- **Bad successful release:** restore the last known-good Netlify deploy, then
  prepare a forward fix through the normal preview gate.

Record the affected commit and deployment URL in the relevant issue without
including credentials or private DNS inventory.

## DNS and domain recovery

Cloudflare remains the authoritative source for registration and DNS. Netlify's
Production domains screen is the source for hosting targets and verification.
Do not guess DNS values or copy private account data into this runbook.

Before changing nameservers or DNSSEC, verify the current records and preserve a
private recovery copy. During an incident, restore the last verified DNS state,
confirm apex and `www` resolution, wait for TLS validation, and enable DNSSEC
only after ordinary DNS works end to end.

## GitHub Pages recovery

GitHub Pages remains the temporary pre-retirement fallback. For an approved
recovery:

1. Check out the current source commit and restore executable output locally if
   required.
2. Run `quarto render` and complete the site smoke tests.
3. Run `quarto publish gh-pages` only after confirming that recovery publication
   is intended.
4. Point DNS to the recovered origin using the private DNS inventory and verify
   TLS before restoring traffic.

This recovery path rebuilds current source; it does not preserve the old
prototype as an archival site.

## Alternate-host recovery

Render current source locally, upload `_site/` to a static host, attach the
canonical apex and `www`, then validate DNS, TLS, redirects, discovery files,
search, feeds, and recruiter-page privacy before moving traffic. The provider
URL must never replace the canonical origin in `_quarto.yml`.

## Seven-day cutover and Pages retirement

- [ ] Confirm production deploys automatically from the intended `master`
      commit.
- [ ] Validate DNS, TLS, apex/`www`, canonical metadata, publication images,
      feeds, sitemap, search, and recruiter-page privacy.
- [ ] Confirm DNSSEC and Netlify usage notifications.
- [ ] Keep GitHub Pages and the remote `gh-pages` branch intact for seven stable
      days.
- [ ] Record and resolve any hosting regression during the observation window.
- [ ] After explicit confirmation, disable GitHub Pages.
- [ ] Verify the exact remote `gh-pages` target, then delete it with a separate
      explicit confirmation gate.
- [ ] Remove remaining active GitHub Pages publishing instructions while
      retaining this recovery procedure.
