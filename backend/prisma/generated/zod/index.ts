import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const StreamerScalarFieldEnumSchema = z.enum(['id','name','description','platform','image','upvotes','downvotes']);

export const SortOrderSchema = z.enum(['asc','desc']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// STREAMER SCHEMA
/////////////////////////////////////////

export const StreamerSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  platform: z.string(),
  image: z.string(),
  upvotes: z.number().int(),
  downvotes: z.number().int(),
})

export type Streamer = z.infer<typeof StreamerSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// STREAMER
//------------------------------------------------------

export const StreamerSelectSchema: z.ZodType<Prisma.StreamerSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  platform: z.boolean().optional(),
  image: z.boolean().optional(),
  upvotes: z.boolean().optional(),
  downvotes: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const StreamerWhereInputSchema: z.ZodType<Prisma.StreamerWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StreamerWhereInputSchema),z.lazy(() => StreamerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StreamerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StreamerWhereInputSchema),z.lazy(() => StreamerWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  platform: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  upvotes: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  downvotes: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const StreamerOrderByWithRelationInputSchema: z.ZodType<Prisma.StreamerOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  platform: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  upvotes: z.lazy(() => SortOrderSchema).optional(),
  downvotes: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StreamerWhereUniqueInputSchema: z.ZodType<Prisma.StreamerWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const StreamerOrderByWithAggregationInputSchema: z.ZodType<Prisma.StreamerOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  platform: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  upvotes: z.lazy(() => SortOrderSchema).optional(),
  downvotes: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StreamerCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => StreamerAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StreamerMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StreamerMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => StreamerSumOrderByAggregateInputSchema).optional()
}).strict();

export const StreamerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StreamerScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StreamerScalarWhereWithAggregatesInputSchema),z.lazy(() => StreamerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StreamerScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StreamerScalarWhereWithAggregatesInputSchema),z.lazy(() => StreamerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  platform: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  image: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  upvotes: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  downvotes: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const StreamerCreateInputSchema: z.ZodType<Prisma.StreamerCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string(),
  platform: z.string(),
  image: z.string(),
  upvotes: z.number().int(),
  downvotes: z.number().int()
}).strict();

export const StreamerUncheckedCreateInputSchema: z.ZodType<Prisma.StreamerUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string(),
  platform: z.string(),
  image: z.string(),
  upvotes: z.number().int(),
  downvotes: z.number().int()
}).strict();

