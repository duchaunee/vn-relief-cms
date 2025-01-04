// components/StatusTimeline.tsx
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TruckIcon, HeartHandshakeIcon } from "lucide-react";

interface StatusMessage {
  type: "transport" | "contribution";
  message: string;
}

interface StatusTimelineProps {
  messages: StatusMessage[];
}

const StatusTimeline = ({ messages }: StatusTimelineProps) => {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <ScrollArea className="pr-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-2 rounded-lg transition-all hover:bg-accent"
              >
                <div
                  className={`p-2 rounded-full ${
                    message.type === "transport"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {message.type === "transport" ? (
                    <TruckIcon className="h-5 w-5" />
                  ) : (
                    <HeartHandshakeIcon className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {message.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StatusTimeline;
