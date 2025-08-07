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
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Header from '@/components/header';
import Logo from '@/components/logo';
import { LayoutDashboard, Settings } from 'lucide-react';
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
              <Link href="/">
                <SidebarMenuButton
                  isActive={pathname === '/'}
                  tooltip="Dashboard"
                >
                    <LayoutDashboard />
                    <span>Dashboard</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/settings">
                <SidebarMenuButton
                  isActive={pathname === '/settings'}
                  tooltip="Configurações"
                >
                    <Settings />
                    <span>Configurações</span>
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
