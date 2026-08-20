# Domain registrar comparison for `andreadifrancia.com`

Research date: 15 August 2026

## Recommendation

Register the domain with **Cloudflare Registrar** and use **Cloudflare DNS**, provided that binding the registration to Cloudflare's authoritative nameservers is acceptable. It best fits a solo personal site: registration and renewal are sold at registry/ICANN cost, WHOIS redaction and one-click DNSSEC are included, and the account supports two-factor authentication and a registrar lock. It also keeps DNS independent of Netlify, so a later hosting move requires only DNS changes.

Choose **Porkbun** instead if the ability to change authoritative DNS providers without first transferring the registration is more important than the small long-term price advantage. Porkbun is the strongest portability-oriented alternative and is the easiest recommendation if avoiding any registrar/DNS coupling is a design goal.

Do not choose Namecheap on price alone. Its current first-year promotion is competitive, but its published `.com` renewal price is materially higher.

> Purchase caution: do not commit or publish this note before registering the chosen domain. Publicly documenting an unregistered target creates an avoidable domain-squatting risk.

## Availability

The Verisign `.com` RDAP endpoint returned HTTP 404 for `andreadifrancia.com` on 15 August 2026. That means no registration record was returned at the time of the check; it is **not a reservation or guarantee of availability**. Recheck availability and the exact checkout price immediately before purchase. Cloudflare likewise says that search results are not the source of truth and requires a real-time check before registration.

