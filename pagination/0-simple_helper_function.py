#!/usr/bin/env python3
"""
0-simple_helper_function.py
"""


def index_range(page: int, page_size: int) -> tuple[int, int]:
    """
    index_range function
    """
    return (page_size * (page - 1), page_size * page)
