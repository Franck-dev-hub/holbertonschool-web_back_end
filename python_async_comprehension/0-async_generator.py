#!/usr/bin/env python3
"""
0-async_generator.py
"""
import asyncio
from random import uniform
from typing import AsyncGenerator


async def async_generator() -> AsyncGenerator[float, None]:
    """
    async generator function
    """
    for i in range(10):
        await asyncio.sleep(1)
        yield uniform(0, 10)
