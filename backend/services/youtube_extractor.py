from youtube_transcript_api import YouTubeTranscriptApi
import re

def extract_video_id(url: str) -> str:
    # Handle youtu.be, youtube.com/watch?v=, etc.
    match = re.search(r"(?:v=|\/)([0-9A-Za-z_-]{11}).*", url)
    if match:
        return match.group(1)
    raise ValueError("Invalid YouTube URL")

def get_youtube_transcript(url: str) -> list:
    video_id = extract_video_id(url)
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        # Returns list of dicts: {'text': '...', 'start': 0.0, 'duration': 1.0}
        return transcript
    except Exception as e:
        raise ValueError(f"Could not retrieve transcript: {str(e)}")
