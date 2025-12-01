# Python - Annotations de Variables et Typage

## Les annotations de type en Python 3
Depuis Python 3, il est possible d’ajouter des annotations de type pour rendre le code plus lisible, plus robuste et plus facile à maintenir.

Elles n'ont aucune incidence à l’exécution (Python reste dynamiquement typé), mais sont utiles pour :
- Documenter l’intention du développeur.
- Outiller les IDE pour l’autocomplétion.
- Permettre l’analyse statique avec des outils comme mypy.
- Réduire les erreurs en production.

### Exemple simple :
```python
age: int = 25
name: str = "Alice"
height: float = 1.70
is_admin: bool = False
```

### Annotations pour des structures complexes :
```python
from typing import List, Dict, Tuple, Optional

scores: List[int] = [10, 15, 18]
config: Dict[str, str] = {"env": "prod"}
point: Tuple[int, int] = (10, 40)
nickname: Optional[str] = None
```

## Annoter les signatures de fonctions
### Les annotations s’appliquent aussi aux paramètres et à la valeur de retour d'une fonction :
```python
def greet(name: str) -> str:
    return f"Hello, {name}!"
```

### Exemple avec plusieurs types :
```python
from typing import List

def average(values: List[float]) -> float:
    return sum(values) / len(values)
```

### Paramètres optionnels et valeurs par défaut :
```python
from typing import Optional

def find_user(id: int, fallback: Optional[str] = None) -> Optional[str]:
    ...
```

### Fonctions sans valeur de retour :
```python
def log(message: str) -> None:
    print(message)
```

## Duck Typing : “Si ça marche comme un canard…”
Python repose sur le duck typing, un concept qui dit :

> Si un objet se comporte comme un canard (qu'il “fait coin-coin”), alors c’est un canard.

Autrement dit : ce n’est pas le type de l’objet qui compte, mais ce qu’il sait faire.

Exemple :
```python
class Duck:
    def quack(self):
        print("Coin !")

class Person:
    def quack(self):
        print("La personne imite un canard.")

def make_it_quack(obj):
    obj.quack()  # On ne vérifie pas le type
```

Les deux objets fonctionneront dans make_it_quack(), car ils possèdent la méthode quack().

### Typage structurel (Protocol)
Depuis Python 3.8, via typing.Protocol, on peut tirer parti du duck typing tout en gardant le typage statique :

```python
from typing import Protocol

class Quackable(Protocol):
    def quack(self) -> None:
        ...

def make_it_quack(obj: Quackable) -> None:
    obj.quack()
```

## Valider votre code avec mypy
mypy est un outil d'analyse statique qui vérifie que les annotations de type sont cohérentes dans votre code.

Installation :
```bash
pip install mypy
```

Lancer une vérification :
```bash
mypy mon_fichier.py
```

Exemple d’erreur détectée :
```python
def add(a: int, b: int) -> int:
    return a + b

add("5", 3)
```

Sortie :
```bash
error: Argument 1 to "add" has incompatible type "str"; expected "int"
```

### Configuration (optionnelle)
Créer un fichier mypy.ini :
```ini
[mypy]
strict = True
ignore_missing_imports = True
```

## Résumé
- Variable Annotations -> Documenter les types des variables
- Function Signatures -> Spécifier les types des paramètres et valeurs de retour
- Duck Typing -> Typage dynamique basé sur le comportement, pas la nature
- mypy -> Vérification statique pour renforcer la fiabilité du code

## Conclusion
Les annotations de type en Python apportent une couche de clarté, de robustesse et de professionnalisme à votre code, sans renoncer à la flexibilité qui fait la force de Python. Associées à un outil comme mypy, elles permettent de détecter de nombreuses erreurs avant l'exécution, tout en conservant la philosophie du duck typing.
