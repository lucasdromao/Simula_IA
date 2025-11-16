import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { subject, numQuestions, difficulty, content, university, course } = await request.json();

    // Prompt aprimorado para questões de nível universitário
    const universityContext = university ? `\nUniversidade: ${university}` : '';
    const courseContext = course ? `\nCurso: ${course}` : '';
    
    const complexityInstructions = `
NÍVEL DE COMPLEXIDADE OBRIGATÓRIO:
- Questões de nível universitário AVANÇADO
- Exija raciocínio crítico, análise e síntese
- Inclua casos clínicos (se Medicina/Saúde)
- Inclua situações-problema complexas
- Evite questões decorativas ou muito simples
- Use terminologia técnica apropriada
- Questões estilo ENADE, vestibulares federais (UFV, UFJF, UFMG, IFMG)
${universityContext}${courseContext}

TIPOS DE QUESTÕES A INCLUIR:
1. Análise de casos/situações (40%)
2. Aplicação de conceitos (30%)
3. Síntese e avaliação (20%)
4. Conceituais avançadas (10%)
`;

    const prompt = content 
      ? `Você é um professor universitário especialista em criar questões de alto nível acadêmico. Analise o seguinte conteúdo e crie EXATAMENTE ${numQuestions} questões complexas e desafiadoras baseadas EXCLUSIVAMENTE neste material:

${content}

${complexityInstructions}

IMPORTANTE - REGRAS OBRIGATÓRIAS:
- Crie EXATAMENTE ${numQuestions} questões (NUNCA menos!)
- Cada questão deve ter 4 alternativas (a, b, c, d)
- Todas as alternativas devem ser plausíveis
- Inclua explicação DETALHADA (mínimo 3 linhas) para cada resposta correta
- Varie os tipos de questões conforme especificado acima
- Dificuldade: ${difficulty}
- Baseie-se APENAS no conteúdo fornecido

Retorne um JSON válido no formato:
{
  "questions": [
    {
      "id": 1,
      "enunciado": "texto da questão complexa com contexto/caso",
      "alternativas": [
        { "id": "a", "texto": "alternativa plausível a" },
        { "id": "b", "texto": "alternativa plausível b" },
        { "id": "c", "texto": "alternativa plausível c" },
        { "id": "d", "texto": "alternativa plausível d" }
      ],
      "correta": "a",
      "explicacao": "explicação detalhada e completa do porquê a resposta está correta, incluindo conceitos fundamentais, raciocínio lógico e conexões com o conteúdo estudado. Mínimo 3 linhas."
    }
  ]
}`
      : `Você é um professor universitário especialista em criar questões de alto nível acadêmico. Crie EXATAMENTE ${numQuestions} questões complexas e desafiadoras sobre ${subject}.

${complexityInstructions}

IMPORTANTE - REGRAS OBRIGATÓRIAS:
- Crie EXATAMENTE ${numQuestions} questões (NUNCA menos!)
- Cada questão deve ter 4 alternativas (a, b, c, d)
- Todas as alternativas devem ser plausíveis
- Inclua explicação DETALHADA (mínimo 3 linhas) para cada resposta correta
- Varie os tipos de questões conforme especificado acima
- Dificuldade: ${difficulty}

Retorne um JSON válido no formato:
{
  "questions": [
    {
      "id": 1,
      "enunciado": "texto da questão complexa com contexto/caso",
      "alternativas": [
        { "id": "a", "texto": "alternativa plausível a" },
        { "id": "b", "texto": "alternativa plausível b" },
        { "id": "c", "texto": "alternativa plausível c" },
        { "id": "d", "texto": "alternativa plausível d" }
      ],
      "correta": "a",
      "explicacao": "explicação detalhada e completa do porquê a resposta está correta, incluindo conceitos fundamentais, raciocínio lógico e conexões com o conteúdo estudado. Mínimo 3 linhas."
    }
  ]
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Você é um professor universitário especialista em educação de nível superior que cria questões complexas, desafiadoras e de alto nível acadêmico. 

REGRAS ABSOLUTAS:
1. SEMPRE retorne JSON válido
2. SEMPRE crie o número EXATO de questões solicitadas (${numQuestions})
3. NUNCA crie menos questões que o solicitado
4. Cada questão DEVE ter explicação detalhada (mínimo 3 linhas)
5. Questões devem ser de nível universitário AVANÇADO
6. Inclua casos clínicos, situações-problema e análise crítica
7. Evite questões decorativas ou muito simples

Se o usuário pedir 10 questões, você DEVE criar 10. Se pedir 20, você DEVE criar 20. Sem exceções.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.9, // Aumentado para mais criatividade
      max_tokens: 4000, // Aumentado para garantir todas as questões
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    
    // Validar que temos o número correto de questões
    if (!result.questions || result.questions.length !== numQuestions) {
      console.error(`Número incorreto de questões: ${result.questions?.length || 0} ao invés de ${numQuestions}`);
      
      // Tentar novamente se não gerou o número correto
      if (result.questions && result.questions.length < numQuestions) {
        throw new Error(`IA gerou apenas ${result.questions.length} questões ao invés de ${numQuestions}. Tentando novamente...`);
      }
    }

    // Validar que todas as questões têm explicação
    result.questions.forEach((q: any, index: number) => {
      if (!q.explicacao || q.explicacao.length < 50) {
        console.warn(`Questão ${index + 1} tem explicação muito curta`);
      }
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Erro ao gerar questões:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar questões. Por favor, tente novamente.' },
      { status: 500 }
    );
  }
}
