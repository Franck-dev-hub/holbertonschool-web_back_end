#!/usr/bin/env python3
"""
101-students.py
"""


def top_students(mongo_collection):
    """
    top students function
    """
    students_with_avg = []

    for student in mongo_collection.find():
        topics = student.get("topics", [])
        if topics:
            total_score = sum(topic.get("score", 0) for topic in topics)
            avg_score = total_score / len(topics)
        else:
            avg_score = 0

        student_with_avg = student.copy()
        student_with_avg["averageScore"] = avg_score
        students_with_avg.append(student_with_avg)

    students_with_avg.sort(key=lambda x: x["averageScore"], reverse=True)

    return students_with_avg
