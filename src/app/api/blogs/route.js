import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: 'desc', // 최신순 정렬
      },
    })

    return NextResponse.json(blogs)
  } catch (error) {
    console.error('블로그 조회 오류:', error)
    return NextResponse.json(
      { error: '블로그를 불러오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}
