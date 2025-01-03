import LoginForm from "@/components/login-form";
import LoginScreenshot from "./login-screen-shot";

export default function Page() {
  return (
    <div className="flex lg:flex-row flex-col w-full h-full items-center lg:px-4 justify-center gap-2 lg:bg-transparent bg-white">
      {/* <LoginScreenshot /> */}
      <LoginForm />
    </div>
  );
}
