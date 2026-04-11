import httpx
import asyncio

LEETCODE_URL = "https://leetcode.com/graphql"

async def get_question_tags(client, title_slug: str):
    """Helper to fetch tags for a specific problem."""
    query = {
        "query": """
        query getQuestionTags($titleSlug: String!) {
            question(titleSlug: $titleSlug) {
                topicTags { name }
            }
        }
        """,
        "variables": {"titleSlug": title_slug}
    }
    response = await client.post(LEETCODE_URL, json=query)
    data = response.json()
    tags = data["data"]["question"]["topicTags"]
    return [tag["name"] for tag in tags]

async def get_leetcode_stats(username: str):
    query = {
        "query": """
        query getUserData($username: String!) {
            matchedUser(username: $username) {
                submitStats {
                    acSubmissionNum { difficulty count }
                }
            }
            recentSubmissionList(username: $username, limit: 10) {
                title
                titleSlug
                statusDisplay
            }
        }
        """,
        "variables": {"username": username}
    }

    async with httpx.AsyncClient(timeout=20.0) as client:
        response = await client.post(LEETCODE_URL, json=query)
        data = response.json()["data"]
        
        # 1. Filter only accepted submissions
        accepted_subs = [
            sub for sub in data["recentSubmissionList"] 
            if sub["statusDisplay"] == "Accepted"
        ]

        # 2. Fetch tags for each unique problem concurrently
        # We use a dict to avoid fetching the same problem twice if solved multiple times
        unique_slugs = list(set(sub["titleSlug"] for sub in accepted_subs))
        tags_results = await asyncio.gather(
            *[get_question_tags(client, slug) for slug in unique_slugs]
        )
        tags_map = dict(zip(unique_slugs, tags_results))

        # 3. Build the final list with tags included
        solved_questions = [
            {
                "title": sub["title"], 
                "link": f"https://leetcode.com/problems/{sub['titleSlug']}/",
                "tags": tags_map.get(sub["titleSlug"], [])
            }
            for sub in accepted_subs
        ]

        stats = data["matchedUser"]["submitStats"]["acSubmissionNum"]
        return {
            "total_solved": stats[0]["count"],
            "easy": stats[1]["count"],
            "medium": stats[2]["count"],
            "hard": stats[3]["count"],
            "recent_solved": solved_questions 
        }

if __name__ == "__main__":
    print(asyncio.run(get_leetcode_stats("mann_1")))
