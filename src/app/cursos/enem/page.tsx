"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain,
  ArrowLeft,
  BookOpen,
  Target,
  Sparkles
} from "lucide-react";

export default function ENEMPage() {
  const router = useRouter();

  const areas = [
    {
      id: "linguagens",
      nome: "Linguagens, Códigos e suas Tecnologias",
      icon: "📚",
      desc: "Português, Literatura, Inglês/Espanhol, Artes, Ed. Física",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "humanas",
      nome: "Ciências Humanas e suas Tecnologias",
      icon: "🌍",
      desc: "História, Geografia, Filosofia, Sociologia",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "natureza",
      nome: "Ciências da Natureza e suas Tecnologias",
      icon: "🔬",
      desc: "Física, Química, Biologia",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "matematica",
      nome: "Matemática e suas Tecnologias",
      icon: "🔢",
      desc: "Matemática e suas aplicações",
      color: "from-orange-500 to-red-500"
    },
    {
      id: "redacao",
      nome: "Redação",
      icon: "✍️",
      desc: "Texto dissertativo-argumentativo",
      color: "from-indigo-500 to-purple-500"
    }
  ];

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
            onClick={() => router.push("/cursos")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <Badge className="bg-orange-100 text-orange-700 border-orange-200">
            <BookOpen className="w-3 h-3 mr-1" />
            ENEM
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Simulados ENEM
          </h1>
          
          <p className="text-lg text-gray-600">
            Questões no estilo ENEM com correção TRI e análise de desempenho
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <Card 
            className="p-8 bg-gradient-to-br from-purple-600 to-blue-600 text-white border-0 cursor-pointer hover:shadow-2xl transition-all"
            onClick={() => router.push("/simulado/ia")}
          >
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-4 rounded-2xl">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <Badge className="bg-white/20 text-white border-white/30 mb-3">
                  Exclusivo
                </Badge>
                <h2 className="text-2xl font-bold mb-2">
                  Simulado Personalizado com IA
                </h2>
                <p className="text-purple-100 mb-4">
                  Envie seus materiais e a IA cria questões no estilo ENEM focadas no que você precisa
                </p>
                <Button 
                  className="bg-white text-purple-600 hover:bg-purple-50"
                >
                  Criar com IA
                </Button>
              </div>
            </div>
          </Card>

          <Card 
            className="p-8 cursor-pointer hover:shadow-2xl transition-all"
            onClick={() => router.push("/simulado/pronto/enem-completo")}
          >
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-4 rounded-2xl">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <Badge className="bg-orange-100 text-orange-700 border-orange-200 mb-3">
                  Completo
                </Badge>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Simulado ENEM Completo
                </h2>
                <p className="text-gray-600 mb-4">
                  180 questões + redação, igual ao ENEM oficial
                </p>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                  Fazer Simulado
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Áreas do Conhecimento */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Escolha a Área do Conhecimento
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {areas.map((area) => (
              <Card 
                key={area.id}
                className="p-6 hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => router.push(`/materia/enem-${area.id}/simulados`)}
              >
                <div className="flex items-start gap-4">
                  <div className={`bg-gradient-to-br ${area.color} p-4 rounded-xl group-hover:scale-110 transition-transform`}>
                    <span className="text-3xl">{area.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {area.nome}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {area.desc}
                    </p>
                  </div>
                </div>
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
