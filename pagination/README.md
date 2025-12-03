# Pagination in Python
## Simple Page and Page_Size Pagination
Simple pagination divides a dataset into fixed-size pages and allows clients to request specific pages using `page` and `page_size` parameters.

**How It Works:**
- Client requests a specific page number and items per page
- Server calculates the offset: `offset = (page - 1) * page_size`
- Server retrieves items from offset to offset + page_size
- Server returns the requested items

**Request Example:**
```
GET /api/users?page=2&page_size=10
```

**Advantages:**
- Simple to understand and implement
- Works well for small to medium datasets
- Clients know exactly how many pages exist

**Disadvantages:**
- Performance degrades with large offsets (database has to skip many rows)
- Inefficient when data changes between requests
- Items can appear twice or be skipped if deletions occur while paginating

## Pagination with Hypermedia Metadata
Hypermedia pagination uses links in the response to navigate between pages, following REST principles.
Clients don't need to construct URLs, they follow provided links instead.

**How It Works:**
- Server provides navigation links in response (`first`, `previous`, `next`, `last`)
- Client follows these links to navigate pages
- Reduces client logic and allows server to change URL structure
- More aligned with RESTful API design

**Advantages:**
- RESTful and follows hypermedia principles
- Client doesn't need to construct URLs
- Server can change pagination structure without breaking clients
- Cleaner client-side code

**Disadvantages:**
- Slightly more complex response structure
- Still suffers from the same issues with data changes between requests
- Not ideal for high-frequency API calls (extra link data)

## Deletion-Resilient Pagination (Cursor-Based)
Cursor-based pagination uses a pointer (cursor) to mark a position in the dataset, making it resilient to insertions and deletions.
Instead of page numbers, clients use an opaque token that references a specific item.

**How It Works:**
- Server provides an encoded cursor token pointing to an item
- Client uses this cursor to fetch the next set of items
- Cursor typically encodes the last item's ID or timestamp
- Unaffected by items being added or removed before the cursor position
- More efficient for large datasets

**Advantages:**
- Completely resilient to insertions and deletions
- Efficient even with very large datasets
- No performance degradation with offset growth
- Ideal for infinite scroll patterns
- Works well for real-time data that changes frequently

**Disadvantages:**
- Cannot jump to arbitrary pages (must go sequentially)
- Cursor is opaque to clients (they can't modify it)
- Slightly more complex to implement
- No concept of "total pages" available

## Comparison Summary
| Feature | Simple Pagination | Hypermedia | Cursor-Based |
|---------|-------------------|-----------|--------------|
| **Complexity** | Low | Medium | Medium-High |
| **Performance** | Degrades with offset | Degrades with offset | Consistent |
| **Deletion-Resilient** | No | No | Yes |
| **Jump to Page** | Yes | Yes | No |
| **RESTful** | Somewhat | Yes | Somewhat |
| **Best For** | Small datasets, UI with page numbers | APIs following REST, medium datasets | Large datasets, real-time data, infinite scroll |

Choose simple pagination for basic use cases, hypermedia for RESTful APIs, and cursor-based pagination for high-performance systems with frequently changing data.
