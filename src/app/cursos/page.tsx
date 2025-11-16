"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Brain, 
  Target,
  BookOpen, 
  Trophy,
  ArrowLeft,
  Sparkles
} from "lucide-react";

export default function CursosPage() {
  const router = useRouter();

  const categories = [
    {
      icon: GraduationCap,
      title: "Universitário",
      desc: "Simulados por curso e matéria da sua faculdade",
      color: "from-blue-500 to-cyan-500",
      route: "/cursos/universitario",
      badge: "Mais popular"
    },
    {
      icon: Target,
      title: "Vestibular",
      desc: "Prepare-se para entrar na universidade dos seus sonhos",
      color: "from-purple-500 to-pink-500",
      route: "/cursos/vestibular"
    },
    {
      icon: BookOpen,
      title: "ENEM",
      desc: "Questões no estilo ENEM com correção TRI",
      color: "from-orange-500 to-red-500",
      route: "/cursos/enem",
      badge: "Novo"
    },
    {
      icon: Trophy,
      title: "Matéria Específica",
      desc: "Foco total em uma disciplina que você precisa dominar",
      color: "from-green-500 to-emerald-500",
      route: "/cursos/materia-especifica"
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
            onClick={() => router.push("/")}
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
            <Sparkles className="w-3 h-3 mr-1" />
            Escolha seu caminho
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Qual é o seu objetivo?
          </h1>
          
          <p className="text-lg text-gray-600">
            Selecione a categoria que melhor se encaixa no seu perfil de estudante
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-8 pb-16">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {categories.map((category, i) => (
            <Card 
              key={i} 
              className="p-8 hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden"
              onClick={() => router.push(category.route)}
            >
              {category.badge && (
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
                  {category.badge}
                </Badge>
              )}
              
              <div className={`bg-gradient-to-br ${category.color} p-5 rounded-2xl mb-6 group-hover:scale-110 transition-transform inline-block`}>
                <category.icon className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {category.title}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {category.desc}
              </p>

              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Começar Agora
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2024 SimulaIA. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
