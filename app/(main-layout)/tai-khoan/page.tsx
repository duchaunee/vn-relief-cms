import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CircleUser, CreditCard, Eye, PaintBucket, Bell } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="w-full h-full p-10 bg-white">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Quản lý tài khoản của bạn</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <div className="flex gap-10 pt-10">
        <aside className="w-fit">
          <nav className="flex flex-col space-y-1">
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm font-medium"
            >
              <CircleUser className="h-4 w-4" />
              Tài khoản
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
            >
              <CreditCard className="h-4 w-4" />
              Các yêu cầu cứu trợ đã gửi
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
            >
              <PaintBucket className="h-4 w-4" />
              Các yêu cầu cứu trợ đã xác minh
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
            >
              <Bell className="h-4 w-4" />
              Notifications
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
            >
              <Eye className="h-4 w-4" />
              Display
            </Link>
          </nav>
        </aside>
        <main className="flex-1">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium">Profile</h2>
              <p className="text-sm text-muted-foreground">
                This is how others will see you on the site.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium" htmlFor="username">
                  Username
                </label>
                <Input id="username" className="mt-2" placeholder="shadcn" />
                <p className="mt-1 text-sm text-muted-foreground">
                  This is your public display name. It can be your real name or
                  a pseudonym. You can only change this once every 30 days.
                </p>
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <Select defaultValue="select">
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="select">
                      Select a verified email to display
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="mt-1 text-sm text-muted-foreground">
                  You can manage verified email addresses in your email
                  settings.
                </p>
              </div>

              <div>
                <label className="text-sm font-medium" htmlFor="bio">
                  Bio
                </label>
                <Textarea
                  id="bio"
                  className="mt-2"
                  placeholder="I own a computer."
                />
                <p className="mt-1 text-sm text-muted-foreground">
                  You can @mention other users and organizations to link to
                  them.
                </p>
              </div>

              <div>
                <label className="text-sm font-medium">URLs</label>
                <p className="text-sm text-muted-foreground mb-2">
                  Add links to your website, blog, or social media profiles.
                </p>
                <div className="space-y-2">
                  <Input placeholder="https://shadcn.com" />
                  <Input placeholder="http://twitter.com/shadcn" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
