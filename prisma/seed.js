const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 블로그 데이터 추가 중...')

  // 기존 데이터 삭제 (테스트용)
  await prisma.blog.deleteMany()

  // 블로그 글 추가
  const blog1 = await prisma.blog.create({
    data: {
      title: 'it 용어 정리',
      content: '웹브라우저가 무엇인지?, 서버가 무엇인지?,클라이언트가 무엇인지?..... ',
    },
  })

  const blog2 = await prisma.blog.create({
    data: {
      title: 'js 문법 정리',
      content: '.if,for,while,function,array,object 무엇인가?, 시멘틱 태그란?.....',
    },
  })

  const blog3 = await prisma.blog.create({
    data: {
      title: 'Nest.js 정리',
      content: 'SEO란 무엇인가?, SSR,CSR 무엇인가?, SPA의 단점은 무엇이고 SEO가 불가능한 이유는?, NEXT.JS는 무엇인가?..... ',
    },
  })

  const blog4 = await prisma.blog.create({
    data: {
      title: '포트폴리오 배포 과정 정리',
      content: 'github에 포트폴리오 업로드, vercel에 포트폴리오 배포, 도메인 구매후 vercel에 연결.....',
    },
  })
  const blog5 = await prisma.blog.create({
    data: {
      title: 'HTTP 메소드 정리',
      content: 'get과 post는 무엇인가?, ',
    },
  })
  const blog6 = await prisma.blog.create({
    data: {
      title: 'Neon PostgreSQL 사용 후기',
      content: 'Vercel과 연동이 정말 쉽고, 무료 플랜도 충분해서 개인 프로젝트하기 좋아요. Prisma ORM과 함께 사용하니까 타입 안전성도 보장되고 개발 속도도 빨라졌어요!',
    },
  })
  const blog7 = await prisma.blog.create({
    data: {
      title: 'Neon PostgreSQL 사용 후기',
      content: 'Vercel과 연동이 정말 쉽고, 무료 플랜도 충분해서 개인 프로젝트하기 좋아요. Prisma ORM과 함께 사용하니까 타입 안전성도 보장되고 개발 속도도 빨라졌어요!',
    },
  })
  const blog8 = await prisma.blog.create({
    data: {
      title: 'Neon PostgreSQL 사용 후기',
      content: 'Vercel과 연동이 정말 쉽고, 무료 플랜도 충분해서 개인 프로젝트하기 좋아요. Prisma ORM과 함께 사용하니까 타입 안전성도 보장되고 개발 속도도 빨라졌어요!',
    },
  })
  const blog9 = await prisma.blog.create({
    data: {
      title: 'Neon PostgreSQL 사용 후기',
      content: 'Vercel과 연동이 정말 쉽고, 무료 플랜도 충분해서 개인 프로젝트하기 좋아요. Prisma ORM과 함께 사용하니까 타입 안전성도 보장되고 개발 속도도 빨라졌어요!',
    },
  })
  const blog10 = await prisma.blog.create({
    data: {
      title: 'Neon PostgreSQL 사용 후기',
      content: 'Vercel과 연동이 정말 쉽고, 무료 플랜도 충분해서 개인 프로젝트하기 좋아요. Prisma ORM과 함께 사용하니까 타입 안전성도 보장되고 개발 속도도 빨라졌어요!',
    },
  })
  const blog11 = await prisma.blog.create({
    data: {
      title: 'Neon PostgreSQL 사용 후기',
      content: 'Vercel과 연동이 정말 쉽고, 무료 플랜도 충분해서 개인 프로젝트하기 좋아요. Prisma ORM과 함께 사용하니까 타입 안전성도 보장되고 개발 속도도 빨라졌어요!',
    },
  })
  
  console.log('✅ 블로그 데이터 추가 완료!')
  console.log({ blog1, blog2, blog3 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
