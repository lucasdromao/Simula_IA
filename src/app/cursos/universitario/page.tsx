"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Brain,
  ArrowLeft,
  Search,
  GraduationCap,
  Sparkles
} from "lucide-react";

export default function UniversitarioPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const cursos = [
    { id: "medicina", nome: "Medicina", icon: "🩺", popular: true },
    { id: "direito", nome: "Direito", icon: "⚖️", popular: true },
    { id: "engenharia-civil", nome: "Engenharia Civil", icon: "🏗️", popular: true },
    { id: "administracao", nome: "Administração", icon: "💼" },
    { id: "psicologia", nome: "Psicologia", icon: "🧠" },
    { id: "enfermagem", nome: "Enfermagem", icon: "💉" },
    { id: "arquitetura", nome: "Arquitetura", icon: "📐" },
    { id: "ciencia-computacao", nome: "Ciência da Computação", icon: "💻", popular: true },
    { id: "engenharia-eletrica", nome: "Engenharia Elétrica", icon: "⚡" },
    { id: "farmacia", nome: "Farmácia", icon: "💊" },
    { id: "odontologia", nome: "Odontologia", icon: "🦷" },
    { id: "fisioterapia", nome: "Fisioterapia", icon: "🏃" },
    { id: "contabilidade", nome: "Ciências Contábeis", icon: "📊" },
    { id: "economia", nome: "Economia", icon: "📈" },
    { id: "pedagogia", nome: "Pedagogia", icon: "📚" },
    { id: "veterinaria", nome: "Medicina Veterinária", icon: "🐾" }
  ];

  const filteredCursos = cursos.filter(curso =>
    curso.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
            <GraduationCap className="w-3 h-3 mr-1" />
            Universitário
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Escolha seu Curso
          </h1>
          
          <p className="text-lg text-gray-600">
            Selecione o curso que você está cursando para ver as matérias disponíveis
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar curso..."
            className="pl-12 h-12 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Cursos Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Populares */}
          {!searchTerm && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Mais Populares
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cursos.filter(c => c.popular).map((curso) => (
                  <Card 
                    key={curso.id}
                    className="p-6 hover:shadow-xl transition-all cursor-pointer group"
                    onClick={() => router.push(`/curso/${curso.id}/materias`)}
                  >
                    <div className="text-4xl mb-3">{curso.icon}</div>
                    <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {curso.nome}
                    </h3>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Todos os Cursos */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {searchTerm ? "Resultados da Busca" : "Todos os Cursos"}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredCursos.map((curso) => (
                <Card 
                  key={curso.id}
                  className="p-6 hover:shadow-xl transition-all cursor-pointer group"
                  onClick={() => router.push(`/curso/${curso.id}/materias`)}
                >
                  <div className="text-4xl mb-3">{curso.icon}</div>
                  <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {curso.nome}
                  </h3>
                </Card>
              ))}
            </div>

            {filteredCursos.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhum curso encontrado</p>
              </div>
            )}
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
