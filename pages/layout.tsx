import MobileMenu from "@component/MobileMenu";
import ThemeToggle, { ThemeFlashGuard } from "@component/ThemeToggle";

export default async function Layout({ children }: { children?: unknown }) {
  const { rows } = await dry().collection("menu").list({
    where: [{ field: "name", op: "eq", value: "Main" }],
    pageSize: 1,
    select: { name: true, refs: true },
  });
  const menu = rows[0];
  const menuItems = menu?.refs ?? [];
  const menuTitle = menu?.name ?? "Main navigation";

  return (
    <>
      <ThemeFlashGuard />
      <div class="flex min-h-dvh flex-col bg-background text-foreground">
        <header class="border-b border-border">
          <div class="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-6">
            <a href="/" class="font-semibold tracking-tight">drycms</a>
            <div class="flex items-center gap-2">
              <nav class="hidden md:block" aria-label={menuTitle}>
                <ul class="flex items-center gap-1">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} class="inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <MobileMenu items={menuItems} title={menuTitle} />
              <ThemeToggle />
            </div>
          </div>
        </header>
        <div class="flex flex-1 flex-col">{children as never}</div>
      </div>
    </>
  );
}
