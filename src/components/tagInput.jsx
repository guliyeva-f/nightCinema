"use client";

import * as React from "react";
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputLabel,
  TagsInputList,
} from "@/components/ui/tags-input";

export function EditableTagsInput({
  label,
  placeholder,
  value = [],
  onChange,
}) {
  const [tempValue, setTempValue] = React.useState("");

  const addTag = () => {
    const trimmed = tempValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setTempValue("");
    }
  };

  return (
    <TagsInput value={value} onValueChange={onChange} editable addOnPaste>
      <TagsInputLabel>{label}</TagsInputLabel>
      <TagsInputList>
        {value.map((v) => (
          <TagsInputItem key={v} value={v}>
            {v}
          </TagsInputItem>
        ))}

        <TagsInputInput
          placeholder={placeholder}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          inputMode="text"
          enterKeyHint="done"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "Done") {
              e.preventDefault();
              addTag();
            }
          }}
        />
      </TagsInputList>
    </TagsInput>
  );
}