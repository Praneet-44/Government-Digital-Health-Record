import { connectToDatabase } from './_lib/mongodb.js';

const COLLECTION_MAP = {
  patients: 'citizens',
  doctors: 'doctors',
  verificationQueue: 'verificationQueue',
  auditLogs: 'auditLogs',
};

function stripId({ _id, ...rest }) {
  return rest;
}

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();

    if (req.method === 'GET') {
      const [patients, doctors, verificationQueue, auditLogs, meta] = await Promise.all([
        db.collection('citizens').find({}).toArray(),
        db.collection('doctors').find({}).toArray(),
        db.collection('verificationQueue').find({}).toArray(),
        db.collection('auditLogs').find({}).toArray(),
        db.collection('meta').findOne({ key: 'triage' }),
      ]);

      return res.status(200).json({
        patients: patients.map(stripId),
        doctors: doctors.map(stripId),
        verificationQueue: verificationQueue.map(stripId),
        auditLogs: auditLogs.map(stripId),
        meta: { triageRedFlagsCount: meta?.triageRedFlagsCount ?? 0 },
      });
    }

    if (req.method === 'POST') {
      const { meta } = req.body || {};

      for (const [field, collectionName] of Object.entries(COLLECTION_MAP)) {
        const docs = req.body?.[field];
        if (Array.isArray(docs)) {
          await db.collection(collectionName).deleteMany({});
          if (docs.length > 0) {
            await db.collection(collectionName).insertMany(docs);
          }
        }
      }

      if (meta && typeof meta.triageRedFlagsCount === 'number') {
        await db.collection('meta').updateOne(
          { key: 'triage' },
          { $set: { triageRedFlagsCount: meta.triageRedFlagsCount } },
          { upsert: true }
        );
      }

      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err) {
    console.error('MongoDB API error:', err);
    return res.status(500).json({ error: err.message });
  }
}