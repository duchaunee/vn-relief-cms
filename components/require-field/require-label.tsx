import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// RequiredLabel component
const RequiredLabel = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {children}
      <span className="text-red-500 text-[16px]">*</span>
    </div>
  );
};

// FormField component with validation styling
const FormInput = React.forwardRef(({ error, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      {...props}
      className={cn(
        props.className,
        error && "border-red-500 focus-visible:ring-red-500"
      )}
    />
  );
});

FormInput.displayName = "FormInput";

export { RequiredLabel, FormInput };
