
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { useEffect, useState } from 'react';
import { getApiUrl } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from '@/components/ui/label';
import { Skeleton } from './ui/skeleton';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

const settingsSchema = z.object({
  apiBaseUrl: z.string().url({ message: "Por favor, insira uma URL válida." }).or(z.literal('')),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

interface ApiResponse {
  status: number;
  body: any;
}

const SettingsForm = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('/transactions');
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [queryParams, setQueryParams] = useState('');

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      apiBaseUrl: '',
    },
  });

  useEffect(() => {
    const storedApiUrl = localStorage.getItem('apiBaseUrl');
    if (storedApiUrl) {
      form.setValue('apiBaseUrl', storedApiUrl);
    }
  }, [form]);

  const testApiUrl = async (url: string): Promise<boolean> => {
    setIsSaving(true);
    try {
      // We test the transactions endpoint as a prerequisite
      const testUrl = `${url.replace(/\/$/, '')}/transactions`;
      const response = await fetch(testUrl);
      if (!response.ok) {
        throw new Error(`A API retornou o status ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error("API test failed", error);
      toast({
        title: 'Falha na conexão',
        description: 'Não foi possível conectar à URL base fornecida. Verifique a URL e tente novamente.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const onSubmit = async (data: SettingsFormValues) => {
    const { apiBaseUrl } = data;
    console.log(apiBaseUrl)

    const isApiValid = await testApiUrl(apiBaseUrl || '/api');

    if (isApiValid) {
      if (apiBaseUrl) {
        localStorage.setItem('apiBaseUrl', apiBaseUrl);
      } else {
        localStorage.removeItem('apiBaseUrl');
      }
      toast({
        title: 'Configurações salvas!',
        description: 'A URL base da API foi atualizada. A aplicação será recarregada.',
      });
      // Reload the page to refetch all data with the new URL
      setTimeout(() => window.location.reload(), 1000);
    }
  };
  
  const handleTestEndpoint = async () => {
    setIsTesting(true);
    setApiResponse(null);
    try {
        const testUrl = getApiUrl(selectedEndpoint) + queryParams;
        const response = await fetch(testUrl);
        const body = await response.json();
        setApiResponse({ status: response.status, body });
    } catch (error: any) {
        setApiResponse({ status: 500, body: { error: "Failed to fetch", message: error.message } });
    } finally {
        setIsTesting(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuração da API</CardTitle>
          <CardDescription>
            Configure a URL base para buscar e criar dados. Se deixado em branco,
            o aplicativo usará a API interna de exemplo.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <FormField
                control={form.control}
                name="apiBaseUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Base da API</FormLabel>
                    <FormControl>
                      <Input placeholder="https://sua-api.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
                <Button type="submit" disabled={isSaving}>
                    {isSaving ? 'Salvando...' : 'Salvar e Recarregar'}
                </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Testar Endpoints da API</CardTitle>
            <CardDescription>
                Use o seletor abaixo para testar diferentes endpoints com a URL base configurada.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                <div className="flex-grow w-full sm:w-auto">
                    <Label htmlFor="endpoint-select">Endpoint</Label>
                    <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
                        <SelectTrigger id="endpoint-select" className="w-full sm:w-[200px]">
                            <SelectValue placeholder="Selecione um endpoint" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="/transactions">/transactions</SelectItem>
                            <SelectItem value="/products">/products</SelectItem>
                            <SelectItem value="/purchases">/purchases</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex-grow w-full sm:w-auto">
                   <Label htmlFor="query-params">Parâmetros (opcional)</Label>
                   <Input 
                        id="query-params"
                        placeholder="/:id ou ?chave=valor" 
                        value={queryParams}
                        onChange={(e) => setQueryParams(e.target.value)}
                        className="w-full"
                    />
                </div>
                <Button onClick={handleTestEndpoint} disabled={isTesting} className="w-full sm:w-auto">
                    {isTesting ? 'Testando...' : 'Testar Rota'}
                </Button>
            </div>

            {isTesting && (
                <div className='space-y-2'>
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-48 w-full" />
                </div>
            )}
            
            {apiResponse && (
                <div className='space-y-2 pt-4'>
                    <h3 className="font-semibold">Resposta</h3>
                    <div className="flex items-center gap-2">
                        <span>Status:</span>
                         <Badge variant={apiResponse.status >= 200 && apiResponse.status < 300 ? 'secondary' : 'destructive'} className={cn(apiResponse.status >= 200 && apiResponse.status < 300 && 'text-emerald-600 border-emerald-600')}>
                            {apiResponse.status}
                        </Badge>
                    </div>
                    <pre className="p-4 bg-muted rounded-md text-sm overflow-x-auto">
                        <code>
                            {JSON.stringify(apiResponse.body, null, 2)}
                        </code>
                    </pre>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsForm;
