# Guide Éducatif : Pagination de Données
## Introduction
La pagination est une technique fondamentale en développement d'API et d'applications web. Elle permet de découper de grandes collections de données en morceaux gérables, améliorant ainsi les performances et l'expérience utilisateur.

Ce guide couvre trois approches de pagination progressivement plus sophistiquées.

---

## 1. Pagination Simple avec Page et Page_Size
### Concept

La pagination simple utilise deux paramètres :
- **page** : le numéro de la page (généralement en commençant à 1)
- **page_size** : le nombre d'éléments par page

### Exemple d'Utilisation
```http
GET /api/articles?page=2&page_size=10
```

Cette requête récupère les articles 11 à 20.

### Implémentation côté serveur (pseudocode)
```javascript
function getArticles(page, pageSize) {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const allArticles = database.getAllArticles();
  const paginatedArticles = allArticles.slice(startIndex, endIndex);

  return {
    data: paginatedArticles,
    page: page,
    pageSize: pageSize,
    total: allArticles.length
  };
}
```

### Réponse Typique
```json
{
  "data": [
    { "id": 11, "title": "Article 11" },
    { "id": 12, "title": "Article 12" }
  ],
  "page": 2,
  "pageSize": 10,
  "total": 147,
  "totalPages": 15
}
```

### Avantages
- Simple à comprendre et implémenter
- Facile pour le client de naviguer directement à une page précise

### Inconvénients
- Requiert de calculer l'index de départ à chaque fois
- Performance dégradée pour les grandes pages (pagination profonde)
- Imprévisible si les données changent entre les requêtes

---

## 2. Pagination avec Métadonnées Hypermedia
### Concept
Cette approche enrichit la réponse avec des liens navigables (curseurs) qui pointent directement vers les pages suivante, précédente, première et dernière. Elle suit le principe HATEOAS (Hypertext As The Engine Of Application State).

### Exemple de Requête
```http
GET /api/articles?page=2&page_size=10
```

### Réponse avec Hypermedia

```json
{
  "data": [
    { "id": 11, "title": "Article 11" },
    { "id": 12, "title": "Article 12" }
  ],
  "pagination": {
    "page": 2,
    "pageSize": 10,
    "total": 147,
    "totalPages": 15
  },
  "_links": {
    "self": {
      "href": "/api/articles?page=2&page_size=10"
    },
    "first": {
      "href": "/api/articles?page=1&page_size=10"
    },
    "prev": {
      "href": "/api/articles?page=1&page_size=10"
    },
    "next": {
      "href": "/api/articles?page=3&page_size=10"
    },
    "last": {
      "href": "/api/articles?page=15&page_size=10"
    }
  }
}
```

### Implémentation

```javascript
function buildPaginationLinks(page, pageSize, total) {
  const totalPages = Math.ceil(total / pageSize);
  const links = {};

  links.self = `/api/articles?page=${page}&page_size=${pageSize}`;
  links.first = `/api/articles?page=1&page_size=${pageSize}`;
  links.last = `/api/articles?page=${totalPages}&page_size=${pageSize}`;

  if (page > 1) {
    links.prev = `/api/articles?page=${page - 1}&page_size=${pageSize}`;
  }

  if (page < totalPages) {
    links.next = `/api/articles?page=${page + 1}&page_size=${pageSize}`;
  }

  return links;
}
```

### Avantages
- Client n'a pas besoin de connaître la logique de pagination
- Facile à évoluer sans casser les clients
- Découverte des liens disponibles directement dans la réponse

### Inconvénients
- Réponse plus volumineuse
- Calcul d'index toujours coûteux pour les pages lointaines

---

## 3. Pagination Résiliente aux Suppressions (Cursor-based)
### Concept
La pagination basée sur les curseurs utilise un marqueur (ID, timestamp, etc.) au lieu d'un numéro de page. Cela la rend résistante aux suppressions de données qui peuvent décaler les indices.

### Exemple de Requête
```http
GET /api/articles?cursor=eyJpZCI6IDUwfQ==&page_size=10
```

Le curseur est généralement un token encodé contenant l'ID du dernier élément vu.

### Réponse avec Cursor
```json
{
  "data": [
    { "id": 51, "title": "Article 51" },
    { "id": 52, "title": "Article 52" }
  ],
  "_links": {
    "next": {
      "href": "/api/articles?cursor=eyJpZCI6IDYwfQ==&page_size=10"
    },
    "prev": {
      "href": "/api/articles?cursor=eyJpZCI6IDQwfQ==&page_size=10"
    }
  }
}
```

### Implémentation
```javascript
function decodeCursor(cursor) {
  return JSON.parse(Buffer.from(cursor, 'base64').toString());
}

function encodeCursor(obj) {
  return Buffer.from(JSON.stringify(obj)).toString('base64');
}

function getArticlesWithCursor(cursor, pageSize, direction = 'next') {
  let query = direction === 'next' ? { id: { $gt: cursor.id } } : { id: { $lt: cursor.id } };

  const articles = database.find(query).limit(pageSize + 1);

  const result = {
    data: articles.slice(0, pageSize),
    _links: {}
  };

  if (articles.length > pageSize) {
    const lastId = articles[pageSize - 1].id;
    result._links.next = {
      href: `/api/articles?cursor=${encodeCursor({ id: lastId })}&page_size=${pageSize}`
    };
  }

  if (cursor) {
    result._links.prev = {
      href: `/api/articles?cursor=${encodeCursor({ id: articles[0].id - 1 })}&page_size=${pageSize}`
    };
  }

  return result;
}
```

### Avantages
- **Résistant aux suppressions** : même si une donnée est supprimée, le curseur reste valide
- **Performance constant** : pas d'impact quelle que soit la position
- Idéal pour les flux infinis (infinite scroll)
- Pas de calcul d'index côté serveur

### Inconvénients
- Impossible de sauter directement à une page précise
- Pas de "nombre total" d'éléments facile à communiquer
- Curseur doit être maintenu par le client

---

## Bonnes Pratiques
1. **Définir une taille de page par défaut** : généralement 20-50 éléments
2. **Limiter la taille maximale** : éviter que le client demande 10 000 éléments à la fois
3. **Valider les paramètres** : vérifier que page > 0 et pageSize est raisonnable
4. **Documenter le format** : soyez clair sur le type de pagination utilisée
5. **Cacher l'implémentation interne** : les clients ne doivent pas construire les URLs manuellement
6. **Supporter les tris** : permettre `sort=date&order=desc` en combination avec la pagination
