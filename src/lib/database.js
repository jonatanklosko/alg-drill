import Dexie from 'dexie';

const DATABASE_NAME = 'alg-drill';

const db = new Dexie(DATABASE_NAME);

db.version(3).stores({
  drills: `++id,name,algs,planView,mask,colorNeutral`,
});

db.version(4)
  .stores({
    drills: `++id,name,algs,planView,mask,colorNeutral,angles`,
  })
  .upgrade((tx) => {
    tx.drills.toCollection().modify({ angles: [''] });
  });

db.version(5)
  .stores({
    drills: `++id,name,algs,planView,mask,allowedOrientations,angles`,
  })
  .upgrade((tx) => {
    tx.drills.toCollection().modify((drill) => {
      if (drill.colorNeutral) {
        drill.allowedOrientations = ['', 'z2', "x'", 'x', "z'", 'z'];
      } else {
        drill.allowedOrientations = [''];
      }

      delete drill.colorNeutral;
    });
  });

/**
 * Tries to convert to persisted storage.
 *
 * See https://dexie.org/docs/StorageManager
 *
 * @returns {Promise<boolean>} Promise resolved with true if successfully
 * persisted the storage, false if not, and undefined if the API is not present.
 */
export async function persistStorage() {
  if (navigator.storage && navigator.storage.persist) {
    return await navigator.storage.persist();
  } else {
    return undefined;
  }
}

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
