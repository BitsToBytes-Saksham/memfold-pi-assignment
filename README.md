# Pi.ai Desktop Experience 

A pixel-perfect, responsive replication of the [Pi.ai](https://pi.ai) desktop interface, built as a Frontend Engineering assignment for Memfold.

This project replicates the distinct aesthetic of Pi, including the "Discover" flow, the "New Chat" experience, and the signature floating input pill, powered by a real LLM backend via LiteLLM.

## 🚀 Live Demo

**[View the Live Application →](https://memfold-pi-assignment.vercel.app/)**

## ✨ Key Features

* **Pixel-Perfect UI:** Exact replication of Pi.ai's typography (Merriweather), warm beige color palette (`#F3F0E7`), and spacing.
* **Floating Input Pill:** Custom implementation of the signature input bar that floats above the content with a gradient fade.
* **Micro-Animations:** Smooth, spring-physics based message bubbles and page transitions using **Framer Motion**.
* **Real-Time Chat:** Fully functional chat interface integrated with GPT-5.1 via the LiteLLM API (Optimistic UI updates).
* **Responsive Design:** Mobile-first architecture with a collapsible sidebar and adaptive padding for Desktop, Tablet, and Mobile.
* **Discover Flow:** Interactive topic selection that transitions seamlessly into a new chat context.

## 🛠️ Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Styling:** Tailwind CSS
* **Language:** TypeScript
* **Icons:** Lucide React
* **Animations:** Framer Motion
* **State Management:** React Hooks (`useState`, `useEffect`)

## ⚙️ Getting Started

Follow these steps to run the project locally.

### Clone the Repository
```bash
git clone [https://github.com/BitsToBytes-Saksham/memfold-pi-assignment.git](https://github.com/BitsToBytes-Saksham/memfold-pi-assignment.git)
cd memfold-pi-assignment
```
### Install Dependencies
```bash
npm install
```
### Configure Environment Variables
Create a .env.local file in the root directory. You will need the API keys provided in the assignment documentation:
```bash
NEXT_PUBLIC_API_URL=[https://litellm.memfold.ai](https://litellm.memfold.ai)
NEXT_PUBLIC_API_KEY=your_provided_api_key_here
```
### Run the Development Server
```bash
npm run dev
```
Open http://localhost:3000 with your browser to see the result.

### 📂 Project Structure
```bash
memfold-pi-assignment/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts        # LiteLLM API proxy
│   ├── layout.tsx              # Global layout & typography
│   ├── page.tsx                # Discover ↔ Chat flow controller
│   └── globals.css             # Global styles
│
├── components/
│   ├── chat/
│   │   ├── ChatBubble.tsx      # User & assistant message UI
│   │   └── TypingIndicator.tsx # Loading / typing animation
│   ├── discover/
│   │   ├── Discover.tsx        # Discover screen
│   │   └── PromptCard.tsx      # Prompt suggestion cards
│   ├── InputArea.tsx           # Floating input component
│   └── Sidebar.tsx             # Responsive sidebar
│
├── public/
├── .env.local
├── package.json
├── tailwind.config.ts
├── postcss.config.js
└── README.md
```
