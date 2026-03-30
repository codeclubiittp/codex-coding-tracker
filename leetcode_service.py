import httpx

LEETCODE_URL = "https://leetcode.com/graphql"

async def get_leetcode_stats(username: str):
    query = """
    query userProblemsSolved($username: String!) {
        allQuestionsCount {
            difficulty
            count
        }
        matchedUser(username: $username) {
            submitStatsGlobal {
                acSubmissionNum {
                    difficulty
                    count
                }
            }
        }
    }
    """
    variables = {"username": username}

    async with httpx.AsyncClient(timeout=20.0) as client:
        response = await client.post(
            LEETCODE_URL, 
            json={"query": query, "variables": variables}
        )
        
        if response.status_code != 200:
            return None
            
        data = response.json()["data"]
        stats = {
            "total_solved": 0,
            "easy_solved": 0,
            "medium_solved": 0,
            "hard_solved": 0,
            "total_questions": 0
        }
        for item in data["allQuestionsCount"]:
            if item["difficulty"] == "All":
                stats["total_questions"] = item["count"]

        for item in data["matchedUser"]["submitStatsGlobal"]["acSubmissionNum"]:
            if item["difficulty"] == "All":
                stats["total_solved"] = item["count"]
            elif item["difficulty"] == "Easy":
                stats["easy_solved"] = item["count"]
            elif item["difficulty"] == "Medium":
                stats["medium_solved"] = item["count"]
            elif item["difficulty"] == "Hard":
                stats["hard_solved"] = item["count"]
                
        return stats