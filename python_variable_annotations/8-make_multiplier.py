#!/usr/bin/env python3
"""
8-make_multiplier.py
"""
from typing import Callable


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """
    make multiplier function
    """
    def function(n: float) -> float:
        return (n * multiplier)

    return (function)
