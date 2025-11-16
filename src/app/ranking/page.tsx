"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain,
  ArrowLeft,
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Target,
  Zap
} from "lucide-react";

interface RankingStudent {
  id: number;
  name: string;
  course: string;
  university: string;
  score: number;
  accuracy: number;
  simuladosCompletos: number;
  avatar: string;
}

export default function RankingPage() {
  const router = useRouter();
  const [ranking, setRanking] = useState<RankingStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'course' | 'university'>('all');

  useEffect(() => {
    fetchRanking();
  }, [filter]);

  const fetchRanking = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ranking');
      const data = await response.json();
      setRanking(data.ranking);
    } catch (error) {
      console.error('Erro ao buscar ranking:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="w-8 h-8 text-yellow-500" />;
      case 1:
        return <Medal className="w-8 h-8 text-gray-400" />;
      case 2:
        return <Award className="w-8 h-8 text-orange-600" />;
      default:
        return null;
    }
  };

  const getMedalBg = (position: number) => {
    switch (position) {
      case 0:
        return "bg-gradient-to-br from-yellow-400 to-yellow-600";
      case 1:
        return "bg-gradient-to-br from-gray-300 to-gray-500";
      case 2:
        return "bg-gradient-to-br from-orange-400 to-orange-600";
      default:
        return "bg-gradient-to-br from-purple-600 to-blue-600";
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
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
            <Trophy className="w-3 h-3 mr-1" />
            Ranking Geral
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Ranking de Alunos
          </h1>
          
          <p className="text-lg text-gray-600">
            Veja como você se compara com outros estudantes
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 justify-center flex-wrap">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}
            >
              Geral
            </Button>
            <Button
              variant={filter === 'course' ? 'default' : 'outline'}
              onClick={() => setFilter('course')}
              className={filter === 'course' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}
            >
              Meu Curso
            </Button>
            <Button
              variant={filter === 'university' ? 'default' : 'outline'}
              onClick={() => setFilter('university')}
              className={filter === 'university' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : ''}
            >
              Minha Universidade
            </Button>
          </div>
        </div>
      </section>

      {/* Top 3 Podium */}
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          {!loading && ranking.length >= 3 && (
            <div className="grid grid-cols-3 gap-4 mb-8">
              {/* 2nd Place */}
              <Card className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {getMedalIcon(1)}
                </div>
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold text-gray-700">
                  {ranking[1].avatar}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{ranking[1].name}</h3>
                <p className="text-sm text-gray-600 mb-2">{ranking[1].course}</p>
                <Badge variant="secondary">{ranking[1].university}</Badge>
                <div className="mt-4 text-2xl font-bold text-gray-900">
                  {ranking[1].score.toLocaleString()}
                </div>
                <p className="text-xs text-gray-600">pontos</p>
              </Card>

              {/* 1st Place */}
              <Card className="p-6 text-center border-2 border-yellow-400 relative -mt-4">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-0">
                    👑 Campeão
                  </Badge>
                </div>
                <div className="flex justify-center mb-4 mt-2">
                  {getMedalIcon(0)}
                </div>
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold text-white">
                  {ranking[0].avatar}
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-lg">{ranking[0].name}</h3>
                <p className="text-sm text-gray-600 mb-2">{ranking[0].course}</p>
                <Badge variant="secondary">{ranking[0].university}</Badge>
                <div className="mt-4 text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent">
                  {ranking[0].score.toLocaleString()}
                </div>
                <p className="text-xs text-gray-600">pontos</p>
              </Card>

              {/* 3rd Place */}
              <Card className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {getMedalIcon(2)}
                </div>
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold text-orange-700">
                  {ranking[2].avatar}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{ranking[2].name}</h3>
                <p className="text-sm text-gray-600 mb-2">{ranking[2].course}</p>
                <Badge variant="secondary">{ranking[2].university}</Badge>
                <div className="mt-4 text-2xl font-bold text-gray-900">
                  {ranking[2].score.toLocaleString()}
                </div>
                <p className="text-xs text-gray-600">pontos</p>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Full Ranking */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ranking Completo</h2>
            
            <div className="space-y-3">
              {loading ? (
                <div className="text-center py-8 text-gray-600">Carregando...</div>
              ) : (
                ranking.map((student, index) => (
                  <Card key={student.id} className={`p-4 ${index < 3 ? 'border-2 border-purple-200' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${getMedalBg(index)}`}>
                          {index < 3 ? (
                            <div className="text-2xl">{index + 1}</div>
                          ) : (
                            <div className="text-lg">{index + 1}</div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="font-bold text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-600">
                            {student.course} • {student.university}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {student.score.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-600">pontos</div>
                        </div>

                        <div className="text-center">
                          <div className="flex items-center gap-1 text-green-600">
                            <Target className="w-4 h-4" />
                            <span className="font-bold">{student.accuracy}%</span>
                          </div>
                          <div className="text-xs text-gray-600">acertos</div>
                        </div>

                        <div className="text-center">
                          <div className="flex items-center gap-1 text-blue-600">
                            <Zap className="w-4 h-4" />
                            <span className="font-bold">{student.simuladosCompletos}</span>
                          </div>
                          <div className="text-xs text-gray-600">simulados</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </Card>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="p-6 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-3 text-purple-600" />
              <h3 className="font-bold text-gray-900 mb-1">Evolução</h3>
              <p className="text-sm text-gray-600">
                Acompanhe seu progresso no ranking
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-3 text-yellow-600" />
              <h3 className="font-bold text-gray-900 mb-1">Competição</h3>
              <p className="text-sm text-gray-600">
                Desafie outros estudantes
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Award className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <h3 className="font-bold text-gray-900 mb-1">Conquistas</h3>
              <p className="text-sm text-gray-600">
                Ganhe badges e prêmios
              </p>
            </Card>
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
