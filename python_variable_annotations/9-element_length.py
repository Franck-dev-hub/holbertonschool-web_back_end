#!/usr/bin/env python3
"""
9-element_length.py
"""
from typing import Iterable, Sequence, List, Tuple


def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """
    element length function
    """
    return [(i, len(i)) for i in lst]
