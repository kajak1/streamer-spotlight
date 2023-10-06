import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const twitch = prisma.platform.create({
    data: {
      type: "Twitch"
    },
  })
  const tiktok = prisma.platform.create({
    data: {
      type: "TikTok"
    },
  })
  const kick = prisma.platform.create({
    data: {
      type: "Kick"
    },
  })
  const youtube = prisma.platform.create({
    data: {
      type: "YouTube"
    },
  })
  const rumble = prisma.platform.create({
    data: {
      type: "Rumble"
    },
  })

  await prisma.$transaction([twitch, tiktok, kick, youtube, rumble])
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
