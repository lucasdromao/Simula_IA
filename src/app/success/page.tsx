"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Brain,
  CheckCircle2,
  Crown,
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get('session_id');
    setSessionId(id);
    
    // Aqui você pode fazer uma chamada à API para verificar o status do pagamento
    // e ativar a assinatura do usuário no banco de dados
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SimulaIA
            </span>
          </div>
        </div>
      </header>

      {/* Success Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Pagamento Confirmado!
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Bem-vindo ao SimulaIA Premium! Sua assinatura foi ativada com sucesso.
            </p>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Crown className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">
                  Você agora é Premium!
                </h2>
              </div>

              <div className="space-y-3 text-left max-w-md mx-auto">
                {[
                  "Simulados ilimitados com IA",
                  "Upload ilimitado de materiais",
                  "Análise avançada de desempenho",
                  "Acesso a todos os cursos",
                  "Ranking e competições"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={() => router.push("/cursos")}
              >
                Começar a Estudar
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <Button 
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => router.push("/simulado/ia")}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Criar Simulado com IA
              </Button>
            </div>

            {sessionId && (
              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-gray-500">
                  ID da transação: {sessionId.substring(0, 20)}...
                </p>
              </div>
            )}
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Você receberá um email de confirmação em breve com todos os detalhes da sua assinatura.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2024 SimulaIA. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
