import httpx

async def get_codeforces_stats(handle: str):
    info_url = f"https://codeforces.com/api/user.info?handles={handle}"
    status_url_recent = f"https://codeforces.com/api/user.status?handle={handle}&from=1&count=20"
    status_url = f"https://codeforces.com/api/user.status?handle={handle}"
    
    async with httpx.AsyncClient(timeout=20.0) as client:
        info_resp = await client.get(info_url)
        status_resp_recent = await client.get(status_url_recent)
        status_resp = await client.get(status_url)
        
        info = info_resp.json()["result"][0]
        last_submissions = status_resp_recent.json()["result"]
        submissions = status_resp.json()["result"]

        solved_list = []
        seen_recent = set()
        seen = set()
        
        easy = medium = hard = 0
        
        for sub in submissions:
            p_id = f"{sub['problem'].get('contestId', '')}{sub['problem'].get('index', '')}"
            
            if sub["verdict"] == "OK" and p_id not in seen:
                tags = sub["problem"].get("tags", [])
                index = sub["problem"].get("index")
                rating = sub["problem"].get("rating", 0)
                
            if index in ['A', 'B']:
                level = "Easy"
                easy +=1
                
            elif index in ['C', 'D']:
                level =  "Medium"
                medium +=1
            else:
                level = "Hard"
                hard +=1
                
            seen.add(p_id)
            
        
        tagContainer= []
        
        for sub in last_submissions:

            p_id = f"{sub['problem'].get('contestId', '')}{sub['problem'].get('index', '')}"
            
            
            if sub["verdict"] == "OK" and p_id not in seen_recent:
                tags = sub["problem"].get("tags", [])
                index = sub["problem"].get("index")
                rating = sub["problem"].get("rating", 0)
                
                if index in ['A', 'B']:
                    level = "Easy"
                    
                elif index in ['C', 'D']:
                    level =  "Medium"
                    # medium +=1
                else:
                    level = "Hard"
                    # hard +=1
                
                solved_list.append({
                    "title": sub["problem"]["name"],
                    "link": f"https://codeforces.com/contest/{sub['problem']['contestId']}/problem/{sub['problem']['index']}",
                    "tags": tags ,
                    "index": level,
                    "rating" : rating
                })
                
                tagContainer.extend(tags)
                    
                seen_recent.add(p_id)

        return {
            "rating": info.get("rating", 0),
            "rank": info.get("rank", "unrated"),
            "recent_solved": solved_list,
            "easy": easy,
            "medium" : medium,
            "hard": hard,
            "total_solved": easy + medium + hard,
            "tags" : tagContainer,
            "handle":handle,
        }