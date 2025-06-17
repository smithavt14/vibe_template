"use client"

import { MdSunny, MdNightlight } from "react-icons/md"

export default function ThemeController() {
  return (
    <label className="swap swap-rotate">
      {/* this hidden checkbox controls the state */}
      <input type="checkbox" className="theme-controller" value="sunset" />

      {/* sun icon */}
      <MdSunny className="swap-off h-6 w-6 fill-current" />

      {/* moon icon */}
      <MdNightlight className="swap-on h-6 w-6 fill-current" />
    </label>
  )
} 