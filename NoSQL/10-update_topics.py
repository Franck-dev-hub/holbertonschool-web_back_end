#!/usr/bin/env python3
"""
10-update-topics.py
"""


def update_topics(mongo_collection, name, topics):
    """
    update topics function
    """
    return mongo_collection.update_many(
            {"name": name},
            {"$set": {"topics": [topic for topic in topics]}}
            )
