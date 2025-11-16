import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userId, simuladoId, score, answers, timeSpent } = await request.json();

    // Aqui você salvaria no banco de dados (Supabase, MongoDB, etc)
    // Por enquanto, retornamos sucesso
    
    const result = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      simuladoId,
      score,
      answers,
      timeSpent,
      completedAt: new Date().toISOString(),
    };

    return NextResponse.json({ 
      success: true,
      result 
    });
  } catch (error) {
    console.error('Erro ao salvar resultado:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar resultado' },
      { status: 500 }
    );
  }
}
