import * as React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { FilterConfig } from "@/types/data-table";

interface FilterDropdownProps {
  filter: FilterConfig;
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

export function FilterDropdown({
  filter,
  selectedValues,
  onChange,
}: FilterDropdownProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-10">
          {filter.label}
          {selectedValues.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {selectedValues.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2" align="start">
        <div className="space-y-2">
          {filter.options.map((option) => (
            <div
              key={option.value}
              className="flex items-center space-x-2 p-1 hover:bg-accent rounded-md"
            >
              <Checkbox
                id={`${filter.key}-${option.value}`}
                checked={selectedValues.includes(option.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onChange([...selectedValues, option.value]);
                  } else {
                    onChange(selectedValues.filter((v) => v !== option.value));
                  }
                }}
              />
              <label
                htmlFor={`${filter.key}-${option.value}`}
                className="flex-1 text-sm cursor-pointer"
              >
                {option.label}
              </label>
              {option.count !== undefined && (
                <span className="text-muted-foreground text-xs">
                  {option.count}
                </span>
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
