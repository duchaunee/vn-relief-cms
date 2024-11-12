// Ở trang này thì lấy xem có share data từ bên dialog-post được không, sau đó check nếu k có data từ bên route đó truyền sang thì mới fetch db về
import Post from "@/components/posts/social-post";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-1 mx-auto">
        DAY LA TRANG POST
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
