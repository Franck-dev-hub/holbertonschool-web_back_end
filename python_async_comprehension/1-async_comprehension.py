#!/usr/bin/env python3
"""
1-async_comprehension.py
"""

async_generator = __import__("0-async_generator").async_generator


async def async_comprehension():
    """
    async comprehension function
    """
    return ([x async for x in async_generator()])
