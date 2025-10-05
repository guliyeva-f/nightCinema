import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LanguageSelect() {
  const { i18n, t } = useTranslation();

  return (
    <Select
      value={i18n.language?.split("-")[0] || "az"}
      onValueChange={(val) => i18n.changeLanguage(val)}
    >
      <SelectTrigger className="w-[110px]">
        <SelectValue placeholder={t("language")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="az">Az</SelectItem>
          <SelectItem value="en">En</SelectItem>
          <SelectItem value="ru">Ru</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
