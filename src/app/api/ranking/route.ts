import { NextRequest, NextResponse } from 'next/server';

// Mock de dados de ranking - em produção, isso viria de um banco de dados
const mockRankingData = [
  {
    id: 1,
    name: "Ana Silva",
    course: "Medicina",
    university: "UFV",
    score: 9500,
    accuracy: 95,
    simuladosCompletos: 45,
    avatar: "AS"
  },
  {
    id: 2,
    name: "Carlos Santos",
    course: "Engenharia",
    university: "UFMG",
    score: 9200,
    accuracy: 92,
    simuladosCompletos: 38,
    avatar: "CS"
  },
  {
    id: 3,
    name: "Beatriz Lima",
    course: "Direito",
    university: "UFJF",
    score: 8900,
    accuracy: 89,
    simuladosCompletos: 42,
    avatar: "BL"
  },
  {
    id: 4,
    name: "Daniel Costa",
    course: "Medicina",
    university: "UFV",
    score: 8700,
    accuracy: 87,
    simuladosCompletos: 35,
    avatar: "DC"
  },
  {
    id: 5,
    name: "Eduarda Souza",
    course: "Administração",
    university: "IFMG",
    score: 8500,
    accuracy: 85,
    simuladosCompletos: 40,
    avatar: "ES"
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const course = searchParams.get('course');
    const university = searchParams.get('university');
    const subject = searchParams.get('subject');

    let filteredRanking = [...mockRankingData];

    // Filtrar por curso
    if (course) {
      filteredRanking = filteredRanking.filter(
        student => student.course.toLowerCase() === course.toLowerCase()
      );
    }

    // Filtrar por universidade
    if (university) {
      filteredRanking = filteredRanking.filter(
        student => student.university.toLowerCase() === university.toLowerCase()
      );
    }

    // Ordenar por pontuação
    filteredRanking.sort((a, b) => b.score - a.score);

    return NextResponse.json({
      ranking: filteredRanking,
      filters: {
        course,
        university,
        subject
      }
    });
  } catch (error) {
    console.error('Erro ao buscar ranking:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar ranking' },
      { status: 500 }
    );
  }
}
