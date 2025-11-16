"use client";

import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain,
  ArrowLeft,
  Sparkles,
  FileText,
  Clock,
  Trophy,
  TrendingUp,
  Target,
  Zap
} from "lucide-react";

export default function SimuladosPage() {
  const router = useRouter();
  const params = useParams();
  const materiaId = params.materia as string;

  const materiasData: Record<string, { nome: string; curso: string }> = {
    "anatomia": { nome: "Anatomia Humana", curso: "Medicina" },
    "constitucional": { nome: "Direito Constitucional", curso: "Direito" },
    "calculo1": { nome: "Cálculo I", curso: "Engenharia Civil" },
    "algoritmos": { nome: "Algoritmos e Estruturas de Dados", curso: "Ciência da Computação" }
  };

  const materiaData = materiasData[materiaId] || { nome: "Matéria", curso: "Curso" };

  const simuladosProntos = [
    { id: 1, titulo: "Simulado Básico", questoes: 10, tempo: 30, dificuldade: "Fácil" },
    { id: 2, titulo: "Simulado Intermediário", questoes: 15, tempo: 45, dificuldade: "Médio" },
    { id: 3, titulo: "Simulado Avançado", questoes: 20, tempo: 60, dificuldade: "Difícil" },
    { id: 4, titulo: "Simulado Completo", questoes: 30, tempo: 90, dificuldade: "Completo" }
  ];

  const historico = [
    { data: "15/01/2024", nota: 8.5, acertos: 17, total: 20 },
    { data: "12/01/2024", nota: 7.0, acertos: 14, total: 20 },
    { data: "08/01/2024", nota: 9.0, acertos: 18, total: 20 }
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
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-3">
            {materiaData.curso}
          </Badge>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            {materiaData.nome}
          </h1>
          <p className="text-gray-600">
            Escolha como deseja estudar
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Simulado com IA */}
            <Card className="p-8 bg-gradient-to-br from-purple-600 to-blue-600 text-white border-0">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-4 rounded-2xl">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <Badge className="bg-white/20 text-white border-white/30 mb-3">
                    Exclusivo
                  </Badge>
                  <h2 className="text-3xl font-bold mb-3">
                    Simulado com IA
                  </h2>
                  <p className="text-purple-100 mb-6">
                    Envie seus materiais e a IA cria um simulado personalizado focado exatamente no que você precisa estudar.
                  </p>
                  <Button 
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-purple-50"
                    onClick={() => router.push("/simulado/ia")}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Criar Simulado com IA
                  </Button>
                </div>
              </div>
            </Card>

            {/* Simulados Prontos */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-purple-600" />
                Simulados Prontos
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {simuladosProntos.map((simulado) => (
                  <Card 
                    key={simulado.id}
                    className="p-6 hover:shadow-xl transition-all cursor-pointer group"
                    onClick={() => router.push(`/simulado/pronto/${simulado.id}`)}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {simulado.titulo}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        {simulado.questoes} questões
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {simulado.tempo} minutos
                      </div>
                      <Badge variant="secondary" className="mt-2">
                        {simulado.dificuldade}
                      </Badge>
                    </div>
                    <Button className="w-full">
                      Iniciar Simulado
                    </Button>
                  </Card>
                ))}
              </div>
            </div>

            {/* Histórico */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-purple-600" />
                Histórico de Simulados
              </h2>
              <Card className="divide-y">
                {historico.map((item, i) => (
                  <div key={i} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">
                          {item.acertos}/{item.total} questões corretas
                        </div>
                        <div className="text-sm text-gray-600">{item.data}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">
                          {item.nota}
                        </div>
                        <div className="text-xs text-gray-500">nota</div>
                      </div>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progresso */}
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Seu Progresso
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Domínio da Matéria</span>
                    <span className="font-semibold text-purple-600">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">24</div>
                    <div className="text-xs text-gray-600">Simulados feitos</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">8.2</div>
                    <div className="text-xs text-gray-600">Média geral</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Estatísticas */}
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Estatísticas
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Taxa de acerto</span>
                  <span className="font-semibold text-green-600">82%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sequência atual</span>
                  <span className="font-semibold text-orange-600">7 dias 🔥</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ranking</span>
                  <span className="font-semibold text-purple-600">#23</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2024 SimulaIA. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
