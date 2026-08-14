import ThemeToggle from "@component/ThemeToggle";

/** Runs before first paint so a dark-mode visitor never sees a light flash.
 * Reads the same key `@component/ThemeToggle` writes (THEME_STORAGE_KEY). */
const NO_FLASH_SCRIPT = `(function(){try{var s=localStorage.getItem("dry-theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

export default async function HomePage() {
  const home = await dry().singleton("home").get();

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
      <div class="min-h-dvh bg-background text-foreground">
        <header class="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
          <div class="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
            <a
              href="/"
              class="flex items-center gap-2 font-semibold tracking-tight"
            >
              <span class="flex h-6 w-6 items-center justify-center rounded bg-primary text-xs font-bold text-primary-foreground">
                d
              </span>
              drycms
            </a>
            <div class="flex items-center gap-3">
              <a
                href="#tinh-nang"
                class="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline"
              >
                Tính năng
              </a>
              <a
                href="#kien-truc"
                class="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline"
              >
                Kiến trúc
              </a>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main class="mx-auto max-w-5xl px-6">
          {/* Hero */}
          <section class="flex flex-col items-start gap-5 py-20 sm:py-28">
            <span
              {...dryBind(home.$.heroBadge)}
              class="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-chart-2" />
              {home.heroBadge}
            </span>
            <h1
              {...dryBind(home.$.heroTitle)}
              class="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl"
            >
              {home.heroTitle}
            </h1>
            <div
              {...dryBind(home.$.heroDescription)}
              class="max-w-2xl text-lg leading-relaxed text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm"
              dangerouslySetInnerHTML={{ __html: home.heroDescription ?? "" }}
            />
            <div class="flex flex-wrap gap-3 pt-2">
              {home.heroPrimaryLabel ? (
                <a
                  href={home.heroPrimaryHref || "#tinh-nang"}
                  class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
                >
                  <span {...dryBind(home.$.heroPrimaryLabel)}>
                    {home.heroPrimaryLabel}
                  </span>
                </a>
              ) : null}
              {home.heroSecondaryLabel ? (
                <a
                  href={home.heroSecondaryHref || "#kien-truc"}
                  class="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <span {...dryBind(home.$.heroSecondaryLabel)}>
                    {home.heroSecondaryLabel}
                  </span>
                </a>
              ) : null}
            </div>
          </section>

          {/* Stats */}
          {home.stats?.length ? (
            <section class="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
              {home.stats.map((stat, i) => (
                <div key={i} class="bg-card px-5 py-6">
                  <p class="text-3xl font-bold tracking-tight text-card-foreground">
                    {stat.value}
                  </p>
                  <p class="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </section>
          ) : null}

          {/* Features */}
          <section id="tinh-nang" class="scroll-mt-20 py-20">
            <h2
              {...dryBind(home.$.featuresHeading)}
              class="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              {home.featuresHeading}
            </h2>
            <p
              {...dryBind(home.$.featuresDescription)}
              class="mt-2 max-w-2xl text-muted-foreground"
            >
              {home.featuresDescription}
            </p>
            {home.features?.length ? (
              <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {home.features.map((feature, i) => (
                  <article
                    key={i}
                    class="rounded-xl border border-border bg-card p-5 transition-colors hover:border-ring"
                  >
                    <h3 class="font-semibold text-card-foreground">
                      {feature.heading}
                    </h3>
                    <div
                      class="mt-2 text-sm leading-relaxed text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: feature.body ?? "" }}
                    />
                  </article>
                ))}
              </div>
            ) : null}
          </section>

          {/* Architecture */}
          <section
            id="kien-truc"
            class="scroll-mt-20 border-t border-border py-20"
          >
            <div class="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <h2
                  {...dryBind(home.$.architectureHeading)}
                  class="text-2xl font-bold tracking-tight sm:text-3xl"
                >
                  {home.architectureHeading}
                </h2>
                <div
                  {...dryBind(home.$.architectureDescription)}
                  class="mt-2 text-muted-foreground"
                  dangerouslySetInnerHTML={{
                    __html: home.architectureDescription ?? "",
                  }}
                />
              </div>
              {home.architecture?.length ? (
                <dl class="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
                  {home.architecture.map((row, i) => (
                    <div
                      key={i}
                      class="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4"
                    >
                      <dt class="text-sm font-medium text-muted-foreground">
                        {row.label}
                      </dt>
                      <dd class="text-sm text-card-foreground">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
          </section>

          {/* CTA - edit this page */}
          <section class="border-t border-border py-20">
            <div class="rounded-xl border border-border bg-muted/40 p-8">
              <h2 {...dryBind(home.$.ctaHeading)} class="text-xl font-semibold">
                {home.ctaHeading}
              </h2>
              <div
                {...dryBind(home.$.ctaBody)}
                class="mt-2 max-w-2xl text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm"
                dangerouslySetInnerHTML={{ __html: home.ctaBody ?? "" }}
              />
            </div>
          </section>
        </main>

        <footer class="border-t border-border">
          <div class="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p {...dryBind(home.$.footerText)}>{home.footerText}</p>
            <p {...dryBind(home.$.footerNote)}>{home.footerNote}</p>
          </div>
        </footer>
      </div>
    </>
  );
}
