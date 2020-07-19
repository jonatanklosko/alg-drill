import Dexie from 'dexie';

const DATABASE_NAME = 'alg-drill';

const db = new Dexie(DATABASE_NAME);

db.version(1).stores({
  drills: `++id,name,algs,topView,stage`,
});

export async function getDrills() {
  return await db.drills.toArray();
}

export async function getDrill(id) {
  return await db.drills.get(id);
}

export async function createDrill(attrs) {
  const id = await db.drills.add(attrs);
  return { ...attrs, id };
}

export async function updateDrill(id, attrs) {
  await db.drills.update(id, attrs);
}

export async function deleteDrill(id) {
  await db.drills.delete(id);
}
