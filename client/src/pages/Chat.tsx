import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChatMessage, chatResponse } from "@/utils";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { BreadCrumb, TokenAmount } from "@/components";

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");

  const result = useMutation({
    mutationFn: (query: ChatMessage) => chatResponse([...messages, query]),
    onSuccess: (data) => {
      if (data === null) {
        toast({ description: "something went wrong" });
        return;
      }
      setMessages([...messages, data]);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) toast({ description: "please enter a value" });
    const query = {
      role: "user",
      content: text,
    };
    result.mutate(query);
    setMessages((prev) => [...prev, query]);
    setText("");
  };

  return (
    <>
      <BreadCrumb currentPage="chat" />
      <TokenAmount />
      <main className="min-h-[calc(100vh-15rem)] grid grid-rows-[1fr,auto] ">
        <div className="h-[calc(100vh-19rem)] overflow-y-auto scroll-bar-chat">
          {messages.map((message, i) => {
            const { content, role } = message;
            const classes =
              role === "user"
                ? "flex flex-col items-end p-4"
                : "py-4 flex-col   max-w-2xl leading-6";
            return (
              <article key={i} className={classes}>
                <span className="block uppercase mb-4 text-primary">
                  {role}
                </span>
                <p>{content}</p>
              </article>
            );
          })}
        </div>
        <form onSubmit={handleSubmit} className="flex items-center">
          <Input
            type="text"
            name="chatMessage"
            placeholder="ask me something..."
            className="h-12 rounded-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button className="h-12 border-0 rounded-none">submit</Button>
        </form>
      </main>
    </>
  );
};
export default Chat;
