"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

const settingsSchema = z.object({
  apiUrl: z.string().url({ message: "Por favor, insira uma URL válida." }).or(z.literal('')),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const SettingsForm = () => {
  const { toast } = useToast();
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      apiUrl: '',
    },
  });

  useEffect(() => {
    const storedApiUrl = localStorage.getItem('apiUrl');
    if (storedApiUrl) {
      form.setValue('apiUrl', storedApiUrl);
    }
  }, [form]);

  const onSubmit = (data: SettingsFormValues) => {
    if (data.apiUrl) {
      localStorage.setItem('apiUrl', data.apiUrl);
    } else {
      localStorage.removeItem('apiUrl');
    }
    toast({
      title: 'Configurações salvas!',
      description: 'A URL da API foi atualizada com sucesso.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API de Transações</CardTitle>
        <CardDescription>
          Configure a URL da API para buscar e criar transações. Se deixado em branco,
          o aplicativo usará a API interna de exemplo.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="apiUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da API</FormLabel>
                  <FormControl>
                    <Input placeholder="https://sua-api.com/transacoes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Salvar</Button>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
};

export default SettingsForm;
