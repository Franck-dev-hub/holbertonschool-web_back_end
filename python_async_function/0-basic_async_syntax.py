#!/usr/bin/env python
"""
0-basic_async_syntax.py
"""
import asyncio
from random import uniform as rdm


async def wait_random(max_delay: int = 10) -> float:
    """
    wait random function
    """
    delay = rdm(0, max_delay)
    await asyncio.sleep(delay)
    return (delay)
