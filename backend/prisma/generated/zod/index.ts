import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id']);

export const StreamerScalarFieldEnumSchema = z.enum(['id','name','description']);

export const PlatformScalarFieldEnumSchema = z.enum(['id','type','streamer_id']);

export const UpvoteScalarFieldEnumSchema = z.enum(['id','user_id','streamer_id']);

export const DownvoteScalarFieldEnumSchema = z.enum(['id','user_id','streamer_id']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// STREAMER SCHEMA
/////////////////////////////////////////

export const StreamerSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
})

export type Streamer = z.infer<typeof StreamerSchema>

/////////////////////////////////////////
// PLATFORM SCHEMA
/////////////////////////////////////////

export const PlatformSchema = z.object({
  id: z.string().uuid(),
  type: z.string(),
  streamer_id: z.string(),
})

export type Platform = z.infer<typeof PlatformSchema>

/////////////////////////////////////////
// UPVOTE SCHEMA
/////////////////////////////////////////

export const UpvoteSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string(),
  streamer_id: z.string(),
})

export type Upvote = z.infer<typeof UpvoteSchema>

/////////////////////////////////////////
// DOWNVOTE SCHEMA
/////////////////////////////////////////

export const DownvoteSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string(),
  streamer_id: z.string(),
})

export type Downvote = z.infer<typeof DownvoteSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
}).strict()

// STREAMER
//------------------------------------------------------

export const StreamerIncludeSchema: z.ZodType<Prisma.StreamerInclude> = z.object({
  Upvote: z.union([z.boolean(),z.lazy(() => UpvoteFindManyArgsSchema)]).optional(),
  Downvote: z.union([z.boolean(),z.lazy(() => DownvoteFindManyArgsSchema)]).optional(),
  Platform: z.union([z.boolean(),z.lazy(() => PlatformFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StreamerCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const StreamerArgsSchema: z.ZodType<Prisma.StreamerArgs> = z.object({
  select: z.lazy(() => StreamerSelectSchema).optional(),
  include: z.lazy(() => StreamerIncludeSchema).optional(),
}).strict();

export const StreamerCountOutputTypeArgsSchema: z.ZodType<Prisma.StreamerCountOutputTypeArgs> = z.object({
  select: z.lazy(() => StreamerCountOutputTypeSelectSchema).nullish(),
}).strict();

export const StreamerCountOutputTypeSelectSchema: z.ZodType<Prisma.StreamerCountOutputTypeSelect> = z.object({
  Upvote: z.boolean().optional(),
  Downvote: z.boolean().optional(),
  Platform: z.boolean().optional(),
}).strict();

export const StreamerSelectSchema: z.ZodType<Prisma.StreamerSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  Upvote: z.union([z.boolean(),z.lazy(() => UpvoteFindManyArgsSchema)]).optional(),
  Downvote: z.union([z.boolean(),z.lazy(() => DownvoteFindManyArgsSchema)]).optional(),
  Platform: z.union([z.boolean(),z.lazy(() => PlatformFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StreamerCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PLATFORM
//------------------------------------------------------

export const PlatformIncludeSchema: z.ZodType<Prisma.PlatformInclude> = z.object({
  streamer: z.union([z.boolean(),z.lazy(() => StreamerArgsSchema)]).optional(),
}).strict()

export const PlatformArgsSchema: z.ZodType<Prisma.PlatformArgs> = z.object({
  select: z.lazy(() => PlatformSelectSchema).optional(),
  include: z.lazy(() => PlatformIncludeSchema).optional(),
}).strict();

export const PlatformSelectSchema: z.ZodType<Prisma.PlatformSelect> = z.object({
  id: z.boolean().optional(),
  type: z.boolean().optional(),
  streamer_id: z.boolean().optional(),
  streamer: z.union([z.boolean(),z.lazy(() => StreamerArgsSchema)]).optional(),
}).strict()

// UPVOTE
//------------------------------------------------------

export const UpvoteIncludeSchema: z.ZodType<Prisma.UpvoteInclude> = z.object({
  streamer: z.union([z.boolean(),z.lazy(() => StreamerArgsSchema)]).optional(),
}).strict()

export const UpvoteArgsSchema: z.ZodType<Prisma.UpvoteArgs> = z.object({
  select: z.lazy(() => UpvoteSelectSchema).optional(),
  include: z.lazy(() => UpvoteIncludeSchema).optional(),
}).strict();

export const UpvoteSelectSchema: z.ZodType<Prisma.UpvoteSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  streamer_id: z.boolean().optional(),
  streamer: z.union([z.boolean(),z.lazy(() => StreamerArgsSchema)]).optional(),
}).strict()

// DOWNVOTE
//------------------------------------------------------

export const DownvoteIncludeSchema: z.ZodType<Prisma.DownvoteInclude> = z.object({
  streamer: z.union([z.boolean(),z.lazy(() => StreamerArgsSchema)]).optional(),
}).strict()

export const DownvoteArgsSchema: z.ZodType<Prisma.DownvoteArgs> = z.object({
  select: z.lazy(() => DownvoteSelectSchema).optional(),
  include: z.lazy(() => DownvoteIncludeSchema).optional(),
}).strict();

export const DownvoteSelectSchema: z.ZodType<Prisma.DownvoteSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  streamer_id: z.boolean().optional(),
  streamer: z.union([z.boolean(),z.lazy(() => StreamerArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const StreamerWhereInputSchema: z.ZodType<Prisma.StreamerWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StreamerWhereInputSchema),z.lazy(() => StreamerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StreamerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StreamerWhereInputSchema),z.lazy(() => StreamerWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  Upvote: z.lazy(() => UpvoteListRelationFilterSchema).optional(),
  Downvote: z.lazy(() => DownvoteListRelationFilterSchema).optional(),
  Platform: z.lazy(() => PlatformListRelationFilterSchema).optional()
}).strict();

export const StreamerOrderByWithRelationInputSchema: z.ZodType<Prisma.StreamerOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  Upvote: z.lazy(() => UpvoteOrderByRelationAggregateInputSchema).optional(),
  Downvote: z.lazy(() => DownvoteOrderByRelationAggregateInputSchema).optional(),
  Platform: z.lazy(() => PlatformOrderByRelationAggregateInputSchema).optional()
}).strict();

export const StreamerWhereUniqueInputSchema: z.ZodType<Prisma.StreamerWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional()
}).strict();

export const StreamerOrderByWithAggregationInputSchema: z.ZodType<Prisma.StreamerOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => StreamerCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StreamerMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StreamerMinOrderByAggregateInputSchema).optional()
}).strict();

export const StreamerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StreamerScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StreamerScalarWhereWithAggregatesInputSchema),z.lazy(() => StreamerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StreamerScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StreamerScalarWhereWithAggregatesInputSchema),z.lazy(() => StreamerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const PlatformWhereInputSchema: z.ZodType<Prisma.PlatformWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PlatformWhereInputSchema),z.lazy(() => PlatformWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlatformWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlatformWhereInputSchema),z.lazy(() => PlatformWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  streamer_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  streamer: z.union([ z.lazy(() => StreamerRelationFilterSchema),z.lazy(() => StreamerWhereInputSchema) ]).optional(),
}).strict();

export const PlatformOrderByWithRelationInputSchema: z.ZodType<Prisma.PlatformOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  streamer_id: z.lazy(() => SortOrderSchema).optional(),
  streamer: z.lazy(() => StreamerOrderByWithRelationInputSchema).optional()
}).strict();

export const PlatformWhereUniqueInputSchema: z.ZodType<Prisma.PlatformWhereUniqueInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.string().optional()
}).strict();

export const PlatformOrderByWithAggregationInputSchema: z.ZodType<Prisma.PlatformOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  streamer_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PlatformCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PlatformMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PlatformMinOrderByAggregateInputSchema).optional()
}).strict();

export const PlatformScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PlatformScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PlatformScalarWhereWithAggregatesInputSchema),z.lazy(() => PlatformScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlatformScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlatformScalarWhereWithAggregatesInputSchema),z.lazy(() => PlatformScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  streamer_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UpvoteWhereInputSchema: z.ZodType<Prisma.UpvoteWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UpvoteWhereInputSchema),z.lazy(() => UpvoteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UpvoteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UpvoteWhereInputSchema),z.lazy(() => UpvoteWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  streamer_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  streamer: z.union([ z.lazy(() => StreamerRelationFilterSchema),z.lazy(() => StreamerWhereInputSchema) ]).optional(),
}).strict();

