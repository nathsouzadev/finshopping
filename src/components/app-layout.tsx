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
import { LayoutDashboard, Settings, ShoppingCart } from 'lucide-react';
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
              Fino
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === '/'}
                tooltip="Dashboard"
                asChild
              >
                <Link href="/">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === '/shopping'}
                tooltip="Shopping"
                asChild
              >
                <Link href="/shopping">
                  <ShoppingCart />
                  <span>Shopping</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === '/settings'}
                tooltip="Configurações"
                asChild
              >
                <Link href="/settings">
                  <Settings />
                  <span>Configurações</span>
                </Link>
              </SidebarMenuButton>
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
