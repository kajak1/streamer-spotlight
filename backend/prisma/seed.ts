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

  const res = await prisma.$transaction([twitch, tiktok, kick, youtube, rumble])
  console.log("res: ", res)
  
  const added = await prisma.platform.findMany()
  console.log("added: ", added)


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
