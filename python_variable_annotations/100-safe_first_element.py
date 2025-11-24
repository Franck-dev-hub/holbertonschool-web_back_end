#!/usr/bin/env python3
"""
100-safe_first_element.py
"""
from typing import Sequence, Any, Optional


def safe_first_element(lst: Sequence[Any]) -> Optional[Any]:
    """
    safe first element function
    """
    if lst:
        return lst[0]
    else:
        return None
