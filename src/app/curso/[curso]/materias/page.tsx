"use client";

import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain,
  ArrowLeft,
  BookOpen,
  Trophy,
  Clock,
  Target
} from "lucide-react";

export default function MateriasPage() {
  const router = useRouter();
  const params = useParams();
  const cursoId = params.curso as string;

  // Dados mockados por curso
  const cursosData: Record<string, { nome: string; icon: string; materias: any[] }> = {
    "medicina": {
      nome: "Medicina",
      icon: "🩺",
      materias: [
        { id: "anatomia", nome: "Anatomia Humana", progresso: 75, simulados: 12 },
        { id: "fisiologia", nome: "Fisiologia", progresso: 60, simulados: 8 },
        { id: "bioquimica", nome: "Bioquímica", progresso: 45, simulados: 6 },
        { id: "farmacologia", nome: "Farmacologia", progresso: 30, simulados: 4 }
      ]
    },
    "direito": {
      nome: "Direito",
      icon: "⚖️",
      materias: [
        { id: "constitucional", nome: "Direito Constitucional", progresso: 80, simulados: 15 },
        { id: "civil", nome: "Direito Civil", progresso: 65, simulados: 10 },
        { id: "penal", nome: "Direito Penal", progresso: 50, simulados: 8 },
        { id: "administrativo", nome: "Direito Administrativo", progresso: 40, simulados: 5 }
      ]
    },
    "engenharia-civil": {
      nome: "Engenharia Civil",
      icon: "🏗️",
      materias: [
        { id: "calculo1", nome: "Cálculo I", progresso: 70, simulados: 14 },
        { id: "fisica1", nome: "Física I", progresso: 55, simulados: 9 },
        { id: "resistencia", nome: "Resistência dos Materiais", progresso: 45, simulados: 7 },
        { id: "estruturas", nome: "Estruturas", progresso: 35, simulados: 5 }
      ]
    },
    "ciencia-computacao": {
      nome: "Ciência da Computação",
      icon: "💻",
      materias: [
        { id: "algoritmos", nome: "Algoritmos e Estruturas de Dados", progresso: 85, simulados: 18 },
        { id: "poo", nome: "Programação Orientada a Objetos", progresso: 70, simulados: 12 },
        { id: "banco-dados", nome: "Banco de Dados", progresso: 60, simulados: 10 },
        { id: "redes", nome: "Redes de Computadores", progresso: 45, simulados: 7 }
      ]
    }
  };

  const cursoData = cursosData[cursoId] || {
    nome: "Curso",
    icon: "📚",
    materias: [
      { id: "materia1", nome: "Matéria 1", progresso: 50, simulados: 5 },
      { id: "materia2", nome: "Matéria 2", progresso: 30, simulados: 3 },
      { id: "materia3", nome: "Matéria 3", progresso: 70, simulados: 8 }
    ]
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
            onClick={() => router.push("/cursos/universitario")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-6xl">{cursoData.icon}</div>
            <div>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-2">
                Universitário
              </Badge>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {cursoData.nome}
              </h1>
              <p className="text-gray-600 mt-2">
                Escolha a matéria que deseja estudar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Matérias Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {cursoData.materias.map((materia) => (
              <Card 
                key={materia.id}
                className="p-6 hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => router.push(`/materia/${materia.id}/simulados`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {materia.nome}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {materia.simulados} simulados
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        {materia.progresso}% completo
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progresso</span>
                    <span className="font-semibold text-purple-600">{materia.progresso}%</span>
                  </div>
                  <Progress value={materia.progresso} className="h-2" />
                </div>

                <Button 
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Ver Simulados
                </Button>
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
