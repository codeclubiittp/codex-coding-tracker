import httpx

async def get_codeforces_stats(handle: str):
    url = f"https://codeforces.com/api/user.info?handles={handle}"
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url)
            if response.status_code != 200:
                return None
            
            data = response.json()
            if data["status"] != "OK":
                return None
                
            user_info = data["result"][0]
            return {
                "handle": user_info.get("handle"),
                "rating": user_info.get("rating", 0),
                "max_rating": user_info.get("maxRating", 0),
                "rank": user_info.get("rank", "Unrated"),
                "max_rank": user_info.get("maxRank", "Unrated")
            }
        except Exception as e:
            print(f"Codeforces API Error: {e}")
            return None