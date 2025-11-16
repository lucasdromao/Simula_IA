"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain,
  ArrowLeft,
  Crown,
  Check,
  Sparkles,
  Zap,
  Shield,
  TrendingUp,
  Loader2
} from "lucide-react";

export default function PlanosPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    
    try {
      // Criar sessão de checkout
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: 'price_premium_monthly',
          userId: 'user_' + Date.now(), // Temporário - substituir por ID real do usuário
          userEmail: 'usuario@email.com' // Temporário - substituir por email real
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar checkout');
      }

      const { url } = await response.json();
      
      // Redirecionar para o checkout do Stripe
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Erro ao processar checkout:', error);
      alert('Erro ao processar pagamento. Por favor, tente novamente.');
      setLoading(false);
    }
  };

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
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <Badge className="bg-purple-100 text-purple-700 border-purple-200">
            <Crown className="w-3 h-3 mr-1" />
            Planos Premium
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Escolha Seu Plano
          </h1>
          
          <p className="text-lg text-gray-600">
            Desbloqueie todo o potencial da IA para seus estudos
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <Card className="p-8">
            <div className="text-center mb-6">
              <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Grátis</h2>
              <div className="text-4xl font-bold text-gray-900 mb-2">R$ 0</div>
              <p className="text-gray-600">Para experimentar</p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                "3 simulados com IA grátis",
                "Simulados prontos ilimitados",
                "Histórico básico",
                "Estatísticas simples"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => router.push("/cursos")}
            >
              Começar Grátis
            </Button>
          </Card>

          {/* Premium Plan */}
          <Card className="p-8 border-2 border-purple-600 relative overflow-hidden">
            <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
              Mais Popular
            </Badge>

            <div className="text-center mb-6">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Premium</h2>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  R$ 29,90
                </span>
                <span className="text-gray-600">/mês</span>
              </div>
              <p className="text-gray-600">Acesso completo</p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                "Simulados ilimitados com IA",
                "Upload ilimitado de materiais",
                "Análise avançada de desempenho",
                "Questões adaptativas personalizadas",
                "Explicações detalhadas com IA",
                "Acesso a todos os cursos",
                "Ranking e competições",
                "Suporte prioritário",
                "Sem anúncios"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-purple-600 p-1 rounded-full">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <Crown className="w-5 h-5 mr-2" />
                  Assinar Premium
                </>
              )}
            </Button>

            <div className="text-center mt-4 space-y-1">
              <div className="text-sm text-gray-600">
                🎁 <strong>7 dias grátis</strong> para testar
              </div>
              <div className="text-xs text-gray-500">
                Cancele quando quiser • Sem compromisso
              </div>
            </div>
          </Card>
        </div>

        {/* Benefits */}
        <div className="max-w-5xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Por que escolher o Premium?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">IA Ilimitada</h3>
              <p className="text-sm text-gray-600">
                Crie quantos simulados personalizados quiser com nossa IA avançada
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Evolução Rápida</h3>
              <p className="text-sm text-gray-600">
                Análises detalhadas mostram exatamente onde você precisa melhorar
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Garantia Total</h3>
              <p className="text-sm text-gray-600">
                30 dias de garantia. Não gostou? Devolvemos seu dinheiro
              </p>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Perguntas Frequentes
          </h2>
          
          <div className="space-y-4">
            {[
              {
                q: "Posso cancelar a qualquer momento?",
                a: "Sim! Você pode cancelar sua assinatura quando quiser, sem multas ou taxas."
              },
              {
                q: "Como funciona o período de teste?",
                a: "Você tem 7 dias grátis para testar todos os recursos Premium. Se não gostar, cancele antes e não será cobrado."
              },
              {
                q: "Posso usar em quantos dispositivos?",
                a: "Você pode acessar sua conta em qualquer dispositivo, sem limite."
              },
              {
                q: "A IA realmente funciona?",
                a: "Sim! Nossa IA analisa seus materiais e cria questões personalizadas baseadas no conteúdo que você enviou."
              }
            ].map((faq, i) => (
              <Card key={i} className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </Card>
            ))}
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
