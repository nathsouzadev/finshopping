"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, X, Bot } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ChatMessage } from '@/lib/types';
import { getApiUrl } from '@/lib/utils';

const TypingIndicator = () => (
    <div className="flex items-center space-x-1 p-3">
        <Bot className="h-6 w-6 text-primary" />
        <div className="flex items-center space-x-1">
            <span className="h-2 w-2 animate-typing-bubble rounded-full bg-muted-foreground [animation-delay:0.2s]"></span>
            <span className="h-2 w-2 animate-typing-bubble rounded-full bg-muted-foreground [animation-delay:0.3s]"></span>
            <span className="h-2 w-2 animate-typing-bubble rounded-full bg-muted-foreground [animation-delay:0.4s]"></span>
        </div>
    </div>
);


const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage: ChatMessage = {
            id: String(Date.now()),
            role: 'user',
            content: inputValue,
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const apiUrl = getApiUrl('/chat');
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: inputValue }),
            });

            if (!response.ok) {
                throw new Error('Falha ao buscar resposta');
            }

            const data = await response.json();

            const botMessage: ChatMessage = {
                id: String(Date.now() + 1),
                role: 'assistant',
                content: data.reply,
            };
            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            const errorMessage: ChatMessage = {
                id: String(Date.now() + 1),
                role: 'assistant',
                content: 'Desculpe, não consegui me conectar. Tente novamente mais tarde.',
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-4 sm:right-6 z-50"
                    >
                        <Card className="w-[calc(100vw-32px)] sm:w-96 h-[60vh] flex flex-col shadow-2xl">
                            <CardHeader className="flex flex-row items-center justify-between p-4">
                                <div className="flex items-center gap-2">
                                    <Bot className="h-6 w-6 text-primary" />
                                    <CardTitle className="text-lg">Assistente Virtual</CardTitle>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className='h-7 w-7'>
                                    <X className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="flex-1 overflow-hidden p-0">
                                <ScrollArea className="h-full" ref={scrollAreaRef}>
                                    <div className="p-4 space-y-4">
                                        {messages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={cn('flex items-end gap-2', {
                                                    'justify-end': msg.role === 'user',
                                                })}
                                            >
                                                <div
                                                    className={cn(
                                                        'max-w-[80%] rounded-2xl px-4 py-2 text-sm',
                                                        {
                                                            'bg-primary text-primary-foreground rounded-br-none': msg.role === 'user',
                                                            'bg-muted rounded-bl-none': msg.role === 'assistant',
                                                        }
                                                    )}
                                                >
                                                    {msg.content}
                                                </div>
                                            </div>
                                        ))}
                                        {isLoading && <TypingIndicator />}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                            <CardFooter className="p-4 border-t">
                                <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                                    <Input
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Digite sua mensagem..."
                                        disabled={isLoading}
                                        autoComplete="off"
                                    />
                                    <Button type="submit" size="icon" disabled={isLoading}>
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </form>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-4 sm:right-6 z-50 h-14 w-14 rounded-full shadow-lg"
                size="icon"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ rotate: 45, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: -45, scale: 0 }}>
                            <X className="h-6 w-6" />
                        </motion.div>
                    ) : (
                        <motion.div key="open" initial={{ rotate: 45, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: -45, scale: 0 }}>
                            <MessageSquare className="h-6 w-6" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </Button>
        </>
    );
};

export default ChatWidget;
