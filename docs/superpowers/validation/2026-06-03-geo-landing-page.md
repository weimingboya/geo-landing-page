# GEO Landing Page Validation

## Commands

- `node tests/smoke.test.js`
- `python3 -m http.server 4173`

## Browser Scenarios

- Initial page load: pass
- Empty URL validation: pass
- Invalid domain validation: pass
- Diagnosis preview generation with `openai.com`: pass
- CTA scroll to lead form: pass
- Lead form required-field validation: pass
- Lead form success state: pass
- Desktop responsive check at 1440px: pass
- Mobile responsive check at 390px: pass

## Browser Evidence

- Desktop screenshot: `docs/superpowers/validation/screenshots/geo-landing-desktop.png`
- Mobile screenshot: `docs/superpowers/validation/screenshots/geo-landing-mobile.png`

## Notes

- The page is frontend-only.
- Diagnosis results are deterministic simulated previews.
- Lead form submission is an in-page confirmation and does not send data to a backend.
- Browser validation showed no console error logs.
- Desktop and mobile checks showed no horizontal overflow.
