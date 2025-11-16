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
  Trophy,
  Sparkles
} from "lucide-react";

export default function MateriaEspecificaPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const materias = [
    // Exatas
    { id: "calculo1", nome: "Cálculo I", icon: "📐", categoria: "Exatas", popular: true },
    { id: "calculo2", nome: "Cálculo II", icon: "📐", categoria: "Exatas" },
    { id: "algebra-linear", nome: "Álgebra Linear", icon: "🔢", categoria: "Exatas", popular: true },
    { id: "fisica1", nome: "Física I", icon: "⚛️", categoria: "Exatas" },
    { id: "fisica2", nome: "Física II", icon: "⚛️", categoria: "Exatas" },
    { id: "quimica-geral", nome: "Química Geral", icon: "🧪", categoria: "Exatas" },
    { id: "quimica-organica", nome: "Química Orgânica", icon: "🧪", categoria: "Exatas" },
    { id: "estatistica", nome: "Estatística", icon: "📊", categoria: "Exatas" },
    
    // Humanas
    { id: "direito-constitucional", nome: "Direito Constitucional", icon: "⚖️", categoria: "Humanas", popular: true },
    { id: "direito-civil", nome: "Direito Civil", icon: "⚖️", categoria: "Humanas" },
    { id: "direito-penal", nome: "Direito Penal", icon: "⚖️", categoria: "Humanas" },
    { id: "filosofia", nome: "Filosofia", icon: "🤔", categoria: "Humanas" },
    { id: "sociologia", nome: "Sociologia", icon: "👥", categoria: "Humanas" },
    { id: "historia-brasil", nome: "História do Brasil", icon: "📜", categoria: "Humanas" },
    
    // Biológicas
    { id: "anatomia", nome: "Anatomia Humana", icon: "🦴", categoria: "Biológicas", popular: true },
    { id: "fisiologia", nome: "Fisiologia", icon: "❤️", categoria: "Biológicas" },
    { id: "bioquimica", nome: "Bioquímica", icon: "🧬", categoria: "Biológicas" },
    { id: "farmacologia", nome: "Farmacologia", icon: "💊", categoria: "Biológicas" },
    
    // Tecnologia
    { id: "algoritmos", nome: "Algoritmos", icon: "💻", categoria: "Tecnologia", popular: true },
    { id: "estrutura-dados", nome: "Estrutura de Dados", icon: "💻", categoria: "Tecnologia" },
    { id: "banco-dados", nome: "Banco de Dados", icon: "🗄️", categoria: "Tecnologia" },
    { id: "redes", nome: "Redes de Computadores", icon: "🌐", categoria: "Tecnologia" }
  ];

  const filteredMaterias = materias.filter(materia =>
    materia.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    materia.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categorias = Array.from(new Set(materias.map(m => m.categoria)));

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
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <Trophy className="w-3 h-3 mr-1" />
            Matéria Específica
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Escolha a Matéria
          </h1>
          
          <p className="text-lg text-gray-600">
            Foco total em uma disciplina específica que você precisa dominar
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar matéria..."
            className="pl-12 h-12 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Matérias Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Populares */}
          {!searchTerm && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Mais Estudadas
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {materias.filter(m => m.popular).map((materia) => (
                  <Card 
                    key={materia.id}
                    className="p-6 hover:shadow-xl transition-all cursor-pointer group"
                    onClick={() => router.push(`/materia/${materia.id}/simulados`)}
                  >
                    <div className="text-4xl mb-3">{materia.icon}</div>
                    <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
                      {materia.nome}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {materia.categoria}
                    </Badge>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Por Categoria */}
          {!searchTerm ? (
            categorias.map((categoria) => (
              <div key={categoria} className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {categoria}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {materias.filter(m => m.categoria === categoria).map((materia) => (
                    <Card 
                      key={materia.id}
                      className="p-6 hover:shadow-xl transition-all cursor-pointer group"
                      onClick={() => router.push(`/materia/${materia.id}/simulados`)}
                    >
                      <div className="text-4xl mb-3">{materia.icon}</div>
                      <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {materia.nome}
                      </h3>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Resultados da Busca
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredMaterias.map((materia) => (
                  <Card 
                    key={materia.id}
                    className="p-6 hover:shadow-xl transition-all cursor-pointer group"
                    onClick={() => router.push(`/materia/${materia.id}/simulados`)}
                  >
                    <div className="text-4xl mb-3">{materia.icon}</div>
                    <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
                      {materia.nome}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {materia.categoria}
                    </Badge>
                  </Card>
                ))}
              </div>

              {filteredMaterias.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Nenhuma matéria encontrada</p>
                </div>
              )}
            </div>
          )}
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
