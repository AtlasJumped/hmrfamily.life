# hmrfamily.life

The home page of the HMR family of websites. Static site: `index.html`, `css/style.css`, `js/app.js`. No build step, no external fonts or CDNs.

- Mission statement, site map, one section per site (tour, link, questions), what we are building next, footer with Discord invite.
- Design picker (bottom right): `?design=1` to `?design=4`. Ratings (strong dislike, dislike, like, strong like, plus a note) are stored in the browser's localStorage. "Copy all ratings" copies them as text.
- Deploy: any static host. `CNAME` is set to `hmrfamily.life`.

To add a site, edit the `SITES` list at the top of `js/app.js`.