export const StreamerUpdateInputSchema: z.ZodType<Prisma.StreamerUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  upvotes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  downvotes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StreamerUncheckedUpdateInputSchema: z.ZodType<Prisma.StreamerUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  upvotes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  downvotes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StreamerUpdateManyMutationInputSchema: z.ZodType<Prisma.StreamerUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  upvotes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  downvotes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StreamerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StreamerUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  platform: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  upvotes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  downvotes: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StreamerCountOrderByAggregateInputSchema: z.ZodType<Prisma.StreamerCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  platform: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  upvotes: z.lazy(() => SortOrderSchema).optional(),
  downvotes: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StreamerAvgOrderByAggregateInputSchema: z.ZodType<Prisma.StreamerAvgOrderByAggregateInput> = z.object({
  upvotes: z.lazy(() => SortOrderSchema).optional(),
  downvotes: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StreamerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StreamerMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  platform: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  upvotes: z.lazy(() => SortOrderSchema).optional(),
  downvotes: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StreamerMinOrderByAggregateInputSchema: z.ZodType<Prisma.StreamerMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  platform: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  upvotes: z.lazy(() => SortOrderSchema).optional(),
  downvotes: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StreamerSumOrderByAggregateInputSchema: z.ZodType<Prisma.StreamerSumOrderByAggregateInput> = z.object({
  upvotes: z.lazy(() => SortOrderSchema).optional(),
  downvotes: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const StreamerFindFirstArgsSchema: z.ZodType<Prisma.StreamerFindFirstArgs> = z.object({
  select: StreamerSelectSchema.optional(),
  where: StreamerWhereInputSchema.optional(),
  orderBy: z.union([ StreamerOrderByWithRelationInputSchema.array(),StreamerOrderByWithRelationInputSchema ]).optional(),
  cursor: StreamerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StreamerScalarFieldEnumSchema,StreamerScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const StreamerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StreamerFindFirstOrThrowArgs> = z.object({
  select: StreamerSelectSchema.optional(),
  where: StreamerWhereInputSchema.optional(),
  orderBy: z.union([ StreamerOrderByWithRelationInputSchema.array(),StreamerOrderByWithRelationInputSchema ]).optional(),
  cursor: StreamerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StreamerScalarFieldEnumSchema,StreamerScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const StreamerFindManyArgsSchema: z.ZodType<Prisma.StreamerFindManyArgs> = z.object({
  select: StreamerSelectSchema.optional(),
  where: StreamerWhereInputSchema.optional(),
  orderBy: z.union([ StreamerOrderByWithRelationInputSchema.array(),StreamerOrderByWithRelationInputSchema ]).optional(),
  cursor: StreamerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StreamerScalarFieldEnumSchema,StreamerScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const StreamerAggregateArgsSchema: z.ZodType<Prisma.StreamerAggregateArgs> = z.object({
  where: StreamerWhereInputSchema.optional(),
  orderBy: z.union([ StreamerOrderByWithRelationInputSchema.array(),StreamerOrderByWithRelationInputSchema ]).optional(),
  cursor: StreamerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const StreamerGroupByArgsSchema: z.ZodType<Prisma.StreamerGroupByArgs> = z.object({
  where: StreamerWhereInputSchema.optional(),
  orderBy: z.union([ StreamerOrderByWithAggregationInputSchema.array(),StreamerOrderByWithAggregationInputSchema ]).optional(),
  by: StreamerScalarFieldEnumSchema.array(),
  having: StreamerScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const StreamerFindUniqueArgsSchema: z.ZodType<Prisma.StreamerFindUniqueArgs> = z.object({
  select: StreamerSelectSchema.optional(),
  where: StreamerWhereUniqueInputSchema,
}).strict()

export const StreamerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StreamerFindUniqueOrThrowArgs> = z.object({
  select: StreamerSelectSchema.optional(),
  where: StreamerWhereUniqueInputSchema,
}).strict()

export const StreamerCreateArgsSchema: z.ZodType<Prisma.StreamerCreateArgs> = z.object({
  select: StreamerSelectSchema.optional(),
  data: z.union([ StreamerCreateInputSchema,StreamerUncheckedCreateInputSchema ]),
}).strict()

export const StreamerUpsertArgsSchema: z.ZodType<Prisma.StreamerUpsertArgs> = z.object({
  select: StreamerSelectSchema.optional(),
  where: StreamerWhereUniqueInputSchema,
  create: z.union([ StreamerCreateInputSchema,StreamerUncheckedCreateInputSchema ]),
  update: z.union([ StreamerUpdateInputSchema,StreamerUncheckedUpdateInputSchema ]),
}).strict()

export const StreamerDeleteArgsSchema: z.ZodType<Prisma.StreamerDeleteArgs> = z.object({
  select: StreamerSelectSchema.optional(),
  where: StreamerWhereUniqueInputSchema,
}).strict()

export const StreamerUpdateArgsSchema: z.ZodType<Prisma.StreamerUpdateArgs> = z.object({
  select: StreamerSelectSchema.optional(),
  data: z.union([ StreamerUpdateInputSchema,StreamerUncheckedUpdateInputSchema ]),
  where: StreamerWhereUniqueInputSchema,
}).strict()

export const StreamerUpdateManyArgsSchema: z.ZodType<Prisma.StreamerUpdateManyArgs> = z.object({
  data: z.union([ StreamerUpdateManyMutationInputSchema,StreamerUncheckedUpdateManyInputSchema ]),
  where: StreamerWhereInputSchema.optional(),
}).strict()

export const StreamerDeleteManyArgsSchema: z.ZodType<Prisma.StreamerDeleteManyArgs> = z.object({
  where: StreamerWhereInputSchema.optional(),
}).strict()