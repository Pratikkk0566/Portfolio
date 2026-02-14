import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { useSendMessage } from "@/hooks/use-messages";
import { RetroCard } from "@/components/RetroCard";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion } from "framer-motion";
import { Send, Terminal } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const sendMessage = useSendMessage();
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "> INITIALIZING COMM-LINK...",
    "> SECURE CONNECTION ESTABLISHED.",
    "> WAITING FOR USER INPUT..."
  ]);

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertMessage) => {
    setTerminalLines(prev => [...prev, `> SENDING PACKET FROM [${data.email}]...`]);
    
    sendMessage.mutate(data, {
      onSuccess: () => {
        setTerminalLines(prev => [...prev, "> PACKET DELIVERED SUCCESSFULLY.", "> TERMINATING CONNECTION..."]);
        form.reset();
      },
      onError: () => {
        setTerminalLines(prev => [...prev, "> ERROR: PACKET LOSS DETECTED.", "> RETRY INITIATED..."]);
      }
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
      
      {/* Form Section */}
      <motion.div 
        className="flex-1"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl text-primary font-display mb-2">COMM_LINK</h1>
        <p className="text-muted-foreground font-mono mb-8">
          Send a transmission to the developer. Encryption protocols active.
        </p>

        <RetroCard title="INPUT_FORM" className="bg-black/80">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-secondary font-mono uppercase">Identifier / Name</FormLabel>
                    <FormControl>
                      <input className="pixel-input" placeholder="Guest User" {...field} />
                    </FormControl>
                    <FormMessage className="text-destructive font-mono text-xs" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-secondary font-mono uppercase">Return Address / Email</FormLabel>
                    <FormControl>
                      <input className="pixel-input" placeholder="user@domain.com" {...field} />
                    </FormControl>
                    <FormMessage className="text-destructive font-mono text-xs" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-secondary font-mono uppercase">Data Payload / Message</FormLabel>
                    <FormControl>
                      <textarea 
                        className="pixel-input min-h-[150px] resize-none" 
                        placeholder="Enter transmission data..." 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-destructive font-mono text-xs" />
                  </FormItem>
                )}
              />

              <button 
                type="submit" 
                className="pixel-btn w-full flex items-center justify-center gap-2"
                disabled={sendMessage.isPending}
              >
                {sendMessage.isPending ? "TRANSMITTING..." : (
                  <>
                    SEND TRANSMISSION <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </Form>
        </RetroCard>
      </motion.div>

      {/* Terminal / Log Section */}
      <motion.div 
        className="w-full md:w-80"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-black border-2 border-white/20 p-4 h-full min-h-[400px] font-mono text-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-6 bg-white/10 flex items-center px-2 justify-between">
            <span className="text-[10px] text-white/70">TERM_V.1.0</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>
          
          <div className="mt-8 space-y-2 text-green-500">
            {terminalLines.map((line, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {line}
              </motion.div>
            ))}
            <motion.div 
              animate={{ opacity: [0, 1] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-4 bg-green-500 inline-block align-middle ml-1"
            />
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <Terminal className="w-12 h-12 text-white/5 absolute bottom-0 right-0" />
          </div>
        </div>
      </motion.div>

    </div>
  );
}
