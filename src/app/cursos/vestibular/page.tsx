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
  Target,
  Sparkles
} from "lucide-react";

export default function VestibularPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const universidades = [
    { id: "usp", nome: "USP", fullName: "Universidade de São Paulo", icon: "🎓", popular: true },
    { id: "unicamp", nome: "UNICAMP", fullName: "Universidade Estadual de Campinas", icon: "🎓", popular: true },
    { id: "ufrj", nome: "UFRJ", fullName: "Universidade Federal do Rio de Janeiro", icon: "🎓", popular: true },
    { id: "ufmg", nome: "UFMG", fullName: "Universidade Federal de Minas Gerais", icon: "🎓" },
    { id: "ufrgs", nome: "UFRGS", fullName: "Universidade Federal do Rio Grande do Sul", icon: "🎓" },
    { id: "ufsc", nome: "UFSC", fullName: "Universidade Federal de Santa Catarina", icon: "🎓" },
    { id: "ufpr", nome: "UFPR", fullName: "Universidade Federal do Paraná", icon: "🎓" },
    { id: "ufpe", nome: "UFPE", fullName: "Universidade Federal de Pernambuco", icon: "🎓" },
    { id: "ufba", nome: "UFBA", fullName: "Universidade Federal da Bahia", icon: "🎓" },
    { id: "unb", nome: "UnB", fullName: "Universidade de Brasília", icon: "🎓" },
    { id: "ita", nome: "ITA", fullName: "Instituto Tecnológico de Aeronáutica", icon: "✈️", popular: true },
    { id: "ime", nome: "IME", fullName: "Instituto Militar de Engenharia", icon: "⚔️" }
  ];

  const filteredUniversidades = universidades.filter(uni =>
    uni.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.fullName.toLowerCase().includes(searchTerm.toLowerCase())
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
          <Badge className="bg-purple-100 text-purple-700 border-purple-200">
            <Target className="w-3 h-3 mr-1" />
            Vestibular
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Escolha a Universidade
          </h1>
          
          <p className="text-lg text-gray-600">
            Simulados específicos para o vestibular da universidade que você deseja
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar universidade..."
            className="pl-12 h-12 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Universidades Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Populares */}
          {!searchTerm && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Mais Procuradas
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {universidades.filter(u => u.popular).map((uni) => (
                  <Card 
                    key={uni.id}
                    className="p-6 hover:shadow-xl transition-all cursor-pointer group"
                    onClick={() => router.push(`/materia/vestibular-${uni.id}/simulados`)}
                  >
                    <div className="text-4xl mb-3">{uni.icon}</div>
                    <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
                      {uni.nome}
                    </h3>
                    <p className="text-xs text-gray-600">{uni.fullName}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Todas as Universidades */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {searchTerm ? "Resultados da Busca" : "Todas as Universidades"}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUniversidades.map((uni) => (
                <Card 
                  key={uni.id}
                  className="p-6 hover:shadow-xl transition-all cursor-pointer group"
                  onClick={() => router.push(`/materia/vestibular-${uni.id}/simulados`)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{uni.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {uni.nome}
                      </h3>
                      <p className="text-xs text-gray-600">{uni.fullName}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredUniversidades.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhuma universidade encontrada</p>
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