export const UpvoteOrderByWithRelationInputSchema: z.ZodType<Prisma.UpvoteOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  streamer_id: z.lazy(() => SortOrderSchema).optional(),
  streamer: z.lazy(() => StreamerOrderByWithRelationInputSchema).optional()
}).strict();

export const UpvoteWhereUniqueInputSchema: z.ZodType<Prisma.UpvoteWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const UpvoteOrderByWithAggregationInputSchema: z.ZodType<Prisma.UpvoteOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  streamer_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UpvoteCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UpvoteMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UpvoteMinOrderByAggregateInputSchema).optional()
}).strict();

export const UpvoteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UpvoteScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UpvoteScalarWhereWithAggregatesInputSchema),z.lazy(() => UpvoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UpvoteScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UpvoteScalarWhereWithAggregatesInputSchema),z.lazy(() => UpvoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  streamer_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const DownvoteWhereInputSchema: z.ZodType<Prisma.DownvoteWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DownvoteWhereInputSchema),z.lazy(() => DownvoteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DownvoteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DownvoteWhereInputSchema),z.lazy(() => DownvoteWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  streamer_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  streamer: z.union([ z.lazy(() => StreamerRelationFilterSchema),z.lazy(() => StreamerWhereInputSchema) ]).optional(),
}).strict();

export const DownvoteOrderByWithRelationInputSchema: z.ZodType<Prisma.DownvoteOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  streamer_id: z.lazy(() => SortOrderSchema).optional(),
  streamer: z.lazy(() => StreamerOrderByWithRelationInputSchema).optional()
}).strict();

export const DownvoteWhereUniqueInputSchema: z.ZodType<Prisma.DownvoteWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const DownvoteOrderByWithAggregationInputSchema: z.ZodType<Prisma.DownvoteOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  streamer_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DownvoteCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DownvoteMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DownvoteMinOrderByAggregateInputSchema).optional()
}).strict();

export const DownvoteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DownvoteScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DownvoteScalarWhereWithAggregatesInputSchema),z.lazy(() => DownvoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DownvoteScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DownvoteScalarWhereWithAggregatesInputSchema),z.lazy(() => DownvoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  streamer_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StreamerCreateInputSchema: z.ZodType<Prisma.StreamerCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  Upvote: z.lazy(() => UpvoteCreateNestedManyWithoutStreamerInputSchema).optional(),
  Downvote: z.lazy(() => DownvoteCreateNestedManyWithoutStreamerInputSchema).optional(),
  Platform: z.lazy(() => PlatformCreateNestedManyWithoutStreamerInputSchema).optional()
}).strict();

export const StreamerUncheckedCreateInputSchema: z.ZodType<Prisma.StreamerUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  Upvote: z.lazy(() => UpvoteUncheckedCreateNestedManyWithoutStreamerInputSchema).optional(),
  Downvote: z.lazy(() => DownvoteUncheckedCreateNestedManyWithoutStreamerInputSchema).optional(),
  Platform: z.lazy(() => PlatformUncheckedCreateNestedManyWithoutStreamerInputSchema).optional()
}).strict();

export const StreamerUpdateInputSchema: z.ZodType<Prisma.StreamerUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Upvote: z.lazy(() => UpvoteUpdateManyWithoutStreamerNestedInputSchema).optional(),
  Downvote: z.lazy(() => DownvoteUpdateManyWithoutStreamerNestedInputSchema).optional(),
  Platform: z.lazy(() => PlatformUpdateManyWithoutStreamerNestedInputSchema).optional()
}).strict();

export const StreamerUncheckedUpdateInputSchema: z.ZodType<Prisma.StreamerUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Upvote: z.lazy(() => UpvoteUncheckedUpdateManyWithoutStreamerNestedInputSchema).optional(),
  Downvote: z.lazy(() => DownvoteUncheckedUpdateManyWithoutStreamerNestedInputSchema).optional(),
  Platform: z.lazy(() => PlatformUncheckedUpdateManyWithoutStreamerNestedInputSchema).optional()
}).strict();

export const StreamerUpdateManyMutationInputSchema: z.ZodType<Prisma.StreamerUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StreamerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StreamerUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PlatformCreateInputSchema: z.ZodType<Prisma.PlatformCreateInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.string(),
  streamer: z.lazy(() => StreamerCreateNestedOneWithoutPlatformInputSchema)
}).strict();

export const PlatformUncheckedCreateInputSchema: z.ZodType<Prisma.PlatformUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.string(),
  streamer_id: z.string()
}).strict();

export const PlatformUpdateInputSchema: z.ZodType<Prisma.PlatformUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  streamer: z.lazy(() => StreamerUpdateOneRequiredWithoutPlatformNestedInputSchema).optional()
}).strict();

export const PlatformUncheckedUpdateInputSchema: z.ZodType<Prisma.PlatformUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  streamer_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlatformUpdateManyMutationInputSchema: z.ZodType<Prisma.PlatformUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlatformUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PlatformUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  streamer_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UpvoteCreateInputSchema: z.ZodType<Prisma.UpvoteCreateInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string(),
  streamer: z.lazy(() => StreamerCreateNestedOneWithoutUpvoteInputSchema)
}).strict();

export const UpvoteUncheckedCreateInputSchema: z.ZodType<Prisma.UpvoteUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string(),
  streamer_id: z.string()
}).strict();

export const UpvoteUpdateInputSchema: z.ZodType<Prisma.UpvoteUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  streamer: z.lazy(() => StreamerUpdateOneRequiredWithoutUpvoteNestedInputSchema).optional()
}).strict();

export const UpvoteUncheckedUpdateInputSchema: z.ZodType<Prisma.UpvoteUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  streamer_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UpvoteUpdateManyMutationInputSchema: z.ZodType<Prisma.UpvoteUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UpvoteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UpvoteUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  streamer_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DownvoteCreateInputSchema: z.ZodType<Prisma.DownvoteCreateInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string(),
  streamer: z.lazy(() => StreamerCreateNestedOneWithoutDownvoteInputSchema)
}).strict();

export const DownvoteUncheckedCreateInputSchema: z.ZodType<Prisma.DownvoteUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string(),
  streamer_id: z.string()
}).strict();

export const DownvoteUpdateInputSchema: z.ZodType<Prisma.DownvoteUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  streamer: z.lazy(() => StreamerUpdateOneRequiredWithoutDownvoteNestedInputSchema).optional()
}).strict();

export const DownvoteUncheckedUpdateInputSchema: z.ZodType<Prisma.DownvoteUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  streamer_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DownvoteUpdateManyMutationInputSchema: z.ZodType<Prisma.DownvoteUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DownvoteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DownvoteUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  streamer_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
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

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UpvoteListRelationFilterSchema: z.ZodType<Prisma.UpvoteListRelationFilter> = z.object({
  every: z.lazy(() => UpvoteWhereInputSchema).optional(),
  some: z.lazy(() => UpvoteWhereInputSchema).optional(),
  none: z.lazy(() => UpvoteWhereInputSchema).optional()
}).strict();

export const DownvoteListRelationFilterSchema: z.ZodType<Prisma.DownvoteListRelationFilter> = z.object({
  every: z.lazy(() => DownvoteWhereInputSchema).optional(),
  some: z.lazy(() => DownvoteWhereInputSchema).optional(),
  none: z.lazy(() => DownvoteWhereInputSchema).optional()
}).strict();

