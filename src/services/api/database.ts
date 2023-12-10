import * as sqlite3 from 'sqlite3'

class DatabaseService {
  private db: sqlite3.Database

  constructor(dbFilePath: string) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.error('Error opening database:', err.message)
      } else {
        console.log('Connected to the database')
      }
    })
  }

  connect() {
    // This method is added to satisfy TypeScript
  }

  closeConnection() {
    this.db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message)
      } else {
        console.log('Closed the database connection')
      }
    })
  }

  createTable(tableName: string) {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT
      );
    `

    this.db.run(createTableQuery, (err) => {
      if (err) {
        console.error('Error creating table:', err.message)
      } else {
        console.log(`Table ${tableName} created successfully`)
      }
    })
  }

  insertItem(tableName: string, name: string, description: string) {
    const insertQuery = `INSERT INTO ${tableName} (name, description) VALUES (?, ?)`

    this.db.run(insertQuery, [name, description], function (err) {
      if (err) {
        console.error(`Error inserting item into ${tableName}:`, err.message)
      } else {
        console.log(
          `Item inserted into ${tableName} successfully with ID:`,
          this.lastID,
        )
      }
    })
  }

  getAllItems(tableName: string, callback: (items: any[]) => void) {
    const selectQuery = `SELECT * FROM ${tableName}`

    this.db.all(selectQuery, [], (err, rows) => {
      if (err) {
        console.error(`Error selecting items from ${tableName}:`, err.message)
        callback([])
      } else {
        callback(rows)
      }
    })
  }
}

export default DatabaseService
