#!/usr/bin/env python3
"""
11-schools-by-topics.py
"""


def schools_by_topic(mongo_collection, topic):
    """
    schools by topics function
    """
    return mongo_collection.find({"topics": topic})