export const PlatformListRelationFilterSchema: z.ZodType<Prisma.PlatformListRelationFilter> = z.object({
  every: z.lazy(() => PlatformWhereInputSchema).optional(),
  some: z.lazy(() => PlatformWhereInputSchema).optional(),
  none: z.lazy(() => PlatformWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const UpvoteOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UpvoteOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DownvoteOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DownvoteOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlatformOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PlatformOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StreamerCountOrderByAggregateInputSchema: z.ZodType<Prisma.StreamerCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StreamerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StreamerMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StreamerMinOrderByAggregateInputSchema: z.ZodType<Prisma.StreamerMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const StreamerRelationFilterSchema: z.ZodType<Prisma.StreamerRelationFilter> = z.object({
  is: z.lazy(() => StreamerWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => StreamerWhereInputSchema).optional().nullable()
}).strict();

export const PlatformCountOrderByAggregateInputSchema: z.ZodType<Prisma.PlatformCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  streamer_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlatformMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PlatformMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  streamer_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlatformMinOrderByAggregateInputSchema: z.ZodType<Prisma.PlatformMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  streamer_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UpvoteCountOrderByAggregateInputSchema: z.ZodType<Prisma.UpvoteCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  streamer_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UpvoteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UpvoteMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  streamer_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UpvoteMinOrderByAggregateInputSchema: z.ZodType<Prisma.UpvoteMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  streamer_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DownvoteCountOrderByAggregateInputSchema: z.ZodType<Prisma.DownvoteCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  streamer_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DownvoteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DownvoteMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  streamer_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DownvoteMinOrderByAggregateInputSchema: z.ZodType<Prisma.DownvoteMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  streamer_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const UpvoteCreateNestedManyWithoutStreamerInputSchema: z.ZodType<Prisma.UpvoteCreateNestedManyWithoutStreamerInput> = z.object({
  create: z.union([ z.lazy(() => UpvoteCreateWithoutStreamerInputSchema),z.lazy(() => UpvoteCreateWithoutStreamerInputSchema).array(),z.lazy(() => UpvoteUncheckedCreateWithoutStreamerInputSchema),z.lazy(() => UpvoteUncheckedCreateWithoutStreamerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UpvoteCreateOrConnectWithoutStreamerInputSchema),z.lazy(() => UpvoteCreateOrConnectWithoutStreamerInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UpvoteWhereUniqueInputSchema),z.lazy(() => UpvoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DownvoteCreateNestedManyWithoutStreamerInputSchema: z.ZodType<Prisma.DownvoteCreateNestedManyWithoutStreamerInput> = z.object({
  create: z.union([ z.lazy(() => DownvoteCreateWithoutStreamerInputSchema),z.lazy(() => DownvoteCreateWithoutStreamerInputSchema).array(),z.lazy(() => DownvoteUncheckedCreateWithoutStreamerInputSchema),z.lazy(() => DownvoteUncheckedCreateWithoutStreamerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DownvoteCreateOrConnectWithoutStreamerInputSchema),z.lazy(() => DownvoteCreateOrConnectWithoutStreamerInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DownvoteWhereUniqueInputSchema),z.lazy(() => DownvoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PlatformCreateNestedManyWithoutStreamerInputSchema: z.ZodType<Prisma.PlatformCreateNestedManyWithoutStreamerInput> = z.object({
  create: z.union([ z.lazy(() => PlatformCreateWithoutStreamerInputSchema),z.lazy(() => PlatformCreateWithoutStreamerInputSchema).array(),z.lazy(() => PlatformUncheckedCreateWithoutStreamerInputSchema),z.lazy(() => PlatformUncheckedCreateWithoutStreamerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PlatformCreateOrConnectWithoutStreamerInputSchema),z.lazy(() => PlatformCreateOrConnectWithoutStreamerInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PlatformWhereUniqueInputSchema),z.lazy(() => PlatformWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UpvoteUncheckedCreateNestedManyWithoutStreamerInputSchema: z.ZodType<Prisma.UpvoteUncheckedCreateNestedManyWithoutStreamerInput> = z.object({
  create: z.union([ z.lazy(() => UpvoteCreateWithoutStreamerInputSchema),z.lazy(() => UpvoteCreateWithoutStreamerInputSchema).array(),z.lazy(() => UpvoteUncheckedCreateWithoutStreamerInputSchema),z.lazy(() => UpvoteUncheckedCreateWithoutStreamerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UpvoteCreateOrConnectWithoutStreamerInputSchema),z.lazy(() => UpvoteCreateOrConnectWithoutStreamerInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UpvoteWhereUniqueInputSchema),z.lazy(() => UpvoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DownvoteUncheckedCreateNestedManyWithoutStreamerInputSchema: z.ZodType<Prisma.DownvoteUncheckedCreateNestedManyWithoutStreamerInput> = z.object({
  create: z.union([ z.lazy(() => DownvoteCreateWithoutStreamerInputSchema),z.lazy(() => DownvoteCreateWithoutStreamerInputSchema).array(),z.lazy(() => DownvoteUncheckedCreateWithoutStreamerInputSchema),z.lazy(() => DownvoteUncheckedCreateWithoutStreamerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DownvoteCreateOrConnectWithoutStreamerInputSchema),z.lazy(() => DownvoteCreateOrConnectWithoutStreamerInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DownvoteWhereUniqueInputSchema),z.lazy(() => DownvoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PlatformUncheckedCreateNestedManyWithoutStreamerInputSchema: z.ZodType<Prisma.PlatformUncheckedCreateNestedManyWithoutStreamerInput> = z.object({
  create: z.union([ z.lazy(() => PlatformCreateWithoutStreamerInputSchema),z.lazy(() => PlatformCreateWithoutStreamerInputSchema).array(),z.lazy(() => PlatformUncheckedCreateWithoutStreamerInputSchema),z.lazy(() => PlatformUncheckedCreateWithoutStreamerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PlatformCreateOrConnectWithoutStreamerInputSchema),z.lazy(() => PlatformCreateOrConnectWithoutStreamerInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PlatformWhereUniqueInputSchema),z.lazy(() => PlatformWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const UpvoteUpdateManyWithoutStreamerNestedInputSchema: z.ZodType<Prisma.UpvoteUpdateManyWithoutStreamerNestedInput> = z.object({
  create: z.union([ z.lazy(() => UpvoteCreateWithoutStreamerInputSchema),z.lazy(() => UpvoteCreateWithoutStreamerInputSchema).array(),z.lazy(() => UpvoteUncheckedCreateWithoutStreamerInputSchema),z.lazy(() => UpvoteUncheckedCreateWithoutStreamerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UpvoteCreateOrConnectWithoutStreamerInputSchema),z.lazy(() => UpvoteCreateOrConnectWithoutStreamerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UpvoteUpsertWithWhereUniqueWithoutStreamerInputSchema),z.lazy(() => UpvoteUpsertWithWhereUniqueWithoutStreamerInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UpvoteWhereUniqueInputSchema),z.lazy(() => UpvoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UpvoteWhereUniqueInputSchema),z.lazy(() => UpvoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UpvoteWhereUniqueInputSchema),z.lazy(() => UpvoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UpvoteWhereUniqueInputSchema),z.lazy(() => UpvoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UpvoteUpdateWithWhereUniqueWithoutStreamerInputSchema),z.lazy(() => UpvoteUpdateWithWhereUniqueWithoutStreamerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UpvoteUpdateManyWithWhereWithoutStreamerInputSchema),z.lazy(() => UpvoteUpdateManyWithWhereWithoutStreamerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UpvoteScalarWhereInputSchema),z.lazy(() => UpvoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DownvoteUpdateManyWithoutStreamerNestedInputSchema: z.ZodType<Prisma.DownvoteUpdateManyWithoutStreamerNestedInput> = z.object({
  create: z.union([ z.lazy(() => DownvoteCreateWithoutStreamerInputSchema),z.lazy(() => DownvoteCreateWithoutStreamerInputSchema).array(),z.lazy(() => DownvoteUncheckedCreateWithoutStreamerInputSchema),z.lazy(() => DownvoteUncheckedCreateWithoutStreamerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DownvoteCreateOrConnectWithoutStreamerInputSchema),z.lazy(() => DownvoteCreateOrConnectWithoutStreamerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DownvoteUpsertWithWhereUniqueWithoutStreamerInputSchema),z.lazy(() => DownvoteUpsertWithWhereUniqueWithoutStreamerInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => DownvoteWhereUniqueInputSchema),z.lazy(() => DownvoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DownvoteWhereUniqueInputSchema),z.lazy(() => DownvoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DownvoteWhereUniqueInputSchema),z.lazy(() => DownvoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DownvoteWhereUniqueInputSchema),z.lazy(() => DownvoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DownvoteUpdateWithWhereUniqueWithoutStreamerInputSchema),z.lazy(() => DownvoteUpdateWithWhereUniqueWithoutStreamerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DownvoteUpdateManyWithWhereWithoutStreamerInputSchema),z.lazy(() => DownvoteUpdateManyWithWhereWithoutStreamerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DownvoteScalarWhereInputSchema),z.lazy(() => DownvoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PlatformUpdateManyWithoutStreamerNestedInputSchema: z.ZodType<Prisma.PlatformUpdateManyWithoutStreamerNestedInput> = z.object({
  create: z.union([ z.lazy(() => PlatformCreateWithoutStreamerInputSchema),z.lazy(() => PlatformCreateWithoutStreamerInputSchema).array(),z.lazy(() => PlatformUncheckedCreateWithoutStreamerInputSchema),z.lazy(() => PlatformUncheckedCreateWithoutStreamerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PlatformCreateOrConnectWithoutStreamerInputSchema),z.lazy(() => PlatformCreateOrConnectWithoutStreamerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PlatformUpsertWithWhereUniqueWithoutStreamerInputSchema),z.lazy(() => PlatformUpsertWithWhereUniqueWithoutStreamerInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PlatformWhereUniqueInputSchema),z.lazy(() => PlatformWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PlatformWhereUniqueInputSchema),z.lazy(() => PlatformWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PlatformWhereUniqueInputSchema),z.lazy(() => PlatformWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PlatformWhereUniqueInputSchema),z.lazy(() => PlatformWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PlatformUpdateWithWhereUniqueWithoutStreamerInputSchema),z.lazy(() => PlatformUpdateWithWhereUniqueWithoutStreamerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PlatformUpdateManyWithWhereWithoutStreamerInputSchema),z.lazy(() => PlatformUpdateManyWithWhereWithoutStreamerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PlatformScalarWhereInputSchema),z.lazy(() => PlatformScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UpvoteUncheckedUpdateManyWithoutStreamerNestedInputSchema: z.ZodType<Prisma.UpvoteUncheckedUpdateManyWithoutStreamerNestedInput> = z.object({
  create: z.union([ z.lazy(() => UpvoteCreateWithoutStreamerInputSchema),z.lazy(() => UpvoteCreateWithoutStreamerInputSchema).array(),z.lazy(() => UpvoteUncheckedCreateWithoutStreamerInputSchema),z.lazy(() => UpvoteUncheckedCreateWithoutStreamerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UpvoteCreateOrConnectWithoutStreamerInputSchema),z.lazy(() => UpvoteCreateOrConnectWithoutStreamerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UpvoteUpsertWithWhereUniqueWithoutStreamerInputSchema),z.lazy(() => UpvoteUpsertWithWhereUniqueWithoutStreamerInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UpvoteWhereUniqueInputSchema),z.lazy(() => UpvoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UpvoteWhereUniqueInputSchema),z.lazy(() => UpvoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UpvoteWhereUniqueInputSchema),z.lazy(() => UpvoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UpvoteWhereUniqueInputSchema),z.lazy(() => UpvoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UpvoteUpdateWithWhereUniqueWithoutStreamerInputSchema),z.lazy(() => UpvoteUpdateWithWhereUniqueWithoutStreamerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UpvoteUpdateManyWithWhereWithoutStreamerInputSchema),z.lazy(() => UpvoteUpdateManyWithWhereWithoutStreamerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UpvoteScalarWhereInputSchema),z.lazy(() => UpvoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DownvoteUncheckedUpdateManyWithoutStreamerNestedInputSchema: z.ZodType<Prisma.DownvoteUncheckedUpdateManyWithoutStreamerNestedInput> = z.object({
  create: z.union([ z.lazy(() => DownvoteCreateWithoutStreamerInputSchema),z.lazy(() => DownvoteCreateWithoutStreamerInputSchema).array(),z.lazy(() => DownvoteUncheckedCreateWithoutStreamerInputSchema),z.lazy(() => DownvoteUncheckedCreateWithoutStreamerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DownvoteCreateOrConnectWithoutStreamerInputSchema),z.lazy(() => DownvoteCreateOrConnectWithoutStreamerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DownvoteUpsertWithWhereUniqueWithoutStreamerInputSchema),z.lazy(() => DownvoteUpsertWithWhereUniqueWithoutStreamerInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => DownvoteWhereUniqueInputSchema),z.lazy(() => DownvoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DownvoteWhereUniqueInputSchema),z.lazy(() => DownvoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DownvoteWhereUniqueInputSchema),z.lazy(() => DownvoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DownvoteWhereUniqueInputSchema),z.lazy(() => DownvoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DownvoteUpdateWithWhereUniqueWithoutStreamerInputSchema),z.lazy(() => DownvoteUpdateWithWhereUniqueWithoutStreamerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DownvoteUpdateManyWithWhereWithoutStreamerInputSchema),z.lazy(() => DownvoteUpdateManyWithWhereWithoutStreamerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DownvoteScalarWhereInputSchema),z.lazy(() => DownvoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PlatformUncheckedUpdateManyWithoutStreamerNestedInputSchema: z.ZodType<Prisma.PlatformUncheckedUpdateManyWithoutStreamerNestedInput> = z.object({
  create: z.union([ z.lazy(() => PlatformCreateWithoutStreamerInputSchema),z.lazy(() => PlatformCreateWithoutStreamerInputSchema).array(),z.lazy(() => PlatformUncheckedCreateWithoutStreamerInputSchema),z.lazy(() => PlatformUncheckedCreateWithoutStreamerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PlatformCreateOrConnectWithoutStreamerInputSchema),z.lazy(() => PlatformCreateOrConnectWithoutStreamerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PlatformUpsertWithWhereUniqueWithoutStreamerInputSchema),z.lazy(() => PlatformUpsertWithWhereUniqueWithoutStreamerInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PlatformWhereUniqueInputSchema),z.lazy(() => PlatformWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PlatformWhereUniqueInputSchema),z.lazy(() => PlatformWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PlatformWhereUniqueInputSchema),z.lazy(() => PlatformWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PlatformWhereUniqueInputSchema),z.lazy(() => PlatformWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PlatformUpdateWithWhereUniqueWithoutStreamerInputSchema),z.lazy(() => PlatformUpdateWithWhereUniqueWithoutStreamerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PlatformUpdateManyWithWhereWithoutStreamerInputSchema),z.lazy(() => PlatformUpdateManyWithWhereWithoutStreamerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PlatformScalarWhereInputSchema),z.lazy(() => PlatformScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StreamerCreateNestedOneWithoutPlatformInputSchema: z.ZodType<Prisma.StreamerCreateNestedOneWithoutPlatformInput> = z.object({
  create: z.union([ z.lazy(() => StreamerCreateWithoutPlatformInputSchema),z.lazy(() => StreamerUncheckedCreateWithoutPlatformInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StreamerCreateOrConnectWithoutPlatformInputSchema).optional(),
  connect: z.lazy(() => StreamerWhereUniqueInputSchema).optional()
}).strict();

export const StreamerUpdateOneRequiredWithoutPlatformNestedInputSchema: z.ZodType<Prisma.StreamerUpdateOneRequiredWithoutPlatformNestedInput> = z.object({
  create: z.union([ z.lazy(() => StreamerCreateWithoutPlatformInputSchema),z.lazy(() => StreamerUncheckedCreateWithoutPlatformInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StreamerCreateOrConnectWithoutPlatformInputSchema).optional(),
  upsert: z.lazy(() => StreamerUpsertWithoutPlatformInputSchema).optional(),
  connect: z.lazy(() => StreamerWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StreamerUpdateWithoutPlatformInputSchema),z.lazy(() => StreamerUncheckedUpdateWithoutPlatformInputSchema) ]).optional(),
}).strict();

export const StreamerCreateNestedOneWithoutUpvoteInputSchema: z.ZodType<Prisma.StreamerCreateNestedOneWithoutUpvoteInput> = z.object({
  create: z.union([ z.lazy(() => StreamerCreateWithoutUpvoteInputSchema),z.lazy(() => StreamerUncheckedCreateWithoutUpvoteInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StreamerCreateOrConnectWithoutUpvoteInputSchema).optional(),
  connect: z.lazy(() => StreamerWhereUniqueInputSchema).optional()
}).strict();

export const StreamerUpdateOneRequiredWithoutUpvoteNestedInputSchema: z.ZodType<Prisma.StreamerUpdateOneRequiredWithoutUpvoteNestedInput> = z.object({
  create: z.union([ z.lazy(() => StreamerCreateWithoutUpvoteInputSchema),z.lazy(() => StreamerUncheckedCreateWithoutUpvoteInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StreamerCreateOrConnectWithoutUpvoteInputSchema).optional(),
  upsert: z.lazy(() => StreamerUpsertWithoutUpvoteInputSchema).optional(),
  connect: z.lazy(() => StreamerWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StreamerUpdateWithoutUpvoteInputSchema),z.lazy(() => StreamerUncheckedUpdateWithoutUpvoteInputSchema) ]).optional(),
}).strict();

export const StreamerCreateNestedOneWithoutDownvoteInputSchema: z.ZodType<Prisma.StreamerCreateNestedOneWithoutDownvoteInput> = z.object({
  create: z.union([ z.lazy(() => StreamerCreateWithoutDownvoteInputSchema),z.lazy(() => StreamerUncheckedCreateWithoutDownvoteInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StreamerCreateOrConnectWithoutDownvoteInputSchema).optional(),
  connect: z.lazy(() => StreamerWhereUniqueInputSchema).optional()
}).strict();

export const StreamerUpdateOneRequiredWithoutDownvoteNestedInputSchema: z.ZodType<Prisma.StreamerUpdateOneRequiredWithoutDownvoteNestedInput> = z.object({
  create: z.union([ z.lazy(() => StreamerCreateWithoutDownvoteInputSchema),z.lazy(() => StreamerUncheckedCreateWithoutDownvoteInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StreamerCreateOrConnectWithoutDownvoteInputSchema).optional(),
  upsert: z.lazy(() => StreamerUpsertWithoutDownvoteInputSchema).optional(),
  connect: z.lazy(() => StreamerWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StreamerUpdateWithoutDownvoteInputSchema),z.lazy(() => StreamerUncheckedUpdateWithoutDownvoteInputSchema) ]).optional(),
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

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UpvoteCreateWithoutStreamerInputSchema: z.ZodType<Prisma.UpvoteCreateWithoutStreamerInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string()
}).strict();

export const UpvoteUncheckedCreateWithoutStreamerInputSchema: z.ZodType<Prisma.UpvoteUncheckedCreateWithoutStreamerInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string()
}).strict();

export const UpvoteCreateOrConnectWithoutStreamerInputSchema: z.ZodType<Prisma.UpvoteCreateOrConnectWithoutStreamerInput> = z.object({
  where: z.lazy(() => UpvoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UpvoteCreateWithoutStreamerInputSchema),z.lazy(() => UpvoteUncheckedCreateWithoutStreamerInputSchema) ]),
}).strict();

export const DownvoteCreateWithoutStreamerInputSchema: z.ZodType<Prisma.DownvoteCreateWithoutStreamerInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string()
}).strict();

export const DownvoteUncheckedCreateWithoutStreamerInputSchema: z.ZodType<Prisma.DownvoteUncheckedCreateWithoutStreamerInput> = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string()
}).strict();

export const DownvoteCreateOrConnectWithoutStreamerInputSchema: z.ZodType<Prisma.DownvoteCreateOrConnectWithoutStreamerInput> = z.object({
  where: z.lazy(() => DownvoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DownvoteCreateWithoutStreamerInputSchema),z.lazy(() => DownvoteUncheckedCreateWithoutStreamerInputSchema) ]),
}).strict();

export const PlatformCreateWithoutStreamerInputSchema: z.ZodType<Prisma.PlatformCreateWithoutStreamerInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.string()
}).strict();

export const PlatformUncheckedCreateWithoutStreamerInputSchema: z.ZodType<Prisma.PlatformUncheckedCreateWithoutStreamerInput> = z.object({
  id: z.string().uuid().optional(),
  type: z.string()
}).strict();

export const PlatformCreateOrConnectWithoutStreamerInputSchema: z.ZodType<Prisma.PlatformCreateOrConnectWithoutStreamerInput> = z.object({
  where: z.lazy(() => PlatformWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PlatformCreateWithoutStreamerInputSchema),z.lazy(() => PlatformUncheckedCreateWithoutStreamerInputSchema) ]),
}).strict();

export const UpvoteUpsertWithWhereUniqueWithoutStreamerInputSchema: z.ZodType<Prisma.UpvoteUpsertWithWhereUniqueWithoutStreamerInput> = z.object({
  where: z.lazy(() => UpvoteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UpvoteUpdateWithoutStreamerInputSchema),z.lazy(() => UpvoteUncheckedUpdateWithoutStreamerInputSchema) ]),
  create: z.union([ z.lazy(() => UpvoteCreateWithoutStreamerInputSchema),z.lazy(() => UpvoteUncheckedCreateWithoutStreamerInputSchema) ]),
}).strict();

export const UpvoteUpdateWithWhereUniqueWithoutStreamerInputSchema: z.ZodType<Prisma.UpvoteUpdateWithWhereUniqueWithoutStreamerInput> = z.object({
  where: z.lazy(() => UpvoteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UpvoteUpdateWithoutStreamerInputSchema),z.lazy(() => UpvoteUncheckedUpdateWithoutStreamerInputSchema) ]),
}).strict();

export const UpvoteUpdateManyWithWhereWithoutStreamerInputSchema: z.ZodType<Prisma.UpvoteUpdateManyWithWhereWithoutStreamerInput> = z.object({
  where: z.lazy(() => UpvoteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UpvoteUpdateManyMutationInputSchema),z.lazy(() => UpvoteUncheckedUpdateManyWithoutUpvoteInputSchema) ]),
}).strict();

export const UpvoteScalarWhereInputSchema: z.ZodType<Prisma.UpvoteScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UpvoteScalarWhereInputSchema),z.lazy(() => UpvoteScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UpvoteScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UpvoteScalarWhereInputSchema),z.lazy(() => UpvoteScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  streamer_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const DownvoteUpsertWithWhereUniqueWithoutStreamerInputSchema: z.ZodType<Prisma.DownvoteUpsertWithWhereUniqueWithoutStreamerInput> = z.object({
  where: z.lazy(() => DownvoteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DownvoteUpdateWithoutStreamerInputSchema),z.lazy(() => DownvoteUncheckedUpdateWithoutStreamerInputSchema) ]),
  create: z.union([ z.lazy(() => DownvoteCreateWithoutStreamerInputSchema),z.lazy(() => DownvoteUncheckedCreateWithoutStreamerInputSchema) ]),
}).strict();

export const DownvoteUpdateWithWhereUniqueWithoutStreamerInputSchema: z.ZodType<Prisma.DownvoteUpdateWithWhereUniqueWithoutStreamerInput> = z.object({
  where: z.lazy(() => DownvoteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DownvoteUpdateWithoutStreamerInputSchema),z.lazy(() => DownvoteUncheckedUpdateWithoutStreamerInputSchema) ]),
}).strict();

export const DownvoteUpdateManyWithWhereWithoutStreamerInputSchema: z.ZodType<Prisma.DownvoteUpdateManyWithWhereWithoutStreamerInput> = z.object({
  where: z.lazy(() => DownvoteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DownvoteUpdateManyMutationInputSchema),z.lazy(() => DownvoteUncheckedUpdateManyWithoutDownvoteInputSchema) ]),
}).strict();

export const DownvoteScalarWhereInputSchema: z.ZodType<Prisma.DownvoteScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DownvoteScalarWhereInputSchema),z.lazy(() => DownvoteScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DownvoteScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DownvoteScalarWhereInputSchema),z.lazy(() => DownvoteScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  streamer_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PlatformUpsertWithWhereUniqueWithoutStreamerInputSchema: z.ZodType<Prisma.PlatformUpsertWithWhereUniqueWithoutStreamerInput> = z.object({
  where: z.lazy(() => PlatformWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PlatformUpdateWithoutStreamerInputSchema),z.lazy(() => PlatformUncheckedUpdateWithoutStreamerInputSchema) ]),
  create: z.union([ z.lazy(() => PlatformCreateWithoutStreamerInputSchema),z.lazy(() => PlatformUncheckedCreateWithoutStreamerInputSchema) ]),
}).strict();

export const PlatformUpdateWithWhereUniqueWithoutStreamerInputSchema: z.ZodType<Prisma.PlatformUpdateWithWhereUniqueWithoutStreamerInput> = z.object({
  where: z.lazy(() => PlatformWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PlatformUpdateWithoutStreamerInputSchema),z.lazy(() => PlatformUncheckedUpdateWithoutStreamerInputSchema) ]),
}).strict();

export const PlatformUpdateManyWithWhereWithoutStreamerInputSchema: z.ZodType<Prisma.PlatformUpdateManyWithWhereWithoutStreamerInput> = z.object({
  where: z.lazy(() => PlatformScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PlatformUpdateManyMutationInputSchema),z.lazy(() => PlatformUncheckedUpdateManyWithoutPlatformInputSchema) ]),
}).strict();

export const PlatformScalarWhereInputSchema: z.ZodType<Prisma.PlatformScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PlatformScalarWhereInputSchema),z.lazy(() => PlatformScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlatformScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlatformScalarWhereInputSchema),z.lazy(() => PlatformScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  streamer_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const StreamerCreateWithoutPlatformInputSchema: z.ZodType<Prisma.StreamerCreateWithoutPlatformInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  Upvote: z.lazy(() => UpvoteCreateNestedManyWithoutStreamerInputSchema).optional(),
  Downvote: z.lazy(() => DownvoteCreateNestedManyWithoutStreamerInputSchema).optional()
}).strict();

export const StreamerUncheckedCreateWithoutPlatformInputSchema: z.ZodType<Prisma.StreamerUncheckedCreateWithoutPlatformInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  Upvote: z.lazy(() => UpvoteUncheckedCreateNestedManyWithoutStreamerInputSchema).optional(),
  Downvote: z.lazy(() => DownvoteUncheckedCreateNestedManyWithoutStreamerInputSchema).optional()
}).strict();

export const StreamerCreateOrConnectWithoutPlatformInputSchema: z.ZodType<Prisma.StreamerCreateOrConnectWithoutPlatformInput> = z.object({
  where: z.lazy(() => StreamerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StreamerCreateWithoutPlatformInputSchema),z.lazy(() => StreamerUncheckedCreateWithoutPlatformInputSchema) ]),
}).strict();

export const StreamerUpsertWithoutPlatformInputSchema: z.ZodType<Prisma.StreamerUpsertWithoutPlatformInput> = z.object({
  update: z.union([ z.lazy(() => StreamerUpdateWithoutPlatformInputSchema),z.lazy(() => StreamerUncheckedUpdateWithoutPlatformInputSchema) ]),
  create: z.union([ z.lazy(() => StreamerCreateWithoutPlatformInputSchema),z.lazy(() => StreamerUncheckedCreateWithoutPlatformInputSchema) ]),
}).strict();

export const StreamerUpdateWithoutPlatformInputSchema: z.ZodType<Prisma.StreamerUpdateWithoutPlatformInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Upvote: z.lazy(() => UpvoteUpdateManyWithoutStreamerNestedInputSchema).optional(),
  Downvote: z.lazy(() => DownvoteUpdateManyWithoutStreamerNestedInputSchema).optional()
}).strict();

export const StreamerUncheckedUpdateWithoutPlatformInputSchema: z.ZodType<Prisma.StreamerUncheckedUpdateWithoutPlatformInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Upvote: z.lazy(() => UpvoteUncheckedUpdateManyWithoutStreamerNestedInputSchema).optional(),
  Downvote: z.lazy(() => DownvoteUncheckedUpdateManyWithoutStreamerNestedInputSchema).optional()
}).strict();

export const StreamerCreateWithoutUpvoteInputSchema: z.ZodType<Prisma.StreamerCreateWithoutUpvoteInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  Downvote: z.lazy(() => DownvoteCreateNestedManyWithoutStreamerInputSchema).optional(),
  Platform: z.lazy(() => PlatformCreateNestedManyWithoutStreamerInputSchema).optional()
}).strict();

export const StreamerUncheckedCreateWithoutUpvoteInputSchema: z.ZodType<Prisma.StreamerUncheckedCreateWithoutUpvoteInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  Downvote: z.lazy(() => DownvoteUncheckedCreateNestedManyWithoutStreamerInputSchema).optional(),
  Platform: z.lazy(() => PlatformUncheckedCreateNestedManyWithoutStreamerInputSchema).optional()
}).strict();

export const StreamerCreateOrConnectWithoutUpvoteInputSchema: z.ZodType<Prisma.StreamerCreateOrConnectWithoutUpvoteInput> = z.object({
  where: z.lazy(() => StreamerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StreamerCreateWithoutUpvoteInputSchema),z.lazy(() => StreamerUncheckedCreateWithoutUpvoteInputSchema) ]),
}).strict();

export const StreamerUpsertWithoutUpvoteInputSchema: z.ZodType<Prisma.StreamerUpsertWithoutUpvoteInput> = z.object({
  update: z.union([ z.lazy(() => StreamerUpdateWithoutUpvoteInputSchema),z.lazy(() => StreamerUncheckedUpdateWithoutUpvoteInputSchema) ]),
  create: z.union([ z.lazy(() => StreamerCreateWithoutUpvoteInputSchema),z.lazy(() => StreamerUncheckedCreateWithoutUpvoteInputSchema) ]),
}).strict();

export const StreamerUpdateWithoutUpvoteInputSchema: z.ZodType<Prisma.StreamerUpdateWithoutUpvoteInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Downvote: z.lazy(() => DownvoteUpdateManyWithoutStreamerNestedInputSchema).optional(),
  Platform: z.lazy(() => PlatformUpdateManyWithoutStreamerNestedInputSchema).optional()
}).strict();

export const StreamerUncheckedUpdateWithoutUpvoteInputSchema: z.ZodType<Prisma.StreamerUncheckedUpdateWithoutUpvoteInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Downvote: z.lazy(() => DownvoteUncheckedUpdateManyWithoutStreamerNestedInputSchema).optional(),
  Platform: z.lazy(() => PlatformUncheckedUpdateManyWithoutStreamerNestedInputSchema).optional()
}).strict();

export const StreamerCreateWithoutDownvoteInputSchema: z.ZodType<Prisma.StreamerCreateWithoutDownvoteInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  Upvote: z.lazy(() => UpvoteCreateNestedManyWithoutStreamerInputSchema).optional(),
  Platform: z.lazy(() => PlatformCreateNestedManyWithoutStreamerInputSchema).optional()
}).strict();

export const StreamerUncheckedCreateWithoutDownvoteInputSchema: z.ZodType<Prisma.StreamerUncheckedCreateWithoutDownvoteInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  Upvote: z.lazy(() => UpvoteUncheckedCreateNestedManyWithoutStreamerInputSchema).optional(),
  Platform: z.lazy(() => PlatformUncheckedCreateNestedManyWithoutStreamerInputSchema).optional()
}).strict();

export const StreamerCreateOrConnectWithoutDownvoteInputSchema: z.ZodType<Prisma.StreamerCreateOrConnectWithoutDownvoteInput> = z.object({
  where: z.lazy(() => StreamerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StreamerCreateWithoutDownvoteInputSchema),z.lazy(() => StreamerUncheckedCreateWithoutDownvoteInputSchema) ]),
}).strict();

export const StreamerUpsertWithoutDownvoteInputSchema: z.ZodType<Prisma.StreamerUpsertWithoutDownvoteInput> = z.object({
  update: z.union([ z.lazy(() => StreamerUpdateWithoutDownvoteInputSchema),z.lazy(() => StreamerUncheckedUpdateWithoutDownvoteInputSchema) ]),
  create: z.union([ z.lazy(() => StreamerCreateWithoutDownvoteInputSchema),z.lazy(() => StreamerUncheckedCreateWithoutDownvoteInputSchema) ]),
}).strict();

export const StreamerUpdateWithoutDownvoteInputSchema: z.ZodType<Prisma.StreamerUpdateWithoutDownvoteInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Upvote: z.lazy(() => UpvoteUpdateManyWithoutStreamerNestedInputSchema).optional(),
  Platform: z.lazy(() => PlatformUpdateManyWithoutStreamerNestedInputSchema).optional()
}).strict();

export const StreamerUncheckedUpdateWithoutDownvoteInputSchema: z.ZodType<Prisma.StreamerUncheckedUpdateWithoutDownvoteInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  Upvote: z.lazy(() => UpvoteUncheckedUpdateManyWithoutStreamerNestedInputSchema).optional(),
  Platform: z.lazy(() => PlatformUncheckedUpdateManyWithoutStreamerNestedInputSchema).optional()
}).strict();

export const UpvoteUpdateWithoutStreamerInputSchema: z.ZodType<Prisma.UpvoteUpdateWithoutStreamerInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UpvoteUncheckedUpdateWithoutStreamerInputSchema: z.ZodType<Prisma.UpvoteUncheckedUpdateWithoutStreamerInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UpvoteUncheckedUpdateManyWithoutUpvoteInputSchema: z.ZodType<Prisma.UpvoteUncheckedUpdateManyWithoutUpvoteInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DownvoteUpdateWithoutStreamerInputSchema: z.ZodType<Prisma.DownvoteUpdateWithoutStreamerInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DownvoteUncheckedUpdateWithoutStreamerInputSchema: z.ZodType<Prisma.DownvoteUncheckedUpdateWithoutStreamerInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DownvoteUncheckedUpdateManyWithoutDownvoteInputSchema: z.ZodType<Prisma.DownvoteUncheckedUpdateManyWithoutDownvoteInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlatformUpdateWithoutStreamerInputSchema: z.ZodType<Prisma.PlatformUpdateWithoutStreamerInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlatformUncheckedUpdateWithoutStreamerInputSchema: z.ZodType<Prisma.PlatformUncheckedUpdateWithoutStreamerInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlatformUncheckedUpdateManyWithoutPlatformInputSchema: z.ZodType<Prisma.PlatformUncheckedUpdateManyWithoutPlatformInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const StreamerFindFirstArgsSchema: z.ZodType<Prisma.StreamerFindFirstArgs> = z.object({
  select: StreamerSelectSchema.optional(),
  include: StreamerIncludeSchema.optional(),
  where: StreamerWhereInputSchema.optional(),
  orderBy: z.union([ StreamerOrderByWithRelationInputSchema.array(),StreamerOrderByWithRelationInputSchema ]).optional(),
  cursor: StreamerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StreamerScalarFieldEnumSchema,StreamerScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const StreamerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StreamerFindFirstOrThrowArgs> = z.object({
  select: StreamerSelectSchema.optional(),
  include: StreamerIncludeSchema.optional(),
  where: StreamerWhereInputSchema.optional(),
  orderBy: z.union([ StreamerOrderByWithRelationInputSchema.array(),StreamerOrderByWithRelationInputSchema ]).optional(),
  cursor: StreamerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StreamerScalarFieldEnumSchema,StreamerScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const StreamerFindManyArgsSchema: z.ZodType<Prisma.StreamerFindManyArgs> = z.object({
  select: StreamerSelectSchema.optional(),
  include: StreamerIncludeSchema.optional(),
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
  include: StreamerIncludeSchema.optional(),
  where: StreamerWhereUniqueInputSchema,
}).strict()

export const StreamerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StreamerFindUniqueOrThrowArgs> = z.object({
  select: StreamerSelectSchema.optional(),
  include: StreamerIncludeSchema.optional(),
  where: StreamerWhereUniqueInputSchema,
}).strict()

export const PlatformFindFirstArgsSchema: z.ZodType<Prisma.PlatformFindFirstArgs> = z.object({
  select: PlatformSelectSchema.optional(),
  include: PlatformIncludeSchema.optional(),
  where: PlatformWhereInputSchema.optional(),
  orderBy: z.union([ PlatformOrderByWithRelationInputSchema.array(),PlatformOrderByWithRelationInputSchema ]).optional(),
  cursor: PlatformWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlatformScalarFieldEnumSchema,PlatformScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PlatformFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PlatformFindFirstOrThrowArgs> = z.object({
  select: PlatformSelectSchema.optional(),
  include: PlatformIncludeSchema.optional(),
  where: PlatformWhereInputSchema.optional(),
  orderBy: z.union([ PlatformOrderByWithRelationInputSchema.array(),PlatformOrderByWithRelationInputSchema ]).optional(),
  cursor: PlatformWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlatformScalarFieldEnumSchema,PlatformScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PlatformFindManyArgsSchema: z.ZodType<Prisma.PlatformFindManyArgs> = z.object({
  select: PlatformSelectSchema.optional(),
  include: PlatformIncludeSchema.optional(),
  where: PlatformWhereInputSchema.optional(),
  orderBy: z.union([ PlatformOrderByWithRelationInputSchema.array(),PlatformOrderByWithRelationInputSchema ]).optional(),
  cursor: PlatformWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlatformScalarFieldEnumSchema,PlatformScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PlatformAggregateArgsSchema: z.ZodType<Prisma.PlatformAggregateArgs> = z.object({
  where: PlatformWhereInputSchema.optional(),
  orderBy: z.union([ PlatformOrderByWithRelationInputSchema.array(),PlatformOrderByWithRelationInputSchema ]).optional(),
  cursor: PlatformWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PlatformGroupByArgsSchema: z.ZodType<Prisma.PlatformGroupByArgs> = z.object({
  where: PlatformWhereInputSchema.optional(),
  orderBy: z.union([ PlatformOrderByWithAggregationInputSchema.array(),PlatformOrderByWithAggregationInputSchema ]).optional(),
  by: PlatformScalarFieldEnumSchema.array(),
  having: PlatformScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PlatformFindUniqueArgsSchema: z.ZodType<Prisma.PlatformFindUniqueArgs> = z.object({
  select: PlatformSelectSchema.optional(),
  include: PlatformIncludeSchema.optional(),
  where: PlatformWhereUniqueInputSchema,
}).strict()

export const PlatformFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PlatformFindUniqueOrThrowArgs> = z.object({
  select: PlatformSelectSchema.optional(),
  include: PlatformIncludeSchema.optional(),
  where: PlatformWhereUniqueInputSchema,
}).strict()

export const UpvoteFindFirstArgsSchema: z.ZodType<Prisma.UpvoteFindFirstArgs> = z.object({
  select: UpvoteSelectSchema.optional(),
  include: UpvoteIncludeSchema.optional(),
  where: UpvoteWhereInputSchema.optional(),
  orderBy: z.union([ UpvoteOrderByWithRelationInputSchema.array(),UpvoteOrderByWithRelationInputSchema ]).optional(),
  cursor: UpvoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UpvoteScalarFieldEnumSchema,UpvoteScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UpvoteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UpvoteFindFirstOrThrowArgs> = z.object({
  select: UpvoteSelectSchema.optional(),
  include: UpvoteIncludeSchema.optional(),
  where: UpvoteWhereInputSchema.optional(),
  orderBy: z.union([ UpvoteOrderByWithRelationInputSchema.array(),UpvoteOrderByWithRelationInputSchema ]).optional(),
  cursor: UpvoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UpvoteScalarFieldEnumSchema,UpvoteScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UpvoteFindManyArgsSchema: z.ZodType<Prisma.UpvoteFindManyArgs> = z.object({
  select: UpvoteSelectSchema.optional(),
  include: UpvoteIncludeSchema.optional(),
  where: UpvoteWhereInputSchema.optional(),
  orderBy: z.union([ UpvoteOrderByWithRelationInputSchema.array(),UpvoteOrderByWithRelationInputSchema ]).optional(),
  cursor: UpvoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UpvoteScalarFieldEnumSchema,UpvoteScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UpvoteAggregateArgsSchema: z.ZodType<Prisma.UpvoteAggregateArgs> = z.object({
  where: UpvoteWhereInputSchema.optional(),
  orderBy: z.union([ UpvoteOrderByWithRelationInputSchema.array(),UpvoteOrderByWithRelationInputSchema ]).optional(),
  cursor: UpvoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UpvoteGroupByArgsSchema: z.ZodType<Prisma.UpvoteGroupByArgs> = z.object({
  where: UpvoteWhereInputSchema.optional(),
  orderBy: z.union([ UpvoteOrderByWithAggregationInputSchema.array(),UpvoteOrderByWithAggregationInputSchema ]).optional(),
  by: UpvoteScalarFieldEnumSchema.array(),
  having: UpvoteScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UpvoteFindUniqueArgsSchema: z.ZodType<Prisma.UpvoteFindUniqueArgs> = z.object({
  select: UpvoteSelectSchema.optional(),
  include: UpvoteIncludeSchema.optional(),
  where: UpvoteWhereUniqueInputSchema,
}).strict()

export const UpvoteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UpvoteFindUniqueOrThrowArgs> = z.object({
  select: UpvoteSelectSchema.optional(),
  include: UpvoteIncludeSchema.optional(),
  where: UpvoteWhereUniqueInputSchema,
}).strict()

export const DownvoteFindFirstArgsSchema: z.ZodType<Prisma.DownvoteFindFirstArgs> = z.object({
  select: DownvoteSelectSchema.optional(),
  include: DownvoteIncludeSchema.optional(),
  where: DownvoteWhereInputSchema.optional(),
  orderBy: z.union([ DownvoteOrderByWithRelationInputSchema.array(),DownvoteOrderByWithRelationInputSchema ]).optional(),
  cursor: DownvoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DownvoteScalarFieldEnumSchema,DownvoteScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const DownvoteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DownvoteFindFirstOrThrowArgs> = z.object({
  select: DownvoteSelectSchema.optional(),
  include: DownvoteIncludeSchema.optional(),
  where: DownvoteWhereInputSchema.optional(),
  orderBy: z.union([ DownvoteOrderByWithRelationInputSchema.array(),DownvoteOrderByWithRelationInputSchema ]).optional(),
  cursor: DownvoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DownvoteScalarFieldEnumSchema,DownvoteScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const DownvoteFindManyArgsSchema: z.ZodType<Prisma.DownvoteFindManyArgs> = z.object({
  select: DownvoteSelectSchema.optional(),
  include: DownvoteIncludeSchema.optional(),
  where: DownvoteWhereInputSchema.optional(),
  orderBy: z.union([ DownvoteOrderByWithRelationInputSchema.array(),DownvoteOrderByWithRelationInputSchema ]).optional(),
  cursor: DownvoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DownvoteScalarFieldEnumSchema,DownvoteScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const DownvoteAggregateArgsSchema: z.ZodType<Prisma.DownvoteAggregateArgs> = z.object({
  where: DownvoteWhereInputSchema.optional(),
  orderBy: z.union([ DownvoteOrderByWithRelationInputSchema.array(),DownvoteOrderByWithRelationInputSchema ]).optional(),
  cursor: DownvoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const DownvoteGroupByArgsSchema: z.ZodType<Prisma.DownvoteGroupByArgs> = z.object({
  where: DownvoteWhereInputSchema.optional(),
  orderBy: z.union([ DownvoteOrderByWithAggregationInputSchema.array(),DownvoteOrderByWithAggregationInputSchema ]).optional(),
  by: DownvoteScalarFieldEnumSchema.array(),
  having: DownvoteScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const DownvoteFindUniqueArgsSchema: z.ZodType<Prisma.DownvoteFindUniqueArgs> = z.object({
  select: DownvoteSelectSchema.optional(),
  include: DownvoteIncludeSchema.optional(),
  where: DownvoteWhereUniqueInputSchema,
}).strict()

export const DownvoteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DownvoteFindUniqueOrThrowArgs> = z.object({
  select: DownvoteSelectSchema.optional(),
  include: DownvoteIncludeSchema.optional(),
  where: DownvoteWhereUniqueInputSchema,
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]).optional(),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()

export const StreamerCreateArgsSchema: z.ZodType<Prisma.StreamerCreateArgs> = z.object({
  select: StreamerSelectSchema.optional(),
  include: StreamerIncludeSchema.optional(),
  data: z.union([ StreamerCreateInputSchema,StreamerUncheckedCreateInputSchema ]),
}).strict()

export const StreamerUpsertArgsSchema: z.ZodType<Prisma.StreamerUpsertArgs> = z.object({
  select: StreamerSelectSchema.optional(),
  include: StreamerIncludeSchema.optional(),
  where: StreamerWhereUniqueInputSchema,
  create: z.union([ StreamerCreateInputSchema,StreamerUncheckedCreateInputSchema ]),
  update: z.union([ StreamerUpdateInputSchema,StreamerUncheckedUpdateInputSchema ]),
}).strict()

export const StreamerDeleteArgsSchema: z.ZodType<Prisma.StreamerDeleteArgs> = z.object({
  select: StreamerSelectSchema.optional(),
  include: StreamerIncludeSchema.optional(),
  where: StreamerWhereUniqueInputSchema,
}).strict()

export const StreamerUpdateArgsSchema: z.ZodType<Prisma.StreamerUpdateArgs> = z.object({
  select: StreamerSelectSchema.optional(),
  include: StreamerIncludeSchema.optional(),
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

export const PlatformCreateArgsSchema: z.ZodType<Prisma.PlatformCreateArgs> = z.object({
  select: PlatformSelectSchema.optional(),
  include: PlatformIncludeSchema.optional(),
  data: z.union([ PlatformCreateInputSchema,PlatformUncheckedCreateInputSchema ]),
}).strict()

export const PlatformUpsertArgsSchema: z.ZodType<Prisma.PlatformUpsertArgs> = z.object({
  select: PlatformSelectSchema.optional(),
  include: PlatformIncludeSchema.optional(),
  where: PlatformWhereUniqueInputSchema,
  create: z.union([ PlatformCreateInputSchema,PlatformUncheckedCreateInputSchema ]),
  update: z.union([ PlatformUpdateInputSchema,PlatformUncheckedUpdateInputSchema ]),
}).strict()

export const PlatformDeleteArgsSchema: z.ZodType<Prisma.PlatformDeleteArgs> = z.object({
  select: PlatformSelectSchema.optional(),
  include: PlatformIncludeSchema.optional(),
  where: PlatformWhereUniqueInputSchema,
}).strict()

export const PlatformUpdateArgsSchema: z.ZodType<Prisma.PlatformUpdateArgs> = z.object({
  select: PlatformSelectSchema.optional(),
  include: PlatformIncludeSchema.optional(),
  data: z.union([ PlatformUpdateInputSchema,PlatformUncheckedUpdateInputSchema ]),
  where: PlatformWhereUniqueInputSchema,
}).strict()

export const PlatformUpdateManyArgsSchema: z.ZodType<Prisma.PlatformUpdateManyArgs> = z.object({
  data: z.union([ PlatformUpdateManyMutationInputSchema,PlatformUncheckedUpdateManyInputSchema ]),
  where: PlatformWhereInputSchema.optional(),
}).strict()

export const PlatformDeleteManyArgsSchema: z.ZodType<Prisma.PlatformDeleteManyArgs> = z.object({
  where: PlatformWhereInputSchema.optional(),
}).strict()

export const UpvoteCreateArgsSchema: z.ZodType<Prisma.UpvoteCreateArgs> = z.object({
  select: UpvoteSelectSchema.optional(),
  include: UpvoteIncludeSchema.optional(),
  data: z.union([ UpvoteCreateInputSchema,UpvoteUncheckedCreateInputSchema ]),
}).strict()

export const UpvoteUpsertArgsSchema: z.ZodType<Prisma.UpvoteUpsertArgs> = z.object({
  select: UpvoteSelectSchema.optional(),
  include: UpvoteIncludeSchema.optional(),
  where: UpvoteWhereUniqueInputSchema,
  create: z.union([ UpvoteCreateInputSchema,UpvoteUncheckedCreateInputSchema ]),
  update: z.union([ UpvoteUpdateInputSchema,UpvoteUncheckedUpdateInputSchema ]),
}).strict()

export const UpvoteDeleteArgsSchema: z.ZodType<Prisma.UpvoteDeleteArgs> = z.object({
  select: UpvoteSelectSchema.optional(),
  include: UpvoteIncludeSchema.optional(),
  where: UpvoteWhereUniqueInputSchema,
}).strict()

export const UpvoteUpdateArgsSchema: z.ZodType<Prisma.UpvoteUpdateArgs> = z.object({
  select: UpvoteSelectSchema.optional(),
  include: UpvoteIncludeSchema.optional(),
  data: z.union([ UpvoteUpdateInputSchema,UpvoteUncheckedUpdateInputSchema ]),
  where: UpvoteWhereUniqueInputSchema,
}).strict()

export const UpvoteUpdateManyArgsSchema: z.ZodType<Prisma.UpvoteUpdateManyArgs> = z.object({
  data: z.union([ UpvoteUpdateManyMutationInputSchema,UpvoteUncheckedUpdateManyInputSchema ]),
  where: UpvoteWhereInputSchema.optional(),
}).strict()

export const UpvoteDeleteManyArgsSchema: z.ZodType<Prisma.UpvoteDeleteManyArgs> = z.object({
  where: UpvoteWhereInputSchema.optional(),
}).strict()

export const DownvoteCreateArgsSchema: z.ZodType<Prisma.DownvoteCreateArgs> = z.object({
  select: DownvoteSelectSchema.optional(),
  include: DownvoteIncludeSchema.optional(),
  data: z.union([ DownvoteCreateInputSchema,DownvoteUncheckedCreateInputSchema ]),
}).strict()

export const DownvoteUpsertArgsSchema: z.ZodType<Prisma.DownvoteUpsertArgs> = z.object({
  select: DownvoteSelectSchema.optional(),
  include: DownvoteIncludeSchema.optional(),
  where: DownvoteWhereUniqueInputSchema,
  create: z.union([ DownvoteCreateInputSchema,DownvoteUncheckedCreateInputSchema ]),
  update: z.union([ DownvoteUpdateInputSchema,DownvoteUncheckedUpdateInputSchema ]),
}).strict()

export const DownvoteDeleteArgsSchema: z.ZodType<Prisma.DownvoteDeleteArgs> = z.object({
  select: DownvoteSelectSchema.optional(),
  include: DownvoteIncludeSchema.optional(),
  where: DownvoteWhereUniqueInputSchema,
}).strict()

export const DownvoteUpdateArgsSchema: z.ZodType<Prisma.DownvoteUpdateArgs> = z.object({
  select: DownvoteSelectSchema.optional(),
  include: DownvoteIncludeSchema.optional(),
  data: z.union([ DownvoteUpdateInputSchema,DownvoteUncheckedUpdateInputSchema ]),
  where: DownvoteWhereUniqueInputSchema,
}).strict()

export const DownvoteUpdateManyArgsSchema: z.ZodType<Prisma.DownvoteUpdateManyArgs> = z.object({
  data: z.union([ DownvoteUpdateManyMutationInputSchema,DownvoteUncheckedUpdateManyInputSchema ]),
  where: DownvoteWhereInputSchema.optional(),
}).strict()

export const DownvoteDeleteManyArgsSchema: z.ZodType<Prisma.DownvoteDeleteManyArgs> = z.object({
  where: DownvoteWhereInputSchema.optional(),
}).strict()