Sources: [Verisign `.com` RDAP endpoint](https://rdap.verisign.com/com/v1/domain/andreadifrancia.com); [Cloudflare Registrar API guidance](https://developers.cloudflare.com/registrar/registrar-api/).

## Cost comparison

All published amounts below are for a standard, non-premium `.com` for one year and were checked on the research date.

| Provider | First year | Renewal | Pricing caveats |
|---|---:|---:|---|
| Cloudflare Registrar | Real-time checkout price; approximately wholesale registry + ICANN cost | Same at-cost basis | Cloudflare does not publish a stable unauthenticated `.com` amount in its docs. Its contract permits VAT or other local taxes based on billing address. Confirm the GBP card conversion and final tax-inclusive amount at checkout. |
| Porkbun | US$11.08 | US$11.08 | Published prices are in USD and include ICANN and other domain fees. Confirm any UK tax and card foreign-exchange charge at checkout. Porkbun expects the `.com` wholesale price to rise on 1 November 2026, so its price may change. |
| Namecheap | US$10.98 promotional; US$14.98 regular | US$18.48 | Namecheap charges in USD; GBP display values are informational and the card issuer may add conversion fees. Namecheap states that it does not tax domain purchases. Promotions can change and should not drive a multi-year choice. |

Cloudflare charges the registry and ICANN cost without markup for both registration and renewal. Because its exact public checkout figure is not exposed in the cited documentation, it should not be presented as a guaranteed numeric quote. [Cloudflare Registrar overview](https://developers.cloudflare.com/registrar/), [Cloudflare registration agreement and tax caveat](https://www.cloudflare.com/domain-registration-agreement/).

Porkbun's live pricing table lists `.com` registration, renewal, and transfer at US$11.08, with ICANN and other fees included. Its pricing explanation breaks that figure into US$10.26 wholesale, US$0.20 ICANN, and US$0.62 payment processing. [Porkbun domain pricing](https://porkbun.com/products/domains), [Porkbun pricing explanation](https://kb.porkbun.com/article/266-how-does-domain-pricing-work).

Namecheap's live table lists a US$10.98 promotional first year (US$14.98 regular), US$18.48 renewal, and free lifetime privacy. It charges cards in USD even when showing an indicative GBP value. [Namecheap `.com` pricing](https://www.namecheap.com/domains/registration/gtld/com/), [Namecheap currency policy](https://www.namecheap.com/support/knowledgebase/article.aspx/10104/7/what-currency-do-you-charge-in-at-namecheap/), [Namecheap VAT statement](https://www.namecheap.com/support/knowledgebase/article.aspx/9204/7/do-you-include-vat-in-your-prices/).

## Features and operational trade-offs

| Criterion | Cloudflare Registrar | Porkbun | Namecheap |
|---|---|---|---|
| WHOIS privacy | Automatic redaction, included | Free privacy service, enabled by default for supported TLDs including `.com` | Free lifetime domain privacy |
| DNSSEC | Free, one-click | Supported with Porkbun DNS; external DNSSEC/DS management is also available | Supported with free BasicDNS; automatic toggle when using its DNS |
| MFA and account security | 2FA; domain lock enabled by default | 2FA and WebAuthn; login notifications; domain lock is visible/manageable | TOTP and U2F security-key 2FA; registrar lock, auto-renewal, and security alerts included |
| DNS management | Strong free authoritative DNS, but mandatory while the domain is registered there | Free DNS record management and the option to change nameservers | Free BasicDNS and the option to use custom nameservers |
| Transfer out | Self-service unlock and authorization code; standard ICANN 60-day restrictions apply | Portable nameservers and ordinary authorization-code transfer; standard registry restrictions apply | Registrar lock and ordinary authorization-code transfer; standard registry restrictions apply |
| Principal drawback | Registrar is coupled to Cloudflare DNS: using another authoritative DNS provider requires transferring the domain | US-based support hours for live channels; possible photo-ID verification for some new accounts | Highest ongoing `.com` renewal cost of the three |

Cloudflare explicitly requires registered domains to keep Cloudflare nameservers; changing authoritative DNS provider requires transferring the registration. Transfer-out itself is documented and self-service after applicable ICANN locks, so this is coupling rather than permanent lock-in. [Cloudflare Registrar FAQ](https://developers.cloudflare.com/registrar/faq/), [Cloudflare transfer-out instructions](https://developers.cloudflare.com/registrar/account-options/transfer-out-from-cloudflare/).

Porkbun provides free Cloudflare-powered DNS management, common record types, changeable nameservers, DNSSEC, default privacy, and account protection including WebAuthn. Some new accounts can be asked for short-lived third-party photo-ID verification as an anti-abuse measure. [Porkbun domain features and security](https://porkbun.com/products/domains), [Porkbun DNS management](https://kb.porkbun.com/article/231-how-to-add-dns-records-on-porkbun), [Porkbun DNSSEC](https://kb.porkbun.com/article/216-how-to-enable-porkbuns-cloudflare-dnssec), [Porkbun WHOIS privacy](https://kb.porkbun.com/article/97-how-to-configure-whois-privacy-service-porkbun), [Porkbun verification policy](https://kb.porkbun.com/article/225-why-porkbun-id-verification).

Namecheap includes BasicDNS, DNSSEC, privacy, registrar lock, auto-renewal, security alerts, and TOTP/U2F account authentication. Those are sound features, but there is no corresponding benefit here that offsets the higher published renewal rate. [Namecheap `.com` features](https://www.namecheap.com/domains/registration/gtld/com/), [Namecheap DNSSEC](https://www.namecheap.com/support/knowledgebase/article.aspx/9723/2232/managing-dnssec-for-domains-pointed-to-premium-or-basicdns/), [Namecheap account security](https://www.namecheap.com/support/knowledgebase/subcategory/45/account-security/), [Namecheap standard domain protections](https://www.namecheap.com/support/knowledgebase/article.aspx/10535/2289/what-is-domain-vault-and-why-do-i-need-it/).

## Purchase checklist

1. Recheck `andreadifrancia.com` with the chosen registrar immediately before purchase.
2. Confirm that it is a standard-price domain and review the final tax-inclusive/converted amount.
3. Register it for at least one year and enable auto-renewal.
4. Use a unique password and enable phishing-resistant WebAuthn/U2F MFA where offered; store recovery codes offline.
5. Confirm WHOIS privacy/redaction and registrar lock are active.
6. Configure DNS for Netlify, validate the site, and then enable DNSSEC.
7. Record the registrar, renewal date, recovery method, and DNS ownership in the private operational inventory; do not store credentials or recovery codes in the repository.

## Decision summary

- **Default choice:** Cloudflare Registrar + Cloudflare DNS.
- **Portability-first choice:** Porkbun Registrar + Porkbun DNS.
- **Not preferred:** Namecheap, because the renewal premium is recurring and its relevant security/DNS features do not materially exceed the other choices.
- **Decision gate before purchase:** compare the final Cloudflare and Porkbun checkout totals for a UK billing address, then choose Cloudflare unless mandatory Cloudflare nameservers are considered unacceptable.
