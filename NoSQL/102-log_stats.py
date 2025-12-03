#!/usr/bin/env python3
"""
102-log-stats.py
"""
from pymongo import MongoClient


def log_stats():
    """
    log stats function
    """
    # Localhost connexion
    client = MongoClient("mongodb://127.0.0.1:27017")
    collection = client.logs.nginx

    # Get total logs
    total_logs = collection.count_documents({})
    print("{} logs".format(total_logs))

    # Get stats by HHTP method
    print("Methods:")
    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    for method in methods:
        count = collection.count_documents({"method": method})
        print("\tmethod {}: {}".format(method, count))

    # Count GET requests
    status_count = collection.count_documents({
        "method": "GET",
        "path": "/status"
        })
    print("{} status check".format(status_count))

    # Get top 10 IPs
    print("IPs:")
    ips = [
            {"$group": {"_id": "$ip", "count": {"$sum": 1}}}, # Count by id
            {"$sort": {"count": -1}}, # Sort by descending number
            {"$limit": 10} # Get onbly 10 firsts
            ]

    for entry in collection.aggregate(ips):
        print("\t{}: {}".format(entry["_id"], entry["count"]))

if __name__ == "__main__":
    log_stats()
