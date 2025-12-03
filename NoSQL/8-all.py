#!/usr/bin/env python3
"""
8-all.py
"""


def list_all(mongo_collection):
    """
    list all function
    """
    return mongo_collection.find()
