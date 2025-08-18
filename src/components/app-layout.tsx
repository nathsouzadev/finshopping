"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import Header from '@/components/header';
import Logo from '@/components/logo';
import { LayoutDashboard, Settings, ShoppingCart, History, BookText } from 'lucide-react';
import type { Transaction } from '@/lib/types';


interface AppLayoutProps {
  children: React.ReactNode;
  onNewTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const AppLayout = ({ children, onNewTransaction }: AppLayoutProps) => {
  const pathname = usePathname();

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl group-data-[collapsible=icon]:hidden">
              FinShopping
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu className='p-2'>
            <SidebarMenuItem>
              <Link href="/">
                <SidebarMenuButton
                  isActive={pathname === '/'}
                  tooltip="Dashboard"
                  asChild
                >
                  <div>
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/shopping">
                <SidebarMenuButton
                  isActive={pathname === '/shopping'}
                  tooltip="Shopping"
                  asChild
                >
                  <div>
                    <ShoppingCart />
                    <span>Shopping</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <Link href="/purchases">
                <SidebarMenuButton
                  isActive={pathname === '/purchases'}
                  tooltip="Minhas Compras"
                  asChild
                >
                  <div>
                    <History />
                    <span>Minhas Compras</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/documentation">
                <SidebarMenuButton
                  isActive={pathname === '/documentation'}
                  tooltip="Documentação"
                  asChild
                >
                  <div>
                    <BookText />
                    <span>Documentação</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/settings">
                <SidebarMenuButton
                  isActive={pathname === '/settings'}
                  tooltip="Configurações"
                  asChild
                >
                  <div>
                    <Settings />
                    <span>Configurações</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <Header onNewTransaction={onNewTransaction} />
        {children}
      </SidebarInset>
    </>
  );
};

export default AppLayout;
