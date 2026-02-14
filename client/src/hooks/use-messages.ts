import { useMutation } from "@tanstack/react-query";
import { api, type InsertMessage } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useSendMessage() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      const res = await fetch(api.messages.create.path, {
        method: api.messages.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.messages.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Transmission failed");
      }
      
      return api.messages.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "TRANSMISSION SUCCESS",
        description: "Message uploaded to mainframe.",
        className: "border-2 border-primary bg-black text-primary font-mono",
      });
    },
    onError: (error) => {
      toast({
        title: "TRANSMISSION ERROR",
        description: error.message,
        variant: "destructive",
        className: "border-2 border-destructive bg-black text-destructive font-mono",
      });
    },
  });
}
