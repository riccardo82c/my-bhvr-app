// shared/src/schemas/index.ts
export * from './todo'
export * from './user'

// Puoi anche aggiungere tipi o schemi comuni qui
export interface WithId {
  _id: string
}

export interface WithTimestamps {
  createdAt: Date
  updatedAt?: Date
}
