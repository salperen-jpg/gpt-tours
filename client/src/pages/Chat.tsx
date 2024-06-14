import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ChatMessage,
  TokenWithMessage,
  chatResponse,
  customFetch,
} from "@/utils";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BreadCrumb } from "@/components";
import { useLoaderData } from "react-router-dom";
import { Token } from "./Profile";
import useTokenAmount from "@/hooks/useToken";

const Chat = () => {
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const tokenLoader = useLoaderData() as Token;

  const { isPending, data: tokenAmount } = useTokenAmount();
  const isTokenThere = tokenAmount ?? 0;
  const isTokenEnough = isTokenThere > 300;

  const result = useMutation({
    mutationFn: async (query: ChatMessage) => {
      if (tokenLoader?.tokenAmount < 300) {
        toast({ description: "you dont have enough token!" });
        return;
      }
      const chatResp = await chatResponse([...messages, query]);
      if (chatResp === null) {
        return;
      }
      const { content, role, total_tokens } = chatResp as TokenWithMessage;
      const { data } = await customFetch.patch<{ msg: string; token: number }>(
        "/token",
        {
          usedToken: total_tokens,
        }
      );
      queryClient.invalidateQueries({ queryKey: ["token"] });

      toast({
        description: `your current token amount is ${data?.token}`,
      });
      setMessages([...messages, { content, role }]);
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
        <form onSubmit={handleSubmit}>
          {!isTokenEnough && (
            <small className="block text-red-500 mb-2">
              You don't have enough token!
            </small>
          )}
          <div className="flex items-center">
            <Input
              type="text"
              name="chatMessage"
              placeholder="Enter your message..."
              className="h-12 rounded-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              className="h-12 border-0 rounded-none"
              disabled={isPending || !isTokenEnough}
            >
              Ask
            </Button>
          </div>
        </form>
      </main>
    </>
  );
};
export default Chat;
