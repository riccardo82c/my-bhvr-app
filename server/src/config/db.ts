import mongoose from 'mongoose'

export const connectDatabase = async (): Promise<void> => {

  const mongoUri = process.env.MONGO_URI

  try {
    await mongoose.connect(mongoUri as string)
    console.log('Connesso a MongoDB')
  } catch (err) {
    console.error('Errore di connessione a MongoDB:', err)
    process.exit(1) // Termina l'applicazione in caso di errore
  }
}
