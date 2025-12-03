#!/usr/bin/env python3
"""
12-log-stats.py
"""
from pymongo import MongoClient


def log_stats():
    """
    log stats function
    """
    client = MongoClient("mongodb://127.0.0.1:27017")
    collection = client.logs.nginx

    total_logs = collection.count_documents({})
    print("{} logs".format(total_logs))

    print("Methods:")
    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    for method in methods:
        count = collection.count_documents({"method": method})
        print("\tmethod {}: {}".format(method, count))

    status_count = collection.count_documents({
        "method": "GET",
        "path": "/status"
        })
    print("{} status check".format(status_count))


if __name__ == "__main__":
    log_stats()
