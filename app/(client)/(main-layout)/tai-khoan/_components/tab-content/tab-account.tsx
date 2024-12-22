import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const TabAccount = () => {
  return (
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
            This is your public display name. It can be your real name or a
            pseudonym. You can only change this once every 30 days.
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
            You can manage verified email addresses in your email settings.
          </p>
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="bio">
            Bio
          </label>
          <Textarea id="bio" className="mt-2" placeholder="I own a computer." />
          <p className="mt-1 text-sm text-muted-foreground">
            You can @mention other users and organizations to link to them.
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
  );
};

export default TabAccount;
