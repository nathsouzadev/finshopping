"use client"

import SettingsForm from "@/components/settings-form";
import AppLayout from "@/components/app-layout";

export default function SettingsPage() {
  return (
    <AppLayout onNewTransaction={() => {}}>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="max-w-2xl mx-auto w-full">
            <h1 className="text-3xl font-bold mb-6">Configurações</h1>
            <SettingsForm />
        </div>
      </main>
    </AppLayout>
  );
}
