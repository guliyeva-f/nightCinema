import { useState, useEffect } from "react"
import { PERMISSION_GROUPS } from "@/const/permissionsData"
import { Checkbox } from "./ui/checkbox"

export default function EditPermissionsForm({ initial = [], onSubmit }) {
  const [selected, setSelected] = useState([])

  useEffect(() => {
    setSelected(initial)
  }, [initial])

  const toggle = (key, checked) => {
    setSelected(prev =>
      checked ? [...prev, key] : prev.filter(p => p !== key)
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) onSubmit(selected)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        {PERMISSION_GROUPS.map(({ title, icon: Icon, items }, i) => (
          <div key={title} className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <Icon className="h-5 w-5 opacity-90" />
              <span className="font-medium">{title}</span>
            </div>
            <div className="flex flex-col gap-2 ml-3">
              {items.map(({ key, label }) => {
                const isChecked = selected.includes(key)
                return (
                  <label key={key} className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={(checked) => toggle(key, checked)}
                    />
                    {label}
                  </label>
                )
              })}
            </div>
            {i !== PERMISSION_GROUPS.length - 1 && (
              <div className="h-px bg-gray-300/30"></div>
            )}
          </div>
        ))}
      </div>
    </form>
  )
}