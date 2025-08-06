import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface MultiSelectProps {
  options: { label: string; value: string }[];
  selected: string[];
  onSelectedChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onSelectedChange,
  placeholder = "Select options...",
  className,
}) => {
  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onSelectedChange(selected.filter((item) => item !== value));
    } else {
      onSelectedChange([...selected, value]);
    }
  };

  const handleRemove = (value: string) => {
    onSelectedChange(selected.filter((item) => item !== value));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={false}
          className={`w-full justify-between ${className}`}
        >
          <div className="flex flex-wrap gap-1">
            {selected.length > 0 ? (
              selected.map((value) => {
                const option = options.find((opt) => opt.value === value);
                return (
                  <Badge key={value} variant="secondary">
                    {option?.label}
                    <X
                      className="ml-1 h-3 w-3 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(value);
                      }}
                    />
                  </Badge>
                );
              })
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => handleSelect(option.value)}
                className="cursor-pointer"
              >
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelect;
