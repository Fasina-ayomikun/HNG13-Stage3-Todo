# **Todo List App (React Native + Expo + Convex)**

A pixel-perfect **Todo List mobile app** built with **React Native (Expo)** and **Convex** for real-time CRUD operations.
Includes **dark/light theming**, **drag-to-reorder**, and **persistent preferences** — optimized for mobile and web.

---

## **Features**

- **Pixel-perfect UI** (faithful to Figma)
- **Light / Dark mode toggle** – persists with `AsyncStorage`
- **Real-time CRUD** using **Convex**
- Create, toggle complete/incomplete, delete, and drag-reorder todos
- **Responsive design**
  - Tablets/desktops -> filter chips
  - Mobile -> segmented control

- **Accessibility-friendly**
  - Screen-reader labels
  - High-contrast colors

- **Offline persistence** for theme and input state

---

## **Tech Stack**

| Layer            | Tool                            |
| ---------------- | ------------------------------- |
| Frontend         | React Native (Expo)             |
| Styling          | styled-components               |
| State Management | React Hooks + Context           |
| Backend          | Convex (serverless realtime DB) |
| Fonts            | @expo-google-fonts/josefin-sans |
| Animation        | react-native-reanimated         |
| Icons / SVG      | react-native-svg                |
| Build / Deploy   | Expo EAS CLI                    |

---

## **Project Structure**

```
todo-stage3/
├── app/                     # Expo Router entry
│   └── (tabs)/index.tsx     # Home screen (Todo list)
│
├── components/              # Reusable UI components
│   ├── TodoItem.tsx
│   ├── TodoComposer.tsx
│   ├── ThemeToggleIcon.tsx
│   ├── SegmentFilter.tsx
│   └── CheckIcon.tsx
│
├── convex/                  # Convex backend
│   ├── schema.ts
│   └── todos.ts
│
├── providers/               # Theme + Convex Providers
├── constants/               # Light/Dark theme definitions
├── assets/                  # Images & fonts
└── README.md
```

---

## **Setup Instructions**

### Clone and install

```bash
git clone https://github.com/Fasina-ayomikun/HNG13-Stage3-Todo.git
cd todo-stage3
npm install
```

### Convex backend setup

```bash
npx convex init          # creates convex/ folder (already present)
npx convex deploy        # deploys to prod
```

Copy the printed **Convex cloud URL**, e.g.
`https://vibrant-bandicoot-628.convex.cloud`

### Add environment variable

Create a `.env` (or `.env.local`) file in project root:

```
EXPO_PUBLIC_CONVEX_URL=https://vibrant-bandicoot-628.convex.cloud
```

> Must start with `EXPO_PUBLIC_` for Expo to read it at runtime.

---

## **Run Development**

In one terminal:

```bash
npx convex dev
```

In another:

```bash
npx expo start -c
```

- Press **“a”** -> open Android Emulator
- Or scan QR code in **Expo Go**

---

## **Building an APK**

### Local test build

```bash
npx eas build -p android --profile preview --local
```

-> saves `.apk` file in `dist/` folder.

---

## **Environment Variables**

| Variable                 | Description                |
| ------------------------ | -------------------------- |
| `EXPO_PUBLIC_CONVEX_URL` | Convex production endpoint |

---

## **Convex Functions Overview**

| Function  | Purpose                     |
| --------- | --------------------------- |
| `list`    | Get todos (sorted by order) |
| `create`  | Add new todo                |
| `update`  | Toggle/edit todo            |
| `remove`  | Delete todo                 |
| `reorder` | Save new drag order         |

All defined in **`convex/todos.ts`** with index `"by_order"` in `schema.ts`.

---

## **Troubleshooting**

| Issue                 | Fix                                                                    |
| --------------------- | ---------------------------------------------------------------------- |
| App loads endlessly   | Ensure `.env` points to your Convex cloud URL                          |
| “ThemeProvider” error | Wrap everything inside `AppThemeProvider`                              |
| SVG not rendering     | Replace `<svg>` with `<Svg>` from `react-native-svg`                   |
| Fonts missing         | `npx expo install expo-font @expo-google-fonts/josefin-sans`           |
| Drag not working      | Keep `react-native-reanimated/plugin` as **last** in `babel.config.js` |

---

## **Submission Requirements (Stage 3)**

| Item                               | Status |
| ---------------------------------- | ------ |
| Pixel-perfect design (Figma)       | ✅     |
| Light/Dark theme persistence       | ✅     |
| Real-time CRUD via Convex          | ✅     |
| Drag-to-reorder                    | ✅     |
| Responsive layout (chips/segments) | ✅     |
| Accessibility labels               | ✅     |
| Clear error handling               | ✅     |
| Complete README + Setup guide      | ✅     |

---

## **Quality Checklist**

- [x] App builds successfully (no errors/warnings)
- [x] Convex deployed to cloud (`npx convex deploy`)
- [x] Theme toggles instantly
- [x] “No todos yet” message shown
- [x] All CRUD + reorder tested
- [x] EAS build APK verified on device
- [x] README up-to-date
- [x] Links (GitHub / APK / Video) included
