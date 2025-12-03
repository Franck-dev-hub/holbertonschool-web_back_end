# NoSQL
## What NoSQL Means
NoSQL stands for "Not Only SQL" and refers to a class of database management systems that differ from traditional relational databases.
These databases are designed to handle large volumes of unstructured or semi-structured data and are optimized for scalability, flexibility, and high performance in distributed environments.

## SQL vs NoSQL
| Aspect | SQL | NoSQL |
|--------|-----|-------|
| **Data Structure** | Structured, organized in tables with predefined schemas | Flexible, can store unstructured or semi-structured data |
| **Scalability** | Vertical scaling (adding more power to a single server) | Horizontal scaling (distributing across multiple servers) |
| **Queries** | Uses SQL language with JOIN operations | Database-specific query languages or APIs |
| **Schema** | Rigid schema that must be defined beforehand | Flexible schema that can evolve over time |
| **Transactions** | ACID transactions natively supported | BASE model; some NoSQL databases now support transactions |
| **Data Integrity** | Enforced through constraints and relationships | Relaxed in favor of availability and partition tolerance |
| **Use Cases** | Complex relationships, financial systems, structured data | Real-time analytics, content management, IoT data |

## What is ACID
ACID is an acronym for four key properties that guarantee reliable database transactions:
- **Atomicity**: A transaction is all-or-nothing. Either all operations in the transaction complete successfully, or none of them do. If an error occurs halfway through, the entire transaction is rolled back.
- **Consistency**: A transaction transforms the database from one valid state to another. All data integrity rules and constraints are maintained before and after the transaction.
- **Isolation**: Concurrent transactions don't interfere with each other. Each transaction executes independently, and intermediate states from one transaction aren't visible to others until it's committed.
- **Durability**: Once a transaction is committed, the changes are permanent, even in case of system failures, power outages, or crashes. The data is safely stored and recoverable.

## Document Storage
Document storage is a database model where data is stored as documents (typically in JSON, BSON, or XML format) rather than in traditional rows and columns. Each document is a self-contained unit containing all related data needed for that entity.

**Key characteristics:**
- Data is organized in collections of documents
- Each document can have a different structure (schema-less)
- Documents contain nested data and arrays
- Easy to represent hierarchical information
- Suitable for representing complex, real-world objects

**Example document:**
```json
{
  "_id": 1,
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA"
  },
  "orders": [101, 102, 103],
  "active": true
}
```

## NoSQL Types
**1. Document Databases**
Store data as documents (JSON-like format). Examples: MongoDB, CouchDB, Firebase
- Best for: Content management, user profiles, variable data structures

**2. Key-Value Stores**
Store data as simple key-value pairs. Examples: Redis, Memcached, DynamoDB
- Best for: Caching, sessions, real-time analytics

**3. Column-Family Stores**
Store data organized by columns rather than rows. Examples: Cassandra, HBase
- Best for: Time-series data, analytics, massive datasets

**4. Graph Databases**
Store data as nodes and relationships/edges. Examples: Neo4j, Amazon Neptune
- Best for: Social networks, recommendation engines, knowledge graphs

**5. Search Engines**
Optimized for full-text search and complex queries. Examples: Elasticsearch, Solr
- Best for: Full-text search, logging, analytics dashboards

## Benefits of NoSQL Databases
**Scalability**: Designed for horizontal scaling across distributed systems, making them suitable for handling massive amounts of data.

**Flexibility**: Schema-less design allows data structures to evolve without migrations, accommodating changing requirements.

**Performance**: Optimized for specific access patterns, often providing faster read/write operations for particular use cases.

**High Availability**: Built-in replication and fault tolerance ensure data availability even if some nodes fail.

**Developer-Friendly**: Data models often align naturally with programming languages (JSON documents match object structures).

**Cost-Effective**: Can run on commodity hardware and distribute load across multiple servers efficiently.

**Variety of Models**: Different types serve different needs—choose the model that best fits your use case.

## Querying NoSQL Databases
Query methods vary by NoSQL type, but here are common approaches:

**Document Databases (MongoDB example):**
```javascript
// Find all active users
db.users.find({ active: true });

// Find with specific fields
db.users.find({ active: true }, { name: 1, email: 1 });

// Complex queries
db.users.find({
  age: { $gt: 25 },
  city: "New York"
});
```

**Key-Value Stores:**
```javascript
// Simple retrieval by key
GET user:123

// Set a value
SET user:123 "John Doe"
```

**Graph Databases:**
```cypher
// Cypher query for Neo4j
MATCH (user:User {name: "Alice"})-[:PURCHASED]->(product:Product)
RETURN user, product
```

**Filtering and Aggregation:**
Most NoSQL databases support aggregation pipelines for complex queries:
```javascript
// MongoDB aggregation
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$customer_id", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } }
]);
```

## Insert, Update, Delete Operations
**MongoDB Examples:**

**Insert:**
```javascript
// Insert single document
db.users.insertOne({
  name: "Bob Smith",
  email: "bob@example.com",
  age: 30
});

// Insert multiple documents
db.users.insertMany([
  { name: "Carol", age: 28 },
  { name: "David", age: 35 }
]);
```

**Update:**
```javascript
// Update single document
db.users.updateOne(
  { _id: 1 },
  { $set: { email: "newemail@example.com" } }
);

// Update multiple documents
db.users.updateMany(
  { age: { $lt: 30 } },
  { $set: { status: "young" } }
);

// Replace entire document
db.users.replaceOne(
  { _id: 1 },
  { name: "Alice", email: "alice@new.com", age: 28 }
);
```

**Delete:**
```javascript
// Delete single document
db.users.deleteOne({ _id: 1 });

// Delete multiple documents
db.users.deleteMany({ age: { $lt: 18 } });

// Delete all documents in collection
db.users.deleteMany({});
```

## How to Use MongoDB
**Using MongoDB Shell (mongo):**

```javascript
// Connect to database
mongo

// Show databases
show dbs

// Select database
use myapp

// Show collections
show collections

// Basic operations
db.users.find();
db.users.findOne({ name: "John" });
db.users.insertOne({ name: "Jane", age: 28 });
db.users.updateOne({ _id: ObjectId("...") }, { $set: { age: 29 } });
db.users.deleteOne({ _id: ObjectId("...") });
```

**Key MongoDB Concepts:**

Collections are equivalent to tables, containing documents instead of rows.
Documents are JSON-like objects with flexible schemas.
The _id field is a unique identifier automatically created for each document.
Indexes improve query performance on frequently searched fields.
Aggregation pipelines allow complex data processing and transformation operations.

MongoDB supports replication (creating copies across multiple servers) and sharding (distributing data across multiple servers for horizontal scaling) for production environments.
