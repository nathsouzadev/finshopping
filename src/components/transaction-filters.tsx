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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from './date-picker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const filterSchema = z.object({
  type: z.enum(['all', 'income', 'expense']).optional(),
  category: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  minAmount: z.coerce.number().optional(),
  maxAmount: z.coerce.number().optional(),
});

type FilterFormValues = z.infer<typeof filterSchema>;

interface TransactionFiltersProps {
  onFilterChange: (filters: FilterFormValues) => void;
}

const TransactionFilters = ({ onFilterChange }: TransactionFiltersProps) => {
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      type: 'all',
      category: 'all',
    },
  });

  const onSubmit = (data: FilterFormValues) => {
    onFilterChange(data);
  };

  const handleClear = () => {
    form.reset({
      type: 'all',
      category: 'all',
      startDate: undefined,
      endDate: undefined,
      minAmount: undefined,
      maxAmount: undefined,
    });
    onFilterChange({ type: 'all', category: 'all' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtros</CardTitle>
        <CardDescription>
          Refine sua busca por transações.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Transação</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="income">Entrada</SelectItem>
                        <SelectItem value="expense">Saída</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="Salário">Salário</SelectItem>
                        <SelectItem value="Moradia">Moradia</SelectItem>
                        <SelectItem value="Alimentação">Alimentação</SelectItem>
                        <SelectItem value="Renda Extra">Renda Extra</SelectItem>
                        <SelectItem value="Lazer">Lazer</SelectItem>
                        <SelectItem value="Contas">Contas</SelectItem>
                        <SelectItem value="Transporte">Transporte</SelectItem>
                        <SelectItem value="Outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="minAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor Mínimo</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ex: 50" {...field} value={field.value ?? ''}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor Máximo</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Ex: 1000" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
               <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Inicial</FormLabel>
                    <DatePicker
                      date={field.value}
                      setDate={field.onChange}
                      placeholder="Selecione a data"
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Final</FormLabel>
                    <DatePicker
                      date={field.value}
                      setDate={field.onChange}
                      placeholder="Selecione a data"
                    />
                  </FormItem>
                )}
              />
              <div className="lg:col-span-2 flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={handleClear} className="w-full md:w-auto">
                  Limpar Filtros
                </Button>
                <Button type="submit" className="w-full md:w-auto">Aplicar Filtros</Button>
              </div>
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
};

export default TransactionFilters;
