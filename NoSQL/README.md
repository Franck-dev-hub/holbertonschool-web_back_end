# NoSQL Database Guide
## What NoSQL Means
NoSQL stands for "Not Only SQL" ou "Non-Relational SQL".
C'est une catégorie de bases de données qui s'écarte du modèle relationnel traditionnel.
Les bases NoSQL sont conçues pour gérer des données non structurées avec flexibilité et scalabilité.

## SQL vs NoSQL
| Aspect | SQL | NoSQL |
|--------|-----|-------|
| **Modèle** | Relationnel (tables, lignes, colonnes) | Flexible (documents, clés-valeurs, graphes) |
| **Schéma** | Fixe | Dynamique |
| **Scalabilité** | Verticale | Horizontale |
| **Transactions** | ACID | Cohérence finale |
| **Exemples** | PostgreSQL, MySQL | MongoDB, Cassandra, Redis |

## Qu'est-ce que ACID ?
ACID garantit des transactions fiables:
- **Atomicité**: Tout ou rien — soit la transaction complète, soit elle est annulée.
- **Cohérence**: La base passe d'un état valide à un autre.
- **Isolation**: Les transactions concurrentes ne s'interfèrent pas.
- **Durabilité**: Une fois validée, la donnée persiste définitivement.

## Qu'est-ce que le Document Storage ?
Le document storage organise les données comme des documents (JSON, BSON) plutôt que des lignes.
Chaque document est autonome et peut contenir des structures imbriquées et des tableaux.

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "address": { "city": "Paris", "zipcode": "75001" }
}
```

## Types de Bases NoSQL
- **Document** : MongoDB, CouchDB (données structurées en documents)
- **Clé-Valeur** : Redis, Memcached (récupération rapide)
- **Colonnes** : Cassandra, HBase (requêtes analytiques)
- **Graphes** : Neo4j (relations et connexions)
- **Moteurs de recherche** : Elasticsearch (recherche textuelle)

## Avantages des Bases NoSQL
- **Scalabilité horizontale** : Augmente en ajoutant des serveurs
- **Flexibilité** : Pas de schéma rigide
- **Performance** : Optimisée pour des cas spécifiques
- **Haute disponibilité** : Réplication intégrée
- **Gestion du Big Data** : Conçue pour de grands volumes
- **Économique** : Fonctionne sur du matériel standard

## Comment Interroger les Données ?
Avec MongoDB, les requêtes trouvent des documents basés sur des critères.
Par exemple, trouver tous les utilisateurs d'une ville, filtrer par âge, ou chercher un email spécifique.
Les résultats peuvent être limités à certains champs.

## Comment Insérer/Modifier/Supprimer ?
Les opérations principales sont :
- **Insérer** : Ajouter un ou plusieurs documents
- **Modifier** : Mettre à jour des champs dans des documents existants
- **Remplacer** : Substituer un document complet
- **Supprimer** : Effacer un ou plusieurs documents

---

## Résumé
Les bases NoSQL offrent une alternative flexible et scalable aux bases SQL traditionnelles.
Elles excellent pour gérer des données variées et peuvent être déployées sur plusieurs serveurs.
MongoDB est l'une des options NoSQL les plus populaires pour les applications modernes.
