import { bigIntSerializer } from '@/utils/bigIntSerializer'
import { PrismaClient } from '@prisma/client'

bigIntSerializer()

export const prisma = new PrismaClient()
