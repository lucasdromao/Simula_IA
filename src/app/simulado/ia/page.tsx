"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain,
  ArrowLeft,
  Upload,
  FileText,
  X,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface Question {
  id: number;
  enunciado: string;
  alternativas: Array<{ id: string; texto: string }>;
  correta: string;
  explicacao: string;
}

export default function SimuladoIAPage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState("Adaptativa (IA escolhe)");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
      setError("");
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    if (files.length === 0) {
      setError("Por favor, envie pelo menos um arquivo");
      return;
    }

    setUploading(true);
    setProgress(0);
    setError("");

    try {
      // Processar documentos
      setProgress(20);
      const formData = new FormData();
      formData.append('file', files[0]); // Por enquanto, processar primeiro arquivo

      const processResponse = await fetch('/api/process-document', {
        method: 'POST',
        body: formData,
      });

      if (!processResponse.ok) {
        throw new Error('Erro ao processar documento');
      }

      const { content, originalText } = await processResponse.json();
      
      setProgress(50);
      setUploading(false);
      setAnalyzing(true);

      // Gerar questões baseadas no conteúdo
      const questionsResponse = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content || originalText,
          numQuestions,
          difficulty,
          subject: files[0].name
        }),
      });

      if (!questionsResponse.ok) {
        throw new Error('Erro ao gerar questões');
      }

      const { questions: generatedQuestions } = await questionsResponse.json();
      
      setProgress(100);
      setQuestions(generatedQuestions);
      
      // Redirecionar para página do simulado com as questões
      setTimeout(() => {
        localStorage.setItem('simulado-ia-questions', JSON.stringify(generatedQuestions));
        router.push('/simulado/pronto/ia-generated');
      }, 1000);

    } catch (err) {
      console.error('Erro:', err);
      setError('Erro ao processar arquivo. Tente novamente.');
      setUploading(false);
      setAnalyzing(false);
      setProgress(0);
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
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <Badge className="bg-purple-100 text-purple-700 border-purple-200">
            <Sparkles className="w-3 h-3 mr-1" />
            Powered by IA
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Criar Simulado com IA
          </h1>
          
          <p className="text-lg text-gray-600">
            Envie seus materiais e nossa IA criará um simulado personalizado
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {!analyzing ? (
            <Card className="p-8">
              {/* Upload Area */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  1. Envie seus materiais
                </h2>
                
                <label className="block">
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-purple-500 hover:bg-purple-50/50 transition-all cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-semibold text-gray-700 mb-2">
                      Clique para fazer upload ou arraste arquivos
                    </p>
                    <p className="text-sm text-gray-500">
                      PDF, DOCX, TXT, imagens • Máximo 10MB por arquivo
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Files List */}
                {files.length > 0 && (
                  <div className="mt-6 space-y-3">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <FileText className="w-8 h-8 text-purple-600" />
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{file.name}</div>
                          <div className="text-sm text-gray-600">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  2. Configure seu simulado
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-4 border-2 border-purple-200 bg-purple-50/50">
                    <div className="font-semibold text-gray-900 mb-2">Número de questões</div>
                    <select 
                      className="w-full p-2 border rounded-lg"
                      value={numQuestions}
                      onChange={(e) => setNumQuestions(Number(e.target.value))}
                    >
                      <option value={10}>10 questões</option>
                      <option value={15}>15 questões</option>
                      <option value={20}>20 questões</option>
                      <option value={30}>30 questões</option>
                    </select>
                  </Card>

                  <Card className="p-4 border-2 border-purple-200 bg-purple-50/50">
                    <div className="font-semibold text-gray-900 mb-2">Dificuldade</div>
                    <select 
                      className="w-full p-2 border rounded-lg"
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                    >
                      <option>Adaptativa (IA escolhe)</option>
                      <option>Fácil</option>
                      <option>Médio</option>
                      <option>Difícil</option>
                    </select>
                  </Card>
                </div>
              </div>

              {/* Generate Button */}
              <Button 
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg"
                disabled={files.length === 0 || uploading}
                onClick={handleGenerate}
              >
                {uploading ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Processando... {progress}%
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Gerar Simulado com IA
                  </>
                )}
              </Button>

              {uploading && (
                <div className="mt-4">
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              {/* Info Cards */}
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <Card className="p-4 text-center">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <div className="font-semibold text-gray-900 mb-1">IA Avançada</div>
                  <div className="text-xs text-gray-600">Análise profunda do conteúdo</div>
                </Card>
                <Card className="p-4 text-center">
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="font-semibold text-gray-900 mb-1">Personalizado</div>
                  <div className="text-xs text-gray-600">Focado no seu material</div>
                </Card>
                <Card className="p-4 text-center">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                  <div className="font-semibold text-gray-900 mb-1">Rápido</div>
                  <div className="text-xs text-gray-600">Pronto em segundos</div>
                </Card>
              </div>
            </Card>
          ) : (
            <Card className="p-8">
              <div className="text-center space-y-6">
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto">
                  <Sparkles className="w-10 h-10 text-white animate-pulse" />
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    IA Analisando Seus Materiais
                  </h2>
                  <p className="text-gray-600">
                    Estamos processando {files.length} arquivo(s) e criando {numQuestions} questões personalizadas...
                  </p>
                </div>

                <div className="max-w-md mx-auto space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">Arquivos processados</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
                    <span className="text-sm text-gray-700">Identificando tópicos principais...</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-gray-700">Gerando {numQuestions} questões personalizadas...</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Progress value={progress} className="h-2 mb-2" />
                  <p className="text-sm text-gray-500">Isso pode levar alguns segundos...</p>
                </div>
              </div>
            </Card>
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
