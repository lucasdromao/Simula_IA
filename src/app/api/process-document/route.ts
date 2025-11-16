import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import pdf from 'pdf-parse';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      );
    }

    let text = '';
    const buffer = await file.arrayBuffer();
    const fileType = file.type;
    const fileName = file.name.toLowerCase();

    // Processar diferentes tipos de arquivo
    if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      // Processar PDF
      try {
        const data = await pdf(Buffer.from(buffer));
        text = data.text;
      } catch (pdfError) {
        console.error('Erro ao processar PDF:', pdfError);
        return NextResponse.json(
          { error: 'Erro ao processar PDF. Verifique se o arquivo não está corrompido.' },
          { status: 400 }
        );
      }
    } else if (
      fileType === 'text/plain' || 
      fileName.endsWith('.txt') ||
      fileType === 'application/msword' ||
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      // Processar texto simples ou DOCX (como texto)
      text = new TextDecoder().decode(buffer);
    } else if (
      fileType.startsWith('image/') ||
      fileName.endsWith('.jpg') ||
      fileName.endsWith('.jpeg') ||
      fileName.endsWith('.png')
    ) {
      // Para imagens, usar OCR via OpenAI Vision
      const base64Image = Buffer.from(buffer).toString('base64');
      const imageUrl = `data:${fileType};base64,${base64Image}`;
      
      const visionResponse = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extraia TODO o texto desta imagem. Transcreva fielmente todo o conteúdo visível, mantendo a estrutura e formatação."
              },
              {
                type: "image_url",
                image_url: { url: imageUrl }
              }
            ]
          }
        ],
        max_tokens: 4000,
      });
      
      text = visionResponse.choices[0].message.content || '';
    } else {
      return NextResponse.json(
        { error: 'Tipo de arquivo não suportado. Use PDF, TXT, DOCX ou imagens (JPG, PNG).' },
        { status: 400 }
      );
    }

    if (!text || text.trim().length < 50) {
      return NextResponse.json(
        { error: 'Não foi possível extrair conteúdo suficiente do arquivo. Verifique se o arquivo contém texto.' },
        { status: 400 }
      );
    }

    // Extrair pontos principais com IA de forma mais detalhada
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Você é um especialista em análise de conteúdo educacional universitário. Sua tarefa é:

1. Ler e compreender COMPLETAMENTE o texto fornecido
2. Identificar TODOS os conceitos principais, teorias, fórmulas e informações importantes
3. Extrair tópicos-chave que podem ser usados para criar questões de nível universitário
4. Manter a profundidade técnica e acadêmica do conteúdo original
5. Organizar as informações de forma estruturada

Retorne uma análise COMPLETA e DETALHADA do conteúdo, preservando toda a complexidade e informações técnicas.`
        },
        {
          role: "user",
          content: `Analise o seguinte conteúdo de forma COMPLETA e DETALHADA. Extraia TODOS os pontos principais, conceitos, teorias, exemplos e informações relevantes. Mantenha a profundidade técnica:\n\n${text.substring(0, 15000)}` // Limitar para evitar tokens excessivos
        }
      ],
      temperature: 0.3, // Baixa temperatura para análise precisa
      max_tokens: 3000,
    });

    const extractedContent = completion.choices[0].message.content;

    return NextResponse.json({
      success: true,
      content: extractedContent,
      originalText: text.substring(0, 10000), // Enviar parte do texto original também
      fileType: fileType,
      fileName: file.name,
      textLength: text.length
    });
  } catch (error) {
    console.error('Erro ao processar documento:', error);
    return NextResponse.json(
      { error: 'Erro ao processar documento. Por favor, tente novamente.' },
      { status: 500 }
    );
  }
}
