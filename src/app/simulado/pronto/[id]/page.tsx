"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain,
  ArrowLeft,
  Clock,
  Target,
  CheckCircle2,
  XCircle,
  Flag,
  ChevronRight,
  BookOpen,
  AlertCircle
} from "lucide-react";

interface Question {
  id: number;
  enunciado: string;
  alternativas: Array<{ id: string; texto: string }>;
  correta: string;
  explicacao?: string;
}

export default function SimuladoProntoPage() {
  const router = useRouter();
  const params = useParams();
  const simuladoId = params.id as string;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showGabarito, setShowGabarito] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutos em segundos
  const [questoes, setQuestoes] = useState<Question[]>([]);

  useEffect(() => {
    // Carregar questões do localStorage se for simulado gerado por IA
    if (simuladoId === 'ia-generated') {
      const savedQuestions = localStorage.getItem('simulado-ia-questions');
      if (savedQuestions) {
        setQuestoes(JSON.parse(savedQuestions));
      }
    } else {
      // Questões padrão para simulados prontos
      setQuestoes([
        {
          id: 1,
          enunciado: "Qual é a principal função do sistema cardiovascular?",
          alternativas: [
            { id: "a", texto: "Transportar oxigênio e nutrientes" },
            { id: "b", texto: "Produzir hormônios" },
            { id: "c", texto: "Filtrar toxinas" },
            { id: "d", texto: "Regular temperatura" }
          ],
          correta: "a",
          explicacao: "O sistema cardiovascular é responsável pelo transporte de oxigênio, nutrientes, hormônios e outros elementos essenciais para todas as células do corpo através do sangue."
        },
        {
          id: 2,
          enunciado: "O que são artérias?",
          alternativas: [
            { id: "a", texto: "Vasos que levam sangue ao coração" },
            { id: "b", texto: "Vasos que levam sangue do coração" },
            { id: "c", texto: "Células do sangue" },
            { id: "d", texto: "Válvulas cardíacas" }
          ],
          correta: "b",
          explicacao: "Artérias são vasos sanguíneos que transportam sangue do coração para os tecidos do corpo. Possuem paredes espessas e elásticas para suportar a alta pressão do sangue bombeado pelo coração."
        },
        {
          id: 3,
          enunciado: "Quantas câmaras possui o coração humano?",
          alternativas: [
            { id: "a", texto: "2 câmaras" },
            { id: "b", texto: "3 câmaras" },
            { id: "c", texto: "4 câmaras" },
            { id: "d", texto: "5 câmaras" }
          ],
          correta: "c",
          explicacao: "O coração humano possui 4 câmaras: dois átrios (direito e esquerdo) e dois ventrículos (direito e esquerdo). Esta estrutura permite a separação eficiente do sangue oxigenado e desoxigenado."
        }
      ]);
    }

    // Timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [simuladoId]);

  const handleAnswer = (questionId: number, answerId: string) => {
    setAnswers({ ...answers, [questionId]: answerId });
  };

  const handleNext = () => {
    if (currentQuestion < questoes.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinish = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    questoes.forEach((q) => {
      if (answers[q.id] === q.correta) correct++;
    });
    return { correct, total: questoes.length, percentage: (correct / questoes.length) * 100 };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (questoes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-orange-600" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Carregando simulado...</h2>
        </Card>
      </div>
    );
  }

  // Tela de Gabarito
  if (showGabarito) {
    const score = calculateScore();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
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
              onClick={() => setShowGabarito(false)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar aos Resultados
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Gabarito Completo</h1>
              <p className="text-gray-600">
                Você acertou {score.correct} de {score.total} questões ({score.percentage.toFixed(0)}%)
              </p>
            </div>

            <div className="space-y-6">
              {questoes.map((q, index) => {
                const userAnswer = answers[q.id];
                const isCorrect = userAnswer === q.correta;
                
                return (
                  <Card key={q.id} className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Badge className={isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                        Questão {index + 1}
                      </Badge>
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      {q.enunciado}
                    </h3>

                    <div className="space-y-2 mb-4">
                      {q.alternativas.map((alt) => {
                        const isUserAnswer = userAnswer === alt.id;
                        const isCorrectAnswer = q.correta === alt.id;
                        
                        return (
                          <div
                            key={alt.id}
                            className={`p-3 rounded-lg border-2 ${
                              isCorrectAnswer
                                ? 'border-green-500 bg-green-50'
                                : isUserAnswer
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{alt.id.toUpperCase()})</span>
                              <span>{alt.texto}</span>
                              {isCorrectAnswer && (
                                <CheckCircle2 className="w-4 h-4 text-green-600 ml-auto" />
                              )}
                              {isUserAnswer && !isCorrectAnswer && (
                                <XCircle className="w-4 h-4 text-red-600 ml-auto" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {q.explicacao && (
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                        <div className="flex items-start gap-2">
                          <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-blue-900 mb-1">Explicação:</div>
                            <p className="text-blue-800 text-sm">{q.explicacao}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>

            <div className="mt-8 flex gap-4">
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => setShowGabarito(false)}
              >
                Voltar aos Resultados
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600"
                onClick={() => router.back()}
              >
                Fazer Outro Simulado
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de Resultados
  if (showResults) {
    const score = calculateScore();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
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
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 text-center">
              <div className="mb-6">
                {score.percentage >= 70 ? (
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                ) : (
                  <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-10 h-10 text-orange-600" />
                  </div>
                )}
                
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Simulado Concluído!
                </h1>
                <p className="text-gray-600">
                  Confira seu desempenho
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 mb-6">
                <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {score.percentage.toFixed(0)}%
                </div>
                <div className="text-gray-600 mb-4">
                  {score.correct} de {score.total} questões corretas
                </div>
                <Progress value={score.percentage} className="h-3" />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <Card className="p-4">
                  <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold text-gray-900">{score.correct}</div>
                  <div className="text-xs text-gray-600">Acertos</div>
                </Card>
                <Card className="p-4">
                  <XCircle className="w-6 h-6 mx-auto mb-2 text-red-600" />
                  <div className="text-2xl font-bold text-gray-900">{score.total - score.correct}</div>
                  <div className="text-xs text-gray-600">Erros</div>
                </Card>
                <Card className="p-4">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900">{formatTime(1800 - timeLeft)}</div>
                  <div className="text-xs text-gray-600">Tempo</div>
                </Card>
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowGabarito(true)}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Ver Gabarito
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600"
                  onClick={() => router.back()}
                >
                  Fazer Outro Simulado
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Tela do Simulado
  const currentQ = questoes[currentQuestion];
  const progressPercentage = ((currentQuestion + 1) / questoes.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
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
                <Clock className="w-3 h-3" />
                {formatTime(timeLeft)}
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.back()}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                Questão {currentQuestion + 1} de {questoes.length}
              </span>
              <span className="font-semibold text-purple-600">
                {progressPercentage.toFixed(0)}% completo
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </header>

      {/* Question */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8">
            <div className="mb-6">
              <Badge className="mb-4">Questão {currentQ.id}</Badge>
              <h2 className="text-2xl font-bold text-gray-900">
                {currentQ.enunciado}
              </h2>
            </div>

            <div className="space-y-3 mb-8">
              {currentQ.alternativas.map((alt) => (
                <Card
                  key={alt.id}
                  className={`p-4 cursor-pointer transition-all ${
                    answers[currentQ.id] === alt.id
                      ? 'border-2 border-purple-600 bg-purple-50'
                      : 'hover:border-purple-300 hover:bg-purple-50/50'
                  }`}
                  onClick={() => handleAnswer(currentQ.id, alt.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQ.id] === alt.id
                        ? 'border-purple-600 bg-purple-600'
                        : 'border-gray-300'
                    }`}>
                      {answers[currentQ.id] === alt.id && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="font-semibold text-gray-700">{alt.id.toUpperCase()})</span>
                    <span className="text-gray-900">{alt.texto}</span>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>

              {currentQuestion === questoes.length - 1 ? (
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-600"
                  onClick={handleFinish}
                  disabled={Object.keys(answers).length !== questoes.length}
                >
                  <Flag className="w-4 h-4 mr-2" />
                  Finalizar
                </Button>
              ) : (
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-600"
                  onClick={handleNext}
                >
                  Próxima
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </Card>

          {/* Question Navigator */}
          <Card className="p-6 mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Navegação Rápida</h3>
            <div className="flex flex-wrap gap-2">
              {questoes.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                    index === currentQuestion
                      ? 'bg-purple-600 text-white'
                      : answers[q.id]
                      ? 'bg-green-100 text-green-700 border-2 border-green-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
