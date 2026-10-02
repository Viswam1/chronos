# Chronos

Time mastery through the ages. A single Next.js app that blends five
historical time-management techniques into one polished interface.

## Techniques
- **Pomodoro** — Italy, 1980s
- **Qin/Han Workday** — China, 221 BCE – 220 CE
- **Asante Adaduanan** — 42-day cycle, West Africa
- **Egyptian Water Clock** — deep flow timer
- **Greco-Roman Routine** — lectio, disputatio, gymnasium, examinatio

## Run locally
```bash
npm install
npm run dev

Open http://localhost:3000.
Run with Docker
bash

docker build -t chronos .
docker run -p 3000:3000 chronos

Deploy for free

Connect the repo to Vercel — zero config needed. output: "standalone"
keeps the Docker image small for other hosts (Fly, Render, Railway).
text


---

## 4. `src/lib/`

### `src/lib/utils.ts`
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
