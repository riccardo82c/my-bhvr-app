import mongoose from 'mongoose'

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI!)
    console.log('Connesso a MongoDB')
  } catch (err) {
    console.error('Errore di connessione a MongoDB:', err)
    process.exit(1) // Termina l'applicazione in caso di errore
  }
}
