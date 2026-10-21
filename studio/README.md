# Sanity Clean Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open-source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the Sanity community](https://www.sanity.io/community/join?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)

## Deploy to Netlify

Create a separate Netlify site for the Studio and set its **Base directory** to
`studio`. Configure `npm run build` as the build command and `dist` as the
publish directory. Netlify will install the dependencies from
`studio/package-lock.json` and publish the generated static site.

The Studio is a static client application. If direct access to client-side
routes is required, add a Netlify rewrite from `/*` to `/index.html` with
status `200` in the site settings.

The Sanity project ID and dataset are defined in `sanity.config.ts` and
`sanity.cli.ts`; no frontend or server secrets should be added to the Studio
site. After the first successful deploy, configure the deployed Studio URL in
the Sanity project settings if it should be available as a trusted origin.
