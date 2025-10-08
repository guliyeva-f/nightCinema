import * as React from "react";
import { useTranslation } from "react-i18next";
import "flag-icons/css/flag-icons.min.css";

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
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder={t("language")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="az"><span className="fi fi-az"></span>Az</SelectItem>
          <SelectItem value="en"><span className="fi fi-sh"></span>En</SelectItem>
          <SelectItem value="ru"><span className="fi fi-ru"></span>Ru</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
