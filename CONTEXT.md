# Project Context

## Domain Language

### Canonical site URL

The canonical site URL is the single public origin used for navigation,
metadata, feeds, sitemaps, indexing, and shared links. It belongs to the
website's public identity and must remain independent of the current hosting
provider.

Provider-owned deployment URLs are preview or fallback addresses, not the
canonical site URL.

### Publication image

A publication image is the single canonical visual identity of a post across
the article hero, post listings, and social previews.

_Avoid_: hero image, thumbnail, social image

### Publication review

A publication review is the final manual acceptance check that a post appears
consistently across its article, listing, and social-preview surfaces.

_Avoid_: manual enforcement

### Private recruiter page

The `hire-me` page is a private recruiter page: it may be rendered and shared by
direct link, but it must not appear in navigation, listings, site search,
sitemap output, or other public discovery surfaces.

Its privacy contract belongs to the page module, not to scattered caller
knowledge. Styling, page behaviour, downloadable documents, search exclusion,
and sitemap exclusion should be maintained as one coherent publishing concern.

Do not introduce a generalized private-pages seam unless a second private
direct-link page appears. The current design should optimize for the single
`hire-me` page.

The discovery portion of this contract is automated. Document metadata keeps
the page out of site search, and `scripts/enforce-hire-me-privacy.ts` removes it
from the sitemap and LLM output. The Netlify frozen-render integration test
also checks navigation, listings, feeds, search, sitemap, LLM output, direct-link
rendering, and the page's `noindex, nofollow` metadata. Styling, interactive
behaviour, and downloadable documents still require manual review before
publishing.

The sitemap exclusion is intentionally `hire-me`-specific. Keep the post-render
hook and script named around the `hire-me` page until another private
direct-link page creates a real seam.

The recruiter interaction script is also `hire-me`-specific. Keep page
behaviour in `scripts/hire-me.js` and load it from `hire-me.qmd` rather than
embedding substantial inline JavaScript in the page source.

`scripts/hire-me.js` owns the Calendly adapter. The page source should not load
Calendly's external script or stylesheet directly.
