import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";
import { useTernaryDarkMode } from "usehooks-ts";

export const OPTIONS = {
  system: { text: "System", icon: "🌓" },
  light: { text: "Light", icon: "☀️" },
  dark: { text: "Dark", icon: "🌙" },
} as const;

type DarkMode = keyof typeof OPTIONS;

function modifyDarkClass(darkMode: DarkMode) {
  const html = document.documentElement;

  let appearance: "light" | "dark" = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches
    ? "dark"
    : "light";

  if (darkMode !== "system") {
    appearance = darkMode;
  }

  html.classList.toggle("dark", appearance === "dark");
}

export default function ThemeSelect() {
  const { ternaryDarkMode, setTernaryDarkMode } = useTernaryDarkMode();

  function handelSelect(darkMode: DarkMode) {
    setTernaryDarkMode(darkMode);
    modifyDarkClass(darkMode);
  }

  return (
    <div className="flex items-center gap-2">
      <Listbox value={ternaryDarkMode} onChange={handelSelect}>
        <div className="relative mt-1">
          <Listbox.Button className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border bg-t3-purple-200/50 text-left focus:outline-none hover:bg-t3-purple-200/75 dark:border-t3-purple-200/20 dark:bg-t3-purple-200/10 dark:hover:border-t3-purple-200/50 sm:text-sm">
            {OPTIONS[ternaryDarkMode].icon}

            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 fill-current stroke-current transition-colors duration-300 peer-checked:text-t3-purple-500"
              viewBox="0 0 24 24"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Zm0-2V4a8 8 0 1 1 0 16Z"></path>
            </svg> */}
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="dark:border-t3-purple-200/50py-1 shadow-l absolute right-0 mt-1 max-h-60 w-fit overflow-auto rounded-lg bg-default text-base focus:outline-none focus-visible:outline-none dark:border-t3-purple-200/50 sm:text-sm">
              {Object.entries(OPTIONS).map(([value, { text, icon }]) => (
                <Listbox.Option
                  key={value}
                  className={({ selected, active }) =>
                    `relative cursor-pointer bg-t3-purple-200/50 py-1 px-3 text-slate-900 outline-none hover:bg-t3-purple-200/75 dark:bg-t3-purple-200/10 dark:text-t3-purple-100 dark:hover:bg-t3-purple-200/20 ${
                      (selected || active) &&
                      "bg-t3-purple-200/75 dark:bg-t3-purple-200/20"
                    }`
                  }
                  value={value}
                >
                  {({ selected }) => (
                    <div className="flex items-center">
                      <div>{icon}</div>
                      <span
                        className={clsx(
                          "ml-3 truncate",
                          selected && "font-medium",
                          !selected && "font-normal",
                        )}
                      >
                        {text}
                      </span>
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
