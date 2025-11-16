"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  Brain, 
  Trophy, 
  Sparkles, 
  BookOpen, 
  Target,
  Zap,
  Crown,
  Lock,
  Check,
  Upload,
  FileText,
  TrendingUp,
  Users,
  Star
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [aiTestsRemaining, setAiTestsRemaining] = useState(3);
  const [showPaywall, setShowPaywall] = useState(false);

  const handleAITest = () => {
    if (aiTestsRemaining > 0) {
      router.push("/simulado/ia");
    } else {
      setShowPaywall(true);
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
          
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="w-3 h-3" />
              {aiTestsRemaining} testes IA grátis
            </Badge>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => router.push("/ranking")}
            >
              <Trophy className="w-4 h-4 mr-2" />
              Ranking
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => router.push("/planos")}
            >
              <Crown className="w-4 h-4 mr-2" />
              Assinar Premium
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <Badge className="bg-purple-100 text-purple-700 border-purple-200">
            <Sparkles className="w-3 h-3 mr-1" />
            Powered by IA
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Estude com Inteligência Artificial
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simulados personalizados para sua matéria, seu curso, seu conteúdo. 
            A IA cria questões baseadas nos seus próprios materiais.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8"
              onClick={() => router.push("/cursos")}
            >
              <Zap className="w-5 h-5 mr-2" />
              Começar Agora
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8"
              onClick={() => router.push("/cursos")}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Ver Cursos
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { icon: Users, value: "50k+", label: "Estudantes" },
            { icon: BookOpen, value: "200+", label: "Cursos" },
            { icon: FileText, value: "10k+", label: "Simulados" },
            { icon: Trophy, value: "95%", label: "Aprovação" }
          ].map((stat, i) => (
            <Card key={i} className="p-6 text-center hover:shadow-lg transition-shadow">
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* AI Feature Highlight */}
      <section className="container mx-auto px-4 py-12">
        <Card className="max-w-5xl mx-auto p-8 md:p-12 bg-gradient-to-br from-purple-600 to-blue-600 text-white border-0">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Badge className="bg-white/20 text-white border-white/30">
                <Sparkles className="w-3 h-3 mr-1" />
                Exclusivo
              </Badge>
              
              <h2 className="text-4xl font-bold">
                IA que Aprende com Você
              </h2>
              
              <p className="text-lg text-purple-100">
                Envie seus PDFs, slides, anotações e apostilas. Nossa IA analisa todo o conteúdo e cria simulados personalizados focados exatamente no que você precisa estudar.
              </p>

              <div className="space-y-3">
                {[
                  "Questões baseadas no seu material",
                  "Dificuldade adaptativa",
                  "Explicações detalhadas com IA",
                  "Análise de desempenho inteligente"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="bg-white/20 p-1 rounded-full">
                      <Check className="w-4 h-4" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-purple-50"
                onClick={handleAITest}
              >
                <Upload className="w-5 h-5 mr-2" />
                Testar IA Grátis ({aiTestsRemaining} restantes)
              </Button>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl">
                    <FileText className="w-8 h-8" />
                    <div className="flex-1">
                      <div className="font-semibold">Apostila_Calculo1.pdf</div>
                      <div className="text-sm text-purple-200">2.4 MB • Analisando...</div>
                    </div>
                  </div>
                  
                  <Progress value={75} className="h-2 bg-white/20" />
                  
                  <div className="text-sm text-purple-200">
                    ✨ IA identificou 45 tópicos principais
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Course Categories */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Escolha Seu Caminho
          </h2>
          <p className="text-gray-600">
            Simulados específicos para cada objetivo
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: GraduationCap,
              title: "Universitário",
              desc: "Simulados por curso e matéria",
              color: "from-blue-500 to-cyan-500",
              route: "/cursos/universitario"
            },
            {
              icon: Target,
              title: "Vestibular",
              desc: "Prepare-se para entrar na universidade",
              color: "from-purple-500 to-pink-500",
              route: "/cursos/vestibular"
            },
            {
              icon: BookOpen,
              title: "ENEM",
              desc: "Questões estilo ENEM",
              color: "from-orange-500 to-red-500",
              route: "/cursos/enem"
            },
            {
              icon: Trophy,
              title: "Matéria Específica",
              desc: "Foco total em uma disciplina",
              color: "from-green-500 to-emerald-500",
              route: "/cursos/materia-especifica"
            }
          ].map((category, i) => (
            <Card 
              key={i} 
              className="p-6 hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => router.push(category.route)}
            >
              <div className={`bg-gradient-to-br ${category.color} p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {category.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {category.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Gamification Preview */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Acompanhe Sua Evolução
            </h2>
            <p className="text-gray-600">
              Sistema completo de gamificação e estatísticas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-100 p-3 rounded-xl">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">1.250</div>
                  <div className="text-sm text-gray-600">Pontos XP</div>
                </div>
              </div>
              <Progress value={65} className="h-2" />
              <div className="text-xs text-gray-500 mt-2">Nível 12 • 350 XP para próximo</div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">87%</div>
                  <div className="text-sm text-gray-600">Taxa de Acerto</div>
                </div>
              </div>
              <div className="text-xs text-green-600 font-medium">
                +12% esta semana 📈
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">#23</div>
                  <div className="text-sm text-gray-600">Ranking Geral</div>
                </div>
              </div>
              <div className="text-xs text-purple-600 font-medium">
                Top 5% dos estudantes 🔥
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing/Paywall Modal */}
      {showPaywall && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full p-8 relative">
            <button 
              onClick={() => setShowPaywall(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <div className="text-center mb-8">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Continue Estudando com IA
              </h2>
              <p className="text-gray-600">
                Você usou seus 3 testes grátis. Desbloqueie acesso ilimitado!
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 mb-6">
              <div className="flex items-baseline justify-center gap-2 mb-6">
                <span className="text-5xl font-bold text-gray-900">R$ 29,90</span>
                <span className="text-gray-600">/mês</span>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  "Simulados ilimitados com IA",
                  "Upload ilimitado de materiais",
                  "Análise avançada de desempenho",
                  "Questões adaptativas personalizadas",
                  "Explicações detalhadas com IA",
                  "Acesso a todos os cursos",
                  "Ranking e competições",
                  "Suporte prioritário"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="bg-green-500 p-1 rounded-full">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg"
                onClick={() => router.push("/planos")}
              >
                <Crown className="w-5 h-5 mr-2" />
                Assinar Agora
              </Button>

              <div className="text-center mt-4 space-y-1">
                <div className="text-sm text-gray-600">
                  🎁 <strong>7 dias grátis</strong> para testar
                </div>
                <div className="text-xs text-gray-500">
                  Cancele quando quiser • Sem compromisso
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                Pagamento seguro
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                Garantia 30 dias
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Social Proof */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Aprovados com SimulaIA
            </h2>
            <p className="text-gray-600">
              Veja o que nossos estudantes estão dizendo
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Maria Silva",
                course: "Medicina UFMG",
                text: "A IA criou simulados perfeitos baseados nas minhas apostilas. Passei de primeira!",
                rating: 5
              },
              {
                name: "João Pedro",
                course: "Engenharia USP",
                text: "Os simulados personalizados me ajudaram a focar exatamente no que eu precisava.",
                rating: 5
              },
              {
                name: "Ana Costa",
                course: "Direito PUC",
                text: "Melhor investimento que fiz. A gamificação me manteve motivada todos os dias!",
                rating: 5
              }
            ].map((testimonial, i) => (
              <Card key={i} className="p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 text-sm">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.course}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-purple-600 to-blue-600 text-white text-center border-0">
          <h2 className="text-4xl font-bold mb-4">
            Comece a Estudar com IA Hoje
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de estudantes que já estão aprovando com simulados personalizados por Inteligência Artificial
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8"
              onClick={() => router.push("/simulado/ia")}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Testar 3 Simulados Grátis
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 text-lg px-8"
              onClick={() => router.push("/planos")}
            >
              Ver Planos
            </Button>
          </div>
          <div className="mt-6 text-sm text-purple-200">
            ✨ Sem cartão de crédito • 3 testes com IA grátis
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2024 SimulaIA. Todos os direitos reservados.</p>
          <p className="mt-2">Feito com 💜 para estudantes brasileiros</p>
        </div>
      </footer>
    </div>
  );
}
