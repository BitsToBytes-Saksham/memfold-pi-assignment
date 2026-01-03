export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
  timestamp: number;
  lastMessage: string;
};

export type ChatHistory = {
  [chatId: string]: Chat;
};

export type ChatList = Chat[];  // ✅ For Sidebar props
