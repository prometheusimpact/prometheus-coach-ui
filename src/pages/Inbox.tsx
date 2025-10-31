import { Sidebar } from "@/components/Navigation/Sidebar";
import { BottomNav } from "@/components/Navigation/BottomNav";
import { Moon, Sun, Search, MoreVertical, Phone, Video } from "lucide-react";
import { useTheme } from "next-themes";
import gradientBg from "@/assets/gradient-bg.jpg";
import gradientBgDark from "@/assets/gradient-bg-dark.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import sarahJohnsonImg from "@/assets/sarah-johnson.jpg";
import mikeChenImg from "@/assets/mike-chen.jpg";
import emilyRodriguezImg from "@/assets/emily-rodriguez.jpg";
import davidParkImg from "@/assets/davidpark.jpg";
import alexMartinezImg from "@/assets/alex-martinez.jpg";
import rachelKimImg from "@/assets/rachel-kim.jpg";
import chrisAndersonImg from "@/assets/chris-anderson.jpg";
import jessicaTaylorImg from "@/assets/jessica-taylor.jpg";

interface Message {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread?: number;
  online?: boolean;
}

const conversations: Message[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: sarahJohnsonImg,
    lastMessage: "See you at the gym tomorrow! 💪",
    timestamp: "2m ago",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: mikeChenImg,
    lastMessage: "Thanks for the workout tips!",
    timestamp: "15m ago",
    online: true,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar: emilyRodriguezImg,
    lastMessage: "Can we reschedule our session?",
    timestamp: "1h ago",
    unread: 1,
    online: false,
  },
  {
    id: "4",
    name: "David Park",
    avatar: davidParkImg,
    lastMessage: "The new program is working great!",
    timestamp: "2h ago",
    online: true,
  },
  {
    id: "5",
    name: "Jessica Taylor",
    avatar: jessicaTaylorImg,
    lastMessage: "What time works best for you?",
    timestamp: "3h ago",
    unread: 3,
    online: false,
  },
  {
    id: "6",
    name: "Alex Martinez",
    avatar: alexMartinezImg,
    lastMessage: "Perfect, I'll be there at 6am",
    timestamp: "5h ago",
    online: false,
  },
  {
    id: "7",
    name: "Rachel Kim",
    avatar: rachelKimImg,
    lastMessage: "Thanks for the nutrition advice!",
    timestamp: "Yesterday",
    online: false,
  },
  {
    id: "8",
    name: "Chris Anderson",
    avatar: chrisAndersonImg,
    lastMessage: "Looking forward to our next session",
    timestamp: "Yesterday",
    online: true,
  },
];

const Inbox = () => {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<Message | null>(null);

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="min-h-screen flex w-full"
      style={{
        backgroundImage: `url(${theme === "dark" ? gradientBgDark : gradientBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Sidebar />

      <main className="flex-1 lg:ml-20 pb-20 lg:pb-0">
        <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-10 max-w-7xl">
          {/* Header with Title and Theme Toggle */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold">Inbox</h1>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="glass w-10 h-10 rounded-xl flex items-center justify-center transition-smooth hover:bg-primary hover:text-primary-foreground"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Messenger Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-200px)]">
            {/* Conversations List */}
            <div className="lg:col-span-1 glass rounded-2xl overflow-hidden flex flex-col">
              {/* Search Bar */}
              <div className="p-4 border-b border-white/10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 glass border-white/10"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`w-full p-4 flex items-center gap-3 transition-smooth hover:bg-white/10 border-b border-white/5 ${
                      selectedConversation?.id === conversation.id ? "bg-white/10" : ""
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={conversation.avatar} alt={conversation.name} />
                        <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>

                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-sm truncate">{conversation.name}</h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {conversation.timestamp}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                        {conversation.unread && (
                          <Badge className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs p-0">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2 glass rounded-2xl overflow-hidden flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                          <AvatarFallback>{selectedConversation.name[0]}</AvatarFallback>
                        </Avatar>
                        {selectedConversation.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{selectedConversation.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {selectedConversation.online ? "Active now" : "Offline"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="glass w-9 h-9 rounded-lg flex items-center justify-center transition-smooth hover:bg-primary hover:text-primary-foreground">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="glass w-9 h-9 rounded-lg flex items-center justify-center transition-smooth hover:bg-primary hover:text-primary-foreground">
                        <Video className="w-4 h-4" />
                      </button>
                      <button className="glass w-9 h-9 rounded-lg flex items-center justify-center transition-smooth hover:bg-primary hover:text-primary-foreground">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Demo messages */}
                    <div className="flex items-start gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                        <AvatarFallback>{selectedConversation.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="glass rounded-2xl rounded-tl-sm px-4 py-2 max-w-[70%]">
                        <p className="text-sm">Hey! How's your training going?</p>
                        <span className="text-xs text-muted-foreground mt-1 block">10:30 AM</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 justify-end">
                      <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2 max-w-[70%]">
                        <p className="text-sm">Going great! I'm really seeing progress with the new program.</p>
                        <span className="text-xs opacity-80 mt-1 block text-right">10:32 AM</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                        <AvatarFallback>{selectedConversation.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="glass rounded-2xl rounded-tl-sm px-4 py-2 max-w-[70%]">
                        <p className="text-sm">{selectedConversation.lastMessage}</p>
                        <span className="text-xs text-muted-foreground mt-1 block">
                          {selectedConversation.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 glass border-white/10"
                      />
                      <button className="bg-primary text-primary-foreground px-6 py-2 rounded-xl transition-smooth hover:opacity-90">
                        Send
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Search className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
                    <p className="text-muted-foreground">Choose a conversation from the list to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Inbox;
