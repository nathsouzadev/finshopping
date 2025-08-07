"use client"

import Header from "@/components/header";
import SettingsForm from "@/components/settings-form";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* O Header espera uma prop onNewTransaction, mas ela não é necessária aqui. 
          Passamos uma função vazia para satisfazer a tipagem. 
          Uma melhoria futura seria tornar essa prop opcional. */}
      <Header onNewTransaction={() => {}} />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 container mx-auto">
        <div className="max-w-xl mx-auto w-full">
            <h1 className="text-3xl font-bold mb-6">Configurações</h1>
            <SettingsForm />
        </div>
      </main>
    </div>
  );
}
