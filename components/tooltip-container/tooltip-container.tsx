import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ITooltipContainer {
  trigger: React.ReactNode;
  content: string;
}

const TooltipContainer = ({ trigger, content }: ITooltipContainer) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent className="hidden md:block">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipContainer;
