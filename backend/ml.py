from typing import List, Dict, Optional
from backend.db import list_videos


def recommend_videos(user_id: Optional[int] = None, skill: Optional[str] = None, top_n: int = 10) -> List[Dict]:
    """
    Simple content-based / heuristics recommender:
    - filters approved videos (handled by list_videos)
    - boosts videos matching the requested `skill`
    - ranks by a heuristic combining avg_rating and popularity
    """
    vids = list_videos(skill=skill, approved_only=True)
    results = []
    for v in vids:
        score = 0.0
        # skill match boost
        if skill and v.get('skills') and skill.lower() in v.get('skills','').lower():
            score += 3.0
        # rating influence
        score += float(v.get('avg_rating') or 0) * 2.0
        # popularity influence (small)
        score += (int(v.get('popularity') or 0)) * 0.05
        # penalty for premium (prefer free when equally scored)
        if v.get('is_premium'):
            score -= 0.5
        results.append({**v, 'score': score})

    results.sort(key=lambda x: x['score'], reverse=True)
    return results[:top_n]


def recommend_peer():
    # keep backwards compatible endpoint used by frontend demo
    return {"message": "Use recommend_videos for video recommendations"}
