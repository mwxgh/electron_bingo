import { v4 as uuidv4 } from 'uuid'
import { Test, TestResult, User } from '@/types/common/database'
import { db } from './configDB'

type Entity = User | Test | TestResult
type EntityType = 'users' | 'tests' | 'testResults'

export const createEntity = async <T extends Entity>(
  entity: Omit<T, 'uuid'>,
  entityType: EntityType,
) => {
  const newEntity: T = { ...entity, uuid: uuidv4() } as T

  switch (entityType) {
    case 'users':
      db.data.users.push(newEntity as User)
      break
    case 'tests':
      db.data.tests.push(newEntity as Test)
      break
    case 'testResults':
      db.data.testResults.push(newEntity as TestResult)
      break
    default:
      throw new Error('Invalid entity type')
  }

  await db.write()

  return newEntity
}

export const bulkCreateEntity = async <T extends Entity>(
  entities: Omit<T, 'uuid'> | Omit<T, 'uuid'>[],
  entityType: EntityType,
) => {
  const entityList = Array.isArray(entities) ? entities : [entities]

  const newEntities = entityList.map((entity) => ({
    ...entity,
    uuid: uuidv4(),
  })) as T[]

  switch (entityType) {
    case 'users':
      db.data.users.push(...(newEntities as User[]))
      break
    case 'tests':
      db.data.tests.push(...(newEntities as Test[]))
      break
    case 'testResults':
      db.data.testResults.push(...(newEntities as TestResult[]))
      break
    default:
      throw new Error('Invalid entity type')
  }

  await db.write()

  return newEntities
}

export const getEntities = async (entityType: EntityType, keyword?: string) => {
  await db.read()

  if (keyword) {
    const filteredEntities = db.data[entityType].filter((entity) => {
      return Object.values(entity).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(keyword.toLowerCase()),
      )
    })

    return filteredEntities
  } else {
    return db.data[entityType]
  }
}

export const getEntityById = async (entityType: EntityType, uuid: string) => {
  await db.read()
  const entity = db.data[entityType].find((entity) => entity.uuid === uuid)

  return entity || null
}

export const updateEntity = async (
  entityType: EntityType,
  uuid: string,
  updatedEntityData: Partial<Entity>,
) => {
  await db.read()

  const entityToUpdate = db.data[entityType].find(
    (entity) => entity.uuid === uuid,
  )

  if (entityToUpdate) {
    Object.assign(entityToUpdate, updatedEntityData)

    await db.write()

    return entityToUpdate
  } else {
    return null
  }
}

export const deleteEntity = async (entityType: EntityType, uuid: string) => {
  await db.read()

  const entityIndex = db.data[entityType].findIndex(
    (entity) => entity.uuid === uuid,
  )

  if (entityIndex !== -1) {
    db.data[entityType].splice(entityIndex, 1)
    await db.write()

    return true
  } else {
    return false
  }
}
