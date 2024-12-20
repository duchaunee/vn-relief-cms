import { Card, CardContent } from "@/components/ui/card";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MenuItem = ({
  icon,
  title,
  href,
}: {
  icon: string;
  title: string;
  href: string;
}) => (
  <Link href={href} className="lg:mb-2">
    <Card className="group w-full rounded-none shadow-none border border-gray-300 cursor-pointer">
      <CardContent className="flex items-center justify-between p-2 pr-4">
        <div className="flex items-center gap-3">
          <Image src={icon} width={70} height={70} alt={title} />

          <span className="font-medium text-[#202124]">{title}</span>
          <MoveRight className="w-4 h-4 shrink-0 group-hover:text-blue-600" />
        </div>
      </CardContent>
    </Card>
  </Link>
);

export default MenuItem;
