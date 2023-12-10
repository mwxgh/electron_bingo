import DatabaseService from '@/services/api/database'
import { useEffect } from 'react'

const CheckService = () => {
  useEffect(() => {
    // Create an instance of DatabaseService
    const dbService = new DatabaseService('database/database.db')

    // Connect to the database
    dbService.connect()

    // Create the table when the component mounts
    dbService.createTable('testTable')

    // Close the database connection when the component unmounts
    return () => {
      dbService.closeConnection()
    }
  }, []) // The empty dependency array ensures that the effect runs once after the initial render

  return (
    <div>
      <h1>Your React App</h1>
      {/* Other components */}
    </div>
  )
}

export default CheckService
