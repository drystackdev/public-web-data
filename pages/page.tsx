import ThemeToggle from "@component/ThemeToggle";

/** Runs before first paint so a dark-mode visitor never sees a light flash.
 * Reads the same key `@component/ThemeToggle` writes (THEME_STORAGE_KEY). */
const NO_FLASH_SCRIPT = `(function(){try{var s=localStorage.getItem("dry-theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

const FEATURES: { title: string; body: string }[] = [
  {
    title: "Mô hình nội dung 3 tầng",
    body: "Collection (nhiều bản ghi), singleton (đúng một bản ghi, ví dụ cấu hình site) và component (nhóm field dùng lại, không có bảng riêng). Field registry lo phần còn lại: text, number, relation, image, richtext...",
  },
  {
    title: "System field sinh tự động",
    body: "Bật feature nào thì có field đó - title/slug, draft, schedule, timestamps, SEO, sortable. Chúng được sinh trên đường chạy chứ không nằm cứng trong schema, nên bật/tắt không phá dữ liệu cũ.",
  },
  {
    title: "App Router kiểu Next.js",
    body: "Thư mục là path segment, page.tsx là route, layout.tsx bọc từ ngoài vào trong, [slug] và [...rest] cho route động. Mỗi lần điều hướng là một lần server render thật - MPA, không có client router.",
  },
  {
    title: "dry() - reader nội dung",
    body: "Một global sẵn có trong page source, không cần import. Luôn chỉ đọc bản đã publish, và select cho phép lấy đúng những field bạn render để phần còn lại không bị nhét vào HTML.",
  },
  {
    title: "Hai content engine",
    body: "SQLite (mặc định) và Cloudflare D1 - cả hai đều là SQL với DDL thật, chọn bằng cấu hình chứ không phải viết lại code. Schema và entry tách thành hai adapter riêng.",
  },
  {
    title: "Storage đổi được backend",
    body: "Media nằm ở .dry/storage khi chạy local, hoặc trong bucket R2 khi chạy trên Cloudflare. Field image chỉ lưu id thuần, URL được resolve lúc render ở cả hai phía SSR và hydrate.",
  },
  {
    title: "Auth & phân quyền",
    body: "Session cookie ký HMAC-SHA256, không cần bảng session. Quyền theo role dạng contentType:action, cờ Super Admin bỏ qua mọi kiểm tra, và quyền được giải lại tươi ở từng request - thu hồi có hiệu lực ngay.",
  },
  {
    title: "RichText tự dựng",
    body: "Trình soạn thảo trên nền ProseMirror, vùng soạn thảo nằm trong shadow DOM để CSS không rò rỉ, kèm khả năng nhúng component do chính bạn đăng ký và build thành bundle độc lập.",
  },
  {
    title: "MCP server cho AI",
    body: "Client AI như Claude Code hay Claude Desktop kết nối trực tiếp để đọc/ghi nội dung và sửa page source - chính là cách trang bạn đang xem được viết ra.",
  },
];

const ARCHITECTURE: { label: string; value: string }[] = [
  { label: "Nền tảng", value: "Preact + Vite, không Astro, không package tách rời" },
  { label: "Server", value: "Một hàm (Request) => Promise<Response> duy nhất" },
  { label: "Runtime", value: "Node (adapter cầu nối) hoặc Cloudflare Workers (chạy thẳng)" },
  { label: "Giao diện site", value: "Tailwind CSS v4 + bộ token của shadcn/ui" },
  { label: "Admin UI", value: "SPA riêng qua preact-iso, hệ design tách biệt hoàn toàn" },
];

export default function HomePage() {
  setTitle("drycms - headless CMS trên nền Preact");

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />

      <div class="min-h-dvh bg-background text-foreground">
        <header class="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
          <div class="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
            <a href="/" class="flex items-center gap-2 font-semibold tracking-tight">
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
          <section class="flex flex-col items-start gap-5 py-20 sm:py-28">
            <span class="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              <span class="h-1.5 w-1.5 rounded-full bg-chart-2" />
              Headless CMS - nội dung tách rời giao diện
            </span>
            <h1 class="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
              Quản trị nội dung, và cả trang web hiển thị nó
            </h1>
            <p class="max-w-2xl text-lg text-muted-foreground">
              drycms là một headless CMS viết bằng Preact và Vite: bạn định nghĩa
              content type trong trình quản trị, rồi dựng trang công khai ngay
              trong cùng dự án bằng file router và hàm đọc dữ liệu{" "}
              <code class="rounded bg-muted px-1.5 py-0.5 text-sm">dry()</code>.
              Chạy được trên Node lẫn Cloudflare Workers mà không phải sửa code
              ứng dụng.
            </p>
            <div class="flex flex-wrap gap-3 pt-2">
              <a
                href="#tinh-nang"
                class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
              >
                Xem hệ thống có gì
              </a>
              <a
                href="#kien-truc"
                class="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Kiến trúc
              </a>
            </div>
          </section>

          <section class="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
            {[
              { value: "2", label: "content engine" },
              { value: "2", label: "runtime hỗ trợ" },
              { value: "3", label: "loại content type" },
              { value: "1", label: "file CSS dùng chung" },
            ].map((stat) => (
              <div key={stat.label} class="bg-card px-5 py-6">
                <p class="text-3xl font-bold tracking-tight text-card-foreground">
                  {stat.value}
                </p>
                <p class="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </section>

          <section id="tinh-nang" class="scroll-mt-20 py-20">
            <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
              Hệ thống này gồm những gì
            </h2>
            <p class="mt-2 max-w-2xl text-muted-foreground">
              Mỗi phần dưới đây là một quyết định kiến trúc có thật trong mã
              nguồn, không phải danh sách tính năng mong muốn.
            </p>
            <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature) => (
                <article
                  key={feature.title}
                  class="rounded-xl border border-border bg-card p-5 transition-colors hover:border-ring"
                >
                  <h3 class="font-semibold text-card-foreground">
                    {feature.title}
                  </h3>
                  <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.body}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section id="kien-truc" class="scroll-mt-20 border-t border-border py-20">
            <div class="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
                  Kiến trúc trong một cái nhìn
                </h2>
                <p class="mt-2 text-muted-foreground">
                  Toàn bộ phía server là một hàm nhận Request và trả Response.
                  Mỗi runtime chỉ cần một lớp mỏng bắc cầu vào hàm đó, nên thêm
                  môi trường chạy mới không đụng tới logic nội dung.
                </p>
              </div>
              <dl class="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
                {ARCHITECTURE.map((row) => (
                  <div
                    key={row.label}
                    class="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4"
                  >
                    <dt class="text-sm font-medium text-muted-foreground">
                      {row.label}
                    </dt>
                    <dd class="text-sm text-card-foreground">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section class="border-t border-border py-20">
            <div class="rounded-xl border border-border bg-muted/40 p-8">
              <h2 class="text-xl font-semibold">Sửa chính trang này</h2>
              <p class="mt-2 max-w-2xl text-muted-foreground">
                Trang bạn đang xem là{" "}
                <code class="rounded bg-muted px-1.5 py-0.5 text-sm">
                  pages/page.tsx
                </code>{" "}
                trong page source. Thêm một thư mục bên cạnh nó là có route mới;
                đổi tên thư mục là đổi URL công khai. Sau khi sửa, chạy Build từ
                Page Editor để bản mới lên site thật.
              </p>
            </div>
          </section>
        </main>

        <footer class="border-t border-border">
          <div class="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>drycms - Preact + Vite headless CMS</p>
            <p>Giao diện sáng/tối theo lựa chọn của bạn, lưu ngay trên trình duyệt.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
