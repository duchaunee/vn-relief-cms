import EmergencyContacts from "@/components/emergency-contacts/EmergencyContacts";
import Post from "@/components/posts/social-post";

export default function Page() {
  return (
    <div className="flex flex-1 justify-evenly gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-6 md:grid-cols-1 mx-auto">
        <Post />
        <Post />
        <Post />
      </div>
      <EmergencyContacts />
    </div>
  );
}
